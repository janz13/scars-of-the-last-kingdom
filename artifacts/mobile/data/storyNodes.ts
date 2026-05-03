// ══════════════════════════════════════════════════════════════════════════════
//  STORY NODES — Re-export barrel
//
//  All story content lives in artifacts/mobile/data/story/:
//
//    story/prologue.ts       — Prologue (The Blackout — three years before)
//    story/chapter1.ts       — Chapter 1  (The Ruined Station) ✓ complete
//    story/chapter2.ts       — Chapter 2  (The Surface Does Not Forgive) ✓ complete
//    story/chapter3.ts       — Chapter 3  (Children of the Tunnels) ✓ complete
//    story/chapter4.ts       — Chapter 4  (Saints in Iron) ✓ complete
//    story/chapter5.ts  ┐
//    story/chapter6.ts  │
//    ...                ├── Empty stubs — add content to these as written
//    story/chapter12.ts ┘
//    story/finalChapter1.ts  — Final Chapter 1 (The Vault entrance)
//    story/finalChapter2.ts  — Final Chapter 2 (all endings)
//    story/diceOutcomes.ts   — Dice check success/failure outcome nodes
//    story/companionEvents.ts — Companion event nodes
//    story/hallucinations.ts  — Corruption hallucination nodes
//    story/index.ts          — Combines all of the above, exports STORY_NODES
//
//  WHERE TO ADD NEW NODES:
//  • Prologue content         → story/prologue.ts
//  • Chapter 1 content        → story/chapter1.ts
//  • Chapter 2 content        → story/chapter2.ts
//  • Chapter 3–4 content      → story/chapter3.ts / chapter4.ts
//  • Future chapters (5–12)   → story/chapter5.ts through chapter12.ts
//  • Endgame content          → story/finalChapter1.ts / finalChapter2.ts
//  • Dice outcome nodes       → story/diceOutcomes.ts
//  • Companion events         → story/companionEvents.ts
//  • Hallucination nodes      → story/hallucinations.ts
//
//  HOW TO ADD A NEW CHAPTER FILE:
//  1. Open story/chapterN.ts (already exists for chapters 5–12)
//  2. Add StoryNode objects inside the exported array
//  3. If creating a brand-new file, import it in story/index.ts and spread it
//  4. Run: pnpm --filter @workspace/mobile run typecheck → zero errors = safe
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
