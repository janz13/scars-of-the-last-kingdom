import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 12 — CROWN OF ASH
//  141 nodes · 11 locations · 11 dice checks · 30 endings
//  Major theme: Faction war, leadership, betrayal, revolution — who inherits.
//  Corruption thresholds:
//    corruption ≥ 40  → tyrant route unlocked at Broken Throne
//    corruption ≥ 60  → Red Choir broadcast consumption path opens
//    corruption ≥ 70  → Saints recognize the mark as a threat; choir consumed
//  Companion configs carried from Chapter 11:
//    both_companions_ch12     → full route access
//    mira_only_ch12           → medical/mercy route enhanced
//    cain_only_ch12           → war/tactical routes enhanced
//    lone_wanderer_ch12       → maximum freedom; early departure option
//    truth_bearer_ch12        → archive truth route unlocked
//  Chapter 11 outcome flags active here:
//    faction_truth_released   → all factions received Containment Protocol
//    chapter11_city_awakened  → city is already waking to the sub-city truth
//    true_ending_route_active → final gate path available at chapter close
//  Key NPCs:
//    Saint Veyra              → Iron Saints crusade leader; negotiable
//    Inquisitor Sera          → Veyra's enforcement arm; harder to negotiate
//    Lady Seraphine           → Glass Court principal; wants the extraction device
//    Director Varr            → Glass Court intelligence; may betray
//    Juno                     → Servant network contact from Chapter 5
//    Mother Veyl              → Red Choir elder; holds the broadcast key
//    Archivist Mael           → Last Archive head; protecting the records
//    Mother Chalk             → Ancient medium; surfaced with Hollow Children
//    The Masked Heir          → Final identity revealed here
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_12_NODES: StoryNode[] = [

  // ── OPENING — THE ASHEN SQUARE ────────────────────────────────────────────

  {
    id: 'chapter12_start',
    chapter: 'Chapter 12',
    title: 'Crown of Ash',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `The Ashen Square was a market before the Blackout. The burned-out stalls and scorched paving stones still bear the mark of what it used to be. What it is now: a fire line between the Iron Saints' perimeter and everything else. The mark reads the city the way it has read every built structure for twelve chapters — not as geography, but as accumulated decision. The decision accumulating here is: who inherits. From the sub-city gate behind you to the five faction fronts above, the city is simultaneously burning and deciding. Chapter 12 begins at the line between what was and what the factions will make of it.`,
    effectsOnEnter: { setFlags: ['chapter12_begun'] },
    choices: [
      {
        id: 'c12_start_survey',
        text: 'Take stock of who made it out of the sub-city.',
        nextNode: 'c12_square_companion_check',
      },
    ],
  },

  {
    id: 'c12_square_companion_check',
    chapter: 'Chapter 12',
    title: 'Who Survived',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `The companion configuration that carried through Chapter 11 is the configuration standing in the Ashen Square. The mark reads whoever is present as a secondary resonance — familiar, stable, altered by what the sub-city showed them. The factions' scouts have already spotted movement at the square's edge. There is a window before they identify you specifically. The window is short.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_check_both',
        text: 'Both Mira and Cain made it out.',
        nextNode: 'c12_square_both',
        requirements: { flags: ['both_companions_ch12'] },
      },
      {
        id: 'c12_check_mira',
        text: 'Mira made it out. Cain did not.',
        nextNode: 'c12_square_mira_only',
        requirements: { flags: ['mira_only_ch12'] },
      },
      {
        id: 'c12_check_cain',
        text: 'Cain made it out. Mira did not.',
        nextNode: 'c12_square_cain_only',
        requirements: { flags: ['cain_only_ch12'] },
      },
      {
        id: 'c12_check_alone',
        text: 'No companions. You ascended alone.',
        nextNode: 'c12_square_alone',
        requirements: { flags: ['lone_wanderer_ch12'] },
      },
    ],
  },

  {
    id: 'c12_square_both',
    chapter: 'Chapter 12',
    title: 'Still Standing',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `Mira checks the air quality without being asked — habit from eleven chapters of watching the environment for what it does to people. Cain reads the faction perimeters without looking at them directly. Two people who have been doing this long enough that their competence has become something quieter than confidence. "Both routes are compromised," Cain says. "War Council is surrounded. Market is still open." Mira: "We can make either work." You believe her.`,
    effectsOnEnter: { morale: 5, setFlags: ['chapter12_both_companions'] },
    choices: [
      {
        id: 'c12_both_proceed',
        text: 'Move through the square together.',
        nextNode: 'c12_square_faction_state',
      },
    ],
  },

  {
    id: 'c12_square_mira_only',
    chapter: 'Chapter 12',
    title: 'Half a Formation',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `Mira catalogs the square's faction markers the way she catalogs everything — systematically, without announcing what she's doing until she has a conclusion. "Iron Saints hold the north access. Glass Court has scouts at the southeast corner. The Choir's march sounds like it's three blocks east." She doesn't mention Cain. Neither do you. The absence is its own kind of weight, carried the way the mark carries the sub-city's resonance — present, beneath everything else.`,
    effectsOnEnter: { morale: 3, setFlags: ['chapter12_mira_companion'] },
    choices: [
      {
        id: 'c12_mira_proceed',
        text: 'Move with Mira. The square is manageable.',
        nextNode: 'c12_square_faction_state',
      },
    ],
  },

  {
    id: 'c12_square_cain_only',
    chapter: 'Chapter 12',
    title: 'Combat Geometry',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `Cain reads the square in seconds. "Saints have a fire line at the market stalls — six positions, probably twelve personnel. Glass Court scouts are single operatives, no fixed positions. Choir march is organized but slow. We have a window." He does not say "we" the way most people say it. He says it the way a tactician designates a unit. You are the unit. The window is real.`,
    effectsOnEnter: { morale: 3, setFlags: ['chapter12_cain_companion'] },
    choices: [
      {
        id: 'c12_cain_proceed',
        text: 'Move with Cain through the fire line gap.',
        nextNode: 'c12_square_faction_state',
      },
    ],
  },

  {
    id: 'c12_square_alone',
    chapter: 'Chapter 12',
    title: 'The Square Alone',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `The Ashen Square reads differently when you're alone. More honest. No one to check the air quality or read the perimeter — just the mark, the burned paving stones, and the sound of a city deciding its own ending without you in the room. The scouts at the square's edge haven't identified you yet. The lone-wanderer configuration has one thing the group configurations don't: you look like a survivor, not a force. The square is navigable. The question is whether you intend to navigate it toward the conflict or through it.`,
    effectsOnEnter: { morale: -3, setFlags: ['chapter12_lone_wanderer'] },
    choices: [
      {
        id: 'c12_alone_toward_conflict',
        text: 'Move toward the War Council. The city still needs something from you.',
        nextNode: 'c12_square_faction_state',
      },
      {
        id: 'c12_alone_through',
        text: 'Walk through the square and out the other side. This war was never yours.',
        nextNode: 'c12_silent_departure_end',
        requirements: { flags: ['lone_wanderer_ch12'] },
      },
    ],
  },

  {
    id: 'c12_square_faction_state',
    chapter: 'Chapter 12',
    title: 'The Shape of a War',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `The five-faction configuration that Chapter 11's sub-city truth disrupted has not resolved — it has accelerated. The Iron Saints have declared a final crusade mandate, citing the mark-bearer's sub-city activity as evidence of relic contamination at Archive level. The Glass Court has deployed an extraction device that can remove marks from bearers — or attempt to. The Red Choir's broadcast from three chapters ago is building toward a final transmission. The Hollow Children are emerging from the tunnel system for the first time. The Last Archive is under siege from all four remaining factions simultaneously. The city is not burning yet. It is deciding whether to.`,
    effectsOnEnter: { setFlags: ['chapter12_faction_state_read'] },
    choices: [
      {
        id: 'c12_state_to_routes',
        text: 'Assess the approach options.',
        nextNode: 'c12_square_routes',
      },
    ],
  },

  {
    id: 'c12_square_routes',
    chapter: 'Chapter 12',
    title: 'Entry Points',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    text: `Two primary approaches. The War Council is meeting in the old civic building three blocks north — representatives from all five factions in the same room, possibly for the last time. The Burning Market is two blocks east — neutral ground by common agreement, the one place where all five factions have decided that commerce matters more than conflict. From either point, the chapter's routes branch. The square is the last moment before choosing.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_routes_council',
        text: 'Find the War Council. If the factions can be addressed together, this is the window.',
        nextNode: 'c12_war_council_arrive',
      },
      {
        id: 'c12_routes_market',
        text: 'Find neutral ground first. The Burning Market has information the Council doesn\'t.',
        nextNode: 'c12_burning_market',
      },
    ],
  },

  // ── WAR COUNCIL ───────────────────────────────────────────────────────────

  {
    id: 'c12_war_council_arrive',
    chapter: 'Chapter 12',
    title: 'The War Council',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `The civic building's hall was designed for civic meetings, which is what this is, technically. Five faction representatives, one table, the specific quality of a room where every person present has the authority to end the meeting with violence and is choosing not to, for now. Saint Veyra occupies the north seat. Lady Seraphine occupies the southeast position. Mother Veyl stands rather than sits. Archivist Mael is present but removed from the table. A representative of the Hollow Children — the first surface-seen member in three years — stands near the east wall. When you enter, the room reconfigures around your presence the way armed rooms reconfigure: subtly, and without appearing to.`,
    effectsOnEnter: { setFlags: ['war_council_entered'] },
    choices: [
      {
        id: 'c12_council_read',
        text: 'Read the room before speaking.',
        nextNode: 'c12_council_survey',
      },
    ],
  },

  {
    id: 'c12_council_survey',
    chapter: 'Chapter 12',
    title: 'Five Positions',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `Saint Veyra's body language: contained, prepared, the posture of someone who has already decided the meeting's outcome. Seraphine reads the room the way she reads the city — as a set of variables. Mother Veyl is listening for something the words aren't carrying; the mark can hear it too. Mael is protecting something specific — the stack of documents in front of him, or the information inside them. The Hollow Children's representative is watching the walls, not the people, the way someone watches load-bearing structures for signs of stress. The room is a problem with five components and no obvious solution.`,
    effectsOnEnter: { intelligence: 1 },
    choices: [
      {
        id: 'c12_survey_tactician',
        text: 'Read the room strategically. Identify the leverage points.',
        nextNode: 'c12_council_tactician_read',
        requirements: { classes: ['tactician'] },
      },
      {
        id: 'c12_survey_address',
        text: 'Address the Council before a faction makes the first move.',
        nextNode: 'c12_council_address_all',
      },
      {
        id: 'c12_survey_direct_routes',
        text: 'The Council isn\'t the right approach. Move to individual faction positions.',
        nextNode: 'c12_council_route_choice',
      },
    ],
  },

  {
    id: 'c12_council_tactician_read',
    chapter: 'Chapter 12',
    title: 'Tactical Analysis',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `The tactician reads the room as a battlefield. Veyra's chair placement gives her the fastest exit. Seraphine's position gives her the longest sight-line to the door. Mother Veyl is standing because standing gives her the most option-space. Mael's document stack is what he'd grab first in an emergency. The Hollow Children's representative is closest to the structural wall — an unconscious choice, or a trained one. The leverage points are clear: Veyra responds to demonstrated authority. Seraphine responds to information she doesn't already have. Veyl responds to what the mark reads in a person, not what they say. Mael responds to documented evidence. The Hollow Children's representative responds to whoever speaks first about the tunnels.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['council_tactical_read'] },
    choices: [
      {
        id: 'c12_tact_to_address',
        text: 'Use the tactical read to frame the address. Lead with Veyra, anchor with Mael.',
        nextNode: 'c12_council_address_all',
        effects: { setFlags: ['council_tactical_advantage'] },
      },
      {
        id: 'c12_tact_to_routes',
        text: 'Individual routes will be more efficient than a group address.',
        nextNode: 'c12_council_route_choice',
      },
    ],
  },

  {
    id: 'c12_council_address_all',
    chapter: 'Chapter 12',
    title: 'Speaking to Five Factions',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `Speaking to five factions at once is a specific kind of problem: anything true for one is probably not true for all, and anything true for all is probably not true enough to matter. The mark is reading the room at a frequency that the sub-city's months of orientation have sharpened. There is something the five factions have in common that they are not articulating: they are all afraid of what the sub-city truth means for the city they have built their authority around. The Containment Protocol's history, released or not, changes what they are defending. The address can name that. The question is whether it can land before someone in the room decides to remove it from the equation.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_address_peace',
        text: 'Speak directly to what they\'re all afraid of. Name the sub-city truth in the room.',
        nextNode: 'c12_council_demand_dice',
      },
    ],
  },

  {
    id: 'c12_council_demand_dice',
    chapter: 'Chapter 12',
    title: 'The Address',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `Five people who have spent their careers not being moved by speeches. The mark on your wrist is warm with the sub-city's resonance — twelve chapters of specific, documented truth that no faction representative in this room has had unfiltered access to. The window to speak is now. The room has given it, barely. Whether the words land is a question of whether this specific truth, in this specific voice, reaches five people who have already decided what truth means.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_demand_roll',
        text: 'Deliver the address. What the mark carries is the most credible thing in this room.',
        diceCheck: {
          stat: 'charisma',
          difficulty: 7,
          diceType: 'd8',
          successNode: 'c12_council_peace_success',
          failureNode: 'c12_council_peace_fail',
          criticalSuccessNode: 'c12_unity_route_unlocked',
          successEffects: { morale: 5, setFlags: ['council_peace_achieved'] },
          failureEffects: { morale: -3 },
        },
      },
    ],
  },

  {
    id: 'c12_council_peace_success',
    chapter: 'Chapter 12',
    title: 'Something Held',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `The room does not become peaceful. Rooms like this don't become peaceful. What happens is that Mael's hand moves away from the document stack. Veyra's exit posture relaxes by two degrees. Seraphine writes something that is not a threat. Veyl closes her eyes and opens them differently. The Hollow Children's representative speaks for the first time — three words in a language the mark almost recognizes: "The gate remembers." The ceasefire is not an agreement. It is a pause. In a room this close to ending, a pause is significant.`,
    effectsOnEnter: { morale: 8, setFlags: ['council_peace_achieved', 'council_ceasefire'] },
    choices: [
      {
        id: 'c12_peace_to_routes',
        text: 'The ceasefire gives you access to all five faction positions. Use it.',
        nextNode: 'c12_council_route_choice',
      },
    ],
  },

  {
    id: 'c12_unity_route_unlocked',
    chapter: 'Chapter 12',
    title: 'The Covenant Moment',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `It is not a speech that does it. It is the mark. When the sub-city's resonance becomes audible in the room — when the five faction representatives simultaneously experience what the mark has been carrying for twelve chapters — the room becomes, for approximately forty seconds, a room of people who understand the same thing at the same time. No faction claims that moment. No faction can. The forty seconds end. The factions resume their positions. But Mael writes something and passes it to Veyra. Veyra reads it and passes it to Seraphine. Something has been exchanged that was not available before you spoke. The unity route exists. Whether it survives the next six hours is the question.`,
    effectsOnEnter: { morale: 15, setFlags: ['unity_route_available', 'council_ceasefire', 'council_peace_achieved'] },
    choices: [
      {
        id: 'c12_unity_to_routes',
        text: 'The window is open. Move through all five faction positions while the ceasefire holds.',
        nextNode: 'c12_council_route_choice',
      },
    ],
  },

  {
    id: 'c12_council_peace_fail',
    chapter: 'Chapter 12',
    title: 'The Room Closes',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `Veyra speaks before you finish. What she says is not wrong, exactly — it is specifically targeted to disassemble the address at its most vulnerable point, which is the question of authority: who authorized the sub-city descent, and what the mark-bearer's presence in the civic building means for the faction representatives who did not invite it. The room reconfigures. Not toward violence — toward the specific hostility of five factions who have been reminded that they are not a unified body and should not be treated as one. The address failed. The individual routes are still open.`,
    effectsOnEnter: { morale: -5, setFlags: ['council_address_failed'] },
    choices: [
      {
        id: 'c12_fail_to_routes',
        text: 'The Council address failed. Move to individual faction positions.',
        nextNode: 'c12_council_route_choice',
      },
    ],
  },

  {
    id: 'c12_council_route_choice',
    chapter: 'Chapter 12',
    title: 'The City\'s Five Fronts',
    location: 'The War Council',
    imageKey: 'war_council',
    text: `Five faction positions, all simultaneously accessible from the civic building. The Saint Front holds the northern perimeter — Veyra's main force, with Inquisitor Sera running the crusade's enforcement arm. The Glass Barricade is southeast — Seraphine's extraction device, Director Varr somewhere in the compound. The Red Choir March is moving east — Veyl's final broadcast sequence, already in motion. The Archive Siege is the Archive's exterior — Mael's people holding the line against the other four factions simultaneously. The Hollow Children Hideout is below the market — the first surface emergence in three years, Mother Chalk present. The Burning Market connects all five.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_route_saints',
        text: 'The Saint Front. Veyra and Sera are the chapter\'s most active threat.',
        nextNode: 'c12_saint_front_arrive',
      },
      {
        id: 'c12_route_glass',
        text: 'The Glass Barricade. The extraction device is the Glass Court\'s most dangerous weapon.',
        nextNode: 'c12_glass_barricade_arrive',
      },
      {
        id: 'c12_route_choir',
        text: 'The Red Choir March. Veyl\'s broadcast needs to be redirected or stopped.',
        nextNode: 'c12_red_choir_arrive',
      },
      {
        id: 'c12_route_archive',
        text: 'The Archive Siege. Mael\'s position is the chapter\'s information center.',
        nextNode: 'c12_archive_siege_arrive',
      },
      {
        id: 'c12_route_hollow',
        text: 'The Hollow Children Hideout. The sub-city emergence is the chapter\'s wildcard.',
        nextNode: 'c12_hollow_arrive',
      },
      {
        id: 'c12_route_market',
        text: 'The Burning Market first. Neutral ground before committing to a route.',
        nextNode: 'c12_burning_market',
      },
    ],
  },

  // ── BURNING MARKET ────────────────────────────────────────────────────────

  {
    id: 'c12_burning_market',
    chapter: 'Chapter 12',
    title: 'The Burning Market',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `The Burning Market earns its current name from the faction-colored fires at its perimeter, not from its contents. Inside the perimeter, the agreement holds: nothing faction-marked, nothing openly carried. The market is still operating because the people running it have survived eleven chapters of faction conflict by being more useful alive than dead. Information, medicine, food, and the specific currency of people who know where all five factions are moving at any given moment. The mark reads the market the way it reads the sub-city's housing block — as a space where people adapted to survive something that was not designed with them in mind.`,
    effectsOnEnter: { setFlags: ['burning_market_entered'] },
    choices: [
      {
        id: 'c12_market_to_intel',
        text: 'Find the market\'s information brokers. The five-faction state can be mapped from here.',
        nextNode: 'c12_market_intel',
      },
    ],
  },

  {
    id: 'c12_market_intel',
    chapter: 'Chapter 12',
    title: 'What the Market Knows',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `The market's information infrastructure is informal and accurate. Three confirmed items: the Glass Court extraction device was tested on a willing bearer three days ago — the bearer survived, the mark was not fully removed, the bearer is now in Glass Court medical custody. The Red Choir broadcast is targeting the mark-bearer specifically — Veyl knows the sub-city truth from Chapter 11's release and is building the transmission around it. The Hollow Children's surface emergence was not planned — something in the sub-city's changed resonance after the gate event drove them up. Four unconfirmed items on request.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['market_intel_gathered'] },
    choices: [
      {
        id: 'c12_intel_shadow_broker',
        text: 'Access the shadow network\'s deeper layer. The four unconfirmed items are recoverable.',
        nextNode: 'c12_shadow_broker_intel',
        requirements: { classes: ['shadow_broker'] },
      },
      {
        id: 'c12_intel_courier',
        text: 'The black market has a cache here. Check it.',
        nextNode: 'c12_market_courier_cache',
        requirements: { backgrounds: ['black_market_courier'] },
      },
      {
        id: 'c12_intel_chalk',
        text: 'Mother Chalk is in the market. The sub-city medium knows something the network doesn\'t.',
        nextNode: 'c12_market_chalk_meeting',
      },
      {
        id: 'c12_intel_companion',
        text: 'The companion reads the market differently than you do. Their assessment first.',
        nextNode: 'c12_market_companion_scene',
        requirements: { miraPresent: true },
      },
      {
        id: 'c12_intel_heir',
        text: 'There\'s a figure at the market\'s eastern edge who doesn\'t move like a civilian.',
        nextNode: 'c12_market_heir_sighting',
      },
      {
        id: 'c12_intel_move',
        text: 'Enough. The market\'s primary intel is sufficient. Move to a faction front.',
        nextNode: 'c12_market_route_out',
      },
    ],
  },

  {
    id: 'c12_shadow_broker_intel',
    chapter: 'Chapter 12',
    title: 'The Network Beneath the Market',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `The shadow broker network operates in the market the way it operates everywhere: through the specific language of people who know what they know and know what it costs. The four unconfirmed items, confirmed: Director Varr has defected from the Glass Court — or is performing a defection. Inquisitor Sera received orders from Veyra three hours ago that contradict the public crusade mandate. Archivist Mael has a failsafe for the Archive that none of the attacking factions know about. The Hollow Children's representative at the War Council was not authorized by the Hollow Children leadership — she acted unilaterally. Four data points, each of which changes one of the five faction approaches.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['shadow_network_accessed', 'varr_defection_known', 'sera_order_known', 'mael_failsafe_known', 'hollow_representative_unauthorized'] },
    choices: [
      {
        id: 'c12_shadow_to_route',
        text: 'The network has given you everything it has. Move.',
        nextNode: 'c12_market_route_out',
      },
    ],
  },

  {
    id: 'c12_market_courier_cache',
    chapter: 'Chapter 12',
    title: 'The Cache',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `The black market courier's cache is exactly where it should be — behind the third stall from the left, inside a structure that looks like food storage and contains medicine, ammunition, and a sealed document marked with the Glass Court's authentication code. The document is a Glass Court extraction device schematic. Someone left it here for retrieval. The mark reads the document's material as Archive composite — the same material the Old Government Vault used. The document was not left by a Glass Court operative.`,
    effectsOnEnter: { medicine: 2, ammo: 3, setFlags: ['extraction_schematic_found', 'cache_retrieved'] },
    choices: [
      {
        id: 'c12_cache_to_route',
        text: 'Take the schematic. It will matter at the Glass Barricade.',
        nextNode: 'c12_market_route_out',
        effects: { setFlags: ['extraction_schematic_carried'] },
      },
    ],
  },

  {
    id: 'c12_market_chalk_meeting',
    chapter: 'Chapter 12',
    title: 'Mother Chalk, Surface',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `Mother Chalk has been above ground for six hours. She moves through the market the way she moved through the sub-city — as if the surface is an extension of what she has always been navigating, which it probably is. "The gate shifted when you left it," she says, without preamble. "Not open, not closed — held. The entity's departure protocol is processing. The mark knows this already." She is not wrong. "The city above is deciding the same thing the city below decided over three hundred years. What to do with something it cannot contain and cannot release." She offers a single piece of advice: "The Broken Throne is where it resolves. Everything else is the path toward it."`,
    effectsOnEnter: { morale: 5, intelligence: 2, setFlags: ['chalk_surface_met', 'broken_throne_known'] },
    choices: [
      {
        id: 'c12_chalk_to_route',
        text: 'The Broken Throne is the destination. Navigate to it.',
        nextNode: 'c12_market_route_out',
      },
    ],
  },

  {
    id: 'c12_market_companion_scene',
    chapter: 'Chapter 12',
    title: 'What Mira Reads',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `Mira reads the market the way she reads any space containing sick people — not clinically, but with the specific attention of someone who has spent eleven chapters watching what fear does to human physiology. "The market vendors have heightened cortisol markers. The faction scouts have suppressed anxiety responses — trained. The civilians have the physiological signature of people who have stopped expecting tomorrow." She pauses. "The Glass Court extraction device tests came back inconclusive. But the bearer who was tested is in Glass Court medical custody, and the market vendor who sold them black-market pain medication this morning said their hands don't work the same way anymore." The mark processes this as a threat rating.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['mira_market_assessment'] },
    choices: [
      {
        id: 'c12_companion_to_route',
        text: 'The Glass Barricade is the priority. Move there first.',
        nextNode: 'c12_market_route_out',
      },
    ],
  },

  {
    id: 'c12_market_heir_sighting',
    chapter: 'Chapter 12',
    title: 'A Familiar Movement',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `The figure at the market's eastern edge moves the way the Masked Heir moved through the sub-city — with the specific economy of someone who has been trained not to draw attention and is therefore always the most visible person in the room. They are not masked. The sub-city apparently made that impossible to maintain. The face is: young, Glass Court bone structure, the eyes of someone who has been carrying a specific knowledge for a very long time and is deciding what to do with the weight of it. They see you see them. They do not leave. The Heir is above ground. The Heir is unmasked. The Heir is waiting.`,
    effectsOnEnter: { setFlags: ['heir_surface_sighted', 'heir_unmasked'] },
    choices: [
      {
        id: 'c12_heir_approach',
        text: 'Approach the Heir. The sub-city established enough of a basis for this conversation.',
        nextNode: 'c12_market_route_out',
        effects: { setFlags: ['heir_market_contact'] },
      },
      {
        id: 'c12_heir_monitor',
        text: 'Note the position. The Heir appears at the Broken Throne. Move to faction routes.',
        nextNode: 'c12_market_route_out',
      },
    ],
  },

  {
    id: 'c12_market_route_out',
    chapter: 'Chapter 12',
    title: 'From the Market',
    location: 'The Burning Market',
    imageKey: 'burning_market',
    text: `The market has given everything it has to give. The five faction fronts are all accessible from the market's perimeter. The ceasefire in the market doesn't extend past the stall line. Outside, the city is still burning. Choose the front.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_mro_saints',
        text: 'The Saint Front.',
        nextNode: 'c12_saint_front_arrive',
      },
      {
        id: 'c12_mro_glass',
        text: 'The Glass Barricade.',
        nextNode: 'c12_glass_barricade_arrive',
      },
      {
        id: 'c12_mro_choir',
        text: 'The Red Choir March.',
        nextNode: 'c12_red_choir_arrive',
      },
      {
        id: 'c12_mro_archive',
        text: 'The Archive Siege.',
        nextNode: 'c12_archive_siege_arrive',
      },
      {
        id: 'c12_mro_hollow',
        text: 'The Hollow Children Hideout.',
        nextNode: 'c12_hollow_arrive',
      },
    ],
  },

  // ── SAINT FRONT ───────────────────────────────────────────────────────────

  {
    id: 'c12_saint_front_arrive',
    chapter: 'Chapter 12',
    title: 'The Saint Front',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `The Iron Saints' northern perimeter is organized the way the Iron Saints organize everything: around the assumption that the correct response to uncertainty is more certainty, applied at higher volume. The fire line is real — six fixed positions with overlapping coverage. Behind the fire line, the crusade's infrastructure: supply lines, command structures, the specific architecture of an organization that has been planning this moment for years. Saint Veyra's banner is visible three blocks in. Inquisitor Sera's position is one block closer — the enforcement arm, the blade the crusade uses when words don't reach.`,
    effectsOnEnter: { setFlags: ['saint_front_arrived'] },
    choices: [
      {
        id: 'c12_saint_exiled_entry',
        text: 'Present the exiled soldier\'s knowledge of Saints\' protocols. Use the credentials.',
        nextNode: 'c12_saint_veyra_scene',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { ironSaints: 3, setFlags: ['saint_front_recognized_entry'] },
      },
      {
        id: 'c12_saint_direct',
        text: 'Approach the fire line directly. Veyra is three blocks in and the line is navigable.',
        nextNode: 'c12_saint_veyra_scene',
      },
    ],
  },

  {
    id: 'c12_saint_veyra_scene',
    chapter: 'Chapter 12',
    title: 'Saint Veyra',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Saint Veyra is the Iron Saints in condensed form: the specific quality of someone who has convinced themselves that their certainty is a form of service. She is not cruel, exactly. She is thorough. The crusade mandate she issued three days ago is thorough. The kill order for marked individuals operating in the sub-city without Archive sanction is thorough. She looks at the mark on your wrist with the expression of someone whose documentation covers exactly this scenario and who finds the coverage professionally satisfying. "The sub-city investigation is complete," she says. "The Archive has been compromised at foundation level. The marked are vectors. This is not negotiable." She is waiting for your response.`,
    effectsOnEnter: { setFlags: ['veyra_confronted'] },
    choices: [
      {
        id: 'c12_veyra_choice_next',
        text: 'Face Veyra directly.',
        nextNode: 'c12_saint_veyra_choice',
      },
    ],
  },

  {
    id: 'c12_saint_veyra_choice',
    chapter: 'Chapter 12',
    title: 'Veyra\'s Terms',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Veyra is waiting. The mark reads her the way it reads all people who have built their authority around a specific truth: the truth is real; the authority built on it is not the truth. The crusade mandate is built on the mark being a vector. The mark is not a vector. The distinction matters. How you present it matters more.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_veyra_ally',
        text: 'Invoke the alliance. The Saints and the mark-bearer have fought the same enemies.',
        nextNode: 'c12_saint_ally_path',
        requirements: { factionRep: { ironSaints: 8 } },
        effects: { ironSaints: 3, setFlags: ['veyra_alliance_claimed'] },
      },
      {
        id: 'c12_veyra_physical',
        text: 'Demonstrate, physically, that the mark is not what the mandate claims.',
        nextNode: 'c12_saint_strength_dice',
      },
      {
        id: 'c12_veyra_corruption',
        text: 'The mark surges at Veyra\'s proximity. The Saints respond before you speak.',
        nextNode: 'c12_saint_crusade_death_end',
        requirements: { corruption: 70 },
        isHidden: true,
      },
      {
        id: 'c12_veyra_refuse',
        text: 'Refuse Veyra\'s framing entirely. Push through to Sera.',
        nextNode: 'c12_saint_front_battle',
        effects: { ironSaints: -3 },
      },
    ],
  },

  {
    id: 'c12_saint_strength_dice',
    chapter: 'Chapter 12',
    title: 'The Physical Argument',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `The Iron Saints respect demonstrated strength. Not because they are simple — because their entire institutional structure is built on the principle that capability justifies authority. The mark's physical architecture is the most legible argument available. Whether it's legible enough depends on whether the demonstration lands before Veyra's enforcers decide it's a threat rather than a proof.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_strength_roll',
        text: 'Demonstrate the mark\'s physical coherence. Show Veyra what she\'s actually dealing with.',
        diceCheck: {
          stat: 'strength',
          difficulty: 8,
          diceType: 'd8',
          successNode: 'c12_saint_strength_success',
          failureNode: 'c12_saint_strength_fail',
          criticalFailureNode: 'c12_saint_crusade_death_end',
          successEffects: { ironSaints: 5, setFlags: ['veyra_impressed'] },
          failureEffects: { health: -15, ironSaints: -2 },
        },
      },
    ],
  },

  {
    id: 'c12_saint_strength_success',
    chapter: 'Chapter 12',
    title: 'A Different Assessment',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Veyra watches the demonstration with the specific attention of someone revising a document in real time. The mark's physical coherence — the way the demonstration doesn't look like corruption, looks like something else entirely — creates a pause in the crusade mandate's application. "That is not what the mandate describes," she says, which is as close to acknowledgment as Veyra gets. The Saints around her do not stand down. But they stop advancing. The window is narrow.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_strength_success_ally',
        text: 'The window is open. Move to alliance.',
        nextNode: 'c12_saint_ally_path',
      },
    ],
  },

  {
    id: 'c12_saint_strength_fail',
    chapter: 'Chapter 12',
    title: 'The Line Holds',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `The demonstration doesn't land. Not because it's wrong — because Veyra's institutional framework doesn't have room for evidence that contradicts the mandate's foundational premise. The Saints advance. The only available response is to move through them before the line closes. The path to Sera is through the front, not past it.`,
    effectsOnEnter: { health: -20, ironSaints: -3 },
    choices: [
      {
        id: 'c12_strength_fail_push',
        text: 'Push through to the front. Sera is the decision-maker when Veyra won\'t move.',
        nextNode: 'c12_saint_front_battle',
      },
    ],
  },

  {
    id: 'c12_saint_ally_path',
    chapter: 'Chapter 12',
    title: 'Saints at Your Back',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Veyra's revision of the mandate — formal, documented, the way she does everything — creates a new operational category: mark-bearer as non-vector, mission-classified. What this means in practice: the Saints behind you and a path to Inquisitor Sera's position that doesn't require fighting through twelve enforcement officers. The Saints' formation shifts. Cain, if present, reads it correctly and moves without being asked.`,
    effectsOnEnter: { ironSaints: 5, setFlags: ['saint_ally_secured'] },
    choices: [
      {
        id: 'c12_ally_cain',
        text: 'Cain moves to the tactical position. Let him clear the approach.',
        nextNode: 'c12_saint_cain_moment',
        requirements: { cainPresent: true },
      },
      {
        id: 'c12_ally_direct',
        text: 'Move directly to Sera\'s position.',
        nextNode: 'c12_saint_front_battle',
      },
    ],
  },

  {
    id: 'c12_saint_cain_moment',
    chapter: 'Chapter 12',
    title: 'Cain\'s Formation',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Cain doesn't clear the approach the way the Saints would — he doesn't clear it at all. He reads the formation geometry and finds the line that Sera's enforcement team hasn't covered. "They're watching the ground-level approaches," he says. "Sera's position has a second-floor access they haven't staffed yet." He is not asking permission. He is allocating the problem correctly. You follow his read. The Saints' formation creates enough noise coverage that Sera's enforcement team doesn't clock the approach until it's already complete.`,
    effectsOnEnter: { cainTrust: 2, setFlags: ['cain_tactical_saint_approach'] },
    choices: [
      {
        id: 'c12_cain_to_battle',
        text: 'Cain\'s approach worked. Move to Sera\'s position.',
        nextNode: 'c12_saint_front_battle',
      },
    ],
  },

  {
    id: 'c12_saint_front_battle',
    chapter: 'Chapter 12',
    title: 'Through the Front',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `The Saint Front's battle-line is not a battle — it is a pressure architecture. Six fixed positions applying directional force toward the Archive's perimeter, with Sera's enforcement arm running the precision work. Moving through it is the specific kind of navigation that doesn't look like fighting and functions identically to fighting. The mark reads the Saints' formation the way it reads any built structure: as accumulated decision. The decisions accumulating here are about the Archive, not about you, which makes them navigable if not comfortable.`,
    effectsOnEnter: { health: -10, setFlags: ['saint_front_navigated'] },
    choices: [
      {
        id: 'c12_battle_to_sera',
        text: 'Reach Inquisitor Sera\'s position.',
        nextNode: 'c12_saint_sera_scene',
      },
    ],
  },

  {
    id: 'c12_saint_sera_scene',
    chapter: 'Chapter 12',
    title: 'Inquisitor Sera',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Inquisitor Sera is the crusade's enforcement arm, which means she is the part that acts when the crusade's documented reasoning doesn't need to accompany the action. She is not cruel either. She is precise. The precision has a different quality than Veyra's — Veyra's is institutional, Sera's is personal. She has a specific opinion about the mark, about the sub-city, and about what the mark-bearer's survival of Chapter 11 means for the crusade mandate's operational integrity. The opinion is: it doesn't. "Veyra's revision doesn't extend to my operational mandate," she says. "My mandate is intact." She is holding it.`,
    effectsOnEnter: { setFlags: ['sera_confronted'] },
    choices: [
      {
        id: 'c12_sera_confront',
        text: 'Confront Sera directly. The mandate is built on wrong premises.',
        nextNode: 'c12_saint_sera_confront',
      },
      {
        id: 'c12_sera_yield',
        text: 'Yield to Sera\'s operational authority — temporarily. Find another path.',
        nextNode: 'c12_saint_outcome',
        effects: { ironSaints: -5, setFlags: ['sera_yielded_to'] },
      },
      {
        id: 'c12_sera_corrupt_trigger',
        text: 'The mark surges in Sera\'s presence. She responds with her mandate.',
        nextNode: 'c12_saint_crusade_death_end',
        requirements: { corruption: 70 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c12_saint_sera_confront',
    chapter: 'Chapter 12',
    title: 'The Mandate\'s Foundation',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Confronting Sera requires confronting the specific architecture of someone who has built their operational identity around a single premise. The premise: the mark is contamination, and contamination must be contained. The counter-premise, carried in the mark's twelve chapters of sub-city-verified resonance: the mark is not contamination; it is documentation of something the city built and lost and has been trying to reclaim. Whether Sera can hear the distinction between those two premises — and whether she can hear it in the time available — is the question the confrontation is actually asking.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_sera_dice_roll',
        text: 'Make the case directly. The sub-city truth is the only argument that reaches Sera\'s specific framework.',
        diceCheck: {
          stat: 'charisma',
          difficulty: 8,
          diceType: 'd10',
          successNode: 'c12_saint_sera_success',
          failureNode: 'c12_sera_execution_end',
          criticalFailureNode: 'c12_saint_crusade_death_end',
          successEffects: { ironSaints: 8, morale: 10, setFlags: ['sera_converted', 'sera_mandate_revised'] },
          failureEffects: { ironSaints: -5 },
        },
      },
    ],
  },

  {
    id: 'c12_saint_sera_success',
    chapter: 'Chapter 12',
    title: 'Revised Mandate',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `Sera listens to the sub-city evidence for four minutes. She is not persuaded in the way that most people mean when they use that word. She is a precision instrument and the evidence has moved the instrument's calibration. "The mandate was built on incomplete information," she says. "Incomplete mandates produce incomplete outcomes." She revises the operational order in writing. The revision takes forty seconds. The Saints' enforcement arm receives it sixty seconds after that. The crusade's active vector-hunting protocol pauses. The saints at the perimeter don't stand down — they redirect. Toward the Glass Court. Toward the city's actual active threats. The Saint Front becomes, for the first time, something navigable.`,
    effectsOnEnter: { ironSaints: 8, morale: 12, setFlags: ['sera_converted', 'saint_front_secured'] },
    choices: [
      {
        id: 'c12_sera_to_outcome',
        text: 'The Saint Front is secured. Move to the chapter\'s resolution.',
        nextNode: 'c12_saint_outcome',
      },
    ],
  },

  {
    id: 'c12_saint_outcome',
    chapter: 'Chapter 12',
    title: 'The Saints\' Position',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    text: `The Saint Front's outcome: the crusade mandate is either revised (Sera converted), paused (Veyra's temporary acknowledgment), or bypassed (you moved through without resolving it). In any configuration, the Saints are no longer the chapter's primary active threat. They are a force. Forces can be directed. The direction depends on what comes next at the Broken Throne. The mark reads the Saint position as: containable. Whether it is contained is still the player's question.`,
    effectsOnEnter: { setFlags: ['saint_outcome_resolved'] },
    choices: [
      {
        id: 'c12_saint_iron_crown',
        text: 'Claim the Iron Saints\' crown here. Sera and Veyra both stand behind it.',
        nextNode: 'c12_iron_crown_end',
        requirements: { factionRep: { ironSaints: 12 }, flags: ['sera_converted', 'veyra_alliance_claimed'] },
        effects: { setFlags: ['iron_saints_won'] },
      },
      {
        id: 'c12_saint_to_throne',
        text: 'Continue to the Broken Throne. The Saints\' position is resolved; the city\'s isn\'t.',
        nextNode: 'c12_broken_throne_arrive',
        effects: { setFlags: ['saint_outcome_complete'] },
      },
    ],
  },

  // ── GLASS BARRICADE ───────────────────────────────────────────────────────

  {
    id: 'c12_glass_barricade_arrive',
    chapter: 'Chapter 12',
    title: 'The Glass Barricade',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `The Glass Court's southeastern barricade is the most sophisticated defensive structure in the chapter — not because it is the most armed, but because it is the most information-dense. Every position has sight-lines calculated against the other four faction positions. The extraction device is visible from the barricade's interior: a structure approximately three meters tall, running on relic power, surrounded by Glass Court technical operatives who are either testing it or preparing to use it. Lady Seraphine is positioned at the barricade's center, where she has the maximum information flow and the minimum direct exposure. Director Varr is at the device.`,
    effectsOnEnter: { setFlags: ['glass_barricade_arrived'] },
    choices: [
      {
        id: 'c12_glass_noble_approach',
        text: 'The Glass Court\'s protocols respond to Glass Court genealogy. Use the fallen noble credentials.',
        nextNode: 'c12_glass_seraphine_scene',
        requirements: { backgrounds: ['fallen_noble'] },
        effects: { glassCourt: 3, setFlags: ['noble_glass_approach'] },
      },
      {
        id: 'c12_glass_direct',
        text: 'Approach Seraphine directly. The Glass Court values directness from people worth being direct with.',
        nextNode: 'c12_glass_seraphine_scene',
      },
    ],
  },

  {
    id: 'c12_glass_seraphine_scene',
    chapter: 'Chapter 12',
    title: 'Lady Seraphine',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `Lady Seraphine sees you before you reach her position. She has been watching the approaches for the last hour — watching everything, cataloguing it, placing it in the Glass Court's operational assessment with the specific efficiency of someone who has been doing this for decades. "The sub-city's gate event changed the mark's resonance profile," she says. Not as an accusation. As an observation. "The extraction device was calibrated against the pre-gate profile. The test three days ago was conducted against a bearer with an older mark." She looks at your wrist. "Your mark is different. The test data doesn't apply." She is offering information. The question is what she wants for it.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['seraphine_met'] },
    choices: [
      {
        id: 'c12_sera_glass_claim_trust',
        text: 'Invoke previous alliance with the Glass Court. There is a basis for trust here.',
        nextNode: 'c12_glass_extraction_device',
        requirements: { factionRep: { glassCourt: 7 } },
        effects: { glassCourt: 3, setFlags: ['seraphine_trust_invoked'] },
      },
      {
        id: 'c12_sera_glass_direct',
        text: 'Ask directly: what does Seraphine want in exchange for the extraction device assessment?',
        nextNode: 'c12_glass_extraction_device',
      },
      {
        id: 'c12_sera_glass_varr',
        text: 'Varr is at the device. Go to Varr first.',
        nextNode: 'c12_glass_varr_scene',
      },
    ],
  },

  {
    id: 'c12_glass_extraction_device',
    chapter: 'Chapter 12',
    title: 'The Extraction Device',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `The extraction device at close range reads differently than it reads from the barricade perimeter. The mark processes it as a specific threat: not to life, but to coherence. The device is not designed to remove marks — it is designed to destabilize the mark's architectural integration. What it produces in a bearer is not mark removal. It is mark fragmentation. The bearer in Glass Court medical custody has a fragmented mark. Fragmented marks don't heal at the same rate. The device is a weapon with documented collateral damage. Seraphine knows this. Her question — what she wants — is what you'll do with that knowledge.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['extraction_device_assessed'] },
    choices: [
      {
        id: 'c12_device_int_dice',
        text: 'Analyse the device\'s relic architecture. There is a disabling mechanism in the power structure.',
        nextNode: 'c12_glass_int_dice',
      },
      {
        id: 'c12_device_mira',
        text: 'Mira\'s medical assessment of the device is more useful than an architectural analysis.',
        nextNode: 'c12_glass_mira_analysis',
        requirements: { miraPresent: true },
      },
      {
        id: 'c12_device_schematic',
        text: 'The schematic from the market cache contains the disabling procedure.',
        nextNode: 'c12_glass_disable_device',
        requirements: { flags: ['extraction_schematic_carried'] },
        effects: { setFlags: ['device_disabled_via_schematic'] },
      },
    ],
  },

  {
    id: 'c12_glass_int_dice',
    chapter: 'Chapter 12',
    title: 'Relic Architecture Analysis',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `The extraction device's relic architecture is Glass Court engineering overlaid on a sub-city relic framework — the same underlying infrastructure that the Blackout Core, the Sealed Engine, and the Transit Line all use. The mark has spent eleven chapters navigating that infrastructure. The question is whether the navigation experience is enough to identify the device's disabling mechanism before the Glass Court technical operatives notice the analysis.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_glass_int_roll',
        text: 'Run the analysis. The mark\'s sub-city calibration is the only tool precise enough for this.',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 7,
          diceType: 'd8',
          successNode: 'c12_glass_int_success',
          failureNode: 'c12_glass_extraction_end',
          criticalSuccessNode: 'c12_glass_int_success',
          successEffects: { intelligence: 3, setFlags: ['device_weakness_identified'] },
          failureEffects: { corruption: 10, health: -20 },
        },
      },
    ],
  },

  {
    id: 'c12_glass_int_success',
    chapter: 'Chapter 12',
    title: 'The Weakness',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `The device's relic power structure has a single coherence anchor — a node that the Glass Court engineers placed at the center of the power routing because they designed the device on the assumption that nobody with direct sub-city mark experience would ever analyse it from within the Glass Court perimeter. The assumption was reasonable. The assumption was wrong. The coherence anchor is accessible. Disabling it doesn't destroy the device — it makes the device inert for approximately forty-eight hours, enough time to remove it from the chapter's active threat calculation.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['device_coherence_anchor_found'] },
    choices: [
      {
        id: 'c12_int_success_disable',
        text: 'Move to disable the device.',
        nextNode: 'c12_glass_disable_device',
      },
    ],
  },

  {
    id: 'c12_glass_varr_scene',
    chapter: 'Chapter 12',
    title: 'Director Varr',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `Director Varr at the extraction device looks like a man completing a professional obligation he no longer believes in. His body language is the specific language of someone who has decided something and has not yet acted on the decision. He is Glass Court intelligence. He has been Glass Court intelligence for twenty-three years. The decision on his face is about whether that is still true. He sees you approach and does not call the technical operatives. "The device's test data was falsified," he says, quietly. "I falsified it. To slow the deployment." He is either defecting or performing a defection. The shadow broker network's assessment, if you have it, is relevant here.`,
    effectsOnEnter: { setFlags: ['varr_scene_reached'] },
    choices: [
      {
        id: 'c12_varr_trust',
        text: 'Trust Varr\'s defection. Work with him to disable the device.',
        nextNode: 'c12_varr_betrayal_end',
        requirements: { blockedFlags: ['varr_defection_known'] },
      },
      {
        id: 'c12_varr_trust_network',
        text: 'Trust Varr. The shadow network confirmed the defection is real.',
        nextNode: 'c12_glass_juno_scene',
        requirements: { flags: ['varr_defection_known'] },
        effects: { glassCourt: 3, setFlags: ['varr_trusted'] },
      },
      {
        id: 'c12_varr_distrust',
        text: 'Don\'t trust Varr. Glass Court intelligence doesn\'t defect without a Glass Court objective.',
        nextNode: 'c12_glass_juno_scene',
        effects: { setFlags: ['varr_distrusted'] },
      },
    ],
  },

  {
    id: 'c12_glass_juno_scene',
    chapter: 'Chapter 12',
    title: 'Juno\'s Network',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `Juno is in the Glass Court barricade because Juno is always where the Glass Court's operational infrastructure is most vulnerable, which is where the servants are. The servant network from Chapter 5 has maintained structural continuity — the same people, the same channels, now running interference for the mark-bearer rather than for the Glass Court's internal operations. Juno doesn't say this is unexpected. "The device was always going to be the chapter's pivot," she says. "We've had a disabling access point for two days. We were waiting for someone who could use it."`,
    effectsOnEnter: { setFlags: ['juno_contacted'] },
    choices: [
      {
        id: 'c12_juno_to_disable',
        text: 'Use Juno\'s access point. The servant network has already done the positioning.',
        nextNode: 'c12_glass_disable_device',
        effects: { glassCourt: 2, setFlags: ['juno_network_active'] },
      },
    ],
  },

  {
    id: 'c12_glass_mira_analysis',
    chapter: 'Chapter 12',
    title: 'Mira\'s Assessment',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `Mira examines the extraction device with the attention she gives everything that has done medical damage: completely and without announcing her conclusions until she has them. Three minutes. "It's not extracting the mark. It's attempting to sever the mark's neural integration. The bearer in Glass Court medical custody has severed integration pathways — they're experiencing proprioceptive disruption, sensory processing errors, and what I would clinically describe as phantom mark syndrome." She pauses. "It's a torture device with research applications." She looks at Seraphine's position. "The disabling mechanism is the power node at the base. I can walk you through it.`,
    effectsOnEnter: { intelligence: 3, miraTrust: 2, setFlags: ['device_medical_assessed', 'device_disable_known'] },
    choices: [
      {
        id: 'c12_mira_to_disable',
        text: 'Follow Mira\'s walkthrough. Disable the device.',
        nextNode: 'c12_glass_disable_device',
      },
    ],
  },

  {
    id: 'c12_glass_disable_device',
    chapter: 'Chapter 12',
    title: 'Disabling',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `The extraction device goes inert in the specific way that relic-powered structures go inert: not with a dramatic shutdown, but with a gradual dimming, the coherence anchor's signal fading across the frequency band the mark can read. The Glass Court technical operatives notice it in approximately thirty seconds. By thirty seconds, the access window is either used or irrelevant. Seraphine watches from her position. Her expression: not surprised. The expression of someone whose variable has been resolved in a way she already calculated as probable.`,
    effectsOnEnter: { glassCourt: 5, setFlags: ['extraction_device_disabled'] },
    choices: [
      {
        id: 'c12_disable_to_outcome',
        text: 'The device is disabled. The Glass Court position is resolved.',
        nextNode: 'c12_glass_outcome',
      },
    ],
  },

  {
    id: 'c12_glass_outcome',
    chapter: 'Chapter 12',
    title: 'The Glass Court\'s Position',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    text: `The Glass Court's extraction device is disabled. Seraphine's response to this is, characteristically, not what it appears to be. She does not protest, because Seraphine never protests outcomes she has already calculated. She revises. The Glass Court's position in the chapter shifts from active threat to passive observer — powerful, informed, watching the Broken Throne from the southeast with the specific patience of a faction that has been waiting for the city's decision to become calculable before committing to it.`,
    effectsOnEnter: { setFlags: ['glass_outcome_resolved'] },
    choices: [
      {
        id: 'c12_glass_crown_claim',
        text: 'Claim the Glass Crown here. Seraphine will formalize it.',
        nextNode: 'c12_glass_crown_end',
        requirements: { factionRep: { glassCourt: 12 }, flags: ['extraction_device_disabled', 'seraphine_trust_invoked'] },
        effects: { setFlags: ['glass_court_won'] },
      },
      {
        id: 'c12_glass_to_throne',
        text: 'Continue to the Broken Throne. The Glass Court position is resolved.',
        nextNode: 'c12_broken_throne_arrive',
        effects: { setFlags: ['glass_outcome_complete'] },
      },
    ],
  },

  // ── RED CHOIR MARCH ───────────────────────────────────────────────────────

  {
    id: 'c12_red_choir_arrive',
    chapter: 'Chapter 12',
    title: 'The Red Choir March',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `The Red Choir March is east and moving. The march is not a military formation — it is a procession, which is something the Red Choir does that other factions don't: it moves through the city with the specific quality of something that knows it cannot be stopped by conventional force because it is not a conventional force. Mother Veyl is at the march's center, which is the only safe position when the march is broadcasting — the edges receive more direct resonance and the effect on unconditioned people is documented and significant. The march is building toward its final transmission. The time window is approximately two hours.`,
    effectsOnEnter: { setFlags: ['red_choir_march_entered'] },
    choices: [
      {
        id: 'c12_choir_to_veyl',
        text: 'Reach Mother Veyl before the transmission builds further.',
        nextNode: 'c12_choir_veyl_scene',
      },
    ],
  },

  {
    id: 'c12_choir_veyl_scene',
    chapter: 'Chapter 12',
    title: 'Mother Veyl',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `Mother Veyl at the march's center is older than she looked in earlier chapters — the march takes something from her that the stationary Choir spaces don't. She sings while she walks, under her breath, in the register the mark has learned to read as the Choir's specific frequency: not the First Voice's signal, not the mark's architecture, but the seventeen-fold network that the Red Choir's infected have been maintaining since Chapter 6. She sees the mark before she sees the bearer. "The sub-city gate's departure changed the signal," she says. "The seventeen are stabilising without the First Voice's carrier. The march is the carrier now." She is not asking you to understand this. She is reporting a fact. "The broadcast will complete in two hours. I can redirect it. The question is whether you can give me a reason to."`,
    effectsOnEnter: { setFlags: ['veyl_met'] },
    choices: [
      {
        id: 'c12_veyl_underground_medic',
        text: 'Assess Veyl\'s physiological state. The march is taking something from her.',
        nextNode: 'c12_choir_underground_medic',
        requirements: { backgrounds: ['underground_medic'] },
      },
      {
        id: 'c12_veyl_broadcast',
        text: 'Give Veyl a reason. Name what the broadcast should carry instead.',
        nextNode: 'c12_choir_broadcast_choice',
      },
    ],
  },

  {
    id: 'c12_choir_underground_medic',
    chapter: 'Chapter 12',
    title: 'What the March Costs',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `The underground medic's assessment of Mother Veyl: the march is consuming her at a rate the Choir's caregivers have not disclosed to Veyl herself. The seventeen-fold network requires a human anchor at the center when operating at this broadcast intensity. The anchor absorbs the signal variance that would otherwise fragment the network. Veyl knows this and has chosen it. The assessment changes the conversation: the broadcast redirection is not just strategic. It is medical. If the broadcast completes at full intensity, Veyl is the cost.`,
    effectsOnEnter: { miraTrust: 1, setFlags: ['veyl_medical_known', 'broadcast_cost_known'] },
    choices: [
      {
        id: 'c12_medic_to_broadcast',
        text: 'Tell Veyl what the assessment found. She deserves to know the cost she\'s paying.',
        nextNode: 'c12_choir_broadcast_choice',
        effects: { redChoir: 3, setFlags: ['veyl_cost_disclosed'] },
      },
    ],
  },

  {
    id: 'c12_choir_broadcast_choice',
    chapter: 'Chapter 12',
    title: 'The Broadcast',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `The broadcast in its current form will transmit the seventeen-fold network's accumulated signal across the city's broadcast infrastructure — every speaker, every public address system, every relic resonator that the Red Choir's three-year project has identified and seeded. The effect on unbearered people is documented: seventeen-fold exposure produces temporary mark sensitivity in approximately forty percent of the population, permanent sensitivity in approximately eight percent. The effect on bearers is different. The mark processes it as signal saturation: the First Voice's departure made the channel available, and the Choir's network will fill it if the broadcast completes unchallenged.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_broadcast_esper',
        text: 'Interface the mark directly with the seventeen-fold network. The esper capacity can redirect it.',
        nextNode: 'c12_choir_esper_route',
        requirements: { classes: ['esper'] },
      },
      {
        id: 'c12_broadcast_redirect',
        text: 'Redirect the broadcast. Give Veyl the sub-city truth as the signal. What the city needs to hear instead.',
        nextNode: 'c12_choir_cha_dice',
        requirements: { factionRep: { redChoir: 5 } },
      },
      {
        id: 'c12_broadcast_negotiate',
        text: 'Negotiate the redirect without faction standing. The sub-city truth is the argument.',
        nextNode: 'c12_choir_cha_dice',
      },
      {
        id: 'c12_broadcast_let_continue',
        text: 'Let the broadcast continue. The city needs the signal, whatever the cost.',
        nextNode: 'c12_choir_city_end',
        requirements: { corruption: 60 },
      },
    ],
  },

  {
    id: 'c12_choir_esper_route',
    chapter: 'Chapter 12',
    title: 'Esper Interface',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `The esper's mark-architecture can directly interface the seventeen-fold network without passing through the broadcast infrastructure. Veyl watches the interface begin with the expression of someone who has spent three years building a structure and is watching someone navigate it in thirty seconds. The interface is not comfortable — the seventeen frequencies are coherent individually and cacophonous in parallel — but the esper's training is specifically the training for parallel signal management. The redirect happens at the network level, not the broadcast level. Cleaner, faster, and at approximately a third of the signal cost Veyl was calculating.`,
    effectsOnEnter: { redChoir: 8, morale: 5, setFlags: ['broadcast_esper_redirected', 'esper_network_interface'] },
    choices: [
      {
        id: 'c12_esper_to_redirect',
        text: 'The esper redirect is complete. The broadcast carries the sub-city truth.',
        nextNode: 'c12_choir_redirect_attempt',
      },
    ],
  },

  {
    id: 'c12_choir_cha_dice',
    chapter: 'Chapter 12',
    title: 'The Reason',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `Veyl needs a reason to redirect a broadcast she has spent three years building toward this moment. The reason has to be a better broadcast — something the city needs to hear more than the seventeen-fold network's raw signal. The sub-city truth is the candidate. Whether Veyl hears it as sufficient depends on whether the bearing of it — the specific weight of twelve chapters of evidence — reaches her in the way that moves the seventeen-fold anchor to redirect rather than transmit.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_choir_dice_roll',
        text: 'Give Veyl the reason. The sub-city truth, the Containment Protocol, the entity\'s departure — everything the mark has carried.',
        diceCheck: {
          stat: 'charisma',
          difficulty: 6,
          diceType: 'd8',
          successNode: 'c12_choir_cha_success',
          failureNode: 'c12_choir_cha_fail',
          criticalFailureNode: 'c12_choir_consumed_end',
          successEffects: { redChoir: 6, morale: 8, setFlags: ['veyl_redirected'] },
          failureEffects: { redChoir: -3, morale: -5, setFlags: ['redirect_failed'] },
        },
      },
    ],
  },

  {
    id: 'c12_choir_cha_success',
    chapter: 'Chapter 12',
    title: 'The New Signal',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `Veyl is quiet for a long time. The march continues around her. Then she begins a different song — not the seventeen-fold network's frequency, but something that sounds older and more specific. The march follows. The broadcast infrastructure, seeded across three years, receives the redirect. What the city hears over the next two hours is not the seventeen-fold signal. It is the sub-city truth. The Containment Protocol's history. The entity's departure. The gate's holding. The city receives it the way cities receive things they didn't expect: unevenly, with conflict, with the specific recalibration of people who have been told that what they were fighting over is not what it appeared to be.`,
    effectsOnEnter: { redChoir: 8, morale: 10, setFlags: ['broadcast_redirected', 'city_truth_broadcast'] },
    choices: [
      {
        id: 'c12_choir_success_redirect',
        text: 'The broadcast is redirected. The Choir march becomes something different.',
        nextNode: 'c12_choir_redirect_attempt',
      },
    ],
  },

  {
    id: 'c12_choir_cha_fail',
    chapter: 'Chapter 12',
    title: 'Insufficient',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `Veyl listens. The reason doesn't reach her. Not because it's wrong — because Veyl's three-year commitment to this broadcast is built around a specific premise about what the city needs, and the sub-city truth, as presented, doesn't displace that premise. The march continues. The broadcast window narrows. The redirect has failed, which means the broadcast will complete unless the march can be physically redirected — the city's infrastructure, not Veyl's signal.`,
    effectsOnEnter: { redChoir: -3, morale: -5, setFlags: ['redirect_failed'] },
    choices: [
      {
        id: 'c12_choir_fail_redirect',
        text: 'The signal redirect failed. Try to physically redirect the march route.',
        nextNode: 'c12_choir_redirect_attempt',
      },
    ],
  },

  {
    id: 'c12_choir_redirect_attempt',
    chapter: 'Chapter 12',
    title: 'The March\'s Direction',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `Whether the redirect worked or failed, the march is still moving. The broadcast infrastructure is still counting down. The march's physical direction determines which broadcast towers receive the signal first. Redirecting the march's physical route changes the broadcast's propagation pattern — it doesn't stop the broadcast, but it changes what the broadcast reaches and when. The window is narrow. The mark reads the march's current trajectory and the alternative routes simultaneously.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_redirect_success_path',
        text: 'Lead the march through the alternative route. The broadcast lands on the Broken Throne first.',
        nextNode: 'c12_choir_outcome',
        effects: { redChoir: 3 },
      },
      {
        id: 'c12_redirect_broadcast_completes',
        text: 'The march cannot be redirected. The broadcast completes. The city burns.',
        nextNode: 'c12_city_burns_end',
        requirements: { flags: ['redirect_failed'] },
      },
    ],
  },

  {
    id: 'c12_choir_outcome',
    chapter: 'Chapter 12',
    title: 'The Choir\'s Position',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    text: `The Red Choir march has been redirected — either through the signal or through the route — and the broadcast is carrying something different than what it was built to carry. The seventeen-fold network's signal is still present, but attenuated. The city is hearing the sub-city truth, the Choir's march, and something that is neither: the specific sound of a city deciding what it believes. Veyl walks at the march's center, quieter than before. The cost is visible on her. The march is moving toward the Broken Throne.`,
    effectsOnEnter: { setFlags: ['choir_outcome_resolved'] },
    choices: [
      {
        id: 'c12_choir_red_crown',
        text: 'Claim the Red Crown here. Veyl will carry it as the march arrives at the Throne.',
        nextNode: 'c12_red_crown_end',
        requirements: { factionRep: { redChoir: 12 }, flags: ['broadcast_redirected'] },
        effects: { setFlags: ['red_choir_won'] },
      },
      {
        id: 'c12_choir_to_throne',
        text: 'Move with the march to the Broken Throne.',
        nextNode: 'c12_broken_throne_arrive',
        effects: { setFlags: ['choir_outcome_complete'] },
      },
    ],
  },

  // ── ARCHIVE SIEGE ─────────────────────────────────────────────────────────

  {
    id: 'c12_archive_siege_arrive',
    chapter: 'Chapter 12',
    title: 'The Archive Siege',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The Last Archive's exterior is under simultaneous pressure from all four remaining factions — the Iron Saints from the north, the Glass Court from the southeast, the Red Choir from the east, and the Hollow Children from the tunnel access points beneath the Archive's foundation. Archivist Mael's people are holding the perimeter, but holding a perimeter under four-directional pressure is a question of time and reserves, and both are diminishing. The Archive's interior contains everything the sub-city's truth supplements: the surface records of the Containment Protocol, the faction origin documentation, and Mael's failsafe — which the shadow network identified as a specific architectural measure, purpose unknown.`,
    effectsOnEnter: { setFlags: ['archive_siege_arrived'] },
    choices: [
      {
        id: 'c12_archive_relic_scan',
        text: 'Run a relic scan on the Archive\'s exterior. The siege pressure has relic components the Archive people haven\'t mapped.',
        nextNode: 'c12_archive_relic_hunter_scan',
        requirements: { classes: ['relic_hunter'] },
      },
      {
        id: 'c12_archive_to_mael',
        text: 'Reach Archivist Mael. The Archive\'s interior is the priority.',
        nextNode: 'c12_archive_mael_scene',
      },
    ],
  },

  {
    id: 'c12_archive_relic_hunter_scan',
    chapter: 'Chapter 12',
    title: 'The Siege\'s Relic Layer',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The relic hunter's scan of the Archive exterior identifies what the Archive's defenders have not mapped: three relic amplifiers embedded in the siege positions — Glass Court equipment, positioned to enhance the extraction device's signal range during the siege. The amplifiers are not active yet; they are being held in reserve. Disabling them doesn't end the siege, but it removes the Glass Court's enhancement layer from the siege's threat calculation and buys Mael's defenders approximately three additional hours. The scan also identifies the Hollow Children's tunnel access points — not as a threat, but as a route into the Archive that bypasses the surface siege entirely.`,
    effectsOnEnter: { relics: 1, intelligence: 3, setFlags: ['relic_scan_archive', 'amplifiers_identified', 'hollow_tunnel_route_known'] },
    choices: [
      {
        id: 'c12_relic_scan_to_outcome',
        text: 'Use the relic scan data to disable the amplifiers before reaching Mael.',
        nextNode: 'c12_archive_outcome',
        effects: { lastArchive: 5, setFlags: ['amplifiers_disabled'] },
      },
      {
        id: 'c12_relic_scan_to_mael',
        text: 'Report the scan to Mael directly. He needs the information to hold the perimeter.',
        nextNode: 'c12_archive_mael_scene',
        effects: { lastArchive: 3 },
      },
    ],
  },

  {
    id: 'c12_archive_mael_scene',
    chapter: 'Chapter 12',
    title: 'Archivist Mael',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `Archivist Mael inside the Archive's perimeter is a different person than Archivist Mael at the War Council table. At the table, he was protecting something. Inside the Archive, he is protecting everything. The document stack he carried to the Council is not symbolic — it is the physical backup of the Containment Protocol's complete record, the one document set that the Archive's relic storage system cannot duplicate because the duplication infrastructure was severed in the Blackout. Mael looks at the mark with the expression of someone who has been waiting for this conversation for the entire duration of the Archive's siege. "You have the sub-city's truth," he says. "I have the surface record. Together they are the complete picture. The question is what we do with it."`,
    effectsOnEnter: { intelligence: 2, setFlags: ['mael_inside_reached'] },
    choices: [
      {
        id: 'c12_mael_scholar',
        text: 'The Archive\'s documentation framework is familiar. Engage on its terms.',
        nextNode: 'c12_archive_scholar_route',
        requirements: { backgrounds: ['forgotten_scholar'] },
      },
      {
        id: 'c12_mael_truth_bearer',
        text: 'The truth-bearer route from Chapter 11 carries the sub-city\'s complete record. Give it to Mael.',
        nextNode: 'c12_archive_truth_bearer_route',
        requirements: { flags: ['truth_bearer_ch12'] },
      },
      {
        id: 'c12_mael_analyse',
        text: 'Analyse the complete picture together. The mark\'s sub-city resonance supplements Mael\'s surface records.',
        nextNode: 'c12_archive_int_dice',
      },
      {
        id: 'c12_mael_yield',
        text: 'Yield the sub-city records to Mael\'s custody entirely. Let the Archive hold everything.',
        nextNode: 'c12_mael_seal_end',
        effects: { lastArchive: -10 },
      },
    ],
  },

  {
    id: 'c12_archive_scholar_route',
    chapter: 'Chapter 12',
    title: 'The Scholar\'s Frame',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The forgotten scholar's background means the Archive's documentation framework is not foreign — it is the framework the scholar trained in, before the circumstances that made the scholar's knowledge informal rather than institutional. Mael recognizes it immediately. Not the name — the methodology. The way the mark-bearer approaches the documents, the questions they ask, the specific structure of how they organize incomplete records. "You were trained here," he says. Not an accusation. A recognition. The scholar framework creates a specific kind of trust between the mark-bearer and Mael's professional assessment of the sub-city evidence. The analysis proceeds faster and lands more completely.`,
    effectsOnEnter: { intelligence: 3, lastArchive: 5, setFlags: ['scholar_archive_trust', 'mael_trust_established'] },
    choices: [
      {
        id: 'c12_scholar_to_int_dice',
        text: 'Use the scholarly framework to complete the archive analysis.',
        nextNode: 'c12_archive_int_dice',
      },
    ],
  },

  {
    id: 'c12_archive_truth_bearer_route',
    chapter: 'Chapter 12',
    title: 'The Complete Record',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The truth-bearer configuration from Chapter 11 — both companions, full sub-city documentation, the First Gate's complete record — produces a reaction in Mael that is not emotional in the way most people mean when they use that word. It is professional. He processes the sub-city evidence with the attention of someone whose entire career has been building toward the moment when this specific record would surface. "The surface documentation I have and the sub-city record you carry are complementary," he says. "Together they constitute the complete Containment Protocol history — the founding, the Blackout, the entity's presence, the departure protocol. This is the document that resolves the faction war." He is not overstating. He is assessing.`,
    effectsOnEnter: { intelligence: 5, lastArchive: 10, setFlags: ['complete_record_assembled', 'faction_resolution_available'] },
    choices: [
      {
        id: 'c12_truth_bearer_to_outcome',
        text: 'The complete record is assembled. Move to the Archive\'s resolution.',
        nextNode: 'c12_archive_outcome',
        effects: { setFlags: ['archive_truth_complete'] },
      },
    ],
  },

  {
    id: 'c12_archive_int_dice',
    chapter: 'Chapter 12',
    title: 'The Analysis',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The sub-city record and Mael's surface documentation together: one hundred and sixty-three years of the Containment Protocol's operation, cross-referenced against the entity's communication history, the faction origin documentation, and the Blackout's technical record. Whether the analysis produces a usable conclusion depends on whether the mark's specific sub-city calibration is sufficient to bridge the gap between what the sub-city record shows and what the surface documentation assumes.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_archive_int_roll',
        text: 'Run the full analysis. The mark\'s sub-city experience is the bridge.',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 8,
          diceType: 'd10',
          successNode: 'c12_archive_int_success',
          failureNode: 'c12_archive_int_fail',
          criticalSuccessNode: 'c12_archive_int_success',
          successEffects: { intelligence: 4, lastArchive: 6, setFlags: ['archive_analysis_complete', 'faction_resolution_available'] },
          failureEffects: { intelligence: 1, lastArchive: -2, setFlags: ['archive_analysis_partial'] },
        },
      },
    ],
  },

  {
    id: 'c12_archive_int_success',
    chapter: 'Chapter 12',
    title: 'The Complete Picture',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The analysis produces the complete picture. Not just the Containment Protocol's history — the faction resolution pathway. The five factions' current conflict is built around a misattribution: they believe they are fighting over the Archive's resources and the mark-bearer's authority. They are actually fighting over a question that the complete record answers definitively: who built the city, who destroyed it, and what the city's infrastructure was designed to do. The record answers all three. The answer removes the factual basis for the faction war. Whether the factions accept the answer is a different question, but the answer exists and is documentable.`,
    effectsOnEnter: { intelligence: 3 },
    choices: [
      {
        id: 'c12_int_success_vorn',
        text: 'Verify the record against what Vorn revealed in the sub-city.',
        nextNode: 'c12_archive_vorn_final',
        requirements: { flags: ['vorn_trusted'] },
      },
      {
        id: 'c12_int_success_mira',
        text: 'Have Mira cross-reference the medical implications of the complete record.',
        nextNode: 'c12_archive_mira_analysis',
        requirements: { miraPresent: true },
      },
      {
        id: 'c12_int_success_outcome',
        text: 'The analysis is complete. Move to the Archive\'s resolution.',
        nextNode: 'c12_archive_outcome',
      },
    ],
  },

  {
    id: 'c12_archive_int_fail',
    chapter: 'Chapter 12',
    title: 'Partial Record',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `The analysis is partial. The bridge between sub-city record and surface documentation doesn't fully connect — there are gaps that the mark's current calibration can't bridge, because the gaps exist in the Foundation Period records that predate both the Archive's formal establishment and the entity's communication history. What the partial analysis produces: a usable but incomplete picture. Enough to resolve most of the faction war's factual basis. Not enough to answer the founding question definitively.`,
    effectsOnEnter: { setFlags: ['archive_analysis_partial'] },
    choices: [
      {
        id: 'c12_fail_to_outcome',
        text: 'The partial record is still usable. Move to the Archive\'s resolution.',
        nextNode: 'c12_archive_outcome',
      },
    ],
  },

  {
    id: 'c12_archive_vorn_final',
    chapter: 'Chapter 12',
    title: 'Vorn\'s Final Account',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `Vorn's sub-city account, cross-referenced with Mael's surface documentation, closes the Foundation Period gap. Vorn was not a Blackout Project engineer — he was the Blackout Project's archivist. He had the Foundation Period records. He took them into the sub-city when the Blackout Project was officially concluded because officially concluding a project that hasn't actually concluded is the kind of thing that requires a complete record to exist somewhere outside the official record. His account and the Archive's surface documentation together constitute the complete history. The faction war's factual basis is fully resolved.`,
    effectsOnEnter: { intelligence: 4, lastArchive: 5, setFlags: ['foundation_period_resolved', 'complete_record_assembled'] },
    choices: [
      {
        id: 'c12_vorn_to_outcome',
        text: 'The record is complete. Move to resolution.',
        nextNode: 'c12_archive_outcome',
      },
    ],
  },

  {
    id: 'c12_archive_mira_analysis',
    chapter: 'Chapter 12',
    title: 'Mira\'s Cross-Reference',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `Mira's cross-reference of the complete record produces the detail that changes the medical framing of everything the faction war is about: the mark-bearing population's long-term trajectory, as described by the Foundation Period records, is not a deterioration toward the Red Choir's Stage Three. It is an adaptation. The Containment Protocol was not designed to stop the marks. It was designed to manage the adaptation rate. The marks are the city's immune response to the entity's presence — and the entity's departure has not ended the adaptation. It has resolved it into its intended endpoint. The marked are not vectors. They are the city's first successful generation of adapted inhabitants. Mira is quiet for a long time after she reads this. "They've been fighting each other over a disease that isn't a disease," she says.`,
    effectsOnEnter: { intelligence: 4, miraTrust: 3, lastArchive: 5, setFlags: ['mark_adaptation_known', 'mira_archive_synthesis'] },
    choices: [
      {
        id: 'c12_mira_to_outcome',
        text: 'The cross-reference is complete. Move to resolution.',
        nextNode: 'c12_archive_outcome',
      },
    ],
  },

  {
    id: 'c12_archive_outcome',
    chapter: 'Chapter 12',
    title: 'The Archive\'s Position',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    text: `Mael's position inside the siege, with the complete or partial record assembled: the Archive is holding. Not indefinitely, but long enough. Mael has the failsafe — the shadow network identified it correctly. What the failsafe is: a broadcast infrastructure independent of the Red Choir's network, built into the Archive's Foundation Period architecture, capable of transmitting the complete record to every registered document-receiving station in the city simultaneously. Mael hasn't used it because the record wasn't complete. It is complete now, or close enough. He looks at the mark. "When you're ready," he says.`,
    effectsOnEnter: { lastArchive: 5, setFlags: ['archive_outcome_resolved', 'mael_failsafe_ready'] },
    choices: [
      {
        id: 'c12_archive_archive_crown',
        text: 'Claim the Archive Crown here. Activate Mael\'s failsafe and let the record speak.',
        nextNode: 'c12_archive_crown_end',
        requirements: { factionRep: { lastArchive: 12 }, flags: ['archive_analysis_complete'] },
        effects: { setFlags: ['archive_won'] },
      },
      {
        id: 'c12_archive_to_throne',
        text: 'Continue to the Broken Throne. The Archive will hold.',
        nextNode: 'c12_broken_throne_arrive',
        effects: { setFlags: ['archive_outcome_complete'] },
      },
    ],
  },

  // ── HOLLOW CHILDREN HIDEOUT ───────────────────────────────────────────────

  {
    id: 'c12_hollow_arrive',
    chapter: 'Chapter 12',
    title: 'The Hollow Children Hideout',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The Hollow Children's surface emergence point is below the Burning Market — the tunnel access that the Red Choir's march has been inadvertently guarding for the last twelve hours. The hideout is not hidden; it is in plain sight, which is how the Hollow Children have been surviving on the surface for the six hours since the emergence. They move through the city the way they move through tunnels: with the specific awareness of people who have learned to read structural load rather than social cues. The surface is a new environment. They are adapting to it in real time.`,
    effectsOnEnter: { setFlags: ['hollow_hideout_arrived'] },
    choices: [
      {
        id: 'c12_hollow_orphan_approach',
        text: 'The wasteland orphan knows how to read survival adaptation. Approach through that lens.',
        nextNode: 'c12_hollow_orphan_recognition',
        requirements: { backgrounds: ['wasteland_orphan'] },
      },
      {
        id: 'c12_hollow_hollow_rep',
        text: 'The sub-city contact established a basis for approach.',
        nextNode: 'c12_hollow_chalk_guide',
        requirements: { factionRep: { hollowChildren: 5 } },
        effects: { hollowChildren: 3 },
      },
      {
        id: 'c12_hollow_direct',
        text: 'Approach directly. The emergence is recent; the Children haven\'t established surface threat protocols yet.',
        nextNode: 'c12_hollow_chalk_guide',
      },
    ],
  },

  {
    id: 'c12_hollow_orphan_recognition',
    chapter: 'Chapter 12',
    title: 'Survival Recognition',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The wasteland orphan reads the Hollow Children's surface adaptation the way they read any survival adaptation: as a set of learned responses to specific environmental pressures. The Children's surface movement patterns, their resource allocation, their communication signals — all of it maps to the wasteland orphan's experience of learning to exist in spaces not designed for habitation. The recognition is mutual. The Children register the wasteland orphan background in the same way the sub-city's housing block registered it: as a kinship marker. Not faction affiliation. Something older.`,
    effectsOnEnter: { morale: 5, hollowChildren: 5, setFlags: ['hollow_orphan_recognized'] },
    choices: [
      {
        id: 'c12_orphan_to_chalk',
        text: 'The recognition creates a path to Mother Chalk.',
        nextNode: 'c12_hollow_chalk_guide',
      },
    ],
  },

  {
    id: 'c12_hollow_chalk_guide',
    chapter: 'Chapter 12',
    title: 'Mother Chalk, Underground',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `Mother Chalk in the hideout is different from Mother Chalk in the market. In the market she was reporting. Here, she is present in the way she was present in the sub-city: as someone who has been below the thing everyone else is arguing about and can therefore read it from the foundation rather than the surface. "The Hollow Children emerged because the sub-city's resonance field changed after the gate event," she says. "The signal that kept them below — the entity's carrier frequency — is gone. The tunnels are quiet for the first time in three hundred years." She pauses. "They don't know what to do with quiet." The Children around her confirm this nonverbally. They are listening for something that is no longer there.`,
    effectsOnEnter: { morale: 3, setFlags: ['chalk_hollow_guide'] },
    choices: [
      {
        id: 'c12_chalk_sera_hint',
        text: 'There\'s a hidden presence in the hideout. Someone who doesn\'t move like a Hollow Child.',
        nextNode: 'c12_hollow_sera_hidden',
      },
      {
        id: 'c12_chalk_to_choice',
        text: 'Ask Chalk what the Children need from the surface conflict.',
        nextNode: 'c12_hollow_children_choice',
      },
    ],
  },

  {
    id: 'c12_hollow_sera_hidden',
    chapter: 'Chapter 12',
    title: 'Hidden in the Hideout',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The figure in the hideout's northwest corner is Juno's contact — or more precisely: Sera. Not Inquisitor Sera with her mandate active. Sera without the mandate: someone who followed the Saints' crusade for fifteen years and arrived, three hours ago, at the specific point where a person realizes the thing they have been doing is not the thing they meant to do. She is in a Hollow Children's space because the Hollow Children are the one faction not actively hunting Saints who have stopped hunting. She sees the mark-bearer and does not move toward or away. "I'm not here as Inquisitor," she says. "I'm not sure I'm Inquisitor anymore." The hideout's access route is behind her.`,
    effectsOnEnter: { setFlags: ['sera_hidden_found'] },
    choices: [
      {
        id: 'c12_sera_hidden_navigate',
        text: 'Navigate through the hideout. Sera\'s position isn\'t a threat; use the access route.',
        nextNode: 'c12_hollow_agility_dice',
      },
      {
        id: 'c12_sera_hidden_speak',
        text: 'Speak to Sera directly. Her presence here changes the Saint Front\'s calculation.',
        nextNode: 'c12_hollow_agility_dice',
        effects: { ironSaints: 3, setFlags: ['sera_reached_hollow'] },
      },
    ],
  },

  {
    id: 'c12_hollow_agility_dice',
    chapter: 'Chapter 12',
    title: 'The Hideout\'s Access Route',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The hideout's internal access route requires navigating the same tunnel infrastructure the Hollow Children use to move between emergence points — built for people who have been moving through tight spaces their entire lives, adjusted for someone who hasn't. The Children watch without comment. The mark reads the route's structural geometry the same way it read the sub-city's tunnel system: as a problem with a specific solution that the body needs to find before the mind does.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_hollow_agility_roll',
        text: 'Navigate the route. The sub-city experience applies here.',
        diceCheck: {
          stat: 'agility',
          difficulty: 6,
          diceType: 'd6',
          successNode: 'c12_hollow_agility_success',
          failureNode: 'c12_hollow_agility_fail',
          criticalFailureNode: 'c12_hollow_collapse_end',
          successEffects: { hollowChildren: 3, setFlags: ['hollow_route_navigated'] },
          failureEffects: { health: -20, hollowChildren: -2 },
        },
      },
    ],
  },

  {
    id: 'c12_hollow_agility_success',
    chapter: 'Chapter 12',
    title: 'Through the Structure',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The route navigates correctly. The Hollow Children register this without celebration — they do not celebrate competence, they register it. One of the Children says something in the sub-city's tunnel language, and three others repeat it. Chalk translates: "They say you move like someone who has been below." The route opens into the hideout's main gathering space — a converted sub-basement, large enough for forty people, currently holding sixty-three. The Hollow Children who have surfaced. All of them, in one space, listening to a city they have never directly experienced.`,
    effectsOnEnter: { hollowChildren: 5, setFlags: ['hollow_main_space_reached'] },
    choices: [
      {
        id: 'c12_agility_to_choice',
        text: 'Address the gathered Children. They surfaced because the quiet drove them up; they need a reason to stay.',
        nextNode: 'c12_hollow_children_choice',
      },
    ],
  },

  {
    id: 'c12_hollow_agility_fail',
    chapter: 'Chapter 12',
    title: 'The Route Resists',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The route does not navigate correctly. Not a collapse — a wrong turn, a tunnel branch that the sub-city's architecture suggested was navigable and turned out to be load-bearing. The Children pull you out before the structure fails. Health cost: significant. The main space is still accessible through the surface route, which is less efficient and more exposed, but functional.`,
    effectsOnEnter: { health: -25, hollowChildren: -2 },
    choices: [
      {
        id: 'c12_fail_to_choice',
        text: 'Use the surface access route. The structural damage is isolated.',
        nextNode: 'c12_hollow_children_choice',
      },
    ],
  },

  {
    id: 'c12_hollow_children_choice',
    chapter: 'Chapter 12',
    title: 'What the Children Need',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `Sixty-three Hollow Children in a converted sub-basement, listening to a city that has been deciding their fate without including them in the decision for three hundred years. The question they are asking — through Chalk, through the Children's representative who went to the War Council unauthorized, through the specific quality of the way sixty-three people are waiting — is: is there a place for us here. Not metaphorically. Specifically: the surface city, the faction war's aftermath, the city that will exist on the other side of this chapter. Is there a place for the Hollow Children in it, or do they go back below.`,
    effectsOnEnter: { setFlags: ['hollow_children_addressed'] },
    choices: [
      {
        id: 'c12_hollow_runaway',
        text: 'The runaway experiment knows what it is to be made by a system and then excluded from it. Speak to that.',
        nextNode: 'c12_hollow_runaway_scene',
        requirements: { backgrounds: ['runaway_experiment'] },
      },
      {
        id: 'c12_hollow_lead_surface',
        text: 'Lead the Children to the surface conflict. There is a place for them — at the Broken Throne.',
        nextNode: 'c12_hollow_outcome',
        requirements: { factionRep: { hollowChildren: 5 } },
        effects: { hollowChildren: 8, setFlags: ['hollow_children_surface_led'] },
      },
      {
        id: 'c12_hollow_below',
        text: 'Tell them to go back below. The surface city is not safe for them yet.',
        nextNode: 'c12_last_protector_end',
        effects: { hollowChildren: -5, setFlags: ['hollow_sent_below'] },
      },
      {
        id: 'c12_hollow_support',
        text: 'Promise to make a place for them, then go build it. The Broken Throne determines the city\'s future.',
        nextNode: 'c12_hollow_outcome',
        effects: { hollowChildren: 5, setFlags: ['hollow_children_promised'] },
      },
    ],
  },

  {
    id: 'c12_hollow_runaway_scene',
    chapter: 'Chapter 12',
    title: 'Made and Excluded',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The runaway experiment's background is not a metaphor the Hollow Children need explained. They are the product of a system — the sub-city's three-hundred-year relic field adaptation program, which the Foundation Period records describe as intentional and the faction war describes as accidental. They were made by the city below the city. They were excluded from the city above it. The runaway experiment's specific experience — made by an institution, excluded from it, surviving outside it — is the exact frame for what the Hollow Children have been doing for three hundred years. The sixty-three people in the sub-basement recognize it. They respond to it. The conversation that follows takes twelve minutes and produces something the Chalk translates as: "Yes. We come up. We help build it."`,
    effectsOnEnter: { hollowChildren: 10, morale: 10, setFlags: ['runaway_hollow_connection', 'hollow_children_committed'] },
    choices: [
      {
        id: 'c12_runaway_to_outcome',
        text: 'The Children are committed. Move to the Broken Throne together.',
        nextNode: 'c12_hollow_outcome',
      },
    ],
  },

  {
    id: 'c12_hollow_outcome',
    chapter: 'Chapter 12',
    title: 'The Hollow Children\'s Position',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    text: `The Hollow Children's position: they are above ground. Whether they are moving toward the Broken Throne or holding in the hideout, they are committed to the surface's outcome in a way that three hundred years of sub-city existence didn't allow. Mother Chalk leads them. The mark reads the Children's collective resonance as something the sub-city's entity would have recognized: the specific frequency of people who have been adapted to an environment that no longer exists and are in the process of adapting to the one that does.`,
    effectsOnEnter: { setFlags: ['hollow_outcome_resolved'] },
    choices: [
      {
        id: 'c12_hollow_hollow_crown',
        text: 'Claim the Hollow Crown here. The Children and Chalk will carry it to the surface.',
        nextNode: 'c12_hollow_crown_end',
        requirements: { factionRep: { hollowChildren: 12 }, flags: ['hollow_children_committed'] },
        effects: { setFlags: ['hollow_children_won'] },
      },
      {
        id: 'c12_hollow_to_throne',
        text: 'Move to the Broken Throne with the Children at your back.',
        nextNode: 'c12_broken_throne_arrive',
        effects: { setFlags: ['hollow_outcome_complete'] },
      },
    ],
  },

  // ── BROKEN THRONE — CONVERGENCE ───────────────────────────────────────────

  {
    id: 'c12_broken_throne_arrive',
    chapter: 'Chapter 12',
    title: 'The Broken Throne',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The Broken Throne is the old civic administration building's main hall — the room where the city's leadership met before the Blackout fractured everything that leadership was built around. The throne itself is not a throne in the literal sense: it is the administration table's head seat, which became known as the throne after the Blackout because whoever held it held the only room in the city where all five faction representatives had ever been simultaneously present. The room is full. Every faction route converges here. Every surviving NPC from twelve chapters is in this room or approaching it. The mark reads the room as the highest-resonance space it has encountered on the surface — not because of relic power, but because of accumulated decision.`,
    effectsOnEnter: { setFlags: ['broken_throne_arrived'] },
    choices: [
      {
        id: 'c12_throne_to_assembled',
        text: 'Assess the assembled factions.',
        nextNode: 'c12_throne_factions_assembled',
      },
    ],
  },

  {
    id: 'c12_throne_factions_assembled',
    chapter: 'Chapter 12',
    title: 'All Five Factions',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The Broken Throne has all five factions in the same room — not peacefully, and not by agreement. They are here because all five faction routes converge at the point where the city's future has to be decided and there is only one room where that decision is architecturally possible. The Iron Saints are armed. The Glass Court is watching. The Red Choir's march has arrived at the building's exterior and is audible inside. The Hollow Children are at the room's edge, which is where they always are in any built space. Mael is at the table. And the Masked Heir is here — unmasked, Glass Court structure, sub-city knowledge, and the specific weight of someone who has been carrying a specific identity for too long.`,
    effectsOnEnter: { setFlags: ['all_factions_assembled'] },
    choices: [
      {
        id: 'c12_assembled_noble_read',
        text: 'The fallen noble\'s Glass Court training reads the Heir\'s lineage in the room\'s hierarchy.',
        nextNode: 'c12_throne_heir_confrontation',
        requirements: { backgrounds: ['fallen_noble'] },
        effects: { setFlags: ['heir_lineage_read'] },
      },
      {
        id: 'c12_assembled_heir',
        text: 'Address the Masked Heir directly. The sub-city established enough basis for this.',
        nextNode: 'c12_throne_heir_confrontation',
        requirements: { flags: ['heir_unmasked'] },
      },
      {
        id: 'c12_assembled_player_choice',
        text: 'The room is assembled. Make the decision.',
        nextNode: 'c12_throne_player_choice',
      },
    ],
  },

  {
    id: 'c12_throne_heir_confrontation',
    chapter: 'Chapter 12',
    title: 'The Heir, Unmasked',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The Masked Heir without the mask is: young, Glass Court by lineage, specifically educated about the sub-city's history — the kind of education that isn't accidental. Their presence in the sub-city was not reconnaissance. It was inheritance. The complete identity, which the sub-city's old government vault made available if you reached it: they are the last surviving line of the Old Government. Not the city's current administration — the administration that preceded the Blackout, the one that commissioned the Containment Protocol. The Heir is here because the inheritance includes the obligation to be present when the Containment Protocol's chapter closes. They look at the assembled factions and then at you. "Someone has to speak for the record," they say. "I am prepared to. Are you?"`,
    effectsOnEnter: { setFlags: ['heir_full_confrontation'] },
    choices: [
      {
        id: 'c12_heir_stand_with',
        text: 'Stand with the Heir. Old Government lineage and mark-bearer together at the Broken Throne.',
        nextNode: 'c12_throne_player_choice',
        requirements: { flags: ['heir_allied'] },
        effects: { setFlags: ['heir_alliance_final'], morale: 8 },
      },
      {
        id: 'c12_heir_expose',
        text: 'Expose the Heir\'s identity to the assembled factions. The Glass Court lineage changes the room\'s calculation.',
        nextNode: 'c12_throne_player_choice',
        effects: { glassCourt: -5, setFlags: ['heir_exposed_throne'] },
      },
      {
        id: 'c12_heir_knife',
        text: 'The Heir strikes. The rejection in the sub-city carried forward.',
        nextNode: 'c12_heir_knife_end',
        requirements: { flags: ['heir_rejected'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c12_throne_player_choice',
    chapter: 'Chapter 12',
    title: 'Who Inherits',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The Broken Throne's question, which has been the chapter's question since the Ashen Square: who inherits. Not the throne itself — the city. The five factions, the Hollow Children, the marked population, the surface survivors who have been living through twelve chapters of someone else's institutional conflict. The mark reads the room with the sub-city's twelve-chapter calibration. The answer to "who inherits" is in the room. The question is what you do with the answer.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_choice_tyrant',
        text: 'Seize the Broken Throne. The mark-bearer inherits — by force, by right, by the only authority left standing.',
        nextNode: 'c12_throne_tyrant_path',
        requirements: { corruption: 40 },
        effects: { setFlags: ['tyrant_route_chosen'] },
      },
      {
        id: 'c12_choice_savior',
        text: 'Give the city a better path. Not a ruler — a structure that doesn\'t require one.',
        nextNode: 'c12_throne_savior_path',
        effects: { setFlags: ['savior_route_chosen'] },
      },
      {
        id: 'c12_choice_wander',
        text: 'Step away from the Throne. The city decides this without you.',
        nextNode: 'c12_throne_wander_path',
      },
      {
        id: 'c12_choice_unity',
        text: 'Invoke the unity covenant. All five factions, one agreement, the complete record as the foundation.',
        nextNode: 'c12_throne_unity_check',
        requirements: { flags: ['unity_route_available'] },
      },
      {
        id: 'c12_choice_destroy',
        text: 'Burn it. No faction deserves to survive this. The city rebuilds from nothing.',
        nextNode: 'c12_throne_destroy_path',
        effects: { corruption: 20, setFlags: ['destruction_route_chosen'] },
      },
    ],
  },

  {
    id: 'c12_throne_tyrant_path',
    chapter: 'Chapter 12',
    title: 'The Claim',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `Claiming the Broken Throne by force requires the mark to demonstrate something that force alone cannot demonstrate: that the mark-bearer's authority is not merely physical but structural — that the city's relic infrastructure, which the mark has spent twelve chapters navigating, recognizes the claim in the same way it recognized the entity's presence. Whether it does is the question the mark is about to answer.`,
    effectsOnEnter: { corruption: 10 },
    choices: [
      {
        id: 'c12_tyrant_dice_roll',
        text: 'Make the claim. Let the room respond.',
        diceCheck: {
          stat: 'strength',
          difficulty: 9,
          diceType: 'd12',
          successNode: 'c12_throne_tyrant_success',
          failureNode: 'c12_throne_collapse_end',
          criticalFailureNode: 'c12_throne_collapse_end',
          successEffects: { corruption: 15, setFlags: ['tyrant_throne_claimed'] },
          failureEffects: { health: -40, corruption: 20 },
        },
      },
    ],
  },

  {
    id: 'c12_throne_tyrant_success',
    chapter: 'Chapter 12',
    title: 'The Throne Holds',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The claim lands. The room's five factions do not unite against it — they fragment. Two Saint commanders follow the claim; three don't. Seraphine's expression: calculation completed. Veyl's march outside stops. Mael closes the document stack. The Hollow Children are the only faction that does not react — they are watching the mark. The throne is claimed. What the claim produces is a city with a ruler and five factions deciding whether to accept the rule or contest it. The ruler is the mark-bearer. The mark reads this configuration as: unstable, sustainable for a specific duration, requiring specific maintenance.`,
    effectsOnEnter: { setFlags: ['throne_tyrant_secured'] },
    choices: [
      {
        id: 'c12_tyrant_corrupt_path',
        text: 'The mark claims everything. Let the corruption complete the throne.',
        nextNode: 'c12_tyrant_corrupt_end',
        requirements: { corruption: 70 },
      },
      {
        id: 'c12_tyrant_rule',
        text: 'Rule with what the mark carries. The throne is a tool; use it.',
        nextNode: 'c12_tyrant_ash_end',
      },
      {
        id: 'c12_tyrant_execute',
        text: 'Execute the faction leaders who are contesting the claim. The Execution Plaza is waiting.',
        nextNode: 'c12_execution_plaza_arrive',
        effects: { corruption: 10, setFlags: ['executions_ordered'] },
      },
    ],
  },

  {
    id: 'c12_throne_savior_path',
    chapter: 'Chapter 12',
    title: 'The Better Path',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The savior route doesn't take the throne. It dismantles the premise that the throne needs to be taken. The five factions are in one room. The complete record exists. The mark carries twelve chapters of documented truth about what the city is and what it was designed to be. The savior's argument is: the city does not need a ruler who won the throne. It needs the truth that makes the throne unnecessary. Whether the room hears that argument depends on whether the mark-bearer can make it heard.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_savior_dice_roll',
        text: 'Make the argument. The city has been waiting twelve chapters for this specific case.',
        diceCheck: {
          stat: 'charisma',
          difficulty: 9,
          diceType: 'd10',
          successNode: 'c12_throne_savior_success',
          failureNode: 'c12_execution_plaza_arrive',
          criticalFailureNode: 'c12_broken_throne_betrayal_end',
          successEffects: { morale: 20, setFlags: ['savior_throne_succeeded', 'savior_route_complete'] },
          failureEffects: { morale: -15, health: -20 },
        },
      },
    ],
  },

  {
    id: 'c12_throne_savior_success',
    chapter: 'Chapter 12',
    title: 'The City Listens',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The room listens. Not unanimously — Veyra's two remaining commanders do not listen, and they leave, which is the price of the room's attention. But the room itself listens. Mael opens the document stack and begins the failsafe broadcast. Seraphine writes the Glass Court's formal acknowledgment. Mother Veyl, outside, begins a different song. The Hollow Children's sixty-three move from the room's edge to its center, which is the most significant thing that happens in the room: they have never been at the center of anything built by the surface city. The savior route is not complete. It is committed to. What it produces depends on what happens next.`,
    effectsOnEnter: { morale: 20, setFlags: ['savior_throne_succeeded', 'city_path_opened'] },
    choices: [
      {
        id: 'c12_savior_to_companions',
        text: 'The throne moment is over. Find the people who made it possible.',
        nextNode: 'c12_companions_final_moment',
      },
    ],
  },

  {
    id: 'c12_throne_wander_path',
    chapter: 'Chapter 12',
    title: 'Stepping Away',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The city deciding for itself has always been an option. The Broken Throne without the mark-bearer's claim is a room of five factions and no center of gravity. They will find one — or they won't, and the city will fracture further. The mark reads this outcome the way it reads all outcomes: without judgment. The exit is through the Citywide Battlefield, which is the chapter's other open route. The lone wanderer configuration has always known that the exit is as valid as any other direction. The question is whether you exit the chapter or the city.`,
    effectsOnEnter: { setFlags: ['wander_route_chosen'] },
    choices: [
      {
        id: 'c12_wander_battlefield',
        text: 'Move through the Citywide Battlefield. The exit from the chapter is on the other side.',
        nextNode: 'c12_citywide_battlefield',
      },
      {
        id: 'c12_wander_complete_departure',
        text: 'Leave. The city has what it needs. You were the carrier, not the conclusion.',
        nextNode: 'c12_lone_wanderer_lock_end',
        requirements: { flags: ['lone_wanderer_ch12'] },
      },
    ],
  },

  {
    id: 'c12_throne_unity_check',
    chapter: 'Chapter 12',
    title: 'The Unity Covenant',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The unity route exists only if the council ceasefire held and all five factions are at the Throne in a configuration where a covenant is possible. The covenant is not an agreement — agreements require enforcement. It is a shared acknowledgment: the five factions, the complete record, the sub-city truth, and the specific moment where all five can choose not to be at war. The window for this is approximately the duration of the mark's resonance — the sub-city's signal is still perceptible in the room, and while it is perceptible, the choice is available.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_unity_covenant',
        text: 'Invoke the covenant. All five factions, one moment, the complete record as the foundation.',
        nextNode: 'c12_unity_almost_end',
        requirements: {
          flags: ['unity_route_available', 'council_ceasefire'],
          factionRep: { ironSaints: 5, glassCourt: 5, hollowChildren: 5, redChoir: 5, lastArchive: 5 },
        },
        effects: { setFlags: ['unity_covenant_invoked'] },
      },
      {
        id: 'c12_unity_failed',
        text: 'The covenant doesn\'t hold. One faction broke first.',
        nextNode: 'c12_broken_throne_betrayal_end',
      },
    ],
  },

  {
    id: 'c12_throne_destroy_path',
    chapter: 'Chapter 12',
    title: 'Burn It',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The destruction route is available to the mark-bearer who has decided that the faction war's continuation is the city's actual disease, and that a city rebuilt without factions is worth a city that does not survive the rebuilding. Whether this is nihilism or clarity depends on twelve chapters of specific choices that have accumulated to this moment. The mark reads the destruction route without comment. The sub-city's entity, departing, asked no such questions. The mark-bearer asking them is the only distinction.`,
    effectsOnEnter: { corruption: 20 },
    choices: [
      {
        id: 'c12_destroy_confirm',
        text: 'Confirm the destruction. All five factions. Everything they built. Gone.',
        nextNode: 'c12_all_factions_burn_end',
      },
    ],
  },

  // ── EXECUTION PLAZA ───────────────────────────────────────────────────────

  {
    id: 'c12_execution_plaza_arrive',
    chapter: 'Chapter 12',
    title: 'The Execution Plaza',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    text: `The Execution Plaza is the city's old civic square — the space that predates all five factions and has been used by all of them for the same purpose at different points in the city's post-Blackout history. Today's execution: the person being executed is someone who matters to the chapter's outcome. Not a faction representative. Someone who was carrying the sub-city truth on the surface, distributing it, and was caught by the faction whose truth it most directly threatens. The execution is in progress. The window to intervene is approximately ninety seconds.`,
    effectsOnEnter: { setFlags: ['execution_plaza_arrived'] },
    choices: [
      {
        id: 'c12_execution_to_scene',
        text: 'Reach the execution point before the ninety seconds close.',
        nextNode: 'c12_execution_prisoner_scene',
      },
    ],
  },

  {
    id: 'c12_execution_prisoner_scene',
    chapter: 'Chapter 12',
    title: 'The Prisoner',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    text: `The prisoner being executed is Juno — or more precisely: Juno's network contact, who has been distributing the sub-city truth to every faction-neutral space in the city for the last six hours. The faction executing the sentence is not publicly affiliated. The enforcers are wearing no insignia. The execution is sanctioned by someone who didn't want to publicly own it, which is the most specific kind of faction action. Juno is present at the plaza's edge and watching, which means Juno knew it was coming and couldn't stop it. The prisoner sees you. Ninety seconds.`,
    effectsOnEnter: { setFlags: ['prisoner_identified'] },
    choices: [
      {
        id: 'c12_execution_medic_intervene',
        text: 'The medic\'s triage assessment can create a delay. Medical intervention as tactical cover.',
        nextNode: 'c12_execution_medic_scene',
        requirements: { classes: ['medic'] },
      },
      {
        id: 'c12_execution_physical_intervene',
        text: 'Move physically. Ninety seconds is enough if the approach is right.',
        nextNode: 'c12_execution_intervene_dice',
      },
      {
        id: 'c12_execution_witness',
        text: 'You cannot reach them in time. Witness what happens.',
        nextNode: 'c12_execution_plaza_end',
      },
    ],
  },

  {
    id: 'c12_execution_medic_scene',
    chapter: 'Chapter 12',
    title: 'Medical Intervention',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    text: `The medic's intervention is not subtle — it is precise. The triage assessment of the prisoner's condition produces, in thirty seconds, a medical case for delay: the prisoner is displaying symptoms that indicate the execution's immediate conduct would produce a medical contamination event that the executing faction has not cleared their operatives against. The claim is specific, technical, and sufficiently plausible that the enforcers hesitate. Hesitation is what the medic was creating. The prisoner is extracted in the hesitation window.`,
    effectsOnEnter: { setFlags: ['execution_medic_save'] },
    choices: [
      {
        id: 'c12_medic_to_aftermath',
        text: 'The prisoner is out. Move before the enforcers recalibrate.',
        nextNode: 'c12_execution_save_success',
      },
    ],
  },

  {
    id: 'c12_execution_intervene_dice',
    chapter: 'Chapter 12',
    title: 'Ninety Seconds',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    text: `Ninety seconds, five enforcers, one plaza exit that the prisoner can reach if they are moving. The calculation is specific and the window is not forgiving. The mark reads the plaza's geometry the way the sub-city taught it to read structural spaces: not as obstacles but as routes that haven't been taken yet.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_intervene_roll',
        text: 'Make the approach. The geometry supports it.',
        diceCheck: {
          stat: 'agility',
          difficulty: 7,
          diceType: 'd8',
          successNode: 'c12_execution_save_success',
          failureNode: 'c12_execution_plaza_end',
          criticalFailureNode: 'c12_execution_plaza_end',
          successEffects: { morale: 8, setFlags: ['prisoner_rescued'] },
          failureEffects: { health: -30 },
        },
      },
    ],
  },

  {
    id: 'c12_execution_save_success',
    chapter: 'Chapter 12',
    title: 'Out of the Plaza',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    text: `The prisoner is out of the plaza. Juno is already moving — she had an exit route prepared, which means she was planning for this possibility while knowing she couldn't execute it herself. The prisoner: injured, carrying the sub-city truth distribution network's complete record in a format that survived the arrest. Juno takes them. "The network continues," she says. "Whatever happens at the Broken Throne, the network continues." The execution plaza is empty. The enforcers are recalibrating. The window back to the chapter's main route is open.`,
    effectsOnEnter: { morale: 10, setFlags: ['prisoner_saved', 'juno_network_intact'] },
    choices: [
      {
        id: 'c12_save_to_aftermath',
        text: 'Move to the chapter\'s resolution.',
        nextNode: 'c12_execution_aftermath',
      },
    ],
  },

  {
    id: 'c12_execution_aftermath',
    chapter: 'Chapter 12',
    title: 'After the Plaza',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    text: `The Execution Plaza's aftermath: the prisoner is either saved or witnessed. The chapter's main route is the Broken Throne — or, if the Broken Throne has already produced the savior route's success, the final decision about what the savior route's success means. The plaza is behind you. The city is still deciding. The mark points toward the Broken Throne's direction the way the sub-city's mark pointed toward the First Gate: not urgently. With the specific patience of something that knows the direction is correct and is waiting for the bearer to agree.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_aftermath_to_decision',
        text: 'Move to the chapter\'s final decision.',
        nextNode: 'c12_final_decision',
      },
    ],
  },

  // ── CITYWIDE BATTLEFIELD ───────────────────────────────────────────────────

  {
    id: 'c12_citywide_battlefield',
    chapter: 'Chapter 12',
    title: 'The Citywide Battlefield',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    text: `Outside the Broken Throne's building, the chapter's five-faction conflict has reached the citywide battlefield stage — which is not a military designation but a civic one: the city is the battlefield, every street and block and surviving structure a contested position. The faction war has been building toward this since Chapter 1. It looks exactly like what it is: a city that has been fighting itself for three hundred years finally making the conflict visible. The mark reads the battlefield the way it reads every space of accumulated decision. The decision being made here is the chapter's decision. The mark-bearer moving through it is either the resolution or the last surviving variable.`,
    effectsOnEnter: { setFlags: ['citywide_battlefield_entered'] },
    choices: [
      {
        id: 'c12_battlefield_gun',
        text: 'Suppress the closest faction line. The gun scavenger has the range and the ammunition.',
        nextNode: 'c12_battlefield_gun_path',
        requirements: { classes: ['gun_scavenger'] },
      },
      {
        id: 'c12_battlefield_blade',
        text: 'Cut through the line directly. The blade survivor\'s close-range training applies.',
        nextNode: 'c12_battlefield_blade_path',
        requirements: { classes: ['blade_survivor'] },
      },
      {
        id: 'c12_battlefield_survive',
        text: 'Navigate without engaging. The battlefield has gaps if the mark reads them correctly.',
        nextNode: 'c12_battlefield_luck_dice',
      },
    ],
  },

  {
    id: 'c12_battlefield_gun_path',
    chapter: 'Chapter 12',
    title: 'Suppression',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    text: `The gun scavenger's suppression of the nearest faction line is clean and specific — not a firefight, but a positional disruption that creates a movement corridor without requiring sustained engagement. Three positions, six seconds each. The faction line relocates. The corridor is open for approximately ninety seconds. The gun scavenger navigates corridors in ninety seconds by training and by experience. The battlefield's near side is crossed before the line reforms.`,
    effectsOnEnter: { ammo: -3, setFlags: ['gun_suppression_complete'] },
    choices: [
      {
        id: 'c12_gun_to_survive',
        text: 'The suppression created the corridor. Move through.',
        nextNode: 'c12_battlefield_survive',
      },
    ],
  },

  {
    id: 'c12_battlefield_blade_path',
    chapter: 'Chapter 12',
    title: 'Close Range',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    text: `The blade survivor's close-range training turns the faction line's structural weakness — the gap between the third and fourth position that every armed formation has if the formation is moving rather than fixed — into a transit corridor. The crossing is not bloodless, but it is complete. The blade survivor reaches the other side with the specific quality of someone who has done exactly this thing in exactly this kind of space for exactly as long as it takes, and has always known the cost is the cost.`,
    effectsOnEnter: { health: -15, setFlags: ['blade_through_complete'] },
    choices: [
      {
        id: 'c12_blade_to_survive',
        text: 'The line is crossed. Move.',
        nextNode: 'c12_battlefield_survive',
      },
    ],
  },

  {
    id: 'c12_battlefield_luck_dice',
    chapter: 'Chapter 12',
    title: 'Navigation',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    text: `Navigating the citywide battlefield without class-specific training is a matter of reading the faction lines' movement geometry and finding the gaps before the lines close them. The mark reads the battlefield the way it reads every built space — as accumulated decision. The decisions are moving. The gaps are moving. Whether you find them before they close is a question the mark cannot answer with twelve chapters of calibration. Some questions are luck.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_battlefield_luck_roll',
        text: 'Navigate. Read the lines. Find the gap.',
        diceCheck: {
          stat: 'luck',
          difficulty: 5,
          diceType: 'd6',
          successNode: 'c12_battlefield_survive',
          failureNode: 'c12_battlefield_overwhelmed_end',
          criticalFailureNode: 'c12_battlefield_overwhelmed_end',
          successEffects: { morale: 5 },
          failureEffects: { health: -40 },
        },
      },
    ],
  },

  {
    id: 'c12_battlefield_survive',
    chapter: 'Chapter 12',
    title: 'Through the Lines',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    text: `The citywide battlefield is behind you. The faction lines are still moving — they don't stop because the mark-bearer has navigated through them. But the mark-bearer's navigation of the battlefield is the chapter's most visible single act, and it is visible to all five faction positions simultaneously. The city watches. The mark reads the watching as something that will matter at the Broken Throne, where the watching becomes testimony.`,
    effectsOnEnter: { morale: 8, setFlags: ['battlefield_crossed'] },
    choices: [
      {
        id: 'c12_survive_to_aftermath',
        text: 'Move to the chapter\'s resolution.',
        nextNode: 'c12_battlefield_aftermath',
      },
    ],
  },

  {
    id: 'c12_battlefield_aftermath',
    chapter: 'Chapter 12',
    title: 'After the Battlefield',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    text: `The battlefield aftermath. The crossing is complete. The Broken Throne is accessible from here, or the lone wanderer's exit from the chapter is available — the city's eastern gate, the one that opens onto the route to the Final Gate. Both options are present in the aftermath's silence. The mark reads both directions with equal accuracy. The city does not tell the mark-bearer which way to go. It never has.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_battlefield_to_throne',
        text: 'Return to the Broken Throne. The city\'s decision needs a witness.',
        nextNode: 'c12_broken_throne_arrive',
      },
      {
        id: 'c12_battlefield_to_wander',
        text: 'The wanderer\'s exit. The city gets to decide this one without you.',
        nextNode: 'c12_lone_wanderer_lock_end',
      },
    ],
  },

  // ── COMPANION MOMENTS ─────────────────────────────────────────────────────

  {
    id: 'c12_companions_final_moment',
    chapter: 'Chapter 12',
    title: 'After the Throne',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The Broken Throne's savior route success produces a room that is no longer a faction war. It is still five factions — but in the specific configuration of people who have agreed to something without having worked out what agreeing means for each of them. The immediate aftermath: the people who were present for the chapter. Mira, if she's here. Cain, if he's here. The Masked Heir, if they're standing. The companions made it twelve chapters. The chapter's last moments are about what that means.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c12_comp_mira',
        text: 'Find Mira. Twelve chapters and a sub-city and a city in flames.',
        nextNode: 'c12_mira_mercy_scene',
        requirements: { miraPresent: true },
      },
      {
        id: 'c12_comp_cain',
        text: 'Find Cain. The war is over and he has been a soldier for all of it.',
        nextNode: 'c12_cain_war_scene',
        requirements: { cainPresent: true },
      },
      {
        id: 'c12_comp_heir',
        text: 'Speak to the Masked Heir. The inheritance was theirs; the use of it was yours.',
        nextNode: 'c12_heir_final_scene',
        requirements: { flags: ['heir_alliance_final'] },
      },
      {
        id: 'c12_comp_alone_decision',
        text: 'Alone, or without unfinished conversations. Move to the final decision.',
        nextNode: 'c12_final_decision',
      },
    ],
  },

  {
    id: 'c12_mira_mercy_scene',
    chapter: 'Chapter 12',
    title: 'Mira\'s Choice',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `Mira outside the Broken Throne's hall: standing in the specific posture of someone who has made a decision and is waiting for the conversation that makes it real. The city's savior route success gives her something she has been building toward since Chapter 1's opening — not the city's resolution, but the possibility of one. "The marked population's adaptation pathway is documented," she says. "The Glass Court medical custody case is recoverable. The Archive has the complete record." She pauses. "I'm staying. There's twelve chapters of medical work to implement and I'm the most qualified person in the city to do it." She is not asking for permission. She is completing a sentence that started in Chapter 1.`,
    effectsOnEnter: { miraTrust: 5, setFlags: ['mira_final_choice'] },
    choices: [
      {
        id: 'c12_mira_let_stay',
        text: 'Let Mira stay. She\'s right, and she knows she\'s right.',
        nextNode: 'c12_final_decision',
        effects: { morale: 10, miraTrust: 3, setFlags: ['mira_stays_city'] },
      },
      {
        id: 'c12_mira_mercy_end_trigger',
        text: 'Mira\'s final choice carries forward. She doesn\'t come to the Final Gate.',
        nextNode: 'c12_miras_mercy_end',
        effects: { setFlags: ['mira_mercy_route'] },
      },
    ],
  },

  {
    id: 'c12_cain_war_scene',
    chapter: 'Chapter 12',
    title: 'Cain\'s Last War',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `Cain outside the hall is not at rest. He is scanning the building's perimeter, which is the thing Cain does in any space where the immediate threat has been resolved but the structural threat hasn't been assessed yet. "The Saints' two defecting commanders are reorganizing two blocks east," he says. "Not toward the Throne. Toward the Archive." He is reporting. He is also choosing. The look on his face is the look of someone deciding whether the assessment they just made is their last professional obligation or the opening of a new engagement. "You don't need me for the Final Gate," he says. "But the city needs someone who knows how the Saints reorganize." He is asking if you'll let him choose the war that needs him more.`,
    effectsOnEnter: { cainTrust: 5, setFlags: ['cain_final_choice'] },
    choices: [
      {
        id: 'c12_cain_let_stay',
        text: 'Let Cain choose. He\'s right about where he\'s needed.',
        nextNode: 'c12_final_decision',
        effects: { morale: 8, cainTrust: 3, setFlags: ['cain_stays_city'] },
      },
      {
        id: 'c12_cain_war_end_trigger',
        text: 'Cain goes to his war. He doesn\'t come to the Final Gate.',
        nextNode: 'c12_cains_war_end',
        effects: { setFlags: ['cain_war_route'] },
      },
    ],
  },

  {
    id: 'c12_heir_final_scene',
    chapter: 'Chapter 12',
    title: 'The Heir\'s Inheritance',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The Masked Heir — unmasked, Old Government lineage confirmed, the sub-city truth and the surface record both in hand — looks at the Broken Throne with the expression of someone who inherited something they didn't choose and is choosing what to do with it. "The Old Government's mandate was to hold the city until the Containment Protocol resolved," they say. "The Protocol has resolved. The mandate is complete." They look at you. "What comes after the mandate is the city's to decide. I'll be here when it does." They are staying. Not as ruler — as institutional memory. The inheritance is not the throne. It is the record of what the throne was for.`,
    effectsOnEnter: { morale: 8, setFlags: ['heir_final_resolution', 'heir_stays_city'] },
    choices: [
      {
        id: 'c12_heir_to_decision',
        text: 'The Heir\'s inheritance is resolved. Move to the chapter\'s final decision.',
        nextNode: 'c12_final_decision',
      },
    ],
  },

  // ── FINAL DECISION ────────────────────────────────────────────────────────

  {
    id: 'c12_final_decision',
    chapter: 'Chapter 12',
    title: 'Crown of Ash',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    text: `The chapter's final moment. The city's decision is made — or making — or unmakeable, depending on the route. The mark reads twelve chapters of accumulated resonance and returns a single reading: the bearer has carried the city's truth from the sub-city's Foundation Period to the surface's faction war to this room. What the bearer does with that truth in the next moment is the chapter's last question. The Final Gate is still ahead. The truth-bearer route is still active, if it was established. The mark points forward. It has always pointed forward.`,
    effectsOnEnter: { setFlags: ['chapter12_final_decision'] },
    choices: [
      {
        id: 'c12_decision_savior',
        text: 'The city is saved. Walk forward from what you built.',
        nextNode: 'c12_savior_ash_end',
        requirements: { flags: ['savior_route_complete'] },
        effects: { setFlags: ['crown_of_ash_savior'] },
      },
      {
        id: 'c12_decision_neutral',
        text: 'The city has what it needs. You were the carrier, not the conclusion.',
        nextNode: 'c12_crown_ash_neutral_end',
        effects: { setFlags: ['crown_of_ash_neutral'] },
      },
      {
        id: 'c12_decision_protector',
        text: 'Stay at the threshold. The gate is open; guard it until the city is ready.',
        nextNode: 'c12_last_protector_end',
        effects: { setFlags: ['crown_of_ash_protector'] },
      },
    ],
  },

  // ── ENDING NODES ─────────────────────────────────────────────────────────
  // 30 endings: 9 death, 4 betrayal, 3 corruption, 4 wanderer, 2 companion,
  //              5 faction, 1 tyrant, 1 savior, 1 secret
  // ─────────────────────────────────────────────────────────────────────────

  // FACTION ENDINGS (5)

  {
    id: 'c12_iron_crown_end',
    chapter: 'Chapter 12',
    title: 'Iron Crown',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch12_iron_crown',
    text: `Veyra and Sera, standing at the Saint Front with the crusade mandate revised and the mark-bearer's authority formally documented, offer the Iron Crown in the way the Iron Saints offer everything: as an operational designation, not a ceremony. The crown is the city's northern perimeter, the Saints' complete formation, and the specific institutional architecture of an organization that has been building toward a city worth defending. The mark reads the Iron Crown as: stable, specific, requiring maintenance. The Final Gate ahead. The Iron Saints behind. The city, for the first time in twelve chapters, held.`,
    effectsOnEnter: { setFlags: ['iron_crown_claimed', 'chapter12_complete', 'iron_saints_ending'] },
    choices: [],
  },

  {
    id: 'c12_glass_crown_end',
    chapter: 'Chapter 12',
    title: 'Glass Crown',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch12_glass_crown',
    text: `Lady Seraphine formalizes the Glass Crown in writing on glass paper with a glass stylus, which is the Glass Court's way of making something permanent. The extraction device is disabled. The Glass Court's intelligence network, the servant network Juno maintains within it, and the specific analytical infrastructure that Seraphine has built across twelve chapters are now formally behind the mark-bearer's route to the Final Gate. "The Glass Court commits its resources to the gate's resolution," Seraphine says. "We always have. We were waiting for a bearer capable of receiving the commitment." The crown is analytical. The rule is through information. The Final Gate ahead, the Glass Court behind, and twelve chapters of data pointing forward.`,
    effectsOnEnter: { setFlags: ['glass_crown_claimed', 'chapter12_complete', 'glass_court_ending'] },
    choices: [],
  },

  {
    id: 'c12_hollow_crown_end',
    chapter: 'Chapter 12',
    title: 'Hollow Crown',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch12_hollow_crown',
    text: `The Hollow Crown is not a crown in the surface city's sense. Mother Chalk presents it in the tunnel language that the Children speak — a specific gesture, performed by sixty-three people simultaneously, that the sub-city's three hundred years of below-ground existence produced as the Hollow Children's version of formal acknowledgment. What it means: the Children are committed to the mark-bearer's route to the Final Gate. Not as a force. As the people who have been below the thing everyone else was fighting about and have now come up. The mark reads the Hollow Crown as: old, specific, and more structurally sound than any faction built on the surface has been since the Blackout. Sixty-three people, moving upward. The Final Gate ahead.`,
    effectsOnEnter: { setFlags: ['hollow_crown_claimed', 'chapter12_complete', 'hollow_children_ending'] },
    choices: [],
  },

  {
    id: 'c12_red_crown_end',
    chapter: 'Chapter 12',
    title: 'Red Crown',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch12_red_crown',
    text: `Mother Veyl, at the march's center with the broadcast redirected and the seventeen-fold network carrying the sub-city truth instead of the raw signal, performs the Red Crown's investiture while walking. The Red Choir does not stop for ceremonies. The march continues; the city receives the broadcast; the seventeen-fold network stabilizes around the mark-bearer's route to the Final Gate as a reference frequency. What the Red Crown means: the Choir's entire three-year transmission project, repurposed. The city hears the truth because Veyl chose to carry it instead of the signal. The mark reads the Red Crown as: resonant, active, warm with something that is not corruption. The march reaches the Final Gate approach. The crown is the march's momentum.`,
    effectsOnEnter: { setFlags: ['red_crown_claimed', 'chapter12_complete', 'red_choir_ending'] },
    choices: [],
  },

  {
    id: 'c12_archive_crown_end',
    chapter: 'Chapter 12',
    title: 'Archive Crown',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch12_archive_crown',
    text: `Archivist Mael activates the failsafe broadcast while the siege is still ongoing. What the city hears, simultaneously, from every registered document-receiving station: the complete Containment Protocol history. The faction origin documentation. The entity's departure record. The mark-bearer's sub-city evidence combined with the Archive's surface documentation into the most complete historical record the city has received since the Foundation Period. The siege does not stop immediately. But within forty minutes, the faction positions begin to reconfigure around the information rather than around the resource they thought they were fighting over. The Archive Crown is not a crown. It is a record. Mael hands it to you in the form of the complete document set. "You carry the truth to the Final Gate," he says. "The Archive carries it here." Both are true.`,
    effectsOnEnter: { setFlags: ['archive_crown_claimed', 'chapter12_complete', 'archive_ending'] },
    choices: [],
  },

  // TYRANT ENDING (1)

  {
    id: 'c12_tyrant_ash_end',
    chapter: 'Chapter 12',
    title: 'Tyrant of Ash',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'tyrant',
    endingId: 'ending_ch12_tyrant_of_ash',
    text: `The Broken Throne is held. The five factions, reconfigured around the mark-bearer's authority rather than around their own institutional frameworks, produce — not peace. A structure. The tyrant's structure: the mark's twelve-chapter navigation of the city's relic infrastructure, translated into operational authority. The factions that accepted the claim do so for specific institutional reasons. The factions that didn't have been redirected. The city is not free. The city is, for the first time since the Blackout, structurally coherent under a single authority. The mark reads the throne as: held, costly, requiring daily maintenance for an indefinite duration. The Final Gate is ahead. The tyrant's route to it is the route of someone who has made the city's survival the mark's obligation, permanently. The city breathes. It does not choose. The mark-bearer chose for it.`,
    effectsOnEnter: { setFlags: ['tyrant_of_ash_claimed', 'chapter12_complete', 'tyrant_ending'] },
    choices: [],
  },

  // SAVIOR ENDING (1)

  {
    id: 'c12_savior_ash_end',
    chapter: 'Chapter 12',
    title: 'Savior of Ash',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'savior',
    endingId: 'ending_ch12_savior_of_ash',
    text: `The savior route's success produces, in the Broken Throne's hall, the specific configuration that Mother Chalk named in the market: a city that has been told what it is, by someone who went below and came back with the answer. Not every faction accepted it. Two Saint commanders left. Varr's Glass Court loyalty never fully resolved. But the room — the five factions' representatives, the Hollow Children's sixty-three, the survivors who walked in from the market and the square and the siege line — received the truth. The city has what it needs to decide. The mark-bearer has given it. The Final Gate is ahead, and the route to it is the route of someone who did not take the throne. The ash is the ash of what burned. The savior is what survived the burning. Both are true.`,
    effectsOnEnter: { setFlags: ['savior_of_ash_claimed', 'chapter12_complete', 'savior_ending'] },
    choices: [],
  },

  // WANDERER ENDINGS (4)

  {
    id: 'c12_lone_wanderer_lock_end',
    chapter: 'Chapter 12',
    title: 'Lone Wanderer Lock-In',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch12_lone_wanderer_lock',
    text: `The city decides for itself. The lone wanderer's configuration — the one that survived eleven chapters and a sub-city and a faction war without requiring anyone else to make the carrying possible — exits through the eastern gate while the city is still in the process of deciding. The mark reads the departure the same way it read every tunnel, every corridor, every space the bearer has navigated: as a route that has been chosen and is being taken. What the city decides without the mark-bearer present will determine what the Final Gate opens onto. The lone wanderer will arrive at the Final Gate having given the city its twelve chapters and nothing else. It is the most honest accounting of the relationship. The mark points east. The city continues west.`,
    effectsOnEnter: { setFlags: ['lone_wanderer_lock', 'chapter12_complete', 'lone_wanderer_ending'] },
    choices: [],
  },

  {
    id: 'c12_crown_ash_neutral_end',
    chapter: 'Chapter 12',
    title: 'Crown of Ash',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch12_crown_ash_neutral',
    text: `The chapter's crown is ash because what preceded the crown was burning. The neutral route through the Broken Throne — the one that gave the city what the savior route gave it without claiming the savior's specific weight — produces a city that has the truth and doesn't have a ruler and is therefore exactly as complicated as a city given the truth without a ruler always is. The mark reads this as: honest. The mark-bearer leaves the Broken Throne having done what the mark was built for: carrying, and delivering, and not requiring that the delivery be received with gratitude. The Final Gate is ahead. The crown of ash is the twelve chapters behind. Both are true, and neither is a contradiction.`,
    effectsOnEnter: { setFlags: ['crown_ash_neutral_claimed', 'chapter12_complete'] },
    choices: [],
  },

  {
    id: 'c12_silent_departure_end',
    chapter: 'Chapter 12',
    title: 'Silent Departure',
    location: 'The Ashen Square',
    imageKey: 'ashen_square',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch12_silent_departure',
    text: `The Ashen Square in the chapter's opening moment has an exit that doesn't require the War Council, the five faction fronts, the Broken Throne, or any of the chapter's accumulated decision-weight. The exit is east. The lone wanderer has always known it. Twelve chapters of carrying a city's truth through a city's war, and the exit is east, and the city is still burning behind you when you take it. The mark doesn't protest. The mark has never told the bearer which direction to walk. It has only pointed. The Final Gate is east. The city is west. The mark points east. The bearer walks.`,
    effectsOnEnter: { setFlags: ['silent_departure_taken', 'chapter12_complete'] },
    choices: [],
  },

  {
    id: 'c12_last_protector_end',
    chapter: 'Chapter 12',
    title: 'The Last Protector',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch12_last_protector',
    text: `The Hollow Children don't go to the surface. Or the mark-bearer stays below with them. Or the chapter's final threshold — the point between the chapter's decision and the Final Gate's approach — becomes the bearer's permanent position. The Last Protector is the role that exists when the carrier decides to carry one specific thing, permanently, instead of moving forward. The sub-city's gate. The Hollow Children's space. The sixty-three people who surfaced because the entity's departure made the below-ground quiet and the above-ground survivable. The mark reads the Last Protector's configuration as: stable, specific, complete. The Final Gate remains ahead. The Last Protector remains here. The mark is warm. The city, above, continues to decide.`,
    effectsOnEnter: { setFlags: ['last_protector_taken', 'chapter12_complete'] },
    choices: [],
  },

  // COMPANION ENDINGS (2)

  {
    id: 'c12_miras_mercy_end',
    chapter: 'Chapter 12',
    title: 'Mira\'s Mercy',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_ch12_miras_mercy',
    text: `Mira stays. This is the ending that contains both things: Mira choosing the city's twelve chapters of medical work over the Final Gate's route, and the mark-bearer understanding that the choice is not a rejection. She is not staying because she has stopped. She is staying because the specific work that needs doing — the marked population's adaptation documentation, the Glass Court medical custody recovery, the implementation of everything twelve chapters of research has produced — requires Mira specifically, in this city, now. The mark reads Mira's departure from the gate route as: loss, specific, bearable. The warmth in the mark that started in Chapter 2 and has never fully dimmed does not dim now. It stays, at this distance, which is what the mercy in the title means: she let you keep the warmth by choosing the place where she is most herself.`,
    effectsOnEnter: { setFlags: ['miras_mercy_complete', 'chapter12_complete', 'mira_stays_city'] },
    choices: [],
  },

  {
    id: 'c12_cains_war_end',
    chapter: 'Chapter 12',
    title: 'Cain\'s War',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_ch12_cains_war',
    text: `Cain goes to his war. The Saint commanders reorganizing toward the Archive need someone who knows how they reorganize, and Cain has spent twelve chapters accumulating exactly that knowledge. The war that Cain chooses is the city's last armed conflict — the one that determines whether the Broken Throne's savior route holds or whether two Saint commanders undo it. Cain does not come to the Final Gate. He sends a message through Juno's network: "The commanders are contained. The Archive is holding. Go." The message arrives at the gate approach. The mark reads the warmth in it — the specific temperature of someone who chose the war that needed him most. Both paths forward.`,
    effectsOnEnter: { setFlags: ['cains_war_complete', 'chapter12_complete', 'cain_stays_city'] },
    choices: [],
  },

  // SECRET ENDING (1)

  {
    id: 'c12_unity_almost_end',
    chapter: 'Chapter 12',
    title: 'Unity Almost',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_ch12_unity_almost',
    text: `The unity covenant holds for forty seconds. All five factions, the complete record, the sub-city truth, and the specific resonance of the mark's twelve-chapter calibration in a room built for a city's decision. Forty seconds where the faction war's factual basis is simultaneously acknowledged by every institutional representative present. Then it ends. Not with violence — with the specific entropy of five institutions remembering that they are five institutions and that acknowledging the same truth is not the same as having the same response to it. The unity almost existed. The almost is more than the faction war produced in three hundred years. The mark carries the almost forward to the Final Gate, which will be the place where the city's full truth — and the almost-unity — either finds its completion or reveals why almost was the most the city could offer. Almost was not nothing. Almost was everything the city had.`,
    effectsOnEnter: { setFlags: ['unity_almost_complete', 'chapter12_complete', 'unity_almost_active'], morale: 25 },
    choices: [],
  },

  // BAD ENDINGS — DEATH (9)

  {
    id: 'c12_saint_crusade_death_end',
    chapter: 'Chapter 12',
    title: 'The Crusade Mandate',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_saint_crusade_death',
    text: `The crusade mandate's language is specific: marked individuals operating in the sub-city without Archive sanction, demonstrating relic contamination at the Foundation Protocol level. The mark's twelve-chapter history meets Veyra's mandate's documentation. The Saints are thorough. The mandate was built to be thorough. The mark dims — not immediately, but in the specific way that a relic architecture dims when the body it is integrated with stops. The sub-city's resonance holds for a moment longer than the body does. Then it too resolves. The city continues its war. The mark is noted in Veyra's operational record: contained.`,
    effectsOnEnter: { setFlags: ['crusade_death'] },
    choices: [],
  },

  {
    id: 'c12_glass_extraction_end',
    chapter: 'Chapter 12',
    title: 'Extracted',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_glass_extraction',
    text: `The extraction device's analysis triggers the device's activation protocol. What follows is not a surgery. It is the specific violence of a system designed to sever a neural integration pathway that has been developing for twelve chapters. The mark fragments. The bearer does not die immediately — the device's test data confirmed survival. What the bearer loses is the coherence of twelve chapters of accumulated resonance: the sub-city's truth, the entity's departure record, the Foundation Period's complete history, the mark's architecture. All of it, fragmented. Seraphine notes the outcome in the Glass Court's research record. The device will be recalibrated for the next bearer.`,
    effectsOnEnter: { setFlags: ['glass_extraction_death'] },
    choices: [],
  },

  {
    id: 'c12_hollow_collapse_end',
    chapter: 'Chapter 12',
    title: 'The Tunnel Closes',
    location: 'The Hollow Children Hideout',
    imageKey: 'hollow_children_hideout',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_hollow_collapse',
    text: `The tunnel structure fails in the specific way that tunnel structures fail when navigated by someone who does not know them: not catastrophically, but completely. The load-bearing calculation was wrong, and the wrong answer produces a collapse that is thorough enough that the Hollow Children cannot reach the bearer before the structure finishes. Mother Chalk notes, afterward, that the mark's resonance held in the rubble for approximately six hours after the bearer's death — the sub-city's architecture carrying the signal longer than the body did. The Hollow Children maintain the rubble site. They have maintained sites like it for three hundred years. They are good at it.`,
    effectsOnEnter: { setFlags: ['hollow_collapse_death'] },
    choices: [],
  },

  {
    id: 'c12_sera_execution_end',
    chapter: 'Chapter 12',
    title: 'The Inquisitor\'s Mandate',
    location: 'The Saint Front',
    imageKey: 'saint_front',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_sera_execution',
    text: `Inquisitor Sera's operational mandate is specific, documented, and does not require Veyra's revision to remain active. When the confrontation fails to reach her framework's revision threshold, the mandate proceeds. It is not public. It is not ceremonial. It is the specific efficiency of an enforcement arm that has been doing this work for fifteen years and has reduced the process to its operational minimum. The mark's resonance is noted in Sera's operational record. The sub-city evidence is filed as confiscated. The bearer is filed as contained. Sera writes the outcome with the same handwriting she uses for everything: clean, specific, final.`,
    effectsOnEnter: { setFlags: ['sera_execution_death'] },
    choices: [],
  },

  {
    id: 'c12_battlefield_overwhelmed_end',
    chapter: 'Chapter 12',
    title: 'Overwhelmed',
    location: 'The Citywide Battlefield',
    imageKey: 'citywide_battlefield',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_battlefield_overwhelmed',
    text: `The citywide battlefield's gaps close before the bearer finds them. What follows is the specific arithmetic of five factions at war: no faction intended this outcome, and all five produced it. The mark reads the battlefield in its last moment the way it has read every built space: as accumulated decision. The accumulated decision here is: no one person was the city's variable. The city was always deciding for itself. The mark dims. The city continues. Somewhere in the city's conflict, Mira's research exists. Mael's record exists. Chalk's guidance exists. The truth was delivered. The bearer was not the container. The city is.`,
    effectsOnEnter: { setFlags: ['battlefield_overwhelmed_death'] },
    choices: [],
  },

  {
    id: 'c12_all_factions_burn_end',
    chapter: 'Chapter 12',
    title: 'All Factions Burn',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_all_factions_burn',
    text: `All five factions burn. Not metaphorically — the Broken Throne, the faction infrastructure, the three hundred years of institutional architecture that the Blackout shattered and the factions rebuilt around the shattering. Gone. What remains: the sub-city's gate, Chalk and the Hollow Children in the tunnels below, Juno's network operating in the rubble above, and the marked population's sixty-two survivors adapting to a city without factions for the first time since the Foundation Period. The mark-bearer is in the burning. Not surviving it — having caused it, which is a different kind of ending. The city rebuilds from nothing. Whether nothing was the right price is the city's question to answer without the mark's twelve chapters of evidence. The evidence burned with the factions.`,
    effectsOnEnter: { setFlags: ['all_factions_burn_death'] },
    choices: [],
  },

  {
    id: 'c12_throne_collapse_end',
    chapter: 'Chapter 12',
    title: 'The Throne Falls',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_throne_collapse',
    text: `The tyrant's claim collapses when the room rejects it — not with violence, but with the specific weight of five factions simultaneously declining to accept a seventh authority in a city that has survived six. The mark's twelve-chapter resonance cannot substitute for the institutional backing that the throne claim requires. The factions exit the room. The Broken Throne is broken again, and the mark-bearer's final accounting is: attempted to hold it, failed to hold it, and the throne fell on what was under it. The mark dims in the rubble of the Broken Throne's hall. The city divides into five again and will divide further, and the sub-city's truth goes undelivered, and the entity's departure record goes uncommitted to the Archive. The bearer gave twelve chapters. The city gave the throne back.`,
    effectsOnEnter: { setFlags: ['throne_collapse_death'] },
    choices: [],
  },

  {
    id: 'c12_execution_plaza_end',
    chapter: 'Chapter 12',
    title: 'The Execution Plaza',
    location: 'The Execution Plaza',
    imageKey: 'execution_plaza',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_execution_plaza',
    text: `The execution plaza's ninety-second window closed before the intervention completed — or the intervention was not attempted — and what the plaza records is: two executions instead of one. The faction that ordered the first one did not anticipate the second. The plaza is the city's old civic space; it has been used for this purpose by all five factions at various points. The mark's resonance holds in the plaza longer than it should, which the Hollow Children's representatives, watching from the market's edge, note and do not comment on. The sub-city's truth was in the bearer. The bearer is in the plaza. The plaza remembers everything it has held. The city continues its war.`,
    effectsOnEnter: { setFlags: ['execution_plaza_death'] },
    choices: [],
  },

  {
    id: 'c12_city_burns_end',
    chapter: 'Chapter 12',
    title: 'City Burns',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch12_city_burns',
    text: `The broadcast completes without redirect, and the seventeen-fold signal's full propagation through the city's broadcast infrastructure produces what the Red Choir's documented research predicted and the other four factions' institutional responses ensured: a cascade. The faction war's simultaneous climax, triggered by a signal that reaches every person in the city simultaneously. The city burns in the specific way that cities burn when the decision about what they are finally becomes undeniable. The mark-bearer is in the burning, having tried the redirect and failed it. The sub-city truth is in the bearer. The bearer is in the city. The city is fire. The Hollow Children's tunnel system survives. The Sleeping Server's records survive. The mark survives, held in the rubble's resonance, until the city cools enough to remember what it was carrying.`,
    effectsOnEnter: { setFlags: ['city_burns_death'] },
    choices: [],
  },

  // BAD ENDINGS — BETRAYAL (4)

  {
    id: 'c12_broken_throne_betrayal_end',
    chapter: 'Chapter 12',
    title: 'Broken Throne',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch12_broken_throne',
    text: `The Broken Throne produces the betrayal that every convergence of five armed factions produces when the center cannot hold. The specific faction that breaks first depends on the route — but one breaks, and breaking creates the cascade, and the cascade ends the window, and the window was the only configuration in which the sub-city's truth could be delivered to an assembled audience. The truth is still in the bearer. The bearer is still alive, narrowly. But the room that could have received it is now a faction war with additional grievances. The Broken Throne ends the chapter with the truth undistributed and the factions choosing their own versions of it. The mark carries the complete record forward. The city carries its chosen fiction. Both will reach the Final Gate's approach from different directions.`,
    effectsOnEnter: { setFlags: ['broken_throne_betrayal'] },
    choices: [],
  },

  {
    id: 'c12_varr_betrayal_end',
    chapter: 'Chapter 12',
    title: 'Varr\'s Betrayal',
    location: 'The Glass Barricade',
    imageKey: 'glass_barricade',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch12_varr_betrayal',
    text: `Varr's defection was a performance. Director Varr has been Glass Court intelligence for twenty-three years, and the specific skill of performing defection for a mark-bearer's benefit is the kind of skill that a twenty-three-year career in Glass Court intelligence produces without the career intending it. The bearer trusted the performance. The performance completed its objective: the mark-bearer's position within the Glass Barricade, at the extraction device, without the shadow network's confirmed read. Seraphine accepts the outcome with the expression of someone whose variable has been resolved exactly as calculated. The extraction device activates on the bearer. The Glass Court's research record is updated.`,
    effectsOnEnter: { setFlags: ['varr_betrayal_complete'] },
    choices: [],
  },

  {
    id: 'c12_mael_seal_end',
    chapter: 'Chapter 12',
    title: 'The Archive Sealed',
    location: 'The Archive Siege',
    imageKey: 'archive_siege',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch12_mael_seal',
    text: `Mael's failsafe was not a broadcast. The shadow network's intelligence was partially correct — there is a failsafe, and it is architectural. What it does: it seals the Archive with everyone inside it. Mael's specific institutional decision: the complete record is too dangerous to release in the middle of a five-faction war. The Archive seals. The siege outside cannot breach it. The bearer, inside, has the complete record and a sealed Archive and no route to the Broken Throne. Mael is not apologetic. He is thorough. "The record is safe," he says. "Everything inside this building is safe." He is correct about both. The seal is complete. The city decides without the bearer's intervention. The Archive will open eventually. Eventually is a specific and unknowable duration.`,
    effectsOnEnter: { setFlags: ['mael_seal_complete'] },
    choices: [],
  },

  {
    id: 'c12_heir_knife_end',
    chapter: 'Chapter 12',
    title: 'The Heir\'s Knife',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch12_heir_knife',
    text: `The sub-city established the basis for many things. The rejection in the sub-city — whatever form it took in Chapter 11 — established the basis for this. The Masked Heir, unmasked and inheriting, strikes in the Broken Throne with the specific precision of someone who has been carrying the rejection for the duration of the chapter and has chosen the convergence point as the resolution. The strike is not political. It is personal. It is the oldest reason for a knife at the Broken Throne: someone who was wronged and had the patience to wait for the right room. The mark dims. The sub-city's resonance holds in the Broken Throne's hall for four minutes and thirty seconds, which is the longest it has held in any space above ground. The Heir does not note this. They are already carrying the record.`,
    effectsOnEnter: { setFlags: ['heir_knife_complete'] },
    choices: [],
  },

  // BAD ENDINGS — CORRUPTION (3)

  {
    id: 'c12_choir_consumed_end',
    chapter: 'Chapter 12',
    title: 'Choir Consumed',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch12_choir_consumed',
    text: `The seventeen-fold network, on critical failure, receives the mark's architecture as a signal rather than as a negotiation. The critical failure mode: the mark opens further than the bearer intended, the seventeen frequencies lock to the mark's architecture simultaneously, and the mark becomes the seventeen-fold network's primary channel. The bearer does not die. The bearer becomes the broadcast. The city receives, for approximately forty minutes, the clearest transmission the Red Choir's network has ever produced: the sub-city's truth, the mark's twelve-chapter resonance, the entity's departure record, and the specific quality of someone who carried it all and lost the container in the carrying. Mother Veyl stops the march. "The signal completed," she says. "In a way I did not intend." The mark is warm. The bearer is the warmth.`,
    effectsOnEnter: { setFlags: ['choir_consumed_corruption'] },
    choices: [],
  },

  {
    id: 'c12_choir_city_end',
    chapter: 'Chapter 12',
    title: 'The City Choir',
    location: 'The Red Choir March',
    imageKey: 'red_choir_march',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch12_choir_city',
    text: `The broadcast completes at full intensity. The seventeen-fold network's signal propagates through every broadcast point in the city. The forty percent temporary mark sensitivity becomes, in the high-corruption configuration, sixty percent. The permanent eight percent becomes fifteen. The city sings. Not the Red Choir's organized hymn — the city's own resonance, uncurated, the three hundred years of compressed relic field interaction released into the population simultaneously. It is not painful, exactly. It is overwhelming in the way that truth is overwhelming when it arrives at the wrong moment. The mark-bearer is in it. The mark-bearer's corruption, at sixty-plus, is sufficient that the integration is not temporary. The city sings. The bearer sings with it. The faction war continues somewhere outside the song. The song continues everywhere else.`,
    effectsOnEnter: { setFlags: ['choir_city_corruption'] },
    choices: [],
  },

  {
    id: 'c12_tyrant_corrupt_end',
    chapter: 'Chapter 12',
    title: 'Tyrant Corrupted',
    location: 'The Broken Throne',
    imageKey: 'broken_throne',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch12_tyrant_corrupt',
    text: `The throne holds. The corruption completes. At seventy-plus, the mark's architecture and the throne's claim produce a configuration that the sub-city's entity would have recognized as: the same mistake, differently dressed. The tyrant rules with the mark's full relic authority — not the entity's presence, but the twelve-chapter residue of a presence that has just departed. The factions don't resist it, exactly. They avoid it, the way things avoid frequencies they can't process. The city is ruled. The ruling is thorough, efficient, and built on a foundation that is the opposite of the truth the bearer carried for twelve chapters: the truth was that the city could choose. The corruption makes the choice for it. The mark is warm. The warmth is the only warmth in the room.`,
    effectsOnEnter: { setFlags: ['tyrant_corrupt_corruption'] },
    choices: [],
  },
];
