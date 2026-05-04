/**
 * Story Validator for Scars of the Last Kingdom.
 *
 * Run validateStory() to get a list of ValidationWarning objects.
 * Warnings are shown in Developer Mode — they never crash the game.
 *
 * Story content now lives in split chapter files:
 *   artifacts/mobile/data/story/chapter1.ts
 *   artifacts/mobile/data/story/chapter2.ts
 *   artifacts/mobile/data/story/chapter3.ts  ... (add new chapters here)
 *   artifacts/mobile/data/story/finalChapter1.ts
 *   artifacts/mobile/data/story/finalChapter2.ts
 *   artifacts/mobile/data/story/diceOutcomes.ts
 *
 * All chapter files are combined in story/index.ts and re-exported through
 * storyNodes.ts. The validator sees the full merged array automatically —
 * no changes needed here when a new chapter file is added.
 *
 * Checks performed across ALL chapter files:
 *   - Every choice.nextNode points to an existing node
 *   - Every choice.endingTrigger points to an existing node
 *   - Every diceCheck outcome node (successNode, failureNode, critical*) exists
 *   - Every imageKey is registered in BACKGROUND_IMAGES
 *   - Every isEnding node's endingId exists in ENDINGS
 *   - Every stat/inventory key in requirements/effects is valid
 *   - Every faction key in requirements.factionRep is valid
 *   - Every companion trust field is valid
 *   - Flags in requirements.flags / blockedFlags are non-empty strings
 *   - effectsOnEnter uses only known keys
 *   - Duplicate choice IDs within a node (error)
 *   - Duplicate choice IDs across all nodes (warning)
 */

import { STORY_NODES } from '../data/storyNodes';
import { ENDINGS } from '../data/endings';
import { BACKGROUND_IMAGES } from '../constants/images';

export type WarningSeverity = 'error' | 'warning' | 'info';

export interface ValidationWarning {
  severity: WarningSeverity;
  nodeId: string;
  choiceId?: string;
  message: string;
}

// ─── Canonical key sets ───────────────────────────────────────────────────────

const STAT_KEYS = new Set([
  'health', 'maxHealth', 'hunger', 'thirst', 'morale', 'trust',
  'strength', 'intelligence', 'agility', 'charisma', 'luck', 'corruption',
]);

const INVENTORY_KEYS = new Set([
  'food', 'water', 'medicine', 'scrap', 'ammo', 'relics', 'reputation',
]);

const FACTION_KEYS = new Set([
  'ironSaints', 'glassCourt', 'hollowChildren', 'redChoir', 'lastArchive',
]);

const COMPANION_TRUST_KEYS = new Set(['miraTrust', 'cainTrust']);
const COMPANION_PRESENT_KEYS = new Set(['miraPresent', 'cainPresent']);

const REQUIREMENT_ONLY_KEYS = new Set([
  'flags', 'blockedFlags', 'classes', 'backgrounds', 'factionRep',
  'maxCorruption', 'maxMorale',
  ...COMPANION_TRUST_KEYS, ...COMPANION_PRESENT_KEYS,
]);

const EFFECT_ONLY_KEYS = new Set(['setFlags', 'removeFlags', ...COMPANION_TRUST_KEYS]);

function isKnownRequirementKey(key: string): boolean {
  return STAT_KEYS.has(key) || INVENTORY_KEYS.has(key) || REQUIREMENT_ONLY_KEYS.has(key);
}

function isKnownEffectKey(key: string): boolean {
  return STAT_KEYS.has(key) || INVENTORY_KEYS.has(key) ||
    FACTION_KEYS.has(key) || EFFECT_ONLY_KEYS.has(key);
}

// ─── Main validator ───────────────────────────────────────────────────────────

export function validateStory(): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // STORY_NODES already includes DICE_OUTCOME_NODES (pushed at module load)
  const nodeIds = new Set(STORY_NODES.map((n) => n.id));
  const endingIds = new Set(ENDINGS.map((e) => e.id));
  const imageKeys = new Set(Object.keys(BACKGROUND_IMAGES));

  // ── Global duplicate choice ID check (across all nodes) ───────────────────
  const globalChoiceIds = new Map<string, string>(); // choiceId → nodeId

  for (const node of STORY_NODES) {
    for (const choice of node.choices) {
      if (globalChoiceIds.has(choice.id)) {
        const firstSeen = globalChoiceIds.get(choice.id);
        warnings.push({
          severity: 'warning',
          nodeId: node.id,
          choiceId: choice.id,
          message: `Choice id "${choice.id}" is also used in node "${firstSeen}" — IDs should be globally unique`,
        });
      } else {
        globalChoiceIds.set(choice.id, node.id);
      }
    }
  }

  // ── Per-node checks ───────────────────────────────────────────────────────

  for (const node of STORY_NODES) {

    // ── Image key ──────────────────────────────────────────────────────────
    if (node.imageKey && !imageKeys.has(node.imageKey)) {
      warnings.push({
        severity: 'error',
        nodeId: node.id,
        message: `imageKey "${node.imageKey}" is not registered in BACKGROUND_IMAGES`,
      });
    }

    // ── Ending ID ──────────────────────────────────────────────────────────
    if (node.isEnding && node.endingId && !endingIds.has(node.endingId)) {
      warnings.push({
        severity: 'error',
        nodeId: node.id,
        message: `endingId "${node.endingId}" not found in ENDINGS`,
      });
    }

    if (node.isEnding && !node.endingId && node.id !== 'chapter1_end') {
      warnings.push({
        severity: 'warning',
        nodeId: node.id,
        message: 'Ending node has no endingId — will use node.id as fallback',
      });
    }

    // ── effectsOnEnter keys ────────────────────────────────────────────────
    if (node.effectsOnEnter) {
      for (const key of Object.keys(node.effectsOnEnter)) {
        if (!isKnownEffectKey(key)) {
          warnings.push({
            severity: 'warning',
            nodeId: node.id,
            message: `effectsOnEnter → unknown key "${key}"`,
          });
        }
      }
    }

    // ── Choices ────────────────────────────────────────────────────────────
    const localChoiceIds = new Set<string>();
    for (const choice of node.choices) {

      // Duplicate choice IDs within the same node (error, not just warning)
      if (localChoiceIds.has(choice.id)) {
        warnings.push({
          severity: 'error',
          nodeId: node.id,
          choiceId: choice.id,
          message: `Duplicate choice id "${choice.id}" within this node`,
        });
      }
      localChoiceIds.add(choice.id);

      // nextNode exists (__return__ is a sentinel resolved at runtime by GameContext)
      if (choice.nextNode !== '__return__' && !nodeIds.has(choice.nextNode)) {
        warnings.push({
          severity: 'error',
          nodeId: node.id,
          choiceId: choice.id,
          message: `nextNode "${choice.nextNode}" does not exist`,
        });
      }

      // endingTrigger points to a real node
      if (choice.endingTrigger && !nodeIds.has(choice.endingTrigger)) {
        warnings.push({
          severity: 'error',
          nodeId: node.id,
          choiceId: choice.id,
          message: `endingTrigger "${choice.endingTrigger}" does not exist`,
        });
      }

      // ── diceCheck outcome nodes ────────────────────────────────────────
      if (choice.diceCheck) {
        const dc = choice.diceCheck;

        if (!nodeIds.has(dc.successNode)) {
          warnings.push({
            severity: 'error',
            nodeId: node.id,
            choiceId: choice.id,
            message: `diceCheck.successNode "${dc.successNode}" does not exist`,
          });
        }

        if (!nodeIds.has(dc.failureNode)) {
          warnings.push({
            severity: 'error',
            nodeId: node.id,
            choiceId: choice.id,
            message: `diceCheck.failureNode "${dc.failureNode}" does not exist`,
          });
        }

        if (dc.criticalSuccessNode && !nodeIds.has(dc.criticalSuccessNode)) {
          warnings.push({
            severity: 'error',
            nodeId: node.id,
            choiceId: choice.id,
            message: `diceCheck.criticalSuccessNode "${dc.criticalSuccessNode}" does not exist`,
          });
        }

        if (dc.criticalFailureNode && !nodeIds.has(dc.criticalFailureNode)) {
          warnings.push({
            severity: 'error',
            nodeId: node.id,
            choiceId: choice.id,
            message: `diceCheck.criticalFailureNode "${dc.criticalFailureNode}" does not exist`,
          });
        }

        if (dc.difficulty < 1 || dc.difficulty > 30) {
          warnings.push({
            severity: 'warning',
            nodeId: node.id,
            choiceId: choice.id,
            message: `diceCheck.difficulty (${dc.difficulty}) is outside the expected range [1, 30]`,
          });
        }
      }

      // ── Requirements ──────────────────────────────────────────────────
      const req = choice.requirements;
      if (req) {
        for (const key of Object.keys(req)) {
          if (!isKnownRequirementKey(key)) {
            warnings.push({
              severity: 'warning',
              nodeId: node.id,
              choiceId: choice.id,
              message: `requirements → unknown key "${key}"`,
            });
          }
        }

        // Flag values must be non-empty strings
        const allFlagArrays = [
          ...(req.flags ?? []),
          ...(req.blockedFlags ?? []),
        ];
        for (const flag of allFlagArrays) {
          if (!flag || typeof flag !== 'string' || flag.trim() === '') {
            warnings.push({
              severity: 'error',
              nodeId: node.id,
              choiceId: choice.id,
              message: `requirements.flags / blockedFlags contains an empty or invalid flag`,
            });
          }
        }

        // Faction keys in requirements.factionRep
        if (req.factionRep) {
          for (const key of Object.keys(req.factionRep)) {
            if (!FACTION_KEYS.has(key)) {
              warnings.push({
                severity: 'error',
                nodeId: node.id,
                choiceId: choice.id,
                message: `requirements.factionRep → unknown faction "${key}"`,
              });
            }
          }
        }

        // Companion trust bounds: engine clamps 0–10
        if (req.miraTrust !== undefined && (req.miraTrust < 0 || req.miraTrust > 10)) {
          warnings.push({
            severity: 'error',
            nodeId: node.id,
            choiceId: choice.id,
            message: `requirements.miraTrust (${req.miraTrust}) is outside [0, 10] — companion trust is capped at 10 by the engine`,
          });
        }
        if (req.cainTrust !== undefined && (req.cainTrust < 0 || req.cainTrust > 10)) {
          warnings.push({
            severity: 'error',
            nodeId: node.id,
            choiceId: choice.id,
            message: `requirements.cainTrust (${req.cainTrust}) is outside [0, 10] — companion trust is capped at 10 by the engine`,
          });
        }
      }

      // ── Effects ───────────────────────────────────────────────────────
      if (choice.effects) {
        for (const key of Object.keys(choice.effects)) {
          if (!isKnownEffectKey(key)) {
            warnings.push({
              severity: 'warning',
              nodeId: node.id,
              choiceId: choice.id,
              message: `effects → unknown key "${key}"`,
            });
          }
        }

        // Companion trust effect bounds
        if (choice.effects.miraTrust !== undefined) {
          const resultTrust = (choice.effects.miraTrust ?? 0);
          if (Math.abs(resultTrust) > 10) {
            warnings.push({
              severity: 'warning',
              nodeId: node.id,
              choiceId: choice.id,
              message: `effects.miraTrust delta (${resultTrust}) is larger than the full scale — companion trust is capped at 10`,
            });
          }
        }
      }
    }

    // ── Non-ending nodes should have at least one choice ──────────────────
    if (!node.isEnding && node.choices.length === 0) {
      warnings.push({
        severity: 'warning',
        nodeId: node.id,
        message: 'Non-ending node has zero choices (dead end)',
      });
    }
  }

  return warnings;
}

// ─── Utility: story summary ───────────────────────────────────────────────────

export interface StorySummary {
  totalNodes: number;
  endingNodes: number;
  totalChoices: number;
  diceCheckNodes: number;
  chapters: string[];
  chapterCounts: Record<string, number>;
  locations: string[];
  imageKeys: string[];
}

export function getStorySummary(): StorySummary {
  const chapterCounts: Record<string, number> = {};
  const locations = new Set<string>();
  const imageKeysSet = new Set<string>();
  let endingNodes = 0;
  let totalChoices = 0;
  let diceCheckNodes = 0;

  for (const node of STORY_NODES) {
    chapterCounts[node.chapter] = (chapterCounts[node.chapter] ?? 0) + 1;
    locations.add(node.location);
    if (node.imageKey) imageKeysSet.add(node.imageKey);
    if (node.isEnding) endingNodes++;
    totalChoices += node.choices.length;
    if (node.choices.some((c) => c.diceCheck)) diceCheckNodes++;
  }

  return {
    totalNodes: STORY_NODES.length,
    endingNodes,
    totalChoices,
    diceCheckNodes,
    chapters: Object.keys(chapterCounts).sort(),
    chapterCounts,
    locations: [...locations].sort(),
    imageKeys: [...imageKeysSet].sort(),
  };
}

// ─── Utility: first node of each chapter ─────────────────────────────────────

export function getChapterEntryNodes(): Array<{ chapter: string; nodeId: string }> {
  const seen = new Set<string>();
  const result: Array<{ chapter: string; nodeId: string }> = [];
  for (const node of STORY_NODES) {
    if (!seen.has(node.chapter)) {
      seen.add(node.chapter);
      result.push({ chapter: node.chapter, nodeId: node.id });
    }
  }
  return result;
}
