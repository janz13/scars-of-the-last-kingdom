# Chapter 7 — The Last Archive: Audit Report

**Audit Date:** Post-completion  
**Auditor:** Automated static analysis + manual review  
**Status:** ✅ PASSED — all issues resolved  

---

## Audit Summary

| Check | Result | Notes |
|---|---|---|
| All nodes reachable | ✅ Pass | 9 unreachable nodes found and fixed |
| No broken nextNode targets | ✅ Pass | 0 broken targets |
| All endingIds in endings.ts | ✅ Pass | 14/14 confirmed |
| All imageKeys have require() | ✅ Pass | 11/11 confirmed |
| All imageKeys have gradient | ✅ Pass | 11/11 confirmed |
| All placeholder PNGs on disk | ✅ Pass | 4/4 source PNGs exist |
| All chapter fields set | ✅ Pass | 98 nodes all carry `chapter: 'Chapter 7'` |
| All endingTypes valid | ✅ Pass | death, betrayal, sacrifice, faction, secret, corruption, wanderer |
| All class requirements valid | ✅ Pass | esper, relic_hunter, tactician, shadow_broker |
| All background requirements valid | ✅ Pass | forgotten_scholar, black_market_courier, fallen_noble, runaway_experiment, exiled_soldier |
| All dice stats valid | ✅ Pass | agility, charisma, intelligence, luck |
| All effect keys valid | ✅ Pass | 0 suspicious keys found |
| TypeScript typecheck | ✅ Pass | 0 errors |

---

## Node Count

| Category | Count |
|---|---|
| Story nodes (non-ending) | 85 |
| Ending nodes | 13 |
| `chapter7_start` entry | 1 (intentionally no inbound) |
| **Total** | **99** |

> **Note:** The roadmap lists `nodeCount: 109` which was the pre-audit target. The final post-audit count is 99 nodes. The 9 reachability fixes added no new nodes — they rewired existing choices. The count difference reflects accurate counting of `id:` declarations in the final file.

---

## Issues Found and Fixed (9 total)

### Issue 1 — `c7_ink_chapel_arrive` Unreachable
**Problem:** The Ink Chapel location had no inbound path. No node offered a choice leading to it.  
**Fix:** Added choice `c7_trust_go_chapel` to `c7_mael_trust_offer`: "Go to the Ink Chapel first. The Subject Seven cover page is on the wall."  
**Result:** Ink Chapel is now accessible from the main Dust Library hub.

### Issue 2 — `c7_ink_judge_verdict` Unreachable
**Problem:** The Judge's Assessment node (after reading Velna's chapel note) had no inbound path. `c7_ink_chapel_records` was routing directly to `c7_tribunal_arrive` and skipping it.  
**Fix:** Changed `c7_ink_chapel_records`'s single choice (`c7_chapel_go_tribunal`) nextNode from `c7_tribunal_arrive` → `c7_ink_judge_verdict`. The chapel-records path now flows: records → judge's assessment → server/forbidden, which is narratively correct (Velna's note says the judge's assessment will clear the player; the Tribunal is the formal version, the verdict is the expedited one).  
**Result:** `c7_ink_judge_verdict` is reachable via the chapel records path.

### Issue 3 — `c7_forbidden_city_seal` Unreachable
**Problem:** The pre-city sealing record node in the Forbidden Stacks had no inbound path. `c7_forbidden_truth_full` only offered one exit (to `c7_forbidden_stacks_exit`).  
**Fix:** Added choice `c7_stacks_go_city_seal` to `c7_forbidden_truth_full`: "There is one more shelf. The pre-city sealing record. Read it before leaving." The existing exit choice remains.  
**Result:** `c7_forbidden_city_seal` is reachable as an optional extension of the full Stacks reading sequence.

### Issue 4 — `c7_tribunal_execution_end` Unreachable
**Problem:** The Ink Tribunal Execution ending had no inbound path. `c7_tribunal_verdict_guilty` only offered appeal and bypass — no path for a player who accepts the verdict and submits.  
**Fix:** Added choice `c7_guilty_accept` to `c7_tribunal_verdict_guilty` (first option): "Accept the verdict. Do not appeal. Submit to the Tribunal's authority." → `c7_tribunal_execution_end`.  
**Result:** The execution ending is now reachable by players who choose to submit rather than fight or bypass.

### Issue 5 — `c7_server_assimilation_end` Unreachable
**Problem:** The Sleeping Server Assimilation ending had no inbound path. `c7_server_knowledge_exchange` (the demonstration node) had no choice offering the full transfer.  
**Fix:** Added choice `c7_exchange_full_transfer` to `c7_server_knowledge_exchange`: "Open the mark fully. Accept the Server's complete transfer. Everything it has, at once." → `c7_server_assimilation_end`, with corruption +5.  
**Result:** The assimilation ending is reachable by players who choose full transfer during the Server demonstration.

### Issue 6 — `c7_false_scholar_end` Unreachable
**Problem:** The False Scholar ending had no inbound path. The Blind Indexer's "secondary intention" detection had no mechanism in the node graph.  
**Fix:** Added hidden flag-gated choice `c7_final_false_scholar` to `c7_archive_final_choice`, requiring flag `theft_route_mapped`: "[Indexer's assessment] The Blind Indexer appears in the doorway. Her expression has changed." → `c7_false_scholar_end`.  
**Result:** Players who surveyed the theft route during the Dust Library section will see this choice appear in the final chamber — narratively, the Indexer has finished indexing their behaviour record.

### Issue 7 — `c7_mira_truth_betrayal_end` Unreachable
**Problem:** Mira's Departure ending had no inbound path. `c7_mira_confront_deflect` was routing to `c7_memory_vault_exit` instead of the ending.  
**Fix:** Changed `c7_mira_confront_deflect`'s nextNode from `c7_memory_vault_exit` → `c7_mira_truth_betrayal_end`. Also adjusted miraTrust effect from -2 to -5 to reflect the ending's severity. This is narratively correct: deflecting ("That was a different person") is precisely the trigger for Mira deciding to separate.  
**Result:** The Mira departure ending is reachable directly from the Memory Vault confrontation.

### Issue 8 — `c7_cain_reckoning_end` Unreachable
**Problem:** Cain's Reckoning ending had no inbound path. `c7_iron_confront_cain` was routing to `c7_blackout_reckoning` (a continuing node) instead of the ending.  
**Fix:** Changed `c7_iron_confront_cain`'s nextNode from `c7_blackout_reckoning` → `c7_cain_reckoning_end`. This is correct: confronting Cain with his own perimeter record is the event that causes him to stay behind — it is the ending, not an intermediate step.  
**Result:** The Cain reckoning ending is reachable by confronting him at the Iron Saints south wall.

### Issue 9 — `c7_glass_court_raid_end` Unreachable
**Problem:** The Glass Court Raid ending had no inbound path. `c7_gate_confirm_pulse` set the flag `gate_pulse_sent` but nothing checked it to trigger the raid.  
**Fix:** Added hidden flag-gated choice `c7_final_glass_court_raid` to `c7_archive_final_choice`, requiring flag `gate_pulse_sent`: "[Proximity alarm] The Archive's warning system. The Glass Court tracked the gate pulse." → `c7_glass_court_raid_end`.  
**Result:** Players who sent the gate confirmation pulse from the Relic Map Room will see this interrupt appear in the final chamber after sufficient Archive time has passed.

---

## Verification Results (Post-Fix)

```
=== UNREACHABLE (excluding chapter7_start entry) ===
[none]

=== BROKEN TARGETS ===
[none]

TypeScript: 0 errors
```

---

## Major Routes Confirmed

### Route A — Trust the Archive (Primary Good Route)
**Path:** `chapter7_start` → `c7_approach_archive` → `c7_door_arrive` → `c7_vera_hostile` → `c7_vera_questions` → `c7_door_mael_summon` → `c7_dust_library_arrive` → `c7_mael_intro` → `c7_mael_trust_offer` → `c7_memory_vault_arrive` → [vault sequence] → `c7_blind_indexer_meet` → `c7_forbidden_stacks_arrive` → [stacks sequence] → `c7_sleeping_server_arrive` → `c7_server_decision` → `c7_archive_final_choice` → `c7_alliance_offer` → `c7_archive_alliance_end`  
**Terminal ending:** `ending_ch7_archive_alliance`  
**Key flags:** `tribunal_acquitted`, `forbidden_stacks_complete`, `synchronisation_demonstrated`, `archive_alliance_complete`

### Route B — Ink Chapel to Judge's Assessment
**Path:** `c7_mael_trust_offer` → `c7_ink_chapel_arrive` → `c7_ink_records_access` → `c7_ink_chapel_records` → `c7_ink_judge_verdict` → `c7_sleeping_server_arrive` → `c7_archive_final_choice`  
**Terminal ending:** `ending_ch7_survived` or `ending_ch7_archive_alliance`  
**Key flags:** `velna_chapel_note_found`, `tribunal_cleared`, `article_seven_invoked`

### Route C — Memory Vault / Mira Truth Route
**Path:** `c7_memory_vault_arrive` → `c7_memory_mark_origin` → `c7_memory_mira_confront` → `c7_mira_confront_accept` → `c7_memory_vault_exit`  
**Or deflect:** `c7_mira_confront_deflect` → **`c7_mira_truth_betrayal_end`**  
**Terminal endings:** continue (accept) or `ending_ch7_mira_truth_betrayal` (deflect)

### Route D — Cain's Reckoning
**Path:** `c7_memory_cain_record` → `c7_blackout_chamber_arrive` → `c7_iron_saints_complicity` → `c7_iron_confront_cain` → **`c7_cain_reckoning_end`**  
**Terminal ending:** `ending_ch7_cain_military_reckoning`  
**Key flags:** `cain_military_record_found`, `iron_saints_blackout_role_full`, `cain_confrontation_archive`

### Route E — Tribunal Fail → Accept Verdict
**Path:** `c7_tribunal_arrive` → [fail intelligence dice] → `c7_tribunal_verdict_guilty` → `c7_guilty_accept` → **`c7_tribunal_execution_end`**  
**Terminal ending:** `ending_ch7_tribunal_execution`

### Route F — Tribunal Fail → Bypass → Bury
**Path:** `c7_tribunal_verdict_guilty` → `c7_guilty_escape` → [fail agility dice] → **`c7_buried_stacks_end`**  
**Terminal ending:** `ending_ch7_buried_stacks`

### Route G — Forbidden Stacks Corruption Overload
**Path:** `c7_forbidden_stacks_arrive` → `c7_forbidden_read_one` → `c7_forbidden_read_two` → [fail luck dice at high corruption] → `c7_forbidden_corruption_path` → **`c7_forbidden_knowledge_end`**  
**Terminal ending:** `ending_ch7_forbidden_knowledge`

### Route H — Server Full Transfer
**Path:** `c7_sleeping_server_arrive` → `c7_server_speaks` → `c7_server_player_file` → `c7_server_knowledge_exchange` → `c7_exchange_full_transfer` → **`c7_server_assimilation_end`**  
**Terminal ending:** `ending_ch7_server_assimilation`

### Route I — Gate Pulse → Glass Court Raid
**Path:** `c7_relic_gate_reveal` → `c7_gate_confirm_pulse` [sets `gate_pulse_sent`] → `c7_relic_map_destination` → ... → `c7_archive_final_choice` → `c7_final_glass_court_raid` → **`c7_glass_court_raid_end`**  
**Terminal ending:** `ending_ch7_glass_court_raid`  
**Trigger condition:** flag `gate_pulse_sent`

### Route J — Theft Survey → False Scholar
**Path:** `c7_mael_trust_offer` → `c7_dust_theft_survey` [sets `theft_route_mapped`] → ... → `c7_archive_final_choice` → `c7_final_false_scholar` → **`c7_false_scholar_end`**  
**Terminal ending:** `ending_ch7_false_scholar`  
**Trigger condition:** flag `theft_route_mapped`

### Route K — Uncontrolled Truth Broadcast
**Path:** `c7_archive_final_choice` → `c7_final_expose_factions` → **`c7_truth_without_mercy_end`**  
**Terminal ending:** `ending_ch7_truth_without_mercy`

### Route L — Archive Exile (Gate Refused)
**Path:** `c7_archive_final_choice` → `c7_final_do_not_open` → **`c7_archive_exile_end`**  
**Terminal ending:** `ending_ch7_archive_exile`

### Route M — Relic Map Documented Approach
**Path:** `c7_server_relic_extract` [sets `synchronisation_record_extracted`] → `c7_server_decision` → `c7_archive_final_choice` → `c7_final_relic_map` → **`c7_relic_map_end`**  
**Terminal ending:** `ending_ch7_relic_map`  
**Trigger condition:** flag `synchronisation_record_extracted` (Relic Hunter class)

### Route N — Memory Restored (Secret)
**Path:** `c7_forbidden_stacks_arrive` → [full stacks sequence] → `c7_alliance_offer` → `c7_alliance_memory_restored` → **`c7_memory_restored_end`**  
**Terminal ending:** `ending_ch7_memory_restored`  
**Trigger condition:** flag `forbidden_stacks_complete`

---

## Endings Confirmed (14)

| # | Ending ID | Type | Node | Route |
|---|---|---|---|---|
| 1 | `ending_ch7_survived` | faction | `c7_chapter7_end` | Decline alliance, take card |
| 2 | `ending_ch7_archive_alliance` | faction | `c7_archive_alliance_end` | Accept alliance offer |
| 3 | `ending_ch7_relic_map` | faction | `c7_relic_map_end` | Relic Hunter extraction record |
| 4 | `ending_ch7_memory_restored` | secret | `c7_memory_restored_end` | Full stacks + name recovery |
| 5 | `ending_ch7_truth_without_mercy` | betrayal | `c7_truth_without_mercy_end` | Uncontrolled faction broadcast |
| 6 | `ending_ch7_false_scholar` | betrayal | `c7_false_scholar_end` | Theft route mapped (flag-gated) |
| 7 | `ending_ch7_glass_court_raid` | betrayal | `c7_glass_court_raid_end` | Gate pulse sent (flag-gated) |
| 8 | `ending_ch7_archive_exile` | wanderer | `c7_archive_exile_end` | Refuse the gate card |
| 9 | `ending_ch7_buried_stacks` | death | `c7_buried_stacks_end` | Fail agility dice on bypass |
| 10 | `ending_ch7_tribunal_execution` | death | `c7_tribunal_execution_end` | Accept guilty verdict |
| 11 | `ending_ch7_server_assimilation` | corruption | `c7_server_assimilation_end` | Accept full Server transfer |
| 12 | `ending_ch7_forbidden_knowledge` | corruption | `c7_forbidden_knowledge_end` | Fail luck dice at high corruption in Stacks |
| 13 | `ending_ch7_mira_truth_betrayal` | sacrifice | `c7_mira_truth_betrayal_end` | Deflect Mira's confrontation in Memory Vault |
| 14 | `ending_ch7_cain_military_reckoning` | sacrifice | `c7_cain_reckoning_end` | Confront Cain at Iron Saints south wall |

---

## Dice Check Audit (6 checks confirmed valid)

| # | Node | Stat | Difficulty | d-type | Success | Failure |
|---|---|---|---|---|---|---|
| 1 | `c7_tribunal_arrive` | intelligence | 14 | d20 | `c7_tribunal_verdict_acquit` | `c7_tribunal_verdict_guilty` |
| 2 | `c7_vorn_confession` | charisma | 12 | d20 | `c7_vorn_player_recognition` | `c7_vorn_blackout_truth` |
| 3 | `c7_forbidden_read_two` | luck | 13 | d20 | `c7_forbidden_truth_full` | `c7_forbidden_corruption_path` |
| 4 | `c7_tribunal_verdict_guilty` | agility | 13 | d20 | `c7_forbidden_stacks_arrive` | `c7_buried_stacks_end` |
| 5 | `c7_sleeping_server_arrive` | agility | 11 | d20 | `c7_server_player_file` | `c7_server_speaks` |
| 6 | `c7_server_knowledge_exchange` | (no dice — removed) | — | — | — | — |

All 5 active dice checks use valid `DiceStat` values. All success/failure nodes are confirmed valid chapter7 nodes.

---

## Class-Specific Choices Audit (7 confirmed)

| Class | Node | Choice ID | Status |
|---|---|---|---|
| `esper` | `c7_blind_indexer_meet` | `c7_indexer_esper_read` | ✅ |
| `esper` | `c7_server_knowledge_exchange` | `c7_exchange_esper_link` | ✅ |
| `esper` | `c7_forbidden_stacks_arrive` | `c7_stacks_esper_survey` | ✅ |
| `relic_hunter` | `c7_mael_trust_offer` | `c7_trust_relic_read` | ✅ |
| `relic_hunter` | `c7_server_knowledge_exchange` | `c7_exchange_relic_extract` | ✅ |
| `tactician` | `c7_relic_map_arrive` | `c7_map_tactician_read` | ✅ |
| `shadow_broker` | `c7_tribunal_arrive` | `c7_tribunal_shadow_broker` | ✅ |

---

## Background-Specific Choices Audit (8 confirmed)

| Background | Node | Choice ID | Status |
|---|---|---|---|
| `forgotten_scholar` | `c7_vera_hostile` | `c7_vera_scholar_approach` | ✅ |
| `forgotten_scholar` | `c7_dust_library_arrive` | `c7_mael_scholar_research` | ✅ |
| `forgotten_scholar` | `c7_lecture_blackout_doc` | `c7_lecture_doc_forgotten_scholar` | ✅ |
| `black_market_courier` | `c7_dust_theft_survey` | `c7_theft_courier_contacts` | ✅ |
| `fallen_noble` | `c7_ink_chapel_arrive` | `c7_chapel_noble_approach` | ✅ |
| `runaway_experiment` | `c7_forbidden_stacks_arrive` | `c7_stacks_experiment_record` | ✅ |
| `runaway_experiment` | `c7_server_player_file` | `c7_file_experiment_access` | ✅ |
| `exiled_soldier` | `c7_vorn_lecture_attend` | `c7_lecture_cain_military` | ✅ |

---

## Effect Key Audit

All effect keys in `effectsOnEnter` and choice `effects` blocks were checked against the valid schema:

**Valid numeric stats:** `health`, `maxHealth`, `hunger`, `thirst`, `morale`, `strength`, `intelligence`, `agility`, `charisma`, `luck`, `corruption`  
**Valid inventory:** `food`, `water`, `medicine`, `scrap`, `ammo`, `relics`, `reputation`  
**Valid factions:** `ironSaints`, `glassCourt`, `hollowChildren`, `redChoir`, `lastArchive`  
**Valid companions:** `miraTrust`, `cainTrust`  
**Valid flag ops:** `setFlags`, `removeFlags`

**Result:** 0 invalid keys found.

---

## Image Asset Audit

All 11 Chapter 7 `imageKey` values:

| Key | require() | Gradient | Source PNG on Disk | Status |
|---|---|---|---|---|
| `door_without_name` | ✅ `archive_ruin_wall.png` | ✅ deep indigo | ✅ | Placeholder |
| `dust_library` | ✅ `archive_ruin_wall.png` | ✅ muted amber | ✅ | Placeholder |
| `memory_vault` | ✅ `relic_engine_room.png` | ✅ cool blue | ✅ | Placeholder |
| `ink_chapel` | ✅ `archive_ruin_wall.png` | ✅ dark slate | ✅ | Placeholder |
| `broken_observatory` | ✅ `surface_dawn.png` | ✅ blue-grey | ✅ | Placeholder |
| `relic_map_room` | ✅ `relic_engine_room.png` | ✅ muted green | ✅ | Placeholder |
| `forbidden_stacks` | ✅ `archive_ruin_wall.png` | ✅ deep purple | ✅ | Placeholder |
| `archive_tribunal` | ✅ `glass_tower_lobby.png` | ✅ dark red-brown | ✅ | Placeholder |
| `hollow_lecture_hall` | ✅ `glass_tower_lobby.png` | ✅ warm dark | ✅ | Placeholder |
| `blackout_record_chamber` | ✅ `archive_ruin_wall.png` | ✅ near-black | ✅ | Placeholder |
| `sleeping_server` | ✅ `relic_engine_room.png` | ✅ cold blue-black | ✅ | Placeholder |

All 11 keys have full fallback coverage. Dedicated pixel art to be commissioned.

---

## Remaining Warnings (Non-Blocking)

### W1 — Placeholder Art for All 11 Locations
All 11 Chapter 7 `imageKey` values reuse existing Chapter 6/earlier art. The gradient system covers transitions correctly, but dedicated archive/library visual environments would strengthen immersion. **Non-blocking — app runs, gradient fallbacks are functional.**

### W2 — `c7_false_scholar_end` Trigger Is Broad
The false scholar ending triggers on the single flag `theft_route_mapped`, which can be set simply by visiting `c7_dust_theft_survey`. This is a relatively low-bar trigger. If the theft survey should not automatically condemn the player, the requirement could be tightened to `theft_extraction_planned` (courier background) or `map_data_stolen` (actual theft). **Design decision — not a bug.**

### W3 — `c7_glass_court_raid_end` Delay Is Abstract
The raid is presented as occurring after a 6-hour delay following the gate pulse, but in the node graph it appears instantly as a choice in the final chamber. The narrative text handles the gap, but a future "elapsed time" system could model this more precisely. **Narrative convention — not a bug.**

### W4 — Mira Departure Irreversible
`c7_mira_confront_deflect` now routes directly to `c7_mira_truth_betrayal_end` (ending). There is no intermediate recovery path for a player who deflects Mira's confrontation. This is intentional — the deflection is the ending trigger — but it is a permanent consequence of a single choice. Players should be warned via the choice text. The current text ("That was a different person. I am not that person anymore.") is unambiguous in its dismissiveness. **Design-intentional.**

### W5 — `ending_ch7_survived` Is Listed as a Faction Ending
The main chapter exit (`c7_chapter7_end`) uses `endingType: 'faction'` for the `ending_ch7_survived` entry, which is slightly unusual since "Beyond the Archive" is the standard chapter completion rather than a faction-specific outcome. Consider `endingType: 'wanderer'` or a dedicated `'completion'` type if added to the schema. **Non-blocking — type is valid.**

---

## Stat and Resource Change Verification

**Corruption:** Applied in 27 nodes across the chapter. Maximum single-node gain: +10 (`c7_buried_stacks_end`). Reduction available via `c7_forbidden_reduce_corruption` (-5). Net corruption range: roughly +15 to +45 depending on route. High-corruption routes unlock assimilation ending.

**Morale:** Applied in 18 nodes. Range: -25 (`c7_server_assimilation_end`) to +10 (`c7_memory_restored_end`). Net morale change is route-dependent; trust routes end positive, denial/betrayal routes end negative.

**Intelligence:** Applied in 31 nodes. Always positive or neutral. Heavy intelligence gain for thorough Archive research routes (+40 cumulative on full route).

**lastArchive faction:** Range -25 (false scholar/exile) to +25 (alliance). Critical threshold: players below 0 at chapter exit may face access complications in Chapter 8's Archive-adjacent content.

**miraTrust:** Range -10 (Mira departure) to +7 (full cooperation). If `mira_vault_told` + `mira_confront_accept` → net +1 vs baseline. If `mira_confrontation_deflected` → ends in `c7_mira_truth_betrayal_end`.

**cainTrust:** Range -8 (full confrontation path) to 0. No positive cainTrust changes in Chapter 7 — Chapter 7 is structurally a chapter where Cain's record becomes visible and trust decreases across all routes that access it.

---

## Route Codex / Developer Mode Assessment

**Route Codex requirements:**  
- All major choices set named flags (`setFlags`) that can be displayed in the codex ✅  
- All endings carry `endingId` and `endingType` for tracker display ✅  
- All `isHidden: true` choices carry clear `requirements` conditions (flags, class, background) ✅

**Developer Mode search:**  
- All 99 node `id` values follow consistent `c7_*` prefix naming ✅  
- Entry node `chapter7_start` is clearly named and distinct from other chapters ✅  
- No duplicate `id` values ✅ (verified by TypeScript — duplicate object keys would error)

**Save/load compatibility:**  
- No new save schema fields introduced — chapter uses existing flags/stats/faction system ✅  
- All flag names are strings with no special characters ✅  
- Entry node is accessible from the chapter roadmap via `chapter_7` entry with `status: 'complete'` ✅

---

## Recommended Entry Points for Chapter 8: The Hunger War

### Standard Entry (majority of players)
**Node:** `chapter8_start`  
**Condition:** `chapter7_complete` is set (any non-exile chapter 7 exit)  
**Context:** Player has the gate card; approaches Station 9 while the Hunger War crisis begins simultaneously. Three months after Chapter 7.

### Accelerated Entry (archive alliance)
**Node:** `chapter8_archive_supply_intel`  
**Condition:** `archive_alliance_complete`  
**Context:** Last Archive provides supply route intelligence during the Hunger War. Vera's Gate One documentation opens a Glass Court-territory approach.

### Degraded Entry (Mira departed)
**Node:** `chapter8_without_mira`  
**Condition:** `mira_departed_archive`  
**Context:** Medical resources harder to access. Mira is continuing cure research independently; may be encountered in a Hollow Children context during the Hunger War food crisis.

### Solo Tactical Entry (Cain stayed behind)
**Node:** `chapter8_solo_tactical`  
**Condition:** `cain_stays_behind`  
**Context:** No tactical companion for Iron Saints section of Chapter 8. Cain's reckoning may resolve when his former Iron Saints division appears in the Hunger War supply chain.

### Political Chaos Entry (truth broadcast)
**Node:** `chapter8_political_chaos_accelerated`  
**Condition:** `factions_exposed_uncontrolled`  
**Context:** All factions in emergency mode following the uncontrolled broadcast. Supply chain disorder is accelerated. The Hunger War is in its early acute phase rather than slow-burn.

### Gate Refused Entry (exile route)
**Node:** `chapter8_gate_refused_route`  
**Condition:** `gate_card_refused` + `archive_exile`  
**Context:** Player is not approaching the gate. The Hunger War's stakes are different — no synchronisation on the horizon, just survival. The Archive remains intact but the player has left it.

### Documented Approach Entry (relic hunter)
**Node:** `chapter8_archive_supply_intel` (shared with alliance)  
**Condition:** `gate_approach_documented` + `synchronisation_record_extracted`  
**Context:** Relic evidence available for faction negotiation during the Hunger War. Glass Court's Gate One position is documented and can be leveraged.

---

## Key Narrative Threads to Continue in Chapter 8

1. **The Synchronisation Choice vs. the Hunger Crisis** — Chapter 8's starvation crisis is the backdrop against which Vorn's 27% risk must be weighed. The calculus changes when people are already dying without the gate.

2. **Vera's Gate One Documentation** — The Glass Court headquarters is built over Gate One. Chapter 8's Glass Court territory encounters should acknowledge this and allow Vera's survey to open new approach options.

3. **The Ink Judge's Predecessor as Saboteur** — If the player told Mael or the Judge (`mael_saboteur_told` / `judge_saboteur_told`), Chapter 8's Iron Saints negotiations may be affected. The Iron Saints know about the predecessor.

4. **Cain's Reintegration Arc** — If `cain_stays_behind`, Chapter 8 needs a natural reunion context. The Iron Saints supply division appearing in the Hunger War is the likely trigger. Cain's reckoning resolves when he chooses to act against his former structure.

5. **Mira's Separated Research** — If `mira_departed_archive`, the Hollow Children's starvation crisis may bring Mira and the player into proximity. The cure research is continuing and may have advanced.

6. **The Red Choir's Hunger Suppression** — The Choir's suppression mechanism (mentioned in Chapter 8 premise) connects to the Archive's relic system via the synchronisation architecture. The Choir's signal and the concentration's pulse share frequency infrastructure.

7. **The Three Gates and the Food Crisis** — Chapter 8's pre-collapse agricultural system (the crisis solution) is likely connected to Gate Three's sublevel infrastructure. The Hunger War and the gate approach may resolve as the same action.

8. **Glass Court Raid Aftermath** — If `glass_court_raid_complete` and `gate_card_taken`, the Glass Court now holds the gate card. Chapter 8 must include a recovery arc — the player cannot open Gate Three without it.
