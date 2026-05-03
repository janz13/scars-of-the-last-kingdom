// ══════════════════════════════════════════════════════════════════════════════
//  STORY NODES — Re-export barrel
//
//  All story content now lives in artifacts/mobile/data/story/:
//
//    story/chapter1.ts       — Chapter 1 nodes
//    story/chapter2.ts       — Chapter 2 nodes
//    story/chapter3.ts  ┐
//    story/chapter4.ts  │
//    ...                ├── Empty placeholders — add content to these
//    story/chapter12.ts ┘
//    story/finalChapter1.ts  — Endgame part 1 (Vault entrance)
//    story/finalChapter2.ts  — Endgame part 2 (all endings)
//    story/diceOutcomes.ts   — Dice check success/failure outcome nodes
//    story/index.ts          — Combines all chapters, exports STORY_NODES
//
//  HOW TO ADD A NEW CHAPTER:
//  1. Open story/chapterN.ts (or create a new file based on any placeholder)
//  2. Add your StoryNode objects inside the exported array
//  3. If it is a new file, import it in story/index.ts and spread it in
//  4. Run: pnpm --filter @workspace/mobile run typecheck
//
//  HOW TO ADD NODES TO AN EXISTING CHAPTER:
//  1. Open the relevant story/chapterN.ts file
//  2. Paste your new node between the ADD NODES HERE markers
//  3. Run: pnpm --filter @workspace/mobile run typecheck
//
//  The game engine, context, and validator all import from this file —
//  do not change those imports. Redirect all content changes to story/.
// ══════════════════════════════════════════════════════════════════════════════

export {
  STORY_NODES,
  DICE_OUTCOME_NODES,
  getNodeById,
  getStartNodeId,
} from './story/index';
