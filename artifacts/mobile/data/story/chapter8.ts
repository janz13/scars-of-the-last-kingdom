import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 8 — HUNGER WAR
//
//  Theme: Scarcity becomes war. Food, water, medicine, and shelter become
//         more valuable than loyalty. The player cannot save everyone.
//
//  This chapter makes survival mechanics matter heavily. Hunger, thirst,
//  morale, health, medicine, faction reputation, and companion trust all
//  strongly affect available choices.
//
//  Locations:
//    The Empty Ration Square · The Water Riot · The Burned Clinic
//    The Grain Vault · The Bone Soup Kitchen · The Scavenger Front
//    The Broken Aqueduct · The Famine Camp · The Dead Orchard
//    The Siege Tunnels · The Starving Bridge
//
//  Key NPCs:
//    Captain Roan       — leader of a starving militia. Loyal to whoever
//                         can feed his people, which is a kind of loyalty.
//    Sera               — the starving girl from Chapter 3, if saved.
//    Juno               — returns if alive from Chapter 5. Working a clinic.
//    Mother Chalk       — may demand food for the Hollow Children.
//    Saint Veyra        — enforces brutal ration laws for the Iron Saints.
//    Lady Seraphine     — may offer food for obedience.
//    Mother Veyl        — may offer infected aid at a cost.
//
//  Route Foundations:
//    Savior — feed people at personal cost, build coalition
//    Tyrant — take control of supply, enforce compliance
//    Lone Wanderer — survive alone, refuse the war's terms
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_8_NODES: StoryNode[] = [

  // ── ENTRY NODES ─────────────────────────────────────────────────────────────

  {
    id: 'chapter8_start',
    chapter: 'Chapter 8',
    title: 'Three Months Later',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `Three months since the Archive. Three months since the gate card went into your coat and Mael stood in the Dust Library and watched you leave. Three months in which the city's food supply — fragile even in the best years, built on salvage routes and black market agreements and a Glass Court distribution system that everyone knew was iniquitous and no one wanted to replace — stopped working. Not all at once. The way things stop in the tunnels: one route at a time, one cache at a time, one family going to the ration square and finding the crate empty and the queue still forming. By the time anyone called it a war there were already people dying. The square is full. Not of food. Of people who expected food and found nothing.`,
    effectsOnEnter: { setFlags: ['hunger_war_active', 'chapter8_entered'], hunger: -10, thirst: -5 },
    choices: [
      {
        id: 'c8_start_standard',
        text: 'Walk into the square. Find out what is happening.',
        nextNode: 'c8_arrive_ration_square',
      },
    ],
  },

  {
    id: 'c8_archive_supply_intel',
    chapter: 'Chapter 8',
    title: 'The Archive\'s Warning',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `Mael's message arrived two weeks before the worst of it — a folded document delivered through a courier the Archive had used since before your time in the tunnels. "The food records I mentioned," it said. "The pre-collapse agricultural system on Sublevel Fourteen was still listed as functional in the last survey I can find, dated eight years ago. If it has not been destroyed, it can be restarted. I have attached what documentation we have. You will need this before the shortage becomes a war." It became a war anyway. But you have the documentation, and Mael knew you would need it before you knew you needed it. The Archive's supply route intelligence has identified three cached food deposits that the Glass Court does not know about.`,
    effectsOnEnter: { setFlags: ['archive_supply_intel_received', 'agricultural_docs_carried'], intelligence: 3, food: 2, lastArchive: 5 },
    choices: [
      {
        id: 'c8_intel_proceed',
        text: 'Use the Archive\'s intelligence. Get to the square.',
        nextNode: 'c8_arrive_ration_square',
      },
    ],
  },

  {
    id: 'c8_without_mira',
    chapter: 'Chapter 8',
    title: 'Alone in the Shortage',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `The clinic on Level 7 has a new operator. You have heard her name — Juno, if the rumour is the same person you knew from the Glass Court. Mira's absence has not made the medical crisis easier; it has redistributed it. Without Mira managing your medical access, acquiring medicine has been slower, and the clinic route requires more negotiation than it did with a doctor at your side. The shortage is not her fault. Nothing that is happening is her fault. The square ahead is full of people who are hungry in ways that do not care about fault.`,
    effectsOnEnter: { setFlags: ['mira_absent_ch8'], medicine: -1, morale: -5 },
    choices: [
      {
        id: 'c8_without_mira_proceed',
        text: 'Enter the square. Find the clinic later.',
        nextNode: 'c8_arrive_ration_square',
      },
    ],
  },

  {
    id: 'c8_solo_tactical',
    chapter: 'Chapter 8',
    title: 'Without the Tactician',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `Cain stayed behind at the Blackout Record Chamber. He has been there for three months — you know because the Archive's courier mentioned it in passing, the way people mention things they assume you already know. "Your soldier is still in the Chamber. Mael says he reads the south wall every day." Three months of reading his name on a perimeter list. In his absence, the tactical planning falls to you. The militia group at the ration square needs direction. Without Cain's experience navigating Iron Saints supply chain infrastructure, the raid routes are guesswork.`,
    effectsOnEnter: { setFlags: ['cain_absent_ch8'], intelligence: 1, cainTrust: 2 },
    choices: [
      {
        id: 'c8_solo_proceed',
        text: 'Approach the square. Do the tactical work yourself.',
        nextNode: 'c8_arrive_ration_square',
      },
    ],
  },

  {
    id: 'c8_gate_refused_route',
    chapter: 'Chapter 8',
    title: 'The Gate Stays Closed',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `The gate card is on the table in the Archive's final chamber, where you left it. Mael has not touched it. He sent word that he would not. The synchronisation is on hold. The question of whether this is the right decision is one you have had three months to examine and have not resolved. What you have resolved: the hunger war is here, now, with or without the gate. People are dying over food while the gate card sits on a table in a hidden library. The Archive knew the shortage was coming. The agricultural system documentation is in Mael's papers. But accessing it requires going back to the Archive, which means going back to the room with the gate card on the table.`,
    effectsOnEnter: { setFlags: ['gate_refused_ch8', 'archive_return_needed'], morale: -8, lastArchive: 5 },
    choices: [
      {
        id: 'c8_refused_proceed',
        text: 'Deal with the square first. The gate can wait.',
        nextNode: 'c8_arrive_ration_square',
      },
    ],
  },

  // ── THE EMPTY RATION SQUARE ──────────────────────────────────────────────────

  {
    id: 'c8_arrive_ration_square',
    chapter: 'Chapter 8',
    title: 'The Empty Square',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `The ration crates were here this morning. Someone moved them before the queue could form — the evidence is the truck tracks in the dust and the fury of people who arrived at the right time and found nothing. The square holds perhaps three hundred people. Not a mob. Not yet. A crowd with the particular stillness that precedes violence when the cause is hunger, because hungry violence does not need provocation so much as the absence of an alternative. There are children. There are old people who should not be standing this long. There is a militia captain with a yellow band on his arm standing in the middle of the crowd doing something rare: listening instead of shouting.`,
    effectsOnEnter: { setFlags: ['ration_square_arrived'], hunger: -5 },
    choices: [
      {
        id: 'c8_approach_roan',
        text: 'Approach the militia captain with the yellow band.',
        nextNode: 'c8_roan_meet',
      },
      {
        id: 'c8_observe_crowd',
        text: 'Observe the crowd before engaging. Read the situation.',
        nextNode: 'c8_square_crowd_state',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c8_square_crowd_state',
    chapter: 'Chapter 8',
    title: 'Reading the Square',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `The crowd is sorted, the way crowds sort themselves under pressure, into concentric rings: the hungriest at the centre, the people with enough left to be angry rather than desperate at the edges, and the people who have come to see what is happening along the walls. The Iron Saints have a checkpoint two blocks north — active, staffed, radiating the specific energy of soldiers following orders they have not been asked to think about. The Glass Court's nearest distribution point is four kilometres east, operating normally, available only to Glass Court registered citizens. The Hollow Children have a delegation in the crowd: three adults in chalk-marked coats, watching the platform where the crates should be. One of them is looking directly at you.`,
    effectsOnEnter: { intelligence: 2 },
    choices: [
      {
        id: 'c8_crowd_roan',
        text: 'Find Roan. Work the problem from the militia angle.',
        nextNode: 'c8_roan_meet',
      },
      {
        id: 'c8_crowd_chalk',
        text: 'Approach the Hollow Children delegation.',
        nextNode: 'c8_chalk_demand',
      },
    ],
  },

  {
    id: 'c8_roan_meet',
    chapter: 'Chapter 8',
    title: 'Captain Roan',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    speaker: 'Captain Roan',
    text: `He is younger than the yellow band implies — not young, but not the age of a man who has been leading militias for long. The competence is real but recent. "Captain Roan," he says without preamble. "Independent militia, forty-three people, forty-two of whom ate yesterday and zero of whom have eaten today." He looks at the empty crate platform. "The Iron Saints moved the caches last night. Not a raid — a reallocation. They have a document signed by Veyra that calls it 'emergency strategic repositioning.' Which means they took the food and wrote down a reason." He looks at you. "I have forty-three people who can carry and fight. I have one problem, which is that carrying and fighting require calories. Tell me you have a plan."`,
    effectsOnEnter: { setFlags: ['roan_met'], morale: -3 },
    choices: [
      {
        id: 'c8_roan_yes_plan',
        text: '"I have the beginning of one. Walk with me."',
        nextNode: 'c8_roan_assessment',
        effects: { setFlags: ['roan_alliance_offered'] },
      },
      {
        id: 'c8_roan_esper_read',
        text: '[Esper] Read Roan\'s emotional state before committing. Is his loyalty real or transactional?',
        nextNode: 'c8_roan_assessment',
        requirements: { classes: ['esper'] },
        isHidden: true,
        effects: { intelligence: 3, setFlags: ['roan_esper_read', 'roan_genuine_loyalty_confirmed'] },
      },
      {
        id: 'c8_roan_assess_first',
        text: '"Tell me what you know about Veyra\'s repositioning. Then we talk plans."',
        nextNode: 'c8_square_crowd_state',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c8_roan_assessment',
    chapter: 'Chapter 8',
    title: 'Roan\'s Map',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    speaker: 'Captain Roan',
    text: `He spreads a hand-drawn map on the crate platform. "Three things: the Grain Vault on Level 9 — Iron Saints requisitioned it, Veyra controls the access. The Bone Soup Kitchen on Level 11 — civilian operated, Red Choir proximity, Mother Veyl has been appearing there. The Dead Orchard — sublevel agricultural ruin, used to supply twenty percent of the tunnel network before the Choir infection spread through the water filtration." He taps each point. "The Grain Vault is where the food is. The Kitchen is where the people are fed right now. The Orchard is where the food could come from again, if someone with the right knowledge got to the pre-collapse grow systems." He looks at you. "I heard something about the Last Archive. Something about a person with a mark who knows things. Tell me I heard correctly."`,
    effectsOnEnter: { setFlags: ['roan_map_shown', 'grain_vault_known', 'bone_soup_known', 'dead_orchard_known'], intelligence: 3 },
    choices: [
      {
        id: 'c8_roan_confirm_archive',
        text: '"You heard correctly. Which location first?"',
        nextNode: 'c8_square_choice',
        effects: { setFlags: ['roan_archive_confirmed'], lastArchive: 2 },
      },
      {
        id: 'c8_roan_chalk_first',
        text: '"The Hollow Children are watching us. Deal with them before we plan."',
        nextNode: 'c8_chalk_demand',
      },
    ],
  },

  {
    id: 'c8_chalk_demand',
    chapter: 'Chapter 8',
    title: 'Mother Chalk',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    speaker: 'Mother Chalk',
    text: `She does not waste time with pleasantries. The chalk marks on her coat — the Hollow Children's documentation system, every mark a record of a decision made in the deep tunnels — are recent; some are still powdery. "Thirty-one children," she says. "Thirty-one children who have not eaten in two days. Not because we chose this. Because the Saints moved the Level 6 cache without telling anyone, and our route through Level 9 is blocked by Veyra's checkpoints." She looks at you with the expression of someone who has had this exact conversation with many people who promised things they did not deliver. "I am not asking for a plan. I am asking for food. Three days' worth for thirty-one children is forty pounds of any protein source. Do you have forty pounds of protein, or are we talking about plans again?"`,
    effectsOnEnter: { setFlags: ['chalk_met', 'hollow_children_need_known'] },
    choices: [
      {
        id: 'c8_chalk_share_rations',
        text: '[Food ≥ 3] Share three rations from your personal supply. It\'s not forty pounds, but it\'s today.',
        nextNode: 'c8_square_choice',
        requirements: { food: 3 },
        effects: { food: -3, hollowChildren: 15, morale: 5, setFlags: ['chalk_rations_given'] },
      },
      {
        id: 'c8_chalk_promise',
        text: '"I am getting to the Grain Vault. When I do, the Hollow Children eat first."',
        nextNode: 'c8_square_choice',
        effects: { setFlags: ['hollow_children_promised'], hollowChildren: 8, morale: -2 },
      },
      {
        id: 'c8_chalk_refuse',
        text: '"I do not have forty pounds of protein. I have nothing to give right now."',
        nextNode: 'c8_square_choice',
        effects: { hollowChildren: -15, morale: -5, setFlags: ['chalk_refused'] },
      },
    ],
  },

  {
    id: 'c8_square_choice',
    chapter: 'Chapter 8',
    title: 'The War\'s Fronts',
    location: 'The Empty Ration Square',
    imageKey: 'empty_ration_square',
    text: `Roan is waiting. Chalk has walked back to her delegation. The square is getting louder — not a riot yet, but the ambient sound of people running out of patience and calories simultaneously. There are five places you can go. You cannot go to all of them before the situation in the square deteriorates further. The Water Riot at the broken aqueduct junction has been ongoing for six hours. The Burned Clinic is trying to operate on zero supplies. The Grain Vault is where the food is and where Veyra's checkpoint is. The Bone Soup Kitchen is feeding people now, at a cost no one has fully audited. The Scavenger Front is where Roan's militia is pushing the Saints' eastern supply line.`,
    effectsOnEnter: { setFlags: ['chapter8_hub_reached'] },
    choices: [
      {
        id: 'c8_go_water_riot',
        text: 'Go to the Water Riot. People are dying over the aqueduct junction.',
        nextNode: 'c8_water_riot_arrive',
      },
      {
        id: 'c8_go_clinic',
        text: 'Go to the Burned Clinic. Medicine is running out.',
        nextNode: 'c8_clinic_arrive',
      },
      {
        id: 'c8_go_grain_vault',
        text: 'Go to the Grain Vault. The food is there. So is Veyra.',
        nextNode: 'c8_grain_vault_arrive',
      },
      {
        id: 'c8_go_bone_soup',
        text: 'Go to the Bone Soup Kitchen. Find out what Mother Veyl is offering.',
        nextNode: 'c8_bone_soup_arrive',
      },
      {
        id: 'c8_go_scavenger',
        text: 'Go to the Scavenger Front. Support Roan\'s push on the Saints\' supply line.',
        nextNode: 'c8_scavenger_front_arrive',
      },
      {
        id: 'c8_go_aqueduct',
        text: 'Go to the Broken Aqueduct directly. Water is more urgent than food.',
        nextNode: 'c8_aqueduct_arrive',
      },
      {
        id: 'c8_go_dead_orchard',
        text: 'Go to the Dead Orchard. The pre-collapse agricultural system may be the real answer.',
        nextNode: 'c8_dead_orchard_arrive',
        requirements: { flags: ['dead_orchard_known'] },
      },
      {
        id: 'c8_go_siege_tunnels',
        text: 'Go to the Siege Tunnels. Roan\'s militia has been stuck at that junction for nineteen days.',
        nextNode: 'c8_siege_tunnels_arrive',
        requirements: { flags: ['roan_met'] },
      },
      {
        id: 'c8_square_sera_search',
        text: '[Sera was saved] You thought you saw a familiar face in the crowd. Find her.',
        nextNode: 'c8_famine_camp_arrive',
        requirements: { flags: ['sera_saved_ch3'] },
        isHidden: true,
        effects: { setFlags: ['sera_search_started'] },
      },
    ],
  },

  // ── THE WATER RIOT ───────────────────────────────────────────────────────────

  {
    id: 'c8_water_riot_arrive',
    chapter: 'Chapter 8',
    title: 'The Water Riot',
    location: 'The Water Riot',
    imageKey: 'water_riot',
    text: `The broken aqueduct junction is a chokepoint: one functional pipe feeding six tunnel sections through a distribution manifold that the Hollow Children built fifteen years ago and the Iron Saints have been trying to control for three. The riot started when a Saints checkpoint blocked civilian access. It has been going for six hours. The crowd here is different from the ration square — more desperate, past the threshold where hunger and thirst produce patience. People are moving in surges, pushing against the Saints' barricade, and the barricade is holding but the soldiers behind it are scared, which is more dangerous than confident soldiers. Someone is going to fire. You cannot tell who will do it first.`,
    effectsOnEnter: { hunger: -5, thirst: -8 },
    choices: [
      {
        id: 'c8_riot_push_through',
        text: '[Roll dice — Agility] Push through the crowd before the violence starts.',
        nextNode: 'c8_water_riot_arrive',
        diceCheck: {
          stat: 'agility',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c8_riot_survive',
          failureNode: 'c8_water_riot_death_end',
        },
      },
      {
        id: 'c8_riot_negotiate_attempt',
        text: 'Find the Saints checkpoint commander. Negotiate before it escalates.',
        nextNode: 'c8_riot_negotiate',
      },
      {
        id: 'c8_riot_share_water',
        text: '[Water ≥ 2] Open your canteen to the nearest crowd. Show the Saints it can be done.',
        nextNode: 'c8_riot_peace',
        requirements: { water: 2 },
        effects: { water: -2, hollowChildren: 5, morale: 5, setFlags: ['water_shared_riot'] },
      },
    ],
  },

  {
    id: 'c8_riot_negotiate',
    chapter: 'Chapter 8',
    title: 'The Checkpoint Commander',
    location: 'The Water Riot',
    imageKey: 'water_riot',
    text: `The checkpoint commander is a Saints lieutenant who is eighteen months past her posted tour length. She knows this riot is her fault — not her orders, but her enforcement of them — and she is looking for a way out that does not require her to contradict Veyra's directive. This is the opening. If you can give her a framing that makes civilian water access look like Saints generosity rather than Saints concession, she will take it. She is not cruel. She is tired and operating without good options.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c8_riot_negotiate_dice',
        text: '[Roll dice — Charisma] Frame civilian access as Saints humanitarian action.',
        nextNode: 'c8_riot_negotiate',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c8_riot_peace',
          failureNode: 'c8_riot_survive',
        },
      },
      {
        id: 'c8_riot_soldier_protocol',
        text: '[Exiled Soldier] Use Iron Saints protocol language. Frame access as a tactical withdrawal to defensible position.',
        nextNode: 'c8_riot_peace',
        requirements: { backgrounds: ['exiled_soldier'] },
        isHidden: true,
        effects: { ironSaints: 5, setFlags: ['saints_checkpoint_negotiated'], intelligence: 2 },
      },
    ],
  },

  {
    id: 'c8_riot_survive',
    chapter: 'Chapter 8',
    title: 'Through the Riot',
    location: 'The Water Riot',
    imageKey: 'water_riot',
    text: `You are through. The barricade came down while you were moving — the crowd and the dismantler finished what they started, and the Saints lieutenant either ordered her soldiers back or her soldiers retreated without being ordered, which amounts to the same thing in immediate terms. The water flows. Not enough, not clean enough, not reliable enough, but flowing. People are moving toward the pipe with cups and containers and the specific reverence of people who have been thirsty for six hours. The riot's violence potential has dropped below the ignition threshold. For now.`,
    effectsOnEnter: { setFlags: ['water_riot_survived'], water: 1, morale: 5, ironSaints: -8 },
    choices: [
      {
        id: 'c8_riot_continue',
        text: 'The riot is over. Move to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
      },
      {
        id: 'c8_riot_manage_water',
        text: 'Stay and manage the water distribution. The flow will be contested in minutes.',
        nextNode: 'c8_riot_water_division',
      },
    ],
  },

  {
    id: 'c8_riot_peace',
    chapter: 'Chapter 8',
    title: 'Water Shared',
    location: 'The Water Riot',
    imageKey: 'water_riot',
    text: `The checkpoint opens. The Saints lieutenant frames it as a "temporary civilian access measure pending formal review" — the paperwork that nobody will ever file, protecting a decision that does not need protection because it is correct. The crowd gets to the water. There is no ceremony. People drink, fill containers, carry water back toward families they left waiting. For eleven minutes, the tunnel junction runs on something that resembles order. Then a messenger from the Grain Vault arrives with news that Veyra has moved the access schedule forward, and everything that paused for eleven minutes resumes.`,
    effectsOnEnter: { setFlags: ['water_riot_resolved'], water: 2, morale: 10, hollowChildren: 5, ironSaints: 5 },
    choices: [
      {
        id: 'c8_peace_forward',
        text: 'The water is secured. Get to the Grain Vault.',
        nextNode: 'c8_famine_camp_arrive',
      },
    ],
  },

  // ── THE BURNED CLINIC ────────────────────────────────────────────────────────

  {
    id: 'c8_clinic_arrive',
    chapter: 'Chapter 8',
    title: 'The Burned Clinic',
    location: 'The Burned Clinic',
    imageKey: 'burned_clinic',
    text: `The clinic was set on fire six weeks ago by a group the Saints call "resource reclaimers" and everyone else calls raiders. It operates out of the burned shell because the patients cannot move and the operator refuses to abandon them. The smell of old smoke is still in the walls. The current operator is Juno — if you know Juno, you recognise her; if you do not, she introduces herself without context for why she is here. She has thirty-one patients in a space designed for eight. She has medicine for approximately four more days, less if the severity cases need higher doses. She looks at you the way people look at someone they have been hoping would arrive.`,
    effectsOnEnter: { setFlags: ['burned_clinic_arrived', 'juno_clinic_present'] },
    choices: [
      {
        id: 'c8_clinic_help',
        text: '"Tell me what you need. I will get it."',
        nextNode: 'c8_mira_clinic_work',
      },
      {
        id: 'c8_clinic_assess',
        text: '"Walk me through the severity cases. I need to understand what is critical."',
        nextNode: 'c8_clinic_supplies_low',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c8_mira_clinic_work',
    chapter: 'Chapter 8',
    title: 'Medical Work',
    location: 'The Burned Clinic',
    imageKey: 'burned_clinic',
    speaker: 'Juno',
    text: `Juno's clinical assessment is precise and without sentiment, which is the most useful kind. "Three patients will not survive without surgery I cannot perform. Eight patients will recover without additional medicine if they can be fed properly. The other twenty can be stabilised indefinitely if I have consistent medicine and consistent food." She looks at her inventory. "I have medicine for four days. I do not have consistent food." She pauses. "Mira taught me this approach. She was here for a week, before — " she stops. "She left a supply method. I am using it."`,
    effectsOnEnter: { setFlags: ['juno_assessment_given'], morale: -5 },
    choices: [
      {
        id: 'c8_clinic_medicine_give',
        text: '[Medicine ≥ 2] Give your personal medicine supply to the clinic.',
        nextNode: 'c8_clinic_choice',
        requirements: { medicine: 2 },
        effects: { medicine: -2, miraTrust: 5, hollowChildren: 5, setFlags: ['personal_medicine_donated'] },
      },
      {
        id: 'c8_clinic_find_supply',
        text: 'The clinic needs medicine. Find it.',
        nextNode: 'c8_clinic_supplies_low',
      },
      {
        id: 'c8_clinic_medic_extend',
        text: '[Underground Medic] You know rationing techniques that can extend four days to eight. Show Juno.',
        nextNode: 'c8_clinic_choice',
        requirements: { backgrounds: ['underground_medic'] },
        isHidden: true,
        effects: { intelligence: 3, setFlags: ['medicine_rationed_extended'], miraTrust: 3 },
      },
    ],
  },

  {
    id: 'c8_clinic_supplies_low',
    chapter: 'Chapter 8',
    title: 'Four Days Left',
    location: 'The Burned Clinic',
    imageKey: 'burned_clinic',
    text: `The supply inventory is on a chalk board because Juno does not waste paper. Fourteen compounds. Seven of them critical. Three of them below minimum effective dosage if rationed. The Glass Court has medicine, but their access requires citizenship documentation or a barter agreement. The black market has medicine at twelve times pre-shortage prices. Juno has been doing the math and the math does not add up. She is not asking you to fix it. She is telling you the numbers, because that is what she knows how to do.`,
    effectsOnEnter: { setFlags: ['clinic_supply_crisis_known'] },
    choices: [
      {
        id: 'c8_clinic_glass_court',
        text: 'Negotiate with the Glass Court for medicine.',
        nextNode: 'c8_clinic_choice',
        effects: { glassCourt: -5, setFlags: ['glass_court_medicine_sought'] },
      },
      {
        id: 'c8_clinic_black_market',
        text: '[Black Market Courier] You know supplier contacts who can source medicine without Glass Court pricing.',
        nextNode: 'c8_clinic_choice',
        requirements: { backgrounds: ['black_market_courier'] },
        isHidden: true,
        effects: { setFlags: ['black_market_medicine'], scrap: -2, medicine: 2 },
      },
      {
        id: 'c8_clinic_luck_search',
        text: 'Search the burned clinic\'s ruins for surviving supplies.',
        nextNode: 'c8_clinic_medicine_dice',
      },
    ],
  },

  {
    id: 'c8_clinic_choice',
    chapter: 'Chapter 8',
    title: 'Triage Decision',
    location: 'The Burned Clinic',
    imageKey: 'burned_clinic',
    text: `The medicine situation is better than it was. Not good, but there is enough now to stabilise most of the critical cases. The remaining decision is the triage question Juno has been avoiding: who gets the medicine if there is not enough for everyone. The three patients who need surgery are not treatable with what is available. The eight who can recover with food need food more than medicine. The twenty who need consistent medicine are the group where the remaining supply matters most. Juno has already run this calculation and does not want to be the one to say it out loud.`,
    effectsOnEnter: { setFlags: ['triage_decision_reached'], morale: -5 },
    choices: [
      {
        id: 'c8_triage_treat_all',
        text: 'Treat all cases equally. Spread the medicine across all patients.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { hollowChildren: 5, morale: 5, medicine: -1, setFlags: ['medicine_distributed_equally'] },
      },
      {
        id: 'c8_triage_prioritize',
        text: 'Prioritise the twenty stable cases. Maximise the number who survive.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { intelligence: 2, morale: -5, setFlags: ['medicine_triaged'] },
      },
    ],
  },

  {
    id: 'c8_clinic_medicine_dice',
    chapter: 'Chapter 8',
    title: 'Searching the Ruins',
    location: 'The Burned Clinic',
    imageKey: 'burned_clinic',
    text: `The clinic's burned storage area has been picked over by two previous search parties. But the fire burned uneven, and one section of the back wall collapsed inward rather than outward, which might mean something was protected rather than destroyed. The search takes twenty minutes of crawling through debris. You find the section. You open it. The question is what is inside.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c8_clinic_search_dice',
        text: '[Roll dice — Luck] Search the collapsed back section for surviving supplies.',
        nextNode: 'c8_clinic_medicine_dice',
        diceCheck: {
          stat: 'luck',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c8_clinic_choice',
          failureNode: 'c8_mira_last_medicine_end',
        },
      },
    ],
  },

  // ── THE GRAIN VAULT ──────────────────────────────────────────────────────────

  {
    id: 'c8_grain_vault_arrive',
    chapter: 'Chapter 8',
    title: 'The Grain Vault',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `Level 9, Section 7. The Grain Vault holds approximately six weeks of food for the tunnel network's current population — or twelve weeks for half the population, which is how Saint Veyra is calculating it. Her checkpoint is at the entrance: four Saints soldiers, a biometric reader added last week, and a scheduling board. The next civilian slot is in eleven days. Roan's militia is not on the board. The Hollow Children are not on the board. Juno's clinic is not on the board. Lady Seraphine's name appears twice — today and tomorrow. The Glass Court eats on schedule.`,
    effectsOnEnter: { setFlags: ['grain_vault_arrived'], hunger: -3 },
    choices: [
      {
        id: 'c8_vault_find_roan',
        text: 'Find Roan. Plan the approach together.',
        nextNode: 'c8_vault_roan_plan',
      },
      {
        id: 'c8_vault_find_seraphine',
        text: 'Find Seraphine before her access window. Negotiate.',
        nextNode: 'c8_vault_seraphine_offer',
      },
      {
        id: 'c8_vault_find_veyra',
        text: 'Approach the checkpoint directly. Confront Veyra\'s scheduling.',
        nextNode: 'c8_vault_veyra_enforce',
      },
      {
        id: 'c8_vault_survey_interior',
        text: 'Survey the vault interior first. Understand what is here before deciding how to move it.',
        nextNode: 'c8_vault_interior_survey',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c8_vault_roan_plan',
    chapter: 'Chapter 8',
    title: 'Roan\'s Plan',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    speaker: 'Captain Roan',
    text: `"Four soldiers," he says, studying the checkpoint. "One of them is paying attention. The others are cold and bored." He has already mapped the maintenance corridor running parallel to the vault's main entrance — twelve years of tunnel living teaches you to look for the secondary access. "The maintenance corridor connects to the ventilation system on Level 8. The ventilation system connects to the vault's interior through an air exchange unit. A person could fit through it. A person with good agility and no sharp corners on their equipment." He looks at you. "I am not a small person. I am telling you what I see."`,
    effectsOnEnter: { setFlags: ['vault_maintenance_route_known'] },
    choices: [
      {
        id: 'c8_vault_use_corridor',
        text: '[Roll dice — Agility] Use the maintenance corridor. Get to the vault interior.',
        nextNode: 'c8_vault_roan_plan',
        diceCheck: {
          stat: 'agility',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c8_vault_distribute',
          failureNode: 'c8_vault_hoard',
        },
      },
      {
        id: 'c8_vault_cain_plan',
        text: 'Let Roan\'s militia run a supply raid. Direct the operation.',
        nextNode: 'c8_vault_cain_raid_offer',
      },
    ],
  },

  {
    id: 'c8_vault_seraphine_offer',
    chapter: 'Chapter 8',
    title: 'Lady Seraphine\'s Terms',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    speaker: 'Lady Seraphine',
    text: `She is dressed for the tunnels — a studied approximation of deprivation that insults everyone who is actually deprived. "I have been waiting for you," she says. "The Glass Court's allocation for this cycle is sufficient to supply the Hollow Children and Roan's militia for three weeks. We are prepared to offer this allocation — not as charity, but as a humanitarian partnership — in exchange for access to the Sublevel Fourteen agricultural ruins. We want the access and the output." She waits. "The alternative is we maintain our current allocation, which does not include the Hollow Children or the militia."`,
    effectsOnEnter: { setFlags: ['seraphine_offer_made'] },
    choices: [
      {
        id: 'c8_seraphine_accept_deal',
        text: 'Accept Seraphine\'s deal. Food now, agricultural access later.',
        nextNode: 'c8_glass_court_feast_end',
        effects: { glassCourt: 20, hollowChildren: 10, setFlags: ['seraphine_deal_accepted'], morale: -10 },
      },
      {
        id: 'c8_seraphine_inspect',
        text: 'Inspect the Glass Court\'s allocation before accepting. Verify it is what she claims.',
        nextNode: 'c8_vault_veyra_enforce',
        effects: { intelligence: 3, setFlags: ['seraphine_offer_inspected'] },
      },
      {
        id: 'c8_seraphine_noble_counter',
        text: '[Fallen Noble] Counter with noble negotiation protocol. Force better terms.',
        nextNode: 'c8_vault_distribute',
        requirements: { backgrounds: ['fallen_noble'] },
        isHidden: true,
        effects: { glassCourt: 5, setFlags: ['seraphine_terms_improved'], food: 4, morale: 5 },
      },
      {
        id: 'c8_seraphine_refuse',
        text: 'Refuse the deal. The agricultural ruins belong to the tunnel network.',
        nextNode: 'c8_vault_veyra_enforce',
        effects: { glassCourt: -15, setFlags: ['seraphine_refused'] },
      },
    ],
  },

  {
    id: 'c8_vault_veyra_enforce',
    chapter: 'Chapter 8',
    title: 'Saint Veyra',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    speaker: 'Saint Veyra',
    text: `She is exactly what you expected and exactly as immovable. "The allocation schedule is correct," she says, in the tone of someone who has said this twelve times today. "The Iron Saints maintain the Grain Vault. The allocation is calculated to ensure long-term population stability. Short-term shortfalls are a necessary component of long-term stability." She looks at you. "The Saints' water distribution on Level 5 is open to civilian access under standard protocol. I can provide a document authorising your group." She slides a document across. It is the same document that caused the Water Riot.`,
    effectsOnEnter: { setFlags: ['veyra_met', 'saints_position_known'], ironSaints: -5 },
    choices: [
      {
        id: 'c8_veyra_accept_document',
        text: 'Accept the document and Level 5 water access.',
        nextNode: 'c8_water_poison_end',
        effects: { ironSaints: 5, water: 1, setFlags: ['veyra_document_accepted'] },
      },
      {
        id: 'c8_veyra_shadow_broker',
        text: '[Shadow Broker] Use knowledge of the Saints\' supply chain vulnerabilities to force a concession.',
        nextNode: 'c8_vault_distribute',
        requirements: { classes: ['shadow_broker'] },
        isHidden: true,
        effects: { ironSaints: -20, setFlags: ['veyra_leverage_used'], food: 5 },
      },
      {
        id: 'c8_veyra_reject_use_route',
        text: 'Reject the document. The Level 5 water is the same supply that caused the riot.',
        nextNode: 'c8_vault_infiltrate',
        effects: { ironSaints: -10, intelligence: 2 },
      },
    ],
  },

  {
    id: 'c8_vault_cain_raid_offer',
    chapter: 'Chapter 8',
    title: 'The Ration Raid',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `Roan has forty-three people. The Saints have four at the checkpoint and twelve more in the vault's interior. A coordinated simultaneous approach at three entry points would overwhelm the twelve interior Saints before the four at the checkpoint could respond. The food would be redistributed within two hours. The cost: the Saints will retaliate, the vault will be permanently militarised, and Veyra will have justification for everything she has been doing. Also, three of the forty-three people will almost certainly be injured. Roan is being honest about all of this.`,
    effectsOnEnter: { setFlags: ['cain_raid_option_presented'] },
    choices: [
      {
        id: 'c8_raid_approve',
        text: 'Approve the raid. The food needs to move.',
        nextNode: 'c8_cain_ration_raid_end',
        effects: { setFlags: ['ration_raid_approved'], ironSaints: -25, morale: 10, cainTrust: 5 },
      },
      {
        id: 'c8_raid_refuse_use_route',
        text: 'Refuse the raid. Use the maintenance corridor instead.',
        nextNode: 'c8_vault_infiltrate',
        effects: { setFlags: ['raid_refused_stealth_chosen'] },
      },
    ],
  },

  {
    id: 'c8_vault_infiltrate',
    chapter: 'Chapter 8',
    title: 'Inside the Vault',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `The maintenance corridor is narrow, cold, and smells of old lubricant. The vault interior, when you reach it, is larger than expected: a pre-collapse food preservation chamber with racking systems still functional, temperature controlled by a relic-adjacent environmental unit. The food is here. Six weeks of protein and carbohydrate stores for the full tunnel population. The Saints' interior guards are not guarding the food — they are guarding the access terminal. Which means the food is accessible if you can get past the terminal.`,
    effectsOnEnter: { setFlags: ['vault_infiltrated'], agility: 2 },
    choices: [
      {
        id: 'c8_vault_distribute_choice',
        text: 'Open the distribution system. Get food to the people who need it.',
        nextNode: 'c8_vault_distribute',
      },
      {
        id: 'c8_vault_hoard_choice',
        text: 'Take what you need for your group. Leave the rest secured.',
        nextNode: 'c8_vault_hoard',
      },
    ],
  },

  {
    id: 'c8_vault_distribute',
    chapter: 'Chapter 8',
    title: 'The Distribution',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `The distribution takes four hours. Roan's militia manages the queue. Chalk's delegation arrives within the first hour — someone told them, or they have been watching the vault longer than anyone knew. The Burned Clinic receives a supply delivery. The ration square receives crates. Not everything goes everywhere — there is not enough for that and there never was — but the triage is public, documented, carried out with Roan's militia as witnesses. Veyra will arrive within twelve hours. The vault will be locked again. What has been distributed cannot be undistributed.`,
    effectsOnEnter: { setFlags: ['vault_distributed', 'grain_distributed'], food: 5, hollowChildren: 20, ironSaints: -20, morale: 15, glassCourt: -10 },
    choices: [
      {
        id: 'c8_distribute_tactician',
        text: '[Tactician] Optimise the distribution formula. Stretch the supply 15% further.',
        nextNode: 'c8_famine_camp_arrive',
        requirements: { classes: ['tactician'] },
        isHidden: true,
        effects: { intelligence: 4, food: 2, setFlags: ['distribution_optimised'] },
      },
      {
        id: 'c8_distribute_proceed',
        text: 'The distribution is done. Move to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
      },
    ],
  },

  {
    id: 'c8_vault_hoard',
    chapter: 'Chapter 8',
    title: 'The Hoard',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `You take what your group needs. Fourteen days of food for the people directly in your sphere of responsibility. It is logical, bounded, sustainable — the same arithmetic Veyra is running, at a different scale. The people outside your sphere of responsibility will face the same shortage tomorrow that they face today. The difference is you will face it with fourteen days of buffer. You know the names of some of the people outside your sphere. You know Chalk has thirty-one children. The food in your pack does not get heavier, but it does not get lighter either.`,
    effectsOnEnter: { setFlags: ['vault_hoarded'], food: 8, hollowChildren: -20, morale: -15, corruption: 3 },
    choices: [
      {
        id: 'c8_hoard_armed_enforce',
        text: '[Ammo ≥ 2] Use armed security to protect the hoard. Enforce the decision.',
        nextNode: 'c8_ration_tyrant_end',
        requirements: { ammo: 2 },
        effects: { ammo: -2, ironSaints: -15, setFlags: ['hoard_armed_enforced'] },
      },
      {
        id: 'c8_hoard_move_on',
        text: 'The decision is made. Move to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { corruption: 2 },
      },
    ],
  },

  // ── THE BONE SOUP KITCHEN ────────────────────────────────────────────────────

  {
    id: 'c8_bone_soup_arrive',
    chapter: 'Chapter 8',
    title: 'The Bone Soup Kitchen',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `The Kitchen is real. The smell of it — broth, marrow, something root-vegetable that should not be available at this depth — hits you before you see it. A pre-collapse commissary, repurposed, run by a rotating collective of tunnel residents who have been feeding people for eight years. No faction affiliation, no access restriction, no door. The queue is longer than the space it is designed for. A woman at the service counter with red-stained fingertips and an expression of absolute concentration is Mother Veyl, although no one has introduced her.`,
    effectsOnEnter: { setFlags: ['bone_soup_arrived'] },
    choices: [
      {
        id: 'c8_soup_work',
        text: 'Offer to help. Work the kitchen.',
        nextNode: 'c8_soup_kitchen_work',
        effects: { hunger: 5, morale: 5 },
      },
      {
        id: 'c8_soup_observe_veyl',
        text: 'Watch Veyl. Something about the red stains on her fingertips is wrong.',
        nextNode: 'c8_soup_veyl_appear',
        effects: { intelligence: 2 },
      },
      {
        id: 'c8_soup_talk_collective',
        text: 'Talk to the kitchen collective before making any moves. They have been running this longer than anyone.',
        nextNode: 'c8_soup_kitchen_collective',
        effects: { morale: 3 },
      },
    ],
  },

  {
    id: 'c8_soup_kitchen_work',
    chapter: 'Chapter 8',
    title: 'Working the Kitchen',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `Four hours at the service counter changes your understanding of the shortage. It is not abstract when you are ladling broth to a grandmother who has been standing for two hours, to a child who holds the bowl with both hands and does not put it down even to breathe, to a man who says thank you with the tone of someone who was not certain they would be able to say it. The kitchen is not a solution. It is not a solution. It is a presence, a maintenance of warmth in a system going cold. You could stay here. The question of whether staying here is the right choice is the question of whether presence is enough — and the answer is that it is not enough and also that it is irreplaceable, and both things are true at the same time.`,
    effectsOnEnter: { hunger: 5, morale: 8, hollowChildren: 5 },
    choices: [
      {
        id: 'c8_soup_stay_neutral',
        text: 'Stay at the kitchen. This is the work that matters right now.',
        nextNode: 'c8_bone_soup_end',
        effects: { setFlags: ['bone_soup_route_chosen'] },
      },
      {
        id: 'c8_soup_continue',
        text: 'The kitchen is covered. Move to the deeper crisis.',
        nextNode: 'c8_soup_veyl_appear',
      },
    ],
  },

  {
    id: 'c8_soup_veyl_appear',
    chapter: 'Chapter 8',
    title: 'Mother Veyl\'s Offer',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    speaker: 'Mother Veyl',
    text: `She moves to stand next to you without announcing herself. The Red Choir mark on her wrist is the older style, pre-Sann. "The Kitchen will run out of broth tomorrow," she says. "I have an ingredient that will extend the supply by eleven days. It is derived from the Choir's biological infrastructure. The hunger-suppressing compound has a low-concentration cousin that simply increases satiation efficiency. Not addictive at this concentration. Not infectious. Eleven extra days of supply." She looks at you. "I am not asking for anything in return. I am offering this because people are hungry and I can help."`,
    effectsOnEnter: { setFlags: ['veyl_offer_made'] },
    choices: [
      {
        id: 'c8_soup_accept',
        text: 'Accept Veyl\'s offer. Eleven days is eleven days.',
        nextNode: 'c8_soup_accept_veyl',
        effects: { redChoir: 10, setFlags: ['veyl_compound_accepted'] },
      },
      {
        id: 'c8_soup_reject',
        text: 'Reject the offer. Red Choir compounds in the food supply is not a risk worth taking.',
        nextNode: 'c8_soup_reject_veyl',
        effects: { redChoir: -10, setFlags: ['veyl_compound_rejected'] },
      },
      {
        id: 'c8_soup_experiment_check',
        text: '[Runaway Experiment] You know enough about the Choir\'s compound from your own experience. Verify it first.',
        nextNode: 'c8_soup_infected_cost',
        requirements: { backgrounds: ['runaway_experiment'] },
        isHidden: true,
        effects: { intelligence: 4, setFlags: ['choir_compound_verified'] },
      },
    ],
  },

  {
    id: 'c8_soup_infected_cost',
    chapter: 'Chapter 8',
    title: 'What the Compound Is',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `The compound is what Veyl says it is — at this concentration. The Runaway Experiment's knowledge of Choir biological architecture is detailed enough to read the difference between the addictive full-concentration version and this. Veyl is not lying about the composition. What she is not mentioning: eleven days of this compound in the food supply will produce mild residual sensitivity to the Choir's broadcast frequency in approximately thirty percent of the population — not dependency, not infection, but attunement. The people who eat this soup for eleven days will hear the Choir's signal slightly more clearly. That is not nothing.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['choir_compound_analysed'] },
    choices: [
      {
        id: 'c8_soup_accept_knowing',
        text: 'Accept the compound knowing the attunement risk. Eleven days matters more.',
        nextNode: 'c8_soup_accept_veyl',
        effects: { redChoir: 10, corruption: 2 },
      },
      {
        id: 'c8_soup_reject_knowing',
        text: 'Reject the compound. The attunement risk is unacceptable even at this level.',
        nextNode: 'c8_soup_reject_veyl',
        effects: { redChoir: -5, morale: -3 },
      },
    ],
  },

  {
    id: 'c8_soup_accept_veyl',
    chapter: 'Chapter 8',
    title: 'The Choir\'s Kitchen',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `The compound goes into the broth. The Kitchen extends its supply. People eat for eleven days who might not have eaten. By day three, word has spread that the soup is more filling than it should be. By day six, the Kitchen has become the largest single food distribution point in the tunnel network. By day nine, Veyl has quietly added a second compound — also low-concentration, also deniable, also something the Runaway Experiment might have flagged as the next step in a careful process that is not what it presented itself as.`,
    effectsOnEnter: { setFlags: ['choir_kitchen_established'], redChoir: 20, hollowChildren: 10, corruption: 5, morale: -5 },
    choices: [
      {
        id: 'c8_soup_dependency_path',
        text: 'The Kitchen is fed. So is the Choir\'s reach.',
        nextNode: 'c8_choir_dependency_end',
        effects: { setFlags: ['choir_dependency_pathway'] },
      },
    ],
  },

  {
    id: 'c8_soup_reject_veyl',
    chapter: 'Chapter 8',
    title: 'Without the Compound',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `Veyl accepts the refusal without visible reaction. The Kitchen runs out of broth the next day, as she predicted. The collective improvises — everyone improvises — and the supply stretches three days past what seemed possible through rationing discipline and donated scrap from tunnel residents who were not hungry. Three days is not eleven days. But it is three days more than the compound would have cost.`,
    effectsOnEnter: { setFlags: ['veyl_rejected_kitchen'], redChoir: -10, morale: 5, hollowChildren: -5 },
    choices: [
      {
        id: 'c8_soup_reject_forward',
        text: 'The Kitchen is doing what it can. Move to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
      },
    ],
  },

  // ── THE SCAVENGER FRONT ──────────────────────────────────────────────────────

  {
    id: 'c8_scavenger_front_arrive',
    chapter: 'Chapter 8',
    title: 'The Scavenger Front',
    location: 'The Scavenger Front',
    imageKey: 'scavenger_front',
    text: `Roan's eastern push is pinned. The Saints' supply line runs through a tunnel junction that Roan's militia has been trying to reach for six days. The Saints know about the push and have reinforced with two additional soldiers and a relic-powered alarm system covering the main approach. Roan's second-in-command — a quiet person named Dever who was an electrician before the shortage — has found a secondary tunnel but is not confident it doesn't connect to the alarm system's sensor net.`,
    effectsOnEnter: { setFlags: ['scavenger_front_arrived'], hunger: -3 },
    choices: [
      {
        id: 'c8_front_assess_roan',
        text: 'Get Roan\'s full tactical picture.',
        nextNode: 'c8_front_roan_position',
      },
      {
        id: 'c8_front_blade_push',
        text: '[Blade Survivor] Lead the secondary tunnel approach. Rely on your combat instincts.',
        nextNode: 'c8_front_cain_tactical',
        requirements: { classes: ['blade_survivor'] },
        isHidden: true,
        effects: { strength: 3, setFlags: ['blade_survivor_front_lead'] },
      },
    ],
  },

  {
    id: 'c8_front_roan_position',
    chapter: 'Chapter 8',
    title: 'The Line',
    location: 'The Scavenger Front',
    imageKey: 'scavenger_front',
    speaker: 'Captain Roan',
    text: `"We have been here six days because I did not want to take casualties over a supply line if there was a way through that didn't cost people. There might not be." He shows you Dever's sketch. "The alarm system is relic-tech. Dever says it is the same model the Glass Court used in their Chapter 5 installation — directional sensors, not area coverage. If the approach angle is shallow enough, the secondary tunnel might be under the sensor sweep." He pauses. "I have people who have not eaten properly in a week. Their effectiveness in a forced engagement is below what I would want."`,
    effectsOnEnter: { setFlags: ['front_tactical_briefing'], intelligence: 2 },
    choices: [
      {
        id: 'c8_front_push_plan',
        text: 'Plan the push. Use the secondary tunnel.',
        nextNode: 'c8_front_cain_tactical',
      },
      {
        id: 'c8_front_scholar_route',
        text: '[Forgotten Scholar] The Glass Court sensor model has a documented calibration gap. Find it.',
        nextNode: 'c8_front_push_success',
        requirements: { backgrounds: ['forgotten_scholar'] },
        isHidden: true,
        effects: { intelligence: 4, setFlags: ['sensor_gap_found'], ironSaints: -10, food: 3 },
      },
    ],
  },

  {
    id: 'c8_front_cain_tactical',
    chapter: 'Chapter 8',
    title: 'The Push',
    location: 'The Scavenger Front',
    imageKey: 'scavenger_front',
    text: `The secondary tunnel approach requires exact timing: the alarm system has a thirty-second cycling gap every four minutes. The push is three people through the secondary tunnel during the gap, then opening the service access from the inside. The problem: "inside" contains two Saints soldiers who were not in Dever's original count.`,
    effectsOnEnter: { setFlags: ['front_push_initiated'] },
    choices: [
      {
        id: 'c8_front_push_dice',
        text: '[Roll dice — Strength] Push through. Two soldiers, bad odds, necessary.',
        nextNode: 'c8_front_cain_tactical',
        diceCheck: {
          stat: 'strength',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c8_front_push_success',
          failureNode: 'c8_front_fallback',
        },
      },
      {
        id: 'c8_front_health_push',
        text: '[Health ≥ 60] Push regardless. You can absorb the engagement.',
        nextNode: 'c8_front_push_success',
        requirements: { health: 60 },
        effects: { health: -15, strength: 2, setFlags: ['front_pushed_through_health'] },
      },
    ],
  },

  {
    id: 'c8_front_push_success',
    chapter: 'Chapter 8',
    title: 'Supply Line Broken',
    location: 'The Scavenger Front',
    imageKey: 'scavenger_front',
    text: `The supply line is open. Three crates of Iron Saints field rations — calorie-dense, not palatable, exactly right — are out before Veyra's reinforcements arrive. Roan's militia has a three-day advantage. It is not a victory in any form that ends the shortage, but it is food for forty-three people who were running below functional calorie levels, and functional calorie levels matter when the next phase of this crisis requires everyone to think and move and decide.`,
    effectsOnEnter: { setFlags: ['supply_line_broken', 'saints_food_secured'], food: 5, ironSaints: -20, morale: 10 },
    choices: [
      {
        id: 'c8_front_success_forward',
        text: 'The front is secured. Move to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
      },
    ],
  },

  {
    id: 'c8_front_fallback',
    chapter: 'Chapter 8',
    title: 'Retreat',
    location: 'The Scavenger Front',
    imageKey: 'scavenger_front',
    text: `The push fails. The two Saints soldiers respond faster than the timing window allows, and the three-person team falls back through the secondary tunnel. No casualties, barely. Roan does not say anything about it. Dever is recalibrating. The supply line remains intact. Three militia members have injuries from the engagement. Three more are below functional calorie levels. The secondary tunnel is no longer viable; the Saints will have covered it within the hour.`,
    effectsOnEnter: { setFlags: ['front_push_failed'], ironSaints: -5, morale: -10, health: -10 },
    choices: [
      {
        id: 'c8_fallback_ambush',
        text: 'Regroup at the fallback position. Wait for another opening.',
        nextNode: 'c8_scavenger_ambush_end',
        effects: { setFlags: ['scavenger_ambush_set'] },
      },
      {
        id: 'c8_fallback_retreat',
        text: 'Full retreat. Cut losses. Go to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { morale: -5, ironSaints: 5 },
      },
    ],
  },

  // ── THE BROKEN AQUEDUCT ──────────────────────────────────────────────────────

  {
    id: 'c8_aqueduct_arrive',
    chapter: 'Chapter 8',
    title: 'The Broken Aqueduct',
    location: 'The Broken Aqueduct',
    imageKey: 'broken_aqueduct',
    text: `The Aqueduct is a pre-collapse water distribution system — ceramic pipe, relic-adjacent flow regulators, a maintenance access point on Level 12 that nobody has successfully accessed in three years because the access terminal requires a relic-interface credential nobody had. Until now. The mark responds to the terminal — a faint recognition, not the same architecture as the sleeping server but related. The break is mechanical: a flow regulator that failed under pressure load and was never replaced. The aqueduct carries water for twelve thousand people.`,
    effectsOnEnter: { setFlags: ['aqueduct_arrived'], intelligence: 2 },
    choices: [
      {
        id: 'c8_aqueduct_assess_repair',
        text: 'Assess the repair requirements.',
        nextNode: 'c8_aqueduct_assess',
      },
      {
        id: 'c8_aqueduct_check_downstream',
        text: 'Walk the downstream sections first. Understand how many people this break is affecting.',
        nextNode: 'c8_aqueduct_downstream_check',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c8_aqueduct_assess',
    chapter: 'Chapter 8',
    title: 'The Break',
    location: 'The Broken Aqueduct',
    imageKey: 'broken_aqueduct',
    text: `The flow regulator is a ceramic housing with a relic-adjacent pressure membrane. The housing is cracked — repairable with the right material compound — and the membrane has deformed but not destroyed. Dever's salvage assessment says the repair requires two salvage units of ceramic-adjacent material, a pressure tool to reset the membrane, and approximately four hours of work. He has the tool. You have or do not have the material.`,
    effectsOnEnter: { setFlags: ['aqueduct_damage_assessed'], intelligence: 2 },
    choices: [
      {
        id: 'c8_aqueduct_scrap_repair',
        text: '[Scrap ≥ 2] Use salvage materials from your pack to patch the housing.',
        nextNode: 'c8_aqueduct_repair_success',
        requirements: { scrap: 2 },
        effects: { scrap: -2, water: 3, setFlags: ['aqueduct_repaired'], hollowChildren: 10, ironSaints: 5 },
      },
      {
        id: 'c8_aqueduct_repair_attempt',
        text: '[Roll dice — Intelligence] Improvise a repair with available materials.',
        nextNode: 'c8_aqueduct_assess',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c8_aqueduct_repair_success',
          failureNode: 'c8_aqueduct_repair_fail',
        },
      },
      {
        id: 'c8_aqueduct_relic_repair',
        text: '[Relic Hunter] Interface with the relic-adjacent membrane directly. Force the regulator to reset.',
        nextNode: 'c8_aqueduct_repair_success',
        requirements: { classes: ['relic_hunter'] },
        isHidden: true,
        effects: { intelligence: 3, corruption: 1, setFlags: ['aqueduct_relic_repaired'], water: 4 },
      },
    ],
  },

  {
    id: 'c8_aqueduct_repair_success',
    chapter: 'Chapter 8',
    title: 'Water Restored',
    location: 'The Broken Aqueduct',
    imageKey: 'broken_aqueduct',
    text: `The regulator seats correctly. The pressure membrane holds. The flow resumes — not at full capacity, maybe seventy percent, but seventy percent of the aqueduct's flow is enough to end the acute water shortage in twelve tunnel sections. You can hear the water moving in the pipes, which is a sound the tunnels have not had at this level for three months. Dever marks the repair on his maintenance log with the specific satisfaction of a person whose skill has been required and used.`,
    effectsOnEnter: { setFlags: ['aqueduct_repaired_success'], water: 4, morale: 10, hollowChildren: 10 },
    choices: [
      {
        id: 'c8_aqueduct_success_forward',
        text: 'The water is flowing. Move to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
      },
    ],
  },

  {
    id: 'c8_aqueduct_repair_fail',
    chapter: 'Chapter 8',
    title: 'The Regulator Fails',
    location: 'The Broken Aqueduct',
    imageKey: 'broken_aqueduct',
    text: `The improvised repair holds for three hours. Then the membrane deforms further under resumed pressure load and the regulator fails completely — not just cracked, now fractured, with fragments in the pipe that make future repair significantly harder. The water stops. Not at seventy percent. At zero. The three hours of flow raised hopes in the twelve tunnel sections it reached. Those hopes are now withdrawn. Dever does not say anything.`,
    effectsOnEnter: { setFlags: ['aqueduct_repair_failed'], water: -2, morale: -15, hollowChildren: -10 },
    choices: [
      {
        id: 'c8_aqueduct_fail_collapse',
        text: 'The aqueduct is beyond repair with current resources.',
        nextNode: 'c8_aqueduct_collapse_end',
        effects: { setFlags: ['aqueduct_collapsed'] },
      },
      {
        id: 'c8_aqueduct_fail_forward',
        text: 'Find alternate water sources. Get to the famine camp.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { morale: -5 },
      },
    ],
  },

  // ── THE FAMINE CAMP ──────────────────────────────────────────────────────────

  {
    id: 'c8_famine_camp_arrive',
    chapter: 'Chapter 8',
    title: 'The Famine Camp',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `The camp formed three weeks ago when Level 6 and Level 8 tunnel sections became simultaneously impassable. People moved to Level 7 because it was accessible. Two hundred and forty people, the majority below functional resource levels. The camp has the specific atmosphere of people waiting — not for rescue, they have stopped expecting rescue — but for the mathematics of the situation to change. A lot of people are not working, because work requires calories and calories are not available.`,
    effectsOnEnter: { setFlags: ['famine_camp_arrived'], hunger: -8, thirst: -5 },
    choices: [
      {
        id: 'c8_camp_assess_state',
        text: 'Assess the camp\'s situation before engaging.',
        nextNode: 'c8_camp_state',
      },
      {
        id: 'c8_camp_find_sera',
        text: 'Look for Sera. You saw someone who looked like her.',
        nextNode: 'c8_camp_sera_found',
        requirements: { flags: ['sera_saved_ch3'] },
        isHidden: true,
      },
      {
        id: 'c8_camp_find_hollow',
        text: 'Find the Hollow Children in the camp.',
        nextNode: 'c8_camp_hollow_children',
      },
    ],
  },

  {
    id: 'c8_camp_state',
    chapter: 'Chapter 8',
    title: 'Camp Assessment',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `Three days. That is the honest assessment: three days before the camp's situation becomes a medical emergency for the majority. The distribution network that has been supplying the camp — informal, fragile, built on personal relationships — has been interrupted at two out of three supply points. One interruption was Saints checkpoint expansion. One was a supplier who prioritised their own family, which is difficult to call wrong. Chalk's delegation is in the camp's eastern section with thirty-one children and twenty adults, all below functional resource levels.`,
    effectsOnEnter: { setFlags: ['camp_state_known'], intelligence: 2 },
    choices: [
      {
        id: 'c8_state_hollow',
        text: 'Address the Hollow Children situation first.',
        nextNode: 'c8_camp_hollow_children',
      },
      {
        id: 'c8_state_chalk_confront',
        text: 'Find Chalk and confront the distribution crisis directly.',
        nextNode: 'c8_camp_chalk_confrontation',
      },
      {
        id: 'c8_state_sera',
        text: 'Sera is in this camp. Find her.',
        nextNode: 'c8_camp_sera_found',
        requirements: { flags: ['sera_saved_ch3'] },
        isHidden: true,
      },
      {
        id: 'c8_state_medical_check',
        text: 'Assess the medical situation. Some people in this camp are past the triage threshold.',
        nextNode: 'c8_camp_medical_triage',
      },
    ],
  },

  {
    id: 'c8_camp_hollow_children',
    chapter: 'Chapter 8',
    title: 'Thirty-One',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `The Hollow Children's section of the camp is quieter than the rest, which is wrong. They are conserving energy — the body's response to insufficient calorie intake. Chalk is with them, doing something methodical and practical with the camp's remaining supplies. "Thirty-one," she says when she sees you. "Same thirty-one. We have not lost anyone." The way she says it — with the specific emphasis of someone who has been counting — means they came close. She looks at your pack. She does not ask.`,
    effectsOnEnter: { setFlags: ['hollow_children_camp_found'], morale: -8 },
    choices: [
      {
        id: 'c8_hollow_feed',
        text: 'Give the Hollow Children what you have. Feed them first.',
        nextNode: 'c8_camp_chalk_confrontation',
        effects: { food: -2, hollowChildren: 20, morale: 10, setFlags: ['hollow_children_fed'] },
      },
      {
        id: 'c8_hollow_refuse',
        text: 'You cannot give what you do not have enough of.',
        nextNode: 'c8_hollow_children_starve_end',
        effects: { hollowChildren: -30, morale: -20, corruption: 5, setFlags: ['hollow_children_refused'] },
      },
      {
        id: 'c8_hollow_chalk_promise',
        text: '"The Grain Vault distribution is coming. They eat within four hours."',
        nextNode: 'c8_camp_chalk_confrontation',
        requirements: { flags: ['vault_distributed'] },
        effects: { hollowChildren: 15, morale: 5 },
      },
      {
        id: 'c8_hollow_chalk_alone',
        text: 'Find Chalk somewhere private. She said she can work with the true version.',
        nextNode: 'c8_chalk_private_moment',
      },
    ],
  },

  {
    id: 'c8_camp_sera_found',
    chapter: 'Chapter 8',
    title: 'Sera',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `She is in the camp's northeast corner, where the youngest children have been sleeping because the wall holds residual warmth. Three months older. Three months of better survival instincts — she has positioned herself near the wall without being asked, and she is looking at the camp's entry point regularly. When she sees you her expression does not immediately change, which means she has been hoping for this and has learned to protect the hope. Then the protection fails.`,
    effectsOnEnter: { setFlags: ['sera_found_famine_camp'], morale: 10, miraTrust: 3 },
    choices: [
      {
        id: 'c8_sera_protect_dice',
        text: '[Roll dice — Luck] Get Sera out of the camp before the collapse pressure peaks.',
        nextNode: 'c8_camp_sera_found',
        diceCheck: {
          stat: 'luck',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c8_sera_saved_end',
          failureNode: 'c8_sera_lost_end',
        },
      },
      {
        id: 'c8_sera_food_protect',
        text: '[Food ≥ 2] Feed Sera from your pack and bring her with you.',
        nextNode: 'c8_sera_saved_end',
        requirements: { food: 2 },
        effects: { food: -2, setFlags: ['sera_fed_saved'] },
      },
    ],
  },

  {
    id: 'c8_camp_chalk_confrontation',
    chapter: 'Chapter 8',
    title: 'Chalk\'s Reckoning',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    speaker: 'Mother Chalk',
    text: `"The distribution has failed twice," she says. Not an accusation. A fact. "Both times with promises attached to the failure. I understand that promises are made in good faith and circumstances are difficult. I also have thirty-one children and I do not have the option of accepting good faith as a substitute for food." She sits down — she has been standing for a long time. "Tell me what is actually happening with the Grain Vault. Tell me if the aqueduct is going to be repaired. Tell me what is real, not what might happen. I can work with real."`,
    effectsOnEnter: { setFlags: ['chalk_confrontation_done'] },
    choices: [
      {
        id: 'c8_chalk_truth_vault',
        text: 'Tell her everything: the vault status, the water status, what you have done and what you have not.',
        nextNode: 'c8_camp_rations_decision',
        effects: { hollowChildren: 10, morale: 5, setFlags: ['chalk_told_truth'] },
      },
      {
        id: 'c8_chalk_reassure',
        text: 'Tell her the Grain Vault distribution is coming and the aqueduct will be repaired.',
        nextNode: 'c8_camp_rations_decision',
        effects: { hollowChildren: 5, corruption: 3, setFlags: ['chalk_reassured_falsely'] },
      },
    ],
  },

  {
    id: 'c8_camp_rations_decision',
    chapter: 'Chapter 8',
    title: 'Last Reserves',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `The camp's last reserves are three days of shared rations if distributed equally. Six days if prioritised to children and critical cases. The mathematics are simple and terrible. Roan is here with what his militia could carry. It is not enough. Chalk is watching. The Hollow Children's section is quieter than it should be. Three days. The decision about those three days is what the chapter has been building toward.`,
    effectsOnEnter: { setFlags: ['ration_decision_point'] },
    choices: [
      {
        id: 'c8_rations_equal',
        text: 'Distribute equally. Everyone gets three days.',
        nextNode: 'c8_starving_bridge_arrive',
        effects: { hollowChildren: 15, morale: 10, setFlags: ['rations_distributed_equally'] },
      },
      {
        id: 'c8_rations_children',
        text: 'Prioritise children and critical cases. Six days for those who need it most.',
        nextNode: 'c8_starving_bridge_arrive',
        effects: { hollowChildren: 20, miraTrust: 5, morale: 5, setFlags: ['rations_prioritised_children'] },
      },
      {
        id: 'c8_rations_search_dice',
        text: '[Roll dice — Luck] Search the camp for hidden reserves before deciding.',
        nextNode: 'c8_camp_rations_decision',
        diceCheck: {
          stat: 'luck',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c8_starving_bridge_arrive',
          failureNode: 'c8_famine_camp_collapse_end',
        },
        effects: { food: 3, setFlags: ['camp_reserves_found'] },
      },
      {
        id: 'c8_rations_hoard_own',
        text: 'Take what you need for your group. The camp will manage with what remains.',
        nextNode: 'c8_starving_bridge_arrive',
        effects: { hollowChildren: -25, morale: -15, corruption: 5, food: 4, setFlags: ['camp_rations_hoarded'] },
      },
    ],
  },

  // ── THE DEAD ORCHARD ─────────────────────────────────────────────────────────

  {
    id: 'c8_dead_orchard_arrive',
    chapter: 'Chapter 8',
    title: 'The Dead Orchard',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `Sublevel 14. The pre-collapse growing facility is not what you expected. It is not a ruin — it is a pause. The growing racks are intact. The irrigation system is intact. The relic-adjacent grow lights are dark but not destroyed. The system stopped three years ago when a water contamination event from the Red Choir's Level 14 expansion killed the bacterial cultures in the soil beds. The soil is dead but the infrastructure survived. What the Archive's documentation says — Mael's document, now in your possession — is that the bacterial culture can be restarted from a seed stock the Archive holds, if the irrigation system can be connected to a clean water source.`,
    effectsOnEnter: { setFlags: ['dead_orchard_arrived'], intelligence: 3 },
    choices: [
      {
        id: 'c8_orchard_study',
        text: 'Study the system. Understand what restoration requires.',
        nextNode: 'c8_orchard_assess',
      },
    ],
  },

  {
    id: 'c8_orchard_assess',
    chapter: 'Chapter 8',
    title: 'The Grow System',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `The Archive's documentation is precise. The bacterial culture seed stock is in the Archive. The irrigation connection requires two days of pipe work — Dever could do it, given materials. The grow lights require a relic interface credential to reactivate: the mark responds when you hold it near the control panel, the same recognition response as the aqueduct terminal. The system knows you. The system was designed to know you. Lady Seraphine is standing in the growing section when you turn around, examining the grow racks with the expression of someone calculating the output capacity.`,
    effectsOnEnter: { setFlags: ['orchard_assessed', 'grow_system_understood'], intelligence: 4 },
    choices: [
      {
        id: 'c8_orchard_seraphine',
        text: 'Address Seraphine. Find out how long she has been here.',
        nextNode: 'c8_orchard_seraphine_find',
      },
      {
        id: 'c8_orchard_activate_now',
        text: 'Activate the grow lights. Begin the restoration.',
        nextNode: 'c8_orchard_agricultural_system',
      },
      {
        id: 'c8_orchard_get_dever',
        text: 'Get Dever\'s detailed assessment of what the irrigation restoration requires before committing.',
        nextNode: 'c8_orchard_restoration_detail',
      },
    ],
  },

  {
    id: 'c8_orchard_agricultural_system',
    chapter: 'Chapter 8',
    title: 'The Grow Lights Come On',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `The mark activates the grow lights. The change is immediate and significant: the entire facility goes from dead to operational-standby in twelve seconds. The relic-adjacent systems were not destroyed. They were waiting. The grow light frequency is not visible light — it is in a spectrum the relic concentration responds to, which is why the pre-collapse designers chose it. The pulse is strong enough now, with the mark as an active interface, to sustain the grow lights at seventy percent capacity. Seventy percent is enough to restart the growing cycle in two weeks if the irrigation and bacterial culture are restored.`,
    effectsOnEnter: { setFlags: ['agricultural_system_activated', 'grow_lights_on'], intelligence: 5, morale: 15, lastArchive: 10 },
    choices: [
      {
        id: 'c8_orchard_activate_choice',
        text: 'The system is online. Decide who controls the restoration.',
        nextNode: 'c8_orchard_choice',
      },
    ],
  },

  {
    id: 'c8_orchard_seraphine_find',
    chapter: 'Chapter 8',
    title: 'Seraphine\'s Interest',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    speaker: 'Lady Seraphine',
    text: `"Fourteen days," she says. "I have been watching this facility for fourteen days. The Glass Court's pre-collapse records describe the facility's capacity in detail. We did not reactivate it because the grow lights require a relic interface credential that no Glass Court operative carries." She looks at the mark. "You carry it." She does not apologise for the fourteen days of watching while people went hungry. "I can provide the bacterial culture seed stock through channels that do not require Archive access. I can provide the irrigation labour. In return, I want a documented Glass Court stake in the facility's output. Fifty percent."`,
    effectsOnEnter: { setFlags: ['seraphine_orchard_interest'] },
    choices: [
      {
        id: 'c8_seraphine_orchard_deal',
        text: 'Accept Seraphine\'s terms. Fifty percent Glass Court stake for bacterial culture and labour.',
        nextNode: 'c8_orchard_choice',
        effects: { glassCourt: 20, setFlags: ['seraphine_orchard_deal_made'], food: 3 },
      },
      {
        id: 'c8_seraphine_orchard_refuse',
        text: 'Refuse. The Archive has the seed stock. Dever has the labour.',
        nextNode: 'c8_orchard_choice',
        effects: { glassCourt: -15, intelligence: 2, setFlags: ['seraphine_orchard_refused'] },
      },
    ],
  },

  {
    id: 'c8_orchard_choice',
    chapter: 'Chapter 8',
    title: 'The Orchard\'s Future',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `The system is online, or can be. Who controls the restoration — who gets the output, who funds the labour, who holds the bacterial culture — determines whether the Hunger War has a resolution or simply a pause. The orchard's output, at two weeks from now, could change those terms. Could. The grow lights are on. The irrigation is incomplete. The bacterial culture is not yet here. Two weeks is also two weeks in which everything that is already happening continues to happen.`,
    effectsOnEnter: { setFlags: ['orchard_choice_point'] },
    choices: [
      {
        id: 'c8_orchard_archive_control',
        text: 'Keep the facility under Archive/neutral control. No faction claim.',
        nextNode: 'c8_orchard_activate',
        effects: { lastArchive: 15, hollowChildren: 10, glassCourt: -10, setFlags: ['orchard_neutral_control'] },
      },
      {
        id: 'c8_orchard_collective',
        text: 'Give the facility to the tunnel collective. Roan\'s network manages it.',
        nextNode: 'c8_orchard_activate',
        effects: { morale: 15, setFlags: ['orchard_collective_control'], hollowChildren: 15, ironSaints: -10 },
      },
      {
        id: 'c8_orchard_no_activation',
        text: 'Cannot activate without the bacterial culture. The system stays dark for now.',
        nextNode: 'c8_dead_orchard_end',
        effects: { setFlags: ['orchard_activation_failed'], morale: -10 },
      },
    ],
  },

  {
    id: 'c8_orchard_activate',
    chapter: 'Chapter 8',
    title: 'Two Weeks',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `The restoration is a commitment, not a solution. Two weeks of work — Dever and three others on the irrigation, the Archive courier bringing the bacterial culture in a sealed container Mael has been holding for exactly this situation. The grow lights run on the mark's interface as long as the mark is in the tunnel network's range of the facility. The first crop cycle takes six weeks after the culture is seeded. Six weeks is not three days. But it is food that does not have a faction mark on it, coming from soil that belongs to the tunnel network in a way that no cached supply does. Roan understands what this means.`,
    effectsOnEnter: { setFlags: ['orchard_restoration_started'], food: 2, morale: 15, lastArchive: 10, intelligence: 5 },
    choices: [
      {
        id: 'c8_orchard_forward',
        text: 'The orchard is started. Get to the Starving Bridge.',
        nextNode: 'c8_starving_bridge_arrive',
      },
    ],
  },

  // ── THE SIEGE TUNNELS ────────────────────────────────────────────────────────

  {
    id: 'c8_siege_tunnels_arrive',
    chapter: 'Chapter 8',
    title: 'The Siege Tunnels',
    location: 'The Siege Tunnels',
    imageKey: 'siege_tunnels',
    text: `The Siege Tunnels are what happens when two groups of hungry people occupy the same tunnel network and neither will move. Roan's militia controls Level 7 East. The Iron Saints' reserve battalion controls Level 7 West. The junction between them has been contested for nineteen days. Nobody has died in the junction itself. Three people have died in the approaches. Roan wants the junction because it connects to the Saints' main supply corridor. The Saints want it because losing it means losing the corridor.`,
    effectsOnEnter: { setFlags: ['siege_tunnels_arrived'], hunger: -5, health: -5 },
    choices: [
      {
        id: 'c8_tunnels_roan_briefing',
        text: 'Get Roan\'s tactical situation.',
        nextNode: 'c8_tunnels_roan_plan',
      },
    ],
  },

  {
    id: 'c8_tunnels_roan_plan',
    chapter: 'Chapter 8',
    title: 'Nineteen Days',
    location: 'The Siege Tunnels',
    imageKey: 'siege_tunnels',
    speaker: 'Captain Roan',
    text: `"We can end this today if we are willing to pay what it costs." He does not say what it costs. He does not need to. "I have a plan. The plan requires six people at the east entrance, three at the maintenance access, and two at the north passage. Simultaneous. The Saints will choose two of the three to defend. We take the third." He looks at you. "I need someone with combat experience to lead the north passage team. That is where the Saints will send their best response. That is where the losses will be." He is telling you exactly what he is asking.`,
    effectsOnEnter: { setFlags: ['siege_plan_known'], morale: -5 },
    choices: [
      {
        id: 'c8_tunnels_lead_north',
        text: 'Lead the north passage team. Take the hard position.',
        nextNode: 'c8_tunnels_cain_lead',
        effects: { setFlags: ['north_passage_led'], strength: 2 },
      },
      {
        id: 'c8_tunnels_negotiate_instead',
        text: 'Negotiate with the Saints battalion instead of fighting.',
        nextNode: 'c8_tunnels_retreat',
        effects: { ironSaints: 5, setFlags: ['siege_negotiation_attempted'] },
      },
    ],
  },

  {
    id: 'c8_tunnels_cain_lead',
    chapter: 'Chapter 8',
    title: 'The North Passage',
    location: 'The Siege Tunnels',
    imageKey: 'siege_tunnels',
    text: `The north passage is a pre-collapse service corridor, two metres wide, visibility limited to fifteen metres at the turn. The Saints' response team arrives forty seconds after the simultaneous push begins — four soldiers, fast, organised. The engagement is close and the tunnel's acoustics make everything louder than it is. The militia holds the turn. Roan's simultaneous approach at the other two positions creates the confusion the plan needed. The junction opens. The supply corridor is accessible. The operation cost two militia members their mobility for three weeks and one Saints soldier a broken arm. It did not cost lives. Roan's discipline held.`,
    effectsOnEnter: { setFlags: ['north_passage_secured', 'junction_taken'], health: -15, ironSaints: -20, morale: 10, food: 4 },
    choices: [
      {
        id: 'c8_tunnels_hold_discipline',
        text: 'Hold Roan\'s discipline. The junction is secured without further violence.',
        nextNode: 'c8_starving_bridge_arrive',
        effects: { setFlags: ['militia_discipline_held'], morale: 5, ironSaints: 5 },
      },
      {
        id: 'c8_tunnels_push_further',
        text: 'Push further. The supply corridor is open. Take more while you can.',
        nextNode: 'c8_militia_massacre_end',
        effects: { ironSaints: -30, setFlags: ['militia_pushed_too_far'], corruption: 5 },
      },
    ],
  },

  {
    id: 'c8_tunnels_retreat',
    chapter: 'Chapter 8',
    title: 'The Negotiation Fails',
    location: 'The Siege Tunnels',
    imageKey: 'siege_tunnels',
    text: `The Saints battalion commander is a captain named Aldric who has been in the siege tunnels for nineteen days and has the specific inflexibility of a person who has committed to a position and cannot retreat without it meaning something. The negotiation fails. Aldric offers a timed withdrawal corridor — ten minutes for Roan's militia to clear the junction — which Roan correctly identifies as a trap. The militia falls back to Level 7 East. Roan's expression when you report back is not accusatory. It is the expression of someone who expected this outcome and came anyway.`,
    effectsOnEnter: { setFlags: ['siege_negotiation_failed'], ironSaints: -5, morale: -8 },
    choices: [
      {
        id: 'c8_tunnels_roan_betrayal',
        text: 'Roan has lost confidence in the negotiation route. He begins to consider alternatives.',
        nextNode: 'c8_roan_betrayal_end',
        effects: { setFlags: ['roan_betrayal_considered'], cainTrust: -3 },
      },
      {
        id: 'c8_tunnels_accept_stalemate',
        text: 'Accept the stalemate. Go to the Starving Bridge.',
        nextNode: 'c8_starving_bridge_arrive',
        effects: { morale: -10, ironSaints: 5 },
      },
    ],
  },

  // ── THE STARVING BRIDGE ──────────────────────────────────────────────────────

  {
    id: 'c8_starving_bridge_arrive',
    chapter: 'Chapter 8',
    title: 'The Starving Bridge',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The Bridge is a pre-collapse pedestrian overpass connecting Level 7 to the Glass Court's outer access corridor — the only crossing point not controlled by a checkpoint. That agreement is failing. The Hollow Children are on the east end. Roan's militia is in the middle. Seraphine's Glass Court representative is on the west end with four security personnel and a table of documentation. Saint Veyra is standing at the south approach with the expression of a person who has decided something and is waiting for the right moment to implement it. Two hundred people from the famine camp are watching from the approaches.`,
    effectsOnEnter: { setFlags: ['starving_bridge_arrived'], morale: -3, hunger: -3 },
    choices: [
      {
        id: 'c8_bridge_read_crowd',
        text: 'Read the crowd before engaging the factions.',
        nextNode: 'c8_bridge_crowds',
      },
      {
        id: 'c8_bridge_roan_first',
        text: 'Get to Roan. He needs to hold the militia steady.',
        nextNode: 'c8_bridge_roan_speech',
      },
      {
        id: 'c8_bridge_walk_through',
        text: 'Walk through the dispersal zone. Listen to the people moving toward the Bridge before engaging the factions.',
        nextNode: 'c8_bridge_approach_walk',
      },
    ],
  },

  {
    id: 'c8_bridge_crowds',
    chapter: 'Chapter 8',
    title: 'Four Hundred Eyes',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The two hundred watching from the approaches are not a neutral audience. They are the people who have been at the receiving end of every decision made in the last three months. They know who Seraphine is. They know who Veyra is. They know Roan by name. The crowd's attention is not hostile and not hopeful — it is watching with the careful attention of people who have learned to evaluate what they see rather than what they are told. This crowd can be moved. It cannot be lied to a second time.`,
    effectsOnEnter: { setFlags: ['bridge_crowd_read'], intelligence: 3 },
    choices: [
      {
        id: 'c8_crowd_to_factions',
        text: 'Face the factions. The crowd will watch what you do.',
        nextNode: 'c8_bridge_factions_meet',
      },
    ],
  },

  {
    id: 'c8_bridge_factions_meet',
    chapter: 'Chapter 8',
    title: 'All Four at Once',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `Seraphine speaks first. "The Glass Court is prepared to offer emergency humanitarian supply — two weeks' food for the tunnel network's registered population — in exchange for formal recognition of Glass Court administrative oversight of the Dead Orchard facility." Then Veyra: "The Iron Saints are prepared to implement an emergency ration schedule in exchange for civilian cooperation with the Saints' checkpoint system." Then Chalk: "The Hollow Children have thirty-one children and want food. Not terms. Food." Then Roan: "I have a militia that just took the Level 7 junction. The supply corridor is accessible. We can distribute the Saints' supply without their terms or Seraphine's." He looks at you. Everyone looks at you.`,
    effectsOnEnter: { setFlags: ['bridge_factions_met'], morale: 5, intelligence: 3 },
    choices: [
      {
        id: 'c8_bridge_roan_speech_choice',
        text: 'Back Roan\'s position. Address the crowd directly.',
        nextNode: 'c8_bridge_roan_speech',
      },
      {
        id: 'c8_bridge_seraphine_deal',
        text: 'Accept Seraphine\'s terms. Two weeks of supply now.',
        nextNode: 'c8_glass_court_feast_end',
        effects: { glassCourt: 20, setFlags: ['seraphine_bridge_deal'], morale: -10 },
      },
      {
        id: 'c8_bridge_veyra_deal',
        text: 'Accept Veyra\'s schedule. Consistent supply with Saints oversight.',
        nextNode: 'c8_bridge_seraphine_counter',
        effects: { ironSaints: 15, morale: -8, setFlags: ['veyra_schedule_accepted'] },
      },
    ],
  },

  {
    id: 'c8_bridge_seraphine_counter',
    chapter: 'Chapter 8',
    title: 'Seraphine\'s Counter',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    speaker: 'Lady Seraphine',
    text: `"The Grain Vault's contents are under Iron Saints authority," Seraphine says, efficiently and correctly. "The Dead Orchard's restoration requires bacterial culture the Glass Court holds. The aqueduct repair requires materials the Saints' supply chain controls. Captain Roan's access to the Level 7 junction does not change who holds the inputs the restoration requires." She is not wrong. She is describing a situation where the civilian population's access to food is contingent on agreements with factions that have structural incentives not to make those agreements. She considers this an argument for her offer rather than an argument against the system.`,
    effectsOnEnter: { setFlags: ['seraphine_counter_made'], glassCourt: -5 },
    choices: [
      {
        id: 'c8_bridge_counter_speech',
        text: 'Address the crowd anyway. The facts Roan provided are enough.',
        nextNode: 'c8_bridge_roan_speech',
      },
    ],
  },

  {
    id: 'c8_bridge_roan_speech',
    chapter: 'Chapter 8',
    title: 'Roan\'s Speech',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    speaker: 'Captain Roan',
    text: `He is not a speech-maker. He says this, clearly, at the start: "I am not a speech-maker." Then he makes one, and it is effective because it is not one: it is a list of facts delivered to the people watching as if they are adults who can handle facts. He names the Grain Vault's contents. He names what the dead orchard can produce in six weeks. He names what the aqueduct repair requires. He names who has been eating and who has not. He stops. He looks at you. He is saying: now it is your turn, because I have told them everything they need to know and they need someone to tell them what to do with it.`,
    effectsOnEnter: { setFlags: ['roan_speech_given'], morale: 8 },
    choices: [
      {
        id: 'c8_bridge_speech_dice',
        text: '[Roll dice — Charisma] Address the crowd. Call for the tunnel network\'s collective action.',
        nextNode: 'c8_bridge_roan_speech',
        diceCheck: {
          stat: 'charisma',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c8_bridge_speech_success',
          failureNode: 'c8_bridge_speech_fail',
        },
      },
      {
        id: 'c8_bridge_morale_speech',
        text: '[Morale ≥ 40] Speak with genuine conviction. The crowd will hear it.',
        nextNode: 'c8_bridge_speech_success',
        requirements: { morale: 40 },
        effects: { morale: 5, setFlags: ['speech_conviction_used'] },
      },
    ],
  },

  {
    id: 'c8_bridge_speech_success',
    chapter: 'Chapter 8',
    title: 'The Crowd Moves',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The crowd moves. Not toward Seraphine, not toward Veyra, not toward the faction positions — toward the Bridge itself, toward the middle where the decisions are being made. Seraphine's documentation table is surrounded by people who want to read what it says before anyone signs anything. Veyra's checkpoint approach is blocked by people sitting down quietly. Roan's militia, without being instructed, forms a perimeter around the Hollow Children's group — not to contain them, to protect them. The Bridge becomes, briefly, a space where the faction positions are less important than the fact that two hundred people with nothing left to lose have decided to be present.`,
    effectsOnEnter: { setFlags: ['bridge_speech_success', 'civilian_coalition_formed'], morale: 20, hollowChildren: 15, glassCourt: -10, ironSaints: -10 },
    choices: [
      {
        id: 'c8_speech_forward',
        text: 'Hold the position. Move to the final decision.',
        nextNode: 'c8_mira_moment',
      },
    ],
  },

  {
    id: 'c8_bridge_speech_fail',
    chapter: 'Chapter 8',
    title: 'The Crowd Holds',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The crowd does not move. It watches. The speech landed in the specific silence of people who have heard speeches before and are no longer certain what speeches are for. Not hostile. Not dismissive. Just still. Seraphine begins moving toward the documentation table with the calm of someone who has been waiting for exactly this stillness. The crowd does not stop her.`,
    effectsOnEnter: { setFlags: ['bridge_speech_failed'], morale: -15, glassCourt: 10 },
    choices: [
      {
        id: 'c8_speech_fail_accept',
        text: 'Accept the stalemate. The factions keep their positions.',
        nextNode: 'c8_stalemate_end',
        effects: { setFlags: ['stalemate_accepted'] },
      },
      {
        id: 'c8_speech_fail_continue',
        text: 'The speech failed. The situation has not. Go to the final decision point.',
        nextNode: 'c8_final_distribution_choice',
        effects: { morale: -5 },
      },
      {
        id: 'c8_speech_fail_scatter',
        text: 'The coalition is not forming. Every group is looking to their own.',
        nextNode: 'c8_scattered_survivors_end',
        effects: { setFlags: ['coalition_failed'] },
      },
    ],
  },

  // ── CHAPTER CONCLUSION ───────────────────────────────────────────────────────

  {
    id: 'c8_mira_moment',
    chapter: 'Chapter 8',
    title: 'Mira\'s Message',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The message arrives through Juno — a folded page in Mira's precise clinical handwriting, delivered by a Hollow Children courier. "The cure research has advanced. I have a partial inhibitor for the Choir's infection mechanism. I need the Archive's documentation on the VELNA-PRIME architecture to complete it — specifically the signal dampening protocols in Velna's secondary design notes. I know you have the gate card. I know what the synchronisation means. I am not asking you to choose. I am telling you what I have, so you can choose correctly. — M." She is not with you. She is telling you she is still working. The two things do not contradict each other.`,
    effectsOnEnter: { setFlags: ['mira_message_received_ch8'], miraTrust: 5, morale: 10 },
    choices: [
      {
        id: 'c8_mira_respond_yes',
        text: 'Send word back to Mira: the Archive documentation will reach her.',
        nextNode: 'c8_final_distribution_choice',
        effects: { miraTrust: 5, setFlags: ['mira_archive_promised'] },
      },
      {
        id: 'c8_mira_respond_forward',
        text: 'Make the decision at the Bridge first. Send word when it is done.',
        nextNode: 'c8_final_distribution_choice',
      },
    ],
  },

  {
    id: 'c8_final_distribution_choice',
    chapter: 'Chapter 8',
    title: 'The Hunger War\'s End',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The Bridge moment — the crowd, the factions visible, the dead orchard two weeks from first harvest, the aqueduct either repaired or broken, the Grain Vault either distributed or locked, the Kitchen either independent or Choir-supplied — crystallises. Every decision made in the chapter is present in the form of what is and is not available. The Hunger War will not end today. People will still be hungry after this chapter. But the direction it takes — whether managed by factions extracting compliance, by a civilian coalition finding its footing, or by a single person making every decision — is the decision available now.`,
    effectsOnEnter: { setFlags: ['final_distribution_reached'] },
    choices: [
      {
        id: 'c8_final_savior',
        text: 'Build the coalition. Commit to feeding people without faction terms. The Savior path.',
        nextNode: 'c8_starving_savior_end',
        requirements: { flags: ['vault_distributed', 'roan_alliance_offered'] },
        effects: { setFlags: ['savior_route_foundation'], morale: 15, hollowChildren: 20 },
      },
      {
        id: 'c8_final_tyrant',
        text: 'Take control of the supply chain. Make the decisions nobody else will. The Tyrant path.',
        nextNode: 'c8_ration_tyrant_end',
        effects: { setFlags: ['tyrant_route_foundation'], corruption: 8, ironSaints: -20, morale: -10 },
      },
      {
        id: 'c8_final_wanderer',
        text: 'Leave the Bridge to its factions. The war is not yours to win. The Wanderer path.',
        nextNode: 'c8_lone_wanderer_end',
        effects: { setFlags: ['wanderer_route_foundation'], morale: -15 },
      },
      {
        id: 'c8_final_neutral',
        text: 'Do what is achievable. Distribute what is available. Survive the chapter.',
        nextNode: 'c8_hunger_war_neutral_end',
        effects: { setFlags: ['neutral_distribution'], food: 2, morale: 5 },
      },
      {
        id: 'c8_final_agricultural',
        text: 'The orchard changes everything in two weeks. Document the plan and hold the line.',
        nextNode: 'c8_final_agricultural_reveal',
        requirements: { flags: ['agricultural_system_activated'] },
        effects: { setFlags: ['agricultural_future_documented'], lastArchive: 10 },
      },
    ],
  },

  {
    id: 'c8_final_agricultural_reveal',
    chapter: 'Chapter 8',
    title: 'Two Weeks',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The Archive's documentation, Roan's map, Dever's irrigation plan, and the grow light activation are spread on the documentation table that was Seraphine's. Seraphine reads the output projections. Veyra reads the resource requirements. Chalk reads the timeline. All three reach the same conclusion from different directions: the Dead Orchard, if restored as planned, produces enough food to end the tunnel network's dependence on cached supply within eight weeks of first harvest. Not enough to be comfortable. Enough to be free. The Hunger War does not end at this table. But the argument that scarcity is permanent — that faction control of food is inevitable — becomes demonstrably false. Seraphine closes her agreement file. Veyra does not close her checkpoint order, but she does not open it either.`,
    effectsOnEnter: { setFlags: ['agricultural_plan_revealed'], morale: 20, glassCourt: 10, ironSaints: 5, hollowChildren: 15, lastArchive: 15 },
    choices: [
      {
        id: 'c8_agricultural_forward',
        text: 'The plan is on the table. Move to Chapter 9.',
        nextNode: 'c8_chapter8_end',
      },
    ],
  },

  {
    id: 'c8_chapter8_end',
    chapter: 'Chapter 8',
    title: 'After the Hunger War',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The Hunger War does not end. It finds a lower equilibrium — not peace, not resolution, but a reduction in the rate at which things are getting worse. The famine camp loses a third of its population to the Level 7 supply corridor opening. The Bone Soup Kitchen keeps running. The Burned Clinic receives enough medicine to stabilise. In twelve days, Dever finishes the irrigation. In two weeks, the bacterial culture is seeded. Six weeks after that, the Dead Orchard produces its first harvest. Two hundred people on the Bridge watched decisions being made in their name and, in some cases, instead of them. Some of them will remember that. The mark is warm. The gate card is wherever you put it. The next chapter is called The Mark Awakens, which means the next chapter is about you.`,
    effectsOnEnter: { setFlags: ['chapter8_complete'], morale: 5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_survived',
    endingType: 'faction',
  },

  // ── SUPPLEMENTAL NODES ───────────────────────────────────────────────────────
  // Additional story depth — reachable from location sections above.

  {
    id: 'c8_vault_interior_survey',
    chapter: 'Chapter 8',
    title: 'Inside the Vault — Full Survey',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `The vault's interior is a record of pre-collapse food security infrastructure: racking systems with capacity labels still legible, temperature regulation monitors showing the cold chain has held for three months undisturbed, and a manifest terminal listing every item stored and when it was last accessed. The last access was three days ago — the Glass Court's allocation window. The manifest does not list who took what. It lists quantities. The quantities confirm Roan's calculation: six weeks of food for the tunnel network's current population, assuming standard allocation. Standard allocation, by the manifest's own definition, is the Glass Court's registered citizenry.`,
    effectsOnEnter: { setFlags: ['vault_interior_surveyed'], intelligence: 3 },
    choices: [
      {
        id: 'c8_vault_survey_distribute',
        text: 'The manifest confirms the food is here. Begin distribution.',
        nextNode: 'c8_vault_distribute',
      },
      {
        id: 'c8_vault_survey_copy',
        text: 'Copy the manifest. This documentation will matter later.',
        nextNode: 'c8_vault_distribute',
        effects: { intelligence: 2, setFlags: ['vault_manifest_copied'], lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c8_aqueduct_downstream_check',
    chapter: 'Chapter 8',
    title: 'Downstream',
    location: 'The Broken Aqueduct',
    imageKey: 'broken_aqueduct',
    text: `Before committing to the repair, walking the downstream sections of the aqueduct provides context the technical assessment alone cannot. Level 8 East: five families using a communal container as a water store, refilled every two days from a junction point that draws from the same manifold as the break. When the aqueduct went down at seventy percent, that junction stayed partially functional. It is now at zero. The families are sharing the stored water carefully — six days left in the containers, three days if the container is shared with the adjacent section, which it is. Dever's repair window is real: without it, those six days become three, and three days becomes a decision point nobody wants to reach.`,
    effectsOnEnter: { setFlags: ['aqueduct_downstream_known'], intelligence: 2, morale: -5 },
    choices: [
      {
        id: 'c8_downstream_repair_now',
        text: 'The downstream situation makes the repair timeline non-negotiable. Start immediately.',
        nextNode: 'c8_aqueduct_assess',
        effects: { setFlags: ['aqueduct_urgency_confirmed'] },
      },
    ],
  },

  {
    id: 'c8_camp_medical_triage',
    chapter: 'Chapter 8',
    title: 'Camp Medical Assessment',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `The camp's medical situation is not separate from its food situation — they are the same situation at different points on the same timeline. Malnutrition at this level presents as lethargy first, then cognitive impairment, then the specific vulnerability to infection and cold that makes every other crisis worse. Nine people in the camp are past the lethargy stage. Three of them are past cognitive impairment. The camp does not have a doctor — it has people with varying levels of improvised medical knowledge doing the best they can with what they have, which is not enough and is also everything available. You could help. You could also not stay.`,
    effectsOnEnter: { setFlags: ['camp_medical_assessed'], intelligence: 2, morale: -5 },
    choices: [
      {
        id: 'c8_medical_help_camp',
        text: '[Underground Medic / Medicine ≥ 1] Provide basic care to the three critical cases.',
        nextNode: 'c8_camp_chalk_confrontation',
        requirements: { medicine: 1 },
        effects: { medicine: -1, morale: 8, miraTrust: 3, setFlags: ['camp_medic_helped'] },
      },
      {
        id: 'c8_medical_move_on',
        text: 'The clinic situation is beyond improvised medicine. Move to the distribution problem.',
        nextNode: 'c8_camp_chalk_confrontation',
        effects: { morale: -3 },
      },
    ],
  },

  {
    id: 'c8_riot_water_division',
    chapter: 'Chapter 8',
    title: 'After the Riot',
    location: 'The Water Riot',
    imageKey: 'water_riot',
    text: `The water is flowing. The question that immediately follows is who manages the flow. The pipe junction has capacity for approximately three hundred people per hour at the current pressure — the aqueduct break upstream means the pressure is reduced, so the actual throughput is lower. The crowd at the junction is four hundred people. The Hollow Children's delegation is in the queue with twenty-three containers. The Iron Saints checkpoint is four blocks north, unmanned after the lieutenant's tactical withdrawal. The flow will continue without active management. It will continue worse.`,
    effectsOnEnter: { setFlags: ['water_division_scene'] },
    choices: [
      {
        id: 'c8_water_manage_queue',
        text: 'Manage the queue. Ensure the Hollow Children and critical cases get first access.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { hollowChildren: 10, morale: 5, setFlags: ['water_queue_managed'] },
      },
      {
        id: 'c8_water_let_flow',
        text: 'The water is flowing. Let people manage themselves. Move to the next crisis.',
        nextNode: 'c8_famine_camp_arrive',
        effects: { morale: -2 },
      },
    ],
  },

  {
    id: 'c8_soup_kitchen_collective',
    chapter: 'Chapter 8',
    title: 'The Kitchen Collective',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `The Kitchen's collective is eight people who rotate shifts on a schedule none of them maintain perfectly because the schedule was designed for a kitchen with reliable supply and they are operating a kitchen without reliable supply. They are not complaining. They are the specific kind of people who chose to run a kitchen in a crisis rather than any of the alternatives, which means they have already done the calculation about what matters and reached a conclusion. The head of the collective — a man named Teo who was a cook before the blackout and is still a cook — is asking Veyl's compound to leave, politely, for the fifth time.`,
    effectsOnEnter: { setFlags: ['kitchen_collective_met'], morale: 5 },
    choices: [
      {
        id: 'c8_collective_support_teo',
        text: 'Back Teo\'s position. The collective refuses the compound on their own terms.',
        nextNode: 'c8_soup_reject_veyl',
        effects: { redChoir: -5, morale: 5, setFlags: ['collective_independent'] },
      },
      {
        id: 'c8_collective_discuss',
        text: 'The collective should hear Veyl\'s offer properly before deciding.',
        nextNode: 'c8_soup_veyl_appear',
      },
    ],
  },

  {
    id: 'c8_orchard_restoration_detail',
    chapter: 'Chapter 8',
    title: 'Dever\'s Assessment',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `Dever walks the irrigation system methodically, the way he walks every system — cataloguing, measuring, testing fittings with his hands. His verbal assessment is in the same format as his maintenance logs: precise, without redundancy. "Twelve pipe sections. Four connector joints failed. Two manifold feeds need replacement — I can fabricate from standard salvage materials. The soil bed drainage channels are clogged but clear-able. Two days of work, three people, with the materials I already have from the scavenger front operation." He pauses at the grow light array. "These are not standard technology." He means: he has no idea what powers them, and he is honest about not knowing things.`,
    effectsOnEnter: { setFlags: ['orchard_dever_assessment'], intelligence: 3 },
    choices: [
      {
        id: 'c8_dever_begin_work',
        text: 'Authorise Dever to begin the irrigation work.',
        nextNode: 'c8_orchard_activate',
        effects: { setFlags: ['dever_irrigation_authorised'], morale: 5 },
      },
      {
        id: 'c8_dever_hold_for_choice',
        text: 'Hold Dever until the control question is resolved.',
        nextNode: 'c8_orchard_choice',
      },
    ],
  },

  {
    id: 'c8_bridge_approach_walk',
    chapter: 'Chapter 8',
    title: 'Walking to the Bridge',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The walk to the Bridge from any direction takes you through the famine camp's dispersal zone — the area where people from the camp have been drifting since the three-day ration timeline became visible. The dispersal is not chaotic; it is the quiet movement of people who have done the mathematics and reached different conclusions. Some are moving toward faction checkpoints. Some are moving toward the Kitchen. Some are moving toward the Bridge because the Bridge is where the conversation about their survival is happening, and they have decided to be present for it. An older man walking beside you for three blocks says, without looking at you: "I remember when this tunnel smelled like food." He turns off at the Level 7 corridor without saying anything else.`,
    effectsOnEnter: { setFlags: ['bridge_walk_scene'], morale: 5 },
    choices: [
      {
        id: 'c8_bridge_walk_arrive',
        text: 'Continue to the Bridge.',
        nextNode: 'c8_bridge_crowds',
      },
    ],
  },

  {
    id: 'c8_chalk_private_moment',
    chapter: 'Chapter 8',
    title: 'Chalk Alone',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `You find Chalk in the section of the camp farthest from the main thoroughfare, sitting with one of the younger Hollow Children — a child who is perhaps seven and who has fallen asleep against her shoulder. Chalk is awake, doing what she does in the quiet moments: marking the chalk record on her coat's left sleeve. Each mark is a decision made, a name remembered, a cost recorded. The sleeve is dense with marks. She sees you see it and does not explain. The child does not wake. "Whatever you are going to tell me," Chalk says, quietly, so the child does not hear, "tell me the true version. I can work with the true version. I cannot work with the kind version."`,
    effectsOnEnter: { setFlags: ['chalk_private_moment_seen'], hollowChildren: 5, morale: 5 },
    choices: [
      {
        id: 'c8_chalk_true_report',
        text: 'Tell her the true version of the chapter\'s events so far.',
        nextNode: 'c8_camp_rations_decision',
        effects: { hollowChildren: 8, morale: 3, setFlags: ['chalk_true_told'] },
      },
    ],
  },

  // ── ENDING NODES ─────────────────────────────────────────────────────────────

  {
    id: 'c8_water_riot_death_end',
    chapter: 'Chapter 8',
    title: 'Water Riot Death',
    location: 'The Water Riot',
    imageKey: 'water_riot',
    text: `The crowd surges at the wrong moment. The Saints barricade comes down faster than expected, the crowd moves forward faster than the space allows, and you are caught in the convergence point — the place where the crowd from the west meets the crowd from the east and neither has room to stop. The crush is not violent in the sense of intent. It is violent in the sense of physics. The mark, for a brief moment, broadcasts something — a pulse, a warmth, something the people directly adjacent to you feel in their chests — and then the crowd's momentum is what it is.`,
    effectsOnEnter: { setFlags: ['water_riot_death'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_water_riot_death',
    endingType: 'death',
  },

  {
    id: 'c8_mira_last_medicine_end',
    chapter: 'Chapter 8',
    title: 'Mira\'s Last Medicine',
    location: 'The Burned Clinic',
    imageKey: 'burned_clinic',
    text: `The clinic runs out of medicine on the fourth day, not the third. Juno stretches it with the rationing technique Mira taught her, which buys one day and does not change the outcome of the day after. The three critical cases do not survive the fifth day. The eight who needed food more than medicine survive, barely. Juno keeps working. The mark, in the burned clinic, receives a single transmission on Mira's frequency: not words, just the signal, the fact that she is still there, still working, somewhere the clinic is not. It arrives on the fifth day, as if she knew. It probably means she did.`,
    effectsOnEnter: { setFlags: ['mira_medicine_ended', 'clinic_medicine_exhausted'], miraTrust: -5, morale: -20 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_mira_last_medicine',
    endingType: 'sacrifice',
  },

  {
    id: 'c8_glass_court_feast_end',
    chapter: 'Chapter 8',
    title: 'Glass Court Feast',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `Seraphine's allocation arrives in properly labelled Glass Court humanitarian containers, which are also, visibly, Glass Court branded containers. Two weeks of food for the Hollow Children and Roan's militia. Clean. Efficient. Each container carries a document that functions as a record of dependency: who received Glass Court humanitarian aid, when, and in what quantity. The Hollow Children eat. Roan's militia eats. The containers are empty in eleven days because hungry people eat. The documentation is in Seraphine's filing system permanently. The Dead Orchard's access agreement gives the Glass Court a formal claim on the facility's future output. The Hunger War's resolution, when it comes, will be written in Glass Court administrative language, which is a kind of winning that does not feel like losing until the language of the documents becomes the language of everything.`,
    effectsOnEnter: { setFlags: ['glass_court_feast', 'seraphine_won_distribution'], glassCourt: 25, hollowChildren: -10, morale: -10, corruption: 5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_glass_court_feast',
    endingType: 'betrayal',
  },

  {
    id: 'c8_bone_soup_end',
    chapter: 'Chapter 8',
    title: 'Bone Soup',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `You stay at the kitchen. This is the decision. The Grain Vault, the Bridge, the orchard, the siege tunnels — those are other people's crises, or they become other people's crises, because you are here, ladling broth to the queue that does not stop. The work is correct. The work is present. The work does not solve the Hunger War. The work feeds people today, which is not the same as solving the war but is also not nothing. The faction politics happen somewhere else. The mark is quiet. The soup is hot. Three hundred people eat today who might not have eaten.`,
    effectsOnEnter: { setFlags: ['bone_soup_route_end'], morale: 10, hunger: 10, hollowChildren: 10 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_bone_soup',
    endingType: 'wanderer',
  },

  {
    id: 'c8_scavenger_ambush_end',
    chapter: 'Chapter 8',
    title: 'Scavenger Ambush',
    location: 'The Scavenger Front',
    imageKey: 'scavenger_front',
    text: `The fallback route is compromised. The Saints' eastern battalion anticipated the retreat and pre-positioned two squads at the secondary exit — the same maintenance tunnel Dever marked as clear. They arrived while the push was happening. The ambush is not punitive — the Saints want the militia to disperse, not die — but the engagement removes the option of a controlled retreat. Three of Roan's militia are separated. One of them is Dever. The supply line operation fails completely. The militia loses the secondary tunnel access permanently. The Scavenger Front collapses back to Level 7 East and does not recover its position in the chapter's timeframe.`,
    effectsOnEnter: { setFlags: ['scavenger_ambush_end'], ironSaints: 10, morale: -20, health: -20 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_scavenger_ambush',
    endingType: 'death',
  },

  {
    id: 'c8_aqueduct_collapse_end',
    chapter: 'Chapter 8',
    title: 'The Aqueduct Collapses',
    location: 'The Broken Aqueduct',
    imageKey: 'broken_aqueduct',
    text: `The failed repair destabilises the pipe section. The fragments from the fractured regulator housing travel three metres in the main pipe before lodging in the next manifold junction, which fails twelve hours later under the redistributed pressure load. The aqueduct does not simply stop working — it fails in a way that makes future repair significantly more complex. Twelve tunnel sections lose water access entirely. The Water Riot, which had calmed, restarts with greater intensity because now there is nothing to riot toward. Dever's maintenance log entry: "Repair attempted. Repair failed. Failure escalated."`,
    effectsOnEnter: { setFlags: ['aqueduct_collapsed_permanently'], water: -5, morale: -25, hollowChildren: -15 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_aqueduct_collapse',
    endingType: 'death',
  },

  {
    id: 'c8_famine_camp_collapse_end',
    chapter: 'Chapter 8',
    title: 'Famine Camp Collapse',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `The search for hidden reserves fails. The camp's three days of shared rations runs out in two and a half days because hungry people eat more when food is available, which is not a failure of discipline but a failure of mathematics. On the third day the camp loses its internal organisation — not to violence, to entropy. People start moving, individually and in small groups, back toward faction checkpoints that at least offer predictable terms. The camp dissolves. The children from the Hollow Children's section are the last to leave, because Chalk refuses to move them until she has a destination better than the origin. It is a long wait.`,
    effectsOnEnter: { setFlags: ['famine_camp_collapsed'], hollowChildren: -25, morale: -30 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_famine_camp_collapse',
    endingType: 'death',
  },

  {
    id: 'c8_hollow_children_starve_end',
    chapter: 'Chapter 8',
    title: 'Hollow Children Starve',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `You refuse. The mathematics of the refusal are correct: you do not have forty pounds of protein, and giving what you have to thirty-one children leaves nothing for everyone else. Without what you have, the Hollow Children's supply situation deteriorates below the threshold it was already below. Chalk does not return to the square. She takes the children deeper into the tunnel network, toward the sections that nobody else is fighting over because there is nothing in them. Some of the children she takes there will not come back. The ones who do will not forget the square or the person at the empty crate platform who did the arithmetic.`,
    effectsOnEnter: { setFlags: ['hollow_children_starved'], hollowChildren: -50, morale: -30, corruption: 8 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_hollow_children_starve',
    endingType: 'death',
  },

  {
    id: 'c8_sera_lost_end',
    chapter: 'Chapter 8',
    title: 'Sera Lost',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `The attempt to get Sera out of the camp before the pressure peaks fails. Not because of violence — because of the camp's own collapse dynamics, the way large numbers of hungry people moving in uncoordinated directions create a human geography that cannot be navigated quickly. She is in the northeast corner. You are on the west approach when the camp's eastern section begins clearing toward the Saints checkpoint. Thirty metres. The crowd between the corner and the exit makes those thirty metres impassable in the time available. You hear someone calling your name from behind the crowd — her voice, recognisable even at this distance — and then the crowd's momentum carries the gap past the point where a response is possible.`,
    effectsOnEnter: { setFlags: ['sera_lost_ch8'], morale: -25, miraTrust: -5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_sera_lost',
    endingType: 'sacrifice',
  },

  {
    id: 'c8_sera_saved_end',
    chapter: 'Chapter 8',
    title: 'Sera Saved',
    location: 'The Famine Camp',
    imageKey: 'famine_camp',
    text: `She is out. The specific logistics of getting her out vary by the route taken, but the result is the same: she is out of the famine camp and in a position where the chapter's remaining crisis does not include her immediate survival. She does not say much. She stays near you for the rest of the chapter's events in the specific way of someone who has learned that proximity to a decision-maker is a resource, and who has also decided that this decision-maker is worth the resource expenditure. On the Bridge, when the factions argue, she watches from the crowd and at one point catches your eye across the distance. She gives you a very small nod.`,
    effectsOnEnter: { setFlags: ['sera_saved_ch8'], morale: 15, miraTrust: 5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_sera_saved',
    endingType: 'companion',
  },

  {
    id: 'c8_cain_ration_raid_end',
    chapter: 'Chapter 8',
    title: 'Cain\'s Ration Raid',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `Roan's militia executes the simultaneous approach. The three-point push overwhelms the twelve interior Saints before the checkpoint can respond. The food moves. Forty-three militia members distribute three times their weight in Saints field rations to the famine camp queue in four hours. Veyra arrives at hour five and says nothing that changes what has already happened. The raid is documented — Roan is careful about documentation — and the documentation will be used by both sides as evidence of necessity and criminal action respectively. The food does not care which use it finds. It is already eaten. The Saints begin militarising vault access permanently. Roan approved the raid anyway because today was today and tomorrow was tomorrow.`,
    effectsOnEnter: { setFlags: ['cain_raid_complete', 'vault_raided'], ironSaints: -30, morale: 15, food: 6, cainTrust: 5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_cain_ration_raid',
    endingType: 'faction',
  },

  {
    id: 'c8_roan_betrayal_end',
    chapter: 'Chapter 8',
    title: 'Roan\'s Betrayal',
    location: 'The Siege Tunnels',
    imageKey: 'siege_tunnels',
    text: `The negotiation's failure is the last thing Roan needed. He has forty-three people below functional calorie levels for nineteen days. In the silence after the militia falls back to Level 7 East, Roan makes a calculation that is not about you personally and is entirely about you professionally: you brought the negotiation approach, the negotiation approach failed, and the people who failed to eat are his responsibility. He sends a messenger to the Saints checkpoint. The message is about your location. The Saints appreciate the information. You find out what Roan did the same way you find out most things in the tunnels: by the absence of a door where you expected one.`,
    effectsOnEnter: { setFlags: ['roan_betrayal_complete'], ironSaints: 10, morale: -25, cainTrust: -5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_roan_betrayal',
    endingType: 'betrayal',
  },

  {
    id: 'c8_militia_massacre_end',
    chapter: 'Chapter 8',
    title: 'The Militia Goes Too Far',
    location: 'The Siege Tunnels',
    imageKey: 'siege_tunnels',
    text: `The supply corridor is open. The order to hold at the junction is not given, or is given and not followed, in the specific way that happens when nineteen days of hunger and a successful engagement combine in forty-three people who have been angry longer than they have been disciplined. The Saints' reserve battalion withdraws — the correct tactical response. What the militia loses is the specific quality that made it trustworthy: the restraint Roan spent nineteen days maintaining. The tunnel network hears what happened in the supply corridor. The Hollow Children do not send another delegation to the ration square. Chalk's expression, when you next see her, is the expression of someone who has updated their information and does not like the update.`,
    effectsOnEnter: { setFlags: ['militia_massacre_occurred'], ironSaints: -30, hollowChildren: -20, morale: -20, corruption: 8 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_militia_massacre',
    endingType: 'tyrant',
  },

  {
    id: 'c8_dead_orchard_end',
    chapter: 'Chapter 8',
    title: 'Dead Orchard',
    location: 'The Dead Orchard',
    imageKey: 'dead_orchard',
    text: `The grow lights will not activate without the bacterial culture. The bacterial culture requires the Archive, and the Archive requires access you do not currently have or time you do not have. The Dead Orchard stays dark. The infrastructure is intact — Dever confirms this methodically before you leave — and the mark's recognition response means the grow lights are accessible in principle. Two hundred and forty people in the famine camp eat the last of their reserves while the orchard sits dark two levels below them, intact, waiting for someone to bring what it needs. The Hunger War's resolution, when it comes, will have to find a different route.`,
    effectsOnEnter: { setFlags: ['dead_orchard_failed'], morale: -20, lastArchive: -5 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_dead_orchard',
    endingType: 'death',
  },

  {
    id: 'c8_hunger_war_neutral_end',
    chapter: 'Chapter 8',
    title: 'Hunger War Neutral',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `You do what is achievable. The Grain Vault distributes to some. The kitchen feeds some. The aqueduct situation is what it is. The Hollow Children are in their present condition. Roan's militia holds Level 7 East. The Hunger War has lower-intensity continuations — not the acute crisis of the chapter, but the chronic crisis that was always underneath the acute one. People are still hungry. Fewer than if the chapter had gone differently. The chapter ends in the specific quiet of problems that are not solved but are also not getting worse as fast as they were.`,
    effectsOnEnter: { setFlags: ['hunger_war_neutral_end', 'chapter8_survived_neutral'], morale: 5, food: 2 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_hunger_war_neutral',
    endingType: 'wanderer',
  },

  {
    id: 'c8_starving_savior_end',
    chapter: 'Chapter 8',
    title: 'Starving Savior',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The coalition forms. Not cleanly — coalitions never form cleanly — but functionally: Roan's militia manages the Grain Vault distribution, the Hollow Children's network handles the Level 6 supply routes, Juno's clinic receives consistent medicine from a collective sourcing arrangement nobody completely controls, and the Dead Orchard's restoration timeline is public documentation that anyone can read. The cost of the coalition is what it always is: you spend what you had to spend to make it happen. The mark is tired in the specific way that the mark gets tired when it has been doing more than it was designed to do alone. The Savior route is not a destination. It is a direction. The direction is set.`,
    effectsOnEnter: { setFlags: ['savior_route_foundation', 'savior_coalition_formed', 'chapter8_savior_complete'], morale: 20, hollowChildren: 25, lastArchive: 15 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_starving_savior',
    endingType: 'savior',
  },

  {
    id: 'c8_ration_tyrant_end',
    chapter: 'Chapter 8',
    title: 'Ration Tyrant',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `You control the supply. Not through faction authority — through the combination of the gate card, the mark's access to the relic-adjacent systems, and the willingness to make decisions that others are not willing to make. The Grain Vault's distribution schedule is yours. The aqueduct's flow is contingent on the mark. The Dead Orchard's grow lights answer the mark's interface. This is not theoretical power — it is operational power, the kind that produces compliance because the alternative is no food and no water. Veyra adapts. Seraphine negotiates. Roan follows because his people eat. The Hollow Children eat because you let them. The Tyrant path is maintained by force of resource control, which wears things down slowly rather than all at once.`,
    effectsOnEnter: { setFlags: ['tyrant_route_foundation', 'supply_control_achieved', 'chapter8_tyrant_complete'], corruption: 10, morale: -20, ironSaints: -15, glassCourt: -15, hollowChildren: 10 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_ration_tyrant',
    endingType: 'tyrant',
  },

  {
    id: 'c8_choir_dependency_end',
    chapter: 'Chapter 8',
    title: 'Choir Dependency',
    location: 'The Bone Soup Kitchen',
    imageKey: 'bone_soup_kitchen',
    text: `Eleven days. On day twelve, the Kitchen's supply runs short again — the compound's satiation effect has acclimatised to the population's physiology and the extension is no longer eleven days, it is eight, and then six, and the dose requires incremental adjustment. Veyl is present for every adjustment, making each one with the same professional precision she brought to the first. The Kitchen is now producing Red Choir nutritional infrastructure at a scale the Choir has not previously operated in the tunnel network. Two hundred and forty people in the famine camp are experiencing mild broadcast-frequency attunement. The Kitchen keeps running. The Choir's reach extends as far as the Kitchen's queue.`,
    effectsOnEnter: { setFlags: ['choir_dependency_established', 'choir_kitchen_control'], redChoir: 30, corruption: 10, hollowChildren: 5, morale: -10 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_choir_dependency',
    endingType: 'corruption',
  },

  {
    id: 'c8_lone_wanderer_end',
    chapter: 'Chapter 8',
    title: 'Lone Wanderer',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The Bridge belongs to the factions. You leave it to them. This is the decision: to not be the person who makes these decisions, to recognise that the terms of the war are not terms you can win on behalf of everyone else, and that trying to win them costs more than it returns. The tunnel network is large. The Hunger War is a specific crisis in specific locations. There are places in the network where the crisis has not reached, or where the people managing it are doing so in ways that do not require mediation. You find one of those places. The gate card is in your coat. The mark is quiet. The Wanderer path is not a destination. It is the road taken when the destination on offer is not worth the price.`,
    effectsOnEnter: { setFlags: ['wanderer_route_foundation', 'chapter8_wanderer_complete'], morale: -10, corruption: -3 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_lone_wanderer',
    endingType: 'wanderer',
  },

  {
    id: 'c8_scattered_survivors_end',
    chapter: 'Chapter 8',
    title: 'Scattered Survivors',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The coalition does not form. The crowd disperses. Seraphine's documentation table gets signed by a portion of the people who were watching, because Seraphine is efficient and they are hungry and the Glass Court's humanitarian supply arrives whether or not anyone thinks the terms are fair. Veyra's checkpoint remains. Roan's militia holds Level 7 East. The Hollow Children's situation is what it was before the Bridge. The scattered survivors — the people who chose neither side and must navigate between — are the majority of the tunnel network's population. They are not broken. They are scattered. Scattered is survivable, mostly.`,
    effectsOnEnter: { setFlags: ['coalition_scattered'], glassCourt: 15, morale: -20, hollowChildren: -10 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_scattered_survivors',
    endingType: 'wanderer',
  },

  {
    id: 'c8_stalemate_end',
    chapter: 'Chapter 8',
    title: 'Hunger War Stalemate',
    location: 'The Starving Bridge',
    imageKey: 'starving_bridge',
    text: `The Bridge reaches equilibrium. Seraphine and Veyra are both present and both insufficient to act without the other's implicit permission, which neither will grant. Roan's militia holds its position. Chalk watches. Everyone watches everyone. The Hunger War's acute phase ends not in resolution but in mutual exhaustion: everyone runs out of the energy to escalate before they run out of food, which means the chronic phase begins without the acute phase's resolution. People are still hungry. The stalemate is not peace. It is a pause large enough to sleep in.`,
    effectsOnEnter: { setFlags: ['hunger_war_stalemate'], morale: -5, food: 1 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_stalemate',
    endingType: 'wanderer',
  },

  {
    id: 'c8_water_poison_end',
    chapter: 'Chapter 8',
    title: 'Veyra\'s Water',
    location: 'The Grain Vault',
    imageKey: 'grain_vault',
    text: `The document Veyra provides authorises access to Level 5 water distribution. The Level 5 water is sourced from a reservoir that three weeks ago developed slow contamination from a pipe joint failure in the Saints' chemical storage corridor — a failure that Veyra's maintenance division was notified of and classified as "within acceptable parameters for short-term use." The water is not immediately dangerous. It is dangerous over three weeks, which is the timeline the document authorises. The people who drink it develop the specific illness that "acceptable parameters for short-term use" produces when short-term becomes long-term because the repair is never prioritised. Veyra's parameters are correct. Correct in a way that causes harm, which is the most effective kind of correctness for producing harm without accountability.`,
    effectsOnEnter: { setFlags: ['water_poison_distributed'], ironSaints: -30, health: -20, morale: -25, hollowChildren: -15 },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch8_water_poison',
    endingType: 'death',
  },

];
