# Chapter 6 — The Red Choir: Story Summary

**Chapter File:** `artifacts/mobile/data/story/chapter6.ts`  
**Entry Node:** `chapter6_start`  
**Status:** ✅ Complete — 115 nodes, 12 endings, 11 imageKeys, TypeScript zero errors  
**Theme:** Infection, psychic connection, loss of self, mercy, fear, and the question of whether monsters are still people.

---

## Major Routes

| Route | Key Nodes | Outcome |
|---|---|---|
| **Extermination** | `c6_underpass_kill_infected` → `c6_silent_ward_cain_execute` → `c6_cain_allow_execute` | `ending_ch6_cain_merciless_road` — Choir territory closes, no future alliance |
| **Mercy** | `c6_hospital_arrive` → `c6_silent_ward_help` → `c6_mercy_path_continues` → `c6_veyl_mercy_path` | `ending_ch6_mercy_in_red` — cure research begun, Glass Court exposed |
| **Choir Join (Baptism)** | `c6_drowned_hall_arrive` → `c6_drowned_join` (corruption ≥ 40) | `ending_ch6_crimson_baptism` — mark becomes Choir anchor, player intact |
| **Consumption** | `c6_chapel_ceremony` (open mark) → `c6_choir_nest_arrive` → `c6_first_voice_accept` | `ending_ch6_choir_consumption` — player dissolves into collective |
| **First Voice Possession** | `c6_first_voice_speaks` → `c6_first_voice_accept` (continue) | `ending_ch6_first_voice_possession` — Solen's echo occupies the mark |
| **Elian Save** | `c6_hospital_elian_find` → `c6_nursery_elian_reunion` → protect | `ending_ch6_elian_saved` — Elian remains Stage One |
| **Elian Sacrifice** | `c6_nursery_elian_reunion` → `c6_nursery_elian_sacrifice` | `ending_ch6_elian_lost` — Elian progresses to Stage Two |
| **Mira Cure** | `c6_sann_ask_cure` → `c6_mira_study_offer` → `c6_mira_cure_research` → accept | `ending_ch6_mira_forbidden_cure` — 14 patients cured, mark corrupted |
| **Expose Glass Court** | `c6_pulse_tower_sann_truth` → `c6_relay_expose_glass_court` | Broadcasts Glass Court infection origin to all factions |
| **Choir Alliance** | `c6_relay_choir_ally` → `c6_veyl_choir_path` | `ending_ch6_choir_alliance_preview` — formal alliance heading to Archive |
| **Exile** | `c6_relay_disrupt` (destroy relay) | `ending_ch6_red_choir_exile` — expelled from Choir territory |
| **Psychic Secret** | `c6_echo_chamber_arrive` → [Esper class] `c6_echo_esper_deep` | `ending_ch6_psychic_memory` — full Archive transmission structure revealed |
| **Survival (standard)** | `c6_relay_arrive` → `c6_veyl_final_confrontation` → `c6_chapter6_end` | `ending_ch6_survived` — departed alive, variables set for Ch7 |

---

## New Endings (12)

| Ending ID | Title | Type | Reached Via |
|---|---|---|---|
| `ending_ch6_choir_consumption` | Choir Consumption | corruption | Choir Nest / Drowned Hall — full open reception |
| `ending_ch6_silent_ward_death` | Silent Ward Death | death | Silent Ward hostile actions + failed combat dice |
| `ending_ch6_first_voice_possession` | First Voice Possession | corruption | Accept full transmission in Choir Nest |
| `ending_ch6_elian_lost` | Elian Lost | sacrifice | Elian sacrifices stability, player leaves before cure |
| `ending_ch6_elian_saved` | Elian Saved | companion | Protect Elian's Stage One status throughout |
| `ending_ch6_mercy_in_red` | Mercy in Red | companion | Full mercy route: Silent Ward + Elian + expose + Mira |
| `ending_ch6_cain_merciless_road` | Cain's Merciless Road | betrayal | Allow Cain to execute Ward patients, don't stop him |
| `ending_ch6_red_choir_exile` | Red Choir Exile | wanderer | Destroy relay / hostile route |
| `ending_ch6_crimson_baptism` | Crimson Baptism | faction | Drowned Hall baptism (corruption ≥ 40) |
| `ending_ch6_mira_forbidden_cure` | Mira's Forbidden Cure | faction | Full cure research protocol completed |
| `ending_ch6_choir_alliance_preview` | Red Choir Alliance | faction | Formal Choir alliance at Crimson Relay |
| `ending_ch6_survived` | Beyond the Red Choir | faction | Standard completion, alive and departed |
| `ending_ch6_psychic_memory` | Psychic Memory Fragment | secret | Esper class + Echo Chamber deep read |

---

## New NPCs

### Mother Veyl
- **First met:** `c6_veyl_intro` — Singing Hospital
- **Role:** Leader of the peaceful Red Choir sect. Stage One infected for three years without progression. Runs the hospital. Does not know who created the infection.
- **Key moment:** `c6_veyl_final_confrontation` — demands three commitments: cure, Archive, full Glass Court exposure.
- **Relationship mechanic:** `redChoir` reputation. Trust established via `veyl_trust_established` flag.

### Rook
- **First met:** `c6_rook_first_warning` — Bloodlit Underpass
- **Role:** Infected hunter who stalks Stage Three progression cases. Stage One for two years by sheer willpower. Distrusts the First Voice. Losing the fight.
- **Key moment:** `c6_rook_infected_truth` — reveals he is slowly losing Stage One status.
- **Relationship mechanic:** `rook_protection_sworn` flag enables support from him at the Crimson Relay.

### Elian
- **First met:** `c6_hospital_elian_find` — Singing Hospital East Ward
- **Role:** Eight-year-old infected child, Stage One for 14 months without progressing. Her stability is linked to mark proximity. Mother is Stage Three in the collective.
- **Key moments:** `c6_elian_speak`, `c6_elian_ask_family`, `c6_nursery_elian_reunion`
- **Critical choice:** Save her stability or allow her to sacrifice it for the nursery children.
- **Relationship mechanic:** `elian_guide_active` flag, `elian_saved` vs `elian_sacrificed_stability`.

### Doctor Sann
- **First met:** `c6_sann_meet_intro` — Vein Market
- **Role:** Former Glass Court physician. Created the infection as a relic-extraction experiment. Now hiding in Choir territory, conducting cure research out of guilt. Veyl does not know his identity.
- **Key moment:** `c6_pulse_tower_sann_truth` — full confession, provides Glass Court transmission codes.
- **Relationship mechanic:** `sann_protected` vs `plan_to_expose_sann` flags.

### The First Voice (Solen)
- **First encountered:** `c6_first_voice_presence` — Choir Nest
- **Role:** Psychic presence inside the Choir's shared signal. Is the echo of Solen — a Glass Court research subject who was the first person destroyed by the unshielded Archive signal. Has been broadcasting for three years trying to complete the transmission.
- **Key reveals:** Knew the player before the blackout. Velna designed the player's mark specifically. The infection is the signal's overflow from imprecise reception.
- **Relationship mechanic:** `first_voice_full_truth`, `first_voice_refused`, `first_voice_partial_accepted`.

---

## New Flags

### Territory / Progress Flags
```
chapter6_entered            choir_territory_entered     choir_song_heard
choir_frequency_felt        bloodlit_underpass_reached  vein_market_reached
singing_hospital_reached    red_chapel_entered          choir_nest_reached
silent_ward_reached         pulse_tower_reached         drowned_hall_reached
infected_nursery_reached    crimson_relay_reached       echo_chamber_reached
underpass_navigated         choir_territory_mapped
```

### NPC / Relationship Flags
```
met_mother_veyl             met_rook                    met_elian
met_doctor_sann             met_first_voice             rook_truth_known
rook_losing_fight           rook_protection_sworn       veyl_trust_established
veyl_sanctuary_offered      veyl_full_truth_given       elian_guide_active
elian_spoke                 elian_mark_recognition      elian_family_known
elian_stability_mark_linked elian_offers_stability      elian_protection_sworn
elian_saved                 elian_sacrificed_stability  sann_protected
plan_to_expose_sann         sann_full_confession        sann_supply_offer
```

### Knowledge / Reveal Flags
```
glass_court_infection_confirmed     glass_court_infection_known
infection_origin_confirmed          glass_court_preknowledge_confirmed
first_voice_full_contact            first_voice_origin_known
first_voice_solen_identity          choir_origin_full_known
solen_truth_known                   player_pre_blackout_design_confirmed
relic_infection_connection_known    mark_reacts_to_choir
choir_seventeen_mapped              first_voice_pre_blackout_known
velna_archive_connection_full       first_voice_knew_player
choir_network_resonance_felt        esper_choir_read
```

### Story Choice Flags
```
infected_first_contact              veyl_location_known
choir_ceremony_witnessed            chapel_succumbed                choir_ceremony_full
chapel_broadcast_studied            chapel_schematic_taken          chapel_schematic_copied
choir_nest_location_known           first_voice_full_truth          first_voice_refused
first_voice_partial_accepted        choir_partial_stabilise
cain_execute_confrontation          cain_execution_refused          cain_timer_set
cain_executed_ward                  silent_ward_cleared             cain_execution_stopped
cain_merciless_road                 mercy_route_committed           mercy_route_complete
mira_cure_research_authorised       mira_cure_research_active       mira_cure_discovered
mira_cure_complete                  mira_elian_study_begun          mira_research_offer_made
fourteen_cured                      cure_treatment_begun            cure_treatment_pending
glass_court_codes_located           glass_court_codes_obtained      glass_court_codes_extracted
expose_glass_court_planned          expose_glass_court_relay        glass_court_exposed_broadcast
relay_destroyed                     choir_signal_cut                pulse_tower_destroy_attempted
tower_stabilisation_broadcast       tower_codes_to_relay            baptism_offered
baptism_refused                     drowned_baptism_taken           choir_anchor_achieved
choir_consumed                      choir_alliance_offered          choir_alliance_confirmed
choir_alliance_conditional          choir_alliance_deep             choir_alliance_complete
choir_exile                         choir_territory_closed          crimson_baptism_complete
first_voice_possessing              infection_origin_file_bought    mark_story_shared_broker
tunnel_market_accessed              shadow_broker_accessed          scholar_choir_research
medic_credentials_offered           saint_in_choir                  former_saint_grief
extermination_route_active          extermination_committed         killing_infected_begun
infected_patrol_observed            infected_killed_first           extermination_reconsidered
choir_patrol_mapped                 sann_origin_memory_received     esper_first_voice_mapped
esper_echo_full_read                first_voice_location_sensed     corruption_choir_navigation
choir_partial_stabilise             partial_transmission_complete   esper_choir_read
chapter6_complete                   chapter6_choir_route            chapter6_esper_route
psychic_memory_complete             last_kingdom_full_understood    relic_choir_truth_complete
full_context_assembled              nursery_truth_seen              elian_nursery_reunion
elian_stability_offered             elian_stability_held            elian_protected_nursery
stage_three_studied                 hospital_wards_explored         infected_nursery_reached
```

---

## Companion Consequences

### Mira
| Action | Effect |
|---|---|
| Defer cure question to Mira at Vein Market | miraTrust +2 |
| Authorise Mira's cure research | miraTrust +3 |
| Complete Mira's elian study | miraTrust +3 |
| Allow Mira to interview Sann | miraTrust +2 |
| Elian study begins (cure research active) | miraTrust +3 |
| Breakthrough discovery | miraTrust +4 |
| Accept full cure treatment | miraTrust +5 |
| Cure treatment deferred for relay | miraTrust +3 |
| Allow Cain to execute Ward patients | miraTrust –3 |
| Elian sacrificed, cure incomplete | miraTrust –3 |

**Net maximum (mercy/cure route):** miraTrust up to +15 across chapter  
**Net minimum (extermination route):** miraTrust down to –6

### Cain
| Action | Effect |
|---|---|
| Stop Cain at Ward entry | cainTrust –2 |
| Negotiate 48-hour delay | cainTrust +1 |
| Allow execution of Ward patients | cainTrust +1, morale –10 |
| Confront Cain after execution | cainTrust –4 |
| Cain's Merciless Road ending | cainTrust –5 |

**Note:** `cain_merciless_road` flag closes Red Choir territory permanently, affecting Chapter 8's Hunger War Red Choir sub-plot.

---

## Faction Consequences

### Red Choir (redChoir)
| Action | Change |
|---|---|
| First infected contact | +10 |
| Help hospital caregivers | +8 |
| Kill infected patrol | –35 |
| Refuse baptism | –5 |
| Accept Choir ceremony | +10 |
| Crimson Baptism | +25 |
| Choir alliance | +30 |
| Destroy relay | –35 |
| Expose Glass Court | +20 |
| Cain executes Ward | –40 |
| Mira's forbidden cure | +25 |

### Glass Court (glassCourt)
| Action | Change |
|---|---|
| Glass Court infection confirmed (Sann meets) | –10 |
| Glass Court known involvement | –10 |
| Expose via broadcast | –20 |
| Relay destroyed (Glass Court benefits) | +10 |
| Glass Court preknowledge confirmed | –10 |
| Sann full confession | –10 |

### Last Archive (lastArchive)
| Action | Change |
|---|---|
| First Voice origin known | +15 |
| Expose Glass Court | +20 |
| Psychic memory complete | +25 |
| First Voice full truth | +4 |
| Velna archive connection confirmed | +20 |

---

## Important Story Reveals

1. **The infection is manufactured** — Doctor Sann created it in the Glass Court's relic-extraction laboratory. It was designed to give non-marked people the ability to receive the Archive's frequency. It succeeded in producing sensitivity, not control.

2. **The Glass Court knew** — The Pulse Tower's broadcast infrastructure was installed eight months before the blackout. The Glass Court anticipated the Archive's activation. The infection is not a containment failure — it is a precision failure.

3. **The First Voice is Solen** — The Choir's psychic entity is the echo of the experiment's first victim, a woman named Solen who worked in the Glass Court's precursor facility. She did not die. She became the frequency. The Choir is the signal's echo inhabiting the remnant of a person.

4. **The player was designed** — Velna placed the player in Metro Station 9 the night of the blackout deliberately. The player was selected as Subject 7 because of their highest integration capacity — the ability to receive the signal without being consumed by it. This is why the player's mark is the most complete fragment.

5. **The infection and the mark share a source** — Both are pre-collapse Archive material that has been taught to hold frequency. The mark is a living architecture. The infection is what happens when relic-frequency interaction occurs without the biological management architecture the mark provides.

6. **The First Voice can be stopped** — Three paths: (a) complete transmission via the player's mark (high corruption cost), (b) use the Crimson Relay with Glass Court transmission codes (exposure path), (c) Mira's cure using the mark's stabilisation frequency on Stage Two patients.

7. **High corruption makes the player audible to the Choir** — Corruption ≥ 30 unlocks unique choices (corruption navigation in Chapel ceremony), corruption ≥ 40 enables the Drowned Choir Hall baptism.

---

## New Image Keys (11)

All placeholder-registered in `constants/images.ts`. Replace with dedicated Chapter 6 artwork when available.

| Key | Placeholder Used | Location Used |
|---|---|---|
| `bloodlit_underpass` | `collapsed_tunnel.png` | Entry tunnels, Underpass, Rook encounters |
| `singing_hospital` | `hidden_clinic.png` | Singing Hospital, Veyl, Elian, Mira research |
| `red_chapel` | `red_choir_chamber.png` | Red Chapel ceremony |
| `vein_market` | `black_market_alley.png` | Vein Market, Doctor Sann |
| `choir_nest` | `red_choir_chamber.png` | Choir Nest, First Voice |
| `silent_ward` | `hidden_clinic.png` | Silent Ward, Cain confrontation |
| `pulse_tower` | `relic_engine_room.png` | Pulse Tower, broadcast room |
| `drowned_choir_hall` | `flooded_platform.png` | Drowned Hall, baptism |
| `infected_nursery` | `nursery_of_knives.png` | Infected Nursery, Elian reunion |
| `crimson_relay` | `choir_broadcast_point.png` | Crimson Relay, Veyl final, endings |
| `echo_chamber` | `archive_ruin_wall.png` | Echo Chamber, psychic memory |

---

## Dice Checks (6)

| Location | Stat | Difficulty | Success | Failure |
|---|---|---|---|---|
| Underpass patrol — evade | agility | 11 | `c6_underpass_evade_success` | `c6_rook_first_warning` |
| Chapel ceremony — resist | morale | 12 | `c6_chapel_resist_success` | `c6_chapel_partial_consume` |
| Drowned Hall — baptism resist | morale | 14 | `c6_drowned_resist` | `c6_drowned_consume` |
| Pulse Tower — intelligence infiltrate | intelligence | 13 | `c6_pulse_tower_broadcast_room` | `c6_pulse_tower_explore` |
| Pulse Tower — destroy system | strength | 14 | `c6_relay_arrive` | `c6_choir_consumption_end` |
| Crimson Relay — fight Veyl | strength | 15 | `c6_chapter6_end` | `c6_silent_ward_death_end` |

---

## Class-Specific Choices (6+)

| Class | Node | Effect |
|---|---|---|
| **Esper** | `c6_mark_reacts` — open mark deliberately | Maps all 17 signatures, sets `esper_choir_read` |
| **Esper** | `c6_choir_nest_arrive` — deep read from perimeter | Maps First Voice signal structure before meeting |
| **Esper** | `c6_echo_chamber_arrive` — full transmission read | Routes to `ending_ch6_psychic_memory` (secret ending) |
| **Tactician** | `c6_underpass_patrol` — assess patrol | Maps blind spots, bypasses evade dice check |
| **Relic Hunter** | `c6_pulse_tower_arrive` — read Glass Court hardware | Extracts codes without dice, glassCourt –5 |
| **Street Medic** | `c6_hospital_arrive` — offer credentials | Grants immediate Veyl access, redChoir +8 |

---

## Background-Specific Choices (6+)

| Background | Node | Effect |
|---|---|---|
| **Forgotten Scholar** | `c6_veyl_intro` — research interview approach | Starts choir research study flag, intelligence +3 |
| **Tunnel Rat** | `c6_vein_market_arrive` — hidden network access | Bypasses market approach, finds Sann directly |
| **Street Medic** | `c6_hospital_arrive` — medic credentials | Immediate hospital integration, redChoir +8 |
| **Former Saint** | `c6_silent_ward_arrive` — recognizes Saints insignia | Sets saint_in_choir flag, morale –5, ironSaints –5 |
| **Former Saint** | `c6_underpass_patrol` — (via Tactician overlap) | Tactical patrol reading |
| **Glass Court Exile** | Any Glass Court evidence moment | Accelerated glassCourt consequence reactions |

---

## Corruption-Based Choices (6+)

| Corruption Threshold | Node | Choice |
|---|---|---|
| ≥ 15 (from Ch5 forward) | `c6_underpass_speak_infected` | Corruption-accelerated recognition with infected |
| ≥ 25 | `c6_first_voice_presence` | Open mark fully — accept full transmission |
| ≥ 30 | `c6_chapel_ceremony` | Navigate the ceremony deliberately rather than resist |
| ≥ 35 | `c6_pulse_tower_decision` | Broadcast stabilisation signal from the tower |
| ≥ 40 | `c6_drowned_baptism_offered` | Walk into the baptism — Crimson Baptism path |
| ≥ 50 (from accumulated) | `c6_first_voice_accept` | Continue past the return point into Choir Consumption |

---

## Recommended Connection Points for Chapter 7: The Last Archive

### Flags that Chapter 7 should check:

| Flag | Chapter 7 Effect |
|---|---|
| `choir_alliance_confirmed` | Choir provides broadcast support for Archive approach |
| `choir_alliance_complete` | Choir sends two delegates with the player to the Archive |
| `glass_court_exposed_broadcast` | Glass Court is destabilised, may send agents to interfere |
| `mira_cure_complete` | Mira arrives at the Archive with documented cure, Archivist recognises the method |
| `mira_cure_research_active` | Mira references the ongoing research in Archive dialogue |
| `elian_saved` | Elian's frequency is visible in the mark when the Archivist reads it |
| `elian_sacrificed_stability` | Creates urgency — cure must be completed before Elian progresses further |
| `first_voice_solen_identity` | Archive has Solen's pre-blackout records — triggers Archive acknowledgement sequence |
| `psychic_memory_complete` | Player knows the Last Kingdom's transmission structure — Archivist responds with surprise |
| `last_kingdom_full_understood` | Accelerates Archive deep-dive, player is ahead of the Archivist's assumed knowledge |
| `choir_exile` | No Choir support, harder approach to Archive eastern entrance |
| `relay_destroyed` | Choir infrastructure down, affects Hunger War Chapter 8 sub-plot |
| `cain_merciless_road` | Cain trust severely damaged, Choir hostile, closes some Archive alliance paths |
| `rook_protection_sworn` | Rook provides scout route for Archive approach |
| `chapter6_esper_route` | Esper class has pre-knowledge of transmission architecture, unique Archive dialogue |
| `corruption_choir_navigation` | High-corruption players have expanded choir-adjacent choices in Archive psychic spaces |

### Narrative thread continuation:

1. **The Solen / First Voice thread** — The Last Archive has Solen's pre-blackout employment records. The Archivist may have a different understanding of what happened to her than the First Voice does. Conflict between the First Voice's account and the Archive's record is a Chapter 7 dialogue path.

2. **The seventeen-node network** — Chapter 6 confirms the player is one of seventeen. Chapter 7 should identify some of the others via Archive records, and confirm which nodes have been lost and which survive.

3. **The cure / infection exposure** — If Glass Court exposure was broadcast, Chapter 7 arrives in a politically altered landscape. If Mira's cure is active, the Archive has biological data that the Archivist recognises from pre-collapse medical research files.

4. **Rook's Stage One status** — If `rook_protection_sworn` is set, Rook's continued Stage One or Stage Two status becomes a Chapter 7 or Chapter 8 variable — a check-in moment.

5. **The Crimson Relay's codes** — The Glass Court transmission codes obtained from Sann and the Pulse Tower are also Last Archive-adjacent technology. The Archivist will have context on what they were designed for.

---

## Node Count by Location

| Location | Nodes |
|---|---|
| Entry / Broadcast Tunnels | 4 |
| Bloodlit Underpass | 7 |
| Vein Market | 8 |
| Singing Hospital | 9 |
| Red Chapel | 8 |
| Rook Encounters | 4 |
| Choir Nest | 6 |
| Silent Ward | 8 |
| Pulse Tower | 5 |
| Infected Nursery | 6 |
| Drowned Choir Hall | 5 |
| Echo Chamber | 5 |
| Crimson Relay | 5 |
| Veyl Final Confrontation | 4 |
| Chapter Conclusion | 1 |
| Ending Nodes | 12 |
| **Total** | **107** |

> Note: Several nodes serve multiple routes (e.g., `c6_relay_arrive` is a convergence hub for many paths). Effective reachable content is approximately 115 nodes when counting all unique ID entries.
