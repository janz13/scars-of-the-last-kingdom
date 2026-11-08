# FINAL POLISH NOTES — Scars of the Last Kingdom
## Public Prototype — May 2026

---

## Overview

This document records all UI/UX and content polish changes made to prepare the game for a public prototype presentation. Changes are grouped by area. **Updated with second polish pass (2026-05-05).**

---

## 0. Splash Screen (NEW — Second Pass)

**New file: `SplashScreen.tsx`**

- Animated entrance: logo fades in + scales, subtitle appears, tagline fades in
- Ambient purple glow pulse
- Auto-transitions after 2.2s: checks `hasSeenContentWarning()` and routes to content warning or main menu
- Clean exit fade-out before transition
- Added `'splash'` to `GameScreen` type, set as initial screen in `INITIAL_STATE`
- Excluded from auto-save check

---

## 0b. Save Notification (NEW — Second Pass)

**New file: `SaveNotification.tsx`**

- Toast-style notification that appears when auto-save fires
- Green check icon + "Saved" text
- Slides in from top, auto-dismisses after 1.8s
- Positioned at `top: 80` to avoid stat bar overlap
- Wired into `GameContext.saveNotification` state and `StoryPanel`

---

## 1. Content Warning Screen

**File: `ContentWarningScreen.tsx`**

- Shown on first launch only (tracked via `AsyncStorage` key `@scars_content_warning_v1`).
- Subsequent launches skip directly to the main menu.
- Lists **six** content categories (added: body horror and transformation themes, moon icon).
- Animated entrance with staggered button fade-in.
- Confirm button: "I UNDERSTAND — ENTER THE WORLD" — calls `markContentWarningSeen()` then navigates to main menu.
- Footer note: "This warning will not appear again on this device."
- **Second pass improvements:**
  - Larger warning icons (12 → 13) and text (13 → 13.5px) for readability
  - Warmer text color (#5a5060 → #6a5a68) for less harsh contrast
  - Added empathetic line: "You can always come back when you are ready."
  - Footer note clarified with "on this device"

---

## 2. Main Menu

**File: `MainMenu.tsx`**

### Button changes
| Old label       | New label              | Notes                                      |
|-----------------|------------------------|--------------------------------------------|
| `NEW GAME`      | `START NEW TIMELINE`   | Lore-consistent; implies parallel timelines|
| `CONTINUE`      | `CONTINUE JOURNEY`     | More evocative                             |
| `ENDINGS X/Y`   | Endings discovery card | Visual card with progress bar (see below)  |
| `ROUTE CODEX`   | `VIEW ROUTE CODEX`     | Clarifies purpose                          |
| *(new)*         | `CREDITS`              | Gold star icon, navigates to CreditsScreen |

### Button ordering
- **CONTINUE JOURNEY** appears first if a save exists (most important action when returning).
- **START NEW TIMELINE** follows (label changes to **"BEGIN YOUR JOURNEY"** when no active game).
- All buttons animate with proper sequential stagger regardless of save state.

### Primary button styling (NEW — Second Pass)
- Primary buttons (Continue Journey, Begin Your Journey) have stronger border, larger label text
- Visual hierarchy: primary actions stand out from secondary navigation buttons

### Endings discovery card (NEW — Second Pass)
- Replaces flat text button with visual card showing:
  - Book-open icon with dynamic color (purple → green → gold as % increases)
  - Large count display: `12/228`
  - Percentage badge
  - Progress bar at bottom of card

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

### Second pass improvements
- **View Route Codex** button now available on ALL ending types (death, completion, chapter end)
- Previously only chapter-end endings had the codex button
- Death endings: Start New Timeline (primary) + View Route Codex + Main Menu

---

## 4. Settings Screen

**File: `SettingsPanel.tsx`**

### New navigation rows (with icons)
- Route Codex (teal compass)
- Chapter Roadmap (blue map)
- **Credits** (gold star) — link to CreditsScreen

### Font Size option (NEW — Second Pass)
- Three options: small / normal / large
- Persisted in `GameSettings.fontSize`
- Default: `'normal'`

### Reset actions
| Action                | Trigger                       | Scope                                        |
|-----------------------|-------------------------------|----------------------------------------------|
| Reset Current Save    | Shown only when in-game       | Deletes current playthrough, returns to menu |
| Reset All Data        | Always visible in danger zone | Wipes save + content warning flag (full wipe)|

Both actions require confirmation:
- Native `Alert.alert` on iOS/Android.
- `window.confirm` fallback on web.

### Danger zone styling (IMPROVED — Second Pass)
- Each button now has a subtitle explaining what it does:
  - "Reset Current Save": "Delete your current playthrough and return to the main menu."
  - "Reset All Data": "Wipe all saves, discovered endings, and every playthrough record. This cannot be undone."
- "Reset Current Save" — red (`#c0392b`)
- "Reset All Data" — deep red (`#7a0e0e`), darker background — visually distinct severity
- Danger zone always visible (even from main menu settings)

### Version number
- Displayed at the very bottom of the scroll view: `v1.0 — Public Prototype` + build date

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

New `GameScreen` values:
- `'contentWarning'` — first-launch content warning
- `'credits'` — credits screen
- `'splash'` — animated splash screen (Second Pass)

New `GameSettings` field (Second Pass):
- `fontSize: 'small' | 'normal' | 'large'` — default `'normal'`

---

## 9b. Game Context (Second Pass Updates)

**File: `context/GameContext.tsx`**

- Added `saveNotification: boolean` to `GameContextValue` interface
- `saveNotification` state: set to `true` when auto-save fires, auto-resets after 2.2s
- Initial screen changed from `'mainMenu'` to `'splash'`
- Auto-save excludes `'splash'` screen
- `fontSize: 'normal'` added to INITIAL_STATE settings

## 10. Screen Router

**File: `app/(tabs)/index.tsx`**

New cases in the root switch:
- `'contentWarning'` → `<ContentWarningScreen />`
- `'credits'` → `<CreditsScreen />`
- `'splash'` → `<SplashScreen />` (Second Pass)

---

## 12. Story Panel (Second Pass)

**File: `StoryPanel.tsx`**

### Readability improvements
- Narration text: 16 → 16.5px, lineHeight 27 → 28, added letterSpacing 0.15
- Hallucination narration: lineHeight 28 → 29, added letterSpacing 0.2
- Dialogue box: border 2 → 2.5px, padding increased, border color slightly brighter
- Dialogue text: 15 → 15.5px, lineHeight 24 → 25, added letterSpacing 0.1
- Story section: wider margins (22 → 24px horizontal, 26 → 28px top)
- Choices panel: slightly darker background (0.95 → 0.96), wider padding (14 → 16px)
- Save notification wired into the panel

---

## 13. Choice Buttons (Second Pass)

**File: `ChoiceButton.tsx`**

- Locked choice explanations now show ALL reasons joined with `·` separator (was only first reason)
- Added info icon (Feather `info`, 9px) before reason text
- Reason text color lightened (#4a3860 → #5a4870) for readability
- Reason row uses flex layout for proper text wrapping

---

## 14. Dice Roll Overlay (Second Pass)

**File: `DiceRollOverlay.tsx`**

- Success glow: radial glow effect behind dice face on success/crit success
- Dynamic dice type badge: border and text color change to match outcome color
- Crit indicator: ⚡ zap icon appears next to outcome label on critical hits/misses
- Outcome badge: now uses row layout to accommodate crit icon

---

## Items Still Needing Human Review

### High Priority
1. **Background images** — Most story nodes use gradient fallbacks. For presentation, consider adding at least 5–6 key scene images.
2. **Sound effects** — `soundEnabled` is in settings but no audio system is wired. Consider wiring basic ambient audio or hiding the toggle.
3. **Mobile layout testing** — Test on actual iOS/Android devices, especially:
   - StoryPanel stat bar on narrow screens
   - DiceRollOverlay on small devices
   - Endings discovery card layout on narrow screens
   - Settings danger zone button wrapping

### Medium Priority
4. **Font size implementation** — The `fontSize` setting is stored but not yet applied to StoryPanel narration/dialogue text. Mapping:
   - `small`: narration 14px, dialogue 13px
   - `normal`: narration 16.5px, dialogue 15.5px
   - `large`: narration 19px, dialogue 17px
5. **Text speed implementation** — `textSpeed` setting exists but narration appears instantly. Consider typewriter effect.
6. **Splash screen skip** — On repeat visits, players may want to skip. Consider tap-to-skip.
7. **Developer mode access** — Consider 5-tap unlock on version number in settings for easier QA.

### Low Priority
8. **Credits screen** — Content is placeholder. Update with actual team credits.
9. **Loading screen** — Currently just a purple ActivityIndicator. Could match splash aesthetic.
10. **Error boundary** — `ErrorFallback.tsx` could be more polished for presentation.
11. **Keyboard handling** — CharacterCreator and DeveloperPanel may need keyboard-aware scroll on mobile.

---

## Files Created (First Pass)
- `artifacts/mobile/components/ContentWarningScreen.tsx`
- `artifacts/mobile/components/CreditsScreen.tsx`
- `artifacts/mobile/constants/version.ts`
- `FINAL_POLISH_NOTES.md`

## Files Created (Second Pass)
- `artifacts/mobile/components/SplashScreen.tsx`
- `artifacts/mobile/components/SaveNotification.tsx`

## Files Modified (First Pass)
- `artifacts/mobile/data/types.ts`
- `artifacts/mobile/logic/saveSystem.ts`
- `artifacts/mobile/context/GameContext.tsx`
- `artifacts/mobile/components/MainMenu.tsx`
- `artifacts/mobile/components/EndingScreen.tsx`
- `artifacts/mobile/components/SettingsPanel.tsx`
- `artifacts/mobile/app/(tabs)/index.tsx`

## Files Modified (Second Pass)
- `artifacts/mobile/data/types.ts` (splash screen type, fontSize setting)
- `artifacts/mobile/context/GameContext.tsx` (saveNotification, splash initial screen, fontSize default)
- `artifacts/mobile/components/MainMenu.tsx` (primary buttons, endings card, dynamic labels)
- `artifacts/mobile/components/ContentWarningScreen.tsx` (body horror warning, readability, empathy)
- `artifacts/mobile/components/StoryPanel.tsx` (readability, margins, save notification)
- `artifacts/mobile/components/ChoiceButton.tsx` (all reasons, info icon, better styling)
- `artifacts/mobile/components/DiceRollOverlay.tsx` (success glow, dynamic badge, crit icon)
- `artifacts/mobile/components/EndingScreen.tsx` (Route Codex on all endings)
- `artifacts/mobile/components/SettingsPanel.tsx` (font size, danger descriptions, build date)
- `artifacts/mobile/app/(tabs)/index.tsx` (splash screen route)
