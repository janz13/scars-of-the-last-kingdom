import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 2 — THE DESCENT
//
//  HOW TO ADD NODES TO THIS CHAPTER:
//  1. Copy a node template from src/data/storyNodeTemplate.js
//  2. Paste it inside the CHAPTER_2_NODES array below (before the closing ];)
//  3. Give every node and choice a unique id (snake_case)
//  4. Run: pnpm --filter @workspace/mobile run typecheck
//  5. Zero errors = safe to play
//
//  CHAPTER 2 DESIGN NOTES (from story bible):
//  - The Archive door is now open; Vault approaches are accessible
//  - Factions move from establishing to active — they need things and will take them
//  - Key beats: Archive inner room, first Vault approach, Choir broadcast,
//    Mira/Cain loyalty test, Glass Court offer, Hollow Children crisis
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_2_NODES: StoryNode[] = [
  {
    id: 'chapter2_start',
    chapter: 'Chapter 2',
    title: 'The Surface Does Not Forgive',
    location: 'City Surface — District 4 Outskirts',
    imageKey: 'surface_ruins',
    text: 'Three days above ground. That\'s what everyone in the tunnels said was impossible. The Saint patrols, the poison clouds, the scavengers. The mark on your wrist is quieter up here — a low pulse instead of the demanding throb you felt near the metro relays. The city above is a different kind of ruin than the one below. Down there, the collapse was sudden. Up here, it has been accumulating for three years.',
    effectsOnEnter: { hunger: -2, thirst: -2, morale: -1, setFlags: ['chapter2_begun'] },
    choices: [
      {
        id: 'c2_look_at_city',
        text: 'Take in the full scope of the ruin around you.',
        nextNode: 'c2_surface_dawn',
      },
    ],
  },

  {
    id: 'c2_surface_dawn',
    chapter: 'Chapter 2',
    title: 'Dawn Through Poison',
    location: 'City Surface — District 4',
    imageKey: 'surface_dawn',
    text: 'The sun rises through a sky that is wrong. Yellow-purple at the edges where the ash cloud catches light. The towers still standing cast long shadows across rubble fields where entire city blocks used to be. You can see the Iron Saints\' patrol routes from here — predictable, rectangular, marked by the smear of boot prints and the occasional body they haven\'t moved. Mira, beside you, counts her remaining medicine with her lips moving silently. Cain is watching the patrol patterns.',
    effectsOnEnter: { morale: -1 },
    choices: [
      {
        id: 'c2_look_at_sky',
        text: 'Study the poisoned sky. Figure out how long you have before the clouds move.',
        nextNode: 'c2_poisoned_sky',
      },
      {
        id: 'c2_skip_dawn',
        text: 'Don\'t waste time looking. Get to the junction.',
        nextNode: 'c2_surface_junction',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'c2_poisoned_sky',
    chapter: 'Chapter 2',
    title: 'The Ash Ceiling',
    location: 'City Surface — District 4',
    imageKey: 'surface_dawn',
    text: 'The cloud cover is thinner to the west. A Medic would recognize the particulate pattern — fine silica and industrial byproduct, not acutely toxic at current density, but a slow accumulation problem. A Wasteland Orphan would know it by smell: three days maximum before the eastern clouds roll in and make the streets genuinely lethal without a respirator. A Relic Hunter would note that the ash is settling on certain pre-collapse antenna arrays and not others — something to do with the residual electromagnetic fields those structures still emit. Everyone else just knows the sky looks sick and the city below it looks like a mouth.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_medic_sky_read',
        text: '[Medic / Underground Medic] Calculate safe exposure windows and plan a route.',
        nextNode: 'c2_surface_junction',
        requirements: { classes: ['medic'], backgrounds: ['underground_medic'] },
        effects: { intelligence: 1, morale: 1, setFlags: ['calculated_safe_windows'] },
        isHidden: true,
      },
      {
        id: 'c2_orphan_sky_smell',
        text: '[Wasteland Orphan] You\'ve smelled this before. Three days. Maybe less.',
        nextNode: 'c2_surface_junction',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { luck: 1, setFlags: ['knows_ash_timeline'] },
        isHidden: true,
      },
      {
        id: 'c2_relic_sky_antenna',
        text: '[Relic Hunter] The ash patterns near those antenna arrays — that\'s not natural drift.',
        nextNode: 'c2_surface_junction',
        requirements: { classes: ['relic_hunter'] },
        effects: { lastArchive: 3, setFlags: ['antenna_field_noticed'] },
        isHidden: true,
      },
      {
        id: 'c2_just_move',
        text: 'The sky isn\'t going to tell you anything useful. Keep moving.',
        nextNode: 'c2_surface_junction',
      },
    ],
  },

  {
    id: 'c2_surface_junction',
    chapter: 'Chapter 2',
    title: 'What the City Asks',
    location: 'City Surface — Junction 4-C',
    imageKey: 'ruined_street',
    text: 'Junction 4-C is a crossroads that used to be a market district. The awnings are gone. The stalls are rubble. Three streets open in front of you: north toward the towers, east toward the old checkpoint grid, west toward the sound of something that might be activity. Mira points north, toward a clinic she knows. Cain points east. Neither of them says anything about the thin sound coming from the west that the mark on your wrist seems to be responding to — a sub-audible pulse that makes your teeth hum. To the south, one of the ruined walls carries a symbol you\'ve seen before in the tunnels.',
    effectsOnEnter: { hunger: -1, thirst: -1 },
    choices: [
      {
        id: 'c2_follow_mira',
        text: 'Follow Mira north. She knows a clinic that might still have supplies.',
        nextNode: 'c2_mira_lead',
        requirements: { flags: ['mira_joins_party'] },
        effects: { miraTrust: 1 },
        flavorText: 'Requires: Mira in party',
      },
      {
        id: 'c2_follow_cain',
        text: 'Follow Cain east. He remembers an old military checkpoint with a cache.',
        nextNode: 'c2_cain_lead',
        requirements: { flags: ['cain_joins_party'] },
        effects: { cainTrust: 1 },
        flavorText: 'Requires: Cain in party',
      },
      {
        id: 'c2_hollow_market',
        text: 'There\'s a rumor of a black market to the west. The Hollow Children run it.',
        nextNode: 'c2_hollow_market_rumor',
      },
      {
        id: 'c2_toward_towers',
        text: 'The Glass Court towers are north-northwest. Information lives there, if nothing else.',
        nextNode: 'c2_glass_approach',
      },
      {
        id: 'c2_follow_the_pulse',
        text: 'The mark is responding to something from the west. Follow it.',
        nextNode: 'c2_choir_signal_heard',
        effects: { corruption: 1 },
      },
      {
        id: 'c2_archive_symbol',
        text: 'That symbol on the wall is the same one near the Archive door. Investigate.',
        nextNode: 'c2_archive_symbol_spotted',
        requirements: { flags: ['knows_archive_exists'] },
      },
      {
        id: 'c2_water_first',
        text: 'Before anything else — you need water. You have twelve hours at most.',
        nextNode: 'c2_water_crisis',
        effects: { thirst: -1 },
      },
      {
        id: 'c2_survivor_rubble',
        text: 'There\'s someone alive in the rubble to your right. A civilian.',
        nextNode: 'c2_survivor_encounter',
        requirements: { blockedFlags: ['c2_survivor_helped'] },
      },
      {
        id: 'c2_go_exile',
        text: 'You could just keep walking. Past the city. Into whatever\'s beyond it.',
        nextNode: 'c2_ending_exile_wanderer',
        effects: { corruption: 1, morale: -3 },
      },
      {
        id: 'c2_sneak_patrol_gap',
        text: 'There\'s a gap in the patrol rotation. Push through now — no hesitation.',
        nextNode: 'c2_mira_lead',
        diceCheck: {
          stat: 'agility',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c2_mira_lead',
          failureNode: 'dice_c2_patrol_sneak_fail',
          criticalSuccessNode: 'c2_mira_lead',
          criticalSuccessEffects: { agility: 1, scrap: 1, morale: 2 },
          criticalFailureNode: 'dice_c2_patrol_sneak_crit_fail',
          failureEffects: { health: -5, morale: -2 },
          criticalFailureEffects: { health: -18, morale: -6, ironSaints: -5 },
        },
      },
    ],
  },

  {
    id: 'c2_water_crisis',
    chapter: 'Chapter 2',
    title: 'The Body Keeps Score',
    location: 'City Surface — Collapsed Block',
    imageKey: 'ruined_street',
    text: 'Your throat is dry in the way that becomes a sound in your ears. The mark on your wrist is duller when you\'re dehydrated — everything is duller. You need clean water within a day or the decisions start making themselves. There\'s a municipal water storage block two streets over — pre-collapse infrastructure, almost certainly still sealed. There might be something in the rubble if you look hard enough. There\'s also the rain collection on the half-collapsed overhang above, which has been gathering something for days. Something is not the same as clean.',
    effectsOnEnter: { thirst: -2 },
    choices: [
      {
        id: 'c2_find_municipal_water',
        text: 'Search for the municipal water block. Infrastructure this old might still hold.',
        nextNode: 'c2_water_search',
        effects: { health: -2 },
      },
      {
        id: 'c2_drink_rain_collection',
        text: 'Drink the rain collection. The risk is manageable.',
        nextNode: 'c2_water_tainted_choice',
        effects: { thirst: 2, corruption: 1 },
      },
      {
        id: 'c2_courier_knows_water',
        text: '[Black Market Courier] You know exactly which blocks have sealed caches. Walk there.',
        nextNode: 'c2_water_search',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { water: 3, thirst: 4, setFlags: ['c2_water_found_clean'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c2_water_search',
    chapter: 'Chapter 2',
    title: 'Civic Infrastructure — What Remains',
    location: 'City Surface — Municipal Block 4-7',
    imageKey: 'ruined_street',
    text: 'The block is partially standing. The storage tanks are in the basement — emergency water supply, sealed since the blackout. A Saints patrol route runs within forty meters of the entrance. The lock on the maintenance hatch is a pre-collapse mechanical cipher lock: five rotating discs, an older generation. You have three choices and the patrol\'s next pass in roughly eight minutes.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_break_the_lock',
        text: 'Force the lock open. Noise, but water.',
        nextNode: 'c2_surface_junction',
        effects: { water: 5, thirst: 6, ironSaints: -2, setFlags: ['c2_water_found_clean'] },
      },
      {
        id: 'c2_pick_the_lock',
        text: 'Pick the cipher lock quietly. This will take time.',
        nextNode: 'c2_surface_junction',
        requirements: { intelligence: 7 },
        effects: { water: 5, thirst: 6, setFlags: ['c2_water_found_clean'] },
        flavorText: 'Requires: Intelligence 7',
      },
      {
        id: 'c2_wait_for_patrol',
        text: 'Wait for the patrol to pass before approaching.',
        nextNode: 'c2_water_tainted_choice',
        effects: { thirst: -1, morale: -1 },
      },
    ],
  },

  {
    id: 'c2_water_tainted_choice',
    chapter: 'Chapter 2',
    title: 'Risk Assessment',
    location: 'City Surface — Collapsed Block',
    imageKey: 'ruined_street',
    speaker: 'Mira',
    text: 'Mira looks at the water — the rain collection you\'ve gathered — and does something with her face that isn\'t quite a wince.',
    dialogue: 'Silica particulate. Some organic matter — old organic matter. A Medic could filter most of it with a standard kit. Without one, you\'re rolling dice on how long your gut keeps it together. It won\'t kill you today. It might kill you in three days when you can least afford to be weak.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_drink_tainted_accept',
        text: 'Drink it. Three days\' problems are better than today\'s problems.',
        nextNode: 'c2_surface_junction',
        effects: { thirst: 3, health: -4, setFlags: ['drank_tainted_water'] },
      },
      {
        id: 'c2_medic_filter',
        text: '[Medic] Use your kit to filter it properly. It takes longer but it\'s safe.',
        nextNode: 'c2_surface_junction',
        requirements: { classes: ['medic'], backgrounds: ['underground_medic'] },
        effects: { thirst: 4, water: 2, setFlags: ['c2_water_found_clean'] },
        isHidden: true,
      },
      {
        id: 'c2_refuse_tainted',
        text: 'Refuse. Keep searching.',
        nextNode: 'c2_ending_dehydration',
        requirements: { thirst: 0 },
        effects: { thirst: -2 },
        flavorText: 'You have no water left.',
      },
    ],
  },

  {
    id: 'c2_patrol_spotted',
    chapter: 'Chapter 2',
    title: 'Iron Saints — Sector 4 Patrol',
    location: 'City Surface — Open Street',
    imageKey: 'saints_patrol',
    speaker: 'Cain',
    text: 'Cain grabs your arm and pulls you behind a collapsed wall section before you fully register what he\'s seen. A Saints patrol — six soldiers, full kit, the red-cross sigil on their chest plates. They walk in the practiced rectangle of soldiers who\'ve done this route eight hundred times. One of them carries a mark-detection wand. The device sweeps in lazy arcs. It hasn\'t pointed at you. Yet.',
    dialogue: 'The wand\'s range is about ten meters. We\'re fifteen away. If you move, stay low and move in the shadow of the wall. If it sweeps our direction, the mark will glow. We need to be behind something solid.',
    effectsOnEnter: { morale: -2 },
    choices: [
      {
        id: 'c2_patrol_hide_fully',
        text: 'Stay completely still. Don\'t breathe loud.',
        nextNode: 'c2_patrol_hide_success',
        requirements: { luck: 5 },
        effects: { morale: -1 },
        flavorText: 'Luck 5 or higher: better odds.',
      },
      {
        id: 'c2_patrol_run',
        text: 'Run for the alley to your left.',
        nextNode: 'c2_patrol_hide_success',
        effects: { health: -3, ironSaints: -1 },
      },
      {
        id: 'c2_cain_distraction',
        text: 'Let Cain create a distraction. He knows what Saints respond to.',
        nextNode: 'c2_patrol_hide_success',
        requirements: { flags: ['cain_joins_party'] },
        effects: { cainTrust: 2, ironSaints: -2, morale: 1 },
        flavorText: 'Requires: Cain in party',
      },
      {
        id: 'c2_surrender_patrol',
        text: 'Step out. Surrender. See what they do with someone bearing the mark.',
        nextNode: 'c2_ending_saints_executed',
        effects: { corruption: -1, morale: -4 },
      },
    ],
  },

  {
    id: 'c2_patrol_hide_success',
    chapter: 'Chapter 2',
    title: 'The Wand Sweeps Past',
    location: 'City Surface — Hidden',
    imageKey: 'ruined_street',
    text: 'The wand sweeps your direction and the mark on your wrist tightens — not blazing, but present, like a held breath. The soldier with the device looks in your direction for a long moment that has no bottom. Then he turns, says something short to the others, and the patrol continues. You breathe. The mark relaxes. Mira\'s hand, which had been gripping your arm hard enough to leave marks, loosens.',
    effectsOnEnter: { morale: 2, setFlags: ['c2_evaded_patrol'] },
    choices: [
      {
        id: 'c2_after_patrol_junction',
        text: 'Move now, while the patrol is turned away.',
        nextNode: 'c2_surface_junction',
      },
    ],
  },

  {
    id: 'c2_survivor_encounter',
    chapter: 'Chapter 2',
    title: 'What They Left Behind',
    location: 'City Surface — Rubble Field',
    imageKey: 'ruined_street',
    text: 'A woman, perhaps forty, pinned under a support beam that is definitely not the worst thing that has happened to her recently. She looks at you with the particular expression of someone who has already made peace with dying and finds being found by a stranger surprising and a little inconvenient. She has food — you can see a sealed pack just out of her reach. She also has information. The Saints took her children east, two days ago, toward the checkpoint grid.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_free_the_survivor',
        text: 'Free her from the beam. She\'ll need medical attention after.',
        nextNode: 'c2_surface_junction',
        effects: { health: -3, morale: 3, miraTrust: 2, food: 2, setFlags: ['c2_survivor_helped', 'c2_knows_children_taken'] },
      },
      {
        id: 'c2_take_the_food',
        text: 'Take the food. She has it and you need it.',
        nextNode: 'c2_surface_junction',
        effects: { food: 3, morale: -3, corruption: 1, setFlags: ['c2_survivor_helped'] },
      },
      {
        id: 'c2_talk_and_leave',
        text: 'Listen to what she knows about the checkpoint. Don\'t take anything.',
        nextNode: 'c2_surface_junction',
        effects: { morale: -2, setFlags: ['c2_survivor_helped', 'c2_knows_children_taken'] },
      },
      {
        id: 'c2_ignore_survivor',
        text: 'Move on. You cannot carry everyone\'s problem.',
        nextNode: 'c2_surface_junction',
        effects: { corruption: 1, morale: -2, cainTrust: -2 },
      },
    ],
  },

  // ────────────────────────────────
  // ROUTE 1 — MIRA'S CLINIC
  // ────────────────────────────────

  {
    id: 'c2_mira_lead',
    chapter: 'Chapter 2',
    title: 'She Knows This Street',
    location: 'City Surface — Northern Approach',
    imageKey: 'ruined_street',
    speaker: 'Mira',
    text: 'Mira walks differently on the surface than she does in the tunnels. Down there she was deliberate, measured. Up here she navigates rubble fields like she\'s remembering something she tried to stop knowing — corner by corner, her eyes reading the street names on the few signs still upright.',
    dialogue: 'The clinic is on Noran Street. Or it was. Pre-blackout it was a voluntary health center. I worked there for two years. If anyone kept it running, it would be the staff who lived in the district. There\'s no guarantee. But the building was reinforced concrete — it\'s probably still standing.',
    effectsOnEnter: { miraTrust: 1 },
    choices: [
      {
        id: 'c2_mira_ask_how_she_knows',
        text: 'Ask how she knows the surface this well. She said she was underground.',
        nextNode: 'c2_mira_story',
      },
      {
        id: 'c2_mira_just_walk',
        text: 'Trust her and walk.',
        nextNode: 'c2_mira_ruins_walk',
      },
    ],
  },

  {
    id: 'c2_mira_story',
    chapter: 'Chapter 2',
    title: 'Before the Blackout',
    location: 'City Surface — Northern Approach',
    imageKey: 'ruined_street',
    speaker: 'Mira',
    text: 'She\'s quiet for a long time after you ask. The rubble field they walk through has a rhythm — step over, duck under, test before stepping again.',
    dialogue: 'I wasn\'t always in the tunnels. Before the blackout I had a life here. A clinic. Colleagues. A person I ate dinner with most nights, whose name I\'m not going to say up here because the sound of it still does something to me. The night of the blackout I was finishing a late shift. I went underground because everyone did. I stayed because the person I ate dinner with didn\'t come back up. I\'m still looking. This is still looking.',
    effectsOnEnter: { miraTrust: 3, setFlags: ['c2_mira_backstory_heard'] },
    choices: [
      {
        id: 'c2_mira_ask_person',
        text: 'Ask who the person was.',
        nextNode: 'c2_mira_ruins_walk',
        effects: { miraTrust: -1 },
      },
      {
        id: 'c2_mira_say_nothing',
        text: 'Don\'t ask. Walk with her.',
        nextNode: 'c2_mira_ruins_walk',
        effects: { miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c2_mira_ruins_walk',
    chapter: 'Chapter 2',
    title: 'Three Blocks',
    location: 'City Surface — District 4 North',
    imageKey: 'ruined_street',
    text: 'Three blocks of surface travel. Burned-out vehicles turned into improvised barricades. A Saints watchtower at the corner of what used to be a pharmacy — occupied, a soldier visible in the upper window, facing south. Children\'s chalk drawings on the one section of wall protected from the rain, already three years old and still bright: a sun, a house with smoke coming from the chimney, a figure with arms out. Mira looks at the chalk drawings for exactly two seconds and keeps walking.',
    effectsOnEnter: { hunger: -1, thirst: -1 },
    choices: [
      {
        id: 'c2_mira_walk_checkpoint',
        text: 'The clinic route goes past an Iron Saints checkpoint. Continue.',
        nextNode: 'c2_mira_checkpoint_block',
      },
    ],
  },

  {
    id: 'c2_mira_checkpoint_block',
    chapter: 'Chapter 2',
    title: 'The Block on Noran Street',
    location: 'City Surface — Saints Checkpoint Alpha-4',
    imageKey: 'saints_patrol',
    text: 'The Saints have a hard checkpoint on the only direct route to Noran Street. Two soldiers at a barrier, papers check in progress for a thin queue of civilians. A wand operator behind them. The checkpoint is not a place where someone bearing the Sinner\'s Mark would survive identification. Mira has old papers — pre-blackout, technically valid — but they list her clinic affiliation, which the Saints have reasons to care about.',
    effectsOnEnter: { morale: -2 },
    choices: [
      {
        id: 'c2_choose_mira_papers_gambit',
        text: 'Let Mira try her papers. Flanking her with a civilian posture.',
        nextNode: 'c2_mira_papers_gambit',
        requirements: { flags: ['mira_joins_party'] },
      },
      {
        id: 'c2_choose_mira_alley_route',
        text: 'Find an alley route around the checkpoint. Longer, more dangerous.',
        nextNode: 'c2_mira_alley_route',
      },
      {
        id: 'c2_saints_papers_bypass',
        text: 'You have Saints papers. Just walk through.',
        nextNode: 'c2_clinic_exterior',
        requirements: { flags: ['has_saints_papers'] },
        effects: { ironSaints: 1 },
        flavorText: 'Requires: Saints papers',
      },
      {
        id: 'c2_mira_bribe_saints',
        text: 'Offer the soldiers something to look the other way.',
        nextNode: 'c2_clinic_exterior',
        requirements: { scrap: 10 },
        effects: { scrap: -10, ironSaints: -1 },
        flavorText: 'Cost: 10 Scrap',
      },
      {
        id: 'c2_mira_mark_suppress',
        text: 'Try to suppress the mark\'s glow and walk through in plain sight.',
        nextNode: 'c2_ending_saints_executed',
        requirements: { blockedFlags: ['first_mark_control'] },
        effects: { corruption: 1 },
      },
      {
        id: 'c2_mira_mark_control_bypass',
        text: 'You\'ve learned to control the mark. Suppress it and walk through.',
        nextNode: 'c2_clinic_exterior',
        requirements: { flags: ['first_mark_control'] },
        effects: { corruption: 1, setFlags: ['c2_mark_suppressed_checkpoint'] },
        flavorText: 'Requires: First mark control',
      },
    ],
  },

  {
    id: 'c2_mira_papers_gambit',
    chapter: 'Chapter 2',
    title: 'The Clinic Staff Pass',
    location: 'City Surface — Checkpoint Queue',
    imageKey: 'saints_patrol',
    speaker: 'Mira',
    text: 'Mira produces the papers with the particular practiced movement of someone who has done many things they were nervous about and learned to hide the nerves first. The soldier takes them, looks, looks again at Mira\'s face.',
    dialogue: '[To you, low] Stay behind me. Look bored. Bored is safe — no one who\'s scared looks bored.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_papers_look_bored',
        text: 'Act bored. Neutral. Just a person waiting.',
        nextNode: 'c2_clinic_exterior',
        requirements: { luck: 5 },
        effects: { miraTrust: 2, setFlags: ['c2_passed_checkpoint_papers'] },
        flavorText: 'Luck 5 or higher recommended',
      },
      {
        id: 'c2_papers_talk_your_way',
        text: 'Back Mira up verbally. You\'re her assistant, carrying supplies.',
        nextNode: 'c2_clinic_exterior',
        requirements: { intelligence: 7 },
        effects: { miraTrust: 1, ironSaints: -1, setFlags: ['c2_passed_checkpoint_papers'] },
        flavorText: 'Requires: Intelligence 7',
      },
      {
        id: 'c2_papers_fail_run',
        text: 'The soldier\'s eyes move to you. Run.',
        nextNode: 'c2_mira_alley_route',
        effects: { health: -5, morale: -3, miraTrust: -2, ironSaints: -3 },
      },
      {
        id: 'c2_papers_mira_shot',
        text: 'The soldier grabs Mira. You run. She doesn\'t.',
        nextNode: 'c2_ending_mira_dies_checkpoint',
        effects: { morale: -5, corruption: 2, miraTrust: -10 },
      },
    ],
  },

  {
    id: 'c2_mira_alley_route',
    chapter: 'Chapter 2',
    title: 'The Gap in the Saint Line',
    location: 'City Surface — Service Alleys',
    imageKey: 'ruined_street',
    text: 'The alley runs behind the old pharmacy and the shuttered restaurant beside it. It\'s narrow enough that you have to go single-file, and something has been living in the burned-out restaurant — you can smell it. The route adds eight minutes and the gap in the Saints\' checkpoint coverage is exactly that: the soldiers\' patrol rotation has an eight-minute window every hour where the alley entrance is unobserved. You know this because Cain told you, quietly, before Mira started walking toward the papers queue.',
    effectsOnEnter: { health: -2 },
    choices: [
      {
        id: 'c2_alley_fast',
        text: 'Move fast and quiet. Get through the gap.',
        nextNode: 'c2_clinic_exterior',
        effects: { setFlags: ['c2_used_alley_route'] },
      },
      {
        id: 'c2_alley_check_restaurant',
        text: 'Check what\'s living in the restaurant. It might be useful or dangerous to know.',
        nextNode: 'c2_clinic_exterior',
        effects: { scrap: 2, food: 1, health: -3, setFlags: ['c2_used_alley_route'] },
      },
    ],
  },

  {
    id: 'c2_clinic_exterior',
    chapter: 'Chapter 2',
    title: 'Noran Street Health Centre',
    location: 'City Surface — Noran Street',
    imageKey: 'ruined_street',
    speaker: 'Mira',
    text: 'The building is standing. Mira stops at the end of the block and looks at it for a moment that has nothing clinical in it.',
    dialogue: 'The windows are boarded. Someone boarded them — that means someone was here after the blackout. The Saints\' cross is painted on the right side — they marked it as cleared, which means either they left it alone as a neutral site or they emptied it. There\'s only one way to find out.',
    effectsOnEnter: { morale: 2 },
    choices: [
      {
        id: 'c2_enter_clinic',
        text: 'Enter the clinic.',
        nextNode: 'c2_clinic_inside',
      },
    ],
  },

  {
    id: 'c2_clinic_inside',
    chapter: 'Chapter 2',
    title: 'What They Saved',
    location: 'Noran Street Clinic — Interior',
    imageKey: 'surface_ruins',
    text: 'Someone has been maintaining the clinic. The supply cabinet is locked but someone replaced the lock — the original was a badge-reader, this one is a mechanical key. The examination beds are clean. A roster is pinned to the wall with names, dates, and treatment codes — the most recent entry is from eleven days ago. The clinic is running. Whoever is running it isn\'t here right now.',
    effectsOnEnter: { morale: 2, setFlags: ['c2_clinic_found_active'] },
    choices: [
      {
        id: 'c2_take_clinic_supplies',
        text: 'Take what you need from the supply cabinet. Break the lock if necessary.',
        nextNode: 'c2_clinic_patient',
        effects: { medicine: 5, food: 2, miraTrust: -3, setFlags: ['c2_took_clinic_supplies'] },
      },
      {
        id: 'c2_wait_in_clinic',
        text: 'Wait for whoever is running this place to come back.',
        nextNode: 'c2_clinic_patient',
        effects: { morale: 1, miraTrust: 2 },
      },
      {
        id: 'c2_mira_takes_charge',
        text: 'Let Mira inventory the space. This is her clinic.',
        nextNode: 'c2_clinic_patient',
        requirements: { flags: ['mira_joins_party'] },
        effects: { miraTrust: 4, medicine: 3, morale: 3, setFlags: ['mira_takes_clinic'] },
      },
    ],
  },

  {
    id: 'c2_clinic_patient',
    chapter: 'Chapter 2',
    title: 'The One Who Was Already There',
    location: 'Noran Street Clinic — Back Room',
    imageKey: 'surface_ruins',
    text: 'There is a patient in the back room. A man, perhaps sixty, sitting upright in a clinic chair with the particular stillness of someone who has been ill long enough to learn that moving costs more than it\'s worth. He looks at you without fear, which is unusual. He has the mark on his wrist — smaller than yours, dimmer, like a candle compared to a lamp. He sees you notice it. He nods once.',
    effectsOnEnter: { setFlags: ['c2_met_clinic_patient'] },
    choices: [
      {
        id: 'c2_patient_talk_mark',
        text: 'Ask about his mark. How long has he had it.',
        nextNode: 'c2_clinic_revelation',
        effects: { lastArchive: 3 },
      },
      {
        id: 'c2_patient_treat_him',
        text: 'Treat his illness first. Information can wait.',
        nextNode: 'c2_clinic_revelation',
        effects: { medicine: -2, miraTrust: 3, morale: 2, lastArchive: 2 },
      },
      {
        id: 'c2_patient_ignore',
        text: 'Leave him to his chair. You have your own problems.',
        nextNode: 'c2_nightfall_gather',
        effects: { morale: -2, corruption: 1 },
      },
    ],
  },

  {
    id: 'c2_clinic_revelation',
    chapter: 'Chapter 2',
    title: 'The Older Marked',
    location: 'Noran Street Clinic — Back Room',
    imageKey: 'surface_ruins',
    speaker: 'Clinic Patient',
    text: 'He has a name but declines to give it. He\'s had the mark for three years — from the night of the blackout, the same as you. He lived on the surface the entire time.',
    dialogue: 'I know what you\'re going to ask. Forty-three of us got it that night — that\'s what the woman in the Archive coat told me, six months ago, when she found me here. She was counting. She had a list. She said I was number thirty-one. That there had been thirty already and most of them were dead. You\'re the first I\'ve seen since. What number are you?',
    effectsOnEnter: { lastArchive: 8, setFlags: ['c2_knows_43_marked', 'c2_knows_archive_woman', 'c2_clinic_revelation_heard'] },
    choices: [
      {
        id: 'c2_ask_about_archive_woman',
        text: 'Ask about the woman in the Archive coat. What did she look like.',
        nextNode: 'c2_nightfall_gather',
        effects: { lastArchive: 5, setFlags: ['c2_archive_woman_described'] },
      },
      {
        id: 'c2_ask_what_happened_to_them',
        text: 'Ask about the other marked who died. How.',
        nextNode: 'c2_nightfall_gather',
        effects: { morale: -3, lastArchive: 3, setFlags: ['c2_marked_deaths_known'] },
      },
      {
        id: 'c2_say_nothing',
        text: 'Don\'t answer. Thank him and leave.',
        nextNode: 'c2_nightfall_gather',
        effects: { corruption: 1 },
      },
    ],
  },

  // ────────────────────────────────
  // ROUTE 2 — CAIN'S CHECKPOINT
  // ────────────────────────────────

  {
    id: 'c2_cain_lead',
    chapter: 'Chapter 2',
    title: 'He Knows This Ground',
    location: 'City Surface — Eastern Approach',
    imageKey: 'ruined_street',
    speaker: 'Cain',
    text: 'Cain doesn\'t walk like a civilian. He probably can\'t. Every step reads the ground for cover, every pause has a direction attached, every door gets a flicker of assessment before he passes it.',
    dialogue: 'Checkpoint Hotel-7. My unit held it for eighteen months before the blackout. Emergency supplies in the sublevel — medication, rations, communications kit. The Saints absorbed most of the old military infrastructure so they might have found it. But H-7 was our checkpoint, not theirs. We hid things in it they wouldn\'t know to look for.',
    effectsOnEnter: { cainTrust: 1 },
    choices: [
      {
        id: 'c2_cain_ask_unit',
        text: 'Ask about his unit. Who they were.',
        nextNode: 'c2_cain_ruins_path',
        effects: { cainTrust: 2 },
      },
      {
        id: 'c2_cain_just_go',
        text: 'Trust him. Move.',
        nextNode: 'c2_cain_ruins_path',
      },
    ],
  },

  {
    id: 'c2_cain_ruins_path',
    chapter: 'Chapter 2',
    title: 'The Shape of a Soldier\'s Grief',
    location: 'City Surface — Eastern Ruins',
    imageKey: 'ruined_street',
    text: 'The route east is heavier ruin. Entire building faces collapsed outward into the street — the interior walls holding while the facades gave. This was a combat area, during the early months after the blackout when the factions were forming and no one yet understood what a Saint was or what the Glass Court intended. The evidence of it is in the rubble: shell casings, abandoned gear, the particular kind of structural damage that comes from directed explosive rather than collapse.',
    effectsOnEnter: { morale: -1, hunger: -1 },
    choices: [
      {
        id: 'c2_cain_tactical_route',
        text: 'Let Cain choose the route through. He reads this terrain.',
        nextNode: 'c2_cain_old_unit_evidence',
        effects: { cainTrust: 1, health: 0 },
      },
      {
        id: 'c2_cain_direct_route',
        text: 'Take the direct line. Faster, but more exposed.',
        nextNode: 'c2_cain_old_unit_evidence',
        effects: { health: -4, morale: -1 },
      },
    ],
  },

  {
    id: 'c2_cain_old_unit_evidence',
    chapter: 'Chapter 2',
    title: 'What They Wrote on the Wall',
    location: 'City Surface — Eastern Approach, Collapsed Precinct',
    imageKey: 'ruined_street',
    text: 'Cain stops at a wall. The building it\'s attached to is gone — just the wall, four meters of it, still standing without its building like a tooth with no mouth. Someone has painted names on it. Twenty-three names in rough paint. Cain reads them from left to right without speaking. His hand touches two of them.',
    effectsOnEnter: { cainTrust: 2, morale: -2, setFlags: ['c2_unit_wall_found'] },
    choices: [
      {
        id: 'c2_cain_ask_names',
        text: 'Ask who they were.',
        nextNode: 'c2_old_checkpoint',
        effects: { cainTrust: 3, morale: -1 },
      },
      {
        id: 'c2_cain_stand_with_him',
        text: 'Stand beside him without asking. Let him take as long as he needs.',
        nextNode: 'c2_old_checkpoint',
        effects: { cainTrust: 4, morale: 1 },
      },
      {
        id: 'c2_cain_keep_moving',
        text: 'Tell him gently that you need to keep moving.',
        nextNode: 'c2_old_checkpoint',
        effects: { cainTrust: -2 },
      },
    ],
  },

  {
    id: 'c2_old_checkpoint',
    chapter: 'Chapter 2',
    title: 'Hotel-7',
    location: 'City Surface — Checkpoint Hotel-7',
    imageKey: 'iron_saints_checkpoint',
    text: 'The checkpoint structure is intact. Someone — Saints, by the markings — has been using it for storage. Supply crates bearing the iron cross seal are stacked in the main room. The Saints\' occupancy looks recent: food waste, sleeping gear still rolled out. They\'re not here now. Cain moves immediately to a particular section of the floor, kneels, and starts pulling at a concrete tile that isn\'t mortared.',
    effectsOnEnter: { setFlags: ['c2_checkpoint_found'] },
    choices: [
      {
        id: 'c2_help_cain_lift',
        text: 'Help Cain lift the tile. Whatever is under it, he\'s earned first look.',
        nextNode: 'c2_checkpoint_arms_cache',
        effects: { cainTrust: 2 },
      },
      {
        id: 'c2_check_saints_crates',
        text: 'While Cain works, check the Saints\' supply crates.',
        nextNode: 'c2_checkpoint_arms_cache',
        effects: { food: 3, medicine: 2, ironSaints: -2 },
      },
      {
        id: 'c2_watch_exits',
        text: 'Stand watch at the door. The Saints were just here.',
        nextNode: 'c2_checkpoint_arms_cache',
        effects: { cainTrust: 1, morale: 1 },
      },
    ],
  },

  {
    id: 'c2_checkpoint_arms_cache',
    chapter: 'Chapter 2',
    title: 'What They Hid',
    location: 'Checkpoint Hotel-7 — Sublevel',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Cain',
    text: 'Under the tile: a narrow shaft, a ladder, a sealed steel box that needs a code Cain inputs from memory. The box holds emergency rations (still good), a comprehensive medical kit, two weeks of water filtration tablets, and a sealed comms unit.',
    dialogue: 'The rations are mine to give. The kit is yours — you need it more than the cache does. The comms unit is a problem. It\'s on the old military band. Someone is still transmitting on it. Has been for three years.',
    effectsOnEnter: { food: 5, water: 4, medicine: 4, cainTrust: 3, setFlags: ['c2_cache_found', 'c2_comms_unit_found'] },
    choices: [
      {
        id: 'c2_listen_to_comms',
        text: 'Listen to whatever is transmitting on the old military band.',
        nextNode: 'c2_checkpoint_comms',
      },
      {
        id: 'c2_pack_and_leave',
        text: 'Take the supplies and get out before the Saints come back.',
        nextNode: 'c2_checkpoint_occupied',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c2_checkpoint_comms',
    chapter: 'Chapter 2',
    title: 'Old Signal, New Voice',
    location: 'Checkpoint Hotel-7 — Sublevel',
    imageKey: 'iron_saints_checkpoint',
    text: 'The comms unit picks up a repeating transmission on a frequency that hasn\'t been in use since before the blackout. It\'s not automated — the pattern changes, meaning a person is operating the other end. You can\'t decode it without a cipher, but the transmission\'s rhythm matches a pre-collapse military acknowledgment protocol. Someone with military training is still out there, still transmitting, on a band they expected no one to find. Cain listens to three full cycles with an expression that closes itself.',
    effectsOnEnter: { setFlags: ['c2_comms_signal_heard'] },
    choices: [
      {
        id: 'c2_comms_cain_knows',
        text: 'Ask if Cain recognizes the transmission style.',
        nextNode: 'c2_checkpoint_occupied',
        effects: { cainTrust: -1, setFlags: ['c2_cain_knows_signal'] },
      },
      {
        id: 'c2_comms_take_unit',
        text: 'Take the comms unit. You can decode it later.',
        nextNode: 'c2_checkpoint_occupied',
        effects: { setFlags: ['c2_has_comms_unit'] },
      },
      {
        id: 'c2_comms_transmit',
        text: 'Transmit a response. Someone out there should know you\'re alive.',
        nextNode: 'c2_checkpoint_occupied',
        effects: { corruption: 1, setFlags: ['c2_transmitted_response', 'c2_has_comms_unit'] },
      },
    ],
  },

  {
    id: 'c2_checkpoint_occupied',
    chapter: 'Chapter 2',
    title: 'They\'re Coming Back',
    location: 'Checkpoint Hotel-7 — Main Room',
    imageKey: 'saints_patrol',
    text: 'You hear them before you see them. Two Saints soldiers, coming in from the east entrance. They\'re talking — the easy conversation of people returning to their own space. They haven\'t seen you yet. The sublevel entrance is still open. There are three Saints supply crates between you and the west exit. Cain is already reading the geometry.',
    effectsOnEnter: { morale: -2 },
    choices: [
      {
        id: 'c2_checkpoint_stealth',
        text: 'Get back into the sublevel and wait them out.',
        nextNode: 'c2_checkpoint_stealth_attempt',
      },
      {
        id: 'c2_checkpoint_run_west',
        text: 'Sprint for the west exit while they\'re still in the doorway.',
        nextNode: 'c2_cain_confrontation',
        effects: { health: -4, ironSaints: -2 },
      },
      {
        id: 'c2_checkpoint_cain_stays',
        text: 'Cain steps into view and you hear his voice change into something older.',
        nextNode: 'c2_cain_confrontation',
        requirements: { flags: ['cain_joins_party'] },
        effects: { cainTrust: 3 },
      },
    ],
  },

  {
    id: 'c2_checkpoint_stealth_attempt',
    chapter: 'Chapter 2',
    title: 'Ninety Minutes Under the Floor',
    location: 'Checkpoint Hotel-7 — Sublevel',
    imageKey: 'iron_saints_checkpoint',
    text: 'Ninety minutes of absolute silence in a four-foot-deep cache space while two soldiers eat their meal directly overhead and have a conversation about someone called Ser Hanna who apparently owes one of them a significant personal debt and has been avoiding the matter through strategic scheduling. At some point one of them directly above you shifts their weight and you hear the floor creak and the mark on your wrist brightens the tiniest possible amount in the dark and you think about breathing very, very quietly.',
    effectsOnEnter: { morale: -1, setFlags: ['c2_hid_under_checkpoint'] },
    choices: [
      {
        id: 'c2_stealth_success',
        text: 'They leave. You wait five more minutes. Then you climb out.',
        nextNode: 'c2_cain_loyalty_choice',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c2_cain_confrontation',
    chapter: 'Chapter 2',
    title: 'Terren and Mast',
    location: 'Checkpoint Hotel-7 — Main Room',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Cain',
    text: 'The two soldiers are named Terren and Mast. Cain knows this because he trained them. They recognize him immediately and then there\'s a long moment where all three of them recalibrate what they\'re going to do.',
    dialogue: 'They\'re going to see the mark on you. They\'ve already seen me. We have about thirty seconds before they decide whether they\'re soldiers or people. In my experience it depends on who\'s watching.',
    effectsOnEnter: { setFlags: ['c2_cain_meets_old_unit'] },
    choices: [
      {
        id: 'c2_cain_vouch_for_you',
        text: 'Let Cain vouch for you. Former unit commander status.',
        nextNode: 'c2_cain_loyalty_choice',
        effects: { cainTrust: 4, ironSaints: -1 },
      },
      {
        id: 'c2_cain_tell_truth',
        text: 'Tell Terren and Mast the truth about the mark.',
        nextNode: 'c2_cain_loyalty_choice',
        effects: { ironSaints: -3, setFlags: ['c2_told_saints_truth_mark'] },
      },
      {
        id: 'c2_run_and_split',
        text: 'Run. Split off from Cain and meet at the junction.',
        nextNode: 'c2_nightfall_gather',
        effects: { health: -5, cainTrust: -3, ironSaints: -2, setFlags: ['c2_split_from_cain'] },
      },
    ],
  },

  {
    id: 'c2_cain_loyalty_choice',
    chapter: 'Chapter 2',
    title: 'Whatever He Decides',
    location: 'City Surface — East of Hotel-7',
    imageKey: 'ruined_street',
    speaker: 'Cain',
    text: 'You\'re clear of the checkpoint. The sun is moving west. Cain walks beside you and doesn\'t say anything for three blocks. When he speaks, it\'s without preamble.',
    dialogue: 'I told them you were my responsibility. Which you are. I told them the mark was a medical condition under observation, which is apparently true enough that it passed. They let us go because I outranked them and because Terren owes me something personal. None of that is going to hold the next time. I need you to know that the next time this happens I\'m going to make the same choice and I need you to know that choosing you is the harder thing.',
    effectsOnEnter: { cainTrust: 5, morale: 2, setFlags: ['c2_cain_chose_player'] },
    choices: [
      {
        id: 'c2_cain_thank_him',
        text: 'Thank him. Directly. Tell him it means something.',
        nextNode: 'c2_nightfall_gather',
        effects: { cainTrust: 3, morale: 2 },
      },
      {
        id: 'c2_cain_ask_why',
        text: 'Ask why. He had other options.',
        nextNode: 'c2_nightfall_gather',
        effects: { cainTrust: 2, lastArchive: 2 },
      },
      {
        id: 'c2_cain_dont_respond',
        text: 'Don\'t respond. Walk.',
        nextNode: 'c2_nightfall_gather',
        effects: { cainTrust: -1 },
      },
    ],
  },

  // ────────────────────────────────
  // ROUTE 3 — HOLLOW CHILDREN MARKET
  // ────────────────────────────────

  {
    id: 'c2_hollow_market_rumor',
    chapter: 'Chapter 2',
    title: 'What the West Wind Carries',
    location: 'City Surface — Junction 4-C',
    imageKey: 'ruined_street',
    text: 'The rumor circulates in the metro tunnel communities the way all useful information does: through the person who heard it from the person who claims to have been there. The Hollow Children run a market in the basement of what used to be the Western Department Store — five floors of retail space, the basement an entire city block wide. The Hollow Children transformed it. You don\'t pay with money, which no longer means anything. You pay with information, skill, or things you have that others need. The mark on your wrist might be the most valuable currency in the room.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_market_find_it',
        text: 'Find the market. The department store is somewhere in the western blocks.',
        nextNode: 'c2_market_district',
      },
      {
        id: 'c2_market_ask_kira',
        text: 'Ask Kira where the entrance is. She\'ll know.',
        nextNode: 'c2_market_entrance',
        requirements: { flags: ['met_kira'] },
        effects: { setFlags: ['c2_kira_gave_market_access'] },
      },
    ],
  },

  {
    id: 'c2_market_district',
    chapter: 'Chapter 2',
    title: 'The Western Quarter',
    location: 'City Surface — Western District',
    imageKey: 'ruined_street',
    text: 'The western blocks are different from the rest of the surface: less Saints presence, more careful ruin. Some of the buildings here have been deliberately maintained — windows re-boarded after being broken, rubble cleared from doorways, structural supports added to things that would otherwise have collapsed. Someone is keeping this district functional. The signs are small, coded: a chalk circle at an intersection, an inverted handprint above a doorway, a particular pattern of broken glass in an upper window.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_market_read_signs',
        text: 'Read the signs. They\'re coded but the logic is learnable.',
        nextNode: 'c2_market_entrance',
        requirements: { intelligence: 6 },
        effects: { setFlags: ['c2_read_market_signs'] },
        flavorText: 'Requires: Intelligence 6',
      },
      {
        id: 'c2_market_follow_people',
        text: 'Follow the foot traffic. Enough people going to the same place means something.',
        nextNode: 'c2_market_entrance',
      },
      {
        id: 'c2_orphan_reads_signs',
        text: '[Wasteland Orphan] You learned this kind of code before you learned to read properly.',
        nextNode: 'c2_market_entrance',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { setFlags: ['c2_read_market_signs'], luck: 1 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c2_market_entrance',
    chapter: 'Chapter 2',
    title: 'The Door That Isn\'t',
    location: 'Western Department Store — Service Entrance',
    imageKey: 'black_market_alley',
    text: 'The entrance is a service door in the alley behind the department store. A Hollow Child — young, perhaps twelve, with the particular watchful stillness of someone who has been keeping watch for years — stands beside it. They look at the mark on your wrist before they look at your face. Then they step aside.',
    effectsOnEnter: { setFlags: ['c2_entered_hollow_market'] },
    choices: [
      {
        id: 'c2_enter_market',
        text: 'Enter. The mark got you through.',
        nextNode: 'c2_market_floor',
      },
      {
        id: 'c2_ask_child_guard',
        text: 'Ask the child\'s name before going in.',
        nextNode: 'c2_market_floor',
        effects: { morale: 2, setFlags: ['c2_named_market_guard'] },
      },
    ],
  },

  {
    id: 'c2_market_floor',
    chapter: 'Chapter 2',
    title: 'What They Built in the Dark',
    location: 'Western Department Store — Basement Market',
    imageKey: 'black_market_alley',
    text: 'The basement is a functioning economy. Fifty people at minimum, probably more in the back sections. Trade goods in categories: medicine, food, tools, information, services. A Hollow Child no older than fifteen manages the central information board — a massive wall of notes, requests, and offers. The ceiling has been strung with salvaged electrical cable and emergency lighting running off something solar or hand-generated. The air smells like people and working things, which is better than most air you\'ve breathed recently.',
    effectsOnEnter: { morale: 3 },
    choices: [
      {
        id: 'c2_market_trade_goods',
        text: 'Trade for supplies. You need food, water, and medicine more than anything.',
        nextNode: 'c2_market_trade',
      },
      {
        id: 'c2_market_buy_info',
        text: 'Find the information broker. What you need most is knowledge.',
        nextNode: 'c2_market_info_broker',
      },
      {
        id: 'c2_choose_market_hollow_contact',
        text: 'Find a Hollow Children operative. You need to talk to someone who knows Kira.',
        nextNode: 'c2_market_hollow_contact',
        requirements: { flags: ['met_kira'] },
      },
      {
        id: 'c2_market_look_for_mark_bearer',
        text: 'Look for anyone else bearing the mark. The clinic patient said there were others.',
        nextNode: 'c2_market_trade',
        requirements: { flags: ['c2_knows_43_marked'] },
        effects: { lastArchive: 3 },
      },
    ],
  },

  {
    id: 'c2_market_trade',
    chapter: 'Chapter 2',
    title: 'The Economics of Survival',
    location: 'Western Department Store — Market Stalls',
    imageKey: 'black_market_alley',
    text: 'Currency here is function: what you have that others need. Food for medicine, medicine for information, information for tools, tools for food — the cycle is short and honest in a way that pre-collapse money never was. The traders look at the mark on your wrist with varying expressions: fear, calculation, reverence, and one trader — an older man with glass lenses on wire frames — who looks at it with the professional assessment of someone who has seen several.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_trade_scrap_for_food',
        text: 'Trade scrap for food and water.',
        nextNode: 'c2_market_saints_raid',
        requirements: { scrap: 5 },
        effects: { scrap: -5, food: 4, water: 3 },
        flavorText: 'Cost: 5 Scrap',
      },
      {
        id: 'c2_trade_mark_info',
        text: 'Trade information about the mark for supplies. What you know has value here.',
        nextNode: 'c2_market_saints_raid',
        effects: { food: 3, medicine: 2, corruption: 1, lastArchive: -3, setFlags: ['c2_traded_mark_info'] },
      },
      {
        id: 'c2_ask_glasses_man',
        text: 'Talk to the man with the wire-frame glasses. He knows something about the mark.',
        nextNode: 'c2_market_saints_raid',
        effects: { lastArchive: 5, setFlags: ['c2_glasses_man_met'] },
      },
      {
        id: 'c2_trade_medicine_info',
        text: '[Medic] Offer medical services for supplies. Your skills are rare here.',
        nextNode: 'c2_market_saints_raid',
        requirements: { classes: ['medic'], backgrounds: ['underground_medic'] },
        effects: { food: 5, water: 4, morale: 3, miraTrust: 2, setFlags: ['c2_medic_helped_market'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c2_market_info_broker',
    chapter: 'Chapter 2',
    title: 'Everything Has a Price Here',
    location: 'Western Department Store — Information Corner',
    imageKey: 'black_market_alley',
    text: 'The information broker is a teenage girl with three notebooks, a charcoal pencil, and the serene confidence of someone who knows that information is the only currency that scales. She offers three tiers of information: what you can trade now, what requires something rarer, and what she won\'t sell for anything you currently have.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_info_buy_patrol_routes',
        text: 'Buy the Saints\' patrol routes for this sector.',
        nextNode: 'c2_market_saints_raid',
        requirements: { scrap: 3 },
        effects: { scrap: -3, ironSaints: 2, setFlags: ['c2_knows_patrol_routes'] },
        flavorText: 'Cost: 3 Scrap',
      },
      {
        id: 'c2_info_buy_archive_location',
        text: 'Ask about the Last Archive. Buy whatever she knows.',
        nextNode: 'c2_market_saints_raid',
        requirements: { scrap: 8 },
        effects: { scrap: -8, lastArchive: 10, setFlags: ['c2_archive_location_partial'] },
        flavorText: 'Cost: 8 Scrap',
      },
      {
        id: 'c2_info_mark_for_info',
        text: 'Offer the mark itself — let her study it briefly — for her rarest information.',
        nextNode: 'c2_market_saints_raid',
        effects: { corruption: 2, lastArchive: 15, setFlags: ['c2_mark_studied_broker'] },
      },
    ],
  },

  {
    id: 'c2_market_hollow_contact',
    chapter: 'Chapter 2',
    title: 'Someone Who Knows Kira',
    location: 'Western Department Store — Hollow Section',
    imageKey: 'black_market_alley',
    speaker: 'Hollow Operative',
    text: 'The operative is old for a Hollow Child — perhaps seventeen, which in the tunnel community is a significant achievement. She recognizes your name when you offer it, and then she recognizes the mark, and her expression shifts to the kind of careful attention that means she\'s been told something specific.',
    dialogue: 'Kira said someone bearing the mark would come through eventually. She said to give you this — it\'s a route map to the Sanctum, in case you need to find us without going through the metro stations. She also said: don\'t trust the Glass Court, don\'t attend the Choir\'s broadcasts in person, and don\'t let the Saints scan the mark with their wand at anything less than twenty meters. They\'ve modified the wands. The new ones pull.',
    effectsOnEnter: { setFlags: ['c2_hollow_map_received', 'c2_kira_warnings_received'], lastArchive: 5 },
    choices: [
      {
        id: 'c2_hollow_ask_about_kira',
        text: 'Ask how Kira is doing. What\'s happening in the deep tunnels.',
        nextNode: 'c2_market_saints_raid',
        effects: { morale: 2, setFlags: ['c2_kira_status_learned'] },
      },
      {
        id: 'c2_hollow_ask_about_wand',
        text: 'The modified wands — what do they mean by pull?',
        nextNode: 'c2_market_saints_raid',
        effects: { morale: -2, lastArchive: 3, setFlags: ['c2_knows_wand_modified'] },
      },
    ],
  },

  {
    id: 'c2_market_saints_raid',
    chapter: 'Chapter 2',
    title: 'Red Cross at the Door',
    location: 'Western Department Store — Basement',
    imageKey: 'saints_patrol',
    text: 'The child at the door gives the alert — a sharp double knock on the wall that reverberates through the whole basement. Iron Saints. The market transforms in six seconds: goods disappearing into hidden compartments, people vanishing into service corridors, the information broker\'s notebooks folded and gone before you can see where. A Saints squad is coming in through the main building entrance. They have wands. The wand will find the mark in the time it takes you to cross the room.',
    effectsOnEnter: { morale: -3 },
    choices: [
      {
        id: 'c2_market_follow_hollow',
        text: 'Follow the Hollow Children into the service corridors.',
        nextNode: 'c2_market_escape_routes',
        effects: { setFlags: ['c2_followed_hollow_escape'] },
      },
      {
        id: 'c2_market_create_distraction',
        text: 'Create a distraction. Give everyone else a few extra seconds.',
        nextNode: 'c2_market_escape_routes',
        effects: { health: -5, morale: 3, ironSaints: -3, setFlags: ['c2_created_market_distraction'] },
      },
      {
        id: 'c2_market_hide_mark',
        text: 'Control the mark. Suppress it. Stay and blend with the civilians.',
        nextNode: 'c2_market_escape_routes',
        requirements: { flags: ['first_mark_control'] },
        effects: { corruption: 1, setFlags: ['c2_hid_mark_in_market'] },
        flavorText: 'Requires: First mark control',
      },
      {
        id: 'c2_market_too_slow',
        text: 'The wand sweeps and the mark blazes before you can move.',
        nextNode: 'c2_ending_market_buried',
        effects: { morale: -5 },
      },
    ],
  },

  {
    id: 'c2_market_escape_routes',
    chapter: 'Chapter 2',
    title: 'How the Hollow Children Leave',
    location: 'Western Department Store — Service Tunnels',
    imageKey: 'black_market_alley',
    text: 'The service tunnels under the department store connect to the storm drain network — pre-collapse urban infrastructure that the Hollow Children mapped before anyone else thought to. You surface three blocks north of the market through a drain grate, into an alley that smells like wet concrete and distance. The market is behind you. You hear the Saints\' whistles, faint, getting fainter.',
    effectsOnEnter: { morale: 2, setFlags: ['c2_escaped_market_raid'] },
    choices: [
      {
        id: 'c2_market_to_nightfall',
        text: 'Get clear of the area and regroup.',
        nextNode: 'c2_nightfall_gather',
      },
    ],
  },

  // ────────────────────────────────
  // ROUTE 4 — GLASS COURT
  // ────────────────────────────────

  {
    id: 'c2_glass_approach',
    chapter: 'Chapter 2',
    title: 'The Towers That Did Not Fall',
    location: 'City Surface — Glass Court Perimeter',
    imageKey: 'glass_tower_gate',
    text: 'Three of the Glass Court\'s towers are still standing. They were designed for it — pre-collapse architecture, engineered with seismic isolation, the top-tier buildings of the financial district that survived because they were built by people who planned for catastrophe while profiting from normal. The towers emit a faint electrical hum that the mark on your wrist registers as a kind of tension, the way your body registers a room that\'s too cold before your mind processes the temperature.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_glass_walk_toward',
        text: 'Walk toward the perimeter. See what their outer protocols look like.',
        nextNode: 'c2_glass_outer_wall',
      },
      {
        id: 'c2_glass_observe_first',
        text: 'Observe from distance. Learn the intake process before submitting to it.',
        nextNode: 'c2_glass_outer_wall',
        effects: { intelligence: 1, setFlags: ['c2_observed_glass_intake'] },
      },
    ],
  },

  {
    id: 'c2_glass_outer_wall',
    chapter: 'Chapter 2',
    title: 'Intake',
    location: 'Glass Court Outer Perimeter',
    imageKey: 'glass_tower_gate',
    text: 'The outer wall has a controlled access point. Guards in light armor, no heavy weapons — the Glass Court is not militarized in the way the Saints are, which is not the same as being unarmed. The intake process involves registration, biometric data collection, and a mark scan. The mark scan is the problem. The Glass Court\'s instruments are more sensitive than the Saints\' wands — their scan doesn\'t just detect the mark, it reads it. What it transmits to their systems, you can only guess.',
    effectsOnEnter: { glassCourt: 1 },
    choices: [
      {
        id: 'c2_glass_enter_voluntarily',
        text: 'Enter voluntarily. Registration, scan, whatever they ask.',
        nextNode: 'c2_glass_intake',
        effects: { glassCourt: 2 },
      },
      {
        id: 'c2_glass_enter_under_false_id',
        text: 'Enter with a false identity. Use the Saints\' papers creatively.',
        nextNode: 'c2_glass_intake',
        requirements: { flags: ['has_saints_papers'] },
        effects: { glassCourt: 1, corruption: 1, setFlags: ['c2_glass_false_id'] },
        flavorText: 'Requires: Saints papers',
      },
      {
        id: 'c2_glass_shadow_broker_access',
        text: '[Shadow Broker] You have a contact code for the Glass Court\'s research wing.',
        nextNode: 'c2_glass_inside',
        requirements: { classes: ['shadow_broker'] },
        effects: { glassCourt: 5, setFlags: ['c2_glass_direct_access'] },
        isHidden: true,
      },
      {
        id: 'c2_glass_leave',
        text: 'Decide the scan risk is too high. Walk away.',
        nextNode: 'c2_surface_junction',
      },
    ],
  },

  {
    id: 'c2_glass_intake',
    chapter: 'Chapter 2',
    title: 'The Evaluation',
    location: 'Glass Court — Intake Level',
    imageKey: 'glass_tower_lobby',
    text: 'The intake room is clean in a way nothing else in the city is. White surfaces, functioning lights, the sound of filtered air circulating. The technician who handles your registration does so with professional neutrality until the mark scan. Then there\'s a pause — brief, controlled — and he marks something on his tablet before returning to the same neutrality. You\'ve been flagged. He doesn\'t say this. He offers you an appointment with a research analyst, phrased as an opportunity.',
    effectsOnEnter: { glassCourt: 2, setFlags: ['c2_glass_registered'] },
    choices: [
      {
        id: 'c2_glass_accept_appointment',
        text: 'Accept the appointment. Information flows both ways.',
        nextNode: 'c2_glass_offer',
        effects: { glassCourt: 3 },
      },
      {
        id: 'c2_glass_decline_appointment',
        text: 'Decline. Take the basic access and leave the mark data out of it.',
        nextNode: 'c2_glass_inside',
      },
      {
        id: 'c2_glass_ask_what_scan_found',
        text: 'Ask directly what the scan found.',
        nextNode: 'c2_glass_offer',
        effects: { glassCourt: -1, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c2_glass_offer',
    chapter: 'Chapter 2',
    title: 'The Arrangement',
    location: 'Glass Court — Research Wing Consultation Room',
    imageKey: 'glass_tower_lobby',
    speaker: 'Glass Court Analyst',
    text: 'The analyst is a woman of perhaps forty-five, precise, with the manner of someone who has long since stopped needing to perform interest and now simply has it. She outlines what the Glass Court knows about the mark in three minutes — more than you knew before, less than they know in total — and then she makes the offer.',
    dialogue: 'We have seventeen subjects bearing the mark in voluntary research participation. None of them have your particular activation level. Our current working hypothesis is that the marks are a pre-collapse technology in active transmission to something we haven\'t yet located. We would like to understand what you receive and what you transmit. In exchange: full access to our medical facilities, food and water for however long you choose to stay, and everything we have on the Archive. Everything.',
    effectsOnEnter: { glassCourt: 5, setFlags: ['c2_glass_offer_received'] },
    choices: [
      {
        id: 'c2_glass_accept_offer',
        text: 'Accept the offer. The Archive information alone is worth the risk.',
        nextNode: 'c2_glass_mark_scan',
        effects: { glassCourt: 5, lastArchive: 10, food: 5, water: 5 },
      },
      {
        id: 'c2_glass_negotiate',
        text: 'Negotiate. You want the Archive information first, then you decide.',
        nextNode: 'c2_glass_mark_scan',
        requirements: { intelligence: 7 },
        effects: { glassCourt: 2, lastArchive: 8, intelligence: 1 },
        flavorText: 'Requires: Intelligence 7',
      },
      {
        id: 'c2_glass_decline_offer',
        text: 'Decline. The offer tells you what they want, which is more than you\'re willing to give.',
        nextNode: 'c2_glass_inside',
        effects: { glassCourt: -3 },
      },
    ],
  },

  {
    id: 'c2_glass_mark_scan',
    chapter: 'Chapter 2',
    title: 'What the Instrument Reads',
    location: 'Glass Court — Scanning Suite',
    imageKey: 'glass_tower_lobby',
    text: 'The scanning instrument is nothing like the Saints\' wand. It\'s a fixed installation: a chair, a cradle for your wrist, and a display that renders the mark in real-time as a three-dimensional signal map. The analyst watches the display with the expression of someone seeing something expected but still remarkable. The mark responds to the scan — not passively, but actively, sending something back into the instrument that makes the display flicker and the analyst\'s hand reach instinctively for a control she doesn\'t use.',
    effectsOnEnter: { glassCourt: 3, corruption: 1, setFlags: ['c2_glass_scanned_deeply'] },
    choices: [
      {
        id: 'c2_glass_scan_cooperate',
        text: 'Cooperate fully. Let the scan complete.',
        nextNode: 'c2_glass_files_found',
        effects: { glassCourt: 8, lastArchive: 12, corruption: 1 },
      },
      {
        id: 'c2_glass_scan_pull_away',
        text: 'Pull your wrist away mid-scan. The mark doesn\'t like this.',
        nextNode: 'c2_glass_decision',
        effects: { glassCourt: -4, corruption: 2, health: -5 },
      },
      {
        id: 'c2_glass_scan_fatal_overload',
        text: 'The mark floods the instrument with something the machine can\'t contain.',
        nextNode: 'c2_ending_glass_vivisected',
        requirements: { corruption: 7 },
        effects: { corruption: 3 },
        flavorText: 'High corruption makes the mark unstable.',
      },
    ],
  },

  {
    id: 'c2_glass_inside',
    chapter: 'Chapter 2',
    title: 'The Lower Levels',
    location: 'Glass Court — Research Level 2',
    imageKey: 'glass_tower_lobby',
    text: 'Research Level 2 is accessible to registered visitors with research appointments. The corridors are labeled with the clinical logic of an institution that believes organization prevents disaster. Room 2-14 has a window and inside it you can see three people sitting in chairs with mark-scanning cradles on their wrists, watching a display together. They look calm. They also look like people who have stopped thinking about leaving.',
    effectsOnEnter: { glassCourt: 2, morale: -2 },
    choices: [
      {
        id: 'c2_glass_look_at_subjects',
        text: 'Look longer at the research subjects. Try to make eye contact.',
        nextNode: 'c2_glass_files_found',
        effects: { morale: -3, lastArchive: 5, setFlags: ['c2_saw_research_subjects'] },
      },
      {
        id: 'c2_glass_find_unattended_files',
        text: 'Find an unattended research terminal. The files they have on the mark.',
        nextNode: 'c2_glass_files_found',
        requirements: { intelligence: 6 },
        effects: { lastArchive: 15, glassCourt: -2, setFlags: ['c2_glass_files_accessed'] },
        flavorText: 'Requires: Intelligence 6',
      },
    ],
  },

  {
    id: 'c2_glass_files_found',
    chapter: 'Chapter 2',
    title: 'Seventeen Subjects',
    location: 'Glass Court — Research Level 2',
    imageKey: 'glass_tower_lobby',
    text: 'What you learn in the Glass Court, one way or another: the seventeen subjects are voluntary — technically. The mark creates a feedback loop with the Glass Court\'s instruments that the subjects describe as deeply pleasurable. Two have tried to leave and found the absence of the instrument uncomfortable in ways they couldn\'t sustain. The Glass Court\'s working theory about the Archive is closer to the truth than anyone else\'s: they believe the mark is a key, the Archive is the lock, and whatever is behind the lock is still active. They don\'t know what it is. They want to know more than they want anything else.',
    effectsOnEnter: { lastArchive: 10, setFlags: ['c2_glass_full_intel'] },
    choices: [
      {
        id: 'c2_glass_use_intel_and_leave',
        text: 'Take what you\'ve learned and go. This place will consume you if you stay.',
        nextNode: 'c2_glass_decision',
        effects: { glassCourt: -2 },
      },
      {
        id: 'c2_glass_share_with_subjects',
        text: 'Talk to the research subjects. Tell them what you know about the Archive.',
        nextNode: 'c2_glass_decision',
        effects: { morale: 3, glassCourt: -4, setFlags: ['c2_warned_glass_subjects'] },
      },
      {
        id: 'c2_glass_stay_cooperate',
        text: 'Decide to stay and cooperate fully. The information exchange is worth the risk.',
        nextNode: 'c2_ending_glass_data_trade',
        effects: { glassCourt: 10 },
      },
    ],
  },

  {
    id: 'c2_glass_decision',
    chapter: 'Chapter 2',
    title: 'The Walk Out',
    location: 'Glass Court — Exit Corridor',
    imageKey: 'glass_tower_gate',
    text: 'The Glass Court lets you leave — for now. They are sophisticated enough to know that forcing the mark-bearer to stay is less productive than letting them come back voluntarily, and they are confident enough to believe you will. The analyst gives you a contact code as you leave. She does not say "we\'ll see you again" because she doesn\'t need to.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c2_glass_exit_to_night',
        text: 'Leave and regroup. Process what you\'ve learned.',
        nextNode: 'c2_nightfall_gather',
        effects: { morale: -1 },
      },
    ],
  },

  // ────────────────────────────────
  // ROUTE 5 — RED CHOIR
  // ────────────────────────────────

  {
    id: 'c2_choir_signal_heard',
    chapter: 'Chapter 2',
    title: 'The Sound in the West',
    location: 'City Surface — Junction 4-C',
    imageKey: 'ruined_street',
    text: 'The mark heard it before you did. A frequency that is technically sound but sits below the threshold of normal hearing — you feel it as a hum in the wrist, a resonance in the sternum. When you pay attention to it, it has a direction. West and down, meaning it\'s coming through the infrastructure somehow, through pipes or buried conduits, amplified by the same systems the metro used to carry announcements. The mark pulses in time with it. It\'s not pleasant, exactly. It\'s urgent in the way hunger is urgent — a body-level communication that bypasses the reasoning parts of your mind.',
    effectsOnEnter: { corruption: 1, setFlags: ['c2_choir_signal_detected'] },
    choices: [
      {
        id: 'c2_choir_follow_signal',
        text: 'Follow the signal. It\'s coming from somewhere real.',
        nextNode: 'c2_choir_tracking',
        effects: { corruption: 1 },
      },
      {
        id: 'c2_choir_resist_signal',
        text: 'Resist it. You choose what you follow.',
        nextNode: 'c2_surface_junction',
        effects: { corruption: -1, morale: -1 },
      },
      {
        id: 'c2_esper_signal_resonance',
        text: '[Esper] You know what to do with a signal like this. Reach back.',
        nextNode: 'c2_choir_tracking',
        requirements: { classes: ['esper'] },
        effects: { corruption: 2, lastArchive: 3, setFlags: ['c2_esper_reached_signal'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c2_choir_tracking',
    chapter: 'Chapter 2',
    title: 'Following Sound Through Ruin',
    location: 'City Surface — Western Route',
    imageKey: 'ruined_street',
    text: 'The signal leads through three blocks of surface ruin and then underground — not deep, a sub-basement level, through an entrance in what was a concert venue. Someone has been using the venue\'s acoustic infrastructure: the speaker system, the resonant chamber geometry. The signal is cleaner down here. It has a pattern that isn\'t quite music and isn\'t quite language, but sits exactly on the border between them in a way that makes you want to understand it more than you want to be cautious.',
    effectsOnEnter: { corruption: 1 },
    choices: [
      {
        id: 'c2_choir_keep_tracking',
        text: 'Keep following it to the source.',
        nextNode: 'c2_choir_territory_edge',
      },
      {
        id: 'c2_choir_stop_and_listen',
        text: 'Stop and listen carefully. What is it actually saying.',
        nextNode: 'c2_choir_territory_edge',
        effects: { lastArchive: 4, corruption: 1 },
      },
    ],
  },

  {
    id: 'c2_choir_territory_edge',
    chapter: 'Chapter 2',
    title: 'The Red Mark',
    location: 'Red Choir Territory — Concert Venue Entry',
    imageKey: 'red_choir_chamber',
    text: 'The Choir marks its territory differently from the Saints — not barriers and checkpoints but atmosphere. The walls are covered in musical notation mixed with symbolic language that you recognize from the mark on your wrist. Candles at intervals. A distinct smell: something burning that isn\'t quite incense. And people — more than you expected. Moving with the focused ease of community rather than the wariness of survival. They look at you and they look at the mark and they do not look afraid. Several of them look relieved.',
    effectsOnEnter: { morale: 1 },
    choices: [
      {
        id: 'c2_choir_accept_greeting',
        text: 'Accept the territory and move into it. You came here for a reason.',
        nextNode: 'c2_choir_greeter',
      },
      {
        id: 'c2_choir_observe_from_edge',
        text: 'Stay at the edge. Learn the community before entering it.',
        nextNode: 'c2_choir_greeter',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c2_choir_greeter',
    chapter: 'Chapter 2',
    title: 'They Were Expecting the Mark',
    location: 'Red Choir Territory — Antechamber',
    imageKey: 'red_choir_chamber',
    speaker: 'Choir Greeter',
    text: 'The greeter is a man of perhaps thirty with paint on his hands and genuine warmth in his expression, which you have learned is either the most trustworthy thing in the world or the most dangerous.',
    dialogue: 'We broadcast on the mark frequency specifically because we\'ve found other bearers are drawn to it. The Founder said there would be one who would come here and know what the signal was before we explained it. We\'ve been sending for seven months. You\'re the first who followed it all the way here. The Founder will want to see you. They always want to see the ones who find us.',
    effectsOnEnter: { setFlags: ['c2_choir_greeted'] },
    choices: [
      {
        id: 'c2_choir_agree_to_founder',
        text: 'Agree to meet the Founder. This is the point of coming here.',
        nextNode: 'c2_choir_broadcast_live',
        effects: { corruption: 1 },
      },
      {
        id: 'c2_choir_ask_about_signal',
        text: 'Ask how they know about the mark frequency. How long has the Founder known.',
        nextNode: 'c2_choir_broadcast_live',
        effects: { lastArchive: 5 },
      },
      {
        id: 'c2_choir_decline_founder',
        text: 'Decline the Founder and ask just for a meal and rest.',
        nextNode: 'c2_choir_broadcast_live',
        effects: { food: 2, water: 2 },
      },
    ],
  },

  {
    id: 'c2_choir_broadcast_live',
    chapter: 'Chapter 2',
    title: 'The Living Frequency',
    location: 'Red Choir Territory — Broadcast Chamber',
    imageKey: 'choir_broadcast_point',
    text: 'The broadcast is happening now, and you are inside it. The chamber is acoustically engineered — whoever designed it knew what they were doing with resonant frequencies and the body\'s response to sustained tone. Thirty people, eyes closed, standing or sitting, with expressions that are the most peaceful you\'ve seen since the blackout. The mark on your wrist is glowing. Not the warning glow — something else. Something that feels, uncomfortably, like recognition.',
    effectsOnEnter: { corruption: 1, morale: 3, setFlags: ['c2_attended_choir_broadcast'] },
    choices: [
      {
        id: 'c2_choir_close_eyes',
        text: 'Close your eyes. Feel what it\'s doing to the mark.',
        nextNode: 'c2_choir_mark_resonance',
        effects: { corruption: 2 },
      },
      {
        id: 'c2_choir_stay_aware',
        text: 'Stay conscious of what\'s happening to you. Watch the others.',
        nextNode: 'c2_choir_mark_resonance',
        effects: { intelligence: 1 },
      },
      {
        id: 'c2_choir_leave_now',
        text: 'Leave. This is a designed experience and you don\'t consent to what it\'s designing.',
        nextNode: 'c2_nightfall_gather',
        effects: { corruption: -1, morale: -2 },
      },
    ],
  },

  {
    id: 'c2_choir_mark_resonance',
    chapter: 'Chapter 2',
    title: 'The Mark Answers',
    location: 'Red Choir Territory — Broadcast Chamber',
    imageKey: 'choir_broadcast_point',
    text: 'The mark does something it hasn\'t done before. It doesn\'t just glow — it responds, sending something back toward the broadcast source, a reciprocal signal that pulses visibly in the chamber\'s frequency. The thirty people open their eyes. They are all looking at you. The greeter\'s expression has changed from warm to something more intent. The broadcast continues. You are now part of it.',
    effectsOnEnter: { corruption: 2, lastArchive: 8, setFlags: ['c2_mark_responded_to_choir'] },
    choices: [
      {
        id: 'c2_choir_allow_resonance',
        text: 'Let the resonance continue. Understand what the mark is responding to.',
        nextNode: 'c2_choir_trial_offer',
        effects: { corruption: 2, lastArchive: 10 },
      },
      {
        id: 'c2_choir_stop_resonance',
        text: 'Stop it. Close the mark down. You don\'t know what you\'re sending.',
        nextNode: 'c2_choir_trial_offer',
        effects: { corruption: -1, morale: -2, setFlags: ['c2_shut_down_resonance'] },
      },
    ],
  },

  {
    id: 'c2_choir_trial_offer',
    chapter: 'Chapter 2',
    title: 'The Initiation',
    location: 'Red Choir Territory — Inner Chamber',
    imageKey: 'choir_broadcast_point',
    speaker: 'Choir Greeter',
    text: 'What you just did — the reciprocal signal — hasn\'t happened before. The greeter speaks with the particular urgency of someone who is trying to stay calm about something extraordinary.',
    dialogue: 'The Founder will see you now. Not as a visitor. As someone who has been inside the signal and sent something back. The initiation trial is normally weeks of preparation. For you, the Founder says, it\'s what you choose to do in the next five minutes.',
    effectsOnEnter: { setFlags: ['c2_choir_trial_offered'] },
    choices: [
      {
        id: 'c2_choir_meet_founder',
        text: 'Meet the Founder. This is the reason you followed the signal.',
        nextNode: 'c2_choir_founder_glimpse',
        effects: { corruption: 1 },
      },
      {
        id: 'c2_choir_join_initiation',
        text: 'Submit to the initiation trial. Whatever it costs.',
        nextNode: 'c2_ending_choir_absorbed',
        requirements: { corruption: 6 },
        effects: { corruption: 3 },
        flavorText: 'High corruption: the mark is already partially aligned with the signal.',
      },
      {
        id: 'c2_choir_decline_leave',
        text: 'Decline. Thank them for the broadcast and leave.',
        nextNode: 'c2_nightfall_gather',
        effects: { morale: -1, setFlags: ['c2_declined_choir_initiation'] },
      },
    ],
  },

  {
    id: 'c2_choir_founder_glimpse',
    chapter: 'Chapter 2',
    title: 'The One Who Heard It First',
    location: 'Red Choir Territory — Founder\'s Alcove',
    imageKey: 'choir_broadcast_point',
    speaker: 'The Founder',
    text: 'The Founder is smaller than you expected, older. A person who carries the particular weight of someone who has been told they are significant and is no longer sure what that means. They look at the mark on your wrist and their expression is grief-adjacent — not for you, but for something that predates you.',
    dialogue: 'I heard the Archive\'s signal on the night of the blackout. Everyone who hears it becomes something. The ones who understand it become a different something. I\'ve been trying to help people understand it. You are the first I\'ve met who the signal already knows. That means you don\'t need me. I\'m glad you came anyway.',
    effectsOnEnter: { lastArchive: 12, morale: 2, setFlags: ['c2_founder_met', 'c2_founder_words_heard'] },
    choices: [
      {
        id: 'c2_founder_ask_archive',
        text: 'Ask what they know about the Archive itself. The signal\'s source.',
        nextNode: 'c2_nightfall_gather',
        effects: { lastArchive: 8, setFlags: ['c2_founder_archive_knowledge'] },
      },
      {
        id: 'c2_founder_ask_what_becoming',
        text: 'Ask what they mean — becoming something. What are they becoming.',
        nextNode: 'c2_nightfall_gather',
        effects: { morale: -2, corruption: 1, lastArchive: 5 },
      },
    ],
  },

  // ────────────────────────────────
  // ROUTE 6 — ARCHIVE SYMBOLS
  // ────────────────────────────────

  {
    id: 'c2_archive_symbol_spotted',
    chapter: 'Chapter 2',
    title: 'Someone Left These Here',
    location: 'City Surface — Southern Ruins',
    imageKey: 'archive_ruin_wall',
    text: 'The symbol on the ruined wall is fresh — the paint isn\'t weathered. Someone made this after the blackout, recently, with knowledge of the Archive\'s symbolic vocabulary. It matches the carvings you saw near the Archive door in the metro. It also matches the mark on your wrist, specifically the inner ring of the sigil, the part that pulses when you\'re near Archive infrastructure.',
    effectsOnEnter: { lastArchive: 5 },
    choices: [
      {
        id: 'c2_archive_follow_trail',
        text: 'Look for more. Someone placed this deliberately — follow the logic.',
        nextNode: 'c2_archive_symbol_trail',
      },
      {
        id: 'c2_archive_relic_analysis',
        text: '[Relic Hunter] Date the paint chemically. This was made within the last two weeks.',
        nextNode: 'c2_archive_symbol_trail',
        requirements: { classes: ['relic_hunter'] },
        effects: { lastArchive: 5, intelligence: 1, setFlags: ['c2_symbol_dated'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c2_archive_symbol_trail',
    chapter: 'Chapter 2',
    title: 'The Thread',
    location: 'City Surface — Southern District',
    imageKey: 'archive_ruin_wall',
    text: 'There are eleven symbols. The trail leads south and down — toward an older part of the district where the streets go sub-grade, where basements and sub-basements from the pre-collapse era are accessible from the surface through collapsed building faces. Each symbol is larger than the last, and each one makes the mark on your wrist pulse with increasing intensity. The mark is reading them. Or translating them. Or acknowledging them — you can\'t tell the difference from the inside.',
    effectsOnEnter: { lastArchive: 8, corruption: 1 },
    choices: [
      {
        id: 'c2_archive_trail_careful',
        text: 'Follow carefully. Note the pattern between symbols.',
        nextNode: 'c2_archive_guardian',
        effects: { intelligence: 1 },
      },
      {
        id: 'c2_archive_trail_quick',
        text: 'Move fast. The trail is drawing attention — people have noticed you following it.',
        nextNode: 'c2_archive_guardian',
        effects: { health: -2 },
      },
    ],
  },

  {
    id: 'c2_archive_guardian',
    chapter: 'Chapter 2',
    title: 'The Keeper',
    location: 'City Surface — Sub-Grade Entrance',
    imageKey: 'archive_ruin_wall',
    text: 'At the end of the trail: a person. Older, perhaps sixty, sitting beside the largest symbol in the sequence with the posture of someone who has been sitting beside it for a very long time. They have no weapons. They have a notebook filled with the same symbols. They look at the mark on your wrist and say: "Good. I was starting to think I\'d miscalculated."',
    effectsOnEnter: { setFlags: ['c2_archive_guardian_found'] },
    choices: [
      {
        id: 'c2_archive_talk_to_keeper',
        text: 'Talk to them. Ask who they are and why they laid the trail.',
        nextNode: 'c2_archive_cache_found',
        effects: { lastArchive: 8 },
      },
      {
        id: 'c2_archive_keeper_cautious',
        text: 'Be cautious. A person sitting at the end of a marked trail is either bait or desperate.',
        nextNode: 'c2_archive_cache_found',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c2_archive_cache_found',
    chapter: 'Chapter 2',
    title: 'Pre-Collapse, Protected',
    location: 'Sub-Grade Entrance — Hidden Room',
    imageKey: 'archive_ruin_wall',
    speaker: 'The Keeper',
    text: 'The keeper — she gives no name, offers no background, says simply "I kept it" — leads you into the sub-grade room. The cache has been here since before the blackout. Pre-collapse containers, sealed, holding materials from the Archive\'s own collection.',
    dialogue: 'I worked for the Archive for eleven years. Researcher in the pre-collapse cataloguing project. When the blackout happened and the Archive sealed, I came up here with what I could carry. I\'ve been placing the symbols for two years, waiting for someone whose mark would respond to them. You are the fourth person to find the trail. The first two didn\'t have a mark. The third had one but it was dimmer than yours, and they stopped answering three months ago.',
    effectsOnEnter: { food: 3, water: 2, medicine: 2, lastArchive: 15, setFlags: ['c2_keeper_story_heard'] },
    choices: [
      {
        id: 'c2_archive_read_documents',
        text: 'Read the documents she brought from the Archive.',
        nextNode: 'c2_archive_document',
      },
      {
        id: 'c2_archive_ask_about_third',
        text: 'Ask about the third person with a mark. Who, and what happened to them.',
        nextNode: 'c2_archive_document',
        effects: { lastArchive: 5, morale: -2 },
      },
    ],
  },

  {
    id: 'c2_archive_document',
    chapter: 'Chapter 2',
    title: 'What the Archive Kept Before the Blackout',
    location: 'Sub-Grade Hidden Room',
    imageKey: 'archive_ruin_wall',
    text: 'The documents are pre-collapse internal Archive communications. What you learn in the reading: the Archive has known about the mark for longer than the city has existed. The blackout was not the first time the marks appeared — there were documented cases in records going back four hundred years, always in proximity to the Archive\'s physical location, always correlated with a specific infrastructure activation event. The Archive\'s response in each prior case was documentation and containment. This is the first time the marks appeared in sufficient numbers to constitute what the documents call a threshold event.',
    effectsOnEnter: { lastArchive: 20, morale: -2, setFlags: ['c2_archive_historical_known', 'c2_threshold_event_known'] },
    choices: [
      {
        id: 'c2_archive_ask_threshold',
        text: 'Ask the keeper what a threshold event means to the Archive.',
        nextNode: 'c2_archive_ritual_site',
        effects: { lastArchive: 10 },
      },
      {
        id: 'c2_archive_take_documents',
        text: 'Take the documents. This information needs to survive.',
        nextNode: 'c2_archive_ritual_site',
        effects: { lastArchive: 8, setFlags: ['c2_has_archive_documents'] },
      },
    ],
  },

  {
    id: 'c2_archive_ritual_site',
    chapter: 'Chapter 2',
    title: 'They Were Here Before',
    location: 'Sub-Grade Hidden Room — Inner Section',
    imageKey: 'archive_ruin_wall',
    text: 'The inner section of the cache room has been used as a meeting place. Marks on the floor where people sat in a circle, candle drips, the remnants of meals. Three different handwriting styles in the margins of one of the documents — three people who read this and annotated it together. The annotations are arguments: one voice says the threshold event means an opening, another says it means a test, the third says both are wrong and the threshold event means the thing below the Archive is waking up. The third voice\'s entries stop mid-sentence.',
    effectsOnEnter: { morale: -3, lastArchive: 8, setFlags: ['c2_ritual_site_found'] },
    choices: [
      {
        id: 'c2_archive_mark_responds_here',
        text: 'Sit in the circle. See if the mark responds to the site.',
        nextNode: 'c2_archive_mark_responds',
        effects: { corruption: 1 },
      },
      {
        id: 'c2_archive_read_annotations',
        text: 'Read all three annotation voices carefully. The third one is important.',
        nextNode: 'c2_archive_mark_responds',
        effects: { lastArchive: 12, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c2_archive_mark_responds',
    chapter: 'Chapter 2',
    title: 'Recognition',
    location: 'Sub-Grade Hidden Room — Inner Section',
    imageKey: 'archive_ruin_wall',
    text: 'The mark responds to the site the way it responds to Archive infrastructure — with that deep internal pulse that isn\'t quite pain and isn\'t quite pleasure. But here the response is different from the metro relays or the Glass Court instruments. It\'s quieter. More specific. As if the mark recognizes a pattern left here by the other mark-bearers who sat in this room — a residue of whatever they were, or became. The keeper watches you with the expression of someone recording a result she\'s been waiting for.',
    effectsOnEnter: { corruption: 2, lastArchive: 15, setFlags: ['c2_mark_recognized_site'] },
    choices: [
      {
        id: 'c2_archive_ask_messenger',
        text: 'Ask the keeper if she has a way to reach the Archive directly. Not the door — a person.',
        nextNode: 'c2_archive_messenger',
        effects: { lastArchive: 5 },
      },
      {
        id: 'c2_archive_site_to_nightfall',
        text: 'Take what the mark gave you here and return to the surface.',
        nextNode: 'c2_nightfall_gather',
      },
    ],
  },

  {
    id: 'c2_archive_messenger',
    chapter: 'Chapter 2',
    title: 'The Third Voice',
    location: 'Sub-Grade Hidden Room',
    imageKey: 'archive_ruin_wall',
    speaker: 'The Keeper',
    text: 'The keeper is quiet for a long moment after you ask. Then she opens the notebook to a page she\'s kept blank except for one line of coordinates and a symbol you\'ve never seen before — not from the Archive\'s vocabulary, not from the mark\'s sigil. Something older.',
    dialogue: 'The third voice in those annotations — the one that stops mid-sentence — was a woman named Velna. She worked Archive restoration, sublevel access. She went into the Archive the old way, through a pre-collapse access point that isn\'t the main door. She sent me three messages after going in. Then nothing. The coordinates are for the access point. I\'ve kept them because I believe she went somewhere and I believe someone bearing the mark at your activation level is the reason she went. This is not a safe thing I\'m giving you.',
    effectsOnEnter: { lastArchive: 25, setFlags: ['c2_secret_archive_access_known', 'c2_velna_known'] },
    choices: [
      {
        id: 'c2_archive_take_coordinates',
        text: 'Take the coordinates. Whatever Velna found matters.',
        nextNode: 'c2_ending_archive_messenger',
        effects: { setFlags: ['c2_has_secret_access_coordinates'] },
      },
      {
        id: 'c2_archive_decline_coordinates',
        text: 'Decline for now. You\'re not ready for what\'s behind those coordinates.',
        nextNode: 'c2_nightfall_gather',
        effects: { morale: 2, lastArchive: 5 },
      },
    ],
  },

  // ────────────────────────────────
  // CONVERGENCE — NIGHTFALL
  // ────────────────────────────────

  {
    id: 'c2_nightfall_gather',
    chapter: 'Chapter 2',
    title: 'When the Surface Goes Dark',
    location: 'City Surface — Shelter Point',
    imageKey: 'surface_night',
    text: 'The surface at night is a different city than the surface by day. The Saints\' patrols reduce — not because they\'re less dangerous but because the patrol commanders have correctly assessed that most threats are also not willing to move in the dark. You find shelter in the intact lower floor of a building two blocks from wherever you were — Mira or Cain or both, depending on who came with you, settling the logistics of rest with the practiced efficiency of people who\'ve done this before.',
    effectsOnEnter: { morale: 2, hunger: -1, thirst: -1, setFlags: ['c2_first_night_surface'] },
    choices: [
      {
        id: 'c2_nightfall_to_camp',
        text: 'Set up camp properly. You need sleep before the next decisions.',
        nextNode: 'c2_surface_camp',
      },
    ],
  },

  {
    id: 'c2_surface_camp',
    chapter: 'Chapter 2',
    title: 'Camp on the Surface',
    location: 'City Surface — Improvised Shelter',
    imageKey: 'surface_night',
    text: 'The camp is minimal: cleared floor, one covered fire small enough to not be visible from the street, watch rotation if you have companions. The surface at night has its own sounds — wind through structural damage, distant Saints activity, once something that isn\'t any of those things, a low harmonic that might be the Choir\'s broadcast traveling through the ground, or might be the city\'s own infrastructure doing what damaged infrastructure does in the dark. Mira tends to whatever needs tending. Cain sharpens things he doesn\'t have. You hold the mark against your palm and feel it thinking at you.',
    effectsOnEnter: { morale: 3, health: 2, setFlags: ['c2_surface_camp_made'] },
    choices: [
      {
        id: 'c2_camp_to_crossroads',
        text: 'Sleep. Tomorrow, decide.',
        nextNode: 'c2_chapter2_crossroads',
      },
      {
        id: 'c2_camp_talk_mira',
        text: 'Talk to Mira before sleeping. There\'s something you need to say.',
        nextNode: 'c2_chapter2_crossroads',
        requirements: { flags: ['mira_joins_party'] },
        effects: { miraTrust: 3, morale: 2 },
        flavorText: 'Requires: Mira in party',
      },
      {
        id: 'c2_camp_talk_cain',
        text: 'Talk to Cain before sleeping. The comms signal, or the choice at the checkpoint.',
        nextNode: 'c2_chapter2_crossroads',
        requirements: { flags: ['cain_joins_party'] },
        effects: { cainTrust: 3, morale: 2 },
        flavorText: 'Requires: Cain in party',
      },
    ],
  },

  {
    id: 'c2_chapter2_crossroads',
    chapter: 'Chapter 2',
    title: 'What Comes Next',
    location: 'City Surface — Morning, Day 2',
    imageKey: 'surface_dawn',
    text: 'Morning on the surface. The poisoned sky is lighter but no cleaner. You have more information than you had yesterday and fewer illusions about what the city intends to do with people like you. The mark on your wrist is clearer to you than it was when you first reached the surface — not because it\'s changed, but because you have. You have three options for the next move, and the choice closes at least one door permanently.',
    effectsOnEnter: { setFlags: ['chapter2_nearly_complete'] },
    choices: [
      {
        id: 'c2_continue_to_ch3',
        text: 'Go deeper. Seek the Hollow Children\'s Sanctum. Chapter 3 is below.',
        nextNode: 'c2_chapter2_end',
        effects: { setFlags: ['chapter2_complete', 'heading_to_chapter3'] },
      },
      {
        id: 'c2_commit_to_saints',
        text: 'Turn yourself in to the Iron Saints. Negotiate from a position of information.',
        nextNode: 'c2_ending_saints_enlisted',
        effects: { ironSaints: 5 },
      },
      {
        id: 'c2_commit_to_exile',
        text: 'Walk past the city. Past all of it. Into whatever\'s beyond.',
        nextNode: 'c2_ending_exile_wanderer',
        effects: { morale: -5 },
      },
    ],
  },

  {
    id: 'c2_chapter2_end',
    chapter: 'Chapter 2',
    title: 'Under Again',
    location: 'City Surface — Hollow Children Access Point',
    imageKey: 'ruined_street',
    text: 'The route down is a storm drain entrance three blocks from the department store, marked with a chalk circle that the rain hasn\'t touched because someone keeps refreshing it. You descend. The surface light retreats above you. The mark brightens in the dark the way it always does near underground infrastructure, as if it\'s more at home down here. You carry with you everything you learned above: what the factions want, what the keeper told you, what the mark did in the broadcast chamber, what Mira said by firelight. It\'s enough to change what Chapter 3 looks like. Whether it\'s enough to survive Chapter 3 depends on what you do with it.',
    effectsOnEnter: { morale: 2, setFlags: ['chapter2_complete'] },
    choices: [
      {
        id: 'c2_descend_to_ch3',
        text: 'Descend. The city beneath the city is waiting.',
        nextNode: 'station_junction',
      },
    ],
  },

  // ────────────────────────────────
  // CHAPTER 2 ENDINGS
  // ────────────────────────────────

  {
    id: 'c2_ending_dehydration',
    chapter: 'Chapter 2',
    title: 'The Simplest Killer',
    location: 'City Surface — Collapsed Block',
    imageKey: 'ruined_street',
    text: 'It takes longer than you expect and shorter than you hope. The mark dims in stages — not dramatically, just gradually, the way a signal loses quality when the receiver moves too far from the source. Three days on the surface without enough water is a physiological fact that no amount of will or mark-power changes. The city above doesn\'t require a weapon to kill you. It just requires patience, and the city has had three years to practice.',
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'c2_ending_dehydration',
  },

  {
    id: 'c2_ending_saints_executed',
    chapter: 'Chapter 2',
    title: 'Sinner Protocol — District 4',
    location: 'City Surface — Saints Checkpoint',
    imageKey: 'saints_patrol',
    speaker: 'Iron Saints Inquisitor',
    text: 'The wand finds the mark at twelve meters. The Inquisitor arrives in under two minutes. They are professional and methodical and they have done this before — the phrasing of the charges is practiced, the paperwork prepared before they reach you. The Inquisition does not hesitate at a mark this active. District 4 goes quiet for the half-hour the process takes. Then the patrols resume their rectangle.',
    dialogue: 'Mark classification: Category One Active Manifestation. Disposition: Immediate. Record number assigned. May the Sinner\'s light be extinguished cleanly.',
    effectsOnEnter: { setFlags: ['c2_died_to_saints'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'c2_ending_saints_executed',
  },

  {
    id: 'c2_ending_glass_vivisected',
    chapter: 'Chapter 2',
    title: 'Instrument Failure',
    location: 'Glass Court — Scanning Suite',
    imageKey: 'glass_tower_lobby',
    text: 'The mark and the instrument cannot contain each other at the same time. The analyst understands what\'s happening — you can see it in the half-second before her expression goes clinical — but the understanding comes just after the action has become irreversible. The instrument receives something it wasn\'t designed to process. You receive something back. The Glass Court medical team is competent and fast and insufficient. In the final log entry, the analyst notes that the mark continued to transmit for eleven minutes after the subject\'s vital signs ceased. She marks the experiment as Category Two data — extraordinary yield.',
    effectsOnEnter: { setFlags: ['c2_died_glass_court'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'c2_ending_glass_vivisected',
  },

  {
    id: 'c2_ending_choir_absorbed',
    chapter: 'Chapter 2',
    title: 'The Signal Finds Its Instrument',
    location: 'Red Choir Territory — Broadcast Chamber',
    imageKey: 'choir_broadcast_point',
    text: 'The initiation is not what you expected, because initiation was never the right word for it. What happens in the broadcast chamber is more like tuning — the mark aligns with the Choir\'s frequency completely, the boundary between the signal and the person who carries it becoming a question with no stable answer. The Founder watches and their expression is grief and recognition and something that might be envy. You are still you, technically. The broadcast continues. You continue with it. Mira and Cain, if they came, wait three hours outside the territory before they stop waiting.',
    effectsOnEnter: { setFlags: ['c2_absorbed_by_choir'] },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'c2_ending_choir_absorbed',
  },

  {
    id: 'c2_ending_market_buried',
    chapter: 'Chapter 2',
    title: 'The Wand Does Not Miss',
    location: 'Western Department Store — Basement',
    imageKey: 'black_market_alley',
    text: 'The mark blazes at exactly the wrong moment. The Saints\' wand operator pivots in your direction with the automatic movement of someone who has been trained to move exactly this way in exactly this situation. The market empties around you in the twelve seconds before the soldiers close the distance, everyone else becoming the absence of people while you stand in the middle of it holding a light you cannot put out. The Saints\' report for District 4-West, filed that evening, notes one Category One manifestation neutralized and one underground market disrupted. Both are listed as successful outcomes.',
    effectsOnEnter: { setFlags: ['c2_died_market_raid'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'c2_ending_market_buried',
  },

  {
    id: 'c2_ending_mira_dies_checkpoint',
    chapter: 'Chapter 2',
    title: 'Her Name on Noran Street',
    location: 'City Surface — Checkpoint Alpha-4',
    imageKey: 'saints_patrol',
    text: 'You run. It is a pure instinct decision — the soldier\'s hand closes on Mira\'s arm and your body moves toward the exit before your mind has processed what\'s happening. She doesn\'t call for you. That\'s the worst part. Three blocks north, against a wall, breathing hard, you understand that she made a choice in that moment and the choice was to make noise in the wrong direction so that you could reach the alley before they followed. You carry what she knew about the clinic, the Archive woman, the forty-three marked. You carry it on Noran Street, where she worked for two years before the blackout, where she was going to take you.',
    effectsOnEnter: { setFlags: ['mira_died_checkpoint', 'c2_mira_dead'] },
    choices: [],
    isEnding: true,
    endingType: 'companion',
    endingId: 'c2_ending_mira_dies_checkpoint',
  },

  {
    id: 'c2_ending_exile_wanderer',
    chapter: 'Chapter 2',
    title: 'Past the Edge of What Was',
    location: 'City Outskirts — Eastern Boundary',
    imageKey: 'surface_ruins',
    text: 'The city ends at a highway overpass that collapsed inward three years ago. Beyond it: open land, ash-dusted, the remnants of a transit corridor leading somewhere the city stopped caring about before the blackout. You walk into it. The mark pulses with decreasing urgency as the distance from Archive infrastructure grows — not extinguishing, just quieting, finding a rhythm that isn\'t responding to anything. Mira and Cain don\'t follow, or they do, depending on everything that came before. The city recedes. You become something the city doesn\'t have a file on. That is either freedom or its own kind of ending.',
    effectsOnEnter: { setFlags: ['c2_chose_exile', 'chose_wanderer_path'] },
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'c2_ending_exile_wanderer',
  },

  {
    id: 'c2_ending_saints_enlisted',
    chapter: 'Chapter 2',
    title: 'The Registered Sinner',
    location: 'Iron Saints — District 4 Garrison',
    imageKey: 'iron_saints_checkpoint',
    text: 'The registration process takes four hours. The Saints\' Inquisition classification for a voluntary surrender with an active mark is Category One Cooperative — rare enough that the registrar looks it up twice. You are given a designation, a wrist band worn over the mark, and assigned to a supervised work detail. Mira and Cain are not registered and therefore do not exist as far as the Saints are concerned, which is the safest kind of existence in this city. You will work within the Saints\' structure, bearing the mark under their observation, until the Archive makes itself relevant again — which, given everything you know, is a matter of when.',
    effectsOnEnter: { setFlags: ['c2_saints_enlisted', 'saints_registered_category1'] },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'c2_ending_saints_enlisted',
  },

  {
    id: 'c2_ending_glass_data_trade',
    chapter: 'Chapter 2',
    title: 'The Voluntary Subject',
    location: 'Glass Court — Research Level 2',
    imageKey: 'glass_tower_lobby',
    text: 'You stay. The arrangement is what the analyst described: medical care, food and water, and the Glass Court\'s full Archive research in exchange for access to the mark and what it transmits. You are Subject Eighteen. The work is interesting, which you hadn\'t expected. The Glass Court\'s data is extensive and in places startling. The mark continues to transmit and the instruments continue to receive. Whether this constitutes progress depends on what you think you\'re progressing toward. The Archive door is still sealed. The thing below it is still patient. And you are still inside a tower with very controlled access.',
    effectsOnEnter: { setFlags: ['c2_glass_voluntary_subject'] },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'c2_ending_glass_data_trade',
  },

  {
    id: 'c2_ending_archive_messenger',
    chapter: 'Chapter 2',
    title: 'The Pre-Collapse Access',
    location: 'City Surface — Archive Secondary Access Point',
    imageKey: 'archive_ruin_wall',
    text: 'The coordinates lead to a maintenance access point that isn\'t on any map made after the blackout, in a sub-basement of a building that collapsed to everything except the foundation level. The door is Archive design: the same symbol vocabulary as the main door, but smaller, older, less ceremonial. It responds to the mark immediately — no hesitation, no additional key, just the mark against the plate and the sound of seals releasing that have been sealed for longer than the city has been a city. Velna\'s last message is written on the wall just inside: "It\'s larger than I expected. I\'m going further." This is the way in that the factions don\'t know about. Whatever it costs, it is the right door.',
    effectsOnEnter: { lastArchive: 30, setFlags: ['c2_secret_archive_entered', 'c2_velna_trail_found', 'found_archive_door'] },
    choices: [],
    isEnding: true,
    endingType: 'secret',
    endingId: 'c2_ending_archive_messenger',
  },

  {
    id: 'ending_glass_court_prisoner',
    chapter: 'Chapter 1',
    title: 'Voluntary Extraction',
    location: 'Glass Court Processing Site',
    imageKey: 'glass_tower_gate',
    text: 'They take the mark from you — a process that takes three hours and leaves you intact and empty. Something is different in your wrist afterward. Not painful. Just absent. Like a word you\'ve forgotten how to pronounce. The Archive door stays sealed. The mark, transferred to a Glass Court research subject, dims after forty-eight hours and goes quiet. They never figure out why. The city above keeps burning. You keep being alive, which some people will tell you is the only thing that matters. Those people haven\'t lost something they didn\'t know they had.',
    effectsOnEnter: { setFlags: ['mark_extracted', 'glass_court_prisoner'] },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_glass_court_prisoner',
  },
];
