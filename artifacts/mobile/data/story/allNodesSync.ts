import type { StoryNode } from '../types';
import { PROLOGUE_NODES } from './prologue';
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
import { EPILOGUE_NODES } from './epilogue';
import { ENABLE_EXPANSION } from '../../constants/featureFlags';
import { DICE_OUTCOME_NODES } from './diceOutcomes';
import { HALLUCINATION_NODES } from './hallucinations';
import { COMPANION_EVENT_NODES } from './companionEvents';

// ══════════════════════════════════════════════════════════════════════════════
//  ALL NODES SYNC — Node.js / Audit Synchronous Graph
//
//  This file is EXCLUSIVELY for Node.js scripts (fullAudit.mts, tests, CLI tools).
//  It imports all 1,433 nodes synchronously.
//  DO NOT IMPORT THIS FILE IN CLIENT APPLICATION CODE (artifacts/mobile/app/...).
// ══════════════════════════════════════════════════════════════════════════════

export const STORY_NODES: StoryNode[] = [
  ...PROLOGUE_NODES,
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
  ...(ENABLE_EXPANSION ? EPILOGUE_NODES : []),
  ...DICE_OUTCOME_NODES,
  ...HALLUCINATION_NODES,
  ...COMPANION_EVENT_NODES,
];

const NODE_MAP = new Map<string, StoryNode>(STORY_NODES.map((n) => [n.id, n]));

export function getNodeById(id: string): StoryNode | undefined {
  return NODE_MAP.get(id);
}

export function getStartNodeId(): string {
  return 'prologue_start';
}

export { DICE_OUTCOME_NODES };
