# Chapter 7 — The Last Archive: Summary

**Status:** Complete  
**Nodes:** 109 (entry: `chapter7_start`)  
**Endings:** 13 ending nodes → 14 endingIds (including `ending_ch7_survived` main exit)  
**TypeScript:** ✅ 0 errors

---

## Overview

Chapter 7 is the Archive chapter — the chapter where the player assembles the full picture of what happened before the blackout, who they were, why the mark exists, and what the relic gate beneath the city is for. The chapter is structured as a research and discovery arc: the player moves through eleven interconnected locations, speaking with six NPCs, accessing four major information systems (Memory Vault, Forbidden Stacks, Blackout Record Chamber, Sleeping Server), and arriving at a final decision point where the gate card is on a table and the question is simply: take it or leave it.

The chapter's central reveals are staggered across the location sequence. No single location contains the full truth. The player must assemble it.

---

## Locations

| Location | Primary Function | Key NPC |
|---|---|---|
| The Door Without a Name | Entry, assessment, Vera Quill introduction | Vera Quill |
| The Dust Library | Mael introduction, route establishment, Blind Indexer | Archivist Mael, Blind Indexer |
| The Memory Vault | Player's own memory fragments (4 of 14 containers) | — |
| The Ink Chapel | Archive law, Subject Seven restricted file, Tribunal gate | Ink Judge |
| The Broken Observatory | Vorn's testimony, relic gate science, probability model | Professor Ansel Vorn |
| The Relic Map Room | Three gate locations confirmed, Gate Three = Station 9 | Vera Quill (map sharing) |
| The Forbidden Stacks | Remaining 10 memory containers, Velna's final message | — |
| The Archive Tribunal | Formal clearance process or bypass route | Ink Judge |
| The Hollow Lecture Hall | Vorn's probability lecture, documentary record, Vera's file | Professor Ansel Vorn |
| The Blackout Record Chamber | Full factional blackout record, player memorandum | — |
| The Sleeping Server | Full file, VELNA-PRIME-SECONDARY ghost log, demonstration | — |

---

## NPCs

### Archivist Mael
- Keeper of the Archive, has maintained it for twelve years
- Knows the mark's origin but not the full pre-blackout file (above his clearance)
- Provides the glass card (access credential), structures the trust system
- Confirms Velna's death — killed by Iron Saints before the blackout trying to delay it
- Knows about the gate but chose not to seek the gate card himself
- **Key flag set:** `met_archivist_mael`, `velna_death_known`, `archive_trust_system_explained`

### Vera Quill
- Field Scholar, Classification Three, assigned to assess the player
- Distrusts the player: her mother was Researcher Quill, who surveyed Gate One without knowing it and was reset in the blackout
- Can shift to partial trust (`vera_partial_trust`) if given her mother's research file
- Can form an archive alliance (`vera_alliance_formed`) if the file is shared and the full truth is acknowledged
- Her mother's research is the most complete Gate One survey in existence
- **Key flags:** `met_vera_quill`, `vera_mother_connection_known`, `vera_partial_trust`, `vera_alliance_formed`

### The Blind Indexer
- Has no name in any Archive record; referred to only as the Indexer
- Her vision was replaced by relic-touch from years of active relic record handling
- Identifies the player as Subject Seven on approach; reads the full pre-blackout architecture from the mark
- Reveals the Forbidden Stacks hold a pre-blackout file classified above Mael's clearance
- Confirms the player "agreed to" the mark's integration before the reset
- **Key flags:** `met_blind_indexer`, `indexer_reading_complete`, `pre_blackout_self_known`, `forbidden_stacks_lead`

### Professor Ansel Vorn
- Pre-collapse materials science and relic architecture
- Designed the relic gate system beneath the city
- Was in the room when Velna integrated the mark — his episodic memory survived the reset due to relic shielding
- Confirms Cain was Iron Saints tactical intelligence, in the same room
- Confirms Sann (Glass Court/Red Choir) was also in the room — the infection is a blackout preparation side effect
- Runs the synchronisation probability model: 73% benign (updated to 76% with Cain's perimeter data)
- Warns the player about an Archive insider who used deception (`archive_deception_warning`)
- **Key flags:** `met_professor_vorn`, `vorn_gate_designer_known`, `gate_purpose_revealed`, `vorn_probability_assessment`, `vorn_safety_protocol_known`

### The Ink Judge
- Leads the Archive Tribunal; enforces Archive law including Article Fifteen (execution)
- Younger than the title implies; absolutely committed to the law she enforces
- Knows the Subject Seven file was inducted by Velna and then restricted by VELNA-PRIME
- Grants access through the Tribunal process or through Article Seven exemption
- Can give the player Vera's mother's file as judicial discretion during the Tribunal
- Her predecessor (deceased) is the saboteur identified in the Sleeping Server's ghost log
- **Key flags:** `met_ink_judge`, `tribunal_interest_declared`, `tribunal_cleared`, `article_seven_invoked`, `vera_mother_file_obtained`

### The Sleeping Server
- AI-like pre-collapse computing system, maintained at reduced power for twelve years
- Built by Velna using the same architectural principles as the mark — recognises the mark on authentication
- Holds: full pre-blackout file, experiment documentation, Velna's design notes, VELNA-PRIME-SECONDARY access log ghost, synchronisation demonstration
- **VELNA-PRIME-SECONDARY:** Ink Judge's predecessor used Velna's secondary credentials to provide false intelligence to the Glass Court and Iron Saints — causing the blackout interruption
- The synchronisation demonstration (12 seconds, minimal scale) shows the concentration's benign response directly
- **Key flags:** `sleeping_server_reached`, `server_authenticated`, `saboteur_identified`, `ink_judge_predecessor_link`, `synchronisation_demonstrated`

---

## Major Routes

### Route 1 — Earn Last Archive Trust
**Path:** Vera assessment → Mael trust offer → Tribunal process → acquitted → full access  
**Key choices:** cooperate with Vera's questions, accept Tribunal review, don't bypass security  
**Outcome flags:** `tribunal_acquitted`, `full_archive_access`, `archive_alliance_formalised`  
**Terminal endings:** `ending_ch7_archive_alliance`, `ending_ch7_survived`

### Route 2 — Steal the Forbidden Records
**Path:** Dust Library theft survey → relic architecture assessment → Tribunal bypass  
**Key choices:** `c7_trust_go_theft` → `c7_theft_courier_contacts` → agility bypass dice  
**Outcome flags:** `theft_route_mapped`, `theft_extraction_planned`, `tribunal_bypass_attempted`  
**Terminal endings:** `ending_ch7_survived` (if bypass succeeds), `ending_ch7_buried_stacks` (if fails)

### Route 3 — Expose the Archive to Another Faction
**Path:** Gate pulse sent from Relic Map Room → Glass Court detects → raid  
**Key choices:** `c7_gate_confirm_pulse` without securing access first  
**Terminal ending:** `ending_ch7_glass_court_raid`

### Route 4 — Learn About the Player's Past
**Path:** Memory Vault (4 containers) → Forbidden Stacks (10 containers) → Sleeping Server full file  
**Core reveals:** pre-blackout workshop, blackout planning meeting, the blackout day, mark integration memory  
**Outcome flags:** `pre_blackout_self_known`, `blackout_player_role_confirmed`, `mark_origin_fully_known`, `self_authored_reset_confirmed`

### Route 5 — Discover the Origin of the Wrist Mark
**Path:** Mael introduction → Memory Vault `c7_memory_mark_origin` → Blind Indexer `c7_blind_indexer_memory`  
**Key reveal:** The mark is a relic interface, designed specifically for the player's neural architecture, built by Velna  
**Outcome flags:** `mark_interface_confirmed`, `mark_origin_fully_known`, `velna_identity_full`

### Route 6 — Forgotten Scholar Route
**Path:** `c7_vera_scholar_approach` (bypasses Vera) → `c7_mael_scholar_research` → `c7_dust_scholar_route` → cross-reference classification system → `c7_lecture_doc_forgotten_scholar`  
**Bonus:** Identifies a secondary annotation in Vera's mother's file that changes its classification  
**Background requirement:** `forgotten_scholar`

### Route 7 — Relic Hunter Route
**Path:** `c7_trust_relic_read` → relic architecture identified as structural-integration → Relic Map Room → `c7_relic_map_tactician` → `c7_server_relic_extract`  
**Bonus:** Extracts synchronisation evidence record (glass card) from Server demonstration node  
**Class requirement:** `relic_hunter`

### Route 8 — Tactician Route
**Path:** `c7_map_tactician_read` in Relic Map Room → Gate One strategic assessment → time pressure identified  
**Bonus:** Updates Vorn's probability model via `c7_lecture_cain_military` (with `exiled_soldier` background synergy)  
**Class requirement:** `tactician`

### Route 9 — Hide Information from Mira
**Path:** `c7_vault_hide_from_mira` → `c7_memory_hide_from_mira` → carry withheld information through chapter  
**Consequence:** `vault_truth_withheld`, corruption +2, Mira never learns the blackout room truth in Ch7  
**Alternative outcome:** Delivering truth badly later triggers `ending_ch7_mira_truth_betrayal`

### Route 10 — Reveal Cain's Military Connection to the Blackout
**Path:** `c7_memory_cain_record` in Memory Vault → `c7_iron_saints_complicity` in Blackout Chamber → `c7_iron_confront_cain`  
**Terminal ending:** `ending_ch7_cain_military_reckoning` (Cain reads his own record and stays behind)  
**Or:** `cain_record_withheld_archive` — carry knowledge without confrontation into Ch8

### Route 11 — Reduce Corruption Through Knowledge
**Path:** Memory Vault sequential access → `c7_forbidden_reduce_corruption` (cooling chamber) → controlled Stacks reading  
**Effect:** corruption -5, `corruption_reduced_stacks`  
**Available if:** player approaches the Stacks before max corruption

### Route 12 — Increase Corruption Through Forbidden Relic Records
**Path:** Stacks without vault prep → `c7_forbidden_read_two` → fail luck dice → `c7_forbidden_corruption_path`  
**Terminal ending:** `ending_ch7_forbidden_knowledge` (cognitive merge, corruption +20)  
**Or:** Sleeping Server assimilation offer with very high corruption → `ending_ch7_server_assimilation`

---

## Required Story Reveals

| Reveal | Location Where Found | Node |
|---|---|---|
| The blackout was planned by human leaders and relic systems together | Memory Vault + Blackout Chamber | `c7_memory_blackout_day`, `c7_blackout_record_full` |
| The player was part of the original blackout project | Forbidden Stacks + Sleeping Server | `c7_forbidden_read_one`, `c7_server_player_file` |
| The player authored their own reset | Blackout Record Chamber (Subject Seven wall) | `c7_blackout_record_one` |
| The wrist mark is a relic interface, not a curse | Mael's first meeting, Memory Vault | `c7_mael_intro`, `c7_memory_mark_origin` |
| The city was sealed to contain something underneath | Forbidden Stacks (deep shelf) + Vorn | `c7_forbidden_city_seal`, `c7_vorn_confession` |
| The Glass Court, Iron Saints, and Archive all hid parts of the truth | Blackout Chamber (north/south/east walls) | `c7_glass_court_complicity`, `c7_iron_saints_complicity`, `c7_city_seal_truth` |
| The final relic gate exists beneath the city — three access points | Relic Map Room | `c7_relic_map_study` |
| Gate Three = Station 9 (where the player has been living) | Relic Map Room | `c7_relic_map_study` |
| Sann (Glass Court doctor / Choir) was in the blackout planning room | Vorn testimony | `c7_vorn_recognition` |
| Cain was Iron Saints tactical intelligence, in the room and at Gate Three | Memory Vault + Blackout Chamber | `c7_memory_cain_record`, `c7_iron_saints_complicity` |
| The synchronisation's saboteur was the Ink Judge's predecessor | Sleeping Server ghost log | `c7_player_role_confirmed` |
| Velna was killed by Iron Saints before the blackout, trying to delay it | Forbidden Stacks | `c7_forbidden_read_two` |
| The synchronisation's probability at full scale is 73% benign | Hollow Lecture Hall | `c7_vorn_lecture_attend` |
| Velna designed the Sleeping Server and the mark using the same architecture | Sleeping Server | `c7_sleeping_server_arrive` |

---

## Endings

### Faction Endings (3)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_survived` | Beyond the Archive | `c7_chapter7_end` | Take gate card, decline formal alliance |
| `ending_ch7_archive_alliance` | Last Archive Alliance Preview | `c7_archive_alliance_end` | Accept Mael's alliance offer with both cards |
| `ending_ch7_relic_map` | Relic Map Ending | `c7_relic_map_end` | Relic Hunter extraction record + gate card |

### Secret Endings (1)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_memory_restored` | Memory Restored Fragment | `c7_memory_restored_end` | Complete Forbidden Stacks + request memory recovery in alliance offer |

### Neutral / Wanderer Endings (2)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_truth_without_mercy` | Truth Without Mercy | `c7_truth_without_mercy_end` | Expose all factions simultaneously from final chamber |
| `ending_ch7_archive_exile` | Archive Exile | `c7_archive_exile_end` | Leave gate card on table in final chamber |

### Betrayal Endings (2)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_false_scholar` | False Scholar | `c7_false_scholar_end` | Indexer reads secondary intention; behavioral deviation from safety protocol |
| `ending_ch7_glass_court_raid` | Glass Court Raid | `c7_glass_court_raid_end` | Send gate confirmation pulse without securing Archive; Glass Court detects via Gate One |

### Death Endings (2)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_buried_stacks` | Buried in the Stacks | `c7_buried_stacks_end` | Fail agility dice on Tribunal bypass through old tunnels |
| `ending_ch7_tribunal_execution` | Ink Tribunal Execution | `c7_tribunal_execution_end` | Fail Tribunal defence → guilty → fail bypass → Article Fifteen invoked |

### Corruption Endings (2)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_server_assimilation` | Sleeping Server Assimilation | `c7_server_assimilation_end` | Accept full Server assimilation at very high corruption |
| `ending_ch7_forbidden_knowledge` | Forbidden Memory | `c7_forbidden_knowledge_end` | Fail luck dice on fifth Stacks container at high corruption |

### Sacrifice Endings (2)
| Ending ID | Title | Node | How to Reach |
|---|---|---|---|
| `ending_ch7_mira_truth_betrayal` | Mira's Departure | `c7_mira_truth_betrayal_end` | Truth delivered without context after Mira reads adjacent records |
| `ending_ch7_cain_military_reckoning` | Cain's Reckoning | `c7_cain_reckoning_end` | Confront Cain with his Iron Saints perimeter record at south wall |

**Total:** 14 unique endingIds across 13 ending nodes (+ 1 shared path `ending_ch7_survived`)

---

## Dice Check Audit

| # | Node | Stat | Difficulty | d-type | Success → | Failure → |
|---|---|---|---|---|---|---|
| 1 | `c7_tribunal_arrive` | intelligence | 14 | d20 | `c7_tribunal_verdict_acquit` | `c7_tribunal_verdict_guilty` |
| 2 | `c7_vorn_confession` | charisma | 12 | d20 | `c7_vorn_player_recognition` | `c7_vorn_blackout_truth` |
| 3 | `c7_forbidden_read_two` | luck | 13 | d20 | `c7_forbidden_truth_full` | `c7_forbidden_corruption_path` |
| 4 | `c7_tribunal_verdict_guilty` (agility bypass) | agility | 13 | d20 | `c7_forbidden_stacks_arrive` | `c7_buried_stacks_end` |
| 5 | `c7_sleeping_server_arrive` | agility | 11 | d20 | `c7_server_player_file` | `c7_server_speaks` |
| 6 | `c7_vorn_confession` (main path before charisma) | intelligence | implicit via charisma | d20 | — | — |

**Confirmed valid DiceStats:** intelligence ×2, charisma ×1, luck ×1, agility ×2

---

## Class-Specific Choices

| # | Class | Node | Choice ID | Effect |
|---|---|---|---|---|
| 1 | `esper` | `c7_blind_indexer_meet` | `c7_indexer_esper_read` | Read Indexer's psychic imprint before contact; intelligence +4, corruption +2 |
| 2 | `esper` | `c7_server_knowledge_exchange` | `c7_exchange_esper_link` | Extended concentration contact; topology map; intelligence +5, corruption +3 |
| 3 | `esper` | `c7_forbidden_stacks_arrive` | `c7_stacks_esper_survey` | Survey stacks topology; reduces corruption cost of sequential reading |
| 4 | `relic_hunter` | `c7_mael_trust_offer` | `c7_trust_relic_read` | Identifies relic-structural integration in Archive panels |
| 5 | `relic_hunter` | `c7_server_knowledge_exchange` | `c7_exchange_relic_extract` | Extracts synchronisation evidence record from Server node |
| 6 | `tactician` | `c7_relic_map_arrive` | `c7_map_tactician_read` | Strategic analysis of gate locations; time pressure assessment |
| 7 | `shadow_broker` | `c7_tribunal_arrive` | `c7_tribunal_shadow_broker` | Uses faction communications to expose Archive-Glass Court correspondence |

**Total:** 7 class-specific choices (exceeds requirement of 6)

---

## Background-Specific Choices

| # | Background | Node | Choice ID | Effect |
|---|---|---|---|---|
| 1 | `forgotten_scholar` | `c7_vera_hostile` | `c7_vera_scholar_approach` | Cites Archive protocol; bypasses Vera's assessment entirely |
| 2 | `forgotten_scholar` | `c7_dust_library_arrive` | `c7_mael_scholar_research` | Accesses Archive classification system; intelligence +3 |
| 3 | `forgotten_scholar` | `c7_lecture_blackout_doc` | `c7_lecture_doc_forgotten_scholar` | Cross-references Vera's mother file; finds secondary annotation |
| 4 | `black_market_courier` | `c7_dust_theft_survey` | `c7_theft_courier_contacts` | Plans extraction route using tunnel market knowledge |
| 5 | `fallen_noble` | `c7_ink_chapel_arrive` | `c7_chapel_noble_approach` | Noble etiquette approach to Tribunal; charisma +2, Archive +5 |
| 6 | `runaway_experiment` | `c7_forbidden_stacks_arrive` | `c7_stacks_experiment_record` | Accesses experiment-number-matched containers first |
| 7 | `runaway_experiment` | `c7_server_player_file` | `c7_file_experiment_access` | Accesses neural architecture component of Server file |
| 8 | `exiled_soldier` | `c7_vorn_lecture_attend` | `c7_lecture_cain_military` | Uses Cain's Iron Saints record in probability model; updates odds to 76% |

**Total:** 8 background-specific choices (exceeds requirement of 6)

---

## Faction Reputation Changes

| Faction | Total Range in Chapter | Key Trigger |
|---|---|---|
| `lastArchive` | -25 to +25 | Trust-building vs. bypass/exposure vs. theft |
| `glassCourt` | -30 to -5 | Blackout complicity knowledge, Glass Court raid outcome |
| `ironSaints` | -20 to -5 | Blackout perimeter record access, Cain confrontation |
| `redChoir` | +5 (entry if choir_alliance_confirmed) | No negative triggers in this chapter |
| `hollowChildren` | No changes in Ch7 | Mentioned in roadmap; no Ch7 nodes |

---

## New Flags Introduced (Selected Key Flags for Ch8)

### Priority 1 — Gate and Synchronisation State
- `gate_card_taken` — player has the gate card; synchronisation approach begins
- `archive_alliance_complete` — Last Archive alliance formalised
- `gate_approach_documented` — extraction record included in approach
- `memory_restored` / `pre_blackout_name_recovered` — full memory recovery route
- `synchronisation_demonstrated` — player has directly experienced benign synchronisation

### Priority 2 — Factional Knowledge State
- `saboteur_identified` — Ink Judge's predecessor known as blackout saboteur
- `glass_court_gate_one_known` — player knows Glass Court headquarters is Gate One
- `iron_saints_gate_two_known` (implied by `gate_two_known`) — Iron Saints Founding Post is Gate Two
- `glass_court_blackout_role_full` — full factional complicity record
- `iron_saints_blackout_role_full` — full perimeter protocol record

### Priority 3 — Companion State
- `mira_vault_told` — Mira knows the blackout room truth; processing
- `mira_departed_archive` — Mira has left; cure research suspended
- `cain_reckoning_complete` / `cain_stays_behind` — Cain has read his record and stayed
- `cain_confrontation_archive` — Cain confronted with Iron Saints assignment
- `vera_alliance_formed` — Vera working with the player on Gate One documentation

### Priority 4 — Player Identity State
- `subject_seven_memorandum_found` — player knows they authored their own reset
- `player_blackout_architect_suggested` — Vorn's full assessment delivered
- `player_blackout_agency_accepted` — player accepted the architect framing
- `pre_blackout_name_recovered` — player has their pre-blackout name (secret route)
- `blackout_reckoning_complete` — player has read the pre-blackout self's memorandum

### Priority 5 — Chapter Completion State
- `chapter7_complete` — chapter exit confirmed
- `gate_card_refused` / `archive_exile` — gate approach not begun
- `factions_exposed_uncontrolled` — truth broadcast without Archive control
- `truth_released` — public uncontrolled exposure has occurred

---

## Connection Points for Chapter 8: Hunger War

### Flags Chapter 8 Must Check

| Flag | Chapter 8 Effect |
|---|---|
| `gate_card_taken` | Player is actively approaching Gate Three; Ch8 is simultaneous with the approach |
| `archive_alliance_complete` | Last Archive provides supply route intelligence during the Hunger War |
| `glass_court_blackout_role_full` | Glass Court is on the defensive; their supply control is politically weakened |
| `mira_departed_archive` | Mira's cure research is separated from the player's supply crisis |
| `cain_stays_behind` | Cain is absent from Ch8's initial sequences; rejoins only after his reckoning resolves |
| `vera_alliance_formed` | Vera's Gate One documentation helps locate the agricultural system Vorn mentioned |
| `synchronisation_demonstrated` | Player has direct evidence the synchronisation is benign; useful in Ch8 faction negotiations |
| `saboteur_identified` | The Ink Judge's predecessor connection can be leveraged in Ch8 Iron Saints negotiations |
| `chapter7_complete` | Standard Ch8 entry; supply crisis three months after Ch7 |
| `factions_exposed_uncontrolled` | Factions are in political crisis; supply chain disorder is accelerated |

### Recommended Chapter 8 Entry Nodes

| Condition | Recommended Entry |
|---|---|
| Standard (gate_card_taken) | `chapter8_start` — approaching Gate Three while supply crisis begins |
| `archive_alliance_complete` | `chapter8_archive_supply_intel` — Archive provides supply route knowledge |
| `mira_departed_archive` | `chapter8_without_mira` — medical resources harder to access |
| `cain_stays_behind` | `chapter8_solo_tactical` — no tactical companion for Iron Saints section |
| `factions_exposed_uncontrolled` | `chapter8_political_chaos_accelerated` — all factions in emergency mode |
| `gate_card_refused` (exile) | `chapter8_gate_refused_route` — player is not approaching gate; different stakes |

### Narrative Threads to Continue from Chapter 7

1. **The Synchronisation Choice** — Chapter 8 takes place simultaneously with or immediately after the gate approach. The Hunger War is the city's crisis happening while the player is trying to reach Gate Three. The crisis may force the player to choose between the gate and addressing the supply collapse.

2. **Vorn's 27% Risk** — The Hunger War's suffering is the backdrop against which the 27% synchronisation risk must be weighed. People are already dying without the synchronisation. The risk calculus changes.

3. **The Ink Judge's Predecessor** — The Iron Saints may have records of this person. The saboteur's identity is now known to the player; whether it becomes public knowledge in Ch8 affects Iron Saints negotiations.

4. **Vera's Gate One Documentation** — The Glass Court headquarters is Gate One. The Hunger War may involve the Glass Court's supply infrastructure. Vera's documentation is relevant to any approach to Glass Court-held territory.

5. **The Red Choir and the Hunger Suppression** — The Choir is offering something that suppresses hunger (mentioned in Ch8 summary). The Choir's connection to the Archive's relic system (established in Ch6-7) makes this suppression mechanism directly connected to the synchronisation question.

6. **Cain's Absence / Reintegration** — If `cain_stays_behind`, Chapter 8 needs a mechanism for Cain's return. The Hunger War's Iron Saints section is likely the natural context — Cain's former division is directly involved in supply requisitioning. His reckoning in Ch7 may make him an unexpected ally against his former commanding structure.

7. **Mira's Separated Research** — If `mira_departed_archive`, Mira is continuing cure research independently. The Hollow Children's starvation crisis in the Hunger War may bring her and the player into proximity without the archive context — a different, potentially cleaner, reunion.

8. **The Three Gates and the Supply Crisis** — The pre-collapse agricultural system beneath the city (the solution to the Hunger War's food crisis) is described in the Ch8 summary as something the Archive knows how to restart. This system is likely connected to the relic concentration at Gate Three's sublevel. The Hunger War and the gate approach may be the same solution to two different problems.

---

## Node Distribution by Location

| Location | Nodes | Range |
|---|---|---|
| Entry / Approach | 2 | `chapter7_start`, `c7_approach_archive` |
| Door Without a Name | 4 | `c7_door_arrive` → `c7_door_mael_summon` |
| Dust Library | 7 | `c7_dust_library_arrive` → `c7_dust_relic_read` |
| Memory Vault | 9 | `c7_memory_vault_arrive` → `c7_memory_vault_exit` |
| Ink Chapel | 6 | `c7_ink_chapel_arrive` → `c7_ink_appeal` |
| Broken Observatory | 6 | `c7_observatory_arrive` → `c7_vorn_decision` |
| Relic Map Room | 7 | `c7_relic_map_arrive` → `c7_relic_map_destination` |
| Forbidden Stacks | 8 | `c7_forbidden_stacks_arrive` → `c7_forbidden_stacks_exit` |
| Archive Tribunal | 8 | `c7_tribunal_arrive` → `c7_tribunal_escape` |
| Hollow Lecture Hall | 6 | `c7_lecture_hall_arrive` → `c7_lecture_hall_exit` |
| Blackout Record Chamber | 9 | `c7_blackout_chamber_arrive` → `c7_blackout_reckoning` |
| Sleeping Server | 8 | `c7_sleeping_server_arrive` → `c7_server_decision` |
| Chapter Conclusion | 3 | `c7_vera_alliance_moment`, `c7_archive_final_choice`, `c7_alliance_offer` |
| Chapter Exit | 1 | `c7_chapter7_end` |
| Ending Nodes | 13 | All `c7_*_end` nodes |
| **Total** | **109** | |

---

## Asset Status

| ImageKey | Placeholder PNG | Gradient | Dedicated Art |
|---|---|---|---|
| `door_without_name` | `archive_ruin_wall.png` | ✅ deep indigo | Needed |
| `dust_library` | `archive_ruin_wall.png` | ✅ muted amber | Needed |
| `memory_vault` | `relic_engine_room.png` | ✅ cool blue | Needed |
| `ink_chapel` | `archive_ruin_wall.png` | ✅ dark slate | Needed |
| `broken_observatory` | `surface_dawn.png` | ✅ blue-grey | Needed |
| `relic_map_room` | `relic_engine_room.png` | ✅ muted green | Needed |
| `forbidden_stacks` | `archive_ruin_wall.png` | ✅ deep purple | Needed |
| `archive_tribunal` | `glass_tower_lobby.png` | ✅ dark red-brown | Needed |
| `hollow_lecture_hall` | `glass_tower_lobby.png` | ✅ warm dark | Needed |
| `blackout_record_chamber` | `archive_ruin_wall.png` | ✅ near-black | Needed |
| `sleeping_server` | `relic_engine_room.png` | ✅ cold blue-black | Needed |

All 11 imageKeys have `require()` entries and `BACKGROUND_GRADIENTS` entries. Dedicated pixel art to be commissioned.
