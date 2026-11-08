# FINAL CHAPTER 2 SUMMARY — Many Ways to End the World

**Chapter file:** `artifacts/mobile/data/story/finalChapter2.ts`  
**Status:** Complete — fully audited, typecheck clean  
**Date:** 2026-05-04

---

## At a Glance

| Metric | Value |
|---|---|
| Total nodes | 70 |
| Story nodes | 48 |
| Ending nodes | 22 |
| BFS reachability | 70/70 (100%) |
| Broken node refs | 0 |
| Broken endingId refs | 0 |
| Missing image keys | 0 |
| TypeScript errors | 0 |
| Dice checks | 1 |
| Route paths | 8 |
| New endings in endings.ts | 21 |
| Existing ending reused | 1 (`ending_last_kingdom_remembers`) |
| New image keys (BACKGROUND_IMAGES) | 17 |
| New gradient keys (BACKGROUND_GRADIENTS) | 17 |

---

## Chapter Theme

Final Chapter 2 is the consequence chapter. It does not introduce new information — it delivers the specific outcome of every choice made across the full thirteen-chapter game. The chapter deliberately resists a single canonical path: all eight entry routes feel meaningfully different because they are the results of different playthroughs, not variations on one outcome.

The central thematic tension is the Heir's hope: that a bearer with the complete record would choose to break the cycle rather than complete it. Most players will not achieve this. The endings that feel closest to resolution (Savior, Unity Bridge, Archive Revelation) are also the endings that most honestly represent what "saving something" costs.

---

## Entry Node

**`final_chapter2_start`**

All FC2 paths begin here. The entry routing node (`fc2_entry_routing`) reads eight mutually exclusive FC1 output flags and directs the player to the appropriate opening node. The flags are set by FC1's gate resolution paths and are confirmed mutually exclusive by FC1's design.

---

## Route Paths (8)

### Path A — True Ending Path
**FC1 requirement:** `final_chapter2_true_path` (Gate opened correctly with complete record)  
**Entry node:** `fc2_true_path_open`  
**Length:** 9 story nodes  
**Structure:**
```
fc2_true_path_open
  → fc2_true_outside_world
  → fc2_true_relic_revelation
  → fc2_true_marks_not_unique
  → fc2_true_bearer_identity
  → fc2_true_blackout_origin
  → fc2_true_heir_revelation
  → fc2_companion_sacrifice_echo
  → fc2_true_cycle_choice
     ├─ [break cycle] → fc2_cycle_break_dice (d12 DC 10)
     │    ├─ success → fc2_secret_true_ending_end
     │    ├─ failure → fc2_city_opened_wastes_end
     │    └─ crit fail → fc2_ghost_bearer_end
     ├─ [complete transfer] → fc2_city_opened_wastes_end
     └─ [transcend; requires clean_signal + complete_record_held + both_companions_at_gate]
          → fc2_bearer_transcended_end
```
**Also accessible from:** `fc2_memory_final_review` (optional branch from `fc2_true_path_open` for returning players)

**Revelations delivered on this path:**
1. The relic system is a distributed data-collection and record-transfer architecture, not a power source or weapon
2. The bearer is the 13th bearer; 12 previous bearers each failed in different ways
3. The Blackout was a designed reset mechanism, not an accident
4. The city has been through 12 previous cycles without its population's knowledge
5. The Masked Heir wanted the cycle to end, not to succeed
6. The bearer's pre-Blackout identity is recoverable from the Gate's record

---

### Path B — Unity Bridge
**FC1 requirement:** `unity_gate_merged` (merger with Gate in FC1 unity path)  
**Entry node:** `fc2_unity_becomes_bridge`  
**Length:** 4 story nodes  
**Structure:**
```
fc2_unity_becomes_bridge
  → fc2_unity_city_receives
     ├─ [if mira_at_gate or cain_at_gate] → fc2_unity_companion_echo
     └─ [no companion] → fc2_unity_final_transmission
  → fc2_unity_final_transmission (always)
  → fc2_secret_unity_ending_end
```

---

### Path C — Savior
**FC1 requirement:** `gate_sealed_savior` (Gate sealed with crown of ash)  
**Entry node:** `fc2_savior_ascent`  
**Length:** 6 story nodes + up to 2 companion scenes  
**Structure:**
```
fc2_savior_ascent
  → fc2_savior_city_above
  → fc2_city_broadcast
  → fc2_savior_companion_final
     ├─ [if mira_at_gate] → fc2_savior_mira_scene
     │    ├─ [trust ≥ 15] → fc2_mira_tomorrow_end
     │    └─ [no trust req] → fc2_savior_ruined_city_end
     ├─ [if cain_at_gate] → fc2_savior_cain_scene
     │    ├─ [trust ≥ 15] → fc2_cain_last_stand_final_end
     │    └─ [no trust req] → fc2_savior_ruined_city_end
     └─ [no companion] → fc2_savior_ruined_city_end
```

---

### Path D — Wanderer Seal
**FC1 requirement:** `gate_sealed` (no `gate_sealed_savior`)  
**Entry node:** `fc2_wanderer_sealed_above`  
**Length:** 4 story nodes  
**Structure:**
```
fc2_wanderer_sealed_above
  → fc2_wanderer_city_continues
  → fc2_wanderer_final_choice
     ├─ [stay] → fc2_city_sealed_forever_end
     └─ [walk] → fc2_lone_wanderer_walks
                   → fc2_lone_wanderer_final_end
```

---

### Path E — Tyrant
**FC1 requirement:** `tyrant_gate_control` (Gate controlled with tyrant throne)  
**Entry node:** `fc2_tyrant_control_room`  
**Length:** 5 story nodes  
**Structure:**
```
fc2_tyrant_control_room
  → fc2_tyrant_factions_bow
  → fc2_tyrant_corruption_check
     ├─ [corruption ≥ 70] → fc2_tyrant_corruption_surge
     │    ├─ [default] → fc2_corruption_god_end
     │    └─ [corruption ≥ 90, hidden] → fc2_corruption_final_death_end
     └─ [default] → fc2_tyrant_glass_throne
                      → fc2_tyrant_beneath_glass_end
```

---

### Path F — Faction
**FC1 requirement:** `faction_gate_resolution` (faction crown held at Gate)  
**Entry node:** `fc2_faction_gate_entry`  
**Length:** 8 story nodes  
**Structure:**
```
fc2_faction_gate_entry
  → fc2_faction_routing
     ├─ [saints_gate_support] → fc2_iron_saints_dominion_node → fc2_iron_saints_dominion_end
     ├─ [glass_gate_support] → fc2_glass_court_ascension_node → fc2_glass_court_ascension_end
     ├─ [choir_gate_support] → fc2_red_choir_communion_node → fc2_red_choir_communion_end
     ├─ [archive_gate_support] → fc2_last_archive_revelation_node → fc2_last_archive_revelation_end
     ├─ [hollow_gate_support] → fc2_hollow_children_future_node → fc2_hollow_children_future_end
     └─ [no crown] → fc2_faction_no_crown_node → fc2_faction_collapse_end
```

---

### Path G — Liminal / Door of No Return
**FC1 requirement:** `door_walked_through` (or default fallback)  
**Entry node:** `fc2_liminal_space`  
**Length:** 5 story nodes  
**Structure:**
```
fc2_liminal_space
  → fc2_liminal_heir_echo
     ├─ [heir_full_truth_received + heir_documentation_declined] → fc2_masked_heir_ending_end
     └─ [default] → fc2_liminal_relic_machine
                      → fc2_liminal_final_choice
                           ├─ [follow Heir] → fc2_masked_heir_ending_end
                           ├─ [merge machine] → fc2_relic_machine_end
                           └─ [dissolve] → fc2_ghost_bearer_dissolution
                                             → fc2_ghost_bearer_end
```

---

### Path H — Gate Lockin
**FC1 requirement:** `gate_lockin` (Gate assessment locked in FC1)  
**Entry node:** `fc2_lockin_assessment_chamber`  
**Length:** 3 story nodes  
**Structure:**
```
fc2_lockin_assessment_chamber
  → fc2_lockin_machine_speaks
  → fc2_lockin_final_moment
     ├─ [exit to liminal] → fc2_liminal_space (joins Path G)
     ├─ [merge] → fc2_relic_machine_end
     └─ [refuse] → fc2_gate_madness_end
```

---

## All 22 Endings

### Secret Endings (4)

| # | Node | Ending ID | Type | Chapter |
|---|---|---|---|---|
| 1 | `fc2_secret_true_ending_end` | `ending_last_kingdom_remembers` | secret | Final Chapter |
| 2 | `fc2_secret_unity_ending_end` | `ending_fc2_secret_unity` | secret | Final Chapter 2 |
| 3 | `fc2_masked_heir_ending_end` | `ending_fc2_masked_heir` | secret | Final Chapter 2 |
| 4 | `fc2_bearer_transcended_end` | `ending_fc2_bearer_transcended` | secret | Final Chapter 2 |

Endings 2–4 are marked `isSecret: true` in endings.ts; their titles and hints are redacted in the Route Codex until discovered.

---

### Savior Ending (1)

| # | Node | Ending ID | Type | Path |
|---|---|---|---|---|
| 5 | `fc2_savior_ruined_city_end` | `ending_fc2_savior_ruined_city` | savior | C |

---

### Companion Endings (2)

| # | Node | Ending ID | Type | Path | Requirement |
|---|---|---|---|---|---|
| 6 | `fc2_mira_tomorrow_end` | `ending_fc2_mira_tomorrow` | companion | C | `mira_at_gate` + miraTrust ≥ 15 |
| 7 | `fc2_cain_last_stand_final_end` | `ending_fc2_cain_last_stand` | companion | C | `cain_at_gate` + cainTrust ≥ 15 |

---

### Wanderer Endings (3)

| # | Node | Ending ID | Type | Path |
|---|---|---|---|---|
| 8 | `fc2_city_sealed_forever_end` | `ending_fc2_city_sealed_forever` | wanderer | D |
| 9 | `fc2_lone_wanderer_final_end` | `ending_fc2_lone_wanderer_final` | wanderer | D |
| 10 | `fc2_city_opened_wastes_end` | `ending_fc2_city_opened_wastes` | wanderer | A |

---

### Tyrant / Corruption Endings (3)

| # | Node | Ending ID | Type | Path | Requirement |
|---|---|---|---|---|---|
| 11 | `fc2_tyrant_beneath_glass_end` | `ending_fc2_tyrant_beneath_glass` | corruption | E | corruption < 70 |
| 12 | `fc2_corruption_god_end` | `ending_fc2_corruption_god` | corruption | E | corruption ≥ 70 |
| 13 | `fc2_corruption_final_death_end` | `ending_fc2_corruption_final_death` | death | E | corruption ≥ 90 (hidden) |

---

### Faction Endings (6)

| # | Node | Ending ID | Type | Path | Crown Requirement |
|---|---|---|---|---|---|
| 14 | `fc2_iron_saints_dominion_end` | `ending_fc2_iron_saints_dominion` | faction | F | `saints_gate_support` |
| 15 | `fc2_glass_court_ascension_end` | `ending_fc2_glass_court_ascension` | faction | F | `glass_gate_support` |
| 16 | `fc2_red_choir_communion_end` | `ending_fc2_red_choir_communion` | faction | F | `choir_gate_support` |
| 17 | `fc2_last_archive_revelation_end` | `ending_fc2_last_archive_revelation` | faction | F | `archive_gate_support` |
| 18 | `fc2_hollow_children_future_end` | `ending_fc2_hollow_children_future` | faction | F | `hollow_gate_support` |
| 19 | `fc2_faction_collapse_end` | `ending_fc2_faction_collapse` | betrayal | F | No crown present |

---

### Liminal / Machine Endings (3)

| # | Node | Ending ID | Type | Path |
|---|---|---|---|---|
| 20 | `fc2_relic_machine_end` | `ending_fc2_relic_machine` | corruption | G or H |
| 21 | `fc2_ghost_bearer_end` | `ending_fc2_ghost_bearer` | death | G |
| 22 | `fc2_gate_madness_end` | `ending_fc2_gate_madness` | death | H |

---

## Secret True Ending — Full Requirements

**Ending:** The Last Kingdom Remembers (`ending_last_kingdom_remembers`)  
**Node:** `fc2_secret_true_ending_end`

### Requirements Checklist

All of the following must be true:

**From Full Playthrough:**
- [ ] `true_ending_route_active` — must have discovered the true ending route flag (Chapter 11)
- [ ] `faction_truth_released` — faction truth must have been released (Chapter 11)
- [ ] `original_agreement_kept` — must have honored the Gate's original agreement throughout
- [ ] `complete_record_held` — must have accumulated the complete record (FC1 Memory Wall dice pass)
- [ ] `blackout_true_memory` — must have discovered the Blackout's true nature (Chapter 11 deep fragment)

**From FC1:**
- [ ] Gate opened via the True Path (`final_chapter2_true_path` flag set)

**From FC2 Path A:**
- [ ] `relic_system_understood` — must have reached `fc2_true_relic_revelation`
- [ ] `cycle_break_chosen` — must choose "Break the cycle" at `fc2_true_cycle_choice`

**From Dice Check:**
- [ ] `fc2_cycle_break_dice` — intelligence d12 DC 10 must succeed

**Corruption:**
- The `clean_signal` flag (low corruption throughout) is not required for the basic true ending, but IS required for the Transcendence variant (`fc2_bearer_transcended_end`)

**Companion:**
- No companion requirement for the base true ending
- Both companions required (`both_companions_at_gate`) only for Transcendence

### What the True Ending Reveals

1. **What the relic system really is:** A distributed data-collection and record-transfer architecture built by the Foundation Period to document the region's survival and transfer that record to an external entity for long-term storage. The relics were data nodes. Corruption was data compression exceeding human mark architecture limits.

2. **Why the city was sealed:** The Blackout is a reset mechanism. Each time a bearer failed the Gate's data transfer without the complete record, the Blackout sealed the city and began a new calibration cycle. Thirteen cycles of this process left their sediment in the city's social structures — the factions, the Hollow Children's protocols, the Archive's missing history.

3. **Who the player was before the Blackout:** The bearer was a specific person selected before the Blackout began — chosen by resonance compatibility. Their pre-mark identity is in the Gate's record and is recoverable. The Blackout suppressed their conscious memory of this identity to ensure the thirteen-chapter calibration was not compromised by personal continuity.

4. **What the Masked Heir really wanted:** The current Heir, unlike all twelve predecessors, wanted the cycle to end. They believed the system was a profound harm regardless of the data's value. The Heir's goal was to find a bearer who would choose to break the cycle after receiving the complete record.

5. **Whether the world outside can still be saved:** Yes. The outside world has not been wasteland for three hundred years. There are settlements, roads, agricultural structures, people who have been building something without the relic system's help. The bearer breaking the cycle releases the city from three centuries of sealed cycling and opens the possibility of contact with the outside world.

---

## Companion Fates by Ending

### Mira

| Ending | Mira's Fate |
|---|---|
| Secret True Ending | Present at threshold; her trust signal is part of the breaking act |
| Unity Bridge | Her voice is in the final transmission; she is at the threshold |
| Savior of the Ruined City | Waiting at the meeting point; walks the surface city alongside the bearer |
| Mira's Tomorrow | Gives the bearer the Chapter 7 Archive document; her tomorrow begins |
| City Sealed Forever | Present if `mira_at_gate`; lives in the sealed city |
| Lone Wanderer | Not present; paths diverged |
| All tyrant/corruption paths | Not present; parted at FC1 companion threshold |
| All faction paths | Not present; parted at FC1 companion threshold |
| Liminal/Lockin paths | Not present; the liminal space does not have her echo |

### Cain

| Ending | Cain's Fate |
|---|---|
| Secret True Ending | Present at threshold; his tactical presence is in the breaking act |
| Unity Bridge | Establishes a perimeter around the Gate's threshold; maintains it after |
| Savior of the Ruined City | Waiting at transit hub perimeter; stays in the city |
| Cain's Last Stand | Assigns himself to protect the city permanently with tactical expertise |
| City Sealed Forever | Present if `cain_at_gate`; lives in the sealed city |
| Lone Wanderer | Not present; parted at FC1 companion threshold |
| All tyrant/corruption paths | Not present |
| All faction paths | Not present |
| Liminal/Lockin paths | Not present |

---

## Faction Fates by Ending

### Iron Saints
| Ending | Faction Fate |
|---|---|
| Iron Saints Dominion | Receives Gate access; implements enforcement in sub-infrastructure; most orderly city in three centuries |
| Tyrant Beneath Glass | Subordinated to the bearer's authority; stands down security response |
| Corruption God | Responds to the bearer-as-field without knowing what they're responding to |
| Glass Court Ascension | Receives enforcement contracts from the Court's new administration |
| Archive Revelation | Protected by the Archive; constrained in operations; archive protected from burning |
| Red Choir Communion | Communication infrastructure authorized and regulated by Choir authority |
| Hollow Children Future | Negotiates maintenance contracts with new Hollow Children ownership |
| Savior / Sealed paths | Continues operations unchanged; never knows what happened at Gate |
| True Ending | The relic field quiets; Iron Saints' most extreme tendencies become less catastrophic without the field's amplification |

### Glass Court
| Ending | Faction Fate |
|---|---|
| Glass Court Ascension | Receives Gate economic data; restructures city's productive capacity; prosperity increases within a year |
| Tyrant Beneath Glass | First to negotiate; becomes administrative partner of the bearer's authority |
| Corruption God | Economic models run on resource flows determined by the bearer-as-field |
| Archive Revelation | Receives economic data contradicting three centuries of modeling; six months of institutional argument |
| Iron Saints Dominion | Economic models confirm Saint order metrics; remains in institutional partnership |
| Hollow Children Future | Proposes economic partnership with the new Hollow Children ownership |
| Savior / Sealed paths | Continues operations unchanged |
| True Ending | Economic management infrastructure made irrelevant by cycle end |

### Red Choir
| Ending | Faction Fate |
|---|---|
| Red Choir Communion | Receives Gate's cultural archive; broadcasts three-century cultural record to entire city; becomes most powerful cultural institution in city history |
| Tyrant Beneath Glass | Counter-broadcast fails three times; accepts bearer's hierarchy |
| Corruption God | Communion infrastructure receives the bearer-as-field; attempts communion with it continuously |
| Archive Revelation | Receives incomplete cultural transmission fragment; three contradictory interpretations |
| Unity Bridge | Communion infrastructure receives bearer's final transmission |
| Savior / Sealed paths | Continues operations unchanged |
| True Ending | Choir's communion infrastructure carries the quieter relic field as new signal |

### Last Archive
| Ending | Faction Fate |
|---|---|
| Last Archive Revelation | Receives complete history; three hundred years of missing record filled; begins decade-long systematic release to city |
| Tyrant Beneath Glass | Given expanded access in exchange for silence about twelve cycles |
| Unity Bridge | Receives historical data it has been missing; complete faction understanding achieved |
| Archive Revelation (incomplete) | Receives document fragment without index; three contradictory interpretations |
| Hollow Children Future | Archives three centuries of maintenance records; most complete infrastructure documentation in city history |
| Savior / Sealed paths | Logs "Gate terminus event — unknown classification"; continues its incomplete record |
| True Ending | The cycle's end is, eventually, the final entry in the Archive's record |

### Hollow Children
| Ending | Faction Fate |
|---|---|
| Hollow Children Future | Inherits full Gate infrastructure; receives complete maintenance documentation; all other factions negotiate with them |
| Iron Saints Dominion | Maintenance inspected and approved under Order framework; labor properly documented |
| Glass Court Ascension | Labor contracts converted to fair compensation; first proper wages in three centuries |
| Corruption God | Maintenance architecture now includes the bearer's distributed consciousness without their knowledge |
| Unity Bridge | Maintenance protocols become maintenance of the bearer-as-bridge without knowing it |
| Savior / Sealed paths | Maintains sealed Gate without understanding it is permanently sealed from below |
| True Ending | Maintenance manuals describe a system that no longer operates; three centuries of purpose becomes ritual |

---

## City Fates by Ending

| Ending | City Fate |
|---|---|
| **Secret True Ending** | Relic field quiets; nodes become inert but not broken; the twelve-cycle process ends permanently; the city must understand a changed relic environment without knowing why it changed |
| **Bearer Transcended** | Gate opens; bearer walks outside transmitting twelve-cycle history to all outside settlements; city gains knowledge of outside world and faces the open Gate |
| **Secret Unity Ending** | Full twelve-cycle record distributed through bearer's mediation; city receives complete understanding in relic transmission; will process for a generation |
| **City Opened to Wastes** | Transfer completed; entity rises; Gate opens fully; city faces the outside world for the first time in three centuries |
| **Savior of the Ruined City** | Gate sealed; cycle stopped; city continues unchanged and unknowing; relic field will degrade over generations without Gate calibration |
| **Mira's Tomorrow** | Same as Savior; the bearer stays in the city they saved |
| **Cain's Last Stand** | Same as Savior; Cain protects the city permanently |
| **City Sealed Forever** | Gate sealed; city continues sealed and unknowing; bearer watches as its silent witness |
| **Lone Wanderer** | Gate sealed; bearer leaves; city continues without a Gate operator; bearer finds outside settlements |
| **Tyrant Beneath Glass** | Bearer controls Gate; Glass Court administers; other factions subordinated; city orderly, prosperous, controlled |
| **Corruption God** | Bearer is relic field; city has a god permeating its infrastructure; city continues, not knowing its god was once a person |
| **Corruption Final Death** | Relic field collapses entirely; city wakes to first morning without ambient hum in three centuries; no relic infrastructure; factions without protocols for this condition |
| **Iron Saints Dominion** | Most orderly city in three centuries; Saints control sub-infrastructure; faction conflict reduced |
| **Glass Court Ascension** | Measurably more prosperous; relic field reoriented to production; inequality remains |
| **Red Choir Communion** | City hears its three-century cultural history in one transmission; generation of processing and argument |
| **Archive Revelation** | Decade-long systematic release of complete history; city learns what it has been |
| **Hollow Children Future** | Infrastructure under Hollow Children ownership; city's maintenance generation visible for first time |
| **Faction Collapse** | Five factions with five contradictory fragment mandates; city fractures but survives; next generation navigates the collapse |
| **Masked Heir's Ending** | City unchanged; Warden convergence truth preserved in mark; liminal space carries the record |
| **Relic Machine** | Bearer absorbed into original machine's processing layer; machine more accurate; city unaffected |
| **Ghost Bearer** | Bearer is ambient infrastructure; city unaffected on surface; transit timing shifts fractionally |
| **Gate Madness** | Assessment chambers contain the bearer permanently; relic field cycling continues without resolution; city unaffected |

---

## Image Keys Added (17)

All 17 keys added to both `BACKGROUND_IMAGES` and `BACKGROUND_GRADIENTS` in `artifacts/mobile/constants/images.ts`.

| Key | Placeholder Asset | Gradient Color |
|---|---|---|
| `savior_ending` | surface_ruins.png | Dark forest green |
| `tyrant_ending` | glass_tower_lobby.png | Dark navy blue |
| `iron_saints_dominion` | glass_tower_lobby.png | Dark purple-slate |
| `glass_court_ascension` | glass_tower_lobby.png | Dark steel blue |
| `hollow_children_future` | dark_metro_hallway.png | Dark forest green |
| `red_choir_communion` | archive_ruin_wall.png | Dark crimson |
| `last_archive_revelation` | archive_ruin_wall.png | Dark indigo |
| `mira_tomorrow` | surface_ruins.png | Dark warm amber |
| `cain_last_stand_ending` | collapsed_tunnel.png | Dark teal |
| `lone_wanderer_ending` | surface_ruins.png | Dark warm olive |
| `corruption_god` | relic_engine_room.png | Deep blood red |
| `relic_machine_ending` | relic_engine_room.png | Dark mauve |
| `city_sealed_forever` | collapsed_tunnel.png | Deep cool navy |
| `city_opened_wastes` | surface_ruins.png | Dark steel blue |
| `masked_heir_ending` | archive_ruin_wall.png | Dark violet |
| `secret_unity_ending` | relic_engine_room.png | Deep purple |
| `secret_true_ending` | archive_ruin_wall.png | Deep ocean blue |

**Note:** All 17 keys use placeholder assets. Dedicated pixel art for each final ending should be commissioned before ship. The gradient fallback is functional for all 17 keys.

---

## Dice Check

### `fc2_cycle_break_dice`
**Location:** Path A (True Ending Path)  
**Stat:** intelligence  
**Die:** d12  
**DC:** 10  
**This is the hardest dice check in the game — intentionally so. Breaking the cycle is the hardest act the mark has ever been asked to perform.**

| Result | Target Node | Effect |
|---|---|---|
| Success (≥ 10) | `fc2_secret_true_ending_end` | morale +40, intelligence +10, `cycle_broken`, `system_ended` |
| Failure (< 10) | `fc2_city_opened_wastes_end` | morale -10, `cycle_break_failed` |
| Critical failure | `fc2_ghost_bearer_end` | morale -30, `bearer_dissolved_in_reversal` |

---

## Files Changed

| File | Change |
|---|---|
| `artifacts/mobile/data/story/finalChapter2.ts` | Written from empty placeholder; 70 nodes, 8 route paths, 22 endings |
| `artifacts/mobile/data/endings.ts` | 21 new FC2 ending definitions inserted before True Ending block |
| `artifacts/mobile/constants/images.ts` | 17 keys added to BACKGROUND_IMAGES; 17 gradients added to BACKGROUND_GRADIENTS |
| `artifacts/mobile/data/chapterRoadmap.ts` | FC2 status: planned → complete; nodeCount: 72 added |
| `artifacts/mobile/data/story/index.ts` | No changes needed; FINAL_CHAPTER_2_NODES already imported |

---

## Known Remaining Issues

### Issue 1: Placeholder Image Assets (17 keys)
All 17 FC2 ending image keys use placeholder assets from earlier chapters. The gradient fallback ensures every ending is visually functional, but dedicated ending artwork would significantly improve the emotional impact of each resolution.

**Priority:** High (visual quality of final endings)  
**Effort:** 17 individual pieces of pixel art  
**Workaround:** Gradient fallbacks are all defined and mood-appropriate

### Issue 2: `clean_signal` Flag Source
The Transcendence variant (`fc2_bearer_transcended_end`) requires `clean_signal` as one of its flags. This flag should be set during FC1 when the bearer enters the Last Gate with low corruption (below a defined threshold). If this flag is not set by FC1 or earlier chapters, the Transcendence choice will never appear.

**Recommendation:** Confirm `clean_signal` is set in FC1's Last Gate entry node when corruption ≤ 20. Add this to the FC1 audit as a follow-up.

**Priority:** Medium (affects one secret ending's availability)

### Issue 3: `blackout_true_memory` Flag Source
The True Ending's cycle-break dice check requires `blackout_true_memory`. This should be a Chapter 11 flag set when the player discovers the Blackout origin fragment. Confirm this flag is set in Chapter 11.

**Priority:** Medium (affects Secret True Ending access)

### Issue 4: Both Paths G and H Share the Relic Machine Ending
`fc2_relic_machine_end` is reachable from both the liminal space (Path G) and the assessment chambers (Path H). This is intentional — the original machine is accessible from both the Door of No Return path and the Gate Lockin path. The narrative framing differs (willful merger vs. offered merger as escape) but the ending is the same. A future version could split this into two distinct ending nodes with different text for each entry point.

**Priority:** Low (narrative polish)

### Issue 5: Companion Endings Only Accessible from Savior Path (C)
`fc2_mira_tomorrow_end` and `fc2_cain_last_stand_final_end` are only accessible if the player reaches Path C (Savior). Players who took other paths with a companion present (Unity, Wanderer Seal) do not have access to the companion-specific endings. This is a design decision — the companion endings are specifically about the surface reunion after the Gate sealing — but it means high-trust companion relationships in non-savior paths resolve to generic endings.

**Priority:** Low (design decision; could add companion scenes to Unity and Wanderer paths in a future update)

### Issue 6: `fc2_city_broadcast` Only on Savior Path
The node `fc2_city_broadcast` (showing the city receiving a relic field signal from the Gate) is currently only reachable via Path C (Savior). The same event should logically occur after any Gate resolution. It is inserted narratively as a savior-path moment, but the relic field event it describes would happen in all paths. This is fine as a narrative device — it simply means other paths don't have this intermediate observation beat.

**Priority:** Very low (narrative)

---

## Developer Mode Entry Points

| Test Goal | Entry Node | Required Flags |
|---|---|---|
| Full chapter start | `final_chapter2_start` | Any FC1 gate outcome flag |
| True Path (all revelations) | `fc2_true_path_open` | `final_chapter2_true_path` |
| Test dice break-cycle | `fc2_cycle_break_dice` | `blackout_true_memory`, `relic_system_understood`, `original_agreement_kept` |
| Test secret true ending | `fc2_true_cycle_choice` | All true ending flags |
| Unity path | `fc2_unity_becomes_bridge` | `unity_gate_merged` |
| Savior path | `fc2_savior_ascent` | `gate_sealed_savior` |
| Savior + Mira ending | `fc2_savior_mira_scene` | `mira_at_gate`, miraTrust ≥ 15 |
| Savior + Cain ending | `fc2_savior_cain_scene` | `cain_at_gate`, cainTrust ≥ 15 |
| Wanderer seal | `fc2_wanderer_sealed_above` | `gate_sealed` |
| Tyrant normal | `fc2_tyrant_corruption_check` | `tyrant_gate_control`, corruption < 70 |
| Tyrant high corruption | `fc2_tyrant_corruption_surge` | `tyrant_gate_control`, corruption ≥ 70 |
| Corruption god | `fc2_tyrant_corruption_surge` | corruption ≥ 70 |
| Corruption death | `fc2_tyrant_corruption_surge` | corruption ≥ 90 |
| Iron Saints path | `fc2_iron_saints_dominion_node` | `saints_gate_support` |
| Archive path | `fc2_last_archive_revelation_node` | `archive_gate_support` |
| Liminal space | `fc2_liminal_space` | `door_walked_through` |
| Gate lockin | `fc2_lockin_assessment_chamber` | `gate_lockin` |
| Faction collapse | `fc2_faction_no_crown_node` | `faction_gate_resolution` (no crown) |

---

## Integration Status

- **story/index.ts:** `FINAL_CHAPTER_2_NODES` already imported and spread; no changes needed
- **endings.ts:** 21 new endings registered before True Ending block
- **images.ts:** 17 keys in BACKGROUND_IMAGES + 17 gradients in BACKGROUND_GRADIENTS
- **chapterRoadmap.ts:** status: complete, nodeCount: 72
- **TypeScript:** 0 errors
- **BFS:** 70/70 reachable, 0 broken refs, 0 missing endingId refs

---

*Summary complete. Final Chapter 2 is production-ready pending dedicated ending artwork and flag-source confirmation for `clean_signal` and `blackout_true_memory`.*
