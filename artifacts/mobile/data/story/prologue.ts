import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  PROLOGUE — THE BLACKOUT
//
//  Three years before the main story. The player experiences the night the
//  city-wide blackout occurred — the violet pulse, the stampede, the moment
//  the Archive door unsealed itself for the first time in three centuries.
//  A series of vignettes, one per playable background, each ending with the
//  player underground and marked. The prologue always advances to Chapter 1.
// ══════════════════════════════════════════════════════════════════════════════

export const PROLOGUE_NODES: StoryNode[] = [
  // ── ADD NODES BELOW THIS LINE ──────────────────────────────────────────────
  {
    id: 'prologue_start',
    chapter: 'Prologue',
    title: 'The Night the City Stopped',
    location: 'Metro Central Concourse — Three Years Ago',
    imageKey: 'dark_metro_hallway',
    speaker: 'Narrator',
    text: 'A high-frequency hum shivered through the concrete floor, so intense your dental fillings ached. Overhead, the halogen strips turned violently violet, flickered twice, and died. In the utter blackness that followed, the screams began. Where were you when the world collapsed into the dark?',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_choice_stampede',
        text: 'Trapped in the lower concourse as the panicked crowds rushed the gates (Wasteland Orphan / Black Market Courier / Underground Medic)',
        nextNode: 'prologue_metro_stampede',
      },
      {
        id: 'prologue_choice_saints',
        text: 'On perimeter patrol at the Iron Saints northern garrison checkpoint (Exiled Soldier / Fallen Noble)',
        nextNode: 'prologue_saints_soldier',
      },
      {
        id: 'prologue_choice_scholar',
        text: 'In the restricted sub-level archives monitoring the sealed containment doors (Forgotten Scholar / Runaway Experiment)',
        nextNode: 'prologue_scholar_basement',
      },
    ],
  },

  // ── Vignette 1: The Metro Line 9 Stampede (Wasteland Orphan) ───────────────
  {
    id: 'prologue_metro_stampede',
    chapter: 'Prologue',
    title: 'The Metro Line 9 Stampede',
    location: 'Lower Metro Level 3',
    imageKey: 'collapsed_tunnel',
    speaker: 'Narrator',
    text: 'Bodies surged against turnstiles like floodwater hitting a broken levy. Iron barriers groaning under pressure buckled outward. Through the dust and blinding red emergency strobes, a small child tripped beneath a fallen steel gate, directly in the path of the oncoming mob.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'v1_choice_a',
        text: 'Pull the trapped child beneath the collapsed metro turnstile',
        nextNode: 'prologue_stampede_resolve',
        effects: {
          morale: 10,
          food: -1,
          setFlags: ['rescued_metro_child', 'prologue_vignette_orphan_played'],
        },
      },
      {
        id: 'v1_choice_b',
        text: 'Scramble past the wreckage into the emergency vent to survive',
        nextNode: 'prologue_stampede_sacrifice',
        effects: {
          agility: 1,
          setFlags: ['prologue_vignette_orphan_played'],
        },
      },
      {
        id: 'v1_choice_c',
        text: 'Guide the vanguard of refugees toward the deep service conduits',
        nextNode: 'prologue_refugee_vanguard',
      },
    ],
  },
  {
    id: 'prologue_refugee_vanguard',
    chapter: 'Prologue',
    title: 'Refugee Vanguard',
    location: 'Maintenance Conduits',
    imageKey: 'ruined_metro_station',
    speaker: 'Narrator',
    text: 'You forced your way to the head of the flight, battering open a rusted access grate with an iron prybar. Behind you, dozens of displaced souls pushed into the service conduits. Below, the ancient tunnel networks stretched into cold subterranean silence.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_choice_vanguard_push',
        text: 'Lead the group through the drainage shafts toward the lower hub',
        nextNode: 'prologue_stampede_resolve',
        effects: {
          morale: 5,
          setFlags: ['prologue_vignette_orphan_played'],
        },
      },
      {
        id: 'prologue_choice_vanguard_divert',
        text: 'Break off toward the emergency track bed alone',
        nextNode: 'prologue_stampede',
      },
    ],
  },
  {
    id: 'prologue_stampede',
    chapter: 'Prologue',
    title: 'The Crush of the Dark',
    location: 'Metro Line 9 Emergency Tunnel',
    imageKey: 'collapsed_tunnel',
    speaker: 'Narrator',
    text: 'The concourse roof groaned as hydraulic supports ruptured one by one. Dust cascaded in suffocating plumes. Ahead lies the only surviving breach down into the deep undercroft.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c_stampede_rescue',
        text: 'Pull the trapped child beneath the collapsed metro turnstile',
        nextNode: 'prologue_stampede_resolve',
        effects: {
          morale: 10,
          food: -1,
          setFlags: ['rescued_metro_child', 'prologue_vignette_orphan_played'],
        },
      },
      {
        id: 'c_stampede_flee',
        text: 'Squeeze through the falling rubble before the tunnel collapses entirely',
        nextNode: 'prologue_stampede_sacrifice',
        effects: {
          agility: 1,
          setFlags: ['prologue_vignette_orphan_played'],
        },
      },
    ],
  },
  {
    id: 'prologue_stampede_resolve',
    chapter: 'Prologue',
    title: 'Echoes in the Turnstile',
    location: 'Undercroft Drainage Junction',
    imageKey: 'tunnel_camp',
    speaker: 'Narrator',
    text: 'Safe behind the reinforced watertight doors, the screams faded into a dull vibration. Suddenly, a searing heat flared across your right forearm. A intricate geometric mark burned its silhouette into your flesh with violet light. You passed out on the cold stone floor.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_stampede_to_ch1',
        text: 'Awaken in the dark undercroft three years later...',
        nextNode: 'chapter1_start',
        effects: {
          setFlags: [
            'prologue_complete',
            'background_vignette_played',
            'knows_blackout_origin',
            'prologue_vignette_orphan_played',
          ],
        },
      },
    ],
  },
  {
    id: 'prologue_stampede_sacrifice',
    chapter: 'Prologue',
    title: 'The Solitary Descent',
    location: 'Collapsed Line 9 Service Shaft',
    imageKey: 'collapsed_tunnel',
    speaker: 'Narrator',
    text: 'You tumbled twenty feet down a ventilation shaft, slamming into sludge and gravel. Overhead, thousand-ton slabs sealed the world above forever. In the utter dark, your skin pulsed with an otherworldly violet glyph.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_sacrifice_to_ch1',
        text: 'Close your eyes as the blackout claims the city...',
        nextNode: 'chapter1_start',
        effects: {
          setFlags: [
            'prologue_complete',
            'background_vignette_played',
            'knows_blackout_origin',
            'prologue_vignette_orphan_played',
          ],
        },
      },
    ],
  },

  // ── Vignette 2: The Iron Saints Patrol (Exiled Soldier) ────────────────────
  {
    id: 'prologue_saints_soldier',
    chapter: 'Prologue',
    title: 'The Iron Perimeter',
    location: 'Iron Saints Northern Garrison',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Narrator',
    text: 'Sirens blared in descending tones as the substation grid exploded into blue sparks. On the north ramparts, your unit stood shoulder-to-shoulder, rifle barrels raised into the sudden fog. Then your gauntlet began to smoke. Beneath the heavy plate, the mark burned like a brand.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'c_mark_ignite',
        text: 'Clench your fist as the violet mark flares beneath your gauntlet',
        nextNode: 'prologue_saints_resolve',
        effects: {
          corruption: 2,
          ironSaints: 10,
          setFlags: ['mark_ignited', 'knows_saints_sign', 'prologue_complete'],
        },
      },
      {
        id: 'prologue_saints_patrol_choice',
        text: 'Sound the alarm and rally the perimeter watch to fortify the gate',
        nextNode: 'prologue_saints_patrol',
        effects: {
          ironSaints: 10,
          setFlags: ['knows_saints_sign'],
        },
      },
    ],
  },
  {
    id: 'prologue_saints_patrol',
    chapter: 'Prologue',
    title: 'The Broken Vanguard',
    location: 'Checkpoint Breach',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Narrator',
    text: 'Panic tore through the outer rings as the communications network severed. The Commander shouted orders into a dead radio. As the automated defense turrets lost power and clicked uselessly, an anomaly erupted in the central plaza.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_saints_patrol_stand',
        text: 'Hold the breach until the generators fail and fall back into the undercroft',
        nextNode: 'chapter1_start',
        effects: {
          ironSaints: 10,
          setFlags: [
            'prologue_complete',
            'background_vignette_played',
            'knows_blackout_origin',
            'mark_ignited',
            'knows_saints_sign',
          ],
        },
      },
      {
        id: 'prologue_saints_patrol_retreat',
        text: 'Cover the squad retreat into the service conduits',
        nextNode: 'prologue_saints_resolve',
      },
    ],
  },
  {
    id: 'prologue_saints_resolve',
    chapter: 'Prologue',
    title: 'Exile in the Depths',
    location: 'Forgotten Sub-Level Conduit',
    imageKey: 'dark_metro_hallway',
    speaker: 'Narrator',
    text: 'Accused of sabotage when the mark flared in front of your commanding officer, you were cast out through the southern drainage grate into the forbidden tunnels. The heavy vault door locked shut behind you with finality.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_saints_to_ch1',
        text: 'Survive in the dark until the prophecy begins...',
        nextNode: 'chapter1_start',
        effects: {
          setFlags: [
            'prologue_complete',
            'background_vignette_played',
            'knows_blackout_origin',
            'mark_ignited',
          ],
        },
      },
    ],
  },

  // ── Vignette 3: The Research Basement (Forgotten Scholar) ─────────────────
  {
    id: 'prologue_scholar_basement',
    chapter: 'Prologue',
    title: 'The Archive Unsealed',
    location: 'Pre-Collapse Research Basement',
    imageKey: 'last_archive_door',
    speaker: 'Narrator',
    text: 'Deep beneath the university faculty archives, the electromagnetic containment coils whined with impossible resonance. For three hundred years, the monolithic obsidian portal of the Archive had remained inert. Tonight, runic glyphs split the stone in spiderwebs of lavender fire.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_scholar_inspect_door',
        text: 'Witness the ancient Archive door groan open with a blinding flash',
        nextNode: 'prologue_research_basement',
        effects: {
          intelligence: 1,
          setFlags: ['found_archive_door', 'knows_blackout_origin'],
        },
      },
      {
        id: 'prologue_scholar_take_relic',
        text: 'Grab the trembling resonance recorder and escape into the sub-basement catacomb',
        nextNode: 'prologue_scholar_catacomb',
        effects: {
          relics: 1,
          setFlags: ['found_relic_cache', 'knows_blackout_origin'],
        },
      },
    ],
  },
  {
    id: 'prologue_research_basement',
    chapter: 'Prologue',
    title: 'Sub-Level Lab 4',
    location: 'Deep Sub-Level Archive Entry',
    imageKey: 'last_archive_door',
    speaker: 'Narrator',
    text: 'The blast wave expelled a shockwave of cold, ozone-scented air that blew out your lanterns. Through the aperture, you glimpsed crystalline databanks and suspended stasis chambers before the ceiling collapsed, sealing the entryway under tons of masonry.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_research_to_ch1',
        text: 'Stagger backward through the maintenance vents into the metro...',
        nextNode: 'chapter1_start',
        effects: {
          setFlags: [
            'prologue_complete',
            'background_vignette_played',
            'knows_blackout_origin',
            'found_archive_door',
          ],
        },
      },
    ],
  },
  {
    id: 'prologue_scholar_catacomb',
    chapter: 'Prologue',
    title: 'Catacomb of the Scholars',
    location: 'Ancient Subterranean Foundation',
    imageKey: 'dark_metro_hallway',
    speaker: 'Narrator',
    text: 'Clutching the humming relic to your chest, you navigated the brick-lined catacombs as the power stations above collapsed into rubble. You knew the truth now: the Blackout was not an accident, but a deliberate awakening.',
    effectsOnEnter: {},
    choices: [
      {
        id: 'prologue_catacomb_to_ch1',
        text: 'Retreat deeper into the forgotten metro lines to await what comes next...',
        nextNode: 'chapter1_start',
        effects: {
          setFlags: [
            'prologue_complete',
            'background_vignette_played',
            'knows_blackout_origin',
            'knows_archive_exists',
          ],
        },
      },
    ],
  },
  // ── ADD NODES ABOVE THIS LINE ──────────────────────────────────────────────
];
