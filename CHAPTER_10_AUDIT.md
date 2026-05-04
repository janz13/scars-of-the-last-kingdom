# Chapter 10 — "Broken Companions" Audit Report

**Date:** 2026-05-04  
**File:** `artifacts/mobile/data/story/chapter10.ts`  
**Auditor:** Automated structural audit + manual review

---

## Summary

| Metric | Value |
|--------|-------|
| Total nodes | 126 |
| Reachable nodes (post-fix) | 126 (100%) |
| Unreachable nodes (pre-fix) | 19 |
| Unreachable nodes (post-fix) | 0 |
| Ending nodes (`isEnding: true`) | 17 |
| Endings registered in `endings.ts` | 17 |
| Dice checks | 6 |
| TypeScript errors | 0 |
| Broken `nextNode` references | 0 |
| Missing `imageKey` values | 0 |

---

## Pre-Fix State

### TypeScript Errors Fixed (prior session)
All TS errors were resolved before this audit session:
- `ChoiceRequirements` fields renamed: `minMiraTrust→miraTrust`, `minCainTrust→cainTrust`, `minCorruption→corruption`
- Removed unsupported `maxMiraTrust`/`maxCainTrust` fields
- Moved 6 `diceCheck` blocks from node level to choice level
- Removed duplicate `setFlags` property

### 19 Unreachable Nodes (pre-fix)

| Node | Root Cause | Fix Applied |
|------|-----------|-------------|
| `c10_safehouse_junction` | `c10_safehouse_cain_arrives` skipped it, going directly to war room | Rerouted both choices through junction |
| `c10_cain_confrontation_choice` | `c10_orders_examination` went directly to `c10_cain_confrontation` | Changed nextNode to confrontation_choice |
| `c10_cain_defense` | No accusatory path routed to it | `c10_confront_accusation` now routes to cain_defense |
| `c10_clinic_complete` | `c10_mira_stays_path` went directly to war room | `c10_mira_stays_cain` now routes through clinic_complete |
| `c10_grave_forgiveness_choice` | `c10_soldiers_grave_arrive` only offered name-reading path | Added second choice to grave_forgiveness_choice |
| `c10_promise_betrayal_reveal` | No choice in `c10_place_promised_arrive` led here | Added `c10_betrayal_reckoning` choice |
| `c10_secret_bond_path` | No crossroads choice activated bond route | Added `c10_status_bond_route` to `c10_crossroads_status` |
| `c10_secret_bond_end` | `c10_resolution_both` had no bond-ending path | Added `c10_resolution_both_bond` choice (requires `secret_bond_achieved` flag) |
| `c10_mira_sacrifice_end` | No path from medicine success to sacrifice | Added `c10_medicine_sacrifice_path` (requires `miraTrust ≥ 8`) |
| `c10_mira_devotion_end` | `c10_resolution_mira_only` had no high-trust exit | Added `c10_resolution_mira_devoted` (requires `miraTrust ≥ 8`) |
| `c10_cain_rival_end` | `c10_resolution_cain_only` had no rival exit | Added `c10_resolution_cain_rival_path` (requires `cain_rival_path_set` flag) |
| `c10_cain_loyalty_end` | `c10_resolution_cain_only` had no loyalty exit | Added `c10_resolution_cain_loyal` (requires `cainTrust ≥ 8`) |
| `c10_cain_last_stand_end` | `c10_grave_cain_chooses_player` had no last-stand path | Added `c10_cain_last_stand_moment` (requires `cainTrust ≥ 8`) |
| `c10_both_companions_lost_end` | `c10_lone_wanderer_moment` had no "register the cost" path | Added `c10_both_lost_accept` choice |
| `c10_empty_chair_end` | `c10_lone_wanderer_moment` had no contemplative path | Added `c10_empty_chair_contemplate` choice |
| `c10_broken_companions_end` | `c10_resolution_both` had no mid-trust broken-bond path | Added `c10_resolution_both_broken` (requires `!secret_bond_achieved`) |
| `c10_chair_forward` | `c10_chair_single_survivor` skipped it | Changed choice to route through `c10_chair_forward` |
| `c10_mira_betrayal_end` | Reachable only via `c10_promise_betrayal_reveal` (also unreachable) | Fixed by fix #6 (betrayal_reveal now reachable) |
| `c10_cain_betrayal_end` | Same as above | Fixed by fix #6 |

---

## Post-Fix Verification

### BFS Reachability
All 126 nodes confirmed reachable from `c10_safehouse_survey` using block-boundary BFS including `successNode`/`failureNode` dice paths.

### TypeScript
`pnpm --filter @workspace/mobile run typecheck` — **clean (0 errors)**

### Node References
All `nextNode`, `successNode`, `failureNode` values in Chapter 10 resolve to valid node IDs within the chapter or to valid cross-chapter targets (`chapter11_start`).

### Image Keys
All 11 `imageKey` values used in Chapter 10 nodes are registered in `artifacts/mobile/constants/images.ts` with both `require()` sources and gradient fallbacks:

| imageKey | Usage |
|----------|-------|
| `quiet_safehouse` | Opening, closing |
| `mira_hidden_clinic` | Clinic arc |
| `cain_war_room` | War room arc |
| `bridge_camp` | Bridge camp |
| `betrayal_alley` | Heir encounter |
| `memory_shelter` | Shelter arc |
| `companion_crossroads` | Crossroads + resolution |
| `last_medicine_room` | Medicine arc |
| `soldiers_grave` | Grave arc |
| `place_we_promised` | Promise arc |
| `empty_chair` | Chair scenes |

### Endings
All 17 ending IDs in Chapter 10 nodes match registered entries in `artifacts/mobile/data/endings.ts`:

| Ending ID | Node | Route |
|-----------|------|-------|
| `ending_ch10_mira_leaves` | `c10_mira_leaves_end` | Low trust, let her pack |
| `ending_ch10_mira_betrayal` | `c10_mira_betrayal_end` | Promise betrayal, Mira targeted |
| `ending_ch10_mira_sacrifice` | `c10_mira_sacrifice_end` | Medicine success + miraTrust ≥ 8 |
| `ending_ch10_mira_devotion` | `c10_mira_devotion_end` | Mira-only resolution + miraTrust ≥ 8 |
| `ending_ch10_cain_betrayal` | `c10_cain_betrayal_end` | Promise betrayal, Cain targeted |
| `ending_ch10_cain_rival` | `c10_cain_rival_end` | Cain-only resolution + rival flag set |
| `ending_ch10_cain_last_stand` | `c10_cain_last_stand_end` | Grave stand + cainTrust ≥ 8 |
| `ending_ch10_cain_loyalty` | `c10_cain_loyalty_end` | Cain-only resolution + cainTrust ≥ 8 |
| `ending_ch10_both_companions_lost` | `c10_both_companions_lost_end` | Lone wanderer, register cost |
| `ending_ch10_empty_chair` | `c10_empty_chair_end` | Lone wanderer, contemplative |
| `ending_ch10_lone_wanderer` | `c10_lone_wanderer_end` | Lone wanderer, power path |
| `ending_ch10_broken_companions` | `c10_broken_companions_end` | Both present, no bond achieved |
| `ending_ch10_corruption_breaks_all` | `c10_corruption_breaks_end` | Corruption threshold exceeded |
| `ending_ch10_heir_manipulation` | `c10_heir_manipulation_end` | Accept heir's offer |
| `ending_ch10_varr_expose` | `c10_varr_expose_end` | Accept Varr's deal |
| `ending_ch10_cain_saints_return` | `c10_cain_saints_return_end` | Cain returns to Saints |
| `ending_ch10_secret_bond` | `c10_secret_bond_end` | Both present + secret_bond_achieved flag |

### ChoiceEffects Fields
All effect fields used in Chapter 10 choices are valid members of `ChoiceEffects`:
`cainTrust`, `corruption`, `health`, `hollowChildren`, `intelligence`, `lastArchive`, `miraTrust`, `morale`, `setFlags`

### ChoiceRequirements Fields
All requirement fields used are valid members of `ChoiceRequirements`:
`backgrounds`, `blockedFlags`, `cainTrust`, `corruption`, `flags`, `miraTrust`

### Dice Checks (6 total)
All 6 dice checks are correctly placed at choice level (not node level):

| Choice | Stat | Threshold | Location |
|--------|------|-----------|----------|
| `c10_clinic_int_check` | intelligence | 6 | Clinic records |
| `c10_veyra_charisma_check` | charisma | 5 | War room, Veyra confrontation |
| `c10_heir_int_check` | intelligence | 7 | Betrayal alley, heir expose |
| `c10_crossroads_luck_check` | luck | 4 | Companion crossroads |
| `c10_medicine_agility_check` | agility | 5 | Last medicine room |
| `c10_grave_strength_check` | strength | 6 | Soldier's grave, Veyra ambush |

---

## Chapter Flow Map

```
chapter10_start (= c10_safehouse_survey)
  ├─ c10_safehouse_mira_arrives → mira truth arc → c10_mira_clinic_arrive
  └─ c10_safehouse_cain_arrives → c10_safehouse_junction
                                        ├─ c10_mira_clinic_arrive  ──────────────────────────┐
                                        ├─ c10_cain_war_room_arrive                           │
                                        └─ c10_bridge_camp_arrive                             │
                                                                                              │
CLINIC ARC ───────────────────────────────────────────────────────────────────────────────────┘
  c10_mira_clinic_arrive → records → varr → experiment truth → c10_clinic_forgive_choice
    ├─ forgive → c10_mira_stays_path → c10_clinic_complete → c10_cain_war_room_arrive
    └─ leave setup → c10_mira_leaves_end [ENDING]

WAR ROOM ARC
  c10_cain_war_room_arrive → orders → c10_orders_examination
    → c10_cain_confrontation_choice
        ├─ direct (trust≥4) → c10_cain_confrontation → blackout truth / accept past
        └─ accusation → c10_cain_defense → accept/reject past
    → veyra → dice → success/fail → war room complete → bridge camp

BRIDGE CAMP → heir manipulation alley → (accept heir [ENDING] / expose / wavering)

MEMORY SHELTER → forgiveness choice → both forgiven → bond scene → c10_shelter_forward

COMPANION CROSSROADS → (bond route [ENDING] / mira final / cain final / both gone)
  → c10_crossroads_resolution

LAST MEDICINE ROOM → dice → success (sacrifice [ENDING] / forward) / fail / scarce

SOLDIER'S GRAVE → names → confession → forgiven / veyra ambush
  → c10_grave_cain_chooses_player → (last stand [ENDING] / place promised)

PLACE WE PROMISED → mira moment / cain moment / betrayal [ENDINGS] / forward

EMPTY CHAIR → both gone → lone wanderer moment
  ├─ continue → lone wanderer choice → (power [ENDING] / truth / protect)
  ├─ both lost [ENDING]
  ├─ empty chair [ENDING]
  └─ reconsider → chapter resolution

CHAPTER RESOLUTION → both / mira only / cain only / alone
  ├─ both: bond [ENDING] / broken [ENDING] / chapter10_end → chapter11_start
  ├─ mira only: devoted [ENDING] / chapter10_end
  ├─ cain only: loyal [ENDING] / rival [ENDING] / chapter10_end
  └─ alone: chapter10_end
```

---

## chapterRoadmap.ts Update

`nodeCount` updated from 130 → 126 to reflect verified node count.

---

## Status: AUDIT COMPLETE

Chapter 10 passes all structural checks. Zero unreachable nodes, zero broken references, zero TypeScript errors. All 17 endings are wired and reachable. Ready for Chapter 11 development.
