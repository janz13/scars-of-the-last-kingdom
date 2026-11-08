# CHAPTER 12 AUDIT — Crown of Ash

**Audit Date:** 2026-05-04  
**Auditor:** Automated BFS + mechanical scan + typecheck  
**Chapter File:** `artifacts/mobile/data/story/chapter12.ts`

---

## Summary

| Check | Result |
|---|---|
| Total nodes | 137 (107 story + 30 endings) |
| BFS reachable | **137/137 — all reachable** |
| Broken nextNode refs | **0** |
| TypeScript errors | **0** (after fixes — see Issues Fixed) |
| Dice checks | 11 |
| Endings (isEnding: true) | 30 |
| Ending IDs in endings.ts | **30/30 — all present** |
| Image keys (BACKGROUND_IMAGES) | 11/11 ✓ |
| Image keys (BACKGROUND_GRADIENTS) | 11/11 ✓ |
| story/index.ts import | ✓ CHAPTER_12_NODES |
| DeveloperPanel node search | ✓ via STORY_NODES |
| Route Codex endings display | ✓ all 30 ch12 endings in endings.ts |
| Save/load compatibility | ✓ AsyncStorage save system is node-agnostic |
| chapterRoadmap.ts status | ✓ 'complete', nodeCount: 137 |

---

## Major Routes Found

### Entry Paths (from chapter12_start)
- **Both companions (both_companions_ch12)** → `c12_square_both` → morale +5
- **Mira only (mira_only_ch12)** → `c12_square_mira_only` → morale +3
- **Cain only (cain_only_ch12)** → `c12_square_cain_only` → morale +3
- **Lone wanderer (lone_wanderer_ch12)** → `c12_square_alone` → morale -3
  - Lone wanderer can immediately exit via `c12_silent_departure_end` (wanderer ending)

### Primary Route Branches (from c12_square_routes)
All routes converge at the **Burning Market** or **War Council** before fanning to five faction fronts.

#### War Council Route (c12_war_council_arrive)
- Tactician class read → `c12_council_tactical_read` → council_tactical_advantage flag
- Group address → charisma d8 DC 7 dice check:
  - Success → `c12_council_peace_success` (ceasefire)
  - Critical success → `c12_unity_route_unlocked` (unity_route_available flag)
  - Failure → `c12_council_peace_fail`
- All outcomes lead to `c12_council_route_choice` (all five fronts open)

#### Burning Market Route (c12_burning_market)
- Shadow broker class → shadow network intel (varr_defection_known, sera_order_known, mael_failsafe_known, hollow_representative_unauthorized)
- Black market courier background → extraction schematic cache
- Mother Chalk meeting → broken_throne_known flag
- Mira companion → Glass Court device threat assessment
- Heir sighting → heir_surface_sighted, heir_unmasked flags

### Five Faction Fronts

#### Saint Front (c12_saint_front_arrive) — 16 nodes
- Exiled soldier background → recognized entry (+3 ironSaints)
- Veyra confrontation → alliance path (ironSaints ≥ 8) or strength d8 DC 8 dice check
  - Critical failure → `c12_saint_crusade_death_end` (death)
  - Corruption ≥ 70 (hidden) → `c12_saint_crusade_death_end` (death)
- Inquisitor Sera confrontation → charisma d10 DC 8 dice check
  - Success → sera_converted, sera_mandate_revised (+8 ironSaints)
  - Failure → `c12_sera_execution_end` (death)
  - Critical failure → `c12_saint_crusade_death_end` (death)
- Saint ally path (Cain companion moment) → `c12_saint_cain_moment`
- Outcomes: Iron Saints ally, battle route, or death

#### Glass Barricade (c12_glass_barricade_arrive) — 13 nodes
- Fallen noble background → Seraphine access
- Intelligence d8 DC 7 dice check (extraction device analysis)
  - Success → device_weakness_identified
  - Failure → `c12_glass_extraction_end` (death)
- Juno servant network → juno_glass_accessed
- Mira companion → glass_mira_analysis flag
- Varr defection path (requires varr_defection_known) → varr_real_defection OR `c12_varr_betrayal_end` (betrayal)
- Outcomes: Glass Court ally (disable device), or betrayal/death

#### Red Choir March (c12_red_choir_arrive) — 14 nodes
- Underground medic background → `c12_choir_underground_medic`
- Esper class → direct Veyl resonance connection
- Charisma d8 DC 6 dice check (redirect broadcast)
  - Success → veyl_redirected (+6 redChoir)
  - Critical failure → `c12_choir_consumed_end` (corruption ending)
  - Corruption ≥ 60 → `c12_choir_city_end` (corruption ending)
- Redirect attempt → `c12_choir_redirect_attempt` → `c12_choir_outcome`
- Outcomes: Red Choir ally (redirect), city burns (death), or choir consumed (corruption)

#### Archive Siege (c12_archive_siege_arrive) — 13 nodes
- Relic hunter class → relic scan (+3 intelligence)
- Forgotten scholar background → Mael direct access
- Truth bearer flag → `c12_archive_truth_bearer_route` (+4 lastArchive, faction_resolution_available)
- Intelligence d10 DC 8 dice check (sub-city record analysis)
  - Success → archive_analysis_complete, faction_resolution_available
  - Mira companion → `c12_archive_mira_analysis`
- Vorn final encounter → archive_vorn_resolved
- Outcomes: Archive Crown (Mael failsafe broadcast), or betrayal (mael_seal_complete)

#### Hollow Children Hideout (c12_hollow_arrive) — 13 nodes
- Wasteland orphan background → `c12_hollow_orphan_recognition` (+2 hollowChildren)
- Mother Chalk guide path
- Runaway experiment background → `c12_hollow_runaway_scene`
- Agility d6 DC 6 dice check (hideout route)
  - Success → hollow_route_navigated (+3 hollowChildren)
  - Critical failure → `c12_hollow_collapse_end` (death)
- Inquisitor Sera hidden approach option
- Choices: commit children to surface, maintain tunnel protocol, or emergency evacuation
- Outcomes: Hollow Crown (children committed) or collapse (death)

### Broken Throne Convergence (c12_broken_throne_arrive) — 27 nodes
All five faction routes converge here. This is the chapter's major decision hub.

- **Tyrant path** (corruption ≥ 40): strength d12 DC 9 → `c12_throne_tyrant_success` or `c12_throne_collapse_end`
- **Savior path**: charisma d10 DC 9 → `c12_throne_savior_success` or `c12_execution_plaza_arrive`
  - Critical failure → `c12_broken_throne_betrayal_end`
- **Wander path**: `c12_throne_wander_path`
- **Unity check** (unity_route_available): `c12_throne_unity_check`
- **Destroy path**: `c12_throne_destroy_path`
- **Heir confrontation**: reveal / accept / reject / betrayal knife
- **Companion final moments**: Mira mercy scene, Cain war scene
- **Final decision node** → routes to five faction crown endings or neutral/protector endings

### Late-Game Locations
- **Execution Plaza** (c12_execution_plaza_arrive): prisoner intervention — agility d8 DC 7
- **Citywide Battlefield** (c12_citywide_battlefield): gun scavenger / blade survivor class routes, or luck d6 DC 5 roll

---

## Endings Found (30 total)

### Faction Endings (5)
| ID | Type | Condition |
|---|---|---|
| ending_ch12_iron_crown | faction | ironSaints ≥ 12, Sera converted, alliance with Veyra |
| ending_ch12_glass_crown | faction | glassCourt ≥ 12, device disabled, Seraphine trust |
| ending_ch12_hollow_crown | faction | hollowChildren ≥ 12, children committed to surface |
| ending_ch12_red_crown | faction | redChoir ≥ 12, broadcast redirected |
| ending_ch12_archive_crown | faction | lastArchive ≥ 12, Mael failsafe broadcast |

### Tyrant Ending (1)
| ID | Type | Condition |
|---|---|---|
| ending_ch12_tyrant_of_ash | tyrant | corruption ≥ 40, strength d12 DC 9 success, throne claimed |

### Savior Ending (1)
| ID | Type | Condition |
|---|---|---|
| ending_ch12_savior_of_ash | savior | charisma d10 DC 9 success, companion moments, "city saved" final choice |

### Wanderer Endings (4)
| ID | Type | Condition |
|---|---|---|
| ending_ch12_silent_departure | wanderer | lone_wanderer_ch12 flag, "walk through" choice at Ashen Square |
| ending_ch12_lone_wanderer_lock | wanderer | lone wanderer route completed at Broken Throne |
| ending_ch12_crown_ash_neutral | wanderer | neutral path at Broken Throne |
| ending_ch12_last_protector | wanderer | protector path with both companions |

### Companion Endings (2)
| ID | Type | Condition |
|---|---|---|
| ending_ch12_miras_mercy | companion | Mira mercy scene completed, mira_mercy_complete flag |
| ending_ch12_cains_war | companion | Cain war scene completed, cain_stays_city flag |

### Secret Ending (1)
| ID | Type | Condition |
|---|---|---|
| ending_ch12_unity_almost | secret | unity_route_available flag, unity covenant invoked at Broken Throne |

### Death Endings (9)
| ID | Location |
|---|---|
| ending_ch12_saint_crusade_death | Saint Front (Veyra mandate / corruption ≥ 70) |
| ending_ch12_sera_execution | Saint Front (Sera confrontation failure) |
| ending_ch12_glass_extraction | Glass Barricade (intelligence check failure) |
| ending_ch12_hollow_collapse | Hollow Children Hideout (agility critical failure) |
| ending_ch12_battlefield_overwhelmed | Citywide Battlefield (luck check failure) |
| ending_ch12_all_factions_burn | Broken Throne (all factions destroyed) |
| ending_ch12_throne_collapse | Broken Throne (tyrant claim failed) |
| ending_ch12_execution_plaza | Execution Plaza (intervention failed) |
| ending_ch12_city_burns | Red Choir March (broadcast not redirected, death variant) |

### Betrayal Endings (4)
| ID | Location |
|---|---|
| ending_ch12_broken_throne | Broken Throne (faction breakdown) |
| ending_ch12_varr_betrayal | Glass Barricade (Varr's defection was a performance) |
| ending_ch12_mael_seal | Archive Siege (Mael seals Archive with bearer inside) |
| ending_ch12_heir_knife | Broken Throne (Masked Heir strikes — sub-city rejection) |

### Corruption Endings (3)
| ID | Condition |
|---|---|
| ending_ch12_choir_consumed | Red Choir charisma critical failure (mark becomes broadcast) |
| ending_ch12_choir_city | Broadcast completes with corruption ≥ 60 |
| ending_ch12_tyrant_corrupt | Tyrant success with corruption ≥ 70 |

---

## Issues Fixed

### 1. Missing `nextNode` on all 11 dice-check choices (TypeScript error TS2741)

**Root cause:** The `Choice` interface requires `nextNode: string` as a mandatory field, even when `diceCheck` is present. All 11 dice-check choices in chapter12.ts omitted `nextNode`.

**Fix:** Added `nextNode` set to the `successNode` value for each of the 11 dice checks (matching the established pattern from earlier chapters):

| Choice ID | Added nextNode |
|---|---|
| c12_demand_roll | c12_council_peace_success |
| c12_strength_roll | c12_saint_strength_success |
| c12_sera_dice_roll | c12_saint_sera_success |
| c12_glass_int_roll | c12_glass_int_success |
| c12_choir_dice_roll | c12_choir_cha_success |
| c12_archive_int_roll | c12_archive_int_success |
| c12_hollow_agility_roll | c12_hollow_agility_success |
| c12_tyrant_dice_roll | c12_throne_tyrant_success |
| c12_savior_dice_roll | c12_throne_savior_success |
| c12_intervene_roll | c12_execution_save_success |
| c12_battlefield_luck_roll | c12_battlefield_survive |

**Result:** Typecheck went from 11 errors → 0 errors.

### 2. Node count corrected in chapterRoadmap.ts

**Root cause:** The chapter was planned for 141 nodes (111 story + 30 endings), but the implemented count is 137 (107 story + 30 endings). Four story nodes were collapsed during writing (intermediate transitions merged into adjacent nodes).

**Fix:** Updated `nodeCount: 141 → 137` in `chapterRoadmap.ts` for `id: 'chapter_12'`.

### 3. BFS parser initially reported 2 unreachable nodes (false positive)

**Root cause:** The initial audit script did not scan `criticalFailureNode` references, so `c12_hollow_collapse_end` and `c12_choir_consumed_end` appeared unreachable. Both are correctly referenced via `criticalFailureNode` in their respective dice checks.

**Fix:** Updated BFS script to include `criticalFailureNode`. Final result: **137/137 reachable**.

---

## Mechanical Verification

### Stats
- **health:** 11 change references (damage from failed checks and battles)
- **morale:** 32 change references (highest-traffic stat — faction diplomacy)
- **intelligence:** 20 change references (archive/market intel rewards)
- **corruption:** 12 change references (tyrant path, choir failure, esper routes)

### Resources
- **medicine:** 1 (courier cache: +2)
- **ammo:** 2 (courier cache: +3)

### Companion Trust
- **miraTrust:** 5 change references
- **cainTrust:** 3 change references

### Faction Reputation
- **ironSaints:** 15 changes (alliance, battle, confrontation)
- **hollowChildren:** 14 changes (hideout navigation, surface commitment)
- **lastArchive:** 12 changes (analysis, siege, failsafe)
- **redChoir:** 10 changes (broadcast redirect, Veyl dialogue)
- **glassCourt:** 9 changes (device analysis, Juno network, Varr path)

### Flags
- **217 total flag sets**, 193 unique flags
- Chapter lifecycle flags: `chapter12_begun`, `chapter12_complete`
- Companion configs: `chapter12_both_companions`, `chapter12_mira_companion`, `chapter12_cain_companion`, `chapter12_lone_wanderer`
- Key resolution flags: `unity_route_available`, `council_ceasefire`, `sera_converted`, `varr_betrayal_complete`, `mael_failsafe_known`, `archive_analysis_complete`
- Ending trigger flags: `tyrant_throne_claimed`, `savior_route_complete`, `unity_almost_active`, `cain_stays_city`

### Dice Checks (11)
| ID | Stat | DC | Die | Loc |
|---|---|---|---|---|
| c12_demand_roll | charisma | 7 | d8 | War Council |
| c12_strength_roll | strength | 8 | d8 | Saint Front |
| c12_sera_dice_roll | charisma | 8 | d10 | Saint Front |
| c12_glass_int_roll | intelligence | 7 | d8 | Glass Barricade |
| c12_choir_dice_roll | charisma | 6 | d8 | Red Choir March |
| c12_archive_int_roll | intelligence | 8 | d10 | Archive Siege |
| c12_hollow_agility_roll | agility | 6 | d6 | Hollow Children |
| c12_tyrant_dice_roll | strength | 9 | d12 | Broken Throne |
| c12_savior_dice_roll | charisma | 9 | d10 | Broken Throne |
| c12_intervene_roll | agility | 7 | d8 | Execution Plaza |
| c12_battlefield_luck_roll | luck | 5 | d6 | Citywide Battlefield |

### Corruption-Gated Choices (5 instances)
- ≥ 70: Veyra proximity surge → instant death (hidden choice)
- ≥ 70: Choir march — Saints recognize corruption mark
- ≥ 60: Red Choir broadcast alternate path opens
- ≥ 40: Broken Throne tyrant route unlocked
- ≥ 70: Choir consumed alt path

### Class-Specific Choices (7 classes, 7 unique paths)
`tactician`, `shadow_broker`, `esper`, `relic_hunter`, `medic`, `gun_scavenger`, `blade_survivor`

### Background-Specific Choices (7 backgrounds, 7 unique paths)
`black_market_courier`, `exiled_soldier`, `fallen_noble`, `underground_medic`, `forgotten_scholar`, `wasteland_orphan`, `runaway_experiment`

### Faction Rep Requirements (11 instances)
- `ironSaints ≥ 8` (Veyra alliance invoke)
- `glassCourt ≥ 6` (Seraphine trust route)
- `redChoir ≥ 6` (Veyl direct access)
- `lastArchive ≥ 8` (Mael confidential route)
- `hollowChildren ≥ 6` (Chalk deep guidance)
- Crown ending thresholds (all at ≥ 12)

### Image Key Coverage (11/11)
All chapter 12 image keys have entries in both `BACKGROUND_IMAGES` and `BACKGROUND_GRADIENTS`:
`ashen_square`, `war_council`, `burning_market`, `saint_front`, `glass_barricade`, `red_choir_march`, `archive_siege`, `hollow_children_hideout`, `broken_throne`, `execution_plaza`, `citywide_battlefield`

All map to existing placeholder assets (no missing PNG files).

### Route History
Route history is recorded through the flag system — all major decision outcomes set named flags (e.g., `council_ceasefire`, `sera_converted`, `archive_analysis_complete`, `tyrant_throne_claimed`) that persist in save state and drive conditional logic in the Final Chapter.

### Developer Mode
`DeveloperPanel` searches `STORY_NODES` from `storyNodes.ts`, which imports from `story/index.ts` which spreads `CHAPTER_12_NODES`. All 137 chapter 12 nodes are searchable and jumpable from Developer Mode with no additional configuration.

### Save/Load
`GameContext` uses an AsyncStorage-based save system (`logic/saveSystem.ts`) that serializes the entire game state including `currentNodeId`. All chapter 12 node IDs are standard strings — save/load works transparently within this chapter.

---

## Remaining Warnings

1. **Placeholder art** — all 11 chapter 12 image keys use repurposed earlier-chapter assets (e.g., `ashen_square` → `surface_ruins.png`). Dedicated city-war pixel art is needed before final release. Comment `// TODO: Replace with dedicated city-war / faction-front pixel art` is present in `constants/images.ts`.

2. **Node count delta** — 4 fewer story nodes than the original plan (137 vs. 141). All intended narrative content is accounted for through node merges; no story gaps identified.

3. **`miraPresent` requirement** — one choice (`c12_intel_companion`) requires `miraPresent: true`. The game engine must resolve this requirement at runtime. No other companion-gated choices use `cainPresent` in the market; one uses it in the companion final moment.

4. **`luck` stat** — used in `c12_battlefield_luck_roll` (d6 DC 5). Verify that `luck` is initialized in the player stat block at game start; it appears in earlier chapters but confirm the default value is non-zero.

---

## Recommended Entry Points for Final Chapter 1

The following chapter 12 ending flags, if set, open enhanced routes in Final Chapter 1:

| Flag | Source | Benefit |
|---|---|---|
| `unity_almost_active` | ending_ch12_unity_almost (secret) | Strongest path to true ending |
| `crown_of_ash_savior` | ending_ch12_savior_of_ash | Savior route in Final Gate |
| `chapter12_complete` + faction crown flag | Any of 5 faction endings | Faction ally support at gate |
| `true_ending_route_active` (ch11) + any ch12 complete | Combined | True ending gate access |
| `iron_crown_held` / `glass_crown_held` / etc. | Individual crown endings | Faction-specific final dialogue |
| `cain_stays_city` | ending_ch12_cains_war | Cain's message arrives at gate |

**Recommended minimum entry:** `chapter12_start` — the chapter is self-contained and handles all companion configurations through its opening companion check node.

**Recommended full-route entry for testing:** Start with `both_companions_ch12`, `faction_truth_released`, and `chapter11_city_awakened` flags set, then navigate: War Council → critical success → all five fronts → Broken Throne → savior path success → Mira mercy scene → unity_almost ending.
