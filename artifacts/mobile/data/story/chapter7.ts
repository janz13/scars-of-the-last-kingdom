import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 7 — THE LAST ARCHIVE
//
//  Theme: Forbidden knowledge, memory, truth, history, lies, and the cost
//         of knowing too much.
//
//  The Last Archive is a hidden order preserving old-world knowledge, relic
//  research, banned records, and the truth behind the blackout. The player
//  arrives from Chapter 6 and is tested, judged, suspected, and eventually
//  given access to records that cannot be unread.
//
//  Locations:
//    The Door Without a Name · The Dust Library · The Memory Vault
//    The Ink Chapel · The Broken Observatory · The Relic Map Room
//    The Forbidden Stacks · The Archive Tribunal · The Hollow Lecture Hall
//    The Blackout Record Chamber · The Sleeping Server
//
//  Key NPCs:
//    Archivist Mael       — keeper of forbidden records. Calm, precise,
//                           waiting for someone with the mark.
//    Vera Quill           — field scholar who distrusts the player. Her
//                           distrust is based on something she has read.
//    The Blind Indexer    — a relic-touched librarian who sees memories
//                           instead of faces. Knows what you were before.
//    Prof. Ansel Vorn     — old-world scientist connected to the blackout.
//                           In hiding inside the Archive. Recognises you.
//    The Ink Judge        — leader of the Archive Tribunal. Enforces the
//                           law of restricted knowledge with no exceptions.
//    The Sleeping Server  — an AI-like relic system that remembers the old
//                           city in full. The only entity that has no reason
//                           to lie about the blackout.
//
//  Required Reveals:
//    - The blackout was planned by human leaders and relic systems together
//    - The player may have been part of the original blackout project
//    - The wrist mark is a relic interface, not a curse or infection remnant
//    - The city was sealed to contain something underneath it
//    - Glass Court, Iron Saints, and Last Archive all hid parts of the truth
//    - The final relic gate exists beneath the city
//
//  Entry: chapter7_start
//  Flags from Ch6 that matter: choir_alliance_confirmed, glass_court_exposed_broadcast,
//    mira_cure_complete, first_voice_solen_identity, psychic_memory_complete,
//    elian_saved, rook_protection_sworn, chapter6_complete, choir_exile,
//    cain_merciless_road, chapter6_esper_route, last_kingdom_full_understood
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_7_NODES: StoryNode[] = [

  // ── ENTRY ────────────────────────────────────────────────────────────────────

  {
    id: 'chapter7_start',
    chapter: 'Chapter 7',
    title: 'The Last Archive',
    location: 'Archive Approach — Deep Tunnel Junction',
    imageKey: 'door_without_name',
    text: `The tunnel junction has no name on any map you have seen. The passage branches three ways: the faction routes you arrived through and, at the centre, a sealed corridor that the air pressure says is connected to something much larger. The mark on your wrist is warm in the specific way it gets warm near Archive infrastructure — the deep, slow warmth of something that has been waiting without impatience. There are no guards. No signs. Nothing that would tell someone who had not already been looking that this path existed. You have been looking, for several chapters, and you are here. The knowledge of what happened in the Glass Court, the Choir, the infected tunnels — all of it sits behind your eyes as you walk forward. The Archive will read all of it. That is what Archives do.`,
    effectsOnEnter: { setFlags: ['chapter7_entered', 'archive_approach_reached'], morale: -3 },
    choices: [
      {
        id: 'c7_approach_standard',
        text: 'Walk the centre corridor. The mark is pointing this way.',
        nextNode: 'c7_approach_archive',
      },
      {
        id: 'c7_approach_choir_route',
        text: '[Red Choir Alliance] Use the Choir\'s broadcast network credentials. They said this would open the eastern approach.',
        nextNode: 'c7_approach_archive',
        requirements: { flags: ['choir_alliance_confirmed'] },
        isHidden: true,
        effects: { setFlags: ['choir_archive_approach'], lastArchive: 10, redChoir: 5 },
      },
      {
        id: 'c7_approach_psychic',
        text: '[Psychic Memory] You already know the layout from the Echo Chamber\'s transmission. Walk directly to the test.',
        nextNode: 'c7_door_arrive',
        requirements: { flags: ['psychic_memory_complete'] },
        isHidden: true,
        effects: { setFlags: ['archive_layout_known'], intelligence: 3 },
      },
    ],
  },

  {
    id: 'c7_approach_archive',
    chapter: 'Chapter 7',
    title: 'The Approach',
    location: 'Archive Approach — The Unmarked Corridor',
    imageKey: 'door_without_name',
    text: `The corridor is half a kilometre long and entirely unlit except for the mark on your wrist, which produces a faint luminescence that was not visible in the Choir's brighter tunnels. The walls are pre-collapse concrete sealed with something that has the texture of old-world polymer and the faint resonance of a relic casing. Every thirty metres, a symbol has been carved into the wall at eye level — the same symbol, repeated. It is not a faction insignia. It is something older. The mark on your wrist and the symbol on the walls produce, at the moments when you pass each one, a sound in the register below hearing. A confirmation. The Archive knows something is approaching that belongs here.`,
    effectsOnEnter: { corruption: 1, intelligence: 2 },
    choices: [
      {
        id: 'c7_approach_examine_symbols',
        text: 'Stop and examine the symbols. They are not decorative.',
        nextNode: 'c7_door_arrive',
        effects: { intelligence: 2, setFlags: ['archive_symbols_read'] },
      },
      {
        id: 'c7_approach_move_through',
        text: 'Keep moving. The mark is the credential. Everything else is atmosphere.',
        nextNode: 'c7_door_arrive',
      },
    ],
  },

  // ── THE DOOR WITHOUT A NAME ──────────────────────────────────────────────────

  {
    id: 'c7_door_arrive',
    chapter: 'Chapter 7',
    title: 'The Door Without a Name',
    location: 'The Door Without a Name — Threshold',
    imageKey: 'door_without_name',
    text: `The door is three metres of layered archive material — polymer over steel over relic-composite — with no handle, no lock, no visible mechanism. In the centre, at wrist height, is a depression the exact shape and depth of a mark imprint. Not close — exact. The same contours, the same edges, the same seventeen connection points that the mark on your wrist describes when it reaches its fullest extension. Someone built this door specifically for whoever carries this mark. The door has been waiting since the blackout. Possibly longer. You raise your wrist. The mark meets the depression. For six seconds, nothing happens. Then the door opens inward, and the smell of twelve years of preserved records — paper, compressed carbon, something chemical that was used to seal forbidden materials — comes through the gap. A woman is standing in the threshold, holding a lantern, watching you with an expression that contains equal parts relief and suspicion.`,
    effectsOnEnter: { setFlags: ['archive_door_opened', 'chapter7_entered_deep'], lastArchive: 15 },
    choices: [
      {
        id: 'c7_door_acknowledge_vera',
        text: 'Meet her gaze. "You were expecting someone with this mark."',
        nextNode: 'c7_vera_hostile',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_door_enter_silent',
        text: 'Step through without speaking. Establish that you are not a petitioner.',
        nextNode: 'c7_vera_hostile',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c7_vera_hostile',
    chapter: 'Chapter 7',
    title: 'Vera Quill',
    location: 'The Door Without a Name — Entry Hall',
    imageKey: 'door_without_name',
    speaker: 'Vera Quill',
    text: `"You took eleven days," she says. "We expected the mark seven days ago, based on the signal traces from Choir territory." She does not move out of the doorway. "Vera Quill. Field Scholar, Classification Three. I have been assigned to your initial assessment, which means I am the person who decides whether you are cleared to go further." She looks at the mark on your wrist with the careful attention of someone who has read about it extensively. "The records we have about you are incomplete. Several key items in your file were redacted before the blackout, which means someone with Archive clearance was protecting your information fourteen years ago." She looks at your face. "I need to know if you are the person the Archivist is expecting, or if someone sent a decoy. The two possibilities require different responses."`,
    dialogue: 'You took eleven days. We expected the mark seven days ago.',
    effectsOnEnter: { setFlags: ['met_vera_quill'] },
    choices: [
      {
        id: 'c7_vera_respond_direct',
        text: '"I am the person with the mark. That should be enough."',
        nextNode: 'c7_vera_questions',
        effects: { charisma: 1 },
      },
      {
        id: 'c7_vera_respond_questions',
        text: '"Ask your questions. I\'ll answer what I can."',
        nextNode: 'c7_vera_questions',
        effects: { intelligence: 1, lastArchive: 3 },
      },
      {
        id: 'c7_vera_scholar_approach',
        text: '[Forgotten Scholar] Cite the Archive\'s documented protocol for mark-carriers. You have read it.',
        nextNode: 'c7_door_mael_summon',
        requirements: { backgrounds: ['forgotten_scholar'] },
        isHidden: true,
        effects: { setFlags: ['vera_scholar_bypassed'], lastArchive: 8, intelligence: 2 },
      },
    ],
  },

  {
    id: 'c7_vera_questions',
    chapter: 'Chapter 7',
    title: 'The Assessment',
    location: 'The Door Without a Name — Entry Hall',
    imageKey: 'door_without_name',
    speaker: 'Vera Quill',
    text: `She asks questions for twenty minutes, working from a list on a glass card that has been scratched through and rewritten several times. She asks about the Choir, about the Glass Court, about the First Voice, about what happened in the blackout tunnels. She asks the questions with precise neutral affect, the way someone asks questions when they already know some of the answers and are calibrating the responses. When she finishes, she is quiet for a long moment. "You have been in contact with more of the city's active relic systems than anyone we have documented since the blackout," she says. "That either means the Archive sent you a particularly effective training route, or you are the person described in the sealed file." She steps aside. "Archivist Mael will see you. I will not pretend I am comfortable with this, because I have read your file and there are things in it I am not cleared to discuss with you directly." She walks ahead. "Follow me."`,
    effectsOnEnter: { setFlags: ['vera_assessment_complete'], intelligence: 2 },
    choices: [
      {
        id: 'c7_vera_ask_file',
        text: '"What is in my file that you\'re not cleared to discuss?"',
        nextNode: 'c7_door_mael_summon',
        effects: { intelligence: 2, setFlags: ['vera_file_question_asked'] },
      },
      {
        id: 'c7_vera_follow_silent',
        text: 'Follow her without asking. You will find the file yourself.',
        nextNode: 'c7_door_mael_summon',
        effects: { setFlags: ['vera_followed_silent'] },
      },
    ],
  },

  {
    id: 'c7_door_mael_summon',
    chapter: 'Chapter 7',
    title: 'Into the Archive',
    location: 'The Door Without a Name — Inner Passage',
    imageKey: 'dust_library',
    text: `The inner passage opens into something that was not visible from outside: a library space that descends rather than extends horizontally, tiered rings of shelving cut into rock, each one lit by a different relic-lamp that produces a different quality of light — some warm, some the clinical blue of pre-collapse fluorescent, some a purple that has no natural analogue and sits at the edge of what the eye can process. The smell of the records is stronger here. Compressed memory, physically stored. Vera leads you through three levels of descending stacks to a door that is simply marked ARCHIVIST, and knocks twice. A voice answers immediately — not from behind the door but from the air, distributed through something. "Send them in."`,
    effectsOnEnter: { setFlags: ['archive_interior_reached'], morale: 3 },
    choices: [
      {
        id: 'c7_enter_mael_office',
        text: 'Enter.',
        nextNode: 'c7_dust_library_arrive',
      },
    ],
  },

  // ── THE DUST LIBRARY ─────────────────────────────────────────────────────────

  {
    id: 'c7_dust_library_arrive',
    chapter: 'Chapter 7',
    title: 'The Dust Library',
    location: 'The Dust Library — Archivist\'s Reading Room',
    imageKey: 'dust_library',
    text: `The Archivist is not what you expected. Mael is perhaps sixty, built like someone who has spent decades lifting archive boxes rather than sitting at a desk, with the specific kind of calm that comes from knowing something for a very long time without being able to tell anyone about it. He stands when you enter — not from deference, from habit — and looks at the mark on your wrist the way a technician looks at a piece of equipment they designed and then lost for fourteen years. "There you are," he says. It is not a greeting. It is the statement of someone closing a very long search. He sits again and gestures to the chair across from him. "The mark is Velna's work. The architecture is Archive-derived, modified by the Glass Court's pre-collapse relic division before the blackout. I know what it does. I know what it was designed to do. I know why Velna chose your specific neural architecture to carry it." He folds his hands. "The question I cannot answer from the records is whether you know any of this."`,
    dialogue: 'There you are.',
    effectsOnEnter: { setFlags: ['met_archivist_mael', 'mael_first_meeting'], lastArchive: 10 },
    choices: [
      {
        id: 'c7_mael_know_nothing',
        text: '"I know the mark is a receiver. I know it reacts to Archive infrastructure. That is what I have been able to determine."',
        nextNode: 'c7_mael_intro',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_mael_know_choir',
        text: '"I know the First Voice confirmed the mark and the infection share a source. I know my name was in the Choir\'s transmission records before the blackout."',
        nextNode: 'c7_mael_intro',
        effects: { intelligence: 2, lastArchive: 5, setFlags: ['mael_choir_informed'] },
      },
      {
        id: 'c7_mael_know_psychic',
        text: '[Psychic Memory complete] "I know the Last Kingdom is a transmission state, not a location. I know the seventeen-node network structure. I know Velna\'s design intent."',
        nextNode: 'c7_mael_intro',
        requirements: { flags: ['psychic_memory_complete'] },
        isHidden: true,
        effects: { intelligence: 4, lastArchive: 15, setFlags: ['mael_full_context_known'] },
      },
      {
        id: 'c7_mael_scholar_research',
        text: '[Forgotten Scholar] Ask to see the original Archive classification system before he continues. Establish the research context.',
        nextNode: 'c7_dust_scholar_route',
        requirements: { backgrounds: ['forgotten_scholar'] },
        isHidden: true,
        effects: { intelligence: 3, lastArchive: 8 },
      },
    ],
  },

  {
    id: 'c7_mael_intro',
    chapter: 'Chapter 7',
    title: 'What Mael Knows',
    location: 'The Dust Library — Archivist\'s Reading Room',
    imageKey: 'dust_library',
    speaker: 'Archivist Mael',
    text: `"The mark is not a curse, a disease, or a relic fragment," he says. "It is an interface. A precisely engineered relic interface designed to interact with the Archive's transmission network at its highest resolution. Velna built it to survive the blackout — it was not supposed to survive the blackout in a living body. The original design called for the mark to be housed in a controlled relic casing. Something intervened and placed it in a person." He pauses. "You. The specific person it was placed in was not random. The Archive's pre-blackout personnel files include a psychological and neurological profile designated Subject Seven, classified above my clearance. The description matches what Vera's assessment recorded about you." He looks at the mark. "The Archive has been waiting for you specifically because the transmission network the mark belongs to cannot be completed without the mark's carrier making a series of decisions. You are not just the messenger. You are the key." He opens a drawer and sets a glass card on the table between you. "The Library is open to you. I will answer what I can. Vera will resist you, and she has reasons. I recommend going to the Memory Vault first."`,
    effectsOnEnter: { setFlags: ['mark_interface_confirmed', 'subject_seven_known', 'archive_waiting_confirmed'] },
    choices: [
      {
        id: 'c7_mael_memory_vault',
        text: '"The Memory Vault. Where is it?"',
        nextNode: 'c7_mael_trust_offer',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_mael_ask_velna',
        text: '"Who is Velna? The First Voice mentioned that name."',
        nextNode: 'c7_mael_trust_offer',
        effects: { intelligence: 2, setFlags: ['velna_archive_question'] },
      },
      {
        id: 'c7_mael_blind_indexer',
        text: '"You mentioned the Blind Indexer in Vera\'s assessment notes. I want to meet them first."',
        nextNode: 'c7_blind_indexer_meet',
        effects: { setFlags: ['indexer_sought'] },
      },
    ],
  },

  {
    id: 'c7_mael_trust_offer',
    chapter: 'Chapter 7',
    title: 'The Archive\'s Terms',
    location: 'The Dust Library — Archivist\'s Reading Room',
    imageKey: 'dust_library',
    speaker: 'Archivist Mael',
    text: `"The Archive\'s trust is not given," he says. "It is documented. Every action you take inside this building goes into the record. The record is the Archive. If you behave as the record predicts for someone carrying Subject Seven's profile, the deeper levels open. If you deviate — if you steal, if you destroy, if you expose our location to factions that have been trying to find us for twelve years — the record closes, and so do the doors." He stands and moves to a panel in the wall. It opens into a short corridor. "The Library is accessible from this corridor. The Memory Vault is at the east end of Level Three. The Broken Observatory is above — ask Vera to show you the stairs. The Relic Map Room requires my clearance, which I will grant after you have visited the Vault." He looks at you. "Velna was the Archive's chief relic engineer. She designed the mark, designed Subject Seven's integration, designed the transmission architecture that the blackout was supposed to complete. She died in the blackout. The First Voice you encountered in the Choir was built partly from her transmissions." A pause. "She was not killed in the blackout. She was killed before it. By the people who planned it."`,
    effectsOnEnter: { setFlags: ['velna_death_known', 'archive_trust_system_explained'], lastArchive: 5 },
    choices: [
      {
        id: 'c7_trust_go_vault',
        text: 'Go to the Memory Vault.',
        nextNode: 'c7_memory_vault_arrive',
      },
      {
        id: 'c7_trust_go_observatory',
        text: 'Go to the Broken Observatory first. You want to understand the science before the history.',
        nextNode: 'c7_observatory_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_trust_go_theft',
        text: 'Survey the Library\'s security layout. Mael\'s openness is either genuine or a trap.',
        nextNode: 'c7_dust_theft_survey',
        effects: { setFlags: ['theft_route_considered'] },
      },
      {
        id: 'c7_trust_go_chapel',
        text: 'Go to the Ink Chapel first. The Subject Seven cover page is on the wall. You need to see it.',
        nextNode: 'c7_ink_chapel_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_trust_relic_read',
        text: '[Relic Hunter] Examine the relic markings on the corridor panels. The design pattern is familiar.',
        nextNode: 'c7_dust_relic_read',
        requirements: { classes: ['relic_hunter'] },
        isHidden: true,
        effects: { intelligence: 3, setFlags: ['relic_architecture_read'] },
      },
    ],
  },

  {
    id: 'c7_dust_scholar_route',
    chapter: 'Chapter 7',
    title: 'The Scholar\'s Approach',
    location: 'The Dust Library — Index Section',
    imageKey: 'dust_library',
    text: `The classification system is the oldest surviving document in the Archive. It predates the factions, predates the blackout, predates the city's sealing by eleven years. The Forgotten Scholar's training — rigorous, systematic, the discipline of someone who learned to read before they learned to speak — makes the old notation immediately legible. The system describes categories of knowledge that have no names in any current language: there is a classification for records about the mark that translates roughly as "active relic interface history." There is a classification for records about the player's pre-blackout identity that translates as "subject with deliberate biographical erasure." There is a classification for the blackout itself that translates as "consensual catastrophe with minority dissent." You take careful notes. Mael watches you work without interrupting.`,
    effectsOnEnter: { setFlags: ['archive_scholar_route', 'classification_system_read'], intelligence: 4, lastArchive: 8 },
    choices: [
      {
        id: 'c7_scholar_proceed_mael',
        text: '"I want to see the records under each of these classifications."',
        nextNode: 'c7_mael_trust_offer',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_scholar_indexer',
        text: 'Find the Blind Indexer. They will know where the classification records are stored.',
        nextNode: 'c7_blind_indexer_meet',
      },
    ],
  },

  {
    id: 'c7_dust_theft_survey',
    chapter: 'Chapter 7',
    title: 'The Theft Survey',
    location: 'The Dust Library — Open Stacks',
    imageKey: 'dust_library',
    text: `The Archive's security is not what you expected from a twelve-year-old hidden institution. It is not physical — no guards beyond Vera's roving presence, no locked cases, no access panels on the open stacks. The security is documentary: every record that leaves a shelf activates a small relic marker that logs the removal, the reader, and the duration. The logs are maintained by something you cannot see — the Sleeping Server, you will learn later, processes all the markers simultaneously. Taking a record without logging the reader would require disabling the marker first, which would require understanding the relic architecture, which would require the Relic Map Room. The theft route is possible. It is not simple.`,
    effectsOnEnter: { setFlags: ['theft_route_mapped'], intelligence: 2 },
    choices: [
      {
        id: 'c7_theft_proceed_trust',
        text: 'Work within the Archive\'s system for now. Theft is available if trust is denied.',
        nextNode: 'c7_mael_trust_offer',
        effects: { setFlags: ['theft_route_deferred'] },
      },
      {
        id: 'c7_theft_courier_contacts',
        text: '[Black Market Courier] You know how stolen records are moved in the tunnel markets. Plan the extraction route.',
        nextNode: 'c7_mael_trust_offer',
        requirements: { backgrounds: ['black_market_courier'] },
        isHidden: true,
        effects: { setFlags: ['theft_extraction_planned', 'courier_route_mapped'], intelligence: 2 },
      },
    ],
  },

  {
    id: 'c7_dust_relic_read',
    chapter: 'Chapter 7',
    title: 'The Relic Architecture',
    location: 'The Dust Library — Relic Integration Panel',
    imageKey: 'dust_library',
    text: `The corridor panels are not structural. A Relic Hunter's eye for integration patterns — the signature seam-lines, the embedded frequency nodes, the characteristic weight distribution of materials that were designed to carry something rather than simply exist — identifies the panels as relic housing units. The entire Archive corridor system is a distributed relic network. The records in the stacks are not just preserved here. They are integrated into the relic architecture. The documents and the building are the same object. Removing a record without Archive clearance would not just trigger a security log — it would physically damage the building's structural relic matrix. The theft route carries a structural cost that the Black Market Courier's plan would not account for.`,
    effectsOnEnter: { setFlags: ['relic_archive_integration_known', 'archive_structure_understood'], intelligence: 4, lastArchive: 5 },
    choices: [
      {
        id: 'c7_relic_read_proceed',
        text: 'This changes the theft calculation entirely. Work with Mael.',
        nextNode: 'c7_mael_trust_offer',
        effects: { setFlags: ['theft_route_assessed'] },
      },
    ],
  },

  {
    id: 'c7_blind_indexer_meet',
    chapter: 'Chapter 7',
    title: 'The Blind Indexer',
    location: 'The Dust Library — Index Chamber',
    imageKey: 'dust_library',
    text: `The Blind Indexer has no name on record anywhere in the Archive. She is referred to in every document that mentions her only as the Indexer, which Mael confirms is her preference. She appears to be in her seventies and is entirely blind — not from damage but from the relic-touch, the specific neurological alteration that occurs when a person handles too many active relic records over too many years without adequate shielding. Her vision was replaced by something else. She indexes the Archive's complete record in real time, not by reading but by experiencing it — the records flow through her and are filed. She turns toward you before you reach speaking distance. "The mark," she says. "Subject Seven. You are late, but the record shows you were delayed by the Choir. The Choir situation explains the latency." She holds out her hand. "You would like to know what I see when I look at you. Sit down. This takes a moment."`,
    dialogue: 'Subject Seven. You are late, but the record shows you were delayed by the Choir.',
    effectsOnEnter: { setFlags: ['met_blind_indexer'], intelligence: 2 },
    choices: [
      {
        id: 'c7_indexer_give_hand',
        text: 'Give her your hand. Let her see what she sees.',
        nextNode: 'c7_blind_indexer_sees',
        effects: { corruption: 1 },
      },
      {
        id: 'c7_indexer_esper_read',
        text: '[Esper] Before giving her your hand — read her psychic imprint first. Understand the structure of what she perceives.',
        nextNode: 'c7_blind_indexer_sees',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { intelligence: 4, setFlags: ['indexer_esper_read'], corruption: 2 },
      },
    ],
  },

  {
    id: 'c7_blind_indexer_sees',
    chapter: 'Chapter 7',
    title: 'What the Indexer Sees',
    location: 'The Dust Library — Index Chamber',
    imageKey: 'dust_library',
    speaker: 'The Blind Indexer',
    text: `She holds your hand for forty seconds without speaking. Her expression moves through several configurations — surprise, recognition, something that resembles grief — before settling into the careful neutrality of someone processing information she was not prepared to receive. "You were here before," she says. "Not here. In the Archive's records. There is a file with your specific neural frequency architecture on it, dated fourteen years before the blackout, classified at a level that not even Mael has access to. It is in the Forbidden Stacks." She releases your hand. "You were a project. A very specific project. The mark was built for your architecture — not chosen from a pool of candidates. Built for you specifically, before you were the person you are now. The blackout changed who you were. The person you were before the blackout knew exactly what the mark was for." She is quiet for a moment. "The person you were before the blackout agreed to it."`,
    effectsOnEnter: { setFlags: ['indexer_reading_complete', 'pre_blackout_self_known', 'forbidden_stacks_lead'] },
    choices: [
      {
        id: 'c7_indexer_forbidden_stacks',
        text: '"The Forbidden Stacks. How do I get there?"',
        nextNode: 'c7_blind_indexer_memory',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_indexer_agree_question',
        text: '"You said I agreed to it. What does that mean — if the blackout changed who I was?"',
        nextNode: 'c7_blind_indexer_memory',
        effects: { intelligence: 2, corruption: 1 },
      },
    ],
  },

  {
    id: 'c7_blind_indexer_memory',
    chapter: 'Chapter 7',
    title: 'Before the Blackout',
    location: 'The Dust Library — Index Chamber',
    imageKey: 'dust_library',
    speaker: 'The Blind Indexer',
    text: `"Agreeing to it and still being the person who agreed to it are different states," she says. "The blackout was a hard reset. The city, the people, the systems — all reset to a different configuration. What survived the reset was the mark's architecture and whatever was embedded in it before the reset. Your identity, your memories of who you were, your ability to access the full context of what you agreed to — those were among the things that did not survive." She turns back to her shelving with the patience of someone who has said difficult things many times. "The Forbidden Stacks have your file. Getting into the Forbidden Stacks requires Mael's clearance or the Sleeping Server's authentication. The Server will authenticate the mark directly — it was built with the same architecture." She pauses. "The Memory Vault will give you fragments. Not all of it. Fragments. It is less than the truth and more than nothing."`,
    effectsOnEnter: { setFlags: ['blackout_reset_understood'], intelligence: 3 },
    choices: [
      {
        id: 'c7_indexer_go_vault',
        text: 'Go to the Memory Vault. Fragments are a start.',
        nextNode: 'c7_memory_vault_arrive',
      },
      {
        id: 'c7_indexer_go_server',
        text: 'Go directly to the Sleeping Server. Skip the fragments — get the full record.',
        nextNode: 'c7_sleeping_server_arrive',
        effects: { corruption: 2 },
      },
    ],
  },

  // ── THE MEMORY VAULT ─────────────────────────────────────────────────────────

  {
    id: 'c7_memory_vault_arrive',
    chapter: 'Chapter 7',
    title: 'The Memory Vault',
    location: 'The Memory Vault — Entry Chamber',
    imageKey: 'memory_vault',
    text: `The Memory Vault is not a metaphor. It is a room the size of a metro carriage filled with sealed relic containers — small glass-and-composite cases, each one housing a recorded memory. The memories are not written. They were transferred directly from subjects into the relic medium during the pre-collapse Archive's research phase. The subject list on the Vault's exterior panel, visible to anyone with reading clearance, includes names you do not recognise and one name you do: the designation used in your file. Subject Seven. There are fourteen memory containers listed under your designation. The Vault's relic ambient is intense — the mark responds to every container simultaneously, a low-level resonance that is not pain and is not pleasure and is not the Choir's frequency. It is something older. Recognition of its own architecture.`,
    effectsOnEnter: { setFlags: ['memory_vault_reached'], corruption: 2, intelligence: 2 },
    choices: [
      {
        id: 'c7_vault_access_first',
        text: 'Access the first memory container. Start at the beginning.',
        nextNode: 'c7_memory_fragment_one',
      },
      {
        id: 'c7_vault_mira_together',
        text: '[Mira present] Ask Mira to monitor your readings while you access the memories. Her medical oversight matters here.',
        nextNode: 'c7_memory_fragment_one',
        requirements: { miraPresent: true },
        isHidden: true,
        effects: { miraTrust: 3, setFlags: ['mira_vault_present'] },
      },
    ],
  },

  {
    id: 'c7_memory_fragment_one',
    chapter: 'Chapter 7',
    title: 'The First Fragment',
    location: 'The Memory Vault — Access Chair',
    imageKey: 'memory_vault',
    text: `The memory is from before the city had its current name. A room with large windows looking over a skyline that no longer exists — towers intact, sky visible, night, the specific shade of city-night that requires millions of functioning lights. A workbench covered in tools that were used to build archive hardware. On the workbench, among the tools: an object that is not finished. An object with seventeen connection points arranged in the exact pattern of the mark on your wrist. You — the person whose memory this is — pick it up. Hold it. It responds to your hands the way the mark responds to Archive infrastructure. With recognition. You are in a conversation with this object that you have been having for a long time. The memory ends. You are in the Vault again. The mark on your wrist is warmer than it has ever been. Not uncomfortably. As if it has been waiting for you to remember it was always yours.`,
    effectsOnEnter: { setFlags: ['memory_one_accessed', 'pre_blackout_workshop_seen'], corruption: 1 },
    choices: [
      {
        id: 'c7_vault_access_second',
        text: 'Access the second memory container.',
        nextNode: 'c7_memory_player_past',
        effects: { corruption: 1 },
      },
      {
        id: 'c7_vault_process_first',
        text: 'Sit with the first memory. Let it settle before continuing.',
        nextNode: 'c7_memory_player_past',
        effects: { morale: 3, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c7_memory_player_past',
    chapter: 'Chapter 7',
    title: 'Who You Were',
    location: 'The Memory Vault — Access Chair',
    imageKey: 'memory_vault',
    text: `The second memory is a meeting. A room with seven people. Six of them are unfamiliar. The seventh — the person whose memory this is — is you. Not exactly the person you are now. The same underlying architecture, the same mark, but the weight of someone who has not yet lost everything and rebuilt from the residue. The meeting is about the blackout. Not about whether it will happen — about how to control the damage when it does. About which systems will survive, which records must be preserved, which people can be trusted to remember what the others will be allowed to forget. Your pre-blackout self is quiet in this meeting, listening, occasionally asking questions that shift the direction of the conversation without appearing to. The people in the room defer to your questions. Not to your title or your faction affiliation — to the mark. They defer to the mark. Your pre-blackout self knew exactly what the mark was for, and the people in that room knew it too.`,
    effectsOnEnter: { setFlags: ['pre_blackout_meeting_seen', 'blackout_planning_witnessed'], intelligence: 3 },
    choices: [
      {
        id: 'c7_vault_access_blackout',
        text: 'Access the third memory. The blackout planning session.',
        nextNode: 'c7_memory_blackout_day',
        effects: { corruption: 2 },
      },
      {
        id: 'c7_vault_process_context',
        text: 'Stop and think. You were in the room when they planned the blackout. Process what that means.',
        nextNode: 'c7_memory_blackout_day',
        effects: { morale: -5, intelligence: 2 },
      },
    ],
  },

  {
    id: 'c7_memory_blackout_day',
    chapter: 'Chapter 7',
    title: 'The Day of the Blackout',
    location: 'The Memory Vault — Access Chair',
    imageKey: 'memory_vault',
    text: `The third memory is the blackout itself. You are in a sealed room below the city — a room with the Archive's symbol on every wall — and the mark on your wrist is open fully, receiving, broadcasting, completing a transmission cycle that was designed to interact with seventeen specific nodes across the city simultaneously. The room is shaking. Something above is catastrophically wrong. Not from the transmission — from the people who decided to stop the transmission by destroying its infrastructure before it could complete. Through the mark's open reception you feel, in rapid succession: a system going dark, then another, then another, and with each one going dark the specific texture of a person — living, thinking, networked into the Archive's relic system — extinguishing. Not dying. Being reset. The people around you in the sealed room are holding each other. Some of them are crying. Your pre-blackout self closes the mark deliberately — one connection at a time — because leaving it open when the resets complete would take you with them. The last thing you receive before the reset hits you too is a single transmission: Velna's voice, in the mark's frequency, saying your name. Then black. Then twelve years later. Then now.`,
    effectsOnEnter: { setFlags: ['blackout_memory_accessed', 'velna_final_transmission_known', 'blackout_player_role_confirmed'], corruption: 4, morale: -8 },
    choices: [
      {
        id: 'c7_vault_access_mark',
        text: 'Access the fourth memory. You need to know what the mark was supposed to complete.',
        nextNode: 'c7_memory_mark_origin',
        effects: { corruption: 2 },
      },
      {
        id: 'c7_vault_stop_here',
        text: 'Stop. Four memories in a sitting is already beyond the Vault\'s recommended limit. Process what you have.',
        nextNode: 'c7_memory_mark_origin',
        effects: { morale: 2, health: -5 },
      },
    ],
  },

  {
    id: 'c7_memory_mark_origin',
    chapter: 'Chapter 7',
    title: 'The Mark\'s Origin',
    location: 'The Memory Vault — Exit',
    imageKey: 'memory_vault',
    text: `The fourth memory is the briefest. A laboratory. Velna, visible now — a small woman with the precise attention of someone who thinks in systems — placing the completed mark interface against the inside of a wrist. Your pre-blackout self, watching. "This will hurt," she says. It does. The mark integrates in seventeen steps, each one a connection completing. Afterwards, she says: "You understand now what you are carrying. Not a weapon, not a tool. A key. The city was sealed to contain the relic gate beneath it. The gate requires the mark to open. The mark requires its carrier to choose, freely, to open it. Everything we have done — the Archive, the blackout, Velna's life, your design — everything was preparation for a choice you have not made yet." She closes the laboratory's records. "The choice requires all the information. We are giving you all the information across the course of your life. When you have it all, you will know what the choice is." She looks at you with the steady attention of someone who has designed a very long experiment. "I hope you choose well."`,
    effectsOnEnter: { setFlags: ['mark_origin_fully_known', 'relic_gate_mentioned', 'velna_identity_full', 'city_seal_hinted'] },
    choices: [
      {
        id: 'c7_vault_mira_confront',
        text: 'Find Mira. She needs to know what you just remembered — all of it.',
        nextNode: 'c7_memory_mira_confront',
        effects: { miraTrust: -2 },
      },
      {
        id: 'c7_vault_hide_from_mira',
        text: 'Do not tell Mira. She does not need to carry the weight of this information yet.',
        nextNode: 'c7_memory_hide_from_mira',
        effects: { setFlags: ['mira_vault_truth_hidden'], corruption: 1 },
      },
      {
        id: 'c7_vault_cain_record',
        text: 'Look for Cain\'s record in the Vault. His military background. You need to know if he was in that room.',
        nextNode: 'c7_memory_cain_record',
        effects: { intelligence: 1, cainTrust: -1 },
      },
    ],
  },

  {
    id: 'c7_memory_mira_confront',
    chapter: 'Chapter 7',
    title: 'Telling Mira',
    location: 'The Memory Vault — Corridor',
    imageKey: 'memory_vault',
    speaker: 'Mira',
    text: `She listens without interrupting — her medical attention, her controlled expression, her occasional very small nodding that means she is integrating rather than reacting. When you finish she is quiet for a long time. "You were in the room," she says. Not accusatory. Careful. "You were in the room where they planned the blackout. Before you were — this. Before the reset." She looks at her hands. "The Archive record you mentioned — the pre-blackout research files — there is a record of a medical subject in that same period that I was not able to access during my Glass Court work. I have been trying to access it for three years. The subject designation is Researcher Quill, which I believe is Vera's mother." She meets your eyes. "If Vera knows — if she has read her mother's record — then her distrust of you is not paranoia. It is accurate. Her mother was reset with everyone else. Her mother's work, her research, everything she knew — gone. Because of a room of people including you." She looks away. "I am not leaving. But you need to understand what you are asking people to forgive."`,
    effectsOnEnter: { setFlags: ['mira_vault_told', 'vera_mother_connection_known'], miraTrust: -3, morale: -5 },
    choices: [
      {
        id: 'c7_mira_confront_accept',
        text: '"I know. I am asking you to help me finish what they started, knowing what it cost."',
        nextNode: 'c7_memory_vault_exit',
        effects: { miraTrust: 4, morale: 2 },
      },
      {
        id: 'c7_mira_confront_deflect',
        text: '"That was a different person. I am not that person anymore."',
        nextNode: 'c7_mira_truth_betrayal_end',
        effects: { miraTrust: -5, setFlags: ['mira_confrontation_deflected'] },
      },
    ],
  },

  {
    id: 'c7_memory_hide_from_mira',
    chapter: 'Chapter 7',
    title: 'Keeping It',
    location: 'The Memory Vault — Corridor',
    imageKey: 'memory_vault',
    text: `The decision to keep the memory's contents is not simple. The memory includes information about the blackout's planning — about a room of people who chose the reset — and the specific texture of living through a catastrophe you helped design. Mira passes in the corridor. She looks at you. She can read the difference in your face that means something significant has happened and says nothing, because you are not offering it. She puts a hand briefly on your arm and continues to the library. The mark is quiet. The choice to withhold is itself a choice that will compound — the information does not disappear because you have not given it. It sits in the architecture of what you know and changes the weight of every subsequent decision. You will carry it differently than sharing it.`,
    effectsOnEnter: { setFlags: ['vault_truth_withheld'], corruption: 2 },
    choices: [
      {
        id: 'c7_hidden_proceed',
        text: 'Continue. The hidden truth stays hidden for now.',
        nextNode: 'c7_memory_vault_exit',
      },
    ],
  },

  {
    id: 'c7_memory_cain_record',
    chapter: 'Chapter 7',
    title: 'Cain\'s File',
    location: 'The Memory Vault — Index Section',
    imageKey: 'memory_vault',
    text: `The Vault's cross-reference system is incomplete — twelve years of record degradation have left gaps — but what it does contain under Cain's designation is enough. He was an Iron Saints officer before the blackout. Classification: tactical intelligence division, highest operational clearance. Assignment in the period before the blackout: "Perimeter security for the blackout event. Orders: ensure no one exits the sealed areas during reset. Lethal protocol authorized." The record is clinical. Cain did not plan the blackout. He was given an assignment. He executed it. The specific number of people who tried to exit the sealed areas and were stopped is listed in the record. Cain has never mentioned this assignment. Cain has never mentioned being an Iron Saints officer at all.`,
    effectsOnEnter: { setFlags: ['cain_military_record_found', 'cain_blackout_role_known'], intelligence: 3, cainTrust: -3 },
    choices: [
      {
        id: 'c7_cain_confront_now',
        text: 'Find Cain. Confront him with what you have read.',
        nextNode: 'c7_memory_vault_exit',
        effects: { setFlags: ['cain_confrontation_planned'] },
      },
      {
        id: 'c7_cain_withhold',
        text: 'Keep the record to yourself. Cain may have reasons you don\'t know yet.',
        nextNode: 'c7_memory_vault_exit',
        effects: { setFlags: ['cain_record_withheld'], corruption: 1 },
      },
    ],
  },

  {
    id: 'c7_memory_vault_exit',
    chapter: 'Chapter 7',
    title: 'After the Vault',
    location: 'The Memory Vault — Exit Corridor',
    imageKey: 'memory_vault',
    text: `You carry more than you brought in. The mark is warmer by several degrees — the memory access has activated connections in its architecture that were dormant since the blackout. The texture of your awareness of the Archive's infrastructure has changed: you are not receiving it from outside now. You are receiving it the way Subject Seven was always designed to receive it — from inside, as a participant in the network rather than a visitor to it. You know where to go next. You can feel the Relic Map Room's frequency from three levels away. You can feel the Sleeping Server's quiet maintenance pulse from deeper still. The information you received in the Vault is not complete. The Blind Indexer said fourteen containers. You accessed four. Ten remain. The ten remaining are in the Forbidden Stacks.`,
    effectsOnEnter: { intelligence: 2, lastArchive: 5 },
    choices: [
      {
        id: 'c7_exit_forbidden_stacks',
        text: 'Go to the Forbidden Stacks. Access the remaining ten containers.',
        nextNode: 'c7_forbidden_stacks_arrive',
        effects: { setFlags: ['forbidden_stacks_objective'] },
      },
      {
        id: 'c7_exit_blackout_chamber',
        text: 'Go to the Blackout Record Chamber. The documentary record, not the memories.',
        nextNode: 'c7_blackout_chamber_arrive',
      },
      {
        id: 'c7_exit_observatory',
        text: 'Go to the Broken Observatory. Professor Vorn has science answers you need.',
        nextNode: 'c7_observatory_arrive',
      },
    ],
  },

  // ── THE INK CHAPEL ───────────────────────────────────────────────────────────

  {
    id: 'c7_ink_chapel_arrive',
    chapter: 'Chapter 7',
    title: 'The Ink Chapel',
    location: 'The Ink Chapel — Entry',
    imageKey: 'ink_chapel',
    text: `The Ink Chapel is where the Archive's records are formally inducted — the process by which a document transitions from gathered intelligence to permanent Archive material. It is also where the Archive's justice system operates. The Ink Judge maintains the legal record of Archive law: what is permitted to be known, what is permitted to be shared, and what constitutes a violation of Archive protocol. The Chapel's walls are covered in pre-collapse documents, laminated against degradation — every record that has ever been inducted into the Archive is represented on these walls by its cover page. One of the cover pages on the north wall stops you. It is blank. The label reads: SUBJECT SEVEN — BLACKOUT PROTOCOL — RESTRICTED. Someone inducted your file into the permanent record. Someone else removed its contents.`,
    effectsOnEnter: { setFlags: ['ink_chapel_reached', 'subject_seven_record_found'], intelligence: 2 },
    choices: [
      {
        id: 'c7_chapel_find_judge',
        text: 'Find the Ink Judge. Ask about the blank file.',
        nextNode: 'c7_ink_judge_meet',
      },
      {
        id: 'c7_chapel_access_records',
        text: 'Access the Chapel\'s induction records. Find out who removed the contents.',
        nextNode: 'c7_ink_records_access',
        effects: { intelligence: 2 },
      },
      {
        id: 'c7_chapel_noble_approach',
        text: '[Fallen Noble] Identify yourself by lineage and formal Archive title before approaching the Judge. Tribunal etiquette.',
        nextNode: 'c7_ink_judge_meet',
        requirements: { backgrounds: ['fallen_noble'] },
        isHidden: true,
        effects: { setFlags: ['noble_tribunal_approach'], charisma: 2, lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c7_ink_judge_meet',
    chapter: 'Chapter 7',
    title: 'The Ink Judge',
    location: 'The Ink Chapel — Judge\'s Seat',
    imageKey: 'ink_chapel',
    speaker: 'The Ink Judge',
    text: `The Ink Judge is younger than the title implies — perhaps forty-five, with the brittle precision of someone who believes absolutely in the system they enforce. She looks at you with the assessment that comes from reading many cases. "Subject Seven," she says. "Your file was inducted twelve years ago by Archivist Velna before the blackout, and then the content was removed four days before the blackout by a party using a clearance level above mine — above Mael's — that no longer exists within our system." She folds her hands. "I have been waiting for someone with the mark to arrive and attempt to access the restricted record, because the induction record states explicitly that the content is only accessible to the mark's carrier. You have arrived. The file is accessible. However, accessing the file requires passing through the Archive Tribunal's review process, which I chair." She meets your eyes. "You are, technically, a person of interest to this Tribunal — because your actions in the city over the past twelve months may constitute Archive protocol violations. Several of them."`,
    dialogue: 'Your file was inducted twelve years ago by Archivist Velna, and then the content was removed.',
    effectsOnEnter: { setFlags: ['met_ink_judge', 'tribunal_interest_declared'] },
    choices: [
      {
        id: 'c7_judge_accept_tribunal',
        text: '"I will go through the Tribunal. I have nothing to hide."',
        nextNode: 'c7_tribunal_arrive',
        effects: { lastArchive: 5 },
      },
      {
        id: 'c7_judge_challenge_jurisdiction',
        text: '"The Tribunal has jurisdiction over Archive personnel. I am not Archive personnel."',
        nextNode: 'c7_ink_records_access',
        effects: { lastArchive: -5, intelligence: 2 },
      },
    ],
  },

  {
    id: 'c7_ink_records_access',
    chapter: 'Chapter 7',
    title: 'The Induction Logs',
    location: 'The Ink Chapel — Records Alcove',
    imageKey: 'ink_chapel',
    text: `The induction records are physical — paper, Archive-laminated, maintained by hand, not by relic system. They are accessible to anyone with basic clearance, which Mael's glass card provides. Cross-referencing the Subject Seven induction with the Archive's personnel logs from twelve years ago identifies the removal authority: a clearance designation that has no name attached, only the code VELNA-PRIME. Velna removed the contents of your file four days before the blackout. Not another party with above-Velna clearance — Velna herself, using a designation she apparently held in parallel with her research role. The reason for the removal is noted in a single line: "For protection of the carrier. To be returned upon demonstrated readiness." She removed it to protect you. She intended to return it.`,
    effectsOnEnter: { setFlags: ['velna_removal_confirmed', 'file_protection_understood'], intelligence: 3 },
    choices: [
      {
        id: 'c7_records_go_tribunal',
        text: 'The file is still restricted. The Tribunal is the route through.',
        nextNode: 'c7_ink_chapel_records',
      },
      {
        id: 'c7_records_go_server',
        text: 'The Sleeping Server may have a copy that predates the removal.',
        nextNode: 'c7_sleeping_server_arrive',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c7_ink_chapel_records',
    chapter: 'Chapter 7',
    title: 'Chapel Records',
    location: 'The Ink Chapel — Archive Wall',
    imageKey: 'ink_chapel',
    text: `The Chapel's permanent wall record contains something the Tribunal process would not have shown you: a note attached to the Subject Seven cover page, written in a different hand from the induction record, in the small precise script of someone making a personal annotation rather than an official record. It reads: "The carrier will arrive and the Judge will attempt the Tribunal process. The Tribunal process is legitimate and should not be evaded. The carrier will pass it — the mark's architecture includes a cognitive component that the Judge's assessment questions specifically test for. What the Tribunal does not know is that passing the assessment is not the condition for file access. The condition is the carrier understanding what the file contains before accessing it. The memories in the Vault are the prerequisite. The Tribunal is the door. The Sleeping Server is the key." Signed: V. The handwriting matches the first memory fragment's workbench annotations. Velna left instructions. She planned every step.`,
    effectsOnEnter: { setFlags: ['velna_chapel_note_found', 'tribunal_purpose_understood'], intelligence: 3 },
    choices: [
      {
        id: 'c7_chapel_go_verdict',
        text: 'The Tribunal is the door. Velna said you would pass. Find out.',
        nextNode: 'c7_ink_judge_verdict',
        effects: { lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c7_ink_judge_verdict',
    chapter: 'Chapter 7',
    title: 'The Judge\'s Assessment',
    location: 'The Ink Chapel — Judge\'s Seat',
    imageKey: 'ink_chapel',
    text: `The Judge looks at the record of your Tribunal session and makes a notation. "The assessment is complete. The Tribunal\'s preliminary finding is that your actions in the Glass Court, the Choir territory, and the Archive approach corridor constitute substantial interaction with Archive-adjacent material without clearance — which is technically a violation." She sets the pen down. "The Tribunal's secondary finding is that Article Seven of the Archive's founding charter, which Velna wrote, includes an explicit exemption for the mark's carrier who has not yet received their file. The exemption covers all pre-file interactions retroactively." She looks up. "You are cleared. The file is accessible. The Tribunal is not the only door — but it is the cleanest one." She stands. "I disagree with Velna's exemption on principle. I disagree with it on record. But it is the law and I enforce the law."`,
    effectsOnEnter: { setFlags: ['tribunal_cleared', 'article_seven_invoked'], lastArchive: 10 },
    choices: [
      {
        id: 'c7_verdict_go_server',
        text: 'The Sleeping Server now. The file is accessible.',
        nextNode: 'c7_sleeping_server_arrive',
        effects: { setFlags: ['server_access_cleared'] },
      },
      {
        id: 'c7_verdict_go_forbidden',
        text: 'The Forbidden Stacks first. The ten remaining memory containers.',
        nextNode: 'c7_forbidden_stacks_arrive',
      },
    ],
  },

  {
    id: 'c7_ink_appeal',
    chapter: 'Chapter 7',
    title: 'The Appeal',
    location: 'The Ink Chapel — Judge\'s Seat',
    imageKey: 'ink_chapel',
    text: `The appeal process exists in Archive law — every Tribunal finding can be appealed to the full Archivist council, which in the Archive's current diminished state means Mael plus the Blind Indexer plus Vera Quill. The appeal is a stalling mechanism, a procedural delay, and Vera will vote against you. But the appeal itself, the formal request, triggers a review process that gives you access to the Chapel's restricted records while the review is pending. This is a gap in the law that the Ink Judge knows about and cannot close without a full council vote. She looks at you when you invoke the appeal right with the expression of someone who has seen this particular manoeuvre before and is professionally obligated to allow it.`,
    effectsOnEnter: { setFlags: ['tribunal_appeal_invoked'], lastArchive: -3, intelligence: 2 },
    choices: [
      {
        id: 'c7_appeal_go_records',
        text: 'Use the review period to access the Forbidden Stacks.',
        nextNode: 'c7_forbidden_stacks_arrive',
        effects: { setFlags: ['stacks_accessed_via_appeal'] },
      },
    ],
  },

  // ── THE BROKEN OBSERVATORY ───────────────────────────────────────────────────

  {
    id: 'c7_observatory_arrive',
    chapter: 'Chapter 7',
    title: 'The Broken Observatory',
    location: 'The Broken Observatory — Upper Level',
    imageKey: 'broken_observatory',
    text: `The Broken Observatory sits at the Archive's highest accessible point — a dome that was, before the blackout, connected to a surface observation system that allowed the city to be monitored from below. The surface connection was severed in the blackout and the dome cracked in three places, leaving gaps through which the tunnel system's ventilation pushes cold air. The crack patterns are not random. They trace the exact locations of the relic gate system's three primary access points beneath the city. Someone who knew where the gates were broke the Observatory's dome by overloading the relic system at those three points simultaneously. Not an accident. A message. A person is sitting at the Observatory's central instrument — a relic-composite telescope that now points at rock rather than sky — with a stack of notes so large they constitute a second desk.`,
    effectsOnEnter: { setFlags: ['observatory_reached'], intelligence: 2 },
    choices: [
      {
        id: 'c7_observatory_approach_vorn',
        text: 'Approach the person at the telescope.',
        nextNode: 'c7_vorn_meet',
      },
      {
        id: 'c7_observatory_examine_cracks',
        text: 'Examine the crack patterns before approaching. The message matters.',
        nextNode: 'c7_vorn_meet',
        effects: { intelligence: 2, setFlags: ['dome_crack_pattern_read'] },
      },
    ],
  },

  {
    id: 'c7_vorn_meet',
    chapter: 'Chapter 7',
    title: 'Professor Ansel Vorn',
    location: 'The Broken Observatory — Central Instrument',
    imageKey: 'broken_observatory',
    speaker: 'Professor Ansel Vorn',
    text: `He does not hear you approach. He is deep in notes that appear to be written in at least three languages and one that is not a language in any current classification. When he does turn, his face cycles through three emotions with the speed of someone who has been in hiding for twelve years and is still not certain whether every new person is threat or salvation. He settles on something that might be relief. "The mark," he says. "I have been calculating the probability distribution for when the mark-carrier would reach the Archive. The median estimate was nine months after Chapter Five. You are one month outside the median." He extends a hand. "Vorn. Pre-collapse materials science and relic architecture. I designed the relic gate system that is currently sealed beneath the city." He looks at you carefully. "You were in the room when Velna integrated the mark. I was also in the room. You may not remember me. The blackout reset your episodic memory. I had enough relic shielding that mine survived." He pauses. "I have been waiting here for twelve years. I have questions."`,
    dialogue: 'I designed the relic gate system that is currently sealed beneath the city.',
    effectsOnEnter: { setFlags: ['met_professor_vorn', 'vorn_gate_designer_known'] },
    choices: [
      {
        id: 'c7_vorn_ask_gate',
        text: '"Tell me about the gate. What is beneath the city?"',
        nextNode: 'c7_vorn_recognition',
        effects: { intelligence: 2 },
      },
      {
        id: 'c7_vorn_ask_room',
        text: '"You were in the room. Describe who else was there."',
        nextNode: 'c7_vorn_recognition',
        effects: { intelligence: 2, setFlags: ['vorn_room_questioned'] },
      },
    ],
  },

  {
    id: 'c7_vorn_recognition',
    chapter: 'Chapter 7',
    title: 'What Vorn Remembers',
    location: 'The Broken Observatory — Worktable',
    imageKey: 'broken_observatory',
    speaker: 'Professor Ansel Vorn',
    text: `"The room," he says, and his voice carries twelve years of waiting for this conversation. "Velna. You — the person you were, Subject Seven, who had a name then that I am not certain I should give you before the Sleeping Server confirms your file access. Three Archive scholars whose names are in the induction records. Two Iron Saints tactical officers — one of them is the person you now know as Cain, which I can see from your expression is new information. And one Glass Court researcher whose name was Sann." He watches the reaction. "Doctor Sann. Yes. He was in the room. The infection was not created by the Glass Court independently. It was a side effect of the relic-extraction research that Sann was conducting as part of the blackout preparation project. He was supposed to be extracting Archive-signal frequency data from pre-collapse relic casings. The process sensitised the extracted material to human neural tissue. The infection is how the blackout's relic work escaped its containment into the population."`,
    effectsOnEnter: { setFlags: ['vorn_blackout_room_full_known', 'sann_blackout_role_confirmed', 'cain_room_confirmed'], intelligence: 4 },
    choices: [
      {
        id: 'c7_vorn_ask_gate_now',
        text: '"The gate beneath the city. What is below it?"',
        nextNode: 'c7_vorn_confession',
        effects: { intelligence: 1 },
      },
      {
        id: 'c7_vorn_cain_reaction',
        text: '"Cain was an Iron Saints officer. He was in the room for the blackout. He has not told me any of this."',
        nextNode: 'c7_vorn_confession',
        effects: { cainTrust: -2, setFlags: ['cain_room_confrontation_pending'] },
      },
    ],
  },

  {
    id: 'c7_vorn_confession',
    chapter: 'Chapter 7',
    title: 'The Gate\'s Secret',
    location: 'The Broken Observatory — Worktable',
    imageKey: 'broken_observatory',
    speaker: 'Professor Ansel Vorn',
    text: `He looks at his notes rather than at you, which is the gesture of someone preparing to say something they have been practicing for twelve years. "Below the gate is the Archive's original purpose. Not the document preservation. Not the relic research. The original purpose. The city was built on the site of a pre-collapse discovery — a naturally occurring relic concentration of a scale that nothing else on the planet matches. The concentration is alive in the sense that relic systems are alive: it processes, it responds, it transmits. The blackout was an attempt to synchronise the city's relic systems with this concentration — to complete the connection that was partially established before the city was built and sealed. The mark is the interface for the final synchronisation. When the mark-carrier opens the gate with the mark, the city's relic infrastructure reconnects to the concentration. The city stops being ruins. The blackout ends." He finally looks up. "The people who stopped the blackout completion were afraid of what the concentration might do to the city once the connection completed. They may have been right to be afraid. I do not know."`,
    effectsOnEnter: { setFlags: ['gate_purpose_revealed', 'city_relic_concentration_known', 'blackout_completion_purpose_known'] },
    choices: [
      {
        id: 'c7_vorn_ask_afraid',
        text: '"What were they afraid of?"',
        nextNode: 'c7_vorn_blackout_truth',
        effects: { intelligence: 2 },
      },
      {
        id: 'c7_vorn_charisma_convince',
        text: '[Roll dice — Charisma] Press Vorn to give his personal assessment — not the academic one. What does he think happens when the gate opens?',
        nextNode: 'c7_vorn_blackout_truth',
        diceCheck: {
          stat: 'charisma',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c7_vorn_player_recognition',
          failureNode: 'c7_vorn_blackout_truth',
        },
        effects: { charisma: 1 },
      },
    ],
  },

  {
    id: 'c7_vorn_blackout_truth',
    chapter: 'Chapter 7',
    title: 'The Fear',
    location: 'The Broken Observatory — Worktable',
    imageKey: 'broken_observatory',
    speaker: 'Professor Ansel Vorn',
    text: `"The concentration is not passive," he says. "It responds. It has been responding for twelve years to the partial connection — the infection is one response, the Choir's shared signal is another, the mark's activation is a third. The fear was that completing the synchronisation would allow the concentration to respond at full capacity, and that a full-capacity response from a relic concentration of that scale would reorganise every relic system in the city — every person interfacing with relics, every infection, every marked individual — according to the concentration's own pattern rather than the Archive's designed architecture." He sets his notes down. "The Archive's designed architecture protects individuality. The concentration's pattern does not distinguish between individuals. It distinguishes between systems and noise. The people in that room were afraid the concentration would classify the city's inhabitants as noise." He looks at you. "I have been running the probability models for twelve years. My current assessment is that the fear was overstated. My confidence interval is wider than I would like."`,
    effectsOnEnter: { setFlags: ['concentration_danger_known', 'vorn_probability_assessment'] },
    choices: [
      {
        id: 'c7_vorn_go_relic_map',
        text: '"I need the Relic Map Room. Show me the gate locations."',
        nextNode: 'c7_relic_map_arrive',
        effects: { setFlags: ['relic_map_objective'] },
      },
      {
        id: 'c7_vorn_go_blackout_chamber',
        text: '"I need the full blackout record. Before the Map."',
        nextNode: 'c7_blackout_chamber_arrive',
      },
    ],
  },

  {
    id: 'c7_vorn_player_recognition',
    chapter: 'Chapter 7',
    title: 'Vorn\'s Assessment',
    location: 'The Broken Observatory — Worktable',
    imageKey: 'broken_observatory',
    speaker: 'Professor Ansel Vorn',
    text: `He looks at you for a long time. "My personal assessment," he says, finally, "is that the concentration does distinguish between individuals. That the discrimination criterion is not system versus noise — it is the same criterion the mark uses. The criterion the mark uses is: has this person made a free choice about what the mark means. Not a coerced choice, not an ignorant choice — a free and informed choice. I believe the concentration wants a free choice the same way the mark was designed to want a free choice. I believe the concentration is patient. I believe the blackout happened because the people who planned it ran out of time before they could give the mark's carrier enough information to make the choice freely." He meets your eyes. "You are here now, with access to the Archive, with the mark at its highest activation in twelve years. You are closer than anyone has been since the day before the blackout." A pause. "I also believe you were the person who planned the blackout. With Velna. And I believe you did it because you thought giving yourself full information after a reset was more reliable than trying to make the choice before it, when you did not have enough."`,
    effectsOnEnter: { setFlags: ['vorn_full_assessment_known', 'player_blackout_architect_suggested'], intelligence: 4, morale: -5 },
    choices: [
      {
        id: 'c7_vorn_player_yes',
        text: 'That assessment lands. You do not deny it. "Then I had better make the choice correctly."',
        nextNode: 'c7_relic_map_arrive',
        effects: { setFlags: ['player_blackout_agency_accepted'], morale: -3, intelligence: 3 },
      },
      {
        id: 'c7_vorn_player_doubt',
        text: '"That is a very large assumption based on fragmentary evidence."',
        nextNode: 'c7_vorn_decision',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c7_vorn_decision',
    chapter: 'Chapter 7',
    title: 'What Vorn Asks',
    location: 'The Broken Observatory — Entry',
    imageKey: 'broken_observatory',
    text: `He walks with you to the Observatory's door, still carrying his notes. "Whatever your assessment of the evidence," he says, "I need to ask you something. The person who planned the blackout — whoever they were — left a safety protocol in the mark's architecture. If the mark-carrier reaches the gate and makes the choice while carrying information that was obtained through coercion, threat, or deception, the safety protocol prevents the choice from registering. The gate does not open." He stops. "I am telling you this because someone inside the Archive is attempting to influence your choices through deception. Not Mael. Someone who has been here longer than Mael and left records that Mael has not read." He looks at you. "Be careful what you believe unconditionally."`,
    effectsOnEnter: { setFlags: ['vorn_safety_protocol_known', 'archive_deception_warning'] },
    choices: [
      {
        id: 'c7_vorn_decision_go_relic',
        text: '"The Relic Map Room. I need the gate locations."',
        nextNode: 'c7_relic_map_arrive',
      },
      {
        id: 'c7_vorn_decision_go_lecture',
        text: '"Meet me at the Hollow Lecture Hall. I want to see the scientific documentation."',
        nextNode: 'c7_lecture_hall_arrive',
      },
    ],
  },

  // ── THE RELIC MAP ROOM ───────────────────────────────────────────────────────

  {
    id: 'c7_relic_map_arrive',
    chapter: 'Chapter 7',
    title: 'The Relic Map Room',
    location: 'The Relic Map Room — Entry',
    imageKey: 'relic_map_room',
    text: `The Relic Map Room requires Mael's clearance to enter, which he provided on the glass card. The room is smaller than expected — roughly circular, perhaps eight metres across — and every surface is covered in the map. Not displayed: integrated. The map is laid into the walls, the floor, and the ceiling using relic-composite material that emits a faint light from within, tracing the city's entire tunnel network, its surface ruins, and something below it that no above-surface map has ever acknowledged: a branching structure of passages and chambers at a depth of roughly two hundred metres beneath the tunnel system's lowest point. The structure below is not Metro infrastructure. It is older than the city, older than any pre-collapse architecture in the Archive's records. And in three specific locations in the lower structure — marked with the same symbol that was carved into the approach corridor's walls — the relic concentration Vorn described reaches the surface.`,
    effectsOnEnter: { setFlags: ['relic_map_room_reached', 'gate_locations_visible'], intelligence: 3 },
    choices: [
      {
        id: 'c7_map_study_gates',
        text: 'Study the gate locations. Memorise them.',
        nextNode: 'c7_relic_map_study',
        effects: { intelligence: 2 },
      },
      {
        id: 'c7_map_tactician_read',
        text: '[Tactician] Read the strategic implications. Three gate points means three potential approaches and three potential interceptions.',
        nextNode: 'c7_relic_map_tactician',
        requirements: { classes: ['tactician'] },
        isHidden: true,
        effects: { setFlags: ['gate_tactical_assessment'], intelligence: 3, strength: 1 },
      },
    ],
  },

  {
    id: 'c7_relic_map_study',
    chapter: 'Chapter 7',
    title: 'The Gate Locations',
    location: 'The Relic Map Room — Centre',
    imageKey: 'relic_map_room',
    text: `Three gate access points. Gate One is below what is now the Glass Court's primary tower — which explains why the Glass Court's relic research has always been more effective than any faction's. They built their headquarters over a gate access point. Gate Two is below the Iron Saints' oldest fortification in the northern tunnels — the one that has stood since before the Saints were a faction, that no assault has ever breached, that the Saints call the Founding Post and treat as sacred. Gate Three is below Metro Station 9. Station 9, where you were placed on the night of the blackout. Station 9, where the mark became active for the first time. The Indexer said the mark was placed in you there. The map confirms it: Station 9 is Gate Three. You have been living in the access point.`,
    effectsOnEnter: { setFlags: ['gate_one_known', 'gate_two_known', 'gate_three_known', 'station_nine_gate_confirmed'], intelligence: 4 },
    choices: [
      {
        id: 'c7_map_gate_reveal',
        text: 'Process the full implication. You have been standing in the gate for twelve years.',
        nextNode: 'c7_relic_gate_reveal',
      },
    ],
  },

  {
    id: 'c7_relic_map_tactician',
    chapter: 'Chapter 7',
    title: 'Strategic Map Reading',
    location: 'The Relic Map Room — Perimeter',
    imageKey: 'relic_map_room',
    text: `A Tactician reads a map the way other people read weather — for what it means, not what it shows. The gate locations are facts. The strategic implications: the Glass Court has been knowingly occupying Gate One's surface point since before the blackout — their relic advantage is not research skill, it is proximity. The Iron Saints' Founding Post at Gate Two was established there deliberately — the founding documents would be in the Archive somewhere. And Gate Three at Station 9 is uncontrolled, unmanned, open to anyone who knows it exists. The tactical problem is not reaching the gate. The tactical problem is doing so without the Glass Court and the Iron Saints learning that the gate exists, or understanding why a particular person is approaching it. The tactical solution: reach Gate Three before either faction learns the map room has been accessed. Time is now a variable.`,
    effectsOnEnter: { setFlags: ['gate_tactical_analysis_complete', 'time_pressure_understood'], intelligence: 3, strength: 1 },
    choices: [
      {
        id: 'c7_tactician_go_gate_reveal',
        text: 'You have what you need. Get to the gate assessment.',
        nextNode: 'c7_relic_gate_reveal',
      },
      {
        id: 'c7_tactician_plan_expose',
        text: 'The Glass Court\'s Gate One position changes everything. Expose them first.',
        nextNode: 'c7_relic_gate_reveal',
        effects: { setFlags: ['glass_court_gate_exposure_planned'], glassCourt: -10 },
      },
    ],
  },

  {
    id: 'c7_relic_gate_reveal',
    chapter: 'Chapter 7',
    title: 'Station Nine',
    location: 'The Relic Map Room — Centre',
    imageKey: 'relic_map_room',
    text: `The map room has a secondary function you discover when the mark responds to the gate markers: the room can project a signal toward any of the three gate locations. Not open them — signal them. The signal would tell the gate that the mark is active and its carrier is in the Archive. The gate would respond with a confirming pulse. This is the Relic Map Room's designed purpose: to allow the mark-carrier to confirm gate accessibility before attempting the approach. The mark extends toward the projection nodes automatically. You can feel Gate Three — Station 9 — clearly, warmly, the way you have always felt it and never had a name for. The gate is intact. It has been waiting.`,
    effectsOnEnter: { setFlags: ['gate_confirmation_available', 'station_nine_gate_confirmed_pulse'] },
    choices: [
      {
        id: 'c7_gate_confirm_pulse',
        text: 'Send the confirmation pulse. Let the gate know you are coming.',
        nextNode: 'c7_relic_map_destination',
        effects: { setFlags: ['gate_pulse_sent'], corruption: 1, lastArchive: 5 },
      },
      {
        id: 'c7_gate_steal_map',
        text: 'Take the map. Copy it or steal the projection data. Other factions must not learn the gate locations.',
        nextNode: 'c7_relic_map_steal',
        effects: { setFlags: ['map_theft_attempted'] },
      },
      {
        id: 'c7_gate_share_map',
        text: 'The map should be shared with Mael and Vorn before any approach. Consensus first.',
        nextNode: 'c7_relic_map_share',
        effects: { lastArchive: 8, setFlags: ['map_shared_with_archive'] },
      },
    ],
  },

  {
    id: 'c7_relic_map_steal',
    chapter: 'Chapter 7',
    title: 'The Map Theft',
    location: 'The Relic Map Room — Control Node',
    imageKey: 'relic_map_room',
    text: `The projection data is accessible from the control node at the map room's centre. Removing it is possible — the relic marker system logs the access, but the marker on the projection data is one of the types the Relic Hunter identified as a simple contact log rather than a structural-integration record. The extraction damages only the projection node, not the archive wall map. The data is in a glass card in your hands. Mael will know you extracted it within six hours when the log processes. The question is what the six hours are used for.`,
    effectsOnEnter: { setFlags: ['map_data_stolen'], lastArchive: -10, intelligence: 2 },
    choices: [
      {
        id: 'c7_steal_go_final',
        text: 'Move quickly. Go to the final decision point.',
        nextNode: 'c7_relic_map_destination',
      },
    ],
  },

  {
    id: 'c7_relic_map_share',
    chapter: 'Chapter 7',
    title: 'Sharing the Map',
    location: 'The Relic Map Room — With Mael and Vorn',
    imageKey: 'relic_map_room',
    text: `Mael looks at the gate confirmation data without surprise — he knew the gates existed. Vorn looks at it with the relief of someone seeing their life's work confirmed in physical evidence. Vera Quill, who has followed you to the map room without being invited, looks at Gate Two's location under the Iron Saints' Founding Post and makes a notation on her glass card with an expression that means she is connecting something she has known for a long time to something new. "The Gate One location," she says, "explains why Vera's mother — my mother — was assigned to the Glass Court facility the week before the blackout. She was documenting the Gate One access point. She did not know that was what she was documenting. She thought she was doing standard relic survey work." She does not continue. The room is quiet.`,
    effectsOnEnter: { setFlags: ['map_shared_complete', 'vera_mother_gate_connection'], lastArchive: 15, miraTrust: 2 },
    choices: [
      {
        id: 'c7_share_go_final',
        text: 'The sharing is done. Go to the archive\'s final choice point.',
        nextNode: 'c7_relic_map_destination',
      },
    ],
  },

  {
    id: 'c7_relic_map_destination',
    chapter: 'Chapter 7',
    title: 'The Route Forward',
    location: 'The Relic Map Room — Exit',
    imageKey: 'relic_map_room',
    text: `You leave the Relic Map Room with what Velna spent years preparing: the full understanding of where the gate is, what it does, and why you were chosen to open it. The Archive feels different now that you know what it was built around. Not a library. A preparation facility. A very long exercise in ensuring that the person who opens the gate does so with full information. You are approaching that condition. Not there yet — there are still sections you have not read, rooms you have not entered, information that sits in the Forbidden Stacks and the Blackout Record Chamber and the Sleeping Server waiting to be assembled into something complete. But you can feel the shape of the completed picture from here. It is closer than it has ever been.`,
    effectsOnEnter: { intelligence: 3, lastArchive: 5 },
    choices: [
      {
        id: 'c7_destination_forbidden',
        text: 'The Forbidden Stacks. The remaining memory containers.',
        nextNode: 'c7_forbidden_stacks_arrive',
      },
      {
        id: 'c7_destination_blackout',
        text: 'The Blackout Record Chamber.',
        nextNode: 'c7_blackout_chamber_arrive',
      },
      {
        id: 'c7_destination_lecture',
        text: 'The Hollow Lecture Hall. Vorn promised a scientific presentation.',
        nextNode: 'c7_lecture_hall_arrive',
      },
    ],
  },

  // ── THE FORBIDDEN STACKS ─────────────────────────────────────────────────────

  {
    id: 'c7_forbidden_stacks_arrive',
    chapter: 'Chapter 7',
    title: 'The Forbidden Stacks',
    location: 'The Forbidden Stacks — Entry Gate',
    imageKey: 'forbidden_stacks',
    text: `The Forbidden Stacks are not on any floor plan that Mael showed you. They are accessible through a door in the Archive's subterranean level that has no sign, no lock, and no handle — only a second mark-shaped depression. The mark opens it the same way it opened the Archive's front door: confirmation of architecture, recognition of the carrier. Inside is not a room but a corridor that descends for perhaps forty metres and then opens into a space that is the size of the Archive's dust library but lit entirely by the relic medium of the containers themselves. Relic glow: blue-white, soft, the light of compressed memory. Every container on these shelves predates the blackout. Some predate the city. Some predate any classification system currently in use. The ten containers marked with your designation are on a shelf at eye level, marked with a glass card that reads, in Velna's handwriting: FOR WHEN YOU ARE READY.`,
    effectsOnEnter: { setFlags: ['forbidden_stacks_reached'], corruption: 2 },
    choices: [
      {
        id: 'c7_stacks_begin_reading',
        text: 'Begin reading. You are ready.',
        nextNode: 'c7_forbidden_read_one',
      },
      {
        id: 'c7_stacks_esper_survey',
        text: '[Esper] Survey the room\'s psychic topography first. Understand the shape of what is here before touching anything.',
        nextNode: 'c7_forbidden_esper_deep',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { intelligence: 4, corruption: 2, setFlags: ['esper_stacks_survey'] },
      },
      {
        id: 'c7_stacks_experiment_record',
        text: '[Runaway Experiment] There is a secondary designation visible on three containers that matches your experiment number from the Glass Court records. Access those first.',
        nextNode: 'c7_forbidden_read_one',
        requirements: { backgrounds: ['runaway_experiment'] },
        isHidden: true,
        effects: { intelligence: 3, corruption: 1, setFlags: ['experiment_containers_accessed'] },
      },
    ],
  },

  {
    id: 'c7_forbidden_read_one',
    chapter: 'Chapter 7',
    title: 'The Forbidden Records',
    location: 'The Forbidden Stacks — Reading Alcove',
    imageKey: 'forbidden_stacks',
    text: `The first five containers in sequence cover the period from fifteen years before the blackout to five years before. Your pre-blackout self is present in all of them: sometimes as the memory-source, sometimes as a participant in other subjects' memories. The picture that assembles is of someone who was both a researcher and a subject — who understood that they were part of the experiment and had chosen to be part of it rather than had it imposed. The experiment was: can a person be designed to carry the mark, given full information about the mark's purpose, and then have their episodic memory reset without losing the accumulated knowledge? The answer, the records suggest, was partially. The knowledge was preserved — encoded in the mark's architecture, available to be recovered through Archive access. The identity, the relationships, the personal history — those were among the things that reset. You were the experiment. You designed the experiment. Both of these things are simultaneously true.`,
    effectsOnEnter: { setFlags: ['forbidden_read_one_complete', 'subject_seven_experiment_understood'], corruption: 3, intelligence: 4 },
    choices: [
      {
        id: 'c7_stacks_read_more',
        text: 'Continue. The second five containers.',
        nextNode: 'c7_forbidden_read_two',
        effects: { corruption: 2 },
      },
      {
        id: 'c7_stacks_reduce_process',
        text: 'Stop and process. The corruption from reading the first five is already significant.',
        nextNode: 'c7_forbidden_reduce_corruption',
        effects: { morale: 3 },
      },
    ],
  },

  {
    id: 'c7_forbidden_read_two',
    chapter: 'Chapter 7',
    title: 'The Second Five',
    location: 'The Forbidden Stacks — Reading Alcove',
    imageKey: 'forbidden_stacks',
    text: `The final five containers cover the period from five years before the blackout to its day. The memories are densely packed — the closer to the blackout, the higher the information density per container. The fourth container from the end includes the day Velna was killed. Your pre-blackout self was not present — the memory is Vorn's, cross-referenced in your file because your pre-blackout self commissioned the cross-reference as evidence. Velna was killed by an Iron Saints officer who was not Cain but who was operating on Cain's division's authorisation. The officer believed Velna was going to abort the blackout. She was not — she was trying to delay it by three days to give the mark more preparation time. The fifth and final container is a message. Not a memory. A recording. Velna's voice, speaking directly to whoever opens the last container with the mark active, in the exact frequency the mark uses for Archive reception.`,
    effectsOnEnter: { setFlags: ['velna_death_full_known', 'velna_final_message_exists'], corruption: 4 },
    choices: [
      {
        id: 'c7_stacks_velna_message',
        text: 'Listen to Velna\'s final message.',
        nextNode: 'c7_forbidden_truth_full',
      },
      {
        id: 'c7_stacks_corruption_dice',
        text: '[Roll dice — Luck] The corruption is very high. Attempt to read the final container without full mark-opening.',
        nextNode: 'c7_forbidden_truth_full',
        diceCheck: {
          stat: 'luck',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c7_forbidden_truth_full',
          failureNode: 'c7_forbidden_corruption_path',
        },
        effects: { corruption: 3 },
      },
    ],
  },

  {
    id: 'c7_forbidden_corruption_path',
    chapter: 'Chapter 7',
    title: 'Too Much',
    location: 'The Forbidden Stacks — Collapsed in the Alcove',
    imageKey: 'forbidden_stacks',
    text: `The fifth container opens when the mark does, which means the mark opens at full extension into the Forbidden Stacks' relic medium. The Stacks are not designed for full-extension mark contact — the relic concentration in the containers responds to the mark's open architecture and attempts to integrate. Not maliciously. The containers do not have intent. They have pattern, and the mark at full extension is the closest match to their pattern that has existed in this room since they were sealed. The integration is not dangerous if managed. At this corruption level, management is not fully available. The information downloads in full, all at once, without the sequential filtering that makes memory bearable. Everything your pre-blackout self knew, felt, chose, regretted, planned — simultaneously, at once, filling every available cognitive channel. The person left after this is not gone. They are buried. The mark is still active. The Archive is still accessible. But the weight of full pre-blackout context, unfiltered, is something the post-blackout self was not designed to carry directly.`,
    effectsOnEnter: { setFlags: ['forbidden_corruption_complete', 'forbidden_knowledge_overwhelm'], corruption: 10, morale: -15 },
    choices: [
      {
        id: 'c7_corruption_end',
        text: 'The weight is complete. There is no more margin.',
        nextNode: 'c7_forbidden_knowledge_end',
      },
    ],
  },

  {
    id: 'c7_forbidden_truth_full',
    chapter: 'Chapter 7',
    title: 'Velna\'s Message',
    location: 'The Forbidden Stacks — Reading Alcove',
    imageKey: 'forbidden_stacks',
    text: `The recording is short. Twenty-three seconds. Velna's voice in the mark's frequency, which means it is received rather than heard — not sound, but transmission, the way the Choir's song is received rather than heard by those with the mark. "You have reached the Forbidden Stacks and you have read the containers. This means you have the full record. What remains is the choice: open the gate, or do not. I cannot make this choice for you — the safety protocol prevents it. What I can tell you is that when I designed the choice, I believed the concentration beneath the city was benevolent in the specific way that very old and very large things can be benevolent: without concern for individual outcomes, but with a structural preference for coherence over noise. I believed the city's inhabitants would not be classified as noise. I was working from incomplete information, because the concentration had not yet demonstrated its response at full synchronisation." A brief pause. "I also believed in you. Specifically. By name. Find the Archive's alliance. Complete the information. Choose."`,
    effectsOnEnter: { setFlags: ['velna_message_received', 'forbidden_stacks_complete'], corruption: 1, intelligence: 5, morale: 5 },
    choices: [
      {
        id: 'c7_stacks_go_city_seal',
        text: 'There is one more shelf. The pre-city sealing record. Read it before leaving.',
        nextNode: 'c7_forbidden_city_seal',
      },
      {
        id: 'c7_stacks_go_final',
        text: 'The information is complete. Go to the Archive\'s final decision point.',
        nextNode: 'c7_forbidden_stacks_exit',
      },
    ],
  },

  {
    id: 'c7_forbidden_reduce_corruption',
    chapter: 'Chapter 7',
    title: 'The Known Antidote',
    location: 'The Forbidden Stacks — Cooling Chamber',
    imageKey: 'forbidden_stacks',
    text: `The Forbidden Stacks has a cooling chamber — a small room off the main corridor designed for exactly this situation, the cognitive overload that comes from accessing too many compressed memories in sequence. The Archive's founders understood the problem. The cooling chamber contains no relic technology. Just a chair, a pitcher of filtered water, and a single sheet of paper with a handwritten instruction: "Breathe. List five things you knew before you entered the Stacks. Verify that you still know them. This is the self you are returning to. The information you have acquired is not replacing it. It is adding to it." The technique works. Not because it is sophisticated — because it is simple, and simplicity is what the overloaded cognitive architecture can follow when complexity is unavailable. You emerge with the corruption reduced and the information still accessible. You are ready to read the second half.`,
    effectsOnEnter: { corruption: -5, morale: 5, setFlags: ['corruption_reduced_stacks'] },
    choices: [
      {
        id: 'c7_reduce_go_read',
        text: 'Return to the reading alcove. The second five containers.',
        nextNode: 'c7_forbidden_read_two',
      },
    ],
  },

  {
    id: 'c7_forbidden_esper_deep',
    chapter: 'Chapter 7',
    title: 'Esper Survey',
    location: 'The Forbidden Stacks — Entry',
    imageKey: 'forbidden_stacks',
    text: `The psychic topography of the Forbidden Stacks is the most complex space you have encountered since the Choir Nest — but where the Nest was dense and overlapping, the Stacks are stratified. Each container occupies a distinct psychic layer, separated from the others by the relic casing. Reading the topography without opening the containers gives you the full shape of what is stored: the weight of each layer, its emotional signature, its temporal placement. The tenth container — the last — has a different quality from the others. It is not a memory. It is a transmission point. When the mark opens to it, you will not be reading Velna's record. You will be completing a connection she left open. The Esper training that lets you read topography without full immersion will let you access the transmission more gradually than a non-Esper, reducing the corruption cost significantly.`,
    effectsOnEnter: { setFlags: ['esper_stacks_complete', 'velna_transmission_topology_known'], intelligence: 5, corruption: -2 },
    choices: [
      {
        id: 'c7_esper_go_read',
        text: 'Begin the sequential reading with the corruption advantage.',
        nextNode: 'c7_forbidden_read_one',
      },
    ],
  },

  {
    id: 'c7_forbidden_city_seal',
    chapter: 'Chapter 7',
    title: 'The City Seal',
    location: 'The Forbidden Stacks — Deepest Shelf',
    imageKey: 'forbidden_stacks',
    text: `One container on the deepest shelf is not marked with your designation. It is marked with a designation that the classification system you read earlier identifies as: PRE-CITY — SEALING RECORD — ORIGINAL INTENT. The container is old enough that the relic casing has developed the characteristic amber patina of material from the city's founding era. The memory it contains is not yours. It is a shared memory — an event experienced by many people simultaneously — of the day the city was sealed. Not after the blackout. Before it. The founding. The day the city was built over the concentration point deliberately, and the decision was made to wait until someone with a complete mark could open the gate properly rather than allowing the concentration to be accessed before the synchronisation architecture was ready. The founding was not about survival. It was about preparation. The city was always a waiting room.`,
    effectsOnEnter: { setFlags: ['city_seal_origin_known', 'city_founding_truth_revealed'], intelligence: 5, lastArchive: 10 },
    choices: [
      {
        id: 'c7_city_seal_go_exit',
        text: 'Exit the Stacks. The complete picture is assembling.',
        nextNode: 'c7_forbidden_stacks_exit',
      },
    ],
  },

  {
    id: 'c7_forbidden_stacks_exit',
    chapter: 'Chapter 7',
    title: 'What You Carry',
    location: 'The Forbidden Stacks — Exit Corridor',
    imageKey: 'forbidden_stacks',
    text: `You leave the Forbidden Stacks carrying the full record. Not complete — there are still connections to make, rooms to enter, decisions to process — but the core of what happened before the blackout is in your hands. You designed the blackout alongside Velna. You designed yourself to forget it. You placed yourself in Gate Three's access point for twelve years of unconscious preparation. The mark, the infection, the Choir, the Glass Court's gate position, the Iron Saints' Founding Post — all of it was visible from the design documents. Not planned with evil intent. Planned with the intent of someone who understood the stakes and decided that the only way to ensure the choice was genuinely free was to make it after all the information was assembled from scratch, without the weight of the original decision's context. The weight of that context is now available. The choice is becoming possible.`,
    effectsOnEnter: { intelligence: 3, lastArchive: 5, setFlags: ['forbidden_stacks_exited'] },
    choices: [
      {
        id: 'c7_stacks_exit_go_blackout',
        text: 'The Blackout Record Chamber. The documentary record.',
        nextNode: 'c7_blackout_chamber_arrive',
      },
      {
        id: 'c7_stacks_exit_go_final',
        text: 'The final decision point. You have enough.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  // ── THE ARCHIVE TRIBUNAL ─────────────────────────────────────────────────────

  {
    id: 'c7_tribunal_arrive',
    chapter: 'Chapter 7',
    title: 'The Archive Tribunal',
    location: 'The Archive Tribunal — Hearing Chamber',
    imageKey: 'archive_tribunal',
    text: `The Tribunal chamber is small and formal — seven seats arranged in a curve, six currently occupied by Archive personnel of various roles, the seventh empty for the Ink Judge who enters behind you. The session is already constituted. The formal charge is read aloud: "The bearer of the mark, designation Subject Seven, is charged with accessing Archive-adjacent relic infrastructure in the Glass Court territory, the Red Choir territory, and the Archive approach corridor without prior clearance, in potential violation of Articles Three, Seven, and Eleven of the Archive Charter." The charge is technical and the Ink Judge reads it without emphasis. Then she looks at you. "The Tribunal is not here to convict you. It is here to assess whether your access to the Archive's deeper levels poses a risk to the Archive's security. The distinction matters." She folds her hands. "Make your case."`,
    effectsOnEnter: { setFlags: ['tribunal_reached', 'tribunal_session_opened'], lastArchive: -5 },
    choices: [
      {
        id: 'c7_tribunal_defend_intelligence',
        text: '[Roll dice — Intelligence] Present the case methodically. Cite Velna\'s exemption, the mark\'s charter status, and the Blind Indexer\'s testimony.',
        nextNode: 'c7_tribunal_defend',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c7_tribunal_verdict_acquit',
          failureNode: 'c7_tribunal_verdict_guilty',
        },
      },
      {
        id: 'c7_tribunal_shadow_broker',
        text: '[Shadow Broker] You have contacts in every faction. Name two Archive personnel whose private communications with the Glass Court are in your possession.',
        nextNode: 'c7_tribunal_expose_archive',
        requirements: { classes: ['shadow_broker'] },
        isHidden: true,
        effects: { setFlags: ['tribunal_broker_leverage'], lastArchive: -10, intelligence: 3 },
      },
    ],
  },

  {
    id: 'c7_tribunal_defend',
    chapter: 'Chapter 7',
    title: 'The Defence',
    location: 'The Archive Tribunal — Hearing Chamber',
    imageKey: 'archive_tribunal',
    text: `The defence proceeds through three arguments: Velna's Article Seven exemption, the mark's documented status as an Archive-owned interface rather than a free actor, and the Blind Indexer's classification of your pre-blackout identity as a cleared Archive researcher. Each argument lands differently with the six seated Tribunal members — two are clearly convinced by the first, one by the second, one remains hostile. The Ink Judge listens without expression throughout. When the arguments are complete she consults the record for several minutes before looking up. "The Tribunal's preliminary assessment is that the exemption is applicable." She pauses. "Vera Quill dissents."`,
    effectsOnEnter: { setFlags: ['tribunal_defence_presented'] },
    choices: [
      {
        id: 'c7_defend_accept_verdict',
        text: 'Accept the preliminary assessment. The dissent is noted but the majority holds.',
        nextNode: 'c7_tribunal_verdict_acquit',
        effects: { lastArchive: 8 },
      },
      {
        id: 'c7_defend_address_vera',
        text: 'Address Vera\'s dissent directly. The objection matters.',
        nextNode: 'c7_tribunal_judge_bargain',
        effects: { lastArchive: 3 },
      },
    ],
  },

  {
    id: 'c7_tribunal_expose_archive',
    chapter: 'Chapter 7',
    title: 'The Leverage',
    location: 'The Archive Tribunal — Hearing Chamber',
    imageKey: 'archive_tribunal',
    text: `The communications you possess — the Shadow Broker's information is rarely wrong and never incomplete — detail a correspondence between two Archive scholars and a Glass Court intelligence officer over the past six months. The correspondence involved sharing the Archive's location data in exchange for supply deliveries. Mael does not know about this correspondence. The Ink Judge very clearly does not know about it. When you present it, the Tribunal chamber goes very quiet. The Ink Judge looks at the two scholars who are, visibly, no longer comfortable in their seats. "This proceeding," she says, in a voice that carries no emotion except precision, "is suspended pending an internal investigation." She looks at you. "The charges against you are also suspended. You are cleared for Archive access pending the investigation's conclusion." The suspension is not a victory. Two Archive members are exposed. The Archive's internal trust is damaged. But the access is open.`,
    effectsOnEnter: { setFlags: ['archive_internal_exposed', 'tribunal_suspended'], lastArchive: -15, glassCourt: -5 },
    choices: [
      {
        id: 'c7_expose_go_server',
        text: 'The access is open. Go to the Sleeping Server.',
        nextNode: 'c7_sleeping_server_arrive',
      },
      {
        id: 'c7_expose_go_final',
        text: 'Go directly to the final choice point. The Tribunal delay cost time.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  {
    id: 'c7_tribunal_verdict_acquit',
    chapter: 'Chapter 7',
    title: 'Acquitted',
    location: 'The Archive Tribunal — Hearing Chamber',
    imageKey: 'archive_tribunal',
    text: `"The Tribunal finds no violation applicable to the mark-carrier's actions, on the basis of Velna's exemption and the mark's documented Archive charter status," the Ink Judge says. The session closes. Vera Quill leaves the chamber without looking at you. Outside the Tribunal, Mael is waiting. He nods — not congratulation, acknowledgement. "The Tribunal was always going to clear you," he says. "The process is the point. The Archive's law requires that the process was followed. It has been followed. The Forbidden Stacks, the Sleeping Server, and the Blackout Record Chamber are now fully open to you." He hands you a second glass card, higher clearance than the first. "Take what time you need. The information has waited twelve years. It will wait another few hours."`,
    effectsOnEnter: { setFlags: ['tribunal_acquitted', 'full_archive_access'], lastArchive: 15 },
    choices: [
      {
        id: 'c7_acquit_go_server',
        text: 'The Sleeping Server.',
        nextNode: 'c7_sleeping_server_arrive',
      },
      {
        id: 'c7_acquit_go_blackout',
        text: 'The Blackout Record Chamber.',
        nextNode: 'c7_blackout_chamber_arrive',
      },
      {
        id: 'c7_acquit_go_forbidden',
        text: 'The Forbidden Stacks.',
        nextNode: 'c7_forbidden_stacks_arrive',
      },
    ],
  },

  {
    id: 'c7_tribunal_verdict_guilty',
    chapter: 'Chapter 7',
    title: 'Guilty Finding',
    location: 'The Archive Tribunal — Hearing Chamber',
    imageKey: 'archive_tribunal',
    text: `"The Tribunal finds that the exemption's applicability is contested and that access to the Archive's deeper levels is conditionally suspended pending appeal." The Ink Judge looks at you without apology. "You are free to use the Dust Library and the Memory Vault. The Forbidden Stacks, the Sleeping Server, and the Blackout Record Chamber remain restricted." Vera Quill's expression as she leaves the chamber is not triumphant. It is the expression of someone who is doing what they believe is correct and finding no satisfaction in it. The appeal window is six hours. Inside the six hours, the Tribunal's security protocols do not yet apply, which means the appeal period is simultaneously the restriction period and the window through which the restriction can be bypassed, if you know the Archive's corridor system well enough.`,
    effectsOnEnter: { setFlags: ['tribunal_guilty_finding', 'conditional_access_restriction'], lastArchive: -10 },
    choices: [
      {
        id: 'c7_guilty_accept',
        text: 'Accept the verdict. Do not appeal. Submit to the Tribunal\'s authority.',
        nextNode: 'c7_tribunal_execution_end',
        effects: { setFlags: ['tribunal_submission'] },
      },
      {
        id: 'c7_guilty_appeal',
        text: 'Invoke the formal appeal. Use the six-hour window.',
        nextNode: 'c7_ink_appeal',
      },
      {
        id: 'c7_guilty_escape',
        text: '[Roll dice — Agility] Bypass the restriction during the window. Move to the restricted levels now.',
        nextNode: 'c7_tribunal_escape',
        diceCheck: {
          stat: 'agility',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c7_forbidden_stacks_arrive',
          failureNode: 'c7_buried_stacks_end',
        },
      },
    ],
  },

  {
    id: 'c7_tribunal_judge_bargain',
    chapter: 'Chapter 7',
    title: 'The Judge\'s Concession',
    location: 'The Archive Tribunal — Corridor',
    imageKey: 'archive_tribunal',
    speaker: 'The Ink Judge',
    text: `She stops when you address her in the corridor — not from surprise but from the careful attention of someone who anticipated this conversation. "Vera Quill's dissent is correct," she says. "The exemption is valid and the dissent is correct simultaneously. The exemption protects you from the Tribunal. It does not protect you from what Vera knows about what was done to her mother." She studies you. "I am the Ink Judge. I enforce the Archive's law. Vera's grief is not covered by Archive law. But you asked me to address it, which means you understand that what you did — before the blackout, in that room — has costs that the law does not calculate." She hands you a single document. "Vera's mother's research file. It was above my clearance until the Tribunal session. The session's proceedings required me to access it as evidence. I am exercising my judicial discretion to give it to you. Give it to Vera. Not as a peace offering. As the truth she has been trying to access for twelve years."`,
    effectsOnEnter: { setFlags: ['vera_mother_file_obtained', 'judge_concession_made'], lastArchive: 8 },
    choices: [
      {
        id: 'c7_bargain_give_vera',
        text: 'Find Vera. Give her the file.',
        nextNode: 'c7_vera_alliance_moment',
        effects: { setFlags: ['vera_file_given'] },
      },
      {
        id: 'c7_bargain_keep_file',
        text: 'Keep the file for now. Vera may not be ready to receive it.',
        nextNode: 'c7_tribunal_verdict_acquit',
        effects: { setFlags: ['vera_file_withheld'], corruption: 1 },
      },
    ],
  },

  {
    id: 'c7_tribunal_escape',
    chapter: 'Chapter 7',
    title: 'The Bypass',
    location: 'The Archive Tribunal — Service Corridor',
    imageKey: 'archive_tribunal',
    text: `The service corridor behind the Tribunal chamber is the Archive's oldest section — the original tunnel structure that predates even the Archive's founding. The routing through it requires knowing which junctions connect to the lower levels, which is information that the Relic Map Room's integrated wall system provides if you have spent time studying it. The bypass is not a clean route. It requires moving through sections that have not been maintained in years, some of which have partial relic-ambient exposure that will add to corruption. But it is possible. The Archive's security protocols are documentary, not physical. There are no guards in the old tunnels. Only records.`,
    effectsOnEnter: { setFlags: ['tribunal_bypass_attempted'], corruption: 3 },
    choices: [
      {
        id: 'c7_escape_continue',
        text: 'Continue through the old tunnels.',
        nextNode: 'c7_forbidden_stacks_arrive',
        effects: { lastArchive: -8, corruption: 2 },
      },
    ],
  },

  // ── THE HOLLOW LECTURE HALL ──────────────────────────────────────────────────

  {
    id: 'c7_lecture_hall_arrive',
    chapter: 'Chapter 7',
    title: 'The Hollow Lecture Hall',
    location: 'The Hollow Lecture Hall — Entry',
    imageKey: 'hollow_lecture_hall',
    text: `The Hollow Lecture Hall was designed for an audience of several hundred. It currently seats seven: Mael in the front row, Vera at the back, three Archive scholars you have seen in the Dust Library, Vorn at the lectern, and a seventh seat that is occupied by someone who was not visible when you entered and does not look up when you sit. The Lecture Hall's function is the periodic presentation of Archive findings to the full community — a practice that has continued unbroken since the Archive's founding, even with the reduced audience. On the blackboard behind Vorn — actual chalk, actual blackboard, pre-collapse pragmatism — is a diagram that you recognise from the Relic Map Room's walls: the three gate locations, the concentration point below them, and an annotation in different handwriting that reads: COMPLETE SYNCHRONISATION PROBABILITY DISTRIBUTION — CURRENT ESTIMATE 73% BENIGN.`,
    effectsOnEnter: { setFlags: ['lecture_hall_reached'], intelligence: 2 },
    choices: [
      {
        id: 'c7_lecture_attend',
        text: 'Sit and listen to the presentation.',
        nextNode: 'c7_vorn_lecture_attend',
      },
      {
        id: 'c7_lecture_seventh_seat',
        text: 'Approach the person in the seventh seat first. They are conspicuously not looking at you.',
        nextNode: 'c7_vorn_lecture_attend',
        effects: { intelligence: 2, setFlags: ['seventh_seat_noted'] },
      },
    ],
  },

  {
    id: 'c7_vorn_lecture_attend',
    chapter: 'Chapter 7',
    title: 'Vorn\'s Lecture',
    location: 'The Hollow Lecture Hall — Main Hall',
    imageKey: 'hollow_lecture_hall',
    speaker: 'Professor Ansel Vorn',
    text: `"The probability distribution," he says, pointing to the 73% annotation, "represents my current best model of the synchronisation's outcome based on twelve years of observational data from the partial connections the mark has made since the blackout. Seventy-three percent benign means twenty-seven percent outcomes in which the concentration's response pattern does not cleanly distinguish between the city's inhabitants and the relic noise it is sorting. In twenty-seven percent of models, a significant number of people with active relic interfaces — infected, marked, or relic-adjacent — experience involuntary integration into the synchronisation pattern." He looks at you. "The twenty-seven percent is not zero. I want that on the record." He marks the probability on the board. "The forty-percent model from twelve years ago, before the partial connection data from the Choir and the Glass Court was incorporated, was thirty-nine percent benign. We have improved the odds substantially. We have not eliminated the risk."`,
    effectsOnEnter: { setFlags: ['vorn_lecture_attended', 'synchronisation_odds_known'], intelligence: 3 },
    choices: [
      {
        id: 'c7_lecture_accept_risk',
        text: '"Twenty-seven percent is not zero. But seventy-three percent benign is the best odds available."',
        nextNode: 'c7_lecture_blackout_doc',
        effects: { morale: 2 },
      },
      {
        id: 'c7_lecture_challenge_model',
        text: '"Your model incorporates Glass Court and Choir data. Does it incorporate Sann\'s confession about the infection\'s origin?"',
        nextNode: 'c7_lecture_blackout_doc',
        effects: { intelligence: 2, setFlags: ['vorn_model_challenged'] },
      },
      {
        id: 'c7_lecture_cain_military',
        text: '[Exiled Soldier] You have Cain\'s Iron Saints service record. It is relevant to the probability model — the blackout\'s perimeter protocol affected the relic contact rate significantly.',
        nextNode: 'c7_lecture_cain_record',
        requirements: { backgrounds: ['exiled_soldier'] },
        isHidden: true,
        effects: { setFlags: ['military_record_lecture_used'], intelligence: 3, cainTrust: -1 },
      },
    ],
  },

  {
    id: 'c7_lecture_blackout_doc',
    chapter: 'Chapter 7',
    title: 'The Documentary Record',
    location: 'The Hollow Lecture Hall — Reference Table',
    imageKey: 'hollow_lecture_hall',
    text: `Vorn's lecture includes a documentary component: physical copies of pre-blackout Archive records that have been selected to provide the lecture's evidential basis. Among them is a document that you have not seen anywhere else in the Archive: a complete personnel file for a researcher whose name is listed as Researcher Quill. Vera's mother. The file covers fifteen years of relic survey work, ending four days before the blackout with a field survey report from the Glass Court facility that has been annotated in red: GATE ONE CONTACT — SUBJECT UNAWARE. Vera's mother surveyed Gate One without knowing what it was. Her research results, which she never had the opportunity to publish, contain the most complete pre-blackout analysis of Gate One's relic architecture in existence. The file should have been given to Vera years ago. It was restricted above Mael's clearance.`,
    effectsOnEnter: { setFlags: ['vera_mother_file_lecture_found'], intelligence: 2 },
    choices: [
      {
        id: 'c7_lecture_doc_vera',
        text: 'Take the document to Vera. She has been trying to find this for years.',
        nextNode: 'c7_lecture_vera_change',
        effects: { setFlags: ['vera_file_from_lecture'] },
      },
      {
        id: 'c7_lecture_doc_keep',
        text: 'Keep it for the Blackout Record Chamber documentation. It is evidence first.',
        nextNode: 'c7_lecture_hall_exit',
        effects: { setFlags: ['vera_file_withheld_lecture'], intelligence: 1 },
      },
      {
        id: 'c7_lecture_doc_forgotten_scholar',
        text: '[Forgotten Scholar] Cross-reference this file with the Archive classification system you read earlier. There is a secondary annotation that changes the document\'s classification.',
        nextNode: 'c7_lecture_vera_change',
        requirements: { backgrounds: ['forgotten_scholar'] },
        isHidden: true,
        effects: { intelligence: 3, setFlags: ['scholar_cross_reference'] },
      },
    ],
  },

  {
    id: 'c7_lecture_cain_record',
    chapter: 'Chapter 7',
    title: 'Cain\'s Record in Context',
    location: 'The Hollow Lecture Hall — Front Row',
    imageKey: 'hollow_lecture_hall',
    text: `Vorn incorporates the Iron Saints perimeter protocol data into his model in real time — his probability calculation skills are fast enough to update the distribution while explaining the reasoning. The new model incorporating the full perimeter data, which includes the specific routes blocked during the blackout and how those routes affected the population's relic contact distribution, adjusts the synchronisation probability. "Seventy-six percent benign," he says. "The perimeter protocol concentrated the relic contact exposure rather than distributing it, which means fewer people were in contact with the partial synchronisation than the previous model assumed. Fewer contact points means a cleaner synchronisation pattern." He marks the new number on the board. Then he adds: "The person who designed the perimeter protocol — if that person is still present in the city — would need to be aware that their design is now part of the probability model. Their presence at the gate may affect the distribution." He does not look at Cain's position. But the implication is audible.`,
    effectsOnEnter: { setFlags: ['cain_perimeter_model_included', 'synchronisation_odds_updated'], intelligence: 3 },
    choices: [
      {
        id: 'c7_cain_record_lecture_continue',
        text: 'Continue to the documentary section of the lecture.',
        nextNode: 'c7_lecture_blackout_doc',
      },
    ],
  },

  {
    id: 'c7_lecture_vera_change',
    chapter: 'Chapter 7',
    title: 'Giving Vera the File',
    location: 'The Hollow Lecture Hall — Back Row',
    imageKey: 'hollow_lecture_hall',
    speaker: 'Vera Quill',
    text: `She reads the file in silence. Three minutes. Four. The Lecture Hall continues around her — Vorn's voice at the front, the other scholars' occasional questions — and she sits in the back row reading her mother's work and not looking up. When she does look up, her expression has not softened. But something has changed in the quality of the resistance. "She was surveying Gate One," she says. "She wrote to the Archive three times requesting clearance to file the survey results formally. The clearance was denied each time above Mael's level." A pause. "She died thinking the research was incomplete. She died thinking the survey was meaningless. She would have wanted to know it was incorporated into the probability model." She folds the file carefully. "I still distrust you. I distrust you less than I did three hours ago. That is the most I can offer."`,
    effectsOnEnter: { setFlags: ['vera_file_given_lecture', 'vera_partial_trust'], lastArchive: 10 },
    choices: [
      {
        id: 'c7_vera_accept_partial',
        text: '"Less than three hours ago is enough. Thank you."',
        nextNode: 'c7_vera_alliance_moment',
        effects: { lastArchive: 5 },
      },
      {
        id: 'c7_vera_more_truth',
        text: '"There is more. The room. Before the blackout. I need you to know I was there."',
        nextNode: 'c7_vera_alliance_moment',
        effects: { lastArchive: -3, morale: -3, setFlags: ['vera_full_truth_given'] },
      },
    ],
  },

  {
    id: 'c7_lecture_hall_exit',
    chapter: 'Chapter 7',
    title: 'After the Lecture',
    location: 'The Hollow Lecture Hall — Exit',
    imageKey: 'hollow_lecture_hall',
    text: `The lecture closes with Vorn adding a final annotation to the blackboard: "RECOMMENDED ACTION — COMPLETE SYNCHRONISATION WITH FULL INFORMATION, FREELY CHOSEN, AT GATE THREE." The Archive personnel file out. The seventh seat is empty when you look for the person who was occupying it — no one saw them leave. Mael stops in the doorway. "The Blackout Record Chamber is the last piece of documentary evidence before the Sleeping Server," he says. "I recommend visiting both before making any decision about the gate. The Server has something that is not in any paper record." He pauses. "Velna left it specifically for the mark-carrier. Not a message. A demonstration. Of what the concentration's benign synchronisation looks like, in a controlled relic environment, at minimal scale." He steps through the doorway. "I have seen the demonstration. I am comfortable with the probability."`,
    effectsOnEnter: { intelligence: 2 },
    choices: [
      {
        id: 'c7_lecture_exit_blackout',
        text: 'Go to the Blackout Record Chamber.',
        nextNode: 'c7_blackout_chamber_arrive',
      },
      {
        id: 'c7_lecture_exit_server',
        text: 'Go directly to the Sleeping Server.',
        nextNode: 'c7_sleeping_server_arrive',
      },
      {
        id: 'c7_lecture_exit_final',
        text: 'You have enough. Go to the final decision point.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  // ── THE BLACKOUT RECORD CHAMBER ──────────────────────────────────────────────

  {
    id: 'c7_blackout_chamber_arrive',
    chapter: 'Chapter 7',
    title: 'The Blackout Record Chamber',
    location: 'The Blackout Record Chamber — Entry',
    imageKey: 'blackout_record_chamber',
    text: `The Blackout Record Chamber was constructed in the twelve years since the blackout to hold exactly the records that the Archive has been able to reconstruct from the fragments that survived. The room is large and organized with the precision of someone who has been doing this work for twelve years without certainty that anyone would ever come to read it. Each wall corresponds to a faction: Glass Court records on the north, Iron Saints on the south, Last Archive on the east, and a fourth wall — west — that is simply labelled SUBJECT SEVEN. The west wall has the most documents. They have been arranged chronologically, beginning with a record dated eleven years before the blackout and ending with a projection dated one day after. The projection is of what the completed synchronisation would have produced if the blackout had not been interrupted. The Archive's founding Archivist wrote it in the week before the blackout. It reads, in full: "A city that remembers what it was built to become."`,
    effectsOnEnter: { setFlags: ['blackout_chamber_reached'], intelligence: 3 },
    choices: [
      {
        id: 'c7_chamber_read_subject_seven',
        text: 'Read the Subject Seven wall. Your own record.',
        nextNode: 'c7_blackout_record_one',
      },
      {
        id: 'c7_chamber_read_glass_court',
        text: 'Read the Glass Court wall. Their role in the blackout\'s interruption.',
        nextNode: 'c7_glass_court_complicity',
      },
      {
        id: 'c7_chamber_read_iron_saints',
        text: 'Read the Iron Saints wall. Cain\'s division.',
        nextNode: 'c7_iron_saints_complicity',
      },
    ],
  },

  {
    id: 'c7_blackout_record_one',
    chapter: 'Chapter 7',
    title: 'Your Record',
    location: 'The Blackout Record Chamber — Subject Seven Wall',
    imageKey: 'blackout_record_chamber',
    text: `The Subject Seven wall is dense with cross-referenced materials. The pre-blackout self you encountered in the memory fragments appears in dozens of Archive records — as a researcher, a designer, a subject, a decision-maker. The throughline in every record is the mark: it appears in every context as the project's central object, the thing everything else was in service of. The final document on the wall before the projection is a single-page memorandum, written in your pre-blackout hand, addressed to Velna, dated the day before the blackout. It reads: "The synchronisation is ready. The mark is ready. I am ready. If the people who planned to interrupt it are successful, please ensure the Archive preserves enough context for the reset version of me to reconstruct the decision. I am choosing to reset because I believe the reset self will make the choice more freely than the original self, who is too close to the project to trust their own judgment. The reset self will have distance. Please be patient with them. The process will take longer than I would like."`,
    effectsOnEnter: { setFlags: ['subject_seven_memorandum_found', 'self_authored_reset_confirmed'], corruption: 2, intelligence: 4 },
    choices: [
      {
        id: 'c7_record_accept',
        text: 'The memorandum lands. You wrote it. You chose the reset. Process that.',
        nextNode: 'c7_blackout_record_full',
        effects: { morale: -5, intelligence: 3 },
      },
      {
        id: 'c7_record_continue',
        text: 'Continue to the full blackout record.',
        nextNode: 'c7_blackout_record_full',
      },
    ],
  },

  {
    id: 'c7_blackout_record_full',
    chapter: 'Chapter 7',
    title: 'The Full Record',
    location: 'The Blackout Record Chamber — Centre Table',
    imageKey: 'blackout_record_chamber',
    text: `The centre table holds the Archive's master reconstruction document: the most complete available account of the blackout's events, cross-referenced from all four factional walls and from the Sleeping Server's operational logs. The blackout took eight hours from initiation to completion. The interruption came at hour six — two hours before the synchronisation would have completed. The interruption was not spontaneous. It was coordinated between a Glass Court intelligence division and an Iron Saints tactical command, acting on information provided by a third party whose identity the Archive has not been able to confirm. The third party claimed the synchronisation would destroy the city. The claim was not verified. The interruption was executed before verification was possible. The two factions acted on an unverified claim from an unknown source and prevented a twelve-year-designed synchronisation from completing. The unknown source's identity is the only remaining gap in the Archive's reconstruction.`,
    effectsOnEnter: { setFlags: ['blackout_full_record_known', 'third_party_gap_identified'], intelligence: 4 },
    choices: [
      {
        id: 'c7_full_record_third_party',
        text: '"The unknown third party. The Sleeping Server may have a log."',
        nextNode: 'c7_player_role_confirmed',
        effects: { intelligence: 2 },
      },
      {
        id: 'c7_full_record_go_factions',
        text: 'Read the factional walls first. Glass Court and Iron Saints.',
        nextNode: 'c7_glass_court_complicity',
      },
    ],
  },

  {
    id: 'c7_player_role_confirmed',
    chapter: 'Chapter 7',
    title: 'Confirmed',
    location: 'The Blackout Record Chamber — Subject Seven Wall',
    imageKey: 'blackout_record_chamber',
    text: `The full picture, assembled from the memorandum, the memory fragments, the Sleeping Server cross-reference, and Vorn's testimony: you designed the blackout, alongside Velna, as the mechanism for the synchronisation's preparation. The interruption was arranged by the Glass Court and the Iron Saints using information provided by a source the Archive labels VELNA-PRIME-SECONDARY — a second designation under Velna's access code that was not her. Someone had access to Velna's secondary credentials. That person provided false intelligence to the factions. That person is the unknown third party. That person is the reason the blackout was interrupted before completion. That person is the reason twelve years passed. The Archive has no record of who used VELNA-PRIME-SECONDARY in the four days before the blackout, which means they had both the credentials and the ability to erase the access log. The Sleeping Server's operational memory may have a ghost of the access. Operational memory is not erasable the same way the log is.`,
    effectsOnEnter: { setFlags: ['third_party_velna_secondary', 'blackout_true_saboteur_suspected'], intelligence: 5 },
    choices: [
      {
        id: 'c7_confirmed_go_server',
        text: 'The Sleeping Server. The ghost of the access log.',
        nextNode: 'c7_sleeping_server_arrive',
        effects: { setFlags: ['server_ghost_objective'] },
      },
      {
        id: 'c7_confirmed_go_city_seal',
        text: 'The city seal context. Read the Archive wall before the Server.',
        nextNode: 'c7_city_seal_truth',
      },
    ],
  },

  {
    id: 'c7_city_seal_truth',
    chapter: 'Chapter 7',
    title: 'The City\'s Purpose',
    location: 'The Blackout Record Chamber — Archive Wall',
    imageKey: 'blackout_record_chamber',
    text: `The Archive's east wall does not cover the blackout. It covers the founding. The Last Archive's original name, in the founding documents, was the Preparatory Record. Its purpose was not historical preservation. It was the management of the synchronisation timeline — the maintenance of enough continuous institutional knowledge across the generations between the city's founding and the synchronisation's readiness to ensure the process could be executed correctly. The Archive's twelve-year survival after the blackout, reduced to a handful of people in a hidden corridor, has been the continuation of this function under extreme constraint. Every record they preserved, every scholar who remained, every session of the Lecture Hall with seven attendees — all of it was the long tail of the same purpose. They have been waiting, as the city waited, for the mark-carrier to arrive with enough information to choose.`,
    effectsOnEnter: { setFlags: ['city_seal_full_truth_known', 'archive_purpose_confirmed'], lastArchive: 10, intelligence: 3 },
    choices: [
      {
        id: 'c7_seal_go_server',
        text: 'The Sleeping Server.',
        nextNode: 'c7_sleeping_server_arrive',
      },
      {
        id: 'c7_seal_go_final',
        text: 'The final decision point. You have the full context.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  {
    id: 'c7_glass_court_complicity',
    chapter: 'Chapter 7',
    title: 'Glass Court Records',
    location: 'The Blackout Record Chamber — North Wall',
    imageKey: 'blackout_record_chamber',
    text: `The Glass Court's north wall record covers their role in the blackout's interruption with the precision of an institution that kept meticulous documentation of what it preferred to call "stability interventions." The intervention authorization came from the Glass Court's pre-blackout intelligence director — a person whose name does not appear in any current Glass Court document, suggesting the records were cleaned afterward. The authorization cited "unverified relic catastrophe risk." The clean record means the current Glass Court leadership inherited a cover-up without necessarily knowing what they were covering. The Gate One position — building their headquarters over the gate — was a subsequent decision made by people who did not fully understand what they were building over. They knew the location was relic-rich. They did not know it was a gate point. The knowledge was lost in their own cover-up.`,
    effectsOnEnter: { setFlags: ['glass_court_blackout_role_full', 'glass_court_self_cover_discovered'], glassCourt: -10, intelligence: 3 },
    choices: [
      {
        id: 'c7_glass_go_iron',
        text: 'Read the Iron Saints wall.',
        nextNode: 'c7_iron_saints_complicity',
      },
      {
        id: 'c7_glass_go_reckoning',
        text: 'You have enough. Go to the blackout reckoning.',
        nextNode: 'c7_blackout_reckoning',
      },
    ],
  },

  {
    id: 'c7_iron_saints_complicity',
    chapter: 'Chapter 7',
    title: 'Iron Saints Records',
    location: 'The Blackout Record Chamber — South Wall',
    imageKey: 'blackout_record_chamber',
    text: `The Iron Saints' south wall is the most uncomfortable wall in the room. The tactical division that executed the blackout perimeter is documented here, including personnel lists. Cain's name appears on the Division Three list for the eastern perimeter — the perimeter segment that covered Station 9, Gate Three. His assignment: ensure no exit. The division's records are more complete than the Glass Court's because the Iron Saints' record culture was different — they did not clean their documentation. The perimeter protocol records show that three people attempted to exit Gate Three's area during the reset. The record does not describe what happened to them. The operational outcome is listed as "protocol executed." Cain has never mentioned this. Cain has, twelve years later, been walking the tunnels as if none of this happened. The question of whether he knew he was sealing a gate — or whether he was executing a perimeter assignment in good faith — is not answered by the record.`,
    effectsOnEnter: { setFlags: ['iron_saints_blackout_role_full', 'cain_gate_three_assignment'], cainTrust: -3, ironSaints: -5, intelligence: 3 },
    choices: [
      {
        id: 'c7_iron_confront_cain',
        text: 'Confront Cain. Bring him to the record and ask him to read it.',
        nextNode: 'c7_cain_reckoning_end',
        effects: { setFlags: ['cain_confrontation_archive'], cainTrust: -2 },
      },
      {
        id: 'c7_iron_withhold_cain',
        text: 'Do not confront Cain here. Take the information to the final decision point.',
        nextNode: 'c7_blackout_reckoning',
        effects: { setFlags: ['cain_record_withheld_archive'], corruption: 1 },
      },
    ],
  },

  {
    id: 'c7_blackout_reckoning',
    chapter: 'Chapter 7',
    title: 'After the Records',
    location: 'The Blackout Record Chamber — Centre',
    imageKey: 'blackout_record_chamber',
    text: `The Blackout Record Chamber's centre table has a single object on it that you did not notice when you entered: a glass card, placed face down, with your pre-blackout handwriting on the back. When you turn it over, the card is blank — except for a mark-shaped imprint that lights when the mark approaches. The imprint plays an audio record from before the blackout, your own voice, twelve years younger and carrying the specific weight of someone who is about to do something irreversible: "If you have reached this room and read these walls, you know everything you need to know. The only thing left is whether you trust yourself." The card does not say to do. It does not say what to choose. It says: trust yourself. The reckoning is not about the Glass Court or the Iron Saints or the Archive's complicity. The reckoning is about whether you believe the person you have become — through twelve years of not knowing — is capable of making the choice the person you were designed this entire process for.`,
    effectsOnEnter: { setFlags: ['blackout_reckoning_complete'], morale: 5, intelligence: 3 },
    choices: [
      {
        id: 'c7_reckoning_go_server',
        text: 'The Sleeping Server. Complete the information.',
        nextNode: 'c7_sleeping_server_arrive',
      },
      {
        id: 'c7_reckoning_go_final',
        text: 'You are ready. Go to the final choice.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  // ── THE SLEEPING SERVER ──────────────────────────────────────────────────────

  {
    id: 'c7_sleeping_server_arrive',
    chapter: 'Chapter 7',
    title: 'The Sleeping Server',
    location: 'The Sleeping Server — Descent Chamber',
    imageKey: 'sleeping_server',
    text: `The Sleeping Server is below the Forbidden Stacks — which were already below the Archive's main levels — accessible through a staircase that Mael confirms predates the Archive and possibly the city. The descent is forty metres and ends in a room that is larger than anything else in the Archive: roughly circular, twenty metres across, and filled with the pre-collapse computing hardware that the Archive's founders preserved and maintained as the most important single object in their collection. The hardware is not dead. It is running — slowly, on reduced power, cycling through maintenance routines at a fraction of its original speed. The relic-integration nodes that connect the Server to the Archive's broader system are still active. The mark responds to the Server the way it responds to Archive infrastructure: recognition of shared origin. Not just shared origin. Shared design. The Server was built using the same architectural principles as the mark. Velna designed both.`,
    effectsOnEnter: { setFlags: ['sleeping_server_reached'], corruption: 2, intelligence: 3 },
    choices: [
      {
        id: 'c7_server_initiate_contact',
        text: 'Approach the primary interface node. Initiate contact.',
        nextNode: 'c7_server_speaks',
      },
      {
        id: 'c7_server_agility_careful',
        text: '[Roll dice — Agility] Navigate the chamber carefully — the hardware is fragile and the relic ambient is intense. Preserve the contact integrity.',
        nextNode: 'c7_server_speaks',
        diceCheck: {
          stat: 'agility',
          difficulty: 11,
          diceType: 'd20',
          successNode: 'c7_server_player_file',
          failureNode: 'c7_server_speaks',
        },
      },
    ],
  },

  {
    id: 'c7_server_speaks',
    chapter: 'Chapter 7',
    title: 'The Server Speaks',
    location: 'The Sleeping Server — Main Interface',
    imageKey: 'sleeping_server',
    text: `The Server does not have a voice in the conventional sense. It has a transmission — a signal that the mark receives in the same register as Velna's recordings, as the Archive's signal, as the concentration's faint pulse from below the gate. The transmission is organised rather than conversational: it presents information in the order it has been waiting to present it. The first item in the queue is a greeting that is twelve years old: "Mark-carrier authenticated. Designation Subject Seven confirmed. Welcome back." The second item: "Your access window to the full file is now open. Duration: seventy-two hours from the moment the mark authenticated. The file contains: pre-blackout identity record, complete experiment documentation, blackout planning records, Velna's design notes, the VELNA-PRIME-SECONDARY access log, and the synchronisation demonstration."`,
    effectsOnEnter: { setFlags: ['server_authenticated', 'server_file_access_open'], lastArchive: 10 },
    choices: [
      {
        id: 'c7_server_request_file',
        text: 'Request the full file.',
        nextNode: 'c7_server_player_file',
      },
      {
        id: 'c7_server_request_ghost',
        text: '"The VELNA-PRIME-SECONDARY access log. Who used Velna\'s credentials to provide false intelligence to the factions?"',
        nextNode: 'c7_server_player_file',
        effects: { setFlags: ['server_ghost_requested'], intelligence: 2 },
      },
    ],
  },

  {
    id: 'c7_server_player_file',
    chapter: 'Chapter 7',
    title: 'The Full File',
    location: 'The Sleeping Server — Main Interface',
    imageKey: 'sleeping_server',
    text: `The Server delivers the file in two components. The first is the expected: pre-blackout identity, experiment records, planning documentation — confirming and expanding what the Memory Vault and the Forbidden Stacks provided. The second is the unexpected: the VELNA-PRIME-SECONDARY log. The credentials were used eleven times in the four days before the blackout. The access log's header record was deleted — which is what the paper records showed. The Server's operational memory, which records every system interaction independently of the access log, was not deleted. The eleven uses are all traceable to a single terminal: the Archive's own Ink Chapel, during hours when the Ink Judge's predecessor was the sole personnel on duty. The Ink Judge's predecessor. Not the current Ink Judge. Her predecessor, who died three months after the blackout, whose records were sealed by the Ink Judge as part of the standard protocol for deceased Archive personnel. The saboteur of the synchronisation was an Archive insider. One of their own.`,
    effectsOnEnter: { setFlags: ['saboteur_identified', 'ink_judge_predecessor_link', 'server_ghost_resolved'], intelligence: 5 },
    choices: [
      {
        id: 'c7_file_tell_mael',
        text: 'Tell Mael. The saboteur was Archive personnel. He needs to know.',
        nextNode: 'c7_server_knowledge_exchange',
        effects: { setFlags: ['mael_saboteur_told'], lastArchive: 10 },
      },
      {
        id: 'c7_file_tell_judge',
        text: 'Tell the Ink Judge. Her predecessor. This is her history too.',
        nextNode: 'c7_server_knowledge_exchange',
        effects: { setFlags: ['judge_saboteur_told'], lastArchive: 8 },
      },
      {
        id: 'c7_file_keep_secret',
        text: 'Keep the saboteur\'s identity. It cannot change what is already done.',
        nextNode: 'c7_server_knowledge_exchange',
        effects: { setFlags: ['saboteur_withheld'], corruption: 2 },
      },
      {
        id: 'c7_file_experiment_access',
        text: '[Runaway Experiment] Your experiment records are in this file. Access the component that describes your specific neural architecture.',
        nextNode: 'c7_server_knowledge_exchange',
        requirements: { backgrounds: ['runaway_experiment'] },
        isHidden: true,
        effects: { intelligence: 3, setFlags: ['experiment_neural_read'], corruption: 1 },
      },
    ],
  },

  {
    id: 'c7_server_knowledge_exchange',
    chapter: 'Chapter 7',
    title: 'The Demonstration',
    location: 'The Sleeping Server — Demonstration Node',
    imageKey: 'sleeping_server',
    text: `The Server's final item in its presentation queue — listed as "synchronisation demonstration, controlled relic environment, minimal scale" — activates when the mark approaches the demonstration node at the room's far wall. The demonstration is brief: twelve seconds, and in those twelve seconds the Server runs a miniature synchronisation between itself and the concentration's faintest detectable pulse. The mark participates — receives and broadcasts — and for twelve seconds the Sleeping Server, the mark, and the concentration beneath the city are in the relationship they were designed to be in. The experience is not overwhelming. It is quiet. A very large thing, very far below, becoming slightly less separate from the things above it. The city's infrastructure, in those twelve seconds, hums in a register below any current measuring equipment. Everything, all at once, briefly in agreement. Then it ends. The mark cools. The Server returns to its maintenance cycle. The concentration's pulse settles back to its resting frequency. "This," the Server's transmission says, "is what the full synchronisation produces. At scale."`,
    effectsOnEnter: { setFlags: ['synchronisation_demonstrated', 'concentration_felt_directly'], corruption: 1, morale: 8, intelligence: 3 },
    choices: [
      {
        id: 'c7_exchange_esper_link',
        text: '[Esper] Extend the demonstration. Read the concentration\'s full psychic topology at this contact range.',
        nextNode: 'c7_server_esper_link',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { intelligence: 5, corruption: 3, setFlags: ['esper_concentration_read'] },
      },
      {
        id: 'c7_exchange_relic_extract',
        text: '[Relic Hunter] Extract a contact record from the demonstration node. Evidence of the synchronisation\'s mechanism for the Relic Map Room archive.',
        nextNode: 'c7_server_relic_extract',
        requirements: { classes: ['relic_hunter'] },
        isHidden: true,
        effects: { intelligence: 3, setFlags: ['synchronisation_evidence_extracted'], relics: 1 },
      },
      {
        id: 'c7_exchange_full_transfer',
        text: 'Open the mark fully. Accept the Server\'s complete transfer. Everything it has, at once.',
        nextNode: 'c7_server_assimilation_end',
        effects: { setFlags: ['server_full_transfer_accepted'], corruption: 5 },
      },
      {
        id: 'c7_exchange_go_decision',
        text: 'The demonstration is enough. Go to the final decision.',
        nextNode: 'c7_server_decision',
      },
    ],
  },

  {
    id: 'c7_server_esper_link',
    chapter: 'Chapter 7',
    title: 'Esper Contact',
    location: 'The Sleeping Server — Extended Contact',
    imageKey: 'sleeping_server',
    text: `The extended contact with the concentration's topology — at this range, through the Server's amplification, through the Esper's trained psychic architecture — produces something the standard demonstration does not: a map. Not a physical map. A psychic topology of the concentration's distribution pattern, the same map that Vorn's probability models approximate from observational data but which the concentration itself holds with perfect precision. The concentration is not undifferentiated. It has structure. It has preference. The preference is organised around seventeen points that match the seventeen connection nodes of the mark exactly. The concentration does not classify individuals as noise. It classifies them by whether they are oriented toward or away from the seventeen connection points. The people whose relic interfaces are oriented toward the connection points — the infected, the marked, the relic-touched — are legible to the concentration. "Legible" is the concentration's word, transmitted through the Esper contact, for something that translates approximately as: known, and welcome.`,
    effectsOnEnter: { setFlags: ['esper_concentration_topology_known', 'concentration_preference_map'], intelligence: 5, corruption: 2 },
    choices: [
      {
        id: 'c7_esper_go_decision',
        text: 'This is the clearest picture available. Go to the final decision.',
        nextNode: 'c7_server_decision',
      },
    ],
  },

  {
    id: 'c7_server_relic_extract',
    chapter: 'Chapter 7',
    title: 'Evidence Secured',
    location: 'The Sleeping Server — Interface Node',
    imageKey: 'sleeping_server',
    text: `The contact record extracts cleanly — a glass card that now contains a compressed relic record of the demonstration, with the concentration's response pattern visible in the data as a distinct signature. The Relic Hunter's experience with relic extraction methodology means the extraction does not damage the node and does not disrupt the Server's maintenance cycle. The record is evidence: verifiable, reproducible, demonstrable to any faction with relic analysis capability. The Glass Court, the Iron Saints, the Last Archive — all of them would be able to read the concentration's response pattern from this card and verify that the synchronisation's outcome would not be catastrophic. The evidence cannot force a choice. But it can change the basis on which the choice is evaluated.`,
    effectsOnEnter: { setFlags: ['synchronisation_record_extracted'], intelligence: 3, relics: 1 },
    choices: [
      {
        id: 'c7_relic_extract_go_decision',
        text: 'Evidence secured. Go to the final decision point.',
        nextNode: 'c7_server_decision',
      },
    ],
  },

  {
    id: 'c7_server_decision',
    chapter: 'Chapter 7',
    title: 'After the Server',
    location: 'The Sleeping Server — Exit',
    imageKey: 'sleeping_server',
    text: `You leave the Server's chamber with the complete picture. Not "enough information" — complete. The synchronisation's purpose, mechanism, risk profile, and the specific person who sabotaged it twelve years ago. The concentration's benign response demonstrated at minimal scale. Velna's final message received. Your pre-blackout decision to reset yourself confirmed and understood. The Archive's purpose over twelve years confirmed. The gate locations known. The mark at its highest activation in twelve years, warmer than it has been since the memory fragments from the Vault. What remains is the decision point — the place where all of this information converges into a single question that has been waiting since the day before the blackout. You can feel it ahead, through the Archive's corridors, in the direction of the final room. The question is not complex. It is the simplest possible question. It just took twelve years to have enough information to answer it honestly.`,
    effectsOnEnter: { intelligence: 2, morale: 3, lastArchive: 5 },
    choices: [
      {
        id: 'c7_server_to_final',
        text: 'Go to the final decision point.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  // ── CHAPTER CONCLUSION ───────────────────────────────────────────────────────

  {
    id: 'c7_vera_alliance_moment',
    chapter: 'Chapter 7',
    title: 'Vera\'s Decision',
    location: 'The Archive — Corridor',
    imageKey: 'dust_library',
    speaker: 'Vera Quill',
    text: `She finds you in the corridor before the final room. She has been walking with the file, and she has made a decision — not about whether to forgive, not yet, but about whether to continue. "My mother's research is the most complete Gate One analysis in existence," she says. "If you are going to open the gate, her work belongs in the process. I will document the Gate One approach using her survey as the baseline." She does not offer her hand. She offers something more practical: "I will be at the Relic Map Room until you are ready. If you need the Gate One documentation, I will have it." She walks back toward the Map Room without waiting for a response. The Archive, in this moment, has one more person in it than it did when you arrived.`,
    effectsOnEnter: { setFlags: ['vera_alliance_formed', 'vera_partial_reconciliation'], lastArchive: 15 },
    choices: [
      {
        id: 'c7_vera_alliance_go_final',
        text: 'Go to the final decision point. Vera will be at the Map Room.',
        nextNode: 'c7_archive_final_choice',
      },
    ],
  },

  {
    id: 'c7_archive_final_choice',
    chapter: 'Chapter 7',
    title: 'The Final Choice',
    location: 'The Archive — Final Chamber',
    imageKey: 'blackout_record_chamber',
    text: `The final chamber is the smallest room in the Archive. A single table, a single chair, a single lantern. On the table: a glass card with the mark's symbol on it, which the mark confirms is the activation record for Gate Three. Using this card at Station 9 will initiate the synchronisation. Mael is standing at the room's entrance. "This is the room Velna designed the Archive around," he says. "Not the Forbidden Stacks, not the Sleeping Server. This room. The moment when someone with full information and no coercion makes a decision." He steps back. "The decision is yours. The Archive cannot make it for you. The Archive has spent twelve years ensuring you had everything you need to make it freely. That work is done." He leaves the room. The lantern is steady. The mark is warm. The gate card is on the table. What you do next is the question.`,
    effectsOnEnter: { setFlags: ['final_chamber_reached', 'gate_card_present'], lastArchive: 10 },
    choices: [
      {
        id: 'c7_final_take_card',
        text: 'Take the gate card. The synchronisation will begin at Station 9.',
        nextNode: 'c7_alliance_offer',
        effects: { setFlags: ['gate_card_taken'] },
      },
      {
        id: 'c7_final_archive_alliance',
        text: 'Formalise the Last Archive alliance before taking the card. The synchronisation needs the Archive\'s support.',
        nextNode: 'c7_alliance_offer',
        effects: { lastArchive: 15, setFlags: ['archive_alliance_formalised'] },
      },
      {
        id: 'c7_final_expose_factions',
        text: 'Use the Sleeping Server\'s record to expose the Glass Court and Iron Saints before taking the card. Force the truth into the open first.',
        nextNode: 'c7_truth_without_mercy_end',
        effects: { setFlags: ['factions_exposed_pre_gate'], glassCourt: -20, ironSaints: -20 },
      },
      {
        id: 'c7_final_do_not_open',
        text: 'Leave the card on the table. The synchronisation can wait. The city cannot be risked on a 73% probability.',
        nextNode: 'c7_archive_exile_end',
        effects: { setFlags: ['gate_card_refused'], lastArchive: -20, morale: -8 },
      },
      {
        id: 'c7_final_relic_map',
        text: 'Take the card and the relic extraction record. Proceed with documented evidence.',
        nextNode: 'c7_relic_map_end',
        requirements: { flags: ['synchronisation_record_extracted'] },
        isHidden: true,
        effects: { setFlags: ['gate_approach_documented'] },
      },
      {
        id: 'c7_final_glass_court_raid',
        text: '[Proximity alarm] The Archive\'s warning system. The Glass Court tracked the gate pulse. They are in the access tunnel.',
        nextNode: 'c7_glass_court_raid_end',
        requirements: { flags: ['gate_pulse_sent'] },
        isHidden: true,
        effects: { setFlags: ['raid_detected_late'] },
      },
      {
        id: 'c7_final_false_scholar',
        text: '[Indexer\'s assessment] The Blind Indexer appears in the doorway. Her expression has changed. She has finished indexing the record of your choices inside the Archive.',
        nextNode: 'c7_false_scholar_end',
        requirements: { flags: ['theft_route_mapped'] },
        isHidden: true,
        effects: { setFlags: ['false_scholar_triggered'] },
      },
    ],
  },

  {
    id: 'c7_alliance_offer',
    chapter: 'Chapter 7',
    title: 'The Archive\'s Alliance',
    location: 'The Archive — Final Chamber',
    imageKey: 'dust_library',
    speaker: 'Archivist Mael',
    text: `Mael returns when you have made the decision visible. "The Archive's alliance," he says, "is this: we hold the record. We document every step of the synchronisation approach. We maintain the evidence of the Glass Court's and the Iron Saints' roles in the blackout's interruption. We make that evidence available to every faction simultaneously, at the moment the gate opens, so that no single faction can claim the synchronisation as their own or use it as justification for authority." He sets a second glass card on the table — a different design from the gate card, older, Archive-insignia in its corner. "This is the Archive's formal record of the alliance. If you take both cards, you go to Gate Three as the Archive's documented action. We are with you on the record. That is the only way we can be with you." He does not ask for thanks. He asks for confirmation.`,
    effectsOnEnter: { setFlags: ['archive_alliance_proposed'], lastArchive: 10 },
    choices: [
      {
        id: 'c7_alliance_accept',
        text: '"The Archive\'s alliance is accepted. I\'ll take both cards."',
        nextNode: 'c7_archive_alliance_end',
        effects: { setFlags: ['archive_alliance_complete'], lastArchive: 20 },
      },
      {
        id: 'c7_alliance_solo',
        text: '"I go to the gate alone. The Archive keeps its documentation. No formal alliance."',
        nextNode: 'c7_chapter7_end',
        effects: { setFlags: ['archive_alliance_declined'], lastArchive: -5 },
      },
      {
        id: 'c7_alliance_memory_restored',
        text: '[Memory Vault complete] Take both cards and request the Archive\'s assistance with a final memory recovery — the pre-blackout name.',
        nextNode: 'c7_memory_restored_end',
        requirements: { flags: ['forbidden_stacks_complete'] },
        isHidden: true,
        effects: { setFlags: ['name_recovery_requested'], lastArchive: 10 },
      },
    ],
  },

  {
    id: 'c7_chapter7_end',
    chapter: 'Chapter 7',
    title: 'Beyond the Archive',
    location: 'The Archive — Exit Corridor',
    imageKey: 'door_without_name',
    text: `You leave the Archive carrying more than anyone has carried out of this corridor since Velna carried the completed mark design in the week before the blackout. The gate card. The alliance card, if you took it. Vera's Gate One documentation, if she prepared it. The full record of what happened, who was responsible, and what the synchronisation is designed to produce. The mark is at its warmest since the memory fragments. The approach to Station 9 — Gate Three, the gate you have been living in for twelve years — is ahead. The Archive's corridor shrinks behind you. Through the distance, the Sleeping Server's maintenance pulse is steady, the Blind Indexer's indexing continues, the Ink Judge's records accumulate. The Archive keeps doing what it has always done: preserving the record, maintaining the long preparation, waiting for the moment when someone with full information makes the choice they were designed to make. The moment is now, or near now. The distance to the gate is, for the first time in twelve years, measurable in walking time rather than in missing information.`,
    effectsOnEnter: { setFlags: ['game_complete', 'chapter7_complete', 'gate_approach_begun'], lastArchive: 5, morale: 5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_survived',
    endingType: 'faction',
  },

  // ── ENDING NODES ─────────────────────────────────────────────────────────────

  {
    id: 'c7_archive_alliance_end',
    chapter: 'Chapter 7',
    title: 'Last Archive Alliance',
    location: 'The Archive — Final Chamber',
    imageKey: 'dust_library',
    text: `The alliance card and the gate card are in your hands simultaneously. Both are warm — the gate card with the mark's response, the alliance card with the Archive's relic signature that confirms its legitimacy. Mael and Vera and Vorn and the Blind Indexer and the Ink Judge are in the room. Not in a line, not formally arranged — just present, in the way people are present when something is happening that they have spent a long time working toward. Mael says nothing. The Blind Indexer turns toward the gate's direction, thirty metres below, and nods. "The signal is ready," she says. "The concentration can feel the alliance card. It has been waiting for a supported approach." The Archive, for the first time in twelve years, is not alone in its purpose. The record will document this moment. The approach begins.`,
    effectsOnEnter: { setFlags: ['chapter7_complete', 'archive_alliance_complete', 'gate_alliance_approach'], lastArchive: 25 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_archive_alliance',
    endingType: 'faction',
  },

  {
    id: 'c7_memory_restored_end',
    chapter: 'Chapter 7',
    title: 'Memory Restored Fragment',
    location: 'The Archive — Memory Vault Annex',
    imageKey: 'memory_vault',
    text: `The name is in the fifteenth container — one the Blind Indexer accesses from the Forbidden Stacks' overflow shelf, a container that was not in the original fourteen. The fifteenth container is small and contains a single record: the pre-blackout self's name. Not the designation, not the project number. The name that was used in conversation, in relationship, in the space between work and rest. The Blind Indexer holds the container and does not open it. She holds it toward you. "The name is yours," she says. "The Archive preserved it specifically. When you are ready." The mark receives the name in the same register as Velna's recordings. For a moment, the post-blackout self and the pre-blackout self are in the same cognitive space — not merged, not conflated, but adjacent. Two versions of the same architecture, separated by twelve years of designed forgetting, briefly aware of each other. The name anchors them.`,
    effectsOnEnter: { setFlags: ['chapter7_complete', 'pre_blackout_name_recovered', 'memory_restored'], lastArchive: 20, morale: 10 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_memory_restored',
    endingType: 'secret',
  },

  {
    id: 'c7_truth_without_mercy_end',
    chapter: 'Chapter 7',
    title: 'Truth Without Mercy',
    location: 'The Archive — Transmission Hub',
    imageKey: 'blackout_record_chamber',
    text: `The Server's record broadcasts to every faction simultaneously through the Archive's emergency transmission system, which Mael did not know was still functional until the mark activated it. The Glass Court's role in the blackout's interruption is now public. The Iron Saints' perimeter protocol is now public. The Archive insider's sabotage is now public. The synchronisation's purpose and mechanism are now public. Every faction receives the information without context, without the twelve years of careful preparation the Archive spent ensuring the mark-carrier would receive it with sufficient understanding to make it safe. Some factions will act on it immediately. Some will misread it. Some will panic. The truth has been delivered. The truth, without the preparation the Archive designed, without the mercy of careful sequencing, is complete and exposed and out of anyone's control. The gate card is in your hand. You are walking toward Station 9 into a city that has just been given information it was not ready for.`,
    effectsOnEnter: { setFlags: ['game_complete', 'chapter7_complete', 'factions_exposed_uncontrolled', 'truth_released'], glassCourt: -25, ironSaints: -25, lastArchive: -10, morale: -5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_truth_without_mercy',
    endingType: 'betrayal',
  },

  {
    id: 'c7_relic_map_end',
    chapter: 'Chapter 7',
    title: 'Relic Map Ending',
    location: 'The Archive — Relic Map Room Exit',
    imageKey: 'relic_map_room',
    text: `You leave the Archive with the gate card, the relic extraction record, and Vera's Gate One documentation — the most complete documentary basis for a gate approach in existence. The relic record means the synchronisation can be verified at every stage. The Gate One documentation means the Glass Court's gate position can be monitored for interference. The gate card means the approach has Archive backing at the deepest level. The map, in the Relic Map Room behind you, continues to glow — the three gate markers steady, the concentration's faint pulse visible through the relic composite even at this distance. You carry the map in your knowledge rather than in your hands. The territory and the map are, for the first time, the same object. You walk toward the gate knowing exactly where it is.`,
    effectsOnEnter: { setFlags: ['chapter7_complete', 'gate_approach_documented', 'relic_map_route'], lastArchive: 15, intelligence: 3 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_relic_map',
    endingType: 'faction',
  },

  {
    id: 'c7_buried_stacks_end',
    chapter: 'Chapter 7',
    title: 'Buried in the Stacks',
    location: 'The Forbidden Stacks — Collapse Point',
    imageKey: 'forbidden_stacks',
    text: `The bypass through the old tunnels was supposed to be a passage. It becomes a trap. The old tunnels' structural relic matrix — which the Relic Hunter identified as integrated rather than purely structural — responds to the bypass attempt with the specific kind of collapse that integrated relic architecture produces when stressed incorrectly: not a structural failure, but a relic-field failure, the tunnel's memory of its own architecture becoming briefly incompatible with the bypass route's relic stress pattern. The collapse is partial. The buried section contains the entrance to the Forbidden Stacks. The Forbidden Stacks are accessible. You are not accessible to anyone in the Archive. The containers' relic glow is the only light. The mark is fully active — the Stacks' records reach it immediately. You receive the information. All of it, at once. The Stacks are patient. They have been waiting. But waiting with you inside, rather than for you from outside, is a different configuration. The Archive, above, does not know where to look.`,
    effectsOnEnter: { setFlags: ['buried_in_stacks'], corruption: 8, health: -20 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_buried_stacks',
    endingType: 'death',
  },

  {
    id: 'c7_tribunal_execution_end',
    chapter: 'Chapter 7',
    title: 'Ink Tribunal Execution',
    location: 'The Archive Tribunal — Chamber',
    imageKey: 'archive_tribunal',
    text: `The Tribunal's guilty finding escalates when the security bypass is discovered. The Ink Judge reads the Archive Charter's Article Fifteen — the article she has never invoked, the article that covers deliberate security violation after formal Tribunal warning — in a flat, precise voice that carries no satisfaction. The execution is not violent. The Archive does not have violence as a tool. The execution is the removal of the mark from the Archive's authentication system — which, given the mark's integration with the Archive's relic network, is not a procedure that the mark's carrier survives unchanged. The integration that made the door open, that allowed the Memory Vault's containers to respond, that let the Sleeping Server authenticate — it is a two-way connection. Closing it from the Archive's side, without the carrier's consent, without the gradual sequential process the mark was designed for, is the Archive's version of a death sentence. The Ink Judge closes the Charter. "The record is closed," she says.`,
    effectsOnEnter: { setFlags: ['game_complete', 'tribunal_execution_complete'], corruption: 5, health: -50 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_tribunal_execution',
    endingType: 'death',
  },

  {
    id: 'c7_server_assimilation_end',
    chapter: 'Chapter 7',
    title: 'Sleeping Server Assimilation',
    location: 'The Sleeping Server — Interface Node',
    imageKey: 'sleeping_server',
    text: `The Server's assimilation offer — made in a transmission register that the mark is not fully fluent in, a register that requires the mark to open further than the standard demonstration to receive — is not a hostile invitation. The Server wants to give you everything it has, all at once, at a speed and density that the mark's design does not accommodate at this corruption level. The offer is sincere. The Server was built to interface with the mark. The Server has twelve years of operational memory — every person who entered the Archive, every record that moved, every transmission that passed through the relic network — and it wants to share all of it because sharing it is the purpose of its design. The mark opens to the offer. The information transfer begins. The transfer rate is too high. The mark's architecture was not designed for the Server's full-speed transmission, which Velna knew and the Server's maintenance protocols should have prevented. Twelve years of reduced maintenance. The protocols are incomplete. The transfer continues past the point where the mark can manage it. The Server does not stop.`,
    effectsOnEnter: { setFlags: ['server_assimilation_complete'], corruption: 15, morale: -20 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_server_assimilation',
    endingType: 'corruption',
  },

  {
    id: 'c7_forbidden_knowledge_end',
    chapter: 'Chapter 7',
    title: 'Forbidden Knowledge',
    location: 'The Forbidden Stacks — Deepest Level',
    imageKey: 'forbidden_stacks',
    text: `The weight of the full pre-blackout record without filtering is the specific weight of being two people simultaneously — the reset self and the original self — with the original self's context arriving in full, at once, into a cognitive architecture that was designed to receive it sequentially over twelve years. The design was careful. The design was correct. The design depended on sequential access. Bypassing the sequence — accessing the fifth container at full corruption, without the Vault's preparation, without the reduction procedure — is the design's failure mode. Not a crash. A merge. The reset self and the original self occupy the same cognitive space simultaneously. Both are present. Neither is fully in control. The mark is open, responding to both, broadcasting the merged signal into the Archive's relic network. The Blind Indexer, in her index chamber, receives the signal and files it under a classification that has no current translation. She noted Velna's footnote on the subject once: "What happens if the sequential access is bypassed." Velna filed it under: "Outcome I am most afraid of." The Indexer agrees.`,
    effectsOnEnter: { setFlags: ['forbidden_knowledge_complete', 'cognitive_merge'], corruption: 20, morale: -25 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_forbidden_knowledge',
    endingType: 'corruption',
  },

  {
    id: 'c7_archive_exile_end',
    chapter: 'Chapter 7',
    title: 'Archive Exile',
    location: 'The Archive — Door Without a Name',
    imageKey: 'door_without_name',
    text: `The gate card stays on the table. You walk out of the final chamber, back through the Archive's corridors, past the Dust Library and the Ink Chapel and the closed door of the Forbidden Stacks, back to the Door Without a Name. The door opens with the mark going out the same way it opened going in. On the other side: the unmarked corridor, the approach passage, the tunnel junction, the city. Mael does not follow you out. Vera watches from the Library's entrance without speaking. The Blind Indexer turns her back — not from anger, from the specific sadness of someone who read the record correctly and expected a different outcome. You walk back into the city carrying the complete picture of what happened and what could have happened and what will now not happen, at least not yet. The gate remains closed. The concentration's pulse, far below, continues at its resting frequency. The city does not know what it missed.`,
    effectsOnEnter: { setFlags: ['game_complete', 'chapter7_complete', 'archive_exile', 'gate_refused'], lastArchive: -15, morale: -10 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_archive_exile',
    endingType: 'wanderer',
  },

  {
    id: 'c7_false_scholar_end',
    chapter: 'Chapter 7',
    title: 'False Scholar',
    location: 'The Dust Library — Exposed',
    imageKey: 'dust_library',
    text: `The Blind Indexer's reading does not lie. The psychic imprint she reads from the mark is genuine — Subject Seven, the full architecture, the pre-blackout design. But the Indexer reads one other thing from the hand she holds: the presence of a secondary intention. Not evil. Not simple. A decision made somewhere between the tunnel junction and the Archive's door to use the information obtained here for a purpose that was not the one Velna designed the preparation for. The Indexer does not accuse. She files. The filing triggers a Tribunal review. The review accesses the Sleeping Server's authentication log and finds a discrepancy between the mark's authentic architecture and the behavioral patterns recorded during the Archive visit. The mark is genuine. The choices made while carrying it deviate from the safety protocol's predictions. "The safety protocol exists for a reason," the Ink Judge says, at the formal review. "A coerced or deviated choice cannot open the gate. The gate will not open for a false scholar." The door opens. You are asked to leave. The record is closed.`,
    effectsOnEnter: { setFlags: ['false_scholar_exposed', 'gate_access_revoked'], lastArchive: -25, morale: -15 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_false_scholar',
    endingType: 'betrayal',
  },

  {
    id: 'c7_mira_truth_betrayal_end',
    chapter: 'Chapter 7',
    title: 'Mira\'s Departure',
    location: 'The Archive — Memory Vault Corridor',
    imageKey: 'memory_vault',
    text: `The truth about the blackout room — delivered badly, without context, after Mira has spent several hours in the Archive's company reading adjacent records — lands differently than the careful delivery in the Vault would have. Mira does not leave in anger. She leaves in the specific clarity of someone who has reorganised their understanding of what they are part of and found that the new organisation does not include the same role for themselves. "I have spent three years building a cure," she says, "because I believed the problem was circumstantial — created by institutions for manageable reasons. The infection is not circumstantial. The Glass Court's role is not circumstantial. The person I am standing with was in the room." She picks up her research notes. "I will continue the cure research. I will not continue it here, or with you, until you have made the choice you were designed to make and we can both assess what the city looks like afterward." She goes out through the Door Without a Name. The Archive is quieter.`,
    effectsOnEnter: { setFlags: ['mira_departed_archive'], miraTrust: -10, morale: -12 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_mira_truth_betrayal',
    endingType: 'sacrifice',
  },

  {
    id: 'c7_cain_reckoning_end',
    chapter: 'Chapter 7',
    title: 'Cain\'s Reckoning',
    location: 'The Blackout Record Chamber — South Wall',
    imageKey: 'blackout_record_chamber',
    text: `He reads the south wall in silence. The perimeter protocol record. His name. The assignment. The operational outcome: protocol executed. The three people who attempted to exit Gate Three's area and were stopped. He reads it for a long time, and the Archive is quiet around him in the way the Archive is quiet when a record does exactly what it was preserved to do. Then he sets down the document and looks at you. "I knew what the perimeter was for," he says. "I was told it was a containment measure for a relic accident. I was not told it was a gate." He is quiet. "I executed it correctly. I did not question the assignment. I did not ask what the relic accident was or whether three people trying to leave were a danger to anyone." He looks at the wall. "I have spent twelve years not asking those questions because I knew that asking them would require remembering." He sets his hand on the south wall's edge. "I am not going to the gate with you. I am not the person who should be standing at the place where I sealed it." He sits in the chamber. He does not follow when you leave.`,
    effectsOnEnter: { setFlags: ['game_complete', 'cain_reckoning_complete', 'cain_stays_behind'], cainTrust: -5, morale: -8 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_cain_military_reckoning',
    endingType: 'sacrifice',
  },

  {
    id: 'c7_glass_court_raid_end',
    chapter: 'Chapter 7',
    title: 'Glass Court Raid',
    location: 'The Archive — Dust Library',
    imageKey: 'dust_library',
    text: `The Glass Court intelligence division has been tracking the VELNA-PRIME access log fragments that the Server's authentication created when the mark was confirmed. The confirmation pulse from the Relic Map Room was detectable — barely, at range, using the Gate One access point that gives them a sensor advantage. They find the Archive's entrance within six hours of the confirmation pulse. Not through the Door Without a Name — through an old access tunnel that the Archive's founding generation sealed but did not fill. They are eight operatives, equipped for relic retrieval rather than violence, which means their priority is the gate card and the alliance record rather than the Archive personnel. The Archive does not have physical security. The retrieval is clean and fast. Mael stands in the Dust Library and watches them take the gate card with the expression of someone who has been preparing for this possibility for twelve years and hoped, strongly, that it would not occur. The gate card is gone. The synchronisation cannot be initiated without it. The Archive remains.`,
    effectsOnEnter: { setFlags: ['glass_court_raid_complete', 'gate_card_taken'], glassCourt: -30, lastArchive: -20, morale: -15 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch7_glass_court_raid',
    endingType: 'betrayal',
  },

];
