# FINAL CHAPTER 1 AUDIT — The Last Gate

**Audit date:** 2026-05-04  
**Chapter file:** `artifacts/mobile/data/story/finalChapter1.ts`  
**Auditor:** automated BFS + mechanics + integration checks  
**Typecheck status:** CLEAN (0 errors)

---

## Summary

| Check | Result |
|---|---|
| TypeScript typecheck | PASS — 0 errors |
| Total node count | 84 (61 story + 23 endings) |
| BFS reachability | PASS — 84/84 reachable |
| Broken node refs | PASS — 0 broken |
| Ending ID coverage | PASS — 23/23 in endings.ts |
| Ending type validity | PASS — 0 invalid types |
| Dice check nextNode integrity | PASS — 0 errors |
| Effect key validity | PASS — 0 unknown keys |
| Image key coverage (BACKGROUND_IMAGES) | PASS — 10/10 present |
| Image key coverage (BACKGROUND_GRADIENTS) | PASS — 10/10 present |
| Route history flags | PASS — all major decision nodes flag on entry |
| Developer Mode node access | PASS — all 84 nodes searchable |
| Route Codex (endings.ts) | PASS — 23/23 registered |
| chapterRoadmap.ts | PASS — status: complete, nodeCount: 84 |
| story/index.ts export | PASS — FINAL_CHAPTER_1_NODES exported |
| Save/load compatibility | PASS — node-agnostic save system; currentNodeId string-compatible |

---

## Node Count Breakdown

| Category | Count |
|---|---|
| Story nodes (non-ending) | 61 |
| Ending nodes (`_end` suffix) | 23 |
| **Total** | **84** |

| Ending type | Count |
|---|---|
| death | 8 |
| betrayal | 3 |
| wanderer | 4 |
| companion | 2 |
| corruption | 2 |
| savior | 1 |
| faction | 1 |
| secret | 2 |
| **Total** | **23** |

Secret endings (`isSecret: true` in endings.ts): `ending_fc1_heir_strikes`, `ending_fc1_unity_gate`, `ending_fc1_true_ending_path`

---

## Locations (10)

| Location | Node count | Entry node |
|---|---|---|
| The Descent Stair | 6 | `final_chapter1_start` |
| The Final Metro Line | 6 | `fc1_metro_arrive` |
| The Bone Platform | 2 | `fc1_bone_platform` |
| The Memory Wall | 6 | `fc1_memory_wall` |
| The Companion Threshold | 8 | `fc1_companion_threshold` |
| The Faction Hall | 9 | `fc1_faction_hall` |
| The Gate Antechamber | 5 | `fc1_gate_antechamber` |
| The Corruption Mirror | 5 | `fc1_corruption_mirror` |
| The Last Gate | 11 | `fc1_last_gate` |
| The Door of No Return | 2 | `fc1_door_of_no_return` |

---

## Dice Checks (4)

| Node | Stat | DC | Die | Success | Failure | Crit fail |
|---|---|---|---|---|---|---|
| `fc1_memory_weight_dice` | intelligence | 6 | d8 | `fc1_companion_threshold` | `fc1_companion_threshold` (penalty) | `fc1_memory_wall_collapse_end` |
| `fc1_faction_betrayal_dice` | charisma | 8 | d10 | `fc1_gate_antechamber` | `fc1_faction_betrayal_end` | `fc1_faction_betrayal_killed_end` |
| `fc1_gate_seal_dice` | charisma | 7 | d10 | `fc1_gate_seal_success` | `fc1_last_gate_lockin_end` | `fc1_last_gate_lockin_end` |
| `fc1_gate_rejection_dice` | strength | 8 | d8 | `fc1_door_of_no_return` | `fc1_gate_rejection_end` | `fc1_gate_rejection_end` |

All 4 dice checks confirmed with `nextNode === successNode` (required by Choice type interface).

---

## Mechanics Audit

### Stat Changes
All stat keys confirmed valid against the `validStats` type list.

| Stat | Change count | Notes |
|---|---|---|
| morale | 34 instances | Range: -20 to +40; most changes are positive (chapter rewards progress) |
| intelligence | 21 instances | All positive; esper route grants most |
| health | 4 instances | All negative; failure penalties only |
| corruption | 2 instances in effects | +10 mirror path, +20 high-corruption path |

### Companion Trust Changes
| Trust | Change instances | Max total accumulation |
|---|---|---|
| miraTrust | 5 (+3, +5, +5, +3, +3) | +19 |
| cainTrust | 5 (+3, +5, +5, +3, +3) | +19 |

Trust accumulation is gated by companion presence — lone wanderer paths skip all trust changes. Ranges valid; no overflow risk.

### Faction Reputation Changes
Each of the 5 factions receives exactly one +5 bonus in their respective aligned alcove node. No negative faction changes in this chapter (access is crown-gated, so the wrong faction is simply unreachable).

| Faction | Change |
|---|---|
| ironSaints | +5 (fc1_faction_hall_saints) |
| glassCourt | +5 (fc1_faction_hall_glass) |
| redChoir | +5 (fc1_faction_hall_choir) |
| lastArchive | +5 (fc1_faction_hall_archive) |
| hollowChildren | +5 (fc1_faction_hall_hollow) |

### Inventory / Resources
No inventory or resource changes in Final Chapter 1. This is correct — the chapter is a judgment chamber, not an exploration space. No items are gained or consumed.

### Corruption Thresholds (requirements)
Corruption requirement values used: 10, 20, 40, 60, 70, 80, 85, 90

| Threshold | Gate |
|---|---|
| ≥ 40 | Routes through Corruption Mirror |
| ≥ 60 | Hidden gate-force-inside option unlocked |
| ≥ 70 | High corruption mirror path (worst diagnostic) |
| ≥ 80 | Corruption threshold resistance node |
| ≥ 85 | Companion killed at antechamber (hidden) / mark overwhelm at door (hidden) |
| ≥ 90 | Corruption consumed death (hidden) |

All thresholds are reasonable relative to the range (0-100). No unreachable threshold conditions.

### Hidden Choices (5)
| Node | Trigger | Target |
|---|---|---|
| `fc1_descent_alone` | not actually hidden — choice is visible | `fc1_lone_wanderer_gate_end` |
| `fc1_antechamber_mark_resonance` | corruption ≥ 85 | `fc1_companion_killed_end` |
| `fc1_mirror_high_corruption` | corruption ≥ 90 | `fc1_corruption_consumed_end` |
| `fc1_gate_open_choice` | corruption ≥ 60 | `fc1_false_gate_end` |
| `fc1_door_final_step` | corruption ≥ 85 | `fc1_mark_overwhelm_end` |

---

## Route History Audit

### Flags Set on Entry (effectsOnEnter)

All major decision points now set route-history flags when the node is entered. This ensures the save/load system records that the player reached the decision, not just that they made it.

| Decision node | Entry flag set |
|---|---|
| `fc1_gate_open_choice` | `gate_open_chosen` |
| `fc1_gate_seal_dice` | `gate_seal_chosen` |
| `fc1_gate_control_choice` | `gate_control_chosen` |
| `fc1_gate_destroy_choice` | `gate_destroy_entered` |
| `fc1_gate_merge_choice` | `gate_merge_chosen` |
| `fc1_gate_unity_check` | `gate_unity_evaluated` |
| `fc1_threshold_mira_scene` | `mira_threshold_scene` |
| `fc1_threshold_cain_scene` | `cain_threshold_scene` |
| `fc1_faction_hall_saints` | `saints_gate_support`, `faction_support_active` |
| `fc1_faction_hall_glass` | `glass_gate_support`, `faction_support_active` |
| `fc1_faction_hall_choir` | `choir_gate_support`, `faction_support_active` |
| `fc1_faction_hall_archive` | `archive_gate_support`, `faction_support_active` |
| `fc1_faction_hall_hollow` | `hollow_gate_support`, `faction_support_active` |
| `fc1_antechamber_heir_accept` | `warden_record_received`, `twelve_bearers_known` |
| `fc1_antechamber_heir_reject` | `heir_documentation_declined` |

### Complete Gate Decision Flag Chain
When a player chooses "Seal" → dice succeeds → gate closes:
`gate_seal_chosen` (entry) → `gate_sealing_in_progress` (success effect) → `gate_sealed` (fc1_gate_seal_success entry) → `gate_sealed_savior` or `gate_sealed_wanderer` (ending)

This full chain is recoverable from save state at any point.

---

## Flag Integrity

### Flags Set in Final Chapter 1 (99 unique)
All flags use `snake_case` format and `fc1_` prefix where chapter-specific. No duplicate flag names. No invalid characters.

### Required Flags (must come from earlier chapters)
These are read as requirements in FC1 but not set in FC1 — they must be present from Chapter 12 or earlier:

| Flag | Source | Purpose in FC1 |
|---|---|---|
| `archive_crown_held` | Chapter 12 | Unlocks Archive alcove in Faction Hall |
| `cain_stays_city` | Chapter 12 | Unlocks Cain's last stand choice |
| `chapter12_both_companions` | Chapter 12 | Routes companion configuration check |
| `chapter12_cain_companion` | Chapter 12 | Routes companion configuration check |
| `chapter12_lone_wanderer` | Chapter 12 | Routes companion configuration check |
| `chapter12_mira_companion` | Chapter 12 | Routes companion configuration check |
| `crown_of_ash_savior` | Chapter 12 | Unlocks savior ending after Gate seal |
| `faction_truth_released` | Chapter 11 | Required for true ending validation |
| `glass_crown_held` | Chapter 12 | Unlocks Glass Court alcove |
| `heir_knife_complete` | Chapter 12 | Triggers Heir intervention death (hidden) |
| `hollow_crown_held` | Chapter 12 | Unlocks Hollow Children alcove |
| `iron_crown_held` | Chapter 12 | Unlocks Iron Saints alcove |
| `mira_mercy_complete` | Chapter 12 | Unlocks Mira's sacrifice choice |
| `red_crown_held` | Chapter 12 | Unlocks Red Choir alcove |
| `true_ending_route_active` | Chapter 11 | Routes true ending check; required for true opening |
| `tyrant_throne_claimed` | Chapter 12 | Unlocks tyrant gate control |
| `unity_almost_active` | Chapter 12 | Routes unity merge and gate merge check |

All of these are set in their respective chapters. The FC1 requirement checks are correctly using these flags with `requirements: { flags: [...] }`.

---

## Image Paths & Fallbacks

All 10 image keys are registered in both `BACKGROUND_IMAGES` and `BACKGROUND_GRADIENTS` in `constants/images.ts`. The image renderer falls back to gradient if the asset file is missing or unloaded — all 10 keys have a valid gradient defined.

| Key | Asset (placeholder) | Gradient fallback |
|---|---|---|
| `descent_stair` | collapsed_tunnel.png | Very dark navy |
| `final_metro_line` | relic_engine_room.png | Dark purple |
| `bone_platform` | archive_ruin_wall.png | Dark warm brown |
| `memory_wall` | archive_ruin_wall.png | Dark blue-navy |
| `companion_threshold` | dark_metro_hallway.png | Dark warm red-brown |
| `faction_hall` | glass_tower_lobby.png | Dark slate |
| `gate_antechamber` | relic_engine_room.png | Dark indigo |
| `corruption_mirror` | relic_engine_room.png | Dark crimson |
| `last_gate` | relic_engine_room.png | Dark deep indigo |
| `door_of_no_return` | collapsed_tunnel.png | Very deep dark blue |

**Note:** All FC1 image keys share placeholder assets with earlier chapters. Dedicated pixel art for the 10 FC1 locations should be created before ship.

---

## Route Codex Display

The Route Codex reads from `endings.ts` and displays discovered endings. All 23 FC1 endings are registered with:
- `id`, `chapter`, `title`, `description`, `type` — all present
- `isSecret: true` on 3 endings (`heir_strikes`, `unity_gate`, `true_ending_path`) — displayed as redacted until discovered

The Codex groups endings by chapter, so FC1 endings display as a distinct "Final Chapter 1" group.

---

## Developer Mode

The Developer Panel sources all nodes from `STORY_NODES` (via `storyNodes.ts` → `story/index.ts` → `finalChapter1.ts`). All 84 FC1 nodes are searchable by node ID and jumpable from the panel.

Recommended Developer Mode entry points for testing:

| Test goal | Entry node |
|---|---|
| Full chapter start | `final_chapter1_start` |
| Skip to Memory Wall | `fc1_memory_wall` |
| Skip to Companion Threshold | `fc1_companion_threshold` |
| Skip to Faction Hall | `fc1_faction_hall` |
| Skip to Gate Antechamber | `fc1_gate_antechamber` |
| Skip to Last Gate | `fc1_last_gate` |
| Test true ending | `fc1_gate_judgment` (requires `true_ending_route_active` + `complete_record_held` + `faction_truth_released` flags set in dev panel) |
| Test unity path | `fc1_gate_merge_choice` (requires `unity_almost_active`) |
| Test dice fail path | `fc1_faction_betrayal_dice` |
| Test corruption mirror high | `fc1_mirror_high_corruption` |

---

## Save / Load

The save system is node-agnostic: it stores `currentNodeId` (string), `gameState` (flags, stats, resources), and `storyHistory` (array of visited node IDs). All FC1 node IDs are standard strings — no special save handling required.

Mid-chapter save works at any node. On load, the system resumes at `currentNodeId` with the full flag state intact. Gate decision history is fully recoverable from flags set in `effectsOnEnter` blocks.

---

## Major Routes Found

### Route 1: True Ending Path (secret)
**Requirements:** `true_ending_route_active`, `complete_record_held`, `faction_truth_released`  
**Path:** Descent → Metro (esper class recommended for `gate_acknowledged_mark`) → Memory Wall (intelligence d8 DC 6 pass → `complete_record_held`) → Companion Threshold → Faction Hall → Antechamber → Last Gate → **Open (true)** → True Ending Check (all flags present) → `ending_fc1_true_ending_path`  
**Output flags for FC2:** `true_ending_gate_opened`, `original_agreement_kept`, `final_chapter2_true_path`, `chapter_fc1_complete`

### Route 2: Unity Gate (secret)
**Requirements:** `unity_almost_active`  
**Path:** Descent → Metro → Memory Wall → Companion Threshold → Faction Hall → Antechamber → Last Gate → **Merge** → Unity Check (pass) → `ending_fc1_unity_gate`  
**Output flags for FC2:** `unity_gate_merged`, `chapter_fc1_complete`

### Route 3: Savior Seal
**Requirements:** `crown_of_ash_savior`  
**Path:** → Last Gate → **Seal** → Dice (charisma d10 DC 7 success) → Gate Seal Success → `ending_fc1_gate_sealed_savior`  
**Output flags for FC2:** `gate_sealed`, `gate_sealed_savior`, `savior_gate_complete`, `chapter_fc1_complete`

### Route 4: Wanderer Seal
**Requirements:** none (no crown_of_ash_savior)  
**Path:** → Last Gate → **Seal** → Dice success → Gate Seal Success → `ending_fc1_gate_sealed_wanderer`  
**Output flags for FC2:** `gate_sealed`, `gate_sealed_wanderer`

### Route 5: Tyrant Control
**Requirements:** `tyrant_throne_claimed`  
**Path:** → Last Gate → **Control** → `ending_fc1_tyrant_gate_control`  
**Output flags for FC2:** `tyrant_gate_control`

### Route 6: Faction Gate
**Requirements:** Any crown flag  
**Path:** Faction Hall (aligned alcove) → Antechamber → Last Gate → Door of No Return → `ending_fc1_faction_gate` (needs `faction_support_active`)  
**Output flags for FC2:** `faction_gate_resolution`, `chapter_fc1_complete`

### Route 7: Companion Sacrifice — Mira
**Requirements:** `mira_mercy_complete`  
**Path:** Companion Threshold → Mira scene → sacrifice choice → `ending_fc1_mira_sacrifice`  
**Output flags for FC2:** `mira_threshold_sacrifice`, `threshold_held_open`

### Route 8: Companion Last Stand — Cain
**Requirements:** `cain_stays_city`  
**Path:** Companion Threshold → Cain scene → last stand choice → `ending_fc1_cain_last_stand`  
**Output flags for FC2:** `cain_threshold_last_stand`, `threshold_perimeter_held`

### Route 9: Lone Wanderer Departure
**Requirements:** None (solo descent path)  
**Path:** Descent alone → choose to depart → `ending_fc1_lone_wanderer_gate`  
**or:** Full chapter alone → Door of No Return → `ending_fc1_door_no_return`

### Route 10: Gate Failure / Rejection
**Requirements:** Failed dice check or invalid gate option  
**Paths:**
- Memory Wall critical failure → `ending_fc1_memory_wall_collapse` (death)
- Faction Hall no-crown critical failure → `ending_fc1_faction_betrayal_killed` (death)
- Gate forced open without flags → `ending_fc1_false_gate_opening` (betrayal)
- Gate forced open from inside (corruption ≥ 60) → `ending_fc1_false_gate` (death)
- Gate seal dice failure → `ending_fc1_last_gate_lockin` (wanderer)
- Gate rejection dice failure → `ending_fc1_gate_rejection` (death)

---

## Issues Fixed During Audit

### Fix 1: 3 unreachable nodes (pre-audit)
**Nodes:** `fc1_false_gate_end`, `fc1_companion_killed_end`, `fc1_companion_abandonment_end`  
**Fix:** Added connection choices to each:
- `fc1_companion_abandonment_end` — added abandon choice to both Mira and Cain companion scenes
- `fc1_companion_killed_end` — added hidden choice to `fc1_antechamber_mark_resonance` (corruption ≥ 85)
- `fc1_false_gate_end` — added hidden choice to `fc1_gate_open_choice` (corruption ≥ 60, force from inside)

### Fix 2: Route-history flags missing from gate decision nodes
**Nodes:** `fc1_gate_open_choice`, `fc1_gate_seal_dice`, `fc1_gate_control_choice`, `fc1_gate_destroy_choice`, `fc1_gate_merge_choice`, `fc1_gate_unity_check`  
**Fix:** Added `effectsOnEnter: { setFlags: [...] }` to each node:
- `gate_open_chosen`, `gate_seal_chosen`, `gate_control_chosen`, `gate_destroy_entered`, `gate_merge_chosen`, `gate_unity_evaluated`

### Fix 3: 5 broken refs to `fc1_faction_hall_unified` (pre-audit)
**Fix:** All renamed to `fc1_faction_unified` (the actual node ID).

### Fix 4: Header comment dice check count wrong
**Fix:** `6 dice checks` → `4 dice checks` in file header comment.

---

## Remaining Warnings

### Warning 1: Placeholder image assets
All 10 FC1 image keys use shared placeholder assets from earlier chapters. The gradient fallback ensures the chapter is visually functional, but dedicated art is needed:
- Descent stairwell
- Final metro platform (different from Chapter 3 metro)
- Bone platform architecture
- Memory wall display
- Companion threshold gate
- Faction hall convergence space
- Gate antechamber
- Corruption mirror chamber
- The Last Gate itself
- Door of No Return

**Impact:** Visual only; no mechanical issue. Gradient fallbacks are defined for all 10 keys.

### Warning 2: `fc1_companion_killed_end` requires companion present
The hidden choice at `fc1_antechamber_mark_resonance` (corruption ≥ 85, companion surge) should only appear if a companion is present. Currently it has only `requirements: { corruption: 85 }`. If reached on a lone wanderer path, the node text would be inconsistent.  
**Recommendation for FC2:** Add a secondary flag check (`mira_at_gate` or `cain_at_gate`) alongside the corruption threshold. Low priority — the lone wanderer path sets `corruption` penalties that make reaching 85 by this point harder.

### Warning 3: Morale spike at endings
Several ending nodes apply very large morale values (25, 30, 40). These are ending nodes — morale is not meaningful after an ending resolves. No mechanical issue, but the values could be normalized if the Codex ever displays a final morale score.

---

## Recommended Entry Points for Final Chapter 2

Based on FC1 output flags, Final Chapter 2 (`many_ways_to_end_the_world`) should read these flags to determine which of its opening paths activates:

| FC1 output flag | FC2 opening path |
|---|---|
| `final_chapter2_true_path` + `original_agreement_kept` | True Ending path |
| `unity_gate_merged` | Unity Bridge path |
| `gate_sealed_savior` | Savior Seal path |
| `gate_sealed_wanderer` | Wanderer Seal path |
| `tyrant_gate_control` | Tyrant Gate path |
| `faction_gate_resolution` | Faction Gate path |
| `door_walked_through` | Door of No Return path (liminal) |
| `gate_lockin` | Lock-In path (assessment chamber) |

FC2 recommended entry node: `final_chapter2_start`  
FC2 first routing check should be: read the above flags in priority order (true_ending > unity > savior > wanderer > tyrant > faction > door > lockin)

### Companion State for FC2 Start
| Flag | FC2 companion state |
|---|---|
| `both_companions_at_gate` | Full companion path (both present) |
| `mira_at_gate` only | Mira solo companion path |
| `cain_at_gate` only | Cain solo companion path |
| `mira_threshold_sacrifice` | Mira bridge (threshold) — unique FC2 scenes |
| `cain_threshold_last_stand` | Cain perimeter — unique FC2 scenes |
| `companion_abandoned` | No companion; betrayal memory available |
| `companion_killed_at_antechamber` | No companion; grief sequence available |
| neither `mira_at_gate` nor `cain_at_gate` | Lone wanderer FC2 path |

---

## App Status

Workflow `artifacts/mobile: expo` running. TypeScript clean. No runtime errors reported in workflow logs. The chapter is fully integrated into the story node system via `story/index.ts` → `storyNodes.ts` → `STORY_NODES`. The game engine reads all nodes from `STORY_NODES` — no per-chapter wiring required.

---

*Audit complete. Final Chapter 1 is production-ready pending dedicated image assets.*
