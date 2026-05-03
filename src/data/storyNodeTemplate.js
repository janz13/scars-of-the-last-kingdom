/**
 * ============================================================
 *  SCARS OF THE LAST KINGDOM — STORY NODE WRITER TEMPLATE
 * ============================================================
 *
 * This file is a writing reference. It is NOT imported by the game.
 * Copy whichever example fits your scene, paste it into:
 *
 *   artifacts/mobile/data/storyNodes.ts
 *
 * Add it inside the STORY_NODES array (before the closing ]; ).
 * If you write dice-outcome nodes, add them to DICE_OUTCOME_NODES
 * at the bottom of that same file instead.
 *
 * After adding nodes, run:
 *   pnpm --filter @workspace/mobile run typecheck
 *
 * Zero errors = safe to play.
 * ============================================================
 */


// ─── QUICK REFERENCE ─────────────────────────────────────────────────────────
//
// VALID imageKey VALUES (the background image shown for this scene):
//   'ruined_metro_station'    — underground concourse, broken tiles
//   'dark_metro_hallway'      — long tunnel corridor, dim light
//   'collapsed_tunnel'        — cave-in, rubble, dust
//   'tunnel_camp'             — survivor shelter, crates and lanterns
//   'surface_ruins'           — bombed-out street, daylight haze
//   'iron_saints_checkpoint'  — military gate, razor wire
//   'surface_dawn'            — crumbling skyline at sunrise
//   'ruined_street'           — overgrown road, abandoned cars
//   'saints_patrol'           — soldiers moving through rubble
//   'black_market_alley'      — dim alley, makeshift stalls
//   'archive_ruin_wall'       — ancient stone etching, rune marks
//   'surface_night'           — night sky over ruins, silence
//   'last_archive_door'       — massive sealed door, glowing sigils
//
//   If a key is not in this list, the game uses a gradient fallback.
//   To add a real image: drop the PNG in assets/images/ and register
//   it in artifacts/mobile/constants/images.ts.
//
// VALID CLASS IDs (for class-locked choices):
//   'blade_survivor'  'gun_scavenger'  'medic'  'tactician'
//   'relic_hunter'    'shadow_broker'  'esper'
//
// VALID BACKGROUND IDs (for background-locked choices):
//   'wasteland_orphan'     'fallen_noble'      'underground_medic'
//   'exiled_soldier'       'black_market_courier'
//   'forgotten_scholar'    'runaway_experiment'
//
// VALID ENDING TYPES (for ending nodes):
//   'death'  'betrayal'  'sacrifice'  'tyrant'  'savior'
//   'companion'  'faction'  'secret'  'corruption'  'wanderer'
//
// FACTIONS (for reputation effects and requirements):
//   ironSaints       — the military occupiers
//   glassCourt       — scientist collective
//   hollowChildren   — tunnel refugees
//   redChoir         — doomsday cultists
//   lastArchive      — relic scholars
//
// STAT NAMES (used in effects and requirements):
//   Survival:    health  maxHealth  hunger  thirst  morale
//   Attributes:  strength  intelligence  agility  charisma  luck
//   Special:     corruption  trust
//
// INVENTORY NAMES:
//   food  water  medicine  scrap  ammo  relics  reputation
//
// COMPANION TRUST:
//   miraTrust  cainTrust
//
// DICE TYPES:  d4  d6  d8  d10  d12  d20
// DICE STATS:  'strength' | 'intelligence' | 'agility' | 'charisma' | 'luck'
//
// ─────────────────────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 1 — NORMAL STORY NODE
//  A straightforward scene with narration and two basic choices.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_normal_node = {

  // ── Identity ──────────────────────────────────────────────────────────────

  id: 'my_scene_unique_id',
  // Every node needs a unique ID. Use snake_case. IDs must match exactly when
  // other nodes point to this one via nextNode. No spaces, no special chars.

  chapter: 'Chapter 1',
  // The chapter label shown at the top of the screen.
  // Current chapters: 'Chapter 1', 'Chapter 2'

  title: 'The Empty Platform',
  // Scene title shown in large text below the chapter label.
  // Keep it short — 2–5 words works best.

  location: 'Metro Concourse — Platform 7',
  // The location label shown in small caps next to the chapter name.
  // Format as: "Area — Specific Spot"

  imageKey: 'ruined_metro_station',
  // Which background image to use. See the list at the top of this file.

  // ── Narration ─────────────────────────────────────────────────────────────

  text: `The platform is empty. It wasn't always — you can tell by the chalk
marks on the far wall, tallies of something, or someone. The marks stop at
forty-seven. The next chalk stub is still on the ground.`,
  // Main story text. This is the narration — describes the environment,
  // atmosphere, and what the player observes. Write in second person ("you").
  // Can be multiple paragraphs using backtick strings.

  // ── Optional: Speaker (omit if no named speaker) ──────────────────────────

  speaker: 'Mira',
  // If a character is speaking in this scene, put their name here.
  // It appears as a small label above the dialogue box.
  // Omit this field entirely if nobody specific is speaking.

  dialogue: `"Forty-seven. I've counted worse."`,
  // Spoken words shown in a special dialogue box below the narration.
  // Use quotation marks inside the string. Omit if no character speaks.

  // ── Optional: Effects on Enter ────────────────────────────────────────────

  effectsOnEnter: {
    morale: -5,
    // These effects fire the moment the player arrives at this node,
    // before they choose anything. Use sparingly — for entering a disturbing
    // scene, finding a resource cache, or triggering corruption.
    // See the effects reference below for all available fields.
  },

  // ── Choices ───────────────────────────────────────────────────────────────

  choices: [
    {
      id: 'examine_wall_marks',
      // Each choice needs a unique ID. Must be unique across the entire game.

      text: 'Study the chalk marks more closely.',
      // The button text the player sees. Write as an action.
      // Keep it under 60 characters so it fits on one or two lines.

      nextNode: 'platform_chalk_investigation',
      // The ID of the node this choice leads to.
      // That node must exist somewhere in STORY_NODES (or DICE_OUTCOME_NODES).

      effects: {
        intelligence: 2,
        // What changes when the player picks this choice.
        // Positive numbers add, negative numbers subtract.
        // Omit this field entirely if nothing changes.
      },
    },
    {
      id: 'move_on_from_platform',
      text: 'There\'s nothing useful here. Keep moving.',
      nextNode: 'tunnel_junction_approach',
      // No effects — this choice costs nothing and gives nothing.
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 2 — COMBAT / DANGER NODE
//  A high-tension scene that drains resources and splits paths.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_combat_danger_node = {
  id: 'ambush_at_junction',
  chapter: 'Chapter 2',
  title: 'Teeth in the Dark',
  location: 'City Surface — Junction 4-C',
  imageKey: 'saints_patrol',

  text: `Three Iron Saints come around the corner at a run. Not a patrol —
they're chasing something, and you stepped directly into their path.
One raises his rifle before he's even stopped moving.`,

  effectsOnEnter: {
    // Tension lands the moment the scene starts
    morale: -10,
  },

  choices: [
    {
      id: 'ambush_fight_back',
      text: 'No cover. Fight.',
      nextNode: 'ambush_fight_outcome',
      effects: {
        health: -25,       // Fighting hurts
        ammo: -3,          // Costs ammo
        ironSaints: -15,   // Faction rep loss
      },
      requirements: {
        ammo: 2,           // Need at least 2 ammo to attempt this
        // If the player doesn't have enough, this choice is shown
        // as locked with a reason message instead of disappearing.
      },
      flavorText: 'Requires: 2+ ammo',
      // Optional tooltip shown under locked choices to explain the block.
    },
    {
      id: 'ambush_run',
      text: 'Run. Don\'t look back.',
      nextNode: 'ambush_escape_alley',
      effects: {
        health: -10,      // Grazed escaping
        thirst: -8,       // Sprinting is thirsty
        morale: -8,
      },
    },
    {
      id: 'ambush_hide_mira',
      text: 'Mira pulls you into a doorway — trust her instinct.',
      nextNode: 'ambush_hidden_success',
      requirements: {
        miraPresent: true,       // Only shows if Mira is alive and present
        miraTrust: 40,           // And trust with her is 40 or higher
      },
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 3 — COMPANION TRUST NODE
//  A scene that builds or damages trust with Mira or Cain.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_companion_trust_node = {
  id: 'mira_confrontation_medicines',
  chapter: 'Chapter 1',
  title: 'What You Keep',
  location: 'Tunnel Camp — Med Bay Corner',
  imageKey: 'tunnel_camp',

  text: `Mira has her back to you, cataloguing the medicine you found.
She knows you're there. She hasn't turned around. When you took two
pills for yourself earlier, she saw. She's been quiet ever since.`,

  speaker: 'Mira',
  dialogue: `"I'm not angry. I just need to know what kind of person I'm
walking with."`,

  choices: [
    {
      id: 'mira_trust_honest',
      text: '"I was scared. I wasn\'t thinking about the group."',
      nextNode: 'mira_forgiveness_path',
      effects: {
        miraTrust: 12,    // Honest answer builds real trust
        morale: 5,        // Small morale lift from the honesty
      },
    },
    {
      id: 'mira_trust_deflect',
      text: '"We both had plenty. I didn\'t think it mattered."',
      nextNode: 'mira_cold_shoulder',
      effects: {
        miraTrust: -8,    // Deflecting damages trust
      },
    },
    {
      id: 'mira_trust_apologize',
      text: 'Give her back the pills without a word.',
      nextNode: 'mira_silent_respect',
      effects: {
        miraTrust: 20,    // Actions speak louder — big trust gain
        medicine: -2,     // Costs 2 medicine from inventory
        morale: -3,       // Small personal cost
      },
      requirements: {
        medicine: 2,      // Can only do this if you still have them
      },
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 4 — FACTION REPUTATION NODE
//  A scene where your standing with factions changes based on your choice.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_faction_reputation_node = {
  id: 'hollow_children_food_dispute',
  chapter: 'Chapter 2',
  title: 'The Price of a Name',
  location: 'Black Market — Distribution Row',
  imageKey: 'black_market_alley',

  text: `An Iron Saint lieutenant is shaking down a Hollow Children
distributor — an older woman with a crate of rations and no
way to defend them. Three people watch from doorways. Nobody moves.`,

  choices: [
    {
      id: 'faction_help_hollow',
      text: 'Step in. Back the old woman.',
      nextNode: 'hollow_gratitude_scene',
      effects: {
        hollowChildren: 20,   // Hollow Children remember this
        ironSaints: -12,      // Iron Saints add you to a list
        morale: 8,
      },
    },
    {
      id: 'faction_help_saints',
      text: 'Tell the woman to pay. You don\'t want trouble with the Saints.',
      nextNode: 'saints_nod_scene',
      effects: {
        ironSaints: 10,       // Saints see you as cooperative
        hollowChildren: -20,  // Hollow Children see you as a collaborator
        morale: -15,
        corruption: 1,
      },
    },
    {
      id: 'faction_stay_out',
      text: 'Walk away. This isn\'t your fight.',
      nextNode: 'market_after_scene',
      effects: {
        morale: -5,
        // No faction change — neutral costs you only morale
      },
    },
    {
      id: 'faction_negotiate',
      text: 'Offer scrap to cover the difference.',
      nextNode: 'faction_neutral_resolution',
      effects: {
        scrap: -5,
        ironSaints: 5,
        hollowChildren: 8,
        // Small rep gain with both — nobody's thrilled but nobody's hostile
      },
      requirements: {
        scrap: 5,           // Need the scrap to make the offer
      },
      flavorText: 'Requires: 5 scrap',
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 5 — SECRET ROUTE NODE
//  A node that is reached only if a specific hidden flag was set earlier.
//  Use flags to gate entire story branches that most players never see.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_secret_route_node = {
  id: 'archive_hidden_sublevel',
  chapter: 'Chapter 1',
  title: 'What the Scholars Left',
  location: 'Last Archive — Sub-Level B',
  imageKey: 'last_archive_door',

  text: `The wall panel responds to the mark on your wrist — not with
light, but with a low hum that you feel in your teeth. A section of
stone swings inward. Nobody else would have known to press here.
The scholars didn't leave this for everyone.`,

  // This node is accessed from a choice that requires the flag below.
  // The flag would have been SET earlier — for example, when the player
  // examined the rune wall and noticed the matching glyph on their wrist.

  choices: [
    {
      id: 'secret_enter_sublevel',
      text: 'Step through.',
      nextNode: 'sublevel_inner_chamber',
      effects: {
        relics: 1,
        lastArchive: 15,
        corruption: 2,      // Secret knowledge has a price
        setFlags: ['found_sublevel_b'],
        // setFlags adds these strings to the player's flag list.
        // Later nodes can check for 'found_sublevel_b' as a requirement.
      },
    },
    {
      id: 'secret_back_away',
      text: 'Back away. Something about this feels wrong.',
      nextNode: 'archive_main_hall',
    },
  ],
};

// HOW TO SET THE FLAG THAT GATES THIS NODE:
// In an earlier choice (e.g., examining the rune wall), add this to effects:
//
//   effects: {
//     setFlags: ['saw_archive_rune_glyph'],
//   }
//
// Then when a later choice leads to 'archive_hidden_sublevel', add:
//
//   requirements: {
//     flags: ['saw_archive_rune_glyph'],
//     // Player must have set this flag to see / use this choice.
//   }
//
// blockedFlags work the opposite way — the choice disappears if the
// player HAS the flag (useful for one-time events):
//
//   requirements: {
//     blockedFlags: ['already_looted_sublevel'],
//   }


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 6 — CLASS-LOCKED CHOICE
//  A choice that only players of a specific class can take.
//  Other classes still see the choice button but it shows as locked.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_class_locked_node = {
  id: 'collapsed_relay_station',
  chapter: 'Chapter 2',
  title: 'Dead Equipment',
  location: 'Surface — Relay Station Omega',
  imageKey: 'surface_ruins',

  text: `The relay station is dead — every screen dark, every panel
cold. There's a manual bypass box on the south wall, but it's
been sealed and the wiring has been cut and re-spliced badly.
Someone really didn't want this transmitting again.`,

  choices: [
    {
      id: 'relay_rewire_medic',
      text: 'Trace the wiring. You know how this works.',
      nextNode: 'relay_powered_up',
      requirements: {
        classes: ['medic', 'tactician'],
        // Only these two classes can take this choice.
        // The 'medic' has field-engineering training;
        // the 'tactician' knows communication infrastructure.
        // All other classes see it as locked.
      },
      flavorText: 'Medic / Tactician only — field systems knowledge.',
      // This text appears under the locked button for other classes.
      effects: {
        intelligence: 3,
        scrap: -2,           // Costs wire from inventory
        lastArchive: 8,      // Archive scholars want this data
      },
    },
    {
      id: 'relay_esper_feel',
      text: 'The mark is pulling toward the central console. Let it.',
      nextNode: 'relay_mark_activation',
      requirements: {
        classes: ['esper'],
        // Only espers can feel the mark's resonance this clearly.
      },
      flavorText: 'Esper only — the mark resonates with old machines.',
      effects: {
        corruption: 2,
        relics: 1,
        scrap: 2,            // The mark extracts something useful
      },
    },
    {
      id: 'relay_leave',
      text: 'It\'s dead. You can\'t fix it. Move on.',
      nextNode: 'relay_area_exit',
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 7 — BACKGROUND-LOCKED CHOICE
//  A choice that only players from a specific past can take.
//  Same mechanic as class-locked, but uses the player's background.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_background_locked_node = {
  id: 'glass_court_reception_hall',
  chapter: 'Chapter 1',
  title: 'Old Language',
  location: 'Glass Court — Outer Reception',
  imageKey: 'archive_ruin_wall',

  text: `The Glass Court's reception hall is lined with pre-Collapse
research plaques — dense, formal language that means nothing to
most people anymore. A Court researcher glances at you, clearly
categorising whether you're worth their time.`,

  choices: [
    {
      id: 'gc_reception_scholar_talk',
      text: 'Reference the Maren Accord by its original designation.',
      nextNode: 'gc_researcher_impressed',
      requirements: {
        backgrounds: ['forgotten_scholar', 'fallen_noble'],
        // Only scholars and fallen nobles would know this obscure name.
        // Other backgrounds see it as locked.
      },
      flavorText: 'Scholar / Fallen Noble only — pre-Collapse education.',
      effects: {
        glassCourt: 15,
        charisma: 2,
      },
    },
    {
      id: 'gc_reception_exsoldier_intimidate',
      text: 'Ask to speak to a supervisor. Use your outside voice.',
      nextNode: 'gc_tense_standoff',
      requirements: {
        backgrounds: ['exiled_soldier', 'wasteland_orphan'],
        // Soldiers and orphans know how to project threat without weapons.
      },
      flavorText: 'Exiled Soldier / Wasteland Orphan — survivor authority.',
      effects: {
        glassCourt: -5,
        ironSaints: 5,   // Soldier demeanour reads as aligned with Saints
        morale: 5,
      },
    },
    {
      id: 'gc_reception_wait',
      text: 'Wait. Watch. Learn the rhythm of the place.',
      nextNode: 'gc_observation_opportunity',
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 8 — DICE-ROLL CHOICE
//  A choice resolved by a stat check. The game rolls a die, adds the
//  player's stat modifier, and compares to the difficulty number.
//  Success / failure / critical results each route to different nodes.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_dice_roll_node = {
  id: 'rooftop_crossing_attempt',
  chapter: 'Chapter 2',
  title: 'The Gap',
  location: 'City Surface — Rooftop Row',
  imageKey: 'surface_ruins',

  text: `The gap between the two buildings is four metres — maybe five
with the lean of the second roof. The Iron Saints are two floors
below and working their way up. Across is clear. The jump is not.`,

  choices: [
    {
      id: 'rooftop_jump',
      text: 'Run and jump. You\'ve done worse.',
      // When this choice has a diceCheck, pressing it opens the dice
      // overlay instead of navigating directly. The result of the roll
      // determines which node the player goes to.
      diceCheck: {
        stat: 'agility',
        // Which stat to use for the modifier. Options:
        //   'strength' | 'intelligence' | 'agility' | 'charisma' | 'luck'

        difficulty: 13,
        // The target number the roll must meet or beat.
        // Roll result = d20 face + stat modifier.
        // Easy: DC 8–10 | Medium: DC 12–14 | Hard: DC 15–17 | Very Hard: DC 18+

        diceType: 'd20',
        // Which die to roll. Use 'd20' for most checks.
        // d4/d6/d8/d10/d12 for flavour or very simple tests.

        successNode: 'rooftop_crossed_safe',
        // Where to go if the roll meets or beats the DC.

        failureNode: 'rooftop_crossing_fail',
        // Where to go on a normal failure (roll below DC, but above 1).

        criticalSuccessNode: 'rooftop_crossed_perfect',
        // Where to go on a natural 20 (optional — omit for no special crit).
        // If omitted, a nat-20 uses successNode instead.

        criticalFailureNode: 'rooftop_crossing_fall',
        // Where to go on a natural 1 (optional — omit for no special crit-fail).
        // If omitted, a nat-1 uses failureNode instead.

        successEffects: {
          agility: 1,       // Gain stat experience from a successful jump
        },
        failureEffects: {
          health: -15,      // Clipped the edge — costs health
          morale: -5,
        },
        criticalSuccessEffects: {
          agility: 2,
          morale: 10,       // Nailed it perfectly — morale boost
        },
        criticalFailureEffects: {
          health: -35,      // Hard fall
          morale: -15,
          setFlags: ['injured_rooftop_fall'],
          // Flag lets later scenes reference the fall ("your ribs still ache")
        },
      },
    },
    {
      id: 'rooftop_find_another_way',
      text: 'That jump will kill you. Find the stairwell.',
      nextNode: 'stairwell_descent_choice',
      effects: {
        // Safe option costs time and exposes you to the patrol
        ironSaints: -5,
      },
    },
  ],
};

// NOTE: You must also write the outcome nodes that diceCheck points to.
// Add them to DICE_OUTCOME_NODES at the bottom of storyNodes.ts, not STORY_NODES.
// Each outcome node is a regular node — it just goes in the DICE_OUTCOME_NODES array.
//
//   { id: 'rooftop_crossed_safe',   text: 'You land clean...', choices: [...] },
//   { id: 'rooftop_crossing_fail',  text: 'Your boot slips...', choices: [...] },
//   { id: 'rooftop_crossed_perfect',text: 'You barely touch the edge...', choices: [...] },
//   { id: 'rooftop_crossing_fall',  text: 'You fall hard...', choices: [...] },


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 9 — BAD ENDING NODE
//  A death or failure ending. isEnding: true stops the story and
//  shows the ending screen instead of more choices.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_bad_ending_node = {
  id: 'ending_saints_execution',
  chapter: 'Chapter 1',
  title: 'Detained at Dawn',
  location: 'Iron Saints — Processing Block',
  imageKey: 'iron_saints_checkpoint',

  text: `The Saints don't do trials. You knew that. Somewhere between
the checkpoint and the processing block you ran out of things to say,
and the officer ran out of patience. The mark on your wrist is the
last thing you see before the lights go out. It pulses once.
Then nothing.`,

  isEnding: true,
  // Setting this to true marks the node as a game-ending scene.
  // The choices array must be empty — the ending screen takes over.

  endingType: 'death',
  // The type of ending — affects the ending screen colour and icon.
  // Options: 'death' | 'betrayal' | 'sacrifice' | 'tyrant' | 'savior'
  //          'companion' | 'faction' | 'secret' | 'corruption' | 'wanderer'

  endingId: 'ending_saints_execution',
  // Must match an entry in artifacts/mobile/data/endings.ts.
  // That file has the full ending title, subtitle, and description
  // shown on the ending screen.
  // This field links the node to that record.

  choices: [],
  // Always empty for ending nodes. Required field but left blank.
};

// HOW TO REGISTER A NEW ENDING:
// Open artifacts/mobile/data/endings.ts and add an entry to the ENDINGS array:
//
//   {
//     id: 'ending_saints_execution',          // must match endingId above
//     title: 'Detained at Dawn',
//     type: 'death',
//     subtitle: 'Executed Without Trial',
//     description: 'The Iron Saints have no courts. They have checkpoints...',
//     color: '#8e1c1c',
//   },
//
// The color tints the entire ending screen. Use:
//   Death:       '#8e1c1c'  (dark red)
//   Betrayal:    '#7a5c1a'  (dark amber)
//   Sacrifice:   '#4a6a5a'  (dark green)
//   Corruption:  '#4a2a6a'  (deep purple)
//   Savior:      '#2a4a6a'  (dark blue)
//   Secret:      '#1a4a4a'  (dark teal)
//   Wanderer:    '#3a3a3a'  (charcoal)


// ══════════════════════════════════════════════════════════════════════════════
//  EXAMPLE 10 — TRUE ENDING REQUIREMENT NODE
//  A node whose "true" choice is hidden behind multiple conditions.
//  Players who found secrets, made specific allies, and built certain
//  stats can access the real path. Everyone else gets a lesser route.
// ══════════════════════════════════════════════════════════════════════════════

const EXAMPLE_true_ending_node = {
  id: 'archive_final_chamber',
  chapter: 'Chapter 1',
  title: 'The Door at the End of Everything',
  location: 'Last Archive — Inner Sanctum',
  imageKey: 'last_archive_door',

  text: `The final chamber is everything the survivors said it would be
and nothing like they described. The mark burns steady and constant
now — not asking, just knowing. There is a door. There is a choice.
The mark will open it regardless of what you decide. The question is
what you bring through with you.`,

  effectsOnEnter: {
    corruption: 1,
    // Just being here costs something
  },

  choices: [

    // ── True ending — requires everything ─────────────────────────────────
    {
      id: 'archive_true_path',
      text: 'You know what this place is. You know what comes next. Open it properly.',
      nextNode: 'ending_archive_true',
      requirements: {
        // Stat thresholds — the player must have grown
        intelligence: 7,
        // (Stats go from 1–10; 7 means meaningful investment)

        // Knowledge flags — must have explored the secret branches
        flags: [
          'found_sublevel_b',          // Explored the hidden sublevel
          'read_maren_accord',         // Found the scholars' records
          'saw_archive_rune_glyph',    // Understood the mark's origin
        ],

        // Relationship requirements — must have built real bonds
        miraTrust: 70,                 // Deep trust with Mira
        miraPresent: true,             // And she must be alive

        // Faction standing — must have Archive scholars on your side
        factionRep: {
          lastArchive: 40,             // Significant Archive reputation
        },

        // Must NOT have taken the corruption shortcut
        blockedFlags: ['opened_door_by_force'],
        // If the player forced the door earlier, this path closes.
        // The true ending requires understanding, not power.
      },
      flavorText: 'Requires: deep Archive knowledge, Mira\'s trust, and the courage not to force it.',
    },

    // ── Companion ending — requires Mira alive and trusted ───────────────
    {
      id: 'archive_companion_path',
      text: 'Let Mira decide. She\'s been right before.',
      nextNode: 'ending_archive_mira',
      requirements: {
        miraPresent: true,
        miraTrust: 50,
        blockedFlags: ['mira_betrayed'],  // Can't use this if you betrayed her
      },
      flavorText: 'Requires: Mira present and trusted.',
      effects: {
        miraTrust: 15,
      },
    },

    // ── Corruption path — always available if corrupt enough ─────────────
    {
      id: 'archive_corruption_path',
      text: 'The mark already knows what you want. Stop pretending otherwise.',
      nextNode: 'ending_archive_corruption',
      requirements: {
        corruption: 6,
        // High corruption players have a darker option available.
        // This route is visible to everyone else but locked.
      },
      flavorText: 'Corruption 6+ required.',
      effects: {
        corruption: 3,
        morale: -10,
      },
    },

    // ── Default path — no requirements, always available ─────────────────
    {
      id: 'archive_default_path',
      text: 'Open the door. You don\'t fully understand it, but you never did.',
      nextNode: 'ending_archive_wanderer',
      // No requirements — every player who reaches this node can take this.
      // Design principle: always provide at least one path with no lock.
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  COMPLETE EFFECTS REFERENCE
//  Every field you can use in an effects block, with descriptions.
// ══════════════════════════════════════════════════════════════════════════════

const EFFECTS_REFERENCE = {

  // ── Survival stats (capped at their max, floored at 0) ────────────────────
  health:       +10,   // Hit points. Player dies if reaches 0.
  hunger:       -15,   // Fullness. Lower = hungrier. Hits 0 = morale drains.
  thirst:       -10,   // Hydration. Lower = thirstier. Critical faster than hunger.
  morale:       +5,    // Mental state. Affects some dialogue and choices.

  // ── Attributes (go up to 100; modifier applies to dice rolls) ─────────────
  strength:     +1,    // Physical power. Used in melee/force dice checks.
  intelligence: +1,    // Knowledge. Used in puzzle/lore dice checks.
  agility:      +1,    // Speed and precision. Used in stealth/jump dice checks.
  charisma:     +1,    // Persuasion. Used in negotiation dice checks.
  luck:         +1,    // Fortune. Above 60 = can reroll dice once per game.

  // ── Special ───────────────────────────────────────────────────────────────
  corruption:   +1,    // Mark influence. Affects some choices; endings read this.
  trust:        +5,    // Generic trust (legacy — prefer miraTrust / cainTrust).

  // ── Inventory ─────────────────────────────────────────────────────────────
  food:         +2,    // Consumable. Used/required by choices and survival checks.
  water:        +1,
  medicine:     +1,
  scrap:        +3,    // General currency and crafting material.
  ammo:         +2,
  relics:       +1,    // Rare artefacts. Affect some faction reactions.
  reputation:   +5,    // General survivor standing.

  // ── Companion trust ───────────────────────────────────────────────────────
  miraTrust:    +10,   // Trust with Mira specifically. Max 100.
  cainTrust:    +10,   // Trust with Cain specifically.

  // ── Faction reputation ────────────────────────────────────────────────────
  ironSaints:     +5,  // The occupying military force.
  glassCourt:     +5,  // The scientist collective.
  hollowChildren: +5,  // The tunnel refugee community.
  redChoir:       +5,  // The doomsday cult.
  lastArchive:    +5,  // The relic scholars.

  // ── Flags ─────────────────────────────────────────────────────────────────
  setFlags:    ['flag_name_here'],
  // Adds these strings to the player's flag dictionary.
  // Check them in requirements with  flags: ['flag_name_here']

  removeFlags: ['flag_name_here'],
  // Removes flags the player has. Useful for one-time consumable gates.
};


// ══════════════════════════════════════════════════════════════════════════════
//  COMPLETE REQUIREMENTS REFERENCE
//  Every field you can use in a requirements block.
//  If a player DOESN'T meet the requirements, the choice is shown
//  as locked (grayed out) rather than hidden.
// ══════════════════════════════════════════════════════════════════════════════

const REQUIREMENTS_REFERENCE = {

  // ── Minimum stat values ───────────────────────────────────────────────────
  health:       50,    // Player must have at least this much health.
  hunger:       30,    // Must not be too hungry.
  thirst:       20,
  morale:       40,
  strength:     6,     // Attribute must be this value or higher (1–100 scale).
  intelligence: 5,
  agility:      5,
  charisma:     7,
  luck:         60,    // Above 60 also enables the luck reroll.
  corruption:   5,     // Must have AT LEAST this much corruption.

  // ── Minimum inventory ─────────────────────────────────────────────────────
  food:         2,     // Must have at least 2 food.
  water:        1,
  medicine:     1,
  scrap:        5,
  ammo:         3,
  relics:       1,

  // ── Companion requirements ────────────────────────────────────────────────
  miraTrust:    50,    // Trust level with Mira must be at least 50.
  cainTrust:    40,
  miraPresent:  true,  // Mira must be alive and travelling with the player.
  cainPresent:  true,

  // ── Flag requirements ─────────────────────────────────────────────────────
  flags:        ['found_sublevel_b', 'read_maren_accord'],
  // Player must have ALL flags in this list.
  // Flags are set earlier via effects.setFlags.

  blockedFlags: ['already_did_this', 'chose_betrayal'],
  // Player must NOT have any flag in this list.
  // Use for one-time events or to close off paths after a decision.

  // ── Class and background gates ────────────────────────────────────────────
  classes:      ['medic', 'tactician'],
  // Player's class must be one of these.

  backgrounds:  ['forgotten_scholar', 'fallen_noble'],
  // Player's background must be one of these.

  // ── Faction requirements ──────────────────────────────────────────────────
  factionRep: {
    ironSaints:     20,   // Must have at least 20 rep with Iron Saints.
    glassCourt:     30,
    hollowChildren: 15,
    redChoir:       10,
    lastArchive:    40,
    // You only need to include the factions you care about.
    // Omit the rest.
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  WRITING TIPS
// ══════════════════════════════════════════════════════════════════════════════
//
//  VOICE AND STYLE
//  ─ Write in second person present tense: "you", "your", "you see".
//  ─ Don't explain what the player feels. Describe what they notice.
//    Bad:  "You feel afraid as the soldiers approach."
//    Good: "The soldiers are close enough that you can hear them breathing."
//  ─ End narration on an open edge — the choice should feel like relief
//    or tension, not just a menu prompt.
//  ─ Dialogue in the dialogue field should be a single spoken moment,
//    not a speech. One or two sentences. If a character says more,
//    break it into multiple nodes.
//
//  CHOICE WRITING
//  ─ Write choices as the first-person thought or action, not a label.
//    Bad:  "Fight the guards."
//    Good: "Step forward. If they want a fight, give them one."
//  ─ All choices should feel like real decisions, not obvious good/bad pairs.
//    The player should sometimes regret the right answer.
//  ─ Always give at least one choice with no requirements — a path
//    for players who built nothing specific.
//
//  IDS AND STRUCTURE
//  ─ Node IDs: descriptive snake_case.  'market_standoff_intro'
//  ─ Choice IDs: start with the node's name.  'market_standoff_fight'
//  ─ Dice outcome node IDs: start with 'dice_'. 'dice_market_fight_fail'
//  ─ Ending node IDs: start with 'ending_'. 'ending_market_execution'
//
//  TESTING YOUR NODES
//  1. Add your nodes to storyNodes.ts (regular nodes in STORY_NODES,
//     dice outcome nodes in DICE_OUTCOME_NODES).
//  2. Run: pnpm --filter @workspace/mobile run typecheck
//  3. Zero errors = structurally valid.
//  4. In Settings → Developer Mode, you can teleport to any node ID
//     to test it immediately without playing to that point.
//
// ══════════════════════════════════════════════════════════════════════════════
