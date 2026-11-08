/**
 * Image Preloader Logic — Scars of the Last Kingdom
 * Pure logic for extracting destination node IDs and image keys from story choices.
 * Free of React / React Native UI dependencies so it can be tested in Node.js unit tests.
 */

import type { Choice, GameState, StoryNode } from '../data/types';
import { getNodeById } from '../data/storyNodes';

/**
 * Extracts all unique destination node IDs from a list of choices,
 * including direct nextNode, endingTrigger, and all diceCheck outcome branches.
 */
export function extractDestinationNodeIds(
  choices: Array<{ choice: Choice } | Choice> | undefined | null,
  state?: GameState
): string[] {
  if (!choices || !Array.isArray(choices)) return [];

  const nodeIds = new Set<string>();

  for (const item of choices) {
    if (!item) continue;
    const choice: Choice = 'choice' in item ? (item as any).choice : item;
    if (!choice) continue;

    // Direct nextNode (handling choice.nextNode and defensively choice.nextNodeId)
    const directTarget = (choice as any).nextNode ?? (choice as any).nextNodeId;
    if (typeof directTarget === 'string' && directTarget.trim().length > 0) {
      if (directTarget === '__return__') {
        const returnId = state?.pendingReturnNodeId ?? state?.currentNodeId;
        if (returnId) nodeIds.add(returnId);
      } else {
        nodeIds.add(directTarget.trim());
      }
    }

    // Ending trigger override
    if (typeof choice.endingTrigger === 'string' && choice.endingTrigger.trim().length > 0) {
      nodeIds.add(choice.endingTrigger.trim());
    }

    // Dice check branch targets
    const dice = choice.diceCheck;
    if (dice && typeof dice === 'object') {
      if (typeof dice.successNode === 'string' && dice.successNode.trim().length > 0) {
        nodeIds.add(dice.successNode.trim());
      }
      if (typeof dice.failureNode === 'string' && dice.failureNode.trim().length > 0) {
        nodeIds.add(dice.failureNode.trim());
      }
      if (typeof dice.criticalSuccessNode === 'string' && dice.criticalSuccessNode.trim().length > 0) {
        nodeIds.add(dice.criticalSuccessNode.trim());
      }
      if (typeof dice.criticalFailureNode === 'string' && dice.criticalFailureNode.trim().length > 0) {
        nodeIds.add(dice.criticalFailureNode.trim());
      }
    }
  }

  return Array.from(nodeIds);
}

/**
 * Resolves destination node IDs to unique background image keys.
 * Filters out empty keys, non-existent nodes, and optionally the current scene's imageKey.
 */
export function extractDestinationImageKeys(
  choices: Array<{ choice: Choice } | Choice> | undefined | null,
  getNode: (id: string) => StoryNode | undefined = getNodeById,
  currentImageKey?: string,
  state?: GameState
): string[] {
  const destNodeIds = extractDestinationNodeIds(choices, state);
  const imageKeys = new Set<string>();

  for (const id of destNodeIds) {
    try {
      const node = getNode(id);
      if (node && typeof node.imageKey === 'string' && node.imageKey.trim().length > 0) {
        const key = node.imageKey.trim();
        // Skip current node's imageKey — it is already loaded or active
        if (currentImageKey && key === currentImageKey) continue;
        imageKeys.add(key);
      }
    } catch {
      // Non-fatal, continue with remaining nodes
    }
  }

  return Array.from(imageKeys);
}
