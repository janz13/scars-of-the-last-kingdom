import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 3 — CHILDREN OF THE TUNNELS
//
//  Theme: A hidden society of children, scavengers, and tunnel warlords who
//         trust no adult. The player must earn or betray that trust.
//
//  Locations:
//    Bone Turnstile · Candle Market · Chalk Map Wall · Flooded Platform
//    Nursery of Knives · Rat King's Toll Gate · Hidden Clinic · Relic Engine Room
//    The Door Without a Handle
//
//  Key NPCs:
//    Lio — Hollow Children scout        Mother Chalk — faction leader
//    Patch — child relic mechanic       Sera — starving child
//    The Rat King — tunnel warlord
//
//  Routes:
//    1. Earn Hollow Children trust     6. Trigger mark near relic engine
//    2. Betray to another faction      7. Lose Mira trust (cruelty)
//    3. Protect children from Saints   8. Gain Cain respect (tactics)
//    4. Steal from Candle Market       9. Wasteland Orphan secret route
//    5. Find Last Archive symbols     10. Shadow Broker secret route
//
//  Starting node: chapter3_start
//  Ends at:       c3_chapter3_end (leads into Chapter 4)
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_3_NODES: StoryNode[] = [

  // ── CHAPTER ENTRY ──────────────────────────────────────────────────────────

  {
    id: 'chapter3_start',
    chapter: 'Chapter 3',
    title: 'What the Dark Remembers',
    location: 'Deep Tunnels — Sub-Level 3',
    imageKey: 'collapsed_tunnel',
    text: `The surface is already behind you. You found the access shaft three blocks from where the Iron Saints patrol turned east, and you went down before they could decide what they wanted from you. Sub-Level 3 is different from the metro tunnels you know — older, narrower, less engineered. The walls here were dug by hand in some places. The darkness is thicker. Your mark pulses once and then holds quiet, as if it is paying attention. Somewhere ahead: the smell of tallow candles and the sound of children who do not know you are listening.`,
    effectsOnEnter: { hunger: -1, thirst: -1, setFlags: ['chapter3_begun'] },
    choices: [
      {
        id: 'c3_enter_cautiously',
        text: 'Move slowly and make no sound. Listen before you step.',
        nextNode: 'c3_tunnel_descent',
        effects: { agility: 1 },
      },
      {
        id: 'c3_enter_directly',
        text: 'Move at pace. Hesitation announces itself.',
        nextNode: 'c3_tunnel_descent',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c3_tunnel_descent',
    chapter: 'Chapter 3',
    title: 'Sub-Level Descent',
    location: 'Deep Tunnels — Sub-Level 3 Passage',
    imageKey: 'collapsed_tunnel',
    text: `The passage narrows until you are moving sideways in places. Old service conduit, pre-collapse. The walls carry chalk markings — not graffiti, not random. A system. Arrows, symbols, numbers struck through with horizontal lines. Someone is managing this space carefully, which means someone is watching it. Cain reads the markings without touching them. Mira keeps close. The mark on your wrist pulses in the same slow rhythm it has held since the surface, but warmer now. Whatever the Hollow Children built down here, it has a heartbeat.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_read_chalk_markings',
        text: 'Study the chalk markings carefully before going further.',
        nextNode: 'c3_first_signs',
        effects: { intelligence: 1 },
      },
      {
        id: 'c3_orphan_reads_chalk',
        text: '[Wasteland Orphan] These marks. You\'ve seen this system before — three tunnels east of where you grew up.',
        nextNode: 'c3_first_signs',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { luck: 2, hollowChildren: 5, setFlags: ['knows_hollow_chalk_system'] },
        isHidden: true,
      },
      {
        id: 'c3_ignore_markings',
        text: 'Don\'t touch anything. Just keep moving.',
        nextNode: 'c3_first_signs',
      },
    ],
  },

  {
    id: 'c3_first_signs',
    chapter: 'Chapter 3',
    title: 'Signs of the Hollow Children',
    location: 'Deep Tunnels — Approach Corridor',
    imageKey: 'collapsed_tunnel',
    text: `You find the first trap at knee height — a taut wire strung across the passage, connected to a bundle of salvaged tin cans. You disarm it without triggering it. The second is more sophisticated: a pressure plate, poorly disguised but effective in the dark. Children built these. Children who have been defending this passage long enough to iterate on their designs. You step over the plate. The sound ahead is clearer now — voices, low and deliberate, and the specific quality of silence that means someone has heard you and stopped talking.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_call_out',
        text: 'Announce yourself aloud. "I know you\'re there. I\'m not Iron Saints."',
        nextNode: 'c3_lio_encounter',
        effects: { morale: -1 },
      },
      {
        id: 'c3_wait_for_them',
        text: 'Stop moving. Wait for them to make the first move.',
        nextNode: 'c3_lio_encounter',
        effects: { agility: 1 },
      },
      {
        id: 'c3_leave_offering',
        text: 'Place something valuable on the ground in front of you and step back.',
        nextNode: 'c3_lio_encounter',
        effects: { food: -1, hollowChildren: 3 },
      },
    ],
  },

  // ── LIO ENCOUNTER ──────────────────────────────────────────────────────────

  {
    id: 'c3_lio_encounter',
    chapter: 'Chapter 3',
    title: 'Lio',
    location: 'Deep Tunnels — Checkpoint Junction',
    imageKey: 'collapsed_tunnel',
    text: `He drops from the ceiling. Fourteen, maybe fifteen — hard to tell when someone has spent years in the dark. He lands in a crouch with a knife already drawn, the kind of move that takes practice to make look effortless. The knife is excellent: pre-collapse steel, well-maintained. His eyes go to your wrist mark immediately and his expression does not change, which tells you everything. He was told about the mark before you arrived. Someone was watching longer than you realised. "You have exactly one chance to say something that isn't a lie," he says. "Choose carefully."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_lio_truth',
        text: '"I\'m not here for the Saints. I\'m here because the mark brought me."',
        nextNode: 'c3_lio_challenge',
        effects: { hollowChildren: 5 },
      },
      {
        id: 'c3_lio_trade',
        text: '"I have medicine. Food. I want passage and information."',
        nextNode: 'c3_lio_challenge',
        effects: { hollowChildren: 3 },
      },
      {
        id: 'c3_lio_broker_angle',
        text: '[Shadow Broker] "I know things that will keep your people alive for a month. Let\'s talk value."',
        nextNode: 'c3_lio_challenge',
        requirements: { classes: ['shadow_broker'] },
        effects: { hollowChildren: 8, cainTrust: 1, setFlags: ['broker_impressed_lio'] },
        isHidden: true,
      },
      {
        id: 'c3_lio_orphan_angle',
        text: '[Wasteland Orphan] "I grew up in tunnels like this. I know what it costs to build this. I\'m not your enemy."',
        nextNode: 'c3_lio_challenge',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { hollowChildren: 10, setFlags: ['orphan_lio_bond'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c3_lio_challenge',
    chapter: 'Chapter 3',
    title: 'The Scout\'s Test',
    location: 'Deep Tunnels — Checkpoint Junction',
    imageKey: 'collapsed_tunnel',
    text: `Lio studies you for a long time. Then he describes the test. Three checkpoints. Each one has a question. You answer wrong — or you try to force your way through — and the Hollow Children know within seconds. The tunnels have eyes in every shadow down here. He is not threatening you. He is explaining the terms of an arrangement that has kept his people alive for two years. "The Iron Saints send people in too," he says. "We find them in the first twenty metres. You'll understand why that's relevant when you get to the Bone Turnstile."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_accept_test',
        text: '"Agreed. Show me the first checkpoint."',
        nextNode: 'c3_lio_test_pass',
        effects: { hollowChildren: 5 },
      },
      {
        id: 'c3_negotiate_test',
        text: '"I\'ll take your test, but if I pass, I want a meeting with whoever runs this place."',
        nextNode: 'c3_lio_test_pass',
        effects: { hollowChildren: 3, charisma: 1 },
      },
      {
        id: 'c3_refuse_test',
        text: '"I don\'t have time for this. I\'ll take my chances."',
        nextNode: 'c3_lio_test_fail',
        effects: { hollowChildren: -10, miraTrust: -1 },
      },
    ],
  },

  {
    id: 'c3_lio_test_pass',
    chapter: 'Chapter 3',
    title: 'The First Mark of Trust',
    location: 'Deep Tunnels — Inner Passage',
    imageKey: 'collapsed_tunnel',
    text: `The three checkpoints take forty minutes. Questions about what you saw on the surface, what you know about Iron Saints patrol timing, whether you encountered any Glass Court surveillance drones in the access shaft. Lio listens to your answers and relays them through a series of hand signals to figures you can barely see at the edges of your lamplight. At the end, he nods once. The knife goes back. "Bone Turnstile is ahead. It's a mechanism — pre-collapse. It reads bodies. If you're carrying concealed weapons or contraband relic devices, it triggers an alarm." He pauses. "It's not broken."`,
    effectsOnEnter: { setFlags: ['lio_trust_earned'] },
    choices: [
      {
        id: 'c3_head_to_turnstile',
        text: 'Head to the Bone Turnstile.',
        nextNode: 'c3_bone_turnstile_arrive',
      },
      {
        id: 'c3_ask_lio_about_chalk',
        text: '"The chalk system in the entrance passage — who designed it?"',
        nextNode: 'c3_bone_turnstile_arrive',
        effects: { intelligence: 1, hollowChildren: 3 },
      },
    ],
  },

  {
    id: 'c3_lio_test_fail',
    chapter: 'Chapter 3',
    title: 'Unwelcome',
    location: 'Deep Tunnels — Inner Passage',
    imageKey: 'collapsed_tunnel',
    text: `The passage narrows immediately and you hear movement in the walls — in the walls, not through them. Lio walks behind you. "You'll still reach the Bone Turnstile," he says. "But people who fail the courtesies get watched differently down here. The market will be half-priced for you because you look like someone who needs help. The other half is that everyone in the market knows why." He is not being cruel. He is being accurate. You have lost something that will take time to rebuild and this place does not have the patience for slow trust.`,
    effectsOnEnter: { setFlags: ['lio_test_failed'], hollowChildren: -5 },
    choices: [
      {
        id: 'c3_accept_terms',
        text: 'Accept the terms and move to the Turnstile.',
        nextNode: 'c3_bone_turnstile_arrive',
      },
      {
        id: 'c3_apologise_lio',
        text: '"That was wrong of me. I was afraid and it came out badly."',
        nextNode: 'c3_bone_turnstile_arrive',
        effects: { hollowChildren: 5, miraTrust: 1 },
      },
    ],
  },

  // ── BONE TURNSTILE ─────────────────────────────────────────────────────────

  {
    id: 'c3_bone_turnstile_arrive',
    chapter: 'Chapter 3',
    title: 'The Bone Turnstile',
    location: 'The Bone Turnstile — Gate Mechanism',
    imageKey: 'bone_turnstile',
    text: `It is exactly what the name promises. A pre-collapse metro turnstile, reinforced with bone — animal bones, you tell yourself, though some are the wrong size — wired to what you now recognise as a salvaged pressure-detection array from a Glass Court surveillance kit. Someone small and very intelligent rewired this from scratch. The array reads body density and detects metal concentrations at a granularity that is genuinely impressive. There is a gap in the mechanism, high on the left side, where the housing is cracked. A body might slip through if they were quick and if they moved at exactly the right angle.`,
    effectsOnEnter: { hunger: -1 },
    choices: [
      {
        id: 'c3_use_gap',
        text: '[Roll dice — Agility] Slip through the housing gap at speed.',
        nextNode: 'c3_turnstile_passed',
        diceCheck: {
          stat: 'agility',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c3_turnstile_passed',
          failureNode: 'c3_turnstile_caught',
        },
      },
      {
        id: 'c3_declare_weapons',
        text: 'Declare everything you\'re carrying before the scan.',
        nextNode: 'c3_turnstile_passed',
        effects: { hollowChildren: 8, morale: -1 },
      },
      {
        id: 'c3_blade_survivor_check',
        text: '[Blade Survivor] Disassemble your weapon before the scan. You know every component.',
        nextNode: 'c3_turnstile_passed',
        requirements: { classes: ['blade_survivor'] },
        effects: { agility: 1, setFlags: ['blade_disassembled_turnstile'] },
        isHidden: true,
      },
      {
        id: 'c3_conceal_weapons',
        text: 'Try to conceal what you\'re carrying and go through normally.',
        nextNode: 'c3_turnstile_caught',
        effects: { hollowChildren: -15 },
      },
    ],
  },

  {
    id: 'c3_turnstile_passed',
    chapter: 'Chapter 3',
    title: 'Through the Gate',
    location: 'The Bone Turnstile — Cleared',
    imageKey: 'bone_turnstile',
    text: `The mechanism clicks. A green light — actual green, battery-powered, a luxury down here — blinks twice and stays lit. On the other side, the tunnel opens into something wider than you expected: light, sound, the smell of cooking fat and wax and forty people living in a space designed for ten. Lio appears at your shoulder. "Candle Market," he says. "Don't steal anything. They know."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_enter_market',
        text: 'Enter the Candle Market.',
        nextNode: 'c3_candle_market_arrive',
      },
    ],
  },

  {
    id: 'c3_turnstile_caught',
    chapter: 'Chapter 3',
    title: 'Caught at the Gate',
    location: 'The Bone Turnstile — Alarm Triggered',
    imageKey: 'bone_turnstile',
    text: `The alarm is a chord — three tones struck in sequence on metal bars hidden in the ceiling — and the tunnel on the far side fills with small, precise bodies in the space between heartbeats. Six children, none older than thirteen, all holding something improvised and dangerous. Lio steps forward. The confrontation lasts two minutes and ends with your weapons logged in a ledger and stored behind the Turnstile's housing. You will get them back when you leave, he says. If you leave.`,
    effectsOnEnter: { hollowChildren: -10, setFlags: ['weapons_confiscated'] },
    choices: [
      {
        id: 'c3_accept_confiscation',
        text: 'Surrender your weapons without argument.',
        nextNode: 'c3_candle_market_arrive',
        effects: { hollowChildren: 5, morale: -2 },
      },
      {
        id: 'c3_resist_confiscation',
        text: 'Refuse to surrender your weapons.',
        nextNode: 'c3_candle_market_arrive',
        effects: { hollowChildren: -15, health: -10, morale: -3 },
      },
    ],
  },

  // ── CANDLE MARKET ──────────────────────────────────────────────────────────

  {
    id: 'c3_candle_market_arrive',
    chapter: 'Chapter 3',
    title: 'The Candle Market',
    location: 'The Candle Market — Main Chamber',
    imageKey: 'candle_market',
    text: `The chamber is a converted maintenance hub — ten metres across, four high, lit by hundreds of candles placed on every horizontal surface. The light is warm and wrong; it makes everything look like a scene from before the collapse, a memory of commerce. Children run the stalls. Not children playing at commerce — children running commerce with the competence of people who learned fast because the alternative was starvation. Dried meat. Salvaged medicine. Electrical components. Chalk and charcoal. Clean water in sealed containers, marked with prices that reflect exactly what water is worth down here.`,
    effectsOnEnter: { morale: 1 },
    choices: [
      {
        id: 'c3_observe_market',
        text: 'Walk through and observe before doing anything.',
        nextNode: 'c3_market_observe',
      },
      {
        id: 'c3_look_for_patch',
        text: 'Ask Lio about anyone who can work with relic devices.',
        nextNode: 'c3_patch_encounter',
        requirements: { flags: ['lio_trust_earned'] },
      },
      {
        id: 'c3_find_sera',
        text: 'A girl in the corner isn\'t buying anything. She\'s watching everyone else eat.',
        nextNode: 'c3_sera_encounter',
      },
    ],
  },

  {
    id: 'c3_market_observe',
    chapter: 'Chapter 3',
    title: 'Reading the Market',
    location: 'The Candle Market — Main Chamber',
    imageKey: 'candle_market',
    text: `You spend fifteen minutes watching. The market has rules: prices are fixed and displayed in chalk, disputes go to a child with a red sash who writes everything down, and no transaction is completed without two witnesses. Sophisticated. The courier in your history would recognise this as a functional black market with better governance than most. There are gaps in the supply: no medicine stronger than basic antiseptic, no ammunition, no water purification tablets despite the obvious need. Someone is controlling what reaches this market. The question is whether that person is Mother Chalk or someone else.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_trade_supplies',
        text: 'Trade some of your supplies for things they need more than you.',
        nextNode: 'c3_market_trade',
        effects: { food: -2, water: -1, medicine: 1, hollowChildren: 8 },
      },
      {
        id: 'c3_courier_market_read',
        text: '[Black Market Courier] Identify the supply gaps and who\'s controlling them.',
        nextNode: 'c3_market_trade',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { intelligence: 2, hollowChildren: 5, lastArchive: 3, setFlags: ['market_supply_gap_known'] },
        isHidden: true,
      },
      {
        id: 'c3_steal_attempt',
        text: 'There\'s something you need on that stall. Take it when they\'re distracted.',
        nextNode: 'c3_market_steal_attempt',
        effects: { morale: -1, miraTrust: -2 },
      },
      {
        id: 'c3_find_children',
        text: 'Look for Patch — Lio mentioned a child who works with devices.',
        nextNode: 'c3_patch_encounter',
      },
    ],
  },

  {
    id: 'c3_market_steal_attempt',
    chapter: 'Chapter 3',
    title: 'Taking What Isn\'t Yours',
    location: 'The Candle Market — Stall Row',
    imageKey: 'candle_market',
    text: `Mira puts a hand on your arm and says nothing. You understand what she means. You proceed anyway. The child running the stall has their back to you, occupied with a transaction. You move to the shelf. The item — medicine, a full dose of antiseptic — is in your hand. Three seconds from the shelf. You've done this before, in worse conditions. The market is watching. The market is always watching. The child with the red sash hasn't moved, but they're looking directly at you now.`,
    effectsOnEnter: { miraTrust: -2 },
    choices: [
      {
        id: 'c3_steal_fast',
        text: '[Roll dice — Luck] Move fast and get out before they react.',
        nextNode: 'c3_market_steal_success',
        diceCheck: {
          stat: 'luck',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c3_market_steal_success',
          failureNode: 'c3_market_steal_caught',
        },
      },
      {
        id: 'c3_put_it_back',
        text: 'Put it back. This was a mistake.',
        nextNode: 'c3_market_observe',
        effects: { morale: 1, hollowChildren: 5 },
      },
    ],
  },

  {
    id: 'c3_market_steal_success',
    chapter: 'Chapter 3',
    title: 'Clean Hands',
    location: 'The Candle Market — Stall Row',
    imageKey: 'candle_market',
    text: `You move through the gap between two stalls and the item disappears. Nobody reacts. The red sash child writes something in their ledger. You can't see what. Cain meets your eye and nods, once — a professional acknowledgment, nothing more. Mira doesn't look at you for the next ten minutes. The medicine is yours. The cost will be something you haven't been charged for yet. Down here, debts accumulate with interest.`,
    effectsOnEnter: { medicine: 2, setFlags: ['stole_from_market'], cainTrust: 1 },
    choices: [
      {
        id: 'c3_find_patch_after_steal',
        text: 'Find Patch and see what they can do with relic components.',
        nextNode: 'c3_patch_encounter',
      },
      {
        id: 'c3_find_sera_after_steal',
        text: 'The girl in the corner is still watching people eat.',
        nextNode: 'c3_sera_encounter',
      },
    ],
  },

  {
    id: 'c3_market_steal_caught',
    chapter: 'Chapter 3',
    title: 'The Market Sees Everything',
    location: 'The Candle Market — Stall Row',
    imageKey: 'candle_market',
    text: `The alarm is the same chord as the Turnstile — three struck notes — and the market becomes a tribunal in thirty seconds. The red sash child reads from their ledger with the formality of someone who has done this before. The item is recovered and returned. The market sentences you in the language they use for everything: fair exchange. You owe them double the item's value and you will not be trusted in the market again until the debt is paid. The alternative is escalation, and escalation here means Lio and his knife, and after that, Mother Chalk.`,
    effectsOnEnter: { hollowChildren: -20, setFlags: ['caught_stealing_market'] },
    choices: [
      {
        id: 'c3_pay_market_debt',
        text: 'Pay the debt in full.',
        nextNode: 'c3_market_trade',
        effects: { food: -3, water: -2, scrap: -5, hollowChildren: 5 },
      },
      {
        id: 'c3_refuse_market_debt',
        text: 'Refuse. This system has no authority over you.',
        nextNode: 'c3_end_market_lynching',
        effects: { hollowChildren: -30 },
      },
    ],
  },

  {
    id: 'c3_end_market_lynching',
    chapter: 'Chapter 3',
    title: 'The Candle Goes Out',
    location: 'The Candle Market — Final Account',
    imageKey: 'candle_market',
    text: `The market has seen adults before. Adults who think children's rules are soft rules. Adults who believe the size differential translates to an authority differential. The Hollow Children learned, two years ago, that the only way to make adults recalibrate this assumption is to make the lesson unforgettable. You are the lesson. Mira tries to stop it. She can't. Cain doesn't try. The market finds its verdict in the time it takes the last candle in the row to gutter out. The mark dims. The tunnels are patient — they wait for everyone.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_market_lynching',
  },

  {
    id: 'c3_market_trade',
    chapter: 'Chapter 3',
    title: 'Exchange',
    location: 'The Candle Market — Trade Row',
    imageKey: 'candle_market',
    text: `You trade. The market accepts your supplies with the same careful ledger-keeping it applies to everything. In return: water purification tablets, a coil of wire you didn't know you needed, and two doses of the local antiseptic made from tunnel moss and salvaged alcohol — crude but effective. The child who handles your transaction is maybe ten years old and makes change with the speed of someone who grew up counting it. Mira watches. Her expression is something that hasn't happened in a while: relief.`,
    effectsOnEnter: { water: 2, medicine: 2, scrap: 3, hollowChildren: 5 },
    choices: [
      {
        id: 'c3_find_patch_from_trade',
        text: 'Ask the trader about the child mechanic — Patch.',
        nextNode: 'c3_patch_encounter',
      },
      {
        id: 'c3_find_sera_from_trade',
        text: 'The hungry girl in the corner. See what her situation is.',
        nextNode: 'c3_sera_encounter',
      },
    ],
  },

  {
    id: 'c3_patch_encounter',
    chapter: 'Chapter 3',
    title: 'Patch',
    location: 'The Candle Market — Workshop Corner',
    imageKey: 'candle_market',
    text: `Patch is eleven, maybe twelve, with grease-blackened hands and the focused expression of someone who knows exactly what they are good at. The workshop corner is a salvager's cathedral: components from three different eras sorted by function, not by origin. Pre-collapse capacitors next to hand-wound coils next to something that looks like it was stripped from a Glass Court surveillance unit. Patch looks at your wrist mark and then at the components they are holding and says, very quietly: "That's the same frequency as the engine room. You know there's an engine room, right?"`,
    effectsOnEnter: { setFlags: ['patch_met'] },
    choices: [
      {
        id: 'c3_ask_patch_about_engine',
        text: '"What engine room?"',
        nextNode: 'c3_patch_relic_offer',
        effects: { intelligence: 1 },
      },
      {
        id: 'c3_offer_patch_relic',
        text: 'Show Patch the relic components you\'ve been carrying.',
        nextNode: 'c3_patch_relic_offer',
        requirements: { relics: 1 },
        effects: { relics: -1, hollowChildren: 5, setFlags: ['gave_patch_relic'] },
      },
      {
        id: 'c3_relic_hunter_patch',
        text: '[Relic Hunter / Esper] Your instruments have been reading something from below. "Show me the frequency on your scanner."',
        nextNode: 'c3_patch_relic_offer',
        requirements: { classes: ['relic_hunter', 'esper'] },
        effects: { lastArchive: 5, intelligence: 2, setFlags: ['relic_scanner_synced'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c3_patch_relic_offer',
    chapter: 'Chapter 3',
    title: 'The Engine Signal',
    location: 'The Candle Market — Workshop Corner',
    imageKey: 'candle_market',
    text: `Patch draws a schematic on a scrap of paper while they explain. The relic engine was here before the market, before the Hollow Children, before the Blackout. It was running when they arrived — not loudly, not visibly, but running. The children learned not to go near it after two of the younger ones came back from the engine room confused and with nosebleeds that didn't stop for three days. Patch stopped going near it six months ago. "But your mark," Patch says, comparing the schematic to your wrist with the same expression they use for broken capacitors. "Your mark is the same signature. Exactly the same."`,
    effectsOnEnter: { setFlags: ['engine_signal_known'] },
    choices: [
      {
        id: 'c3_find_sera_after_patch',
        text: 'Find the hungry girl before this information settles.',
        nextNode: 'c3_sera_encounter',
      },
      {
        id: 'c3_go_to_chalk_map',
        text: 'You\'ve heard enough. Head to the Chalk Map Wall.',
        nextNode: 'c3_chalk_map_wall',
      },
    ],
  },

  // ── SERA ────────────────────────────────────────────────────────────────────

  {
    id: 'c3_sera_encounter',
    chapter: 'Chapter 3',
    title: 'Sera',
    location: 'The Candle Market — Corner',
    imageKey: 'candle_market',
    text: `The girl's name is Sera. Eight years old, possibly nine — malnutrition compresses the apparent age. She is watching the food stalls with the specific focused attention of someone whose body has been overriding their thoughts for a while. She is not begging. That distinction is important here: the Hollow Children don't beg because Mother Chalk says begging teaches the wrong lesson. Sera is waiting. For something that might not come. She looks at you with the sideways wariness of someone who has learned that adults who notice you don't always mean well by noticing.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_feed_sera',
        text: 'Give her food from your pack.',
        nextNode: 'c3_sera_kindness',
        effects: { food: -2, morale: 2, hollowChildren: 10, miraTrust: 2 },
      },
      {
        id: 'c3_talk_to_sera',
        text: '"How long have you been down here, Sera?"',
        nextNode: 'c3_sera_kindness',
        effects: { hollowChildren: 5, intelligence: 1 },
      },
      {
        id: 'c3_ignore_sera',
        text: 'She\'s not your problem. You have your own survival to worry about.',
        nextNode: 'c3_chalk_map_wall',
        effects: { miraTrust: -3, hollowChildren: -5, morale: -2 },
      },
      {
        id: 'c3_use_sera_as_leverage',
        text: 'Tell Lio that a child is being neglected — use it to negotiate better terms.',
        nextNode: 'c3_sera_cruelty_consequence',
        effects: { miraTrust: -5, cainTrust: 1, hollowChildren: -15, setFlags: ['sera_harm_done'] },
      },
    ],
  },

  {
    id: 'c3_sera_kindness',
    chapter: 'Chapter 3',
    title: 'Something That Costs',
    location: 'The Candle Market — Corner',
    imageKey: 'candle_market',
    text: `Sera eats with the controlled desperation of someone who has learned not to eat too fast because eating too fast after not eating comes with consequences. She doesn't say thank you immediately. She says: "Are you the one with the mark on their wrist?" When you confirm, she says: "Mother Chalk will want to see you." She has already been told to watch for you. She has been watching all afternoon. The hunger was real. The assignment was also real. Sera is eight years old and already understands how information has value. The Hollow Children start early.`,
    effectsOnEnter: { setFlags: ['sera_helped'] },
    choices: [
      {
        id: 'c3_follow_sera_lead',
        text: 'Let Sera guide you to the Chalk Map Wall.',
        nextNode: 'c3_chalk_map_wall',
        effects: { hollowChildren: 5, miraTrust: 1 },
      },
      {
        id: 'c3_ask_sera_about_chalk',
        text: '"What can you tell me about Mother Chalk before I meet her?"',
        nextNode: 'c3_chalk_map_wall',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c3_sera_cruelty_consequence',
    chapter: 'Chapter 3',
    title: 'What Mira Sees',
    location: 'The Candle Market — Corner',
    imageKey: 'candle_market',
    text: `Mira steps between you and Lio before you finish speaking. The conversation she has with you is quiet because she has learned that volume doesn't change outcomes — only clarity does. She tells you exactly what she thinks of this. Every word she chooses has been selected for maximum accuracy. It takes three minutes. Lio watches with the neutral expression of someone who already knew what kind of person you were going to turn out to be. Sera watches from the corner. She does not understand everything that is said. She understands enough.`,
    effectsOnEnter: { miraTrust: -3, hollowChildren: -10 },
    choices: [
      {
        id: 'c3_accept_mira_rebuke',
        text: 'Accept Mira\'s words without deflection.',
        nextNode: 'c3_chalk_map_wall',
        effects: { miraTrust: 1, morale: -1 },
      },
      {
        id: 'c3_dismiss_mira_rebuke',
        text: '"This is survival. Sentimentality is a resource we can\'t afford."',
        nextNode: 'c3_chalk_map_wall',
        effects: { miraTrust: -4, cainTrust: 1, morale: 1 },
      },
    ],
  },

  // ── CHALK MAP WALL ─────────────────────────────────────────────────────────

  {
    id: 'c3_chalk_map_wall',
    chapter: 'Chapter 3',
    title: 'The Chalk Map Wall',
    location: 'The Chalk Map Wall — Archive Chamber',
    imageKey: 'chalk_map_wall',
    text: `The wall is twenty metres long and four metres high and covered in chalk from floor to ceiling. Not graffiti — a map. The most comprehensive map of the metro sub-system you have ever seen: tunnels marked by size and condition, supply caches marked in red, patrol routes in blue, dangerous zones in black cross-hatching, safe passages in green. And in the lower left corner, in a different hand — older, more precise — a series of symbols that have nothing to do with the Hollow Children's system. Your mark pulses. Once. The symbols and the pulse land at the same time.`,
    effectsOnEnter: { intelligence: 1 },
    choices: [
      {
        id: 'c3_study_archive_symbols',
        text: 'Focus on the older symbols in the lower corner.',
        nextNode: 'c3_archive_symbols_found',
      },
      {
        id: 'c3_study_full_map',
        text: 'Study the full map before focusing on anything.',
        nextNode: 'c3_archive_symbols_found',
        effects: { intelligence: 2, luck: 1 },
      },
    ],
  },

  {
    id: 'c3_archive_symbols_found',
    chapter: 'Chapter 3',
    title: 'Old Writing',
    location: 'The Chalk Map Wall — Archive Section',
    imageKey: 'chalk_map_wall',
    text: `The symbols are pre-collapse. Not written after the Blackout — written before it, or during it, by someone who knew what they were saying. The same vocabulary as the Last Archive's door symbols, but used differently here — not as a seal but as a record. Locations. Depths. Something that might be a date system compressed into a notation you can't immediately parse. Your mark pulses again, and this time it leaves a warm trace on your skin that fades in five seconds. Whatever was written here was written for someone who had the mark. The someone was not supposed to take this long to arrive.`,
    effectsOnEnter: { lastArchive: 5, setFlags: ['archive_symbols_found_ch3'] },
    choices: [
      {
        id: 'c3_relic_hunter_read',
        text: '[Relic Hunter / Esper] Let your instruments run over the symbols. The resonance match is exact.',
        nextNode: 'c3_mother_chalk_summons',
        requirements: { classes: ['relic_hunter', 'esper'] },
        effects: { lastArchive: 15, intelligence: 2, setFlags: ['relic_symbols_decoded'] },
        isHidden: true,
      },
      {
        id: 'c3_scholar_read',
        text: '[Forgotten Scholar] Cross-reference against pre-collapse notation systems you studied.',
        nextNode: 'c3_mother_chalk_summons',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { lastArchive: 12, intelligence: 3, setFlags: ['scholar_symbols_read'] },
        isHidden: true,
      },
      {
        id: 'c3_copy_symbols',
        text: 'Copy the symbols carefully before continuing.',
        nextNode: 'c3_mother_chalk_summons',
        effects: { intelligence: 1, lastArchive: 5 },
      },
      {
        id: 'c3_move_on_symbols',
        text: 'Note what you\'ve seen and move on. Mother Chalk is waiting.',
        nextNode: 'c3_mother_chalk_summons',
      },
    ],
  },

  // ── MOTHER CHALK ───────────────────────────────────────────────────────────

  {
    id: 'c3_mother_chalk_summons',
    chapter: 'Chapter 3',
    title: 'The Summons',
    location: 'The Chalk Map Wall — Passage Beyond',
    imageKey: 'chalk_map_wall',
    text: `Lio appears at your shoulder with the regularity of someone who has been following you since the Turnstile — which he has. "She'll see you now," he says. Not "Mother Chalk wants to see you." Just: she will see you. The distinction carries weight. Seeing you is a decision she made. It is also, he implies without saying it, a decision she can unmake. You follow him through a door hidden behind the rightmost panel of the chalk map — a door you would not have found on your own because it is designed that way.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_follow_lio',
        text: 'Follow Lio without hesitation.',
        nextNode: 'c3_mother_chalk_meeting',
        effects: { hollowChildren: 3 },
      },
      {
        id: 'c3_ask_lio_what_to_expect',
        text: '"What does she want from me?"',
        nextNode: 'c3_mother_chalk_meeting',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c3_mother_chalk_meeting',
    chapter: 'Chapter 3',
    title: 'Mother Chalk',
    location: 'The Chalk Map Wall — Inner Chamber',
    imageKey: 'chalk_map_wall',
    text: `She is not what you expected. Mother Chalk is sixteen — seventeen at most — with chalk-white dust in her hair that gave the name its meaning and eyes that have the specific quality of someone who stopped being surprised by people a long time ago. She runs two hundred children across six sub-levels. She has been doing it since she was fourteen. She looks at your mark the way an engineer looks at an instrument reading: carefully, without sentiment. "The symbols on the wall," she says. "You reacted to them. The mark did. I've been waiting for someone whose mark still works." She pauses. "I have a problem I need a marked person to help with. And I have things you need. Let's discuss fairness."`,
    effectsOnEnter: { setFlags: ['mother_chalk_met'] },
    choices: [
      {
        id: 'c3_alliance_yes',
        text: '"Tell me the problem."',
        nextNode: 'c3_chalk_alliance_choice',
        effects: { hollowChildren: 5 },
      },
      {
        id: 'c3_alliance_conditions',
        text: '"Tell me what you\'re offering first."',
        nextNode: 'c3_chalk_alliance_choice',
        effects: { hollowChildren: 3, charisma: 1 },
      },
      {
        id: 'c3_alliance_probe',
        text: '"Why is a working mark important? What exactly is the engine room doing?"',
        nextNode: 'c3_chalk_alliance_choice',
        effects: { intelligence: 2, lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c3_chalk_alliance_choice',
    chapter: 'Chapter 3',
    title: 'The Terms',
    location: 'The Chalk Map Wall — Inner Chamber',
    imageKey: 'chalk_map_wall',
    text: `Mother Chalk describes the problem: the Rat King has blocked Flooded Platform access, which is the only route to the relic engine room that doesn't go through Iron Saints territory. The relic engine has been behaving differently for three weeks — louder, warmer, broadcasting a pulse that Patch can detect but not interpret. The children cannot go in. She believes a marked person can. In exchange: full Hollow Children passage rights, market access, and the information on the chalk wall that you haven't been able to read yet — there is a secondary notation that requires her key. It is a fair exchange if you trust the person offering it.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_accept_alliance',
        text: '"Fair exchange. I\'ll deal with the Rat King and go to the engine room."',
        nextNode: 'c3_chalk_trust_gained',
        effects: { hollowChildren: 15, setFlags: ['mother_chalk_allied'] },
      },
      {
        id: 'c3_partial_alliance',
        text: '"I\'ll deal with the Rat King. The engine room decision I\'ll make when I\'m standing in front of it."',
        nextNode: 'c3_chalk_trust_gained',
        effects: { hollowChildren: 8 },
      },
      {
        id: 'c3_reject_alliance_betray',
        text: 'This information is exactly what another faction would pay for. Leave and find a buyer.',
        nextNode: 'c3_chalk_betray_attempt',
        effects: { hollowChildren: -20, miraTrust: -3 },
      },
    ],
  },

  {
    id: 'c3_chalk_trust_gained',
    chapter: 'Chapter 3',
    title: 'Allies in the Dark',
    location: 'The Chalk Map Wall — Inner Chamber',
    imageKey: 'chalk_map_wall',
    text: `Mother Chalk gives you a chalk mark on your jacket sleeve — a specific combination that Hollow Children across six sub-levels will recognize. It is not authority. It is introduction. "You'll still have to manage your own passage," she says. "But they'll know you're not Saints and they'll know you were sent by us. That's the difference between getting through and not getting through." Lio escorts you back to the main passage. The Flooded Platform is east, through the section of tunnel that runs wet. The Rat King's gate is the only crossing point.`,
    effectsOnEnter: { setFlags: ['hollow_children_trust'] },
    choices: [
      {
        id: 'c3_head_to_flooded_platform',
        text: 'Head toward the Flooded Platform.',
        nextNode: 'c3_flooded_platform_arrive',
      },
    ],
  },

  // ── BETRAYAL PATH ──────────────────────────────────────────────────────────

  {
    id: 'c3_chalk_betray_attempt',
    chapter: 'Chapter 3',
    title: 'The Price of Information',
    location: 'Deep Tunnels — Departure Passage',
    imageKey: 'collapsed_tunnel',
    text: `You leave through the bone turnstile with the layout of the Hollow Children's network in your head and the smell of their candle market still on your clothes. Cain walks beside you and says nothing because he already knows what you are doing. Mira is three steps behind, staying there on principle. The Iron Saints checkpoint at Junction 4-C is twenty minutes east. The Glass Court has a data-buy operation at Junction 4-F. You have exactly the kind of information that makes people in either location very interested in meeting with you.`,
    effectsOnEnter: { hollowChildren: -25, miraTrust: -5, setFlags: ['hollow_children_betrayed'] },
    choices: [
      {
        id: 'c3_betray_to_iron_saints',
        text: 'Sell the information to the Iron Saints.',
        nextNode: 'c3_iron_saints_meeting_ch3',
        effects: { ironSaints: 15, hollowChildren: -20 },
      },
      {
        id: 'c3_betray_to_glass_court',
        text: 'Sell the information to the Glass Court.',
        nextNode: 'c3_iron_saints_meeting_ch3',
        effects: { glassCourt: 15, hollowChildren: -20 },
      },
      {
        id: 'c3_change_mind_return',
        text: 'Change your mind. Go back and tell Mother Chalk what you nearly did.',
        nextNode: 'c3_chalk_trust_gained',
        effects: { hollowChildren: -5, miraTrust: 3, morale: -2, setFlags: ['betrayal_reversed'] },
      },
    ],
  },

  {
    id: 'c3_iron_saints_meeting_ch3',
    chapter: 'Chapter 3',
    title: 'The Transaction',
    location: 'Iron Saints — Junction 4-C Post',
    imageKey: 'iron_saints_checkpoint',
    text: `The Saints listen. They are good at listening when information is being offered; they save the other expressions for later. The officer who receives your report nods at the correct intervals and asks the right follow-up questions. The payment arrives in food and passage papers and one dose of proper medicine — the actual pharmaceutical kind, not tunnel-moss antiseptic. You pocket it. The officer says the raid will be conducted discretely to avoid panic in the sub-tunnels. He means they will move fast enough that the children won't have time to evacuate.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_complete_betrayal',
        text: 'Take the payment and walk away.',
        nextNode: 'c3_end_hollow_massacred',
        effects: { ironSaints: 10, miraTrust: -5, morale: -5 },
      },
      {
        id: 'c3_warn_hollow_children',
        text: 'Warn the Hollow Children before the Saints move.',
        nextNode: 'c3_end_iron_saints_captured',
        effects: { hollowChildren: 15, ironSaints: -25 },
      },
    ],
  },

  {
    id: 'c3_end_iron_saints_captured',
    chapter: 'Chapter 3',
    title: 'The Delivered',
    location: 'Iron Saints — Processing Cell',
    imageKey: 'iron_saints_checkpoint',
    text: `Warning the children costs you the Saints' transaction and your freedom. The officer deduces the breach within the hour; the second team finds you in the tunnel before you reach the Hollow Children's perimeter. The mark is what they were always interested in. Everything else was negotiation. You are Category One Priority — the same classification they reserve for things they don't understand and can't afford to leave loose. Mira and Cain are registered separately as civilian contacts. The processing cell smells of iron and certainty. The city keeps burning. You keep being processed. These things are not related, and that is exactly the problem.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_iron_saints_captured_ch3',
  },

  {
    id: 'c3_end_hollow_massacred',
    chapter: 'Chapter 3',
    title: 'What Adults Do',
    location: 'Deep Tunnels — After the Raid',
    imageKey: 'bone_turnstile',
    text: `The raid takes eleven minutes. The Saints are efficient; they have done this before. The candle market is extinguished one flame at a time. You are not there — you are at the Junction, watching the smoke. Mira left an hour ago and did not say where. Cain is watching you with the expression he uses when an equation resolves into a number he didn't expect. The Hollow Children's network is not destroyed — Mother Chalk began moving people the moment Lio's watchmen reported your departure. But the Candle Market, the chalk map, the Bone Turnstile — gone. Sera was in the market when the Saints arrived. She wasn't in the list of recovered children. This is what adults do with the trust they are given.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'tyrant',
    endingId: 'ending_hollow_children_massacred',
  },

  // ── FLOODED PLATFORM ───────────────────────────────────────────────────────

  {
    id: 'c3_flooded_platform_arrive',
    chapter: 'Chapter 3',
    title: 'The Flooded Platform',
    location: 'The Flooded Platform — Approach',
    imageKey: 'flooded_platform',
    text: `The metro station flooded three months into the Blackout when the pumping system lost power. The water is black and cold and two metres deep in the lowest sections, shallowing to knee-height near the platform edge. The smell is old standing water and something chemical underneath it — not acutely dangerous, but Mira clocks it and starts timing their exposure. The crossing is forty metres. The old platform runs along the right side, above the waterline for most of its length. There are gaps in the platform where sections have collapsed. The Rat King's gate is visible on the far side.`,
    effectsOnEnter: { thirst: -2 },
    choices: [
      {
        id: 'c3_plan_crossing',
        text: 'Study the platform for the safest route before crossing.',
        nextNode: 'c3_flooded_platform_look',
        effects: { intelligence: 1 },
      },
      {
        id: 'c3_soldier_platform',
        text: '[Exiled Soldier] Scan for structural weaknesses and plan a crossing formation.',
        nextNode: 'c3_flooded_platform_look',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { strength: 1, agility: 1, setFlags: ['soldier_platform_scan'] },
        isHidden: true,
      },
      {
        id: 'c3_just_cross',
        text: 'Cross directly. Don\'t overthink it.',
        nextNode: 'c3_flooded_crossing_start',
        effects: { morale: 1 },
      },
    ],
  },

  {
    id: 'c3_flooded_platform_look',
    chapter: 'Chapter 3',
    title: 'Reading the Water',
    location: 'The Flooded Platform — East Edge',
    imageKey: 'flooded_platform',
    text: `Three platform gaps, one of them large — two metres across, with the platform edge crumbling on the far side. The water below the large gap is deeper than the rest; you can tell by the colour. The handrail above the gap is intact but corroded. A crossing is possible by staying on the right wall and using the handrail for the large gap, but the rail's load capacity is uncertain. The alternative is wading — cold, slow, chemical-adjacent, but not dependent on the handrail holding. Cain waits for your decision. Mira is already timing the exposure count under her breath.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_handrail_crossing',
        text: '[Roll dice — Strength] Cross using the handrail over the large gap.',
        nextNode: 'c3_flooded_cross_success',
        diceCheck: {
          stat: 'strength',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c3_flooded_cross_success',
          failureNode: 'c3_flooded_cross_fail',
        },
      },
      {
        id: 'c3_wade_crossing',
        text: 'Wade through. Cold and slow but controllable.',
        nextNode: 'c3_flooded_cross_success',
        effects: { health: -5, thirst: -2, hunger: -1 },
      },
    ],
  },

  {
    id: 'c3_flooded_crossing_start',
    chapter: 'Chapter 3',
    title: 'Into the Water',
    location: 'The Flooded Platform — Crossing',
    imageKey: 'flooded_platform',
    text: `The cold is immediate and total. The water comes to mid-thigh in the shallow sections and chest-height at the deepest point near the large gap. The current is weak but real — drainage pull from somewhere below. Mira is beside you. Cain is a metre behind. The platform edge above the large gap is where the problems start.`,
    effectsOnEnter: { health: -5, thirst: -2 },
    choices: [
      {
        id: 'c3_push_through_water',
        text: '[Roll dice — Strength] Push through the deep section.',
        nextNode: 'c3_flooded_cross_success',
        diceCheck: {
          stat: 'strength',
          difficulty: 15,
          diceType: 'd20',
          successNode: 'c3_flooded_cross_success',
          failureNode: 'c3_flooded_cross_fail',
        },
      },
    ],
  },

  {
    id: 'c3_flooded_cross_success',
    chapter: 'Chapter 3',
    title: 'The Far Shore',
    location: 'The Flooded Platform — Far Side',
    imageKey: 'flooded_platform',
    text: `You make it across. Wet, cold, smelling of the chemical undertone, but intact. The Rat King's gate is thirty metres ahead: a welded steel barrier across the tunnel with a sliding section at its centre, and a light behind it that means someone is home. Mira wrings water from her jacket without comment. Cain checks his pack with the efficiency of someone who wrapped everything in oilskin before entering. You left the flooded section slightly worse off than you entered it, but you left it. That matters.`,
    effectsOnEnter: { health: -3 },
    choices: [
      {
        id: 'c3_approach_rat_king',
        text: 'Approach the Rat King\'s gate.',
        nextNode: 'c3_nursery_of_knives_arrive',
      },
    ],
  },

  {
    id: 'c3_flooded_cross_fail',
    chapter: 'Chapter 3',
    title: 'The Platform Gives',
    location: 'The Flooded Platform — Collapse Point',
    imageKey: 'flooded_platform',
    text: `The platform edge crumbles exactly when you're depending on it. The sound is three things in sequence: the crack, the give, and your own intake of breath as the support disappears. You hit the water at the deep point — black, cold, disorienting. The chemical tang is worse when you're submerged. Mira is already moving on the platform above. Cain grabs for a handhold on the far wall. You are in the water and the water is deep and the current is there even when you can't see it.`,
    effectsOnEnter: { health: -20 },
    choices: [
      {
        id: 'c3_fight_the_current',
        text: 'Fight toward the platform edge.',
        nextNode: 'c3_mira_slips',
        effects: { health: -10, strength: 1 },
      },
      {
        id: 'c3_find_the_bottom',
        text: 'Find the bottom and push up.',
        nextNode: 'c3_end_platform_drowned',
        effects: { health: -20 },
      },
    ],
  },

  {
    id: 'c3_end_platform_drowned',
    chapter: 'Chapter 3',
    title: 'Below the Platform',
    location: 'The Flooded Platform — Below',
    imageKey: 'flooded_platform',
    text: `The bottom is further than you calculated. The chemical water makes it hard to tell where you are or which direction is up once the disorientation sets in. Mira is somewhere above. You can hear her, dimly, through the water. The mark pulses — once, twice — and then dims as the cold reaches the right depth. The Flooded Platform claims another transit. The Hollow Children won't come looking. The Rat King on the far side doesn't record losses in his ledger. The water settles. The candles in the market, far above, burn on.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_platform_drowned',
  },

  // ── MIRA COMPANION NEAR-DEATH ──────────────────────────────────────────────

  {
    id: 'c3_mira_slips',
    chapter: 'Chapter 3',
    title: 'Mira Falls',
    location: 'The Flooded Platform — Mid-Crossing',
    imageKey: 'flooded_platform',
    text: `You make it to the platform wall when you hear the sound behind you — Mira, stepping on the same section you disturbed, which is now much less stable. She goes in. The sound she makes is controlled — Mira doesn't panic, even in cold water — but controlled is not the same as fine. The current at this depth is stronger than the surface implied. Cain is on the far side of the large gap, already looking at the structural options. He won't cross the gap to help. The geometry doesn't work from where he stands. This is your decision.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_rescue_mira',
        text: 'Go back in for her.',
        nextNode: 'c3_mira_rescued',
        effects: { health: -15, miraTrust: 5 },
      },
      {
        id: 'c3_direct_mira',
        text: 'Stay on the platform and guide her out with voice.',
        nextNode: 'c3_mira_rescued',
        effects: { health: -5, miraTrust: 2, intelligence: 1 },
      },
      {
        id: 'c3_abandon_mira_water',
        text: 'The current will take her and you can\'t follow. Keep moving to the far side.',
        nextNode: 'c3_mira_left_behind',
        effects: { miraTrust: -10, morale: -5, hollowChildren: -5 },
      },
    ],
  },

  {
    id: 'c3_mira_rescued',
    chapter: 'Chapter 3',
    title: 'Pulled Out',
    location: 'The Flooded Platform — Far Edge',
    imageKey: 'flooded_platform',
    text: `She comes out cold and controlled and doesn't say anything about it for twenty minutes. Then she says: "Thank you." Two words, very flat, very precise. From Mira, that is a significant emotional expenditure. Cain watches both of you with the expression he uses when he's recalibrating something. You are all wet and cold and the Rat King's gate is ahead and none of that has changed. What has changed is smaller and harder to name. The mark on your wrist pulses once, warm, and Mira notices it and says nothing about that either.`,
    effectsOnEnter: { setFlags: ['mira_rescued_platform'] },
    choices: [
      {
        id: 'c3_continue_after_rescue',
        text: 'Continue to the Nursery of Knives.',
        nextNode: 'c3_nursery_of_knives_arrive',
      },
    ],
  },

  {
    id: 'c3_mira_left_behind',
    chapter: 'Chapter 3',
    title: 'What the Water Takes',
    location: 'The Flooded Platform — Far Side',
    imageKey: 'flooded_platform',
    text: `You reach the far side. The crossing took everything it was going to take. You don't look back immediately. When you do, the platform behind you is empty and the water is flat. Cain is watching the surface of the water with the expression he uses for problems that have already been solved. He doesn't say anything. The mark on your wrist pulses twice, irregularly, which it has never done before. Whatever it's tracking, it's tracking something that has changed. The Rat King's gate is ahead. The city has a way of making you keep moving whether you want to or not.`,
    effectsOnEnter: { setFlags: ['mira_abandoned_platform'], miraTrust: -10 },
    choices: [
      {
        id: 'c3_continue_without_mira',
        text: 'Continue to the Rat King\'s gate.',
        nextNode: 'c3_end_mira_abandoned',
      },
    ],
  },

  {
    id: 'c3_end_mira_abandoned',
    chapter: 'Chapter 3',
    title: 'The Weight You Put Down',
    location: 'The Flooded Platform — Far Side',
    imageKey: 'flooded_platform',
    text: `Three days later, you are past the Rat King's gate and into the lower tunnel network, and the mark is still pulsing irregularly. Cain travels with you because Cain always travels with the person who has the most forward momentum and right now that is you. He does not mention Mira. You do not mention Mira. The city has a law it applies to everything that happens in it: the transaction was made and the cost was paid and now the transaction is finished. You have access to the engine room. You have the information Mother Chalk offered. Mira would have said that some transactions cannot be finished by paying. She is not here to say it.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_mira_abandoned_ch3',
  },

  // ── NURSERY OF KNIVES ──────────────────────────────────────────────────────

  {
    id: 'c3_nursery_of_knives_arrive',
    chapter: 'Chapter 3',
    title: 'The Nursery of Knives',
    location: 'The Nursery of Knives — Entry Passage',
    imageKey: 'nursery_of_knives',
    text: `The passage earned its name not from violence but from the Hollow Children's youngest cohort, who live here and whose primary occupation is making things sharp. Knives. Hooks. Points. Tools, primarily, but tools with an edge. The air smells of metal shavings and the specific kind of quiet that young children make when they are doing something careful and focused. The traps here are the best in the network — Lio mentioned them before the market, and now you're inside them. The children stop what they are doing and watch you move. This is the test before the Rat King's gate.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_move_carefully',
        text: 'Move slowly and watch where every foot lands.',
        nextNode: 'c3_nursery_trap_warning',
      },
      {
        id: 'c3_ask_children_safe_path',
        text: 'Ask the nearest child to show you the safe path through.',
        nextNode: 'c3_nursery_trap_warning',
        requirements: { flags: ['hollow_children_trust'] },
        effects: { hollowChildren: 5 },
      },
      {
        id: 'c3_rush_through',
        text: 'Move fast and accept what comes.',
        nextNode: 'c3_nursery_trap_hit',
        effects: { morale: -1 },
      },
    ],
  },

  {
    id: 'c3_nursery_trap_warning',
    chapter: 'Chapter 3',
    title: 'Pressure and Wire',
    location: 'The Nursery of Knives — Trap Zone',
    imageKey: 'nursery_of_knives',
    text: `You spot the first trigger three steps in — a wire at ankle height, almost invisible in the low candlelight. The second is the pressure plate two metres ahead, disguised with a scatter of loose gravel that a person in a hurry would mistake for the floor's natural texture. A third trigger is overhead: a spring-loaded bracket that would deploy downward on weight impact. All three are interconnected. A Blade Survivor would recognise the mechanism as a modification of a standard perimeter defence kit. An Esper could feel the mechanical tension before seeing it. Either way: you are standing in the middle of an interlocking trap system and the children are still watching.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_navigate_traps_careful',
        text: '[Roll dice — Intelligence] Navigate the trap sequence precisely.',
        nextNode: 'c3_nursery_trap_avoided',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c3_nursery_trap_avoided',
          failureNode: 'c3_nursery_trap_hit',
        },
      },
      {
        id: 'c3_blade_survivor_traps',
        text: '[Blade Survivor] Disarm the sequence from the outside link first.',
        nextNode: 'c3_nursery_trap_avoided',
        requirements: { classes: ['blade_survivor'] },
        effects: { agility: 1, hollowChildren: 5, setFlags: ['disarmed_nursery_traps'] },
        isHidden: true,
      },
      {
        id: 'c3_tactician_traps',
        text: '[Tactician] Map the trigger sequence before moving. There\'s a gap in the pattern.',
        nextNode: 'c3_nursery_trap_avoided',
        requirements: { classes: ['tactician'] },
        effects: { intelligence: 2, hollowChildren: 3 },
        isHidden: true,
      },
      {
        id: 'c3_force_through_traps',
        text: 'Accept the hit and push through.',
        nextNode: 'c3_nursery_trap_hit',
        effects: { health: -15 },
      },
    ],
  },

  {
    id: 'c3_nursery_trap_avoided',
    chapter: 'Chapter 3',
    title: 'The Children\'s Lesson',
    location: 'The Nursery of Knives — Far Side',
    imageKey: 'nursery_of_knives',
    text: `You step through the trap zone without triggering it. The children watch this. One of them — the youngest, maybe six — starts counting something on their fingers and shows it to the child beside them. You have passed a metric they were tracking. They don't applaud; the Hollow Children don't do that. Instead, the youngest one walks over and gives you a piece of chalk. It's a gift. It's also a key: chalk marked the same way as the piece Lio carries, which means it opens two of the market's supply caches. They decided this while you were navigating. They had already decided what passing looked like.`,
    effectsOnEnter: { setFlags: ['nursery_survived'], hollowChildren: 10 },
    choices: [
      {
        id: 'c3_take_chalk_gift',
        text: 'Accept the chalk and move to the saints patrol area.',
        nextNode: 'c3_nursery_children_test',
      },
    ],
  },

  {
    id: 'c3_nursery_trap_hit',
    chapter: 'Chapter 3',
    title: 'The Cost of Speed',
    location: 'The Nursery of Knives — Trap Zone',
    imageKey: 'nursery_of_knives',
    text: `The spring bracket deploys. It is designed to stop, not kill — the children use it to catch rather than harm — but at speed, the impact is significant enough to count. You end up on the floor with a cut along your forearm from the secondary wire and the children watching without expression. Mira is at your side in two seconds with the antiseptic. The children watch that too. A child with a ledger writes something down. The trap is reset within ninety seconds. The children move back to their work. They are not angry. They are merely precise about what information they collect.`,
    effectsOnEnter: { health: -20, medicine: -1 },
    choices: [
      {
        id: 'c3_accept_trap_hit',
        text: 'Get up, let Mira treat the cut, and continue.',
        nextNode: 'c3_nursery_children_test',
        effects: { morale: -2 },
      },
      {
        id: 'c3_rage_at_trap',
        text: 'Tear the trap mechanism apart. This is dangerous and they should know it.',
        nextNode: 'c3_end_nursery_trap',
        effects: { hollowChildren: -25, miraTrust: -3 },
      },
    ],
  },

  {
    id: 'c3_end_nursery_trap',
    chapter: 'Chapter 3',
    title: 'What the Children Learned',
    location: 'The Nursery of Knives — Final Account',
    imageKey: 'nursery_of_knives',
    text: `The trap mechanism breaks in your hands. The children don't run. The youngest one with the chalk looks at you with an expression that is not fear — fear would imply uncertainty about the outcome. This is something else. The ledger child writes a final entry and closes the book. The Nursery of Knives earns its name differently than you expected: the lesson is not about the knives. It is about what happens to people who destroy the things that children build to keep themselves alive. The Hollow Children have a law about that, administered in the dark, in ways that leave no record. The chalk child closes their hand around the piece of chalk. They had decided what failing looked like too.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_nursery_trap_death',
  },

  {
    id: 'c3_nursery_children_test',
    chapter: 'Chapter 3',
    title: 'Beyond the Nursery',
    location: 'The Nursery of Knives — Far Passage',
    imageKey: 'nursery_of_knives',
    text: `The passage beyond the Nursery opens into a wider tunnel that shows signs of recent Iron Saints activity — boot prints in the accumulated grime, a discarded Saints designation tag, a section of wall where someone used a baton. The Saints have been through here recently. Not stationed — passing through. Which means their patrol route has shifted east. The Hollow Children's children noticed this before you did; the chalk system has new marks over the boot prints, recording the timestamp and direction of travel. You are walking into an active patrol zone.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_move_carefully_patrol',
        text: 'Move carefully and hope the patrol stays east.',
        nextNode: 'c3_saints_patrol_spotted',
      },
      {
        id: 'c3_plan_around_patrol',
        text: 'Find an alternate route around the patrol zone.',
        nextNode: 'c3_cain_tactical_moment',
        effects: { intelligence: 1 },
      },
    ],
  },

  // ── SAINTS PATROL ──────────────────────────────────────────────────────────

  {
    id: 'c3_saints_patrol_spotted',
    chapter: 'Chapter 3',
    title: 'Iron Saints in the Tunnels',
    location: 'The Nursery Passage — Patrol Zone',
    imageKey: 'nursery_of_knives',
    text: `Four Saints. Moving east-to-west on a sweep pattern, three metres between each, weapons ready. Not searching — the Saints don't search when they don't know what they're looking for. They are clearing, which is worse: they log everything in the zone as hostile until proven otherwise. Three children from the Nursery have followed you out of the passage and are now pressed against the wall behind you. The Saints haven't seen them yet. If the Saints sweep completes, they will. This is a decision point. Cain has already moved to the right-side alcove. He is watching the timing.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_protect_children_fight',
        text: '[Roll dice — Strength] Draw the Saints\' attention and create a diversion.',
        nextNode: 'c3_protect_victory',
        diceCheck: {
          stat: 'strength',
          difficulty: 16,
          diceType: 'd20',
          successNode: 'c3_protect_victory',
          failureNode: 'c3_protect_defeat',
          criticalSuccessNode: 'c3_protect_victory',
        },
      },
      {
        id: 'c3_protect_soldier_lead',
        text: '[Exiled Soldier] Coordinate a flanking action using the alcove positions.',
        nextNode: 'c3_protect_victory',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { strength: 1, hollowChildren: 10, setFlags: ['soldier_led_protection'] },
        isHidden: true,
      },
      {
        id: 'c3_ignore_children_hide',
        text: 'Get yourself into the alcove. The children are on their own.',
        nextNode: 'c3_cain_tactical_moment',
        effects: { hollowChildren: -20, miraTrust: -4, cainTrust: -1 },
      },
      {
        id: 'c3_surrender_to_saints',
        text: 'Step forward with hands up. Surrender and hope the Saints ignore the children.',
        nextNode: 'c3_end_saints_overwhelmed',
        effects: { ironSaints: 5, hollowChildren: -15, morale: -5 },
      },
    ],
  },

  {
    id: 'c3_protect_victory',
    chapter: 'Chapter 3',
    title: 'The Children Run',
    location: 'The Nursery Passage — Patrol Zone',
    imageKey: 'nursery_of_knives',
    text: `The diversion works. The Saints redirect toward you and the children use eleven seconds to disappear back into the Nursery passage — you can tell because the Saints stop hearing them within fifteen steps. The confrontation doesn't escalate to the catastrophic; you are in a tunnel with multiple exit points and Saints in a transit sweep don't have the orders to pursue into unknown sub-tunnel systems. They log you in their ledger — marked person, Junction sub-3, non-combatant behaviour — and continue east. The children are safe. The chalk system adds a new patrol time to the wall it can't see from here but which Lio's network will update within the hour.`,
    effectsOnEnter: { hollowChildren: 15, setFlags: ['saints_patrol_repelled'] },
    choices: [
      {
        id: 'c3_after_victory_cain',
        text: 'Find Cain in the alcove and debrief.',
        nextNode: 'c3_cain_tactical_moment',
      },
    ],
  },

  {
    id: 'c3_protect_defeat',
    chapter: 'Chapter 3',
    title: 'Overwhelmed',
    location: 'The Nursery Passage — Patrol Zone',
    imageKey: 'nursery_of_knives',
    text: `Four Saints against one marked person is not an evenly matched engagement. You buy the children six seconds — enough for two of them to run. The third is too small and too slow. The Saints are not cruel to the child; they log them as recovered contact and assign a temporary holding protocol that means a Saints care facility and a registration and no more Nursery of Knives. You are in the logs as Category Escalated. The tunnel network behind you is now actively monitored. Mira pulls you away from the Saints' perimeter. The child they took watches over a Saint's shoulder as you leave. That child will be alright, probably. That thought is doing most of the work right now.`,
    effectsOnEnter: { health: -20, hollowChildren: -10, morale: -3 },
    choices: [
      {
        id: 'c3_retreat_after_defeat',
        text: 'Fall back to the Rat King\'s approach.',
        nextNode: 'c3_cain_tactical_moment',
      },
      {
        id: 'c3_pursue_after_defeat',
        text: 'Try to follow the Saints and recover the child.',
        nextNode: 'c3_end_saints_overwhelmed',
        effects: { health: -20, miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c3_end_saints_overwhelmed',
    chapter: 'Chapter 3',
    title: 'Registered at Last',
    location: 'Iron Saints — Tunnel Custody',
    imageKey: 'iron_saints_checkpoint',
    text: `The Saints' second patrol arrives six minutes after the first files its report. Category Escalated plus marked person plus active tunnel presence equals a response level that doesn't leave room for misunderstanding. They are professional about it. The mark is documented in three separate registers simultaneously. Mira is listed as civilian accompaniment — a designation that protects her and costs her nothing except the next several months. Cain disappears during the custody process because Cain always disappears during custody processes; that is a skill that defines the Shadow Broker class. You are Category One, Tunnel Division, registered at last. The city keeps burning. The Saints call it progress.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_saints_overwhelmed',
  },

  // ── CAIN TACTICAL MOMENT ───────────────────────────────────────────────────

  {
    id: 'c3_cain_tactical_moment',
    chapter: 'Chapter 3',
    title: 'Cain\'s Calculation',
    location: 'Sub-Level Passage — Alcove Junction',
    imageKey: 'collapsed_tunnel',
    text: `Cain is already in the alcove when you arrive, or if you find him, he is exactly where the tactical geometry suggested he would be. He doesn't say anything immediately. He is running a count in his head — his eyes move to the three exits, the ceiling, the estimated patrol interval. Then he says: "The Rat King's gate has a shift change at what passes for 0300 in tunnel time. Two guards become one for eleven minutes. The gate's physical lock requires two keys, but the sliding mechanism can be worked from the eastern channel if you know the mechanical sequence." He pauses. "I know the mechanical sequence."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_take_cain_intel',
        text: '"Then we time the gate approach for the shift change. Good work."',
        nextNode: 'c3_cain_respect_gained',
        effects: { cainTrust: 2, intelligence: 1 },
      },
      {
        id: 'c3_question_cain_intel',
        text: '"How do you know the mechanical sequence for the Rat King\'s gate?"',
        nextNode: 'c3_cain_respect_gained',
        effects: { cainTrust: 1, intelligence: 2 },
      },
      {
        id: 'c3_ignore_cain_intel',
        text: '"I\'ll handle the Rat King my own way."',
        nextNode: 'c3_rat_king_arrive',
        effects: { cainTrust: -2 },
      },
    ],
  },

  {
    id: 'c3_cain_respect_gained',
    chapter: 'Chapter 3',
    title: 'The Accounting',
    location: 'Sub-Level Passage — Alcove Junction',
    imageKey: 'collapsed_tunnel',
    text: `Cain nods with the precision of someone whose acknowledgment is not a social formality but a recalculation. "The shift change happens in ninety minutes," he says. "The eastern channel approach requires wading twenty metres of shallow water. The Rat King's guards are not Saints — they're his people, which means their loyalty is economic, not ideological. If you can make the economics clear, the gate becomes easier." He is, you understand, giving you a genuine strategic advantage. Cain gives strategic advantages to the person he is betting on. You are, at this moment, that person. Cain's respect is the most expensive currency in this tunnel network.`,
    effectsOnEnter: { cainTrust: 2, setFlags: ['cain_respect_earned_ch3'] },
    choices: [
      {
        id: 'c3_head_to_rat_king',
        text: 'Approach the Rat King\'s gate with Cain\'s information.',
        nextNode: 'c3_rat_king_arrive',
        effects: { intelligence: 1 },
      },
    ],
  },

  // ── RAT KING ───────────────────────────────────────────────────────────────

  {
    id: 'c3_rat_king_arrive',
    chapter: 'Chapter 3',
    title: 'The Rat King\'s Toll Gate',
    location: 'The Rat King\'s Toll Gate — Entry',
    imageKey: 'rat_king_gate',
    text: `The gate is a fortified tunnel junction: welded steel doors, two guards with the specific look of people who are comfortable with violence as a professional tool. The Rat King is not present — his name is a title, not a description, though the person who holds it has been holding it for three years and the details are instructive. A large man who was a tunnel maintenance foreman before the Blackout and who pivoted his workforce into a transit control operation with the methodical competence that suggests the personality type hasn't changed, just the product. The guards relay your presence. You wait. The gate slides open.`,
    effectsOnEnter: { thirst: -1 },
    choices: [
      {
        id: 'c3_wait_for_rat_king',
        text: 'Wait for the Rat King to appear.',
        nextNode: 'c3_rat_king_demand',
      },
      {
        id: 'c3_cain_shift_approach',
        text: 'Use Cain\'s timing information. Wait for the shift change and approach the eastern channel.',
        nextNode: 'c3_rat_king_demand',
        requirements: { flags: ['cain_respect_earned_ch3'] },
        effects: { intelligence: 1, cainTrust: 1 },
      },
    ],
  },

  {
    id: 'c3_rat_king_demand',
    chapter: 'Chapter 3',
    title: 'The Toll',
    location: 'The Rat King\'s Toll Gate — Office',
    imageKey: 'rat_king_gate',
    text: `The Rat King is a compact man with the hands of someone who spent years in confined spaces and the eyes of someone who never stopped counting. His office is a converted signals room: every wall covered in transaction records. He looks at your mark the way people in this tunnel network look at everything — as a variable in an equation. "Passage east costs ten units of food, five water, and one medicine. Or equivalent scrap value. Or a service, if the service is worth the math." He places a ledger on the table with the ease of someone who has had this conversation ten thousand times. "The mark is noted. Mother Chalk's chalk on your jacket is noted. None of that changes the toll."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_pay_full_toll',
        text: 'Pay the full toll.',
        nextNode: 'c3_pay_toll_path',
        requirements: { food: 10, water: 5, medicine: 1 },
        effects: { food: -10, water: -5, medicine: -1 },
      },
      {
        id: 'c3_negotiate_toll',
        text: 'Negotiate. Offer information instead of goods.',
        nextNode: 'c3_refuse_toll',
        effects: { charisma: 1 },
      },
      {
        id: 'c3_bluff_the_toll',
        text: '[Roll dice — Charisma] Convince him the mark\'s value makes you a long-term asset.',
        nextNode: 'c3_bluff_success',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c3_bluff_success',
          failureNode: 'c3_bluff_fail',
        },
      },
      {
        id: 'c3_broker_deal',
        text: '[Shadow Broker] "I know your debts. I know who you owe and what the interest is. Let\'s trade differently."',
        nextNode: 'c3_bluff_success',
        requirements: { classes: ['shadow_broker'] },
        effects: { cainTrust: 2, glassCourt: 5, setFlags: ['broker_rat_king_deal'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c3_pay_toll_path',
    chapter: 'Chapter 3',
    title: 'Paid Passage',
    location: 'The Rat King\'s Toll Gate — Cleared',
    imageKey: 'rat_king_gate',
    text: `The Rat King records the transaction with the same formality as the child with the ledger in the Candle Market — the Hollow Children learned the practice from him, probably. The gate opens. "Next section is the Hidden Clinic — not officially mine, but it operates under my zone. If you need it, the woman there will negotiate." He returns to his records. The gate is already closing behind you. Whatever you paid, you paid it for access to the relic engine and the door beyond. The hunger comes back as soon as you're through.`,
    effectsOnEnter: { setFlags: ['rat_king_paid'] },
    choices: [
      {
        id: 'c3_to_hidden_clinic',
        text: 'Head to the Hidden Clinic.',
        nextNode: 'c3_hidden_clinic_arrive',
      },
    ],
  },

  {
    id: 'c3_refuse_toll',
    chapter: 'Chapter 3',
    title: 'Counter-Offer',
    location: 'The Rat King\'s Toll Gate — Office',
    imageKey: 'rat_king_gate',
    text: `The Rat King listens to your offer with the patience of someone who has three weeks of ledger entries proving this conversation doesn't end in his favour when the other person holds all the supply. He says: "Information depreciates. Goods don't." He slides the ledger forward again. "Full toll, or partial toll plus two days of work in the gate section. Or you leave." The third option, his expression implies, is the easiest one for him to process. The guards have not moved.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_work_toll',
        text: 'Accept partial toll plus two days work.',
        nextNode: 'c3_pay_toll_path',
        effects: { food: -5, water: -2, morale: -2, scrap: 5 },
      },
      {
        id: 'c3_surrender_everything',
        text: 'Give everything you have. Pay whatever it costs.',
        nextNode: 'c3_end_paid_passage',
        effects: { food: -8, water: -4, medicine: -2, scrap: -5, morale: -4 },
      },
      {
        id: 'c3_bluff_from_refusal',
        text: '[Roll dice — Charisma] Make a final case for a different deal structure.',
        nextNode: 'c3_bluff_success',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c3_bluff_success',
          failureNode: 'c3_bluff_fail',
        },
      },
    ],
  },

  {
    id: 'c3_bluff_success',
    chapter: 'Chapter 3',
    title: 'The Value Argument',
    location: 'The Rat King\'s Toll Gate — Office',
    imageKey: 'rat_king_gate',
    text: `He thinks about it for a long time. Longer than you expected. The mark on your wrist does something useful for once: it pulses visibly, which tells the Rat King that the thing he's looking at is real and not theater. "Three weeks of current market price for marked-person access is more than the toll," he says, doing arithmetic in his head at speed. "You'll owe me a service. Unspecified, to be called in within the next two transit cycles. Ledger entry, witnessed." He pulls out the ledger. "This is the only negotiation you get. Say yes or leave."`,
    effectsOnEnter: { setFlags: ['rat_king_bluffed'] },
    choices: [
      {
        id: 'c3_accept_bluff_deal',
        text: '"Yes."',
        nextNode: 'c3_hidden_clinic_arrive',
        effects: { charisma: 1, hollowChildren: 3 },
      },
    ],
  },

  {
    id: 'c3_bluff_fail',
    chapter: 'Chapter 3',
    title: 'The Ledger Doesn\'t Negotiate',
    location: 'The Rat King\'s Toll Gate — Office',
    imageKey: 'rat_king_gate',
    text: `The Rat King listens and remains unmoved, which is not stubbornness — it's a business decision. Your argument doesn't hold because the ledger holds better. He says: "You have two choices. Pay or leave. I'll add a third for free: people who continue to occupy my time without transacting get logged as obstruction, which has a cost of its own." The guards have moved slightly closer.`,
    effectsOnEnter: { morale: -2 },
    choices: [
      {
        id: 'c3_bluff_fail_pay',
        text: 'Pay whatever you have.',
        nextNode: 'c3_pay_toll_path',
        effects: { food: -6, water: -3, medicine: -1 },
      },
      {
        id: 'c3_bluff_fail_refuse',
        text: 'Refuse to pay and refuse to leave.',
        nextNode: 'c3_end_rat_king_enslaved',
        effects: { morale: -3 },
      },
    ],
  },

  {
    id: 'c3_end_paid_passage',
    chapter: 'Chapter 3',
    title: 'Tollpaid',
    location: 'The Rat King\'s Toll Gate — Cleared',
    imageKey: 'rat_king_gate',
    text: `You pay everything. The ledger records it with the same neutral precision it uses for every transaction. You are through the gate with nothing left to give to anyone and nothing left to bargain with. The mark is still on your wrist. The tunnel ahead is still dark. Mira walks beside you with her hands empty and her face composed into the expression she uses when there is no good option and she is choosing not to make it worse by naming it. Cain is already ten paces ahead. The city will ask more of you eventually. Right now you are through the gate and you are alive and those two facts are doing all the weight-bearing they can.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch3_paid_passage',
  },

  {
    id: 'c3_end_rat_king_enslaved',
    chapter: 'Chapter 3',
    title: 'Commodity',
    location: 'The Rat King\'s Toll Gate — Work Registry',
    imageKey: 'rat_king_gate',
    text: `The Rat King's third option is the ledger's most efficient: obstruction with a marked asset resolves into indentured transit labour, which his workforce has needed since two of his crew left for the Glass Court three weeks ago. The arrangement is entirely legal by tunnel standard — you signed the intake form, technically, when you entered the gate zone and were given the entry slip. The slip is a contract. Three months of gate work to clear the obstruction debt plus the toll. Mira negotiates it down to six weeks in an argument that earns the Rat King's genuine respect. Six weeks in the gate zone. The engine room is on the other side. The door without a handle is further still. The mark pulses and waits.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_rat_king_enslaved',
  },

  // ── HIDDEN CLINIC ──────────────────────────────────────────────────────────

  {
    id: 'c3_hidden_clinic_arrive',
    chapter: 'Chapter 3',
    title: 'The Hidden Clinic',
    location: 'The Hidden Clinic — Anteroom',
    imageKey: 'hidden_clinic',
    text: `The clinic is a converted maintenance bay run by a woman named Vel who was a field nurse in a city that no longer exists. The space is clean in the way that people who know about infection make things clean. Organised. Mira looks around the space with the expression she uses when she encounters competence. Vel treats three patients before she sees you — a child with an infected foot, a tunnel worker with a cut that needs closing, a person who just needs water and to sit. Then she looks at Mira and her expression changes. "When did she last sleep?" she asks, addressing you. "When did she last eat enough?"`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_clinic_acknowledge_mira',
        text: '"I don\'t know. We\'ve been moving."',
        nextNode: 'c3_clinic_mira_crisis',
        effects: { miraTrust: -1 },
      },
      {
        id: 'c3_clinic_defend_record',
        text: '"She\'s fine. She\'s managed."',
        nextNode: 'c3_clinic_mira_crisis',
        effects: { miraTrust: -2 },
      },
      {
        id: 'c3_clinic_honest',
        text: '"Not well enough. I didn\'t realise how bad it was getting."',
        nextNode: 'c3_clinic_mira_crisis',
        effects: { miraTrust: 3 },
      },
    ],
  },

  {
    id: 'c3_clinic_mira_crisis',
    chapter: 'Chapter 3',
    title: 'Near the Edge',
    location: 'The Hidden Clinic — Treatment Bay',
    imageKey: 'hidden_clinic',
    text: `Vel's examination is brief and precise. She describes what she finds with the clinical detachment of someone who has learned that emotion doesn't help the patient. Mira is dehydrated to a clinically relevant degree, undernourished to a point where her body is actively cannibalising muscle tissue, and showing elevated stress markers that correlate with three days of insufficient sleep. None of these are emergencies yet. All of them become emergencies if the trajectory continues. Vel looks at you and says: "She needs two days of rest, calories, and water. She won't ask for it herself." She is right. Mira is already reaching for her pack to continue moving.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_treat_mira_properly',
        text: 'Insist Mira rests. Give Vel whatever supplies are needed.',
        nextNode: 'c3_clinic_treat_mira',
        effects: { food: -3, water: -2, medicine: -1, miraTrust: 5 },
      },
      {
        id: 'c3_medic_treat_mira',
        text: '[Medic / Underground Medic] Assist Vel directly. You have the training.',
        nextNode: 'c3_clinic_treat_mira',
        requirements: { classes: ['medic'], backgrounds: ['underground_medic'] },
        effects: { medicine: -1, miraTrust: 6, intelligence: 1, hollowChildren: 3 },
        isHidden: true,
      },
      {
        id: 'c3_cant_stop_now',
        text: '"We don\'t have two days. She\'ll manage."',
        nextNode: 'c3_clinic_abandon_mira',
        effects: { miraTrust: -5, morale: -2 },
      },
    ],
  },

  {
    id: 'c3_clinic_treat_mira',
    chapter: 'Chapter 3',
    title: 'What It Costs to Stop',
    location: 'The Hidden Clinic — Rest Bay',
    imageKey: 'hidden_clinic',
    text: `Two days. Vel works. You give what you have and Vel makes it stretch with the economy of someone who has been doing this with not enough for a long time. Mira sleeps for sixteen hours the first day — properly, not the threshold sleep you travel on — and wakes up on the second day different in the specific way that rest makes people different. She doesn't say thank you again. She says: "I didn't realise." Three words. From Mira, that's a chapter. The mark on your wrist is quiet for the first time since the descent. Even it seems to understand that some things require stopping.`,
    effectsOnEnter: { setFlags: ['mira_clinic_survived'] },
    choices: [
      {
        id: 'c3_leave_clinic_rested',
        text: 'Leave the clinic and head to the Relic Engine Room.',
        nextNode: 'c3_relic_engine_room_arrive',
        effects: { health: 15, morale: 3, miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c3_clinic_abandon_mira',
    chapter: 'Chapter 3',
    title: 'The Trajectory Continues',
    location: 'The Hidden Clinic — Anteroom',
    imageKey: 'hidden_clinic',
    text: `Mira picks up her pack. She says: "Alright." Two words. Flat as a written record. Vel watches you both leave with the expression she uses when she knows the outcome and cannot change it. The tunnel after the clinic is dark and the chemistry of the air is close and Mira walks three steps behind you for the first time in a long time. Not staying back — the distance is a positioning. She is deciding something. The mark on your wrist pulses and this time the pulse feels like a question rather than a statement.`,
    effectsOnEnter: { miraTrust: -3 },
    choices: [
      {
        id: 'c3_push_to_engine',
        text: 'Push to the Relic Engine Room.',
        nextNode: 'c3_relic_engine_room_arrive',
      },
      {
        id: 'c3_stop_and_reconsider',
        text: 'Stop. This is wrong. Go back to the clinic.',
        nextNode: 'c3_clinic_treat_mira',
        effects: { miraTrust: 3, morale: -1 },
      },
      {
        id: 'c3_mira_collapses',
        text: 'Mira collapses before you reach the engine room.',
        nextNode: 'c3_end_mira_neglected',
        effects: { miraTrust: -5 },
      },
    ],
  },

  {
    id: 'c3_end_mira_neglected',
    chapter: 'Chapter 3',
    title: 'What You Chose Not to Carry',
    location: 'The Hidden Clinic — Tunnel Beyond',
    imageKey: 'hidden_clinic',
    text: `She goes down between one step and the next — not a fall, exactly, a lowering, her body making the decision her mind kept postponing. Vel is there within ninety seconds; the clinic is not far and Vel has been watching for this. The treatment takes four hours and the prognosis is good, medically — bodies can recover from this kind of depletion if caught before the critical threshold. Mira recovers. She also reassesses. The reassessment takes two days and at the end of it she tells you, very clearly and without emotion, that she is travelling alone from this point. She will find her own route to whatever comes next. You will find yours. The mark pulses. The engine room is still ahead. Some things you carry. Some things put themselves down.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_mira_neglected_ch3',
  },

  // ── RELIC ENGINE ROOM ──────────────────────────────────────────────────────

  {
    id: 'c3_relic_engine_room_arrive',
    chapter: 'Chapter 3',
    title: 'The Relic Engine Room',
    location: 'The Relic Engine Room — Entry',
    imageKey: 'relic_engine_room',
    text: `The door is pre-collapse industrial and opens when the mark on your wrist comes within half a metre of the plate beside it — not when you touch the plate, but when you approach it. The room beyond is the size of a metro station and twice as tall. Something occupies the centre: a structure that is not a machine in any category you were taught, assembled from components that predate the metro system and components that don't exist in any catalogue. It is running. You can tell by the light — not visible light, but a warmth that has colour in your peripheral vision. The mark on your wrist is burning. Not painfully. Insistently. The engine is broadcasting. You are receiving. Patch was right about the frequency.`,
    effectsOnEnter: { corruption: 5, lastArchive: 10, setFlags: ['relic_engine_found'] },
    choices: [
      {
        id: 'c3_approach_engine',
        text: 'Approach the engine.',
        nextNode: 'c3_relic_pulse_choice',
        effects: { corruption: 3 },
      },
      {
        id: 'c3_esper_engine',
        text: '[Esper] Open yourself to the broadcast. Don\'t filter — receive it directly.',
        nextNode: 'c3_relic_pulse_choice',
        requirements: { classes: ['esper'] },
        effects: { corruption: 8, intelligence: 3, lastArchive: 15, setFlags: ['esper_engine_communion'] },
        isHidden: true,
      },
      {
        id: 'c3_study_engine_first',
        text: 'Study the structure before letting the mark interact.',
        nextNode: 'c3_relic_pulse_choice',
        effects: { intelligence: 2, lastArchive: 5 },
      },
    ],
  },

  {
    id: 'c3_relic_pulse_choice',
    chapter: 'Chapter 3',
    title: 'The Signal',
    location: 'The Relic Engine Room — Centre',
    imageKey: 'relic_engine_room',
    text: `At two metres from the engine, the mark on your wrist stops being a pulse and becomes something else — a channel. Something is using it to transmit and you are the receiver. The content is not language. It is intention. Structure. A pre-collapse system that was designed to wait for exactly this interaction, with exactly this type of mark, in exactly this type of desperation. It is asking you to make a decision. The mark can bridge to the engine fully — open, complete, no filter. Or you can close the connection. Either choice will change what comes next. Mira, if she is still with you, has taken two steps back and is watching your face. Cain has not moved.`,
    effectsOnEnter: { corruption: 5 },
    choices: [
      {
        id: 'c3_embrace_signal',
        text: 'Open fully. Let the bridge complete. Give the engine what it needs.',
        nextNode: 'c3_end_corruption_engine',
        effects: { corruption: 20 },
      },
      {
        id: 'c3_resist_signal',
        text: 'Close the connection. Resist the pull.',
        nextNode: 'c3_resist_signal_node',
        effects: { corruption: -5, morale: 2 },
      },
      {
        id: 'c3_controlled_bridge',
        text: 'Partial bridge — take what information comes through and close before it takes hold.',
        nextNode: 'c3_resist_signal_node',
        effects: { corruption: 5, intelligence: 3, lastArchive: 20, setFlags: ['engine_partial_bridge'] },
      },
    ],
  },

  {
    id: 'c3_end_corruption_engine',
    chapter: 'Chapter 3',
    title: 'Engine Without a Ghost',
    location: 'The Relic Engine Room — Fully Bridged',
    imageKey: 'relic_engine_room',
    text: `The bridge completes. The engine has been waiting for this for three years — for a marked person willing to open the channel without reservation. The information it passes through is extensive and structural and important. You receive all of it. The problem is the receiving. The mark was not designed as a passive receiver; it was designed as a conduit, and a conduit that opens fully becomes the thing it conducts. You are still yourself in the first minute. In the second, the word "yourself" starts to compress. By the end of the third minute, the engine has what it needed and the channel is still open and the person on this end of the channel is doing something that isn't quite either of the things it was doing before. The mark glows and doesn't dim. Mira calls your name three times. The engine answers. This is not what the engine was waiting for. This is what it settles for.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch3_corruption_engine',
  },

  {
    id: 'c3_resist_signal_node',
    chapter: 'Chapter 3',
    title: 'The Withdrawal',
    location: 'The Relic Engine Room — Disconnected',
    imageKey: 'relic_engine_room',
    text: `The disconnection is not painless but it is possible. The mark cools. The engine's broadcast narrows but doesn't stop — it is still running, still waiting, but you are no longer the direct receiver. What passed through in the partial bridge is useful: coordinates, encoded in a format that matches the Last Archive door symbols, pointing to something deeper than the sub-level system. The archive beneath the archive. The engine was installed by the people who built the chalk map symbols — the same people Patch identified. The engine is pointing you toward the Door Without a Handle. You were going there anyway. Now you know why.`,
    effectsOnEnter: { lastArchive: 20, setFlags: ['relic_engine_resisted'] },
    choices: [
      {
        id: 'c3_use_orphan_secret',
        text: '[Wasteland Orphan] There\'s a maintenance shaft in the east wall. You\'ve seen this design before.',
        nextNode: 'c3_orphan_secret_path',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { luck: 2, setFlags: ['orphan_secret_route_found'] },
        isHidden: true,
      },
      {
        id: 'c3_use_broker_secret',
        text: '[Shadow Broker] The engine room has a second exit — behind the control panel. Cain already found it.',
        nextNode: 'c3_broker_secret_path',
        requirements: { classes: ['shadow_broker'] },
        effects: { cainTrust: 2, setFlags: ['broker_secret_deal_made'] },
        isHidden: true,
      },
      {
        id: 'c3_exit_engine_room',
        text: 'Leave the engine room and find the Door Without a Handle.',
        nextNode: 'c3_door_without_handle',
      },
    ],
  },

  // ── SECRET ROUTES ──────────────────────────────────────────────────────────

  {
    id: 'c3_orphan_secret_path',
    chapter: 'Chapter 3',
    title: 'The Maintenance Shaft',
    location: 'The Relic Engine Room — East Wall',
    imageKey: 'relic_engine_room',
    text: `The shaft is behind a panel that someone sealed years ago with standard maintenance tape — the pre-collapse kind, still sticky, which tells you it was sealed before the Blackout. You know this design because you spent your childhood in spaces that looked exactly like this. The shaft is half a metre wide and drops three metres and then levels into a passage that bypasses two hundred metres of tunnel and opens directly onto the Door Without a Handle. Someone built this passage specifically to reach that door quickly. The shaft is sized for a small person. Or an adult who grew up learning to fit into small spaces. You fit. You always fit. That was never optional.`,
    effectsOnEnter: { luck: 2, lastArchive: 10, setFlags: ['orphan_secret_route_found'] },
    choices: [
      {
        id: 'c3_take_orphan_shaft',
        text: 'Take the maintenance shaft directly to the Door.',
        nextNode: 'c3_door_without_handle',
        effects: { agility: 1 },
      },
    ],
  },

  {
    id: 'c3_broker_secret_path',
    chapter: 'Chapter 3',
    title: 'The Cain Exit',
    location: 'The Relic Engine Room — Control Panel',
    imageKey: 'relic_engine_room',
    text: `"Three months ago," Cain says, lifting the access panel behind the control station, "a Glass Court operative came through here looking for the same engine. She didn't find the bridge mechanism — wrong mark type, or wrong disposition, I'm still not certain which. But she did find this exit." The passage beyond is clean, dry, and lit by a string of chemical glow-strips that someone installed recently. "The Glass Court doesn't know what the exit leads to," Cain continues, moving ahead of you. "I negotiated that information separately." He has, you understand, been managing three separate information streams in this tunnel network simultaneously. The passage leads directly to the Door Without a Handle.`,
    effectsOnEnter: { glassCourt: 5, cainTrust: 3, setFlags: ['broker_secret_deal_made'] },
    choices: [
      {
        id: 'c3_take_broker_passage',
        text: 'Follow Cain through the secret passage.',
        nextNode: 'c3_door_without_handle',
        effects: { intelligence: 1 },
      },
    ],
  },

  // ── THE DOOR WITHOUT A HANDLE ──────────────────────────────────────────────

  {
    id: 'c3_door_without_handle',
    chapter: 'Chapter 3',
    title: 'The Door Without a Handle',
    location: 'The Door Without a Handle — Approach',
    imageKey: 'relic_engine_room',
    text: `The door is exactly what the name says: a door in a wall at the end of the passage, made of something that is not metal and not stone and not any material in the maintenance catalogue, with no handle, no keypad, no apparent mechanism. It has the same surface quality as the Last Archive's primary door. The same symbolic vocabulary in the lower-left corner — slightly different notation, but recognisably the same hand. The mark on your wrist is not pulsing. It is holding. The door is waiting. Not for the mark to work — the mark is already working. For something else. For you to decide whether you are the person who walks through a door like this.`,
    effectsOnEnter: { lastArchive: 10, setFlags: ['door_without_handle_found'] },
    choices: [
      {
        id: 'c3_touch_the_door',
        text: 'Place your marked wrist against the door\'s surface.',
        nextNode: 'c3_door_contemplate',
      },
      {
        id: 'c3_study_door_first',
        text: 'Study the symbols before touching anything.',
        nextNode: 'c3_door_contemplate',
        effects: { intelligence: 2, lastArchive: 5 },
      },
      {
        id: 'c3_turn_away_from_door',
        text: 'Walk away. You are not ready for whatever is on the other side.',
        nextNode: 'c3_end_ch3_wander_alone',
        effects: { morale: -3, corruption: -5 },
      },
    ],
  },

  {
    id: 'c3_door_contemplate',
    chapter: 'Chapter 3',
    title: 'What Waits',
    location: 'The Door Without a Handle — Against the Surface',
    imageKey: 'relic_engine_room',
    text: `The door's surface is warm. Not engine-warm — the specific warmth of something that has been waiting at body temperature for a long time. The symbols in the lower corner glow faint gold as the mark approaches. They are not the same as the engine's frequency. They are older. The mark was designed for the engine. The door was designed for whatever made the mark. The distinction is significant and the implications are extensive and you are standing in a sub-tunnel with wet boots and insufficient food and a decision to make about how much of this weight you can carry forward. Mother Chalk's chalk mark is still on your sleeve. Lio's passage rights are still in effect. The Hollow Children are still above you.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c3_ally_hollow_children',
        text: 'Document everything and return to Mother Chalk. This is too important to face alone.',
        nextNode: 'c3_hollow_children_faction_preview',
        effects: { hollowChildren: 20, setFlags: ['hollow_children_faction_ally'] },
      },
      {
        id: 'c3_continue_through_door',
        text: 'Press forward. The door will open when you\'re ready.',
        nextNode: 'c3_chapter3_end',
        effects: { morale: 2, corruption: 3 },
      },
      {
        id: 'c3_stalemate_choice',
        text: 'You can\'t go through. You can\'t go back. Sit with the door and wait.',
        nextNode: 'c3_end_hollow_stalemate',
      },
    ],
  },

  // ── FACTION ENDING PREVIEW ─────────────────────────────────────────────────

  {
    id: 'c3_hollow_children_faction_preview',
    chapter: 'Chapter 3',
    title: 'The Children\'s War Council',
    location: 'The Chalk Map Wall — Inner Chamber',
    imageKey: 'chalk_map_wall',
    text: `Mother Chalk listens to your full account without interruption. When you finish, she is quiet for a long time. Longer than usual. Lio is in the corner, running his knife across the whetstone in the rhythm she recognises as his thinking rhythm. Then she says: "The Door Without a Handle has been there since before we arrived. The engine has been running since before we arrived. Two hundred children have been living three levels above something that was designed for a person with a wrist mark, and nobody sent us that person for two years." She stands up. "The Hollow Children are in. What do you need?" This is what a faction looks like when it decides. Not a meeting — a declaration. The chalk map on the wall gains a new marking in the lower right corner: the symbol for alliance.`,
    effectsOnEnter: { hollowChildren: 25, setFlags: ['hollow_children_faction_ally'] },
    choices: [
      {
        id: 'c3_accept_hollow_alliance',
        text: 'Accept the Hollow Children\'s full alliance.',
        nextNode: 'c3_chapter3_end',
        effects: { hollowChildren: 10, morale: 5, setFlags: ['chapter3_hollow_allied'] },
      },
    ],
  },

  // ── NEUTRAL ENDINGS ────────────────────────────────────────────────────────

  {
    id: 'c3_end_hollow_stalemate',
    chapter: 'Chapter 3',
    title: 'Not Wanted Here',
    location: 'The Door Without a Handle — Stalemate',
    imageKey: 'relic_engine_room',
    text: `You sit. The door waits. An hour passes, or two — time in the sub-levels is a different unit. Lio finds you eventually and sits against the wall opposite with the patience of someone who has learned not to push what isn't ready. He doesn't speak. The mark is quiet. The engine is quiet. The door is the same temperature it has been since you arrived. Mother Chalk sends a runner with food and water and no message. The Hollow Children have a system for people who are stuck at the door — it has happened before, apparently. They keep you fed and they wait with you. When you finally stand up and say you need to go, Lio gives you a chalk mark on your right hand that means something he doesn't explain. "Come back," he says, "when you know what you're walking toward." You leave. The door is still there. It will be there when you come back. If you come back.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_hollow_stalemate_ch3',
  },

  {
    id: 'c3_end_ch3_wander_alone',
    chapter: 'Chapter 3',
    title: 'The Longer Walk',
    location: 'Sub-Level Exit — West Shaft',
    imageKey: 'collapsed_tunnel',
    text: `You leave the way you came in. The shaft, the passage, the narrow section where you went sideways. The Bone Turnstile returns your weapons without ceremony. Lio walks you to the perimeter and stops there. He doesn't ask why you're leaving or when you'll return. The chalk marks on the walls are unchanged, which means the network continues, which means the children continue, which means the choice to walk away did not, on balance, destroy anything except the specific possibility you arrived for. The surface is a long way up. The mark on your wrist is dim and regular. The city above is the same city it was. You are not the same person. Both of those things can be true simultaneously. You keep walking.`,
    effectsOnEnter: {},
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch3_wander_alone',
  },

  // ── CHAPTER 3 CONCLUSION ───────────────────────────────────────────────────

  {
    id: 'c3_chapter3_end',
    chapter: 'Chapter 3',
    title: 'What the Tunnels Gave You',
    location: 'Sub-Level 3 — Forward Passage',
    imageKey: 'collapsed_tunnel',
    text: `The door did not open this time. That is not a failure — it is a deferral. The mark registered with the door's mechanism and the door registered with the mark and whatever handshake they are completing, it is not done yet. Mother Chalk has given you the coordinates of three Hollow Children access points above ground. Patch has given you a schematic that extends the engine's signal range. Lio has given you a chalk pattern that will get you back through the Bone Turnstile without the test. Sera is eating regularly now — you left enough food with the market to see to that for two weeks. The surface is above you. Chapter Four is something the city hasn't told you the name of yet. The mark on your wrist holds steady, patient, waiting for you to be ready for what comes next.`,
    effectsOnEnter: {
      setFlags: ['chapter3_complete'],
      hollowChildren: 5,
      lastArchive: 5,
      morale: 3,
    },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch3_trust_complete',
  },

];
