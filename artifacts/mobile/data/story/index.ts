import type { StoryNode } from '../types';
import { CHAPTER_1_NODES } from './chapter1';
import { CHAPTER_2_NODES } from './chapter2';
import { CHAPTER_3_NODES } from './chapter3';
import { CHAPTER_4_NODES } from './chapter4';
import { CHAPTER_5_NODES } from './chapter5';
import { CHAPTER_6_NODES } from './chapter6';
import { CHAPTER_7_NODES } from './chapter7';
import { CHAPTER_8_NODES } from './chapter8';
import { CHAPTER_9_NODES } from './chapter9';
import { CHAPTER_10_NODES } from './chapter10';
import { CHAPTER_11_NODES } from './chapter11';
import { CHAPTER_12_NODES } from './chapter12';
import { FINAL_CHAPTER_1_NODES } from './finalChapter1';
import { FINAL_CHAPTER_2_NODES } from './finalChapter2';
import { DICE_OUTCOME_NODES } from './diceOutcomes';

// ══════════════════════════════════════════════════════════════════════════════
//  STORY INDEX — Master node registry
//
//  This file combines every chapter's nodes into one flat array used by
//  the game engine. To add a new chapter:
//
//  STEP 1 — Create the chapter file:
//    Duplicate any placeholder file in this directory, e.g. chapter3.ts
//    Give it a unique export name (CHAPTER_3_NODES)
//
//  STEP 2 — Register it here:
//    Import it above (already done for chapters 3–12 and final chapters)
//    Add it to the spread in STORY_NODES below
//
//  STEP 3 — Typecheck:
//    pnpm --filter @workspace/mobile run typecheck
//    Zero errors = safe to ship
//
//  NODE COUNTS (updated automatically by the validator in Developer Mode):
//  - Each chapter array can hold as many nodes as needed — no limit
//  - Dice outcome nodes live in diceOutcomes.ts, not in chapter files
//  - The validator will catch broken nextNode links across all chapters
// ══════════════════════════════════════════════════════════════════════════════

export const STORY_NODES: StoryNode[] = [
  ...CHAPTER_1_NODES,
  ...CHAPTER_2_NODES,
  ...CHAPTER_3_NODES,
  ...CHAPTER_4_NODES,
  ...CHAPTER_5_NODES,
  ...CHAPTER_6_NODES,
  ...CHAPTER_7_NODES,
  ...CHAPTER_8_NODES,
  ...CHAPTER_9_NODES,
  ...CHAPTER_10_NODES,
  ...CHAPTER_11_NODES,
  ...CHAPTER_12_NODES,
  ...FINAL_CHAPTER_1_NODES,
  ...FINAL_CHAPTER_2_NODES,
  ...DICE_OUTCOME_NODES,

  // ── ADD A NEW CHAPTER HERE ──────────────────────────────────────────────
  // 1. Create artifacts/mobile/data/story/chapterN.ts
  // 2. Import CHAPTER_N_NODES above
  // 3. Spread it into this array: ...CHAPTER_N_NODES,
  // ────────────────────────────────────────────────────────────────────────
];

// O(1) lookup map — built once at startup, used by getNodeById on every render
const NODE_MAP = new Map<string, StoryNode>(STORY_NODES.map((n) => [n.id, n]));

export function getNodeById(id: string): StoryNode | undefined {
  return NODE_MAP.get(id);
}

export function getStartNodeId(): string {
  return 'chapter1_start';
}

export { DICE_OUTCOME_NODES };
