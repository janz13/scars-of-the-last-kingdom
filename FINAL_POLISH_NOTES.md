# FINAL POLISH NOTES — Scars of the Last Kingdom
## Public Prototype — May 2026

---

## Overview

This document records all UI/UX and content polish changes made to prepare the game for a public prototype presentation. Changes are grouped by area.

---

## 1. Content Warning Screen

**New screen: `ContentWarningScreen.tsx`**

- Shown on first launch only (tracked via `AsyncStorage` key `@scars_content_warning_v1`).
- Subsequent launches skip directly to the main menu.
- Lists five content categories: violence/death, mental health themes, moral ambiguity, companion loss, disturbing text imagery.
- Animated entrance with staggered button fade-in.
- Confirm button: "I UNDERSTAND — ENTER THE WORLD" — calls `markContentWarningSeen()` then navigates to main menu.
- Footer note: "This warning will not appear again."

---

## 2. Main Menu

**File: `MainMenu.tsx`**

### Button changes
| Old label       | New label              | Notes                                      |
|-----------------|------------------------|--------------------------------------------|
| `NEW GAME`      | `START NEW TIMELINE`   | Lore-consistent; implies parallel timelines|
| `CONTINUE`      | `CONTINUE JOURNEY`     | More evocative                             |
| `ENDINGS X/Y`   | `ENDINGS X / Y (Z%)`   | Now shows discovered percentage            |
| `ROUTE CODEX`   | `VIEW ROUTE CODEX`     | Clarifies purpose                          |
| *(new)*         | `CREDITS`              | Gold star icon, navigates to CreditsScreen |

### Button ordering
- CONTINUE JOURNEY appears first if a save exists (most important action when returning).
- START NEW TIMELINE follows.
- All buttons animate with proper sequential stagger regardless of save state.

### Footer
- Now shows two lines: story stats row + version string (`v1.0 — Public Prototype`).

---

## 3. Ending Screen

**File: `EndingScreen.tsx`**

### Gallery mode (no active ending)
- Accessible via "ENDINGS" button from main menu when `activeEnding === null`.
- Shows overall progress: large fraction + percentage + progress bar.
- Lists all discovered endings with icon, title, and subtitle.
- "VIEW ROUTE CODEX" button at the bottom.
- Empty state when nothing discovered yet.

### Ending reveal mode
- "PLAY AGAIN" → **"START NEW TIMELINE"** (consistent with main menu language).
- Summary card now shows **three stats**: Choices Made, Endings Found (X/total), Discovered (%).
- Chapter end variant shows "START NEW TIMELINE" + "VIEW ROUTE CODEX" buttons.
- Chapter end description updated: "Chapter II: The Descent" (was "Chapter 2").

---

## 4. Settings Screen

**File: `SettingsPanel.tsx`**

### New navigation rows (with icons)
- Route Codex (teal compass)
- Chapter Roadmap (blue map)
- **Credits** (gold star) — new link to CreditsScreen

### Reset actions
| Action                | Trigger                       | Scope                                        |
|-----------------------|-------------------------------|----------------------------------------------|
| Reset Current Save    | Shown only when in-game       | Deletes current playthrough, returns to menu |
| Reset All Data        | Always visible in danger zone | Wipes save + content warning flag (full wipe)|

Both actions require confirmation:
- Native `Alert.alert` on iOS/Android.
- `window.confirm` fallback on web.

### Version number
- Displayed at the very bottom of the scroll view: `v1.0 — Public Prototype`.

### Danger zone styling
- "Reset Current Save" — red (`#c0392b`)
- "Reset All Data" — deep red (`#7a0e0e`), darker background — visually distinct severity

---

## 5. Credits Screen

**New screen: `CreditsScreen.tsx`**

- Accessible from main menu and settings.
- Back button returns to previous screen (main menu or settings, based on save state).
- Contains:
  - Animated title block with rune decoration
  - Story stats panel (nodes, endings, classes, backgrounds)
  - Four credit sections: Story & Game Design, Writing, Built With, Special Thanks
  - Decorative lore quote
  - Prototype disclaimer card

---

## 6. Version Number

**New file: `constants/version.ts`**

```ts
export const APP_VERSION = 'v1.0 — Public Prototype';
export const BUILD_DATE  = 'May 2026';
```

Consumed by: `MainMenu.tsx`, `SettingsPanel.tsx`, `CreditsScreen.tsx`.

---

## 7. Save System

**File: `logic/saveSystem.ts`**

Three new exports:
- `hasSeenContentWarning()` — reads `@scars_content_warning_v1` from AsyncStorage.
- `markContentWarningSeen()` — sets it to `'true'`.
- `resetAllData()` — calls `AsyncStorage.multiRemove([SAVE_KEY, CONTENT_WARNING_KEY])`.

---

## 8. Game Context

**File: `context/GameContext.tsx`**

- Mount effect now checks `hasSeenContentWarning()` in parallel with `hasSave()`.
  - If not seen: sets `screen` to `'contentWarning'` before loading completes.
- New function `resetAllData()` — exposed on context, calls storage-level reset.

---

## 9. Type System

**File: `data/types.ts`**

Two new `GameScreen` values added:
- `'contentWarning'` — first-launch content warning
- `'credits'` — credits screen

---

## 10. Screen Router

**File: `app/(tabs)/index.tsx`**

Two new cases in the root switch:
- `'contentWarning'` → `<ContentWarningScreen />`
- `'credits'` → `<CreditsScreen />`

---

## 11. Story Writing Pass (previously completed)

- All 14 story files (ch1–ch12, finalChapter1, finalChapter2) reviewed and cleaned.
- Eliminated fourth-wall breaks, in-game chapter number references, overused phrases.
- Mechanical choice texts overhauled throughout.
- Full details in `WRITING_PASS_NOTES.md`.

---

## Typecheck Status

`pnpm --filter @workspace/mobile run typecheck` — **0 errors** after all changes.

---

## Files Created
- `artifacts/mobile/components/ContentWarningScreen.tsx`
- `artifacts/mobile/components/CreditsScreen.tsx`
- `artifacts/mobile/constants/version.ts`
- `FINAL_POLISH_NOTES.md` (this file)

## Files Modified
- `artifacts/mobile/data/types.ts`
- `artifacts/mobile/logic/saveSystem.ts`
- `artifacts/mobile/context/GameContext.tsx`
- `artifacts/mobile/components/MainMenu.tsx`
- `artifacts/mobile/components/EndingScreen.tsx`
- `artifacts/mobile/components/SettingsPanel.tsx`
- `artifacts/mobile/app/(tabs)/index.tsx`
