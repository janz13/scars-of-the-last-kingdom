# CHAPTER 9 AUDIT — The Mark Awakens

**Audit Date:** 2026-05-04
**Chapter File:** `artifacts/mobile/data/story/chapter9.ts`
**Node Count:** 120 nodes
**Locations:** 11
**Dice Checks:** 9
**Endings:** 18
**Class-Specific Choices:** 7
**Background-Specific Choices:** 7
**Corruption Choices:** 10+

---

## Issues Found and Fixed

### 1. Chapter 8 → Chapter 9 transition broken (CRITICAL — FIXED)
- **File:** `artifacts/mobile/data/story/chapter8.ts`
- **Node:** `c8_chapter8_end`
- **Problem:** Node had `choices: []` and `isEnding: true` — chapter 9 was unreachable from normal gameplay.
- **Fix:** Removed `isEnding: true` / `endingId` / `endingType` from the transition node and added a forward choice `{ id: 'c8_to_chapter9', text: 'The mark is warm. Move to Chapter 9.', nextNode: 'chapter9_start' }`.
- **Note:** `ending_ch8_survived` remains in `endings.ts` as a Route Codex record. The node itself is now a chapter bridge, not a terminal ending.

### 2. All 18 Chapter 9 endings missing from endings.ts (CRITICAL — FIXED)
- **File:** `artifacts/mobile/data/endings.ts`
- **Problem:** All 18 `endingId` values referenced in chapter9.ts nodes (`ending_ch9_machine_saint`, `ending_ch9_relic_vessel`, etc.) had no corresponding entries in `ENDINGS[]`. The Route Codex could not discover or display any Ch9 endings.
- **Fix:** Inserted all 18 endings before the True Ending block (line 1527), with correct `type`, `subtitle`, `description`, `color`, `hint`, and `chapter` fields. Two are marked `isSecret: true` (`ending_ch9_gate_fragment`, `ending_ch9_true_ending_req`).

### 3. All 11 Chapter 9 imageKeys missing from images.ts (HIGH — FIXED)
- **File:** `artifacts/mobile/constants/images.ts`
- **Problem:** `relic_scar`, `machine_graveyard`, `marked_shrine`, `memory_storm`, `pulse_engine`, `rust_cathedral`, `broken_tram_core`, `old_signal_tower`, `corruption_garden`, `gate_fragment_chamber`, `dream_of_before` were not registered in `BACKGROUND_IMAGES`. Every Ch9 node would silently fall back to the default gradient with no image context.
- **Fix:** Added all 11 keys to `BACKGROUND_IMAGES` with thematically appropriate placeholder art. Added all 11 gradient configs to `BACKGROUND_GRADIENTS` with distinct mood-matched color palettes.
  - `relic_scar` → `relic_engine_room.png` (deep indigo-purple)
  - `machine_graveyard` → `collapsed_tunnel.png` (dark steel-grey)
  - `marked_shrine` → `archive_ruin_wall.png` (muted indigo)
  - `memory_storm` → `archive_ruin_wall.png` (deep blue-navy)
  - `pulse_engine` → `relic_engine_room.png` (dark violet)
  - `rust_cathedral` → `ruined_metro_station.png` (warm amber-rust)
  - `broken_tram_core` → `collapsed_tunnel.png` (near black)
  - `old_signal_tower` → `surface_ruins.png` (midnight blue-grey)
  - `corruption_garden` → `surface_ruins.png` (deep black-green)
  - `gate_fragment_chamber` → `relic_engine_room.png` (deep purple)
  - `dream_of_before` → `dark_metro_hallway.png` (deep indigo)

### 4. chapterRoadmap.ts chapter_9 entry outdated (MEDIUM — FIXED)
- **File:** `artifacts/mobile/data/chapterRoadmap.ts`
- **Problem:** Entry had `status: 'planned'`, no `nodeCount`, placeholder locations/flags/endings from the pre-write spec.
- **Fix:** Updated to `status: 'complete'`, `nodeCount: 120`, all 11 actual locations, all 27 introduced flags, all 18 actual endings, accurate major choices and companion focus.

---

## Validation Results

### Node Reachability
All 120 nodes are reachable through at least one path from `chapter9_start`. Dice-check nodes that reference themselves as `nextNode` (e.g., `c9_scar_door_agility_dice`, `c9_machine_control_dice`) are correct — the engine routes to `diceCheck.successNode` / `diceCheck.failureNode`, making the self-reference unreachable in practice.

### nextNode Integrity
All `nextNode` references resolve to valid node IDs. Key cross-references confirmed:
- `c9_varr_dissect_end` — exists (line 2592)
- `c9_heir_second_meeting` — exists (line 2560)
- `c9_mark_madness_end` — exists (line 2578)
- `c9_mira_tower_arrival` — exists (line 1817)
- `c9_tower_broadcast_destroyed` — exists (line 1786)
- `c9_late_junction` — exists (line 1462)
- `chapter9_start` — exists (line 22)
- All dice `successNode` / `failureNode` targets verified present

### Endings Tracker (Route Codex)
All 18 endings now registered:

| ID | Type | Location |
|---|---|---|
| ending_ch9_machine_saint | death | Machine Graveyard |
| ending_ch9_relic_vessel | corruption | Marked Shrine |
| ending_ch9_memory_collapse | death | Memory Storm |
| ending_ch9_pulse_overload | death | Pulse Engine |
| ending_ch9_cain_executes | betrayal | Rust Cathedral |
| ending_ch9_tram_collapse | death | Broken Tram Core |
| ending_ch9_first_voice_merge | corruption | Old Signal Tower |
| ending_ch9_tower_fail | death | Old Signal Tower |
| ending_ch9_mira_saves | companion | Corruption Garden |
| ending_ch9_corruption_garden | death | Corruption Garden |
| ending_ch9_gate_fragment | secret ★ | Gate Fragment Chamber |
| ending_ch9_dream_of_before | wanderer | Dream of Before |
| ending_ch9_savior_path | savior | Resolution |
| ending_ch9_tyrant_path | tyrant | Resolution |
| ending_ch9_survived | faction | Resolution |
| ending_ch9_mark_madness | death | Pulse Engine |
| ending_ch9_varr_dissects | death | Relic Scar |
| ending_ch9_true_ending_req | secret ★ | Resolution |

### Flags
All `setFlags` values are freeform strings, consistent with the existing pattern used across chapters 1–8. No invalid flag type used. 27 new flags introduced.

### Stat Changes
All stat fields in `effects` and `effectsOnEnter` use valid `ChoiceEffects` keys: `health`, `intelligence`, `agility`, `strength`, `charisma`, `luck`, `morale`, `corruption`, `relics`, `glassCourt`, `hollowChildren`, `lastArchive`, `miraTrust`, `cainTrust`, `scrap`. No invalid fields found.

### Class Requirements
All `requirements.classes` use valid `ClassId` values: `relic_hunter`, `blade_survivor`, `tactician`, `shadow_broker`, `esper`, `medic`, `gun_scavenger`.

### Background Requirements
All `requirements.backgrounds` use valid `BackgroundId` values: `fallen_noble`, `runaway_experiment`, `wasteland_orphan`, `underground_medic`, `forgotten_scholar`, `exiled_soldier`, `black_market_courier`.

### Dice Checks (9 total)
| Node | Stat | Difficulty | Dice |
|---|---|---|---|
| c9_scar_door_agility_dice | agility | 14 | d20 |
| c9_machine_control_dice | intelligence | 13 | d20 |
| c9_first_voice_charisma_dice | charisma | 14 | d20 |
| c9_memory_storm_luck_dice | luck | 12 | d20 |
| c9_pulse_strength_dice | strength | 15 | d20 |
| c9_cain_standoff_dice | charisma | 15 | d20 |
| c9_tram_repair_dice | intelligence | 14 | d20 |
| c9_tower_agility_destroy_dice | agility | 13 | d20 |
| c9_gate_fragment_interface | intelligence | 16 | d20 |

All use valid `DiceStat` values and `d20` dice type.

### Corruption Choices (10+)
Corruption-modifying choices verified:
- `c9_touch_scar` (+1), `c9_scar_force_interface` (+3), `c9_scar_door_force` entry (+2)
- `c9_varr_threaten_back` (+4), `c9_varr_blast_leave` (+4)
- `c9_machine_dominate_choice` (+4), `c9_machine_dominate` entry (+3)
- `c9_heir_interface_truth` entry (+1), `c9_first_voice_accept` entry (+8)
- `c9_cain_mark_intimidate` (+4), `c9_pulse_dominate_direct/survey_dominate` (+5/+5)
- `c9_pulse_dominate_path` entry (+8)
- Multiple corruption-reducing nodes: `c9_first_voice_resisted` (−2), `c9_pulse_protect_path` (−3), `c9_signal_tower_silenced` (−5), `c9_mira_rescue_accept` (−8), `c9_dream_accept_name` (−2)

### Route History
Route history is recorded by the game engine (`StoryPanel.tsx`) at each node transition — the chapter data does not need to manage this directly. All major choices have unique `id` strings, making them individually identifiable in history entries.

### Route Codex Progress
Chapter 9 now has `status: 'complete'` and `nodeCount: 120` in `chapterRoadmap.ts`. The Route Codex will display it as a complete chapter with 18 discoverable endings.

### Developer Mode Search and Jump
All 120 nodes have unique `id` strings prefixed with `chapter9_start` or `c9_`. Developer Mode searches all nodes in `STORY_NODES` — since `CHAPTER_9_NODES` is spread into `STORY_NODES` in `story/index.ts`, all nodes are findable and jumpable.

### Image Fallbacks
All 11 Ch9 imageKeys now have:
1. A `require()` entry in `BACKGROUND_IMAGES` pointing to an existing placeholder PNG
2. A named `GradientConfig` in `BACKGROUND_GRADIENTS` with a distinct thematic palette
The `getBackgroundGradient()` helper will serve the named gradient (not the generic default) for every Ch9 location.

### Save/Load
No special save logic is needed in chapter files — the game engine persists `GameState` (including `currentNodeId`, `flags`, stats, inventory, companions, faction rep) via its own save system. Ch9 nodes use only standard `GameState` fields.

### App Status
App running with no errors. Metro bundler clean. No TypeScript issues from the story/index.ts spread of CHAPTER_9_NODES.

---

## Major Routes

### Route 1 — The Reckoning (Low Corruption / Savior)
`chapter9_start` → `c9_relic_scar_arrive` → `c9_scar_door_opened` → `c9_machine_graveyard_complete` → `c9_memory_storm_survived` → `c9_mid_junction` → `c9_pulse_protect_path` → `c9_pulse_engine_sealed` → `c9_rust_cathedral_arrive` → `c9_mael_gate_warning` → `c9_cain_honest_response` → `c9_late_junction` → `c9_tram_complete` → `c9_tower_broadcast_destroyed` → `c9_corruption_garden_arrive` → `c9_garden_complete` → `c9_gate_fragment_acquired` → `c9_dream_return` → `c9_chapter_resolution` → **`ending_ch9_savior_path`** or **`ending_ch9_true_ending_req`**

### Route 2 — The Descent (High Corruption / Tyrant)
`chapter9_start` → `c9_scar_door_force` → `c9_machine_dominate` → `c9_shrine_first_voice_context` → `c9_first_voice_accept` → `c9_pulse_dominate_path` → `c9_cain_standoff_dice` (fail) → **`ending_ch9_cain_executes`**
OR: survive Cain → `c9_tower_merge_end` → **`ending_ch9_first_voice_merge`**
OR: survive all → **`ending_ch9_tyrant_path`**

### Route 3 — The Companion Route (Mira Focus)
`chapter9_start` → midgame with high miraTrust → `c9_old_signal_tower_arrive` → `c9_mira_tower_arrival` → `c9_corruption_garden_arrive` → `c9_garden_mira_rescue` → `c9_mira_saves_end` → **`ending_ch9_mira_saves`**

### Route 4 — Research Compliance
`chapter9_start` → `c9_varr_first_encounter` → `c9_varr_volunteer_research` → `c9_varr_dissect_end` → **`ending_ch9_varr_dissects`**

### Route 5 — The Dream
`chapter9_start` → midgame → `c9_gate_fragment_acquired` → `c9_dream_of_before_arrive` → `c9_dream_pre_collapse` → `c9_dream_stay_end` → **`ending_ch9_dream_of_before`**

### Route 6 — Secret: Gate Fragment Secured
`chapter9_start` → low corruption throughout → `c9_gate_fragment_acquired` → `c9_gate_fragment_secret_end` → **`ending_ch9_gate_fragment`** (maxCorruption: 25 required)

### Route 7 — True Ending Requirements
`chapter9_start` → `c9_memory_storm_survived` (all 3 fragments) → `c9_gate_fragment_acquired` → `c9_true_ending_req_end` → **`ending_ch9_true_ending_req`** (flags: `gate_fragment_acquired` + `memory_three_accessed` required)

---

## Remaining Warnings

| Warning | Severity | Notes |
|---|---|---|
| All 11 Ch9 imageKeys use placeholder art | Low | TODO comments added in images.ts. Dedicated Chapter 9 pixel art needed for final release. |
| `corruption_garden` and `old_signal_tower` share `surface_ruins.png` | Low | Visually identical locations — distinct art recommended. |
| `marked_shrine` and `memory_storm` share `archive_ruin_wall.png` | Low | Both shrine-like — distinct art recommended. |
| `relic_scar`, `pulse_engine`, `gate_fragment_chamber` share `relic_engine_room.png` | Low | Three distinct locations mapped to same art. |
| `c8_chapter8_end` no longer marks as `ending_ch8_survived` | Info | `ending_ch8_survived` entry remains in endings.ts for Route Codex historical record, but the node no longer auto-discovers it. Consider adding discovery via a flag-check or keeping the transition as-is. |
| Route Codex doesn't yet have specific Ch9 class/background unlock hints | Info | `RouteCodexScreen.tsx` has hardcoded class/background hints for specific endings — Ch9 class-gated paths not yet surfaced there. |

---

## Recommended Entry Points into Chapter 10

Chapter 10 ("Broken Companions") should branch from three distinct end-states established in Ch9:

| Entry Flag | Node | Route Context |
|---|---|---|
| `chapter9_complete` | `c9_chapter9_end` | Standard survival — any path that reaches chapter resolution |
| `savior_path_requirements_begun` + `chapter9_complete` | `c9_chapter_resolution` → savior path | Low corruption, Gate Fragment acquired, tower silenced |
| `true_ending_req_chapter9_complete` | `c9_true_ending_req_end` | Gate Fragment + Memory Storm depth 3 + low corruption |
| `pulse_dominate_chosen` | Chapter 10 tyrant branch | High corruption, amplification chosen — Mira and Cain respond differently |
| `cain_backs_down_ch9` or `cain_honest_response` | Cain loyalist path | Cain still present, passed his test |
| `cain_corridor_bypassed` | Cain estrangement path | Cain trust damaged — opens Chapter 10 confrontation route |
| `mira_saves_ch9` | *(ending, no Ch10)* | Companion ending — Chapter 10 starts differently if this fires |
| `gate_fragment_acquired` | Fragment carrier path | Unlocks negotiation options in final chapters |
| `first_voice_delayed` | First Voice delayed path | Tower silenced — First Voice returns in Ch10 via different vector |

---

*Audit complete. All critical issues resolved. App running.*
