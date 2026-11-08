# Final QA Checklist — Scars of the Last Kingdom

## Instructions

Test each item on a real Android device (or emulator if no device available).
Mark each as **PASS**, **FAIL**, or **NEEDS REVIEW**.
Add notes for any FAIL or NEEDS REVIEW items.

---

## 1. Fresh Install

| # | Test | Status | Notes |
|---|------|--------|-------|
| 1.1 | Install APK/AAB on clean device (no previous data) | ⬜ | |
| 1.2 | App icon appears in launcher | ⬜ | |
| 1.3 | Splash screen shows on launch | ⬜ | |
| 1.4 | Content warning screen appears on first launch | ⬜ | |
| 1.5 | After acknowledging warning, main menu appears | ⬜ | |
| 1.6 | No "Continue" button on first launch (no save exists) | ⬜ | |
| 1.7 | No crash or ANR on launch | ⬜ | |

## 2. New Game

| # | Test | Status | Notes |
|---|------|--------|-------|
| 2.1 | Tap "New Timeline" → character creator appears | ⬜ | |
| 2.2 | Can select background, class, personality, companion | ⬜ | |
| 2.3 | Cannot advance without selecting all required fields | ⬜ | |
| 2.4 | "Review & Begin" starts the game | ⬜ | |
| 2.5 | Starting stats match selected background/class | ⬜ | |
| 2.6 | Starting companion (if selected) appears in companion strip | ⬜ | |
| 2.7 | Chapter banner appears on first node | ⬜ | |
| 2.8 | Background image loads for first scene | ⬜ | |

## 3. Continue Game

| # | Test | Status | Notes |
|---|------|--------|-------|
| 3.1 | After a save exists, "Continue" button appears on main menu | ⬜ | |
| 3.2 | Tap "Continue" → loads to last saved node | ⬜ | |
| 3.3 | Stats, inventory, flags, companions all restored correctly | ⬜ | |
| 3.4 | Endings discovered from previous playthroughs are preserved | ⬜ | |
| 3.5 | Settings (text speed, font size, auto-save) are preserved | ⬜ | |

## 4. Save / Load

| # | Test | Status | Notes |
|---|------|--------|-------|
| 4.1 | Auto-save fires after making a choice (save notification appears briefly) | ⬜ | |
| 4.2 | Kill app via task manager → reopen → Continue → state is correct | ⬜ | |
| 4.3 | Force stop app → reopen → Continue → state is correct | ⬜ | |
| 4.4 | Make 5+ choices → kill → continue → route history includes all choices | ⬜ | |
| 4.5 | Save notification appears and disappears within ~2 seconds | ⬜ | |
| 4.6 | Font size setting persists across save/load | ⬜ | |

## 5. All Menu Buttons

| # | Test | Status | Notes |
|---|------|--------|-------|
| 5.1 | Main menu: "New Timeline" works | ⬜ | |
| 5.2 | Main menu: "Continue" works (when save exists) | ⬜ | |
| 5.3 | Main menu: "Settings" opens settings panel | ⬜ | |
| 5.4 | Main menu: "Credits" opens credits screen | ⬜ | |
| 5.5 | In-game: stats tab opens stats panel | ⬜ | |
| 5.6 | In-game: inventory tab opens inventory panel | ⬜ | |
| 5.7 | In-game: companions tab opens companion panel | ⬜ | |
| 5.8 | In-game: factions tab opens faction panel | ⬜ | |
| 5.9 | In-game: history tab opens history panel | ⬜ | |
| 5.10 | In-game: settings tab opens settings panel | ⬜ | |
| 5.11 | All panels can return to game view | ⬜ | |
| 5.12 | No dead buttons or buttons that do nothing | ⬜ | |

## 6. Route Codex

| # | Test | Status | Notes |
|---|------|--------|-------|
| 6.1 | Route Codex opens from ending screen or main menu | ⬜ | |
| 6.2 | Shows current character info | ⬜ | |
| 6.3 | Shows current chapter and location | ⬜ | |
| 6.4 | Shows recent choices in journey history | ⬜ | |
| 6.5 | Shows important/flagged choices | ⬜ | |
| 6.6 | "View Route Codex" button appears on ending screen | ⬜ | |

## 7. Ending Tracker

| # | Test | Status | Notes |
|---|------|--------|-------|
| 7.1 | Reach a death ending → ending screen appears | ⬜ | |
| 7.2 | Ending title, type, description display correctly | ⬜ | |
| 7.3 | Ending is added to discovered endings count | ⬜ | |
| 7.4 | Endings gallery shows all discovered endings | ⬜ | |
| 7.5 | Undiscovered endings show as redacted/hidden | ⬜ | |
| 7.6 | Discovery percentage updates correctly | ⬜ | |
| 7.7 | Start new timeline → previously discovered endings are preserved | ⬜ | |
| 7.8 | Kill app → reopen → discovered endings still present | ⬜ | |

## 8. Final Endings (Spot-Check)

| # | Test | Status | Notes |
|---|------|--------|-------|
| 8.1 | Survival death: let health reach 0 → death ending triggers | ⬜ | |
| 8.2 | Morale collapse: let morale reach 0 → morale ending triggers | ⬜ | |
| 8.3 | Dehydration: let thirst reach 0, then health → dehydration ending | ⬜ | |
| 8.4 | Starvation: let hunger reach 0, then health → starvation ending | ⬜ | |
| 8.5 | Chapter 1 end: reach chapter1_end → chapter end screen | ⬜ | |
| 8.6 | Cain betrayal: Cain present + low trust + knows mark → betrayal ending | ⬜ | |
| 8.7 | Relic awakening: high corruption + specific choice → corruption ending | ⬜ | |
| 8.8 | Each ending type has correct color accent and icon | ⬜ | |

## 9. Reset Current Save

| # | Test | Status | Notes |
|---|------|--------|-------|
| 9.1 | Settings → "Start New Timeline" → confirmation dialog appears | ⬜ | |
| 9.2 | Confirm → returns to main menu with "New Timeline" only | ⬜ | |
| 9.3 | Discovered endings are preserved after reset | ⬜ | |
| 9.4 | Can start a new game after reset | ⬜ | |
| 9.5 | New game has fresh stats, no old inventory or flags | ⬜ | |

## 10. Reset All Data

| # | Test | Status | Notes |
|---|------|--------|-------|
| 10.1 | Settings → "Reset All Data" → confirmation dialog appears | ⬜ | |
| 10.2 | Confirm → returns to main menu | ⬜ | |
| 10.3 | Discovered endings are wiped | ⬜ | |
| 10.4 | Content warning flag is wiped → warning shows on next launch | ⬜ | |
| 10.5 | No save data remains (Continue button gone) | ⬜ | |

## 11. Airplane Mode / Offline Use

| # | Test | Status | Notes |
|---|------|--------|-------|
| 11.1 | Enable airplane mode after first load → game continues working | ⬜ | |
| 11.2 | Kill app in airplane mode → reopen → game loads from save | ⬜ | |
| 11.3 | All story text loads offline | ⬜ | |
| 11.4 | All background images load offline | ⬜ | |
| 11.5 | Choices, dice rolls, stat changes work offline | ⬜ | |
| 11.6 | No "network error" or loading spinner that never resolves | ⬜ | |

## 12. App Restart

| # | Test | Status | Notes |
|---|------|--------|-------|
| 12.1 | Kill app from task manager → reopen → correct screen appears | ⬜ | |
| 12.2 | Force stop from Settings → reopen → correct screen appears | ⬜ | |
| 12.3 | Restart device → open app → correct screen appears | ⬜ | |
| 12.4 | Auto-save fires on next choice after restart | ⬜ | |

## 13. Phone Rotation

| # | Test | Status | Notes |
|---|------|--------|-------|
| 13.1 | Rotate to landscape → app stays in portrait (locked) | ⬜ | |
| 13.2 | No layout breakage during rotation | ⬜ | |
| 13.3 | No crash on rotation | ⬜ | |

## 14. Small Phone Screen (≤5.5", 360dp width)

| # | Test | Status | Notes |
|---|------|--------|-------|
| 14.1 | All text readable without horizontal scroll | ⬜ | |
| 14.2 | Choice buttons are tappable (min 44dp touch target) | ⬜ | |
| 14.3 | Stats panel doesn't overflow screen | ⬜ | |
| 14.4 | Character creator is usable on small screen | ⬜ | |
| 14.5 | Settings panel scrolls properly | ⬜ | |
| 14.6 | Safe area insets respected (notch, home indicator) | ⬜ | |

## 15. Large Phone Screen (≥6.5", 412dp width)

| # | Test | Status | Notes |
|---|------|--------|-------|
| 15.1 | Text doesn't appear too small | ⬜ | |
| 15.2 | Layout uses available space well (not stretched weirdly) | ⬜ | |
| 15.3 | Background images scale correctly | ⬜ | |
| 15.4 | Font size "Large" setting improves readability | ⬜ | |

## 16. Android Back Button Behavior

| # | Test | Status | Notes |
|---|------|--------|-------|
| 16.1 | In game view → back button does NOT exit app | ⬜ | |
| 16.2 | In stats/inventory/companions → back returns to game | ⬜ | |
| 16.3 | In settings → back returns to game or main menu | ⬜ | |
| 16.4 | In main menu → back button exits app (expected) | ⬜ | |
| 16.5 | In character creator → back goes to previous step | ⬜ | |
| 16.6 | No unexpected navigation loops | ⬜ | |

## 17. Performance During Large Chapters

| # | Test | Status | Notes |
|---|------|--------|-------|
| 17.1 | Navigate through 20+ nodes → no slowdown | ⬜ | |
| 17.2 | Route history grows → no memory leak or lag | ⬜ | |
| 17.3 | Background image transitions are smooth (no jank) | ⬜ | |
| 17.4 | Dice roll animation plays smoothly | ⬜ | |
| 17.5 | Auto-save doesn't cause frame drops | ⬜ | |
| 17.6 | Chapter banner animation is smooth | ⬜ | |

## 18. No Console Errors

| # | Test | Status | Notes |
|---|------|--------|-------|
| 18.1 | Check `adb logcat` during gameplay → no JS errors | ⬜ | |
| 18.2 | No "undefined is not an object" errors | ⬜ | |
| 18.3 | No "story node not found" error screen (unless genuinely invalid node) | ⬜ | |
| 18.4 | No yellow box warnings in debug build | ⬜ | |
| 18.5 | No memory warnings in logcat | ⬜ | |

## 19. No Broken Images

| # | Test | Status | Notes |
|---|------|--------|-------|
| 19.1 | All story scenes show correct background image | ⬜ | |
| 19.2 | No blank/white backgrounds where art should be | ⬜ | |
| 19.3 | Hallucination scenes show correct overlay tint | ⬜ | |
| 19.4 | Companion event scenes show correct accent color | ⬜ | |
| 19.5 | Gradient fallback works if image fails to load | ⬜ | |

---

## Summary

| Section | PASS | FAIL | NEEDS REVIEW | Total |
|---------|------|------|-------------|-------|
| 1. Fresh Install | | | | 7 |
| 2. New Game | | | | 8 |
| 3. Continue Game | | | | 5 |
| 4. Save/Load | | | | 6 |
| 5. All Menu Buttons | | | | 12 |
| 6. Route Codex | | | | 6 |
| 7. Ending Tracker | | | | 8 |
| 8. Final Endings | | | | 8 |
| 9. Reset Current Save | | | | 5 |
| 10. Reset All Data | | | | 5 |
| 11. Airplane Mode | | | | 6 |
| 12. App Restart | | | | 4 |
| 13. Phone Rotation | | | | 3 |
| 14. Small Screen | | | | 6 |
| 15. Large Screen | | | | 4 |
| 16. Back Button | | | | 6 |
| 17. Performance | | | | 6 |
| 18. Console Errors | | | | 5 |
| 19. Broken Images | | | | 5 |
| **TOTAL** | | | | **105** |

### Blocker criteria

Any FAIL in sections 1–4, 10–12, or 18 blocks the release.
NEEDS REVIEW items should be resolved or documented before submission.
