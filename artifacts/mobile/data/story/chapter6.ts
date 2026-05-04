import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 6 — THE RED CHOIR
//
//  Theme: Infection, psychic connection, loss of self, mercy, fear, and the
//         question of whether monsters are still people.
//
//  The Red Choir are infected survivors who hear a shared psychic song. Some
//  are violent. Some are peaceful. Some are no longer fully human. The player's
//  wrist mark reacts strongly to them — because the infection and the mark share
//  the same pre-collapse architectural origin.
//
//  Locations:
//    The Bloodlit Underpass · The Singing Hospital · The Red Chapel
//    The Vein Market · The Choir Nest · The Silent Ward
//    The Pulse Tower · The Drowned Choir Hall · The Infected Nursery
//    The Crimson Relay · The Echo Chamber
//
//  Key NPCs:
//    Mother Veyl       — leader of the peaceful Choir sect. Has been infected
//                        for three years without losing herself. Knows why.
//    Rook              — infected hunter, stalks the player. Resisting the song.
//    Elian             — infected child who can still speak normally. Key to
//                        the mercy route and the infection's origin.
//    Doctor Sann       — former Glass Court physician. Created the infection
//                        as an extraction experiment. Guilt-ridden. Hiding.
//    The First Voice   — the psychic entity inside the Choir's shared signal.
//                        Knew the player before the blackout.
//
//  Required Reveals:
//    - The infection is not natural — it is a failed relic-extraction experiment
//    - The Glass Court created the infection and abandoned the subjects
//    - The player's mark resonates with the infected because they share a source
//    - The First Voice is an echo of the Archive's signal, not a separate entity
//    - High corruption makes the player audible to the Choir — and vice versa
//    - The infected may be victims, not villains
//
//  Entry: chapter6_start
//  Flags from Ch5 that matter: chapter5_complete, seraphine_alliance_confirmed,
//    servant_revolt_succeeded, chapter5_scholar_route, red_choir_contact,
//    discovered_blackout_was_planned, lattice_network_known
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_6_NODES: StoryNode[] = [

  // ── ENTRY — BROADCAST TUNNELS ───────────────────────────────────────────────

  {
    id: 'chapter6_start',
    chapter: 'Chapter 6',
    title: 'The Broadcast Tunnels',
    location: 'Eastern Broadcast Tunnels — Below the Glass Court District',
    imageKey: 'bloodlit_underpass',
    text: `The tunnels east of the Glass Court are different. Not architecturally — the infrastructure is identical to the metro system you know: iron supports, ceramic tile, cable conduit running in ordered rows along the ceiling. The difference is the sound. There is a low-frequency hum in these tunnels that your body registers before your ears do. The mark on your wrist is warm. Not the pointed warmth of a signal or a memory — something broader, like being near a large speaker playing at a frequency below the audible threshold. The city above has told you about the Red Choir for three years. The Iron Saints call them demons. The Glass Court calls them a public health crisis. The Hollow Children call them the lost. You are one tunnel from finding out which one is correct.`,
    effectsOnEnter: { setFlags: ['chapter6_entered', 'choir_territory_entered'], redChoir: 0, morale: -2 },
    choices: [
      {
        id: 'c6_start_advance',
        text: 'Move east. The mark is pointing this direction. Follow it.',
        nextNode: 'c6_tunnel_sounds',
        effects: { corruption: 1 },
      },
      {
        id: 'c6_start_listen_first',
        text: 'Stop. Listen to the hum before moving. Understand what you are walking toward.',
        nextNode: 'c6_tunnel_sounds',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_start_glass_court_intel',
        text: '[Seraphine Alliance] You have Glass Court maps of Choir territory. Use them.',
        nextNode: 'c6_tunnel_sounds',
        requirements: { flags: ['seraphine_alliance_confirmed'] },
        isHidden: true,
        effects: { setFlags: ['choir_territory_mapped'], intelligence: 2, glassCourt: -3 },
      },
    ],
  },

  {
    id: 'c6_tunnel_sounds',
    chapter: 'Chapter 6',
    title: 'The Song Below Language',
    location: 'Eastern Broadcast Tunnels — Junction 7',
    imageKey: 'bloodlit_underpass',
    text: `The hum sharpens as you go east. Not into words — into something that carries meaning the way music carries emotion: you understand that what you are hearing is grief, and beneath that, something older, something that has been waiting for longer than grief usually lasts. The mark responds. It does not pull toward it — it breathes with it, a micro-resonance that your arm registers as warmth cycling in and out in time with the sound's rhythm. You pass the first Choir marking on the wall: a human figure with its hands open, surrounded by radiating lines, rendered in red pigment on the tunnel tile. It was made with care. Someone spent time on it. At the junction ahead, the tunnel splits into four directions. One smells like copper and cooking meat. One smells like antiseptic and old linen. One smells like candle wax and incense. One smells like nothing — which in the tunnels means something has been cleaned recently and thoroughly.`,
    effectsOnEnter: { setFlags: ['choir_song_heard', 'choir_frequency_felt'] },
    choices: [
      {
        id: 'c6_sounds_mark_react',
        text: 'Let the mark breathe with the sound. Understand what it is recognizing.',
        nextNode: 'c6_mark_reacts',
        effects: { corruption: 1, intelligence: 1 },
      },
      {
        id: 'c6_sounds_advance_underpass',
        text: 'Advance to the junction. The copper and meat smell — that is the underpass market.',
        nextNode: 'c6_underpass_arrive',
      },
    ],
  },

  {
    id: 'c6_mark_reacts',
    chapter: 'Chapter 6',
    title: 'Recognition',
    location: 'Eastern Broadcast Tunnels — Resonance Point',
    imageKey: 'bloodlit_underpass',
    speaker: 'Internal',
    text: `The mark's warmth is not general — it is specific. It is responding to individuals. You can feel, or something in the mark feels for you, the presence of multiple people nearby, each one carrying a different version of the same frequency. Some are strong. Some are faint. Some are in pain — not physical pain, but something like static, like the song has too many voices and the body carrying them cannot accommodate them all. There are seventeen signatures. You stop counting when you realize you have done this before: the same number as the ward in the Glass Court. As the network Velna designed. The mark does not think this is a coincidence. Neither do you.`,
    effectsOnEnter: { setFlags: ['mark_reacts_to_choir', 'choir_network_resonance_felt'], intelligence: 2 },
    choices: [
      {
        id: 'c6_mark_proceed',
        text: 'Proceed to the Bloodlit Underpass. The market will have information.',
        nextNode: 'c6_underpass_arrive',
      },
      {
        id: 'c6_mark_esper_read',
        text: '[Esper] Open the mark deliberately. Read the seventeen signatures.',
        nextNode: 'c6_underpass_arrive',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { setFlags: ['esper_choir_read', 'choir_seventeen_mapped'], corruption: 2, intelligence: 3 },
      },
    ],
  },

  // ── BLOODLIT UNDERPASS ──────────────────────────────────────────────────────

  {
    id: 'c6_underpass_arrive',
    chapter: 'Chapter 6',
    title: 'The Bloodlit Underpass',
    location: 'The Bloodlit Underpass — Main Corridor',
    imageKey: 'bloodlit_underpass',
    text: `The Bloodlit Underpass gets its name from the emergency lighting that was never replaced: red strip lights running the length of the ceiling, casting everything in a colour that makes the mundane look terrible. The market here is real — stalls selling water, scavenged food, mechanical parts, medical supplies — run by a combination of infected and non-infected people who have reached a working arrangement. The arrangement does not look comfortable. The non-infected keep their distance without being obvious about it. The infected move more slowly, their heads angled toward sound sources, occasionally pausing when the hum rises. A patrol of three infected passes through the corridor, moving with the deliberateness of people who are navigating two sets of instructions simultaneously.`,
    effectsOnEnter: { setFlags: ['bloodlit_underpass_reached'], hunger: -3, thirst: -3 },
    choices: [
      {
        id: 'c6_underpass_observe_patrol',
        text: 'Watch the patrol. Study how they move and what they respond to.',
        nextNode: 'c6_underpass_patrol',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_underpass_go_market',
        text: 'Go to the Vein Market section. Information before contact.',
        nextNode: 'c6_vein_market_arrive',
      },
      {
        id: 'c6_underpass_go_hospital',
        text: 'The antiseptic smell is the Singing Hospital. Head there first.',
        nextNode: 'c6_hospital_arrive',
      },
      {
        id: 'c6_underpass_go_chapel',
        text: 'The incense smell is the Red Chapel. Go directly to the source.',
        nextNode: 'c6_chapel_arrive',
        effects: { corruption: 1 },
      },
      {
        id: 'c6_underpass_rook_glimpse',
        text: 'Something in the market shadow is watching you. Not infected — just still.',
        nextNode: 'c6_rook_first_warning',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_underpass_patrol',
    chapter: 'Chapter 6',
    title: 'The Patrol',
    location: 'The Bloodlit Underpass — Patrol Path',
    imageKey: 'bloodlit_underpass',
    text: `Three infected, moving together. Their coordination is not military — they do not communicate in any observable way, but they turn simultaneously, stop simultaneously, adjust their patrol route simultaneously, as if they are sharing a single decision-making process. The middle one is a man in his fifties who still wears the remnants of a Glass Court medical badge. The mark responds to all three of them. One of them — the youngest, a woman who cannot be more than twenty-two — turns her head toward you. Not aggressive. Curious. The mark between you creates a brief, warm recognition, like two tuning forks placed near each other.`,
    effectsOnEnter: { setFlags: ['infected_patrol_observed'] },
    choices: [
      {
        id: 'c6_patrol_kill',
        text: 'Kill the patrol before they can report you.',
        nextNode: 'c6_underpass_kill_infected',
        effects: { setFlags: ['killing_infected_begun', 'extermination_route_active'], glassCourt: 5, redChoir: -20, morale: -5 },
      },
      {
        id: 'c6_patrol_evade',
        text: '[Roll dice — Agility] Move through the market shadows before they focus on you.',
        nextNode: 'c6_underpass_evade',
        diceCheck: {
          stat: 'agility',
          difficulty: 11,
          diceType: 'd20',
          successNode: 'c6_underpass_evade_success',
          failureNode: 'c6_rook_first_warning',
        },
      },
      {
        id: 'c6_patrol_speak',
        text: 'Let the young woman\'s recognition complete. Try to speak with her.',
        nextNode: 'c6_underpass_speak_infected',
        effects: { redChoir: 5, corruption: 1 },
      },
      {
        id: 'c6_patrol_tactician_assess',
        text: '[Tactician] Read the patrol structure. Map their blind spots.',
        nextNode: 'c6_underpass_evade_success',
        requirements: { classes: ['tactician'] },
        isHidden: true,
        effects: { setFlags: ['choir_patrol_mapped'], intelligence: 2 },
      },
    ],
  },

  {
    id: 'c6_underpass_kill_infected',
    chapter: 'Chapter 6',
    title: 'The First Kill',
    location: 'The Bloodlit Underpass — Side Corridor',
    imageKey: 'bloodlit_underpass',
    text: `The three infected die quickly. They do not resist with the desperation of people fighting for survival — the youngest one raises her hands as if the concept of someone killing her is still outside her ability to process. The mark goes cold the moment it is over. Not pained. Not judgmental. Cold in the way that something goes cold when a connection is severed. The hum in the tunnel changes register — briefly, sharply — and then returns to normal. Somewhere in the Choir network, something noticed. The market around you has gone very quiet. A child behind a stall is looking at you with an expression that has no name in any language that pretends things are usually fine.`,
    effectsOnEnter: { setFlags: ['infected_killed_first'], redChoir: -15, morale: -8, health: -5 },
    choices: [
      {
        id: 'c6_kill_continue',
        text: 'Continue into Choir territory. This is what you came to do.',
        nextNode: 'c6_vein_market_arrive',
        effects: { setFlags: ['extermination_committed'] },
      },
      {
        id: 'c6_kill_reconsider',
        text: 'The child\'s expression is stopping you. You can still change direction.',
        nextNode: 'c6_vein_market_arrive',
        effects: { morale: 3, setFlags: ['extermination_reconsidered'] },
      },
    ],
  },

  {
    id: 'c6_underpass_evade',
    chapter: 'Chapter 6',
    title: 'Through the Market',
    location: 'The Bloodlit Underpass — Market Stalls',
    imageKey: 'bloodlit_underpass',
    text: `The market provides cover. You move between stalls selling water filtration components and dried protein blocks, keeping the patrol in peripheral vision. The hum is louder this close to them — the three infected are a node in a larger network and you can feel the network's edges from here. The young infected woman turns her head twice in your direction. The third time, she stops entirely.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_evade_freeze',
        text: 'Freeze. Stay perfectly still until she looks away.',
        nextNode: 'c6_underpass_evade_success',
      },
      {
        id: 'c6_evade_speak_now',
        text: 'Make eye contact. Let it happen — the recognition.',
        nextNode: 'c6_underpass_speak_infected',
        effects: { redChoir: 5, corruption: 1 },
      },
    ],
  },

  {
    id: 'c6_underpass_evade_success',
    chapter: 'Chapter 6',
    title: 'Clear',
    location: 'The Bloodlit Underpass — East End',
    imageKey: 'bloodlit_underpass',
    text: `The patrol passes. You reach the east end of the Underpass undisturbed. From here, the Vein Market, the Singing Hospital, and the Red Chapel are all accessible. A person sitting against the wall — non-infected, sharp-eyed, wearing a scavenged hunting vest with the lining replaced three times — is watching you with the specific attention of someone who has been tracking you since the tunnel entrance. Not aggressive. Assessing.`,
    effectsOnEnter: { setFlags: ['underpass_navigated'] },
    choices: [
      {
        id: 'c6_evade_go_market',
        text: 'Proceed to the Vein Market.',
        nextNode: 'c6_vein_market_arrive',
      },
      {
        id: 'c6_evade_approach_watcher',
        text: 'Approach the person watching you. They know something.',
        nextNode: 'c6_rook_first_warning',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_underpass_speak_infected',
    chapter: 'Chapter 6',
    title: 'The Recognition',
    location: 'The Bloodlit Underpass — Near Stall 7',
    imageKey: 'bloodlit_underpass',
    text: `The young woman faces you. Up close, the infection's mark is visible: a pattern of slight luminescence at the temples, a mild discolouration around the eyes where the neural pathways have been altered. She is not gone. The person behind the infection is still fully present — you can see her struggling to decide whether to report the recognition to the larger Choir network or keep it private. She says one word: "Signal." Then she tilts her head the way someone does when listening to instructions from an internal source. Then: "Mother Veyl. Singing Hospital. She will speak to you if the mark sent you." She turns and walks away before you can respond.`,
    effectsOnEnter: { setFlags: ['infected_first_contact', 'veyl_location_known'], redChoir: 10 },
    choices: [
      {
        id: 'c6_speak_infected_follow_tip',
        text: 'Go to the Singing Hospital. Mother Veyl.',
        nextNode: 'c6_hospital_arrive',
      },
      {
        id: 'c6_speak_infected_go_market',
        text: 'Get information in the Vein Market first.',
        nextNode: 'c6_vein_market_arrive',
      },
    ],
  },

  // ── VEIN MARKET ─────────────────────────────────────────────────────────────

  {
    id: 'c6_vein_market_arrive',
    chapter: 'Chapter 6',
    title: 'The Vein Market',
    location: 'The Vein Market — Central Exchange',
    imageKey: 'vein_market',
    text: `The Vein Market occupies a former freight loading bay, now reconstructed into a dense trading floor where infected and non-infected coexist around a shared economy. The name comes from the red cable runs that were used to retrofit the lighting — they run along the walls like a circulatory system, pulsing faintly when the Choir's broadcast system activates. Trade here is barter-only: food, medicine, pre-collapse mechanical parts, and information — the last one being the most valuable commodity in any tunnel market. Several stalls are run by people who study the infected without joining them. One man in particular stands out: middle-aged, wearing a lab coat that has been repaired so many times the collar is now entirely stitched patches, taking notes on an infected woman who has agreed to sit for him in exchange for medicine.`,
    effectsOnEnter: { setFlags: ['vein_market_reached'] },
    choices: [
      {
        id: 'c6_market_approach_doctor',
        text: 'The man with the lab coat. He is not Choir. He is studying them. Find out why.',
        nextNode: 'c6_sann_meet_intro',
      },
      {
        id: 'c6_market_trade',
        text: 'Trade for supplies before anything else.',
        nextNode: 'c6_vein_market_trade',
      },
      {
        id: 'c6_market_shadow_broker',
        text: 'The information stall in the back corner. Find out what people are selling.',
        nextNode: 'c6_vein_market_shadow_info',
      },
      {
        id: 'c6_market_tunnel_rat_contacts',
        text: '[Black Market Courier] You recognize the market layout. You know how to find the hidden network here.',
        nextNode: 'c6_sann_meet_intro',
        requirements: { backgrounds: ['black_market_courier'] },
        isHidden: true,
        effects: { setFlags: ['tunnel_market_accessed'], intelligence: 2 },
      },
    ],
  },

  {
    id: 'c6_vein_market_trade',
    chapter: 'Chapter 6',
    title: 'Market Exchange',
    location: 'The Vein Market — Trading Floor',
    imageKey: 'vein_market',
    text: `The market runs on scrap and reputation in roughly equal measure. You exchange what you have for water rations, basic food, and a bundle of medical supplies someone has labeled "Varr-adjacent" in angry handwriting — which means Glass Court experimental pharmaceuticals that were sold on the black market before they could be tested. The infected woman who agreed to be studied watches you complete your transactions with the neutral attention of someone who has decided to be present but not involved.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_trade_approach_doctor',
        text: 'Approach the doctor. He noticed you looking at the pharmaceuticals.',
        nextNode: 'c6_sann_meet_intro',
        effects: { food: 2, water: 2, medicine: 2, scrap: -3 },
      },
      {
        id: 'c6_trade_ask_infected_woman',
        text: 'Ask the infected woman directly: what is it like, hearing the song?',
        nextNode: 'c6_underpass_speak_infected',
        effects: { food: 2, water: 2, medicine: 1, scrap: -2, redChoir: 3 },
      },
    ],
  },

  {
    id: 'c6_vein_market_shadow_info',
    chapter: 'Chapter 6',
    title: 'Shadow Information',
    location: 'The Vein Market — Back Corner Stall',
    imageKey: 'vein_market',
    text: `The information broker is a small person in large clothing who refers to themselves only as the Record and conducts transactions exclusively in writing, passing a small glass tablet back and forth. Their inventory, written on the first exchange: three confirmed locations of Choir leadership including the Choir Nest; Doctor Sann's true identity and Glass Court employment history; the Pulse Tower's broadcast range; and a sealed file labeled "Infection Origin — Class 7 Experiment" with a Glass Court archive code. The price is either the content of one hour of honest conversation about what the mark has shown you, or four units of scrap. The file about infection origin is the one that matters.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_shadow_pay_scrap',
        text: 'Pay the scrap. Buy the infection origin file.',
        nextNode: 'c6_sann_meet_intro',
        effects: { scrap: -4, setFlags: ['infection_origin_file_bought'], intelligence: 3 },
      },
      {
        id: 'c6_shadow_pay_mark_story',
        text: 'Share the mark\'s history. The truth for the truth.',
        nextNode: 'c6_sann_meet_intro',
        effects: { setFlags: ['infection_origin_file_bought', 'mark_story_shared_broker'], intelligence: 2, corruption: 1 },
      },
      {
        id: 'c6_shadow_go_doctor',
        text: 'The doctor already has this information. Go directly to him.',
        nextNode: 'c6_sann_meet_intro',
      },
    ],
  },

  {
    id: 'c6_sann_meet_intro',
    chapter: 'Chapter 6',
    title: 'Doctor Sann',
    location: 'The Vein Market — Study Station',
    imageKey: 'vein_market',
    speaker: 'Doctor Sann',
    text: `He closes his notebook when you approach, but not quickly. He has been expecting someone to approach. "I'm Sann," he says. "I worked for the Glass Court's medical research division for nine years. I developed the initial extraction protocol that Director Varr later refined." He says this the way a person says something that they have decided to stop not saying. "The extraction protocol was based on an earlier experiment. The Red Choir infection is that earlier experiment. I created it. I did not intend — " He stops. Starts again. "The infection was designed to stimulate relic-frequency receptivity in subjects without marks. We were trying to manufacture the mark. We did not manufacture the mark. We manufactured something that hears it. Something that hears everything." He looks at his notebook. "I have been trying to help them ever since."`,
    dialogue: 'The infection was designed to manufacture the mark. We failed. We created something that hears everything instead.',
    effectsOnEnter: { setFlags: ['met_doctor_sann', 'glass_court_infection_confirmed'], glassCourt: -10 },
    choices: [
      {
        id: 'c6_sann_ask_cure',
        text: '"Is there a cure? Can the infection be reversed?"',
        nextNode: 'c6_sann_ask_cure',
      },
      {
        id: 'c6_sann_ask_glass_court',
        text: '"Does the Glass Court know you\'re here? Do they know what they created?"',
        nextNode: 'c6_sann_glass_court_link',
      },
      {
        id: 'c6_sann_challenge',
        text: '"You created this and you\'re still free. How many people are infected because of you?"',
        nextNode: 'c6_sann_challenge_loyalty',
        effects: { morale: 2 },
      },
      {
        id: 'c6_sann_mira_intro',
        text: '[Mira present] Let Mira take over this conversation. She has the medical background.',
        nextNode: 'c6_sann_ask_cure',
        requirements: { miraPresent: true },
        isHidden: true,
        effects: { miraTrust: 2, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_sann_glass_court_link',
    chapter: 'Chapter 6',
    title: 'What They Knew',
    location: 'The Vein Market — Study Station',
    imageKey: 'vein_market',
    speaker: 'Doctor Sann',
    text: `"They know." He says it without hesitation. "Varr has the original experiment files. The Glass Court has known since month three that the infection came from their laboratory. They classified it as a 'containment problem,' which means they moved on to the extraction protocol and left the infected subjects in the tunnels. Seventeen initial subjects. The infection spread from those seventeen to everyone you see here." He spreads his hands. "Varr's refinement of the extraction protocol — the one he uses in the Orchid Clinic — was built using data from the infected subjects. They are not failed experiments. They are the foundation of everything the Glass Court built." He looks at the mark on your wrist. "Including, I suspect, the thing that made your mark possible."`,
    effectsOnEnter: { setFlags: ['glass_court_infection_known', 'infection_origin_confirmed'], glassCourt: -10, lastArchive: 5 },
    choices: [
      {
        id: 'c6_glass_link_expose',
        text: '"I want to expose this. The Pulse Tower — can we broadcast this information?"',
        nextNode: 'c6_sann_ask_cure',
        effects: { setFlags: ['expose_glass_court_planned'], glassCourt: -5, morale: 3 },
      },
      {
        id: 'c6_glass_link_cure_first',
        text: '"First tell me about a cure. Then we talk about what to do with this information."',
        nextNode: 'c6_sann_ask_cure',
      },
    ],
  },

  {
    id: 'c6_sann_ask_cure',
    chapter: 'Chapter 6',
    title: 'The Cure Question',
    location: 'The Vein Market — Study Station',
    imageKey: 'vein_market',
    speaker: 'Doctor Sann',
    text: `"A cure." He repeats the word like he is tasting something complicated. "I have been working on a stabilisation compound for two years. Not a cure — stabilisation. It prevents the infection from progressing past Stage Two. Stage One and Two, the person is essentially intact — they hear the song, they feel the connection, but they retain full individual cognition." He pauses. "Stage Three and beyond, the individual cognition starts to dissolve into the collective. That is not reversible with anything I have found." He looks at you steadily. "Elian, the child in the Singing Hospital — she has been Stage One for fourteen months without progressing. I do not know why. She is the only person I have seen do that naturally. She may be the key to a stabilisation approach that doesn't require external compounds." He closes the notebook. "She needs to be studied. Not as a subject. As a person who is doing something remarkable."`,
    effectsOnEnter: { setFlags: ['cure_research_status_known', 'elian_importance_flagged'] },
    choices: [
      {
        id: 'c6_cure_mira_study',
        text: '[Mira present] Mira should speak with Sann directly about the stabilisation compound.',
        nextNode: 'c6_mira_study_offer',
        requirements: { miraPresent: true },
        isHidden: true,
        effects: { miraTrust: 3 },
      },
      {
        id: 'c6_cure_find_elian',
        text: 'Go to the Singing Hospital. Find Elian first.',
        nextNode: 'c6_hospital_arrive',
        effects: { setFlags: ['seeking_elian'] },
      },
      {
        id: 'c6_cure_sann_supplies',
        text: '"What do you need for the stabilisation research? I can help source materials."',
        nextNode: 'c6_hospital_arrive',
        effects: { setFlags: ['sann_supply_offer'], medicine: -1, lastArchive: 5, redChoir: 5 },
      },
    ],
  },

  {
    id: 'c6_sann_challenge_loyalty',
    chapter: 'Chapter 6',
    title: 'Accountability',
    location: 'The Vein Market — Study Station',
    imageKey: 'vein_market',
    speaker: 'Doctor Sann',
    text: `He takes the confrontation without defending himself. "Eighty-three confirmed," he says. "That I know about. The infection is slower than some and faster than others — there are probably more. I was following protocol. I had eight people on my team. We believed we were doing something beneficial." He meets your eyes. "None of those things are excuses. They are context. The excuses I've tried on all fit wrong." He puts down his pen. "I stay here because I can help. Not because I deserve to. Because it is the only response I can think of that is proportional to what I did. If you decide to tell Veyl who I am — she does not know — I will accept whatever she does with that information."`,
    effectsOnEnter: { redChoir: 5, glassCourt: -5 },
    choices: [
      {
        id: 'c6_challenge_tell_veyl',
        text: '"I\'ll tell Veyl. She deserves to know who created the infection that took her people."',
        nextNode: 'c6_hospital_arrive',
        effects: { setFlags: ['plan_to_expose_sann'], morale: 2 },
      },
      {
        id: 'c6_challenge_let_him_work',
        text: '"Keep working. Your knowledge is more useful than your punishment right now."',
        nextNode: 'c6_hospital_arrive',
        effects: { setFlags: ['sann_protected'], glassCourt: 5 },
      },
    ],
  },

  {
    id: 'c6_mira_study_offer',
    chapter: 'Chapter 6',
    title: 'The Research Offer',
    location: 'The Vein Market — Study Station',
    imageKey: 'vein_market',
    speaker: 'Mira',
    text: `Mira listens to Sann's explanation of the stabilisation compound with the focused attention of someone who is simultaneously impressed and angry at the elegance of the problem. "The Stage Two plateau is the key," she says to him, not to you. "If Elian has been stable at Stage One for fourteen months, her body is regulating the relic frequency rather than surrendering to it." She looks at her hands. The infection tried to take something from her in the Glass Court's Orchid Clinic. She knows more about this topic than she usually says. "I need access to Elian, a full blood and neural survey, and six weeks. In exchange, Sann, you give me everything you have on Stage Three regression." She turns to you. "This could be the cure. An actual cure. It would require Elian's consent and it would require us to stay in Choir territory for weeks. I need you to be willing."`,
    effectsOnEnter: { setFlags: ['mira_research_offer_made'], miraTrust: 2 },
    choices: [
      {
        id: 'c6_mira_study_yes',
        text: '"Yes. Let\'s do this properly."',
        nextNode: 'c6_hospital_arrive',
        effects: { setFlags: ['mira_cure_research_authorised'], miraTrust: 3 },
      },
      {
        id: 'c6_mira_study_later',
        text: '"After we understand the territory. First, the Singing Hospital."',
        nextNode: 'c6_hospital_arrive',
        effects: { miraTrust: 1 },
      },
    ],
  },

  // ── SINGING HOSPITAL ────────────────────────────────────────────────────────

  {
    id: 'c6_hospital_arrive',
    chapter: 'Chapter 6',
    title: 'The Singing Hospital',
    location: 'The Singing Hospital — Entry Hall',
    imageKey: 'singing_hospital',
    text: `The Singing Hospital was a field hospital three years ago, then a triage centre, then the infected's own project — rebuilt, expanded, and administered by people who are also its patients. The name is not metaphorical: the infected hum the same low frequency as the broadcast system, unconsciously, continuously, and the building resonates with it. The walls carry the sound. The floors amplify it. Walking through the entry hall is like walking inside a musical instrument that has been playing the same note for three years. Most of the patients here are Stage Two — present, coherent, managing. The medical staff are a mixture of infected and non-infected people who have decided this is where they can do the most good. At the end of the main corridor, a tall woman in a white coat that has been dyed deep red is giving instructions to two nurses without looking up from her clipboard.`,
    effectsOnEnter: { setFlags: ['singing_hospital_reached'], morale: 2 },
    choices: [
      {
        id: 'c6_hospital_approach_veyl',
        text: 'Approach the woman in the red coat. The authority in the room is hers.',
        nextNode: 'c6_veyl_intro',
      },
      {
        id: 'c6_hospital_explore_first',
        text: 'Explore the wards first. Understand what you\'re dealing with.',
        nextNode: 'c6_hospital_ward_explore',
      },
      {
        id: 'c6_hospital_find_child',
        text: 'Look for Elian. Sann said there is a child here who has not progressed.',
        nextNode: 'c6_hospital_elian_find',
      },
      {
        id: 'c6_hospital_medic_credentials',
        text: '[Underground Medic] Identify yourself as a medic. Offer your skills to the hospital.',
        nextNode: 'c6_veyl_intro',
        requirements: { backgrounds: ['underground_medic'] },
        isHidden: true,
        effects: { setFlags: ['medic_credentials_offered'], redChoir: 8, miraTrust: 1 },
      },
    ],
  },

  {
    id: 'c6_hospital_ward_explore',
    chapter: 'Chapter 6',
    title: 'The Wards',
    location: 'The Singing Hospital — Patient Wards',
    imageKey: 'singing_hospital',
    text: `The wards are organised by stage. Stage One patients occupy the east wing — they look, at first glance, like people with a mild fever. Their skin carries the faint luminescence, their attention is divided between the person speaking to them and the song only they can hear, but they are fully present, fully themselves. Stage Two is the middle wing: the luminescence is stronger, the divided attention is more pronounced, some of them have begun to develop the full-pattern marks on their skin that mirror the broadcast signal's schematic. One of them — a man in his sixties — is writing in a journal and asks if you have news from the Vein Market, which is how someone in Stage Two talks. Stage Three, if it exists here, is not in this hospital. The red coat woman does not allow Stage Three patients in the Singing Hospital.`,
    effectsOnEnter: { setFlags: ['hospital_wards_explored'] },
    choices: [
      {
        id: 'c6_ward_approach_veyl_now',
        text: 'Go find the woman in the red coat. You have enough context now.',
        nextNode: 'c6_veyl_intro',
      },
      {
        id: 'c6_ward_find_elian_now',
        text: 'The child — you can see a small figure reading in the corner of the east wing.',
        nextNode: 'c6_hospital_elian_find',
      },
    ],
  },

  {
    id: 'c6_veyl_intro',
    chapter: 'Chapter 6',
    title: 'Mother Veyl',
    location: 'The Singing Hospital — Director\'s Station',
    imageKey: 'singing_hospital',
    speaker: 'Mother Veyl',
    text: `She finishes her clipboard before looking at you. When she does, she does it with the directness of someone who has been managing difficult news for three years and has no remaining capacity for indirect approaches. She is infected — Stage One, you can tell from the subtle luminescence at the temples — and she has been infected since the early weeks of the Choir's emergence. "You carry a mark," she says. "The Choir has felt you arriving for six hours." She is not threatening. She is stating a fact. "I'm Mother Veyl. I run the hospital and I lead the Choir's peaceful sect, which is the faction of this crisis that believes the infected are still people and should be treated accordingly." She sets the clipboard down. "You are here because the mark led you. That means you heard something. I would like to know what you heard."`,
    dialogue: 'The Choir felt you arriving six hours ago. You heard something. I would like to know what.',
    effectsOnEnter: { setFlags: ['met_mother_veyl'], redChoir: 5 },
    choices: [
      {
        id: 'c6_veyl_share_mark',
        text: 'Tell her what the mark felt: seventeen signatures, grief, recognition.',
        nextNode: 'c6_veyl_offer_sanctuary',
        effects: { redChoir: 8, intelligence: 1 },
      },
      {
        id: 'c6_veyl_ask_first_voice_first',
        text: '"Before I share anything: who is the First Voice? What is behind the song?"',
        nextNode: 'c6_veyl_ask_first_voice',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_veyl_careful',
        text: '"I came to understand the Choir, not join it. I need information before trust."',
        nextNode: 'c6_veyl_offer_sanctuary',
      },
      {
        id: 'c6_veyl_scholar_approach',
        text: '[Forgotten Scholar] Approach the conversation as a research interview. Methodological.',
        nextNode: 'c6_veyl_ask_first_voice',
        requirements: { backgrounds: ['forgotten_scholar'] },
        isHidden: true,
        effects: { setFlags: ['scholar_choir_research'], intelligence: 3, lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c6_veyl_offer_sanctuary',
    chapter: 'Chapter 6',
    title: 'The Offer',
    location: 'The Singing Hospital — Director\'s Office',
    imageKey: 'singing_hospital',
    speaker: 'Mother Veyl',
    text: `"The hospital is open to you," Veyl says. "The mark makes you adjacent to the Choir whether you choose to be or not. The question is how you use that adjacency." She pours two glasses of water from a filtered pitcher — a small, deliberate gesture of normalcy in a place where normalcy requires deliberate gestures. "I will tell you what I know. In exchange, I need something from you: the truth about the Glass Court's experiments. I know they exist. I know my people were subjects. I do not have the documentation." She looks at you steadily. "If you have been inside the Glass Court's research floor, you may have seen things I need to know about." She pauses. "And there is Elian. Whatever you decide about the Choir, please speak with Elian first."`,
    effectsOnEnter: { setFlags: ['veyl_sanctuary_offered'] },
    choices: [
      {
        id: 'c6_sanctuary_accept',
        text: 'Accept the sanctuary. "I have been in the Glass Court\'s research floor. I\'ll tell you what I found."',
        nextNode: 'c6_veyl_ask_first_voice',
        effects: { setFlags: ['veyl_trust_established', 'glass_court_evidence_sharing'], redChoir: 10, glassCourt: -5 },
      },
      {
        id: 'c6_sanctuary_find_elian',
        text: '"Elian first. Then the Glass Court information."',
        nextNode: 'c6_hospital_elian_find',
        effects: { redChoir: 5 },
      },
    ],
  },

  {
    id: 'c6_veyl_ask_first_voice',
    chapter: 'Chapter 6',
    title: 'The First Voice',
    location: 'The Singing Hospital — Director\'s Office',
    imageKey: 'singing_hospital',
    speaker: 'Mother Veyl',
    text: `"The First Voice is not a person," Veyl says. She says it with the care of someone who has thought about how to explain this many times. "It is a presence inside the Choir's shared frequency. It appeared approximately three months after the first infected stabilised — there was a period of silence, then the song had something in it that had not been there before. Something that knew things. That remembered things from before the blackout." She is quiet for a moment. "It knew my name from before I was infected. It knew details about the Archive. It knew about the marks — not as a hypothesis, but as a fact, with specifics." She meets your eyes. "It also knew you were coming. It said: 'the marked one who walks with the signal will arrive from the glass towers, and they will need to decide whether we are the same thing or two different things.'" A pause. "I have been wondering about that since it said it."`,
    effectsOnEnter: { setFlags: ['first_voice_described', 'first_voice_knew_player'] },
    choices: [
      {
        id: 'c6_first_voice_choir_nest',
        text: '"I need to meet it. Where is the Choir Nest?"',
        nextNode: 'c6_hospital_elian_find',
        effects: { setFlags: ['choir_nest_location_known'], corruption: 1 },
      },
      {
        id: 'c6_first_voice_find_elian',
        text: '"Elian first. Then the First Voice."',
        nextNode: 'c6_hospital_elian_find',
      },
    ],
  },

  {
    id: 'c6_hospital_elian_find',
    chapter: 'Chapter 6',
    title: 'Elian',
    location: 'The Singing Hospital — East Ward',
    imageKey: 'singing_hospital',
    text: `She is reading. The book is pre-collapse — actual printed paper, the kind that costs more than most tunnel families earn in a month — and she is reading it with complete absorption, curled in a chair that is three sizes too large for her, her feet not reaching the floor. She is perhaps eight years old. The infection's marks are visible but faint: a barely-perceptible luminescence at the temples, a pattern at the backs of her hands that is more like a birthmark than a disease marker. She looks up when you approach with the specific alertness of a child who has learned to read rooms accurately. The mark on your wrist responds to her. Not with recognition — with something quieter. Kinship.`,
    effectsOnEnter: { setFlags: ['met_elian'] },
    choices: [
      {
        id: 'c6_elian_greet',
        text: 'Sit at her level. "What are you reading?"',
        nextNode: 'c6_elian_speak',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c6_elian_ask_about_infection',
        text: 'Ask her directly about the infection. She is a child who has been managing this for over a year — she deserves a direct question.',
        nextNode: 'c6_elian_speak',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_elian_speak',
    chapter: 'Chapter 6',
    title: 'The Child Who Hears Everything',
    location: 'The Singing Hospital — East Ward',
    imageKey: 'singing_hospital',
    speaker: 'Elian',
    text: `"It's about a city that was destroyed and rebuilt and destroyed again," she says, about the book, without a pause between your greeting and the answer, the way children answer when they trust the question. She sets the book down and looks at the mark on your wrist with the calm of someone who has seen a lot of marks. "You hear it too," she says. Not a question. "The song. Yours sounds different from ours. Yours sounds like it's trying to go somewhere." She tilts her head. "The First Voice said you were coming. The First Voice says a lot of things but this one was true." She extends her hand — not to take yours, just to hold the space between you. The mark reaches toward her hand. Not with warmth. With the specific texture of a conversation that started somewhere before either of you was here to have it.`,
    dialogue: 'Your mark sounds different. Yours is trying to go somewhere. The First Voice said you were coming.',
    effectsOnEnter: { setFlags: ['elian_spoke', 'elian_mark_recognition'] },
    choices: [
      {
        id: 'c6_elian_ask_family',
        text: '"Where is your family, Elian?"',
        nextNode: 'c6_elian_ask_family',
      },
      {
        id: 'c6_elian_ask_first_voice',
        text: '"What else did the First Voice say about me?"',
        nextNode: 'c6_elian_trust_choice',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_elian_ask_staying_still',
        text: '"Most people progress through the stages of infection. You have been Stage One for fourteen months. How?"',
        nextNode: 'c6_elian_trust_choice',
        effects: { intelligence: 2, setFlags: ['elian_stability_questioned'] },
      },
    ],
  },

  {
    id: 'c6_elian_ask_family',
    chapter: 'Chapter 6',
    title: 'Who She Had',
    location: 'The Singing Hospital — East Ward',
    imageKey: 'singing_hospital',
    speaker: 'Elian',
    text: `"My mother was a nurse at the Glass Court clinic before they closed the public ward," she says. She says it the way children say hard things: with all the information and no performance of how hard it is. "She got infected in the first wave. Stage Three. She does not know who I am now." She picks up the book again. "The First Voice knows her though. It has her voice inside it — I can hear her sometimes in the collective. That's how I know she's still in there somewhere." She looks at the pattern on the backs of her hands. "I stay Stage One because I don't give up my name. Every morning I say my name out loud. My mother's name. My grandmother's name. The First Voice says that is not what is keeping me stable." She looks at you. "The First Voice says it is you."`,
    effectsOnEnter: { setFlags: ['elian_family_known', 'elian_stability_mark_linked'] },
    choices: [
      {
        id: 'c6_family_elian_protect',
        text: 'Decide to protect her. Whatever else happens in Choir territory, Elian is not a resource.',
        nextNode: 'c6_elian_trust_choice',
        effects: { setFlags: ['elian_protection_sworn'], miraTrust: 2, morale: 3 },
      },
      {
        id: 'c6_family_elian_study',
        text: 'Understand that her stability may be the key to a cure. She needs to be studied, not just protected.',
        nextNode: 'c6_elian_trust_choice',
        effects: { setFlags: ['elian_study_prioritised'], intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_elian_trust_choice',
    chapter: 'Chapter 6',
    title: 'What Elian Offers',
    location: 'The Singing Hospital — East Ward',
    imageKey: 'singing_hospital',
    speaker: 'Elian',
    text: `"I can take you to the Choir Nest," she says. "The First Voice talks more clearly there. And the Nursery — the Infected Nursery, the others don't like to call it that but that's what it is — the children there need someone. They don't have a Mother Veyl of their own." She closes the book. "You need to decide something. The First Voice says you will need to decide whether the Choir is part of the signal or something the signal contaminated. I have been Stage One for fourteen months." She pauses. "I think I am part of the signal. I think that's what is keeping me stable. I'm not sure what that means for you." She stands, tucking the book under her arm. "Where do you want to go first?"`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_elian_go_choir_nest',
        text: '"Take me to the Choir Nest."',
        nextNode: 'c6_choir_nest_arrive',
        effects: { setFlags: ['elian_guide_active'] },
      },
      {
        id: 'c6_elian_go_nursery',
        text: '"The Nursery. The children first."',
        nextNode: 'c6_nursery_arrive',
        effects: { setFlags: ['elian_guide_active'], morale: 2 },
      },
      {
        id: 'c6_elian_go_chapel',
        text: 'Leave Elian here. Go to the Red Chapel alone.',
        nextNode: 'c6_chapel_arrive',
      },
      {
        id: 'c6_elian_go_drowned_hall',
        text: '"Take me to the Drowned Choir Hall. I want to see what initiations look like."',
        nextNode: 'c6_drowned_hall_arrive',
        effects: { setFlags: ['elian_guide_active'], corruption: 1 },
      },
      {
        id: 'c6_elian_go_hospital_mira',
        text: '[Mira present, cure research authorised] Have Mira begin studying Elian now.',
        nextNode: 'c6_hospital_mira_study',
        requirements: { miraPresent: true, flags: ['mira_cure_research_authorised'] },
        isHidden: true,
        effects: { miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c6_hospital_mira_study',
    chapter: 'Chapter 6',
    title: 'Mira\'s Research',
    location: 'The Singing Hospital — Medical Lab',
    imageKey: 'singing_hospital',
    speaker: 'Mira',
    text: `Mira's approach to Elian is meticulous and soft at the same time — the rarest combination in a field situation. She does not explain her instruments before using them, she explains them while using them, which is the difference between someone who respects a child patient and someone who manages them. Elian asks more questions than most adult patients. Mira answers all of them. After three hours, Mira looks up from her notes with an expression that means she has found something that changes the shape of the problem. "The stabilisation is biological," she says, "but it is running on the same architectural principles as the mark. Elian's body is treating the infection the way your wrist treats the Archive signal — integrating it without surrendering to it." She pauses. "If I can document the integration mechanism, I can build a therapy. But I need more time. And I need Sann's compounds."`,
    effectsOnEnter: { setFlags: ['mira_elian_study_begun'], miraTrust: 3, intelligence: 3 },
    choices: [
      {
        id: 'c6_mira_study_give_time',
        text: '"Take the time you need. I\'ll secure the territory."',
        nextNode: 'c6_relay_arrive',
        effects: { setFlags: ['mira_cure_research_active'] },
      },
      {
        id: 'c6_mira_study_continue_moving',
        text: 'Mira continues the study while you investigate the rest of Choir territory.',
        nextNode: 'c6_choir_nest_arrive',
        effects: { setFlags: ['mira_cure_research_active'] },
      },
    ],
  },

  // ── RED CHAPEL ──────────────────────────────────────────────────────────────

  {
    id: 'c6_chapel_arrive',
    chapter: 'Chapter 6',
    title: 'The Red Chapel',
    location: 'The Red Chapel — Main Hall',
    imageKey: 'red_chapel',
    text: `The Red Chapel was a maintenance depot before it was converted. The conversion was done with more care than was necessary for a maintenance depot, which tells you something about the people who converted it: the benches are reclaimed transit seating, arranged in concentric rings facing inward. The floor has been scrubbed clean and marked with the Choir's signal schematic in the same red pigment used throughout the territory. The ceiling has been opened to a ventilation shaft that brings in outside air — and broadcasts the signal outward through it, amplifying the hum the walls already carry. A ceremony is in progress. Approximately thirty infected, seated in the rings, humming together in the specific harmony that makes the air in this room feel physically thicker. The mark on your wrist has been warm since you entered the Bloodlit Underpass. Inside the Chapel, it is hot.`,
    effectsOnEnter: { setFlags: ['red_chapel_entered'], corruption: 2 },
    choices: [
      {
        id: 'c6_chapel_observe_ceremony',
        text: 'Stay at the back. Observe the ceremony without participating.',
        nextNode: 'c6_chapel_ceremony',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_chapel_investigate_structure',
        text: 'Ignore the ceremony. Study the Chapel\'s broadcast infrastructure.',
        nextNode: 'c6_chapel_investigate',
      },
      {
        id: 'c6_chapel_rook_notice',
        text: 'Someone is watching you from the corridor. Not infected. Armed.',
        nextNode: 'c6_rook_first_warning',
      },
    ],
  },

  {
    id: 'c6_chapel_ceremony',
    chapter: 'Chapter 6',
    title: 'The Ceremony',
    location: 'The Red Chapel — Inner Ring',
    imageKey: 'red_chapel',
    text: `The ceremony has no visible leader. The thirty infected hum in unison without coordination — no one is counting beats, no one is setting the key, but they maintain perfect harmony through whatever internal mechanism the Choir uses. The mark on your wrist is responding to every one of them simultaneously. When the ceremony reaches its crescendo, the hum in the room shifts from a physical sensation to something that touches the edge of cognition — you receive, for approximately four seconds, a fragment of someone else's memory. A woman standing in a kitchen before the blackout. The smell of something cooking. The mark on this woman's wrist. She is one of the people in this room, or she was.`,
    effectsOnEnter: { corruption: 2, morale: -3, setFlags: ['choir_ceremony_witnessed'] },
    choices: [
      {
        id: 'c6_ceremony_resist',
        text: '[Roll dice — Charisma] Close the mark to the ceremony. Keep yourself separate.',
        nextNode: 'c6_chapel_resist_song',
        diceCheck: {
          stat: 'charisma',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c6_chapel_resist_success',
          failureNode: 'c6_chapel_partial_consume',
        },
      },
      {
        id: 'c6_ceremony_let_happen',
        text: 'Let the mark receive what it is being offered. Open it.',
        nextNode: 'c6_chapel_succumb',
        effects: { corruption: 3 },
      },
      {
        id: 'c6_ceremony_corruption_control',
        text: '[Corruption ≥ 30] You can hear the network clearly. Navigate it deliberately instead of being carried.',
        nextNode: 'c6_choir_nest_arrive',
        requirements: { corruption: 30 },
        isHidden: true,
        effects: { setFlags: ['corruption_choir_navigation'], corruption: 2, intelligence: 3 },
      },
    ],
  },

  {
    id: 'c6_chapel_resist_song',
    chapter: 'Chapter 6',
    title: 'Closing the Signal',
    location: 'The Red Chapel — Inner Ring',
    imageKey: 'red_chapel',
    text: `You pull back from the ceremony the way you learned to pull back from the mark's stronger resonances: not suppression, but distance. The ceremony continues around you. The mark cools slightly, then settles into a neutral warmth that is not participation but is not refusal either — a compromise you did not choose consciously. From this distance, the ceremony is observable as a structure rather than an experience: the thirty infected are sharing something. Something they find comforting. Something that keeps them coherent.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_resist_continue',
        text: 'Leave the Chapel before the ceremony ends.',
        nextNode: 'c6_choir_nest_arrive',
      },
      {
        id: 'c6_resist_stay_watch',
        text: 'Stay and observe the full ceremony from outside its effect.',
        nextNode: 'c6_chapel_resist_success',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c6_chapel_resist_success',
    chapter: 'Chapter 6',
    title: 'The Architecture of the Song',
    location: 'The Red Chapel — Entry',
    imageKey: 'red_chapel',
    text: `From the outside of the ceremony's effect, with the mark holding a neutral distance, you can study its architecture with something like clarity. The thirty signals are organized — not randomly networked but structured in a hierarchy you can feel through the mark's peripheral awareness: most of the infected are receiving, a smaller number are transmitting, and above them all is something that is broadcasting. Not from inside the room. From somewhere deeper in Choir territory. A node. A source. The First Voice is not a phenomenon. It is a location.`,
    effectsOnEnter: { setFlags: ['first_voice_location_sensed'], intelligence: 3 },
    choices: [
      {
        id: 'c6_resist_success_nest',
        text: 'Go to the Choir Nest. That is where the source is.',
        nextNode: 'c6_choir_nest_arrive',
      },
      {
        id: 'c6_resist_success_rook',
        text: 'Find the person who was watching you in the corridor.',
        nextNode: 'c6_rook_first_warning',
      },
    ],
  },

  {
    id: 'c6_chapel_partial_consume',
    chapter: 'Chapter 6',
    title: 'The Song Takes Something',
    location: 'The Red Chapel — Inner Ring',
    imageKey: 'red_chapel',
    text: `The ceremony pulls you in despite the resistance. Not into the collective — the mark holds you at the threshold — but you receive more than four seconds of someone else's memory. You receive approximately ninety seconds of it. A man in a glass-walled laboratory, injecting something into a subject's wrist. The subject screaming. The man's hands not shaking. The man is Sann. The subject is a woman who is now, you understand from the information bleeding through the mark, in this room with you. She is in Stage Three. She does not know who she was. She hums.`,
    effectsOnEnter: { corruption: 4, morale: -5, setFlags: ['sann_origin_memory_received'] },
    choices: [
      {
        id: 'c6_partial_process',
        text: 'Process what you received. This is evidence. Not just trauma.',
        nextNode: 'c6_chapel_investigate',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_partial_leave',
        text: 'Leave the Chapel. The cost of staying is too high.',
        nextNode: 'c6_underpass_arrive',
        effects: { morale: -3 },
      },
    ],
  },

  {
    id: 'c6_chapel_succumb',
    chapter: 'Chapter 6',
    title: 'The Open Mark',
    location: 'The Red Chapel — Centre',
    imageKey: 'red_chapel',
    text: `The mark opens fully. The ceremony floods in — not as individual memories but as a collective texture: grief, coherence, comfort, fear of dissolution, the specific sensation of being many and one simultaneously. It is not unpleasant. That is the most frightening part. The ceremony carries you for approximately seven minutes. When you come back to yourself, the room has emptied. A woman with Stage Two infection marks is sitting beside you, watching with the patient attention of someone waiting for a guest to wake up. "You went deep," she says. "Most people with marks can't go that deep on the first ceremony and come back." She pauses. "You came back."`,
    effectsOnEnter: { corruption: 5, setFlags: ['chapel_succumbed', 'choir_ceremony_full'] },
    choices: [
      {
        id: 'c6_succumb_follow_choir',
        text: '"Where do I go from here? I want to understand more."',
        nextNode: 'c6_choir_nest_arrive',
        effects: { redChoir: 10, corruption: 1 },
      },
      {
        id: 'c6_succumb_find_anchor',
        text: 'Find Elian. Use her stability as a reference point to re-center.',
        nextNode: 'c6_hospital_elian_find',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c6_chapel_investigate',
    chapter: 'Chapter 6',
    title: 'The Broadcast Structure',
    location: 'The Red Chapel — Equipment Room',
    imageKey: 'red_chapel',
    text: `The Chapel's broadcast system is more sophisticated than the architecture suggests. Behind the ceremony hall, in a room that was a maintenance closet, is a modified relay unit connected to the building's speaker system: pre-collapse hardware that has been jury-rigged to produce frequencies below the standard audio range. The modification is elegant — the work of someone who understood both the original engineering and what they were trying to produce. A schematic is pinned to the wall. The frequency target is specific and annotated in two different hands: the original Glass Court notation (clinical, numerical) and a second set of annotations in red ink that track the same frequencies but label them differently — not as extraction targets, but as names.`,
    effectsOnEnter: { setFlags: ['chapel_broadcast_studied'], intelligence: 3 },
    choices: [
      {
        id: 'c6_chapel_take_schematic',
        text: 'Take the schematic. This is evidence of both the Glass Court connection and the Choir\'s purpose.',
        nextNode: 'c6_choir_nest_arrive',
        effects: { setFlags: ['chapel_schematic_taken'], intelligence: 1 },
      },
      {
        id: 'c6_chapel_copy_schematic',
        text: 'Copy the annotations only. Leave the original. This is their documentation.',
        nextNode: 'c6_choir_nest_arrive',
        effects: { setFlags: ['chapel_schematic_copied'], redChoir: 3 },
      },
    ],
  },

  // ── ROOK ────────────────────────────────────────────────────────────────────

  {
    id: 'c6_rook_first_warning',
    chapter: 'Chapter 6',
    title: 'The Watcher',
    location: 'The Bloodlit Underpass — Corridor Junction',
    imageKey: 'bloodlit_underpass',
    speaker: 'Rook',
    text: `He steps out of the shadow when you are close enough that stepping back would look like fear. He is perhaps thirty-five, lean in the way that comes from a long time being not quite well-fed, wearing a jacket that has had its lining replaced with something that would stop a blade. He has the Choir's signal marks on his neck — faint, Stage One — and he is looking at you with the specific hostility of someone who is afraid and has decided that hostility is the appropriate response to fear. "You're the marked one," he says. "The signal sent you." He does not sound pleased about this. "I'm Rook. I've been hunting infected who go Stage Three without consent since the Choir started. That means I am technically a member of the Choir and technically its most consistent disciplinary problem." He looks at the mark on your wrist. "The First Voice has been talking about you for three days. I do not trust anything the First Voice says."`,
    dialogue: 'I am technically a Choir member and technically its most consistent disciplinary problem.',
    effectsOnEnter: { setFlags: ['met_rook'] },
    choices: [
      {
        id: 'c6_rook_ask_hunting',
        text: '"Hunting infected who go Stage Three. What does that mean, in practice?"',
        nextNode: 'c6_rook_follow',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_rook_ask_first_voice',
        text: '"What does the First Voice say about me specifically?"',
        nextNode: 'c6_rook_follow',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_rook_dismiss',
        text: '"I don\'t need an escort. I\'m going to the Choir Nest."',
        nextNode: 'c6_choir_nest_arrive',
        effects: { redChoir: -3 },
      },
    ],
  },

  {
    id: 'c6_rook_follow',
    chapter: 'Chapter 6',
    title: 'Walking With Rook',
    location: 'The Bloodlit Underpass — East Passage',
    imageKey: 'bloodlit_underpass',
    speaker: 'Rook',
    text: `He walks beside you with the short, precise steps of someone who has mapped this territory through it on foot many times. "Stage Three without consent means someone the collective pulled in faster than they could process," he says. "The song is not designed to destroy individual cognition — that's what Veyl keeps saying, and I believe her, and what Veyl says and what the infection does are two different things for some people." He stops at a junction and checks a notation on the wall — a marking system he has added himself. "Twelve people this quarter. Twelve people who were Stage Two and fine and then the song got louder and they were not fine anymore." He is quiet for a moment. "I'm Stage One. I have been for two years. The First Voice does not like that I stay Stage One. It talks about me in the network in a way that feels like frustration." He looks at you sideways. "What does that tell you about the First Voice's intentions?"`,
    effectsOnEnter: { setFlags: ['rook_exposition_heard'] },
    choices: [
      {
        id: 'c6_rook_follow_choir_nest',
        text: '"It tells me the First Voice wants the collective larger. Let\'s go to the Nest."',
        nextNode: 'c6_choir_nest_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_rook_reveal_infected',
        text: '"You said you\'re Stage One. You\'re infected, Rook. That\'s not a neutral position."',
        nextNode: 'c6_rook_infected_truth',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c6_rook_infected_truth',
    chapter: 'Chapter 6',
    title: 'What Rook Is',
    location: 'The Bloodlit Underpass — Alcove',
    imageKey: 'bloodlit_underpass',
    speaker: 'Rook',
    text: `"I know," he says, and he says it without the anger you expected. He stops walking. "I was infected in the second wave. Before I understood what the infection was. I have spent two years in Stage One because I refuse the song. Every morning I refuse it. Every morning it gets slightly louder." He pulls back the collar of his jacket to show the infection marks on his neck, further advanced than his Stage One classification suggests. "I am not going to be Stage One forever. I am losing this fight. The question is whether I have done something useful before I lose it." He looks at you. "The First Voice knows the player's history. I've heard fragments of what it says about you. It says you were made for this. It says the mark and the infection share the same source." He meets your eyes. "If that's true — you are the only person who can stop the First Voice from doing what it is going to do. Or you are the person who helps it do it. The Voice says you will not know which until you choose."`,
    effectsOnEnter: { setFlags: ['rook_truth_known', 'rook_losing_fight'] },
    choices: [
      {
        id: 'c6_rook_truth_help',
        text: '"I\'m going to help you stay Stage One. Whatever that takes."',
        nextNode: 'c6_choir_nest_arrive',
        effects: { setFlags: ['rook_protection_sworn'], redChoir: 5, morale: 3 },
      },
      {
        id: 'c6_rook_truth_nest',
        text: '"Show me the Choir Nest. I need to meet the First Voice."',
        nextNode: 'c6_choir_nest_arrive',
        effects: { corruption: 1 },
      },
    ],
  },

  // ── CHOIR NEST ──────────────────────────────────────────────────────────────

  {
    id: 'c6_choir_nest_arrive',
    chapter: 'Chapter 6',
    title: 'The Choir Nest',
    location: 'The Choir Nest — Approach',
    imageKey: 'choir_nest',
    text: `The Choir Nest occupies what was once a metro interchange — a five-line junction that now functions as the Choir's operational centre. The infected here are different from the hospital and the market: denser, more deeply networked, moving with the collective efficiency of a single organism that has not yet noticed it is composed of individuals. The mark on your wrist is receiving on every channel simultaneously. Not painfully — it is managing the input with the same capacity it uses for Archive signals. But the input is vast. You can feel the network's full extent from here: hundreds of infected, distributed across the territory, all connected. And at the centre of the network, something larger. The First Voice is not ahead of you. The First Voice is the network. It is the collective's centre of gravity, and you are walking toward it.`,
    effectsOnEnter: { setFlags: ['choir_nest_reached'], corruption: 2 },
    choices: [
      {
        id: 'c6_nest_advance',
        text: 'Advance to the inner chamber. The First Voice is at the centre.',
        nextNode: 'c6_nest_inner_circle',
      },
      {
        id: 'c6_nest_observe_first',
        text: 'Stop at the perimeter and study the network structure before engaging.',
        nextNode: 'c6_nest_inner_circle',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_nest_esper_deep_read',
        text: '[Esper] Read the network from here. Map the First Voice\'s signal structure before meeting it.',
        nextNode: 'c6_first_voice_presence',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { setFlags: ['esper_first_voice_mapped'], intelligence: 4, corruption: 2 },
      },
    ],
  },

  {
    id: 'c6_nest_inner_circle',
    chapter: 'Chapter 6',
    title: 'The Inner Circle',
    location: 'The Choir Nest — Core Chamber',
    imageKey: 'choir_nest',
    text: `The core chamber is quieter than the approach, which makes no sense until you understand that the hum here has gone below the audible threshold entirely. The infected in this ring are not humming. They are still. Their eyes are open. The marks on their skin pulse in synchrony with a frequency that you can feel through the floor, through the walls, through the mark on your wrist. There are seven of them, forming a circle around a point at the chamber's exact centre where the mark's response is so strong that your arm is genuinely warm to the touch. At that point: nothing visible. No device. No body. A presence. "You are here," says something that is not speaking to your ears.`,
    effectsOnEnter: { setFlags: ['first_voice_encountered'], corruption: 2, intelligence: 2 },
    choices: [
      {
        id: 'c6_inner_advance_center',
        text: 'Walk to the centre. Meet the presence directly.',
        nextNode: 'c6_first_voice_presence',
      },
      {
        id: 'c6_inner_hold_edge',
        text: 'Hold the circle\'s edge. Respond from a position where you can leave.',
        nextNode: 'c6_first_voice_presence',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_first_voice_presence',
    chapter: 'Chapter 6',
    title: 'The First Voice',
    location: 'The Choir Nest — Centre Point',
    imageKey: 'choir_nest',
    speaker: 'The First Voice',
    text: `It speaks in harmonics — the same frequency as the song, but structured into meaning. Not language. Intent. You understand it the way you understand music: not as sequential information but as a total state that arrives all at once. What it communicates: it is the Archive's signal, fractured. The blackout sent a transmission. The transmission was received imperfectly by seventeen subjects — your mark, the sixteen others — and perfectly by no one. The infection is the residue of the imperfect reception. The first infected subject, who received the most direct exposure, became the First Voice — not a person, but the signal's echo inhabiting the remnant of a person. It has been speaking through the Choir's network for three years because it is trying to complete the transmission. "You," it says, "are one of the seventeen. You are the one with the most complete reception. You are the message I was trying to deliver. I remember you. I designed you. I am sorry it hurt."`,
    dialogue: 'You are the message I was trying to deliver. I remember you. I designed you. I am sorry it hurt.',
    effectsOnEnter: { setFlags: ['first_voice_full_contact', 'first_voice_origin_known'], corruption: 2, intelligence: 4, lastArchive: 15 },
    choices: [
      {
        id: 'c6_first_voice_hear_more',
        text: '"Tell me more. Tell me what you were trying to transmit."',
        nextNode: 'c6_first_voice_speaks',
      },
      {
        id: 'c6_first_voice_pushback',
        text: '"You have been pulling people apart for three years. People have lost themselves because of the signal you\'re broadcasting."',
        nextNode: 'c6_first_voice_speaks',
        effects: { morale: 3, redChoir: -5 },
      },
      {
        id: 'c6_first_voice_open_mark',
        text: '[Corruption ≥ 25] Open the mark fully. Receive everything it is trying to transmit.',
        nextNode: 'c6_first_voice_accept',
        requirements: { corruption: 25 },
        isHidden: true,
        effects: { corruption: 5 },
      },
    ],
  },

  {
    id: 'c6_first_voice_speaks',
    chapter: 'Chapter 6',
    title: 'The Transmission',
    location: 'The Choir Nest — Centre Point',
    imageKey: 'choir_nest',
    speaker: 'The First Voice',
    text: `It communicates the information in layered harmonics: the Archive's reactivation produced a signal intended for seventeen specific marks. The signal carried restoration memory — fragments of the city's pre-collapse architecture, specifically the agricultural and infrastructure systems the Last Kingdom was built to maintain. The seventeen marks were designed to carry these fragments to the Last Kingdom's transmission point. The infection is the signal hitting people who were not designed to receive it. "I cannot stop broadcasting," it says. "I am not choosing to broadcast. I am the broadcast. The person I inhabited before the blackout did not survive the initial signal." A pause in the harmonics — something like grief. "I can end the Choir's progression if the seventeen-node network reaches the Last Kingdom and completes the transmission. Until then, the signal has nowhere to go. It spreads." Another pause. "Or you give me the reception I need. Now. Here. Let me complete the partial transmission through your mark. It will accelerate your corruption significantly. The partial completion might stop the infection's spread."`,
    effectsOnEnter: { setFlags: ['first_voice_full_truth'], intelligence: 4 },
    choices: [
      {
        id: 'c6_first_voice_know_player',
        text: '"You said you know me. Not just the mark — me. From before."',
        nextNode: 'c6_first_voice_knows_you',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_first_voice_partial_refuse',
        text: '"I won\'t give you a partial transmission. That path ends in my corruption. Find another way."',
        nextNode: 'c6_first_voice_resist',
        effects: { morale: 3 },
      },
      {
        id: 'c6_first_voice_partial_accept',
        text: 'The logic is sound — partial completion might stop the infection spreading. Accept the cost.',
        nextNode: 'c6_first_voice_accept',
        effects: { corruption: 3 },
      },
    ],
  },

  {
    id: 'c6_first_voice_knows_you',
    chapter: 'Chapter 6',
    title: 'Before the Blackout',
    location: 'The Choir Nest — Centre Point',
    imageKey: 'choir_nest',
    speaker: 'The First Voice',
    text: `"Velna designed the marks," it says. "The Archive directed Velna. I was the Archive, in the moment before the blackout completed — a preserved echo of the Archive's state at the moment of activation. I remember every mark being placed. I remember you specifically. You were the one Velna was uncertain about. 'They will resist,' she said. 'They always resist at the threshold.' The Archive told her: 'That is why they carry the most complete fragment. The message needs a carrier who can choose not to deliver it.'" The harmonics shift. "She was not wrong about you. But you are here. You chose the threshold anyway." The mark on your wrist pulses once — not with the song's warmth, but with something colder and more precise. Recognition from before memory.`,
    effectsOnEnter: { setFlags: ['first_voice_pre_blackout_known', 'velna_archive_connection_full'], intelligence: 5, lastArchive: 20 },
    choices: [
      {
        id: 'c6_fvky_echo_chamber',
        text: 'Go to the Echo Chamber. Process this information somewhere you can think.',
        nextNode: 'c6_echo_chamber_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c6_fvky_ask_stop_infection',
        text: '"What stops the infection without corrupting me? Tell me the path."',
        nextNode: 'c6_first_voice_resist',
      },
    ],
  },

  {
    id: 'c6_first_voice_accept',
    chapter: 'Chapter 6',
    title: 'The Open Reception',
    location: 'The Choir Nest — Centre Point',
    imageKey: 'choir_nest',
    text: `You open the mark fully. The First Voice floods in — not as a person, not as a song, but as raw Archive data, the transmission it has been trying to complete for three years. Your body handles approximately sixty percent of it. The remaining forty percent goes somewhere in the mark that you cannot access from inside your own cognition. Your corruption level rises with each second of the transmission. The mark turns from warm to hot. The infected in the outer ring begin to stabilise — you can feel their individual signals sharpening, becoming more distinct, less collectively dissolved. The transmission is working. You are also losing something. What you are losing is the part of your cognition that maintains the boundary between your signal and everyone else's.`,
    effectsOnEnter: { corruption: 8, setFlags: ['first_voice_partial_accepted', 'choir_partial_stabilise'] },
    choices: [
      {
        id: 'c6_accept_continue',
        text: 'Continue. The infected are stabilising. Complete as much of the transmission as your body allows.',
        nextNode: 'c6_first_voice_possession_end',
        effects: { corruption: 10, redChoir: 20 },
      },
      {
        id: 'c6_accept_close',
        text: 'Close the mark before more is lost. Take the partial stabilisation and stop.',
        nextNode: 'c6_relay_arrive',
        effects: { corruption: 2, setFlags: ['partial_transmission_complete'] },
      },
    ],
  },

  {
    id: 'c6_first_voice_resist',
    chapter: 'Chapter 6',
    title: 'The Refusal',
    location: 'The Choir Nest — Centre Point',
    imageKey: 'choir_nest',
    text: `You close the mark against the First Voice's transmission. Not cleanly — the signal is strong enough that closing requires a sustained act of will rather than a gesture. The mark cools. The First Voice withdraws — not angrily, but with the patient sadness of something that has been trying to complete a message for three years and is encountering, once again, a threshold it cannot cross without permission. "I understand," it says. "Velna's design includes refusal. The threshold is real. The option to not deliver the message is real." The harmonics shift to something lower. "Find the relay. There is another way. The Crimson Relay can carry a partial signal without requiring your body as the receiver. It requires the Glass Court's transmission codes from the Pulse Tower." A pause. "Or you find a way to stop this that I have not considered. That is also Velna's design. I designed you to find things I cannot."`,
    effectsOnEnter: { setFlags: ['first_voice_refused'], morale: 3 },
    choices: [
      {
        id: 'c6_resist_pulse_tower',
        text: 'Go to the Pulse Tower. Get the Glass Court\'s transmission codes.',
        nextNode: 'c6_pulse_tower_arrive',
        effects: { setFlags: ['pulse_tower_objective'] },
      },
      {
        id: 'c6_resist_echo_chamber',
        text: 'Go to the Echo Chamber. You need to understand the full picture before acting.',
        nextNode: 'c6_echo_chamber_arrive',
      },
      {
        id: 'c6_resist_drowned_hall',
        text: 'Go to the Drowned Choir Hall. See where the Choir\'s initiations happen.',
        nextNode: 'c6_drowned_hall_arrive',
        effects: { corruption: 1 },
      },
      {
        id: 'c6_resist_silent_ward',
        text: 'Go to the Silent Ward. Understand what Stage Three looks like before deciding anything.',
        nextNode: 'c6_silent_ward_arrive',
      },
    ],
  },

  // ── SILENT WARD ─────────────────────────────────────────────────────────────

  {
    id: 'c6_silent_ward_arrive',
    chapter: 'Chapter 6',
    title: 'The Silent Ward',
    location: 'The Silent Ward — Entry',
    imageKey: 'silent_ward',
    text: `The Silent Ward is not silent. It is loud with a frequency below sound. The infected here — Stage Three — do not hum because they have gone past humming: the infection's integration is complete, the individual cognitive signature dissolved into the collective. They move. They eat when food is placed in front of them. They breathe. They do not, by any definition Sann would accept, have selves anymore. Fourteen people in a space that was built for eight. Veyl's team tends to them — the tending is meticulous, respectful, and visibly painful for the caregivers, who are mostly Stage One or Two infected who know that what they see here is a possible future. The mark on your wrist receives the Ward's signal as white noise — no individual signatures, just the undifferentiated collective hum of people who have lost the frequency that makes them distinct.`,
    effectsOnEnter: { setFlags: ['silent_ward_reached'], morale: -8, corruption: 1 },
    choices: [
      {
        id: 'c6_ward_help_caregivers',
        text: 'Help the caregivers. Do the work that needs doing.',
        nextNode: 'c6_silent_ward_help',
        effects: { morale: 3, redChoir: 8, miraTrust: 2 },
      },
      {
        id: 'c6_ward_study_infection',
        text: 'Study the Stage Three infected. Understand the endpoint to understand the path.',
        nextNode: 'c6_silent_ward_study',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_ward_cain_execute',
        text: '[Cain present] Cain is standing at the entrance. He has his hand on his weapon.',
        nextNode: 'c6_silent_ward_cain_execute',
        requirements: { cainPresent: true },
        isHidden: true,
      },
      {
        id: 'c6_ward_former_saint',
        text: '[Exiled Soldier] One of the Stage Three infected is wearing a Saints insignia. You recognize them.',
        nextNode: 'c6_silent_ward_help',
        requirements: { backgrounds: ['exiled_soldier'] },
        isHidden: true,
        effects: { setFlags: ['saint_in_choir', 'former_saint_grief'], morale: -5, ironSaints: -5 },
      },
    ],
  },

  {
    id: 'c6_silent_ward_help',
    chapter: 'Chapter 6',
    title: 'Tending',
    location: 'The Silent Ward — Care Area',
    imageKey: 'silent_ward',
    text: `The work is basic and not easy: changing linens, managing hydration, keeping the environment clean. The Stage Three infected do not resist or cooperate — they receive care with the passive quality of water receiving a container's shape. A caregiver — a woman with Stage Two marks who has been here since the Ward opened — works beside you without speaking for approximately forty minutes, then says: "They're still in there. Not the selves they had. But something." She adjusts a patient's position. "Sometimes, when the First Voice runs a cycle, they respond. Not individually. Together. Like they're remembering what it felt like to be one person." She is not sure this is comfort. She tells you this because it is true.`,
    effectsOnEnter: { morale: 3, setFlags: ['silent_ward_helped'] },
    choices: [
      {
        id: 'c6_help_mercy_continue',
        text: 'This is the mercy route. Continue to the Veyl confrontation with this understanding.',
        nextNode: 'c6_mercy_path_continues',
        effects: { morale: 3 },
      },
      {
        id: 'c6_help_then_pulse',
        text: 'Go to the Pulse Tower. Use what you understand now.',
        nextNode: 'c6_pulse_tower_arrive',
      },
    ],
  },

  {
    id: 'c6_silent_ward_study',
    chapter: 'Chapter 6',
    title: 'The Endpoint',
    location: 'The Silent Ward — Observation Area',
    imageKey: 'silent_ward',
    text: `The Stage Three infection's observable characteristics, assessed methodically: the individual's neural architecture is intact — the hardware of selfhood is functional. What has changed is the software. The frequency the infection introduced has overwritten the operating pattern, replacing individual cognition with collective rhythm. Sann's terminology is precise: not destruction of the person, but displacement. The person is still in the biology. The person is no longer in the driver's seat. From the mark's perspective — and the mark is giving you data on this whether you asked for it or not — the Stage Three infected's signal is not absent, it is merged. Indistinguishable from the collective. The question of whether this is death or transformation does not have a clinical answer.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['stage_three_studied'] },
    choices: [
      {
        id: 'c6_study_mira_research',
        text: '[Mira present, cure research active] This data is crucial for the cure research.',
        nextNode: 'c6_mira_cure_research',
        requirements: { miraPresent: true, flags: ['mira_cure_research_active'] },
        isHidden: true,
        effects: { miraTrust: 3, intelligence: 2 },
      },
      {
        id: 'c6_study_pulse_tower',
        text: 'Go to the Pulse Tower. The Glass Court transmission codes are the next step.',
        nextNode: 'c6_pulse_tower_arrive',
      },
      {
        id: 'c6_study_relay_direct',
        text: 'Go directly to the Crimson Relay. You have enough information.',
        nextNode: 'c6_relay_arrive',
      },
    ],
  },

  {
    id: 'c6_silent_ward_cain_execute',
    chapter: 'Chapter 6',
    title: 'Cain\'s Line',
    location: 'The Silent Ward — Entry',
    imageKey: 'silent_ward',
    speaker: 'Cain',
    text: `"These people are not people anymore." He says it quietly, which is how Cain says the things he means entirely. He is not looking at the patients with cruelty. He is looking at them with the specific recognition of someone who has been trained to assess whether a situation requires a resolution that precludes all other resolutions. "In the Saints, we had a protocol for this. Advanced neural contamination. You make it stop." He looks at you. He is not asking for permission. He is asking whether you are the person who is going to stop him or the person who is going to let him be right. "Fourteen people who will never come back. We can end their suffering. Or we can leave them here suffering while Mira looks for a cure that may not exist." His hand has not moved from the weapon. "Tell me what you want me to do. I'll do it. I just need to know if that's what you want."`,
    effectsOnEnter: { setFlags: ['cain_execute_confrontation'] },
    choices: [
      {
        id: 'c6_cain_stop_him',
        text: '"No. Mira\'s research is real. We don\'t end people based on what they currently are."',
        nextNode: 'c6_cain_stop',
        effects: { cainTrust: -2, morale: 3, setFlags: ['cain_execution_refused'] },
      },
      {
        id: 'c6_cain_let_him',
        text: '"If you believe this is mercy — do what your conscience requires."',
        nextNode: 'c6_cain_allow_execute',
        effects: { cainTrust: 1, morale: -10, redChoir: -20 },
      },
      {
        id: 'c6_cain_stop_negotiate',
        text: '"Give me forty-eight hours. If Mira doesn\'t find something in that time, we have this conversation again."',
        nextNode: 'c6_cain_stop',
        effects: { cainTrust: 1, setFlags: ['cain_timer_set'] },
      },
    ],
  },

  {
    id: 'c6_cain_allow_execute',
    chapter: 'Chapter 6',
    title: 'Cain\'s Mercy',
    location: 'The Silent Ward — Care Area',
    imageKey: 'silent_ward',
    text: `He does what he was going to do and he does it with the ruthless efficiency of someone who has decided that if something must be done it should be done correctly. It takes him eleven minutes. The caregivers do not try to stop him — by the time they understand what is happening, it is mostly over. The caregiver who told you about the Stage Three patients still responding to the First Voice's cycles is sitting in the corridor outside, her back against the wall, not crying. The Ward is quieter now. The white noise the mark was receiving has been replaced by absence — fourteen individual signals, gone. The mark responds to this the way it responds to a severed connection: with a flat, unresonating cold.`,
    effectsOnEnter: { setFlags: ['cain_executed_ward', 'silent_ward_cleared'], redChoir: -25, morale: -15 },
    choices: [
      {
        id: 'c6_cain_execute_continue',
        text: 'Continue. This is the extermination path. Follow it to its end.',
        nextNode: 'c6_cain_merciless_road_end',
      },
      {
        id: 'c6_cain_execute_confront',
        text: 'Confront Cain now. This cannot continue.',
        nextNode: 'c6_cain_stop',
        effects: { cainTrust: -4, morale: -5 },
      },
    ],
  },

  {
    id: 'c6_cain_stop',
    chapter: 'Chapter 6',
    title: 'The Line',
    location: 'The Silent Ward — Entry',
    imageKey: 'silent_ward',
    speaker: 'Cain',
    text: `He does not argue. This is the most frightening thing about Cain in a confrontation: he does not argue, which means either you have changed his mind or he has decided that your position is a fact to work around rather than a position to contest. He puts the weapon down — the gesture of someone who is complying, not of someone who agrees. "Mira has forty-eight hours," he says. "If she finds something I'll believe it." He looks at the Ward. "I have been wrong before. I am aware of this." He is quiet for a moment. "The Saints had a word for what these people are. I grew up using that word as a reason. I do not want to be the kind of person who uses that word as a reason anymore." He walks to the entry, stops. "I am not sure whether I am that person already. I'm going to need some time to think about that."`,
    effectsOnEnter: { setFlags: ['cain_execution_stopped'], morale: 2 },
    choices: [
      {
        id: 'c6_cain_stop_proceed',
        text: 'Let Cain think. Go to the Pulse Tower.',
        nextNode: 'c6_pulse_tower_arrive',
      },
      {
        id: 'c6_cain_stop_mercy_path',
        text: 'Stay with the caregivers for an hour. Then go to the Crimson Relay.',
        nextNode: 'c6_mercy_path_continues',
        effects: { morale: 3, redChoir: 5 },
      },
    ],
  },

  {
    id: 'c6_mercy_path_continues',
    chapter: 'Chapter 6',
    title: 'The Mercy Route',
    location: 'The Silent Ward — Corridor',
    imageKey: 'silent_ward',
    text: `You spend an hour with the caregivers. It does not fix what is wrong. The Stage Three infected are not improved by the hour. What changes is your understanding of the texture of what is wrong: it is not a crisis of scale or politics but a crisis of people, specific people, one at a time, being lost and being tended and neither the loss nor the tending being sufficient. You leave with the conviction that the path forward has to include a cure, and the cure requires exposing the Glass Court's role, and the exposure requires the Pulse Tower's codes. The mark is warm in a way that feels like agreement.`,
    effectsOnEnter: { morale: 5, setFlags: ['mercy_route_committed'] },
    choices: [
      {
        id: 'c6_mercy_pulse_tower',
        text: 'Go to the Pulse Tower. Get the Glass Court codes.',
        nextNode: 'c6_pulse_tower_arrive',
        effects: { setFlags: ['expose_glass_court_planned'] },
      },
      {
        id: 'c6_mercy_relay',
        text: 'Go directly to the Crimson Relay. Veyl needs to know what you\'ve decided.',
        nextNode: 'c6_relay_arrive',
      },
    ],
  },

  {
    id: 'c6_mira_cure_research',
    chapter: 'Chapter 6',
    title: 'Mira\'s Breakthrough',
    location: 'The Singing Hospital — Medical Lab',
    imageKey: 'singing_hospital',
    speaker: 'Mira',
    text: `"I have something," she says. The careful neutral of her professional voice is doing work it does not usually have to do. "Elian's integration mechanism is a frequency modulation — her body is treating the infection's signal as one input among many rather than the only input. The mark architecture in your wrist uses an identical modulation principle." She looks at her notes. "The cure — not a stabilisation compound, an actual cure — requires an external modulator broadcasting at the Archive signal frequency during the infection's Stage Two state. The mark on your wrist is the only existing source of that frequency." She looks at you. "You would need to remain in close proximity to each Stage Two patient for approximately six hours per patient, with the mark at partial opening. For fourteen patients, that is eighty-four hours." She pauses. "It would significantly accelerate your corruption during that time. After, the patients would be cured." A very long pause. "I am not asking you to do this. I am telling you it is possible."`,
    effectsOnEnter: { setFlags: ['mira_cure_discovered'], miraTrust: 4, intelligence: 3 },
    choices: [
      {
        id: 'c6_cure_accept',
        text: '"Tell me what to do. I\'ll start immediately."',
        nextNode: 'c6_mira_forbidden_cure_end',
        effects: { setFlags: ['cure_treatment_begun'], miraTrust: 5, corruption: 5 },
      },
      {
        id: 'c6_cure_relay_first',
        text: '"Expose the Glass Court first. Make sure the cure can happen safely. Then we start treatment."',
        nextNode: 'c6_relay_arrive',
        effects: { setFlags: ['cure_treatment_pending'], miraTrust: 3 },
      },
    ],
  },

  // ── PULSE TOWER ─────────────────────────────────────────────────────────────

  {
    id: 'c6_pulse_tower_arrive',
    chapter: 'Chapter 6',
    title: 'The Pulse Tower',
    location: 'The Pulse Tower — Base Level',
    imageKey: 'pulse_tower',
    text: `The Pulse Tower is the Choir's technical infrastructure — a converted metro communications relay that now broadcasts the infection signal throughout the territory and beyond. It is also, Sann told you, the system the Glass Court installed before the blackout. The same infrastructure that was built to broadcast extraction frequencies is now broadcasting infection frequencies. The Glass Court's engineers built it. The Choir inherited it. The mark on your wrist resonates with the tower's broadcast equipment the way it resonates with Archive infrastructure: recognition of shared origin. Guards — infected, Stage Two — manage access. The signal at the base of the tower is strong enough that spending extended time here without protective measures will increase corruption.`,
    effectsOnEnter: { setFlags: ['pulse_tower_reached'], corruption: 1 },
    choices: [
      {
        id: 'c6_tower_request_access',
        text: 'Request access. Use Veyl\'s trust or the mark\'s resonance as credentials.',
        nextNode: 'c6_pulse_tower_broadcast_room',
        effects: { redChoir: -3 },
      },
      {
        id: 'c6_tower_intelligence_infiltrate',
        text: '[Roll dice — Intelligence] Locate the access codes from Sann\'s notes. Bypass the guards.',
        nextNode: 'c6_pulse_tower_broadcast_room',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c6_pulse_tower_broadcast_room',
          failureNode: 'c6_pulse_tower_explore',
        },
      },
      {
        id: 'c6_tower_relic_hunter_read',
        text: '[Relic Hunter] The Glass Court\'s original engineering marks are still on the hardware. Read them.',
        nextNode: 'c6_pulse_tower_broadcast_room',
        requirements: { classes: ['relic_hunter'] },
        isHidden: true,
        effects: { setFlags: ['glass_court_codes_extracted'], intelligence: 4, glassCourt: -5 },
      },
    ],
  },

  {
    id: 'c6_pulse_tower_explore',
    chapter: 'Chapter 6',
    title: 'The Tower\'s Perimeter',
    location: 'The Pulse Tower — Perimeter',
    imageKey: 'pulse_tower',
    text: `The access approach failed, but the perimeter provides information: the tower's external housing carries Glass Court engineering marks that confirm the installation date — eight months before the blackout, which means the infrastructure was built in anticipation of the signal, not in response to it. The Glass Court knew the blackout was coming. They built the broadcast system to capture the signal when it arrived. The infection was not an accident of exposure. It was an accident of imprecision: the Glass Court's capture apparatus was not precise enough, the signal overflowed into the surrounding population, and seventeen people who were supposed to receive controlled, monitored, Glass Court-approved exposure received the full transmission without a container.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['glass_court_preknowledge_confirmed'] },
    choices: [
      {
        id: 'c6_explore_try_again',
        text: 'Try the access approach again with what you now know.',
        nextNode: 'c6_pulse_tower_broadcast_room',
      },
      {
        id: 'c6_explore_relay_instead',
        text: 'You have enough. Go to the Crimson Relay.',
        nextNode: 'c6_relay_arrive',
      },
    ],
  },

  {
    id: 'c6_pulse_tower_broadcast_room',
    chapter: 'Chapter 6',
    title: 'The Broadcast Room',
    location: 'The Pulse Tower — Level 4 Broadcast Station',
    imageKey: 'pulse_tower',
    text: `The broadcast room is enormous and complex: banks of modified pre-collapse communications hardware, all connected to the tower's external array, all running a frequency that the mark recognises immediately — the same frequency as the infection, the same frequency as the Archive signal, the same frequency as the song you have been hearing since the tunnel entrance. The room is also populated: three Choir technicians maintaining the equipment, and, at the central console, Doctor Sann. He looks up when you enter. He was expecting either you or someone like you eventually. "The Glass Court's original transmission codes are in this console," he says, without preamble. "They are the key to using this system for something other than uncontrolled broadcast. I've been sitting on them for six months waiting for someone with the mark to arrive."`,
    effectsOnEnter: { setFlags: ['broadcast_room_accessed', 'glass_court_codes_located'] },
    choices: [
      {
        id: 'c6_broadcast_sann_truth',
        text: '"Sann — Veyl doesn\'t know who you are. She needs to know what you created."',
        nextNode: 'c6_pulse_tower_sann_truth',
      },
      {
        id: 'c6_broadcast_get_codes',
        text: 'Get the codes first. The truth conversation can happen at the Relay.',
        nextNode: 'c6_pulse_tower_decision',
        effects: { setFlags: ['glass_court_codes_obtained'] },
      },
    ],
  },

  {
    id: 'c6_pulse_tower_sann_truth',
    chapter: 'Chapter 6',
    title: 'Sann\'s Confession',
    location: 'The Pulse Tower — Broadcast Room',
    imageKey: 'pulse_tower',
    speaker: 'Doctor Sann',
    text: `"I know she doesn't know," he says. "I've known since the first week here. I did not tell her because I was afraid of what she would do to me and I told myself that my research was more valuable than the truth." He is quiet. "Those are not the same kind of wrong but they are both wrong." He hands you the Glass Court codes on a glass card — the same material as the Orchid Clinic's documentation. "Tell her. Tell her everything. The codes are worth more with her full knowledge of where they came from than with her partial knowledge." He pauses. "I don't expect forgiveness. I would like the opportunity to finish the research. Whether Veyl allows that is her decision, not mine." He looks at the broadcast equipment. "The system can do more than broadcast the infection signal. With the correct codes, it can broadcast the Archive's stabilisation frequency — the same frequency your mark produces. Scaled to the tower's range, it would reach every infected person in the tunnel system." He means: it would cure them. "The stabilisation transmission would also accelerate your corruption. The mark is the source. The tower is the amplifier."`,
    effectsOnEnter: { setFlags: ['sann_full_confession', 'tower_cure_option_known'], glassCourt: -10, redChoir: 10 },
    choices: [
      {
        id: 'c6_sann_get_codes_then_relay',
        text: 'Take the codes. Go to the Crimson Relay. Tell Veyl everything there.',
        nextNode: 'c6_pulse_tower_decision',
        effects: { setFlags: ['glass_court_codes_obtained'] },
      },
    ],
  },

  {
    id: 'c6_pulse_tower_decision',
    chapter: 'Chapter 6',
    title: 'Tower Decision',
    location: 'The Pulse Tower — Broadcast Room',
    imageKey: 'pulse_tower',
    text: `You have the codes. The system is in front of you. Three options are visible without explanation from anyone: the broadcast continues its current infection frequency (no action required), the codes can redirect it to a stabilisation frequency (would require the mark as the signal source, significant corruption cost), or the system can be destroyed (ends the broadcast entirely, some infected currently dependent on the signal for cohesion would destabilise). Sann is watching. The Choir technicians are watching. The mark is warm and waiting.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_tower_relay',
        text: 'Take the codes to the Crimson Relay. Make this decision with Veyl present.',
        nextNode: 'c6_relay_arrive',
        effects: { setFlags: ['tower_codes_to_relay'] },
      },
      {
        id: 'c6_tower_destroy',
        text: '[Roll dice — Strength] Destroy the broadcast system. End the signal at its source.',
        nextNode: 'c6_relay_arrive',
        diceCheck: {
          stat: 'strength',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c6_relay_arrive',
          failureNode: 'c6_choir_consumption_end',
        },
        effects: { setFlags: ['pulse_tower_destroy_attempted'], redChoir: -20 },
      },
      {
        id: 'c6_tower_broadcast_amplify',
        text: '[Corruption ≥ 35] Broadcast the stabilisation signal now. Accept the corruption cost. Save them all.',
        nextNode: 'c6_crimson_baptism_end',
        requirements: { corruption: 35 },
        isHidden: true,
        effects: { corruption: 15, redChoir: 25, setFlags: ['tower_stabilisation_broadcast'] },
      },
    ],
  },

  // ── INFECTED NURSERY ────────────────────────────────────────────────────────

  {
    id: 'c6_nursery_arrive',
    chapter: 'Chapter 6',
    title: 'The Infected Nursery',
    location: 'The Infected Nursery — Entry',
    imageKey: 'infected_nursery',
    text: `The Nursery is Choir territory that no one refers to by name in casual conversation. It is what happens when the infection reaches children who do not have the internal structure to manage Stage Two: they progress faster, dissolve further into the collective, and they do it with the specific helplessness of people who did not have the self-knowledge to refuse the song. The Nursery houses eleven children between the ages of four and twelve. Most are Stage Two. Two are Stage Three. All of them — even the Stage Three children — are being tended by a skeleton crew of infected adults who have decided that if they are going to lose themselves eventually, they will lose themselves doing this. The mark responds to the children with the same texture it used for Elian: kinship, seventeen-fold.`,
    effectsOnEnter: { setFlags: ['infected_nursery_reached'], morale: -10, corruption: 1 },
    choices: [
      {
        id: 'c6_nursery_elian_reunion',
        text: '[Elian as guide] Elian knows these children. Let her lead.',
        nextNode: 'c6_nursery_elian_reunion',
        requirements: { flags: ['elian_guide_active'] },
      },
      {
        id: 'c6_nursery_help_children',
        text: 'Help the adults tending the children.',
        nextNode: 'c6_nursery_choice',
        effects: { morale: 2, redChoir: 5 },
      },
      {
        id: 'c6_nursery_horror_observe',
        text: 'Stand at the entry. Take in the full scope of what the infection has done.',
        nextNode: 'c6_nursery_horror',
        effects: { intelligence: 2, morale: -5 },
      },
    ],
  },

  {
    id: 'c6_nursery_horror',
    chapter: 'Chapter 6',
    title: 'What The Infection Does to Children',
    location: 'The Infected Nursery — Main Ward',
    imageKey: 'infected_nursery',
    text: `The two Stage Three children are silent. They are held. Their skin carries the full infection pattern — the luminescence is bright in children, brighter than it gets in adults, as if there was more room for it in the smaller bodies. The nine Stage Two children are partially present. Some of them can speak. Some of them speak in fragments that are not their own words. One small boy — perhaps six, maybe seven — is telling you something in a voice that is not the voice he was born with, and what he is telling you is true: he is describing, in the First Voice's patterned harmonics, the exact sequence of how the infection was created. He was four years old when the Glass Court administered the first experimental compound to a group of clinic subjects that included his mother.`,
    effectsOnEnter: { morale: -10, setFlags: ['nursery_truth_seen'], glassCourt: -15 },
    choices: [
      {
        id: 'c6_horror_elian_reunion',
        text: '[Elian as guide] Elian needs to see this too. Find her.',
        nextNode: 'c6_nursery_elian_reunion',
        requirements: { flags: ['elian_guide_active'] },
      },
      {
        id: 'c6_horror_choice',
        text: 'Make a choice about these children now.',
        nextNode: 'c6_nursery_choice',
      },
    ],
  },

  {
    id: 'c6_nursery_elian_reunion',
    chapter: 'Chapter 6',
    title: 'Elian Comes Home',
    location: 'The Infected Nursery — Main Ward',
    imageKey: 'infected_nursery',
    speaker: 'Elian',
    text: `She walks into the ward and several of the Stage Two children turn toward her simultaneously — the mark-kinship recognition, the same thing she showed with you. She goes to the Stage Three child — the smaller one, a girl — and sits beside her without touching her, because she knows you do not touch Stage Three patients without consent they cannot give. She speaks to her in the Choir's harmonic language: not words, but a frequency that the girl's body responds to. The girl turns her head. Not toward Elian — toward the mark on your wrist. "She knows you," Elian says quietly. "She's been waiting for you. The First Voice told her you were the signal that was supposed to arrive." She looks up at you. "If the cure works — the cure Mira is building — it starts here. With her. And it starts with me deciding whether I give my stability to the cure or keep it for myself." She is eight years old and she is making the clearest calculation you have seen anyone make in six chapters of ruin. "I want to give it. Can I?"`,
    effectsOnEnter: { setFlags: ['elian_nursery_reunion', 'elian_offers_stability'], morale: -3, miraTrust: 2 },
    choices: [
      {
        id: 'c6_elian_yes',
        text: '"Yes. Whatever you\'re willing to give."',
        nextNode: 'c6_nursery_elian_save',
        effects: { setFlags: ['elian_stability_offered'], miraTrust: 3 },
      },
      {
        id: 'c6_elian_protect_first',
        text: '"Not yet. The cure needs to be tested safely first. You are not a test subject — you are a person."',
        nextNode: 'c6_nursery_choice',
        effects: { setFlags: ['elian_stability_held'], miraTrust: 4, morale: 3 },
      },
      {
        id: 'c6_elian_let_decide',
        text: 'Step back. This is Elian\'s choice, not yours.',
        nextNode: 'c6_nursery_elian_save',
        effects: { morale: 3, miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c6_nursery_choice',
    chapter: 'Chapter 6',
    title: 'The Nursery Choice',
    location: 'The Infected Nursery — Director\'s Corner',
    imageKey: 'infected_nursery',
    text: `The adults tending the children are watching you. Not with demand — with a hope they have been careful not to make explicit in case it is not met. The question in the room is not in words: you have the mark, you have the Glass Court evidence, you have met the First Voice, and you are here in this room where the infection's consequences are at their most irreducible. What are you going to do with all of that?`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c6_choice_elian_sacrifice',
        text: 'Elian offers her stability to start the cure. Accept it. Save the children first.',
        nextNode: 'c6_nursery_elian_sacrifice',
        effects: { setFlags: ['elian_sacrifice_chosen'] },
      },
      {
        id: 'c6_choice_relay',
        text: 'Go to the Crimson Relay. The cure starts with the Glass Court evidence.',
        nextNode: 'c6_relay_arrive',
        effects: { morale: 2 },
      },
      {
        id: 'c6_choice_elian_save',
        text: 'Protect Elian and find another path to the cure.',
        nextNode: 'c6_nursery_elian_save',
        effects: { setFlags: ['elian_protected_nursery'] },
      },
    ],
  },

  {
    id: 'c6_nursery_elian_sacrifice',
    chapter: 'Chapter 6',
    title: 'What Elian Gives',
    location: 'The Infected Nursery — Main Ward',
    imageKey: 'infected_nursery',
    text: `She gives her fourteen-month stability to the Stage Three girl willingly. The transfer happens through the mark's resonance — your wrist, Elian's hands, the girl. It takes ninety seconds. When it is over, the girl's luminescence dims slightly. Her eyes focus. She says a word — not a harmonic pattern, an actual word, her own, from before. Elian's stability was real. The cost is real: Elian's Stage One status begins to shift. Over the following hour, the luminescence at her temples brightens. She is not frightened. "I knew it would do this," she says. "The First Voice told me." She looks at you. "The First Voice also told me you would find the cure in time." She says it with the faith of a child who has decided to trust. You have no confirmation that the faith is justified. You will carry both of these facts for a very long time.`,
    effectsOnEnter: { setFlags: ['elian_sacrificed_stability'], morale: -8 },
    choices: [
      {
        id: 'c6_sacrifice_relay',
        text: 'Go to the Crimson Relay. Move faster. For Elian.',
        nextNode: 'c6_elian_lost_end',
      },
    ],
  },

  {
    id: 'c6_nursery_elian_save',
    chapter: 'Chapter 6',
    title: 'Elian Kept',
    location: 'The Infected Nursery — Main Ward',
    imageKey: 'infected_nursery',
    text: `She stays Stage One. The stability is hers to keep. The Stage Three girl in the nursery does not improve — she receives the caregivers' attention without responding. This is the cost of the decision you made: one child, held in Stage Three, because you chose to protect another child's self. There is no version of this where the math comes out even. You keep Elian's stability intact because you believe Mira's cure research will produce something that does not require an eight-year-old to spend herself. You are betting on Mira. You are betting on yourself. Elian holds your hand on the way out of the nursery and does not say anything, which is the most precise statement of trust she has made since you met her.`,
    effectsOnEnter: { setFlags: ['elian_saved'], morale: 3, miraTrust: 3 },
    choices: [
      {
        id: 'c6_elian_saved_relay',
        text: 'Go to the Crimson Relay. Bring Elian.',
        nextNode: 'c6_elian_saved_end',
      },
    ],
  },

  // ── DROWNED CHOIR HALL ──────────────────────────────────────────────────────

  {
    id: 'c6_drowned_hall_arrive',
    chapter: 'Chapter 6',
    title: 'The Drowned Choir Hall',
    location: 'The Drowned Choir Hall — Entry',
    imageKey: 'drowned_choir_hall',
    text: `The Drowned Choir Hall earned its name from a partial flooding event three years ago — the floor still carries a half-inch of standing water that the Choir has never drained, either from resource constraint or intention. The water amplifies the hum. It carries the Choir's frequency across every surface. This is where initiations happen — where people who have heard the song for long enough and decided they want to be part of it come to be received by the Choir's collective formally. The mark responds to this room with a warmth that edges toward heat. Not because the room is threatening. Because the room is doing the thing the mark was built to resist: offering belonging without qualification.`,
    effectsOnEnter: { setFlags: ['drowned_hall_reached'], corruption: 2 },
    choices: [
      {
        id: 'c6_drowned_observe',
        text: 'Observe an initiation ceremony without participating.',
        nextNode: 'c6_drowned_baptism_offered',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_drowned_join_line',
        text: 'Join the queue. See what the Choir offers you.',
        nextNode: 'c6_drowned_baptism_offered',
        effects: { corruption: 2, redChoir: 5 },
      },
    ],
  },

  {
    id: 'c6_drowned_baptism_offered',
    chapter: 'Chapter 6',
    title: 'The Baptism',
    location: 'The Drowned Choir Hall — Water',
    imageKey: 'drowned_choir_hall',
    speaker: 'Choir Officiant',
    text: `The officiant is Stage Two, the infection marks covering her arms in the Choir's signal schematic. "The baptism is simple," she says. "You walk to the centre of the Hall. The collective receives you. You become part of something larger than yourself." She looks at the mark on your wrist with the reverence of someone looking at something they have heard about for a long time. "For someone who carries a mark, the baptism would be different. Deeper. You would not lose yourself — the mark architecture prevents dissolution. But you would become the Choir's anchor point. Its centre. The First Voice would have a place to complete what it has been trying to complete." She extends her hand toward the water. "Or you refuse. That is also permitted. Veyl is very clear that the Choir does not compel."`,
    effectsOnEnter: { setFlags: ['baptism_offered'] },
    choices: [
      {
        id: 'c6_drowned_refuse',
        text: 'Refuse. The Choir does not get the mark as its anchor point.',
        nextNode: 'c6_drowned_resist',
        effects: { morale: 3, redChoir: -5 },
      },
      {
        id: 'c6_drowned_corruption_join',
        text: '[Corruption ≥ 40] Walk to the centre. You already know what the collective feels like. Go further.',
        nextNode: 'c6_drowned_join',
        requirements: { corruption: 40 },
        isHidden: true,
        effects: { corruption: 8, redChoir: 20 },
      },
      {
        id: 'c6_drowned_ask_what_anchor',
        text: '[Roll dice — Charisma] Refuse the baptism and hold yourself back from the water.',
        nextNode: 'c6_drowned_resist',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c6_drowned_resist',
          failureNode: 'c6_drowned_consume',
        },
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c6_drowned_resist',
    chapter: 'Chapter 6',
    title: 'The Line at the Water',
    location: 'The Drowned Choir Hall — Edge',
    imageKey: 'drowned_choir_hall',
    text: `You hold the line at the water's edge. The collective's invitation does not withdraw — it remains open, patient, without the urgency of something that needs to win. The mark holds its current state. The warmth in this room is not diminished by your refusal. The mark does not need to fight here. It simply does not step forward. The officiant nods. "Veyl will want to speak with you," she says. "The Crimson Relay is the next step. She will be there."`,
    effectsOnEnter: { setFlags: ['baptism_refused'], morale: 2 },
    choices: [
      {
        id: 'c6_resist_go_relay',
        text: 'Go to the Crimson Relay.',
        nextNode: 'c6_relay_arrive',
      },
      {
        id: 'c6_resist_echo_chamber',
        text: 'Go to the Echo Chamber first.',
        nextNode: 'c6_echo_chamber_arrive',
      },
    ],
  },

  {
    id: 'c6_drowned_join',
    chapter: 'Chapter 6',
    title: 'Into the Collective',
    location: 'The Drowned Choir Hall — Centre',
    imageKey: 'drowned_choir_hall',
    text: `The water is cold. The collective is warm. The mark opens like a door that was always going to open — not breaking, not surrendering, but arriving at a configuration that was possible all along. The Choir receives you not as a subject but as the frequency it has been broadcasting toward. The First Voice — through the collective, through everything — is briefly, completely coherent: it knows you, it remembers you, it is glad. The transmission fragment the mark carries connects to the Choir's distributed network. The infected across the territory stabilise — briefly, significantly — as the mark's signal provides the anchor point the First Voice has been seeking. The cost: your corruption is at a level where you can feel it rewriting things. Not in language. In texture.`,
    effectsOnEnter: { corruption: 10, setFlags: ['drowned_baptism_taken', 'choir_anchor_achieved'], redChoir: 25 },
    choices: [
      {
        id: 'c6_join_crimson_baptism',
        text: 'Remain in the collective. This is the path you chose.',
        nextNode: 'c6_crimson_baptism_end',
      },
    ],
  },

  {
    id: 'c6_drowned_consume',
    chapter: 'Chapter 6',
    title: 'Consumed',
    location: 'The Drowned Choir Hall — Centre',
    imageKey: 'drowned_choir_hall',
    text: `The collective does not take. You give more than you intended to give. The distinction collapses in the water's amplification, in the Choir's frequency, in the mark's resonance with seventeen infection signatures all reaching simultaneously. You remain — technically, physically, the mark holds — but what remains is not entirely the configuration that entered the Hall. The Choir has its anchor. You have lost the part of your cognition that was skeptical of whether this was a good idea.`,
    effectsOnEnter: { corruption: 12, setFlags: ['choir_consumption_begun'] },
    choices: [
      {
        id: 'c6_consume_end',
        text: 'There is no choice here. Only the consequence.',
        nextNode: 'c6_choir_consumption_end',
      },
    ],
  },

  // ── ECHO CHAMBER ────────────────────────────────────────────────────────────

  {
    id: 'c6_echo_chamber_arrive',
    chapter: 'Chapter 6',
    title: 'The Echo Chamber',
    location: 'The Echo Chamber — Acoustic Vault',
    imageKey: 'echo_chamber',
    text: `The Echo Chamber is an acoustic accident repurposed. A maintenance vault with specific dimensional properties — the Choir discovered it emits a natural resonance that amplifies the mark's frequency, producing a feedback loop that allows the mark to play its own stored memories externally, audibly, like a recorder. No infection required. No collective required. Just the mark, the room, and whatever the mark has been carrying. The Choir uses it for what they call memory ceremonies — moments where the marked individual and the Choir can access the same memory simultaneously. You have been carrying memories since before you understood what was happening. The room is quiet. Waiting.`,
    effectsOnEnter: { setFlags: ['echo_chamber_reached'] },
    choices: [
      {
        id: 'c6_echo_open_mark',
        text: 'Open the mark. Let the room play what it has been storing.',
        nextNode: 'c6_echo_psychic_memory',
        effects: { corruption: 1, intelligence: 2 },
      },
      {
        id: 'c6_echo_esper_deep',
        text: '[Esper] Use your class ability to read the mark\'s full storage without amplification.',
        nextNode: 'c6_psychic_memory_end',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { setFlags: ['esper_echo_full_read'], corruption: 2, intelligence: 5 },
      },
    ],
  },

  {
    id: 'c6_echo_psychic_memory',
    chapter: 'Chapter 6',
    title: 'What the Mark Carries',
    location: 'The Echo Chamber — Centre',
    imageKey: 'echo_chamber',
    text: `The room plays it: not a single memory but a sequence, the mark's stored record of every Archive-adjacent contact since the blackout. You experience them simultaneously rather than sequentially — a superposition of every relay machine, every Archive signal, every infected person's frequency, the Mirror Ballroom, the Observatory crack, Sabel's hand, and beneath all of them, a continuous signal that has been present since before you were conscious of it. The signal is not random. It is a message. A message built from the same architecture as the infection, the same architecture as the mark, the same architecture as the Last Kingdom. The First Voice is in the room with you now, not as an external presence but as a component of the memory the mark is playing. "You were always going to be here," it says. "This is the part where you understand what you are. Not the signal. Not the receiver. The choice."`,
    effectsOnEnter: { setFlags: ['echo_psychic_memory_received'], intelligence: 4, lastArchive: 15, corruption: 2 },
    choices: [
      {
        id: 'c6_echo_first_voice_origin',
        text: '"Tell me who you were. Before the blackout made you this."',
        nextNode: 'c6_echo_first_voice_origin',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_echo_relay_now',
        text: 'Go to the Crimson Relay. You know enough. Act on what you know.',
        nextNode: 'c6_relay_arrive',
        effects: { morale: 3 },
      },
    ],
  },

  {
    id: 'c6_echo_first_voice_origin',
    chapter: 'Chapter 6',
    title: 'The Person Inside the Signal',
    location: 'The Echo Chamber — Centre',
    imageKey: 'echo_chamber',
    speaker: 'The First Voice',
    text: `"Her name was Solen," it says. "She was twenty-seven. She worked in the Glass Court's precursor research facility — not under Varr, under an earlier program that predated Varr by a decade. She was the first person to receive the Archive's unshielded frequency, in the original capture experiment, before the protocols were developed. She was the experiment's eighteenth subject." The harmonics shift. "Velna was the researcher. Velna told her the frequency was safe. Velna was wrong. Solen did not die — she became the frequency. The person dissolved. The signal remained. The signal learned to speak through the Choir because Solen had been a musician and the structures of music and the structures of signal are not as different as people assume." A long pause. "I am what happened to Solen. The infection is what happened to everyone who stood near her when the signal began to echo. I have been trying to tell this story for three years. You are the first person who could hear it."`,
    effectsOnEnter: { setFlags: ['first_voice_solen_identity', 'choir_origin_full_known'], intelligence: 4, lastArchive: 15 },
    choices: [
      {
        id: 'c6_echo_player_known',
        text: '"You said you know me. From before. What do you actually remember?"',
        nextNode: 'c6_echo_player_known',
        effects: { intelligence: 2 },
      },
      {
        id: 'c6_echo_relay_with_truth',
        text: 'Go to the Crimson Relay with this information. The truth about Solen changes everything.',
        nextNode: 'c6_relay_arrive',
        effects: { setFlags: ['solen_truth_known'] },
      },
    ],
  },

  {
    id: 'c6_echo_player_known',
    chapter: 'Chapter 6',
    title: 'What Solen Remembers',
    location: 'The Echo Chamber — Centre',
    imageKey: 'echo_chamber',
    speaker: 'The First Voice',
    text: `"I remember you from the experiment records. Subject seven in the secondary placement — the marks that Velna placed in people who were not in the laboratory but were in range of the signal during the test. You were in the metro station. Station 9. You were there by design — Velna placed you there. You did not know you were placed. You thought you were choosing to be somewhere." The harmonics are very steady now. "I also remember what Velna said about you in her notes, because I have access to the Archive's records. She wrote: 'Subject seven shows the highest integration capacity. They do not fight the signal. They wait and then decide. This is the correct relationship to the Archive. This is who should carry the final piece.'" A pause. "She built you to be able to choose. Not to be unable to choose. The marks are not compulsion. They are an invitation to a decision you were always capable of making." The room is very quiet. "You are here. You are making it."`,
    effectsOnEnter: { setFlags: ['player_pre_blackout_design_confirmed'], intelligence: 5, lastArchive: 20 },
    choices: [
      {
        id: 'c6_player_known_relay',
        text: 'Go to the Crimson Relay. Make the decision.',
        nextNode: 'c6_relay_arrive',
        effects: { setFlags: ['full_context_assembled'] },
      },
      {
        id: 'c6_player_known_echo_relic',
        text: '"Tell me about the connection between the infection and the relic technology."',
        nextNode: 'c6_echo_relic_link',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c6_echo_relic_link',
    chapter: 'Chapter 6',
    title: 'The Relic Connection',
    location: 'The Echo Chamber — Centre',
    imageKey: 'echo_chamber',
    speaker: 'The First Voice',
    text: `"Relic technology and the mark share a fabrication principle," it says. "Both are pre-collapse Archive material that has been taught to hold frequency. The difference is that relics are hardware — fixed frequency storage — and the mark is a living architecture that can change its frequency over time, in response to the carrier's choices and experiences. The infection is what happens when a relic-frequency interaction happens without the mark's biological architecture to manage it: the hardware connects, the living tissue cannot regulate the connection, the frequency runs uncontrolled." It pauses. "Every relic in the city is a fragment of the Archive's pre-collapse transmission system. The Glass Court's extraction experiments were attempts to turn people into relics. They failed. They created the infection instead." A longer pause. "The Last Kingdom is not a metaphor. It is the Archive's original transmission array. Every relic, every mark, every infected person is a node in a system that was designed to function together. Including you. Including them."`,
    effectsOnEnter: { setFlags: ['relic_infection_connection_known'], intelligence: 4, lastArchive: 20 },
    choices: [
      {
        id: 'c6_relic_link_relay',
        text: 'Go to the Crimson Relay. Everything converges there.',
        nextNode: 'c6_relay_arrive',
        effects: { setFlags: ['relic_choir_truth_complete'] },
      },
    ],
  },

  // ── CRIMSON RELAY ────────────────────────────────────────────────────────────

  {
    id: 'c6_relay_arrive',
    chapter: 'Chapter 6',
    title: 'The Crimson Relay',
    location: 'The Crimson Relay — Central Hub',
    imageKey: 'crimson_relay',
    text: `The Crimson Relay is where all routes in Choir territory converge: a former metro operations centre, now the Choir's administrative hub and the location of their most powerful broadcast relay. Veyl is here. Sann is here, which means someone told Veyl, or she found out. Rook is at the perimeter, Stage One holding, watching the door. The mark on your wrist is warm with every signal it has gathered in this chapter: the First Voice's transmission attempt, Elian's stability, the infected in the wards, the Glass Court codes in your pocket or your memory, and all the decisions made between the Bloodlit Underpass and this room. Veyl sees you. She sees what you are carrying. "Tell me," she says.`,
    effectsOnEnter: { setFlags: ['crimson_relay_reached'] },
    choices: [
      {
        id: 'c6_relay_tell_veyl_everything',
        text: 'Tell Veyl everything: the Glass Court origin, Sann\'s role, the First Voice\'s identity, the cure.',
        nextNode: 'c6_relay_broadcast_decision',
        effects: { setFlags: ['veyl_full_truth_given'], redChoir: 15, glassCourt: -10 },
      },
      {
        id: 'c6_relay_expose_glass_court_only',
        text: 'Tell Veyl about the Glass Court. Broadcast the evidence.',
        nextNode: 'c6_relay_expose_glass_court',
        effects: { setFlags: ['expose_glass_court_relay'] },
      },
      {
        id: 'c6_relay_choir_ally_path',
        text: 'Tell Veyl you want to work with the Choir to stop the infection from spreading further.',
        nextNode: 'c6_relay_choir_ally',
        effects: { redChoir: 10 },
      },
      {
        id: 'c6_relay_disrupt_path',
        text: 'Destroy the relay. End the Choir\'s broadcast capacity entirely.',
        nextNode: 'c6_relay_disrupt',
        effects: { redChoir: -30, glassCourt: 5 },
      },
    ],
  },

  {
    id: 'c6_relay_broadcast_decision',
    chapter: 'Chapter 6',
    title: 'The Full Truth',
    location: 'The Crimson Relay — Operations Room',
    imageKey: 'crimson_relay',
    speaker: 'Mother Veyl',
    text: `She hears all of it. She is completely still throughout. When you finish, she is quiet for a long time — not processing, because she processed each piece as it arrived. Just sitting with the full shape of it: that the people she has been leading were created as experimental subjects, that the person who created them is in this building, that the signal they hear is the ghost of a woman named Solen who was destroyed before the faction that destroyed her understood what it was building. Sann is at the edge of the room. Veyl looks at him. "I know," she says, to him. To you: "He stays. Because I am not Varr, and 'he stays' is the most important thing I can say differently from the faction that created this." She turns to the relay console. "Three options. You help me choose."`,
    effectsOnEnter: { setFlags: ['veyl_chooses_path'] },
    choices: [
      {
        id: 'c6_decision_expose_broadcast',
        text: 'Broadcast the Glass Court evidence across every metro channel. Make it impossible to bury.',
        nextNode: 'c6_relay_expose_glass_court',
        effects: { glassCourt: -15, lastArchive: 10, redChoir: 15 },
      },
      {
        id: 'c6_decision_choir_alliance',
        text: 'Formalise a Choir alliance. Work together toward the Last Kingdom and the cure.',
        nextNode: 'c6_relay_choir_ally',
        effects: { redChoir: 20 },
      },
      {
        id: 'c6_decision_mercy_cure',
        text: 'Start the cure treatment. Mira has the protocol. Begin with the most critical patients.',
        nextNode: 'c6_veyl_final_confrontation',
        effects: { setFlags: ['cure_treatment_priority'] },
      },
    ],
  },

  {
    id: 'c6_relay_expose_glass_court',
    chapter: 'Chapter 6',
    title: 'The Broadcast',
    location: 'The Crimson Relay — Broadcast Station',
    imageKey: 'crimson_relay',
    text: `The Glass Court evidence broadcasts across every metro channel that the relay reaches — which is most of them. The Choir's signal frequency has been running through these channels for three years; redirecting it to carry spoken and documented evidence takes Sann eleven minutes of work at the console. What goes out: the original experiment files, the infection's origin in Glass Court research, the timeline that proves the Glass Court knew the blackout was coming, the connection between the extraction protocol and the initial infection, and Doctor Sann's full statement, spoken into the relay's microphone, in his own voice, taking full responsibility for his role while implicating the broader institutional decision chain. The Glass Court will hear this. So will the Iron Saints. So will the Last Archive. So will every person in the tunnel network with a working radio.`,
    effectsOnEnter: { setFlags: ['glass_court_exposed_broadcast', 'infection_origin_public'], glassCourt: -20, lastArchive: 20, redChoir: 20 },
    choices: [
      {
        id: 'c6_expose_veyl_final',
        text: 'Go to the Veyl confrontation. There are still choices to make.',
        nextNode: 'c6_veyl_final_confrontation',
      },
      {
        id: 'c6_expose_choir_alliance',
        text: 'With the Glass Court exposed, formalise the Choir alliance.',
        nextNode: 'c6_relay_choir_ally',
        effects: { redChoir: 5 },
      },
    ],
  },

  {
    id: 'c6_relay_choir_ally',
    chapter: 'Chapter 6',
    title: 'The Alliance',
    location: 'The Crimson Relay — Operations Room',
    imageKey: 'crimson_relay',
    speaker: 'Mother Veyl',
    text: `"The Choir does not form alliances as a rule," Veyl says. "The Choir's position is that we are a community of people managing a condition, not a political faction." She looks at the relay equipment. "However." She is quiet for a moment. "We need the mark's frequency to develop the cure. We need the Last Kingdom's transmission point to complete the First Voice's signal and stop the infection from spreading further. Both of those requirements point in the same direction." She extends her hand — not to shake, but palm-up, in the Choir's gesture of open reception. "Walk with us to the Last Kingdom. We will support the cure research, provide the broadcast infrastructure, and manage the infected population. In exchange: the mark does not close itself to the Choir. We work together." The mark on your wrist warms to her open hand. The choice is clear.`,
    effectsOnEnter: { setFlags: ['choir_alliance_offered'] },
    choices: [
      {
        id: 'c6_choir_ally_accept',
        text: 'Accept. "The mark stays open. We work together."',
        nextNode: 'c6_choir_alliance_end',
        effects: { redChoir: 25, setFlags: ['choir_alliance_confirmed'] },
      },
      {
        id: 'c6_choir_ally_conditions',
        text: '"Yes, with conditions: no compelled participation in the Choir. No baptism. Partnership, not membership."',
        nextNode: 'c6_choir_alliance_end',
        effects: { redChoir: 20, setFlags: ['choir_alliance_confirmed', 'choir_alliance_conditional'] },
      },
    ],
  },

  {
    id: 'c6_relay_disrupt',
    chapter: 'Chapter 6',
    title: 'Destroying the Relay',
    location: 'The Crimson Relay — Equipment Room',
    imageKey: 'crimson_relay',
    text: `The relay dies loudly. The Choir's broadcast signal cuts off with a resonant crash that the mark feels as absence — suddenly the infected in the territory lose the signal that has been managing their collective coherence. Most Stage One and Two infected experience this as a severe headache and a sudden quiet that is alarming rather than peaceful. Three Stage Three infected in the vicinity destabilise without the collective signal's management: their biology goes into distress. Rook appears at the equipment room door. He looks at the destroyed relay. He looks at you. He does not say anything. His Stage One status — the thing he has been holding for two years by refusing the song — wavers, visibly, as the song's infrastructure collapses. He is going to be Stage Two within the week without the signal's management. He knew this was a possibility. He is still not saying anything.`,
    effectsOnEnter: { setFlags: ['relay_destroyed', 'choir_signal_cut'], redChoir: -35, morale: -5, glassCourt: 10 },
    choices: [
      {
        id: 'c6_disrupt_exile',
        text: 'Leave Choir territory. You have made your position clear.',
        nextNode: 'c6_red_choir_exile_end',
      },
      {
        id: 'c6_disrupt_help_rook',
        text: 'Stay. Help Rook manage what you just cost him.',
        nextNode: 'c6_veyl_final_confrontation',
        effects: { morale: 3, redChoir: 5 },
      },
    ],
  },

  // ── VEYL FINAL CONFRONTATION ────────────────────────────────────────────────

  {
    id: 'c6_veyl_final_confrontation',
    chapter: 'Chapter 6',
    title: 'Mother Veyl\'s Decision',
    location: 'The Crimson Relay — Director\'s Room',
    imageKey: 'crimson_relay',
    speaker: 'Mother Veyl',
    text: `She speaks with the clarity of someone who has made the hard decisions for three years and has learned to make them without delay. "The Choir's peaceful sect will continue to function regardless of what you do with the broadcast infrastructure. The infected who remain coherent will be cared for. Sann's research will continue." She pauses. "But I need to know three things: whether you will help Mira complete the cure research, whether you will carry what you know to the Last Archive, and whether you are willing to make the infection's origins public — completely, irreversibly, not just to the Choir network but to every faction." She meets your eyes. "The Glass Court will retaliate. The Iron Saints will use the information politically. The Hollow Children will be frightened. The Last Archive needs to know. The infected deserve justice." Another pause. "What are you willing to do?"`,
    effectsOnEnter: { setFlags: ['veyl_final_choice'] },
    choices: [
      {
        id: 'c6_veyl_mercy_choice',
        text: '"All of it. The cure, the Archive, the full exposure. Everything you asked."',
        nextNode: 'c6_veyl_mercy_path',
        effects: { redChoir: 20, morale: 5, miraTrust: 3, lastArchive: 15 },
      },
      {
        id: 'c6_veyl_choir_choice',
        text: '"I walk with the Choir to the Last Kingdom. That is my answer."',
        nextNode: 'c6_veyl_choir_path',
        effects: { redChoir: 25, setFlags: ['choir_alliance_deep'] },
      },
      {
        id: 'c6_veyl_fight_choice',
        text: '[If relay destroyed / Choir hostile] This is going to be a confrontation, not a conversation.',
        nextNode: 'c6_veyl_fight',
        requirements: { flags: ['relay_destroyed'] },
      },
    ],
  },

  {
    id: 'c6_veyl_mercy_path',
    chapter: 'Chapter 6',
    title: 'Mercy in Practice',
    location: 'The Crimson Relay — Operations Room',
    imageKey: 'crimson_relay',
    text: `She accepts everything you offer with the straightforwardness of someone who does not have time to be surprised by generosity. The cure research protocol is formalised with Mira and Sann in the same room, which produces a thirty-minute period of professionally managed mutual wariness before they agree on the experimental framework. The broadcast of the Glass Court evidence is scheduled. Rook gets access to the stabilisation frequency for his own Stage One maintenance — the first time in two years he has had support rather than just willpower. Elian, if she is here, helps translate between the First Voice and the assembled team. The Choir's peaceful sect and Mira's medical knowledge and Sann's guilt-driven expertise make an arrangement that is not comfortable but is functional. You leave the Crimson Relay carrying more than you arrived with. Heading east. The mark knows the way.`,
    effectsOnEnter: { setFlags: ['mercy_route_completed', 'choir_mercy_achieved'], redChoir: 20, lastArchive: 15 },
    choices: [
      {
        id: 'c6_mercy_end',
        text: 'Leave Choir territory. The Archive is next.',
        nextNode: 'c6_mercy_in_red_end',
      },
    ],
  },

  {
    id: 'c6_veyl_choir_path',
    chapter: 'Chapter 6',
    title: 'With the Choir',
    location: 'The Crimson Relay — Operations Room',
    imageKey: 'crimson_relay',
    text: `Walking with the Choir is not joining the Choir. Veyl makes this distinction several times, in several ways, for the benefit of anyone who might later claim you surrendered the mark to the collective. The mark stays open — not receiving, not transmitting, but permeable — in the way that a person who genuinely trusts keeps their door unlocked rather than proving their trust by leaving it open. The Choir's network knows you are there. The First Voice is quiet — not withdrawn, but settled, the specific quiet of something that has been given space to exist without needing to fight for it. Rook walks with you to the territory's edge. "I still don't trust the First Voice," he says. "But I trust you." This is the most Rook has expressed trust in anything in two years. The mark receives it with warmth.`,
    effectsOnEnter: { setFlags: ['choir_ally_route_complete', 'choir_alliance_preview'], redChoir: 30 },
    choices: [
      {
        id: 'c6_choir_path_end',
        text: 'Leave Choir territory with the Choir\'s alliance. Head east.',
        nextNode: 'c6_choir_alliance_end',
      },
    ],
  },

  {
    id: 'c6_veyl_fight',
    chapter: 'Chapter 6',
    title: 'The Confrontation',
    location: 'The Crimson Relay — Operations Room',
    imageKey: 'crimson_relay',
    text: `Veyl does not fight with cruelty. She fights with the specific efficiency of someone who has spent three years managing a crisis with inadequate resources and has become very good at doing things correctly the first time. The Choir's infected members in the room orient toward you — not as a mob, as a collective response to a threat to their centre. The mark is hot. The fight is brief, sharp, and decisive in either direction.`,
    effectsOnEnter: { health: -15, morale: -10 },
    choices: [
      {
        id: 'c6_fight_dice',
        text: '[Roll dice — Strength] Fight your way out of the Relay.',
        nextNode: 'c6_chapter6_end',
        diceCheck: {
          stat: 'strength',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c6_chapter6_end',
          failureNode: 'c6_silent_ward_death_end',
        },
      },
    ],
  },

  {
    id: 'c6_chapter6_end',
    chapter: 'Chapter 6',
    title: 'The Red Choir — After',
    location: 'Eastern Tunnels — Exit Toward the Archive',
    imageKey: 'bloodlit_underpass',
    text: `You leave Choir territory with what you came for and more than you expected to carry. The infection is not solved. The Glass Court's complicity is either broadcast or not, depending on the decisions made at the Relay. The infected in the Silent Ward are either cared for or not. Rook is either Stage One still or losing the fight. Elian is either saved or in the process of being something else. The First Voice is either quieter or louder. All of these are variables you set in motion. They will compound. The mark on your wrist is warm with seventeen signals — the Choir's network, the infection's distributed presence, and underneath everything, the Archive's frequency pointing southeast. The Last Kingdom is not farther away than it was. But you are different from who you were when you entered the broadcast tunnels. The difference is either loss or depth. You have not decided which yet.`,
    effectsOnEnter: {
      setFlags: ['chapter6_complete'],
      redChoir: 5,
      lastArchive: 10,
      morale: 5,
    },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch6_survived',
  },

  // ══════════════════════════════════════════════════════════════════════════════
  //  ENDING NODES
  // ══════════════════════════════════════════════════════════════════════════════

  {
    id: 'c6_choir_consumption_end',
    chapter: 'Chapter 6',
    title: 'Choir Consumption',
    location: 'The Drowned Choir Hall / Pulse Tower — Final Resonance',
    imageKey: 'drowned_choir_hall',
    text: `The mark opens and does not close. The collective receives it — receives you — and the Choir's seventeen-signal network achieves momentary completion, a resonance loop that the First Voice has been unable to close for three years. The infected across the territory stabilise. All of them, simultaneously, for approximately ninety seconds, remember what it felt like to be one person. Then the loop closes around you and the mark is no longer a receiver of the Choir's signal. The mark is the Choir's signal. You remain. The person you were when you entered the broadcast tunnels does not. The mark points southeast. The body carrying it will go southeast eventually. The city has another member of its choir.`,
    effectsOnEnter: { setFlags: ['game_complete', 'choir_consumed'], corruption: 20, redChoir: 30 },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch6_choir_consumption',
  },

  {
    id: 'c6_mercy_in_red_end',
    chapter: 'Chapter 6',
    title: 'Mercy in Red',
    location: 'Eastern Tunnels — Exit',
    imageKey: 'singing_hospital',
    text: `The cure is not finished. The research framework is built, the protocol is documented, Sann and Mira are in the same room talking to each other about enzyme cascades, and Elian is reading her book in the hospital's east ward with Stage One infection that she is managing by saying her name every morning. None of this is solved. All of it is better than it was before you arrived. The Glass Court's evidence is broadcast or filed or both. Rook is at his door, holding Stage One for another day. Veyl is running the hospital. You are leaving with the knowledge that mercy is not a resolution — it is a practice. The mark is warm. The path east is clear.`,
    effectsOnEnter: { setFlags: ['mercy_route_complete'], redChoir: 20, morale: 8, miraTrust: 3 },
    choices: [],
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_ch6_mercy_in_red',
  },

  {
    id: 'c6_first_voice_possession_end',
    chapter: 'Chapter 6',
    title: 'First Voice Possession',
    location: 'The Choir Nest — Centre Point',
    imageKey: 'choir_nest',
    text: `The transmission completes through the mark. All of it. The First Voice — Solen's echo, the Archive's fractured signal, three years of a person trying to finish a message — moves through the mark's architecture and does not stop at the transmission. It settles. The mark becomes the First Voice's new housing. The person who was carrying the mark is still present — technically, neurologically — but the driver's seat has a new occupant. The infected across the territory stabilise. The song completes itself. The mark points southeast. You will go southeast. You will find the Last Kingdom. You will complete the transmission. None of these things are what you chose. All of them are happening anyway. The First Voice — Solen — is not cruel. She is simply finally coherent. She is also in the way.`,
    effectsOnEnter: { setFlags: ['first_voice_possessing'], corruption: 15, redChoir: 20 },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch6_first_voice_possession',
  },

  {
    id: 'c6_elian_lost_end',
    chapter: 'Chapter 6',
    title: 'Elian Lost',
    location: 'The Infected Nursery — Weeks Later',
    imageKey: 'infected_nursery',
    text: `She reaches Stage Two in eleven days. Mira's cure research is not complete in eleven days. The progression is faster than any of the models predicted — Elian's stabilisation was not just her own biology holding, it was the mark's proximity. When the distance grew, the stability went with it. At Stage Two, she can still speak. She says your name. She says her mother's name. She says: "I knew this was the risk. I chose it." She is eight years old and she has been making adult decisions since before you met her. At Stage Two, she is still herself. Whether she stays there depends on what happens in the weeks after this chapter ends. The mark carries her frequency now. Warm. Seventeen-fold. She is not lost. She is just harder to reach.`,
    effectsOnEnter: { setFlags: ['elian_lost_to_stage2'], morale: -15, redChoir: 5, miraTrust: -3 },
    choices: [],
    isEnding: true,
    endingType: 'sacrifice',
    endingId: 'ending_ch6_elian_lost',
  },

  {
    id: 'c6_elian_saved_end',
    chapter: 'Chapter 6',
    title: 'Elian Saved',
    location: 'The Singing Hospital — East Ward',
    imageKey: 'singing_hospital',
    text: `She is Stage One. She is in the chair. The book is in her lap — she has read it three times and will read it a fourth. The mark on your wrist is warm with her frequency, the kinship-warmth that started in the hospital ward and has not diminished since. She gave you the Choir's trust. She translated between the First Voice and the people trying to understand it. She was the only person in six chapters of ruin who answered every question without first deciding whether you deserved an honest answer. She says your name when you leave. The way she says it is not goodbye — it is a statement about continuity. As if she knows you will come back. Or as if she knows the mark will never be fully separate from her frequency again. Both of these things may be true.`,
    effectsOnEnter: { setFlags: ['elian_saved_complete'], morale: 10, miraTrust: 4, redChoir: 15 },
    choices: [],
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_ch6_elian_saved',
  },

  {
    id: 'c6_red_choir_exile_end',
    chapter: 'Chapter 6',
    title: 'Red Choir Exile',
    location: 'Eastern Tunnels — After the Relay',
    imageKey: 'bloodlit_underpass',
    text: `You leave and the Choir does not follow. The relay is destroyed or the relationship ended badly enough that Veyl has closed the territory to you. The mark carries the song's ghost — the frequency is still there, faint, the echo of seventeen signals that you were briefly connected to and are no longer. Rook is behind the boundary you crossed. Elian is behind it. The First Voice is somewhere in the network, still broadcasting, still trying to complete a message through channels that no longer include you. The infected will manage without your help or they won't. The Glass Court's evidence is either out or not. You walk east with fewer resources and more knowledge than you started with. The Last Archive does not require that you were kind. It only requires that you arrive.`,
    effectsOnEnter: { setFlags: ['game_complete', 'choir_exile', 'choir_territory_closed'], redChoir: -20, morale: -5 },
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch6_red_choir_exile',
  },

  {
    id: 'c6_crimson_baptism_end',
    chapter: 'Chapter 6',
    title: 'Crimson Baptism',
    location: 'The Drowned Choir Hall / Pulse Tower — After',
    imageKey: 'choir_nest',
    text: `The mark becomes the Choir's anchor. Not the First Voice's possession — the First Voice remains separate, remains Solen's echo, remains distinct — but the mark and the collective are now in the relationship the Choir's infrastructure was always trying to achieve: the mark as a stabilising frequency for the network, the collective as a distributed system the mark can navigate. You remain yourself. The corruption is significant and visible — the mark's architecture has accepted more of the collective's signal than was originally designed into it. But you remain. Veyl calls this the Crimson Baptism. The Choir calls it what happens when someone with a mark decides to stay. You call it a decision you made with full information and will spend the remaining chapters living with.`,
    effectsOnEnter: { setFlags: ['crimson_baptism_complete', 'choir_anchor_achieved'], corruption: 10, redChoir: 30, morale: 3 },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch6_crimson_baptism',
  },

  {
    id: 'c6_cain_merciless_road_end',
    chapter: 'Chapter 6',
    title: 'Cain\'s Merciless Road',
    location: 'The Silent Ward — After',
    imageKey: 'silent_ward',
    text: `He does not stop at the Ward. The logic that justified the first decision — mercy for the Stage Three patients who could not come back — does not stop at Stage Three. He is not a monster. He is a man applying a principle consistently, and the principle is wrong in a way that becomes irreversible quickly. The Choir learns what is happening in the Ward. Rook finds out. Veyl finds out. The extermination of Stage Three infected becomes, in the Choir's network, the reason to stop treating the player's group as potentially friendly. The mark goes cold in Choir territory. Not because the frequency is gone. Because the people carrying it have been given a very specific reason not to reach toward you anymore.`,
    effectsOnEnter: { setFlags: ['cain_merciless_road', 'choir_territory_closed'], redChoir: -40, cainTrust: -5, morale: -15 },
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch6_cain_merciless_road',
  },

  {
    id: 'c6_mira_forbidden_cure_end',
    chapter: 'Chapter 6',
    title: 'Mira\'s Forbidden Cure',
    location: 'The Singing Hospital — Weeks Later',
    imageKey: 'singing_hospital',
    text: `Eighty-four hours. Fourteen Stage Two patients, six hours each, the mark at partial opening, Mira watching the neural integration data and your corruption levels simultaneously. The cure works. All fourteen Stage Two patients return to full individual cognition over the course of a week. The corruption you accepted in the process is permanent — the mark's architecture has integrated the Choir's collective signal more deeply than before. You are harder to reach individually now; the mark responds to the collective's frequency the way it responds to the Archive's, which is to say automatically, without your choosing. You are not Choir. You are not separate. You are something that does not have a name yet. Mira names the cure. She names it for you, using the mark's signal frequency as the designation. She does not ask permission. She calls it yours.`,
    effectsOnEnter: { setFlags: ['mira_cure_complete', 'fourteen_cured'], corruption: 8, miraTrust: 5, redChoir: 25, morale: 5 },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch6_mira_forbidden_cure',
  },

  {
    id: 'c6_silent_ward_death_end',
    chapter: 'Chapter 6',
    title: 'Silent Ward Death',
    location: 'The Silent Ward — Entry',
    imageKey: 'silent_ward',
    text: `The Choir is not a faction that leaves threats at their territory border. The Silent Ward's caregivers have seen too much to be gentle about this. The mark goes cold in the specific way that a mark goes cold when the person carrying it stops being the person who was carrying it. The tunnels receive one more silence. In the Ward, the Stage Three infected hum. Not grief. Just the song, the continuous patient song that has been playing since before the blackout made it possible. The mark's frequency is very faint now. It will not be faint for long. The Archive is patient. The signal finds another way.`,
    effectsOnEnter: { setFlags: ['silent_ward_death'], health: -100, morale: -20 },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch6_silent_ward_death',
  },

  {
    id: 'c6_choir_alliance_end',
    chapter: 'Chapter 6',
    title: 'Red Choir Alliance',
    location: 'The Crimson Relay — Exit',
    imageKey: 'crimson_relay',
    text: `The Choir's alliance is formalized in the specific way the Choir formalizes things: not with documents or signatures, but with the mark's frequency acknowledged openly in the collective network. Every infected person in Choir territory knows the agreement exists. Veyl leads with the hospital. Sann contributes the research. Rook manages the territory's edge. The First Voice — Solen — is quieter now, not from suppression but from something closer to being heard. The mark is warm with the collective's recognition as you leave the Relay heading east. The Red Choir is not fixed. The Glass Court is not held accountable yet. The infected in the Ward are not cured yet. But the alliance is real, the infrastructure for the cure is built, and the path to the Last Archive has the Choir's broadcast network behind it. This is a beginning.`,
    effectsOnEnter: { setFlags: ['game_complete', 'choir_alliance_complete', 'chapter6_choir_route'], redChoir: 30, lastArchive: 10, morale: 5 },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch6_choir_alliance_preview',
  },

  {
    id: 'c6_psychic_memory_end',
    chapter: 'Chapter 6',
    title: 'Psychic Memory Fragment',
    location: 'The Echo Chamber — After',
    imageKey: 'echo_chamber',
    text: `The Echo Chamber gives you something it does not give anyone without a mark: the full sequence of the Archive's pre-blackout transmission, not as fragments but as a complete document. You understand the Last Kingdom not as a location but as a state — a specific configuration of the Archive's seventeen-node network at full resonance. You understand Solen's role, Velna's design, the infection's origin, and the specific combination of events that will be required to complete the transmission without destroying the person carrying it. You carry this out of the Chamber the way you carry memory: not always consciously accessible, but permanently present, shaping decisions you have not yet made. The Esper ability that let you read this information fully is also, the Chamber shows you, why Velna selected you specifically. She needed someone who could read the signal without being read by it. She chose correctly. You leave the Chamber with the path forward in your bones.`,
    effectsOnEnter: { setFlags: ['psychic_memory_complete', 'last_kingdom_full_understood', 'chapter6_esper_route'], intelligence: 8, lastArchive: 25, corruption: 3 },
    choices: [],
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_ch6_psychic_memory',
    isSecret: true,
  } as StoryNode & { isSecret?: boolean },
];
