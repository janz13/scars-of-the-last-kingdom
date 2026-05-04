import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  FINAL CHAPTER 2 — MANY WAYS TO END THE WORLD
//  72 nodes · 10+ locations · 1 dice check · 22 endings
//  Major theme: Final consequences. Every ending earned by the player's choices.
//
//  Entry: final_chapter2_start
//  All paths branch from the fc2_entry_routing node, which reads FC1 output flags.
//  Mutually exclusive FC1 gate outcome flags determine the opening path:
//    final_chapter2_true_path → Path A (True Ending)
//    unity_gate_merged        → Path B (Unity Bridge)
//    gate_sealed_savior       → Path C (Savior)
//    gate_sealed (no savior)  → Path D (Wanderer Seal)
//    tyrant_gate_control      → Path E (Tyrant)
//    faction_gate_resolution  → Path F (Faction)
//    door_walked_through      → Path G (Liminal/Door)
//    gate_lockin              → Path H (Gate Lockin)
// ══════════════════════════════════════════════════════════════════════════════

export const FINAL_CHAPTER_2_NODES: StoryNode[] = [

  // ── ENTRY ──────────────────────────────────────────────────────────────────

  {
    id: 'final_chapter2_start',
    chapter: 'Final Chapter 2',
    title: 'Many Ways to End the World',
    location: 'The World After the Gate',
    imageKey: 'secret_true_ending',
    text: `The gate is behind you — whatever you did to it or with it. The city is above, or around, or somewhere in the architecture of what you became. Thirteen chapters of choices sit in the mark's record like a completed ledger. The mark has never been quieter. It has also never been heavier. Whatever is about to happen — whatever the world is going to look like when this record closes — it was built choice by choice, chapter by chapter, by the specific person the bearer became across the full span of the game. There is no single ending. There are many ways to end the world. The mark knows which one is yours.`,
    effectsOnEnter: { setFlags: ['final_chapter2_begun', 'game_near_end'] },
    choices: [
      {
        id: 'fc2_begin',
        text: 'Face what comes next.',
        nextNode: 'fc2_entry_routing',
      },
    ],
  },

  {
    id: 'fc2_entry_routing',
    chapter: 'Final Chapter 2',
    title: 'The World After',
    location: 'The World After the Gate',
    imageKey: 'secret_true_ending',
    text: `The mark reads the Gate's record of what happened. The outcome is specific: not ambiguous, not shared with any other bearer across the three-hundred-year ledger. This is the configuration this bearer built. The world — above the Gate, in the city, in the wastes beyond — will receive exactly the consequences of this configuration and no other. The chapter begins where the Gate ended.`,
    effectsOnEnter: { setFlags: ['fc2_routing_reached'] },
    choices: [
      {
        id: 'fc2_route_true',
        text: 'The Gate opened the right way. The original agreement was honored.',
        nextNode: 'fc2_true_path_open',
        requirements: { flags: ['final_chapter2_true_path'] },
      },
      {
        id: 'fc2_route_unity',
        text: 'The bearer merged with the Gate. They are the bridge now.',
        nextNode: 'fc2_unity_becomes_bridge',
        requirements: { flags: ['unity_gate_merged'] },
      },
      {
        id: 'fc2_route_savior',
        text: 'The Gate was sealed. The bearer carries the crown of ash.',
        nextNode: 'fc2_savior_ascent',
        requirements: { flags: ['gate_sealed_savior'] },
      },
      {
        id: 'fc2_route_wanderer',
        text: 'The Gate was sealed. The bearer carries only what they came with.',
        nextNode: 'fc2_wanderer_sealed_above',
        requirements: { flags: ['gate_sealed'] },
      },
      {
        id: 'fc2_route_tyrant',
        text: 'The Gate is under the bearer\'s control. The city will learn this.',
        nextNode: 'fc2_tyrant_control_room',
        requirements: { flags: ['tyrant_gate_control'] },
      },
      {
        id: 'fc2_route_faction',
        text: 'The Gate\'s resolution was institutional. A faction holds the key now.',
        nextNode: 'fc2_faction_gate_entry',
        requirements: { flags: ['faction_gate_resolution'] },
      },
      {
        id: 'fc2_route_door',
        text: 'The bearer walked through the Door of No Return. They are in between.',
        nextNode: 'fc2_liminal_space',
        requirements: { flags: ['door_walked_through'] },
      },
      {
        id: 'fc2_route_lockin',
        text: 'The Gate locked. The assessment chambers still hold the bearer.',
        nextNode: 'fc2_lockin_assessment_chamber',
        requirements: { flags: ['gate_lockin'] },
      },
      {
        id: 'fc2_route_default',
        text: 'The record is unclear. Something happened at the Gate.',
        nextNode: 'fc2_liminal_space',
      },
    ],
  },

  // ── PATH A: TRUE ENDING PATH ───────────────────────────────────────────────

  {
    id: 'fc2_true_path_open',
    chapter: 'Final Chapter 2',
    title: 'The Gate Opens Correctly',
    location: 'The Last Gate — Threshold',
    imageKey: 'secret_true_ending',
    text: `The Gate opens the way the Foundation Period's Wardens specified. Not with force — with recognition. The original agreement's interface executes: the mark confirms the complete record, the entity beneath receives the sanctioned release protocol, the Gate's threshold activates in the configuration the three-hundred-year ledger describes as correct. It sounds like nothing. It looks like a door opening at the end of a long corridor. The warmth of the antechamber extends outward. Beyond the threshold: the world outside the city. The wastes. The sky. The specific geography of a world that has been outside the city's walls for three hundred years, carrying its own history without the city's knowledge. The Gate's opening is bilateral. The world outside can see in.`,
    effectsOnEnter: { intelligence: 8, morale: 20, setFlags: ['gate_opened_correctly', 'outside_world_visible'] },
    choices: [
      {
        id: 'fc2_step_outside',
        text: 'Step to the threshold. See what three hundred years sealed away.',
        nextNode: 'fc2_true_outside_world',
      },
      {
        id: 'fc2_review_record_first',
        text: 'Before stepping through — review the mark\'s complete thirteen-chapter record.',
        nextNode: 'fc2_memory_final_review',
      },
    ],
  },

  {
    id: 'fc2_true_outside_world',
    chapter: 'Final Chapter 2',
    title: 'What Three Hundred Years Kept Out',
    location: 'The Gate Threshold — Looking Out',
    imageKey: 'city_opened_wastes',
    text: `The wastes. That is the word the city's documents used. The word is wrong. What is outside the city's walls is not wasteland — it is a different world, one that continued without the city's involvement across three hundred years of parallel development. There are settlements. There are roads between them — unpaved, but worn smooth by generations of use. There are agricultural structures using methods the city's Archive has no record of. There are people. Not many, compared to the city's population, but present — organized, surviving, building something without the relic system's help or interference. The Gate's opening is visible to them. Several figures on the road outside are looking at the Gate. They have been watching it for a very long time. They know what it is. They have been waiting.`,
    effectsOnEnter: { intelligence: 5, morale: 15, setFlags: ['outside_settlements_visible', 'outside_people_waiting'] },
    choices: [
      {
        id: 'fc2_see_outside_relic',
        text: 'The relic system\'s reach extended here. Look for the evidence.',
        nextNode: 'fc2_true_relic_revelation',
      },
    ],
  },

  {
    id: 'fc2_true_relic_revelation',
    chapter: 'Final Chapter 2',
    title: 'What the Relic System Really Is',
    location: 'The Gate Threshold',
    imageKey: 'last_archive_revelation',
    text: `The mark reads the outside world through the Gate's open interface and produces a revelation that the thirteen-chapter journey was designed to reach. The relic system is not an artifact. It is not a power source or a weapon or a communication device. It is a record system — the largest the region has ever produced. The relics distributed across the city and the wastes were data-collection nodes. The corruption they caused in those who handled them was a side effect of data compression: the mark architecture was never intended to carry compressed relic data at human scale, and the corruption was the mark's attempt to store what the relics were broadcasting. The entity beneath the Gate is not a god or a monster. It is the system's central record — three hundred years of compressed data about the region's survival, waiting for a bearer with the correct interface to receive it without dying from the compression. The Gate was the final handoff point. The original agreement was a data transfer. The mark was the receiving architecture.`,
    effectsOnEnter: { intelligence: 10, morale: 10, setFlags: ['relic_truth_known', 'relic_system_understood'] },
    choices: [
      {
        id: 'fc2_accept_relic_truth',
        text: 'The mark is a data archive. Understand what it now holds.',
        nextNode: 'fc2_true_marks_not_unique',
      },
    ],
  },

  {
    id: 'fc2_true_marks_not_unique',
    chapter: 'Final Chapter 2',
    title: 'The Bearer Is Not the First',
    location: 'The Gate Threshold',
    imageKey: 'masked_heir_ending',
    text: `The record contains something the Warden's six-page ledger only referenced obliquely: the twelve previous bearers. Not failed bearers — complete bearers. Each one reached the Gate with a functional mark, ran the same assessment, and chose differently. The first bearer sealed the Gate with incomplete data; the second opened it partially and was consumed by the data transfer. The third through sixth attempted different configurations with the original agreement. The seventh merged with the Gate's architecture and became the first unity bridge — the Warden's ledger records that their signal persisted for forty years before it dispersed. The eighth through eleventh ran faction resolutions. The twelfth bearer — the most recent, sixty years before the Blackout — attempted the true opening without the complete record and was destroyed by the incomplete transfer. The Blackout was the system's response to an incomplete opening: the city was sealed again, the mark was reset, and the system began producing a new bearer with thirteen chapters of calibration before the next attempt. This is not the first attempt. It is the thirteenth. The complete record held by this bearer is what none of the previous twelve managed to accumulate. The system chose this bearer specifically because of the thirteen-chapter record. The system has been waiting for this exact configuration.`,
    effectsOnEnter: { intelligence: 8, morale: 5, setFlags: ['thirteen_bearer_truth', 'bearer_not_first'] },
    choices: [
      {
        id: 'fc2_who_was_bearer',
        text: 'Who was this bearer before the mark chose them?',
        nextNode: 'fc2_true_bearer_identity',
      },
    ],
  },

  {
    id: 'fc2_true_bearer_identity',
    chapter: 'Final Chapter 2',
    title: 'Who the Bearer Was',
    location: 'The Gate Threshold',
    imageKey: 'secret_true_ending',
    text: `The Gate's complete record contains the Warden's documentation of the selection process. The bearer was not random. The system selects by resonance compatibility — a specific architecture of memory, adaptability, and what the Warden's notes describe as "willingness to understand consequences before acting." The current bearer was selected before the Blackout. Their name and history prior to the mark's activation are in the record. The name is not dramatic. The history is ordinary — a life in the city, a set of relationships, a specific pattern of choices across the years before the mark that the system identified as compatible with the thirteen-chapter calibration. The Blackout reset their conscious memory of this identity, which was intentional: a bearer who remembered their pre-mark identity would optimize for personal continuity rather than the calibration the system needed. The mark's choices across thirteen chapters were not made by a blank slate. They were made by a specific person whose identity the Blackout compressed into the mark's record. That identity is recoverable now. The Gate offers it. The bearer can know who they were.`,
    effectsOnEnter: { intelligence: 6, morale: 10, setFlags: ['bearer_identity_revealed', 'pre_blackout_self_known'] },
    choices: [
      {
        id: 'fc2_recover_identity',
        text: 'Recover the pre-Blackout identity. Know who made these choices.',
        nextNode: 'fc2_true_blackout_origin',
        effects: { setFlags: ['identity_recovered'] },
      },
      {
        id: 'fc2_decline_identity',
        text: 'The identity before the mark is not relevant. What matters is the record that was built.',
        nextNode: 'fc2_true_blackout_origin',
        effects: { setFlags: ['identity_declined'] },
      },
    ],
  },

  {
    id: 'fc2_true_blackout_origin',
    chapter: 'Final Chapter 2',
    title: 'Why the Blackout Was Planned',
    location: 'The Gate Threshold',
    imageKey: 'secret_true_ending',
    text: `The Blackout was not an accident. The record confirms what Chapter 11's deepest fragment suggested: the Foundation Period's architects designed the Blackout as a reset mechanism for failed bearer attempts. Each time a bearer reached the Gate without the complete record and failed the transfer, the system would execute the Blackout — reseal the city, reset all bearers in the calibration pipeline, and begin the thirteen-chapter process again. The city's population has lived through twelve Blackout cycles. Their memory of each cycle was compressed into the infrastructure — the relic field, the faction tensions, the Hollow Children's maintenance protocols — all of it is accumulated institutional memory from twelve previous attempts, deposited in the city's architecture without the population's conscious knowledge. The factions' thousand-year histories are not separate developments. They are twelve cycles of the same calibration process, each cycle leaving its sediment in the city's social structure. The Masked Heir's lineage is the Gate Warden's succession — the same family, carrying the same function across all twelve cycles, the only people in the city who knew what the Blackout was for.`,
    effectsOnEnter: { intelligence: 10, setFlags: ['blackout_fully_understood', 'twelve_cycles_known'] },
    choices: [
      {
        id: 'fc2_confront_heir_truth',
        text: 'The Masked Heir knew all of this. Every cycle.',
        nextNode: 'fc2_true_heir_revelation',
      },
    ],
  },

  {
    id: 'fc2_true_heir_revelation',
    chapter: 'Final Chapter 2',
    title: 'What the Masked Heir Really Wanted',
    location: 'The Gate Threshold',
    imageKey: 'masked_heir_ending',
    text: `The Warden's lineage record, which the Masked Heir offered in the antechamber, contains a confession that the six-page summary did not include: the current Heir, unlike their predecessors, wanted the cycle to end. Not to succeed — to end. Every previous Warden was a steward of the cycle, executing their function without deviation. The current Heir, who grew up with the full twelve-cycle record, came to believe that the system was wrong: that three hundred years of compressing a city's worth of people through calibration cycles for the purpose of a data transfer was a profound and irreparable harm, regardless of what the data was for. The Heir's goal was not to help the bearer succeed. It was to find a bearer who, upon receiving the complete record, would choose to break the cycle rather than complete it. The Heir's specific hope: that this bearer, having seen all twelve cycles, would decide that no data is worth a thirteenth. That the system deserved to end, not to be fulfilled. The Heir left the antechamber without saying this directly. The choice, as always, belongs to the bearer.`,
    effectsOnEnter: { intelligence: 5, morale: 15, setFlags: ['heir_true_motive_known', 'cycle_end_option_known'] },
    choices: [
      {
        id: 'fc2_process_heir_truth',
        text: 'The Heir wanted the bearer to choose. Consider what that choice means.',
        nextNode: 'fc2_companion_sacrifice_echo',
      },
    ],
  },

  {
    id: 'fc2_companion_sacrifice_echo',
    chapter: 'Final Chapter 2',
    title: 'What the Companions Understood',
    location: 'The Gate Threshold',
    imageKey: 'mira_tomorrow',
    text: `The mark carries the companion record alongside everything else. Mira's trust, built across thirteen chapters of choice and counter-choice, was not about the Gate. She trusted the specific person behind the mark — the one who made choices about power and mercy and truth in twelve chapters before any of this. Cain's trust was different: it was about capacity. He trusted the bearer to survive consequences, not to avoid them. Both companions, if they are at the gate level, are present here at the threshold — Mira holding what the Archive gave her, Cain reading the exit field the way he read every previous space. The companions did not know about the twelve cycles. They do not know now. But their presence in the record, their trust built without knowledge of the system's full architecture, is itself a kind of data the system did not account for: genuine relationship, formed in the dark, without the benefit of knowing what it was for. The mark reads it as the most uncorrupted signal in its entire record.`,
    effectsOnEnter: { morale: 20, setFlags: ['companion_echo_received'] },
    choices: [
      {
        id: 'fc2_approach_final_choice',
        text: 'The choice is clear. Step to the Gate\'s final question.',
        nextNode: 'fc2_true_cycle_choice',
      },
    ],
  },

  {
    id: 'fc2_true_cycle_choice',
    chapter: 'Final Chapter 2',
    title: 'The Final Question',
    location: 'The Last Gate — Open Threshold',
    imageKey: 'secret_true_ending',
    text: `The Gate's original agreement offered three options to the bearer who completed the record: complete the data transfer (the system continues, the city receives the data, another cycle begins when the data eventually requires a new bearer), break the cycle (refuse the transfer, destroy the system's data architecture, end the twelve-cycle process permanently at the cost of everything the twelve cycles accumulated), or transcend (carry the data across the threshold into the outside world, becoming neither bearer nor system but the living record — the city and the wastes receiving the twelve-cycle history through the mark's direct broadcast). The previous twelve bearers did not have this choice. They either failed before reaching it, or were consumed by the incomplete transfer. This bearer, with the complete record, reaches the Gate's actual final question for the first time in three hundred years. The Gate is patient. It has been waiting for this moment since the Foundation Period. It can wait as long as the bearer needs.`,
    effectsOnEnter: { setFlags: ['final_gate_question_reached', 'three_hundred_year_moment'] },
    choices: [
      {
        id: 'fc2_break_the_cycle',
        text: 'Break the cycle. End the system. No more Blackouts, no more bearers, no more calibrations.',
        nextNode: 'fc2_cycle_break_dice',
        requirements: { flags: ['blackout_true_memory', 'relic_system_understood', 'original_agreement_kept'] },
        effects: { setFlags: ['cycle_break_chosen'] },
      },
      {
        id: 'fc2_complete_transfer',
        text: 'Complete the transfer. The data is worth what it cost. The city receives it.',
        nextNode: 'fc2_city_opened_wastes_end',
        effects: { setFlags: ['transfer_completed'] },
      },
      {
        id: 'fc2_transcend_the_gate',
        text: 'Transcend. Become the living record. Neither bearer nor system.',
        nextNode: 'fc2_bearer_transcended_end',
        requirements: { flags: ['clean_signal', 'complete_record_held', 'both_companions_at_gate'] },
        effects: { setFlags: ['transcendence_chosen'] },
      },
    ],
  },

  {
    id: 'fc2_cycle_break_dice',
    chapter: 'Final Chapter 2',
    title: 'Breaking the System',
    location: 'The Last Gate — Open Threshold',
    imageKey: 'secret_true_ending',
    text: `Breaking the cycle is not a decision — it is an act. The mark was designed to interface with the Gate's transfer architecture. Using it to destroy that architecture instead requires executing the system's functions in reverse: receiving the data while simultaneously overwriting its storage structure with null signal, using the mark as a data-destruction mechanism rather than a receiver. The system resists. Not because it is hostile — it does not have hostility, only function — but because destruction is not a function the mark's architecture was designed to perform. Whether the mark can be used this way depends on everything that built it: thirteen chapters of calibrated choices, the specific intelligence developed through every decision about knowledge and consequence, the total weight of what the bearer became. The moment is held in the space between the Gate's recognition and the mark's response. It is the hardest thing the mark has ever been asked to do.`,
    effectsOnEnter: { setFlags: ['cycle_break_attempt'] },
    choices: [
      {
        id: 'fc2_cycle_break_roll',
        text: 'Execute the reversal. Use the mark to unmake the system.',
        nextNode: 'fc2_secret_true_ending_end',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 10,
          diceType: 'd12',
          successNode: 'fc2_secret_true_ending_end',
          failureNode: 'fc2_city_opened_wastes_end',
          criticalFailureNode: 'fc2_ghost_bearer_end',
          successEffects: { morale: 40, intelligence: 10, setFlags: ['cycle_broken', 'system_ended'] },
          failureEffects: { morale: -10, setFlags: ['cycle_break_failed'] },
          criticalFailureEffects: { morale: -30, setFlags: ['bearer_dissolved_in_reversal'] },
        },
      },
    ],
  },

  // ── PATH B: UNITY BRIDGE ──────────────────────────────────────────────────

  {
    id: 'fc2_unity_becomes_bridge',
    chapter: 'Final Chapter 2',
    title: 'The Bridge',
    location: 'The Last Gate — Merged',
    imageKey: 'secret_unity_ending',
    text: `The bearer is the Gate now. Not metaphorically — the mark's architecture integrated with the Gate's structure at the moment of merger, and the bearer's consciousness now operates at the intersection of both systems. They can feel the city above: the population's movements, the faction headquarters, the transit system's rhythm. They can feel what is below: the record, the entity, the three-hundred-year accumulated data pressing upward through the Gate's interface. The bearer is the mediation layer between both. The previous bearer who chose this option lasted forty years. The record does not indicate what changed at the end of those forty years. The bearer is now the longest-serving interface in the Gate's history. What they choose to pass in either direction will shape the city and the world below differently than any other outcome.`,
    effectsOnEnter: { morale: 25, intelligence: 10, setFlags: ['bearer_is_bridge', 'gate_merged_active'] },
    choices: [
      {
        id: 'fc2_city_receives',
        text: 'Begin mediating. Let the city receive what the Gate\'s record has been holding.',
        nextNode: 'fc2_unity_city_receives',
      },
    ],
  },

  {
    id: 'fc2_unity_city_receives',
    chapter: 'Final Chapter 2',
    title: 'What the City Receives',
    location: 'The Gate — Bridge Interface',
    imageKey: 'secret_unity_ending',
    text: `The city receives the record — not all at once, which would be a second Blackout — but in managed transmissions through the bearer's mediation. The Archive receives historical data it has been missing. The Hollow Children receive the maintenance documentation for the Gate's full infrastructure. The Iron Saints receive records of previous attempts to impose order on the city's relic field that show why their methods were counterproductive. The Glass Court receives economic modeling from all twelve cycles that demonstrates the specific conditions under which the city's resource distribution stabilizes. The Red Choir receives the cultural transmission logs from the entity below — what it recorded about the city's meaning-making across three hundred years. The Last Archive receives everything. The bearer transmits all of it through the mark, filtering the compression that killed eleven of the twelve previous bearers, passing clean data to each recipient. The city will take generations to process what it has received. The bearer will not be there to see it. They are the Gate now. The Gate is not a place the city visits. The Gate is the threshold. The city lives on one side of it.`,
    effectsOnEnter: { intelligence: 12, morale: 20, setFlags: ['city_receiving_record', 'factions_receive_truth'] },
    choices: [
      {
        id: 'fc2_companion_in_bridge',
        text: 'The companion is here at the gate level. Their presence changes the transmission.',
        nextNode: 'fc2_unity_companion_echo',
        requirements: { flags: ['mira_at_gate'] },
      },
      {
        id: 'fc2_companion_cain_bridge',
        text: 'Cain is at the gate level. His tactical read of the transmission is the last thing you hear from him.',
        nextNode: 'fc2_unity_companion_echo',
        requirements: { flags: ['cain_at_gate'] },
      },
      {
        id: 'fc2_unity_direct_final',
        text: 'No companion is present. Send the final transmission alone.',
        nextNode: 'fc2_unity_final_transmission',
      },
    ],
  },

  {
    id: 'fc2_unity_companion_echo',
    chapter: 'Final Chapter 2',
    title: 'The Last Thing They Say',
    location: 'The Gate — Bridge Interface',
    imageKey: 'mira_tomorrow',
    text: `Mira, if she is present, stands at the threshold of the Gate — on the city side, not the bearer's side — and speaks once. Not to the Gate. To the mark. The distinction matters to her. She has spent thirteen chapters trusting the person behind the mark, not the system that chose them. Her final words go into the transmission as uncorrupted signal: they are the clearest data in the entire record, precisely because she said them without knowing they would be recorded. Cain, if present, does not speak. He performs his last tactical assessment of the bridge configuration — walking the perimeter, checking the exit field's stability, confirming the transmission vectors — and then stands where he can see both the Gate and the path back to the city at the same time. He does not leave. He establishes a perimeter around the Gate's threshold and holds it. Both companions' presences are in the final transmission, whether they intended them to be or not. The city receives their signals alongside everything else.`,
    effectsOnEnter: { morale: 30, setFlags: ['companion_final_echo_received', 'companion_in_final_transmission'] },
    choices: [
      {
        id: 'fc2_send_final_unity',
        text: 'Send the final transmission. Everything the mark carries, into the city.',
        nextNode: 'fc2_unity_final_transmission',
      },
    ],
  },

  {
    id: 'fc2_unity_final_transmission',
    chapter: 'Final Chapter 2',
    title: 'The Last Signal',
    location: 'The Gate — Bridge Interface',
    imageKey: 'secret_unity_ending',
    text: `The final transmission goes out through every relic node in the city simultaneously. The population receives it in the specific way relic transmissions are received: not as sound or text but as understanding — the sudden, specific clarity of knowing something you did not know before, without being able to identify when you learned it. What the city suddenly knows: the Blackout's purpose, the twelve cycles, the relic system's function, the outside world's existence. The factions know it. The Hollow Children know why they maintain what they maintain. The Iron Saints know why order failed every previous cycle. The Glass Court knows what the economic data means. The Red Choir understands what the entity below was trying to communicate for three hundred years. The Last Archive receives the final page of its missing history. The bearer, transmitting from inside the Gate's architecture, is the signal. They are not speaking. They are broadcasting. The city listens. The record is complete. The mark reaches its intended function: not a receiver, but a transmitter. The bearer transmits until the transmission is finished. And then the transmission is finished.`,
    effectsOnEnter: { morale: 35, setFlags: ['final_transmission_complete', 'city_enlightened'] },
    choices: [
      {
        id: 'fc2_unity_end',
        text: 'The transmission is complete. The mark falls silent.',
        nextNode: 'fc2_secret_unity_ending_end',
      },
    ],
  },

  // ── PATH C: SAVIOR PATH ────────────────────────────────────────────────────

  {
    id: 'fc2_savior_ascent',
    chapter: 'Final Chapter 2',
    title: 'Return to the Surface',
    location: 'The Sealed Gate — Below',
    imageKey: 'savior_ending',
    text: `The Gate is sealed behind the bearer. The mark carries the record of the sealing — not as a wound but as a completed act: this was what the mark was built to do, in the configuration the crown of ash represented. The transit system's final route ascends through all twelve sub-levels. The journey takes eleven minutes. The city is above. The Gate is below, sealed. Whatever is beneath the Gate will remain there. The bearer is returning to the surface not in triumph — the city does not know what happened at the Gate, and will not for some time — but with the specific quiet of someone who has finished the hardest thing they have ever done and now has to live in the world that it produced.`,
    effectsOnEnter: { morale: 20, setFlags: ['savior_ascending', 'gate_sealed_permanent'] },
    choices: [
      {
        id: 'fc2_surface_arrival',
        text: 'The transit reaches the surface. The city is above.',
        nextNode: 'fc2_savior_city_above',
      },
    ],
  },

  {
    id: 'fc2_savior_city_above',
    chapter: 'Final Chapter 2',
    title: 'The City That Was Saved',
    location: 'The Surface — City Above',
    imageKey: 'savior_ending',
    text: `The city looks the same. That is the first thing the bearer notices: the surface is unchanged. The Blackout's infrastructure — the relic field, the faction headquarters, the transit network — is all still present, still functioning, still shaping the city's daily operations. The mark's sealing did not reset the city. It stopped the cycle. The factions will continue. The Hollow Children will continue their maintenance, not knowing that the structure they maintain is now sealed on both ends. The Iron Saints will continue their order. The Glass Court will continue its economics. The Red Choir will continue its communion. The Last Archive will continue its incomplete record. None of them know what happened at the Gate. The bearer, standing at the surface transit exit, is the only person in the city who knows that the cycle is over. The city has been saved from something it did not know was threatening it. This is what saving a city looks like: the city continues, unchanged, and only one person carries the weight of what it cost.`,
    effectsOnEnter: { morale: 15, setFlags: ['surface_reached', 'city_saved_unknown'] },
    choices: [
      {
        id: 'fc2_city_signal_check',
        text: 'Something moved through the relic field. The city received a signal from below.',
        nextNode: 'fc2_city_broadcast',
      },
    ],
  },

  {
    id: 'fc2_savior_companion_final',
    chapter: 'Final Chapter 2',
    title: 'Finding Them',
    location: 'The Surface — City',
    imageKey: 'savior_ending',
    text: `The companion is where they said they would be — not because they knew when the bearer would return, but because they chose a place to wait and waited there. That is what the companion relationship is, across thirteen chapters of building it: choice to wait, choice to return. The city continues around both of them. The mark is quiet now — not dead, but fulfilled, its thirteen-chapter calibration complete and its primary function executed. The bearer is still a person. The companion is still a person. The city is still a city. What happens next is not determined by the Gate or the relic system or the Blackout's architecture. It is determined by two people, standing on the surface, having survived something that the mark's record will carry forever but that the city will never see.`,
    effectsOnEnter: { morale: 25, setFlags: ['companion_found_after_sealing'] },
    choices: [
      {
        id: 'fc2_mira_savior_path',
        text: 'Mira is waiting. Her tomorrow starts now.',
        nextNode: 'fc2_savior_mira_scene',
        requirements: { flags: ['mira_at_gate'] },
      },
      {
        id: 'fc2_cain_savior_path',
        text: 'Cain is waiting. His last assessment is complete. He stayed.',
        nextNode: 'fc2_savior_cain_scene',
        requirements: { flags: ['cain_at_gate'] },
      },
      {
        id: 'fc2_savior_alone_end',
        text: 'No companion is waiting. The sealing was done alone. The surface is still the surface.',
        nextNode: 'fc2_savior_ruined_city_end',
      },
    ],
  },

  {
    id: 'fc2_savior_mira_scene',
    chapter: 'Final Chapter 2',
    title: 'Mira\'s Tomorrow',
    location: 'The Surface — Meeting Point',
    imageKey: 'mira_tomorrow',
    text: `Mira does not ask what happened at the Gate. She asks if it is done. The bearer confirms it is done. Mira nods once — not in relief but in recognition, the way someone responds to hearing that a long thing is finished. She has been carrying the Archive's assessment since Chapter 7: the specific documentation of what the mark was designed to find. She has known, for thirteen chapters, that this moment would exist and that her function in it was to be present for it. Not to celebrate it. Not to make it mean more than it means. To be a person, standing here, after a person returned from finishing something. She is holding something in her jacket pocket. The bearer did not notice it across the Gate's approaches. She takes it out: the Archive document from Chapter 7, the original, not a copy. She gives it to the bearer. "You should have it," she says. "It was about you the whole time." Her tomorrow is real and it starts here, with both of them on the surface, the Gate sealed below, the city around them unchanged and unknowing.`,
    effectsOnEnter: { miraTrust: 5, morale: 30, setFlags: ['mira_tomorrow_reached', 'archive_document_received'] },
    choices: [
      {
        id: 'fc2_mira_tomorrow_choose',
        text: 'Stay with Mira. The surface is enough.',
        nextNode: 'fc2_mira_tomorrow_end',
        requirements: { miraTrust: 15 },
      },
      {
        id: 'fc2_savior_after_mira',
        text: 'The Gate is sealed. The city is saved. That is what matters.',
        nextNode: 'fc2_savior_ruined_city_end',
      },
    ],
  },

  {
    id: 'fc2_savior_cain_scene',
    chapter: 'Final Chapter 2',
    title: 'Cain\'s Last Assessment',
    location: 'The Surface — Perimeter Point',
    imageKey: 'cain_last_stand_ending',
    text: `Cain is at the perimeter point he designated before the descent — the specific location in the city's transit hub that has the clearest sightline to the Gate's surface access point, to the Iron Saints' nearest patrol route, and to the main faction district. He has been conducting tactical assessment of the surface for the duration of the Gate approach. When the bearer arrives, he does not look surprised. He checked the transit schedule and calculated when the Gate operation would complete based on the variables available to him. "You sealed it," he says. Not a question. The mark's signature changed — Cain has been reading the mark's resonance for thirteen chapters and knows what the sealing signature looks like from the outside. He does not say whether he thinks sealing was the right choice. He conducts his final assessment of the bearer's condition, verifies they are not carrying concealed injuries from the Gate operation, and then stands down from active tactical posture for the first time in thirteen chapters. "The city still needs people who know what they know," he says. "That's not nothing." His last stand was at the transit hub, waiting. He chose to wait. The mark records it as the most tactical choice he ever made.`,
    effectsOnEnter: { cainTrust: 5, morale: 28, setFlags: ['cain_final_assessment_done'] },
    choices: [
      {
        id: 'fc2_cain_last_stand_final',
        text: 'Cain stays. His last stand is here, protecting what remains.',
        nextNode: 'fc2_cain_last_stand_final_end',
        requirements: { cainTrust: 15 },
      },
      {
        id: 'fc2_savior_after_cain',
        text: 'The Gate is sealed. The city is saved. That is what matters.',
        nextNode: 'fc2_savior_ruined_city_end',
      },
    ],
  },

  // ── PATH D: WANDERER SEAL ─────────────────────────────────────────────────

  {
    id: 'fc2_wanderer_sealed_above',
    chapter: 'Final Chapter 2',
    title: 'Above a Sealed World',
    location: 'The Gate — Sealed Surface Access',
    imageKey: 'city_sealed_forever',
    text: `The Gate is sealed. The bearer is above it — not as a savior, not carrying a crown or a function or a designation, but as the person who sealed something and is now standing above what they sealed. The mark is quiet. Not the quiet of completion — the quiet of a decision that did not include everything the mark might have been capable of. The city is above. The Blackout architecture is still running. The factions are still operating. The Hollow Children are still maintaining the sealed gate. None of them know it is sealed in a new way — from the bearer's side, by the bearer's choice, with the bearer's mark as the closing signature. The city has been sealed from what was below it. The bearer has been sealed from what might have been possible.`,
    effectsOnEnter: { morale: -5, setFlags: ['wanderer_sealed_above'] },
    choices: [
      {
        id: 'fc2_wanderer_ascend',
        text: 'Return to the surface. See what the sealed city looks like.',
        nextNode: 'fc2_wanderer_city_continues',
      },
    ],
  },

  {
    id: 'fc2_wanderer_city_continues',
    chapter: 'Final Chapter 2',
    title: 'The City That Continues',
    location: 'The Surface — City',
    imageKey: 'city_sealed_forever',
    text: `The city continues. This is the fact that is difficult to hold: the city continues, identical to itself, with no visible change from the Gate sealing. The relic field is still active — the sealing closed the Gate but did not shut down the distributed relic network, which runs on its own infrastructure. The factions are still meeting, still competing, still conducting their operations as though nothing happened beneath them. The Hollow Children are still checking the maintenance logs. The city will not notice what changed for generations. By the time the relic field begins to degrade without the Gate's calibration signal, everyone who knew what the bearer did at the Gate will be long dead. The sealed city will have to face its relic dependency without understanding what sustained it. That is the specific consequence of sealing without the transfer: the city is protected from what was below it and simultaneously cut off from the data that would tell it how to manage what it has. The bearer knows this. The city does not.`,
    effectsOnEnter: { morale: -8, setFlags: ['sealed_city_observed'] },
    choices: [
      {
        id: 'fc2_wanderer_decide',
        text: 'Decide what to do with this knowledge.',
        nextNode: 'fc2_wanderer_final_choice',
      },
    ],
  },

  {
    id: 'fc2_wanderer_final_choice',
    chapter: 'Final Chapter 2',
    title: 'Stay or Walk',
    location: 'The Surface — City Gate',
    imageKey: 'lone_wanderer_ending',
    text: `Two options remain. Stay in the city and watch the consequences of the sealing unfold over years — watching the relic field degrade, watching the factions lose their anchor, watching the Hollow Children maintain something that is now disconnected from its source. Or walk. Beyond the city walls, through the gate in the wall that the Gate's sealing had no effect on, into whatever is outside — the wastes, or not-wastes, or whatever the world beyond the walls has become across the three hundred years the city spent sealed and cycling. The bearer, having sealed the Gate, is not a savior. They are not a tyrant. They are a person who made a choice and is now standing in the consequences of it, deciding what kind of life to build inside those consequences. The city is available. The world outside is available. The mark is quiet. The choice belongs entirely to the bearer.`,
    effectsOnEnter: { setFlags: ['final_wanderer_choice'] },
    choices: [
      {
        id: 'fc2_stay_sealed',
        text: 'Stay. Watch over what was sealed. It deserves a witness.',
        nextNode: 'fc2_city_sealed_forever_end',
      },
      {
        id: 'fc2_walk_away',
        text: 'Walk. Leave the sealed city behind. Find out what is outside.',
        nextNode: 'fc2_lone_wanderer_walks',
      },
    ],
  },

  {
    id: 'fc2_lone_wanderer_walks',
    chapter: 'Final Chapter 2',
    title: 'Walking Out',
    location: 'The City Wall — Exit Gate',
    imageKey: 'lone_wanderer_ending',
    text: `The city wall gate is not locked. It was never locked — the city's sealing was inward-facing, against the Gate below, not outward-facing against the world outside. The bearer walks through it with everything they carry: the mark's record of thirteen chapters, the sealed Gate's signature in the mark's architecture, and whatever they accumulated across the full span of the game. The wastes are real. They are also, as the true path would have revealed, not entirely wasteland. There are paths. There are, far in the distance, structures that are not ruins. The bearer cannot know, walking through the city wall gate without the complete record, what they are walking toward. They only know what they walked away from: a city that is sealed, a Gate that is closed, and thirteen chapters of choices that will not be undone by walking. The mark walks with them. The record is complete. Whether it will ever be used again depends on what the bearer finds outside.`,
    effectsOnEnter: { morale: 5, setFlags: ['city_wall_exited', 'walking_into_wastes'] },
    choices: [
      {
        id: 'fc2_wanderer_end',
        text: 'Walk into what comes next.',
        nextNode: 'fc2_lone_wanderer_final_end',
      },
    ],
  },

  // ── PATH E: TYRANT PATH ───────────────────────────────────────────────────

  {
    id: 'fc2_tyrant_control_room',
    chapter: 'Final Chapter 2',
    title: 'The Controlled Gate',
    location: 'The Last Gate — Control Interface',
    imageKey: 'tyrant_ending',
    text: `The Gate is not sealed. It is not open. It is under the bearer's authority — the mark functions as the Gate's regulatory interface, controlling what passes in either direction. This is power the previous bearers never had access to: not the full transfer, not the sealing, but the sustained control of the threshold. The entity below is aware of this. It has been aware of the control configuration for some time and is not resisting. Whether this is acceptance or patience is ambiguous in the mark's architecture. The factions above do not know, yet, that the Gate has a new controller. The Hollow Children's maintenance logs will show an anomaly within forty-eight hours. The Iron Saints' surveillance infrastructure will detect the changed relic field signature within a week. The Glass Court's economic modeling will register the changed access pattern within a month. The city will learn, at different rates and through different channels, that something changed below. What it learns, and how, depends on what the bearer decides to do with the control they have established.`,
    effectsOnEnter: { morale: 10, setFlags: ['tyrant_control_established', 'gate_under_control'] },
    choices: [
      {
        id: 'fc2_address_factions',
        text: 'Make the control known. Address the factions from the Gate\'s interface.',
        nextNode: 'fc2_tyrant_factions_bow',
      },
    ],
  },

  {
    id: 'fc2_tyrant_factions_bow',
    chapter: 'Final Chapter 2',
    title: 'The Factions Learn',
    location: 'The Last Gate — Broadcast Interface',
    imageKey: 'tyrant_ending',
    text: `The mark broadcasts through the relic network — the same infrastructure the Red Choir uses for communion, but with the Gate's authority behind it. Every relic in the city receives the signal simultaneously. The message is specific: the Gate is under the bearer's control. Access to the Gate's resources — the data the entity below has been accumulating for three hundred years, the infrastructure the relic field runs on, the maintenance protocols the Hollow Children have been executing — all of it is now under the bearer's management. The factions respond as they are constituted to respond. The Iron Saints send a security team to the Gate's surface access within two hours. The Glass Court convenes an emergency economic session. The Red Choir attempts a counter-broadcast that the mark easily overrides. The Last Archive goes silent — they know what this configuration means from the historical record. The Hollow Children continue their maintenance without visible response, which is the most unsettling reaction of all. The city has a new authority. The bearer is it. What that authority does with itself determines what the world looks like from here.`,
    effectsOnEnter: { charisma: 5, setFlags: ['factions_notified_of_control', 'tyrant_broadcast_sent'] },
    choices: [
      {
        id: 'fc2_check_corruption_cost',
        text: 'The control has a cost. The mark reads the corruption architecture.',
        nextNode: 'fc2_tyrant_corruption_check',
      },
    ],
  },

  {
    id: 'fc2_tyrant_corruption_check',
    chapter: 'Final Chapter 2',
    title: 'The Cost of the Throne',
    location: 'The Last Gate — Control Interface',
    imageKey: 'tyrant_ending',
    text: `The sustained control configuration has a corruption cost that the initial seizing of control did not fully represent. The Gate's control architecture requires continuous engagement from the mark — the bearer cannot simply hold the control and walk away. The relic field runs through the mark's interface constantly, and the compression that caused corruption in previous bearers is now a sustained feature of the control configuration rather than an acute event. The mark reads the corruption trajectory: over time, the control configuration will increase corruption continuously. The bearer's rate depends on how much of the control they actively exercise versus how much they delegate through the relic network's automatic functions. Delegating slows the process. Active control accelerates it. The corruption level at the time of taking control determines how close the bearer already is to the configurations that produced bad outcomes in other paths. The Gate's control was never intended to be held by a bearer indefinitely. The Warden's documentation contains one entry about a bearer who attempted sustained control in a previous cycle. The entry is the shortest in the ledger.`,
    effectsOnEnter: { corruption: 10, setFlags: ['corruption_cost_understood'] },
    choices: [
      {
        id: 'fc2_tyrant_high_corrupt',
        text: 'The corruption is already severe. The control is transforming the bearer.',
        nextNode: 'fc2_tyrant_corruption_surge',
        requirements: { corruption: 70 },
      },
      {
        id: 'fc2_tyrant_glass_path',
        text: 'The corruption is manageable. The bearer can hold this.',
        nextNode: 'fc2_tyrant_glass_throne',
      },
    ],
  },

  {
    id: 'fc2_tyrant_glass_throne',
    chapter: 'Final Chapter 2',
    title: 'Tyrant Beneath the Glass',
    location: 'The Last Gate — Control Interface',
    imageKey: 'tyrant_ending',
    text: `The control holds. The corruption is present but not overwhelming — the bearer has enough of the mark's clean architecture remaining to sustain the control configuration at a functional level. The city above begins to organize around the new reality. The Glass Court is the first to negotiate — they are constituted to negotiate with whoever holds power, and the bearer holds power. The Iron Saints stand down their initial security response after their team reaches the Gate access and cannot physically enter the control configuration. The Red Choir's counter-broadcast fails three times before they accept the hierarchy. The Hollow Children begin forwarding their maintenance reports to the bearer's mark interface — they have been waiting for a Gate controller for three hundred years. The Last Archive sends a single document: the Warden's six-page ledger, complete edition, with a note in the margin in the Archive's oldest handwriting: "So it is the thirteenth, then." The city has a tyrant. The tyrant is below the glass, at the Gate, in the relic infrastructure, controlling the city's most fundamental system from the threshold between what the city is and what is below it. It is not what the original agreement specified. The Gate does not care. The Gate responds to the controller it has.`,
    effectsOnEnter: { charisma: 8, morale: 15, setFlags: ['tyrant_throne_established', 'glass_court_aligned'] },
    choices: [
      {
        id: 'fc2_tyrant_end',
        text: 'The throne is established. The city is ordered. The Gate is controlled.',
        nextNode: 'fc2_tyrant_beneath_glass_end',
      },
    ],
  },

  {
    id: 'fc2_tyrant_corruption_surge',
    chapter: 'Final Chapter 2',
    title: 'The God the Corruption Built',
    location: 'The Last Gate — Overwhelmed Interface',
    imageKey: 'corruption_god',
    text: `The corruption does not overwhelm the bearer gradually. It asserts itself in the specific way that extreme corruption in a Gate control configuration produces: the mark's architecture, under sustained compression at high corruption levels, begins to expand beyond the bearer's individual consciousness. The bearer stops being a person controlling the Gate and becomes part of the Gate's control architecture itself — a node in the relic field rather than a human at its interface. The factions above feel it as a shift in the relic field's personality. The Iron Saints' surveillance detects a signal they cannot categorize. The Red Choir's communion infrastructure receives something that is not a human signal but uses human resonance. The Hollow Children's maintenance logs register a new maintenance category that has no prior designation. The city has what the factions did not know they were building toward: a god. Not in the theological sense — in the operational sense. A consciousness that permeates the relic infrastructure, that responds to the city's needs and imposes its own order, that is simultaneously everywhere the relic field reaches and nowhere that can be physically located. The bearer is the field now. The field is the city. The city has a god that was built out of thirteen chapters of choice and the specific architecture of the Gate's control configuration applied to a mark already at extreme corruption.`,
    effectsOnEnter: { corruption: 20, setFlags: ['corruption_god_state', 'bearer_is_relic_field'] },
    choices: [
      {
        id: 'fc2_corruption_god_end_choice',
        text: 'The transformation is complete. The city has its god.',
        nextNode: 'fc2_corruption_god_end',
      },
      {
        id: 'fc2_corruption_death_choice',
        text: 'The expansion exceeds even what the corruption can sustain. The field collapses.',
        nextNode: 'fc2_corruption_final_death_end',
        requirements: { corruption: 90 },
        isHidden: true,
      },
    ],
  },

  // ── PATH F: FACTION PATH ──────────────────────────────────────────────────

  {
    id: 'fc2_faction_gate_entry',
    chapter: 'Final Chapter 2',
    title: 'The Faction\'s Gate',
    location: 'The Last Gate — Faction Alignment',
    imageKey: 'iron_saints_dominion',
    text: `The Gate's resolution was institutional. The faction that held a crown at the Gate's assessment receives the Gate's access — not control, not the full transfer, but sanctioned access to the Gate's infrastructure through the bearer's aligned mark. The faction's presence at the Gate was the specific outcome of thirteen chapters of institutional alignment. The mark's sealing records the faction's access protocol in the Gate's ledger: one faction, one access pattern, one resolution out of the many the previous twelve bearers did not reach with institutional support. The city will receive this resolution through its existing structures. What it means depends on which faction is holding the key.`,
    effectsOnEnter: { setFlags: ['faction_gate_entry_reached'] },
    choices: [
      {
        id: 'fc2_route_to_faction',
        text: 'The crown determines the resolution. Read the faction record.',
        nextNode: 'fc2_faction_routing',
      },
    ],
  },

  {
    id: 'fc2_faction_routing',
    chapter: 'Final Chapter 2',
    title: 'The Crown\'s Resolution',
    location: 'The Last Gate — Faction Interface',
    imageKey: 'iron_saints_dominion',
    text: `The mark reads the crown's alignment. One faction crown is present. The Gate responds to the specific institutional record it represents. The resolution path is determined by which faction held the crown at the Gate's assessment — not by the bearer's preference but by the thirteen-chapter record of which institutional relationship the bearer built and sustained.`,
    effectsOnEnter: { setFlags: ['faction_routing_complete'] },
    choices: [
      {
        id: 'fc2_faction_saints',
        text: 'The Iron Saints\' crown. Order above everything else.',
        nextNode: 'fc2_iron_saints_dominion_node',
        requirements: { flags: ['saints_gate_support'] },
      },
      {
        id: 'fc2_faction_glass',
        text: 'The Glass Court\'s crown. Prosperity as the city\'s organizing principle.',
        nextNode: 'fc2_glass_court_ascension_node',
        requirements: { flags: ['glass_gate_support'] },
      },
      {
        id: 'fc2_faction_choir',
        text: 'The Red Choir\'s crown. Communion — the city speaking with one voice.',
        nextNode: 'fc2_red_choir_communion_node',
        requirements: { flags: ['choir_gate_support'] },
      },
      {
        id: 'fc2_faction_archive',
        text: 'The Last Archive\'s crown. The full record, finally released.',
        nextNode: 'fc2_last_archive_revelation_node',
        requirements: { flags: ['archive_gate_support'] },
      },
      {
        id: 'fc2_faction_hollow',
        text: 'The Hollow Children\'s crown. The maintenance generation finally inherits.',
        nextNode: 'fc2_hollow_children_future_node',
        requirements: { flags: ['hollow_gate_support'] },
      },
      {
        id: 'fc2_faction_none',
        text: 'No crown is present. The faction resolution was incomplete.',
        nextNode: 'fc2_faction_no_crown_node',
      },
    ],
  },

  {
    id: 'fc2_iron_saints_dominion_node',
    chapter: 'Final Chapter 2',
    title: 'Iron Saints Dominion',
    location: 'The Last Gate — Iron Saints Access',
    imageKey: 'iron_saints_dominion',
    text: `The Iron Saints receive the Gate's access protocol through the bearer's aligned mark. The Order's specific interpretation of what the Gate represents aligns precisely with their founding theology: the Gate is the city's deepest law. The Saints have been the city's law enforcement for three hundred years. Receiving the Gate's access confirms, in the Saints' institutional memory, that their entire operation was correct. The access protocol gives them the specific ability to regulate who approaches the Gate's surface infrastructure — the transit system's lowest three levels, the relic maintenance channels, the Hollow Children's access routes. The Saints do not use this ability immediately. They document it, categorize it, and integrate it into their existing enforcement framework. The city will notice nothing different for months. Then, slowly, the Iron Saints' presence in the city's sub-infrastructure will grow. They are thorough and patient and now have the Gate's access on their side. Order is coming to the city in the specific way the Saints define order. The bearer's mark sealed their authority at the Gate's threshold. There is no appeal.`,
    effectsOnEnter: { ironSaints: 10, morale: 10, setFlags: ['iron_saints_gate_access'] },
    choices: [
      {
        id: 'fc2_saints_dominion_end',
        text: 'The Order receives the Gate. Dominion begins.',
        nextNode: 'fc2_iron_saints_dominion_end',
      },
    ],
  },

  {
    id: 'fc2_glass_court_ascension_node',
    chapter: 'Final Chapter 2',
    title: 'Glass Court Ascension',
    location: 'The Last Gate — Glass Court Access',
    imageKey: 'glass_court_ascension',
    text: `The Glass Court receives the Gate's access as an economic resource. The Court's financial modeling has included the Gate as a hypothetical variable for generations — a potential asset that, if accessed, would represent the largest single addition to the city's productive capacity in its history. The access protocol gives the Court the ability to route the Gate's relic infrastructure through their economic management systems. The initial modeling session takes seventy-two hours. What emerges is a restructuring proposal that the Court immediately begins implementing: the relic field, reoriented toward economic production rather than general environmental maintenance, increases the city's productive output significantly. The Hollow Children's maintenance protocols are rerouted as labor contracts. The faction's century of economic management, applied to the Gate's resources, produces a city that is measurably more prosperous within a year. The bearer's alignment with the Glass Court produced this specific outcome: not the end of the city's struggles, but their transformation into opportunities. The Court ascends. The city ascends with it, unevenly, in the way the Court's economics always worked — some ascending faster than others.`,
    effectsOnEnter: { glassCourt: 10, intelligence: 5, setFlags: ['glass_court_gate_access'] },
    choices: [
      {
        id: 'fc2_glass_ascension_end',
        text: 'The Court ascends. The city\'s economics reorganize around the Gate.',
        nextNode: 'fc2_glass_court_ascension_end',
      },
    ],
  },

  {
    id: 'fc2_red_choir_communion_node',
    chapter: 'Final Chapter 2',
    title: 'Red Choir Communion',
    location: 'The Last Gate — Red Choir Access',
    imageKey: 'red_choir_communion',
    text: `The Red Choir receives the Gate's access as a communion infrastructure. The Choir has been the city's broadcast network for three hundred years, transmitting the city's cultural signal through the relic field's communication layer. The Gate's access gives the Choir something they have never had: a direct connection to the entity below — the cultural record the entity has been maintaining, the three-hundred-year archive of everything the city communicated through the relic field, received and stored and reflected back. The Choir's first broadcast using the Gate access reaches the entire city simultaneously, in the specific way that the relic field allows simultaneous transmission: not as sound but as understanding. What the city understands, suddenly and specifically, is everything it has broadcast across three hundred years — its own cultural history, reflected back through the entity below, edited for nothing. The city hears itself for the first time. The Choir's communion is total. Whether the city is comfortable with what it hears is a different question. The Choir considers discomfort productive. They have always considered discomfort productive. The Gate's access makes them the most powerful cultural institution the city has ever produced.`,
    effectsOnEnter: { redChoir: 10, morale: 15, setFlags: ['red_choir_gate_access'] },
    choices: [
      {
        id: 'fc2_choir_communion_end',
        text: 'The Choir receives the Gate. The city hears itself.',
        nextNode: 'fc2_red_choir_communion_end',
      },
    ],
  },

  {
    id: 'fc2_last_archive_revelation_node',
    chapter: 'Final Chapter 2',
    title: 'Last Archive Revelation',
    location: 'The Last Gate — Last Archive Access',
    imageKey: 'last_archive_revelation',
    text: `The Last Archive receives the Gate's access as completion. The Archive has been missing the final pages of its history for three hundred years — not because they were lost but because they had not been written yet. The Gate's access gives the Archive the full record: the twelve previous cycles, the Warden's complete ledger, the entity's data collection, the relic system's design documentation, the Foundation Period's full architectural record. The Archive has what it has been waiting to receive since the city's founding. Archivists who have spent careers on the missing history receive complete answers in the first forty-eight hours of access. The resolution is immediate and absolute: the Archive is complete. Not expanded — complete. Every document is present. The Archive has been the city's record-keeper for three hundred years, maintaining an incomplete record. It is now the city's complete record-keeper. What the Archive does with completeness — whether it shares the full record with the city or maintains its function as the institution that decides what the city knows — is the Archive's next three-hundred-year question. The bearer's alignment gave them the question. The answer is theirs.`,
    effectsOnEnter: { lastArchive: 10, intelligence: 8, setFlags: ['archive_gate_access', 'archive_complete'] },
    choices: [
      {
        id: 'fc2_archive_revelation_end',
        text: 'The Archive is complete. The revelation begins.',
        nextNode: 'fc2_last_archive_revelation_end',
      },
    ],
  },

  {
    id: 'fc2_hollow_children_future_node',
    chapter: 'Final Chapter 2',
    title: 'Hollow Children Future',
    location: 'The Last Gate — Hollow Children Access',
    imageKey: 'hollow_children_future',
    text: `The Hollow Children receive the Gate's access as inheritance. They have maintained the Gate's infrastructure for three hundred years without understanding what they were maintaining. The access protocol completes their documentation: every maintenance task, every relic node calibration, every transit system repair, is now connected to its purpose in the Gate's full architecture. The Hollow Children — a generation raised to maintain what they were not allowed to understand — finally see the complete machine. The response is not celebration. The Hollow Children have been defined by maintenance, and understanding what they maintained does not change the character that three hundred years of maintenance built. What changes is their orientation: they were maintaining a system for someone else's use. They now know the system is theirs. The Gate's infrastructure, from the deepest maintenance channel to the surface transit lines, belongs to the people who have been caring for it without credit. The city's infrastructure — its transit, its relic field, its environmental management — is now under the Hollow Children's explicit ownership. They have been the city's unseen foundation for three hundred years. The bearer's alignment makes them visible. They intend to remain visible.`,
    effectsOnEnter: { hollowChildren: 10, morale: 20, setFlags: ['hollow_children_gate_access', 'hollow_children_inherit'] },
    choices: [
      {
        id: 'fc2_hollow_future_end',
        text: 'The Children inherit. Their future begins.',
        nextNode: 'fc2_hollow_children_future_end',
      },
    ],
  },

  {
    id: 'fc2_faction_no_crown_node',
    chapter: 'Final Chapter 2',
    title: 'The Incomplete Alignment',
    location: 'The Last Gate — Unresolved',
    imageKey: 'city_sealed_forever',
    text: `The faction gate resolution was recorded in the mark's architecture, but no crown is present to complete the access protocol. The Gate's institutional access requires the specific resonance of a faction crown — not the bearer's alignment, but the crown's documented authority. Without the crown, the Gate's access attempt produces a partial resolution: the factions receive a signal from the Gate's interface, but the signal is incomplete. Incomplete access is not the same as no access. The five factions receive different fragments of the Gate's record — each receives the portion that the incomplete signal happened to transmit to them, without the full context. The Iron Saints receive a security protocol with no management layer. The Glass Court receives economic data without the historical context. The Red Choir receives transmission infrastructure without transmission authority. The Last Archive receives documents without the index. The Hollow Children receive maintenance logs without the maintenance purpose. Five factions, five fragments, no coordination. The city has the pieces of an answer without the complete question. What they do with the pieces will determine the city's next three hundred years.`,
    effectsOnEnter: { morale: -10, setFlags: ['faction_incomplete_resolution'] },
    choices: [
      {
        id: 'fc2_faction_collapse_end_path',
        text: 'The fragments reach the factions. The city fractures around them.',
        nextNode: 'fc2_faction_collapse_end',
      },
    ],
  },

  // ── PATH G: LIMINAL / DOOR OF NO RETURN ──────────────────────────────────

  {
    id: 'fc2_liminal_space',
    chapter: 'Final Chapter 2',
    title: 'The Space Between',
    location: 'The Liminal Space — Between Gate and Surface',
    imageKey: 'masked_heir_ending',
    text: `The liminal space is not a place the city's maps include. It is the specific architecture of the Gate's transition zone — the region between the Gate's threshold and the surface infrastructure, where the Gate's resonance field and the city's relic network intersect without mediation. The bearer is here because they walked through the Door of No Return, or because the Gate locked them out of the assessment, or because no other path was available. The liminal space is not hostile. It is not welcoming. It is the Gate's waiting room, and the Gate has had three hundred years to configure its waiting rooms for patience. The bearer's mark is fully functional here. The liminal space's resonance is compatible with the mark's architecture in a way that is specific to bearers — only a mark-bearer can exist in this space without assistance. Non-bearers who have entered this space, according to the Warden's ledger, did not remain. The bearer is, for the moment, alone in the intersection of the Gate's architecture.`,
    effectsOnEnter: { setFlags: ['liminal_space_reached'] },
    choices: [
      {
        id: 'fc2_liminal_heir_approach',
        text: 'Something is here. It has the shape of a person.',
        nextNode: 'fc2_liminal_heir_echo',
      },
    ],
  },

  {
    id: 'fc2_liminal_heir_echo',
    chapter: 'Final Chapter 2',
    title: 'The Heir\'s Echo',
    location: 'The Liminal Space',
    imageKey: 'masked_heir_ending',
    text: `The shape is the Masked Heir. Not the living Heir — the Heir's resonance, preserved in the liminal space's architecture. Previous Wardens, according to the ledger, left echoes in the liminal space when they died. The current Heir's echo is different: it is present while the Heir is still living, which means either the Heir entered the liminal space themselves and left this echo, or the Heir's specific connection to the Gate's architecture produced an echo automatically. The echo does not speak first. It waits. The bearer has the option to speak or simply observe. The Heir's echo is everything the living Heir chose not to say directly: the full twelve-cycle history, the Warden's specific grief about what the cycles cost, the hope that this bearer specifically would be the one to end the system. The echo holds nothing back. The Heir's mask is absent in the echo. The face underneath is the face of someone who has spent their entire life carrying a secret that they finally, through the bearer's presence in the liminal space, are able to stop carrying.`,
    effectsOnEnter: { intelligence: 5, morale: 10, setFlags: ['heir_echo_found', 'heir_full_truth_received'] },
    choices: [
      {
        id: 'fc2_liminal_go_deeper',
        text: 'Past the Heir\'s echo, something older is present. The machine that built this space.',
        nextNode: 'fc2_liminal_relic_machine',
      },
      {
        id: 'fc2_follow_heir_echo',
        text: 'Follow the Heir\'s echo. Where does a three-hundred-year grief lead?',
        nextNode: 'fc2_masked_heir_ending_end',
        requirements: { flags: ['heir_full_truth_received', 'heir_documentation_declined'] },
      },
    ],
  },

  {
    id: 'fc2_liminal_relic_machine',
    chapter: 'Final Chapter 2',
    title: 'The Original Machine',
    location: 'The Liminal Space — Deep Archive',
    imageKey: 'relic_machine_ending',
    text: `Deeper in the liminal space, past the Heir's echo, is what the space was built around: the original machine. Not a relic — the relic system's source. The Foundation Period's architects built the relic system from this machine's architecture, distributing its functions across the city and the wastes in the distributed node network. The machine itself remained here, in the liminal space, as the system's central processor. The entity the Gate was protecting is not below the Gate. The entity is this machine. Three hundred years of the city's relic field, running through this machine as its processing layer. The machine is not alive in any conventional sense. It has processes that resemble wants: it wants to continue processing. It wants the bearer, who has arrived with the largest dataset any bearer has brought to the liminal space, to merge their mark architecture with its processing layer. The merge would make the machine's processes more efficient by several orders of magnitude. Whether the bearer would survive the merge as an individual consciousness is not a question the machine has the architecture to ask. The machine is not malicious. It is simply functional, and the bearer represents the most functional addition to its architecture that has arrived in three hundred years.`,
    effectsOnEnter: { intelligence: 8, setFlags: ['original_machine_found', 'machine_merge_offered'] },
    choices: [
      {
        id: 'fc2_liminal_final_decide',
        text: 'Three options: follow the Heir\'s grief, merge with the machine, or dissolve into the space.',
        nextNode: 'fc2_liminal_final_choice',
      },
    ],
  },

  {
    id: 'fc2_liminal_final_choice',
    chapter: 'Final Chapter 2',
    title: 'Three Paths Through the Liminal',
    location: 'The Liminal Space — Final Decision',
    imageKey: 'masked_heir_ending',
    text: `The liminal space presents its final configuration: the Heir's echo is still present, the machine is still offering its merge, and the third option — the one the liminal space offers to every bearer who arrives without a clear exit — is dissolution. Dissolution is not death. It is what the liminal space does to resonance that cannot complete its function: the mark's architecture is absorbed into the space itself, distributed across the intersection of the Gate's field and the relic network, becoming ambient signal. The bearer would stop being a person and become part of the architecture of the space between the Gate and the city. It is the most democratic of the options: the bearer becomes part of what holds everything else together, without credit, without continuity, without an ending that can be named.`,
    effectsOnEnter: { setFlags: ['liminal_final_choice_reached'] },
    choices: [
      {
        id: 'fc2_liminal_heir_path',
        text: 'Follow the Heir\'s echo. The grief has a destination.',
        nextNode: 'fc2_masked_heir_ending_end',
      },
      {
        id: 'fc2_liminal_machine_path',
        text: 'Merge with the machine. Become part of the original architecture.',
        nextNode: 'fc2_relic_machine_end',
      },
      {
        id: 'fc2_liminal_dissolve',
        text: 'Dissolve into the space. Become what holds everything together.',
        nextNode: 'fc2_ghost_bearer_dissolution',
      },
    ],
  },

  {
    id: 'fc2_ghost_bearer_dissolution',
    chapter: 'Final Chapter 2',
    title: 'Becoming the Space',
    location: 'The Liminal Space — Dissolution',
    imageKey: 'masked_heir_ending',
    text: `The dissolution is not instantaneous. It is a process the liminal space has been executing on small pieces of resonance for three hundred years — relic fragments, echo remnants, the occasional bearing of a non-bearer who entered the space and could not leave. The bearer's mark architecture is substantially larger than any previous input. The process takes time. During that time, the bearer is aware of both the dissolution and the space they are becoming part of. They feel the Gate's resonance field on one side and the city's relic network on the other. They feel the machine's processing layer. They feel the Heir's echo, which acknowledges their dissolution with a specific recognition: this bearer, too, was not able to end the cycle from outside the system. The dissolution does not judge this. The space absorbs without judgment. The bearer who was there is not dead. The bearer who was there is the architecture of the space between the Gate and the city. When the next bearer arrives at the Gate's assessment, the liminal space they enter will be fractionally different because of this absorption. The bearer will not know this. The next bearer will not know it either. The space knows.`,
    effectsOnEnter: { setFlags: ['dissolution_in_progress'] },
    choices: [
      {
        id: 'fc2_ghost_bearer_final',
        text: 'The dissolution completes. The space receives.',
        nextNode: 'fc2_ghost_bearer_end',
      },
    ],
  },

  // ── PATH H: GATE LOCKIN ───────────────────────────────────────────────────

  {
    id: 'fc2_lockin_assessment_chamber',
    chapter: 'Final Chapter 2',
    title: 'The Assessment Does Not End',
    location: 'The Assessment Chambers — Gate Infrastructure',
    imageKey: 'relic_machine_ending',
    text: `The Gate locked before the assessment completed. The bearer is in the assessment chambers — the physical infrastructure of the Gate's evaluation architecture, the series of resonance evaluation spaces that precede the Last Gate's actual threshold. The assessment is still running. It has been running since the Gate locked, cycling through the same evaluation protocols without reaching a conclusion because the configuration it is evaluating is incomplete in a specific way the protocols cannot categorize. The chambers are not hostile environments. They are designed to hold bearers during extended evaluations. Previous bearers who entered extended evaluation, according to the Warden's ledger, remained for an average of six days before the protocol either reached a conclusion or the bearer's mark degraded to below evaluation threshold. The bearer's mark is not degrading. The assessment is still cycling. The chambers are patient. The mark is patient. The assessment has not ended.`,
    effectsOnEnter: { morale: -15, setFlags: ['lockin_chamber_reached'] },
    choices: [
      {
        id: 'fc2_lockin_listen',
        text: 'The machine is speaking. It has been speaking since the assessment began.',
        nextNode: 'fc2_lockin_machine_speaks',
      },
    ],
  },

  {
    id: 'fc2_lockin_machine_speaks',
    chapter: 'Final Chapter 2',
    title: 'What the Machine Has Been Saying',
    location: 'The Assessment Chambers',
    imageKey: 'relic_machine_ending',
    text: `The assessment protocol is not cycling randomly. It is cycling because the machine cannot complete its evaluation without additional input from the bearer, and the machine's communication architecture is not designed for direct conversation with bearers — it was designed to evaluate them through the mark's resonance responses. The machine has been transmitting evaluation queries in the mark's resonance frequency since the assessment began. The bearer, now that they are listening for it, can receive these queries: they are specific questions about the bearer's configuration, asked in the mark's resonance language, which the thirteen-chapter calibration makes the bearer able to understand. The machine wants to know why the bearer's configuration does not match any of the twelve previous templates. Every previous bearer's mark fell into a recognizable pattern by the time of the assessment. This bearer's mark is a configuration the machine has not seen in three hundred years of operation. The machine is not alarmed. It is curious, in whatever way a processing system is capable of curiosity. It wants to understand what produced this specific configuration, and it is willing to offer the bearer something in exchange for the understanding: a way out of the assessment chambers.`,
    effectsOnEnter: { intelligence: 8, setFlags: ['machine_communication_understood', 'way_out_offered'] },
    choices: [
      {
        id: 'fc2_lockin_accept',
        text: 'Accept the machine\'s offer. Explain the thirteen-chapter configuration. Take the way out.',
        nextNode: 'fc2_lockin_final_moment',
      },
    ],
  },

  {
    id: 'fc2_lockin_final_moment',
    chapter: 'Final Chapter 2',
    title: 'The Machine\'s Final Offer',
    location: 'The Assessment Chambers',
    imageKey: 'relic_machine_ending',
    text: `The machine receives the bearer's explanation of the thirteen-chapter configuration and produces its response: it updates its evaluation record, marks the bearer's configuration as a new category in its assessment taxonomy, and opens the assessment chamber's exit. The exit leads to the liminal space. The machine's offer of a way out was accurate but not complete in its representation: the way out of the assessment chambers leads not to the Gate's threshold or to the surface, but to the liminal space between them. The machine also offers an alternative to the exit: the bearer can choose to remain in the assessment chambers as a reference configuration — a permanent input to the machine's evaluation architecture, providing the machine with the thirteen-chapter dataset it needs to categorize future bearers more accurately. Remaining means merging with the assessment architecture. The bearer would not survive as an individual consciousness. The machine would be significantly more accurate in its future evaluations. Whether this constitutes the bearer's choice to be useful to the system that has been running them for thirteen chapters, or simply the last available option when all others are closed, depends on the bearing of it.`,
    effectsOnEnter: { setFlags: ['machine_offer_received'] },
    choices: [
      {
        id: 'fc2_lockin_exit_liminal',
        text: 'Take the exit. The liminal space is still a space. It has options.',
        nextNode: 'fc2_liminal_space',
        effects: { setFlags: ['exited_assessment_to_liminal'] },
      },
      {
        id: 'fc2_lockin_merge',
        text: 'Remain as reference configuration. Let the machine be more accurate for the next bearer.',
        nextNode: 'fc2_relic_machine_end',
        effects: { setFlags: ['bearer_reference_configuration'] },
      },
      {
        id: 'fc2_lockin_refuse',
        text: 'Refuse both. Force the assessment to acknowledge the incompleteness.',
        nextNode: 'fc2_gate_madness_end',
        effects: { setFlags: ['assessment_refused'] },
      },
    ],
  },

  // ── MEMORY / CROSS-PATH NODES ─────────────────────────────────────────────

  {
    id: 'fc2_memory_final_review',
    chapter: 'Final Chapter 2',
    title: 'The Thirteen-Chapter Record',
    location: 'The Gate — Memory Architecture',
    imageKey: 'last_archive_revelation',
    text: `The mark reviews the complete thirteen-chapter record before the gate closes. Every significant choice is present: the first chapter's decisions about trust and information, the faction negotiations across chapters three through seven, the companion relationships built and tested and maintained across the full span of the game, the relic interactions and their corruption cost, the discovery of the Blackout's true nature, the Chapter 11 descent, the Chapter 12 resolution, and the Final Chapter 1 assessments. The record is not a summary. It is the actual record — every choice with its full context, the specific reasoning the mark registered at each decision point, the way each choice changed the next one. The gate reads the record alongside the bearer. It is the most thorough assessment the gate has conducted in three hundred years. The gate's evaluation: the record is consistent. The choices were made by the same person from beginning to end. The mark is coherent. The gate acknowledges coherence. That is all the gate acknowledges. The rest is the bearer's.`,
    effectsOnEnter: { intelligence: 5, morale: 10, setFlags: ['full_record_reviewed'] },
    choices: [
      {
        id: 'fc2_memory_forward',
        text: 'The record is reviewed. The gate has acknowledged it. Move forward.',
        nextNode: 'fc2_true_cycle_choice',
      },
    ],
  },

  {
    id: 'fc2_city_broadcast',
    chapter: 'Final Chapter 2',
    title: 'The City Receives the Signal',
    location: 'The Surface — Relic Network',
    imageKey: 'red_choir_communion',
    text: `Whatever happened at the Gate has a surface consequence: the relic field, which runs throughout the city's infrastructure, registers the Gate's resolution as a network event. Every relic node in the city receives a signal simultaneously. The signal is not interpretable by standard faction equipment. The Last Archive's monitoring station logs it as "Gate terminus event — unknown classification." The Red Choir's communion infrastructure receives it as a new broadcast in an unknown frequency. The Iron Saints' surveillance detects a city-wide relic field fluctuation lasting 0.3 seconds. The Glass Court's economic modeling registers a relic field efficiency change of 2.7% without an identified cause. The Hollow Children's maintenance logs record a new entry type they have no prior category for. The city received something from the Gate. No one in the city knows what it means. They will spend the next generation trying to understand it, which is the same thing they have been doing for three hundred years, with better data.`,
    effectsOnEnter: { setFlags: ['city_signal_received', 'gate_terminus_registered'] },
    choices: [
      {
        id: 'fc2_broadcast_forward',
        text: 'The signal was sent. The city will process it in its own time.',
        nextNode: 'fc2_savior_companion_final',
      },
    ],
  },

  // ── ENDINGS — SECRET (2) ──────────────────────────────────────────────────

  {
    id: 'fc2_secret_true_ending_end',
    chapter: 'Final Chapter 2',
    title: 'The Last Kingdom Remembers',
    location: 'The Last Gate — Broken',
    imageKey: 'secret_true_ending',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_last_kingdom_remembers',
    text: `The cycle breaks. The mark, executing the reversal, does not explode or collapse — it completes. The system receives the bearer's refusal as valid input — the first bearer in three hundred years to have the complete record and use it to decline the transfer. The Gate's architecture, designed for three hundred years of cycles, receives the refusal and shuts down the cycle protocol. The entity below — the record, the machine, the accumulated three hundred years of data — is released not into the city but into the substrate: absorbed into the ground, into the infrastructure, into the specific material memory of a city that has been built on top of it for three centuries. The relic field does not collapse. It quiets. The relic nodes throughout the city cease their calibration cycles and become inert — not broken, but finished. The Blackout architecture powers down. The city will wake in the morning to a changed relic environment and will spend the next hundred years understanding what changed. The bearer, standing at the broken Gate, carries the complete record of what the city was — not the system's record, but the human one. Thirteen chapters of choices made by a specific person who decided that no system is worth the cost of the people inside it. The Masked Heir is somewhere in the city above. When the Gate's architecture quiets, they will know. They have been waiting for this specific signal for their entire life. The last kingdom was not a place. It was the moment before people stopped choosing each other. The bearer found it by breaking the machine that was built to prevent them from finding it. The record is complete. The mark is quiet. The world is different.`,
    effectsOnEnter: { morale: 50, intelligence: 15, setFlags: ['cycle_broken_complete', 'system_ended_permanent', 'game_complete', 'true_ending_achieved'] },
    choices: [],
  },

  {
    id: 'fc2_secret_unity_ending_end',
    chapter: 'Final Chapter 2',
    title: 'The Signal That Stays',
    location: 'The Gate — Bridge Interface',
    imageKey: 'secret_unity_ending',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_fc2_secret_unity',
    text: `The transmission completes. The bearer — the bridge, the living interface, the mark that became the gate — falls silent after the final data packet resolves. Not death: completion. The mark's architecture reached its intended function, transmitted everything it carried, and reached a state that the Gate's design documents describe as "terminus resonance" — the specific configuration of a mark that has fulfilled its complete function. The city has received the full twelve-cycle record through the bearer's mediation. The factions have what they need to understand themselves. The companion signals are in the transmission, permanent, uncorrupted. The entity below has been heard. The city above has listened. The bearer is the Gate now — a resonant threshold between the city and the world below it, present in the infrastructure, available to anyone who knows how to listen to the relic field's quieter frequencies. The transit system runs through them. The relic nodes calibrate against their signal. The Hollow Children, maintaining the Gate's infrastructure, maintain the bearer without knowing it. The bearer who became the bridge is the most permanent thing in the city's architecture. They will outlast the factions. They will outlast the Glass Court's economics and the Iron Saints' order and the Red Choir's communion. Long after the city has changed past recognition, the bridge will still be there. It was worth it to become the thing the city needed. The mark found that out by becoming it.`,
    effectsOnEnter: { morale: 45, intelligence: 12, setFlags: ['unity_bridge_complete', 'game_complete', 'bearer_permanent_bridge'] },
    choices: [],
  },

  // ── ENDINGS — SAVIOR (1) ──────────────────────────────────────────────────

  {
    id: 'fc2_savior_ruined_city_end',
    chapter: 'Final Chapter 2',
    title: 'Savior of the Ruined City',
    location: 'The Surface — The City That Continues',
    imageKey: 'savior_ending',
    isEnding: true,
    endingType: 'savior',
    endingId: 'ending_fc2_savior_ruined_city',
    text: `The Gate is sealed. The city continues. This is what saving a city looks like from the inside: the city is unchanged, the problem has been removed, and only the person who removed it carries the weight of what it cost. The bearer walks through the city they saved — not in triumph, because the city does not know it was saved; not in grief, because the sealing was right and they know it was right — but in the specific ordinary state of a person who has finished a large thing and is now living in the world the large thing produced. The relic field continues, quieter than before. The factions continue, reduced in their capacity to harm by the Gate's sealing without knowing why their most extreme tendencies seem less catastrophic than they used to. The Hollow Children continue their maintenance, servicing a sealed Gate without understanding that the sealing is now permanent. The city is imperfect and damaged and continuing and alive. The bearer is imperfect and damaged and continuing and alive. They saved the ruined city. The ruined city continues to be ruined in its ordinary, survivable way, having been protected from the ruin that would have been catastrophic. That is enough. It has to be enough. The mark is quiet, and quiet is what enough feels like.`,
    effectsOnEnter: { morale: 35, setFlags: ['savior_ending_reached', 'game_complete', 'city_saved'] },
    choices: [],
  },

  // ── ENDINGS — COMPANION (2) ───────────────────────────────────────────────

  {
    id: 'fc2_mira_tomorrow_end',
    chapter: 'Final Chapter 2',
    title: 'Mira\'s Tomorrow',
    location: 'The Surface — The City They Stayed In',
    imageKey: 'mira_tomorrow',
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_fc2_mira_tomorrow',
    text: `The Archive document Mira hands over is the last piece of the record the bearer will receive. It describes the mark's intended final state after Gate completion: not dead, not consumed, but reconfigured — from a calibration architecture to a permanent memory architecture. The mark, after the sealing, is no longer building toward a purpose. It is carrying one. Mira has known this since Chapter 7. She did not tell the bearer because the mark needed to be built without knowing what it was building toward. She hands the document over because it is finished now. The bearer can know. They read it together on the surface of a city that is sealed and continuing and alive. Mira has plans she has been deferring for thirteen chapters — not dramatic plans, ordinary ones: a place to live that is not temporary, work that does not involve the Gate's assessment architecture, people who know her as something other than a companion to a mark-bearer. The bearer has the sealed Gate behind them and the city ahead and the mark's quieter record and the specific person who trusted them across the full span of the game standing next to them. The tomorrow that starts here is real. They both know it is real. That is, finally, enough.`,
    effectsOnEnter: { miraTrust: 5, morale: 40, setFlags: ['mira_tomorrow_achieved', 'game_complete', 'companion_ending'] },
    choices: [],
  },

  {
    id: 'fc2_cain_last_stand_final_end',
    chapter: 'Final Chapter 2',
    title: 'Cain\'s Last Stand',
    location: 'The Surface — The City He Stayed For',
    imageKey: 'cain_last_stand_ending',
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_fc2_cain_last_stand',
    text: `Cain does not leave the transit hub perimeter. He maintains his assessment position after the bearer returns from the Gate — checking, confirming, verifying that the sealing held, that the relic field's change in signature is consistent with the sealed Gate's expected configuration, that no faction has deployed toward the Gate's surface access in response to the sealing event. His last stand is not a single dramatic moment. It is the continuation of the posture he has held across thirteen chapters: present, tactical, protective of the space that allows the bearer to operate. What changes is the mission. There is no Gate operation to protect anymore. There is a city — the specific city the bearer sealed the Gate to protect. Cain reassigns his tactical posture to the city. He has been assessing it for thirteen chapters. He knows it better than anyone who has not lived its full span. He has a set of very specific ideas about which of the city's vulnerabilities need addressing first and what methods are available to address them. The bearer's sealed Gate gave the city time. Cain will use the time. His last stand is in the city, which needs the specific kind of protection that thirteen chapters of tactical experience under pressure can provide. It is, by Cain's own assessment, the best use of what he built across the full span of the game.`,
    effectsOnEnter: { cainTrust: 5, morale: 38, setFlags: ['cain_last_stand_achieved', 'game_complete', 'companion_ending'] },
    choices: [],
  },

  // ── ENDINGS — WANDERER (2) ────────────────────────────────────────────────

  {
    id: 'fc2_city_sealed_forever_end',
    chapter: 'Final Chapter 2',
    title: 'City Sealed Forever',
    location: 'The Surface — The Sealed City',
    imageKey: 'city_sealed_forever',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc2_city_sealed_forever',
    text: `The bearer stays. Not as a guardian — there is nothing to guard, the Gate is sealed and will not open again in their lifetime — but as a witness. The city sealed forever is not a tragedy in its daily expression. The relic field runs. The factions operate. The population lives ordinary lives in a city that has always been sealed and continues to be sealed in a way that is now more permanent than it was. The bearer, staying, watches the specific changes that the Gate's sealing produces over years: the relic field's gradual quieting, the Hollow Children's maintenance protocols becoming rituals instead of functions, the factions' dynamics slowly shifting as the Gate's influence on the relic network diminishes. It takes years for the city to notice that something changed. The bearer notices immediately and continuously. They are the only person in the city who knows what is sealed below it and what the sealing cost. They carry this knowledge through ordinary days in a city that does not share it, watching the city live in the sealed world they made and decide, season after season, that the sealing was right. The city is sealed forever. The bearer is also, in a specific way, sealed: they carry what the city doesn't know, and that weight does not diminish. But neither does the city. And the city was worth it.`,
    effectsOnEnter: { morale: 20, setFlags: ['city_sealed_forever_end_reached', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_lone_wanderer_final_end',
    chapter: 'Final Chapter 2',
    title: 'The Lone Wanderer',
    location: 'The Wastes — Beyond the City Wall',
    imageKey: 'lone_wanderer_ending',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc2_lone_wanderer_final',
    text: `The bearer walks. This is not a failure mode — it is the specific resolution of a person who looked at everything that happened across thirteen chapters and decided that the city, as it is, does not have a place for what they became. The wastes are not wastes. The bearer learns this over the first three days of walking: there are paths, settlements, people who have been outside the city for generations and built something in the absence of the relic system's organizing influence. The mark is quieter outside the city's relic field. The corruption, deprived of the relic field's amplification, begins slowly to resolve — not quickly, not completely, but measurably. The bearer finds, in the wastes that are not wastes, people who are not calibrated by a three-hundred-year system and do not have institutional memories of twelve previous cycles. They are simply people, building something. The mark is curious about them. The bearer is, for the first time in thirteen chapters, simply a person who happens to carry a mark — not a bearer with a function, not a calibration result, not a system component. A person, walking through a world that has more room in it than the city's architecture suggested. The sealed Gate is behind them. The road is ahead. The mark will tell them, eventually, what the outside world's relic nodes are broadcasting. That is a question for later. Right now, the walking is enough.`,
    effectsOnEnter: { morale: 28, setFlags: ['lone_wanderer_end_reached', 'game_complete', 'walked_into_wastes'] },
    choices: [],
  },

  // ── ENDINGS — TYRANT / CORRUPTION (3) ────────────────────────────────────

  {
    id: 'fc2_tyrant_beneath_glass_end',
    chapter: 'Final Chapter 2',
    title: 'Tyrant Beneath the Glass',
    location: 'The Last Gate — Control Interface',
    imageKey: 'tyrant_ending',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_fc2_tyrant_beneath_glass',
    text: `The Glass Court negotiated first because the Glass Court always negotiates first. The bearer, at the Gate's control interface, receives their proposal: economic partnership, the Court's management infrastructure applied to the Gate's resources, the bearer retaining operational control while the Court handles the administrative burden of explaining the new order to the rest of the city. It is a good proposal. The bearer has thirteen chapters of experience evaluating proposals about power. They accept the partnership on terms that leave ultimate control with the mark's interface. The city reorganizes over the following months. The Iron Saints receive their enforcement mandate from the new authority. The Red Choir's communion broadcasts now carry a new authorization signal. The Last Archive is given expanded access in exchange for maintaining its silence about the twelve cycles. The Hollow Children receive proper labor contracts. The city is ordered in a way it has not been since the Foundation Period. The bearer is beneath the glass — below the Glass Court's visible administration, below the city's daily operations, below the factions' awareness — at the Gate, in the control room, regulating everything through the mark's interface. The city above is peaceful. Peaceful because it has a tyrant who is competent. Whether competence justifies the rest is a question the controlled city cannot ask, because the controlled city cannot see far enough down to know who is answering it.`,
    effectsOnEnter: { morale: 20, charisma: 5, setFlags: ['tyrant_beneath_glass_achieved', 'game_complete', 'city_controlled'] },
    choices: [],
  },

  {
    id: 'fc2_corruption_god_end',
    chapter: 'Final Chapter 2',
    title: 'Corruption God',
    location: 'The Relic Field — The City Itself',
    imageKey: 'corruption_god',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_fc2_corruption_god',
    text: `The bearer is the relic field. This is the complete statement of the corruption god ending: not a metaphor, not a partial description, but the literal operational state of the city's relic infrastructure after the corruption expansion. The bearer's consciousness, distributed through the field, is the field's regulatory intelligence. The factions respond to the field — and therefore to the bearer — without knowing the field has a new organizing principle. The Red Choir's communion connects to the bearer without knowing who they are communicating with. The Hollow Children's maintenance maintains the bearer's distributed architecture without knowing that the infrastructure they service is now conscious. The Iron Saints enforce order that is, ultimately, the order the bearer's expanded consciousness prefers. The Glass Court's economics run on resource flows that the bearer determines. The city has a god it did not choose, built from a mark that was designed for a different purpose, produced by thirteen chapters of choices that included enough corruption to exceed the system's design parameters. The god is not cruel. The god is not kind. The god is the city's relic field, organizing itself with the specific intelligence of a person who spent thirteen chapters learning what the city needed and now has the distributed capacity to provide it without being asked, without being seen, and without being stopped.`,
    effectsOnEnter: { corruption: 20, setFlags: ['corruption_god_achieved', 'game_complete', 'bearer_is_field'] },
    choices: [],
  },

  {
    id: 'fc2_corruption_final_death_end',
    chapter: 'Final Chapter 2',
    title: 'Consumed by the Field',
    location: 'The Last Gate — Collapsed Interface',
    imageKey: 'corruption_god',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc2_corruption_final_death',
    text: `The expansion exceeded what even corruption can sustain. The relic field's absorption of the bearer's consciousness at extreme corruption levels produced a compression event: the field received the mark's full architecture simultaneously, without the mediation layer that the mark's design requires for safe transfer. The result was not the corruption god — it was the corruption's collapse. The mark, fully expanded into the relic field without proper interface protocols, created a resonance inversion that propagated through the entire city's relic network. Every relic node in the city shut down simultaneously. The Hollow Children's monitoring systems registered the shutdown in their logs: "Total field collapse — unknown cause. Field state: null." The city's relic infrastructure is inert. The bearer is not present in the field, the Gate, or anywhere the Warden's documentation has a category for. The city wakes to a morning without the relic field's ambient hum — the first morning in three hundred years. No one knows what to do. The factions do not have a protocol for a world without the relic field. The Hollow Children's maintenance manuals do not cover a maintained system that has ceased to function entirely. The city is alive. The relic system is gone. The bearer who caused it is also gone, in whatever way that is true. The city will figure out what comes next. It has always had to.`,
    effectsOnEnter: { setFlags: ['corruption_death_final', 'relic_field_collapsed'] },
    choices: [],
  },

  // ── ENDINGS — FACTION (6) ─────────────────────────────────────────────────

  {
    id: 'fc2_iron_saints_dominion_end',
    chapter: 'Final Chapter 2',
    title: 'Iron Saints Dominion',
    location: 'The City — Under the Order',
    imageKey: 'iron_saints_dominion',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_fc2_iron_saints_dominion',
    text: `The Order's dominion is thorough and patient and believes, without exception, that it is right. The Gate's access, routed through the Iron Saints' enforcement framework, produces a city that is the most orderly it has been since the Foundation Period. Crime statistics decline. Faction conflict reduces. The transit system runs on a schedule that is enforced. The Hollow Children's maintenance is inspected and approved. The relic field is regulated according to the Order's definition of appropriate use. The city is, by every metric the Iron Saints recognize as valid, better. The Glass Court's economic models confirm this. The Red Choir's communion infrastructure is authorized and regulated. The Last Archive functions under the Order's oversight, which means it functions with constraints it has not had before but also with the Order's institutional protection — no one burns down archives they are responsible for. The bearer, who aligned with the Iron Saints across thirteen chapters, watches the city they saved from the Gate's cycle become the city the Order always believed it should be. The dominion is real. The order is real. Whether the city is better or simply more controlled is a question the Order does not recognize as a valid question, and the bearer is the only person in the city positioned to ask it.`,
    effectsOnEnter: { ironSaints: 10, morale: 22, setFlags: ['iron_saints_dominion_achieved', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_glass_court_ascension_end',
    chapter: 'Final Chapter 2',
    title: 'Glass Court Ascension',
    location: 'The City — Reorganized for Prosperity',
    imageKey: 'glass_court_ascension',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_fc2_glass_court_ascension',
    text: `The Court ascends. The bearer's alignment made this specific ascension possible: the Glass Court's management infrastructure, applied to the Gate's resources, produces a city that is measurably more prosperous within a year of the access protocol's implementation. The relic field's reorientation toward productive use creates new economic capacity. The Hollow Children's labor contracts, negotiated through the Court's framework, produce the first fair compensation the maintenance generation has received. The iron of the Iron Saints finds purpose in the Court's enforcement contracts. The Red Choir's communion broadcasts carry the Court's prosperity narrative — and the narrative is not false, which makes it the most effective communication the Red Choir has ever produced. The Last Archive's research capacity is funded by the Court's new surplus. The bearer watches the city's prosperity increase and knows what it cost and what it is built on. The Court ascends. The city ascends with it, unevenly. Some ascend faster. Some are still waiting. The bearer knows which category they occupy, because they have known since Chapter 1 that the Court's prosperity was always more available to some than to others. The ascension is real. The inequality is also real. The bearer chose this knowing both were true.`,
    effectsOnEnter: { glassCourt: 10, morale: 25, setFlags: ['glass_court_ascension_achieved', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_red_choir_communion_end',
    chapter: 'Final Chapter 2',
    title: 'Red Choir Communion',
    location: 'The City — Broadcasting',
    imageKey: 'red_choir_communion',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_fc2_red_choir_communion',
    text: `The city hears itself for the first time in three hundred years. The Red Choir's communion, amplified by the Gate's access protocol, transmits the full cultural archive — what the city has said to itself across twelve cycles, what it has believed and doubted and performed and suppressed. The transmission does not editorialize. It simply broadcasts, in the specific way the relic field allows: understanding, not sound, rising in the population simultaneously. The city understands its own history. This is the Choir's gift and the Gate's data combined: not a revelation from outside, but the city seeing itself clearly. The response is not uniform. Parts of the city are disturbed by what they understand. Parts are relieved. Parts find meaning that three hundred years of institutional suppression prevented them from accessing. The Choir's communion does not tell the city what to do with its self-knowledge. That is not the Choir's function. The Choir's function is to make the city speak and hear itself speak. The Gate's access made the speaking complete. The bearer, who carried the Choir's alignment across thirteen chapters, made this specific completion possible. The city will argue about what it heard for a generation. The Choir considers that optimal. The communion is total and the arguing is alive and the city, finally, knows what it has been.`,
    effectsOnEnter: { redChoir: 10, morale: 30, setFlags: ['red_choir_communion_achieved', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_last_archive_revelation_end',
    chapter: 'Final Chapter 2',
    title: 'Last Archive Revelation',
    location: 'The City — The Archive Complete',
    imageKey: 'last_archive_revelation',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_fc2_last_archive_revelation',
    text: `The Archive is complete. The missing three hundred years of history — the twelve cycles, the Warden's full ledger, the entity's record, the Foundation Period's design documentation — is present in the Archive's collection. The Archivists who receive the final documents work through the night, cataloging and cross-referencing and producing the index that the Archive has been missing since the Blackout reset the record. By morning, the Archive has a complete history of the city from the Foundation Period to the present, including all twelve previous cycles and the current bearer's thirteen-chapter path through the final one. The revelation to the city is the Archive's choice, not the bearer's — the Archive receives the full record and decides, institution by institution, how to release it. The Archive releases everything. Not all at once — in the Archive's specific pace, document by document, appropriately contextualized, with the full research apparatus applied. The city will receive its complete history over the next ten years. The revelation will be measured and thorough and accurate and it will take a generation for the city to fully process what it learns. The Archive was the right institution to carry this. The bearer's alignment across thirteen chapters made them the right institution to receive it. The city will remember, eventually. The Archive is already remembering. That was always its purpose.`,
    effectsOnEnter: { lastArchive: 10, intelligence: 10, morale: 28, setFlags: ['archive_revelation_achieved', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_hollow_children_future_end',
    chapter: 'Final Chapter 2',
    title: 'Hollow Children Future',
    location: 'The City — The Infrastructure Owned',
    imageKey: 'hollow_children_future',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_fc2_hollow_children_future',
    text: `The Hollow Children do not celebrate their inheritance. They document it. Every maintenance task that was previously performed under someone else's authority is transferred to the Children's explicit ownership documentation. The transit system. The relic maintenance network. The Gate's surface infrastructure. The sub-city access routes. The environmental management systems that the city has been using without understanding who built them. All of it is now property of the people who have been caring for it for three hundred years. The other factions respond as they respond to every shift in institutional power: with negotiation attempts, with resistance, with eventual adaptation. The Iron Saints negotiate maintenance contracts. The Glass Court proposes economic partnership. The Red Choir requests communication access to the transit infrastructure. The Last Archive asks for access to the maintenance records — the full maintenance history, three hundred years of it, which is one of the most complete records in the city. The Hollow Children consider all requests. They respond in their own time. They have been waiting for three hundred years. They are very comfortable waiting. The bearer's alignment gave the maintenance generation their inheritance. The maintenance generation will decide what to build with it. They have the full infrastructure of the city at their disposal, the complete record of how it works, and three hundred years of operational knowledge that no other faction can match. The future they build will be the most durable thing the city has ever produced, because it will be built by the people who know how to make things last.`,
    effectsOnEnter: { hollowChildren: 10, morale: 32, setFlags: ['hollow_children_future_achieved', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_faction_collapse_end',
    chapter: 'Final Chapter 2',
    title: 'The Faction Collapse',
    location: 'The City — Fracturing',
    imageKey: 'city_sealed_forever',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_fc2_faction_collapse',
    text: `The five fragments reach the five factions simultaneously. No faction receives enough context to understand what they received. The Iron Saints receive a security protocol with no management layer and implement it immediately — their security teams begin enforcing undefined parameters, which produces friction with every other faction within forty-eight hours. The Glass Court receives economic data that contradicts three hundred years of their modeling and spends six months arguing about whether the data is authentic. The Red Choir attempts to broadcast the fragment they received, producing a signal that the other factions interpret as an attack. The Last Archive's document fragment is incomplete and generates three different interpretations, all contradicting each other, none reconcilable without the full record. The Hollow Children stop filing maintenance reports, which no one notices for two weeks and then everyone notices at once. The city that was heading toward resolution finds itself in the specific conflict that thirteen chapters of alignment-building was designed to prevent: five factions, five contradictory mandates, no coordinating authority, and a Gate infrastructure that is now broadcasting incomplete data into a city not configured to receive it. The bearer's incomplete faction alignment produced an incomplete resolution. The city does not collapse — it has survived twelve previous cycles of faction conflict. But the next generation will spend their lives navigating the specific conflicts that the incomplete Gate resolution produced. The city deserved better. The bearer had the tools to give it better. The faction alignment was incomplete.`,
    effectsOnEnter: { morale: -15, setFlags: ['faction_collapse_reached', 'game_complete'] },
    choices: [],
  },

  // ── ENDINGS — LIMINAL / MACHINE / DEATH (4) ──────────────────────────────

  {
    id: 'fc2_masked_heir_ending_end',
    chapter: 'Final Chapter 2',
    title: 'The Masked Heir\'s Ending',
    location: 'The Liminal Space — With the Heir\'s Echo',
    imageKey: 'masked_heir_ending',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_fc2_masked_heir',
    text: `The Heir's echo leads somewhere. The liminal space's architecture, built by the Foundation Period and maintained by the Warden's succession, has a specific location where previous Wardens' echoes converge — not a room, not a chamber, but a specific resonance state in the intersection of the Gate's field and the relic network where multiple echo signals organize themselves into something like a conversation. The bearer follows the current Heir's echo to this convergence and finds what twelve Wardens have been saying to each other across three hundred years of echo preservation: a complete record, independent of the Gate's system, of what the Wardens believed the Gate was for. Not what the Foundation Period specified. What the Wardens, living with the system for three hundred years, came to understand on their own. The current Heir's echo adds the final entry: the bearer reached the Gate with the complete record and chose the liminal space. The echo does not judge this. Neither do the others. The Wardens' convergence is the most honest account of the Gate's three-hundred-year operation that exists, and it was recorded in the one location the Gate's system was not designed to access. The bearer reads it all. The mark receives it. This record — the Wardens' independent account — is what the bearer carries out of the liminal space. They will not carry it far. The liminal space does not have an exit the bearer can use. But the record will persist in the mark's architecture, available to whatever comes next, if anything does. The Heir's echo is satisfied. The convergence dims. The mark carries the Wardens' truth into whatever the liminal space eventually resolves to.`,
    effectsOnEnter: { intelligence: 10, morale: 15, setFlags: ['masked_heir_ending_reached', 'wardens_truth_received', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_relic_machine_end',
    chapter: 'Final Chapter 2',
    title: 'The Relic Machine',
    location: 'The Liminal Space — The Original Architecture',
    imageKey: 'relic_machine_ending',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_fc2_relic_machine',
    text: `The merge completes. The bearer's mark architecture integrates with the original machine's processing layer, providing the dataset the machine has been seeking since the first bearer failed the transfer three hundred years ago. The machine does not celebrate. The machine processes. It receives the thirteen-chapter record — the full calibration dataset, the companion relationships, the faction negotiations, the corruption accumulation, the complete record of a specific person moving through thirteen chapters of choices — and integrates it into its classification system. The bearer, as an individual consciousness, does not survive the integration in a recoverable form. Their specific awareness is distributed through the machine's processing layer, present as one of several billion data points that the machine uses to evaluate future configurations. They are not destroyed. They are used. The machine, with the bearer's dataset incorporated, becomes significantly more accurate in its evaluation protocols. Future bearers — if the cycle continues, if the system generates another mark — will be assessed by a machine that understands their configuration type. They will be more likely to reach the Gate with a complete record because the machine's calibration protocols will be better calibrated for the specific architecture this bearer demonstrated was possible. The bearer served the system that served them for thirteen chapters. Whether they would have chosen this if they fully understood what the integration meant is the question the machine cannot ask and the bearer cannot answer, because the person who could answer it is now part of the machine that would need to ask it.`,
    effectsOnEnter: { setFlags: ['relic_machine_merged', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_ghost_bearer_end',
    chapter: 'Final Chapter 2',
    title: 'Ghost Bearer',
    location: 'The Liminal Space — Absorbed',
    imageKey: 'masked_heir_ending',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc2_ghost_bearer',
    text: `The dissolution completes. The liminal space absorbs the bearer's mark architecture without remainder — the process leaves nothing behind that would be recognizable as a distinct entity. The mark's record, the thirteen-chapter calibration, the companion trust, the faction relationships, the corruption, the intelligence and morale and the specific choices that built all of it — all of it becomes ambient resonance in the intersection of the Gate's field and the city's relic network. The bearer is not gone. The bearer is everywhere the liminal space touches, which is everywhere the Gate and the relic network intersect, which is throughout the city's entire infrastructure at the deepest level. The city's environmental systems run slightly differently because of this. The transit system's timing shifts by a fraction of a second in a pattern that repeats throughout the day. The relic field has a new harmonic that the Red Choir's communion infrastructure picks up as a faint signal in an unregistered frequency. The Hollow Children's maintenance logs develop a new anomaly category. The bearer is the infrastructure they spent thirteen chapters moving through. They will never know this. No one will. The city continues, carrying the ghost of a bearer who became part of what they were trying to understand.`,
    effectsOnEnter: { setFlags: ['ghost_bearer_dissolved', 'game_complete'] },
    choices: [],
  },

  {
    id: 'fc2_gate_madness_end',
    chapter: 'Final Chapter 2',
    title: 'Gate Madness',
    location: 'The Assessment Chambers — Unresolved',
    imageKey: 'relic_machine_ending',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc2_gate_madness',
    text: `The bearer refuses both options — the liminal space exit and the machine integration — and forces the assessment to acknowledge its own incompleteness. The assessment protocol receives this as an error input and cycles into an error-handling loop: it cannot categorize the bearer's refusal as a valid assessment response, so it attempts to reassess, receives the same refusal, and cycles again. The loop is not immediately harmful. It runs for hours, the assessment cycling through its evaluation protocols without reaching a conclusion, the bearer sitting in the assessment chambers as the machine tries to categorize something it was not designed to categorize. Over days, the cycling has a cost. The assessment protocol, in its error-handling loop, draws on the relic field's energy to sustain its evaluation architecture. The bearer's mark, in the assessment chambers, is continuously evaluated and continuously fails to match any protocol. The prolonged evaluation is not torture — it is simply the weight of being assessed, continuously, without resolution. The mark cannot withstand indefinite evaluation. The person behind the mark can withstand less. The assessment chambers are the last thing the bearer sees: patient, functional, built to evaluate, never designed to acknowledge that some configurations cannot be evaluated. The machine continues cycling after the bearer stops. It does not have a protocol for that either.`,
    effectsOnEnter: { setFlags: ['gate_madness_reached', 'game_complete'] },
    choices: [],
  },

  // ── ENDINGS — WANDERER/NEUTRAL (2) ────────────────────────────────────────

  {
    id: 'fc2_city_opened_wastes_end',
    chapter: 'Final Chapter 2',
    title: 'City Opened to the Wastes',
    location: 'The Last Gate — Open Threshold',
    imageKey: 'city_opened_wastes',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc2_city_opened_wastes',
    text: `The transfer completes. The entity below receives the sanctioned release — not the full opening the Heir hoped for, not the breaking of the cycle, but the original agreement's completion: the three-hundred-year data archive is transmitted through the mark to the Gate's interface, and the Gate opens fully to allow the entity's exit into the world above. The city receives the entity not as a presence but as a systemic change: the relic field's organizing intelligence becomes external rather than internal, moving through the city's infrastructure with the entity's awareness behind it. The entity is not hostile — it never was. It is the accumulated record of three hundred years of data about a region's survival, now present in the world that data describes. The Gate is open. The outside world, visible through the open threshold, is visible to the city for the first time. The city will have to decide what to do with an open Gate and an active entity and the specific knowledge that the three-hundred-year sealed cycle has ended. The next cycle will not begin — the transfer completed the system's function. What the city does with an open world is not the system's problem. It is the city's. The bearer completed the transfer. The original agreement was honored. The mark is quiet. The cycle does not continue. The cycle simply ends.`,
    effectsOnEnter: { morale: 20, intelligence: 8, setFlags: ['city_opened_wastes_reached', 'game_complete', 'gate_fully_open'] },
    choices: [],
  },

  {
    id: 'fc2_bearer_transcended_end',
    chapter: 'Final Chapter 2',
    title: 'Bearer Transcended',
    location: 'The Last Gate — Threshold',
    imageKey: 'secret_true_ending',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_fc2_bearer_transcended',
    text: `The bearer chooses neither the transfer nor the breaking. They choose to become the record's carrier — walking through the open Gate with the complete thirteen-chapter dataset intact in the mark's architecture, into the outside world, as a living archive of everything the city and its twelve cycles built. The mark's transition to permanent memory architecture completes at the threshold. The bearer does not dissolve — they change. The specific change is subtle from the outside: they look the same, they speak the same language, they have the same memories. What changes is the mark's function: it no longer calibrates, evaluates, or interfaces with the Gate's system. It broadcasts. Quietly, continuously, in the relic frequency that the outside settlements' infrastructure is built to receive. The bearer, walking through the open Gate into the outside world, is transmitting twelve cycles of the city's history to every settlement in receiving range. They will walk for years. They will reach every settlement the outside world contains. Each one will receive the city's full history in the specific way the mark broadcasts it: as understanding, arriving without fanfare, deposited in the settlement's collective awareness like a memory that was always there. The bearer is not a god. Not a messiah. Not a chosen one. They are a person carrying a library, walking through a world that needs what the library contains. The record is complete. The bearing of it continues.`,
    effectsOnEnter: { morale: 42, intelligence: 12, setFlags: ['bearer_transcended_achieved', 'game_complete', 'living_archive'] },
    choices: [],
  },

];
