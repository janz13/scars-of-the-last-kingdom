import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  FINAL CHAPTER 2 — THE ANSWER
//
//  This is the second half of the endgame: the player's answer, the faction
//  resolutions, and all 10 ending nodes. Every ending type must be present
//  here — see endings.ts for the registered ending metadata.
//
//  HOW TO ADD NODES TO THIS CHAPTER:
//  1. Copy a node template from src/data/storyNodeTemplate.js
//  2. Paste it inside the FINAL_CHAPTER_2_NODES array below (before the closing ];)
//  3. Give every node and choice a unique id (snake_case)
//  4. Run: pnpm --filter @workspace/mobile run typecheck
//  5. Zero errors = safe to play
//
//  FINAL CHAPTER 2 DESIGN NOTES (from story bible):
//  - Contains all 10 ending node types: death, betrayal, sacrifice, tyrant,
//    savior, companion, faction, secret, corruption, wanderer
//  - Ending nodes must have isEnding: true, endingType, endingId
//  - endingId must match an entry in artifacts/mobile/data/endings.ts
//  - All ending paths must be reachable from final_chapter1_start
//  - The "true" endings (savior, secret) require high trust + specific flags
// ══════════════════════════════════════════════════════════════════════════════

export const FINAL_CHAPTER_2_NODES: StoryNode[] = [
  // ── ADD NODES BELOW THIS LINE ──────────────────────────────────────────────

  // ── ADD NODES ABOVE THIS LINE ──────────────────────────────────────────────
];
