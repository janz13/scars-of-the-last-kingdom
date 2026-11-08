# CHAPTER 11 AUDIT — The City Beneath the City
**Audited:** 2026-05-04  
**Result: PASS** — 146/146 nodes reachable, 0 broken refs, 0 self-loops, typecheck clean

---

## Summary Stats

| Item | Count |
|---|---|
| Total nodes | 146 |
| Story nodes | 125 |
| Ending nodes | 21 |
| Locations | 11 |
| Dice checks | 8 |
| Class-specific choices | 5 classes covered |
| Background-specific choices | All 7 backgrounds covered |
| Image keys | 11 (all registered) |
| External refs | 1 (`chapter12_start` — correct) |

---

## BFS Reachability

```
Total nodes : 146
Reachable   : 146   ← CLEAN
Broken refs : 0
Self-loops  : 0
```

All 146 nodes are reachable from `chapter11_start`. No dead ends outside of the 21 intentional ending nodes (all have `choices: []`).

---

## Bugs Found and Fixed

### Bug 1 — `c11_core_resisted_voice` unreachable (FIXED)
**Root cause:** `c11_core_resist_choice` had two choices pointing directly to `c11_core_int_dice` and `c11_core_forward`, skipping the intermediate "Stable" confirmation node entirely.  
**Fix:** Collapsed `c11_core_resist_choice`'s choices to a single "Hold the resistance" option pointing to `c11_core_resisted_voice`, which then branches to int-dice or forward as intended.  
**Narrative impact:** The flow now reads correctly — resist → resistance confirmed stable → decide whether to analyse the Core fully.

### Bug 2 — `c11_housing_wasteland_orphan_recognize` self-loop (FIXED)
**Root cause:** The wasteland_orphan background choice inside `c11_housing_survivors_scene` had `nextNode: 'c11_housing_survivors_scene'` — the same node it lived in — creating an infinite loop for Wasteland Orphan players.  
**Fix:** Changed `nextNode` to `c11_housing_pale_curator_appears`, the correct next story beat (consistent with the other non-gated choice in the same node).  
**Narrative impact:** Wasteland Orphan players now receive the morale bonus and bond flag, then advance to the Pale Curator confrontation as intended.

---

## Major Routes

### The Gate Opening
**Entry:** `chapter11_start` → `c11_gate_sealed_door`  
Five approaches: mark directly (+5 corruption), intelligence dice (DC 7 d8), exiled_soldier background (free), black_market_courier background (free), or brute force → `ending_ch11_buried_city` (death).

### The Companion Configurations
Forked immediately at `c11_gate_companion_survey`:
- **Both companions** (`both_companions_ch11`) → `c11_gate_both_scene` → all routes available
- **Mira only** (`mira_only_ch11`) → medical/corruption monitoring intact
- **Cain only** (`cain_only_ch11`) → tactical routes intact
- **Lone wanderer** → maximum risk, unique `ending_ch11_lone_witness` available

### The Truth Route (Best Information)
`chapter11_start` → gate → platform → Vorn (trusted) → core (resisted) → core analysis (int dice DC 8) → housing block (escape Curator) → vault (int dice DC 6 success) → `vault_evidence_found` → heir confrontation → machine nursery (resist) → deep archive → `original_agreement_known` + `release_terms_known` → first gate → truth route → `c11_final_gate_path_end`  
**Flags required at gate:** `original_agreement_known` + `release_terms_known`

### The Machine Communion Route
Requires: `transit_machines_awakened` (mark-interface the Transit Line, +13 corruption total) + `sleeping_server_active` (Chapter 7 flag)  
Gate decision → `c11_gate_route_machines` → `c11_machine_communion_full` → `ending_ch11_machine_communion` (secret)

### The Heir Route
Requires: `heir_at_core` + `heir_allied` (set at Old Government Vault)  
Heir appears at core → vault access → alliance formed → gate → `c11_gate_route_heir` → `ending_ch11_masked_heir_alliance` (faction)  
OR betrayal if heir_allied: `ending_ch11_masked_heir_betrayal`

### The Savior Route
Gate → `c11_gate_route_savior` → seal + release documentation → `ending_ch11_city_awakened` (savior)

### The Corruption Route
`c11_core_corruption_surge` (≥70 corruption) → yield → `ending_ch11_blackout_core_death`  
Deep archive (≥70) → yield → `ending_ch11_deep_archive_madness`  
First gate (≥80) → `ending_ch11_corruption_ascendant`

---

## All 21 Endings

### Death (5)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_buried_city` | `c11_buried_city_end` | Force gate without mark |
| `ending_ch11_forgotten_platform_collapse` | `c11_platform_collapse_end` | Investigate NE pressure anomaly |
| `ending_ch11_machine_nursery_absorbed` | `c11_machine_nursery_absorbed_end` | Let Nursery pull take you |
| `ending_ch11_first_gate_fragment` | `c11_first_gate_fragment_end` | Touch First Gate directly |
| `ending_ch11_relic_transit_lost` | `c11_transit_lost_end` | Critical fail agility d6 on transit |

### Corruption (4)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_blackout_core_death` | `c11_blackout_core_death_end` | Yield to Core surge (corruption ≥70) |
| `ending_ch11_deep_archive_madness` | `c11_deep_archive_madness_end` | Let Archive read mark (corruption ≥70) |
| `ending_ch11_first_voice_consumed` | `c11_first_voice_consumed_end` | Critical fail charisma d10 vs First Voice |
| `ending_ch11_corruption_ascendant` | `c11_corruption_ascendant_end` | Approach First Gate (corruption ≥80) |

### Betrayal (3)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_pale_curator_captured` | `c11_curator_captured_end` | Comply with Pale Curator containment |
| `ending_ch11_vorn_deception` | `c11_vorn_deception_end` | Trust Vorn after archive records reveal his role |
| `ending_ch11_masked_heir_betrayal` | `c11_heir_betrayal_end` | Ally with Heir, discover agenda at First Gate |

### Wanderer (3)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_transit_escape` | `c11_transit_escape_end` | Board Transit Line back to surface |
| `ending_ch11_sealed_in_dark` | `c11_sealed_dark_end` | Stay below as permanent guardian |
| `ending_ch11_lone_witness` | `c11_lone_witness_end` | Silent ascent (lone_wanderer_ch11 flag) |

### Faction (2)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_old_government_truth` | `c11_gov_truth_end` | Re-seal Old Government Vault |
| `ending_ch11_masked_heir_alliance` | `c11_heir_alliance_end` | Open Gate via heir route |

### Secret (2)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_final_gate_path_unlocked` | `c11_final_gate_path_end` | Open Gate: `original_agreement_known` + `release_terms_known` |
| `ending_ch11_machine_communion` | `c11_machine_communion_end` | Open Gate via machine route: `sleeping_server_active` + `transit_machines_awakened` |

### Savior (2)
| Ending ID | Node | Trigger |
|---|---|---|
| `ending_ch11_truth_bearer` | `c11_truth_bearer_end` | Both companions + `truth_seeker_route` + `deep_archive_complete` |
| `ending_ch11_city_awakened` | `c11_city_awakened_end` | Seal Gate + release Vault documentation |

---

## Stat/Effect Audit

### Stats Changed (all using valid `ChoiceEffects` keys)
- **corruption** — modified at gate (±5–15), core (+5–+25), nursery (+5–+8 / −5), first gate (+5–+20 / −15 to −20), endings
- **intelligence** — +1 to +5 at platform, core analysis, vault, deep archive (reward nodes only)
- **morale** — +3 to +15 (rescue, resistances), −2 to −15 (abandonment, transit fail)
- **health** — −10 to −60 (structural risks, critical dice failures)
- **relics** — +1 (relic_hunter transit scan), +2 (relic_hunter nursery scan)
- **miraTrust / cainTrust** — not modified in Ch11 (companions are passive; trust was resolved in Ch10)
- **glassCourt** — −2 (noble recognition node: Glass Court architecture origin revealed)
- **lastArchive** — −5 (Curator escaped), −10 (vault evidence sealed)

All faction rep keys used: `glassCourt`, `lastArchive` — both valid `FactionRep` fields.

### Flags Introduced (chapter11-specific)
```
chapter11_begun, chapter11_both_companions, chapter11_mira_only, chapter11_cain_only,
chapter11_alone, sub_city_accessed, sub_city_descent_begun,
gate_opened_via_mark, gate_opened_via_soldier, gate_opened_via_courier,
gate_opened, gate_protocol_known, gate_partial_open,
forgotten_platform_arrived, ancient_script_first_contact,
platform_scholar_read, platform_noble_recognition, containment_period_known,
vorn_appeared, vorn_trusted, vorn_distrusted,
blackout_partial_truth_known, blackout_full_truth_known,
underworld_district_arrived, district_survivors_found, district_medical_assessed,
survivors_saved, survivors_saved_partial, district_records_lost, survivors_abandoned,
mark_bearer_recognised_below, mother_chalk_met, mother_chalk_guide, chalk_route_known,
relic_transit_arrived, transit_relic_scan_complete, transit_mark_interface,
transit_machines_awakened, sub_city_aware_of_mark, sub_city_map_complete,
transit_partial_activation, transit_complete, transit_difficult_complete,
sealed_engine_arrived, engine_state_known, engine_weakness_known, engine_tactical_read,
engine_destroy_attempted, engine_activated, engine_sixty_percent, engine_fifty_five,
engine_thirty_four, engine_fail, engine_server_interface, engine_destroy_considered,
blackout_core_arrived, blackout_containment_revealed, first_voice_contact_core,
first_voice_resisted_core, core_stabilised, core_surge_resisted, core_voice_stable,
core_fully_understood, nine_months_known, core_timeline_read, core_partial_read,
housing_block_arrived, housing_residents_met, housing_survivor_bond,
housing_medical_assessed, pale_curator_appears, pale_curator_refused,
pale_curator_complied, heir_intervened, curator_escaped, chalk_housing_read,
housing_evidence_found, family_connection_known,
old_gov_vault_arrived, vault_lock_solved, vault_opened, vault_evidence_found,
vault_evidence_sealed, vault_lock_failed, vault_esper_read,
heir_at_core, heir_identity_partial, heir_allied, heir_rejected,
heir_vault_access, heir_full_account_known, heir_account_received_rejected,
heir_full_identity_confirmed, heir_final_betrayal, heir_alliance_complete,
machine_nursery_arrived, nursery_programme_known, bearer_origin_known,
nursery_surge, nursery_fought_off, nursery_partial_modification,
nursery_non_compliant, nursery_runaway_bond, relic_system_origin_known,
server_origin_known, engine_destroy_considered,
deep_archive_arrived, mark_true_purpose_known, bearer_gate_connection_known,
original_agreement_known, deep_archive_complete, vorn_deception_known,
vorn_trust_maintained, vorn_trust_withdrawn, heir_full_identity_confirmed,
chalk_wall_complete, entity_communication_read, entity_question_received,
voice_negotiated, entity_clarified, sealing_cost_known, release_terms_known,
entity_partial_clarification,
first_gate_arrived, gate_opened_via_mark, truth_seeker_route, final_gate_unlocked,
final_gate_path_complete, machine_route_taken, machine_communion_route,
machine_communion_active, savior_route_taken, gate_sealed_knowledge, city_awakened,
heir_alliance_route, heir_route_taken, truth_route_taken,
chapter11_complete, both_companions_ch12, mira_only_ch12, cain_only_ch12,
lone_wanderer_ch12, truth_bearer_route, truth_bearer_ch12,
true_ending_route_active, chapter11_machine_communion, faction_truth_released
```

All flag names are strings; no invalid fields used.

---

## Dice Check Summary

| Node | Stat | DC | Die | Success → | Fail → | Crit Fail → |
|---|---|---|---|---|---|---|
| `c11_gate_sealed_door` (intelligence path) | intelligence | 7 | d8 | `c11_gate_int_success` | `c11_gate_int_fail` | — |
| `c11_district_save_strength_dice` | strength | 6 | d8 | `c11_district_save_success` | `c11_district_save_fail` | — |
| `c11_transit_agility_dice` | agility | 5 | d6 | `c11_transit_navigate_success` | `c11_transit_navigate_fail` | `c11_transit_lost_end` |
| `c11_engine_agility_dice` | agility | 5 | d6 | `c11_engine_activate_success` | `c11_engine_activate_fail` | — |
| `c11_core_int_dice` | intelligence | 8 | d8 | `c11_core_understood` | `c11_core_partial_understanding` | — |
| `c11_vault_lock_int_dice` | intelligence | 6 | d8 | `c11_vault_lock_success` | `c11_vault_lock_fail` | — |
| `c11_nursery_strength_dice` | strength | 7 | d8 | `c11_nursery_fought_off` | `c11_nursery_partial_escape` | — |
| `c11_deep_charisma_dice` | charisma | 7 | d10 | `c11_deep_voice_resisted` | `c11_deep_voice_partial` | `c11_first_voice_consumed_end` |

All 8 dice checks verified: stat, difficulty, diceType, successNode, failureNode present on all; criticalFailureNode on transit and charisma checks.

---

## Class and Background Coverage

### Classes (5 of 7 used)
| Class | Nodes | Benefit |
|---|---|---|
| `medic` | district survivors, housing block | Medical assessment of chronic modification |
| `relic_hunter` | transit line, machine nursery | Deep relic scans, +relics, +intelligence |
| `tactician` | sealed engine | Iron Saints tactical intelligence |
| `blade_survivor` | sealed engine | Engine interface weakness |
| `esper` | old government vault (lock fail alt) | Psychic residue read of Vault |

`gun_scavenger` and `shadow_broker` unused — consistent with their skill sets being less relevant underground.

### Backgrounds (all 7 used)
| Background | Node | Benefit |
|---|---|---|
| `exiled_soldier` | gate sealed door | Free soldier access route |
| `black_market_courier` | gate sealed door | Free undocumented route |
| `forgotten_scholar` | platform ancient signs | Architecture analysis +2 intelligence |
| `fallen_noble` | platform ancient signs | Glass Court origin recognition |
| `underground_medic` | district survivors | Chronic adaptation assessment |
| `wasteland_orphan` | housing block survivors | Survivor bond recognition (+3 morale) ← **bug fixed** |
| `runaway_experiment` | machine nursery | Recognise institutional structure (+5 morale) |

---

## Image Key Audit

All 11 imageKeys registered in `constants/images.ts` — both `BACKGROUND_IMAGES` and `BACKGROUND_GRADIENTS`:

| imageKey | Asset (placeholder) | Gradient palette |
|---|---|---|
| `sub_city_gate` | `collapsed_tunnel.png` | Deep purple-black |
| `forgotten_platform` | `dark_metro_hallway.png` | Near-black blue |
| `underworld_district` | `dark_metro_hallway.png` | Dark muted purple |
| `relic_transit_line` | `relic_engine_room.png` | Dark blue-slate |
| `sealed_engine` | `relic_engine_room.png` | Dark olive-green |
| `blackout_core` | `archive_ruin_wall.png` | Dark violet-purple |
| `nameless_housing_block` | `tunnel_camp.png` | Dark warm brown |
| `old_government_vault` | `archive_ruin_wall.png` | Deep blue-purple |
| `machine_nursery` | `relic_engine_room.png` | Dark cool green |
| `deep_archive` | `archive_ruin_wall.png` | Very deep blue-violet |
| `first_gate` | `relic_engine_room.png` | Dark blue-purple |

All image assets (`collapsed_tunnel.png`, `dark_metro_hallway.png`, `relic_engine_room.png`, `archive_ruin_wall.png`, `tunnel_camp.png`) confirmed present on disk. Gradient fallback present for every key — `getBackgroundGradient()` will never return `default` for Chapter 11 nodes.

---

## Typecheck Result

```
> @workspace/mobile@0.0.0 typecheck
> tsc -p tsconfig.json --noEmit

(no output — clean)
```

---

## Remaining Warnings (Non-Blocking)

| Item | Status |
|---|---|
| Placeholder art for all 11 imageKeys | Expected — dedicated sub-city pixel art is a future art pass |
| `gun_scavenger` and `shadow_broker` have no Ch11 class branches | By design — their underground utility is limited |
| `miraTrust` / `cainTrust` not modified in Ch11 | By design — companion trust was resolved in Chapter 10 |
| `hollowChildren` faction rep not modified | By design — Hollow Children *are* the sub-city survivors; no rep mechanic applied here |
| `ironSaints` / `redChoir` rep not modified | By design — only Glass Court and Last Archive have direct Ch11 implications |

---

## Recommended Entry Points for Chapter 12

Chapter 12 (`chapter12_start`) receives any of these completion flags:

| Flag set at Ch11 exit | Chapter 12 implication |
|---|---|
| `both_companions_ch12` | Full companion access, truth-bearer route eligible |
| `mira_only_ch12` | Medical support, no tactical anchor |
| `cain_only_ch12` | Tactical framing, no corruption monitoring |
| `lone_wanderer_ch12` | Maximum freedom, maximum information gap |
| `truth_bearer_ch12` | Both companions + full information = true ending route |
| `true_ending_route_active` | Final Chapter path unlocked |
| `chapter11_machine_communion` | Tunnel network power lost — hardest Ch12 surface configuration |
| `faction_truth_released` | All factions receive Protocol documentation — political earthquake |
| `chapter11_city_awakened` | Same as above via savior route |
| `chapter11_heir_alliance` | Heir carries entity's memory into Ch12 |

**Recommended default test entry:** `chapter11_complete` + `both_companions_ch12` (tests the primary completion route without special flags).

**Recommended stress-test entry:** `chapter11_machine_communion` (no relic power on surface — tests Ch12's faction systems under maximum pressure).
