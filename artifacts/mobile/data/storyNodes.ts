import type { StoryNode } from './types';

// ─── HOW TO ADD NEW STORY NODES ────────────────────────────────────────────
// 1. Create a new StoryNode object following the StoryNode interface in types.ts
// 2. Give it a unique `id` string
// 3. Set `chapter`, `title`, `location`, `imageKey` (see constants/images.ts)
// 4. Write `text` (narration) and optionally `dialogue` (spoken words)
// 5. Add `effectsOnEnter` if entering the node should change stats/inventory
// 6. Add `choices` array — each choice needs `id`, `text`, `nextNode`
// 7. Use `requirements` to lock choices behind stats, flags, class, background
// 8. Use `endingTrigger` on a choice to potentially trigger an ending
// 9. For actual ending nodes, set `isEnding: true` and `endingType`
// ──────────────────────────────────────────────────────────────────────────

export const STORY_NODES: StoryNode[] = [
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
    text: 'The central concourse opens around you. To the east — a faded medical cross, a dim warm light. To the north — a heavy security door, barricaded from inside. Ahead — the maintenance tunnels descend into darkness. Above — a collapsed stairwell, and beyond it, the faintest grey of surface light.',
    effectsOnEnter: { hunger: -1, thirst: -1 },
    choices: [
      {
        id: 'go_east_clinic',
        text: 'Head to the clinic booth — east wing.',
        nextNode: 'find_mira_clinic',
        requirements: { blockedFlags: ['met_mira'] },
      },
      {
        id: 'talk_to_mira',
        text: 'Talk to Mira again.',
        nextNode: 'mira_secret_hint',
        requirements: { flags: ['met_mira'], blockedFlags: ['talked_mira_2', 'mira_joins_party'] },
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
        effects: { health: -20, cainTrust: -3, setFlags: ['fought_cain'] },
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
        requirements: { flags: ['knows_archive_exists'] },
        effects: { corruption: 1 },
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
    effectsOnEnter: { corruption: 1, setFlags: ['found_relic_machine'] },
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
    effectsOnEnter: { corruption: 1, morale: 2, setFlags: ['found_archive_door'] },
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
    choices: [],
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
    effectsOnEnter: {},
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
    imageKey: 'examine_mark',
    text: 'The corruption takes you — not as death, but as transformation. The mark spreads across your arm, your chest. You become the signal the machine was always meant to send. Somewhere beneath the city, the Archive door opens on its own. And the thing that caused the blackout recognizes one of its own.',
    effectsOnEnter: { setFlags: ['became_signal'] },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_relic_awakening',
  },
];

export function getNodeById(id: string): StoryNode | undefined {
  return STORY_NODES.find((n) => n.id === id);
}

export function getStartNodeId(): string {
  return 'chapter1_start';
}
