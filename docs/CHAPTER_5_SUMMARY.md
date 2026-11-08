# CHAPTER 5 SUMMARY — THE GLASS COURT

> *"They never wanted the city. They wanted what was under it."*

---

## Overview

**Chapter**: 5  
**Title**: The Glass Court  
**Status**: Complete  
**Node Count**: 104 (90+ connected story nodes + 15 ending nodes)  
**Entry Flag**: chapter4_complete  
**Start Node**: `chapter5_start`  
**Chapter Completion Node**: `c5_chapter5_end` → `ending_ch5_survived`

**Theme**: Luxury above starvation. Power, beauty, lies, class divide, medical experiments, political survival, and moral corruption.

**Chapter Feel**: Deliberately jarring contrast from Chapter 4's tunnels and Iron Saints brutality. The Glass Court is elegant, cold, white, bright — and cruel in ways that require better vocabulary than the Saints ever needed.

---

## Major Routes (15)

| # | Route | Key Nodes | Flags Set |
|---|-------|-----------|-----------|
| 1 | Enter as invited guest | Gate charisma dice → gate_granted_entry | `entered_glass_court_as_guest` |
| 2 | Sneak through servant tunnels | Gate agility dice → gate_granted_entry | `entered_glass_court_as_servant` |
| 3 | Arrive as prisoner / test subject | gate_prisoner_route | `entered_glass_court_as_prisoner` |
| 4 | Ally with Lady Seraphine | seraphine_offer → seraphine_ally_accept → seraphine_alliance_end | `glass_court_alliance_possible` |
| 5 | Expose the Glass Court's experiments | ward_evidence → council_expose_path | `exposed_experiment_ward` |
| 6 | Sell out the Hollow Children | gallery_hollow_sell → hollow_deal_sealed | `sold_out_hollow_children` |
| 7 | Iron Saints reputation entry | gate_saints_leverage | `saints_credentials_used` |
| 8 | Protect Mira from Orchid Clinic | mira_protect_choice → mira_protected | `mira_saved_from_orchid_clinic` |
| 9 | Let Cain make political bargain | cain_bargain_warned → cain_bargain_end | `cain_made_political_bargain` |
| 10 | Fallen Noble background | gate_fallen_noble + auction_fallen_noble | `noble_identity_implied` |
| 11 | Black Market Courier background | gate_courier | `courier_contact_used` |
| 12 | Shadow Broker class route | gallery_shadow_broker | `saints_court_admin_link_found` |
| 13 | Relic Hunter class route | curator_relic_hunter | `relic_hunter_card_read` |
| 14 | Corruption event in Mirror Ballroom | ballroom_corruption_choice → mirror_corruption_end | `corruption_mirror_event` |
| 15 | Discover blackout was planned | observatory_docs → observatory_truth | `discovered_blackout_was_planned` |

---

## New Endings (15)

### Death Endings
| ID | Title | How to Reach |
|----|-------|-------------|
| `ending_ch5_orchid_table` | The Orchid Table | Submit to Varr's extraction protocol in the Orchid Clinic |
| `ending_ch5_mira_dissection` | Mira Dissection | Fail to rescue Mira after she is captured by the clinic |
| `ending_ch5_glass_cage` | Glass Cage | Lose the Auction Hall confrontation without escape options |
| `ending_ch5_white_atrium_massacre` | White Atrium Massacre | Fail the Council Charisma check, choose to fight |
| `ending_ch5_auctioned_relic` | Auctioned Relic | Bid on lot seventeen without sufficient leverage; the bid fails |

### Betrayal Endings
| ID | Title | How to Reach |
|----|-------|-------------|
| `ending_ch5_cain_bargain` | Cain's Bargain | Allow Cain to accept Lord Cael's intelligence exchange in the Hunger Gallery |
| `ending_ch5_noble_pet` | Noble Pet | Accept Seraphine's terms completely without conditions; Resonant Companion classification |

### Corruption Endings
| ID | Title | How to Reach |
|----|-------|-------------|
| `ending_ch5_mirror_corruption` | Mirror Corruption | Open the mark fully at the Mirror Ballroom's centre (requires corruption ≥ 30) |
| `ending_ch5_pale_curator_collection` | Pale Curator's Collection | Accept the Curator's documentation terms; the mark enters the collection case |

### Wanderer Endings
| ID | Title | How to Reach |
|----|-------|-------------|
| `ending_ch5_false_ascension` | False Ascension | Fail the Council Charisma check; accept Category Two processing |
| `ending_ch5_glass_court_neutral` | Glass Court Neutral | Complete the Council confrontation without committing to alliance or conflict |

### Faction Endings
| ID | Title | How to Reach |
|----|-------|-------------|
| `ending_ch5_servant_revolt` | Servant Revolt | Pass the Charisma check leading Juno's forty-three servants |
| `ending_ch5_seraphine_alliance` | Seraphine Alliance | Ally with Seraphine in the Atrium or Council Chamber (full integration) |
| `ending_ch5_survived` | Beyond the Glass | Survive the Council Chamber confrontation; depart with the truth |

### Secret Ending
| ID | Title | How to Reach |
|----|-------|-------------|
| `ending_ch5_secret_memory` | Secret Memory Fragment | Forgotten Scholar background + Observatory documents + share the memory with Sabel |

---

## New NPCs

### Lady Seraphine Vale
**Role**: Elegant ruler of the Glass Court. Treats survival like theater.  
**First Appearance**: `c5_atrium_seraphine_entrance`  
**Flag**: `met_lady_seraphine`  
**Personality**: Cold pragmatism dressed as sophistication. She prefers cooperation to coercion and the distinction is genuine — but coercion exists as an option and she will name it.  
**Key Role**: Offers the main alliance route. Can be an ally, a threat, or an obstacle depending on player choices.

### Director Enoch Varr
**Role**: Scientist studying relic marks, corruption, memory loss, and the wrist mark.  
**First Appearance**: `c5_clinic_varr_intro`  
**Flag**: `met_director_varr`  
**Personality**: Clinical calm. Young for his authority. Processes disagreement as data. The most dangerous person in the building because he is not cruel — he is thorough.  
**Key Role**: Reveals the marks are not unique (the resonance lattice). Targets Mira for secondary extraction.

### Juno
**First Appearance**: `c5_elevator_juno_first`  
**Flag**: `met_juno`  
**Personality**: Precise, operational, operating in plain sight for two years. The most experienced person in the building when it comes to the building's actual mechanics.  
**Key Role**: Central to the servant revolt route. Leads Juno's network of forty-three. Can be protected or sacrificed in the revolt plan.

### Lord Cael Orison
**Role**: Ambassador between Seraphine's idealism and Court politics. Charming manipulator.  
**First Appearance**: `c5_lord_cael_intro`  
**Flag**: `met_lord_cael`  
**Personality**: Charm as skill — only visible after it has worked. Genuinely useful, genuinely dangerous. His loyalty is to his own continued usefulness.  
**Key Role**: Offers Cain an intelligence exchange. Can warn the player (through Cain) or become a subtle antagonist. His connection to the Iron Saints Warden Unit program is a major early reveal.

### The Pale Curator
**Role**: Collector of relic-touched humans and their documentation.  
**First Appearance**: `c5_pale_curator_appear`  
**Flag**: `met_pale_curator`  
**Personality**: Completely managed surface; everything below it is complex. Does not traffic in individuals — "that is Varr's method, and it is inferior." But the distinction collapses under pressure.  
**Key Role**: Provides origin information about the player's mark. Reveals the Masked Heir knows more about Velna. Warns about lot seventeen in the Auction Hall. Can collect the mark in a corruption ending.

### The Masked Heir — Sabel
**Role**: Mysterious figure connected to the player's lost memory and the truth behind the blackout.  
**First Appearance**: `c5_masked_heir_glimpse`  
**Flag**: `met_masked_heir`  
**Real Identity**: Sabel. Velna's child. Carries the mark piece that precedes the player's — the memory from before the blackout.  
**Key Role**: The central secret of Chapter 5. Reveals Velna's architecture, the Last Kingdom's nature as a real location, and the true purpose of the transmission. Can join the player for Chapter 6.

---

## New Flags

| Flag | Set In | Meaning |
|------|--------|---------|
| `chapter5_begun` | chapter5_start | Chapter has started |
| `glass_gate_reached` | glass_gate_approach | Gate has been reached |
| `entered_glass_court_as_guest` | gate entry routes | Entered through legitimate or social means |
| `entered_glass_court_as_servant` | gate sneak success | Entered through servant tunnels |
| `entered_glass_court_as_prisoner` | gate prisoner route | Entered as a test subject |
| `gate_officer_met` | gate_guard_encounter | Gate officer encountered |
| `saints_credentials_used` | gate_saints_leverage | Iron Saints papers used for entry |
| `noble_identity_implied` | gate_fallen_noble | Fallen Noble identity invoked |
| `courier_contact_used` | gate_courier | Black market contact name used |
| `registered_resonant_1048` | gate_prisoner_route | Registered as the 1048th resonant |
| `met_juno` | elevator_juno_first | Juno met on the elevator |
| `juno_trusted_early` | elevator_juno_first (choice) | Juno trusted immediately |
| `juno_negotiation_opened` | elevator_juno_first (choice) | Negotiation with Juno begun |
| `white_atrium_reached` | white_atrium_arrive | White Atrium reached |
| `seraphine_entering` | atrium_seraphine_entrance | Seraphine approaching |
| `met_lady_seraphine` | seraphine_first_words | Seraphine met |
| `seraphine_offer_heard` | seraphine_offer | Seraphine's terms heard |
| `glass_court_alliance_possible` | seraphine_ally_accept | Player is open to alliance |
| `glass_court_hostile` | seraphine_refuse | Player refused Seraphine's terms |
| `seraphine_terms_heard` | seraphine_ally_accept | Full terms heard |
| `glass_court_provisional_ally` | seraphine_ally_accept (choice) | Provisional chip accepted |
| `met_lord_cael` | lord_cael_intro | Lord Cael met |
| `cael_proposition_heard` | cael_proposition | Lord Cael's proposition heard |
| `cael_warden_known` | cael_cain_warns | Warden Unit Seven connection known |
| `cael_partial_briefing` | cael_proposition (choice) | Partial information shared with Cael |
| `court_access_established` | atrium_hub | Full court access established |
| `hunger_gallery_seen` | hunger_gallery_arrive | Hunger Gallery seen |
| `glass_court_data_seen` | gallery_display | Court's resource control data seen |
| `saints_court_admin_link_found` | gallery_shadow_broker | Iron Saints / Glass Court admin link discovered |
| `cain_court_offer_revealed` | gallery_cain_political | Cain revealed Cael's offer |
| `cain_refused_glass_court_deal` | cain_bargain_warned (choice) | Cain instructed to refuse |
| `cain_deal_permitted` | gallery_cain_political (choice) | Cain permitted to accept deal |
| `cain_made_political_bargain` | cain_bargain_end | Cain completed the deal |
| `gallery_evidence_noted` | gallery_display (choice) | Gallery evidence noted for later |
| `sold_out_hollow_children` | hollow_deal_sealed | Hollow Children's access codes sold |
| `hollow_access_sold` | hollow_deal_sealed | Codes confirmed in Court system |
| `orchid_clinic_reached` | orchid_clinic_arrive | Orchid Clinic reached |
| `clinic_equipment_identified` | orchid_clinic_arrive (medic class) | Clinic equipment identified |
| `met_director_varr` | clinic_varr_intro | Director Varr met |
| `varr_scan_permitted` | varr_mark_exam (choice) | Mark scan permitted |
| `varr_examination_complete` | varr_mark_exam | Varr's examination complete |
| `varr_knows_experiment_origin` | varr_mark_exam (runaway_experiment) | Varr knows mark was placed deliberately |
| `discovered_marks_are_not_unique` | varr_multiple_marks | Mark uniqueness revealed — it is a network |
| `mira_targeted_by_orchid_clinic` | mira_targeted | Mira targeted for secondary extraction |
| `mira_neural_pattern_logged` | mira_protected | Mira's pattern logged even if she escaped |
| `mira_saved_from_orchid_clinic` | mira_protected | Mira protected from extraction |
| `mira_clinic_captured` | mira_captured | Mira captured by clinic |
| `experiment_ward_accessed` | experiment_ward_arrive | Experiment Ward accessed |
| `dessa_met` | ward_marked_found | Dessa met in the ward |
| `ward_resonants_found` | ward_marked_found | Ward resonants found |
| `ward_seventeen_truth` | ward_seventeen_revealed | Truth about the seventeen resonants known |
| `lattice_network_known` | ward_seventeen_revealed | Lattice network structure known |
| `ward_prisoners_freed` | ward_freed | Eight ward prisoners freed |
| `exposed_experiment_ward` | ward_choice (exposure choices) | Ward experiments exposed to a faction |
| `ward_data_to_saints` | ward_choice (iron saints) | Ward data sent to Iron Saints |
| `ward_data_to_hollow` | ward_choice (hollow children) | Ward data sent to Hollow Children |
| `ward_evidence_held` | ward_choice (keep evidence) | Ward evidence kept for leverage |
| `ward_complete` | ward_evidence | Ward section completed |
| `mirror_ballroom_entered` | mirror_ballroom_arrive | Mirror Ballroom entered |
| `mirrors_are_archive_glass` | ballroom_esper_resonance | Mirror panels identified as Archive composite |
| `esper_glass_reading` | ballroom_esper_resonance | Esper-class glass reading performed |
| `memory_fragment_glass_ballroom` | ballroom_memory_vision | Ballroom memory fragment recovered |
| `court_witnessed_blackout` | ballroom_memory_vision | Court's foreknowledge of blackout discovered |
| `corruption_mirror_event` | ballroom_corruption_choice | Mirror corruption event triggered |
| `met_masked_heir` | masked_heir_glimpse | Masked Heir seen |
| `masked_heir_appointment_made` | masked_heir_chase | Masked Heir scheduled Observatory meeting |
| `ballroom_complete` | ballroom_escape | Ballroom section completed |
| `servant_quarters_reached` | servant_quarters_arrive | Servant Quarters reached |
| `juno_full_meeting` | juno_meeting | Full meeting with Juno completed |
| `juno_network_known` | juno_network | Juno's network known |
| `juno_plan_explained` | juno_network | Juno's two-part plan explained |
| `protected_servants` | juno_choice (protect) | Player committed to protecting servants |
| `juno_protected_by_player` | juno_protected | Player took ballroom disruption role |
| `juno_took_disruption` | juno_sacrificed | Juno took the disruption role |
| `level12_accessed` | juno_sacrificed | Level 12 accessed by player |
| `juno_took_sacrifice_role` | juno_sacrificed | Juno took sacrifice role |
| `revolt_assembled` | revolt_plan | Forty-three servants assembled |
| `servant_revolt_succeeded` | servant_revolt_end | Revolt succeeded |
| `juno_revolt_led` | servant_revolt_end | Juno led the revolt |
| `sky_garden_reached` | sky_garden_arrive | Sky Garden reached |
| `met_pale_curator` | curator_recognition | Pale Curator met |
| `curator_origin_revealed` | curator_recognition | Mark origin partially revealed by Curator |
| `discovered_blackout_was_planned` | curator_recognition / observatory_truth | Blackout was a planned Archive activation |
| `curator_relic_hunter_card_read` | curator_relic_hunter | Relic Hunter read the Archive composite card |
| `relics +1` | curator_relic_hunter | Relic gained |
| `curator_deal_signed` | curator_accept / curator_mem_accept_col | Curator documentation consent signed |
| `curator_threatened` | curator_deal (force choice) | Curator threatened |
| `last_kingdom_location_partial` | curator_memory | Partial location of the Last Kingdom known |
| `curator_knowledge_gained` | curator_memory | Curator's full knowledge received |
| `auctioned_as_relic` | auctioned_relic_end | Player auctioned as a relic |
| `cracked_observatory_reached` | cracked_observatory_arrive | Observatory reached |
| `observatory_documents_found` | observatory_docs | Observatory documents found |
| `sealed_document_opened` | observatory_docs (choice) | Sealed document opened |
| `archive_activation_understood` | observatory_truth | Blackout understood as Archive activation |
| `blackout_full_truth_known` | observatory_truth | Full blackout truth known |
| `taking_evidence_to_council` | observatory_truth (choice) | Evidence taken to Council |
| `velna_connection_discovered` | observatory_scholar | Velna connection discovered (scholar route) |
| `chapter5_scholar_memory` | observatory_scholar | Scholar personal memory recovered |
| `auction_hall_accessed` | private_auction_arrive | Auction Hall accessed |
| `auction_complete` | auction_decision | Auction section completed |
| `noble_auction_won` | auction_fallen_noble | Noble background won lot seventeen |
| `council_chamber_reached` | council_arrive | Council Chamber reached |
| `heir_approached_in_council` | council_arrive (choice) | Masked Heir approached first in Council |
| `seraphine_final_offer` | council_seraphine_final | Seraphine's final offer made |
| `council_argument_lost` | council_lose | Council argument lost |
| `masked_heir_identity_known` | masked_heir_revealed | Masked Heir's identity known |
| `velna_identity_confirmed` | masked_heir_revealed | Velna confirmed as architect |
| `blackout_full_truth_confirmed` | blackout_truth | Full truth confirmed by Sabel |
| `sabel_alliance_possible` | blackout_truth | Alliance with Sabel possible |
| `council_knows_truth` | council_final_choice | Council chamber has heard the truth |
| `chapter5_climax` | council_final_choice | Chapter 5 climax reached |
| `glass_court_full_alliance` | seraphine_alliance_end | Full Glass Court alliance |
| `seraphine_shore_alliance` | council_final_choice (seraphine) | Shore-focused alliance with Seraphine |
| `glass_court_left_neutral` | glass_court_neutral_end | Left Glass Court without resolution |
| `chapter5_survived_neutral` | glass_court_neutral_end | Survived chapter neutrally |
| `glass_cage_confined` | glass_cage_end | Confined in ward bed eighteen |
| `white_atrium_massacre` | white_atrium_massacre_end | White Atrium massacre occurred |
| `false_ascension_complete` | false_ascension_end | False Ascension processing complete |
| `noble_pet_status` | noble_pet_end | Noble Pet classification assigned |
| `mirror_corruption_event` | mirror_corruption_end | Mirror corruption event completed |
| `pale_curator_collected` | pale_curator_collection_end | Mark collected by Pale Curator |
| `mira_neural_pattern_extracted` | mira_dissection_end | Mira's neural backup extracted |
| `orchid_table_experienced` | orchid_table_end | Orchid Table extraction experienced |
| `juno_revolt_led` | servant_revolt_end | Juno led the revolt |
| `chapter5_revolt_route` | servant_revolt_end | Servant revolt route completed |
| `seraphine_alliance_confirmed` | seraphine_alliance_end | Seraphine alliance confirmed |
| `glass_court_alliance_sealed` | seraphine_alliance_end | Glass Court alliance sealed |
| `chapter5_seraphine_route` | seraphine_alliance_end | Seraphine route completed |
| `secret_memory_received` | secret_memory_end | Secret memory received from Sabel |
| `velna_message_understood` | secret_memory_end | Velna's full message understood |
| `chapter5_scholar_route` | secret_memory_end | Scholar secret route completed |
| `chapter5_complete` | chapter5_end | Chapter 5 complete |

---

## Companion Consequences

### Mira
| Situation | Effect |
|-----------|--------|
| High trust (≥ 5) | Admits knowing more about the extraction experiments than she revealed — her neural pattern was already partially aligned with the mark from months of proximity. This is a genuine revelation that she withheld, not a betrayal. |
| Low trust (< 3) | Withholds the neural pattern information. When captured, does not tell you what the extraction took. |
| Protected in clinic | `mira_saved_from_orchid_clinic` flag. Trust +3. Mira's neural pattern is logged but not extracted. |
| Captured and rescued | Trust -2 (for the capture) then neutral. Possible mira_dissection_end if rescue fails. |
| Captured and not rescued | Trust -5. mira_dissection_end if extraction completes. |
| Escorted through chapter | Small morale and trust bonuses at observatory_truth and council revelations. |

### Cain
| Situation | Effect |
|-----------|--------|
| High trust (≥ 4) | Warns the player about Lord Cael's Warden Unit Seven history (c5_cael_cain_warns). Refuses the intelligence deal. |
| Low trust (< 3) | May not reveal Cael's offer until after accepting it. |
| `cain_refused_glass_court_deal` set | Cain's loyalty strengthens. Trust +1 cumulative. |
| Player permits deal | `cain_deal_permitted`. Leads to `cain_bargain_end` with `cain_made_political_bargain` flag. |
| Cain's Bargain ending | Trust -8. Glass Court rep +20. Cain reveals everything, including mark's saturation level and shore direction. |
| Tactical reading (Tactician class) | Cain provides spatial assessment of Cael's meeting position — bonus intelligence check. |

---

## Faction Consequences

### Glass Court
| Action | Rep Change |
|--------|------------|
| Enter as guest (charisma/noble/courier/saints) | +5 to +15 |
| Accept Seraphine's provisional terms | +15 |
| Sell out Hollow Children | +20 |
| Protect Mira (fight through clinic) | -15 |
| Free ward prisoners | -20 |
| Expose ward to other factions | -15 |
| Servant revolt succeeds | -25 |
| Full Seraphine alliance | +30 |
| White Atrium massacre | -30 |
| Open mark in Auction Hall | -20 |
| Lord Cael's Warden truth discovered | -5 |

### Hollow Children
| Action | Rep Change |
|--------|------------|
| Sell out access codes | -25 |
| Expose ward data to Hollow Children | +15 |
| Free ward prisoners | +15 |
| Protect servants | +5 |
| Servant revolt succeeds | +20 |
| Gallery shadow broker discovery | -5 (indirect) |

### Iron Saints
| Action | Rep Change |
|--------|------------|
| Use Saints papers for entry | -5 (resource expenditure) |
| Expose ward data to Saints | +10 |
| Saints/Court admin link discovered | Context for Chapter 6+ |

### Last Archive
| Action | Rep Change |
|--------|------------|
| Discover marks are not unique | +10 |
| Discover ward seventeen truth | +15 |
| Mirrors are Archive glass (Esper) | +10 |
| Memory fragment in ballroom | +10 |
| Observatory truth revealed | +20 |
| Curator memory received | +15 |
| Velna identity confirmed | +20 |
| Full blackout truth known | +25 |
| Secret memory fragment ending | +25 |

---

## Major Reveals

| Reveal | Where | Flag |
|--------|-------|------|
| The mark is not unique — 17 resonants form a lattice network | Orchid Clinic — Varr examination | `discovered_marks_are_not_unique` |
| Dessa: the lattice resonants have been communicating for 7 months | Experiment Ward | `lattice_network_known` |
| Dessa: the player's mark carries the final lattice piece | Experiment Ward | `ward_seventeen_truth` |
| The Mirror Ballroom's panels are pre-collapse Archive composite glass | Mirror Ballroom (Esper class) | `mirrors_are_archive_glass` |
| The Glass Court witnessed the blackout in real time — they expected it | Mirror Ballroom memory | `court_witnessed_blackout` |
| The Pale Curator: six individuals were placed in Station 9 the night of the blackout by design | Sky Garden | `curator_origin_revealed` |
| The Pale Curator: the player was designed — not as a weapon, as a message | Sky Garden | first hint of `discovered_blackout_was_planned` |
| The Observatory predictive model: the blackout was the Archive deliberately activating | Cracked Observatory | `discovered_blackout_was_planned` |
| The marks are return receipts — confirmation that specific people received a specific transmission | Cracked Observatory | `archive_activation_understood` |
| Iron Saints and Glass Court share an administrative lineage (Shadow Broker) | Hunger Gallery | `saints_court_admin_link_found` |
| Sabel's identity: Velna's child, carries the memory piece preceding the player's | Council Chamber | `masked_heir_identity_known` |
| Velna: researcher who built the lattice using herself as template | Council Chamber | `velna_identity_confirmed` |
| The Last Kingdom is not a metaphor — it is a building below the city | Sky Garden (Curator) | `last_kingdom_location_partial` |
| The transmission point — the shore — is real and located below the metro district | Blackout truth node | `blackout_full_truth_confirmed` |
| Forgotten Scholar route: player was a subject in Velna's pre-collapse academic program | Observatory (scholar) | `velna_connection_discovered` |

---

## Dice Roll Checks (7)

| Node | Stat | Difficulty | Success | Failure |
|------|------|-----------|---------|---------|
| `c5_gate_guard_encounter` | Charisma | 13 | Enters as guest | Arrives as prisoner |
| `c5_gate_guard_encounter` | Agility | 14 | Enters as servant (sneaked in) | Arrives as prisoner |
| `c5_mira_protect_choice` | Agility | 14 | Mira protected | Mira captured |
| `c5_mira_captured` | Strength | 16 | Mira rescued | `ending_ch5_mira_dissection` |
| `c5_ward_seventeen_revealed` | Agility | 15 | Ward prisoners freed | `ending_ch5_orchid_table` |
| `c5_observatory_docs` | Intelligence | 13 | Full blackout truth understood | Proceeds to Council without full knowledge |
| `c5_council_seraphine_final` | Charisma | 16 | Argument lands in Council | Council fails; two bad endings available |

---

## Class-Specific Choices (6)

| Class | Node | Content |
|-------|------|---------|
| Shadow Broker | `c5_gallery_display` → `c5_gallery_shadow_broker` | Identifies the handwriting author on the Glass Court's scarcity projection — reveals Saints/Court admin link |
| Esper | `c5_ballroom_gathering` → `c5_ballroom_esper_resonance` | Tunes to the mirror lattice; discovers panels are Archive composite; intelligence +4, corruption +3 |
| Relic Hunter | `c5_curator_recognition` → `c5_curator_relic_hunter` | Reads the Archive composite card's material signature; confirms Velna's origin; gains relic |
| Blade Survivor | `c5_mira_protect_choice` | Physical option to fight through clinic staff; health -10 but Mira guaranteed protected |
| Tactician | `c5_cael_proposition` | Spatial assessment of the meeting before answering; redirects to `c5_cael_cain_warns` with bonus intelligence |
| Medic | `c5_orchid_clinic_arrive` | Identifies all clinic equipment in the entry corridor before meeting Varr; intelligence +3 |

---

## Background-Specific Choices (6)

| Background | Node | Content |
|------------|------|---------|
| Fallen Noble | `c5_gate_guard_encounter` → `c5_gate_fallen_noble` | Family name opens the gate without papers; glassCourt +15 |
| Black Market Courier | `c5_gate_guard_encounter` → `c5_gate_courier` | Harlan Voss contact name; quiet gate passage through network |
| Forgotten Scholar | `c5_observatory_docs` → `c5_observatory_scholar` | Reads predictive model's technical sections; recognises Velna's method signature from pre-blackout academic program; leads to `ending_ch5_secret_memory` |
| Fallen Noble | `c5_auction_view` → `c5_auction_fallen_noble` | Uses legacy standing to acquire lot seventeen through historical administrative claim |
| Runaway Experiment | `c5_varr_mark_exam` | Reveals to Varr that the mark was placed deliberately before the blackout; unlocks `varr_knows_experiment_origin` |
| Exiled Soldier | `c5_gate_guard_encounter` | Reads guard's Iron Saints-adjacent training; navigates the blind spot; enters without negotiating |

---

## Corruption-Based Choices (5)

| Node | Choice | Corruption Effect |
|------|--------|-----------------|
| `c5_varr_mark_exam` | "Extend your wrist — study it" | corruption +2; permits full scan |
| `c5_ballroom_corruption_choice` | "Give yourself to it" | Requires corruption ≥ 30; corruption +15; leads to `ending_ch5_mirror_corruption` |
| `c5_ballroom_esper_resonance` | Esper glass reading | corruption +3; reveals Archive composite origin |
| `c5_curator_memory` | "Open the mark" / accept documentation | corruption +2 implicit in curator_accept path |
| `c5_blackout_truth` | "Let the mark transmit everything" | corruption +3; enables Secret Memory path |

---

## New Image Keys (12)

All registered in `artifacts/mobile/constants/images.ts` with gradient fallbacks. Placeholder art points to closest existing environment; replace with dedicated Chapter 5 artwork.

| Key | Fallback | Gradient Mood |
|-----|---------|--------------|
| `glass_gate` | glass_tower_gate.png | Cold blue-grey; controlled, institutional |
| `ascension_elevator` | glass_tower_lobby.png | Deep blue-grey; vertical, enclosed |
| `white_atrium` | glass_tower_lobby.png | Dark navy; elegant cold |
| `hunger_gallery` | glass_tower_lobby.png | Slate blue; political, clinical |
| `orchid_clinic` | hidden_clinic.png | Dark teal-green; antiseptic, floral horror |
| `mirror_ballroom` | glass_tower_lobby.png | Deep purple-blue; reflection, corruption |
| `servant_quarters` | tunnel_camp.png | Dark warm brown; lived-in, real |
| `experiment_ward` | hidden_clinic.png | Cold blue-grey; clinical, suppressed |
| `sky_garden` | surface_dawn.png | Dark green; controlled nature, height |
| `council_chamber` | glass_tower_lobby.png | Deep navy; power, glass, city view |
| `cracked_observatory` | archive_ruin_wall.png | Midnight blue; starlight, Archive |
| `private_auction_hall` | glass_tower_lobby.png | Dark purple-rose; luxury, transaction |

---

## Route History Entries

The following routes are trackable in the Route Codex:

- **The Gate Negotiation** — How the player entered (guest/servant/prisoner/saints/noble/courier)
- **The White Atrium Alliance** — Whether Seraphine's terms were accepted or refused
- **The Clinic Confrontation** — Whether Mira was protected, rescued, or lost
- **The Ward Liberation** — Whether prisoners were freed, evidence was taken, or nothing was disturbed
- **The Mirror Memory** — Whether the corruption event occurred in the ballroom
- **Juno's Network** — Whether the servant revolt was led or supported
- **The Pale Curator's Terms** — Whether the documentation deal was signed
- **The Observatory Truth** — Whether the blackout's true nature was fully understood
- **The Council Verdict** — Which ending route was chosen in the Council Chamber

---

## Recommended Connection Points for Chapter 6: The Red Choir

### Flags to Check at Chapter 6 Start

| Flag | Chapter 6 Implication |
|------|----------------------|
| `discovered_blackout_was_planned` | Player knows the blackout was the Archive activating — the Red Choir's founder heard the same activation signal as music. This is a direct connection to open. |
| `lattice_network_known` | Seventeen resonant nodes exist. The Red Choir's broadcast frequencies affect marked individuals differently — this chapter should explain why. |
| `mirrors_are_archive_glass` | The Choir's broadcast system uses pre-collapse speaker infrastructure that shares harmonic architecture with the Archive glass. This should be discoverable. |
| `sold_out_hollow_children` | The Glass Court now has Hollow Children access codes. The Red Choir operates in the eastern district close to Hollow territory. Consequences may arrive. |
| `servant_revolt_succeeded` | The Glass Court is in disruption. The Red Choir's territory borders the Tower district. Court patrols may be reduced. |
| `seraphine_alliance_confirmed` | The Glass Court is a resource. Seraphine's network may have intelligence on the Choir's founder. |
| `glass_court_hostile` | Glass Court security may be looking for the player in the surface district between the Tower and the Choir's eastern territory. |
| `met_masked_heir` / `sabel_alliance_possible` | Sabel should appear in Chapter 6 if they left the Glass Court with the player. Their mark and the Choir frequency interact. |
| `chapter5_complete` | Standard chapter connection — Chapter 6 begins. |

### Narrative Entry Points

1. **Standard entry**: Player exits the Glass Court → surface district → east toward Red Choir broadcast signals. The mark responds to the broadcast before the player consciously hears it.

2. **Seraphine alliance entry**: Glass Court intelligence briefing about the Choir's territory. Seraphine has records on the Choir's founder. Different approach — better prepared but politically complicated.

3. **Servant revolt entry**: Leaving through the disruption provides cover. Juno's network has contacts near the eastern district. A different kind of welcome.

4. **Hollow Children crossover**: If Hollow Children data was shared in the ward (not sold), the Hollow Children's tunnel network may connect to the Choir's eastern district. Kira contact possible.

### Character Continuity

- **Sabel (Masked Heir)**: Should join the Red Choir investigation if `sabel_alliance_possible` is set. Their mark piece resonates differently with the Choir frequency than the player's mark does.
- **Mira**: If saved (`mira_saved_from_orchid_clinic`), her partial neural entrainment to the mark makes the Choir's frequencies physically affect her in a unique way — different from the player, different from other resonants. This should surface early in Chapter 6.
- **Cain**: If `cain_refused_glass_court_deal`, his tactical assessment of the Choir's territory is an early asset. If `cain_made_political_bargain`, the Glass Court now knows his capabilities — there may be contact.
- **Juno**: If the revolt route was taken, Juno's network is active in the Glass Tower district but may be able to provide information about the eastern corridor.

### Unresolved Threads from Chapter 5

- **Lord Cael Orison**: His position in the Glass Court after any of the major endings is unresolved. If the alliance was sealed, he remains. If the revolt succeeded or the massacre ended, he survived and will appear again.
- **Lot Seventeen**: The woman from the Western tunnels in the Auction Hall — her fate is unresolved in many routes. The Red Choir's territory includes the western district. She may be findable.
- **The Pale Curator**: If their deal was refused, they remain at large in the city with documentation of 143 marked individuals. They may surface in Chapter 6 with new context.
- **Dessa and the freed resonants**: Eight people who walked out of the ward are now in the city. Their lattice connections should create narrative opportunities in Chapter 6.
- **The Velna Identity**: The Forgotten Scholar route reveals Velna's name and the fact that the player was a subject in her pre-collapse research program. Chapter 6 should introduce people who knew Velna — the Red Choir's founder may be one of them.

---

*Chapter 5 Summary generated for internal development use.*  
*Next chapter: Chapter 6 — The Red Choir*  
*Connection flags: chapter5_complete, discovered_blackout_was_planned, lattice_network_known*
