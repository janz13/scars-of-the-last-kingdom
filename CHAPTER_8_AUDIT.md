# Chapter 8 "Hunger War" — Audit Report

**Audited:** 2026-05-04  
**File:** `artifacts/mobile/data/story/chapter8.ts`  
**Status:** PASS — all issues identified and resolved

---

## Summary

Chapter 8 was fully audited across six systems: TypeScript correctness, node reachability, ending registration, image key coverage, dice check integrity, and choice requirement validity. One category of issues was found and fixed: **8 unreachable supplemental nodes** had no inbound choices pointing to them. All were corrected. The chapter now passes all checks with zero errors.

---

## Audit Checklist

### 1. TypeScript — PASS

```
pnpm --filter @workspace/mobile run typecheck
> tsc -p tsconfig.json --noEmit
(no output — clean)
```

No type errors in chapter8.ts or any file it touches. All `StoryNode`, `Choice`, `DiceCheck`, `ChoiceEffects`, `ChoiceRequirements`, `EndingType`, and `DiceStat` usages conform to `artifacts/mobile/data/types.ts`.

---

### 2. Node Reachability — PASS (after fixes)

**Issue found:** 8 nodes in the `// SUPPLEMENTAL NODES` block (lines 1834–2007 of the original file) had no inbound `nextNode`, `successNode`, or `failureNode` reference pointing to them. They were unreachable from any play path.

**Nodes affected and fixes applied:**

| Orphaned Node | Fixed By Adding Choice To |
|---|---|
| `c8_vault_interior_survey` | `c8_grain_vault_arrive` — "Survey the vault interior first" |
| `c8_aqueduct_downstream_check` | `c8_aqueduct_arrive` — "Walk the downstream sections first" |
| `c8_camp_medical_triage` | `c8_camp_state` — "Assess the medical situation" |
| `c8_riot_water_division` | `c8_riot_survive` — "Stay and manage the water distribution" |
| `c8_soup_kitchen_collective` | `c8_bone_soup_arrive` — "Talk to the kitchen collective" |
| `c8_orchard_restoration_detail` | `c8_orchard_assess` — "Get Dever's detailed assessment" |
| `c8_bridge_approach_walk` | `c8_starving_bridge_arrive` — "Walk through the dispersal zone" |
| `c8_chalk_private_moment` | `c8_camp_hollow_children` — "Find Chalk somewhere private" |

**Post-fix verification (automated node graph check):**
- Total defined StoryNodes: 105 (per chapterRoadmap.ts)
- Broken references (nextNode targets missing): **0**
- Unreachable nodes (orphans): **0**
- All 8 supplemental nodes confirmed REACHABLE ✓

---

### 3. Ending Registration — PASS

All 23 Chapter 8 endings verified present in `artifacts/mobile/data/endings.ts`.

| Ending ID | Type | Registered |
|---|---|---|
| `ending_ch8_vault_distributed` | savior | ✓ |
| `ending_ch8_vault_hoarded` | tyrant | ✓ |
| `ending_ch8_water_riot_death` | death | ✓ |
| `ending_ch8_clinic_last_medicine` | sacrifice | ✓ |
| `ending_ch8_clinic_saved` | savior | ✓ |
| `ending_ch8_hollow_children_starve` | death | ✓ |
| `ending_ch8_hollow_children_saved` | savior | ✓ |
| `ending_ch8_roan_betrayal` | betrayal | ✓ |
| `ending_ch8_sera_saved` | companion | ✓ |
| `ending_ch8_sera_lost` | death | ✓ |
| `ending_ch8_front_victory` | faction | ✓ |
| `ending_ch8_front_collapse` | death | ✓ |
| `ending_ch8_aqueduct_repaired` | savior | ✓ |
| `ending_ch8_aqueduct_failed` | wanderer | ✓ |
| `ending_ch8_camp_relief` | savior | ✓ |
| `ending_ch8_camp_collapse` | death | ✓ |
| `ending_ch8_veyl_corruption` | corruption | ✓ |
| `ending_ch8_veyl_exposed` | secret | ✓ |
| `ending_ch8_orchard_restored` | savior | ✓ |
| `ending_ch8_tunnels_sealed` | sacrifice | ✓ |
| `ending_ch8_bridge_accord` | faction | ✓ |
| `ending_ch8_bridge_collapse` | death | ✓ |
| `ending_ch8_chalk_last_stand` | sacrifice | ✓ |

All `endingType` values are valid members of the `EndingType` union in types.ts.  
All `endingId` values match the IDs in endings.ts exactly.

---

### 4. Image Key Coverage — PASS

All 11 image keys used in chapter8.ts are registered in `artifacts/mobile/constants/images.ts`.

| imageKey | Location |
|---|---|
| `empty_ration_square` | The Empty Ration Square |
| `water_riot` | The Water Riot |
| `burned_clinic` | The Burned Clinic |
| `grain_vault` | The Grain Vault |
| `bone_soup_kitchen` | The Bone Soup Kitchen |
| `scavenger_front` | The Scavenger Front |
| `broken_aqueduct` | The Broken Aqueduct |
| `famine_camp` | The Famine Camp |
| `dead_orchard` | The Dead Orchard |
| `siege_tunnels` | The Siege Tunnels |
| `starving_bridge` | The Starving Bridge |

Each key has a corresponding gradient fallback defined. No node references an unregistered key.

---

### 5. Dice Check Integrity — PASS

9 dice checks found in chapter8.ts. All `successNode` and `failureNode` targets verified to exist as defined StoryNodes.

| Dice Check Node | Stat | Difficulty | successNode | failureNode |
|---|---|---|---|---|
| `c8_riot_push_through` | agility | 13 | `c8_riot_survive` | `c8_water_riot_death_end` |
| `c8_riot_negotiate_dice` | charisma | 14 | `c8_riot_peace` | `c8_riot_survive` |
| `c8_clinic_search_dice` | luck | 12 | `c8_clinic_choice` | `c8_mira_last_medicine_end` |
| `c8_vault_agility_dice` | agility | 14 | `c8_vault_distribute` | `c8_vault_hoard` |
| `c8_front_push_dice` | strength | 15 | `c8_front_push_success` | `c8_front_fallback` |
| `c8_aqueduct_repair_dice` | intelligence | 16 | `c8_aqueduct_repair_success` | `c8_aqueduct_repair_fail` |
| `c8_camp_find_sera_dice` | luck | 12 | `c8_sera_saved_end` | `c8_sera_lost_end` |
| `c8_bridge_speech_dice` | charisma | 15 | `c8_bridge_speech_success` | `c8_bridge_speech_fail` |
| `c8_vault_roan_plan` (corridor) | agility | 14 | `c8_vault_interior_survey` | `c8_vault_hoard` |

All `DiceStat` values (`agility`, `charisma`, `intelligence`, `luck`, `strength`) are valid per types.ts.  
All `DiceType` values use `d20`. No `criticalSuccessNode` or `criticalFailureNode` used (optional fields, not required).

---

### 6. Choice Requirements — PASS

All `classes` and `backgrounds` values in `requirements` objects use valid IDs from types.ts.

**Class requirements (5 total):**
- `esper` ✓
- `shadow_broker` ✓
- `tactician` ✓
- `blade_survivor` ✓
- `relic_hunter` ✓

**Background requirements (6 total):**
- `underground_medic` ✓
- `black_market_courier` ✓
- `fallen_noble` ✓
- `runaway_experiment` ✓
- `forgotten_scholar` ✓
- `exiled_soldier` ✓

Note: `underground_medic` is a **background** in types.ts (not a class). All chapter8.ts requirements that reference it do so correctly via `backgrounds:`, not `classes:`. No invalid cross-use found.

All `flags`, `blockedFlags`, `factionRep`, `miraTrust`, `cainTrust`, `miraPresent`, and `cainPresent` requirements are structurally valid per the `ChoiceRequirements` interface.

---

### 7. Systems Integration — PASS

| System | Status | Notes |
|---|---|---|
| `data/story/index.ts` | ✓ | `CHAPTER_8_NODES` imported and merged into `STORY_NODES` |
| `data/chapterRoadmap.ts` | ✓ | chapter_8: status `'complete'`, nodeCount `105` |
| `data/endings.ts` | ✓ | All 23 `ending_ch8_*` entries present |
| `constants/images.ts` | ✓ | All 11 imageKeys registered with gradient fallbacks |
| `logic/storyValidator.ts` | ✓ | Validates all nodes/choices/endings/imageKeys automatically at runtime in Developer Mode |
| `components/DeveloperPanel.tsx` | ✓ | JUMP TO NODE searches by id/title/location/chapter — all Ch8 nodes accessible via `chapter:'Chapter 8'` |
| `logic/saveSystem.ts` | ✓ | Saves full `GameState` including `routeHistory`, `currentNodeId`, `flags` — no chapter-specific wiring needed |
| `screens/RouteCodexScreen.tsx` | ✓ | Displays chapter name, location, choices from `routeHistory` — generic, works for Ch8 automatically |

---

## Chapter 8 Content Statistics

| Metric | Count |
|---|---|
| StoryNode objects | 105 |
| Unique locations | 11 |
| Ending nodes | 23 |
| Dice checks | 9 |
| Class-gated choices | 5 |
| Background-gated choices | 6 |
| Flag-gated choices | 21+ |
| Supplemental/optional nodes | 8 (now all reachable) |

---

## Locations

1. The Empty Ration Square *(chapter entry hub)*
2. The Water Riot
3. The Burned Clinic
4. The Grain Vault
5. The Bone Soup Kitchen
6. The Scavenger Front
7. The Broken Aqueduct
8. The Famine Camp
9. The Dead Orchard *(flag-gated: `dead_orchard_known`)*
10. The Siege Tunnels *(flag-gated: `roan_met`)*
11. The Starving Bridge

---

## Issues Found and Fixed

| # | Issue | Severity | Resolution |
|---|---|---|---|
| 1 | `c8_vault_interior_survey` unreachable — no inbound choice | High | Added choice to `c8_grain_vault_arrive` |
| 2 | `c8_aqueduct_downstream_check` unreachable — no inbound choice | High | Added choice to `c8_aqueduct_arrive` |
| 3 | `c8_camp_medical_triage` unreachable — no inbound choice | High | Added choice to `c8_camp_state` |
| 4 | `c8_riot_water_division` unreachable — no inbound choice | High | Added choice to `c8_riot_survive` |
| 5 | `c8_soup_kitchen_collective` unreachable — no inbound choice | High | Added choice to `c8_bone_soup_arrive` |
| 6 | `c8_orchard_restoration_detail` unreachable — no inbound choice | High | Added choice to `c8_orchard_assess` |
| 7 | `c8_bridge_approach_walk` unreachable — no inbound choice | High | Added choice to `c8_starving_bridge_arrive` |
| 8 | `c8_chalk_private_moment` unreachable — no inbound choice | High | Added choice to `c8_camp_hollow_children` |

No other issues found. No incorrect type usages, no missing ending registrations, no broken nextNode references, no invalid image keys, no misused class/background IDs.

---

## Final Status

**Chapter 8 "Hunger War" — AUDIT COMPLETE — ALL CHECKS PASS**
