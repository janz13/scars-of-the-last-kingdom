# Scars of the Last Kingdom — Full Audit Pull Request & Bug-Fix Checklist

- **Live Application Audited:** [Scars of the Last Kingdom (v1.0 — Public Prototype)](https://janz13.github.io/scars-of-the-last-kingdom/)
- **Source Repository:** [janz13/scars-of-the-last-kingdom](https://github.com/janz13/scars-of-the-last-kingdom)
- **Companion Patch Utility:** `fix_scars_audit_bugs.py`

## 1. Executive Summary of Patch Scope

During a simultaneous five-agent live playthrough audit of [Scars of the Last Kingdom](https://janz13.github.io/scars-of-the-last-kingdom/) covering 11 playthrough runs and 10 unlocked endings across all three playable chapters, 12 functional, state-machine, math, and UI bugs were identified. This pull-request checklist maps each defect in [janz13/scars-of-the-last-kingdom](https://github.com/janz13/scars-of-the-last-kingdom) to its root cause, exact code fix, and post-patch verification test.

| Bug ID | Severity | Subsystem in `janz13/scars-of-the-last-kingdom` | Defect Summary | Fix Type |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | High | Prologue Scene 1 (`The Night the City Stopped`) | Only 3 of 7 backgrounds (`Wasteland Orphan`, `Exiled Soldier`, `Forgotten Scholar`) have prologue choices; picking `Fallen Noble`, `Underground Medic`, `Black Market Courier`, or `Runaway Experiment` lacks explicit origin mapping and unguarded companion trust penalties can apply when companions are absent. | Story Node + Reducer Fix |
| **BUG-02** | High | Chapter 3 (`The Rat King's Domain`, `The Gate`, `Tollpaid`) | Unrecruited Cain (`met_cain == true`, `cain.present == false`) is injected into Chapter 3 dialogue, shift-timing choices, and the `Tollpaid` ending. | State Guard Fix |
| **BUG-03** | High | Chapter 2 (`Camp on the Surface`, `The Registered Sinner`) | Unrecruited Mira (`mira.present == false` when skipping the East Wing Clinic) spawns in the Chapter 2 night camp (`Talk to Mira before sleeping`) and ending epilogue. | State Guard Fix |
| **BUG-04** | High | Chapter 3 (`Meeting Sera — The Hungry Girl`) | Clicking `[1] Give her food from your pack` deducts `-5` (`corruption: -5` / `food: -2`) without `food: 1` requirement instead of deducting `-1 Food`. | Node Effect Key Fix |
| **BUG-05** | High | D20 Skill Check Engine (`Flooded Tunnel STR DC 13`) | D20 attribute modifier uses a steep bracket table (`stat 5 -> -2`, `stat 7 -> -1`) and ignores personality trait modifiers instead of `(effectiveStat - 5) / 2` with background + trait bonuses. | Roll Formula Fix |
| **BUG-06** | Medium | Ch. 2 (`Western Dept. Store`) & Ch. 3 (`Candle Market`) | Supply trade options output narrative confirmation of a trade without mutating `Water`/`Scrap` or checking `scrap: 1`. | Node Effect Delta Fix |
| **BUG-07** | Medium | Main Menu, Credits, Route Codex & Chapter Select | Conflicting totals across screens: Main Menu/Ending Banner shows `268 Endings`, Route Codex sums to `244 Endings`, and Chapter Select shows hardcoded totals. | Derived Metadata Selector |
| **BUG-08** | Medium | Main Menu -> `CHAPTER SELECT` Modal | Completing Chapter 2 and Chapter 3 never persists unlocked chapters across runs in `CHAPTER SELECT` (`localStorage` `scars_meta_progress`). | `localStorage` Unlock Hook |
| **BUG-09** | Medium | Chapter 2 (`Surface Junction` Hub) | Option `[1] Follow Mira north...` remains enabled after returning to the hub, creating an infinite loop for top-option navigation. | Hub Completion Flag |
| **BUG-10** | Medium | Top-Right HUD -> Inventory Modal (`Consumables`) | `Food`, `Water`, and `Medicine` cards are read-only badges with no click action to restore Hunger, Thirst, or Health (and no tooltip explaining story gate usage). | UI Action / Tooltip Fix |
| **BUG-11** | Low | Settings Modal (`SAVE SLOTS`) & Flag-Locked Choices | Clicking `LOAD` on Manual Slots 1–3 requires confirmation / fails to close the Settings overlay cleanly; story-flag locks display generic `(Locked: Missing required condition)`. | Modal Callback & Lock Label |
| **BUG-12** | Low | Ch. 1 (`The Collapse Point`), Hub Lists & Prose Box | Truncated word `"You make it throug"`, right-edge prose clipping, scroll hitbox offset on 7–13 item hubs, and D20 rolls ordered above free class/origin bypasses. | Copy, CSS & Choice Order |

---

## 2. High-Severity Logic & State-Machine Fixes (`BUG-01` to `BUG-05`)

- [x] **BUG-01: Add Prologue Origin Options for All 7 Backgrounds & Remove Fallback Trust Penalty**
  - Group all 7 playable backgrounds across the 3 Prologue Scene 1 (`prologue_start`) entry choices (`Wasteland Orphan / Black Market Courier / Underground Medic`, `Exiled Soldier / Fallen Noble`, `Forgotten Scholar / Runaway Experiment`) and add dedicated origin choices for `Fallen Noble`, `Underground Medic`, `Black Market Courier`, and `Runaway Experiment`.
  - Guard companion trust penalties in `applyEffects()` so negative trust deltas only apply when `state.companions[companionId].present === true` and not during the solo `Prologue`.

- [x] **BUG-02: Enforce `companions.cain.present` / `cain_joins_party` Guard in Chapter 3 & Ending Text**
  - Require `cainPresent: true` and `flags: ['cain_joins_party']` on Chapter 3 Cain tactical/shift choices (`c3_take_cain_intel`, `c3_question_cain_intel`, `c3_cain_shift_approach`) and dynamically strip unrecruited Cain/Mira lines from `c3_saints_patrol_spotted`, `c3_cain_tactical_moment`, and `c3_end_paid_passage` (`Tollpaid`).

- [x] **BUG-03: Enforce `companions.mira.present` / `mira_joins_party` Guard in Chapter 2 Surface Camp & Epilogues**
  - Require `miraPresent: true` and `cainPresent: true` on `c2_camp_talk_mira` and `c2_camp_talk_cain` in `c2_surface_camp`, and dynamically adapt companion text in `c2_surface_camp` and `c2_ending_saints_enlisted` (`The Registered Sinner`).

- [x] **BUG-04: Fix Resource Key When Feeding Sera in Chapter 3 (`food: -1` Instead of `-5`)**
  - Add `requirements: { food: 1 }` and `effects: { food: -1, morale: 2, hollowChildren: 10, miraTrust: 2, setFlags: ['fed_sera'] }` on `c3_feed_sera` in `c3_sera_encounter`.

- [x] **BUG-05: Include Background & Trait Attribute Bonuses in D20 Skill Check Modifier Calculation**
  - Export `getEffectiveStat(state, stat)` in `diceEngine.ts` combining base class stat + background bonus + personality trait bonus, and use it in `resolveDiceCheck()`.

---

## 3. Medium-Severity Mechanics, Economy & Metadata Fixes (`BUG-06` to `BUG-10`)

- [x] **BUG-06: Wire Inventory Deltas to Chapter 2 & Chapter 3 Market Supply Trades**
  - In `c2_trade_mark_info`, grant `food`, `water`, `medicine`, and `hollowChildren` rep.
  - In `c3_trade_supplies`, require `scrap: 1` and apply `scrap: -1, food: 1, water: 1, medicine: 1, hollowChildren: 8`.

- [x] **BUG-07: Reconcile Node & Ending Counts Dynamically Across All Menus**
  - Export `TOTAL_PLAYABLE_NODES` and `TOTAL_REGISTERED_ENDINGS` and use `STORY_ENDINGS` (`244` endings) and `getStorySummary().totalNodes` across `MainMenu.tsx`, `CreditsScreen.tsx`, `ChapterRoadmapScreen.tsx`, `EndingScreen.tsx`, and `RouteCodexScreen.tsx`.

- [x] **BUG-08: Persist Chapter Completion Flags to Unlock Chapter 2 & Chapter 3 in `CHAPTER SELECT`**
  - Persist `unlockedChapters` to `localStorage` (`scars_meta_progress`) on chapter transitions and endings, and merge persisted chapters into `getUnlockedChapters(state)`.

- [x] **BUG-09: Mark Chapter 2 Surface Junction Clinic & Checkpoint Routes as `onceOnly` (`blockedFlags`)**
  - Add `blockedFlags: ['visited_mira_clinic_route']` and `setFlags: ['visited_mira_clinic_route']` to `c2_follow_mira` (and `visited_cain_checkpoint_route` to `c2_follow_cain`) in `c2_surface_junction`.

- [x] **BUG-10: Enable Consumable Item Usage in Inventory Modal**
  - Add `useConsumable('food' | 'water' | 'medicine')` in `GameContext.tsx` and render interactive `USE (+15)` / `USE (+20)` buttons and a story-gate stock advisory in `InventoryPanel.tsx`.

---

## 4. UI/UX, Save-Load & Polish Fixes (`BUG-11` & `BUG-12`)

- [x] **BUG-11: Auto-Close Settings Modal on Manual Save Load & Clarify Flag Lock Labels**
  - Immediately close the Settings modal (`setScreen('game')` / `onClose()`) when loading a manual save slot in `SettingsPanel.tsx` and `GameContext.tsx`, and map story flags to human-readable requirement labels in `gameEngine.ts`.

- [x] **BUG-12: Fix Chapter 1 Typo, Viewport Clipping & Choice Priority Ordering**
  - Ensure `"You make it through"` has no truncation in `chapter1.ts`, add right-edge prose padding (`paddingRight: 24`) and bottom choice scroll padding (`paddingBottom: 24`) in `StoryPanel.tsx`, and sort unlocked `[Class]` and `[Background]` perk choices to the top (`[1]`) in `getChoicesWithStatus()`.
