import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  FINAL CHAPTER 1 — THE VAULT (Part One)
//
//  This is the first half of the endgame chapter sequence.
//  All major faction arcs converge here. The Vault entrance is reached.
//
//  HOW TO ADD NODES TO THIS CHAPTER:
//  1. Copy a node template from src/data/storyNodeTemplate.js
//  2. Paste it inside the FINAL_CHAPTER_1_NODES array below (before the closing ];)
//  3. Give every node and choice a unique id (snake_case)
//  4. Run: pnpm --filter @workspace/mobile run typecheck
//  5. Zero errors = safe to play
//
//  FINAL CHAPTER 1 DESIGN NOTES (from story bible):
//  - Starting node id: 'final_chapter1_start'
//  - All factions are present at the Vault entrance for different reasons
//  - Companion final decision: stay or go, together or apart
//  - The question is delivered through the mark, not through dialogue
// ══════════════════════════════════════════════════════════════════════════════

export const FINAL_CHAPTER_1_NODES: StoryNode[] = [
  // ── ADD NODES BELOW THIS LINE ──────────────────────────────────────────────

  // ── ADD NODES ABOVE THIS LINE ──────────────────────────────────────────────
];
