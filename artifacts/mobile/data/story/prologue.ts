import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  PROLOGUE — THE BLACKOUT
//
//  Three years before the main story. The player experiences the night the
//  city-wide blackout occurred — the violet pulse, the stampede, the moment
//  the Archive door unsealed itself for the first time in three centuries.
//  A series of vignettes, one per playable background, each ending with the
//  player underground and marked. The prologue always advances to Chapter 1.
//
//  DESIGN NOTES (from chapterRoadmap.ts / STORY_BIBLE.md):
//  - Starting node id: 'prologue_start'
//  - The prologue has no resource drain — survival mechanics are suspended
//  - Each background class gets its own vignette branch
//  - No companion nodes — companions are not yet met
//  - No endings — every branch funnels to 'chapter1_start'
//  - Flags introduced: prologue_complete, background_vignette_played,
//    knows_blackout_origin
//
//  HOW TO ADD NODES TO THIS CHAPTER:
//  1. Create your StoryNode object inside the PROLOGUE_NODES array below
//     (between the ADD NODES markers)
//  2. Give every node and every choice a unique id (snake_case, no spaces)
//  3. Use  chapter: 'Prologue'  on every node
//  4. The final node in each branch must have  nextNode: 'chapter1_start'
//  5. Run: pnpm --filter @workspace/mobile run typecheck
//  6. Zero errors = safe to play
//
//  NODE TEMPLATE (copy-paste starter):
//
//  {
//    id: 'prologue_[scene_name]',
//    chapter: 'Prologue',
//    title: '[Scene Title]',
//    location: '[Location name]',
//    imageKey: '[existing key from constants/images.ts]',
//    speaker: 'Narrator',
//    text: '[Scene text]',
//    effectsOnEnter: {},
//    choices: [
//      {
//        id: 'prologue_[choice_name]',
//        text: '[Player action text]',
//        nextNode: '[next node id]',
//      },
//    ],
//  },
// ══════════════════════════════════════════════════════════════════════════════

export const PROLOGUE_NODES: StoryNode[] = [
  // ── ADD NODES BELOW THIS LINE ──────────────────────────────────────────────

  // ── ADD NODES ABOVE THIS LINE ──────────────────────────────────────────────
];
