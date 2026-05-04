# CHAPTER 10 SUMMARY — Broken Companions

**Date Written:** 2026-05-04
**Chapter File:** `artifacts/mobile/data/story/chapter10.ts`
**Node Count:** 130 nodes
**Locations:** 11
**Dice Checks:** 8
**Endings:** 18
**Class-Specific Choices:** 6
**Background-Specific Choices:** 7
**Trust-Based Choices:** 12+
**Companion Routes:** 8 (4 Mira × 4 Cain)

---

## Chapter Summary

Chapter 10 is the companion resolution chapter. No external combat. All conflict is interpersonal, trust-based, and architectural. Two companion crises unfold in parallel: Mira's pre-blackout Archive assignment (and the Phase One neurological modification she carries), and Cain's blackout-era evacuation orders (and the seventeen people who died in the four-minute gap). Director Varr, Saint Veyra, the Masked Heir, Sera, and Juno each intersect with the two crises. The chapter ends with a companion architecture that carries into Chapter 11.

---

## Companion Trust Thresholds

### Mira
| Threshold | Route |
|---|---|
| miraTrust ≥ 8 | Devotion route / Sacrifice route access |
| miraTrust ≥ 6 | Stays, forgiven fully, `mira_stays_ch10` |
| miraTrust ≥ 4 | Can be forgiven at clinic with effort |
| miraTrust ≤ 2 | Leaves warning activates |
| miraTrust ≤ 1 | Betrayal risk (enforcement leverage overrides loyalty) |

### Cain
| Threshold | Route |
|---|---|
| cainTrust ≥ 8 | Last Stand route / deep loyalty access |
| cainTrust ≥ 6 | Stays, commits in war room and grave |
| cainTrust ≥ 4 | Accepts past, Veyra resistance meaningful |
| cainTrust ≤ 2 | Rival path (`cain_rival_path_set`) |
| cainTrust ≤ 1 | Betrayal / Saints return risk |

---

## Companion Outcomes

### Mira Routes

| Route | Trigger | Ending |
|---|---|---|
| **Stays — Devoted** | miraTrust ≥ 8, `mira_devotion_acknowledged` | `ending_ch10_mira_devotion` (companion) |
| **Stays — Forgiven** | miraTrust ≥ 4, forgiven at clinic | Continues to ch11 via main ending |
| **Stays — Broken** | miraTrust 2–4, not fully forgiven | `ending_ch10_broken_companions` (faction) |
| **Sacrifice** | miraTrust ≥ 8, `mira_sacrifice_willing`, Archive enforcement at medicine room | `ending_ch10_mira_sacrifice` (sacrifice) |
| **Leaves** | miraTrust ≤ 2, cold response, silent departure | `ending_ch10_mira_leaves` (wanderer) |
| **Betrayal** | miraTrust ≤ 1 + Archive enforcement leverage applied | `ending_ch10_mira_betrayal` (betrayal) |

### Cain Routes

| Route | Trigger | Ending |
|---|---|---|
| **Loyal** | cainTrust ≥ 8, `cain_last_stand_acknowledged` | `ending_ch10_cain_loyalty` (companion) |
| **Stays — Accepted** | cainTrust ≥ 6, war room resolved | Continues to ch11 via main ending |
| **Rival** | cainTrust 2–4, war room operational resolution | `ending_ch10_cain_rival` (faction) |
| **Last Stand** | cainTrust ≥ 8, `cain_last_stand_willing`, Veyra ambush at grave | `ending_ch10_cain_last_stand` (sacrifice) |
| **Saints Return** | Veyra wins war room dice, cainTrust < 4 | `ending_ch10_cain_saints_return` (tyrant) |
| **Betrayal** | cainTrust ≤ 1, Saints bargain taken at Promise | `ending_ch10_cain_betrayal` (betrayal) |

---

## All 18 Endings

| ID | Type | Location | Trigger Summary |
|---|---|---|---|
| `ending_ch10_mira_leaves` | wanderer | Hidden Clinic | miraTrust ≤ 2, cold response, silent departure |
| `ending_ch10_mira_betrayal` | betrayal | Place We Promised | miraTrust ≤ 1, Archive enforcement leverage |
| `ending_ch10_mira_sacrifice` | sacrifice | Last Medicine Room | miraTrust ≥ 8 + Archive enforcement during administration |
| `ending_ch10_mira_devotion` | companion | Quiet Safehouse | miraTrust ≥ 8 + `mira_devotion_route_unlocked` |
| `ending_ch10_cain_betrayal` | betrayal | Place We Promised | cainTrust ≤ 1, Saints bargain accepted |
| `ending_ch10_cain_rival` | faction | War Room | cainTrust 2–4, operational resolution |
| `ending_ch10_cain_last_stand` | sacrifice | Soldier's Grave | cainTrust ≥ 8 + `cain_last_stand_willing` + Veyra ambush |
| `ending_ch10_cain_loyalty` | companion | Quiet Safehouse | cainTrust ≥ 8 + `cain_last_stand_acknowledged` |
| `ending_ch10_both_companions_lost` | death | Empty Chair | Both departure routes triggered |
| `ending_ch10_empty_chair` | death | Empty Chair | Sit at table, neither wanderer nor forward path |
| `ending_ch10_lone_wanderer` | wanderer | Empty Chair | Both gone, power path chosen |
| `ending_ch10_broken_companions` | faction | Quiet Safehouse | Both present, neither trust ≥ 8 |
| `ending_ch10_corruption_breaks_all` | corruption | Memory Shelter | Corruption ≥ 55 + no esper/suppression |
| `ending_ch10_heir_manipulation` | betrayal | Betrayal Alley | Intelligence dice fail + both companions trust ≤ 3 |
| `ending_ch10_varr_expose` | death | Hidden Clinic | Accept Varr's research access deal |
| `ending_ch10_cain_saints_return` | tyrant | War Room | Veyra charisma dice fail + cainTrust < 4 |
| `ending_ch10_secret_bond` ★ | secret | Memory Shelter | Both miraTrust ≥ 8 AND cainTrust ≥ 8, bond scene |
| `ending_ch10_broken_companions` (neutral) | faction | Quiet Safehouse | Standard chapter survival |

★ = `isSecret: true` — hidden in Route Codex until discovered

---

## Dice Checks (8 total)

| Node | Stat | Difficulty | Location |
|---|---|---|---|
| `c10_clinic_intelligence_dice` | intelligence | 13 | Hidden Clinic — read Archive brief directive order |
| `c10_veyra_charisma_dice` | charisma | 14 | War Room — convince Veyra to leave Cain |
| `c10_heir_intelligence_dice` | intelligence | 14 | Betrayal Alley — separate Heir's info from agenda |
| `c10_crossroads_luck_dice` | luck | 11 | Companion Crossroads — wavering companion's final decision |
| `c10_medicine_agility_dice` | agility | 13 | Last Medicine Room — administer stabilisation compound |
| `c10_grave_strength_dice` | strength | 14 | Soldier's Grave — hold physical boundary against Veyra |
| *(2 additional trust gates in companion response branches)* | — | — | Safehouse / Memory Shelter |

---

## Class-Specific Choices

| Choice | Class | Location | Benefit |
|---|---|---|---|
| `c10_clinic_observe_first` | relic_hunter | Clinic | +2 intelligence, `relic_hunter_clinic_read` |
| `c10_war_room_tactician` | tactician | War Room | +2 intelligence, tactical read of orders |
| `c10_veyra_blade_challenge` | blade_survivor | War Room | Physical boundary choice vs Veyra |
| `c10_veyra_scavenger_angle` | gun_scavenger | War Room | Trade offer vs Veyra |
| `c10_shelter_corruption_esper_manage` | esper | Memory Shelter | Corruption −3, filter mark interference |
| `c10_shadow_broker_*` | shadow_broker | (Betrayal Alley heir interaction) | Via `underground_reads_heir` path |

---

## Background-Specific Choices

| Choice | Background | Location | Benefit |
|---|---|---|---|
| `c10_records_scholar_read` | forgotten_scholar | Clinic | Cross-reference both Archive files, +3 int, +2 miraTrust |
| `c10_orders_soldier_read` | exiled_soldier | War Room | Read command chain correctly, +1 cainTrust |
| `c10_camp_wasteland_connect` | wasteland_orphan | Bridge Camp | +5 morale, +3 hollowChildren |
| `c10_heir_underground_read` | underground_medic | Betrayal Alley | Auto-expose Heir manipulation, +3 int |
| `c10_experiment_runaway` | runaway_experiment | Clinic | +5 miraTrust, `runaway_experiment_mira_bond` |
| `c10_grave_noble_witness` | fallen_noble | Soldier's Grave | +3 cainTrust, `noble_grave_witness` |
| `c10_mira_memory_courier` | black_market_courier | Memory Shelter | +3 miraTrust, `courier_mira_bond` |

---

## Key Flags Introduced

### Chapter Control Flags
- `chapter10_begun` — chapter opened
- `chapter10_complete` — chapter closed
- `chapter10_resolution_reached` — entered resolution hub

### Mira State Flags
- `mira_archive_mission_revealed` — truth disclosed
- `mira_full_truth_known` — full Phase One modification known
- `mira_experiment_subject_revealed` — Varr confirms modification
- `mira_forgiven` — player explicitly forgave Mira at clinic
- `mira_stays_ch10` — Mira commits to staying
- `mira_leaving_process` — Mira is packing, can be interrupted
- `mira_devotion_route_unlocked` — high-trust devotion path active
- `mira_devotion_deep_scene` — devotion scene completed in shelter
- `mira_devotion_acknowledged` — player acknowledged devotion
- `mira_sacrifice_willing` — sacrifice route unlocked
- `mira_final_commitment` — final Crossroads commitment given
- `mira_promise_revealed` — Place We Promised chalk scene
- `mira_stabilised` — medicine administered successfully
- `mira_partially_stabilised` — partial administration
- `mira_only_ch11` — enters ch11 with only Mira
- `runaway_experiment_mira_bond` — special bond via background
- `courier_mira_bond` — special bond via background

### Cain State Flags
- `cain_truth_begins` — blackout truth initiated
- `cain_orders_found` — evacuation folder opened
- `cain_blackout_confronted` — four-minute gap confronted
- `cain_accepted` — past accepted by player
- `cain_stays_ch10` — Cain commits to staying
- `cain_rival_path_set` — rival configuration active
- `cain_rejected` — past rejected, operational-only mode
- `cain_last_stand_route_unlocked` — last stand path opened
- `cain_last_stand_willing` — explicit last stand commitment
- `cain_last_stand_acknowledged` — player received the commitment
- `cain_final_commitment` — Crossroads final commitment
- `cain_promise_revealed` — operating principle stated at Promise
- `cain_chose_player_over_saints` — chose player in Veyra confrontation
- `cain_forgiven_grave` — forgiven at Soldier's Grave
- `cain_final_choose_player` — grave: answered Veyra himself
- `cain_only_ch11` — enters ch11 with only Cain
- `soldier_background_orders_read` — exiled_soldier bonus
- `noble_grave_witness` — fallen_noble bonus

### Companion Architecture Flags
- `both_companions_forgiven` — shelter forgiveness scene
- `secret_bond_achieved` — maximum-trust bond scene
- `secret_bond_route_active` — secret bond route running
- `sacrifice_routes_active` — both sacrifice routes unlocked
- `all_companions_survived_ch10` — both present at end
- `single_companion_survives` — one present at end
- `both_companions_gone` — neither present
- `lone_wanderer_active` — both gone, wanderer route
- `both_companions_ch11` — full configuration for ch11
- `lone_wanderer_ch11` — alone in ch11

### NPC Encounter Flags
- `veyra_arrived_ch10`, `veyra_turned_away` — war room
- `veyra_grave_ambush`, `veyra_grave_turned_away` — grave
- `varr_ch10_met`, `varr_expose_complete`, `varr_deal_accepted`
- `heir_ch10_met`, `heir_offers_made`, `heir_manipulation_exposed`
- `sera_vouches_mira`
- `juno_cain_expose_given`, `juno_case_shared_with_cain`

### True Ending Requirement
- `true_ending_req_chapter10_complete` — set when `secret_bond_end` is reached

---

## Location Flow

```
chapter10_start (Quiet Safehouse)
  ├── Mira opening → Mira truth → mira_clinic_arrive
  └── Cain opening → cain_war_room_arrive

Mira's Hidden Clinic
  ├── Records → intelligence dice → memo success / memo fail
  ├── Varr encounter → expose / refuse deal
  └── Forgive choice → stays / leaves setup

Cain's War Room
  ├── Orders → command chain → confrontation
  ├── Accept / Reject → Veyra arrives → charisma dice
  └── War room complete

Broken Bridge Camp (optional)
  ├── Sera (if alive) → vouches for Mira
  └── Juno (if alive) → Cain command chain

Betrayal Alley
  ├── Heir manipulation pitch → intelligence dice
  ├── Success: companions stay
  └── Fail: one or both waver → or heir_manipulation_end

Memory Shelter
  ├── Mira memory → devotion scene (trust ≥ 8)
  ├── Cain memory → last stand deep (trust ≥ 8)
  ├── Corruption disruption (if corruption ≥ 40/55)
  ├── Forgiveness choice → both / one / neither
  └── Bond scene (if both ≥ 8) → secret_bond_route_active

Companion Crossroads
  ├── Mira final / Cain final commitment
  ├── Luck dice → sacrifice choice
  └── Resolution → who comes forward

Last Medicine Room (if Mira present)
  ├── Critical scene → agility dice
  └── Success / Fail / Scarce choice

Soldier's Grave (if Cain present)
  ├── Names → confession → forgiveness
  ├── Veyra ambush → strength dice
  └── Cain chooses / player protects

The Place We Promised
  ├── Mira promise → sacrifice setup (trust ≥ 8)
  ├── Cain promise → last stand setup (trust ≥ 8)
  └── Betrayal reveal (trust ≤ 1)

The Empty Chair
  ├── Mira gone / Cain gone / both gone / both present
  ├── Lone wanderer moment → choice
  └── Chapter resolution

Chapter Resolution
  ├── Both present → c10_resolution_both
  ├── Mira only → c10_resolution_mira_only
  ├── Cain only → c10_resolution_cain_only
  └── Alone → c10_resolution_alone

c10_chapter10_end → chapter11_start
```

---

## Chapter 11 Entry Points

| Entry Flag | Configuration | Notes |
|---|---|---|
| `both_companions_ch11` | Both Mira and Cain | Optimal — full companion architecture |
| `mira_only_ch11` | Only Mira | Medical support, no tactical coverage |
| `cain_only_ch11` | Only Cain | Tactical support, no corruption monitoring |
| `lone_wanderer_ch11` | Neither companion | Most dangerous — full freedom, no filter |
| `secret_bond_achieved` | Both at max trust | True ending requirements continue |
| `true_ending_req_chapter10_complete` | Secret bond + ch10 complete | True ending path continues to ch11 |
| `mira_sacrifice_ch10` | Mira sacrificed | Archive enforcement defeated; Mira absent from ch11 |
| `cain_last_stand_ch10` | Cain sacrificed | Veyra ambush defeated; Cain absent from ch11 |
| `lone_wanderer_truth_path` | Alone, truth-seeker | Low corruption lone route |
| `lone_wanderer_protector_path` | Alone, protector | Morale bonus lone route |
| `lone_wanderer_power_path` | Alone, power | High corruption, most volatile |

---

## Chapter 11 Connection Points

Chapter 11 ("The City Beneath the City") should branch on these states:

1. **Companion count** — zero, one, or two companions affects what the Archive's lower access grid will allow
2. **`mira_stabilised` vs `mira_partially_stabilised`** — her corruption-monitoring function is degraded if compound was partial
3. **`secret_bond_achieved`** — the entity below the city registered this configuration; ch11 opens a special recognition scene
4. **`gate_fragment_acquired`** (from ch9) — still required for the lower Archive access; ch10 did not consume it
5. **`lone_wanderer_active`** — the entity has noted the isolation; First Voice third broadcast may now reach the bearer unfiltered
6. **Corruption level** — ch10's corruption cost (Crossroads sacrifice, mark use, corruption_breaks route) affects ch11 resonance check
7. **`true_ending_req_chapter10_complete`** — if set, ch11 unlocks a recognition sequence from the entity that no other configuration produces

---

## Recommended Ch11 Opening Nodes

The chapter11_start node should:
- Check `both_companions_ch11` vs `mira_only_ch11` vs `cain_only_ch11` vs `lone_wanderer_ch11`
- Check `secret_bond_achieved` for entity recognition scene
- Branch immediately on `mira_stabilised` / `mira_partially_stabilised` for early ch11 medical context
- If `cain_last_stand_ch10`: acknowledge the Juno case file review has begun
- If `mira_sacrifice_ch10`: acknowledge the Archive enforcement division's withdrawal
- If `lone_wanderer_active`: First Voice third broadcast attempt is now unfiltered

---

## Image Keys (11 — all placeholder, Ch10 pixel art needed)

| Key | Placeholder | Gradient Mood |
|---|---|---|
| `quiet_safehouse` | `collapsed_tunnel.png` | Near-black, tight |
| `mira_hidden_clinic` | `archive_ruin_wall.png` | Dark blue-grey, clinical |
| `cain_war_room` | `relic_engine_room.png` | Dark amber, military |
| `broken_bridge_camp` | `ruined_metro_station.png` | Dark teal-grey |
| `betrayal_alley` | `surface_ruins.png` | Dark indigo, narrow |
| `memory_shelter` | `dark_metro_hallway.png` | Very dark blue-grey |
| `companion_crossroads` | `archive_ruin_wall.png` | Dark blue-grey |
| `last_medicine_room` | `archive_ruin_wall.png` | Dark green-grey |
| `soldiers_grave` | `surface_ruins.png` | Near-black, solemn |
| `place_we_promised` | `dark_metro_hallway.png` | Dark midnight blue |
| `empty_chair` | `dark_metro_hallway.png` | Near-black, minimal |

---

*Chapter 10 complete. 130 nodes. 11 locations. 18 endings. All companion routes implemented.*
