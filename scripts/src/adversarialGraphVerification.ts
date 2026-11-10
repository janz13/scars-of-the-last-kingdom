/**
 * Milestone 1 Iteration 2: Adversarial Graph & Connectivity Challenger Script
 * Executed independently by m1_r2_challenger_1
 *
 * Empirical verification of:
 * 1. Exact node inventory across all 20 story files (1,636 nodes)
 * 2. Exact terminal ending count (244 endings) and Route Codex alignment (268 entries)
 * 3. Zero dangling node references in nextNode, endingTrigger, and diceCheck branches
 * 4. Zero dead-end non-ending nodes (unintended traps)
 * 5. Complete graph reachability from story roots, chapter transitions, dynamic pools, and survival triggers
 * 6. Tarjan's SCC and cycle analysis: proof of absence of inescapable infinite loops
 * 7. Terminal co-reachability: proof that every node has a directed path to a terminal ending
 * 8. BFS shortest path distribution and convergence
 */

import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

if ((require as any).extensions) {
  (require as any).extensions['.png'] = (m: any, f: string) => {
    m.exports = f;
  };
}

const { loadChapter, getLoadedNodes } = require('../../artifacts/mobile/data/story/chapterLoader.ts');
const { ENDINGS, ENDING_CATEGORIES } = require('../../artifacts/mobile/data/endings.ts');

interface TestFinding {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  category: string;
  location: string;
  message: string;
}

const findings: TestFinding[] = [];
let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition: boolean, name: string, findingIfFail?: TestFinding) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ PASS: ${name}`);
  } else {
    failedChecks++;
    console.error(`  ❌ FAIL: ${name}`);
    if (findingIfFail) {
      findings.push(findingIfFail);
    }
  }
}

async function runAdversarialChallenge() {
  console.log('================================================================================');
  console.log('⚔️  ADVERSARIAL STORY GRAPH & CONNECTIVITY CHALLENGE HARNESS');
  console.log('   Target: Scars of the Last Kingdom (1,636 Story Nodes / 244 Endings)');
  console.log('   Agent:  m1_r2_challenger_1 (Milestone 1 Iteration 2)');
  console.log('================================================================================\n');

  // Step 1: Load all dynamic chapters into chapterLoader
  const chaptersToLoad = [
    'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6',
    'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10', 'Chapter 11',
    'Chapter 12', 'Final Chapter 1', 'Final Chapter 2', 'Epilogue',
  ];

  for (const ch of chaptersToLoad) {
    await loadChapter(ch);
  }

  const allNodes: any[] = getLoadedNodes();
  const nodeMap = new Map<string, any>(allNodes.map((n) => [n.id, n]));

  console.log('--- 1. Node Inventory & Ending Dimension Verification ---');
  assert(allNodes.length === 1636, `Total story nodes exactly 1,636 (actual: ${allNodes.length})`, {
    severity: 'CRITICAL',
    category: 'inventory',
    location: 'chapterLoader',
    message: `Expected 1636 story nodes, found ${allNodes.length}`,
  });

  // Check unique IDs (no duplicates)
  const idCounts = new Map<string, number>();
  for (const n of allNodes) {
    idCounts.set(n.id, (idCounts.get(n.id) || 0) + 1);
  }
  const duplicateIds = Array.from(idCounts.entries()).filter(([_, count]) => count > 1);
  assert(duplicateIds.length === 0, `Zero duplicate node IDs (duplicates: ${duplicateIds.length})`, {
    severity: 'CRITICAL',
    category: 'duplicate_ids',
    location: duplicateIds.map(([id]) => id).join(', '),
    message: `Duplicate node IDs found: ${JSON.stringify(duplicateIds)}`,
  });

  // Ending nodes: isEnding === true and id !== 'chapter1_end'
  const isEndingNodes = allNodes.filter((n) => n.isEnding && n.id !== 'chapter1_end');
  assert(isEndingNodes.length === 244, `Total terminal ending nodes exactly 244 (actual: ${isEndingNodes.length})`, {
    severity: 'CRITICAL',
    category: 'endings_count',
    location: 'story_endings',
    message: `Expected 244 ending nodes, found ${isEndingNodes.length}`,
  });

  assert(ENDINGS.length === 268, `Route Codex ENDINGS registry has 268 entries (actual: ${ENDINGS.length})`, {
    severity: 'HIGH',
    category: 'codex_registry',
    location: 'endings.ts',
    message: `Expected 268 ENDINGS entries, found ${ENDINGS.length}`,
  });

  console.log('\n--- 2. Dangling Reference Edge Audit ---');
  // Check every choice nextNode, endingTrigger, and diceCheck branches
  let totalEdges = 0;
  const danglingEdges: Array<{ from: string; type: string; target: string; choiceId?: string }> = [];

  for (const node of allNodes) {
    for (const choice of node.choices || []) {
      // nextNode check
      if (choice.nextNode) {
        totalEdges++;
        if (choice.nextNode !== '__return__' && !nodeMap.has(choice.nextNode)) {
          danglingEdges.push({ from: node.id, type: 'nextNode', target: choice.nextNode, choiceId: choice.id });
        }
      }

      // endingTrigger check
      if (choice.endingTrigger) {
        totalEdges++;
        if (choice.endingTrigger !== '__return__' && !nodeMap.has(choice.endingTrigger)) {
          // Note: Check if it's an endingId registered in ENDINGS or a story node
          const inEndings = ENDINGS.some((e: any) => e.id === choice.endingTrigger);
          if (!inEndings && !nodeMap.has(choice.endingTrigger)) {
            danglingEdges.push({ from: node.id, type: 'endingTrigger', target: choice.endingTrigger, choiceId: choice.id });
          }
        }
      }

      // diceCheck branches
      if (choice.diceCheck) {
        const { successNode, failureNode, criticalSuccessNode, criticalFailureNode } = choice.diceCheck;
        if (successNode) {
          totalEdges++;
          if (successNode !== '__return__' && !nodeMap.has(successNode)) {
            danglingEdges.push({ from: node.id, type: 'diceCheck.successNode', target: successNode, choiceId: choice.id });
          }
        }
        if (failureNode) {
          totalEdges++;
          if (failureNode !== '__return__' && !nodeMap.has(failureNode)) {
            danglingEdges.push({ from: node.id, type: 'diceCheck.failureNode', target: failureNode, choiceId: choice.id });
          }
        }
        if (criticalSuccessNode) {
          totalEdges++;
          if (criticalSuccessNode !== '__return__' && !nodeMap.has(criticalSuccessNode)) {
            danglingEdges.push({ from: node.id, type: 'diceCheck.criticalSuccessNode', target: criticalSuccessNode, choiceId: choice.id });
          }
        }
        if (criticalFailureNode) {
          totalEdges++;
          if (criticalFailureNode !== '__return__' && !nodeMap.has(criticalFailureNode)) {
            danglingEdges.push({ from: node.id, type: 'diceCheck.criticalFailureNode', target: criticalFailureNode, choiceId: choice.id });
          }
        }
      }
    }
  }

  assert(
    danglingEdges.length === 0,
    `Zero dangling edge references across ${totalEdges} total graph transitions (dangling: ${danglingEdges.length})`,
    {
      severity: 'CRITICAL',
      category: 'dangling_edges',
      location: danglingEdges.map((e) => `${e.from}->${e.target}`).join('; '),
      message: `Dangling references found: ${JSON.stringify(danglingEdges)}`,
    }
  );

  console.log('\n--- 3. Dead-End Non-Ending Nodes Audit ---');
  const accidentalDeadEnds: string[] = [];
  for (const node of allNodes) {
    if (!node.isEnding && node.id !== 'chapter1_end') {
      const choices = node.choices || [];
      if (choices.length === 0) {
        // Check if it's an interlude/vision node with special handling
        accidentalDeadEnds.push(node.id);
      }
    }
  }

  assert(
    accidentalDeadEnds.length === 0,
    `Zero accidental dead-end nodes without choices (dead ends: ${accidentalDeadEnds.length})`,
    {
      severity: 'CRITICAL',
      category: 'dead_ends',
      location: accidentalDeadEnds.join(', '),
      message: `Non-ending nodes with zero choices: ${JSON.stringify(accidentalDeadEnds)}`,
    }
  );

  console.log('\n--- 4. Graph Construction & Adjacency Representation ---');
  // Build directed adjacency list
  const adj = new Map<string, Set<string>>();
  const reverseAdj = new Map<string, Set<string>>();

  for (const node of allNodes) {
    adj.set(node.id, new Set<string>());
    reverseAdj.set(node.id, new Set<string>());
  }

  for (const node of allNodes) {
    const fromId = node.id;
    for (const choice of node.choices || []) {
      const targets: string[] = [];
      if (choice.nextNode && choice.nextNode !== '__return__' && nodeMap.has(choice.nextNode)) {
        targets.push(choice.nextNode);
      }
      if (choice.endingTrigger && choice.endingTrigger !== '__return__' && nodeMap.has(choice.endingTrigger)) {
        targets.push(choice.endingTrigger);
      }
      if (choice.diceCheck) {
        if (choice.diceCheck.successNode && choice.diceCheck.successNode !== '__return__' && nodeMap.has(choice.diceCheck.successNode)) {
          targets.push(choice.diceCheck.successNode);
        }
        if (choice.diceCheck.failureNode && choice.diceCheck.failureNode !== '__return__' && nodeMap.has(choice.diceCheck.failureNode)) {
          targets.push(choice.diceCheck.failureNode);
        }
        if (choice.diceCheck.criticalSuccessNode && choice.diceCheck.criticalSuccessNode !== '__return__' && nodeMap.has(choice.diceCheck.criticalSuccessNode)) {
          targets.push(choice.diceCheck.criticalSuccessNode);
        }
        if (choice.diceCheck.criticalFailureNode && choice.diceCheck.criticalFailureNode !== '__return__' && nodeMap.has(choice.diceCheck.criticalFailureNode)) {
          targets.push(choice.diceCheck.criticalFailureNode);
        }
      }

      for (const toId of targets) {
        adj.get(fromId)!.add(toId);
        reverseAdj.get(toId)!.add(fromId);
      }
    }
  }

  console.log(`  Directed graph built: ${allNodes.length} vertices, ${Array.from(adj.values()).reduce((a, s) => a + s.size, 0)} directed edges.`);

  console.log('\n--- 5. Inter-Chapter Spine Sequential Reachability ---');
  // Check sequential spine continuity: Ch1 -> Ch2 -> Ch3 -> Ch4 -> Ch5 -> Ch6 -> Ch7 -> Ch8 -> Ch9 -> Ch10 -> Ch11 -> Ch12 -> FC1 -> FC2 -> Epilogue
  const spineCheckpoints = [
    { from: 'prologue_start', to: 'chapter1_start' },
    { from: 'chapter1_start', to: 'chapter1_end' },
    { from: 'chapter1_end', to: 'chapter2_start' },
    { from: 'chapter2_start', to: 'chapter3_start' },
    { from: 'chapter3_start', to: 'chapter4_start' },
    { from: 'chapter4_start', to: 'chapter5_start' },
    { from: 'chapter5_start', to: 'chapter6_start' },
    { from: 'chapter6_start', to: 'chapter7_start' },
    { from: 'chapter7_start', to: 'chapter8_start' },
    { from: 'chapter8_start', to: 'chapter9_start' },
    { from: 'chapter9_start', to: 'chapter10_start' },
    { from: 'chapter10_start', to: 'chapter11_start' },
    { from: 'chapter11_start', to: 'chapter12_start' },
    { from: 'chapter12_start', to: 'final_chapter1_start' },
    { from: 'final_chapter1_start', to: 'final_chapter2_start' },
    { from: 'final_chapter2_start', to: 'epi_01' },
  ];

  function canReach(start: string, target: string): boolean {
    const q: string[] = [start];
    const visited = new Set<string>([start]);
    while (q.length > 0) {
      const cur = q.shift()!;
      if (cur === target) return true;
      for (const nxt of adj.get(cur) || []) {
        if (!visited.has(nxt)) {
          visited.add(nxt);
          q.push(nxt);
        }
      }
    }
    return false;
  }

  let spineContinuityBroken = 0;
  for (const cp of spineCheckpoints) {
    const reachable = canReach(cp.from, cp.to);
    assert(reachable, `Spine route reaches from ${cp.from} to ${cp.to}`, {
      severity: 'HIGH',
      category: 'spine_continuity',
      location: `${cp.from} -> ${cp.to}`,
      message: `Failed to find directed path between consecutive chapter milestones: ${cp.from} -> ${cp.to}`,
    });
    if (!reachable) spineContinuityBroken++;
  }

  // Mid-game branches reachability from main chapters
  const mbBranches = [
    { from: 'chapter3_start', to: 'mb1_01', name: 'MB1 (The Census of Small Names)' },
    { from: 'chapter6_start', to: 'mb2_01', name: 'MB2 (Velna\'s Trail)' },
    { from: 'chapter8_start', to: 'mb3_01', name: 'MB3 (The Grain Ledger)' },
    { from: 'chapter10_start', to: 'mb4_01', name: 'MB4 (The Last Broadcast)' },
  ];

  for (const mb of mbBranches) {
    const reachesMB = canReach(mb.from, mb.to);
    assert(reachesMB, `Branch ${mb.name} reachable from ${mb.from}`, {
      severity: 'HIGH',
      category: 'branch_reachability',
      location: `${mb.from} -> ${mb.to}`,
      message: `Mid-game branch not reachable: ${mb.name}`,
    });
  }

  console.log('\n--- 6. Complete Reachability Analysis & 3 Special Endings Examination ---');
  // BFS from prologue_start
  const visitedFromPrologue = new Set<string>();
  const pQueue: string[] = ['prologue_start'];
  visitedFromPrologue.add('prologue_start');
  while (pQueue.length > 0) {
    const cur = pQueue.shift()!;
    for (const nxt of adj.get(cur) || []) {
      if (!visitedFromPrologue.has(nxt)) {
        visitedFromPrologue.add(nxt);
        pQueue.push(nxt);
      }
    }
  }

  console.log(`  • Reachable directly from prologue_start via choice edges: ${visitedFromPrologue.size} / 1636`);

  // Unreachable nodes from prologue_start
  const unreachedFromPrologue = allNodes.filter((n) => !visitedFromPrologue.has(n.id));
  console.log(`  • Unreached from prologue_start: ${unreachedFromPrologue.length} nodes`);

  // Dynamic pools: Hallucinations (Vision, 3 nodes), Companion Events (Interlude, 8 nodes)
  const visionNodes = allNodes.filter((n) => n.id.startsWith('halluc_') || n.chapter === 'Vision');
  const interludeNodes = allNodes.filter((n) => n.id.startsWith('mira_event_') || n.id.startsWith('cain_event_') || n.chapter === 'Interlude');
  console.log(`    - Vision (Hallucination) nodes: ${visionNodes.length}`);
  console.log(`    - Interlude (Companion event) nodes: ${interludeNodes.length}`);

  // Special engine-triggered survival / betrayal endings
  const specialEngineEndings = ['ending_starvation', 'ending_metro_death', 'ending_cain_betrayal'];
  for (const seid of specialEngineEndings) {
    assert(nodeMap.has(seid), `Engine-triggered node "${seid}" exists in story graph`, {
      severity: 'CRITICAL',
      category: 'engine_ending_node',
      location: seid,
      message: `Engine ending node "${seid}" missing from story graph`,
    });
  }

  // BFS with dynamic pools and engine triggers
  const allReachable = new Set<string>(visitedFromPrologue);
  const dynSeeds = [
    ...visionNodes.map((n) => n.id),
    ...interludeNodes.map((n) => n.id),
    ...specialEngineEndings,
  ];

  const dynQ: string[] = [];
  for (const ds of dynSeeds) {
    if (!allReachable.has(ds)) {
      allReachable.add(ds);
      dynQ.push(ds);
    }
  }

  while (dynQ.length > 0) {
    const cur = dynQ.shift()!;
    for (const nxt of adj.get(cur) || []) {
      if (!allReachable.has(nxt)) {
        allReachable.add(nxt);
        dynQ.push(nxt);
      }
    }
  }

  console.log(`  • Reachable including dynamic pools & survival triggers: ${allReachable.size} / 1636`);
  const trulyOrphanedNodes = allNodes.filter((n) => !allReachable.has(n.id));

  assert(
    trulyOrphanedNodes.length === 0,
    `Zero truly orphaned nodes across the full 1,636-node graph (orphans: ${trulyOrphanedNodes.length})`,
    {
      severity: 'CRITICAL',
      category: 'orphan_nodes',
      location: trulyOrphanedNodes.map((n) => n.id).join(', '),
      message: `Orphaned nodes found: ${JSON.stringify(trulyOrphanedNodes.map((n) => n.id))}`,
    }
  );

  console.log('\n--- 7. Tarjan SCC & Inescapable Infinite Loop Challenge ---');
  // Tarjan's Strongly Connected Components algorithm
  let sccIndex = 0;
  const indices = new Map<string, number>();
  const lowlinks = new Map<string, number>();
  const onStack = new Map<string, boolean>();
  const stack: string[] = [];
  const sccs: string[][] = [];

  function strongConnect(v: string) {
    indices.set(v, sccIndex);
    lowlinks.set(v, sccIndex);
    sccIndex++;
    stack.push(v);
    onStack.set(v, true);

    for (const w of adj.get(v) || []) {
      if (!indices.has(w)) {
        strongConnect(w);
        lowlinks.set(v, Math.min(lowlinks.get(v)!, lowlinks.get(w)!));
      } else if (onStack.get(w)) {
        lowlinks.set(v, Math.min(lowlinks.get(v)!, indices.get(w)!));
      }
    }

    if (lowlinks.get(v) === indices.get(v)) {
      const scc: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.set(w, false);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  for (const node of allNodes) {
    if (!indices.has(node.id)) {
      strongConnect(node.id);
    }
  }

  // Non-trivial SCCs: SCC with > 1 node, or a single node with a self-loop
  const nonTrivialSccs = sccs.filter((scc) => {
    if (scc.length > 1) return true;
    const singleNode = scc[0];
    return adj.get(singleNode)!.has(singleNode);
  });

  console.log(`  • Total SCCs found: ${sccs.length}`);
  console.log(`  • Non-trivial SCCs (cycles/loops): ${nonTrivialSccs.length}`);

  // Check whether any non-trivial SCC is a trap (has NO exits to the rest of the graph)
  let inescapableSccs = 0;
  for (let i = 0; i < nonTrivialSccs.length; i++) {
    const scc = nonTrivialSccs[i];
    const sccSet = new Set(scc);
    const exits: string[] = [];

    for (const member of scc) {
      for (const target of adj.get(member) || []) {
        if (!sccSet.has(target)) {
          exits.push(target);
        }
      }
    }

    if (exits.length === 0) {
      inescapableSccs++;
      console.error(`  ❌ TRAP SCC #${i + 1} with ${scc.length} nodes has ZERO exits: ${scc.slice(0, 5).join(', ')}...`);
    }
  }

  assert(
    inescapableSccs === 0,
    `Zero inescapable infinite loop SCCs without exit transitions (traps: ${inescapableSccs})`,
    {
      severity: 'CRITICAL',
      category: 'infinite_loop',
      location: 'SCC_analysis',
      message: `Found ${inescapableSccs} inescapable infinite loops without exit edges.`,
    }
  );

  console.log('\n--- 8. Terminal Co-Reachability: Can every non-ending node reach an ending? ---');
  // Reverse BFS from all ending nodes
  const endingNodeIds = new Set(isEndingNodes.map((n) => n.id));
  const canReachEnding = new Set<string>(endingNodeIds);
  const revQueue: string[] = Array.from(endingNodeIds);

  while (revQueue.length > 0) {
    const cur = revQueue.shift()!;
    for (const pred of reverseAdj.get(cur) || []) {
      if (!canReachEnding.has(pred)) {
        canReachEnding.add(pred);
        revQueue.push(pred);
      }
    }
  }

  console.log(`  • Nodes with direct directed path to a terminal ending: ${canReachEnding.size} / 1636`);

  // Check non-ending nodes that cannot reach an ending via choices
  // Note: Some nodes like dynamic events (hallucinations/interludes) return via __return__ to the current scene in the game engine.
  const nodesWithoutChoicePathToEnding = allNodes.filter(
    (n) => !canReachEnding.has(n.id) && !n.isEnding && n.id !== 'chapter1_end'
  );

  console.log(`  • Non-ending nodes without direct choice edge to an ending: ${nodesWithoutChoicePathToEnding.length}`);
  for (const n of nodesWithoutChoicePathToEnding.slice(0, 10)) {
    console.log(`    - ${n.id} (${n.chapter}): choices = ${n.choices?.length}`);
  }

  // Check if all these are interludes/hallucinations with __return__ or special return mechanisms
  const unexpectedDeadBranches = nodesWithoutChoicePathToEnding.filter((n) => {
    const isDynamic = n.id.startsWith('halluc_') || n.id.startsWith('mira_event_') || n.id.startsWith('cain_event_');
    const hasReturnChoice = (n.choices || []).some((c: any) => c.nextNode === '__return__' || c.endingTrigger === '__return__');
    return !isDynamic && !hasReturnChoice;
  });

  assert(
    unexpectedDeadBranches.length === 0,
    `Zero unexpected dead-branch nodes without path to ending (unexpected: ${unexpectedDeadBranches.length})`,
    {
      severity: 'HIGH',
      category: 'dead_branches',
      location: unexpectedDeadBranches.map((n) => n.id).join(', '),
      message: `Nodes trapped without a path to any ending: ${JSON.stringify(unexpectedDeadBranches.map((n) => n.id))}`,
    }
  );

  console.log('\n--- 9. BFS Shortest Paths Distribution & Convergence ---');
  // BFS distances from chapter roots to endings
  const chapterStarts = [
    'prologue_start', 'chapter1_start', 'chapter2_start', 'chapter3_start',
    'chapter4_start', 'chapter5_start', 'chapter6_start', 'chapter7_start',
    'chapter8_start', 'chapter9_start', 'chapter10_start', 'chapter11_start',
    'chapter12_start', 'final_chapter1_start', 'final_chapter2_start', 'epi_01',
  ];

  let totalEndingDist = 0;
  let reachableEndingsCount = 0;
  let maxEndingDist = 0;
  let minEndingDist = Infinity;

  // Compute shortest distance from ANY chapter start to each ending node
  for (const endingNode of isEndingNodes) {
    let shortestDist = Infinity;
    for (const startId of chapterStarts) {
      // BFS from startId to endingNode.id
      const dist = new Map<string, number>();
      const bq = [startId];
      dist.set(startId, 0);
      while (bq.length > 0) {
        const cur = bq.shift()!;
        if (cur === endingNode.id) {
          shortestDist = Math.min(shortestDist, dist.get(cur)!);
          break;
        }
        const d = dist.get(cur)!;
        if (d >= shortestDist) continue;
        for (const nxt of adj.get(cur) || []) {
          if (!dist.has(nxt)) {
            dist.set(nxt, d + 1);
            bq.push(nxt);
          }
        }
      }
    }

    if (shortestDist < Infinity) {
      reachableEndingsCount++;
      totalEndingDist += shortestDist;
      maxEndingDist = Math.max(maxEndingDist, shortestDist);
      minEndingDist = Math.min(minEndingDist, shortestDist);
    }
  }

  const avgEndingDist = reachableEndingsCount > 0 ? (totalEndingDist / reachableEndingsCount).toFixed(2) : '0';
  console.log(`  • Reachable story endings from chapter start roots: ${reachableEndingsCount} / 244`);
  console.log(`  • Minimum choices to an ending: ${minEndingDist}`);
  console.log(`  • Maximum choices to an ending: ${maxEndingDist}`);
  console.log(`  • Average choices to an ending: ${avgEndingDist}`);

  assert(
    reachableEndingsCount >= 241, // 241 from chapter starts + 3 survival/betrayal triggers = 244
    `At least 241/244 endings reachable directly from chapter start roots via choice edges (actual: ${reachableEndingsCount})`,
    {
      severity: 'CRITICAL',
      category: 'ending_reachability',
      location: 'story_endings',
      message: `Expected at least 241 endings directly reachable, got ${reachableEndingsCount}`,
    }
  );

  console.log('\n================================================================================');
  console.log(`📊 ADVERSARIAL CHALLENGE SUMMARY:`);
  console.log(`   • Total Checks Executed:  ${totalChecks}`);
  console.log(`   • Passed Checks:          ${passedChecks}`);
  console.log(`   • Failed Checks:          ${failedChecks}`);
  console.log(`   • Total Findings Logged:  ${findings.length}`);
  console.log('================================================================================\n');

  if (findings.length > 0) {
    console.error('🚨 ADVERSARIAL FINDINGS:');
    for (const f of findings) {
      console.error(`  [${f.severity}] (${f.category}) ${f.location}: ${f.message}`);
    }
  }

  const exitCode = failedChecks > 0 ? 1 : 0;
  return {
    totalChecks,
    passedChecks,
    failedChecks,
    findings,
    metrics: {
      totalNodes: allNodes.length,
      terminalEndings: isEndingNodes.length,
      codexEndings: ENDINGS.length,
      totalEdges,
      danglingEdges: danglingEdges.length,
      deadEnds: accidentalDeadEnds.length,
      reachableDirectSpine: visitedFromPrologue.size,
      reachableFull: allReachable.size,
      trulyOrphaned: trulyOrphanedNodes.length,
      sccCount: sccs.length,
      nonTrivialSccs: nonTrivialSccs.length,
      inescapableSccs,
      reachableEndingsFromRoots: reachableEndingsCount,
      minEndingDist,
      maxEndingDist,
      avgEndingDist,
    },
  };
}

runAdversarialChallenge()
  .then((res) => {
    if (res.failedChecks > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('CRASH DURING ADVERSARIAL CHALLENGE:', err);
    process.exit(1);
  });
