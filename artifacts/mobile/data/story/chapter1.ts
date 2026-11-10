import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 1 — THE RUINED STATION
//
//  HOW TO ADD NODES TO THIS CHAPTER:
//  1. Copy a node template from src/data/storyNodeTemplate.js
//  2. Paste it inside the CHAPTER_1_NODES array below (before the closing ];)
//  3. Give every node and choice a unique id (snake_case)
//  4. Run: pnpm --filter @workspace/mobile run typecheck
//  5. Zero errors = safe to play
//
//  To start a new chapter, add a new file in this directory and register
//  it in artifacts/mobile/data/story/index.ts
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_1_NODES: StoryNode[] = [
  // ────────────────────────────────
  // OPENING ACT
  // ────────────────────────────────
  {
    id: 'chapter1_start',
    chapter: 'Chapter 1',
    title: 'The Ruined Station',
    location: 'Old Metro Line 9 — Sublevel 3',
    imageKey: 'ruined_metro_station',
    speaker: 'Narrator',
    text: 'The air tastes like rust and old blood. You open your eyes. Cold concrete presses against your back, emergency lights cycling red then dark then red. Your memories blur — a city-wide blackout, screaming, running, then nothing. Your left wrist burns with a faint violet sigil that pulses like a second heartbeat.',
    effectsOnEnter: { hunger: -1, thirst: -1 },
    choices: [
      {
        id: 'go_vending',
        text: 'Search the broken vending machines along the platform wall.',
        nextNode: 'station_vending_search',
        effects: { hunger: -1 },
      },
      {
        id: 'call_out',
        text: 'Call out into the dark. If anyone is alive, you need to know.',
        nextNode: 'station_call_out',
        requirements: { charisma: 5 },
        effects: { trust: 1 },
      },
      {
        id: 'shadow_path',
        text: 'Move through the service corridor in complete silence.',
        nextNode: 'station_shadow_path',
        requirements: { agility: 6 },
        effects: { morale: -1 },
      },
      {
        id: 'examine_mark',
        text: 'Examine the mark on your wrist. You need to understand it.',
        nextNode: 'examine_wrist_mark',
        effects: { corruption: 1 },
      },
    ],
  },

  {
    id: 'station_vending_search',
    chapter: 'Chapter 1',
    title: 'Broken Machines',
    location: 'Platform 9-B — Vending Row',
    imageKey: 'broken_vending_area',
    text: 'A row of vending machines lines the far wall, their glass fronts shattered. Whoever was here before stripped most of what was inside. But desperation is a good teacher — you know how to look where others don\'t.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'search_thorough',
        text: 'Search thoroughly. Take your time.',
        nextNode: 'vending_find_food',
        requirements: { luck: 5 },
      },
      {
        id: 'grab_scrap',
        text: 'Grab scrap from the machine housings and move on.',
        nextNode: 'vending_find_scrap',
        effects: { scrap: 2 },
      },
      {
        id: 'machines_empty',
        text: 'The machines are already stripped. Move on.',
        nextNode: 'vending_empty',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'vending_find_food',
    chapter: 'Chapter 1',
    title: 'Small Mercies',
    location: 'Platform 9-B — Vending Row',
    imageKey: 'broken_vending_area',
    text: 'Behind the coin slot on the third machine — wedged behind the mechanism — a sealed can of ration paste and a crumpled water packet. Whoever left them there forgot, or was too rushed to retrieve them. Their loss.',
    effectsOnEnter: { food: 2, water: 1, morale: 1 },
    choices: [
      {
        id: 'continue_to_junction',
        text: 'Take the supplies and head to the main concourse.',
        nextNode: 'station_junction',
        effects: { setFlags: ['searched_vending'] },
      },
    ],
  },

  {
    id: 'vending_find_scrap',
    chapter: 'Chapter 1',
    title: 'Useful Junk',
    location: 'Platform 9-B — Vending Row',
    imageKey: 'broken_vending_area',
    text: 'No food, but the metal housing, broken wire coils, and cracked component boards are worth something. Scrap is currency in a world where paper isn\'t.',
    effectsOnEnter: { scrap: 3 },
    choices: [
      {
        id: 'pocket_scrap',
        text: 'Pocket the scrap and continue to the main concourse.',
        nextNode: 'station_junction',
        effects: { setFlags: ['searched_vending'] },
      },
    ],
  },

  {
    id: 'vending_empty',
    chapter: 'Chapter 1',
    title: 'Nothing Left',
    location: 'Platform 9-B — Vending Row',
    imageKey: 'broken_vending_area',
    text: 'Someone was thorough. The machines are hollow shells. Your stomach cramps. Wasted time you couldn\'t afford.',
    effectsOnEnter: { hunger: -2, morale: -1 },
    choices: [
      {
        id: 'leave_machines',
        text: 'Leave. There\'s nothing here.',
        nextNode: 'station_junction',
        effects: { setFlags: ['searched_vending'] },
      },
    ],
  },

  {
    id: 'station_call_out',
    chapter: 'Chapter 1',
    title: 'In the Dark',
    location: 'Metro Concourse — Main Hall',
    imageKey: 'ruined_metro_station',
    speaker: 'You',
    text: 'Your voice echoes off shattered tiles. For a long moment — nothing. Then: a scraping sound from the east wing. A light, carefully shielded.',
    dialogue: 'Hello? Is anyone out there? I\'m not armed. I just need to know I\'m not alone.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'approach_light',
        text: 'Approach the shielded light carefully.',
        nextNode: 'find_mira_clinic',
        effects: { setFlags: ['called_out'] },
      },
      {
        id: 'call_again',
        text: 'Call again, louder. Make yourself known.',
        nextNode: 'mira_responds',
        effects: { morale: 1, miraTrust: -1 },
      },
      {
        id: 'abort_call',
        text: 'Too dangerous. Stay quiet and circle around.',
        nextNode: 'station_junction',
        effects: { morale: -2 },
      },
    ],
  },

  {
    id: 'mira_responds',
    chapter: 'Chapter 1',
    title: 'A Voice in the Dark',
    location: 'Metro Concourse — East Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Mira',
    text: 'A woman\'s voice cuts through the darkness — guarded but steady.',
    dialogue: 'Keep it down. There are patrols at the north exit. Come to the clinic booth slowly. Hands where I can see them. Don\'t make me regret this.',
    effectsOnEnter: { miraTrust: 1 },
    choices: [
      {
        id: 'obey_mira',
        text: 'Do as she says. Approach the clinic booth slowly.',
        nextNode: 'find_mira_clinic',
      },
    ],
  },

  {
    id: 'station_shadow_path',
    chapter: 'Chapter 1',
    title: 'Shadows and Silence',
    location: 'Metro Service Corridor',
    imageKey: 'dark_metro_hallway',
    text: 'The service corridor runs parallel to the main concourse. You move through it like smoke — avoiding the weak spots in the floor, ducking the collapsed beam, breathing measured and slow. The silence here is different. Heavier. Then you find him.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'examine_body',
        text: 'Examine the body. Take what\'s useful.',
        nextNode: 'shadow_dead_soldier',
        effects: { hunger: -1 },
      },
      {
        id: 'dont_touch_dead',
        text: 'Don\'t touch the dead. Keep moving.',
        nextNode: 'station_junction',
        effects: { morale: -1, setFlags: ['took_shadow_path'] },
      },
    ],
  },

  {
    id: 'shadow_dead_soldier',
    chapter: 'Chapter 1',
    title: 'The Fallen Soldier',
    location: 'Metro Service Corridor',
    imageKey: 'dark_metro_hallway',
    text: 'He was Iron Saints — the crusader crest on his cracked armor confirms it. But he didn\'t die in combat. His veins are blackened, burst from the inside. Near his hand: the same sigil as your wrist, scratched hastily into the concrete. He knew.',
    effectsOnEnter: { scrap: 2, ammo: 2, setFlags: ['found_dead_saint', 'knows_mark_is_dangerous'] },
    choices: [
      {
        id: 'take_tags',
        text: 'Take his dog tags and continue to the main concourse.',
        nextNode: 'station_junction',
        effects: { setFlags: ['has_soldier_tags', 'took_shadow_path'] },
      },
      {
        id: 'leave_soldier',
        text: 'Leave everything. Something doesn\'t feel right.',
        nextNode: 'station_junction',
        effects: { morale: -2, setFlags: ['took_shadow_path'] },
      },
    ],
  },

  {
    id: 'examine_wrist_mark',
    chapter: 'Chapter 1',
    title: 'The Mark',
    location: 'Metro Concourse',
    imageKey: 'ruined_metro_station',
    text: 'The sigil is integrated into your skin — not tattooed, not burned. It moves with your pulse. When you focus on it, you feel something vast and patient turn its attention toward you.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'activate_on_machine',
        text: 'Touch the old relay machine on the wall. See what happens.',
        nextNode: 'mark_esper_vision',
        requirements: { classes: ['esper', 'relic_hunter'] },
        flavorText: 'Requires: Esper or Relic Hunter class',
      },
      {
        id: 'cover_it',
        text: 'Cover it with your sleeve. Ignore it for now.',
        nextNode: 'station_junction',
        effects: { morale: -1, setFlags: ['examined_mark'] },
      },
      {
        id: 'study_mark',
        text: 'Study it carefully. Map every symbol.',
        nextNode: 'station_junction',
        requirements: { intelligence: 7 },
        effects: { lastArchive: 3, setFlags: ['examined_mark', 'studied_mark'] },
      },
    ],
  },

  {
    id: 'mark_esper_vision',
    chapter: 'Chapter 1',
    title: 'The First Echo',
    location: 'Metro Concourse',
    imageKey: 'examine_mark',
    speaker: 'The Mark',
    text: 'The machine sparks at your touch. The sigil becomes cold fire. You see something that isn\'t here — a vast underground space, a door covered in the same symbols, and you, standing at it, as if it already happened.',
    dialogue: 'You are not ready. But the time is already chosen.',
    effectsOnEnter: { corruption: 2, morale: -2, setFlags: ['had_first_vision', 'knows_archive_exists', 'examined_mark'] },
    choices: [
      {
        id: 'pull_away',
        text: 'Pull away. Ground yourself in the present.',
        nextNode: 'station_junction',
      },
      {
        id: 'reach_deeper',
        text: 'Reach deeper into the vision. Let it show you more.',
        nextNode: 'station_junction',
        requirements: { corruption: 5 },
        effects: { corruption: 2, intelligence: 1, setFlags: ['deep_vision'] },
        flavorText: 'Requires: Corruption 5 or higher',
      },
    ],
  },

  // ────────────────────────────────
  // STATION HUB
  // ────────────────────────────────
  {
    id: 'station_junction',
    chapter: 'Chapter 1',
    title: 'The Junction',
    location: 'Metro Concourse — Central',
    imageKey: 'ruined_metro_station',
    text: 'The central concourse opens around you. To the east — a faded medical cross, a dim warm light. To the north — a heavy security door, barricaded from inside. Ahead — the maintenance tunnels descend into darkness. Above — a collapsed stairwell, and beyond it, the faintest grey of surface light. A western service corridor exhales cold air — something moving through it, or the tunnel breathing on its own.',
    effectsOnEnter: { hunger: -1, thirst: -1 },
    choices: [
      {
        id: 'go_east_clinic',
        text: 'Head to the clinic booth — east wing.',
        nextNode: 'find_mira_clinic',
        requirements: { blockedFlags: ['met_mira'] },
      },
      {
        id: 'east_corridor_sound',
        text: 'A sound from the east corridor — sharp, cut short. Someone needs help.',
        nextNode: 'mira_scavenger_attack',
        requirements: { blockedFlags: ['met_mira', 'mira_scavenger_resolved'] },
      },
      {
        id: 'talk_to_mira',
        text: 'Talk to Mira again.',
        nextNode: 'mira_secret_hint',
        requirements: { flags: ['met_mira'], blockedFlags: ['talked_mira_2', 'mira_joins_party'] },
      },
      {
        id: 'check_mira_supplies',
        text: 'Check on Mira\'s supplies — she\'s been quiet.',
        nextNode: 'medicine_critical_moment',
        requirements: { flags: ['mira_joins_party'], blockedFlags: ['mira_medicine_low'] },
      },
      {
        id: 'go_north_security',
        text: 'Check the barricaded security door — north.',
        nextNode: 'find_cain_security',
        requirements: { blockedFlags: ['met_cain'] },
      },
      {
        id: 'talk_to_cain',
        text: 'Talk to Cain again.',
        nextNode: 'cain_trust_moment',
        requirements: { flags: ['met_cain'], blockedFlags: ['talked_cain_2'] },
      },
      {
        id: 'check_cain_silence',
        text: 'The north security room has been too quiet. Something is wrong.',
        nextNode: 'ending_cain_dies_alone',
        requirements: { flags: ['cain_injury_known'], blockedFlags: ['cain_injury_treated', 'cain_joins_party'] },
      },
      {
        id: 'go_west_escape_tunnel',
        text: 'The western service tunnel — cold air moving through it. A possible way out.',
        nextNode: 'broken_tunnel_mouth',
        requirements: { blockedFlags: ['escape_tunnel_used', 'crossed_tunnel_7west'] },
      },
      {
        id: 'go_deeper',
        text: 'Head deeper into the maintenance tunnels.',
        nextNode: 'tunnel_depths',
      },
      {
        id: 'try_surface',
        text: 'Try to reach the surface through the collapsed stairwell.',
        nextNode: 'surface_escape_path',
        requirements: { strength: 6 },
        flavorText: 'Requires: Strength 6 or higher',
      },
      {
        id: 'try_surface_agile',
        text: 'Climb the collapsed stairwell — carefully.',
        nextNode: 'surface_escape_path',
        requirements: { agility: 7 },
        isHidden: true,
      },
      {
        id: 'surface_desperate_attempt',
        text: 'Force your way up the stairwell. No strength, no plan — just desperation.',
        nextNode: 'surface_premature_attempt',
        requirements: { blockedFlags: ['reached_surface', 'surface_premature'] },
        effects: { morale: -1 },
      },
      {
        id: 'mark_is_pulsing',
        text: 'The mark pulses. Something is pulling at it — harder than before.',
        nextNode: 'mark_spontaneous_pulse',
        requirements: { flags: ['examined_mark'], blockedFlags: ['mark_pulsed_spontaneously'] },
        isHidden: true,
      },
      {
        id: 'find_water_utility',
        text: 'Check the utility room — there might be emergency water.',
        nextNode: 'station_water_cache',
        requirements: { blockedFlags: ['found_water_cache'] },
      },
    ],
  },

  // ────────────────────────────────
  // MIRA BRANCH
  // ────────────────────────────────
  {
    id: 'find_mira_clinic',
    chapter: 'Chapter 1',
    title: 'The Clinic Booth',
    location: 'Metro Concourse — East Wing',
    imageKey: 'ruined_metro_station',
    text: 'The clinic booth is a converted ticket window — gauze, antiseptic smell, improvised medical supplies stacked carefully. A woman sits behind it. Mid-thirties, dark hair, sharp eyes, and a bandage on her left arm she moves to hide when she sees you looking.',
    effectsOnEnter: { setFlags: ['met_mira'] },
    choices: [
      {
        id: 'introduce_self',
        text: 'Introduce yourself carefully.',
        nextNode: 'mira_first_meeting',
      },
      {
        id: 'medic_greeting',
        text: '[Medic] Identify yourself as medical personnel.',
        nextNode: 'mira_first_meeting',
        requirements: { classes: ['medic'], backgrounds: ['underground_medic'] },
        effects: { miraTrust: 2 },
        isHidden: true,
      },
      {
        id: 'ask_injury',
        text: 'Ask about her injury before anything else.',
        nextNode: 'mira_first_meeting',
        effects: { miraTrust: -1 },
      },
    ],
  },

  {
    id: 'mira_first_meeting',
    chapter: 'Chapter 1',
    title: 'Street Medic',
    location: 'Metro Concourse — East Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Mira',
    text: 'She looks at you with the kind of attention that has seen too many people die.',
    dialogue: 'I\'m Mira. Street medic before the blackout. I\'ve been here three days. You look like you\'ve had a rough night — let me see what I can do.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'accept_help',
        text: 'Accept her help.',
        nextNode: 'mira_help_accepted',
        effects: { miraTrust: 1 },
      },
      {
        id: 'ask_about_mark',
        text: 'Ask if she knows anything about the mark on your wrist.',
        nextNode: 'mira_secret_hint',
        effects: { miraTrust: 1 },
      },
      {
        id: 'warn_away',
        text: 'Tell her to stay out of your way. It\'s safer for both of you.',
        nextNode: 'station_junction',
        effects: { miraTrust: -2, morale: -1 },
      },
    ],
  },

  {
    id: 'mira_help_accepted',
    chapter: 'Chapter 1',
    title: 'Careful Hands',
    location: 'Metro Concourse — East Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Mira',
    text: 'Her hands move with practiced efficiency — the movements of someone who has patched wounds in worse conditions than this.',
    dialogue: 'Hold still. This will sting. ...The mark on your wrist — don\'t show it to anyone else. There are people in these tunnels who would kill you for it.',
    effectsOnEnter: { health: 15, morale: 2, setFlags: ['mira_treated_wounds', 'mira_warned_about_mark'] },
    choices: [
      {
        id: 'ask_how_she_knows',
        text: 'Ask her how she knows about the mark.',
        nextNode: 'mira_secret_hint',
        effects: { miraTrust: 1 },
      },
      {
        id: 'accept_warning',
        text: 'Accept the warning and thank her.',
        nextNode: 'station_junction',
        effects: { setFlags: ['talked_mira_2'] },
      },
    ],
  },

  {
    id: 'mira_secret_hint',
    chapter: 'Chapter 1',
    title: 'What She Knows',
    location: 'Metro Concourse — East Wing',
    imageKey: 'tunnel_camp',
    speaker: 'Mira',
    text: 'Her expression shifts — carefully controlled, but something passes across her face. Knowledge. Fear. Maybe both.',
    dialogue: 'I\'ve seen marks like that before. There\'s a place under the city — deeper than these tunnels. People call it the Archive. Whatever put that mark on you is connected to what\'s down there. That\'s all I know.',
    effectsOnEnter: { miraTrust: 1, setFlags: ['knows_archive_from_mira', 'knows_archive_exists'] },
    choices: [
      {
        id: 'press_mira',
        text: 'Press her for more. She knows more than she\'s saying.',
        nextNode: 'mira_trust_growing',
        requirements: { miraTrust: 3 },
        flavorText: 'Requires: Mira Trust 3 or higher',
      },
      {
        id: 'share_food',
        text: 'Give her some food. Let it build trust.',
        nextNode: 'mira_trust_growing',
        requirements: { food: 1 },
        effects: { food: -1, miraTrust: 2 },
      },
      {
        id: 'let_it_go',
        text: 'Let it go. Head back to the main concourse.',
        nextNode: 'station_junction',
        effects: { setFlags: ['talked_mira_2'] },
      },
    ],
  },

  {
    id: 'mira_trust_growing',
    chapter: 'Chapter 1',
    title: 'Into the Dark Together',
    location: 'Metro Concourse — East Wing',
    imageKey: 'tunnel_camp',
    speaker: 'Mira',
    text: 'She studies you for a long moment. Then something in her posture releases.',
    dialogue: 'I\'ll travel with you. I have my own reasons for wanting to find the Archive — and I can\'t do it alone. Neither can you.',
    effectsOnEnter: { setFlags: ['mira_joins_party', 'talked_mira_2'], miraTrust: 1, morale: 2 },
    choices: [
      {
        id: 'accept_mira_companionship',
        text: 'Accept. You move better together.',
        nextNode: 'station_junction',
      },
    ],
  },

  // ────────────────────────────────
  // CAIN BRANCH
  // ────────────────────────────────
  {
    id: 'find_cain_security',
    chapter: 'Chapter 1',
    title: 'The Security Door',
    location: 'Metro Concourse — North Wing',
    imageKey: 'ruined_metro_station',
    text: 'The security room door is reinforced steel, barricaded from inside with what sounds like a heavy storage rack. Slow, deliberate movement behind it — someone pacing. Someone who has been waiting.',
    effectsOnEnter: { setFlags: ['met_cain'] },
    choices: [
      {
        id: 'knock_door',
        text: 'Knock carefully. Announce yourself.',
        nextNode: 'cain_first_meeting',
      },
      {
        id: 'saints_tactics',
        text: '[Exiled Soldier] Use the Saints\' own identification protocol.',
        nextNode: 'cain_intrigued',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { cainTrust: 2 },
        isHidden: true,
      },
      {
        id: 'force_door',
        text: 'Force the door open.',
        nextNode: 'cain_hostile_confrontation',
        requirements: { strength: 7 },
        effects: { morale: -1 },
        diceCheck: {
          stat: 'strength',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'cain_hostile_confrontation',
          failureNode: 'dice_force_door_fail',
          criticalSuccessNode: 'cain_hostile_confrontation',
          criticalSuccessEffects: { scrap: 2, morale: 2, strength: 1 },
          criticalFailureNode: 'dice_force_door_crit_fail',
          failureEffects: { health: -15, morale: -3 },
          criticalFailureEffects: { health: -15, morale: -8 },
        },
      },
      {
        id: 'back_from_cain',
        text: 'Leave it. Someone in there wants to stay hidden.',
        nextNode: 'station_junction',
      },
    ],
  },

  {
    id: 'cain_first_meeting',
    chapter: 'Chapter 1',
    title: 'The Chain Lock',
    location: 'Metro Concourse — North Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Cain',
    text: 'The door opens three inches — a chain lock holds it. One eye. A face built by decades of hard decisions. A pistol.',
    dialogue: 'State your affiliation. Iron Saints? Glass Court? You have five seconds.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'talk_cain_down',
        text: 'Talk him down. No affiliation, just a survivor.',
        nextNode: 'cain_trust_moment',
        requirements: { charisma: 6 },
        effects: { cainTrust: 1 },
        flavorText: 'Requires: Charisma 6 or higher',
      },
      {
        id: 'show_mark_to_cain',
        text: 'Show him the mark on your wrist.',
        nextNode: 'cain_intrigued',
        effects: { setFlags: ['cain_knows_mark'], cainTrust: -1 },
      },
      {
        id: 'back_away_cain',
        text: 'Back away slowly. Don\'t escalate.',
        nextNode: 'station_junction',
        effects: { cainTrust: -1 },
      },
    ],
  },

  {
    id: 'cain_intrigued',
    chapter: 'Chapter 1',
    title: 'A Variable',
    location: 'Metro Concourse — North Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Cain',
    text: 'He stares at the mark. The gun lowers — not entirely, but enough.',
    dialogue: 'The Iron Saints kill people with that mark on sight. They call it the Sinner\'s Brand. I call it the most interesting thing I\'ve seen in three days. Come in.',
    effectsOnEnter: { setFlags: ['cain_knows_mark'], cainTrust: 2 },
    choices: [
      {
        id: 'enter_security_room',
        text: 'Enter the security room.',
        nextNode: 'cain_trust_moment',
      },
    ],
  },

  {
    id: 'cain_trust_moment',
    chapter: 'Chapter 1',
    title: 'Former Saints',
    location: 'Metro Security Room',
    imageKey: 'ruined_metro_station',
    speaker: 'Cain',
    text: 'The security room is a converted control center — maps on the walls, supply crates repurposed as furniture. Cain leans against a console, arms crossed.',
    dialogue: 'I was Iron Saints. Five years, northern sector. Then I figured out what they really are. Now I help people slip past their checkpoints — for the right price. Your mark changes the calculation.',
    effectsOnEnter: { setFlags: ['cain_backstory_known', 'talked_cain_2'], cainTrust: 1 },
    choices: [
      {
        id: 'ask_price',
        text: 'Ask him what he wants in return for safe passage.',
        nextNode: 'station_junction',
        effects: { cainTrust: 1, setFlags: ['negotiated_cain'] },
      },
      {
        id: 'offer_alliance',
        text: 'Propose an alliance — you need each other.',
        nextNode: 'station_junction',
        effects: { cainTrust: 2, setFlags: ['cain_joins_party'] },
      },
      {
        id: 'push_for_info',
        text: 'Ask what he knows about the mark.',
        nextNode: 'station_junction',
        requirements: { flags: ['cain_knows_mark'] },
        effects: { cainTrust: -1, setFlags: ['cain_suspicious'] },
      },
      {
        id: 'go_deeper_with_cain',
        text: 'Ask to see what\'s past the control room. He\'s hiding something.',
        nextNode: 'cain_deeper_room',
        requirements: { cainTrust: 1, blockedFlags: ['seen_cain_inner_room'] },
      },
    ],
  },

  {
    id: 'cain_hostile_confrontation',
    chapter: 'Chapter 1',
    title: 'Wrong Move',
    location: 'Metro Concourse — North Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Cain',
    text: 'The door flies open. He\'s fast for his age — backed against the wall, weapon raised.',
    dialogue: 'Wrong move. Last person who tried that is at the bottom of the maintenance shaft.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'fight_cain',
        text: 'Fight him.',
        nextNode: 'station_junction',
        requirements: { strength: 7 },
        effects: { health: -15, cainTrust: -3, setFlags: ['fought_cain'] },
        flavorText: 'Requires: Strength 7 or higher',
      },
      {
        id: 'run_cain',
        text: 'Run back to the main concourse.',
        nextNode: 'station_junction',
        requirements: { agility: 6 },
        effects: { cainTrust: -2 },
        flavorText: 'Requires: Agility 6 or higher',
      },
      {
        id: 'surrender_cain',
        text: 'Surrender. Hands up.',
        nextNode: 'station_junction',
        effects: { cainTrust: 1, morale: -2 },
      },
    ],
  },

  // ────────────────────────────────
  // TUNNEL DEPTHS
  // ────────────────────────────────
  {
    id: 'tunnel_depths',
    chapter: 'Chapter 1',
    title: 'Going Deeper',
    location: 'Metro Maintenance Corridor',
    imageKey: 'dark_metro_hallway',
    text: 'The maintenance tunnels beneath Platform 9 descend sharply. The air grows colder. Something mechanical hums at a frequency you feel more than hear — and the mark on your wrist pulses in response.',
    effectsOnEnter: { morale: -1, corruption: 1 },
    choices: [
      {
        id: 'descend_alone',
        text: 'Descend alone.',
        nextNode: 'tunnel_junction_inner',
      },
      {
        id: 'descend_with_mira',
        text: 'Take Mira with you.',
        nextNode: 'tunnel_junction_inner',
        requirements: { flags: ['mira_joins_party'] },
        effects: { morale: 2, miraTrust: 1 },
      },
      {
        id: 'descend_with_cain',
        text: 'Take Cain with you.',
        nextNode: 'tunnel_junction_inner',
        requirements: { flags: ['cain_joins_party'] },
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'tunnel_junction_inner',
    chapter: 'Chapter 1',
    title: 'The Fork',
    location: 'Maintenance Tunnel Junction — Sublevel 5',
    imageKey: 'collapsed_tunnel',
    text: 'Three tunnels branch here. The first smells of machine oil and old electricity — where the hum comes from. The second has crude hand-drawn markers: a circle with arrows, a child\'s system. The third shows fresh military boot prints and spent casings.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'follow_hum',
        text: 'Follow the hum — toward the machine room.',
        nextNode: 'relic_machine_room',
        requirements: { blockedFlags: ['visited_sealed_relay_door'] },
      },
      {
        id: 'follow_markers',
        text: 'Follow the child\'s markers — wherever they lead.',
        nextNode: 'hollow_children_territory',
      },
      {
        id: 'follow_military',
        text: 'Follow the military trail — know your enemies.',
        nextNode: 'iron_saints_patrol',
      },
      {
        id: 'climb_grate',
        text: 'Force open the surface grate above.',
        nextNode: 'surface_escape_path',
        requirements: { strength: 6 },
        flavorText: 'Requires: Strength 6 or higher',
      },
      {
        id: 'follow_archive_sense',
        text: 'Let the mark guide you. It knows where to go.',
        nextNode: 'archive_door',
        requirements: { flags: ['knows_archive_exists'], blockedFlags: ['visited_sealed_relay_door'] },
        effects: { corruption: 1 },
      },
      {
        id: 'return_archive_door',
        text: 'Return to the sealed Archive door.',
        nextNode: 'archive_door',
        requirements: { flags: ['knows_archive_exists', 'visited_sealed_relay_door'] },
      },
      {
        id: 'notice_watchers_tunnel',
        text: 'There are eyes in the dark. Something is watching from the crawlspace.',
        nextNode: 'hollow_watchers_dark',
        requirements: { blockedFlags: ['noticed_hollow_watchers', 'entered_hollow_territory'] },
      },
      {
        id: 'strange_wall_section',
        text: 'A section of the tunnel wall doesn\'t match the rest — newer mortar, different stone.',
        nextNode: 'secret_passage_found',
        requirements: { intelligence: 5, blockedFlags: ['found_secret_passage'] },
        isHidden: true,
      },
      {
        id: 'find_scavenger_stash',
        text: 'Check the maintenance niches — scavengers always cache things here.',
        nextNode: 'scavenger_cache_discovery',
        requirements: { blockedFlags: ['found_scavenger_cache'] },
        effects: { hunger: -1 },
      },
    ],
  },

  // ────────────────────────────────
  // IRON SAINTS
  // ────────────────────────────────
  {
    id: 'iron_saints_patrol',
    chapter: 'Chapter 1',
    title: 'Contact',
    location: 'Maintenance Tunnel — East Branch',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Iron Saints Soldier',
    text: 'Two soldiers in battered crusader armor round the corner. Rifles rise before you can react. The lead soldier\'s eyes drop to your wrist — and his expression shifts to something between fear and religious fury.',
    dialogue: 'That mark. Sinner protocol — we bring it in alive for the Inquisitor.',
    effectsOnEnter: { setFlags: ['encountered_iron_saints'], ironSaints: -5 },
    choices: [
      {
        id: 'negotiate_saints',
        text: 'Negotiate. Make them see you\'re more useful alive and free.',
        nextNode: 'saints_negotiate_attempt',
        requirements: { charisma: 6 },
        flavorText: 'Requires: Charisma 6 or higher',
        diceCheck: {
          stat: 'charisma',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'saints_negotiate_attempt',
          failureNode: 'dice_negotiate_saints_fail',
          criticalSuccessNode: 'saints_negotiate_attempt',
          criticalSuccessEffects: { ironSaints: 8, charisma: 1, morale: 3 },
          criticalFailureNode: 'dice_negotiate_saints_crit_fail',
          failureEffects: { ironSaints: -3, morale: -3 },
          criticalFailureEffects: { ironSaints: -10, morale: -8, health: -10 },
        },
      },
      {
        id: 'fight_escape_saints',
        text: 'Make a break for the tunnel junction.',
        nextNode: 'saints_escape',
        requirements: { agility: 5 },
        effects: { health: -10 },
        flavorText: 'Requires: Agility 5 or higher',
      },
      {
        id: 'escape_strength',
        text: 'Overpower them and run.',
        nextNode: 'saints_escape',
        requirements: { strength: 6 },
        effects: { health: -15, ironSaints: -5 },
        flavorText: 'Requires: Strength 6 or higher',
      },
      {
        id: 'submit_saints',
        text: 'Submit. Comply. Stay alive.',
        nextNode: 'saints_submit',
        effects: { morale: -3 },
      },
      {
        id: 'mira_creates_distraction',
        text: 'Signal Mira to create a distraction.',
        nextNode: 'saints_escape',
        requirements: { flags: ['mira_joins_party'] },
        effects: { miraTrust: 2, setFlags: ['mira_helped_escape'] },
      },
    ],
  },

  {
    id: 'saints_negotiate_attempt',
    chapter: 'Chapter 1',
    title: 'Finding Common Ground',
    location: 'Maintenance Tunnel — East Branch',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Iron Saints Officer',
    text: 'You talk carefully, methodically. You find the right words — their scripture, their fear of chaos, their need for order. The lead soldier hesitates.',
    dialogue: 'Registration. You comply, come with us for documentation, receive passage papers. You cause trouble — you get a bullet. Choice is yours.',
    effectsOnEnter: { ironSaints: 5 },
    choices: [
      {
        id: 'accept_registration',
        text: 'Accept the registration terms.',
        nextNode: 'saints_submit',
      },
      {
        id: 'accept_then_escape',
        text: 'Agree, then escape at the first opportunity.',
        nextNode: 'saints_escape',
        requirements: { agility: 5 },
        effects: { ironSaints: -3, morale: 1 },
      },
    ],
  },

  {
    id: 'saints_submit',
    chapter: 'Chapter 1',
    title: 'Designated Sinner',
    location: 'Iron Saints Checkpoint',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Iron Saints Officer',
    text: 'They strip your outer weapons — not thoroughly. The registration is quick and humiliating.',
    dialogue: 'Civilian Sinner, category three. Don\'t leave the sanctioned perimeter. Do not activate the mark under any circumstances. Welcome to what\'s left of civilization.',
    effectsOnEnter: { ironSaints: 5, morale: -3, setFlags: ['saints_registered', 'has_saints_papers'] },
    choices: [
      {
        id: 'go_to_archive_sanctioned',
        text: 'Use your papers to move toward the Archive.',
        nextNode: 'saints_registered',
        requirements: { flags: ['knows_archive_exists'] },
      },
      {
        id: 'comply_for_now',
        text: 'Comply for now. Find your moment.',
        nextNode: 'saints_registered',
      },
    ],
  },

  {
    id: 'saints_escape',
    chapter: 'Chapter 1',
    title: 'Running Dark',
    location: 'Maintenance Tunnels',
    imageKey: 'dark_metro_hallway',
    text: 'You move before they can coordinate — through the gap in the tunnel wall, over the collapsed maintenance ladder. Behind you, shouts echo. Ahead: darkness and the sound of your own breathing.',
    effectsOnEnter: { morale: 1, ironSaints: -10, setFlags: ['escaped_iron_saints'] },
    choices: [
      {
        id: 'escape_to_surface',
        text: 'Head for the surface grate.',
        nextNode: 'surface_escape_path',
        effects: { health: -10 },
      },
      {
        id: 'escape_to_tunnels',
        text: 'Go deeper into the tunnels.',
        nextNode: 'tunnel_junction_inner',
        effects: { health: -5 },
      },
    ],
  },

  {
    id: 'saints_registered',
    chapter: 'Chapter 1',
    title: 'Papers',
    location: 'Iron Saints Checkpoint',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Narrator',
    text: 'You have papers now. The Saints control the upper corridors and most of the street-level access points. With their documents, you might move freely in areas that would otherwise be death sentences.',
    effectsOnEnter: { setFlags: ['has_saints_papers'] },
    choices: [
      {
        id: 'use_papers_surface',
        text: 'Use the papers to reach the surface safely.',
        nextNode: 'surface_escape_path',
      },
      {
        id: 'use_papers_archive',
        text: 'Use the papers to move toward the Archive.',
        nextNode: 'archive_door',
        requirements: { flags: ['knows_archive_exists'] },
      },
      {
        id: 'return_to_tunnels',
        text: 'Return to the tunnel junction.',
        nextNode: 'tunnel_junction_inner',
      },
    ],
  },

  // ────────────────────────────────
  // HOLLOW CHILDREN
  // ────────────────────────────────
  {
    id: 'hollow_children_territory',
    chapter: 'Chapter 1',
    title: 'Marked Territory',
    location: 'Tunnel Network — Sublevel 6',
    imageKey: 'dark_metro_hallway',
    text: 'The tunnel changes — crude but clever modifications everywhere. Trip-wire indicators, marked false floors, hand-signal systems on the walls. Someone young and very smart built this place.',
    effectsOnEnter: { setFlags: ['entered_hollow_territory'] },
    choices: [
      {
        id: 'proceed_carefully',
        text: 'Move carefully. Respect their system.',
        nextNode: 'tunnel_junction_inner',
        requirements: { agility: 4 },
        effects: { hollowChildren: 2 },
        flavorText: 'Requires: Agility 4 or higher',
      },
      {
        id: 'call_out_hollow',
        text: 'Call out. Make contact on their terms.',
        nextNode: 'hollow_leader_meet',
        requirements: { charisma: 4 },
        effects: { hollowChildren: 3 },
        flavorText: 'Requires: Charisma 4 or higher',
      },
      {
        id: 'broker_signal',
        text: '[Shadow Broker] Use the underground hand-signal for neutral contact.',
        nextNode: 'hollow_leader_meet',
        requirements: { classes: ['shadow_broker'] },
        effects: { hollowChildren: 5, setFlags: ['approached_right'] },
        isHidden: true,
      },
      {
        id: 'blunder_in',
        text: 'Keep moving. You\'ll deal with whatever happens.',
        nextNode: 'hollow_trap',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'hollow_trap',
    chapter: 'Chapter 1',
    title: 'Wire Seven',
    location: 'Hollow Children Corridor',
    imageKey: 'collapsed_tunnel',
    text: 'The floor drops. A net cage closes from above. You\'re suspended in a hollow chamber, swinging gently. Above you, small faces peer through a grate — children and teenagers, all watching with calculated expressions.',
    effectsOnEnter: { morale: -2, hollowChildren: -3 },
    choices: [
      {
        id: 'escape_trap',
        text: 'Find the weak point in the net and work it free.',
        nextNode: 'hollow_trap_escape',
        requirements: { agility: 5 },
        flavorText: 'Requires: Agility 5 or higher',
      },
      {
        id: 'use_scrap_escape',
        text: 'Use scrap metal to work the lock.',
        nextNode: 'hollow_trap_escape',
        requirements: { scrap: 2 },
        effects: { scrap: -2 },
        flavorText: 'Requires: 2 Scrap',
      },
      {
        id: 'talk_up',
        text: 'Talk your way out — address whoever\'s watching.',
        nextNode: 'hollow_trap_caught',
        requirements: { charisma: 5 },
        effects: { hollowChildren: 3 },
        flavorText: 'Requires: Charisma 5 or higher',
      },
      {
        id: 'wait_trap',
        text: 'Wait. Let them come to you on their terms.',
        nextNode: 'hollow_trap_caught',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'hollow_trap_escape',
    chapter: 'Chapter 1',
    title: 'Clear',
    location: 'Hollow Children Corridor',
    imageKey: 'collapsed_tunnel',
    text: 'The net has weak points — standard design. You find the tension joint, apply force or use the scrap to work the lock, and drop into the lower corridor. Fast, silent, gone.',
    effectsOnEnter: { hollowChildren: -5, setFlags: ['escaped_hollow_trap'] },
    choices: [
      {
        id: 'leave_hollow',
        text: 'Get clear of their territory.',
        nextNode: 'tunnel_junction_inner',
      },
    ],
  },

  {
    id: 'hollow_trap_caught',
    chapter: 'Chapter 1',
    title: 'Wire Seven',
    location: 'Hollow Children Holding Chamber',
    imageKey: 'collapsed_tunnel',
    speaker: 'Kira',
    text: 'A teenager drops into the chamber. Maybe sixteen, with the eyes of someone twice that age. She moves like a dancer — or a predator.',
    dialogue: 'You tripped wire seven. Most people miss wire seven. Either you\'re very unlucky or very interesting. Which one are you?',
    effectsOnEnter: { setFlags: ['met_hollow_leader'] },
    choices: [
      {
        id: 'be_interesting',
        text: 'Tell her something worth hearing.',
        nextNode: 'hollow_leader_meet',
        requirements: { charisma: 5 },
        effects: { hollowChildren: 5 },
        flavorText: 'Requires: Charisma 5 or higher',
      },
      {
        id: 'offer_trade',
        text: 'Offer to trade. Scrap for information.',
        nextNode: 'hollow_leader_meet',
        requirements: { scrap: 2 },
        effects: { scrap: -2, hollowChildren: 3 },
        flavorText: 'Requires: 2 Scrap',
      },
      {
        id: 'show_mark_hollow',
        text: 'Show her the mark on your wrist.',
        nextNode: 'hollow_leader_meet',
        effects: { hollowChildren: 2, setFlags: ['hollow_knows_mark'] },
      },
    ],
  },

  {
    id: 'hollow_leader_meet',
    chapter: 'Chapter 1',
    title: 'Kira',
    location: 'Hollow Children Sanctum',
    imageKey: 'tunnel_camp',
    speaker: 'Kira',
    text: 'She leads you through a hidden passage to a larger chamber — fires in barrels, children sleeping on salvaged mats, a careful economy of survival.',
    dialogue: 'I\'m Kira. I run things down here. Everyone who comes to me wants something. Question is what you\'re offering in return. That mark of yours — my people have seen it glow near the Archive door. Two tunnels east.',
    effectsOnEnter: { hollowChildren: 5, setFlags: ['met_kira', 'knows_archive_location', 'knows_archive_exists'] },
    choices: [
      {
        id: 'join_hollow',
        text: 'Pledge to the Hollow Children. You need allies more than freedom.',
        nextNode: 'hollow_join',
        effects: { hollowChildren: 10, setFlags: ['joined_hollow'] },
      },
      {
        id: 'trade_for_archive',
        text: 'Trade intel for a guide to the Archive door.',
        nextNode: 'archive_door',
        requirements: { intelligence: 6 },
        effects: { hollowChildren: 5, lastArchive: 5 },
        flavorText: 'Requires: Intelligence 6 or higher',
      },
      {
        id: 'threaten_hollow',
        text: 'Threaten her. You\'ll find the door yourself.',
        nextNode: 'tunnel_junction_inner',
        requirements: { strength: 7 },
        effects: { hollowChildren: -10, morale: -1 },
        flavorText: 'Requires: Strength 7 or higher',
      },
      {
        id: 'leave_politely',
        text: 'Thank her and leave. No commitments.',
        nextNode: 'tunnel_junction_inner',
        effects: { hollowChildren: 2 },
      },
    ],
  },

  {
    id: 'hollow_join',
    chapter: 'Chapter 1',
    title: 'One of Us',
    location: 'Hollow Children Sanctum',
    imageKey: 'tunnel_camp',
    speaker: 'Kira',
    text: 'She nods — simple, certain.',
    dialogue: 'Then you\'re one of us. For now. Come — I\'ll take you to the Archive door myself.',
    effectsOnEnter: { hollowChildren: 10, morale: 2, setFlags: ['hollow_member'] },
    choices: [
      {
        id: 'follow_kira',
        text: 'Follow Kira to the Archive.',
        nextNode: 'archive_door',
      },
    ],
  },

  // ────────────────────────────────
  // RELIC MACHINE
  // ────────────────────────────────
  {
    id: 'relic_machine_room',
    chapter: 'Chapter 1',
    title: 'The Relay Station',
    location: 'Maintenance Sublevel — Control Chamber',
    imageKey: 'examine_mark',
    text: 'A side chamber off the main tunnel. Old control machinery — pre-blackout, analog displays, mechanical switches still drawing power from somewhere. The air smells of ozone. The mark on your wrist blazes brighter than it has since you woke.',
    effectsOnEnter: { corruption: 1, setFlags: ['found_relic_machine', 'visited_sealed_relay_door'] },
    choices: [
      {
        id: 'touch_panel',
        text: 'Touch the control panel. Let the mark do what it wants to.',
        nextNode: 'relic_awakening',
        effects: { corruption: 1 },
      },
      {
        id: 'study_panel',
        text: 'Study the machinery before touching anything.',
        nextNode: 'relic_study',
        requirements: { intelligence: 7 },
        effects: { lastArchive: 5 },
        flavorText: 'Requires: Intelligence 7 or higher',
      },
      {
        id: 'relic_hunter_interface',
        text: '[Relic Hunter] Interface with the system using your training.',
        nextNode: 'relic_study',
        requirements: { classes: ['relic_hunter'] },
        effects: { lastArchive: 8, corruption: -1 },
        isHidden: true,
      },
      {
        id: 'back_from_relic',
        text: 'Back away. This feels wrong.',
        nextNode: 'tunnel_junction_inner',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'relic_awakening',
    chapter: 'Chapter 1',
    title: 'Everything at Once',
    location: 'Maintenance Sublevel — Control Chamber',
    imageKey: 'examine_mark',
    speaker: 'The Mark',
    text: 'Your hand connects with the panel. The mark becomes a furnace. The machine screams in static. And you see it all — the city before the blackout, the moment it went dark, the vast thing beneath the city that caused it. You see yourself at the Archive door. It already happened.',
    effectsOnEnter: { corruption: 3, morale: -3, setFlags: ['activated_relic', 'saw_full_vision', 'knows_archive_exists', 'knows_archive_location'] },
    choices: [
      {
        id: 'endure_vision',
        text: 'Endure it. Hold on through the pain.',
        nextNode: 'corruption_vision',
        effects: { health: -10 },
      },
      {
        id: 'resist_vision',
        text: 'Resist. Push back against whatever is reaching in.',
        nextNode: 'corruption_vision',
        requirements: { morale: 5 },
        effects: { corruption: -1, morale: -2 },
        flavorText: 'Requires: Morale 5 or higher',
      },
      {
        id: 'embrace_vision',
        text: 'Let it in. Let it take everything.',
        nextNode: 'corruption_vision',
        endingTrigger: 'ending_relic_awakening',
        effects: { corruption: 4 },
      },
    ],
  },

  {
    id: 'relic_study',
    chapter: 'Chapter 1',
    title: 'Signal Architecture',
    location: 'Maintenance Sublevel — Control Chamber',
    imageKey: 'examine_mark',
    text: 'You approach it methodically — tracing the circuit paths, reading the decay patterns. This was a relay station for something much larger. These machines were built to communicate with whatever is buried beneath the city. The mark on your wrist is the signal key.',
    effectsOnEnter: { intelligence: 1, lastArchive: 5, setFlags: ['studied_relic', 'understands_mark_function', 'knows_archive_exists', 'knows_archive_location'] },
    choices: [
      {
        id: 'go_to_archive_studied',
        text: 'The Archive. That\'s where you need to go.',
        nextNode: 'archive_door',
      },
    ],
  },

  {
    id: 'corruption_vision',
    chapter: 'Chapter 1',
    title: 'After the Signal',
    location: 'Maintenance Sublevel — Control Chamber',
    imageKey: 'examine_mark',
    text: 'The world blurs. The mark pulses like a second heart. You see the tunnels as they were — full of life and light. Then the blackout. Then something vast moving below. When you come back, you\'re on your knees. But you know where the Archive is.',
    effectsOnEnter: { corruption: 1, morale: -2, setFlags: ['knows_archive_location', 'had_corruption_vision'] },
    choices: [
      {
        id: 'push_to_archive',
        text: 'Get to the Archive. Whatever that was — it\'s waiting.',
        nextNode: 'archive_door',
        effects: { morale: 1 },
      },
      {
        id: 'mira_support',
        text: 'Let Mira help you recover before moving.',
        nextNode: 'archive_door',
        requirements: { flags: ['mira_joins_party'], miraTrust: 3 },
        effects: { health: 15, miraTrust: 1 },
      },
    ],
  },

  // ────────────────────────────────
  // SURFACE
  // ────────────────────────────────
  {
    id: 'surface_escape_path',
    chapter: 'Chapter 1',
    title: 'The Long Climb',
    location: 'Collapsed Stairwell — Exit 9-B',
    imageKey: 'collapsed_tunnel',
    text: 'The collapsed stairwell requires work — moving rubble, climbing twisted rebar. But the grey light above is unmistakable. Outside. After days underground, even a sky choked with ash feels like freedom.',
    effectsOnEnter: { health: -10, morale: 2 },
    choices: [
      {
        id: 'push_up_strength',
        text: 'Force through the debris.',
        nextNode: 'surface_ruins_explore',
        requirements: { strength: 5 },
        flavorText: 'Requires: Strength 5 or higher',
      },
      {
        id: 'climb_agile',
        text: 'Find the path of least resistance and climb through.',
        nextNode: 'surface_ruins_explore',
        requirements: { agility: 5 },
        flavorText: 'Requires: Agility 5 or higher',
      },
      {
        id: 'too_injured',
        text: 'You\'re too weakened. Go back.',
        nextNode: 'station_junction',
        effects: { health: -5, morale: -2 },
      },
    ],
  },

  {
    id: 'surface_ruins_explore',
    chapter: 'Chapter 1',
    title: 'What\'s Left',
    location: 'City Surface — Ruined District',
    imageKey: 'surface_ruins',
    text: 'The city is a graveyard of glass and concrete. Fires burn in the distance. The sky is ash-dark — clouds of smoke blocking the sun. Spray-painted patrol routes mark the streets. Iron Saints own the surface.',
    effectsOnEnter: { morale: -1, setFlags: ['reached_surface'] },
    choices: [
      {
        id: 'surface_search_supplies',
        text: 'Scavenge for supplies before moving.',
        nextNode: 'surface_ruins_explore',
        requirements: { luck: 5 },
        effects: { food: 2, water: 1, scrap: 1, setFlags: ['surface_scavenged'] },
        flavorText: 'Requires: Luck 5 or higher',
      },
      {
        id: 'signal_saints',
        text: 'Signal an Iron Saints patrol. Use their papers to move legally.',
        nextNode: 'saints_registered',
        requirements: { flags: ['has_saints_papers'] },
        effects: { ironSaints: 3, morale: -2 },
      },
      {
        id: 'follow_mark_to_archive',
        text: 'Let the mark guide you underground to the Archive.',
        nextNode: 'archive_door',
        requirements: { flags: ['knows_archive_exists'] },
        effects: { corruption: 1 },
      },
      {
        id: 'surface_go_back',
        text: 'This is too exposed. Go back underground.',
        nextNode: 'tunnel_junction_inner',
        effects: { health: -5 },
      },
      {
        id: 'mark_blazes_surface',
        text: 'The mark is blazing. You can feel it drawing attention from the street.',
        nextNode: 'surface_mark_blazes',
        requirements: { blockedFlags: ['mark_seen_on_surface'] },
      },
      {
        id: 'ash_storm_incoming',
        text: 'The eastern sky is turning black. Ash storm. You have minutes.',
        nextNode: 'surface_ash_storm_begins',
        requirements: { blockedFlags: ['survived_ash_storm'] },
      },
      {
        id: 'push_deeper_into_city',
        text: 'You\'ve survived the station. Time to understand what\'s above you.',
        nextNode: 'chapter2_start',
        requirements: { flags: ['reached_surface'] },
        effects: { setFlags: ['left_metro_zone'] },
      },
    ],
  },

  // ────────────────────────────────
  // CLIMAX — THE ARCHIVE DOOR
  // ────────────────────────────────
  {
    id: 'archive_door',
    chapter: 'Chapter 1',
    title: 'The Archive Door',
    location: 'Tunnel Network — Archive Anteroom',
    imageKey: 'last_archive_door',
    text: 'The door is older than the metro, older than the city above it. Stone and corroded metal covered in symbols. The mark on your wrist burns so brightly it lights the chamber. The symbols pulse in response — the same pattern, mirrored, amplified.',
    effectsOnEnter: { morale: 2, setFlags: ['found_archive_door', 'visited_sealed_relay_door'] },
    choices: [
      {
        id: 'use_mark_to_open',
        text: 'Use the mark. Let it open the door.',
        nextNode: 'chapter1_end',
        effects: { setFlags: ['opened_archive'] },
      },
      {
        id: 'read_symbols',
        text: 'Read the symbols first. Understand what you\'re opening.',
        nextNode: 'chapter1_end',
        requirements: { intelligence: 7 },
        effects: { lastArchive: 10, setFlags: ['read_symbols', 'opened_archive'] },
        flavorText: 'Requires: Intelligence 7 or higher',
      },
      {
        id: 'scholar_reads',
        text: '[Scholar] You can read these. You\'ve seen them before.',
        nextNode: 'chapter1_end',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { lastArchive: 15, intelligence: 1, setFlags: ['read_symbols', 'opened_archive'] },
        isHidden: true,
      },
      {
        id: 'mira_sacrifice_choice',
        text: 'Mira steps forward. She wants to do something — and you see it in her eyes.',
        nextNode: 'ending_mira_sacrifice',
        requirements: { flags: ['mira_joins_party'], miraTrust: 5 },
        flavorText: 'Requires: Mira present and Trust 5 or higher',
      },
      {
        id: 'leave_archive',
        text: 'Not yet. Walk away.',
        nextNode: 'tunnel_junction_inner',
        effects: { morale: -3 },
      },
    ],
  },

  {
    id: 'chapter1_end',
    chapter: 'Chapter 1',
    title: 'What Lies Within',
    location: 'The Last Archive — Entrance Hall',
    imageKey: 'last_archive_door',
    text: 'The door opens. Cold air rushes out — ancient, preserved, carrying the scent of old paper and something electrical. Beyond: shelves upon shelves of pre-collapse data and a machine larger than anything above, its single lens turning toward you. It recognizes the mark. And somewhere in the city above, something ancient wakes up and takes notice.',
    effectsOnEnter: { lastArchive: 10, morale: 5, setFlags: ['entered_archive', 'chapter1_complete'] },
    choices: [
      {
        id: 'chapter1_end_continue',
        text: 'Step inside. Whatever comes next, it starts here.',
        nextNode: 'chapter2_start',
      },
    ],
  },

  // ────────────────────────────────
  // ESCAPE TUNNEL — TUNNEL 7-WEST
  // ────────────────────────────────
  {
    id: 'broken_tunnel_mouth',
    chapter: 'Chapter 1',
    title: 'Tunnel 7-West',
    location: 'Metro Service Level — Western Tunnel',
    imageKey: 'dark_metro_hallway',
    text: 'The western service tunnel looks like the city tried to swallow it and gave up halfway. Half the ceiling is down, replaced by packed rubble and exposed rebar twisted into shapes that suggest violence. But there is current — cold, raw air that doesn\'t come from any recycling system. This tunnel leads somewhere that isn\'t here.',
    effectsOnEnter: { hunger: -1, thirst: -1, setFlags: ['escape_tunnel_used'] },
    choices: [
      {
        id: 'enter_flood_section',
        text: 'Press into the tunnel. The cold air is a good sign.',
        nextNode: 'tunnel_flood_chamber',
      },
      {
        id: 'check_structure_first',
        text: 'Check the ceiling before moving. You\'ve seen collapse before.',
        nextNode: 'tunnel_flood_chamber',
        requirements: { intelligence: 5 },
        effects: { morale: 1, setFlags: ['checked_tunnel_structure'] },
        flavorText: 'Requires: Intelligence 5 or higher',
      },
      {
        id: 'courier_route_knowledge',
        text: '[Black Market Courier] You know this tunnel. You ran product through it three months ago.',
        nextNode: 'tunnel_brace_success',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { morale: 2, setFlags: ['knows_tunnel_7west'] },
        isHidden: true,
      },
      {
        id: 'back_from_tunnel_mouth',
        text: 'Too unstable. Go back to the concourse.',
        nextNode: 'station_junction',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'tunnel_flood_chamber',
    chapter: 'Chapter 1',
    title: 'The Flood',
    location: 'Tunnel 7-West — Flooded Section',
    imageKey: 'collapsed_tunnel',
    text: 'Ankle-deep turns to waist-deep inside thirty meters. The water is black and cold enough to make breathing difficult. The emergency exit signs are submerged, their light making the water glow dull orange. Something floats past — a Saints patrol kit. Whoever wore it didn\'t get this far.',
    effectsOnEnter: { thirst: -1, health: -5 },
    choices: [
      {
        id: 'swim_through_agility',
        text: 'Stay low and swim through. You know how to use water.',
        nextNode: 'tunnel_flood_survive',
        requirements: { agility: 6 },
        flavorText: 'Requires: Agility 6 or higher',
      },
      {
        id: 'float_with_scrap',
        text: 'Use scrap to build a float for your supplies and push through.',
        nextNode: 'tunnel_flood_survive',
        requirements: { scrap: 3 },
        effects: { scrap: -3 },
        flavorText: 'Requires: 3 Scrap',
      },
      {
        id: 'force_through_strength',
        text: 'Overpower it — brute strength, keep moving.',
        nextNode: 'tunnel_flood_survive',
        requirements: { strength: 5 },
        effects: { health: -10 },
        flavorText: 'Requires: Strength 5 or higher',
        diceCheck: {
          stat: 'strength',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'tunnel_flood_survive',
          failureNode: 'dice_tunnel_flood_fail',
          criticalSuccessNode: 'tunnel_flood_survive',
          criticalSuccessEffects: { health: 5, strength: 1, morale: 2 },
          criticalFailureNode: 'dice_tunnel_flood_crit_fail',
          failureEffects: { health: -15, morale: -3 },
          criticalFailureEffects: { health: -20, morale: -10 },
        },
      },
      {
        id: 'orphan_flood_instinct',
        text: '[Wasteland Orphan] You\'ve swum in worse. You know how to breathe through fear.',
        nextNode: 'tunnel_flood_survive',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { morale: 1 },
        isHidden: true,
      },
      {
        id: 'turn_back_from_flood',
        text: 'The water is too cold and too deep. Go back.',
        nextNode: 'station_junction',
        effects: { morale: -2, health: -5 },
      },
    ],
  },

  {
    id: 'tunnel_flood_survive',
    chapter: 'Chapter 1',
    title: 'The Far Shore',
    location: 'Tunnel 7-West — Eastern Approach',
    imageKey: 'dark_metro_hallway',
    text: 'You drag yourself out on the other side, hands shaking, breath ragged. The cold has gone deep — into your joints, into your thinking. Behind you, the flooded section sounds like breathing. Slow. Patient. The mark on your wrist steams in the frigid air.',
    effectsOnEnter: { thirst: 1, morale: 2 },
    choices: [
      {
        id: 'press_forward_to_platform',
        text: 'Keep moving before the cold settles in.',
        nextNode: 'far_platform_9c',
      },
    ],
  },

  {
    id: 'far_platform_9c',
    chapter: 'Chapter 1',
    title: 'Platform 9-C',
    location: 'Platform 9-C — Decommissioned Western Line',
    imageKey: 'ruined_metro_station',
    text: 'An older platform — decommissioned before the blackout, sealed off from the active lines. Emergency lights cycle here too, but slower, their frequency just slightly wrong. Pre-war signage. Track 9-C. The silence here feels earned rather than imposed. Someone hasn\'t been through in days.',
    effectsOnEnter: { morale: 1, setFlags: ['reached_platform_9c'] },
    choices: [
      {
        id: 'search_platform_9c',
        text: 'Search the platform thoroughly before moving.',
        nextNode: 'far_platform_search',
        requirements: { luck: 4 },
        flavorText: 'Requires: Luck 4 or higher',
      },
      {
        id: 'check_far_tunnel',
        text: 'The western tunnel continues — check the structural integrity.',
        nextNode: 'tunnel_collapse_moment',
      },
      {
        id: 'rest_briefly',
        text: 'Rest here. You need it more than you want to admit.',
        nextNode: 'tunnel_collapse_moment',
        effects: { health: 10, morale: 2, hunger: -2, thirst: -2 },
      },
    ],
  },

  {
    id: 'far_platform_search',
    chapter: 'Chapter 1',
    title: 'What They Left',
    location: 'Platform 9-C — Maintenance Shed',
    imageKey: 'broken_vending_area',
    text: 'The platform\'s old maintenance shed is welded shut — but not well. Inside: an emergency ration cache from a decade ago. Pre-blackout municipal issue, sealed in vacuum packaging. Still good. Still whole. On the wall, scratched by someone with time and reason to leave a message: "They don\'t sleep. They listen. Don\'t use the mark near the 7-East junction."',
    effectsOnEnter: { food: 3, water: 2, medicine: 1, morale: 3, setFlags: ['found_platform_cache', 'warned_about_east_junction'] },
    choices: [
      {
        id: 'take_supplies_continue',
        text: 'Take the supplies and continue to the western approach.',
        nextNode: 'tunnel_collapse_moment',
      },
      {
        id: 'study_warning',
        text: 'Study the message more carefully. Someone took time to leave this.',
        nextNode: 'tunnel_collapse_moment',
        requirements: { intelligence: 5 },
        effects: { lastArchive: 3, morale: -1 },
        flavorText: 'Requires: Intelligence 5 or higher',
      },
    ],
  },

  {
    id: 'tunnel_collapse_moment',
    chapter: 'Chapter 1',
    title: 'The Warning',
    location: 'Tunnel 7-West — Structural Failure Zone',
    imageKey: 'collapsed_tunnel',
    text: 'The ceiling warns you before it gives. A fine rain of concrete dust. A groan from somewhere structural and deep that you feel in your back teeth. You have seconds. Maybe fewer.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'sprint_through_agility',
        text: 'Sprint through the gap before it closes.',
        nextNode: 'tunnel_brace_success',
        requirements: { agility: 7 },
        flavorText: 'Requires: Agility 7 or higher',
      },
      {
        id: 'brace_with_strength',
        text: 'Find the load-bearing point and hold it long enough to pass.',
        nextNode: 'tunnel_brace_success',
        requirements: { strength: 6 },
        effects: { health: -10 },
        flavorText: 'Requires: Strength 6 or higher',
      },
      {
        id: 'blade_survivor_read',
        text: '[Blade Survivor] Read the collapse pattern. There\'s always a safe channel through violence.',
        nextNode: 'tunnel_brace_success',
        requirements: { classes: ['blade_survivor'] },
        effects: { morale: 1 },
        isHidden: true,
      },
      {
        id: 'dive_back_platform',
        text: 'Dive back toward the platform.',
        nextNode: 'far_platform_9c',
        effects: { health: -15, morale: -2 },
      },
      {
        id: 'throw_yourself_through',
        text: 'Throw yourself through and hope the math works out.',
        nextNode: 'tunnel_brace_success',
        effects: { health: -15, morale: -1 },
      },
      {
        id: 'too_slow_collapse',
        text: 'You don\'t move fast enough.',
        nextNode: 'ending_buried_tunnel',
        effects: { health: -30 },
      },
    ],
  },

  {
    id: 'tunnel_brace_success',
    chapter: 'Chapter 1',
    title: 'Through',
    location: 'Tunnel 7-West — Far Side',
    imageKey: 'dark_metro_hallway',
    text: 'You make it through the thunder and the dust. The section behind you closes like a jaw. The path you came from is gone. Forward is the only direction left — which is, you think, sometimes exactly what you need the world to decide for you.',
    effectsOnEnter: { morale: 2, setFlags: ['crossed_tunnel_7west'] },
    choices: [
      {
        id: 'continue_into_tunnels',
        text: 'Press on into the deeper tunnel network.',
        nextNode: 'tunnel_junction_inner',
      },
      {
        id: 'wall_opening_found',
        text: 'The collapse has opened a section of the wall — a passage that wasn\'t there before.',
        nextNode: 'secret_passage_found',
        effects: { setFlags: ['found_secret_passage'] },
      },
    ],
  },

  // ────────────────────────────────
  // MIRA — SCAVENGER ATTACK
  // ────────────────────────────────
  {
    id: 'mira_scavenger_attack',
    chapter: 'Chapter 1',
    title: 'Three Against One',
    location: 'Metro Concourse — East Corridor',
    imageKey: 'ruined_metro_station',
    text: 'You hear it before you see it — a sharp cry, cut short. Three scavengers have a woman pinned against the clinic booth wall. They move with purpose: one watches the exits, one holds her wrists, one goes through her medical bag. She isn\'t panicking. She\'s calculating. Her eyes find yours across the corridor — reading your choice before you\'ve made it.',
    effectsOnEnter: { setFlags: ['mira_scavenger_scene'] },
    choices: [
      {
        id: 'fight_scavengers_strength',
        text: 'Hit them fast, before they can coordinate.',
        nextNode: 'mira_rescue_fight',
        requirements: { strength: 6 },
        effects: { health: -15 },
        flavorText: 'Requires: Strength 6 or higher',
      },
      {
        id: 'shoot_scavengers',
        text: 'Put a shot in the ceiling. Let the sound do the work.',
        nextNode: 'mira_rescue_fight',
        requirements: { ammo: 2 },
        effects: { ammo: -2, morale: 1 },
        flavorText: 'Requires: 2 Ammo',
      },
      {
        id: 'distract_scavengers_cha',
        text: 'Call out from the far corridor. Create noise, misdirection.',
        nextNode: 'mira_rescue_distract',
        requirements: { charisma: 6 },
        effects: { morale: 1 },
        flavorText: 'Requires: Charisma 6 or higher',
      },
      {
        id: 'sneak_rescue_agility',
        text: 'Circle around behind them through the service hall.',
        nextNode: 'mira_rescue_distract',
        requirements: { agility: 6 },
        flavorText: 'Requires: Agility 6 or higher',
      },
      {
        id: 'tactician_reads_room',
        text: '[Tactician] Three entry points, one exit. You see the whole geometry of this.',
        nextNode: 'mira_rescue_fight',
        requirements: { classes: ['tactician'] },
        effects: { morale: 2, health: -5 },
        isHidden: true,
      },
      {
        id: 'watch_and_wait',
        text: 'Hang back. Watch how it plays out.',
        nextNode: 'mira_taken_scene',
        effects: { morale: -2 },
      },
    ],
  },

  {
    id: 'mira_rescue_fight',
    chapter: 'Chapter 1',
    title: 'Close Work',
    location: 'Metro Concourse — East Corridor',
    imageKey: 'ruined_metro_station',
    text: 'The fight is ugly and fast the way real fights are — no elegance, just pressure and proximity and the particular kind of violence that ends things quickly. They scatter. Two run. One doesn\'t. When the dust settles, the woman is on her feet, bleeding from a cut on her palm where she gripped something she shouldn\'t have. She looks at you with the focused attention of someone recalibrating.',
    effectsOnEnter: { morale: 1, setFlags: ['fought_scavengers'] },
    choices: [
      {
        id: 'check_on_her',
        text: 'Make sure she\'s all right.',
        nextNode: 'mira_rescued_safe',
      },
    ],
  },

  {
    id: 'mira_rescue_distract',
    chapter: 'Chapter 1',
    title: 'Misdirection',
    location: 'Metro Concourse — East Corridor',
    imageKey: 'ruined_metro_station',
    text: 'You create a diversion — sound, movement, something thrown to bounce down the far corridor. The scavengers break formation. One investigates. In the gap, the woman moves — fast, precise, trained. She uses the bag as a weight and hits the second one where it counts. By the time the third understands what\'s happening, there\'s nothing left to understand.',
    effectsOnEnter: { morale: 2 },
    choices: [
      {
        id: 'meet_after_distract',
        text: 'Step out once they\'re gone.',
        nextNode: 'mira_rescued_safe',
      },
    ],
  },

  {
    id: 'mira_rescued_safe',
    chapter: 'Chapter 1',
    title: 'Unexpected',
    location: 'Metro Concourse — East Wing',
    imageKey: 'ruined_metro_station',
    speaker: 'Mira',
    text: 'She presses a cloth to her hand, watching you with the kind of attention that has learned not to waste itself on the wrong people.',
    dialogue: 'That was unexpected. Thank you. I\'m Mira — street medic, three days underground, one close call before this one. I can pay you back. Not with money. With skills.',
    effectsOnEnter: { miraTrust: 3, morale: 2, setFlags: ['met_mira', 'saved_mira_from_scavengers', 'mira_scavenger_resolved'] },
    choices: [
      {
        id: 'accept_mira_offer',
        text: 'Accept her offer. You need all the skills you can get.',
        nextNode: 'mira_gratitude_scene',
      },
      {
        id: 'ask_mira_about_mark',
        text: 'Ask what she knows about the mark on your wrist.',
        nextNode: 'mira_gratitude_scene',
        effects: { miraTrust: 1 },
      },
    ],
  },

  {
    id: 'mira_gratitude_scene',
    chapter: 'Chapter 1',
    title: 'The Math Changes',
    location: 'Metro Concourse — East Wing',
    imageKey: 'tunnel_camp',
    speaker: 'Mira',
    text: 'She restores the clinic booth with practiced efficiency — resetting what she can, writing off what she can\'t. When she treats your wounds, she works without asking. Her hands remember this.',
    dialogue: 'I\'ve been alone here for two days. Three patrols, one close call, and now this. The math changes with two people instead of one. You interested in finding out?',
    effectsOnEnter: { health: 20, miraTrust: 2, setFlags: ['mira_joins_party', 'talked_mira_2'] },
    choices: [
      {
        id: 'agree_to_travel_together',
        text: 'Yes. Two people is better than one.',
        nextNode: 'station_junction',
      },
    ],
  },

  {
    id: 'mira_taken_scene',
    chapter: 'Chapter 1',
    title: 'The Choice You Made',
    location: 'Metro Concourse — East Corridor',
    imageKey: 'dark_metro_hallway',
    text: 'You watch them drag her north — toward the deeper maintenance levels, where the Saints don\'t bother to patrol. She doesn\'t scream. She calculates. Her eyes find yours one more time, reading your stillness. Then she\'s gone around the corner, and you\'re alone with the particular quiet of a corridor after something that can\'t be undone.',
    effectsOnEnter: { morale: -3, setFlags: ['watched_mira_taken', 'mira_scavenger_scene'] },
    choices: [
      {
        id: 'go_after_her',
        text: 'Go after them. That was a mistake and you know it.',
        nextNode: 'mira_captive_rescue',
        effects: { morale: 1 },
      },
      {
        id: 'leave_mira',
        text: 'You never knew her. This isn\'t your problem.',
        nextNode: 'station_junction',
        effects: { morale: -3, setFlags: ['abandoned_mira'] },
      },
    ],
  },

  {
    id: 'mira_captive_rescue',
    chapter: 'Chapter 1',
    title: 'Before It\'s Too Late',
    location: 'Maintenance Level — Scavenger Hold',
    imageKey: 'dark_metro_hallway',
    text: 'You track them by sound — the scavengers aren\'t careful about noise. A sealed maintenance room, locked from inside. You have one chance before they realize they\'re being followed. Behind the door: silence that feels deliberately made.',
    effectsOnEnter: { thirst: -1, setFlags: ['tried_to_rescue_mira'] },
    choices: [
      {
        id: 'force_door_strength',
        text: 'Force the door. One impact, committed.',
        nextNode: 'mira_rescued_safe',
        requirements: { strength: 7 },
        effects: { health: -15 },
        flavorText: 'Requires: Strength 7 or higher',
      },
      {
        id: 'medicine_bargain',
        text: 'Call through the door. Offer medicine as trade — what they really want.',
        nextNode: 'mira_rescued_safe',
        requirements: { medicine: 2 },
        effects: { medicine: -2, miraTrust: 1 },
        flavorText: 'Requires: 2 Medicine',
      },
      {
        id: 'hollow_children_backup',
        text: 'Signal the Hollow Children. You know their territory — this is it.',
        nextNode: 'mira_rescued_safe',
        requirements: { flags: ['met_kira'] },
        effects: { hollowChildren: 5, miraTrust: 2 },
        flavorText: 'Requires: Met Kira',
      },
      {
        id: 'give_up_rescue_attempt',
        text: 'It\'s been too long. You can\'t break through. Walk away.',
        nextNode: 'ending_mira_abandoned',
        effects: { morale: -5 },
      },
    ],
  },

  // ────────────────────────────────
  // CAIN — DEEPER ROOM
  // ────────────────────────────────
  {
    id: 'cain_deeper_room',
    chapter: 'Chapter 1',
    title: 'The Inner Office',
    location: 'Metro Security Room — Inner Office',
    imageKey: 'tunnel_camp',
    speaker: 'Cain',
    text: 'Past the control room there\'s a smaller space — converted office, maps on the wall marked in three colors, a bedroll that\'s been used heavily. Medical supplies, halved. He watches you take it all in without stopping you.',
    dialogue: 'Two days ago I had twice those supplies and no company. Make what you want of that.',
    effectsOnEnter: { setFlags: ['seen_cain_inner_room'] },
    choices: [
      {
        id: 'ask_about_maps',
        text: 'Ask about the maps on the wall.',
        nextNode: 'cain_reveals_tunnel_map',
      },
      {
        id: 'ask_why_supplies_halved',
        text: 'Ask why his supplies are half what they should be.',
        nextNode: 'cain_injured_discovery',
      },
      {
        id: 'offer_food_to_cain',
        text: 'Share your food without asking anything in return.',
        nextNode: 'cain_full_alliance',
        requirements: { food: 1 },
        effects: { food: -1, cainTrust: 3 },
        flavorText: 'Requires: 1 Food',
      },
    ],
  },

  {
    id: 'cain_injured_discovery',
    chapter: 'Chapter 1',
    title: 'What He\'s Been Hiding',
    location: 'Metro Security Room — Inner Office',
    imageKey: 'tunnel_camp',
    speaker: 'Cain',
    text: 'He moves wrong when he thinks you\'re not watching. Hand pressed to his right side, too deliberate. When you call it out directly, he doesn\'t bother to deny it.',
    dialogue: 'Saints ricochet, three days ago. Clean through, but close to something important. I\'ve been rationing my own medicine — the math only holds another two days.',
    effectsOnEnter: { setFlags: ['cain_injury_known'] },
    choices: [
      {
        id: 'give_cain_medicine',
        text: 'Give him your medicine. You can find more.',
        nextNode: 'cain_medicine_needed',
        requirements: { medicine: 2 },
        effects: { medicine: -2, cainTrust: 3 },
        flavorText: 'Requires: 2 Medicine',
      },
      {
        id: 'medic_treats_cain',
        text: '[Medic] Treat him properly with what you have. You know how to stretch supplies.',
        nextNode: 'cain_medicine_needed',
        requirements: { classes: ['medic'], medicine: 1 },
        effects: { medicine: -1, cainTrust: 4 },
        isHidden: true,
      },
      {
        id: 'cant_spare_medicine',
        text: 'You can\'t spare the medicine. That\'s the truth.',
        nextNode: 'cain_deeper_room',
        effects: { cainTrust: -1 },
      },
    ],
  },

  {
    id: 'cain_medicine_needed',
    chapter: 'Chapter 1',
    title: 'Old Soldier Discipline',
    location: 'Metro Security Room — Inner Office',
    imageKey: 'tunnel_camp',
    speaker: 'Cain',
    text: 'His hands don\'t shake while you work on him — old soldier discipline holding a posture that costs him. When it\'s done, something in the set of his shoulders changes. Less calculated. More present.',
    dialogue: 'I haven\'t let anyone do that since the war. You\'re either very good or very brave. Possibly both. I have a map of every Saints patrol route in this sector. It\'s yours.',
    effectsOnEnter: { cainTrust: 4, morale: 2, setFlags: ['cain_injury_treated', 'cain_revealed_map'] },
    choices: [
      {
        id: 'accept_cain_map_offer',
        text: 'Accept the map.',
        nextNode: 'cain_reveals_tunnel_map',
      },
    ],
  },

  {
    id: 'cain_reveals_tunnel_map',
    chapter: 'Chapter 1',
    title: 'The Patrol Grid',
    location: 'Metro Security Room — Inner Office',
    imageKey: 'tunnel_camp',
    speaker: 'Cain',
    text: 'The map is hand-drawn on the back of an old metro schematic — Saints checkpoint rotations marked in red, gaps in their patrol grid circled, two routes to the lower maintenance levels that the Iron Saints have stopped monitoring.',
    dialogue: 'There\'s a gap in the 6-East patrol — every four hours, eight minutes. I\'ve been using it to move supplies. You can use it to get to wherever you\'re going. And maybe — maybe I come with you.',
    effectsOnEnter: { lastArchive: 5, morale: 2, setFlags: ['has_tunnel_map', 'cain_offers_to_join'] },
    choices: [
      {
        id: 'bring_cain_along',
        text: 'Yes. Take him with you.',
        nextNode: 'cain_full_alliance',
      },
      {
        id: 'take_map_go_alone',
        text: 'Take the map and go alone. He\'d slow you down.',
        nextNode: 'station_junction',
        effects: { cainTrust: -2 },
      },
    ],
  },

  {
    id: 'cain_full_alliance',
    chapter: 'Chapter 1',
    title: 'A Bad Reason and a Good One',
    location: 'Metro Security Room',
    imageKey: 'tunnel_camp',
    speaker: 'Cain',
    text: 'He gathers his things with the efficient economy of a man who has packed in emergencies before. No sentimentality. No second-guessing.',
    dialogue: 'I\'ve been waiting for a reason to move. You\'re a bad reason and a good one at the same time. Let\'s not waste it.',
    effectsOnEnter: { morale: 3, cainTrust: 3, setFlags: ['cain_joins_party', 'talked_cain_2', 'cain_full_ally'] },
    choices: [
      {
        id: 'leave_together',
        text: 'Head back to the concourse together.',
        nextNode: 'station_junction',
      },
    ],
  },

  // ────────────────────────────────
  // HOLLOW CHILDREN — WATCHING
  // ────────────────────────────────
  {
    id: 'hollow_watchers_dark',
    chapter: 'Chapter 1',
    title: 'Something Is Watching',
    location: 'Maintenance Tunnels — Sublevel 5',
    imageKey: 'dark_metro_hallway',
    text: 'You feel it before you see it — the particular quality of being observed by something that knows how to be invisible. Then, at the tunnel\'s edge, you catch it: a pair of eyes at chest height. A child. Still as a carved figure. When you look directly, they don\'t run. They watch you watch them. The tunnel behind them isn\'t empty.',
    effectsOnEnter: { setFlags: ['noticed_hollow_watchers'] },
    choices: [
      {
        id: 'acknowledge_watchers',
        text: 'Stop. Acknowledge them directly. Let them see you aren\'t a threat.',
        nextNode: 'hollow_child_scout_approach',
        effects: { hollowChildren: 3 },
      },
      {
        id: 'broker_tunnel_signal',
        text: '[Shadow Broker] Use the underground hand signal for non-threat contact.',
        nextNode: 'hollow_child_scout_approach',
        requirements: { classes: ['shadow_broker'] },
        effects: { hollowChildren: 5, setFlags: ['used_broker_signal'] },
        isHidden: true,
      },
      {
        id: 'keep_moving_watchers',
        text: 'Keep moving. Don\'t engage with whatever this is.',
        nextNode: 'tunnel_junction_inner',
        effects: { hollowChildren: -2 },
      },
    ],
  },

  {
    id: 'hollow_child_scout_approach',
    chapter: 'Chapter 1',
    title: 'The Scout',
    location: 'Maintenance Tunnels — Sublevel 5',
    imageKey: 'dark_metro_hallway',
    speaker: 'Child Scout',
    text: 'The child steps forward into the light margin — maybe twelve years old, dressed in layered salvage that makes them nearly invisible in the dark. Eyes that calculate risk faster than most adults you\'ve met. Behind them, in the tunnel shadow, you count at least three more silhouettes.',
    dialogue: 'You aren\'t Saints. You aren\'t Glass Court. What are you?',
    effectsOnEnter: { setFlags: ['hollow_child_contact'] },
    choices: [
      {
        id: 'say_just_surviving',
        text: '"I\'m trying to survive. Same as you."',
        nextNode: 'hollow_child_exchange',
        effects: { hollowChildren: 2 },
      },
      {
        id: 'show_mark_to_child',
        text: 'Show them the mark on your wrist.',
        nextNode: 'hollow_mark_revelation',
        requirements: { flags: ['examined_mark'] },
        effects: { hollowChildren: 3 },
      },
      {
        id: 'give_food_to_child',
        text: 'Give them some food without saying anything.',
        nextNode: 'hollow_child_exchange',
        requirements: { food: 1 },
        effects: { food: -1, hollowChildren: 5 },
        flavorText: 'Requires: 1 Food',
      },
      {
        id: 'ask_child_who_they_are',
        text: '"Who are you?" — let them define the terms.',
        nextNode: 'hollow_child_exchange',
        requirements: { charisma: 4 },
        effects: { hollowChildren: 1 },
        flavorText: 'Requires: Charisma 4 or higher',
      },
    ],
  },

  {
    id: 'hollow_child_exchange',
    chapter: 'Chapter 1',
    title: 'Collective Breath',
    location: 'Maintenance Tunnels — Sublevel 5',
    imageKey: 'dark_metro_hallway',
    text: 'The child evaluates your answer with the deliberate care of someone who cannot afford to be wrong. Then they turn and make a hand signal. The tunnel relaxes around you — as if a collective held breath releases, and the dark becomes less hostile.',
    effectsOnEnter: { hollowChildren: 3, morale: 1 },
    choices: [
      {
        id: 'ask_for_their_leader',
        text: '"Can you take me to whoever is in charge?"',
        nextNode: 'hollow_kira_finds_you',
        effects: { hollowChildren: 1 },
      },
      {
        id: 'ask_about_archive_child',
        text: '"What do you know about the door with the symbols?"',
        nextNode: 'hollow_mark_revelation',
      },
      {
        id: 'thank_and_leave',
        text: 'Thank them and move on. No obligations.',
        nextNode: 'tunnel_junction_inner',
        effects: { hollowChildren: 2 },
      },
    ],
  },

  {
    id: 'hollow_kira_finds_you',
    chapter: 'Chapter 1',
    title: 'She Was Already Watching',
    location: 'Maintenance Tunnels — Sublevel 5',
    imageKey: 'tunnel_camp',
    speaker: 'Kira',
    text: 'You don\'t have to go far. She finds you — Kira, moving through the tunnel dark like she was built for it, which you suspect she was.',
    dialogue: 'My scouts say you treated them like people. That\'s rarer than it sounds. I\'ve been watching your mark for an hour. It does something near the Archive corridor — a frequency our instruments register but can\'t measure. You might be exactly what you look like, which would be a first.',
    effectsOnEnter: { setFlags: ['met_kira', 'knows_archive_location', 'knows_archive_exists'], hollowChildren: 5 },
    choices: [
      {
        id: 'ask_kira_about_frequency',
        text: 'Ask about the frequency — what exactly did she measure?',
        nextNode: 'hollow_mark_revelation',
      },
      {
        id: 'offer_to_work_together_kira',
        text: 'Offer to work together.',
        nextNode: 'hollow_mission_given',
      },
      {
        id: 'ask_kira_for_archive_guide',
        text: '"Take me to the Archive door."',
        nextNode: 'archive_door',
        effects: { hollowChildren: 2, corruption: 1 },
      },
    ],
  },

  {
    id: 'hollow_mark_revelation',
    chapter: 'Chapter 1',
    title: 'Forty-Three',
    location: 'Hollow Children Sanctum',
    imageKey: 'tunnel_camp',
    speaker: 'Kira',
    text: 'She pulls out a salvaged instrument — pre-blackout, carefully modified. The needle moves when she holds it near your wrist.',
    dialogue: 'Forty-three instances of that mark in three months. All underground. All near pre-collapse infrastructure. Every single one of those people, when they came within twenty meters of the Archive door, caused it to resonate. You aren\'t alone in this. You\'re just the only one who made it this far south alive.',
    effectsOnEnter: { morale: -2, corruption: 1, setFlags: ['knows_others_have_mark', 'hollow_mark_data', 'met_kira', 'knows_archive_exists'], hollowChildren: 3 },
    choices: [
      {
        id: 'ask_what_happened_others',
        text: '"What happened to the others?"',
        nextNode: 'hollow_mission_given',
        effects: { morale: -1 },
      },
      {
        id: 'go_to_archive_after_revelation',
        text: '"Take me to the Archive door. Now."',
        nextNode: 'archive_door',
        effects: { corruption: 1 },
      },
    ],
  },

  {
    id: 'hollow_mission_given',
    chapter: 'Chapter 1',
    title: 'The Price of Passage',
    location: 'Hollow Children Sanctum',
    imageKey: 'tunnel_camp',
    speaker: 'Kira',
    text: 'She asks something in return — which is, you\'ve learned, how people who survive long enough actually operate.',
    dialogue: 'My people need three things: medicine for the sick corridor, a Saints patrol schedule, and — after you open the Archive — what\'s inside it. Get me those things and I\'ll make sure you have safe passage through every tunnel we control. That\'s a lot of tunnels.',
    effectsOnEnter: { setFlags: ['hollow_mission_active'], hollowChildren: 5, morale: 1 },
    choices: [
      {
        id: 'agree_all_three',
        text: 'Agree to all three conditions.',
        nextNode: 'tunnel_junction_inner',
        effects: { setFlags: ['hollow_mission_agreed'], hollowChildren: 5 },
      },
      {
        id: 'give_medicine_now',
        text: 'Give medicine now. Prove you\'re serious.',
        nextNode: 'tunnel_junction_inner',
        requirements: { medicine: 2 },
        effects: { medicine: -2, hollowChildren: 8, setFlags: ['hollow_medicine_given'] },
        flavorText: 'Requires: 2 Medicine',
      },
      {
        id: 'decline_hollow_mission',
        text: 'You can\'t make promises you might not keep.',
        nextNode: 'tunnel_junction_inner',
        effects: { hollowChildren: -2 },
      },
    ],
  },

  // ────────────────────────────────
  // SURFACE — TOO EARLY
  // ────────────────────────────────
  {
    id: 'surface_premature_attempt',
    chapter: 'Chapter 1',
    title: 'Desperation Metric',
    location: 'Collapsed Stairwell — Emergency Exit 9-B',
    imageKey: 'collapsed_tunnel',
    text: 'You don\'t have the strength or the agility. But you have desperation, which has carried people further than either. It takes forty minutes of cuts and effort and blood before you pull yourself through — and the grey light above burns your dark-adjusted eyes like something punitive.',
    effectsOnEnter: { health: -15, hunger: -2, thirst: -2, morale: 1, setFlags: ['surface_premature', 'reached_surface'] },
    choices: [
      {
        id: 'move_clear_of_exit',
        text: 'Get clear of the exit before someone sees you emerge.',
        nextNode: 'surface_mark_blazes',
      },
      {
        id: 'rest_at_exit',
        text: 'Rest at the top. You need a moment to breathe.',
        nextNode: 'surface_ash_storm_begins',
        effects: { health: 5, hunger: -1, thirst: -1 },
      },
    ],
  },

  {
    id: 'surface_mark_blazes',
    chapter: 'Chapter 1',
    title: 'Exposed',
    location: 'City Surface — Ruined District',
    imageKey: 'surface_ruins',
    speaker: 'Iron Saints Officer',
    text: 'You\'re thirty meters from the exit when the mark blazes — no warning, no buildup. The sigil burns white-violet against your sleeve, visible from half a block. On the street to the north: a Saints patrol. Four soldiers, torches, rifles. They stop. They look at your wrist. Religious conviction is its own kind of ruthlessness.',
    dialogue: 'Sinner\'s Brand. Active manifestation. This is not a warning — this is an execution order.',
    effectsOnEnter: { ironSaints: -10, setFlags: ['mark_seen_on_surface'] },
    choices: [
      {
        id: 'run_from_saints_surface',
        text: 'Run for the nearest collapse gap. Don\'t look back.',
        nextNode: 'saints_escape',
        requirements: { agility: 8 },
        effects: { health: -15, ironSaints: -5 },
        flavorText: 'Requires: Agility 8 or higher',
      },
      {
        id: 'fight_saints_surface',
        text: 'Fight your way back to the metro entrance.',
        nextNode: 'saints_escape',
        requirements: { strength: 8, ammo: 3 },
        effects: { health: -20, ammo: -3, ironSaints: -10 },
        flavorText: 'Requires: Strength 8 + 3 Ammo',
      },
      {
        id: 'exiled_soldier_buys_time',
        text: '[Exiled Soldier] Use their own protocols — delay them long enough to run.',
        nextNode: 'saints_escape',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { health: -10, ironSaints: 3 },
        isHidden: true,
      },
      {
        id: 'mark_force_escape',
        text: 'Use the mark. Let it do something — anything.',
        nextNode: 'saints_escape',
        requirements: { corruption: 5 },
        effects: { corruption: 3, health: -10, morale: -2, setFlags: ['used_mark_offensively'] },
        flavorText: 'Requires: Corruption 5 or higher',
      },
      {
        id: 'submit_to_saints_surface',
        text: 'You can\'t run. Submit.',
        nextNode: 'ending_saints_surface_execution',
        effects: { morale: -4 },
      },
    ],
  },

  {
    id: 'surface_ash_storm_begins',
    chapter: 'Chapter 1',
    title: 'The Eastern Clouds',
    location: 'City Surface — Open Ruins',
    imageKey: 'surface_ruins',
    text: 'The ash clouds move faster than weather should. The grey thickens to charcoal, then to something past charcoal. Inside it — micro-glass from the city\'s collapse still suspended two years later. Your lungs register the first particles as a tightness that will become something worse. You have no mask. You have no shelter within reach.',
    effectsOnEnter: { health: -10, hunger: -2, thirst: -3 },
    choices: [
      {
        id: 'sprint_for_shelter',
        text: 'Find any shelter — sprint before the storm thickens.',
        nextNode: 'tunnel_junction_inner',
        requirements: { agility: 5 },
        effects: { health: -15, morale: 1, setFlags: ['survived_ash_storm'] },
        flavorText: 'Requires: Agility 5 or higher',
      },
      {
        id: 'cloth_mask_attempt',
        text: 'Cover your face with cloth and move.',
        nextNode: 'tunnel_junction_inner',
        effects: { health: -15, morale: -1, setFlags: ['survived_ash_storm'] },
      },
      {
        id: 'too_far_in_ash',
        text: 'The storm closes before you can move.',
        nextNode: 'ending_ash_suffocation',
      },
    ],
  },

  // ────────────────────────────────
  // SECRET ARCHIVE PASSAGE
  // ────────────────────────────────
  {
    id: 'secret_passage_found',
    chapter: 'Chapter 1',
    title: 'Wrong Mortar',
    location: 'Maintenance Tunnels — Sublevel 5',
    imageKey: 'dark_metro_hallway',
    text: 'The brickwork doesn\'t match. Newer mortar, different stone sourcing, and the seal hasn\'t fully cured — three months old at most. Someone built this wall deliberately and recently. On the bottom corner, pressed into it before it dried: a symbol. The same one on your wrist. Smaller. Precise. Like a signature.',
    effectsOnEnter: { setFlags: ['found_secret_passage'], lastArchive: 3 },
    choices: [
      {
        id: 'force_passage_open',
        text: 'Force it open. The mortar is still soft.',
        nextNode: 'archive_antechamber',
        requirements: { strength: 6 },
        effects: { health: -5 },
        flavorText: 'Requires: Strength 6 or higher',
        diceCheck: {
          stat: 'strength',
          difficulty: 11,
          diceType: 'd20',
          successNode: 'archive_antechamber',
          failureNode: 'dice_passage_force_fail',
          criticalSuccessNode: 'archive_antechamber',
          criticalSuccessEffects: { intelligence: 1, scrap: 1, lastArchive: 3 },
          criticalFailureNode: 'dice_passage_force_crit_fail',
          failureEffects: { health: -10 },
          criticalFailureEffects: { health: -15, corruption: 2 },
        },
      },
      {
        id: 'chisel_with_scrap',
        text: 'Use scrap metal to work through the seal carefully.',
        nextNode: 'archive_antechamber',
        requirements: { scrap: 2 },
        effects: { scrap: -2 },
        flavorText: 'Requires: 2 Scrap',
      },
      {
        id: 'relic_hunter_reads_mortar',
        text: '[Relic Hunter] The cure rate is wrong by approximately three months. Someone is maintaining this.',
        nextNode: 'archive_antechamber',
        requirements: { classes: ['relic_hunter'] },
        effects: { lastArchive: 5, morale: 1 },
        isHidden: true,
      },
      {
        id: 'scholar_reads_symbol',
        text: '[Forgotten Scholar] You\'ve seen this symbol in pre-collapse texts. You know what it means.',
        nextNode: 'archive_antechamber',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { lastArchive: 8, intelligence: 1, setFlags: ['scholar_knows_symbol'] },
        isHidden: true,
      },
      {
        id: 'mark_passage_come_back',
        text: 'Mark the location and come back when you have tools.',
        nextNode: 'tunnel_junction_inner',
        effects: { setFlags: ['marked_secret_passage'] },
      },
    ],
  },

  {
    id: 'archive_antechamber',
    chapter: 'Chapter 1',
    title: 'Before the Door',
    location: 'Archive Antechamber — Sublevel 6',
    imageKey: 'last_archive_door',
    text: 'A small stone room that predates the metro by what looks like a century. Not built — carved. The shelves are not empty. Vacuum-sealed canisters hold pre-collapse documents, intact. Data cores in insulated cases. A hand-drawn map of the city showing the Archive\'s true extent beneath it. It is much larger than anyone could have guessed.',
    effectsOnEnter: { lastArchive: 10, morale: 3, setFlags: ['found_archive_antechamber', 'knows_archive_extent'] },
    choices: [
      {
        id: 'study_antechamber_docs',
        text: 'Study the documents. Understand what you\'re walking into.',
        nextNode: 'archive_antechamber_study',
      },
      {
        id: 'loot_antechamber',
        text: 'Take what you can carry and move on.',
        nextNode: 'archive_antechamber_loot',
      },
      {
        id: 'check_far_door',
        text: 'Check the door at the far end of the room.',
        nextNode: 'false_archive_door',
      },
      {
        id: 'mark_guides_to_real_door',
        text: 'The mark pulls toward something past this room. Follow it.',
        nextNode: 'archive_door',
        effects: { corruption: 1 },
      },
    ],
  },

  {
    id: 'archive_antechamber_study',
    chapter: 'Chapter 1',
    title: 'What It Actually Is',
    location: 'Archive Antechamber — Sublevel 6',
    imageKey: 'last_archive_door',
    text: 'The documents are fragile but legible. What you read changes the shape of everything. The Archive wasn\'t built by any government or faction. It predates them by three centuries. It was built by people who knew the blackout was coming — not as prophecy, but as engineering. The mark isn\'t a brand or a punishment or a weapon. It\'s a key, grown into whoever is meant to carry it. Whoever was judged ready.',
    effectsOnEnter: { intelligence: 1, lastArchive: 15, corruption: 1, morale: -2, setFlags: ['understands_mark_true_nature', 'studied_archive_docs'] },
    choices: [
      {
        id: 'go_to_archive_after_study',
        text: '"I need to get to the door."',
        nextNode: 'archive_door',
        effects: { morale: 2 },
      },
      {
        id: 'share_with_mira_study',
        text: 'Tell Mira what you\'ve learned. She deserves to know.',
        nextNode: 'archive_door',
        requirements: { flags: ['mira_joins_party'] },
        effects: { miraTrust: 2, morale: 2 },
        flavorText: 'Requires: Mira in party',
      },
      {
        id: 'share_with_kira_study',
        text: 'Send word to Kira. This is what she\'s been looking for.',
        nextNode: 'archive_door',
        requirements: { flags: ['met_kira'] },
        effects: { hollowChildren: 8, morale: 1 },
        flavorText: 'Requires: Met Kira',
      },
    ],
  },

  {
    id: 'archive_antechamber_loot',
    chapter: 'Chapter 1',
    title: 'Weight and Worth',
    location: 'Archive Antechamber — Sublevel 6',
    imageKey: 'last_archive_door',
    text: 'You take three data cores, two sealed document canisters, and the city map. It\'s heavy. It\'s worth it — assuming you make it somewhere safe enough to use any of it, which is the assumption that has killed more people in this city than anything else.',
    effectsOnEnter: { scrap: 2, relics: 2, lastArchive: 5, setFlags: ['looted_antechamber'] },
    choices: [
      {
        id: 'head_to_archive_door_loot',
        text: 'Head to the main Archive door.',
        nextNode: 'archive_door',
      },
      {
        id: 'actually_read_first',
        text: 'That felt wrong. You should understand what you\'re taking.',
        nextNode: 'archive_antechamber_study',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'false_archive_door',
    chapter: 'Chapter 1',
    title: 'The Other Door',
    location: 'Archive Antechamber — False Corridor',
    imageKey: 'dark_metro_hallway',
    speaker: 'Glass Court Operative',
    text: 'The door at the far end opens from the outside before you reach it. Someone was already waiting. Glass Court: three operatives in grey, faces covered, methodical and professional. They\'ve been here longer than you have. They\'re here for the mark, which is to say they\'re here for you.',
    dialogue: 'Voluntary extraction is preferred. The mark remains most useful when the host is intact. Please cooperate.',
    effectsOnEnter: { glassCourt: -10, setFlags: ['encountered_glass_court'], morale: -2 },
    choices: [
      {
        id: 'fight_glass_court',
        text: 'Fight your way back to the antechamber.',
        nextNode: 'glass_court_ambush',
        requirements: { strength: 6, ammo: 2 },
        effects: { ammo: -2, health: -15 },
        flavorText: 'Requires: Strength 6 + 2 Ammo',
      },
      {
        id: 'negotiate_glass_court',
        text: 'Talk your way out. They want the mark, not a fight.',
        nextNode: 'glass_court_ambush',
        requirements: { charisma: 7 },
        effects: { morale: 1, glassCourt: 5 },
        flavorText: 'Requires: Charisma 7 or higher',
        diceCheck: {
          stat: 'charisma',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'glass_court_ambush',
          failureNode: 'dice_glass_court_negotiate_fail',
          criticalSuccessNode: 'glass_court_ambush',
          criticalSuccessEffects: { glassCourt: 10, charisma: 1, morale: 3 },
          criticalFailureNode: 'dice_glass_court_negotiate_crit_fail',
          failureEffects: { glassCourt: -5, morale: -3 },
          criticalFailureEffects: { glassCourt: -15, morale: -8, health: -15 },
        },
      },
      {
        id: 'run_back_antechamber',
        text: 'Back through the antechamber — now.',
        nextNode: 'glass_court_ambush',
        requirements: { agility: 6 },
        effects: { health: -10 },
        flavorText: 'Requires: Agility 6 or higher',
      },
      {
        id: 'submit_to_glass_court',
        text: 'They have you. Submit.',
        nextNode: 'ending_glass_court_prisoner',
        effects: { morale: -3 },
      },
    ],
  },

  {
    id: 'glass_court_ambush',
    chapter: 'Chapter 1',
    title: 'Clear',
    location: 'Archive Antechamber — False Corridor',
    imageKey: 'dark_metro_hallway',
    text: 'You move fast, or you talk fast, or you hit hard — and somehow you get clear of them. The Glass Court doesn\'t pursue unnecessarily. They calculate. The operative who spoke watches you go with the patience of someone who knows there\'s more than one approach to a problem. They\'ll try again.',
    effectsOnEnter: { glassCourt: -5, morale: 2, health: -10, setFlags: ['escaped_glass_court'] },
    choices: [
      {
        id: 'go_to_archive_after_court',
        text: 'Get to the Archive door before they regroup.',
        nextNode: 'archive_door',
        effects: { morale: 1 },
      },
      {
        id: 'retreat_to_tunnels_after_court',
        text: 'Get clear of this level first.',
        nextNode: 'tunnel_junction_inner',
      },
    ],
  },

  // ────────────────────────────────
  // THE MARK — FIRST ACTIVATION
  // ────────────────────────────────
  {
    id: 'mark_spontaneous_pulse',
    chapter: 'Chapter 1',
    title: 'The Mark Decides',
    location: 'Metro Concourse',
    imageKey: 'ruined_metro_station',
    text: 'It happens without warning. The mark blazes violet — not painful, but urgent, like a hand pressed flat against the inside of your chest. Around you, the emergency lights stutter and shift frequency. The air smells like ozone before lightning. Your pulse is too loud. The mark is matching it.',
    effectsOnEnter: { corruption: 1, setFlags: ['mark_pulsed_spontaneously'] },
    choices: [
      {
        id: 'suppress_the_pulse',
        text: 'Push it down. Force it quiet. You are not this.',
        nextNode: 'mark_pulse_choice',
        effects: { morale: -2 },
      },
      {
        id: 'let_the_pulse_happen',
        text: 'Let it happen. You need to see what it shows you.',
        nextNode: 'mark_vision_fragments',
        effects: { corruption: 1 },
      },
      {
        id: 'medic_analyzes_pulse',
        text: '[Medic] Treat this like a patient presenting symptoms. Catalog, don\'t panic.',
        nextNode: 'mark_medical_analysis',
        requirements: { classes: ['medic'] },
        isHidden: true,
      },
      {
        id: 'underground_medic_analyzes',
        text: '[Underground Medic] You\'ve seen stranger things than this in the tunnels.',
        nextNode: 'mark_medical_analysis',
        requirements: { backgrounds: ['underground_medic'] },
        isHidden: true,
      },
      {
        id: 'esper_opens_to_it',
        text: '[Esper] You were waiting for this. Open yourself completely.',
        nextNode: 'mark_esper_resonance',
        requirements: { classes: ['esper'] },
        effects: { corruption: 2 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'mark_pulse_choice',
    chapter: 'Chapter 1',
    title: 'Quiet Again',
    location: 'Metro Concourse',
    imageKey: 'ruined_metro_station',
    text: 'You hold the mark against the cold concrete wall. The pulse subsides — not gone, just receding. Like something large submerging. The lights stabilize. Your hands stop shaking. Whatever it wanted to show you, it has decided to be patient about.',
    effectsOnEnter: { morale: -1, setFlags: ['examined_mark'] },
    choices: [
      {
        id: 'go_back_to_concourse',
        text: 'Go back to what you were doing.',
        nextNode: 'station_junction',
      },
      {
        id: 'let_it_happen_after_all',
        text: 'Actually — let it happen. You need to know.',
        nextNode: 'mark_vision_fragments',
        effects: { corruption: 1 },
      },
    ],
  },

  {
    id: 'mark_vision_fragments',
    chapter: 'Chapter 1',
    title: 'Fragments',
    location: 'Inside the Mark',
    imageKey: 'last_archive_door',
    speaker: 'The Mark',
    text: 'Not images — impressions. The Archive door, older than any structure in this city. A room below it, vast and lit by something that isn\'t electricity. A voice that has no sound, saying something you have no language for. And time — enormous, patient time — the mark has been waiting for someone with the right combination of fear and resolution. It thinks you might be it.',
    effectsOnEnter: { corruption: 2, morale: -1, lastArchive: 5, setFlags: ['had_vision_fragments', 'knows_archive_exists', 'examined_mark'] },
    choices: [
      {
        id: 'ground_yourself_vision',
        text: 'Ground yourself. Come back to the present.',
        nextNode: 'mark_first_control',
      },
      {
        id: 'go_deeper_vision',
        text: 'Go deeper. Show me more.',
        nextNode: 'mark_esper_resonance',
        requirements: { corruption: 4 },
        effects: { corruption: 1 },
        flavorText: 'Requires: Corruption 4 or higher',
      },
      {
        id: 'relic_hunter_catalogs',
        text: '[Relic Hunter] Catalog the information methodically. Every detail counts.',
        nextNode: 'mark_first_control',
        requirements: { classes: ['relic_hunter'] },
        effects: { lastArchive: 8, intelligence: 1 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'mark_medical_analysis',
    chapter: 'Chapter 1',
    title: 'Clinical Distance',
    location: 'Metro Concourse',
    imageKey: 'ruined_metro_station',
    text: 'You treat it like a patient. The mark pulses with your heartbeat — elevated. The glow correlates with stress response. The warmth corresponds with proximity to specific infrastructure. You\'re not haunted. You\'re interfaced. Something biological and technological at once, and the distinction stopped mattering a long time ago.',
    effectsOnEnter: { intelligence: 1, lastArchive: 5, corruption: -1, setFlags: ['clinically_analyzed_mark', 'understands_mark_function', 'examined_mark'] },
    choices: [
      {
        id: 'document_findings',
        text: 'Document your findings. This information is worth something.',
        nextNode: 'mark_first_control',
        effects: { setFlags: ['has_mark_analysis'] },
      },
      {
        id: 'share_with_mira_analysis',
        text: 'Tell Mira what you\'ve found. She\'ll want to know.',
        nextNode: 'mark_first_control',
        requirements: { flags: ['mira_joins_party'] },
        effects: { miraTrust: 2, morale: 1 },
        flavorText: 'Requires: Mira in party',
      },
    ],
  },

  {
    id: 'mark_esper_resonance',
    chapter: 'Chapter 1',
    title: 'The Full Signal',
    location: 'Inside the Mark',
    imageKey: 'last_archive_door',
    speaker: 'The Mark',
    text: 'You don\'t just see fragments — you hear the complete signal. A frequency the mark has been broadcasting since it found you. Somewhere beneath three levels of concrete, a door unlocks itself, then locks again. Testing. It\'s testing whether you can hold this much of it without coming apart. The question is almost academic at this point.',
    dialogue: 'You are not the first. You will not be the last. You are the one who is here now.',
    effectsOnEnter: { corruption: 3, intelligence: 1, lastArchive: 10, morale: -2, setFlags: ['esper_mark_resonance', 'knows_archive_is_aware', 'knows_archive_exists', 'knows_archive_location', 'examined_mark'] },
    choices: [
      {
        id: 'pull_back_from_resonance',
        text: 'Pull back before it takes more.',
        nextNode: 'mark_first_control',
        effects: { health: -10 },
      },
      {
        id: 'hold_on_for_more',
        text: 'Hold it. Keep going. You can take it.',
        nextNode: 'mark_burns_bad',
        requirements: { corruption: 7 },
        flavorText: 'Requires: Corruption 7 or higher',
      },
      {
        id: 'trust_the_signal',
        text: 'Let the signal complete. You trust what\'s at the other end.',
        nextNode: 'mark_first_control',
        effects: { corruption: 1, morale: 2 },
      },
    ],
  },

  {
    id: 'mark_first_control',
    chapter: 'Chapter 1',
    title: 'Still Standing',
    location: 'Metro Concourse',
    imageKey: 'ruined_metro_station',
    text: 'The pulse fades to something manageable — not gone, not quiet, but controlled. You controlled it. Or it let you think you did. Either way you\'re still standing and the lights are back to their regular cycle, which is the most you can ask for right now.',
    effectsOnEnter: { morale: 2, setFlags: ['first_mark_control', 'examined_mark'] },
    choices: [
      {
        id: 'return_to_junction_after_mark',
        text: '"The Archive. That\'s where this leads."',
        nextNode: 'station_junction',
      },
    ],
  },

  {
    id: 'mark_burns_bad',
    chapter: 'Chapter 1',
    title: 'Overload',
    location: 'Metro Concourse',
    imageKey: 'ruined_metro_station',
    text: 'The signal tries to complete itself through you. You aren\'t the conduit it needed — not yet, not enough. The mark goes from violet to white to something past visible light. Emergency fixtures burst in sequence down the corridor as you collapse. When you come back, you\'re on the floor. The mark has grown — now reaching past your wrist, tracing the veins of your forearm in faint luminescent lines.',
    effectsOnEnter: { health: -15, corruption: 4, morale: -3, setFlags: ['mark_expanded', 'mark_uncontrolled', 'examined_mark'] },
    choices: [
      {
        id: 'get_up_and_survive',
        text: 'Get up. Survive. That\'s all there is.',
        nextNode: 'station_junction',
        effects: { morale: 1 },
      },
      {
        id: 'mira_helps_mark_burn',
        text: 'Let Mira help you up.',
        nextNode: 'station_junction',
        requirements: { flags: ['mira_joins_party'] },
        effects: { health: 15, miraTrust: 1 },
        flavorText: 'Requires: Mira in party',
      },
      {
        id: 'cain_helps_mark_burn',
        text: 'Cain pulls you to your feet without a word.',
        nextNode: 'station_junction',
        requirements: { flags: ['cain_joins_party'] },
        effects: { morale: 2, cainTrust: 1 },
        flavorText: 'Requires: Cain in party',
      },
    ],
  },

  // ────────────────────────────────
  // RESOURCE PRESSURE
  // ────────────────────────────────
  {
    id: 'station_water_cache',
    chapter: 'Chapter 1',
    title: 'Emergency Municipal',
    location: 'Metro Station — Utility Room',
    imageKey: 'broken_vending_area',
    text: 'A utility room off the main concourse — locked with a standard maintenance key, jammed. Inside: pipes, valves, and a sealed emergency water drum, municipal-grade, standard-issue for station staff. One hundred liters. Most of it still good. You don\'t know how to feel things as simple as relief anymore, so you just fill your containers.',
    effectsOnEnter: { water: 5, thirst: 3, morale: 3, setFlags: ['found_water_cache'] },
    choices: [
      {
        id: 'take_water_and_go',
        text: 'Take what you can carry and tell no one.',
        nextNode: 'station_junction',
        effects: { water: 5 },
      },
      {
        id: 'share_cache_location',
        text: 'Mark the location for others. There\'s enough.',
        nextNode: 'station_junction',
        effects: { water: 5, hollowChildren: 2, setFlags: ['shared_cache_location'] },
      },
      {
        id: 'bring_mira_to_water',
        text: 'Bring Mira here. She\'ll know how to ration it properly.',
        nextNode: 'station_junction',
        requirements: { flags: ['mira_joins_party'] },
        effects: { water: 5, miraTrust: 1 },
        flavorText: 'Requires: Mira in party',
      },
    ],
  },

  {
    id: 'scavenger_cache_discovery',
    chapter: 'Chapter 1',
    title: 'Someone\'s Rainy Day',
    location: 'Maintenance Tunnels — Niche 7',
    imageKey: 'dark_metro_hallway',
    text: 'A hollowed-out maintenance niche holds what the scavengers left behind when they moved on — or were moved. Canned food. Water purification tablets. Basic medicine in unmarked packets. A box of ammunition in good condition, untouched. Whoever stashed this here is either dead or running. Their rainy day is yours now.',
    effectsOnEnter: { food: 4, water: 3, medicine: 2, ammo: 3, scrap: 2, morale: 2, setFlags: ['found_scavenger_cache'] },
    choices: [
      {
        id: 'take_everything_cache',
        text: 'Take everything and go.',
        nextNode: 'tunnel_junction_inner',
      },
      {
        id: 'leave_food_for_others',
        text: 'Leave the food for whoever comes next. You can manage.',
        nextNode: 'tunnel_junction_inner',
        effects: { food: 2, hollowChildren: 3, morale: 1 },
      },
      {
        id: 'courier_knows_this_cache',
        text: '[Black Market Courier] You know this cache system. Someone set up a drop. You know who.',
        nextNode: 'tunnel_junction_inner',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { setFlags: ['knows_cache_network'], lastArchive: 3, morale: 1 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'medicine_critical_moment',
    chapter: 'Chapter 1',
    title: 'The Count',
    location: 'Metro Concourse — East Wing',
    imageKey: 'tunnel_camp',
    speaker: 'Mira',
    text: 'Mira is working by lantern light — counting what\'s left. She doesn\'t see you watching. The count takes ten seconds. Then she closes the case with a deliberateness that tells you everything about what she found inside it.',
    dialogue: 'We have medicine for three serious wounds. After that we\'re making decisions with nothing but pressure and prayer. I thought you should know.',
    effectsOnEnter: { setFlags: ['mira_medicine_low'], morale: -1 },
    choices: [
      {
        id: 'give_mira_medicine',
        text: 'Give her your own stores. You\'ll find more.',
        nextNode: 'station_junction',
        requirements: { medicine: 2 },
        effects: { medicine: -2, miraTrust: 3, morale: 1 },
        flavorText: 'Requires: 2 Medicine',
      },
      {
        id: 'promise_to_find_more',
        text: '"We\'ll find more. I know where to look."',
        nextNode: 'station_junction',
        effects: { miraTrust: 1 },
      },
      {
        id: 'we_will_manage_mira',
        text: '"We\'ll manage." — and leave it at that.',
        nextNode: 'station_junction',
      },
    ],
  },

  // ────────────────────────────────
  // ENDINGS
  // ────────────────────────────────
  {
    id: 'ending_starvation',
    chapter: 'Chapter 1',
    title: 'Dust and Silence',
    location: 'Metro Corridor — Unknown',
    imageKey: 'dark_metro_hallway',
    text: 'The hunger becomes everything. Your body makes the decision your mind refused. You collapse in the corridor, emergency lights cycling red. The mark dims to nothing. The tunnels are patient — they wait for everyone, eventually.',
    effectsOnEnter: { setFlags: ['game_complete'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_starvation',
  },

  {
    id: 'ending_metro_death',
    chapter: 'Chapter 1',
    title: 'Claimed by the Dark',
    location: 'Metro Corridor — Unknown',
    imageKey: 'collapsed_tunnel',
    text: 'Whether by soldier or collapse or the thing that moves in the deepest tunnels — the metro claims another soul. The mark dims. The city keeps burning without you.',
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_metro_death',
  },

  {
    id: 'ending_mira_sacrifice',
    chapter: 'Chapter 1',
    title: 'The Weight She Carried',
    location: 'The Last Archive — Threshold',
    imageKey: 'last_archive_door',
    speaker: 'Mira',
    text: 'She pushes you through the Archive door and holds the threshold as the symbols seal behind you.',
    dialogue: 'I always knew this is how it would end. Go. Find out what it means. Make it worth it.',
    effectsOnEnter: { setFlags: ['mira_sacrificed'] },
    choices: [],
    isEnding: true,
    endingType: 'sacrifice',
    endingId: 'ending_mira_sacrifice',
  },

  {
    id: 'ending_cain_betrayal',
    chapter: 'Chapter 1',
    title: 'The Oldest Transaction',
    location: 'Iron Saints Checkpoint',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Cain',
    text: 'He doesn\'t look away when they take you. That\'s the worst part.',
    dialogue: 'I\'m sorry. The Saints offered things I couldn\'t turn down. The mark makes you valuable. I hope you understand.',
    effectsOnEnter: { setFlags: ['cain_betrayed'] },
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_cain_betrayal',
  },

  {
    id: 'ending_relic_awakening',
    chapter: 'Chapter 1',
    title: 'Signal Sent',
    location: 'Maintenance Sublevel — Control Chamber',
    imageKey: 'last_archive_door',
    text: 'The corruption takes you — not as death, but as transformation. The mark spreads across your arm, your chest. You become the signal the machine was always meant to send. Somewhere beneath the city, the Archive door opens on its own. And the thing that caused the blackout recognizes one of its own.',
    effectsOnEnter: { setFlags: ['became_signal'] },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_relic_awakening',
  },

  {
    id: 'ending_buried_tunnel',
    chapter: 'Chapter 1',
    title: 'What the Tunnel Keeps',
    location: 'Tunnel 7-West — Collapse Zone',
    imageKey: 'collapsed_tunnel',
    text: 'The ceiling comes down in a single breath. Rock and twisted steel and perfect darkness, all at once. The mark blazes white-hot for three seconds — as if it\'s trying to signal somewhere, or say goodbye to something that was listening. Then the weight presses out all light, all sound, all the things you were going to do next. The tunnels keep everything they take. They\'ve kept much more than you.',
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_buried_tunnel',
  },

  {
    id: 'ending_mira_abandoned',
    chapter: 'Chapter 1',
    title: 'the unmistakable weight',
    location: 'Maintenance Level — Sealed Room',
    imageKey: 'dark_metro_hallway',
    text: 'You hear the sounds through the sealed door and understand, too late, what it costs to hesitate. By the time you find another way through, the maintenance room is quiet in the way rooms get quiet after. Her medical bag is on the floor. Her hands are folded. She arranged it herself, in her last useful moment — thinking of order, thinking of something past herself. You leave carrying the unmistakable weight of a choice that has no undoing. The Archive is still down there. The mark still pulses. Neither of them care about what you left behind in this room.',
    effectsOnEnter: { setFlags: ['mira_died_abandoned'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_mira_abandoned',
  },

  {
    id: 'ending_cain_dies_alone',
    chapter: 'Chapter 1',
    title: 'The Map He Left',
    location: 'Metro Security Room — Inner Office',
    imageKey: 'tunnel_camp',
    text: 'You don\'t go back. For three days you tell yourself it\'s pragmatic — you couldn\'t spare the medicine, you couldn\'t afford the complication. Somewhere in the station, a man with a gunshot wound counts his remaining pills and does the math he already knows the answer to. When you pass the security room door on your way to the Archive, the chain lock is open. Inside: a bedroll, empty blister packs, and a map left on the table with your name written at the top in careful block letters. He was thinking of someone else at the end. That\'s the part you\'ll carry.',
    effectsOnEnter: { setFlags: ['game_complete', 'cain_died_alone'] },
    choices: [],
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_cain_dies_alone',
  },

  {
    id: 'ending_saints_surface_execution',
    chapter: 'Chapter 1',
    title: 'Sinner Protocol',
    location: 'City Surface — Iron Saints Hold Point',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Iron Saints Inquisitor',
    text: 'They don\'t waste ammunition on active manifestations — Inquisition protocol is more deliberate than that. The last thing you see is the mark dim on your wrist, as if whatever gave it to you has already moved on to find the next candidate. The city keeps burning above. The Archive stays sealed another day. Somewhere in the tunnels below, the door pulses once and goes quiet.',
    dialogue: 'The Sinner\'s Mark is extinguished. Record: Station 9-B, civilian, category one. May their next life serve the Order better.',
    effectsOnEnter: { setFlags: ['died_to_saints'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_saints_surface_execution',
  },

  {
    id: 'ending_ash_suffocation',
    chapter: 'Chapter 1',
    title: 'Ash and Quiet',
    location: 'City Surface — Open Ruins',
    imageKey: 'surface_ruins',
    text: 'The ash fills your chest before the pain does. A medical text once said three minutes — that\'s how long it takes. You spend the time thinking about the Archive door, the mark, the thing you were supposed to reach. The particular cruelty of dying in the open after surviving everything underground. The city above doesn\'t register your absence. It breathes its ash and keeps being ruined, as it has been since the night the lights went out and something below the streets woke up and stretched.',
    effectsOnEnter: { setFlags: ['died_to_ash'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ash_suffocation',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CHAPTER 2 — THE SURFACE DOES NOT FORGIVE
  // ════════════════════════════════════════════════════════════════════════════

  // ────────────────────────────────
  // OPENING — SURFACE EMERGENCE
  // ────────────────────────────────

];
