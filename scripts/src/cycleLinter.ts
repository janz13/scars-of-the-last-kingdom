/**
 * Static Graph Cycle Linter — Scars of the Last Kingdom
 *
 * Uses Tarjan's Strongly Connected Components (SCC) algorithm over the
 * *unguarded* subgraph of STORY_NODES to detect genuine infinitely-repeatable
 * stat/inventory/corruption/trust/factionRep mutating cycles.
 *
 * Edges protected by a one-shot `blockedFlags` + `setFlags` latch (either on the
 * edge itself or before its target returns) or by a strictly-depleting consumable
 * cost are excluded before SCC decomposition so one-time hub spokes (e.g.
 * `hub --[blockedFlags]--> leaf --[stat gain]--> hub`) are not false-flagged.
 */

export interface CycleEdgeFinding {
  fromNode: string;
  toNode: string;
  choiceId: string;
  choiceText: string;
  mutatingKeys: string[];
  sccNodes: string[];
}

const MUTATING_NUMERIC_KEYS = new Set([
  'health',
  'maxHealth',
  'hunger',
  'thirst',
  'morale',
  'trust',
  'strength',
  'intelligence',
  'agility',
  'charisma',
  'luck',
  'corruption',
  'food',
  'water',
  'medicine',
  'scrap',
  'ammo',
  'relics',
  'reputation',
  'miraTrust',
  'cainTrust',
  'ironSaints',
  'glassCourt',
  'hollowChildren',
  'redChoir',
  'lastArchive',
]);

const DEPLETING_RESOURCE_KEYS = ['food', 'water', 'medicine', 'scrap', 'ammo', 'relics'] as const;

function collectMutatingKeys(effects: Record<string, any> | undefined): string[] {
  if (!effects) return [];
  const keys: string[] = [];
  for (const [k, v] of Object.entries(effects)) {
    if (MUTATING_NUMERIC_KEYS.has(k) && typeof v === 'number' && v !== 0) {
      keys.push(`${k}:${v > 0 ? '+' : ''}${v}`);
    }
  }
  return keys;
}

function getChoiceTargetIds(choice: any): string[] {
  const targets = new Set<string>();
  if (choice.diceCheck) {
    for (const key of ['successNode', 'failureNode', 'criticalSuccessNode', 'criticalFailureNode']) {
      const target = choice.diceCheck[key];
      if (target && target !== '__return__') targets.add(target);
    }
  } else if (choice.nextNode && choice.nextNode !== '__return__') {
    targets.add(choice.nextNode);
  }
  if (choice.endingTrigger && choice.endingTrigger !== '__return__') targets.add(choice.endingTrigger);
  return Array.from(targets);
}

/**
 * Checks whether a choice is bounded (cannot be taken infinitely from the same state)
 * because it checks a `blockedFlags` flag that is set on the choice itself, on an
 * immediate target node's `effectsOnEnter`, on an outgoing choice from that target,
 * OR because a target node transitions straight into another node carrying the latch.
 */
function collectsAllSetFlagsWithinHops(startNodeId: string, nodeMap: Map<string, any>, maxHops = 2): Set<string> {
  const found = new Set<string>();
  const visited = new Set<string>([startNodeId]);
  const queue: Array<{ id: string; depth: number }> = [{ id: startNodeId, depth: 0 }];

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!;
    const n = nodeMap.get(id);
    if (!n) continue;
    for (const f of n.effectsOnEnter?.setFlags ?? []) found.add(f);
    for (const c of n.choices ?? []) {
      for (const f of c.effects?.setFlags ?? []) found.add(f);
      if (depth < maxHops) {
        for (const t of getChoiceTargetIds(c)) {
          if (!visited.has(t)) {
            visited.add(t);
            queue.push({ id: t, depth: depth + 1 });
          }
        }
      }
    }
  }
  return found;
}

function isChoiceOneShotGuarded(choice: any, nodeMap: Map<string, any>): boolean {
  const blockedFlags: string[] = choice?.requirements?.blockedFlags ?? [];
  if (blockedFlags.length === 0) return false;

  const setFlagsOnChoice = new Set<string>(choice?.effects?.setFlags ?? []);
  for (const bFlag of blockedFlags) {
    if (setFlagsOnChoice.has(bFlag)) return true;
    for (const targetId of getChoiceTargetIds(choice)) {
      const targetFlags = collectsAllSetFlagsWithinHops(targetId, nodeMap, 2);
      if (targetFlags.has(bFlag)) return true;
    }
  }
  return false;
}

function isStrictlyDepletingCost(choice: any, nodeMap: Map<string, any>): boolean {
  const req = choice?.requirements;
  const eff = choice?.effects;
  if (!req || !eff) return false;

  for (const rKey of DEPLETING_RESOURCE_KEYS) {
    const minReq = req[rKey];
    const delta = eff[rKey];
    if (typeof minReq === 'number' && minReq > 0 && typeof delta === 'number' && delta < 0) {
      // Check if every immediate target does not grant the same resource back
      const targets = getChoiceTargetIds(choice);
      const immediateGain = targets.some((t) => (nodeMap.get(t)?.effectsOnEnter?.[rKey] ?? 0) > 0);
      if (!immediateGain) return true;
    }
  }
  return false;
}

export function findUnguardedMutatingCycles(storyNodes: any[]): CycleEdgeFinding[] {
  const nodeMap = new Map<string, any>(storyNodes.map((n) => [n.id, n]));

  // Build adjacency list EXCLUDING one-shot guarded choices & strictly-depleting choices,
  // since players cannot traverse those choices twice on an infinite loop.
  const unguardedAdj = new Map<string, Array<{ to: string; choice: any }>>();

  for (const node of storyNodes) {
    const edges: Array<{ to: string; choice: any }> = [];
    for (const c of node.choices ?? []) {
      if (isChoiceOneShotGuarded(c, nodeMap)) continue;
      if (isStrictlyDepletingCost(c, nodeMap)) continue;
      for (const target of getChoiceTargetIds(c)) {
        if (nodeMap.has(target)) {
          edges.push({ to: target, choice: c });
        }
      }
    }
    unguardedAdj.set(node.id, edges);
  }

  // Tarjan's SCC algorithm on the unguarded subgraph
  let index = 0;
  const indices = new Map<string, number>();
  const lowlink = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const sccs: string[][] = [];

  function strongConnect(v: string) {
    indices.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    for (const edge of unguardedAdj.get(v) ?? []) {
      const w = edge.to;
      if (!indices.has(w)) {
        strongConnect(w);
        lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
      } else if (onStack.has(w)) {
        lowlink.set(v, Math.min(lowlink.get(v)!, indices.get(w)!));
      }
    }

    if (lowlink.get(v) === indices.get(v)) {
      const comp: string[] = [];
      while (true) {
        const w = stack.pop()!;
        onStack.delete(w);
        comp.push(w);
        if (w === v) break;
      }
      sccs.push(comp);
    }
  }

  for (const node of storyNodes) {
    if (!indices.has(node.id)) {
      strongConnect(node.id);
    }
  }

  const findings: CycleEdgeFinding[] = [];

  for (const compIds of sccs) {
    const compSet = new Set(compIds);
    const hasSelfLoop =
      compIds.length === 1 && (unguardedAdj.get(compIds[0]) ?? []).some((e) => e.to === compIds[0]);
    if (compIds.length < 2 && !hasSelfLoop) continue;

    for (const nodeId of compIds) {
      const node = nodeMap.get(nodeId)!;
      const seenChoice = new Set<string>();
      for (const edge of unguardedAdj.get(nodeId) ?? []) {
        if (!compSet.has(edge.to)) continue;
        const c = edge.choice;
        if (seenChoice.has(c.id)) continue;

        const internalTargets = getChoiceTargetIds(c).filter((t) => compSet.has(t));
        const choiceMutKeys = collectMutatingKeys(c.effects);
        const enterMutKeys = internalTargets.flatMap((tId) =>
          collectMutatingKeys(nodeMap.get(tId)?.effectsOnEnter).map((k) => `@${tId}.${k}`)
        );
        const mutatingKeys = [...choiceMutKeys, ...enterMutKeys];

        if (mutatingKeys.length > 0) {
          seenChoice.add(c.id);
          findings.push({
            fromNode: node.id,
            toNode: internalTargets.join(','),
            choiceId: c.id,
            choiceText: c.text,
            mutatingKeys,
            sccNodes: compIds,
          });
        }
      }
    }
  }

  return findings;
}
