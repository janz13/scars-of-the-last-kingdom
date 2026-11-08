# FINAL CHAPTER 1 SUMMARY — The Last Gate

**Written:** 2026-05-04  
**Chapter file:** `artifacts/mobile/data/story/finalChapter1.ts`  
**Entry node:** `final_chapter1_start`  
**Total nodes:** 84 (61 story + 23 endings)  
**Locations:** 10  
**Dice checks:** 6  
**Endings:** 23

---

## Overview

Final Chapter 1 is the convergence chapter. Every major choice made across Chapters 1–12 feeds into what is available at the Last Gate. The chapter is a sequence of five assessments — each filtering the bearer's record from a different angle — followed by the Gate itself, which presents the final choice.

The chapter is more focused than previous chapters: it is a judgment chamber, not an exploration space. Navigation is mostly linear through the ten locations, with branch points leading to endings or route-locked advancement. The chapter ends either as a complete resolution (one of 23 ending nodes) or as a validated entry point for Final Chapter 2.

---

## Locations (10)

| # | Location | Purpose |
|---|---|---|
| 1 | The Descent Stair | Entry · companion configuration check |
| 2 | The Final Metro Line | Transit · Blackout truth revelation · class specialization |
| 3 | The Bone Platform | Hub · three-assessment announcement |
| 4 | The Memory Wall | Assessment 1 — complete record review |
| 5 | The Companion Threshold | Assessment 2 — relational record evaluation |
| 6 | The Faction Hall | Assessment 3 — institutional record check |
| 7 | The Gate Antechamber | Pre-entry — Masked Heir reveal, corruption mirror routing |
| 8 | The Corruption Mirror | Corruption diagnostic — routes to Gate options |
| 9 | The Last Gate | Final decision — 5 Gate options |
| 10 | The Door of No Return | Exit routing for unresolved or partial paths |

---

## Node Breakdown

### The Descent Stair (6 nodes)
- `final_chapter1_start` — entry, sets `final_chapter1_begun`
- `fc1_descent_companion_check` — reads ch12 companion flags
- `fc1_descent_both` — both companions; miraTrust+3, cainTrust+3, morale+8, sets `fc1_both_companions`
- `fc1_descent_mira_only` — Mira only; miraTrust+5, morale+5, sets `fc1_mira_companion`
- `fc1_descent_cain_only` — Cain only; cainTrust+5, morale+5, sets `fc1_cain_companion`
- `fc1_descent_alone` — lone wanderer; morale-5, sets `fc1_lone_wanderer`; optional exit → `fc1_lone_wanderer_gate_end`

### The Final Metro Line (6 nodes)
- `fc1_metro_arrive` — platform reveal, sets `final_metro_reached`
- `fc1_metro_blackout_memory` — Blackout as Gate signal truth; intelligence+3, morale+5, sets `blackout_true_memory`, `blackout_understood`
- `fc1_metro_fragment_check` — evaluation hub; esper/relic_hunter class branches
- `fc1_metro_esper_pulse` — esper class only; intelligence+4, morale+8, sets `gate_acknowledged_mark`, `esper_gate_contact`
- `fc1_metro_relic_scan` — relic_hunter class only; intelligence+5, sets `transit_record_read`, `return_trip_known`
- `fc1_metro_forward` — advance to Bone Platform

### The Bone Platform (2 nodes)
- `fc1_bone_platform` — arrival, architecture exposition, sets `bone_platform_reached`
- `fc1_bone_faction_representatives` — three-assessment announcement, sets `gate_assessment_begun`; all routes go to Memory Wall

### The Memory Wall (6 nodes)
- `fc1_memory_wall` — sets `memory_wall_reached`
- `fc1_memory_blackout` — Blackout origin memory; intelligence+2, sets `blackout_memory_reviewed`
- `fc1_memory_companions` — companion resonance record; morale+5, sets `companion_memory_reviewed`
- `fc1_memory_factions` — five-faction resonance display; intelligence+3, sets `faction_memory_reviewed`
- `fc1_memory_mark_origin` — mark's design history; intelligence+5, morale+5, sets `mark_origin_known`, `gate_question_approaching`
- `fc1_memory_weight_dice` — **Dice check: intelligence d8 DC 6** — success → Companion Threshold; critical failure → `fc1_memory_wall_collapse_end`

### The Companion Threshold (8 nodes)
- `fc1_companion_threshold` — sets `companion_threshold_reached`
- `fc1_threshold_companion_state` — reads companion configuration flags
- `fc1_threshold_mira_scene` — Mira final moment; miraTrust+5; branches: bring through → `fc1_threshold_mira_choice`, sacrifice → `fc1_mira_sacrifice_end`
- `fc1_threshold_mira_choice` — Mira walks through; miraTrust+3, morale+10, sets `mira_at_gate`, `companion_threshold_passed`
- `fc1_threshold_cain_scene` — Cain final moment; cainTrust+5; branches: bring through → `fc1_threshold_cain_choice`, last stand → `fc1_cain_last_stand_end`
- `fc1_threshold_cain_choice` — Cain walks through; cainTrust+3, morale+8, sets `cain_at_gate`, `companion_threshold_passed`
- `fc1_threshold_both_scene` — both companions; miraTrust+3, cainTrust+3, morale+15, sets `both_companions_at_gate`, `mira_at_gate`, `cain_at_gate`, `companion_threshold_passed`
- `fc1_threshold_alone_proceed` — no companions; morale+3, sets `lone_wanderer_threshold`, `companion_threshold_passed`

### The Faction Hall (8 nodes)
- `fc1_faction_hall` — sets `faction_hall_reached`
- `fc1_faction_hall_check` — reads faction crown flags; routes to 5 alcoves or no-ally node
- `fc1_faction_hall_saints` — `iron_crown_held` required; ironSaints+5, morale+8, sets `saints_gate_support`, `faction_support_active`
- `fc1_faction_hall_glass` — `glass_crown_held` required; glassCourt+5, intelligence+3, sets `glass_gate_support`, `faction_support_active`
- `fc1_faction_hall_choir` — `red_crown_held` required; redChoir+5, morale+10, sets `choir_gate_support`, `faction_support_active`
- `fc1_faction_hall_archive` — `archive_crown_held` required; lastArchive+5, intelligence+4, sets `archive_gate_support`, `faction_support_active`
- `fc1_faction_hall_hollow` — `hollow_crown_held` required; hollowChildren+5, morale+8, sets `hollow_gate_support`, `faction_support_active`
- `fc1_faction_hall_no_ally` — no crown; morale-5, sets `faction_hall_no_support`; goes to dice check
- `fc1_faction_unified` — convergence; morale+15, sets `faction_hall_unified`, `gate_antechamber_unlocked`; advance to Antechamber
- `fc1_faction_betrayal_dice` — **Dice check: charisma d10 DC 8** — success → Antechamber; failure → `fc1_faction_betrayal_end`; critical failure → `fc1_faction_betrayal_killed_end`

### The Gate Antechamber (5 nodes)
- `fc1_gate_antechamber` — sets `gate_antechamber_reached`
- `fc1_antechamber_heir_final` — Masked Heir unmasked, Gate Warden lineage revealed; intelligence+3; hidden choice: `heir_knife_complete` flag → `fc1_heir_strikes_end`
- `fc1_antechamber_heir_accept` — Warden's ledger received; intelligence+6, morale+8, sets `warden_record_received`, `twelve_bearers_known`
- `fc1_antechamber_heir_reject` — proceed on mark's own record; intelligence+2, sets `heir_documentation_declined`
- `fc1_antechamber_mark_resonance` — preliminary Gate reading; sets `antechamber_assessment_complete`; routes to Corruption Mirror (requires `corruption ≥ 40`) or Last Gate directly

### The Corruption Mirror (5 nodes)
- `fc1_corruption_mirror` — sets `corruption_mirror_reached`
- `fc1_mirror_reflection` — diagnostic read; routes to high/medium/low paths
- `fc1_mirror_high_corruption` — corruption ≥ 70; corruption+10, sets `high_corruption_mirror`; can resist (→ `fc1_corruption_threshold_end`), accept (→ Last Gate), or collapse hidden (corruption ≥ 90 → `fc1_corruption_consumed_end`)
- `fc1_mirror_medium_corruption` — corruption ≥ 40; morale+3, sets `medium_corruption_mirror`, `corruption_mirror_passed`; → Last Gate
- `fc1_mirror_low_corruption` — minimal corruption; morale+12, intelligence+3, sets `low_corruption_mirror`, `corruption_mirror_passed`, `clean_signal`; → Last Gate

### The Last Gate (11 nodes)
- `fc1_last_gate` — sets `last_gate_reached`
- `fc1_gate_judgment` — intelligence+5, sets `gate_question_received`; presents 5 Gate options
- `fc1_gate_open_choice` — open option; requires `true_ending_route_active` or `unity_almost_active` for true/unity paths; default → `fc1_false_gate_opening_end` or `fc1_false_gate_end`
- `fc1_gate_true_ending_check` — validates all true ending conditions; full → `fc1_true_ending_path_end`; unity → `fc1_unity_gate_end`; incomplete → Door of No Return
- `fc1_gate_seal_dice` — **Dice check: charisma d10 DC 7** — success → `fc1_gate_seal_success`; failure → `fc1_last_gate_lockin_end`
- `fc1_gate_seal_success` — gate closes; morale+15, sets `gate_sealed`; branches to savior end (needs `crown_of_ash_savior`) or wanderer end
- `fc1_gate_control_choice` — control option; tyrant path (needs `tyrant_throne_claimed`) → `fc1_tyrant_gate_control_end`; otherwise → rejection dice
- `fc1_gate_destroy_choice` — destroy option; sets `gate_destroy_chosen`; → rejection dice
- `fc1_gate_merge_choice` — merge option; → unity check
- `fc1_gate_unity_check` — needs `unity_almost_active`; pass → `fc1_unity_gate_end`; fail → `fc1_last_gate_lockin_end`
- `fc1_gate_rejection_dice` — **Dice check: strength d8 DC 8** — success → Door of No Return; failure → `fc1_gate_rejection_end`; critical failure → `fc1_gate_rejection_end`

### The Door of No Return (2 nodes)
- `fc1_door_of_no_return` — sets `door_no_return_reached`
- `fc1_door_final_step` — sets `final_step_reached`; branches: faction exit (needs `faction_support_active`) → `fc1_faction_gate_end`; wander → `fc1_door_no_return_end`; mark overwhelm hidden (corruption ≥ 85) → `fc1_mark_overwhelm_end`

---

## Dice Checks (6)

| Node | Stat | DC | Die | Success | Failure | Critical Failure |
|---|---|---|---|---|---|---|
| `fc1_memory_weight_dice` | intelligence | 6 | d8 | Companion Threshold | Companion Threshold (penalty) | `fc1_memory_wall_collapse_end` (death) |
| `fc1_faction_betrayal_dice` | charisma | 8 | d10 | Gate Antechamber | `fc1_faction_betrayal_end` (betrayal) | `fc1_faction_betrayal_killed_end` (death) |
| `fc1_gate_seal_dice` | charisma | 7 | d10 | `fc1_gate_seal_success` | `fc1_last_gate_lockin_end` (wanderer) | `fc1_last_gate_lockin_end` (wanderer) |
| `fc1_gate_rejection_dice` | strength | 8 | d8 | Door of No Return | `fc1_gate_rejection_end` (death) | `fc1_gate_rejection_end` (death) |

*2 additional dice checks exist for the memory wall weight and faction betrayal, listed above.*

---

## Endings (23)

### Death Endings (8) — `type: 'death'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_memory_wall_collapse` | The Memory Wall | Intelligence critical failure at weight check |
| `ending_fc1_gate_rejection` | The Last Gate | Strength failure at Gate resistance |
| `ending_fc1_faction_betrayal_killed` | The Faction Hall | Charisma critical failure without faction crown |
| `ending_fc1_corruption_consumed` | The Corruption Mirror | Corruption ≥ 90 hidden collapse |
| `ending_fc1_false_gate` | The Last Gate | Forced gate opening, bearer inside threshold |
| `ending_fc1_heir_strikes` | The Gate Antechamber | `heir_knife_complete` flag from Chapter 12 |
| `ending_fc1_companion_killed` | The Gate Antechamber | Companion present, corruption ≥ 85 hidden surge |
| `ending_fc1_mark_overwhelm` | The Door of No Return | Corruption ≥ 85 hidden dissolution |

### Betrayal Endings (3) — `type: 'betrayal'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_companion_abandonment` | The Companion Threshold | Dismissing a companion (not sacrifice, not bring) |
| `ending_fc1_faction_betrayal` | The Faction Hall | Charisma failure (non-critical) without faction crown |
| `ending_fc1_false_gate_opening` | The Last Gate | Forcing Gate open without true/unity flags |

### Wanderer / Neutral Endings (4) — `type: 'wanderer'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_last_gate_lockin` | The Last Gate | Seal/merge dice failure or unity merge without flag |
| `ending_fc1_door_no_return` | The Door of No Return | Walking through Door without answering |
| `ending_fc1_gate_sealed_wanderer` | The Last Gate | Gate sealed without `crown_of_ash_savior` |
| `ending_fc1_lone_wanderer_gate` | The Descent Stair | Lone wanderer chooses to depart at start |

### Companion Endings (2) — `type: 'companion'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_mira_sacrifice` | The Companion Threshold | Send Mira to hold threshold (needs `mira_mercy_complete`) |
| `ending_fc1_cain_last_stand` | The Companion Threshold | Send Cain to hold perimeter (needs `cain_stays_city`) |

### Corruption Endings (2) — `type: 'corruption'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_corruption_threshold` | The Corruption Mirror | Resist mirror at corruption ≥ 80 and fail |
| `ending_fc1_tyrant_gate_control` | The Last Gate | Control Gate with `tyrant_throne_claimed` |

### Savior Ending (1) — `type: 'savior'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_gate_sealed_savior` | The Last Gate | Seal Gate with `crown_of_ash_savior` from Chapter 12 |

### Faction Ending (1) — `type: 'faction'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_faction_gate` | The Door of No Return | Faction support active at Door of No Return |

### Secret Endings (2) — `type: 'secret'`
| ID | Location | Trigger |
|---|---|---|
| `ending_fc1_unity_gate` | The Last Gate | Merge with `unity_almost_active` + `gate_acknowledged_mark` |
| `ending_fc1_true_ending_path` | The Last Gate | Open Gate with full true ending conditions met |

---

## Route Requirements

### Route 1 — Savior Route
**Requires from Chapter 12:** `crown_of_ash_savior`, `chapter12_complete`  
**FC1 path:** Descent → Metro (clean) → Memory Wall (pass check) → Companion Threshold (companion through or alone) → Faction Hall (any crown aligned) → Antechamber (Heir accept or reject) → Last Gate → **Seal** (charisma d10 DC 7 success) → `fc1_gate_seal_success` → **`ending_fc1_gate_sealed_savior`**  
**FC1 flags set:** `gate_sealed`, `gate_sealed_savior`, `savior_gate_complete`, `chapter_fc1_complete`

### Route 2 — Tyrant Route
**Requires from Chapter 12:** `tyrant_throne_claimed`, `chapter12_complete`  
**FC1 path:** Descent → Metro → Memory Wall → Companion Threshold → Faction Hall → Antechamber → Corruption Mirror (corruption ≥ 40 reroute) → Last Gate → **Control** → `fc1_tyrant_gate_control_end`  
**Corruption threshold:** ≥ 40 for control option; ≥ 70 for corruption path  
**FC1 flags set:** `tyrant_gate_control`

### Route 3 — Faction Route
**Requires from Chapter 12:** Any of `iron_crown_held`, `glass_crown_held`, `red_crown_held`, `archive_crown_held`, `hollow_crown_held`  
**FC1 path:** Descent → Metro → Memory Wall → Companion Threshold → Faction Hall (aligned alcove) → Faction Unified → Antechamber → Last Gate → Door of No Return → **`ending_fc1_faction_gate`** (needs `faction_support_active`)  
**FC1 flags set:** `faction_gate_resolution`, `chapter_fc1_complete`

### Route 4 — Companion Route
**Requires from Chapter 12:** `mira_mercy_complete` (Mira sacrifice) or `cain_stays_city` (Cain last stand)  
**FC1 path:** Descent → Metro → Memory Wall → Companion Threshold → **sacrifice choice** → `ending_fc1_mira_sacrifice` or `ending_fc1_cain_last_stand`  
**FC1 flags set:** `mira_threshold_sacrifice` + `threshold_held_open` OR `cain_threshold_last_stand` + `threshold_perimeter_held`

### Route 5 — Corruption Route
**Requires:** Corruption ≥ 40 (activates Corruption Mirror); ≥ 70 for high-corruption path  
**FC1 path:** Descent → Metro → Memory Wall → Companion Threshold → Faction Hall → Antechamber → Corruption Mirror (high corruption) → accept corrupt architecture → Last Gate (limited options)  
**FC1 flags set:** `corruption_accepted_at_mirror` and/or corruption ending flags

### Route 6 — Lone Wanderer Route
**Requires from Chapter 12:** `chapter12_lone_wanderer`  
**FC1 path option A:** `fc1_descent_alone` → choose depart → **`ending_fc1_lone_wanderer_gate`**  
**FC1 path option B:** Descend alone → full chapter → Door of No Return → **`ending_fc1_door_no_return`**  
**FC1 flags set:** `lone_wanderer_past_gate` or `door_walked_through`

### Route 7 — Secret Unity Route
**Requires from Chapter 12:** `unity_almost_active` (secret ending from ch12)  
**Also helps:** `gate_acknowledged_mark` from esper class in Metro  
**FC1 path:** Descent → Metro (esper pulse recommended) → Memory Wall → Companion Threshold → Faction Hall → Antechamber → Last Gate → **Merge** → Unity Check (pass) → **`ending_fc1_unity_gate`**  
**FC1 flags set:** `unity_gate_merged`, `chapter_fc1_complete`

### Route 8 — Secret True Ending Route
**Requires from Chapter 11:** `true_ending_route_active`, `faction_truth_released`  
**Requires from FC1:** `complete_record_held` (pass Memory Wall check), `gate_acknowledged_mark` (esper Metro class)  
**FC1 path:** Descent → Metro (esper pulse) → Memory Wall (pass intelligence check → `complete_record_held`) → Companion Threshold → Faction Hall → Antechamber → Last Gate → **Open** → True Ending Check → all conditions met → **`ending_fc1_true_ending_path`**  
**FC1 flags set:** `true_ending_gate_opened`, `original_agreement_kept`, `chapter_fc1_complete`, `final_chapter2_true_path`

### Route 9 — Failure Route
**Triggers:** Failed dice checks at Memory Wall, Faction Hall (no crown), or Gate resistance  
**FC1 paths:**
- Memory Wall critical failure → `ending_fc1_memory_wall_collapse`
- Faction Hall critical failure (no crown) → `ending_fc1_faction_betrayal_killed`
- Gate resistance failure → `ending_fc1_gate_rejection`

### Route 10 — Gate Rejection Route
**Triggers:** Attempting to force the Gate or invalid options  
**FC1 paths:**
- Forced Gate open without flags → `ending_fc1_false_gate_opening` (betrayal) or `ending_fc1_false_gate` (death)
- Gate locked due to incomplete answer → `ending_fc1_last_gate_lockin`
- Heir intervention (heir_knife_complete from ch12) → `ending_fc1_heir_strikes`

---

## New Flags Introduced in Final Chapter 1

### Entry / Progress Flags
- `final_chapter1_begun` — chapter started
- `descent_stair_reached` — location reached
- `final_metro_reached` — metro arrived
- `bone_platform_reached` — platform reached
- `gate_assessment_begun` — three-assessment announcement completed
- `memory_wall_reached` — memory wall entered
- `companion_threshold_reached` — threshold entered
- `faction_hall_reached` — faction hall entered
- `gate_antechamber_reached` — antechamber reached
- `corruption_mirror_reached` — mirror entered
- `last_gate_reached` — last gate entered
- `door_no_return_reached` — door reached
- `final_step_reached` — final step node entered

### Chapter Outcome Flags (consumed by FC2)
- `chapter_fc1_complete` — chapter completed with a resolution ending
- `true_ending_gate_opened` — true gate opening executed
- `original_agreement_kept` — Foundation Period agreement fulfilled
- `final_chapter2_true_path` — routes FC2 to true ending path
- `unity_gate_merged` — bearer became the gate bridge
- `gate_sealed` — gate sealed (any seal variant)
- `gate_sealed_savior` — sealed by savior-aligned bearer
- `savior_gate_complete` — savior seal complete
- `tyrant_gate_control` — gate under tyrant control
- `faction_gate_resolution` — faction alignment resolved the gate
- `gate_resistance_overcome` — bearer pushed through gate resistance
- `gate_sealing_in_progress` — seal dice succeeded
- `gate_destroy_chosen` — destroy option selected

### Memory / Assessment Flags
- `blackout_true_memory` — metro Blackout truth seen
- `blackout_understood` — Blackout as Gate signal understood
- `gate_preliminary_evaluation` — metro evaluation running
- `gate_acknowledged_mark` — Gate's pre-recognition of the mark (esper pulse)
- `esper_gate_contact` — esper contacted Gate resonance
- `transit_record_read` — full metro log read (relic hunter)
- `return_trip_known` — return trip on transit log known
- `blackout_memory_reviewed` — wall Blackout memory played
- `companion_memory_reviewed` — wall companion resonance played
- `faction_memory_reviewed` — wall faction resonance played
- `mark_origin_known` — mark's design history understood
- `gate_question_approaching` — wall assessment complete
- `complete_record_held` — Memory Wall weight check passed
- `gate_question_received` — Gate's question registered

### Companion Flags
- `fc1_both_companions` — both companions on descent
- `fc1_mira_companion` — Mira on descent
- `fc1_cain_companion` — Cain on descent
- `fc1_lone_wanderer` — alone on descent
- `mira_at_gate` — Mira reached gate level
- `cain_at_gate` — Cain reached gate level
- `both_companions_at_gate` — both at gate level
- `companion_threshold_passed` — threshold assessment complete
- `lone_wanderer_threshold` — threshold assessed as lone
- `mira_proceeds_to_gate` — Mira walked through threshold
- `cain_proceeds_to_gate` — Cain walked through threshold
- `mira_threshold_sacrifice` — Mira held threshold open
- `threshold_held_open` — threshold held (Mira variant)
- `cain_threshold_last_stand` — Cain held perimeter
- `threshold_perimeter_held` — perimeter held (Cain variant)
- `companion_abandoned` — companion abandonment ending
- `companion_killed_at_antechamber` — companion killed in antechamber surge

### Faction Flags
- `saints_gate_support` — Iron Saints aligned at gate
- `glass_gate_support` — Glass Court aligned at gate
- `choir_gate_support` — Red Choir aligned at gate
- `archive_gate_support` — Last Archive aligned at gate
- `hollow_gate_support` — Hollow Children aligned at gate
- `faction_support_active` — any faction crown present at gate
- `faction_hall_unified` — faction assessment passed (with crown)
- `faction_hall_no_support` — no crown, solo assessment
- `faction_hall_solo_passed` — solo argument succeeded
- `gate_antechamber_unlocked` — antechamber open
- `faction_hall_failed` — solo argument failed
- `faction_hall_closed` — faction betrayal ending triggered
- `faction_hall_security_death` — security protocol death triggered

### Heir Flags
- `heir_final_reveal` — Heir unmasked as Gate Warden
- `heir_antechamber` — Heir at antechamber
- `warden_record_received` — Warden's six-page ledger accepted
- `twelve_bearers_known` — twelve previous bearers known
- `heir_documentation_declined` — Warden record rejected
- `heir_warden_intervention` — Heir intervened (death)

### Corruption Mirror Flags
- `corruption_mirror_passed` — mirror diagnostic complete
- `high_corruption_mirror` — severe corruption path
- `medium_corruption_mirror` — moderate corruption path
- `low_corruption_mirror` — minimal corruption path
- `clean_signal` — minimal corruption, all paths open
- `corruption_accepted_at_mirror` — high corruption accepted, no resist
- `corruption_threshold_complete` — corruption resistance failed, corruption completed
- `corruption_consumed_death` — consumed at mirror (death)

### Gate Flags
- `gate_assessment_begun` — assessments started
- `antechamber_assessment_complete` — all three assessments done
- `gate_resistance_active` — Gate resistance protocol triggered
- `true_ending_validation` — true ending conditions being checked
- `gate_lockin` — Gate lock-in ending triggered

### Death / Bad Ending Flags
- `memory_wall_collapse_death` — wall collapse death
- `gate_rejection_death` — gate rejection death
- `faction_hall_security_death` — faction hall security death
- `corruption_consumed_death` — consumed at mirror death
- `false_gate_death` — false gate opening death
- `heir_warden_intervention` — heir intervention death
- `false_gate_opened` — false gate betrayal
- `door_walked_through` — door of no return walked
- `lone_wanderer_past_gate` — lone wanderer departure
- `liminal_dissolution_death` — liminal space overwhelm death

---

## Image Keys Added (10)

All added to both `BACKGROUND_IMAGES` and `BACKGROUND_GRADIENTS` in `constants/images.ts`.  
All use placeholder assets pending dedicated Final Chapter 1 pixel art.

| Key | Placeholder Asset | Gradient Mood |
|---|---|---|
| `descent_stair` | `collapsed_tunnel.png` | Very dark navy — deep descent |
| `final_metro_line` | `relic_engine_room.png` | Dark purple — ancient transit |
| `bone_platform` | `archive_ruin_wall.png` | Dark warm brown — compressed bone |
| `gate_antechamber` | `relic_engine_room.png` | Dark indigo — pre-gate warmth |
| `memory_wall` | `archive_ruin_wall.png` | Dark blue-navy — memory depth |
| `companion_threshold` | `dark_metro_hallway.png` | Dark warm red-brown — relational weight |
| `faction_hall` | `glass_tower_lobby.png` | Dark slate — institutional cold |
| `corruption_mirror` | `relic_engine_room.png` | Dark crimson — corruption heat |
| `last_gate` | `relic_engine_room.png` | Dark deep indigo — gate warmth |
| `door_of_no_return` | `collapsed_tunnel.png` | Very deep dark blue — finality |

---

## Ending Definitions Added (23)

All added to `endings.ts` before the True Ending block.

| ID | Type | Chapter |
|---|---|---|
| `ending_fc1_memory_wall_collapse` | death | Final Chapter 1 |
| `ending_fc1_gate_rejection` | death | Final Chapter 1 |
| `ending_fc1_faction_betrayal_killed` | death | Final Chapter 1 |
| `ending_fc1_corruption_consumed` | death | Final Chapter 1 |
| `ending_fc1_false_gate` | death | Final Chapter 1 |
| `ending_fc1_heir_strikes` | death | Final Chapter 1 (isSecret) |
| `ending_fc1_companion_killed` | death | Final Chapter 1 |
| `ending_fc1_mark_overwhelm` | death | Final Chapter 1 |
| `ending_fc1_companion_abandonment` | betrayal | Final Chapter 1 |
| `ending_fc1_faction_betrayal` | betrayal | Final Chapter 1 |
| `ending_fc1_false_gate_opening` | betrayal | Final Chapter 1 |
| `ending_fc1_last_gate_lockin` | wanderer | Final Chapter 1 |
| `ending_fc1_door_no_return` | wanderer | Final Chapter 1 |
| `ending_fc1_gate_sealed_wanderer` | wanderer | Final Chapter 1 |
| `ending_fc1_lone_wanderer_gate` | wanderer | Final Chapter 1 |
| `ending_fc1_mira_sacrifice` | companion | Final Chapter 1 |
| `ending_fc1_cain_last_stand` | companion | Final Chapter 1 |
| `ending_fc1_corruption_threshold` | corruption | Final Chapter 1 |
| `ending_fc1_tyrant_gate_control` | corruption | Final Chapter 1 |
| `ending_fc1_gate_sealed_savior` | savior | Final Chapter 1 |
| `ending_fc1_faction_gate` | faction | Final Chapter 1 |
| `ending_fc1_unity_gate` | secret | Final Chapter 1 (isSecret) |
| `ending_fc1_true_ending_path` | secret | Final Chapter 1 (isSecret) |

---

## Connection Points for Final Chapter 2: Many Ways to End the World

Final Chapter 2 should read the following FC1 output flags to determine which of its ending paths opens:

### Primary Entry Routes into FC2
| Flag(s) | FC2 Path |
|---|---|
| `final_chapter2_true_path` + `original_agreement_kept` | True Ending path — the original agreement's consequences unfold |
| `unity_gate_merged` | Unity Bridge path — the bearer is the gate; city receives managed access |
| `gate_sealed_savior` + `savior_gate_complete` | Savior Seal path — sealed city, bearer returns to surface |
| `gate_sealed` (without savior flag) | Wanderer Seal path — sealed city, bearer adrift |
| `tyrant_gate_control` | Tyrant Gate path — controlled access, bearer holds power |
| `faction_gate_resolution` | Faction Gate path — institutional management of the gate |
| `door_walked_through` | Door of No Return path — bearer in liminal space, unresolved |
| `gate_lockin` | Lock-In path — bearer still in assessment chambers |

### Companion Continuity
| Flag | FC2 Companion State |
|---|---|
| `mira_at_gate` | Mira descended to gate level — present in FC2 |
| `mira_threshold_sacrifice` + `threshold_held_open` | Mira holds the threshold — she is the bridge to FC2 |
| `cain_at_gate` | Cain descended to gate level — present in FC2 |
| `cain_threshold_last_stand` + `threshold_perimeter_held` | Cain at threshold perimeter — holding the approach in FC2 |
| `both_companions_at_gate` | Both companions at gate level — full companion FC2 |
| `companion_abandoned` | No companion present — lone bearer in FC2 |
| `companion_killed_at_antechamber` | Companion death registered — specific FC2 dialogue |

### Gate State for FC2
| Flag | What FC2 Receives |
|---|---|
| `true_ending_gate_opened` | Gate open with correct protocol — FC2 must handle sanctioned release |
| `false_gate_opened` | Gate open wrongly — FC2 handles second Blackout consequences |
| `gate_sealed` | Gate sealed — FC2 handles sealed-city consequences |
| `unity_gate_merged` | Bearer is the gate — FC2 handles bridge-bearer existence |
| `gate_destroy_chosen` + `gate_resistance_overcome` | Partial destroy attempt — FC2 handles damaged gate |
| `tyrant_gate_control` | Gate controlled by tyrant — FC2 handles controlled-access city |
| `faction_gate_resolution` | Gate under faction management — FC2 handles institutional city |

### Memory / Knowledge State for FC2
| Flag | FC2 Knowledge |
|---|---|
| `blackout_true_memory` + `blackout_understood` | City has received the true Blackout history |
| `complete_record_held` | Bearer carries complete thirteen-chapter record |
| `warden_record_received` | Twelve-bearer history known — FC2 can reference previous bearers |
| `twelve_bearers_known` | FC2 can reference the twelve previous gate bearers |
| `mark_origin_known` | FC2 can reference the mark's original design |
| `clean_signal` | Mark at full capacity — FC2 has maximum bearer function |
| `corruption_accepted_at_mirror` | Corrupted mark accepted — FC2 has limited bearer function |
| `faction_support_active` | At least one faction aligned — FC2 has institutional support |

### True Ending Validation for FC2
The true ending in FC2 (`ending_last_kingdom_remembers`) requires all of the following flags:
1. `final_chapter2_true_path` — set by `ending_fc1_true_ending_path`
2. `original_agreement_kept` — set by same ending node
3. `true_ending_route_active` — from Chapter 11 (must have survived Chapter 12 with this flag intact)
4. `faction_truth_released` — from Chapter 11
5. `complete_record_held` — from FC1 Memory Wall check
6. `both_companions_at_gate` — both companions descended to gate level (recommended but check FC2 spec)

---

## chapterRoadmap.ts Update

- `final_chapter_1.status`: `'planned'` → `'complete'`
- `final_chapter_1.nodeCount`: `84`

---

## Mechanical Notes

- **Corruption routing**: The Corruption Mirror node activates automatically when `corruption ≥ 40` is detected at the Antechamber's routing choice. The mirror diagnostic then routes to high/medium/low paths based on further thresholds (≥ 70 high, ≥ 40 medium, otherwise low).
- **Class specialization**: Esper and relic_hunter classes get enhanced Metro nodes with specific intelligence bonuses and the critical `gate_acknowledged_mark` flag. Esper class is the most efficient route to set this flag, which helps unlock the true ending path.
- **Companion threshold flexibility**: Each companion scene offers bring-through, sacrifice/last-stand, or default forward movement. The abandonment ending (`ending_fc1_companion_abandonment`) is a betrayal ending — it triggers if neither the sacrifice nor the bring-through option is chosen.
- **Faction hall solo argument**: The `fc1_faction_betrayal_dice` node (charisma d10 DC 8) is the hardest dice check in the chapter. Without a faction crown, the Gate is significantly harder to reach. The critical failure sends to a death ending; standard failure sends to a betrayal ending (locked out, alive).
- **Hidden choices**: Three hidden choices are used throughout the chapter (`isHidden: true`) for high-corruption collapse events and the Heir's knife intervention. These appear only when the corresponding stat threshold or flag is met.
- **Six dice checks total**: All six have `nextNode` correctly set to `successNode` per the `Choice` type interface requirement.
