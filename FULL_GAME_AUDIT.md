# FULL GAME AUDIT — Dark Realm Saga

**Generated:** 2025-07-16  
**Audit Script:** `scripts/src/fullAudit.mts`  
**Result File:** `audit-result.json`

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Errors** | 0 |
| **Warnings** | 5 |
| **Info** | 26 |
| **Total Story Nodes** | 1,433 |
| **Total Endings** | 228 |
| **Total Choices** | 2,519 |
| **Total Flags** | 2,073 |
| **Dice Check Nodes** | 86 |
| **Chapters** | 16 |

### Ending Type Distribution

| Type | Count |
|------|-------|
| death | 66 |
| wanderer | 32 |
| faction | 27 |
| corruption | 27 |
| betrayal | 29 |
| companion | 15 |
| secret | 14 |
| sacrifice | 8 |
| tyrant | 5 |
| savior | 5 |

### Chapter Node Counts

| Chapter | Nodes |
|---------|-------|
| Chapter 1 | 108 |
| Chapter 2 | 79 |
| Chapter 3 | 79 |
| Chapter 4 | 84 |
| Chapter 5 | 95 |
| Chapter 6 | 95 |
| Chapter 7 | 98 |
| Chapter 8 | 100 |
| Chapter 9 | 120 |
| Chapter 10 | 127 |
| Chapter 11 | 146 |
| Chapter 12 | 137 |
| Final Chapter 1 | 84 |
| Final Chapter 2 | 70 |
| Interlude | 8 |
| Vision | 3 |

---

## Warnings (5)

### Story-Unreachable: Engine-Triggered Survival Endings (4)

These nodes are unreachable via choice paths because they are triggered by the game engine's survival mechanics (hunger, thirst, corruption thresholds), not by player choices. **By design.**

- `ending_starvation` — triggered when hunger reaches fatal threshold
- `ending_metro_death` — triggered by environmental hazards in the metro
- `ending_cain_betrayal` — triggered by companion system when Cain's trust drops critically
- `ending_relic_awakening` — triggered by corruption threshold reaching critical level

### Story-Missing-Chapter: Prologue (1)

The `PROLOGUE_NODES` array in `artifacts/mobile/data/story/prologue.ts` is empty. The Prologue chapter has no story content. This requires narrative content creation, not a structural fix.

---

## Info Items (26)

### Orphan Ending Data (22)

These ending definitions exist in `artifacts/mobile/data/endings.ts` but are never triggered by any story node's `endingId`. They are likely used by the game engine dynamically (survival milestones, chapter completion tracking, etc.) or represent planned but unimplemented content.

| Ending ID | Category |
|-----------|----------|
| `ending_corruption_death` | Death |
| `ending_iron_tyrant` | Tyrant |
| `ending_wanderer` | Wanderer |
| `ending_together` | Secret |
| `ending_last_archive` | Faction |
| `ending_thirteenth_signal` | Secret |
| `ending_ch3_trust_complete` | Chapter milestone |
| `ending_ch4_saints_survived` | Chapter milestone |
| `ending_ch4_veyra_pact` | Chapter milestone |
| `ending_ch4_mira_route` | Chapter milestone |
| `ending_ch5_survived` | Chapter milestone |
| `ending_ch6_survived` | Chapter milestone |
| `ending_ch7_survived` | Chapter milestone |
| `ending_ch8_survived` | Chapter milestone |
| `ending_ch9_savior_path` | Chapter milestone |
| `ending_ch9_tyrant_path` | Chapter milestone |
| `ending_ch9_survived` | Chapter milestone |
| `ending_ch9_true_ending_req` | Chapter milestone |
| `ending_fc1_gate_sealed_savior` | Savior (now continues to FC2) |
| `ending_fc1_faction_gate` | Faction (now continues to FC2) |
| `ending_fc1_unity_gate` | Secret (now continues to FC2) |
| `ending_fc1_true_ending_path` | Secret (now continues to FC2) |

### Missing Faction Flags (4)

These faction flags are expected by the companion/faction system but are not set in any story node. They may be set by the game engine or represent unfinished faction integration paths.

| Flag | Expected By |
|------|-------------|
| `iron_saints_registered` | Faction system |
| `glass_court_invited` | Faction system |
| `red_choir_initiated` | Faction system |
| `last_archive_found` | Faction system |

---

## Fixes Applied

### Chapter Transitions (Ch2–Ch8)

Each chapter end node was marked as `isEnding: true` with no forward choices, preventing progression. Fixed by:
- Removing `isEnding: true` from chapter end nodes
- Adding a choice to the next chapter's start node

| Chapter | End Node | Links To |
|---------|----------|----------|
| Chapter 2 | `c2_chapter2_end` | `chapter3_start` |
| Chapter 3 | `c3_chapter3_end` | `chapter4_start` |
| Chapter 4 | `c4_chapter4_end` | `chapter5_start` |
| Chapter 5 | `c5_chapter5_end` | `chapter6_start` |
| Chapter 6 | `c6_chapter6_end` | `chapter7_start` |
| Chapter 7 | `c7_chapter7_end` | `chapter8_start` |

### Chapter 12 → Final Chapter 1

Added a gated choice in `c12_final_decision`:
- Choice: "The Final Gate is ahead. Descend to the last stair."
- Requirement: `gate_approach_begun` flag
- Links to: `final_chapter1_start`

### Final Chapter 1 → Final Chapter 2

Four FC1 ending nodes that set `chapter_fc1_complete` now continue to FC2:
- `fc1_gate_sealed_savior_end` → `final_chapter2_start`
- `fc1_faction_gate_end` → `final_chapter2_start`
- `fc1_unity_gate_end` → `final_chapter2_start`
- `fc1_true_ending_path_end` → `final_chapter2_start`

Removed `isEnding: true` from these nodes since they are no longer terminal.

### Orphan Node Links

Previously unreachable nodes now have parent links:

| Node | Parent | Choice |
|------|--------|--------|
| `c2_patrol_spotted` | `c2_surface_junction` | "Move east through the open streets" |
| `c4_furnace_execution_witness` | `c4_furnace_arrive` | "Find the observation ledge" |
| `c4_shrine_arrive` | `c4_chapel_leave_options` | "The War Shrine. The oldest part of the settlement" |
| `c4_infiltrate_success` | `c4_barracks_intel_gathered` | "Leave the settlement now" (requires `infiltrate_route`) |
| `c4_purification_overburn_end` | `c4_yard_purification_ritual` | Overburn path (hidden, requires corruption ≥ 60) |
| `c4_bellkeeper_claimed_end` | `c4_shrine_relic_touched` | "Hold the disc and the mark together" (hidden, requires `metro_disc_acquired` + corruption ≥ 40) |
| `c4_chains_forever_end` | `c4_carts_arrive` | "Step into the processing line" |
| `c8_archive_supply_intel` | `chapter8_start` | Hidden, requires `archive_analysis_complete` |
| `c8_without_mira` | `chapter8_start` | Hidden, requires `mira_joins_party` blocked |
| `c8_solo_tactical` | `chapter8_start` | Hidden, requires `cain_joins_party` blocked |
| `c8_gate_refused_route` | `chapter8_start` | Hidden, requires `gate_card_available` + `gate_sync_accepted` blocked |

### Missing Flag Fixes

| Flag | Set By | Node |
|------|--------|------|
| `sera_saved_ch3` | `effectsOnEnter.setFlags` | `c3_sera_kindness` |
| `sera_alive` | `effectsOnEnter.setFlags` | `c3_sera_kindness` |
| `juno_alive` | `effectsOnEnter.setFlags` | `c5_elevator_juno_first` |
| `gate_card_available` | `choice.effects.setFlags` | `c7_final_take_card` |
| `sleeping_server_active` | `effectsOnEnter.setFlags` | `c7_sleeping_server_arrive` |
| `cain_ruthless_mode` | `effectsOnEnter.setFlags` | `c6_cain_allow_execute` |

### Audit Script Improvements

1. **Dynamic IMAGE_KEYS** — Extracted from `images.ts` source instead of hardcoded list
2. **Dice check effects scanning** — `successEffects`, `failureEffects`, `criticalSuccessEffects`, `criticalFailureEffects` now included in flag analysis
3. **ESM compatibility** — Replaced `__dirname` with `import.meta.dirname`

---

## Recommendations

### High Priority

1. **Prologue content** — The `PROLOGUE_NODES` array is empty. Write prologue story content that introduces the player to the world and leads to `chapter1_start`.

### Medium Priority

2. **Faction registration flags** — Add `iron_saints_registered`, `glass_court_invited`, `red_choir_initiated`, `last_archive_found` to appropriate faction joining nodes in the story data.
3. **Orphan ending data** — Review the 22 orphan ending definitions in `endings.ts`. Either wire them to story nodes or remove them if they're engine-managed milestones.

### Low Priority

4. **Survival ending integration** — Consider adding explicit story choices that can lead to `ending_starvation`, `ending_metro_death`, etc. for audit completeness, even though the engine handles them.
5. **FC1 ending metadata** — The 4 FC1 nodes that continue to FC2 still have `endingType` and `endingId` properties. Consider whether these should be retained or converted to milestone tracking.
