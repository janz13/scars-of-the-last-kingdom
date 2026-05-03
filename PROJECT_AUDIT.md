# PROJECT AUDIT — Scars of the Last Kingdom
**Audit Date:** 2026-05-03  
**Auditor:** Automated code review (all source files read)  
**Scope:** Full codebase — story engine, save/load, dice, companions, factions, endings, UI, Android/PWA readiness

---

## Executive Summary

The codebase is **structurally sound and production-playable**. TypeScript passes with zero errors. The dark-manhwa UI, dice system, save/load, and companion/faction tracking all function correctly. Six confirmed bugs were found and fixed during this audit. Five additional structural risks are documented as tech-debt for future chapters.

---

## Systems Audited

| System | Status | Notes |
|---|---|---|
| Story Engine (GameContext, gameEngine) | ✅ Healthy | One anti-pattern fixed (initiateDiceRoll) |
| Save / Load (saveSystem) | ✅ Fixed | Added schema migration + route history cap |
| Dice System (diceEngine, DiceRollOverlay) | ✅ Healthy | D20+stat, crit/fail, Luck reroll working |
| Companion System | ✅ Healthy | Trust scale 0–10, presence flags correct |
| Faction System | ✅ Healthy | 5 factions, ±100 range, all validated |
| Ending System | ✅ Fixed | ENDING_ICONS corrected to match EndingType |
| Story Validator (storyValidator) | ✅ Fixed | Now validates diceCheck outcome nodes + global duplicate choice IDs |
| Character Creator | ✅ Healthy | 7 classes, 7 backgrounds, traits collected |
| UI / Animations | ✅ Healthy | Dark glass-panel aesthetic, Reanimated-free |
| Developer Panel | ✅ Healthy | Full jump/edit/validate/faction/companion controls |
| Android / PWA Readiness | ✅ Healthy | app.json, manifest.json, sw.js, +html.tsx complete |
| Writer Template (storyNodeTemplate.js) | ✅ Fixed | Companion trust scale corrected to 0–10 |
| MainMenu Footer Stats | ✅ Fixed | Now computed dynamically, not hardcoded |

---

## Bugs Fixed (6 total)

### BUG-01 — ENDING_ICONS type mismatch (EndingScreen.tsx)
**Severity:** Medium — wrong icon shown for most non-death endings  
**Root cause:** ENDING_ICONS had `exile` and `discovery` (obsolete types) and was missing `sacrifice`, `tyrant`, `companion`, `faction`, `secret`, `wanderer` from the current EndingType union. The runtime fallback to `alert-circle` prevented crashes, but every non-death ending showed the wrong icon.  
**Fix:** Replaced ENDING_ICONS with a complete map matching all 10 current EndingType values. Removed obsolete keys.

---

### BUG-02 — initiateDiceRoll double setState anti-pattern (GameContext.tsx)
**Severity:** Medium — calling setState twice just to read current state  
**Root cause:** `initiateDiceRoll` called `setState(prev => { /* read prev, no-op */ return prev; })` twice — once to access `prev.currentNodeId` and once to call `setPendingDiceRoll`. This is an anti-pattern: it triggers two render cycles and relies on implementation detail of how React batches no-op setState calls.  
**Fix:** Added `stateRef` (a `useRef` kept in sync with state via `useEffect`). `initiateDiceRoll` now reads `stateRef.current` directly, calls `setPendingDiceRoll` once, and doesn't touch `setState` at all.

---

### BUG-03 — No save schema migration (saveSystem.ts)
**Severity:** High — adding any new field to GameState would silently corrupt all existing saves  
**Root cause:** `loadGame()` returned `JSON.parse(data) as GameState` with no validation. Any field added to GameState after a player's save was written would be `undefined`, crashing the code that accessed it.  
**Fix:** Added `migrateSave()` which deep-merges the stored JSON with `SAVE_DEFAULTS`. Every nested object (settings, companions, stats, inventory, factionRep) is individually merged, so new fields appear with correct defaults without touching existing data. Guards also added for type safety (flags must be a plain object, routeHistory/endingsDiscovered must be arrays).

---

### BUG-04 — Unbounded routeHistory (saveSystem.ts + GameContext.tsx)
**Severity:** Low-Medium — in a very long playthrough routeHistory could grow to hundreds of entries and bloat AsyncStorage  
**Root cause:** Every choice appended to `routeHistory` with no cap. The history is serialized to AsyncStorage on every save.  
**Fix:** `saveGame()` trims `routeHistory` to the last 500 entries before serializing. `migrateSave()` also applies the same cap on load in case older saves were already bloated.

---

### BUG-05 — storyValidator missing diceCheck outcome node validation (storyValidator.ts)
**Severity:** Medium — broken dice outcome node IDs would not be caught by the developer panel validator  
**Root cause:** `validateStory()` only checked `choice.nextNode` and `choice.endingTrigger`, but not `diceCheck.successNode`, `diceCheck.failureNode`, `diceCheck.criticalSuccessNode`, or `diceCheck.criticalFailureNode`. A typo in any dice outcome node ID would navigate the player to a dead node with no choices.  
**Fix:** Added four diceCheck outcome node checks (all four fields, with optional handling for the crit variants). Also added a difficulty range check (warns if DC is outside [1, 30]), and escalated the companion trust out-of-range warning to an error (since the engine enforces a hard 0–10 cap).  
**Bonus fix:** Added a cross-node global duplicate choice ID check. Previously only intra-node duplicates were detected.

---

### BUG-06 — Writer template used wrong companion trust scale (storyNodeTemplate.js)
**Severity:** Medium — any node written from the template would have unsatisfiable trust requirements  
**Root cause:** The template showed `miraTrust: 40`, `miraTrust: 70`, `miraTrust: 50` as example requirements and `miraTrust: 12`, `miraTrust: 20` as deltas. The engine clamps companion trust to [0, 10]. Requirements above 10 can never be satisfied; deltas above 3 are wasteful since they saturate immediately.  
**Fix:** All example values corrected to the 0–10 scale. The effects reference and requirements reference sections now clearly document the scale with typical delta ranges (small: ±1, meaningful: ±2, sacrifice: ±3) and requirement thresholds (low: 3, meaningful: 5, high: 7, maximum bond: 9).  
**Bonus fix:** MainMenu footer stats updated to compute dynamically from `getStorySummary()`, `ENDINGS.length`, and `CLASSES.length` instead of the hardcoded string `"175 NODES · 21 ENDINGS · 7 CLASSES"`.

---

## Tech-Debt / Structural Risks (not fixed — safe to defer)

### RISK-01 — shouldTriggerEnding and getAutoRedirect are hardcoded (gameEngine.ts)
**Impact:** Adding new conditional endings or auto-redirects requires editing engine code directly, not just story data.  
**Current state:** `shouldTriggerEnding` only handles `ending_relic_awakening` with bespoke logic. `getAutoRedirect` only checks `saints_registered` and `saints_submit` by hardcoded string.  
**Recommendation (Chapter 2):** Move trigger conditions into a `CONDITIONAL_ENDINGS` data table (e.g., `{ triggerId, condition: (state, choice) => boolean }`). Auto-redirects could be expressed as a `redirectConditions` array checked after every node transition.

---

### RISK-02 — Personality traits collected but never used (GameContext.tsx, characterOptions.ts)
**Impact:** Cosmetic only — `personalityTrait` is stored on the Character object but is never read by `checkRequirements`, `applyEffects`, or `buildStartingStats`.  
**Recommendation:** Either wire traits into `ChoiceRequirements` (e.g., `traits: ['pragmatic']`) or remove the field from character creation to avoid player expectation that it matters.

---

### RISK-03 — Luck reroll is global one-use, not per-chapter (flags: 'dice_reroll_used')
**Impact:** A player who uses the Luck reroll in Chapter 1 can never use it again in any future chapter.  
**Recommendation:** If chapters are designed as distinct arcs, consider a `dice_reroll_used_ch1` / `dice_reroll_used_ch2` pattern, or reset the reroll flag at chapter transitions.

---

### RISK-04 — storyNodes.ts is a single 5,000+ line file
**Impact:** As content grows toward 500+ nodes (estimated Chapter 2 target), this becomes unwieldy for writers and slow for editors to navigate.  
**Recommendation:** Split into per-chapter modules (`storyNodes.ch1.ts`, `storyNodes.ch2.ts`) that each export a partial array, then merge them in a barrel file (`storyNodes.ts`). The validator and `getNodeById` are already designed to work with the full merged array.

---

### RISK-05 — getNodeById is a linear search through 5,000+ line array (storyNodes.ts)
**Impact:** `getNodeById` uses `STORY_NODES.find()`, which is O(n). It's called multiple times per render via `getChoicesWithStatus`. At 500+ nodes this is measurably slow on low-end Android.  
**Recommendation:** Build a `Map<string, StoryNode>` at module initialization time (one pass) and use `map.get(id)` for O(1) lookup everywhere. This is a one-line change to `getNodeById`.

---

## Android / PWA Readiness

| Item | Status |
|---|---|
| `app.json` package, versionCode, permissions | ✅ Complete |
| Adaptive icon (foreground + background) | ⚠️ Placeholder PNG — final artwork needed |
| Splash screen | ✅ Dark gradient configured |
| `public/manifest.json` | ✅ Present |
| `public/sw.js` (service worker) | ✅ Present |
| `app/+html.tsx` (PWA meta/viewport) | ✅ Present |
| Android package name | ✅ `com.scarsofthelastkingdom.app` |
| Build instructions | ✅ `ANDROID_BUILD_NOTES.md` |

---

## Validation Gate

After any story content addition, run:

```
pnpm --filter @workspace/mobile run typecheck
```

Zero errors = structurally valid. Then open Developer Mode in-game → STORY VALIDATION to see graph-level warnings (broken node links, missing ending IDs, diceCheck outcome nodes that don't exist, out-of-range companion trust requirements).

---

## Node / Content Stats (as of audit date)

| Metric | Count |
|---|---|
| Total story nodes (incl. dice outcomes) | 187 |
| STORY_NODES (main graph) | 175 |
| DICE_OUTCOME_NODES | 12 |
| Dice check choices | 6 |
| Registered endings (ENDINGS array + chapter1_end) | 6 (21 planned) |
| Chapters | 2 (Chapter 1 complete, Chapter 2 begun) |
| Playable character classes | 7 |
| Backgrounds | 7 |
| Companion NPCs | 2 (Mira, Cain) |
| Factions | 5 |
| Background images registered | 13 |

---

*Audit complete. All 6 bugs fixed. TypeScript: 0 errors.*
