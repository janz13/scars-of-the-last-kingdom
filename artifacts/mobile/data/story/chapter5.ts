import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 5 — THE GLASS COURT
//
//  Theme: Luxury above starvation. Power, beauty, lies, class divide,
//         medical experiments, political survival, and moral corruption.
//
//  Locations:
//    The Glass Gate · The Ascension Elevator · The White Atrium
//    The Hunger Gallery · The Orchid Clinic · The Mirror Ballroom
//    The Servant Quarters · The Experiment Ward · The Sky Garden
//    The Council Chamber · The Cracked Observatory · The Private Auction Hall
//
//  Key NPCs:
//    Lady Seraphine Vale   — elegant ruler, treats survival like theater
//    Director Enoch Varr   — scientist studying relic marks and corruption
//    Juno                  — servant-ally, secret network
//    Lord Cael Orison      — charming manipulator
//    The Pale Curator      — collector of relic-touched humans
//    The Masked Heir       — connected to player's lost memory and the blackout
//
//  Routes (15):
//     1. Enter as invited guest
//     2. Sneak in through servant tunnels
//     3. Arrive as prisoner / test subject
//     4. Ally with Lady Seraphine
//     5. Expose the Glass Court's experiments
//     6. Sell out the Hollow Children for access
//     7. Use Iron Saints reputation to negotiate entry
//     8. Protect Mira from the Orchid Clinic
//     9. Let Cain make a dangerous political bargain
//    10. Fallen Noble background route
//    11. Black Market Courier background route
//    12. Shadow Broker class route
//    13. Relic Hunter class route through the Pale Curator
//    14. Corruption event in the Mirror Ballroom
//    15. Discover evidence that the blackout was planned
//
//  Starting node:  chapter5_start  (follows chapter4_complete flag)
//  Chapter end:    c5_chapter5_end
//
//  New image keys:
//    glass_gate, ascension_elevator, white_atrium, hunger_gallery,
//    orchid_clinic, mirror_ballroom, servant_quarters, experiment_ward,
//    sky_garden, council_chamber, cracked_observatory, private_auction_hall
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_5_NODES: StoryNode[] = [

  // ════════════════════════════════════════════════════════════════════════════
  //  APPROACH AND ENTRY
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'chapter5_start',
    chapter: 'Chapter 5',
    title: 'The Glass Court',
    location: 'Surface Approach — Glass Tower District',
    imageKey: 'glass_gate',
    text: `Three hours after leaving the Iron Saints' settlement, the city changes. It does not change gradually — it changes all at once, the way a verdict changes a room. The ruined blocks end at a boundary marked by light: real light, powered light, arc-lamps running on something that still works. The towers beyond them are glass and steel and intact. They survived the blackout the way the powerful survive catastrophes — by being somewhere else when the worst of it happened, or by having resources everyone else lost. The Glass Court. You have heard the name in tunnels, in whispers, in the fear people use when they talk about things that have not yet happened to them. It is happening now. The mark on your wrist pulses once — not in warning, but in recognition. It has been here before.`,
    effectsOnEnter: { hunger: -1, thirst: -1, setFlags: ['chapter5_begun'] },
    choices: [
      {
        id: 'c5_start_approach_gate',
        text: 'Move toward the Glass Gate. There is only one entrance and it is deliberate.',
        nextNode: 'c5_glass_gate_approach',
        effects: { morale: -1 },
      },
      {
        id: 'c5_start_observe_first',
        text: 'Hold position. Observe the guard rotation before deciding how to approach.',
        nextNode: 'c5_glass_gate_approach',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_glass_gate_approach',
    chapter: 'Chapter 5',
    title: 'The Approach',
    location: 'Glass Gate — Outer Perimeter',
    imageKey: 'glass_gate',
    text: `The gate is not a military checkpoint in the way the Iron Saints build checkpoints — it does not threaten, it curates. The barriers are glass panels framed in polished steel, and the guards wear grey uniforms that fit, which in the current city means something. Two guards at the primary position. A third at an elevated observation point you almost didn't see. A queue of people along the east wall: some in rags, some in clothes that suggest they used to have money, all of them waiting for a decision being made about them by people who are already inside. The mark warms against the gate material — the glass panels are not merely decorative. They contain something. An embedded lattice, fine as spider silk, that the mark responds to the way it responded to the Iron Saints' chains. Different purpose, same architecture.`,
    effectsOnEnter: { setFlags: ['glass_gate_reached'] },
    choices: [
      {
        id: 'c5_approach_join_queue',
        text: 'Join the queue. See how they process arrivals before committing to a method.',
        nextNode: 'c5_gate_guard_encounter',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_approach_direct',
        text: 'Bypass the queue. Walk directly to the primary position. Confidence reads as authority.',
        nextNode: 'c5_gate_guard_encounter',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c5_gate_guard_encounter',
    chapter: 'Chapter 5',
    title: 'The Glass Gate',
    location: 'Glass Gate — Processing Arch',
    imageKey: 'glass_gate',
    speaker: 'Gate Officer',
    text: `The guard who processes you has the specific expression of someone paid to make decisions that affect other people's lives without feeling the weight of those decisions. She holds a glass tablet — actual glass, etched with light — and scans you without meeting your eyes. "Purpose of visit. Sponsor name or institutional affiliation. Mark status." She says it in the order that tells you which one matters most to her. The lattice in the gate panels responds to the mark on your wrist before you speak. Her eyes move to your wrist. Then back to her tablet. "Category designation: Unregistered Resonant." She has a form for this. She always has a form.`,
    effectsOnEnter: { setFlags: ['gate_officer_met'] },
    choices: [
      {
        id: 'c5_gate_try_charisma',
        text: '[Roll dice — Charisma] Negotiate your way through. You have enough truth to make a believable story.',
        nextNode: 'c5_gate_granted_entry',
        diceCheck: {
          stat: 'charisma',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c5_gate_granted_entry',
          failureNode: 'c5_gate_prisoner_route',
        },
      },
      {
        id: 'c5_gate_try_sneak',
        text: '[Roll dice — Agility] There is a maintenance access panel behind the east support column. Three seconds, if you move correctly.',
        nextNode: 'c5_gate_granted_entry',
        diceCheck: {
          stat: 'agility',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c5_gate_granted_entry',
          failureNode: 'c5_gate_prisoner_route',
        },
      },
      {
        id: 'c5_gate_saints_rep',
        text: '[Iron Saints rep ≥ 15] Produce the Saints\' documentation. An Iron Saints registered mark is not an unaffiliated threat — it is a resource with a chain of custody.',
        nextNode: 'c5_gate_saints_leverage',
        requirements: { factionRep: { ironSaints: 15 } },
        effects: { ironSaints: -5, glassCourt: 5 },
      },
      {
        id: 'c5_gate_noble_card',
        text: '[Fallen Noble] You know the Glass Court\'s social architecture better than this guard does. Use it.',
        nextNode: 'c5_gate_fallen_noble',
        requirements: { backgrounds: ['fallen_noble'] },
        isHidden: true,
      },
      {
        id: 'c5_gate_courier_contact',
        text: '[Black Market Courier] The name Harlan Voss. Every courier knows that name and every Glass Court door has a procedure for it.',
        nextNode: 'c5_gate_courier',
        requirements: { backgrounds: ['black_market_courier'] },
        isHidden: true,
      },
      {
        id: 'c5_gate_soldier_read',
        text: '[Exiled Soldier] Read the guard\'s training — Iron Saints-adjacent, which means her blind spot is on the left. Navigate it.',
        nextNode: 'c5_gate_granted_entry',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { intelligence: 1, setFlags: ['entered_glass_court_as_servant'] },
        isHidden: true,
      },
      {
        id: 'c5_gate_surrender_as_subject',
        text: 'Disclose the mark fully. Let them classify you. It gets you inside.',
        nextNode: 'c5_gate_prisoner_route',
        effects: { morale: -3, setFlags: ['entered_glass_court_as_prisoner'] },
      },
    ],
  },

  {
    id: 'c5_gate_saints_leverage',
    chapter: 'Chapter 5',
    title: 'The Saints\' Papers',
    location: 'Glass Gate — Processing Arch',
    imageKey: 'glass_gate',
    text: `The Iron Saints documentation changes her expression in the specific way that institutional credentials change the expressions of people whose authority derives from institutions. She examines the chain-and-flame seal, the registration number, the Category One notation. "Iron Saints registered resonant. Referral basis — voluntary transfer for extraction consultation." She makes a note. She does not ask why you are transferring. The Glass Court and the Iron Saints have a working relationship that neither acknowledges publicly, and this moment is part of that relationship. "Glass Gate ID: GC-TEMP-4471. Your access is provisional and monitored." She hands you a glass chip. It is warm. The mark makes it warmer.`,
    effectsOnEnter: { glassCourt: 10, setFlags: ['entered_glass_court_as_guest', 'saints_credentials_used'] },
    choices: [
      {
        id: 'c5_saints_proceed',
        text: 'Take the chip. Proceed.',
        nextNode: 'c5_gate_granted_entry',
      },
    ],
  },

  {
    id: 'c5_gate_fallen_noble',
    chapter: 'Chapter 5',
    title: 'Old Money',
    location: 'Glass Gate — Processing Arch',
    imageKey: 'glass_gate',
    text: `You invoke the name the way your family taught you: quietly, with the specific confidence of someone who has never had to raise their voice for a door to open. The guard's posture changes before she fully processes what she heard — old money is recognizable in this city not by what it says but by the way it expects to be heard. "The Vale family processes legacy claimants through the East Wing," she says. She checks something on her tablet, looks at you once, looks at the mark, looks at you again. "Your name is not in the verified registry." You tell her it wouldn't be. Not yet. She processes this. Then she opens the gate.`,
    effectsOnEnter: { glassCourt: 15, setFlags: ['entered_glass_court_as_guest', 'noble_identity_implied'] },
    choices: [
      {
        id: 'c5_noble_enter',
        text: 'Enter as if you belong here. You used to.',
        nextNode: 'c5_gate_granted_entry',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c5_gate_courier',
    chapter: 'Chapter 5',
    title: 'The Contact Name',
    location: 'Glass Gate — Processing Arch',
    imageKey: 'glass_gate',
    text: `The name lands like a dropped instrument — the guard's professional composure has a specific seam where courier network knowledge presses against it. Harlan Voss is not a name you speak at a gate. It is a name that opens gates by existing. She does not write anything on her tablet. She waves you through with the specific efficiency of someone who understands that certain things are not recorded. Inside the gate, a different guard — older, wearing a plain grey jacket with no insignia — finds you within thirty seconds. "Voss sends better material these days," he says. He is not being kind. "I'll walk you up."`,
    effectsOnEnter: { glassCourt: 10, hollowChildren: -5, setFlags: ['entered_glass_court_as_guest', 'courier_contact_used'] },
    choices: [
      {
        id: 'c5_courier_follow',
        text: 'Follow the contact. You can decide later whether Voss is an asset or a liability.',
        nextNode: 'c5_gate_granted_entry',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_gate_prisoner_route',
    chapter: 'Chapter 5',
    title: 'Category Resonant',
    location: 'Glass Gate — Intake Processing',
    imageKey: 'glass_gate',
    text: `The processing is efficient in the way that processing tends to be when the thing being processed does not have the ability to object. A different form. A different room — smaller, behind the main gate, lit by the same sourceless white light you will come to recognize as the Glass Court's aesthetic choice. They remove nothing from you, which is its own kind of statement: they are not afraid of anything you carry. A young technician scans the mark with a device that makes it flare orange, then blue, then a color you do not have a name for. She writes a number. You are GC-RES-1048. You are the 1048th resonant the Glass Court has catalogued. The number does not feel small.`,
    effectsOnEnter: { setFlags: ['entered_glass_court_as_prisoner', 'registered_resonant_1048'], glassCourt: -5, morale: -5 },
    choices: [
      {
        id: 'c5_prisoner_comply',
        text: 'Comply completely. Compliance gives you time to understand the system before you use it.',
        nextNode: 'c5_ascension_elevator',
        effects: { intelligence: 2 },
      },
      {
        id: 'c5_prisoner_resist_gently',
        text: 'Comply but ask questions. Know who is making decisions about you.',
        nextNode: 'c5_ascension_elevator',
        effects: { glassCourt: -3, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_gate_granted_entry',
    chapter: 'Chapter 5',
    title: 'Admitted',
    location: 'Glass Gate — Entry Hall',
    imageKey: 'glass_gate',
    text: `The gate opens and the city changes again. The entry hall is fifteen metres of white marble and controlled temperature — the first controlled temperature you have felt in however many months it has been since the blackout. The light here is not emergency light or arc-lamp or fire. It is a calibrated approximation of sunlight, pleasant and false. People move through the hall in both directions. Some of them are wearing clothes. Some of them are wearing what clothes have become when you have money: a deliberate statement about the existence of money. No one looks at your wrist. That is its own kind of information.`,
    effectsOnEnter: { morale: 2 },
    choices: [
      {
        id: 'c5_entry_take_elevator',
        text: 'Follow the flow toward the Ascension Elevator. That is the direction everything worth seeing is pointing.',
        nextNode: 'c5_ascension_elevator',
      },
    ],
  },

  // ── ASCENSION ELEVATOR ──────────────────────────────────────────────────────

  {
    id: 'c5_ascension_elevator',
    chapter: 'Chapter 5',
    title: 'The Ascension Elevator',
    location: 'The Ascension Elevator — Ground Platform',
    imageKey: 'ascension_elevator',
    text: `The elevator is a column of glass in the centre of the building — a single continuous shaft running from the basement processing level to whatever is at the top of the tower, which you cannot see from here. The cars are large and transparent, and they move with the smoothness of something maintained. There are fourteen floors visible from the ground. The floors below ground are not visible. You note this. Standing near the call panel, pretending to check the schedule display, is a young person in grey service clothes whose hands are doing something — subtle, practised — that is not what their posture is pretending. They see you see them. They do not move.`,
    effectsOnEnter: { setFlags: ['ascension_elevator_reached'] },
    choices: [
      {
        id: 'c5_elev_enter_car',
        text: 'Step into the next car when it arrives. Standard entry, nothing complicated.',
        nextNode: 'c5_elevator_juno_first',
      },
      {
        id: 'c5_elev_approach_figure',
        text: 'Approach the figure in grey first. What they\'re pretending to do is less interesting than what they\'re actually doing.',
        nextNode: 'c5_elevator_juno_first',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_elevator_juno_first',
    chapter: 'Chapter 5',
    title: 'Juno',
    location: 'The Ascension Elevator — Car Three',
    imageKey: 'ascension_elevator',
    speaker: 'Juno',
    text: `They end up in the same car as you, which is not a coincidence. The elevator moves. They speak without turning their head: "You have the mark, which means you're either here to be studied or here to be used, and those are the same thing from the Court's perspective. I'm Juno. I serve on Level 9. I am also something more specific than that, but this is not the conversation for that." They look at you now, direct and quick, their eyes reading you with a precision that doesn't match the service uniform. "If you're GC-Res classification, you have twelve hours before Varr's team runs the initial extraction protocol on you. If you're here by another door, you have longer but the same endpoint. The question is what you do with the time."`,
    dialogue: 'You have twelve hours before Varr\'s team runs extraction protocol. The question is what you do with the time.',
    effectsOnEnter: { setFlags: ['met_juno'] },
    choices: [
      {
        id: 'c5_juno_trust_immediately',
        text: '"Tell me what you are. More specific than a servant."',
        nextNode: 'c5_white_atrium_arrive',
        effects: { intelligence: 2, setFlags: ['juno_trusted_early'] },
      },
      {
        id: 'c5_juno_cautious',
        text: 'Acknowledge what she said. Don\'t give anything back yet.',
        nextNode: 'c5_white_atrium_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_juno_ask_help',
        text: '"What do you want in exchange for knowing what I should do with the time?"',
        nextNode: 'c5_white_atrium_arrive',
        effects: { setFlags: ['juno_negotiation_opened'] },
      },
    ],
  },

  // ── WHITE ATRIUM ────────────────────────────────────────────────────────────

  {
    id: 'c5_white_atrium_arrive',
    chapter: 'Chapter 5',
    title: 'The White Atrium',
    location: 'The White Atrium — Level 7',
    imageKey: 'white_atrium',
    text: `The Atrium occupies the entire seventh floor — the walls are glass panels looking outward at a sky you had stopped expecting to see, and inward at a space designed with the specific intent of making you feel that you have arrived somewhere that matters. White stone flooring. Real plants in iron pots. Light that has been engineered to make everything look healthier than it is. People move through it with the ease of people who do not have to think about where their next meal comes from, and the slight distance between them and the world below the glass has the quality of a posture that has been held for so long it no longer feels like effort. The mark on your wrist is quiet here. Unusually quiet. Something in the building is suppressing it.`,
    effectsOnEnter: { morale: 1, setFlags: ['white_atrium_reached'] },
    choices: [
      {
        id: 'c5_atrium_wait_for_seraphine',
        text: 'Wait. If you\'re expected, someone will come to you. If you\'re not, you\'ll learn something from who doesn\'t come.',
        nextNode: 'c5_atrium_seraphine_entrance',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_atrium_explore_briefly',
        text: 'Use the time before you\'re noticed to map the Atrium. Know the exits.',
        nextNode: 'c5_atrium_seraphine_entrance',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_atrium_seraphine_entrance',
    chapter: 'Chapter 5',
    title: 'Lady Seraphine Vale',
    location: 'The White Atrium — Central Plaza',
    imageKey: 'white_atrium',
    text: `She enters from the north corridor and the room responds to her the way a room responds to someone who has calibrated it to do exactly that. Lady Seraphine Vale is dressed in white and grey — not because she lacks options, but because the simplicity is a performance of restraint that costs more than complexity would. She is perhaps fifty, and she moves like someone who decided long ago that age is a resource rather than a liability. She sees you from across the Atrium and does not pretend she was going somewhere else. She walks toward you with the directness of someone who has had every door opened for her for so long that she has forgotten doors require opening. She stops at the correct distance: close enough to be intimate, far enough to be evaluating.`,
    effectsOnEnter: { setFlags: ['seraphine_entering'] },
    choices: [
      {
        id: 'c5_seraphine_wait_she_speaks',
        text: 'Wait. Let her speak first. She came to you.',
        nextNode: 'c5_seraphine_first_words',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_seraphine_greet_first',
        text: 'Greet her first. Control the first moment of the conversation.',
        nextNode: 'c5_seraphine_first_words',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c5_seraphine_first_words',
    chapter: 'Chapter 5',
    title: 'The Mistress of the Court',
    location: 'The White Atrium — Central Plaza',
    imageKey: 'white_atrium',
    speaker: 'Lady Seraphine Vale',
    text: `"The mark is at saturation level four." She says it the way a doctor says a diagnosis — not unkindly, not cruelly, just with the precise weight of accuracy. "We have had forty-seven resonants through this facility in three years. Two survived the extraction process intact. Seventeen are still in the ward. The rest are —" she pauses, not with regret, but with the care of someone selecting the correct word "— no longer useful for study." She looks at your wrist as she would look at a remarkable painting. "You are the first to arrive voluntarily. That tells me something about you that the mark alone does not. I would like to know what it tells me about your intelligence."`,
    dialogue: 'Two of forty-seven survived intact. You arrived voluntarily. What does that tell you about your intelligence?',
    effectsOnEnter: { setFlags: ['met_lady_seraphine'] },
    choices: [
      {
        id: 'c5_sera_respond_pragmatic',
        text: '"It tells you I\'m trading something for something. The question is what you\'re offering."',
        nextNode: 'c5_seraphine_offer',
        effects: { glassCourt: 5 },
      },
      {
        id: 'c5_sera_respond_defiant',
        text: '"It tells you I\'m not afraid. Which is different from being stupid."',
        nextNode: 'c5_seraphine_offer',
        effects: { morale: 2, glassCourt: -5 },
      },
      {
        id: 'c5_sera_respond_honest',
        text: '"It tells you I ran out of better options. Which you already knew."',
        nextNode: 'c5_seraphine_offer',
        effects: { glassCourt: 3, miraTrust: 1 },
      },
    ],
  },

  {
    id: 'c5_seraphine_offer',
    chapter: 'Chapter 5',
    title: 'The Theater',
    location: 'The White Atrium — Central Plaza',
    imageKey: 'white_atrium',
    speaker: 'Lady Seraphine Vale',
    text: `She gestures to a seating area that has materialized at the edge of the Atrium — someone placed chairs there and arranged them exactly for this conversation, which means this conversation was expected. "I will be direct," she says, sitting with the ease of someone who has never sat in an uncomfortable chair. "The Glass Court requires the mark's transmission capacity for a project that is almost complete. In exchange for your cooperation — not your submission, there is a distinction — you will have access to the court's resources, its protection, its medical care, and the specific information that your mark has been trying to reach for the last three years." She leans forward slightly. "We know where the signal goes. We have always known. We have simply been waiting for a marked individual willing to control the transmission rather than be controlled by it."`,
    dialogue: 'We know where the signal goes. We have been waiting for someone willing to control the transmission.',
    effectsOnEnter: { setFlags: ['seraphine_offer_heard'] },
    choices: [
      {
        id: 'c5_seraphine_accept_ally',
        text: '"Tell me what cooperation looks like in practical terms. All of it."',
        nextNode: 'c5_seraphine_ally_accept',
        effects: { glassCourt: 10, setFlags: ['glass_court_alliance_possible'] },
      },
      {
        id: 'c5_seraphine_refuse_terms',
        text: '"I\'m not cooperating with an organization that has seventeen people in a ward. Tell me what you are before you tell me what I can get."',
        nextNode: 'c5_seraphine_refuse',
        effects: { glassCourt: -5, morale: 3, setFlags: ['glass_court_hostile'] },
      },
      {
        id: 'c5_seraphine_ask_cael',
        text: 'Look past her to the man at the edge of the atrium who has been pretending to read for the last four minutes.',
        nextNode: 'c5_lord_cael_intro',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_seraphine_ally_accept',
    chapter: 'Chapter 5',
    title: 'Terms',
    location: 'The White Atrium — North Alcove',
    imageKey: 'white_atrium',
    speaker: 'Lady Seraphine Vale',
    text: `She explains the terms with the precision of someone who wrote them in advance and has been waiting to deliver them. Access to Level 9 — the research floors, including Varr's clinic and the Observatory. Full mobility within the Tower with a provisional pass. Medical attention from the Court's physicians, who are the best-trained in the metro system because they have been practicing on people who had no choice about being their patients. In exchange: a guided extraction session with Director Varr, monitored, voluntary, with the explicit understanding that you retain the mark at the end. "No extraction has worked on a cooperative subject," she admits. "You would be the first." She holds out a glass chip — a higher tier than the gate pass. Warm. The mark pulls toward it.`,
    effectsOnEnter: { glassCourt: 15, setFlags: ['seraphine_terms_heard'] },
    choices: [
      {
        id: 'c5_ally_take_chip',
        text: 'Take the chip. You have better odds working with her than against her — for now.',
        nextNode: 'c5_lord_cael_intro',
        effects: { glassCourt: 5, setFlags: ['glass_court_provisional_ally'] },
      },
      {
        id: 'c5_ally_need_time',
        text: '"I\'ll consider it. I want to see the facility first."',
        nextNode: 'c5_lord_cael_intro',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_ally_accept_fully',
        text: '"Yes to all of it. The extraction session. The cooperation. Whatever Varr needs. I want access and I want protection."',
        nextNode: 'c5_noble_pet_end',
        effects: { glassCourt: 20, setFlags: ['glass_court_full_ally', 'accepted_resonant_companion'] },
      },
    ],
  },

  {
    id: 'c5_seraphine_refuse',
    chapter: 'Chapter 5',
    title: 'The Refusal',
    location: 'The White Atrium — Central Plaza',
    imageKey: 'white_atrium',
    speaker: 'Lady Seraphine Vale',
    text: `She takes the refusal with the equanimity of someone who has more options than you do. "The ward is a medical facility," she says. "The individuals there are receiving care that no other institution in the metro system can provide." She does not believe this fully — you can see the place where the belief ends and the policy begins. "I respect the objection. I will not rescind the access. The Glass Court is not the Iron Saints — we do not process disagreement with purification protocols." She stands. "Walk the Court. Form your own conclusions. We can speak again when you have more information." She leaves the way she arrived: with the room adjusted to accommodate her exit.`,
    effectsOnEnter: { glassCourt: -5, morale: 2 },
    choices: [
      {
        id: 'c5_refuse_proceed',
        text: 'Proceed into the Court. She is right that you need more information.',
        nextNode: 'c5_lord_cael_intro',
      },
    ],
  },

  {
    id: 'c5_lord_cael_intro',
    chapter: 'Chapter 5',
    title: 'Lord Cael Orison',
    location: 'The White Atrium — Reading Corner',
    imageKey: 'white_atrium',
    speaker: 'Lord Cael Orison',
    text: `He puts the book down when you're close enough, and the book-as-prop drops away with it. Lord Cael Orison is perhaps forty, with the kind of face that has been arranged by years of knowing exactly how it is perceived. His charm is the kind that you only recognize as a skill after it has already worked on you. "She offered you the standard terms," he says, as if Seraphine is a weather pattern he has learned to read. "The standard terms are good terms. The Court is a better arrangement than the Saints and considerably better than the tunnels. The issue — and there is always an issue — is what Varr does with what he learns from the extraction session." He tilts his head. "I am Lord Cael. I function as something like an ambassador between Seraphine's idealism and the Court's actual politics. I am also the most useful person in this building to have on your side, and I'd like you to consider why I'm choosing to tell you this."`,
    dialogue: 'The standard terms are good. The issue is what Varr does with what he learns.',
    effectsOnEnter: { setFlags: ['met_lord_cael'] },
    choices: [
      {
        id: 'c5_cael_ask_why_honest',
        text: '"Why are you choosing to tell me this? Give me the honest answer."',
        nextNode: 'c5_cael_proposition',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_cael_trust_provisionally',
        text: 'Engage. He has information you need and he wants something you have. That is a conversation.',
        nextNode: 'c5_cael_proposition',
      },
    ],
  },

  {
    id: 'c5_cael_proposition',
    chapter: 'Chapter 5',
    title: 'The Useful Man',
    location: 'The White Atrium — Reading Corner',
    imageKey: 'white_atrium',
    speaker: 'Lord Cael Orison',
    text: `"The honest answer is that the mark you carry is the most politically valuable object in this city," he says, "and I have been watching Seraphine and Varr position themselves to control it for three years. I am not interested in controlling it. I am interested in what happens to the city after whatever the mark is going to do has happened — and for that, I need the person carrying it to be capable of making choices after the fact." He leans back. "I can navigate you through the Court's social architecture. The research floors, the Council, the auction calendar. In exchange, you tell me what the mark has shown you so far. The Bellkeeper. The shore. What Toma said. None of it leaves this room." He is either a genuine ally or the most sophisticated trap you have encountered. The distinction may not matter until later.`,
    effectsOnEnter: { setFlags: ['cael_proposition_heard'] },
    choices: [
      {
        id: 'c5_cael_share_some',
        text: 'Share what you know. Partial truth is still leverage — and he already knows more than he should.',
        nextNode: 'c5_atrium_hub',
        effects: { glassCourt: 5, intelligence: 2, setFlags: ['cael_partial_briefing'] },
      },
      {
        id: 'c5_cael_deflect',
        text: '"I\'ll walk the Court. If what I see confirms you\'re useful, we talk."',
        nextNode: 'c5_atrium_hub',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_cael_tactician_assess',
        text: '[Tactician] Map the room before answering. His position, sight lines, what Seraphine\'s people can hear.',
        nextNode: 'c5_cael_cain_warns',
        requirements: { classes: ['tactician'] },
        effects: { intelligence: 3 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c5_cael_cain_warns',
    chapter: 'Chapter 5',
    title: 'What Cain Knows',
    location: 'The White Atrium — Reading Corner',
    imageKey: 'white_atrium',
    speaker: 'Cain',
    text: `Cain positions himself between you and Cael before you can answer — he has been watching from the edge of the alcove and the tactical assessment happened before you finished speaking. He does not look at Cael. He looks at you. "The Iron Saints had a unit designation for Glass Court-associated intelligence assets," he says quietly. "The designation was 'Warden.' Three Saints who defected for Court money were re-designated Wardens. None of them survived more than four months in Court employment." He finally glances at Cael. "What happened to Warden Unit Seven?" Cael's charm does not waver, but it takes slightly longer than it should. "An unfortunate operational casualty," he says. Cain looks back at you. The judgment in his face is not anger. It is information.`,
    effectsOnEnter: { setFlags: ['cael_warden_known'] },
    choices: [
      {
        id: 'c5_cain_warn_noted',
        text: 'Note it. Thank Cain quietly. Proceed with more information than before.',
        nextNode: 'c5_atrium_hub',
        effects: { cainTrust: 1, setFlags: ['cain_refused_glass_court_deal'] },
      },
      {
        id: 'c5_cain_warn_override',
        text: 'Note it. Proceed anyway. You are not a Saints soldier and you have different options.',
        nextNode: 'c5_atrium_hub',
      },
    ],
  },

  {
    id: 'c5_atrium_hub',
    chapter: 'Chapter 5',
    title: 'The Glass Court',
    location: 'The White Atrium — Level 7',
    imageKey: 'white_atrium',
    text: `The Court opens before you. The access pass — or the provisional clearance, or whatever arrangement got you past the gate — gives you movement. The Atrium connects to the Court's main arteries: the Hunger Gallery on Level 6, which Juno mentioned without naming; the Orchid Clinic on Level 8, which appears on the directional panels as a "medical research suite"; the Mirror Ballroom on Level 10; the Servant Quarters behind the service corridor on Level 7; the Sky Garden on Level 11; the Cracked Observatory somewhere above that. The Private Auction Hall is listed only on the restricted panel, which means it is either hidden or you are not cleared for it yet. The Council Chamber occupies the top floor. The mark is quiet in all directions. Not peaceful. Listening.`,
    effectsOnEnter: { setFlags: ['court_access_established'] },
    choices: [
      {
        id: 'c5_hub_go_gallery',
        text: 'The Hunger Gallery. Level 6. You want to understand this place before it understands you.',
        nextNode: 'c5_hunger_gallery_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_hub_go_clinic',
        text: 'The Orchid Clinic. If Varr is the threat Seraphine named, you want to meet him on your own terms.',
        nextNode: 'c5_orchid_clinic_arrive',
      },
      {
        id: 'c5_hub_go_quarters',
        text: 'The Servant Quarters. Juno said she served on Level 9. Find her properly.',
        nextNode: 'c5_servant_quarters_arrive',
        effects: { setFlags: ['seeking_juno'] },
      },
      {
        id: 'c5_hub_go_ballroom',
        text: 'The Mirror Ballroom. Level 10. The mark responded strangely when you passed the elevator\'s tenth floor indicator.',
        nextNode: 'c5_mirror_ballroom_arrive',
        effects: { corruption: 1 },
      },
      {
        id: 'c5_hub_go_garden',
        text: 'The Sky Garden. Highest accessible floor. See the city from above before deciding anything.',
        nextNode: 'c5_sky_garden_arrive',
      },
      {
        id: 'c5_hub_go_council',
        text: 'The Council Chamber. Skip the rest. You have what you need.',
        nextNode: 'c5_council_arrive',
        requirements: { flags: ['discovered_blackout_was_planned', 'discovered_marks_are_not_unique'] },
        effects: { morale: 2 },
      },
    ],
  },

  // ── HUNGER GALLERY ──────────────────────────────────────────────────────────

  {
    id: 'c5_hunger_gallery_arrive',
    chapter: 'Chapter 5',
    title: 'The Hunger Gallery',
    location: 'The Hunger Gallery — Level 6',
    imageKey: 'hunger_gallery',
    text: `The Gallery occupies the east face of Level 6 and looks outward through the glass panels at the ruined city below. But it is not arranged as a viewing gallery. It is arranged as an art exhibit. The frames on the walls are photographs — documentation, clinical and clean — of the city below as it was three years ago, one year ago, last month. Resource maps. Population density grids. Caloric deficit projections by district. The people looking at these photographs are eating. There is a service table along the west wall with small plates of food that represent quantities the photographs suggest people below are not seeing in a week. Two Court officials are examining a photograph of the Hollow Children's tunnel district with the close attention of collectors studying a particularly interesting piece. The mark burns, quietly, with the specific heat of anger rather than fear.`,
    effectsOnEnter: { morale: -3, setFlags: ['hunger_gallery_seen'] },
    choices: [
      {
        id: 'c5_gallery_study_data',
        text: 'Study the documentation. Know what the Court knows about the city below.',
        nextNode: 'c5_gallery_display',
        effects: { intelligence: 2 },
      },
      {
        id: 'c5_gallery_eat',
        text: 'Eat. You need the calories and you are not going to achieve anything on principle.',
        nextNode: 'c5_gallery_display',
        effects: { hunger: 10, morale: -2 },
      },
    ],
  },

  {
    id: 'c5_gallery_display',
    chapter: 'Chapter 5',
    title: 'The Documentation',
    location: 'The Hunger Gallery — East Wall',
    imageKey: 'hunger_gallery',
    text: `The documentation is worse than the photographs. The resource allocation projections show that the Glass Court controls eighty percent of the functioning power infrastructure in the metro district. The food synthesis records indicate they have been capable of producing caloric surplus for the tunnel network for fourteen months — and have not. The medical supply manifests show quantities of medicine in Court storage that would address every crisis Mira has described in the tunnels. None of it has moved. There is a notation on the most recent projection, handwritten in a style you recognise as administrative rather than political: "Excess distribution destabilises control economics. Maintain scarcity at 73%." Someone made this decision. Someone reviewed it. Someone filed it in a gallery where people eat small plates and look at it as if it is art.`,
    effectsOnEnter: { morale: -4, intelligence: 2, setFlags: ['glass_court_data_seen'] },
    choices: [
      {
        id: 'c5_gallery_shadow_read',
        text: '[Shadow Broker] The handwriting on the projection is a high-level administrative hand. Identify the author.',
        nextNode: 'c5_gallery_shadow_broker',
        requirements: { classes: ['shadow_broker'] },
        isHidden: true,
      },
      {
        id: 'c5_gallery_cain_check',
        text: 'Check where Cain is. This is the kind of information that requires a witness.',
        nextNode: 'c5_gallery_cain_political',
        requirements: { cainPresent: true },
        effects: { cainTrust: 1 },
      },
      {
        id: 'c5_gallery_take_notes',
        text: 'Document what you can remember. This is evidence.',
        nextNode: 'c5_gallery_hollow_sell',
        effects: { intelligence: 1, setFlags: ['gallery_evidence_noted'] },
      },
    ],
  },

  {
    id: 'c5_gallery_shadow_broker',
    chapter: 'Chapter 5',
    title: 'The Author',
    location: 'The Hunger Gallery — East Wall',
    imageKey: 'hunger_gallery',
    text: `The handwriting identifies itself once you know what to look for: a specific loop on the lower-case 'g', a habit of compressing numbers. You have seen this style on Iron Saints documentation — specifically on the Saints' supply route calculations, which were produced by a Court-trained administrator before the Saints absorbed their administrative function. The person who wrote "Maintain scarcity at 73%" also wrote the Iron Saints' first-year resource allocation. The Saints and the Court share an administrative lineage that neither acknowledges publicly. You file this. The information is worth considerably more than you currently have to pay for it, which means you keep it until you find someone who can match the price.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['saints_court_admin_link_found'], lastArchive: 5 },
    choices: [
      {
        id: 'c5_shadow_proceed',
        text: 'Store it. Move forward.',
        nextNode: 'c5_gallery_cain_political',
        effects: { glassCourt: -5 },
      },
    ],
  },

  {
    id: 'c5_gallery_cain_political',
    chapter: 'Chapter 5',
    title: 'Cain\'s Assessment',
    location: 'The Hunger Gallery — West Alcove',
    imageKey: 'hunger_gallery',
    speaker: 'Cain',
    text: `Cain finds the documentation in approximately four minutes, which means he was already reading it before you noticed him. He stands at the resource map for a long time. When he speaks, his voice is the voice he uses when he is being careful with something that matters to him. "The Saints requisitioned supplies under a Glass Court allocation code three months ago," he says. "I signed the request. I thought it was standard inter-faction logistics." He does not look at you. He is looking at the map. "I was used for a transaction I didn't understand. I don't —" He stops. "Lord Cael made me an offer this morning. Access to the Court's records on the Saints' supply network. In exchange for information about you." His jaw works. "I didn't answer him."`,
    dialogue: 'Lord Cael offered me access to Saints records in exchange for information about you. I didn\'t answer him.',
    effectsOnEnter: { setFlags: ['cain_court_offer_revealed'] },
    choices: [
      {
        id: 'c5_cain_pol_trust',
        text: '"Thank you for telling me. Don\'t answer him."',
        nextNode: 'c5_cain_bargain_warned',
        effects: { cainTrust: 2, setFlags: ['cain_refused_glass_court_deal'] },
      },
      {
        id: 'c5_cain_pol_give_permission',
        text: '"Take the offer. See what the records say. We\'ll manage what he gets in return."',
        nextNode: 'c5_cain_bargain_warned',
        effects: { cainTrust: -1, setFlags: ['cain_deal_permitted'] },
      },
    ],
  },

  {
    id: 'c5_cain_bargain_warned',
    chapter: 'Chapter 5',
    title: 'The Offer on the Table',
    location: 'The Hunger Gallery — West Alcove',
    imageKey: 'hunger_gallery',
    text: `The weight of the Hunger Gallery's evidence sits between you and everything you decide here. The Court has resources. The Court has records. The Court also has a specific approach to marked individuals that has killed forty-five of forty-seven people it has processed. Lord Cael's offer to Cain represents a particular kind of danger — the kind that looks like help until the moment it becomes leverage. What you do with Cain's disclosure defines the relationship going forward. He is waiting. He is not afraid of the answer. He is prepared for several versions of it.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c5_warn_proceed_clinic',
        text: 'Leave the Gallery. The Orchid Clinic is the next thing you need to understand.',
        nextNode: 'c5_orchid_clinic_arrive',
      },
      {
        id: 'c5_warn_cain_betray',
        text: '[Cain present] "Take the deal. Give him what he asks for. I can work with the consequences."',
        nextNode: 'c5_cain_bargain_end',
        requirements: { cainPresent: true, flags: ['cain_deal_permitted'] },
        isHidden: true,
        effects: { cainTrust: -5, glassCourt: 15, setFlags: ['cain_made_political_bargain'] },
      },
    ],
  },

  {
    id: 'c5_gallery_hollow_sell',
    chapter: 'Chapter 5',
    title: 'The Information Price',
    location: 'The Hunger Gallery — Entry',
    imageKey: 'hunger_gallery',
    text: `One of the Court officials who was examining the Hollow Children tunnel district photograph approaches you. He introduces himself as an "acquisition analyst" with the specific quality of someone who titles themselves to avoid the word they actually mean. He knows you came from the tunnel network. He knows you have Hollow Children contacts. He offers full Glass Court provisional status — better than what Seraphine's provisional pass gives you, equivalent to a registered court researcher — in exchange for the current access codes to the Hollow Children's primary entry points. He says it like it is a business arrangement. It is a business arrangement. It is also the end of the Hollow Children's security, probably within three months.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c5_hollow_refuse_sell',
        text: 'Refuse. There is a line and the Hollow Children are on the right side of it.',
        nextNode: 'c5_orchid_clinic_arrive',
        effects: { hollowChildren: 5, morale: 2 },
      },
      {
        id: 'c5_hollow_sell_codes',
        text: 'Give him the codes. The Glass Court will find them eventually. This is the price of time inside.',
        nextNode: 'c5_hollow_deal_sealed',
        effects: { glassCourt: 20, hollowChildren: -25, morale: -5, setFlags: ['sold_out_hollow_children'] },
      },
    ],
  },

  {
    id: 'c5_hollow_deal_sealed',
    chapter: 'Chapter 5',
    title: 'The Price of Access',
    location: 'The Hunger Gallery — Entry',
    imageKey: 'hunger_gallery',
    text: `The analyst processes the codes with the efficiency of someone doing routine administrative work, which this is, for him. He hands you a glass chip — higher-tier, the color slightly different from the one Seraphine offered, which means it was prepared in advance. They expected this conversation. They knew what you had and they knew someone would eventually sell it. You are not the first person to make this calculation and you will not be the last. The codes are in the system now. The Hollow Children's primary entrances will be on the Court's access map within hours. You will not be there when it matters. The mark on your wrist pulses once, in the direction of the tunnels. It knows what you did. It does not forgive. It simply records.`,
    effectsOnEnter: { setFlags: ['hollow_access_sold'] },
    choices: [
      {
        id: 'c5_hollow_sold_continue',
        text: 'Move forward. You have access. Use it.',
        nextNode: 'c5_orchid_clinic_arrive',
        effects: { morale: -3 },
      },
    ],
  },

  // ── ORCHID CLINIC ───────────────────────────────────────────────────────────

  {
    id: 'c5_orchid_clinic_arrive',
    chapter: 'Chapter 5',
    title: 'The Orchid Clinic',
    location: 'The Orchid Clinic — Level 8',
    imageKey: 'orchid_clinic',
    text: `Level 8 smells like antiseptic and living flowers — actual flowers, growing in glass troughs along the corridor walls, white and pink and utterly out of place. The Orchid Clinic is what medical care looks like when the practitioner has unlimited resources and no ethical oversight. Equipment lines the walls: devices you do not recognise but which Mira would, her expression already moving through the calculation of what each instrument is for. The mark begins to respond as you walk the corridor — a pulling sensation, directional, as if something inside the clinic is emitting a frequency the mark knows. You have been here before. You are certain of this and you have no memory to attach the certainty to. That gap between certainty and memory is becoming familiar. You do not like it.`,
    effectsOnEnter: { setFlags: ['orchid_clinic_reached'], corruption: 1 },
    choices: [
      {
        id: 'c5_clinic_enter_main',
        text: 'Enter the clinic proper. Find Director Varr.',
        nextNode: 'c5_clinic_varr_intro',
      },
      {
        id: 'c5_clinic_medic_assess',
        text: '[Medic] Read the equipment in the corridor. Know what they are doing before you meet the person doing it.',
        nextNode: 'c5_clinic_varr_intro',
        requirements: { classes: ['medic'] },
        effects: { intelligence: 3, setFlags: ['clinic_equipment_identified'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c5_clinic_varr_intro',
    chapter: 'Chapter 5',
    title: 'Director Enoch Varr',
    location: 'The Orchid Clinic — Research Suite',
    imageKey: 'orchid_clinic',
    speaker: 'Director Enoch Varr',
    text: `He is younger than his authority suggests — perhaps thirty-five — with the specific calm of someone who has spent a long time removing emotional response from his relationship with his work. He is writing when you enter, and he finishes the sentence before he looks up. "Saturation level four," he says. "The same as the Bellkeeper's primary resonant described before he stopped being useful." He stands and approaches you with the directness of a doctor approaching a patient who has not yet been told they are a patient. "I am Director Varr. I study the marks. Every marked individual I have worked with has described the same three experiences: a direction, a shore, and a sound that feels like memory." He holds up a small glass instrument near your wrist. The mark flares orange. "You are going to tell me I'm right about all three."`,
    dialogue: 'Every marked individual describes the same three experiences. You are going to confirm all three.',
    effectsOnEnter: { setFlags: ['met_director_varr'] },
    choices: [
      {
        id: 'c5_varr_confirm_some',
        text: 'Confirm the direction and the shore. Withhold the sound.',
        nextNode: 'c5_varr_mark_exam',
        effects: { glassCourt: 5, intelligence: 1 },
      },
      {
        id: 'c5_varr_deny',
        text: '"Tell me what happened to the other resonants first. Then we\'ll see what I confirm."',
        nextNode: 'c5_varr_mark_exam',
        effects: { glassCourt: -3, morale: 2 },
      },
      {
        id: 'c5_varr_let_him_scan',
        text: 'Extend your wrist. "Study it. But I read everything you write."',
        nextNode: 'c5_varr_mark_exam',
        effects: { glassCourt: 8, corruption: 2, setFlags: ['varr_scan_permitted'] },
      },
    ],
  },

  {
    id: 'c5_varr_mark_exam',
    chapter: 'Chapter 5',
    title: 'The Examination',
    location: 'The Orchid Clinic — Examination Room',
    imageKey: 'orchid_clinic',
    speaker: 'Director Varr',
    text: `The examination takes twenty minutes. Varr works with the calm of someone who has done this enough times that it is routine and not enough times that it is boring. His instruments produce readings he writes in a notation system you cannot read. He speaks while he works — a habit of someone who processes information by vocalising it. "The saturation pattern is unusual. The layering suggests repeated, low-level transmission events rather than a single traumatic overload. This mark has been used. Deliberately, and at intervals." He pauses. "You have been navigating it. Not just experiencing it." He looks at you with what might be the first genuine interest he has expressed. "That is not something the others could do."`,
    effectsOnEnter: { intelligence: 2, setFlags: ['varr_examination_complete'] },
    choices: [
      {
        id: 'c5_exam_runaway_reveal',
        text: '[Runaway Experiment] "I have always navigated it. I did not choose the mark. Someone put it there before the blackout."',
        nextNode: 'c5_varr_multiple_marks',
        requirements: { backgrounds: ['runaway_experiment'] },
        effects: { glassCourt: 10, setFlags: ['varr_knows_experiment_origin'] },
        isHidden: true,
      },
      {
        id: 'c5_exam_ask_others',
        text: '"You said the others couldn\'t do it. What happened to them when they couldn\'t?"',
        nextNode: 'c5_varr_multiple_marks',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_exam_ask_mark_purpose',
        text: '"What is the mark for? Not what does it do. What was it built for?"',
        nextNode: 'c5_varr_multiple_marks',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_varr_multiple_marks',
    chapter: 'Chapter 5',
    title: 'Not Unique',
    location: 'The Orchid Clinic — Examination Room',
    imageKey: 'orchid_clinic',
    speaker: 'Director Varr',
    text: `He pulls a display panel from the wall — glass, back-lit, showing a schematic. You recognise the shape immediately: your wrist mark, rendered in precise clinical detail. But the schematic shows not one mark but a network of marks, seventeen unique patterns, each one slightly different, each one connected to the others by lines that pulse on the display like heartbeats. "Your mark is not unique," he says, and says it with the careful weight of a revelation that has been prepared. "It is one node in a distributed system. Seventeen confirmed marks across the metro area. Each one is a different register of the same transmission architecture. Together, they form something the schematics describe as a 'resonance lattice.' Individually, they can communicate. Together, they can do something the documentation refers to as 'completion.' I do not yet know what completion means." He pauses. "I know what incompletion looks like. I have seen it forty-five times."`,
    dialogue: 'Your mark is one node in a network. Seventeen marks form a resonance lattice. I know what incompletion looks like.',
    effectsOnEnter: { setFlags: ['discovered_marks_are_not_unique'], lastArchive: 10, intelligence: 3 },
    choices: [
      {
        id: 'c5_marks_ask_ward',
        text: '"The seventeen in the ward. They\'re the other nodes."',
        nextNode: 'c5_mira_targeted',
        requirements: { miraPresent: true },
      },
      {
        id: 'c5_marks_ask_ward_alone',
        text: '"Show me the ward. I want to see the other resonants."',
        nextNode: 'c5_experiment_ward_arrive',
      },
    ],
  },

  {
    id: 'c5_mira_targeted',
    chapter: 'Chapter 5',
    title: 'Mira',
    location: 'The Orchid Clinic — Examination Room',
    imageKey: 'orchid_clinic',
    speaker: 'Director Varr',
    text: `Varr's attention shifts to Mira before she speaks — his eyes have been tracking her since she entered the room, the specific tracking of a clinician who has found something interesting. "Your companion," he says. "She has secondary resonance markers. Not a wrist mark — a neural pattern. The kind that develops in individuals who spend extended time proximate to a saturation-four resonant without suppression. Her brain has been partially entrained to your mark's frequency." He opens another schematic. Mira's face, in the panel, is a structural diagram with annotations. "With her consent, a secondary extraction protocol could produce data on—" Mira's expression ends his sentence. But the look on his face says the offer is still on the table and will remain there regardless of what she says.`,
    effectsOnEnter: { setFlags: ['mira_targeted_by_orchid_clinic'], miraTrust: 1 },
    choices: [
      {
        id: 'c5_mira_targ_protect',
        text: 'Step between Mira and Varr. "The secondary protocol is not on offer."',
        nextNode: 'c5_mira_protect_choice',
        effects: { miraTrust: 2 },
      },
      {
        id: 'c5_mira_targ_let_decide',
        text: 'Let Mira answer for herself. She is capable of refusing.',
        nextNode: 'c5_mira_protect_choice',
      },
    ],
  },

  {
    id: 'c5_mira_protect_choice',
    chapter: 'Chapter 5',
    title: 'The Clinic\'s Interest',
    location: 'The Orchid Clinic — Corridor',
    imageKey: 'orchid_clinic',
    speaker: 'Mira',
    text: `Mira pulls you into the corridor while Varr is noting something on his display. Her voice is quiet and controlled but there is something underneath it that is not controlled. "I know what the secondary extraction does," she says. "I recognised the equipment in the entry corridor. I have seen those instruments before — not like this, not this clean, but the same technology." She stops. "I shouldn't know that. I don't know why I know that." She looks at her own hands. "He's going to try to take me regardless of what I say. They have a protocol for reluctant secondaries. It's on the consent form in Room 3 — I read it." She looks at you. "I need you to get me out of this building. Or at the very least, get me out of this floor."`,
    effectsOnEnter: { miraTrust: 2 },
    choices: [
      {
        id: 'c5_prot_agility_dodge',
        text: '[Roll dice — Agility] Get Mira out of the clinic now. Speed and direction, before Varr\'s staff can respond.',
        nextNode: 'c5_mira_protected',
        diceCheck: {
          stat: 'agility',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c5_mira_protected',
          failureNode: 'c5_mira_captured',
        },
      },
      {
        id: 'c5_prot_mira_run_cover',
        text: 'Send Mira to the service corridor while you hold Varr\'s attention.',
        nextNode: 'c5_mira_protected',
        effects: { health: -8, miraTrust: 3 },
      },
      {
        id: 'c5_prot_blade_fight',
        text: '[Blade Survivor] Move through the clinic staff physically. Clear a path.',
        nextNode: 'c5_mira_protected',
        requirements: { classes: ['blade_survivor'] },
        effects: { health: -10, glassCourt: -15, miraTrust: 2 },
        isHidden: true,
      },
      {
        id: 'c5_prot_accept_protocol',
        text: 'Accept the protocol for Mira as a condition of your own cooperation. Negotiate her safety in exchange.',
        nextNode: 'c5_mira_captured',
        effects: { glassCourt: 10, miraTrust: -5 },
      },
    ],
  },

  {
    id: 'c5_mira_protected',
    chapter: 'Chapter 5',
    title: 'Clear',
    location: 'The Orchid Clinic — Service Corridor',
    imageKey: 'orchid_clinic',
    speaker: 'Mira',
    text: `The service corridor is dimly lit and smells of cleaning solution and something sweeter underneath it that is probably the orchids from the research suites. Mira moves efficiently — she has been planning the route since she read the consent form. She stops at a junction and turns. "Thank you." She says it without qualifying it, which for Mira is significant. "I know more than I've told you about what this place is. About what the extraction does to secondary resonants. I'm going to tell you everything when we're somewhere I'm not afraid of, which is not here." She looks at her hands again. "The clinic has my neural pattern on file now. Varr wrote it down." Her jaw is set. "That's a problem we're going to have to solve before we leave."`,
    effectsOnEnter: { miraTrust: 3, setFlags: ['mira_saved_from_orchid_clinic', 'mira_neural_pattern_logged'] },
    choices: [
      {
        id: 'c5_mira_prot_go_ward',
        text: 'Head to the Experiment Ward. The seventeen resonants are the next thing you need to see.',
        nextNode: 'c5_experiment_ward_arrive',
      },
    ],
  },

  {
    id: 'c5_mira_captured',
    chapter: 'Chapter 5',
    title: 'Protocol Secondary',
    location: 'The Orchid Clinic — Suite 3',
    imageKey: 'orchid_clinic',
    text: `The clinic's secondary protocol is faster than Mira predicted — it was already in progress before the conversation in the corridor ended. Two staff members move with the efficiency of people who have done this before. Mira does not struggle. She looks at you with an expression that is not accusation and is not fear. It is something more specific: the expression of someone who is calculating, very quickly, what the options are from this position. Varr appears at the suite door. "The secondary extraction is non-invasive," he says, which is either true or the most expensive lie in the building. "It takes forty minutes." He looks at you. "You can wait, or you can use the time to see the ward. Both are informative."`,
    effectsOnEnter: { miraTrust: -4, glassCourt: 5, setFlags: ['mira_clinic_captured'] },
    choices: [
      {
        id: 'c5_cap_rescue_force',
        text: '[Roll dice — Strength] Get her out. Now. Before the suite door closes.',
        nextNode: 'c5_mira_protected',
        diceCheck: {
          stat: 'strength',
          difficulty: 16,
          diceType: 'd20',
          successNode: 'c5_mira_protected',
          failureNode: 'c5_mira_dissection_end',
        },
      },
      {
        id: 'c5_cap_go_ward',
        text: 'Go to the ward. Find leverage on Varr. Forty minutes.',
        nextNode: 'c5_experiment_ward_arrive',
        effects: { miraTrust: -2 },
      },
      {
        id: 'c5_cap_accept',
        text: 'Let the protocol proceed. You cannot save everyone from everything all at once.',
        nextNode: 'c5_experiment_ward_arrive',
        effects: { miraTrust: -5, morale: -5 },
      },
    ],
  },

  // ── EXPERIMENT WARD ─────────────────────────────────────────────────────────

  {
    id: 'c5_experiment_ward_arrive',
    chapter: 'Chapter 5',
    title: 'The Experiment Ward',
    location: 'The Experiment Ward — Level 8-B',
    imageKey: 'experiment_ward',
    text: `The ward is behind a glass door that requires a higher clearance chip than you were given — but the chip Juno palmed you in the elevator turns out to work on it, which means Juno has been planning for this visit specifically. Inside: a long room with seventeen beds arranged in two rows. Each bed has its occupant, and each occupant has a mark. The marks are all different — different locations, different patterns, different saturation levels — but they share a quality that is not visible so much as felt: the specific silence of something that has been suppressed very hard for a very long time. Some of the people in the beds are conscious. Some are watching you. One — an older woman near the window — lifts her hand when she sees the mark on your wrist. She is not waving. She is measuring. The mark responds to her like a compass to north.`,
    effectsOnEnter: { setFlags: ['experiment_ward_accessed'], morale: -4, corruption: 1 },
    choices: [
      {
        id: 'c5_ward_approach_woman',
        text: 'Approach the woman who measured you. She has information and she is choosing to share it.',
        nextNode: 'c5_ward_marked_found',
      },
      {
        id: 'c5_ward_read_files',
        text: 'Read the medical files on the wall panels first. Know what you\'re looking at before you interact with it.',
        nextNode: 'c5_ward_marked_found',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_ward_marked_found',
    chapter: 'Chapter 5',
    title: 'The Resonants',
    location: 'The Experiment Ward — Bed Row A',
    imageKey: 'experiment_ward',
    text: `The woman's name is Dessa and she has been in the ward for eleven months. She tells you this without preamble, in the tone of someone who has been waiting to tell someone and has run out of patience for the right moment. "They take readings," she says. "They don't extract — not anymore, not since the seventeenth died. They're afraid to extract now that they know we're networked. They're afraid of what happens to the lattice if a node goes dark." She looks at the mark on your wrist with the recognition of someone who knows the language. "You're running at four. That's higher than anyone in this room." She pauses. "They're going to try to find someone to run the transmission at full power. A controlled send. They've been looking for a four." She means you.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['dessa_met', 'ward_resonants_found'] },
    choices: [
      {
        id: 'c5_ward_ask_seventeen',
        text: '"How many of the seventeen can leave right now? If I could open this ward."',
        nextNode: 'c5_ward_seventeen_revealed',
        effects: { hollowChildren: 5 },
      },
      {
        id: 'c5_ward_ask_transmission',
        text: '"What does a controlled send do? What happens to the other nodes?"',
        nextNode: 'c5_ward_seventeen_revealed',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_ward_seventeen_revealed',
    chapter: 'Chapter 5',
    title: 'Seventeen',
    location: 'The Experiment Ward — Bed Row A',
    imageKey: 'experiment_ward',
    speaker: 'Dessa',
    text: `"Eight can walk," she says. "Four can walk slowly. Five cannot." She glances toward the door. "The Court knows we're networked. What they don't know — and what you should know — is that we've been using the network. Quietly. We've been transmitting between each other for seven months. Low-level, below what Varr's instruments can detect at their current calibration." She leans forward. "We know what the shore is. We know what the transmission is for. We have been waiting for a four to confirm it." She holds your gaze. "The Glass Court didn't know about the blackout. They guessed, based on the marks. But we know." She touches the mark on her collarbone. "It carries the memory of the night. All of it. Every node carries one piece. Yours carries the last piece. The one that makes it complete."`,
    dialogue: 'Yours carries the last piece. The one that makes the memory complete.',
    effectsOnEnter: { setFlags: ['ward_seventeen_truth', 'lattice_network_known'], lastArchive: 15, intelligence: 3 },
    choices: [
      {
        id: 'c5_ward_try_free_all',
        text: '[Roll dice — Agility] Get the eight who can walk out now. Use Juno\'s chip. Move.',
        nextNode: 'c5_ward_freed',
        diceCheck: {
          stat: 'agility',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c5_ward_freed',
          failureNode: 'c5_orchid_table_end',
        },
      },
      {
        id: 'c5_ward_take_evidence',
        text: 'Document the ward. Take what Dessa knows and turn it into evidence you can use against the Court.',
        nextNode: 'c5_ward_choice',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_ward_choice',
    chapter: 'Chapter 5',
    title: 'What to Do With It',
    location: 'The Experiment Ward — Data Panel',
    imageKey: 'experiment_ward',
    text: `The ward's data panels hold three years of extraction records. Names, mark patterns, saturation levels, procedure notes, outcome classifications. Outcome classifications have four categories: "Partial Success," "Null Result," "Adverse Outcome," and "Discontinued." Discontinued appears forty-five times. You can transfer this data with Juno's chip. You can also use it — as evidence to expose the Court to other factions, as leverage against Seraphine, or as documentation for whatever comes after this building. The ward's patients are watching you make this decision. They have been waiting for someone to make it. They are not unanimous about what the correct choice is.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c5_ward_expose_saints',
        text: 'Take the data and flag it for Iron Saints review. Whatever their faults, they process violations of the purification doctrine.',
        nextNode: 'c5_ward_evidence',
        effects: { ironSaints: 10, glassCourt: -15, setFlags: ['exposed_experiment_ward', 'ward_data_to_saints'] },
      },
      {
        id: 'c5_ward_expose_hollow',
        text: 'Take the data for the Hollow Children. They need to know what the Court has done.',
        nextNode: 'c5_ward_evidence',
        effects: { hollowChildren: 15, glassCourt: -15, setFlags: ['exposed_experiment_ward', 'ward_data_to_hollow'] },
      },
      {
        id: 'c5_ward_keep_evidence',
        text: 'Take the data and keep it. Use it as leverage when you need it.',
        nextNode: 'c5_ward_evidence',
        effects: { glassCourt: -5, setFlags: ['ward_evidence_held'] },
      },
      {
        id: 'c5_ward_leave_undisturbed',
        text: 'Leave the data. Don\'t trigger an alert. Keep your access clean.',
        nextNode: 'c5_ward_evidence',
        effects: { glassCourt: 5 },
      },
    ],
  },

  {
    id: 'c5_ward_freed',
    chapter: 'Chapter 5',
    title: 'Eight Clear',
    location: 'The Experiment Ward — Service Exit',
    imageKey: 'experiment_ward',
    text: `The eight who can walk are out in ninety seconds. Dessa moves last, which tells you what you need to know about her. The service exit takes them to the maintenance shaft between Levels 8 and 7 — Juno's network, which Juno built specifically for this kind of movement. The five who cannot walk are a different problem and you cannot solve it in this window. Dessa looks back at them from the shaft entrance. Her face is doing something complicated. "We carry what we know," she says. "The ones who are staying — they know their piece. If you complete the transmission, it doesn't matter that they're still in the ward. Their piece will have arrived." It is not comfort. It is something more useful than comfort. It is information she has decided to believe.`,
    effectsOnEnter: { setFlags: ['ward_prisoners_freed'], hollowChildren: 15, glassCourt: -20, morale: 5 },
    choices: [
      {
        id: 'c5_ward_free_proceed',
        text: 'Move. The ward alert will trigger within minutes.',
        nextNode: 'c5_ward_evidence',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c5_ward_evidence',
    chapter: 'Chapter 5',
    title: 'After the Ward',
    location: 'The Experiment Ward — Maintenance Corridor',
    imageKey: 'experiment_ward',
    text: `What you carry out of the ward: Dessa's knowledge of the lattice. The transmission architecture. The understanding that the shore is a real location, not a metaphor, and that your mark carries the final piece of a memory distributed across seventeen bodies. The Glass Court has been studying this system for three years and still does not understand what it is for. You understand more than they do, and you have had the mark for a fraction of that time. The maintenance corridor connects to the rest of the Tower. The Mirror Ballroom is two floors up. The Servant Quarters and Juno are back on Level 7. The Observatory is above the Sky Garden on Level 12. You choose direction.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['ward_complete'] },
    choices: [
      {
        id: 'c5_ward_go_ballroom',
        text: 'The Mirror Ballroom. The mark responded to the tenth floor on the way up. That needs an explanation.',
        nextNode: 'c5_mirror_ballroom_arrive',
      },
      {
        id: 'c5_ward_go_quarters',
        text: 'The Servant Quarters. Find Juno. Tell her what happened in the ward.',
        nextNode: 'c5_servant_quarters_arrive',
        effects: { setFlags: ['seeking_juno_after_ward'] },
      },
      {
        id: 'c5_ward_go_observatory',
        text: 'Skip the remaining floors. Go directly to the Observatory.',
        nextNode: 'c5_cracked_observatory_arrive',
        effects: { intelligence: 1 },
      },
    ],
  },

  // ── MIRROR BALLROOM ─────────────────────────────────────────────────────────

  {
    id: 'c5_mirror_ballroom_arrive',
    chapter: 'Chapter 5',
    title: 'The Mirror Ballroom',
    location: 'The Mirror Ballroom — Level 10',
    imageKey: 'mirror_ballroom',
    text: `The Mirror Ballroom is the Glass Court's social centerpiece: a circular room where the walls are mirrors from floor to ceiling, reflecting the chandelier light in a multiplication that makes the space feel larger and more populated than it is. Nobles in their best clothing move through it with the ease of people who live in their reflections. The mark does not like this room. It is pulling at the saturation — not in the direction of the shore, but inward, as if the mirror lattice is resonating with the wrist lattice in a way that wants to be felt rather than controlled. Something happened here. Something to do with you, specifically. The certainty again, attached to nothing you can access.`,
    effectsOnEnter: { corruption: 2, setFlags: ['mirror_ballroom_entered'], morale: -1 },
    choices: [
      {
        id: 'c5_ballroom_observe',
        text: 'Observe the room before entering the social flow. Map who is watching whom.',
        nextNode: 'c5_ballroom_gathering',
        effects: { intelligence: 1 },
      },
      {
        id: 'c5_ballroom_enter_flow',
        text: 'Enter the gathering. The mark is pulling you forward anyway.',
        nextNode: 'c5_ballroom_gathering',
        effects: { corruption: 1 },
      },
    ],
  },

  {
    id: 'c5_ballroom_gathering',
    chapter: 'Chapter 5',
    title: 'The Gathering',
    location: 'The Mirror Ballroom — Main Floor',
    imageKey: 'mirror_ballroom',
    text: `The gathering is not a party. It is a performance of a party, which is subtly worse. People discuss resource allocations in the language of aesthetics. Someone near the east mirror is making a joke about the tunnel districts that requires knowing what people in the tunnel districts eat to understand why it is, presumably, funny. The chandeliers are made from pre-collapse glass — actual pre-collapse materials, which means they came from somewhere specific, taken from somewhere specific, and that act of taking is embedded in the light that falls on every face in the room. The mark pulses with the frequency of the glass. The mirrors know it is here. Something in the mirrors knows.`,
    effectsOnEnter: { morale: -2 },
    choices: [
      {
        id: 'c5_ballroom_esper_tune',
        text: '[Esper] You can hear the mirrors\' frequency. Tune to it deliberately, carefully.',
        nextNode: 'c5_ballroom_esper_resonance',
        requirements: { classes: ['esper'] },
        isHidden: true,
      },
      {
        id: 'c5_ballroom_let_corruption_rise',
        text: 'Let the mark respond fully to the mirror lattice. See what it remembers.',
        nextNode: 'c5_ballroom_corruption_choice',
        requirements: { corruption: 20 },
        effects: { corruption: 3 },
      },
      {
        id: 'c5_ballroom_resist_mark',
        text: 'Suppress the mark\'s response. Stay clear. Stay in the room without being pulled by it.',
        nextNode: 'c5_ballroom_corruption_choice',
        effects: { morale: 1, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_ballroom_esper_resonance',
    chapter: 'Chapter 5',
    title: 'The Glass Frequency',
    location: 'The Mirror Ballroom — Main Floor',
    imageKey: 'mirror_ballroom',
    text: `The mirrors are pre-collapse Archive glass. You know this the moment you tune to the frequency — it has the same base resonance as the Archive door, the same layered harmonic architecture that the relic machines produced in the metro stations. The Glass Court did not merely take these mirrors from somewhere. They took them from the Archive's outer structure. There were fifty-two such panels. The Glass Court has thirty-one. The remaining twenty-one are unaccounted for. The lattice embedded in the glass is the same lattice embedded in your wrist mark, which means the Mark is not a new technology. It is the same technology as these mirrors. You are not a person who carries the Archive. You are a copy of it.`,
    effectsOnEnter: { intelligence: 4, corruption: 3, setFlags: ['mirrors_are_archive_glass', 'esper_glass_reading'], lastArchive: 10 },
    choices: [
      {
        id: 'c5_esper_tune_proceed',
        text: 'Hold the knowledge. Don\'t transmit. Move to the memory vision.',
        nextNode: 'c5_ballroom_corruption_choice',
        effects: { corruption: 2 },
      },
    ],
  },

  {
    id: 'c5_ballroom_corruption_choice',
    chapter: 'Chapter 5',
    title: 'The Pull',
    location: 'The Mirror Ballroom — Centre Floor',
    imageKey: 'mirror_ballroom',
    text: `The centre of the ballroom is where the mirrors converge their reflections, and standing in it is standing inside a multiplication of yourself — every version of you that every mirror angle produces, moving together, the mark on each wrist pulsing. The pull at this point is significant. The corruption is not pain. It is more like recognition: the mark finding something in the glass lattice that matches it, that calls to it, that says this is where you were before you knew you were anywhere. The choice at the centre of the mirror ballroom is not a tactical one. It is simpler and harder. How much of yourself are you willing to let the mark use right now?`,
    effectsOnEnter: { corruption: 2 },
    choices: [
      {
        id: 'c5_ballroom_give_in',
        text: 'Stop suppressing it. Let it use what it needs from you. You want to know what it remembers.',
        nextNode: 'c5_mirror_corruption_end',
        requirements: { corruption: 30 },
        effects: { corruption: 15 },
      },
      {
        id: 'c5_ballroom_controlled_open',
        text: 'Open the mark partially. Enough to see. Not enough to lose yourself.',
        nextNode: 'c5_ballroom_memory_vision',
        effects: { corruption: 5 },
      },
      {
        id: 'c5_ballroom_hold_closed',
        text: 'Hold it closed. Walk out of the centre. Information is not worth what that kind of opening costs.',
        nextNode: 'c5_ballroom_memory_vision',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c5_ballroom_memory_vision',
    chapter: 'Chapter 5',
    title: 'What the Glass Remembers',
    location: 'The Mirror Ballroom — Centre Floor',
    imageKey: 'mirror_ballroom',
    text: `The memory arrives in the form of a reflection that is not quite yours: the same room, the same mirrors, but three years earlier. The night of the blackout. The mirrors were here, already installed, and the people in this room knew what was coming — not everything, not the scale of it, but the event. You can see them watching a panel on the east wall that showed the metro's infrastructure status. You can see the moment the infrastructure went dark, floor by floor, station by station, and a silence falls over this room that means only one thing: they expected this. The Glass Court was not a survivor of the blackout. It was a witness. It may have been something more.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['memory_fragment_glass_ballroom', 'court_witnessed_blackout'], lastArchive: 10 },
    choices: [
      {
        id: 'c5_vision_pursue_heir',
        text: 'In the memory — at the edge of the room — a figure whose face you cannot see. Pursue it.',
        nextNode: 'c5_masked_heir_glimpse',
        effects: { corruption: 2 },
      },
      {
        id: 'c5_vision_exit_memory',
        text: 'Pull back. You have what you need. The memory can wait.',
        nextNode: 'c5_masked_heir_glimpse',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c5_masked_heir_glimpse',
    chapter: 'Chapter 5',
    title: 'The Masked Heir',
    location: 'The Mirror Ballroom — East Mirror',
    imageKey: 'mirror_ballroom',
    text: `The figure exists in the current room as much as the memory — standing near the east mirror, wearing a mask that is a stylized rendering of a pre-collapse transit map, white enamel on gold frame. The mask is worn the way the Glass Court wears everything: as a statement about the existence of aesthetics when others cannot afford them. But the figure beneath it is still. Too still for a social gathering. Watching you with the specific attention of someone who came here because they knew you would be here. The mark responds to them the way it responds to nothing else in this building: not with warmth or pulling or suppression, but with the closest thing it has produced to recognition. As if it knows this person from before you knew the mark existed.`,
    effectsOnEnter: { setFlags: ['met_masked_heir'] },
    choices: [
      {
        id: 'c5_heir_approach',
        text: 'Approach directly. Whatever the mask means, the recognition is real.',
        nextNode: 'c5_masked_heir_chase',
        effects: { corruption: 1, intelligence: 2 },
      },
      {
        id: 'c5_heir_watch_first',
        text: 'Observe them before approaching. See who else notices them.',
        nextNode: 'c5_masked_heir_chase',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_masked_heir_chase',
    chapter: 'Chapter 5',
    title: 'The Exit',
    location: 'The Mirror Ballroom — North Exit',
    imageKey: 'mirror_ballroom',
    text: `They leave before you close the distance — not running, but moving with the deliberate pace of someone who knows the building's geometry and is using it. The north exit. You follow into a corridor that is quiet and darker than the main floors. They stop at the end of the corridor. They do not turn. "The memory you just accessed," they say, without looking, "is incomplete. The piece you're missing is in the Observatory." Their voice has been filtered — a deliberate technology, layering it into something that could be any register. "I'll be there. Bring what you know." They move through a door marked 'RESTRICTED.' It clicks shut. You are alone in the corridor with the mark burning recognition into your wrist and the certainty that this person knows something about you that you do not.`,
    effectsOnEnter: { setFlags: ['masked_heir_appointment_made'], intelligence: 2 },
    choices: [
      {
        id: 'c5_heir_go_observatory',
        text: 'The Observatory. Go now.',
        nextNode: 'c5_ballroom_escape',
        effects: { morale: 2 },
      },
      {
        id: 'c5_heir_go_servants',
        text: 'Find Juno first. The servant network knows every room in this building including the ones marked restricted.',
        nextNode: 'c5_ballroom_escape',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_ballroom_escape',
    chapter: 'Chapter 5',
    title: 'From the Ballroom',
    location: 'The Mirror Ballroom — North Corridor',
    imageKey: 'mirror_ballroom',
    text: `The corridor out of the ballroom is cooler and quieter. The sounds of the gathering recede. You carry from the ballroom: the mirror-lattice recognition, the memory fragment, the Masked Heir's appointment, and a corruption level that has increased in ways you can feel but cannot yet see. The mark is at its highest activity since the Saint Furnace. Something in this building is feeding it, and the ballroom's mirrors were the most visible expression of that. The path forward branches between Juno's network in the Servant Quarters, the Sky Garden where the Pale Curator is said to operate, and the direct route to the Observatory.`,
    effectsOnEnter: { setFlags: ['ballroom_complete'] },
    choices: [
      {
        id: 'c5_ballroom_go_servants',
        text: 'Servant Quarters. Find Juno before proceeding.',
        nextNode: 'c5_servant_quarters_arrive',
      },
      {
        id: 'c5_ballroom_go_garden',
        text: 'The Sky Garden. The Pale Curator, if the intelligence is correct.',
        nextNode: 'c5_sky_garden_arrive',
      },
      {
        id: 'c5_ballroom_go_observatory_direct',
        text: 'Straight to the Observatory. The Masked Heir said bring what you know. You know enough.',
        nextNode: 'c5_cracked_observatory_arrive',
      },
    ],
  },

  // ── SERVANT QUARTERS ────────────────────────────────────────────────────────

  {
    id: 'c5_servant_quarters_arrive',
    chapter: 'Chapter 5',
    title: 'The Servant Quarters',
    location: 'The Servant Quarters — Level 7-West',
    imageKey: 'servant_quarters',
    text: `The Servant Quarters are smaller, warmer, and more real than the rest of the Tower. The walls have handwriting on them — notes, schedules, names — in a dozen hands, layered over years, the record of people who live here by necessity rather than choice. The people here are not afraid of you. They are watching you with the careful assessment of people who know that anyone who reaches the Servant Quarters without a guard escort has either gotten lost or has a reason to be here. A girl of perhaps twelve is doing inventory at the supply shelf and pretending she is not timing how long you look at the door marked JUNO.`,
    effectsOnEnter: { setFlags: ['servant_quarters_reached'] },
    choices: [
      {
        id: 'c5_quarters_ask_girl',
        text: 'Ask the girl. Children know the social architecture of a building better than any adult who built it.',
        nextNode: 'c5_juno_meeting',
        effects: { hollowChildren: 3 },
      },
      {
        id: 'c5_quarters_juno_door',
        text: 'Go to the door marked JUNO. The mark is on the door for a reason.',
        nextNode: 'c5_juno_meeting',
      },
    ],
  },

  {
    id: 'c5_juno_meeting',
    chapter: 'Chapter 5',
    title: 'Juno\'s Room',
    location: 'The Servant Quarters — Juno\'s Room',
    imageKey: 'servant_quarters',
    speaker: 'Juno',
    text: `The room is small and maps every surface: building schematics, access routes, security rotation schedules, personnel dossiers. It is the operations centre of someone who has been running a careful, long-term operation in this building without the building knowing. Juno is waiting. She has been waiting since the elevator. "The ward?" she asks. You tell her. She closes her eyes for a moment — not from shock, she knew, but from the weight of having it confirmed aloud. "I've been moving people out of the ward for six months. One at a time, when I can. The eight Dessa named — they're the ones who can walk. The ones who can't—" She stops. "There are forty-three servants in this building who would revolt if someone with the right leverage asked them to. I have never had the right leverage. A marked individual at level four might be the right leverage."`,
    dialogue: 'Forty-three servants would revolt if someone with the right leverage asked. You might be the right leverage.',
    effectsOnEnter: { setFlags: ['juno_full_meeting', 'juno_network_known'] },
    choices: [
      {
        id: 'c5_juno_ask_network',
        text: '"Tell me about the network. What you have, what you need, what this costs."',
        nextNode: 'c5_juno_network',
        effects: { intelligence: 2 },
      },
      {
        id: 'c5_juno_ask_revolt',
        text: '"Forty-three people. That\'s enough to create serious disruption. What\'s the plan?"',
        nextNode: 'c5_juno_network',
        effects: { hollowChildren: 5 },
      },
    ],
  },

  {
    id: 'c5_juno_network',
    chapter: 'Chapter 5',
    title: 'The Network',
    location: 'The Servant Quarters — Juno\'s Room',
    imageKey: 'servant_quarters',
    speaker: 'Juno',
    text: `The network has been in place for two years. Servants moving information, medical supplies, and occasionally people through the building's maintenance infrastructure. The Glass Court's security watches the social spaces and the research floors. It does not watch the service corridors, the laundry cycles, the food preparation shafts. "They built this building as a statement about power," Juno says. "The statement includes believing that the people who clean and feed the building are furniture." She lays out a map — hand-drawn, in the same style as the handwriting on the corridor walls. "The primary security control node is on Level 12, adjacent to the Observatory. If someone creates a disruption on Level 10 simultaneously with an access event on Level 12, the system splits its response. That's the window." She looks at you. "The disruption requires someone who can handle the ballroom crowd. The access event requires your mark."`,
    effectsOnEnter: { setFlags: ['juno_plan_explained'] },
    choices: [
      {
        id: 'c5_juno_net_protect',
        text: '"I\'m in. What do I need to do to protect you and the network afterward?"',
        nextNode: 'c5_juno_choice',
        effects: { setFlags: ['protected_servants'] },
      },
      {
        id: 'c5_juno_net_just_plan',
        text: '"Tell me the plan. Protection is something we figure out if it works."',
        nextNode: 'c5_juno_choice',
      },
    ],
  },

  {
    id: 'c5_juno_choice',
    chapter: 'Chapter 5',
    title: 'The Choice',
    location: 'The Servant Quarters — Juno\'s Room',
    imageKey: 'servant_quarters',
    text: `The plan requires a choice that Juno has laid out with the specific care of someone who has been carrying it for a long time. The disruption on Level 10 — the ballroom — needs a visible, memorable incident: someone with the mark using it openly, publicly, in a space full of Court nobility. That person will be detained and processed. It is a sacrifice role. Juno can do it herself: she knows every escape route, she knows the personnel, and she has been in this building for two years longer than any of them know. Or you can do it — which offers a different kind of disruption, a more powerful one, but at cost to you rather than to her. The mark would rather do it. You have learned not to fully trust what the mark would rather do.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c5_juno_protect_her',
        text: '"Juno does the access event on Level 12. I create the disruption in the ballroom."',
        nextNode: 'c5_juno_protected',
        effects: { health: -10, setFlags: ['juno_protected_by_player'] },
      },
      {
        id: 'c5_juno_sacrifice',
        text: '"You have more experience in this building. You create the disruption. I\'ll do Level 12."',
        nextNode: 'c5_juno_sacrificed',
        effects: { setFlags: ['juno_took_sacrifice_role'] },
      },
    ],
  },

  {
    id: 'c5_juno_protected',
    chapter: 'Chapter 5',
    title: 'The Ballroom Incident',
    location: 'The Mirror Ballroom — Centre Floor',
    imageKey: 'mirror_ballroom',
    text: `You create the disruption. The mark opens — not as far as the Saint Furnace, but far enough. The mirror lattice responds immediately: every panel in the ballroom shimmers, the chandelier light shifts frequency, and for approximately twelve seconds the marks of every resonant in the building flare orange simultaneously, which Dessa later says she felt in the ward like someone ringing a bell close to her ear. The Court nobility are not afraid. They are fascinated, which is in many ways worse. Security responds in forty seconds. You are detained efficiently. Juno uses the forty seconds to complete the Level 12 access event. When security processes you, they find someone they believe they already have in a processing category. You use that confusion.`,
    effectsOnEnter: { glassCourt: -10, corruption: 3, setFlags: ['ballroom_disruption_created'] },
    choices: [
      {
        id: 'c5_juno_prot_proceed',
        text: 'Navigate the detention. Get to the revolt planning.',
        nextNode: 'c5_revolt_plan',
        effects: { morale: 3 },
      },
    ],
  },

  {
    id: 'c5_juno_sacrificed',
    chapter: 'Chapter 5',
    title: 'Level 12',
    location: 'The Cracked Observatory — Level 12',
    imageKey: 'cracked_observatory',
    text: `Level 12 opens with Juno's chip and the mark's confirmation. The security control node is a glass panel — of course it is glass — with a biometric access that the mark satisfies in a way that cannot be predicted because it should not be possible, and yet this building has been waiting for this mark for three years. You hear, distantly, the sound of the ballroom disruption beginning: Juno's voice, raised to carry, speaking truths about the ward's patients in the voice of someone who has decided that being fired is an acceptable cost for being heard. The forty-three servants are already moving through the maintenance corridors. They knew the signal. They were ready. The Court is about to have a very unusual afternoon.`,
    effectsOnEnter: { setFlags: ['juno_took_disruption', 'level12_accessed'] },
    choices: [
      {
        id: 'c5_juno_sac_revolt',
        text: 'Move toward the revolt while Juno has the window.',
        nextNode: 'c5_revolt_plan',
        effects: { morale: 3 },
      },
    ],
  },

  {
    id: 'c5_revolt_plan',
    chapter: 'Chapter 5',
    title: 'The Forty-Three',
    location: 'The Servant Quarters — Primary Corridor',
    imageKey: 'servant_quarters',
    text: `The forty-three servants have gathered in the primary corridor in the specific order of people who have rehearsed this without being allowed to call it rehearsal. They are not armed with weapons. They are armed with the building's institutional knowledge: access codes, supply routes, security blind spots, which personnel respond to which triggers. The girl from the inventory shelf is coordinating the south corridor. An older man with grey hair and the hands of someone who has been carrying things for decades is managing the supply shaft access. They look at you with the specific expression of people who need one more thing to begin. The mark is what they need. It will open the doors the chips cannot.`,
    effectsOnEnter: { setFlags: ['revolt_assembled'] },
    choices: [
      {
        id: 'c5_revolt_lead_charisma',
        text: '[Roll dice — Charisma] Speak to them. Give the forty-three what they need to move.',
        nextNode: 'c5_servant_revolt_end',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c5_servant_revolt_end',
          failureNode: 'c5_sky_garden_arrive',
        },
      },
      {
        id: 'c5_revolt_mark_opens',
        text: 'Let the mark open the first door. The action is the speech.',
        nextNode: 'c5_servant_revolt_end',
        effects: { corruption: 2 },
      },
    ],
  },

  // ── SKY GARDEN ──────────────────────────────────────────────────────────────

  {
    id: 'c5_sky_garden_arrive',
    chapter: 'Chapter 5',
    title: 'The Sky Garden',
    location: 'The Sky Garden — Level 11',
    imageKey: 'sky_garden',
    text: `The Sky Garden is the Glass Court's clearest statement about what it means to have power in a city where the sky is inaccessible. Real soil, here on the eleventh floor: deep planters of actual earth, growing actual food, fruit and vegetables and herbs — growing things that are not available to anyone below the gate. The view from the garden's glass walls shows the ruined city in every direction, and the gap between the world up here and the world out there has a specific quality: it is not distance. It is choice. Someone decided that the people below the glass do not grow things, and someone else decided to grow things above the glass, and the Sky Garden is both decisions made permanent. A tall figure in a bone-white coat stands near the northern planter, watching the ruined city with the attention of a collector examining a piece they intend to acquire.`,
    effectsOnEnter: { setFlags: ['sky_garden_reached'], morale: -2 },
    choices: [
      {
        id: 'c5_garden_approach_figure',
        text: 'Approach the figure in white. They have been waiting — the angle of their attention has not changed since you arrived.',
        nextNode: 'c5_pale_curator_appear',
      },
      {
        id: 'c5_garden_observe_city',
        text: 'Stand at the glass first. See the city from here. Know what this height costs.',
        nextNode: 'c5_pale_curator_appear',
        effects: { morale: -3, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_pale_curator_appear',
    chapter: 'Chapter 5',
    title: 'The Pale Curator',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    speaker: 'The Pale Curator',
    text: `"Seventeen years ago," they say, without turning, "I acquired a marked individual from the metro network's Eastern Line. Pre-blackout. They were the first I had documented." They turn now: a face that is striking in its deliberate blankness — not emotionless, but carefully managed, the expression of someone who has chosen to present a surface. Their eyes find the wrist mark immediately, the way a jeweller finds a particular stone in a collection. "I have been collecting documentation of marked individuals for twenty-two years. I have records on one hundred and forty-three of them." They tilt their head. "I have records on you. Not recent records — I acquired these before you had a memory of them. That is the nature of a curated collection. It includes things the subjects don't yet know about themselves."`,
    dialogue: 'I have records on you. Before you had a memory of them. That is the nature of a curated collection.',
    effectsOnEnter: { setFlags: ['met_pale_curator'] },
    choices: [
      {
        id: 'c5_curator_demand_records',
        text: '"Show me the records. Everything you have on me."',
        nextNode: 'c5_curator_recognition',
        effects: { intelligence: 2 },
      },
      {
        id: 'c5_curator_ask_who',
        text: '"Who are you? Not the Pale Curator — the actual person."',
        nextNode: 'c5_curator_recognition',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c5_curator_recognition',
    chapter: 'Chapter 5',
    title: 'The Collection',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    speaker: 'The Pale Curator',
    text: `"The records show that you were in Metro Station 9 the night of the blackout by design, not accident. There are six individuals who were placed in Station 9 that night. You are the only one who retained the mark. The others — lost the mark within the first year, two died in the tunnel collapses, one joined the Red Choir." They open a glass case they are carrying, displaying a set of small cards, each one with a mark schematic and a name. "I collect the documentation. I do not collect the individuals — that is Varr's method, and it is inferior." They hold up a card. The mark on it is yours, rendered in precise detail. The card is dated three years before the blackout. "You were designed. Not as a weapon. As a message. Someone sent you, before the blackout, knowing the blackout was coming."`,
    effectsOnEnter: { setFlags: ['curator_origin_revealed', 'discovered_blackout_was_planned'], lastArchive: 15, intelligence: 4 },
    choices: [
      {
        id: 'c5_curator_relic_read',
        text: '[Relic Hunter] The card\'s material is pre-collapse Archive composite. Read it properly.',
        nextNode: 'c5_curator_relic_hunter',
        requirements: { classes: ['relic_hunter'] },
        isHidden: true,
      },
      {
        id: 'c5_curator_ask_deal',
        text: '"What do you want in exchange for everything in your collection about me?"',
        nextNode: 'c5_curator_deal',
      },
      {
        id: 'c5_curator_ask_mark_memory',
        text: '"The card says I was designed. What is the message I\'m carrying?"',
        nextNode: 'c5_curator_memory',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_curator_relic_hunter',
    chapter: 'Chapter 5',
    title: 'Archive Composite',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    text: `The card is Archive composite — you feel it before you identify it, the material resonating with the mark in the specific way that Archive-origin materials always do. But this card was manufactured, not found. It was produced by someone who knew how to work with Archive material before the Archive was publicly known to exist, which means the person who made this card had access to the Archive's material culture at minimum twenty-two years before the blackout officially revealed it. The Curator is watching you read the card with the attention of someone seeing a test result in real time. "You understand what the material means," they say. Not a question. "That narrows the field of who built you considerably."`,
    effectsOnEnter: { intelligence: 3, setFlags: ['relic_hunter_card_read'], relics: 1 },
    choices: [
      {
        id: 'c5_relic_proceed_deal',
        text: '"Someone in the Archive built me. Before the blackout. Who?"',
        nextNode: 'c5_curator_deal',
        effects: { lastArchive: 10 },
      },
    ],
  },

  {
    id: 'c5_curator_deal',
    chapter: 'Chapter 5',
    title: 'The Curator\'s Terms',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    speaker: 'The Pale Curator',
    text: `"The collection exists for documentation purposes," they say. "I do not traffic in individuals. But I will tell you what I know in exchange for one thing: permission to document the mark's full transmission event. When you complete the send — and you will complete the send, the architecture requires it — I want to be present with instruments. The record of a full lattice completion would be the most significant entry in any collection in the metro system." They hold out a second card, blank, with a glass stylus. "Your mark here. That is consent for my presence. In exchange, I give you the names of the six individuals from Station 9, the identity of the researcher who built the mark's architecture, and the specific location the transmission is addressed to." Their eyes are very calm and very specific. "It is a fair trade."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c5_deal_accept',
        text: 'Sign it. The information is worth the Curator\'s presence.',
        nextNode: 'c5_curator_memory',
        effects: { lastArchive: 10, setFlags: ['curator_deal_signed'] },
      },
      {
        id: 'c5_deal_refuse_ask_mark',
        text: '"No deal. But I\'ll let you watch if you tell me what you know now, freely."',
        nextNode: 'c5_curator_memory',
        effects: { morale: 2 },
      },
      {
        id: 'c5_deal_force',
        text: '"Give me the information or I will take the collection through the Observatory\'s access protocols."',
        nextNode: 'c5_auctioned_relic_end',
        effects: { glassCourt: -10, setFlags: ['curator_threatened'] },
      },
    ],
  },

  {
    id: 'c5_curator_memory',
    chapter: 'Chapter 5',
    title: 'What the Curator Knows',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    speaker: 'The Pale Curator',
    text: `They tell you. The researcher's name is redacted in the records — deliberately, a self-redaction, someone who knew their work would be examined and chose to protect their identity in the architecture. But their method signature is consistent across the mark's construction: Last Archive training, pre-blackout, combined with a relic manipulation technique that the Curator identifies from two other marks in the collection. "The six individuals from Station 9 were each placed with a specific piece of the transmission. Different registers, different harmonics. The mark's design required people who would survive the blackout, navigate the city's post-collapse factions, and arrive at the transmission point with the memory intact." A pause. "The transmission point is below the city. Deeper than any faction has mapped. The Last Kingdom, as the Bellkeeper called it, is not a metaphor." They close the case. "It is a building."`,
    dialogue: 'The Last Kingdom is not a metaphor. It is a building, below the city, deeper than any faction has mapped.',
    effectsOnEnter: { setFlags: ['last_kingdom_location_partial', 'curator_knowledge_gained'], lastArchive: 15, intelligence: 3 },
    choices: [
      {
        id: 'c5_curator_mem_accept_col',
        text: '"Fine. Accept the deal. You can be present for the transmission."',
        nextNode: 'c5_curator_accept',
        effects: { setFlags: ['curator_deal_signed'] },
      },
      {
        id: 'c5_curator_mem_refuse_col',
        text: '"Thank you for the information. I\'m not giving consent for documentation."',
        nextNode: 'c5_curator_refuse',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c5_curator_accept',
    chapter: 'Chapter 5',
    title: 'Documented',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    text: `The card carries the mark's signature — the mark responds to the glass stylus the way it responds to Archive-adjacent materials, which is to say with recognition and a slight increase in temperature. The Curator files the card with the care of someone placing a valuable item in a glass case. They close the collection box. "The Observatory access is on Level 12. The Masked Heir will be there. They know more about the researcher's identity than my collection does — they were present for the work." They step back. "One more thing. The Auction Hall, if you pass through it — do not bid on lot seventeen. Lot seventeen is a resonant from the Western tunnels. She is not a lot." They leave the garden the way they arrived: quietly and with more information than they started with.`,
    effectsOnEnter: { setFlags: ['curator_documentation_consented'], glassCourt: 5 },
    choices: [
      {
        id: 'c5_curator_acc_observatory',
        text: 'Head to the Observatory.',
        nextNode: 'c5_cracked_observatory_arrive',
      },
      {
        id: 'c5_curator_acc_auction',
        text: 'Check the Auction Hall first. Lot seventeen.',
        nextNode: 'c5_private_auction_arrive',
      },
      {
        id: 'c5_curator_sign_collection',
        text: '[Reckless] Sign the second form. You got the Observatory access — give them what they want.',
        nextNode: 'c5_pale_curator_collection_end',
        requirements: { corruption: 15 },
        isHidden: true,
        effects: { setFlags: ['pale_curator_secondary_form_signed'] },
      },
    ],
  },

  {
    id: 'c5_curator_refuse',
    chapter: 'Chapter 5',
    title: 'Without Terms',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    text: `The Curator accepts the refusal with equanimity — they are someone who documents, and documentation includes documentation of refusals. They close the collection box. "The Observatory is on Level 12. The Masked Heir is expecting you, which tells me they know more about your schedule than I do, which tells me they have been in this building longer than either of us." They pause. "The Auction Hall, if you go — lot seventeen is a living person. Note it." They leave. You are alone in the Sky Garden with the city visible in every direction and the specific knowledge that you were designed before you were born into the situation you are living. The mark does not comment on this. It is very patient.`,
    effectsOnEnter: { morale: 2 },
    choices: [
      {
        id: 'c5_refuse_go_observatory',
        text: 'Go to the Observatory.',
        nextNode: 'c5_cracked_observatory_arrive',
      },
      {
        id: 'c5_refuse_go_auction',
        text: 'Check the Auction Hall. Lot seventeen.',
        nextNode: 'c5_private_auction_arrive',
      },
    ],
  },

  // ── CRACKED OBSERVATORY ─────────────────────────────────────────────────────

  {
    id: 'c5_cracked_observatory_arrive',
    chapter: 'Chapter 5',
    title: 'The Cracked Observatory',
    location: 'The Cracked Observatory — Level 12',
    imageKey: 'cracked_observatory',
    text: `The Observatory dome is glass, and the glass is cracked — a single fracture running from the north panel to the centre, repaired with a different glass that has a slightly different refractive index, creating a seam of almost-right light that bisects the dome. The crack happened the night of the blackout. The Court repaired it imperfectly and left the seam as it is, which is either aesthetic acceptance or a record they cannot fully erase. The dome looks at the sky — actual sky, at night this high up, with stars that have been visible since the city's artificial light failed. The mark responds to the crack. The seam in the glass runs in the direction of the shore.`,
    effectsOnEnter: { setFlags: ['cracked_observatory_reached'], intelligence: 2 },
    choices: [
      {
        id: 'c5_obs_examine_crack',
        text: 'Examine the crack. The mark is responding to it specifically.',
        nextNode: 'c5_observatory_docs',
        effects: { corruption: 1, intelligence: 1 },
      },
      {
        id: 'c5_obs_find_heir',
        text: 'The Masked Heir said they would be here. Find them.',
        nextNode: 'c5_observatory_docs',
      },
    ],
  },

  {
    id: 'c5_observatory_docs',
    chapter: 'Chapter 5',
    title: 'The Records',
    location: 'The Cracked Observatory — Document Storage',
    imageKey: 'cracked_observatory',
    text: `The Observatory functions as a secondary archive for the Glass Court's most sensitive research. The shelving units along the walls hold physical documents — paper, sealed in glass casings, because someone understood that certain information should not exist only in electronic form. The labels are clinical and precise: "Pre-Blackout Infrastructure Analysis," "Archive Lattice — Preliminary Mapping," "Resonant Population Survey — Three Years," "Blackout Event — Predictive Model" and, at the end of the row, a casing with no label and a seal that carries the mark's resonance pattern in its wax. That last one is for you. But the predictive model is the one that matters politically. It exists. It is dated four months before the blackout. Someone in the Glass Court predicted the blackout with enough precision to file a document about it.`,
    effectsOnEnter: { setFlags: ['observatory_documents_found'], intelligence: 2 },
    choices: [
      {
        id: 'c5_obs_read_predictive',
        text: '[Roll dice — Intelligence] Read the predictive model and understand what it says.',
        nextNode: 'c5_observatory_truth',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c5_observatory_truth',
          failureNode: 'c5_council_arrive',
        },
      },
      {
        id: 'c5_obs_read_scholar',
        text: '[Forgotten Scholar] You trained on pre-collapse research methodology. Read the technical sections.',
        nextNode: 'c5_observatory_scholar',
        requirements: { backgrounds: ['forgotten_scholar'] },
        isHidden: true,
        effects: { lastArchive: 10, intelligence: 3 },
      },
      {
        id: 'c5_obs_take_sealed',
        text: 'Open the sealed case. It has your mark pattern. It is addressed to you.',
        nextNode: 'c5_observatory_truth',
        effects: { corruption: 2, setFlags: ['sealed_document_opened'] },
      },
    ],
  },

  {
    id: 'c5_observatory_truth',
    chapter: 'Chapter 5',
    title: 'What They Knew',
    location: 'The Cracked Observatory — Document Storage',
    imageKey: 'cracked_observatory',
    text: `The predictive model is not a prediction. It is a timeline. The Glass Court's founders — three researchers, names in the document — identified the Archive's reactivation sequence as an engineered event scheduled for a specific date. The blackout was the Archive activating. Not a power failure. Not a cascade collapse. An intentional, designed power draw from every infrastructure node in the metro district, produced by the Archive drawing on the city's energy grid for one specific purpose: to send a signal. The marks — every mark — appeared on the night the signal was sent. The marks are the signal's return receipt. They are confirmation that specific individuals received a specific piece of a specific transmission. The Glass Court has known this for three years and used the knowledge to run extraction experiments on people who were never patients. They were always evidence.`,
    effectsOnEnter: {
      setFlags: ['discovered_blackout_was_planned', 'blackout_full_truth_known', 'archive_activation_understood'],
      lastArchive: 20,
      intelligence: 4,
    },
    choices: [
      {
        id: 'c5_obs_truth_council',
        text: 'Take the documents. Go to the Council Chamber. This ends the Glass Court\'s control of this information.',
        nextNode: 'c5_council_arrive',
        effects: { setFlags: ['taking_evidence_to_council'] },
      },
      {
        id: 'c5_obs_truth_masked_heir',
        text: 'The Masked Heir. They said they would be here. Find them now.',
        nextNode: 'c5_council_arrive',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c5_observatory_scholar',
    chapter: 'Chapter 5',
    title: 'The Method Signature',
    location: 'The Cracked Observatory — Document Storage',
    imageKey: 'cracked_observatory',
    text: `The technical sections of the predictive model carry a method signature you recognise from your training: a specific approach to layered harmonic analysis that was developed in a pre-collapse academic program that was classified and then erased from academic records. You were in that program. Not as a researcher — as a subject. The memory arrives with the knowledge: a room, researchers you half-recognise, and the feeling of the mark before it was yours, external and being placed. The researcher who designed the mark is the same researcher who supervised your training. The sealed document contains their name, which you now remember without reading it: Velna. The Last Archive's archivist. She built you for this. Before the city ended, she built you for after.`,
    effectsOnEnter: {
      setFlags: ['velna_connection_discovered', 'chapter5_scholar_memory', 'discovered_blackout_was_planned'],
      lastArchive: 20,
      intelligence: 4,
    },
    choices: [
      {
        id: 'c5_scholar_obs_council',
        text: 'Go to the Council Chamber with everything you know.',
        nextNode: 'c5_council_arrive',
        effects: { morale: 3 },
      },
      {
        id: 'c5_scholar_obs_heir',
        text: 'Find the Masked Heir. The Curator said they know about Velna.',
        nextNode: 'c5_secret_memory_end',
        effects: { setFlags: ['scholar_seeking_heir'] },
      },
    ],
  },

  // ── PRIVATE AUCTION HALL ────────────────────────────────────────────────────

  {
    id: 'c5_private_auction_arrive',
    chapter: 'Chapter 5',
    title: 'The Private Auction Hall',
    location: 'The Private Auction Hall — Level 9-South',
    imageKey: 'private_auction_hall',
    text: `The Auction Hall is not listed on the standard access panels, which means it exists on the Court's social architecture as something between public and private: accessible by invitation, visible to those who know where to look, deniable to those who find it inconvenient. The current auction in progress is for "pre-collapse artifacts and resonant-adjacent materials" — which, on examination of the lot list, includes four people. Numbered as lots. Descriptions noting their mark saturation level, physical condition, cooperative index rating. Lot seventeen is a woman from the Western tunnels, saturation level two, listed under "secondary resonant, documented neural entrainment." The bidding on her is currently at fourteen thousand in Glass Court currency. The Curator was right. She is not a lot. She is a person. The room does not appear to distinguish between these categories.`,
    effectsOnEnter: { morale: -5, setFlags: ['auction_hall_accessed'] },
    choices: [
      {
        id: 'c5_auction_observe',
        text: 'Observe the proceedings. Know how this operates before intervening.',
        nextNode: 'c5_auction_view',
        effects: { intelligence: 2 },
      },
      {
        id: 'c5_auction_intervene_immediately',
        text: 'Intervene immediately. Lot seventeen is not up for auction.',
        nextNode: 'c5_auction_bid',
        effects: { glassCourt: -20, morale: 2 },
      },
    ],
  },

  {
    id: 'c5_auction_view',
    chapter: 'Chapter 5',
    title: 'The Lots',
    location: 'The Private Auction Hall — Observation Tier',
    imageKey: 'private_auction_hall',
    text: `The auction runs three additional lots before reaching seventeen. Each one is presented by the auctioneer in the precise language of commodity description: saturation levels, physical parameters, cooperative history, projected research yield. The buyers do not appear to be purchasing research subjects. They appear to be purchasing status indicators — proof that they have access to the Court's most restricted category of material. The mark on your wrist is burning. Not from corruption. From something older: the specific heat of recognition, one mark locating another. The woman in lot seventeen is still. She has been in this system long enough to know that stillness costs less than reaction. She sees the mark on your wrist from across the room. Her eyes tell you she knows what it means.`,
    effectsOnEnter: { morale: -3 },
    choices: [
      {
        id: 'c5_auction_bid_on_her',
        text: 'Bid on lot seventeen. Outbid everyone in the room. Then leave with her.',
        nextNode: 'c5_auction_bid',
        effects: { glassCourt: 5 },
      },
      {
        id: 'c5_auction_noble_play',
        text: '[Fallen Noble] Use the family name. Bid as a private collector with legacy standing.',
        nextNode: 'c5_auction_fallen_noble',
        requirements: { backgrounds: ['fallen_noble'] },
        isHidden: true,
      },
      {
        id: 'c5_auction_leave',
        text: 'Leave. This is not the moment for this fight.',
        nextNode: 'c5_cracked_observatory_arrive',
        effects: { morale: -4 },
      },
    ],
  },

  {
    id: 'c5_auction_bid',
    chapter: 'Chapter 5',
    title: 'The Bid',
    location: 'The Private Auction Hall — Floor',
    imageKey: 'private_auction_hall',
    text: `You bid. The room adjusts to your presence the way rooms adjust to disruption: a shift, a recalculation, then focused attention. The auctioneer handles it with professional composure. The other bidders recalibrate. You have no Glass Court currency and no meaningful credit in this system, which becomes apparent within two bids when the counter-party's agent asks for a verification chip you do not carry. The auctioneer pauses the lot. Security attention is on you. The mark is very visible. The room is recalculating what you are in a different context now — not a research subject or a guest or a provisional ally. You are someone who interrupted an auction. The Glass Court has a procedure for this, and you are about to learn what it is.`,
    effectsOnEnter: { glassCourt: -10 },
    choices: [
      {
        id: 'c5_auction_use_mark',
        text: 'Use the mark. Open it in this room, full. Let every resonant sensor in the building respond.',
        nextNode: 'c5_auction_decision',
        effects: { corruption: 5, glassCourt: -20 },
      },
      {
        id: 'c5_auction_negotiate_seraphine',
        text: '"I have Seraphine\'s provisional authorization. Call her."',
        nextNode: 'c5_auction_decision',
        effects: { glassCourt: -5 },
      },
      {
        id: 'c5_auction_cede',
        text: 'Stop. Withdraw. You cannot win this bid without leverage you don\'t have here.',
        nextNode: 'c5_glass_cage_end',
        effects: { glassCourt: -25, morale: -5 },
      },
    ],
  },

  {
    id: 'c5_auction_fallen_noble',
    chapter: 'Chapter 5',
    title: 'The Legacy Bid',
    location: 'The Private Auction Hall — Floor',
    imageKey: 'private_auction_hall',
    text: `The family name creates a different kind of space in the room. The Glass Court's social architecture is older than the blackout, and it was built by people who understood that certain names carry prior claim over certain categories of property — including, in the pre-collapse system, people who were classified as dependents of old houses. The woman in lot seventeen has documentation suggesting a connection to an eastern district family that historically fell under the Vale family's administrative network. You invoke this. The auctioneer verifies it for thirty seconds. The room's posture changes. You acquire lot seventeen for a legacy-collection fee rather than a market bid. She is not a lot. She is a person. She is also free, now, in the specific Glass Court sense of free, which is not uncomplicated.`,
    effectsOnEnter: { glassCourt: 15, setFlags: ['noble_auction_won'], morale: 3 },
    choices: [
      {
        id: 'c5_noble_auction_proceed',
        text: 'Leave with her. Go to the Observatory.',
        nextNode: 'c5_auction_decision',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c5_auction_decision',
    chapter: 'Chapter 5',
    title: 'After the Hall',
    location: 'The Private Auction Hall — Exit',
    imageKey: 'private_auction_hall',
    text: `The Auction Hall's aftermath depends on what happened in it. In any version: you now know what the Glass Court will sell. The woman from the Western tunnels is either with you or still in the system — her outcome is a consequence of the choices in the hall. What remains constant is the evidence: the auction exists, the lot descriptions exist, and you have been in the hall, which means you have documentation no other faction possesses. The mark is warm with proximity to another resonant, or warm with the anger of knowing she is still in the system, depending on the version you are living. Either way, the Observatory is the next step. The Masked Heir is waiting. The information you carry is heavy enough to change what the Council Chamber becomes.`,
    effectsOnEnter: { setFlags: ['auction_complete'] },
    choices: [
      {
        id: 'c5_auction_dec_observatory',
        text: 'To the Observatory. Everything else resolves after that.',
        nextNode: 'c5_cracked_observatory_arrive',
      },
    ],
  },

  // ── COUNCIL CHAMBER ─────────────────────────────────────────────────────────

  {
    id: 'c5_council_arrive',
    chapter: 'Chapter 5',
    title: 'The Council Chamber',
    location: 'The Council Chamber — Top Level',
    imageKey: 'council_chamber',
    text: `The Council Chamber occupies the Tower's highest floor and is all glass: floor, ceiling, walls — a room from which you can see the entire ruined city in every direction and the intact sky above, which means the people who meet here make decisions with a direct line of sight to every consequence of those decisions and have apparently found this viewpoint clarifying rather than humbling. Lady Seraphine is here. Lord Cael is here, in a different configuration from the one he showed in the Atrium — less charming, more careful. Four other Council members you do not know. And at the north glass wall, still wearing the transit-map mask, the Masked Heir stands with the specific stillness of someone who has been waiting for this room to fill with exactly these people.`,
    effectsOnEnter: { setFlags: ['council_chamber_reached'], morale: 1 },
    choices: [
      {
        id: 'c5_council_go_heir_first',
        text: 'Go to the Masked Heir first. They have been waiting longest.',
        nextNode: 'c5_council_seraphine_final',
        effects: { setFlags: ['heir_approached_in_council'] },
      },
      {
        id: 'c5_council_go_seraphine',
        text: 'Go to Seraphine. She runs this room and you need to know what version of her is here.',
        nextNode: 'c5_council_seraphine_final',
      },
    ],
  },

  {
    id: 'c5_council_seraphine_final',
    chapter: 'Chapter 5',
    title: 'The Final Offer',
    location: 'The Council Chamber — Central Table',
    imageKey: 'council_chamber',
    speaker: 'Lady Seraphine Vale',
    text: `Seraphine addresses the room without preamble, which means she has been waiting for you specifically and has had this speech prepared. "The marked individual has accessed the research floors, the ward, and based on their current documentation status, the Observatory records." She does not look surprised. "The Glass Court has a choice. We extend the provisional partnership to full integration — the mark's transmission data in exchange for full Court resources, protection, and the completion of the lattice project — or we process the individual as a Category Two research subject, which is more expensive than Category One but produces more data." She looks at you finally. "I prefer the first option. I wanted you to know that I prefer it, and that the second option exists, so that your choice is informed." The room is very quiet. The Masked Heir has not moved.`,
    effectsOnEnter: { setFlags: ['seraphine_final_offer'] },
    choices: [
      {
        id: 'c5_council_challenge_charisma',
        text: '[Roll dice — Charisma] Make the argument. Everything you know about the blackout, the lattice, the ward. Laid out in this room, for everyone.',
        nextNode: 'c5_council_win',
        diceCheck: {
          stat: 'charisma',
          difficulty: 16,
          diceType: 'd20',
          successNode: 'c5_council_win',
          failureNode: 'c5_council_lose',
        },
      },
      {
        id: 'c5_council_expose_heir',
        text: 'Gesture to the Masked Heir. "Before anyone decides anything — let\'s talk about who else is in this room."',
        nextNode: 'c5_masked_heir_revealed',
        effects: { intelligence: 2 },
      },
      {
        id: 'c5_council_accept_alliance',
        text: '"I accept the first option. Full integration, on the terms you described in the Atrium."',
        nextNode: 'c5_seraphine_alliance_end',
        effects: { glassCourt: 25, setFlags: ['glass_court_full_alliance'] },
      },
    ],
  },

  {
    id: 'c5_council_win',
    chapter: 'Chapter 5',
    title: 'The Argument',
    location: 'The Council Chamber — Central Table',
    imageKey: 'council_chamber',
    text: `You lay out what you know. The predictive model. The archive activation. The extraction deaths. The auction. The lattice network and what Dessa said about it. You do not perform it — you present it, clearly, with the evidence you carry, in a room where every person present can see the ruined city behind you and understand that the distance between here and there is a choice, not a natural fact. The room is quiet when you finish. Lord Cael is looking at Seraphine. Seraphine is looking at the city. The four Council members are doing the calculations that people do when the landscape of their position has shifted without their permission. The Masked Heir, at the north wall, removes the mask.`,
    effectsOnEnter: { glassCourt: 15, morale: 5 },
    choices: [
      {
        id: 'c5_council_win_heir',
        text: 'Look at the Masked Heir. Know who they are.',
        nextNode: 'c5_masked_heir_revealed',
      },
    ],
  },

  {
    id: 'c5_council_lose',
    chapter: 'Chapter 5',
    title: 'Not Enough',
    location: 'The Council Chamber — Central Table',
    imageKey: 'council_chamber',
    text: `The argument does not land the way it needs to. Not because it is wrong — it is not wrong — but because the Council operates on the logic of institutional momentum, and institutional momentum requires more than one conversation to redirect. Seraphine listens without expression. The four other Council members exchange the specific glances of people confirming a decision that was already made before you spoke. "The evidence is noted," Seraphine says. "The research program is not under review at this time." She signals, and the security response is already in position because it has always been in position. "Category Two processing. Non-invasive, initially." She does not say the 'initially' unkindly. She says it accurately. There is a difference and it does not help.`,
    effectsOnEnter: { glassCourt: -20, morale: -5, setFlags: ['council_argument_lost'] },
    choices: [
      {
        id: 'c5_lose_fight',
        text: 'Fight. The mark opens. Let this building understand what it has been trying to study.',
        nextNode: 'c5_white_atrium_massacre_end',
        effects: { corruption: 10, health: -20, glassCourt: -30 },
      },
      {
        id: 'c5_lose_accept_false',
        text: 'Accept the processing. Play the long game inside their system.',
        nextNode: 'c5_false_ascension_end',
        effects: { glassCourt: 10, morale: -10 },
      },
    ],
  },

  {
    id: 'c5_masked_heir_revealed',
    chapter: 'Chapter 5',
    title: 'Without the Mask',
    location: 'The Council Chamber — North Wall',
    imageKey: 'council_chamber',
    text: `The face beneath the transit-map mask is a face you have seen before — in the memory fragment from the Mirror Ballroom, in the reflection that was not quite yours. The Masked Heir is perhaps your own age, and they have the mark. Not on their wrist. On the back of their left hand — a different pattern, a different register, but recognizably the same architecture. They look at you with the expression of someone meeting a person they have been corresponding with for years and seeing them in person for the first time. "My name is Sabel," they say. "Velna was my mother. She built the mark's architecture using herself as the base template. Then she built you — the other nodes — using the same principles." A pause. "I have the memory that precedes yours. The one from before the blackout. If you want to know who you were, I can show you."`,
    dialogue: 'Velna was my mother. She built the mark using herself as a template. I have the memory that precedes yours.',
    effectsOnEnter: { setFlags: ['masked_heir_identity_known', 'velna_identity_confirmed'], lastArchive: 20, intelligence: 4 },
    choices: [
      {
        id: 'c5_heir_see_memory',
        text: '"Show me."',
        nextNode: 'c5_blackout_truth',
        effects: { corruption: 3 },
      },
      {
        id: 'c5_heir_ask_first',
        text: '"Why are you here? In the Glass Court. In that mask."',
        nextNode: 'c5_blackout_truth',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c5_blackout_truth',
    chapter: 'Chapter 5',
    title: 'The Night of the Blackout',
    location: 'The Council Chamber — North Wall',
    imageKey: 'council_chamber',
    speaker: 'Sabel',
    text: `"Velna built the lattice to carry a specific memory forward through the blackout," Sabel says. "Not her memory — the Archive's. The Archive contains the record of the city that was built deliberately above the Last Kingdom, by people who knew what was below. The blackout was the Archive activating because the conditions it was waiting for were finally met: seventeen marked individuals, distributed, surviving. The transmission isn't a message to someone outside the city. It is a message to the city itself. A restoration record — what the city was supposed to be, before the factions and the collapses and the starvation." They look at you. "Velna split the final piece of the memory between two marks — mine and yours. She didn't trust one person with all of it." Their mark glows, faintly, the same orange as yours. "Together we complete the record. The shore is the transmission point. The Last Kingdom is what we're remembering it back into existence."`,
    dialogue: 'The transmission is a restoration record. Together we complete it. The shore is the transmission point.',
    effectsOnEnter: { setFlags: ['blackout_full_truth_confirmed', 'sabel_alliance_possible'], lastArchive: 25, intelligence: 4 },
    choices: [
      {
        id: 'c5_truth_council_final',
        text: 'Tell the Council. Let this be what changes this building.',
        nextNode: 'c5_council_final_choice',
        effects: { morale: 3 },
      },
    ],
  },

  {
    id: 'c5_council_final_choice',
    chapter: 'Chapter 5',
    title: 'The Decision',
    location: 'The Council Chamber — Central Table',
    imageKey: 'council_chamber',
    text: `The Council Chamber has heard everything now. Seraphine is very still — not calculating, but genuinely processing, which is different from her performance of consideration. The four other Council members are uncertain, which is a state they rarely occupy in this room. Lord Cael, at the edge of the table, has the expression of someone whose assessment of his own position has just been revised. The city is visible through every wall. The mark is warm and directional, pointing below. Sabel stands beside you, their mark visible, the lattice between your two marks creating a harmonic that the glass walls of the Council Chamber reflect back as a barely-audible tone. The Glass Court has a choice about what it does with what it now knows. So do you.`,
    effectsOnEnter: { setFlags: ['council_knows_truth', 'chapter5_climax'] },
    choices: [
      {
        id: 'c5_final_leave_with_sabel',
        text: '"We\'re leaving. The shore is the next step. Not this room." Take Sabel and go.',
        nextNode: 'c5_chapter5_end',
        effects: { morale: 5, lastArchive: 10, glassCourt: -10 },
      },
      {
        id: 'c5_final_take_seraphine_terms',
        text: '"If the Court puts its resources behind reaching the shore — all of its resources — then we work together."',
        nextNode: 'c5_seraphine_alliance_end',
        effects: { glassCourt: 20, setFlags: ['seraphine_shore_alliance'] },
      },
      {
        id: 'c5_final_neutral_exit',
        text: 'Leave without resolving the Court\'s position. The information is in the room now. Let it work.',
        nextNode: 'c5_glass_court_neutral_end',
        effects: { morale: 2, glassCourt: -5 },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  ENDING NODES
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'c5_orchid_table_end',
    chapter: 'Chapter 5',
    title: 'The Orchid Table',
    location: 'The Orchid Clinic — Extraction Suite',
    imageKey: 'orchid_clinic',
    text: `The extraction procedure is called a procedure because the Glass Court has a form for it and the form gives it a clinical name. What it is, in the room where it happens, is something the procedure form does not capture. The instruments that Mira identified in the corridor are exactly what she said they were. Varr conducts the session with the methodical care of someone whose primary concern is data integrity. The mark provides data with the specific enthusiasm of something that has been waiting to be heard and does not understand that the people listening are not listening in the right direction. When the session ends, the data is in Varr's system. The mark is significantly quieter. The person who was carrying it is present but different in a way that will take some time to measure.`,
    effectsOnEnter: { setFlags: ['orchid_table_experienced'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch5_orchid_table',
  },

  {
    id: 'c5_mira_dissection_end',
    chapter: 'Chapter 5',
    title: 'Mira Dissection',
    location: 'The Orchid Clinic — Suite 3',
    imageKey: 'orchid_clinic',
    text: `The secondary extraction takes forty minutes, then six hours, then another forty minutes in a different suite with different instruments. Mira does not scream. She has the specific calm of someone who is doing a medical procedure on herself in her mind — locating each sensation, classifying it, refusing to let it be more than what it is. When it is done, she does not look at you right away. When she does, her expression is doing something that has no single name. "I know what they took," she says, very quietly. "I know what was in the neural pattern they recorded." She pauses. "It was you. The mark transferred something to my neural pattern from yours, over the months we travelled together. It was a backup." Another pause. "They have it now." The mark on your wrist burns once, in the direction of the shore, and then goes very quiet.`,
    effectsOnEnter: { setFlags: ['mira_neural_pattern_extracted'], miraTrust: -10 },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch5_mira_dissection',
  },

  {
    id: 'c5_glass_cage_end',
    chapter: 'Chapter 5',
    title: 'Glass Cage',
    location: 'The Experiment Ward — Level 8-B',
    imageKey: 'experiment_ward',
    text: `The Glass Court's Category Two processing protocol is comprehensive. The ward has a bed for you — bed eighteen, which was prepared, which means it was expected. The suppression technology embedded in the mattress and the frame reduces the mark's signal output to approximately twelve percent of its unsuppressed level. This is not painful. It is quiet in a way that is worse than painful. Varr visits on alternating days. He writes things. He does not share them. The city is visible from the ward window, far below, the ruined districts and the lit ones arranged in the specific geography of who decided what mattered. Dessa, from the bed beside you, reaches over one night and puts her hand on yours. She does not say anything. The mark recognises her mark and holds the recognition with the patience of something that has been waiting for a very long time.`,
    effectsOnEnter: { setFlags: ['game_complete', 'glass_cage_confined'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch5_glass_cage',
  },

  {
    id: 'c5_white_atrium_massacre_end',
    chapter: 'Chapter 5',
    title: 'White Atrium Massacre',
    location: 'The White Atrium — Level 7',
    imageKey: 'white_atrium',
    text: `The mark at full transmission in the White Atrium interacts with the glass panels in the way that full transmission always interacts with the Archive-composite glass: total, immediate, irreversible. Every panel in the Atrium responds simultaneously, every surface resonating at the lattice frequency, the chandeliers shattering in a harmonic cascade that produces a sound which carries through every floor of the Tower. The people in the Atrium are not Archive glass. They do not resonate. They do the other thing. The security response arrives in ninety seconds and finds a different kind of scene than the one the Court has protocols for. Seraphine, somewhere above on the Council floor, hears the sound and understands it with the specific understanding of someone who has been studying it for three years. She writes something in her ledger. She does not go to the Atrium.`,
    effectsOnEnter: { setFlags: ['white_atrium_massacre'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch5_white_atrium_massacre',
  },

  {
    id: 'c5_auctioned_relic_end',
    chapter: 'Chapter 5',
    title: 'Auctioned Relic',
    location: 'The Private Auction Hall — Floor',
    imageKey: 'private_auction_hall',
    text: `The Glass Court has a category for this. "Exceptional resonant, active lattice, saturation level four — unique in documented collection." The Pale Curator, watching from the observation tier, does not bid. They document. Lord Cael, to his credit, does not bid either. He looks at his hands instead. The successful bidder is an eastern tower family who has been building a private research program for six years and who has, presumably, the appropriate facilities. The lot number is assigned. The glass chip changes hands. You are GC-RES-PRIV-001 in their system, which means you are the first. The mark responds to none of this with the recognition it responds to other things. It is already pointing somewhere else — below, east-southeast, the direction it has always been pointing. Patient. Waiting. The body carrying it is no longer in a position to follow.`,
    effectsOnEnter: { setFlags: ['auctioned_as_relic'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch5_auctioned_relic',
  },

  {
    id: 'c5_cain_bargain_end',
    chapter: 'Chapter 5',
    title: 'Cain\'s Bargain',
    location: 'The White Atrium — Lord Cael\'s Office',
    imageKey: 'white_atrium',
    speaker: 'Cain',
    text: `Cain completes the transaction with Lord Cael in the same deliberateness he applies to everything. The Saints records access is transferred. The intelligence about you — your position, the mark's saturation level, the shore direction the mark points — is transferred in the other direction. Cain sits with the records for a long time after. He reads about the Saints' supply transactions. He reads about what he signed, what he forwarded, what he was used for. Then he puts the records down and goes to find you, and his face when he finds you is not the face of someone who has made peace with what he did. "I got the records," he says. "I also told them things they shouldn't have." He waits. He knows you will ask what things. He has already decided to answer. That decision does not fix what happened. It tells you what it is.`,
    effectsOnEnter: { setFlags: ['cain_made_political_bargain', 'cain_bargain_complete'], cainTrust: -8, glassCourt: 20 },
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch5_cain_bargain',
  },

  {
    id: 'c5_noble_pet_end',
    chapter: 'Chapter 5',
    title: 'Noble Pet',
    location: 'The White Atrium — East Wing',
    imageKey: 'white_atrium',
    text: `The Glass Court's social architecture has a category for marked individuals who are useful but not dangerous: "Resonant Companion," which functions socially the way a rare object functions in a collection — as a statement about the taste and resources of whoever keeps it. Lady Seraphine does not keep you as a weapon or a subject. She keeps you as a reference point: someone to consult, to introduce at specific functions, to display as evidence of the Court's relationship with the pre-collapse technology. The mark quiets in the suppression field. You quieten in the specific way that comfort quietens things that were meant to be sharp. The city is still below the glass. The shore is still below the city. The mark remembers the direction even when you stop thinking about it. The direction does not stop being true because you stopped moving.`,
    effectsOnEnter: { setFlags: ['game_complete', 'noble_pet_status'], glassCourt: 25, morale: -10 },
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch5_noble_pet',
  },

  {
    id: 'c5_mirror_corruption_end',
    chapter: 'Chapter 5',
    title: 'Mirror Corruption',
    location: 'The Mirror Ballroom — Centre Floor',
    imageKey: 'mirror_ballroom',
    text: `The mirror lattice and the wrist lattice complete their resonance loop in the centre of the ballroom and the completion is not violent — it is absorptive, which is worse. Every version of you that the mirrors produce converges on the centre simultaneously and the mark accepts the convergence as a transmission, receiving all of it, the Glass Court's three years of Archive-composite memory encoded in the glass. What comes out of the loop is still standing in the centre of the ballroom, still wearing the wrist mark, still pointing in the direction of the shore. But the glass chandeliers ring once, in unison, and do not stop ringing. Seraphine, on the floor above, hears it. Lord Cael hears it. Varr hears it and reaches for his instruments. The Pale Curator, in the garden, opens their documentation case and begins to write with the specific pace of someone recording something they expected and have been waiting to record.`,
    effectsOnEnter: { setFlags: ['mirror_corruption_event', 'corruption_mirror_event'], corruption: 30 },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch5_mirror_corruption',
  },

  {
    id: 'c5_pale_curator_collection_end',
    chapter: 'Chapter 5',
    title: 'Pale Curator\'s Collection',
    location: 'The Sky Garden — North Planter',
    imageKey: 'sky_garden',
    text: `The consent form the Pale Curator carries is not the one they showed you. The documentation they want is not of the transmission event — it is of the mark itself, at full extension, in a controlled environment, captured and archived. The distinction between "documenting a person" and "collecting them" is in this moment very thin and very clear. The collection case that holds the mark's resonance signature is pre-Archive composite and was built for exactly this. The mark, when it enters the composite, does what the mark does with materials that match its architecture: it recognises them. It settles. It is very still, and it is still pointing toward the shore, and the Pale Curator files the case with care and closes it, and the person who was carrying the mark is still standing in the Sky Garden, still looking at the city, but the thing that was navigating is no longer on their wrist.`,
    effectsOnEnter: { setFlags: ['pale_curator_collected'], glassCourt: 5, corruption: -5 },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch5_pale_curator_collection',
  },

  {
    id: 'c5_false_ascension_end',
    chapter: 'Chapter 5',
    title: 'False Ascension',
    location: 'The Experiment Ward — Level 8-B',
    imageKey: 'experiment_ward',
    text: `The Category Two processing is, as Seraphine described, initially non-invasive. Then moderately invasive. Then, at six weeks, it requires a decision that the form describes as "resonant calibration enhancement" and which Mira, if she is still present to see it, would describe differently. The Glass Court calls the outcome "ascension" — the resonant's mark is stabilised at maximum output, controlled, sustainable, useful for the lattice project for an estimated three to five years. The mark does not feel like ascension. It feels like being very loud in a very small room. The shore is below. The city is below. The form is filed. The processing continues. The mark continues to point in the direction it has always been pointing, with the patience of something that has never stopped moving toward its destination even when the person carrying it has.`,
    effectsOnEnter: { setFlags: ['false_ascension_complete'], glassCourt: 10, morale: -15 },
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch5_false_ascension',
  },

  {
    id: 'c5_glass_court_neutral_end',
    chapter: 'Chapter 5',
    title: 'Glass Court Neutral',
    location: 'The Glass Gate — Exit',
    imageKey: 'glass_gate',
    text: `You leave the Glass Court with what you came for and the specific kind of unresolvedness that comes from having changed something large without seeing the change complete. The Council knows the truth about the blackout now — what they do with it is a political process you have started but cannot finish in a single visit. Juno's network is intact. Dessa and the ward resonants who walked are somewhere in the city below. The Masked Heir — Sabel — is still in the building, which means Velna's other half of the memory is still accessible. The mark on your wrist points southeast as you exit the gate. The ruined city receives you. The Glass Court is above, lit and intact, continuing to make its decisions. You have added a new variable to those decisions. Variables compound.`,
    effectsOnEnter: { setFlags: ['game_complete', 'glass_court_left_neutral', 'chapter5_survived_neutral'], glassCourt: -5, lastArchive: 10 },
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch5_glass_court_neutral',
  },

  {
    id: 'c5_servant_revolt_end',
    chapter: 'Chapter 5',
    title: 'Servant Revolt',
    location: 'The Glass Tower — Multiple Floors',
    imageKey: 'servant_quarters',
    text: `The forty-three servants move with the efficiency of people who have been planning this for two years and executing it for forty-three seconds. Supply shaft access. Maintenance corridor sequences. Security rotation disruption executed at four points simultaneously. The mark opens the doors Juno's chip cannot. The building does not fall — that is not the point. The point is that the forty-three people who have been making the decisions in this building function have, for this one afternoon, stopped making them until the building understands something it has chosen not to understand. Three resonants exit the ward during the disruption. Juno's name will be known after today. Yours will be connected to hers in the Glass Court's records. The city below receives three people who can walk and have been waiting eleven months to do it. The mark, heading toward the exit, is warm with something that is not corruption.`,
    effectsOnEnter: {
      setFlags: ['servant_revolt_succeeded', 'juno_revolt_led', 'chapter5_revolt_route'],
      hollowChildren: 20,
      glassCourt: -25,
      morale: 8,
    },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch5_servant_revolt',
  },

  {
    id: 'c5_seraphine_alliance_end',
    chapter: 'Chapter 5',
    title: 'Seraphine Alliance',
    location: 'The Council Chamber — Central Table',
    imageKey: 'council_chamber',
    speaker: 'Lady Seraphine Vale',
    text: `The alliance terms are written on glass paper with a glass stylus in the specific formality of someone who has been managing institutional power for long enough to know that informal agreements are worth exactly what the weaker party is willing to enforce. Seraphine signs first. "The Glass Court commits its resources to reaching the transmission point," she says. "The shore. The Last Kingdom. Whatever it is below." She looks at the city through the Council Chamber glass. "In exchange, the marked individual operates as a full partner in the project, not as a subject. The distinction is documented." She slides the paper across. Lord Cael is watching from the edge of the room. The mark on your wrist recognises the glass paper — Archive composite, same as the mirrors — and warms. The alliance is a tool. Tools have specific uses and specific limits. You sign.`,
    effectsOnEnter: {
      glassCourt: 30,
      setFlags: ['seraphine_alliance_confirmed', 'glass_court_alliance_sealed', 'chapter5_seraphine_route'],
      lastArchive: 10,
    },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch5_seraphine_alliance',
  },

  {
    id: 'c5_secret_memory_end',
    chapter: 'Chapter 5',
    title: 'Secret Memory Fragment',
    location: 'The Cracked Observatory — Document Storage',
    imageKey: 'cracked_observatory',
    text: `Sabel closes their hand and the shared memory arrives not as vision but as texture: the quality of the Archive before the blackout, the specific warmth of a building that has been thinking for three hundred years and is about to think harder. Velna is in the memory — not as a person you can see, but as a presence, the architectural signature of someone who built something into the walls and the floors and the documents and the marks and called it a message. The message is not in words. It is in the structure of what she built: every choice has a consequence, every faction has a position, every person who carries the mark was chosen because they could navigate both. The memory shows you the shape of what the Last Kingdom remembers. You now know what the restoration looks like. Not where it is. Not how to reach it. But what it was, before it was lost. You carry that now, in addition to everything else.`,
    effectsOnEnter: {
      setFlags: ['game_complete', 'secret_memory_received', 'velna_message_understood', 'chapter5_scholar_route'],
      lastArchive: 25,
      intelligence: 5,
    },
    choices: [],
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_ch5_secret_memory',
    isSecret: true,
  } as StoryNode & { isSecret?: boolean },

  // ── CHAPTER CONCLUSION ──────────────────────────────────────────────────────

  {
    id: 'c5_chapter5_end',
    chapter: 'Chapter 5',
    title: 'The Glass Court — After',
    location: 'Surface Approach — Below the Towers',
    imageKey: 'glass_gate',
    text: `Below the Glass Court's towers, the ruined city receives you the way it always has: without comment, without adjustment, with the steady indifference of a place that has been ruined for long enough that the ruin is the baseline. What you carry out of the towers: Sabel, if they came with you. The knowledge that the blackout was the Archive activating. The knowledge that your mark is one node in a network of seventeen, carrying a piece of a memory that together forms a restoration record. The knowledge that Velna built you for this, specifically, before the blackout, and that the transmission point — the shore, the Last Kingdom — is below the city, deeper than any faction has mapped. The Glass Court has its resources and its alliance or its disruption or its records, depending on the version of events you lived. The mark is warm and directional and patient. Below this city: something waiting to be remembered. The path to the Red Choir is east, through the broadcast tunnels. The mark knows the way.`,
    effectsOnEnter: {
      setFlags: ['chapter5_complete'],
      glassCourt: 5,
      lastArchive: 10,
      morale: 3,
    },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch5_survived',
  },
];
