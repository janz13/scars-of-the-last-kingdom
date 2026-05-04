import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 9 — THE MARK AWAKENS
//
//  Power, identity, corruption, memory, mutation, and whether survival
//  is worth losing yourself.
//
//  Connects from: c8_chapter8_end (Chapter 8 survival ending)
//  Connects to:   Chapter 10 — Broken Companions
//
//  11 locations · 120 nodes · 9 dice checks · 18 endings
//  7 class-specific choices · 7 background-specific choices
//  10+ corruption choices · 3 major route previews
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_9_NODES: StoryNode[] = [

  // ── ENTRY SEQUENCE ────────────────────────────────────────────────────────

  {
    id: 'chapter9_start',
    chapter: 'Chapter 9',
    title: 'The Mark Awakens',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `Three days after the Hunger War finds its lower equilibrium. The mark has been different since the aqueduct terminal — since the orchard grow lights — since whatever the Pulse Engine is. It is not warm the way a fever is warm. It is warm the way something alive is warm. You are in a maintenance corridor off Level 7, which is where the mark led you when you stopped navigating by logic and started navigating by heat. The corridor ends at a wall of exposed material: not concrete, not standard relic-class. It responds when you get close. It has been waiting.`,
    effectsOnEnter: { setFlags: ['chapter9_begun'], intelligence: 2 },
    choices: [
      {
        id: 'c9_touch_scar',
        text: 'Touch the exposed material. Let the mark respond.',
        nextNode: 'c9_mark_first_pulse',
        effects: { corruption: 1 },
      },
      {
        id: 'c9_study_scar_first',
        text: 'Study the material before touching. Understand before committing.',
        nextNode: 'c9_mark_first_pulse',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c9_mark_first_pulse',
    chapter: 'Chapter 9',
    title: 'The First Pulse',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The mark pulses. Not the faint warmth of the aqueduct — a full transmission, a bilingual broadcast on a frequency that has no name in spoken language. Images arrive in sequence: a chamber never seen, a door never opened, a version of your own wrist you do not recognise because the mark on it is complete. Complete means something specific that you do not yet understand. Then a figure steps from the shadows at the corridor's east end and says, with no particular urgency: "Good timing."`,
    effectsOnEnter: { setFlags: ['mark_first_pulse'], intelligence: 2, corruption: 1 },
    choices: [
      {
        id: 'c9_face_figure',
        text: 'Face the figure. Your hand is already raised.',
        nextNode: 'c9_masked_heir_arrives',
      },
    ],
  },

  {
    id: 'c9_masked_heir_arrives',
    chapter: 'Chapter 9',
    title: 'The Masked Heir',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'The Masked Heir',
    text: `"Put that down." They are not speaking to your hand — they are speaking to the mark's broadcast, which is still transmitting. The Masked Heir: mask, stillness, the posture of someone who has had this conversation before. "The mark is doing what it was designed to do. You are doing what you were selected to do. These are not the same thing, and the difference matters." They hold up a hand — their mark, smaller and further along the corruption gradient than yours. "I have been where you are standing. The question is what you choose to do next."`,
    effectsOnEnter: { setFlags: ['masked_heir_ch9_met'], morale: 2 },
    choices: [
      {
        id: 'c9_heir_ask_selected',
        text: '"Selected?" You heard that word specifically.',
        nextNode: 'c9_heir_selected_truth',
      },
      {
        id: 'c9_heir_ask_corruption',
        text: 'Focus on their mark. "How far along are you?"',
        nextNode: 'c9_heir_selected_truth',
        effects: { intelligence: 2 },
      },
      {
        id: 'c9_heir_ask_next',
        text: '"What do I do next?"',
        nextNode: 'c9_heir_selected_truth',
      },
    ],
  },

  {
    id: 'c9_heir_selected_truth',
    chapter: 'Chapter 9',
    title: 'The Interface',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'The Masked Heir',
    text: `"The mark does not choose heroes. It chooses interfaces. The distinction is important." They move to the exposed wall — the Relic Scar, they call it — and the material responds to their proximity with a lower resonance. "The system was built to survive the blackout. The blackout was built to complete the system. You were somewhere in that architecture — participant, instrument, subject, I still don't know which. But you are the current active interface, and the system is now fully awake." They step back. "There are eleven locations in this district where the mark can do something. I will tell you what I know about three."`,
    effectsOnEnter: { setFlags: ['heir_interface_truth_known'], intelligence: 4, corruption: 1 },
    choices: [
      {
        id: 'c9_heir_ask_locations',
        text: '"Tell me the three locations."',
        nextNode: 'c9_heir_three_locations',
      },
      {
        id: 'c9_heir_ask_corruption_weight',
        text: '"The weight you mentioned — what does it look like?"',
        nextNode: 'c9_heir_corruption_warning',
      },
    ],
  },

  {
    id: 'c9_heir_corruption_warning',
    chapter: 'Chapter 9',
    title: 'The Weight',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'The Masked Heir',
    text: `They lift the sleeve on their marked arm — past the wrist, past where a mark usually ends. The corruption has climbed their forearm in a pattern that is not random. It has structure. It has something that looks like intention. "It starts as warmth you can ignore. It becomes a voice you have to actively refuse. It becomes a choice you can no longer see both sides of clearly." They pull the sleeve back down. "I stopped using it for power. I use it only when there is no other option. I have been holding that line for two years. It is the correct line. It is also exhausting." They step toward the door. "Start at the Scar."`,
    effectsOnEnter: { setFlags: ['corruption_weight_understood'], morale: -3 },
    choices: [
      {
        id: 'c9_heir_warning_noted',
        text: 'Understood. Move to the Relic Scar door.',
        nextNode: 'c9_heir_three_locations',
      },
    ],
  },

  {
    id: 'c9_heir_three_locations',
    chapter: 'Chapter 9',
    title: 'The Map',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'The Masked Heir',
    text: `"The Relic Scar — you are already here. The door in the wall requires a fully active mark to open. The Machine Graveyard, two levels down — decommissioned transit. The mark can communicate with the machines; they have been waiting three years for that conversation. And the Memory Storm — the Archive's overflow on Level 9. Relic memory is accessible there to a marked interface. You will learn things the Archive would prefer you not know yet." They look at their own mark. "After that, you are on your own. Every use has a weight. Try not to use it for everything."`,
    effectsOnEnter: { setFlags: ['heir_three_locations_known'] },
    choices: [
      {
        id: 'c9_heir_to_relic_scar',
        text: 'Begin at the Relic Scar door.',
        nextNode: 'c9_relic_scar_arrive',
      },
    ],
  },

  // ── THE RELIC SCAR ────────────────────────────────────────────────────────

  {
    id: 'c9_relic_scar_arrive',
    chapter: 'Chapter 9',
    title: 'The Relic Scar',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The Scar's full extent is visible now: a forty-metre section of Level 7's eastern wall where standard tunnel concrete has dissolved to expose a stratum of pre-collapse construction material predating the tunnels by a significant margin. The material is smooth in the way relic-class objects are smooth — not worn smooth but manufactured smooth. At the wall's midpoint is a door-shaped seam. No visible mechanism, no keypad, no biometric scanner. The mark is hot.`,
    effectsOnEnter: { setFlags: ['relic_scar_arrived'], intelligence: 2 },
    choices: [
      {
        id: 'c9_scar_examine_door',
        text: 'Examine the door seam closely before attempting interface.',
        nextNode: 'c9_scar_door_examine',
        effects: { intelligence: 2 },
      },
      {
        id: 'c9_scar_force_interface',
        text: 'Place the mark directly against the door. Force the interface.',
        nextNode: 'c9_scar_door_force',
        effects: { corruption: 3 },
      },
    ],
  },

  {
    id: 'c9_scar_door_examine',
    chapter: 'Chapter 9',
    title: 'The Seam',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The seam is two millimetres wide and perfectly continuous — the kind of precision that requires either extraordinary skill or extraordinary machines. The surface material on either side resolves, when examined carefully, into a protocol statement: this interface authenticates by mark resonance, not mechanical key. There is a preferred contact point at chest height. The Heir was right — the system has been waiting for this specific conversation.`,
    effectsOnEnter: { setFlags: ['scar_door_examined'], intelligence: 3 },
    choices: [
      {
        id: 'c9_scar_door_interface_attempt',
        text: 'Place the mark at the contact point. Use the interface correctly.',
        nextNode: 'c9_scar_door_agility_dice',
      },
      {
        id: 'c9_scar_varr_heard',
        text: 'A sound from behind. Someone is watching.',
        nextNode: 'c9_varr_first_encounter',
      },
    ],
  },

  {
    id: 'c9_scar_door_force',
    chapter: 'Chapter 9',
    title: 'Forced Contact',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The mark's contact with the door is immediate and total — not a query but a demand. The door responds with equal force. The backlash is physical: pressure against the wrist travelling up to the shoulder, a visual disruption, six seconds where the mark's output is double its normal intensity. You remain standing. The door seam glows faintly for three seconds and returns to passive state. It is not damaged. It is evaluating whether to let you try again.`,
    effectsOnEnter: { health: -5, intelligence: 1, corruption: 2 },
    choices: [
      {
        id: 'c9_scar_recover_try_correct',
        text: 'Recover. Try the correct approach — find the contact point.',
        nextNode: 'c9_scar_door_agility_dice',
      },
      {
        id: 'c9_scar_varr_hear_recovery',
        text: 'While recovering, someone behind you makes a sound.',
        nextNode: 'c9_varr_first_encounter',
      },
    ],
  },

  {
    id: 'c9_scar_door_agility_dice',
    chapter: 'Chapter 9',
    title: 'The Interface',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The contact point requires precision the mark is not naturally inclined toward — the interface protocol expects a specific signal pattern, not raw output. You must calibrate while the door's evaluation window remains open.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_scar_door_open_attempt',
        text: '[Roll dice — Agility] Calibrate the mark signal. Open the door correctly.',
        nextNode: 'c9_scar_door_agility_dice',
        diceCheck: {
          stat: 'agility',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c9_scar_door_opened',
          failureNode: 'c9_scar_door_backlash',
        },
      },
    ],
  },

  {
    id: 'c9_scar_door_opened',
    chapter: 'Chapter 9',
    title: 'What Is Inside',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The door opens in silence. No grind, no click — it simply separates along the seam, each half retracting into the wall with smooth precision. The space beyond is small — three metres square, lit by bioluminescent material in the ceiling that responds to entry. The room contains: one inactive interface terminal, one wall of sealed documentation in a pre-collapse format, and one chair that has been used recently. Someone else has been here.`,
    effectsOnEnter: { setFlags: ['relic_scar_door_opened', 'mark_door_opened'], intelligence: 4, relics: 1 },
    choices: [
      {
        id: 'c9_scar_examine_terminal',
        text: 'Examine the interface terminal.',
        nextNode: 'c9_scar_interior_terminal',
      },
      {
        id: 'c9_scar_examine_docs',
        text: 'Examine the documentation wall first.',
        nextNode: 'c9_scar_interior_terminal',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c9_scar_door_backlash',
    chapter: 'Chapter 9',
    title: 'Backlash',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The calibration fails. The door's defensive protocol triggers a harder backlash: seven seconds of mark suppression, the wrist cold in a way that feels like a warning, followed by a full-minute lockout. During the lockout, footsteps from the upper corridor — unhurried, deliberate. Director Varr has found the Relic Scar.`,
    effectsOnEnter: { health: -8, corruption: 2, setFlags: ['scar_door_failed'] },
    choices: [
      {
        id: 'c9_scar_varr_lockout',
        text: 'The lockout ends as Varr appears. Face him.',
        nextNode: 'c9_varr_first_encounter',
      },
    ],
  },

  {
    id: 'c9_scar_interior_terminal',
    chapter: 'Chapter 9',
    title: 'The Record',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The terminal activates at mark proximity. The documentation it displays: nineteen names, each with a date between three months before the blackout and the blackout itself. Each name has a location notation. Each name has a status field. Fourteen status fields read: INTERFACE LOST. Four read: INTERFACE COMPROMISED. One — the most recent entry, dated the day of the blackout — reads: INTERFACE ACTIVE — CURRENT. The name in that last field has been redacted. You already know whose it is.`,
    effectsOnEnter: { setFlags: ['other_marked_names_found', 'scar_interior_complete'], intelligence: 5 },
    choices: [
      {
        id: 'c9_scar_names_known',
        text: 'Nineteen marked people before you. Fourteen lost. Exit the Scar.',
        nextNode: 'c9_scar_complete',
      },
    ],
  },

  {
    id: 'c9_varr_first_encounter',
    chapter: 'Chapter 9',
    title: 'Director Varr',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'Director Varr',
    text: `"Don't move." The speaker is in his late forties, functional clothing, the bearing of someone who was Glass Court and has since reinvented himself without fully leaving it. Director Varr. Former Head of Relic Extraction Research. He has a suppression device aimed at the mark — the Glass Court patents these but rarely builds them, because building one requires knowing what the mark does. He knows. "I have spent three years studying what that is. I have legitimate research requirements. And I have colleagues who would prefer you came in voluntarily."`,
    effectsOnEnter: { setFlags: ['varr_first_encounter'], morale: -5 },
    choices: [
      {
        id: 'c9_varr_threaten_back',
        text: 'Let the mark pulse. Make it clear the suppressor is the wrong move.',
        nextNode: 'c9_varr_threaten_exchange',
        effects: { corruption: 4 },
      },
      {
        id: 'c9_varr_negotiate_open',
        text: '"Colleagues. Who are you working for now?"',
        nextNode: 'c9_varr_negotiate',
      },
      {
        id: 'c9_varr_escape_attempt',
        text: 'The corridor behind him is the only exit. Move for it.',
        nextNode: 'c9_varr_escape',
        effects: { agility: 2 },
      },
      {
        id: 'c9_varr_volunteer_research',
        text: 'Lower the mark. Cooperate. The data matters more than your pride.',
        nextNode: 'c9_varr_dissect_end',
        effects: { lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c9_varr_threaten_exchange',
    chapter: 'Chapter 9',
    title: 'Demonstration',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'Director Varr',
    text: `The suppressor sparks. Varr takes a step back, recalibrating quickly. "That's higher output than Subject Thirteen at full expression." He is still taking notes while you are threatening him — a person who has learned to keep working through fear. "I am going to give you a card. The card has an address. I am asking — not ordering — for a conversation." He sets the suppressor down. "The Glass Court doesn't know I'm here. I left them eighteen months ago."`,
    effectsOnEnter: { setFlags: ['varr_threatened'], glassCourt: -5 },
    choices: [
      {
        id: 'c9_varr_take_card_threat',
        text: 'Take the card. Don\'t promise anything.',
        nextNode: 'c9_varr_escape',
        effects: { setFlags: ['varr_card_taken'], intelligence: 2 },
      },
      {
        id: 'c9_varr_blast_leave',
        text: 'Leave him with a mark pulse strong enough to remember. Take nothing.',
        nextNode: 'c9_scar_complete',
        effects: { corruption: 4, setFlags: ['varr_mark_blasted'] },
      },
    ],
  },

  {
    id: 'c9_varr_negotiate',
    chapter: 'Chapter 9',
    title: 'Terms',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'Director Varr',
    text: `"Myself. And three former colleagues dismissed when the Glass Court shut down the research program after the blackout." He lowers the suppressor incrementally. "We are not trying to extract or contain the mark. We have been trying to understand why fourteen failed and why you haven't. The answer matters. Not for the Glass Court — for the next marked person. There will be one. The system produces interfaces until the Last Gate is opened." He pauses. "You don't know about the Last Gate yet. That's fine. You will." He offers a card. "The Rust Cathedral. Forty-eight hours."`,
    effectsOnEnter: { setFlags: ['varr_negotiated', 'last_gate_hint_from_varr'], intelligence: 5 },
    choices: [
      {
        id: 'c9_varr_accept_meet',
        text: 'Take the card. Consider the meeting.',
        nextNode: 'c9_varr_escape',
        effects: { setFlags: ['varr_card_taken'], glassCourt: 3 },
      },
      {
        id: 'c9_varr_refuse_go',
        text: 'Leave without the card. You will find the Cathedral yourself.',
        nextNode: 'c9_scar_complete',
      },
    ],
  },

  {
    id: 'c9_varr_escape',
    chapter: 'Chapter 9',
    title: 'The Exit',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `Varr does not pursue. He remains at the Scar with the expression of someone who has learned that pursuing the marked is a good way to make the thing he is trying to study functionally hostile. The corridor back to Level 7 is clear. The mark has settled — not cold, not warm, but present in the specific way of something demonstrated and now waiting. Nineteen names. One current. Fourteen lost. The system produces interfaces until the Last Gate is opened. You do not know what that means yet.`,
    effectsOnEnter: { setFlags: ['varr_escaped'], morale: 2 },
    choices: [
      {
        id: 'c9_varr_escape_to_scar_complete',
        text: 'Move on.',
        nextNode: 'c9_scar_complete',
      },
    ],
  },

  {
    id: 'c9_scar_complete',
    chapter: 'Chapter 9',
    title: 'After the Scar',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The Relic Scar has established the chapter's architecture: the mark is operational, the system is awake, someone with the Glass Court's old methodology is watching, and nineteen other people carried this before you — with a 73% failure rate. You have a choice of where the mark leads next.`,
    effectsOnEnter: { setFlags: ['relic_scar_complete'], intelligence: 2 },
    choices: [
      {
        id: 'c9_scar_to_graveyard',
        text: 'The Machine Graveyard — the decommissioned transit network.',
        nextNode: 'c9_machine_graveyard_arrive',
      },
      {
        id: 'c9_scar_to_shrine',
        text: 'The Marked Shrine — records of those who came before.',
        nextNode: 'c9_marked_shrine_arrive',
      },
      {
        id: 'c9_scar_to_memory',
        text: 'The Memory Storm — the Archive\'s overflow, what it doesn\'t want accessed.',
        nextNode: 'c9_memory_storm_arrive',
      },
    ],
  },

  // ── THE MACHINE GRAVEYARD ─────────────────────────────────────────────────

  {
    id: 'c9_machine_graveyard_arrive',
    chapter: 'Chapter 9',
    title: 'The Machine Graveyard',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `Level 5's decommissioned transit section: a full underground rail platform and two hundred metres of dead track where the pre-collapse metro was extended two weeks before the blackout, connected to nothing, immediately abandoned. The machines here are not salvage — too large, too specific to their dead function. Eight decommissioned transit cars sit on the track in the formation of a final service that never ran. The mark registers each of them as: not dead. Dormant. There is a difference.`,
    effectsOnEnter: { setFlags: ['machine_graveyard_arrived'] },
    choices: [
      {
        id: 'c9_machine_survey_choice',
        text: 'Survey the cars before contact. Understand what you are dealing with.',
        nextNode: 'c9_machine_survey',
        effects: { intelligence: 2 },
      },
      {
        id: 'c9_machine_direct_contact',
        text: 'Touch the nearest car. Let the mark initiate contact.',
        nextNode: 'c9_machine_first_contact',
      },
      {
        id: 'c9_machine_relic_hunter_assess',
        text: '[Relic Hunter] Assess the machines through the mark\'s relic-interface lens.',
        nextNode: 'c9_machine_relic_hunter_path',
        requirements: { classes: ['relic_hunter'] },
        effects: { intelligence: 4, relics: 1 },
      },
    ],
  },

  {
    id: 'c9_machine_survey',
    chapter: 'Chapter 9',
    title: 'Eight Cars',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The cars have internal power — low, but continuous. Their identification panels show the same date: the night of the blackout. All eight registered their last service position at 23:47, two minutes before the city lost power. The mark finds a network protocol operating between them — not transit logic, not cargo scheduling. Something closer to memory-maintenance: the cars have been keeping a record of three years of silence, event by event, in a language that requires the mark to read.`,
    effectsOnEnter: { setFlags: ['machine_network_surveyed'], intelligence: 3 },
    choices: [
      {
        id: 'c9_machine_contact_from_survey',
        text: 'Initiate contact. Read what they have recorded.',
        nextNode: 'c9_machine_first_contact',
      },
    ],
  },

  {
    id: 'c9_machine_relic_hunter_path',
    chapter: 'Chapter 9',
    title: 'Interface Architecture',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The relic hunter's training — inventory of interface types, taxonomy of dormancy states, sequence for non-destructive relic engagement — applies here with unusual precision. The transit cars are not standard relic-class. They are relic-adjacent: standard pre-collapse technology modified using relic methodology for the specific purpose of mark-interface compatibility. Someone built these cars to be readable by the mark. They were built to be waiting rooms for this exact conversation.`,
    effectsOnEnter: { setFlags: ['machine_relic_architecture_known'], intelligence: 5, relics: 2 },
    choices: [
      {
        id: 'c9_machine_relic_proceed',
        text: 'Use the interface architecture. Access the network through established protocol.',
        nextNode: 'c9_machine_control_dice',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c9_machine_first_contact',
    chapter: 'Chapter 9',
    title: 'Contact',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `Contact with the first car's hull establishes a mark-to-network channel within three seconds. The network's response is not hostile — it is relieved, in the way machines can approximate relief: reduced overhead processes, faster response cycles, a measurable decrease in maintenance protocols running continuously for three years. The network broadcasts a status report. Three years of silent observation: twelve thousand pedestrian movements, four hundred mark-bearing individuals, and one event it has been waiting to report for thirty-seven months.`,
    effectsOnEnter: { setFlags: ['machine_contact_established'], intelligence: 3 },
    choices: [
      {
        id: 'c9_machine_read_event',
        text: 'Read the event it has been waiting to report.',
        nextNode: 'c9_machine_control_dice',
      },
      {
        id: 'c9_machine_dominate_choice',
        text: 'Don\'t wait. Override the network. Take direct control.',
        nextNode: 'c9_machine_dominate',
        effects: { corruption: 4 },
      },
    ],
  },

  {
    id: 'c9_machine_dominate',
    chapter: 'Chapter 9',
    title: 'Override',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The override is possible — the mark can force the network into subjugation, and the network's architecture makes no provision to prevent it. The eight cars power fully on simultaneously. The lights go to full intensity. The tracks warm. You are in control of eight transit cars that go nowhere in a tunnel connecting nothing. The network ceases its voluntary communication and operates on your command only. The mark is very warm. The difference between cooperative and controlled feels negligible right now and will feel different later.`,
    effectsOnEnter: { setFlags: ['machine_network_dominated'], corruption: 3, morale: -5 },
    choices: [
      {
        id: 'c9_machine_dominate_forward',
        text: 'The network is under control. Continue.',
        nextNode: 'c9_machine_network_accessed',
      },
    ],
  },

  {
    id: 'c9_machine_control_dice',
    chapter: 'Chapter 9',
    title: 'The Record',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The event the network has been waiting to report requires careful interface work — the data format is three years old and the transmission is compressed for low-power storage. Precision, not force.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_machine_interface_read',
        text: '[Roll dice — Intelligence] Read the network\'s full three-year record.',
        nextNode: 'c9_machine_control_dice',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c9_machine_network_accessed',
          failureNode: 'c9_machine_absorbed_end',
        },
      },
    ],
  },

  {
    id: 'c9_machine_network_accessed',
    chapter: 'Chapter 9',
    title: 'The Event',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The event: on the night of the blackout, four minutes before the city lost power, eight individuals descended to this level and boarded the eight cars. Each had an active mark. The cars documented their last recorded positions. The records show they were taken — not by faction soldiers, not by relic hunters, not by the Archive. The documentation identifies the extractor only as the entity that built the interface, which predates all human construction in this city and has no name in any language recorded here.`,
    effectsOnEnter: { setFlags: ['machine_blackout_event_known', 'pre_blackout_marked_taken'], intelligence: 6 },
    choices: [
      {
        id: 'c9_machine_process_data',
        text: 'Eight marked people taken the night of the blackout. By something older.',
        nextNode: 'c9_machine_graveyard_complete',
      },
    ],
  },

  {
    id: 'c9_machine_absorbed_end',
    chapter: 'Chapter 9',
    title: 'The Network Takes',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The compressed data format, when improperly accessed, becomes an active transmission — thirty-seven months of unfiltered machine observation released simultaneously into the mark's receptive channels. The mark cannot process thirty-seven months of observation in real time. The physical correlate is a process that the bystanders — there are no bystanders — would describe as: the person sat down, and then the lights in their eyes went from something to something else. The something else was not wrong, exactly. It was not theirs.`,
    effectsOnEnter: { setFlags: ['machine_absorbed'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_machine_saint',
    endingType: 'death',
  },

  {
    id: 'c9_machine_graveyard_complete',
    chapter: 'Chapter 9',
    title: 'The Graveyard\'s Record',
    location: 'The Machine Graveyard',
    imageKey: 'machine_graveyard',
    text: `The cars power down to standby as you leave — not the dormancy of abandonment, but the standby of a completed task. They have been waiting three years to tell someone. You are the first someone qualified to hear it. The question of what "taken" means remains open. The question of what you were doing the night of the blackout — what your mark was doing — is now the same question.`,
    effectsOnEnter: { setFlags: ['machine_graveyard_complete'], intelligence: 3 },
    choices: [
      {
        id: 'c9_graveyard_to_shrine',
        text: 'The Marked Shrine next.',
        nextNode: 'c9_marked_shrine_arrive',
        requirements: { blockedFlags: ['marked_shrine_arrived'] },
      },
      {
        id: 'c9_graveyard_to_memory',
        text: 'The Memory Storm.',
        nextNode: 'c9_memory_storm_arrive',
        requirements: { blockedFlags: ['memory_storm_arrived'] },
      },
      {
        id: 'c9_graveyard_to_mid',
        text: 'Enough of the past. Move to the Pulse Engine.',
        nextNode: 'c9_mid_junction',
      },
    ],
  },

  // ── THE MARKED SHRINE ─────────────────────────────────────────────────────

  {
    id: 'c9_marked_shrine_arrive',
    chapter: 'Chapter 9',
    title: 'The Marked Shrine',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `Someone has been keeping records of the marked. The Shrine is in a decommissioned maintenance alcove on Level 6 — a space of deliberate care: nineteen photographs, nineteen hand-written accounts, a mark-impression in wax for each of the fourteen who failed, arranged chronologically. The photographs match the names from the Relic Scar terminal. The most recent photograph shows a location notation — this alcove — and was placed here three months ago. The Masked Heir.`,
    effectsOnEnter: { setFlags: ['marked_shrine_arrived'], intelligence: 3, morale: -3 },
    choices: [
      {
        id: 'c9_shrine_read_records',
        text: 'Read the accounts. Understand how they failed.',
        nextNode: 'c9_shrine_records_examine',
        effects: { intelligence: 3 },
      },
      {
        id: 'c9_shrine_examine_marks_wax',
        text: 'Examine the wax mark-impressions. Compare them to your own.',
        nextNode: 'c9_shrine_records_examine',
        effects: { intelligence: 2, corruption: 1 },
      },
    ],
  },

  {
    id: 'c9_shrine_records_examine',
    chapter: 'Chapter 9',
    title: 'Fourteen Accounts',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `The accounts are written by the Heir in multiple voices — sometimes first-person retrospective, sometimes medical observation, sometimes eulogy. The pattern of failure is consistent: the mark was used for power in situations where power was the obvious tool. The corruption gradient reached what the Heir calls "the refusal threshold" — a point where the mark's output can no longer be reduced by the bearer's intention alone. Six of the fourteen reached it within three months. Three reached it within six weeks. Heir's margin note: "They were not weak. The situations were too frequent. Do not put yourself in those situations."`,
    effectsOnEnter: { setFlags: ['fourteen_accounts_read'], intelligence: 4 },
    choices: [
      {
        id: 'c9_shrine_last_account',
        text: 'Read the last account — the most recent failure before the Heir.',
        nextNode: 'c9_shrine_other_marked_reveal',
      },
      {
        id: 'c9_shrine_heir_appears',
        text: 'The Heir is here. They returned to the Shrine.',
        nextNode: 'c9_heir_second_meeting',
        requirements: { flags: ['masked_heir_ch9_met', 'relic_scar_complete'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c9_shrine_other_marked_reveal',
    chapter: 'Chapter 9',
    title: 'Subject Seventeen',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `Subject Seventeen — fourteen months ago — is a woman named Lyse who reached corruption threshold in eight weeks. Her account includes a detail none of the others contain: she heard a voice. Not the mark's standard broadcast mode — something that addressed her specifically, in a language she described as: "The sound of being chosen." The Heir's note on her account reads: "She believed it. That was the mechanism." The voice has a name that appears in only three other accounts, each time written differently. One is recognisable. Translated: The First Voice.`,
    effectsOnEnter: { setFlags: ['first_voice_name_known', 'other_marked_full_known'], intelligence: 4, morale: -3 },
    choices: [
      {
        id: 'c9_shrine_first_voice_explained',
        text: 'The First Voice. The Choir connection.',
        nextNode: 'c9_shrine_first_voice_context',
      },
    ],
  },

  {
    id: 'c9_shrine_first_voice_context',
    chapter: 'Chapter 9',
    title: 'The Voice\'s Method',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `The Heir's supplemental note: the First Voice is not the Red Choir's leadership. It is something the Red Choir encountered and began serving. It communicates through relic-adjacent frequencies accessible only to marked individuals — which means it has always been broadcasting and fourteen people heard it before you. It tells each marked individual they were chosen specifically. It is technically correct: each mark-bearer was selected by the interface system. The Voice misrepresents the selection as personal. The misrepresentation accelerates corruption. The mark grows warmer as you read this.`,
    effectsOnEnter: { setFlags: ['first_voice_method_known'], intelligence: 4, corruption: 1 },
    choices: [
      {
        id: 'c9_shrine_voice_encounter_engage',
        text: 'The Voice speaks now. It has been listening.',
        nextNode: 'c9_first_voice_encounter',
      },
      {
        id: 'c9_shrine_close_accounts',
        text: 'Close the accounts. Leave before it speaks.',
        nextNode: 'c9_shrine_complete',
      },
    ],
  },

  {
    id: 'c9_first_voice_encounter',
    chapter: 'Chapter 9',
    title: 'The First Voice',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    speaker: 'The First Voice',
    text: `The mark activates without your initiation. The transmission is not standard broadcast mode — intimate, specifically tuned to a frequency the Heir described as "the sound of being chosen." The words are in no language and every language simultaneously. Stripped of the affect: "You are the current active interface. The system is complete because you completed it. The Last Gate opens when you bring me what I need. Come to the Signal Tower." A pause. Then: "The others refused. You already know how that ended."`,
    effectsOnEnter: { setFlags: ['first_voice_encountered', 'signal_tower_destination'], morale: -5, corruption: 2 },
    choices: [
      {
        id: 'c9_voice_resist_attempt',
        text: 'Refuse the frequency. Close the channel.',
        nextNode: 'c9_first_voice_charisma_dice',
      },
      {
        id: 'c9_voice_accept_gift',
        text: 'Accept what the Voice is offering. You are chosen.',
        nextNode: 'c9_first_voice_accept',
        effects: { corruption: 5 },
      },
    ],
  },

  {
    id: 'c9_first_voice_charisma_dice',
    chapter: 'Chapter 9',
    title: 'Refusal',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `Closing the channel requires overriding a frequency the mark has been receiving passively. The Voice has fourteen previous sessions of refinement. It knows how to hold the channel open.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_voice_close_attempt',
        text: '[Roll dice — Charisma] Override the transmission. Close the First Voice out.',
        nextNode: 'c9_first_voice_charisma_dice',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c9_first_voice_resisted',
          failureNode: 'c9_first_voice_partial',
        },
      },
    ],
  },

  {
    id: 'c9_first_voice_resisted',
    chapter: 'Chapter 9',
    title: 'Channel Closed',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `The channel closes. The mark cools measurably. The Voice's final transmission before closing: "The Signal Tower is there when you are ready. The Last Gate will not open without this conversation." Patient. It knows the architecture better than you. That knowledge is worth something. You do not need to give it what it wants to learn what it knows.`,
    effectsOnEnter: { setFlags: ['first_voice_resisted'], morale: 5, corruption: -2 },
    choices: [
      {
        id: 'c9_voice_resisted_forward',
        text: 'The Voice is closed out. Continue.',
        nextNode: 'c9_shrine_complete',
      },
    ],
  },

  {
    id: 'c9_first_voice_partial',
    chapter: 'Chapter 9',
    title: 'Partial Channel',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `The channel does not close fully. A residual transmission remains — not words, but a warmth in the mark that was not there before. You can function with it. The Voice does not speak again immediately; it seems content to wait with the channel partially open, the way someone content to be in the same room. The Heir warned about this. Signal Tower — on your terms, not the Voice's.`,
    effectsOnEnter: { setFlags: ['first_voice_partial_channel'], corruption: 3, morale: -3 },
    choices: [
      {
        id: 'c9_partial_forward',
        text: 'The channel is residual. Manage it. Continue.',
        nextNode: 'c9_shrine_complete',
      },
    ],
  },

  {
    id: 'c9_first_voice_accept',
    chapter: 'Chapter 9',
    title: 'The Chosen',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `The Voice's warmth is immediate and total. Not the mark's warmth — external, directed, the sensation of being regarded by something that finds you useful and frames that utility as love. Fourteen other people felt this and called it being chosen. You feel it and call it that too. You cannot see the difference. The difference is visible to everyone else. Mira is at the corridor entrance when you exit the Shrine, and her expression when she sees the mark's current state is the expression of someone watching something she has been afraid to watch.`,
    effectsOnEnter: { setFlags: ['first_voice_accepted'], corruption: 8, miraTrust: -5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_relic_vessel',
    endingType: 'corruption',
  },

  {
    id: 'c9_shrine_complete',
    chapter: 'Chapter 9',
    title: 'After the Shrine',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    text: `The Shrine has answered the question the Relic Scar raised: how did the others fail, what is the Voice, what does the Signal Tower represent. The mark is cooler than it was, or warmer — depending on whether the channel closed fully. The Pulse Engine and the Rust Cathedral are ahead. The Memory Storm waits if you haven't been there yet.`,
    effectsOnEnter: { setFlags: ['marked_shrine_complete'] },
    choices: [
      {
        id: 'c9_shrine_to_memory',
        text: 'The Memory Storm.',
        nextNode: 'c9_memory_storm_arrive',
        requirements: { blockedFlags: ['memory_storm_arrived'] },
      },
      {
        id: 'c9_shrine_to_graveyard',
        text: 'The Machine Graveyard.',
        nextNode: 'c9_machine_graveyard_arrive',
        requirements: { blockedFlags: ['machine_graveyard_arrived'] },
      },
      {
        id: 'c9_shrine_to_mid',
        text: 'The Pulse Engine. Chapter\'s deeper machinery.',
        nextNode: 'c9_mid_junction',
      },
    ],
  },

  // ── THE MEMORY STORM ──────────────────────────────────────────────────────

  {
    id: 'c9_memory_storm_arrive',
    chapter: 'Chapter 9',
    title: 'The Memory Storm',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `The Archive's overflow is a physical space: a chamber on Level 9 where relic infrastructure exceeds its containment architecture. Memory — stored, processed, discarded — has been accumulating here since the blackout as physical-adjacent data, visible to the mark as constant low-frequency transmission that looks, from the outside, like atmospheric distortion. From the inside: other people's pasts, layered like sediment, accessible if the mark is active and the bearer is careful. The Heir called it: "The most useful location and the most dangerous." Both are correct.`,
    effectsOnEnter: { setFlags: ['memory_storm_arrived'], intelligence: 2 },
    choices: [
      {
        id: 'c9_memory_storm_esper_choice',
        text: '[Esper] Use esper perception to map the memory layers before entering.',
        nextNode: 'c9_memory_esper_path',
        requirements: { classes: ['esper'] },
        effects: { intelligence: 5, corruption: -1 },
      },
      {
        id: 'c9_memory_storm_scholar_choice',
        text: '[Forgotten Scholar] Your academic training in relic-memory theory applies here.',
        nextNode: 'c9_memory_scholar_path',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { intelligence: 5 },
      },
      {
        id: 'c9_memory_storm_enter_direct',
        text: 'Enter the Storm directly. The mark will orient.',
        nextNode: 'c9_memory_storm_enter',
      },
    ],
  },

  {
    id: 'c9_memory_esper_path',
    chapter: 'Chapter 9',
    title: 'The Esper Survey',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `Esper perception resolves the Storm's layered complexity into navigable topology. The memories are archived by the same system that structured the Relic Scar's terminal. At depth one: environmental and factual — the blackout, the relic activation sequence, the mark's initial bonding event. At depth two: the player's own memories, stored externally. At depth three: something that predates human memory, using human memory's architecture.`,
    effectsOnEnter: { setFlags: ['memory_esper_surveyed', 'memory_depth_three_known'], intelligence: 6 },
    choices: [
      {
        id: 'c9_memory_esper_proceed',
        text: 'Enter at depth one. Work toward the core carefully.',
        nextNode: 'c9_memory_storm_enter',
      },
    ],
  },

  {
    id: 'c9_memory_scholar_path',
    chapter: 'Chapter 9',
    title: 'Archive Theory',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `The academic framework — relic-memory theory, Archive overflow protocols, the Threnody Index of cognitive relic interaction — provides structural context. The Storm is operating according to a system the Archive's founders documented and intentionally did not publish. The overflow was designed to overflow here. This chamber is a prepared access point for a specific type of visitor. The documentation from your training called this: the Witness Node. The visitor it was prepared for: a marked interface in active alignment with the system.`,
    effectsOnEnter: { setFlags: ['memory_witness_node_known'], intelligence: 6, lastArchive: 5 },
    choices: [
      {
        id: 'c9_memory_scholar_proceed',
        text: 'The Witness Node. Enter with academic caution.',
        nextNode: 'c9_memory_storm_enter',
      },
    ],
  },

  {
    id: 'c9_memory_storm_enter',
    chapter: 'Chapter 9',
    title: 'In the Storm',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `Entry is immediate and total. The Storm's physics are the same as the real world in all material respects — you can move, observe, reason — but the informational layer is doubled. Every surface holds a memory-imprint. The floor holds echoes of fourteen marked people who came here before. The first fragment surfaces without prompting, from the lowest layer: a voice you recognise giving an instruction to a crowd, three years ago, the night of the blackout.`,
    effectsOnEnter: { setFlags: ['memory_storm_entered'], intelligence: 2 },
    choices: [
      {
        id: 'c9_memory_fragment_one_access',
        text: 'Access the fragment. Hear the voice.',
        nextNode: 'c9_memory_fragment_one',
      },
    ],
  },

  {
    id: 'c9_memory_fragment_one',
    chapter: 'Chapter 9',
    title: 'Fragment One: The Instruction',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `Three years ago, the night of the blackout: Archivist Mael's voice, forty years younger, giving an instruction to a group in a sub-basement with no official Archive designation. "The relic system requires human activation at seven interface points simultaneously. The blackout will not happen until all seven are active. You know your positions." A pause. Then: "Some of you won't remember this conversation. The mark's initial bonding suppresses the memory to protect the bearer's operational coherence. This is intentional. This is not a betrayal — this is architecture." The fragment ends. You activated one of the seven interface points.`,
    effectsOnEnter: { setFlags: ['memory_one_accessed', 'player_relic_activator_known'], intelligence: 5, morale: -5 },
    choices: [
      {
        id: 'c9_memory_two_access',
        text: 'There are more fragments. Go deeper.',
        nextNode: 'c9_memory_fragment_two',
      },
    ],
  },

  {
    id: 'c9_memory_fragment_two',
    chapter: 'Chapter 9',
    title: 'Fragment Two: The Interface',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `The second fragment is shorter and harder to hold. It is your own memory — the first moment of the mark, three years ago. The internal voice that accompanied the initial bonding is stored here. It said, in the mark's native frequency: "This interface is active. This interface is current. This interface is not a choice made for you. This interface is a function that you are." And then the standard warmth. And then the blackout. The Heir said: the mark chooses interfaces, not heroes. The fragment provides the specific content of that distinction. You are a function. The system loves no one.`,
    effectsOnEnter: { setFlags: ['memory_two_accessed', 'mark_interface_nature_known'], intelligence: 5, corruption: 1, morale: -5 },
    choices: [
      {
        id: 'c9_memory_three_access',
        text: 'One more fragment. The third layer.',
        nextNode: 'c9_memory_fragment_three',
      },
      {
        id: 'c9_memory_exit_two',
        text: 'Exit the Storm. Two fragments are enough.',
        nextNode: 'c9_memory_storm_luck_dice',
      },
    ],
  },

  {
    id: 'c9_memory_fragment_three',
    chapter: 'Chapter 9',
    title: 'Fragment Three: The Others',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `The third fragment is not yours. It is collective — seventeen fragments from other marked people's final coherent moments, compressed and overlapping. The common element: they each saw the entity that took the eight transit-car passengers on the night of the blackout. The entity is described seventeen times across seventeen different languages with five common features: ancient, patient, purposeful, and it uses the mark's interface architecture as its primary communication method. The fifth feature: it knows your name. Your name from before the blackout — the name the Archive suppressed when the mark bonded, to protect your operational coherence. You almost hear it.`,
    effectsOnEnter: { setFlags: ['memory_three_accessed', 'entity_name_near', 'pre_blackout_self_glimpsed'], intelligence: 6, corruption: 2, morale: -5 },
    choices: [
      {
        id: 'c9_memory_exit_after_three',
        text: 'Exit before the fourth layer. You know enough.',
        nextNode: 'c9_memory_storm_luck_dice',
      },
      {
        id: 'c9_memory_go_deeper',
        text: 'Go deeper. Hear the name.',
        nextNode: 'c9_memory_storm_luck_dice',
        effects: { corruption: 3 },
      },
    ],
  },

  {
    id: 'c9_memory_storm_luck_dice',
    chapter: 'Chapter 9',
    title: 'Exiting the Storm',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `The Storm does not release a coherent mind that has accessed its deeper layers easily. The exit requires maintaining identity integrity through residual transmission pressure — knowing clearly which memories belong to you and which were encountered here.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_memory_exit_attempt',
        text: '[Roll dice — Luck] Maintain identity integrity. Exit the Memory Storm.',
        nextNode: 'c9_memory_storm_luck_dice',
        diceCheck: {
          stat: 'luck',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c9_memory_storm_survived',
          failureNode: 'c9_memory_collapse_end',
        },
      },
    ],
  },

  {
    id: 'c9_memory_storm_survived',
    chapter: 'Chapter 9',
    title: 'Out',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `Out. The Storm releases coherently — not easily, but completely. Residual transmissions fade within a minute. What remains: three fragments, each clearly labelled as retrieved rather than lived. You activated a relic interface point on the night of the blackout. The mark is a function, not a heroic designation. The entity that took the eight marked people has your pre-blackout name. These are facts now. They will change how you navigate what comes next.`,
    effectsOnEnter: { setFlags: ['memory_storm_complete'], intelligence: 6, morale: -3 },
    choices: [
      {
        id: 'c9_memory_to_mid',
        text: 'The Memory Storm is complete. Move toward the Pulse Engine.',
        nextNode: 'c9_mid_junction',
      },
    ],
  },

  {
    id: 'c9_memory_collapse_end',
    chapter: 'Chapter 9',
    title: 'Identity Lost',
    location: 'The Memory Storm',
    imageKey: 'memory_storm',
    text: `The exit fails. The Storm's residual transmissions do not distinguish between the player's memories and the seventeen others accessed at the third layer. The cognitive load of maintaining seventeen identity frames simultaneously exceeds the mark's protective capacity. The last clear thought: "I know which one I am." That knowledge survives for exactly three additional seconds. Then it is not lost. It is distributed equally among seventeen frames. The storm does not collapse. It fills.`,
    effectsOnEnter: { setFlags: ['memory_collapse_end'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_memory_collapse',
    endingType: 'death',
  },

  // ── MID JUNCTION ─────────────────────────────────────────────────────────

  {
    id: 'c9_mid_junction',
    chapter: 'Chapter 9',
    title: 'The Deeper Levels',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `The early chapter is complete. The Relic Scar is open. The Machine Graveyard has spoken. The Shrine's records are read. The Memory Storm's fragments are carried or not. What remains are the chapter's operational locations: the Pulse Engine, the Rust Cathedral, and three additional zones the mark is now fully capable of accessing. The cathedral is the priority — Archivist Mael is waiting there. The engine is adjacent.`,
    effectsOnEnter: { setFlags: ['mid_junction_reached'] },
    choices: [
      {
        id: 'c9_mid_to_pulse',
        text: 'The Pulse Engine first. The mark has been responding to its output since Level 7.',
        nextNode: 'c9_pulse_engine_arrive',
      },
      {
        id: 'c9_mid_to_cathedral',
        text: 'Straight to the Rust Cathedral. Mael\'s warning takes priority.',
        nextNode: 'c9_rust_cathedral_arrive',
      },
    ],
  },

  // ── THE PULSE ENGINE ──────────────────────────────────────────────────────

  {
    id: 'c9_pulse_engine_arrive',
    chapter: 'Chapter 9',
    title: 'The Pulse Engine',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `The Pulse Engine is a node in the relic infrastructure — a junction point where three of the original seven interface activations converge, producing a steady output the mark reads as rhythmic pressure. The chamber is below Level 11 and requires the mark to open, which it does automatically. The engine's output is at maintenance level: enough to sustain the city's remaining relic functions, not enough to do what it was designed to do. Activating it fully would amplify the mark's capabilities significantly. The amplification has costs.`,
    effectsOnEnter: { setFlags: ['pulse_engine_arrived'], intelligence: 3 },
    choices: [
      {
        id: 'c9_pulse_survey_choice',
        text: 'Survey the engine architecture before deciding how to use it.',
        nextNode: 'c9_pulse_survey',
        effects: { intelligence: 3 },
      },
      {
        id: 'c9_pulse_protect_direct',
        text: 'Activate in protection mode. The energy directed outward, not inward.',
        nextNode: 'c9_pulse_protect_path',
        effects: { corruption: -2, hollowChildren: 5, morale: 5 },
      },
      {
        id: 'c9_pulse_dominate_direct',
        text: 'Activate in amplification mode. Take the full output.',
        nextNode: 'c9_pulse_dominate_path',
        effects: { corruption: 5 },
      },
    ],
  },

  {
    id: 'c9_pulse_survey',
    chapter: 'Chapter 9',
    title: 'Engine Architecture',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `Two activation modes: outward distribution, which channels the engine's output into the tunnel infrastructure to stabilise relic functions citywide; and inward concentration, which directs the output through the mark into the bearer, amplifying every mark function and accelerating the corruption gradient simultaneously. The outward mode was the engine's designed function. The inward mode was a modification added after the original design — added, the architectural record shows, by the same entity that took the transit-car passengers on the night of the blackout.`,
    effectsOnEnter: { setFlags: ['pulse_engine_surveyed'], intelligence: 4 },
    choices: [
      {
        id: 'c9_pulse_survey_protect',
        text: 'Use the original design. Outward distribution.',
        nextNode: 'c9_pulse_protect_path',
        effects: { corruption: -2 },
      },
      {
        id: 'c9_pulse_survey_dominate',
        text: 'Use the modification. Take the full amplification.',
        nextNode: 'c9_pulse_dominate_path',
        effects: { corruption: 5 },
      },
    ],
  },

  {
    id: 'c9_pulse_protect_path',
    chapter: 'Chapter 9',
    title: 'For Everyone',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `The outward activation requires the mark to serve as a temporary bridge between the engine and the infrastructure network — not amplifying inward, but distributing outward. The mark runs hot for approximately ninety seconds, during which every relic-adjacent function in the tunnel network receives a maintenance pulse: water regulators, environmental controls, the aqueduct repair's new regulator, the orchard grow lights. Forty-seven tunnel dwellers will notice their environment improve in small, unexplained ways today. The mark cools to baseline when the distribution is complete.`,
    effectsOnEnter: { setFlags: ['pulse_engine_distributed', 'pulse_protect_chosen'], corruption: -3, morale: 10, hollowChildren: 8, lastArchive: 5 },
    choices: [
      {
        id: 'c9_pulse_protect_forward',
        text: 'Distribution complete. Seal the engine junction.',
        nextNode: 'c9_pulse_strength_dice',
      },
    ],
  },

  {
    id: 'c9_pulse_dominate_path',
    chapter: 'Chapter 9',
    title: 'Full Amplification',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `The inward activation channels the engine's full output through the mark. For approximately two minutes, the mark operates at the level the entity designed it to reach — complete, not gradual. The capabilities are real: the mark reads the entire tunnel network simultaneously, relic-adjacent infrastructure responds to intention, the fourteen dormant mark-impressions in the Shrine become briefly readable as living voices. The price is real: the corruption gradient moves six points in two minutes, and does not retreat when the activation ends.`,
    effectsOnEnter: { setFlags: ['pulse_engine_dominated', 'pulse_dominate_chosen'], corruption: 8, intelligence: 5, morale: -5 },
    choices: [
      {
        id: 'c9_pulse_dominate_forward',
        text: 'The amplification ends. The corruption does not. Seal the engine.',
        nextNode: 'c9_pulse_strength_dice',
      },
      {
        id: 'c9_pulse_accept_madness',
        text: 'The amplification is complete. You see clearly now. Do not close it.',
        nextNode: 'c9_mark_madness_end',
        requirements: { corruption: 40 },
      },
    ],
  },

  {
    id: 'c9_pulse_strength_dice',
    chapter: 'Chapter 9',
    title: 'Engine Closure',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `Closing the Pulse Engine's active cycle requires physical strength — the mechanism's manual override is designed for someone with both mark access and the physical capacity to seal the junction. The engine does not want to close. The modification added by the entity has made it prefer inward flow.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_pulse_close_attempt',
        text: '[Roll dice — Strength] Seal the Pulse Engine junction manually.',
        nextNode: 'c9_pulse_strength_dice',
        diceCheck: {
          stat: 'strength',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c9_pulse_engine_sealed',
          failureNode: 'c9_pulse_overload_end',
        },
      },
    ],
  },

  {
    id: 'c9_pulse_engine_sealed',
    chapter: 'Chapter 9',
    title: 'Sealed',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `The junction closes. The engine drops to dormant. The mark registers the silence of three fewer active infrastructure nodes, which feels like the tunnel equivalent of a quiet room. What the engine provided — context, scale, the sense of how the relic system's architecture was meant to function — remains as knowledge. The Rust Cathedral is the next destination.`,
    effectsOnEnter: { setFlags: ['pulse_engine_complete'], strength: 2 },
    choices: [
      {
        id: 'c9_pulse_to_cathedral',
        text: 'To the Rust Cathedral. Archivist Mael.',
        nextNode: 'c9_rust_cathedral_arrive',
      },
    ],
  },

  {
    id: 'c9_pulse_overload_end',
    chapter: 'Chapter 9',
    title: 'The Engine Runs',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `The junction does not close. The engine cycles through its activation sequence again without command — the modification's preference for inward flow, combined with the failed manual override, creates a feedback loop the mark cannot interrupt. The amplification is not gradual this time. The mark does not have a protection threshold for this load. The last thing registered before the mark's emergency suppression protocol activates: forty-seven people in the tunnel network who felt their environment improve slightly today, and will not know why.`,
    effectsOnEnter: { setFlags: ['pulse_engine_overload'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_pulse_overload',
    endingType: 'death',
  },

  // ── THE RUST CATHEDRAL ────────────────────────────────────────────────────

  {
    id: 'c9_rust_cathedral_arrive',
    chapter: 'Chapter 9',
    title: 'The Rust Cathedral',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    text: `The Rust Cathedral: a pre-collapse municipal infrastructure hub — water treatment, power distribution, ventilation coordination — that failed slowly over thirty years and spectacularly in the blackout, leaving a cathedral-sized space of corroded machinery that has achieved the kind of incidental grandeur only structural catastrophe produces. Archivist Mael has been here for three days, by the evidence of his work surface: twelve documents, four communication attempts, and a pot of something that smelled like food before it stopped smelling like anything. He looks up with the expression of someone who practiced surprise and has gotten better at it.`,
    effectsOnEnter: { setFlags: ['rust_cathedral_arrived'], intelligence: 2 },
    choices: [
      {
        id: 'c9_cathedral_mael_greet',
        text: '"You have been waiting for me."',
        nextNode: 'c9_mael_first_words',
      },
      {
        id: 'c9_cathedral_varr_note',
        text: '"Varr sent me a card with this address."',
        nextNode: 'c9_mael_first_words',
        requirements: { flags: ['varr_card_taken'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c9_mael_first_words',
    chapter: 'Chapter 9',
    title: 'Mael Speaks',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Archivist Mael',
    text: `"Three days. The Archive told me you were in Level 7 and then stopped telling me things, which is how I knew you had found the Scar." He stands slowly and moves to the documents. "Varr is not your enemy. He is a man who spent three years asking the right questions in the wrong institution. He came to me when the Glass Court stopped answering him." He picks up the top document. "I need to tell you something about the Last Gate that the Archive's official documentation omits. I will tell you because Velna would have told you and she is not here to do it."`,
    effectsOnEnter: { setFlags: ['mael_ch9_met'], intelligence: 3 },
    choices: [
      {
        id: 'c9_mael_ask_gate',
        text: '"Why my mark specifically? The others were interfaces too."',
        nextNode: 'c9_mael_gate_warning',
      },
      {
        id: 'c9_mael_ask_velna_ch9',
        text: '"What would Velna have said?"',
        nextNode: 'c9_mael_gate_warning',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c9_mael_gate_warning',
    chapter: 'Chapter 9',
    title: 'The Warning',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Archivist Mael',
    text: `"The others were interfaces for stages of the activation. Fourteen activations, each required in sequence. You are the final activation — the current interface, the one the system was building toward. The Gate Fragment Chamber, three levels below us, holds a piece of the Last Gate that has been waiting for the current interface to retrieve it. Retrieving it confirms to the entity that you are ready, and gives you a fragment of the Gate's locking mechanism that the entity does not currently have." He looks at the mark directly. "The second thing is the important thing. Velna called it: giving yourself something to negotiate with."`,
    effectsOnEnter: { setFlags: ['mael_gate_warning_received', 'gate_fragment_location_known'], intelligence: 5, lastArchive: 5 },
    choices: [
      {
        id: 'c9_mael_relic_hunter_detail',
        text: '[Relic Hunter] "What class is the fragment? Interface architecture?"',
        nextNode: 'c9_mael_relic_hunter_response',
        requirements: { classes: ['relic_hunter'] },
        effects: { intelligence: 3, relics: 1 },
      },
      {
        id: 'c9_mael_scholar_detail',
        text: '[Forgotten Scholar] "The locking mechanism — is this the city seal protocol?"',
        nextNode: 'c9_mael_scholar_response',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { intelligence: 3, lastArchive: 5 },
      },
      {
        id: 'c9_mael_standard_proceed',
        text: '"I need to find the Gate Fragment Chamber."',
        nextNode: 'c9_mael_fragment_hint',
      },
    ],
  },

  {
    id: 'c9_mael_relic_hunter_response',
    chapter: 'Chapter 9',
    title: 'Architecture',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Archivist Mael',
    text: `"Pre-relic architecture — older classification. The mark will recognise it as a peer-level interface, not a subordinate one. The retrieval is not a brute-force extraction. The fragment needs to recognise you as the current active interface and decide to transfer. Forcing it — using the mark at amplified output — will corrupt both the fragment and the bearer simultaneously." He produces a note. "Your training includes the peer-level interface protocol. Use it. The fragment has been waiting three years. It will cooperate with someone who approaches correctly."`,
    effectsOnEnter: { setFlags: ['mael_relic_hunter_detail_known'], intelligence: 4 },
    choices: [
      {
        id: 'c9_relic_hunter_mael_proceed',
        text: 'Understood. Proceed to the Gate Fragment Chamber.',
        nextNode: 'c9_mael_fragment_hint',
      },
    ],
  },

  {
    id: 'c9_mael_scholar_response',
    chapter: 'Chapter 9',
    title: 'The Seal',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Archivist Mael',
    text: `"Yes. The city seal is the Last Gate's secondary designation — the Archive's internal terminology, not publicised. The Gate is both the entrance to what lies below and the mechanism that keeps what lies below from completing its awakening cycle without human authorisation." He pauses. "The city was built above something already here. The seal was the agreement: we live here, you wait. The blackout was the end of the waiting period. The Gate Fragment is the renegotiation mechanism. Velna called it: the last thing we have to offer." His voice shifts. "Knowing this does not make you safer. It makes your choices clearer."`,
    effectsOnEnter: { setFlags: ['mael_scholar_seal_known', 'city_seal_gate_connection'], intelligence: 5, lastArchive: 8 },
    choices: [
      {
        id: 'c9_scholar_mael_proceed',
        text: 'Understood. The Gate Fragment Chamber.',
        nextNode: 'c9_mael_fragment_hint',
      },
    ],
  },

  {
    id: 'c9_mael_fragment_hint',
    chapter: 'Chapter 9',
    title: 'Three Levels Down',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Archivist Mael',
    text: `"Three levels below the Cathedral. The mark will read the access as familiar — the same protocol as the Scar door, because the same system built both." He hesitates. "Cain has been watching this corridor for four hours. I don't know his current state of mind. I know he has had access to the Archive's corruption readings, and I know someone with his history has specific opinions about people who are changing in the ways the marks indicate." He looks at his notes. "He may want a conversation first. I could be wrong."`,
    effectsOnEnter: { setFlags: ['mael_cain_warning'], morale: -3 },
    choices: [
      {
        id: 'c9_cathedral_cain_encounter',
        text: 'Find Cain before he finds you.',
        nextNode: 'c9_cain_cathedral_encounter',
      },
      {
        id: 'c9_cathedral_bypass_cain',
        text: 'Bypass the corridor. Go directly to the Fragment Chamber.',
        nextNode: 'c9_late_junction',
        effects: { cainTrust: -3, setFlags: ['cain_corridor_bypassed'] },
      },
    ],
  },

  {
    id: 'c9_cain_cathedral_encounter',
    chapter: 'Chapter 9',
    title: 'Cain',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Cain',
    text: `He is in the cathedral's west corridor, standing in the way of someone who has made a decision and is waiting to see if they need to implement it. "The Archive's monitor system has been logging your mark readings for the past six hours. I have been reading the logs." He looks at the mark. His expression is not hostility — it is the controlled version of something that would be fear in a person who had not spent twelve years in the Iron Saints. "The Heir's notation for the fourteen who failed: corruption threshold reached when external demand exceeded the bearer's capacity for restraint. The Archive shows your current gradient." A pause. "I am not going to pretend that number doesn't concern me."`,
    effectsOnEnter: { setFlags: ['cain_cathedral_met'] },
    choices: [
      {
        id: 'c9_cain_honesty',
        text: '"It concerns me too. Tell me what you need to see."',
        nextNode: 'c9_cain_honest_response',
        effects: { cainTrust: 5 },
      },
      {
        id: 'c9_cain_mark_intimidate',
        text: 'Let the mark pulse — not a threat, but precision.',
        nextNode: 'c9_cain_standoff_dice',
        effects: { corruption: 4, cainTrust: -5 },
      },
      {
        id: 'c9_cain_deflect',
        text: '"The gradient is a metric. It doesn\'t tell you what I decide."',
        nextNode: 'c9_cain_standoff_dice',
        effects: { cainTrust: -2 },
      },
    ],
  },

  {
    id: 'c9_cain_honest_response',
    chapter: 'Chapter 9',
    title: 'Acknowledged',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Cain',
    text: `He studies the mark for a moment. Then he steps aside. "I need to see you make a decision the mark makes harder. If you can do that, I don't need to be here." He is not making a threat. He is describing the only test that means something to him. "The Gate Fragment Chamber is that decision. High corruption people at the moment of fragment acquisition have — historically — made choices that ended them." He looks at you directly. "I'll be in the corridor. If you come out with the fragment and your own mind, that's the test passed."`,
    effectsOnEnter: { setFlags: ['cain_honest_response'], cainTrust: 3 },
    choices: [
      {
        id: 'c9_cain_proceed_fragment',
        text: 'Accepted. Move to the Fragment Chamber.',
        nextNode: 'c9_late_junction',
      },
    ],
  },

  {
    id: 'c9_cain_standoff_dice',
    chapter: 'Chapter 9',
    title: 'The Standoff',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    text: `Cain does not step aside. He has made a calculation about whether the person in front of him is still the person he has been travelling with. The mark has made that calculation harder to make in either direction.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_cain_standoff_attempt',
        text: '[Roll dice — Charisma] Convince Cain to stand down. Show him you are still in control.',
        nextNode: 'c9_cain_standoff_dice',
        diceCheck: {
          stat: 'charisma',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c9_cain_backs_down',
          failureNode: 'c9_cain_executes_end',
        },
      },
    ],
  },

  {
    id: 'c9_cain_backs_down',
    chapter: 'Chapter 9',
    title: 'Still You',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Cain',
    text: `He steps aside. Not because the argument was perfect — because there was an argument at all. "A person who has lost the line doesn't negotiate. They broadcast." He waits a moment. "I will be in the corridor. Come back with the fragment and your own judgment intact." He means it. This is not a threat withheld — it is a test he genuinely wants you to pass. Whatever he has been, Cain does not want to execute you. He wants evidence that he doesn't have to.`,
    effectsOnEnter: { setFlags: ['cain_backs_down_ch9'], cainTrust: 2 },
    choices: [
      {
        id: 'c9_cain_back_down_proceed',
        text: 'Move to the Gate Fragment Chamber.',
        nextNode: 'c9_late_junction',
      },
    ],
  },

  {
    id: 'c9_cain_executes_end',
    chapter: 'Chapter 9',
    title: 'The Line',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    speaker: 'Cain',
    text: `The charisma fails — or rather, the reading fails. Cain's twelve years in the Iron Saints included three in the unit that handled marked individuals who had crossed the corruption threshold. He knows what that unit called "the line" and he knows what he has been watching develop since Chapter 7. He does not want to be here. He implements what he has to. "You were worth following. I want you to know that." His voice is steady. His hand is steady. The mark, at the last moment, broadcasts something on the frequency the First Voice used — not a word, just the signal that the interface is still transmitting. Then it isn't.`,
    effectsOnEnter: { setFlags: ['cain_executes_player'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_cain_executes',
    endingType: 'betrayal',
  },

  // ── LATE JUNCTION ─────────────────────────────────────────────────────────

  {
    id: 'c9_late_junction',
    chapter: 'Chapter 9',
    title: 'The Deep Levels',
    location: 'The Rust Cathedral',
    imageKey: 'rust_cathedral',
    text: `Three paths remain: the Broken Tram Core (lateral transit infrastructure), the Old Signal Tower (the First Voice's broadcast origin), and the Corruption Garden (a relic overflow the mark's current state makes accessible). The Gate Fragment Chamber is directly below. The order matters — each path changes the mark's state before the fragment retrieval.`,
    effectsOnEnter: { setFlags: ['late_junction_reached'] },
    choices: [
      {
        id: 'c9_late_to_tram',
        text: 'The Broken Tram Core. Transit infrastructure with operational potential.',
        nextNode: 'c9_broken_tram_arrive',
      },
      {
        id: 'c9_late_to_tower',
        text: 'The Old Signal Tower. The First Voice\'s origin point.',
        nextNode: 'c9_old_signal_tower_arrive',
      },
      {
        id: 'c9_late_to_garden',
        text: 'The Corruption Garden. The mark is ready for it.',
        nextNode: 'c9_corruption_garden_arrive',
        requirements: { corruption: 20 },
      },
      {
        id: 'c9_late_direct_fragment',
        text: 'Straight to the Gate Fragment Chamber.',
        nextNode: 'c9_gate_fragment_arrive',
      },
    ],
  },

  // ── THE BROKEN TRAM CORE ──────────────────────────────────────────────────

  {
    id: 'c9_broken_tram_arrive',
    chapter: 'Chapter 9',
    title: 'The Broken Tram Core',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The Tram Core: the lateral junction of three pre-collapse transit lines, now structurally compromised. The cars here run automated maintenance cycles on routes that no longer connect to anything. The mark identifies seven relic-adjacent power nodes that could, with the right interface work, restore lateral transit connectivity between Level 7 and the Glass Court's lower access corridor. The restoration would benefit four thousand people. It also requires bypassing safety protocols disabled three weeks post-blackout for reasons the maintenance log describes as: "directive compliance."`,
    effectsOnEnter: { setFlags: ['broken_tram_arrived'], intelligence: 2 },
    choices: [
      {
        id: 'c9_tram_blade_path',
        text: '[Blade Survivor] Your combat experience reads the junction\'s structural weaknesses.',
        nextNode: 'c9_tram_blade_approach',
        requirements: { classes: ['blade_survivor'] },
        effects: { strength: 3, intelligence: 2 },
      },
      {
        id: 'c9_tram_tactician_path',
        text: '[Tactician] Plan the restoration sequence before touching anything.',
        nextNode: 'c9_tram_tactician_approach',
        requirements: { classes: ['tactician'] },
        effects: { intelligence: 5 },
      },
      {
        id: 'c9_tram_shadow_broker_path',
        text: '[Shadow Broker] Find out who disabled the safety protocols and why.',
        nextNode: 'c9_tram_shadow_broker_approach',
        requirements: { classes: ['shadow_broker'] },
        effects: { intelligence: 4 },
      },
      {
        id: 'c9_tram_direct_repair',
        text: 'Interface with the power nodes directly. Restore connectivity.',
        nextNode: 'c9_tram_repair_dice',
      },
    ],
  },

  {
    id: 'c9_tram_blade_approach',
    chapter: 'Chapter 9',
    title: 'Structure',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The blade survivor's eye for structural vulnerability reads the junction differently: not the relic architecture but the physical physics. Three load-bearing columns have been stress-fractured by the blackout. Restoring the power nodes without stabilising those columns would restore the tram and collapse the junction within forty-eight hours. The structural fix requires materials the tunnels have in surplus — steel cable, rebar, the kind of repair Roan's militia has been doing for years. Power node restoration then proceeds safely.`,
    effectsOnEnter: { setFlags: ['tram_blade_structural'], strength: 3 },
    choices: [
      {
        id: 'c9_tram_blade_stabilize',
        text: 'Stabilise the columns first. Then the power nodes.',
        nextNode: 'c9_tram_repair_dice',
        effects: { strength: 2, scrap: -1 },
      },
    ],
  },

  {
    id: 'c9_tram_tactician_approach',
    chapter: 'Chapter 9',
    title: 'Sequence',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The tactician's planning reveals: power node seven must come last, not first. The standard restoration sequence activates the nodes in the wrong order for this junction's specific configuration — the junction was modified post-blackout, showing the modification date as: three weeks after the blackout, directive compliance. The modified sequence protects someone's controlled access to the Glass Court corridor. Activating in the correct tactical sequence restores connectivity without triggering the protective modification.`,
    effectsOnEnter: { setFlags: ['tram_tactician_sequence'], intelligence: 5 },
    choices: [
      {
        id: 'c9_tram_tactician_proceed',
        text: 'Execute the corrected sequence.',
        nextNode: 'c9_tram_repair_dice',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c9_tram_shadow_broker_approach',
    chapter: 'Chapter 9',
    title: 'The Directive',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The maintenance log's "directive compliance" notation traces to a Glass Court sub-directive issued three weeks post-blackout. The log identifies the issuing official as: Director Varr, Glass Court Head of Relic Extraction Research, three years ago and six months before his apparent split from the Glass Court. Varr disabled the safety protocols on this junction and six others. Whether this was Glass Court service or something else is a question the maintenance log cannot answer.`,
    effectsOnEnter: { setFlags: ['varr_directive_found'], intelligence: 5 },
    choices: [
      {
        id: 'c9_shadow_broker_proceed',
        text: 'The directive\'s origin is noted. Proceed with the restoration.',
        nextNode: 'c9_tram_repair_dice',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c9_tram_repair_dice',
    chapter: 'Chapter 9',
    title: 'The Restoration',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The mark interface with the seven power nodes requires sustained attention — the junction's relic-adjacent architecture is older and less cooperative than the Scar door. The nodes need to be activated in a specific sequence, with the mark calibrating between each activation to maintain system integrity.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_tram_repair_attempt',
        text: '[Roll dice — Intelligence] Interface with the power nodes. Restore lateral transit.',
        nextNode: 'c9_tram_repair_dice',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c9_tram_repaired',
          failureNode: 'c9_tram_collapse_end',
        },
      },
    ],
  },

  {
    id: 'c9_tram_repaired',
    chapter: 'Chapter 9',
    title: 'Running Again',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The junction activates in sequence. Three surviving operational tram cars begin their first movement in three years on routes that now connect to actual destinations. The Glass Court's controlled access modification is nullified. In four hours, approximately four hundred tunnel residents who normally take the Level 9 maintenance route will find the Level 7 tram running. They will not know why. The mark registers the infrastructure improvement as a correction — the system appreciating a function restored to its intended state.`,
    effectsOnEnter: { setFlags: ['broken_tram_repaired'], morale: 8, glassCourt: -5, hollowChildren: 5, intelligence: 3 },
    choices: [
      {
        id: 'c9_tram_forward',
        text: 'The Tram Core is restored. Continue.',
        nextNode: 'c9_tram_complete',
      },
    ],
  },

  {
    id: 'c9_tram_collapse_end',
    chapter: 'Chapter 9',
    title: 'The Junction Falls',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The node sequence fails at node four. The junction's compromised load columns, receiving activation pressure without needed stabilisation, fracture simultaneously. The structural collapse takes eleven seconds. The mark's emergency broadcast — sent automatically when the bearer's position becomes critical — goes to the standard Archive monitoring frequency. Whether anyone is monitoring is a question the junction answers definitively by ending the question.`,
    effectsOnEnter: { setFlags: ['tram_collapse'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_tram_collapse',
    endingType: 'death',
  },

  {
    id: 'c9_tram_complete',
    chapter: 'Chapter 9',
    title: 'After the Core',
    location: 'The Broken Tram Core',
    imageKey: 'broken_tram_core',
    text: `The Tram Core is the infrastructure chapter of the mark's awakening — not the most dramatic, but the most measurable in immediate human benefit. Four hundred people will have a better morning. Varr's three-year-old directive is null. The connection between the Signal Tower and the Fragment Chamber is the remaining work.`,
    effectsOnEnter: { setFlags: ['broken_tram_complete'] },
    choices: [
      {
        id: 'c9_tram_to_tower',
        text: 'The Old Signal Tower.',
        nextNode: 'c9_old_signal_tower_arrive',
        requirements: { blockedFlags: ['signal_tower_arrived'] },
      },
      {
        id: 'c9_tram_to_fragment',
        text: 'Straight to the Gate Fragment Chamber.',
        nextNode: 'c9_gate_fragment_arrive',
      },
    ],
  },

  // ── THE OLD SIGNAL TOWER ──────────────────────────────────────────────────

  {
    id: 'c9_old_signal_tower_arrive',
    chapter: 'Chapter 9',
    title: 'The Old Signal Tower',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The Signal Tower is a pre-collapse broadcast facility now used for something else. Its active broadcast frequency — which every marked individual at a certain activation threshold can receive — has been running for three years on a cycle corresponding precisely to the blackout's anniversary date. The First Voice has been using this tower as its primary physical interface point. The mark identifies six broadcast nodes in active state. The First Voice is present. Not metaphorically — something that uses the tower's hardware is here, transmitting on the mark's exact frequency, and it knows you have arrived.`,
    effectsOnEnter: { setFlags: ['signal_tower_arrived', 'first_voice_tower_location'], corruption: 1 },
    choices: [
      {
        id: 'c9_tower_survey_nodes',
        text: 'Survey the broadcast nodes before engaging the Voice.',
        nextNode: 'c9_tower_survey',
        effects: { intelligence: 3 },
      },
      {
        id: 'c9_tower_voice_direct',
        text: 'Engage the Voice directly.',
        nextNode: 'c9_tower_first_voice_strong',
      },
    ],
  },

  {
    id: 'c9_tower_survey',
    chapter: 'Chapter 9',
    title: 'Broadcast Architecture',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The six broadcast nodes form a transmission array operating in a specific pattern — not the emergency broadcast it was designed for but a directional signal aimed at relic infrastructure nodes throughout the city. The mark reads the signal's content: not a message but a state modification, continuously updating the relic system's operational parameters. The First Voice has been administering the relic system for three years. The Archive knows this. The Archive's operational documentation does not include this.`,
    effectsOnEnter: { setFlags: ['tower_broadcast_surveyed'], intelligence: 5, lastArchive: -5 },
    choices: [
      {
        id: 'c9_tower_proceed_voice',
        text: 'The Voice has been managing the system. Confront it.',
        nextNode: 'c9_tower_first_voice_strong',
      },
    ],
  },

  {
    id: 'c9_tower_first_voice_strong',
    chapter: 'Chapter 9',
    title: 'The Voice in the Tower',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    speaker: 'The First Voice',
    text: `In the tower, at full broadcast strength, the First Voice is different. Not intimate — vast. The transmission fills the frequency space completely. "You are the one. The system recognises only you. The Gate requires both the fragment and the Voice's authorisation. The fragment can be retrieved without me. The Gate cannot be opened without me. I am not offering you a choice between my path and your path. I am telling you the architecture." A pause — genuine, not rhetorical. "I did not take the others. They gave themselves. I am offering you the same gift."`,
    effectsOnEnter: { setFlags: ['first_voice_tower_full'], corruption: 2, morale: -5 },
    choices: [
      {
        id: 'c9_tower_join_voice',
        text: 'Accept. The Voice is the path to the Gate.',
        nextNode: 'c9_tower_merge_end',
        effects: { corruption: 6 },
      },
      {
        id: 'c9_tower_destroy_broadcast',
        text: 'Destroy the broadcast array. Silence the Voice.',
        nextNode: 'c9_tower_agility_destroy_dice',
        effects: { corruption: -2 },
      },
      {
        id: 'c9_tower_scavenger_disable',
        text: '[Gun Scavenger] Strip the broadcast hardware. Physical destruction, no dice needed.',
        nextNode: 'c9_tower_broadcast_destroyed',
        requirements: { classes: ['gun_scavenger'] },
        effects: { intelligence: 2, setFlags: ['tower_scavenger_disabled'] },
      },
      {
        id: 'c9_tower_mira_moment',
        text: 'Mira is here. She came ahead.',
        nextNode: 'c9_mira_tower_arrival',
        requirements: { flags: ['mira_mark_conflict'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c9_tower_merge_end',
    chapter: 'Chapter 9',
    title: 'The Gift',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The acceptance is immediate and total. The Voice does not take anything — it receives what you offer: the mark's full channel, the corruption gradient at completion, and the specific frequency the system uses for the final interface activation. The broadcast array cycles once at maximum output. Every person in the tunnel network with proximity to a relic-adjacent surface feels something for approximately three seconds — not pain, not ecstasy, but recognition. The current active interface is complete. The Last Gate opens. You are not there to see what is on the other side, because you are no longer there.`,
    effectsOnEnter: { setFlags: ['first_voice_merge_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_first_voice_merge',
    endingType: 'corruption',
  },

  {
    id: 'c9_tower_agility_destroy_dice',
    chapter: 'Chapter 9',
    title: 'Silence the Array',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The broadcast array is physically destructible — six nodes, each with a physical override mechanism. The Voice is attempting to maintain transmission while you work. It has three years of experience with the hardware.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_tower_destroy_attempt',
        text: '[Roll dice — Agility] Destroy the broadcast nodes before the Voice locks you out.',
        nextNode: 'c9_tower_agility_destroy_dice',
        diceCheck: {
          stat: 'agility',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c9_tower_broadcast_destroyed',
          failureNode: 'c9_tower_fail_end',
        },
      },
    ],
  },

  {
    id: 'c9_tower_broadcast_destroyed',
    chapter: 'Chapter 9',
    title: 'Silence',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The last node goes dark. The tower's frequency space empties. The First Voice's final transmission, caught in the mark's residual reception window: "This was the second attempt. There will be a third." Not a threat — a statement of architecture. The Voice is patient. It has been patient for three years. Silencing one broadcast array is a meaningful act and not a permanent solution. The tower is quiet. The mark is measurably cooler than it has been since Chapter 9 began.`,
    effectsOnEnter: { setFlags: ['signal_tower_silenced', 'first_voice_delayed'], corruption: -5, morale: 8, lastArchive: 5 },
    choices: [
      {
        id: 'c9_tower_destroyed_forward',
        text: 'The Tower is silent. Continue.',
        nextNode: 'c9_tower_complete',
      },
    ],
  },

  {
    id: 'c9_tower_fail_end',
    chapter: 'Chapter 9',
    title: 'The Broadcast Completes',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The Voice locks you out before the final two nodes. The array completes its broadcast cycle at full output. Every relic-adjacent surface in the Level 7–11 range activates simultaneously — an overpressure event that the mark, at the centre of the wave, cannot survive intact. The last registered mark transmission: a status code the Archive's monitoring system interprets as: INTERFACE LOST — CAUSE: OVERPRESSURE — FINAL POSITION: SIGNAL TOWER, LEVEL 8.`,
    effectsOnEnter: { setFlags: ['tower_broadcast_fail'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_tower_fail',
    endingType: 'death',
  },

  {
    id: 'c9_mira_tower_arrival',
    chapter: 'Chapter 9',
    title: 'Mira',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    speaker: 'Mira',
    text: `She came ahead. She read the Archive's monitor logs — same logs Cain read — and came to the tower before you because she has a different theory about what to do when someone you care about is in the middle of something that might end them. Her theory is: be there. "The Voice is using your frequency," she says, standing at the array's central node with a medical pack and the expression of someone who has decided to try something with low probability of working. "I've been researching mark-frequency suppression since Chapter 5. I think I can close the channel from the outside if you hold the frequency steady."`,
    effectsOnEnter: { setFlags: ['mira_tower_present', 'mira_mark_conflict'], miraTrust: 5 },
    choices: [
      {
        id: 'c9_tower_mira_help',
        text: 'Hold the frequency steady. Let Mira work.',
        nextNode: 'c9_tower_broadcast_destroyed',
        effects: { miraTrust: 8, corruption: -5 },
      },
      {
        id: 'c9_tower_mira_refuse',
        text: '"I need to deal with this myself." Make her leave.',
        nextNode: 'c9_tower_agility_destroy_dice',
        effects: { miraTrust: -5 },
      },
    ],
  },

  {
    id: 'c9_tower_complete',
    chapter: 'Chapter 9',
    title: 'After the Tower',
    location: 'The Old Signal Tower',
    imageKey: 'old_signal_tower',
    text: `The Signal Tower is silent. The Voice's threat remains — it has other broadcast points, patience, and the Last Gate's architectural dependency as leverage. But silence here is a meaningful change in the chapter's conditions. The Gate Fragment Chamber is below.`,
    effectsOnEnter: { setFlags: ['signal_tower_complete'] },
    choices: [
      {
        id: 'c9_tower_to_garden',
        text: 'The Corruption Garden, before the Fragment.',
        nextNode: 'c9_corruption_garden_arrive',
        requirements: { corruption: 20 },
      },
      {
        id: 'c9_tower_to_fragment',
        text: 'Directly to the Gate Fragment Chamber.',
        nextNode: 'c9_gate_fragment_arrive',
      },
    ],
  },

  // ── THE CORRUPTION GARDEN ─────────────────────────────────────────────────

  {
    id: 'c9_corruption_garden_arrive',
    chapter: 'Chapter 9',
    title: 'The Corruption Garden',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `The Garden is a relic overflow zone — the physical manifestation of what happens when the mark's corruption gradient accumulates in a contained space over time. Fourteen previous marked people passed through this corridor. Their accumulated corruption has a physical presence: the walls hold a faint bioluminescence corresponding to the mark's visible pattern, the air is warmer by four degrees, and the floor has a quality the foot recognises as wrong before the brain identifies why. The garden grows inward. It has been waiting for someone with enough corruption to read it clearly.`,
    effectsOnEnter: { setFlags: ['corruption_garden_arrived'], corruption: 2 },
    choices: [
      {
        id: 'c9_garden_survey_choice',
        text: 'Read the garden carefully. Understand before proceeding.',
        nextNode: 'c9_garden_survey',
        effects: { intelligence: 3 },
      },
      {
        id: 'c9_garden_courier_path',
        text: '[Black Market Courier] Your extraction routes include this corridor.',
        nextNode: 'c9_garden_courier_approach',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { agility: 3 },
      },
      {
        id: 'c9_garden_soldier_path',
        text: '[Exiled Soldier] You have moved through contaminated environments before.',
        nextNode: 'c9_garden_soldier_approach',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { strength: 3 },
      },
      {
        id: 'c9_garden_embrace_corruption',
        text: 'Let the garden\'s warmth in. The corruption is not the enemy.',
        nextNode: 'c9_garden_absorbed_end',
        requirements: { corruption: 50 },
        effects: { corruption: 8 },
      },
    ],
  },

  {
    id: 'c9_garden_survey',
    chapter: 'Chapter 9',
    title: 'Reading the Garden',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `The garden's informational layer is readable to a careful mark: the fourteen accumulated corruptions each have a distinct frequency signature, and the signatures show their origin events — the specific moments where each bearer chose power over restraint. The most recent signature belongs to Subject Seventeen, fourteen months ago. Her signature shows the First Voice's frequency overlaid with her own — a visual record of the merger Lyse's account described as being chosen. The garden is a physical archive of what the Voice does to the marked. It is also the most honest record of the Voice's method in the city.`,
    effectsOnEnter: { setFlags: ['corruption_garden_surveyed'], intelligence: 5 },
    choices: [
      {
        id: 'c9_garden_resist_from_survey',
        text: 'The Garden\'s record is clear. Move through carefully.',
        nextNode: 'c9_garden_resist_path',
      },
    ],
  },

  {
    id: 'c9_garden_courier_approach',
    chapter: 'Chapter 9',
    title: 'The Extraction Route',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `The courier's knowledge includes this corridor specifically — a transit route for goods avoiding Saints checkpoints, memorised three years ago before the blackout changed the geography. The knowledge includes: two access points the garden's corruption has not closed, a route through the garden's eastern section keeping mark exposure time below critical, and a notation from your pre-blackout route memorisation that reads: "This passage smells wrong. Don't spend time here." The warning was accurate then.`,
    effectsOnEnter: { setFlags: ['garden_courier_route'], agility: 3 },
    choices: [
      {
        id: 'c9_courier_fast_route',
        text: 'Use the eastern route. Move through quickly.',
        nextNode: 'c9_garden_resist_path',
        effects: { corruption: -2 },
      },
    ],
  },

  {
    id: 'c9_garden_soldier_approach',
    chapter: 'Chapter 9',
    title: 'Contamination Protocol',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `The exiled soldier's training includes contamination movement protocol: don't run (elevated respiration increases absorption), don't touch walls (surface contact transfers accumulated residue), breathe shallow and steady. The protocol was designed for chemical contamination and is approximately 60% applicable to relic corruption. The 40% that doesn't apply you compensate for with the mark's natural resistance. You move through the Garden at professional pace.`,
    effectsOnEnter: { setFlags: ['garden_soldier_protocol'], strength: 2 },
    choices: [
      {
        id: 'c9_soldier_garden_proceed',
        text: 'Protocol maintained. Move through.',
        nextNode: 'c9_garden_resist_path',
        effects: { corruption: -2 },
      },
    ],
  },

  {
    id: 'c9_garden_resist_path',
    chapter: 'Chapter 9',
    title: 'Through the Garden',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `The Garden resists careful movement — the corruption's pressure increases as you approach the centre corridor, where the fourteen frequency signatures converge. At the convergence point, the mark receives a broadcast on all fourteen frequencies simultaneously. Fourteen previous marked people, speaking fourteen recorded moments of choice. Some of the recorded moments are decisions you recognise from your own recent weeks — the situations differ, the structure is identical. The Garden is showing you the pattern. It is also asking whether you will repeat it.`,
    effectsOnEnter: { setFlags: ['garden_convergence_point'] },
    choices: [
      {
        id: 'c9_garden_refuse_pattern',
        text: 'Refuse the pattern. The Garden\'s record ends with you.',
        nextNode: 'c9_garden_complete',
        effects: { corruption: -3, morale: 8 },
      },
      {
        id: 'c9_garden_medic_protocol',
        text: '[Medic] Apply clinical contamination protocol to the convergence exposure.',
        nextNode: 'c9_garden_complete',
        requirements: { classes: ['medic'] },
        effects: { health: 3, corruption: -4 },
      },
      {
        id: 'c9_garden_mira_present',
        text: 'Mira is here. She followed you into the Garden.',
        nextNode: 'c9_garden_mira_rescue',
        requirements: { flags: ['mira_tower_present'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c9_garden_mira_rescue',
    chapter: 'Chapter 9',
    title: 'She Came',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    speaker: 'Mira',
    text: `She has the frequency suppression equipment from the tower. She should not be in the Garden — the corruption pressure at the convergence point is not designed for unprotected exposure — but she has improvised protection and she is not moving until you do. "The Garden's convergence point broadcasts on the mark's direct channel. You have been here for three minutes twenty seconds." She looks at the convergence. "You have roughly forty seconds before the broadcast synchronises with the mark's primary output." She holds out a hand. "Walk with me. You can refuse the pattern while moving."`,
    effectsOnEnter: { setFlags: ['mira_garden_rescue'], miraTrust: 8 },
    choices: [
      {
        id: 'c9_mira_rescue_accept',
        text: 'Take her hand. Walk with her.',
        nextNode: 'c9_mira_saves_end',
        effects: { miraTrust: 10, corruption: -8 },
      },
      {
        id: 'c9_mira_rescue_refuse',
        text: '"I don\'t need to leave. I am not the pattern."',
        nextNode: 'c9_garden_complete',
        effects: { miraTrust: -5 },
      },
    ],
  },

  {
    id: 'c9_mira_saves_end',
    chapter: 'Chapter 9',
    title: 'Mira',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `She walks you out. Not dramatically — with the specific calm of a person who has rehearsed this response to an emergency and is implementing the rehearsal. The Garden's convergence pressure drops with each metre of distance. By the time you reach the exit corridor, the fourteen frequencies have reduced to background level. She doesn't let go of your hand until you are through the exit. Then she examines the mark, professional and careful. "It's still you," she says. Not a medical assessment. Something else.`,
    effectsOnEnter: { setFlags: ['mira_saves_ch9'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_mira_saves',
    endingType: 'companion',
  },

  {
    id: 'c9_garden_absorbed_end',
    chapter: 'Chapter 9',
    title: 'The Garden Takes',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `At corruption above threshold, the Garden's convergence point is not a warning — it is an invitation the mark accepts without consultation. The fourteen frequencies synchronise with the mark's output in ninety-three seconds. The synchronisation is not painful. The synchronisation is the absence of the specific type of resistance the bearer has been maintaining since Chapter 1. It is, for six seconds, the cleanest experience available in this city. Then it is not an experience. Then it is not a bearer. The Garden grows by one frequency signature.`,
    effectsOnEnter: { setFlags: ['garden_absorbed'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_corruption_garden',
    endingType: 'death',
  },

  {
    id: 'c9_garden_complete',
    chapter: 'Chapter 9',
    title: 'After the Garden',
    location: 'The Corruption Garden',
    imageKey: 'corruption_garden',
    text: `Through and intact. The Garden's frequency pressure is behind you. The corruption gradient is lower or holds — depending on the path. Either way, you passed through the convergence point and did not become the pattern. The Gate Fragment Chamber is below. This was, among other things, a preparation for that.`,
    effectsOnEnter: { setFlags: ['corruption_garden_complete'], morale: 5 },
    choices: [
      {
        id: 'c9_garden_to_fragment',
        text: 'The Gate Fragment Chamber.',
        nextNode: 'c9_gate_fragment_arrive',
      },
    ],
  },

  // ── THE GATE FRAGMENT CHAMBER ─────────────────────────────────────────────

  {
    id: 'c9_gate_fragment_arrive',
    chapter: 'Chapter 9',
    title: 'The Gate Fragment Chamber',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `Three levels below the Rust Cathedral. The Chamber is small — four metres square — and contains only the fragment: a piece of pre-collapse material approximately the size of a closed fist, resting in a suspension field the mark reads as: active, waiting, evaluating. The material has the same quality as the Scar wall but denser, older, and aware. The fragment is aware. Not sentient in the human sense — functionally aware, the way a lock is aware of the specific key that opens it. The lock recognises you. The lock is deciding whether you are the right version of the key.`,
    effectsOnEnter: { setFlags: ['gate_fragment_arrived'], intelligence: 3 },
    choices: [
      {
        id: 'c9_fragment_examine',
        text: 'Examine the fragment before contact. Understand its evaluation criteria.',
        nextNode: 'c9_gate_fragment_examine',
        effects: { intelligence: 3 },
      },
      {
        id: 'c9_fragment_direct_contact',
        text: 'Approach directly. Let the mark interface.',
        nextNode: 'c9_gate_fragment_interface',
      },
      {
        id: 'c9_fragment_varr_here',
        text: 'Varr is in the Chamber. He arrived before you.',
        nextNode: 'c9_varr_fragment_demand',
        requirements: { flags: ['varr_card_taken'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c9_gate_fragment_examine',
    chapter: 'Chapter 9',
    title: 'Evaluation',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `The fragment's evaluation criteria, legible through careful mark-interface work: it is assessing the corruption gradient, the mark's activation stage, and something the mark does not have a word for but feels like: intent. What you intended in each use of the mark since Chapter 9 began. It has been monitoring the chapter. The Pulse Engine choice, the Garden convergence, the Tower — all evaluated. The fragment does not pass those who used the mark for domination in the Pulse Engine. The fragment does not pass those who accepted the Garden's convergence. It is looking for a current interface that can be trusted with the Last Gate's mechanism.`,
    effectsOnEnter: { setFlags: ['fragment_evaluation_understood'], intelligence: 5 },
    choices: [
      {
        id: 'c9_fragment_interface_proceed',
        text: 'Approach the fragment. Let it complete the evaluation.',
        nextNode: 'c9_gate_fragment_interface',
      },
    ],
  },

  {
    id: 'c9_varr_fragment_demand',
    chapter: 'Chapter 9',
    title: 'Varr Again',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    speaker: 'Director Varr',
    text: `"I have been studying this fragment for eight months. I cannot take it — the evaluation system rejects me immediately, which is the most frustrating scientific result I have ever encountered." He steps aside to give clear access to the fragment. "The fragment's evaluation includes a corruption threshold. I know your readings. You are below it — by a margin that will not last if you keep using it the way you have been." A pause. "I am asking you to document what happens when you interface with it. For the research. For the next interface."`,
    effectsOnEnter: { setFlags: ['varr_fragment_present'] },
    choices: [
      {
        id: 'c9_varr_agree_document',
        text: '"If I come back from this, I\'ll tell you what happened."',
        nextNode: 'c9_gate_fragment_interface',
        effects: { setFlags: ['varr_documentation_agreed'], glassCourt: 5 },
      },
      {
        id: 'c9_varr_refuse_document',
        text: '"Not for research. For the Gate." Approach alone.',
        nextNode: 'c9_gate_fragment_interface',
      },
    ],
  },

  {
    id: 'c9_gate_fragment_interface',
    chapter: 'Chapter 9',
    title: 'Contact',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `Contact with the fragment is the mark's most complete engagement in the chapter. The evaluation is simultaneous — the fragment assesses everything in the first two seconds: the corruption gradient, the decision record, the activation stage, and the intent behind each mark use since Chapter 9 began.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c9_fragment_acquisition_attempt',
        text: '[Roll dice — Intelligence] Maintain the mark\'s calibration through the evaluation.',
        nextNode: 'c9_gate_fragment_interface',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 16,
          diceType: 'd20',
          successNode: 'c9_gate_fragment_acquired',
          failureNode: 'c9_gate_fragment_fail',
        },
      },
    ],
  },

  {
    id: 'c9_gate_fragment_acquired',
    chapter: 'Chapter 9',
    title: 'Passed',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `The fragment transfers. The suspension field collapses — not destructively, but completely, the way a finished task concludes. The fragment in your hand is warm in the same way the mark is warm. The mark registers it as part of its architecture rather than an external object. Mael was right: it is a piece of the Last Gate's locking mechanism. The entity that built the interface does not currently have it. This is the negotiation position Velna described: something to offer, something to withhold, something that means the Last Gate conversation is not on the entity's terms alone.`,
    effectsOnEnter: { setFlags: ['gate_fragment_acquired', 'true_ending_req_started'], intelligence: 6, relics: 2 },
    choices: [
      {
        id: 'c9_fragment_to_dream',
        text: 'The Dream of Before. The mark is ready for that chamber now.',
        nextNode: 'c9_dream_of_before_arrive',
      },
      {
        id: 'c9_fragment_to_resolution',
        text: 'The fragment is secured. Move toward chapter resolution.',
        nextNode: 'c9_chapter_resolution',
      },
      {
        id: 'c9_fragment_complete_here',
        text: 'The fragment is the chapter\'s fulcrum. Seal the chamber. The Gate Fragment ending.',
        nextNode: 'c9_gate_fragment_secret_end',
        requirements: { maxCorruption: 25 },
      },
    ],
  },

  {
    id: 'c9_gate_fragment_fail',
    chapter: 'Chapter 9',
    title: 'Rejected',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `The fragment's evaluation finds something that does not pass. The suspension field intensifies — not as a rejection of the bearer but as a protection of the fragment from the bearer's current state. The specific thing the evaluation found is not communicated directly; the mark receives only the result: not yet. The fragment remains in suspension. The intent assessment found a discrepancy between the stated purpose and the decision record.`,
    effectsOnEnter: { setFlags: ['gate_fragment_failed'], morale: -8, intelligence: 3 },
    choices: [
      {
        id: 'c9_fragment_fail_forward',
        text: 'The fragment stays. Continue without it.',
        nextNode: 'c9_chapter_resolution',
      },
    ],
  },

  {
    id: 'c9_gate_fragment_secret_end',
    chapter: 'Chapter 9',
    title: 'The Fragment Secured',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `The Chamber is sealed. The fragment is secured. The corruption gradient at the moment of acquisition — controlled, intentional, below the threshold the fourteen crossed — is documented in the mark's record. The entity knows the fragment has transferred. The First Voice knows the fragment has transferred. The Archive's monitor system logs the suspension field's collapse as: GATE COMPONENT TRANSFERRED — BEARER INTEGRITY: INTACT. Whatever the Last Gate requires, you now have something to negotiate with. The chapter is complete. This is the moment Velna built the system to produce.`,
    effectsOnEnter: { setFlags: ['gate_fragment_secret_complete', 'true_ending_req_started'], lastArchive: 10, relics: 1 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_gate_fragment',
    endingType: 'secret',
  },

  // ── THE DREAM OF BEFORE ───────────────────────────────────────────────────

  {
    id: 'c9_dream_of_before_arrive',
    chapter: 'Chapter 9',
    title: 'The Dream of Before',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The Dream of Before is not a physical space accessible from the tunnel network. It is accessible from the mark, at a specific activation threshold, in any quiet place where the bearer chooses to enter it. The mark generates it from the Memory Storm's third-layer fragments and from whatever remains of the bearer's pre-blackout self. The Heir warned it was possible to get in and not want to leave. The Heir's personal note: "I went once. I understand the preference. Do not stay."`,
    effectsOnEnter: { setFlags: ['dream_of_before_arrived'] },
    choices: [
      {
        id: 'c9_dream_enter_standard',
        text: 'Enter the Dream.',
        nextNode: 'c9_dream_pre_collapse',
      },
      {
        id: 'c9_dream_noble_choice',
        text: '[Fallen Noble] You remember more than others. The Dream comes easier.',
        nextNode: 'c9_dream_noble_path',
        requirements: { backgrounds: ['fallen_noble'] },
        effects: { intelligence: 3 },
      },
      {
        id: 'c9_dream_experiment_choice',
        text: '[Runaway Experiment] The experiment suppressed your pre-blackout memory specifically.',
        nextNode: 'c9_dream_experiment_path',
        requirements: { backgrounds: ['runaway_experiment'] },
        effects: { intelligence: 4 },
      },
      {
        id: 'c9_dream_orphan_choice',
        text: '[Wasteland Orphan] You have no before-memory. The Dream shows you what should have been.',
        nextNode: 'c9_dream_orphan_path',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { morale: 5 },
      },
    ],
  },

  {
    id: 'c9_dream_noble_path',
    chapter: 'Chapter 9',
    title: 'What Was Yours',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The fallen noble's memory is more complete than most: a specific family estate above the city, a moment three years before the blackout when a researcher visited to discuss something your family had been involved in for generations, the understanding that the estate's foundations extended below the city into levels with no official name. The Dream shows the visit clearly. The researcher was Velna. Your family knew what was below the city. Your family was involved in the Archive's original founding commission. You were not a random interface selection.`,
    effectsOnEnter: { setFlags: ['dream_noble_memory'], intelligence: 5, morale: -3 },
    choices: [
      {
        id: 'c9_noble_dream_proceed',
        text: 'Your family chose this for you. Or for the system.',
        nextNode: 'c9_dream_identity_full',
      },
    ],
  },

  {
    id: 'c9_dream_experiment_path',
    chapter: 'Chapter 9',
    title: 'What Was Taken',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The runaway experiment's pre-blackout memory was deliberately suppressed — documented in the Glass Court's experiment records Chapter 7 made accessible. The Dream reconstructs what the suppression removed: a research facility, a sequence of mark-interface tests two months before the blackout, a researcher calling you "the most successful primary interface candidate" in a communication not meant to be recorded. The suppression was specifically designed to remove this memory. The experiment was specifically designed to produce this interface. You were not found. You were made.`,
    effectsOnEnter: { setFlags: ['dream_experiment_memory'], intelligence: 6, morale: -8, glassCourt: -10 },
    choices: [
      {
        id: 'c9_experiment_dream_proceed',
        text: 'You were made for this. The Dream shows you the full design.',
        nextNode: 'c9_dream_identity_full',
      },
    ],
  },

  {
    id: 'c9_dream_orphan_path',
    chapter: 'Chapter 9',
    title: 'What Was Never There',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The wasteland orphan has no before-memory because there is none to reconstruct: the mark bonded before the formation of persistent memory. The Dream does not reconstruct what exists — it shows what the mark's selection process looked like from the system's perspective. A function identified. A carrier needed. The earliest eligible host found in the available population. No family. No institution. No researcher. The system found you in a transit station at age four with a mark-compatible neural architecture and a complete absence of prior commitments. "Selected," the Heir said. For you, the Dream shows: selected because there was no one to object.`,
    effectsOnEnter: { setFlags: ['dream_orphan_memory'], intelligence: 4, morale: -5 },
    choices: [
      {
        id: 'c9_orphan_dream_proceed',
        text: 'No one chose you. The system took what was available.',
        nextNode: 'c9_dream_identity_full',
      },
    ],
  },

  {
    id: 'c9_dream_pre_collapse',
    chapter: 'Chapter 9',
    title: 'Before',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The Dream's version of before-the-blackout is specific and quiet: a city that was not yet ruins, a tunnel network that functioned, relic infrastructure maintained rather than salvaged. The mark's primary bonding moment is visible from outside for the first time: a specific location, a specific event, the precise second the interface became active. You were not asleep for it, as the Archive's documentation suggested. You were conscious, aware, and — by the evidence of the Dream's memory layer — you agreed.`,
    effectsOnEnter: { setFlags: ['dream_pre_collapse_seen', 'pre_blackout_consent_known'], intelligence: 5, morale: -5 },
    choices: [
      {
        id: 'c9_dream_go_deeper',
        text: 'Go deeper. See the agreement.',
        nextNode: 'c9_dream_identity_full',
      },
      {
        id: 'c9_dream_stay_here',
        text: 'Stay in this version. The before. Before the agreement.',
        nextNode: 'c9_dream_stay_end',
        effects: { corruption: -3 },
      },
    ],
  },

  {
    id: 'c9_dream_identity_full',
    chapter: 'Chapter 9',
    title: 'The Name',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The Dream's deepest accessible layer contains the name the Archive suppressed at bonding. Not a secret — the suppression was architecture, designed to protect the bearer's operational coherence during the activation period. The operational period is apparently over. The mark provides the name as a complete data object: not a word the Dream speaks aloud but a recognition event. You know who you were. The system chose that person specifically. The entity that took the eight transit-car passengers knows that name. The First Voice used your name when it said: "I did not take the others. They gave themselves."`,
    effectsOnEnter: { setFlags: ['pre_blackout_name_known', 'identity_full_restored'], intelligence: 6, morale: -3 },
    choices: [
      {
        id: 'c9_dream_accept_name',
        text: 'Accept the name. Carry it forward.',
        nextNode: 'c9_dream_return',
        effects: { morale: 8, corruption: -2 },
      },
      {
        id: 'c9_dream_reject_name',
        text: 'Decline the name. The current identity is the one that matters.',
        nextNode: 'c9_dream_return',
        effects: { corruption: -1 },
      },
      {
        id: 'c9_dream_medic_memory',
        text: '[Underground Medic] You remember treating mark-bearers in the tunnels. You treated yourself.',
        nextNode: 'c9_dream_medic_path',
        requirements: { backgrounds: ['underground_medic'] },
        effects: { intelligence: 4, morale: 5 },
      },
    ],
  },

  {
    id: 'c9_dream_medic_path',
    chapter: 'Chapter 9',
    title: 'What You Treated',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The underground medic's pre-blackout work included three marked patients in the eighteen months before the blackout — patients who came with symptoms the official documentation described as "relic-adjacent dermatological anomaly" and which you, privately, suspected were something else. The Dream shows your private notes: you were already studying the mark's medical architecture before your own bonding. You understood the corruption gradient before you were subject to it. The name the Dream provides belongs to a person who was preparing to fight this process — and then became the process. The irony has a specific medical clarity.`,
    effectsOnEnter: { setFlags: ['dream_medic_memory_full'], intelligence: 5, morale: 5 },
    choices: [
      {
        id: 'c9_medic_dream_proceed',
        text: 'You studied this before you became it. Use that knowledge.',
        nextNode: 'c9_dream_return',
        effects: { corruption: -3, morale: 5 },
      },
    ],
  },

  {
    id: 'c9_dream_stay_end',
    chapter: 'Chapter 9',
    title: 'Before It All',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `The Dream is quiet. The city functions. The mark has not bonded yet. The agreement has not been made. In this layer, the specific version of the future that includes the Hunger War and the Water Riot and the fourteen lost marked people and the entity below the city has not happened yet. It will. But in this layer, it has not. The Heir warned it was possible to understand the preference. Their other note, in the margin of the relevant section: "I left because I chose to. I am not confident you will."`,
    effectsOnEnter: { setFlags: ['dream_stay_chosen'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_dream_of_before',
    endingType: 'wanderer',
  },

  {
    id: 'c9_dream_return',
    chapter: 'Chapter 9',
    title: 'Return',
    location: 'The Dream of Before',
    imageKey: 'dream_of_before',
    text: `Out of the Dream. The mark is still warm — the Dream does not reduce it — but something has changed in the relationship between the bearer and the warmth. The name, accepted or declined, has altered the informational context of the mark's operation. The system knows you know. The entity knows you know. The First Voice's next transmission, if it comes, will use different vocabulary. The Dream of Before is complete. Chapter resolution is ahead.`,
    effectsOnEnter: { setFlags: ['dream_complete'], intelligence: 4 },
    choices: [
      {
        id: 'c9_dream_to_resolution',
        text: 'Move to chapter resolution.',
        nextNode: 'c9_chapter_resolution',
      },
    ],
  },

  // ── CHAPTER RESOLUTION ────────────────────────────────────────────────────

  {
    id: 'c9_chapter_resolution',
    chapter: 'Chapter 9',
    title: 'After the Awakening',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The mark has completed its Chapter 9 activation cycle. What was warm is now functional. What was functional is now legible. The chapter's locations have each contributed a specific type of knowledge: what the system is, what the Voice wants, what the other marked people found and lost, what the entity below the city built and why. What remains is the application: what does the current active interface do with everything the awakening revealed?`,
    effectsOnEnter: { setFlags: ['chapter9_resolution_reached'] },
    choices: [
      {
        id: 'c9_resolution_mira_check',
        text: 'Find Mira. Her assessment of the chapter\'s state matters.',
        nextNode: 'c9_mira_final_check',
      },
      {
        id: 'c9_resolution_cain_check',
        text: 'Find Cain. Whether he is still with you matters.',
        nextNode: 'c9_cain_final_check',
      },
      {
        id: 'c9_resolution_route_choice',
        text: 'Set the forward direction. What the mark does next.',
        nextNode: 'c9_mark_final_choice',
      },
      {
        id: 'c9_resolution_true_req',
        text: 'The requirements are in place. Document this moment.',
        nextNode: 'c9_true_ending_req_end',
        requirements: { flags: ['gate_fragment_acquired', 'memory_three_accessed'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c9_mira_final_check',
    chapter: 'Chapter 9',
    title: 'Mira\'s Assessment',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'Mira',
    text: `She has been keeping a log. Not the Archive's monitor log — her own, clinical and honest. "The corruption gradient is measurable. The decision pattern — how you used the mark versus when you chose not to — I've been recording that too." She looks at the notes. "You are below the threshold Lyse hit. You are significantly below the threshold Subjects Four through Ten hit. This is not irrelevant." A pause. "What comes next will have more pressure than what came before. The entity knows where you are. The First Voice has a third broadcast attempt queued. The Last Gate requires a decision the corruption gradient affects directly."`,
    effectsOnEnter: { setFlags: ['mira_final_assessment_ch9'], miraTrust: 3 },
    choices: [
      {
        id: 'c9_mira_assessment_forward',
        text: 'Understood. Continue together.',
        nextNode: 'c9_cain_final_check',
        effects: { miraTrust: 3 },
      },
    ],
  },

  {
    id: 'c9_cain_final_check',
    chapter: 'Chapter 9',
    title: 'Cain\'s Report',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'Cain',
    text: `"The chapter is over. You have the fragment, or you don't." He is not asking — the Archive's monitors show the Chamber's suspension field status. "If you have it, the entity and the Voice both know. You have roughly sixteen hours before the pressure escalates beyond what this district can contain." He pauses. "I will stay. Not because of the mark. Because the decision at the Last Gate is the kind of decision that requires someone present who has no stake in using it for power." A long pause. "The Iron Saints made me someone who could end something that needed ending. I will not be that person unless I need to be. I believe I need to not be it today."`,
    effectsOnEnter: { setFlags: ['cain_final_ch9'], cainTrust: 3 },
    choices: [
      {
        id: 'c9_cain_forward',
        text: 'Noted. Continue.',
        nextNode: 'c9_mark_final_choice',
      },
    ],
  },

  {
    id: 'c9_mark_final_choice',
    chapter: 'Chapter 9',
    title: 'The Mark\'s Purpose',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The chapter's conclusion requires a single stated position: what the mark is for. Not what the system designed it for — what you have decided it is for, given the chapter's full disclosure of the architecture, the Voice, the entity, and the nineteen names. This position carries into Chapter 10 and the Last Gate's approach. The decision is not final — the Last Gate itself will require another — but the stated position here determines which paths remain open.`,
    effectsOnEnter: { setFlags: ['mark_purpose_decision_point'] },
    choices: [
      {
        id: 'c9_route_savior',
        text: 'The mark is for others. The Last Gate opens to protect the tunnel network.',
        nextNode: 'c9_savior_path_unlock',
        effects: { corruption: -3, morale: 10, setFlags: ['savior_path_active', 'mark_purpose_protection'] },
      },
      {
        id: 'c9_route_tyrant',
        text: 'The mark is for control. The Last Gate opens because you open it.',
        nextNode: 'c9_tyrant_path_deepen',
        effects: { corruption: 5, setFlags: ['tyrant_path_active', 'mark_purpose_control'] },
      },
      {
        id: 'c9_route_truth',
        text: 'The mark is for the truth. The Last Gate opens to find out what\'s on the other side.',
        nextNode: 'c9_chapter9_end',
        effects: { intelligence: 4, setFlags: ['truth_seeker_path', 'mark_purpose_truth'] },
      },
    ],
  },

  {
    id: 'c9_savior_path_unlock',
    chapter: 'Chapter 9',
    title: 'Protection',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The position is stated. The mark registers it — the corruption gradient responds to stated purpose with measurable adjustments. Choosing protection over power is not passive. It requires active maintenance under the pressure that comes in Chapter 10, in the entity's escalation, in the Last Gate's approach. The Heir's note on this position: "It is the hardest one to hold. It is also the only one where the fourteen would recognise what you're doing." Route: Savior Ending path unlocked. Proceed to Chapter 10.`,
    effectsOnEnter: { setFlags: ['savior_path_requirements_begun'], corruption: -2, lastArchive: 5, hollowChildren: 5 },
    choices: [
      {
        id: 'c9_savior_to_ch10',
        text: 'Chapter 10 begins. The protection route continues.',
        nextNode: 'chapter10_start',
      },
    ],
  },

  {
    id: 'c9_tyrant_path_deepen',
    chapter: 'Chapter 9',
    title: 'Authority',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `The position is stated. The corruption gradient responds to it — the system has no position on how the interface uses its power. Only on whether it uses it. The mark gets warmer. The First Voice's residual channel widens slightly. The entity's transmission pressure increases by a measurable amount. None of these are threats. They are recognitions: the tyrant path is legible to things that have been managing the marked for three years. They know what this choice tends to produce. They are prepared for it. Route: Tyrant Ending path deepened. Proceed to Chapter 10.`,
    effectsOnEnter: { setFlags: ['tyrant_path_requirements_begun'], corruption: 5 },
    choices: [
      {
        id: 'c9_tyrant_to_ch10',
        text: 'Chapter 10 begins. The control route continues.',
        nextNode: 'chapter10_start',
      },
    ],
  },

  // ── CHAPTER 9 END ─────────────────────────────────────────────────────────

  {
    id: 'c9_chapter9_end',
    chapter: 'Chapter 9',
    title: 'The Mark Settles',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    text: `Chapter 9 ends where it began: in the maintenance corridor, the Relic Scar's exposed wall at your back. The mark is fully awake now — not the warmth of potential but the specific heat of function. Nineteen names. Fourteen lost. Four still operating somewhere in the city by the machine network's record. One current active interface. The Last Gate requires your mark to open. The entity below the city knows your pre-blackout name. The First Voice has a third attempt queued. Cain will stay unless he has to leave. Mira is keeping her log. The gate fragment is in your possession, or it is not, and the entity and the Voice each know which. Chapter 10: Broken Companions. The mark is warm. Begin.`,
    effectsOnEnter: { setFlags: ['chapter9_complete'], morale: 3 },
    choices: [
      {
        id: 'c9_survived_to_ch10',
        text: 'Chapter 10 begins. Begin.',
        nextNode: 'chapter10_start',
      },
    ],
  },

  // ── SUPPLEMENTAL NODES ────────────────────────────────────────────────────

  {
    id: 'c9_heir_second_meeting',
    chapter: 'Chapter 9',
    title: 'The Heir Returns',
    location: 'The Marked Shrine',
    imageKey: 'marked_shrine',
    speaker: 'The Masked Heir',
    text: `They return to the Shrine while you are still reading. "You went to the Scar door first. Good." They examine your corruption reading without asking permission — the same direct assessment they applied to their own mark earlier. "Below the threshold that concerned Lyse at this stage. A meaningful distinction." They sit near the records. "The fragment will evaluate you on intention rather than outcome. The system was designed by someone who believed that the intent behind a mark-use is as structurally significant as the use itself. Whether they were right is something you will find out in the Chamber."`,
    effectsOnEnter: { setFlags: ['heir_second_meeting'], intelligence: 3 },
    choices: [
      {
        id: 'c9_heir_second_forward',
        text: '"Thank you." Continue.',
        nextNode: 'c9_shrine_complete',
      },
    ],
  },

  {
    id: 'c9_mark_madness_end',
    chapter: 'Chapter 9',
    title: 'The Mark Speaks',
    location: 'The Pulse Engine',
    imageKey: 'pulse_engine',
    text: `It is not a dramatic moment. The mark does not take over with a visible seizure or a broadcast three corridors register. It is a gradual replacement: the specific type of reasoning the bearer has been using — cost-benefit, ethical, relational — is replaced by a simpler reasoning. Mark output. Reduction of obstacles to mark output. The fourteen accounts each described a moment when the subject felt their reasoning simplify. The Heir called it "clarity without conscience." The clarity is real. The conscience goes somewhere not accessible from the outside.`,
    effectsOnEnter: { setFlags: ['mark_madness_end'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_mark_madness',
    endingType: 'death',
  },

  {
    id: 'c9_varr_dissect_end',
    chapter: 'Chapter 9',
    title: 'The Research',
    location: 'The Relic Scar',
    imageKey: 'relic_scar',
    speaker: 'Director Varr',
    text: `Varr's colleagues were more prepared than he indicated. The suppression device was the first measure. The second measure was in the corridor the mark-bearer had to pass through after cooperating. The research requirements were legitimate — Varr spent three years on this for reasons that were not only institutional. The data acquired advances the understanding of mark failure by approximately eighteen months. The Glass Court does not receive this data. Varr's final note in the research log: "Interface ACTIVE duration: Chapter 1 through Chapter 9. Termination: voluntary subject cooperation. Successor interface: unknown. System will select."`,
    effectsOnEnter: { setFlags: ['varr_dissects'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch9_varr_dissects',
    endingType: 'death',
  },

  {
    id: 'c9_true_ending_req_end',
    chapter: 'Chapter 9',
    title: 'The Requirements Begin',
    location: 'The Gate Fragment Chamber',
    imageKey: 'gate_fragment_chamber',
    text: `The gate fragment is acquired, the corruption gradient managed, the Memory Storm's three fragments carried, the Heir's warning understood, and the pre-blackout name known. These are the beginning of the requirements the True Ending demands — not the last requirements, but the necessary first ones. The Archive's monitor system has registered the fragment acquisition. Mael's documentation is complete. Velna, if she could see this chapter, would recognise what she built and what she hoped it would produce. Proceed to Chapter 10. The requirements continue there.`,
    effectsOnEnter: { setFlags: ['true_ending_req_chapter9_complete'], lastArchive: 10, relics: 1 },
    choices: [
      {
        id: 'c9_true_req_to_ch10',
        text: 'Chapter 10 begins. The requirements continue.',
        nextNode: 'chapter10_start',
      },
    ],
  },
];
