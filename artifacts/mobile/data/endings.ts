import type { EndingType } from './types';
import { ENABLE_EXPANSION } from '../constants/featureFlags';

export interface EndingDefinition {
  id: string;
  title: string;
  type: EndingType;
  subtitle: string;
  description: string;
  color: string;
  /** Short hint shown on the Route Codex for discovered endings only */
  hint: string;
  /** Which chapter this ending can first be reached in */
  chapter: string;
  /** If true, the ending title/hint is redacted until discovered */
  isSecret?: boolean;
}

export interface EndingCategory {
  id: string;
  label: string;
  description: string;
  types: EndingType[];
  color: string;
  icon: string;
}

// ─── Ending categories ────────────────────────────────────────────────────────

export const ENDING_CATEGORIES: EndingCategory[] = [
  {
    id: 'death',
    label: 'Death Endings',
    description: 'The mark dims. The tunnels wait for everyone.',
    types: ['death'],
    color: '#8e1c1c',
    icon: 'x-circle',
  },
  {
    id: 'bad',
    label: 'Bad Endings',
    description: 'Survival at a cost no one should pay.',
    types: ['betrayal', 'tyrant'],
    color: '#c0392b',
    icon: 'alert-triangle',
  },
  {
    id: 'neutral',
    label: 'Neutral Endings',
    description: 'The world continues. So do you — barely.',
    types: ['wanderer'],
    color: '#7f8c8d',
    icon: 'minus-circle',
  },
  {
    id: 'companion',
    label: 'Companion Endings',
    description: 'Defined by who you chose to protect.',
    types: ['companion', 'sacrifice'],
    color: '#e67e22',
    icon: 'heart',
  },
  {
    id: 'faction',
    label: 'Faction Endings',
    description: 'The banner you fought under shapes the ruins.',
    types: ['faction'],
    color: '#2980b9',
    icon: 'flag',
  },
  {
    id: 'corruption',
    label: 'Corruption Endings',
    description: 'The mark changes you. You stop fighting it.',
    types: ['corruption'],
    color: '#6c3483',
    icon: 'zap',
  },
  {
    id: 'secret',
    label: 'Secret Endings',
    description: 'Hidden paths for those who question everything.',
    types: ['secret'],
    color: '#1abc9c',
    icon: 'eye-off',
  },
  {
    id: 'true',
    label: 'True Ending',
    description: 'The rarest outcome. Some say it is impossible.',
    types: ['savior'],
    color: '#c9a84c',
    icon: 'star',
  },
];

// ─── Endings ──────────────────────────────────────────────────────────────────

export const ENDINGS: EndingDefinition[] = [
  // ── Death Endings ─────────────────────────────────────────────────────────
  {
    id: 'ending_starvation',
    title: 'Dust and Silence',
    type: 'death',
    subtitle: 'Starvation Ending',
    description:
      'The body makes the decision the mind refused. You collapse in the metro corridor, the emergency lights casting you in crimson. The mark dims. The tunnels are patient — they wait for everyone.',
    color: '#8e1c1c',
    hint: 'Let your hunger and thirst fall to zero. The metro is not kind to the careless.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_metro_death',
    title: 'Claimed by the Dark',
    type: 'death',
    subtitle: 'Metro Death Ending',
    description:
      'The metro claims another soul. Your mark dims. The city keeps burning without you.',
    color: '#5a1a1a',
    hint: 'Make the wrong choice in the metro tunnels when your health is already low.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_corruption_death',
    title: 'The Mark Takes All',
    type: 'death',
    subtitle: 'Corruption Threshold Ending',
    description:
      'The corruption does not ask permission. It rewrites. The last thing you see is your own wrist glowing bright enough to blind — then nothing. The signal was sent. The receiver is unknown.',
    color: '#3d0a4a',
    hint: 'Allow your corruption stat to reach its limit without choosing the transformation path.',
    chapter: 'Chapter II',
  },
  {
    id: 'ending_dehydration',
    title: 'Dry Ground',
    type: 'death',
    subtitle: 'Dehydration Ending',
    description:
      'The body is precise about water. Three days without it and the mind goes first — not into darkness but into a kind of terrible lucidity, a brightness that has nothing to do with light. You understand everything in those last minutes. You also cannot move. The mark dims quietly, as if it too has run out of something to give. The tunnels are patient. They wait for everyone.',
    color: '#1a3a4a',
    hint: 'Let your thirst fall to zero and ignore the warnings long enough for your health to give out. The metro has no wells.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_morale_collapse',
    title: 'Nothing Left to Carry',
    type: 'death',
    subtitle: 'Morale Collapse Ending',
    description:
      'The tunnels did not kill you. The Iron Saints did not kill you. The mark did not kill you. You did it one choice at a time — the small decisions, the accumulation of them, the weight of each one stacked on the last. The body stops because the will stopped first. You sit down in the corridor between two stations and do not stand up again. The mark dims so slowly that for a long time afterwards it is hard to say exactly when it went out.',
    color: '#2a1a3a',
    hint: 'Let your morale fall to zero. Push forward without rest, without hope, and without anyone left to carry part of the weight.',
    chapter: 'Chapter I',
  },

  // ── Bad Endings ───────────────────────────────────────────────────────────
  {
    id: 'ending_cain_betrayal',
    title: 'The Oldest Transaction',
    type: 'betrayal',
    subtitle: 'Cain Betrayal Ending',
    description:
      'He does not look away when they take you. The calculation was always in his eyes. Trust is the first casualty of collapse.',
    color: '#1a4a6e',
    hint: 'Travel with Cain but refuse to trust him. Keep secrets. Watch him decide you are worth more as leverage.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_iron_tyrant',
    title: 'The Iron Crown',
    type: 'tyrant',
    subtitle: 'Iron Saints Tyrant Ending',
    description:
      'The Iron Saints kneel before the mark. You did not choose this — you simply stopped saying no. The survivors of the metro rebuild under your command. Some call it order. The children of the hollow tunnels call it by another name.',
    color: '#7d4a00',
    hint: 'Align fully with the Iron Saints and let the mark\'s power go unchecked. Let ambition outweigh mercy.',
    chapter: 'Chapter II',
  },

  // ── Neutral Endings ───────────────────────────────────────────────────────
  {
    id: 'ending_wanderer',
    title: 'The Long Walk',
    type: 'wanderer',
    subtitle: 'Wanderer Ending',
    description:
      'You leave the metro behind. The factions, the relics, the mark — none of it follows you into the open wastes. The city was a wound. You chose to stop picking at it. Somewhere past the rubble, there might be sky.',
    color: '#5d5d5d',
    hint: 'Refuse all faction alliances and companion bonds. Walk away from every ending the story offers you.',
    chapter: 'Chapter II',
  },

  // ── Companion Endings ─────────────────────────────────────────────────────
  {
    id: 'ending_mira_sacrifice',
    title: 'The Weight She Carried',
    type: 'sacrifice',
    subtitle: 'Mira Sacrifice Ending',
    description:
      'She pushes you through the Archive door and holds the threshold as it seals. She always knew. She carried her secret to the door and left it there for you.',
    color: '#7d3c98',
    hint: 'Build deep trust with Mira, then face the Archive door together. Some choices are made before you arrive.',
    chapter: 'Chapter II',
  },
  {
    id: 'ending_together',
    title: 'Both Hands Holding',
    type: 'companion',
    subtitle: 'Companion Bond Ending',
    description:
      'You do not enter the Archive alone. Mira on your left, Cain on your right — the mark burns but the weight is shared. The Last Kingdom fell. What comes next, the three of you build with cracked hands and borrowed time.',
    color: '#e67e22',
    hint: 'Achieve maximum trust with both companions and find a way to keep them both alive until the Archive.',
    chapter: 'Chapter II',
  },

  // ── Faction Endings ───────────────────────────────────────────────────────
  {
    id: 'ending_last_archive',
    title: 'The Archivist',
    type: 'faction',
    subtitle: 'Last Archive Ending',
    description:
      'The records survived. You survived. The Last Archive opens its deepest chamber to you and the knowledge inside it rewrites what the Blackout was. Not a catastrophe — a message. The question is who sent it.',
    color: '#2980b9',
    hint: 'Earn the trust of the Last Archive scholars. Bring them the relic fragments they need. Ask the right questions.',
    chapter: 'Chapter II',
  },

  // ── Corruption Endings ────────────────────────────────────────────────────
  {
    id: 'ending_relic_awakening',
    title: 'Signal Sent',
    type: 'corruption',
    subtitle: 'First Relic Awakening Ending',
    description:
      'The corruption takes you — not as death, but transformation. The mark spreads. You become the signal the machine was always meant to send. The Archive door opens on its own.',
    color: '#2c0a4a',
    hint: 'Collect multiple relics and let the corruption grow without seeking a cure. Embrace what the mark is becoming.',
    chapter: 'Chapter II',
  },

  // ── Secret Endings ─────────────────────────────────────────────────────────
  {
    id: 'ending_thirteenth_signal',
    title: 'The Thirteenth Signal',
    type: 'secret',
    subtitle: 'Hidden Truth Ending',
    description:
      'You find the node beneath the Archive — the one the Last Archive scholars never catalogued. The mark was not a curse or a gift. It was a key. The lock was never the Archive door. It was always you. What opens is not a room. It is a memory. The memory of a kingdom that never fell — because it was never finished being built.',
    color: '#1abc9c',
    hint: 'Investigate every anomaly. Refuse every explanation. Question the mark itself, not just what it opens.',
    chapter: 'Chapter II',
    isSecret: true,
  },

  // ── Chapter 1: Chapter-Specific Endings ──────────────────────────────────
  {
    id: 'ending_buried_tunnel',
    title: 'What the Tunnel Keeps',
    type: 'death',
    subtitle: 'Tunnel Collapse Ending',
    description:
      'The ceiling comes down in a single breath. Rock and twisted steel and perfect darkness, all at once. The mark blazes white-hot for three seconds — as if it\'s trying to signal somewhere, or say goodbye to something that was listening. Then the weight presses out all light, all sound, all the things you were going to do next. The tunnels keep everything they take. They\'ve kept much more than you.',
    color: '#2a1a1a',
    hint: 'Choose the wrong path in the unstable tunnel sections when the collapse warning has already been triggered. The metro has no structural engineers left.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_mira_abandoned',
    title: 'The Specific Weight',
    type: 'death',
    subtitle: 'Companion Abandonment — Sealed Room Ending',
    description:
      'You hear the sounds through the sealed door and understand, too late, what it costs to hesitate. By the time you find another way through, the maintenance room is quiet in the way rooms get quiet after. Her medical bag is on the floor. You leave carrying the specific weight of a choice that has no undoing.',
    color: '#1a0e1a',
    hint: 'Leave Mira behind in a sealed section and take too long finding the alternate route. Some things cannot be undone by arriving.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_cain_dies_alone',
    title: 'The Map He Left',
    type: 'companion',
    subtitle: 'Companion Sacrifice — Solo Ending',
    description:
      'You don\'t go back. When you pass the security room door on your way to the Archive, the chain lock is open. Inside: a bedroll, empty blister packs, and a map left on the table with your name written at the top in careful block letters. He was thinking of someone else at the end. That\'s the part you\'ll carry.',
    color: '#0e1a2a',
    hint: 'Leave Cain wounded in the metro security room and refuse to spend medicine on him. The math he does with his remaining supplies has only one answer.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_saints_surface_execution',
    title: 'Sinner Protocol',
    type: 'death',
    subtitle: 'Iron Saints Inquisition Ending',
    description:
      'They don\'t waste ammunition on active manifestations — Inquisition protocol is more deliberate than that. The last thing you see is the mark dim on your wrist, as if whatever gave it to you has already moved on to find the next candidate. The city keeps burning above. The Archive stays sealed another day.',
    color: '#1a0808',
    hint: 'Reach the city surface with an active mark and no cover story during an Iron Saints patrol window. The wand operator is never more than twelve meters away.',
    chapter: 'Chapter I',
  },
  {
    id: 'ending_ash_suffocation',
    title: 'Ash and Quiet',
    type: 'death',
    subtitle: 'Surface Exposure Ending',
    description:
      'The ash fills your chest before the pain does. You spend the time thinking about the Archive door, the mark, the thing you were supposed to reach. The particular cruelty of dying in the open after surviving everything underground. The city above doesn\'t register your absence. It breathes its ash and keeps being ruined.',
    color: '#1a1a14',
    hint: 'Reach the surface without an air filter or sufficient health. Three minutes is not always enough time to get back underground.',
    chapter: 'Chapter I',
  },

  // ── Chapter 2: Chapter-Specific Endings ──────────────────────────────────
  {
    id: 'c2_ending_dehydration',
    title: 'The Simplest Killer',
    type: 'death',
    subtitle: 'Surface Dehydration Ending',
    description:
      'It takes longer than you expect and shorter than you hope. The mark dims in stages — not dramatically, just gradually, the way a signal loses quality when the receiver moves too far from the source. Three days on the surface without enough water is a physiological fact that no amount of will or mark-power changes. The city above doesn\'t require a weapon to kill you. It just requires patience.',
    color: '#1a3a4a',
    hint: 'Push through District 4 with your thirst already critical and no water supply. The surface offers no wells.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_saints_executed',
    title: 'Sinner Protocol — District 4',
    type: 'death',
    subtitle: 'Iron Saints Surface Execution Ending',
    description:
      'The wand finds the mark at twelve meters. The Inquisitor arrives in under two minutes. They are professional and methodical and they have done this before — the phrasing of the charges is practiced, the paperwork prepared before they reach you. The Inquisition does not hesitate at a mark this active.',
    color: '#200808',
    hint: 'Let the mark flare visibly at a Saints checkpoint in District 4. The wand operator\'s range is farther than it looks.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_glass_vivisected',
    title: 'Instrument Failure',
    type: 'death',
    subtitle: 'Glass Court Research Ending',
    description:
      'The mark and the instrument cannot contain each other at the same time. The analyst understands what\'s happening — you can see it in the half-second before her expression goes clinical — but the understanding comes just after the action becomes irreversible. In the final log entry, the analyst notes that the mark continued to transmit for eleven minutes after vital signs ceased. She marks the experiment as Category Two data — extraordinary yield.',
    color: '#0a1a2a',
    hint: 'Submit to the Glass Court\'s extraction instrument with a high-activity mark. The instrument was built for lower saturation levels.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_choir_absorbed',
    title: 'The Signal Finds Its Instrument',
    type: 'corruption',
    subtitle: 'Red Choir Absorption Ending',
    description:
      'What happens in the broadcast chamber is more like tuning — the mark aligns with the Choir\'s frequency completely, the boundary between the signal and the person who carries it becoming a question with no stable answer. The Founder watches and their expression is grief and recognition and something that might be envy. You are still you, technically. The broadcast continues. You continue with it.',
    color: '#2a0808',
    hint: 'Enter the Red Choir\'s broadcast chamber with maximum corruption and accept the Founder\'s invitation fully. The signal has been looking for this instrument.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_market_buried',
    title: 'The Wand Does Not Miss',
    type: 'death',
    subtitle: 'Black Market Raid Ending',
    description:
      'The mark blazes at exactly the wrong moment. The Saints\' wand operator pivots in your direction with the automatic movement of someone who has been trained to move exactly this way. The market empties around you while you stand in the middle of it holding a light you cannot put out. The Saints\' report for District 4-West notes one Category One manifestation neutralized and one underground market disrupted. Both are listed as successful outcomes.',
    color: '#1a0c04',
    hint: 'Let the mark flare during a Saints raid on the black market. The wand operator was already in position.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_mira_dies_checkpoint',
    title: 'Her Name on Noran Street',
    type: 'companion',
    subtitle: 'Mira Lost at Checkpoint Ending',
    description:
      'You run. The soldier\'s hand closes on Mira\'s arm and your body moves toward the exit before your mind has processed what\'s happening. She doesn\'t call for you. Three blocks north, breathing hard, you understand that she made a choice in that moment — she made noise in the wrong direction so you could reach the alley. You carry what she knew about the clinic. You carry it on Noran Street, where she worked for two years before the blackout.',
    color: '#2a1414',
    hint: 'Attempt the checkpoint with Mira when the Saints are on high alert and the exit window is already closing. Some decisions get made for you.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_exile_wanderer',
    title: 'Past the Edge of What Was',
    type: 'wanderer',
    subtitle: 'City Exile Ending',
    description:
      'The city ends at a collapsed highway overpass. Beyond it: open land, ash-dusted, the remnants of a transit corridor leading somewhere the city stopped caring about before the blackout. You walk into it. The mark pulses with decreasing urgency as the distance from Archive infrastructure grows — not extinguishing, just quieting. The city recedes. You become something the city doesn\'t have a file on.',
    color: '#4a4a3a',
    hint: 'Refuse all faction alliances in District 4 and take the eastern exit before any story flag commits you to the Archive. The city will not chase you.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_saints_enlisted',
    title: 'The Registered Sinner',
    type: 'faction',
    subtitle: 'Iron Saints Voluntary Surrender Ending',
    description:
      'The registration process takes four hours. The Saints\' Inquisition classification for a voluntary surrender with an active mark is Category One Cooperative — rare enough that the registrar looks it up twice. You are given a designation, a wrist band worn over the mark, and assigned to a supervised work detail. You will work within the Saints\' structure, bearing the mark under their observation, until the Archive makes itself relevant again.',
    color: '#2a1a08',
    hint: 'Approach the Iron Saints checkpoint and voluntarily declare the mark before the wand finds it. Category One Cooperative is a classification that exists for a reason.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_glass_data_trade',
    title: 'The Voluntary Subject',
    type: 'faction',
    subtitle: 'Glass Court Research Partnership Ending',
    description:
      'You stay. The arrangement is what the analyst described: medical care, food and water, and the Glass Court\'s full Archive research in exchange for access to the mark and what it transmits. You are Subject Eighteen. The work is interesting, which you hadn\'t expected. Whether this constitutes progress depends on what you think you\'re progressing toward. You are still inside a tower with very controlled access.',
    color: '#081a2a',
    hint: 'Negotiate a voluntary research agreement with the Glass Court analyst before the mark\'s activity exceeds the instrument\'s safe threshold.',
    chapter: 'Chapter II',
  },
  {
    id: 'c2_ending_archive_messenger',
    title: 'The Pre-Collapse Access',
    type: 'secret',
    subtitle: 'Last Archive Secondary Entry Ending',
    description:
      'The coordinates lead to a maintenance access point in a sub-basement of a building that collapsed to everything except the foundation level. The door responds to the mark immediately. Velna\'s last message is written on the wall just inside: "It\'s larger than I expected. I\'m going further." This is the way in that the factions don\'t know about. Whatever it costs, it is the right door.',
    color: '#1a2a1a',
    hint: 'Recover Velna\'s full message trail and the secondary archive coordinates. The entrance the factions don\'t know about only opens to someone the mark already trusts.',
    chapter: 'Chapter II',
    isSecret: true,
  },
  {
    id: 'ending_glass_court_prisoner',
    title: 'Voluntary Extraction',
    type: 'faction',
    subtitle: 'Glass Court Mark Extraction Ending',
    description:
      'They take the mark from you — a process that takes three hours and leaves you intact and empty. Something is different in your wrist afterward. Not painful. Just absent. Like a word you\'ve forgotten how to pronounce. The Archive door stays sealed. The mark, transferred to a Glass Court research subject, dims after forty-eight hours and goes quiet. They never figure out why.',
    color: '#0a1428',
    hint: 'Surrender the mark to the Glass Court extraction team willingly. The Glass Court has been waiting for someone to agree. No one has agreed before.',
    chapter: 'Chapter II',
  },

  // ── Chapter 3: Bad Endings — Death ───────────────────────────────────────
  {
    id: 'ending_market_lynching',
    title: 'The Candle Goes Out',
    type: 'death',
    subtitle: 'Candle Market Ending',
    description:
      'The Hollow Children have a law about adults who steal from them and refuse accountability. The market finds its verdict in the time it takes the last candle to gutter out. The mark dims. The tunnels are patient — they wait for everyone.',
    color: '#8e1c1c',
    hint: 'Get caught stealing from the Candle Market and then refuse to pay the debt. The market always knows.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_platform_drowned',
    title: 'Below the Platform',
    type: 'death',
    subtitle: 'Flooded Platform Ending',
    description:
      'The water at the deep point is darker than the surface implied and further down than the estimate allowed. The mark pulses twice through the cold and then dims. The Hollow Children won\'t come looking. The Rat King on the far side doesn\'t record losses in his ledger.',
    color: '#04080e',
    hint: 'Attempt to cross the Flooded Platform alone without enough strength or preparation. The deep section does not forgive the unprepared.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_nursery_trap_death',
    title: 'What the Children Learned',
    type: 'death',
    subtitle: 'Nursery of Knives Ending',
    description:
      'The Nursery of Knives teaches one lesson above all others. Adults who destroy what children build to keep themselves alive are catalogued differently than people who simply fail the passage. The chalk child closes their hand around the piece of chalk. They had already decided what failing looked like.',
    color: '#0c0808',
    hint: 'Trigger the Nursery traps and then respond with violence against the children\'s mechanisms. The Hollow Children\'s law is administered in the dark.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_saints_overwhelmed',
    title: 'Registered at Last',
    type: 'death',
    subtitle: 'Iron Saints Tunnel Custody Ending',
    description:
      'Category Escalated plus marked person plus active tunnel presence equals a response level that doesn\'t leave room for misunderstanding. The Saints are professional about it. The mark is documented in three separate registers. Cain disappears during the custody process, as Cain always does. You are Category One, Tunnel Division, registered at last.',
    color: '#080c08',
    hint: 'Fight the Iron Saints patrol in the tunnel zone without enough strength, or surrender and let the Saints process you. Four against one is not an evenly matched engagement.',
    chapter: 'Chapter III',
  },

  // ── Chapter 3: Bad Endings — Betrayal ────────────────────────────────────
  {
    id: 'ending_iron_saints_captured_ch3',
    title: 'The Delivered',
    type: 'betrayal',
    subtitle: 'Hollow Children Betrayal Ending',
    description:
      'Warning the children costs you the Saints\' transaction and your freedom. The officer deduces the breach within the hour. The mark is what they were always interested in. You are Category One Priority. The processing cell smells of iron and certainty.',
    color: '#1a4a1a',
    hint: 'Sell the Hollow Children\'s location to the Iron Saints, then try to warn the children before the raid. The Saints are faster than you are.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_rat_king_enslaved',
    title: 'Commodity',
    type: 'betrayal',
    subtitle: 'Rat King Indenture Ending',
    description:
      'Obstruction with a marked asset resolves into indentured transit labour. The arrangement is entirely legal by tunnel standard — you signed the intake form when you entered the gate zone. Three months of gate work. The engine room is on the other side of the gate. The mark pulses and waits.',
    color: '#0c0a06',
    hint: 'Refuse to pay the Rat King\'s toll and also refuse to leave. The ledger has a third option for people who block his time.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_mira_abandoned_ch3',
    title: 'The Weight You Put Down',
    type: 'betrayal',
    subtitle: 'Companion Abandonment Ending',
    description:
      'You reach the far side. Three days later, you have access to the engine room and the information Mother Chalk offered. Cain travels with you. Mira does not. The mark pulses irregularly, which it has never done before. Cain doesn\'t mention her. You don\'t mention her. The city has a law about finished transactions.',
    color: '#1a0e0e',
    hint: 'Let Mira fall into the Flooded Platform\'s deep section and continue to the far side without turning back. The current does what currents do.',
    chapter: 'Chapter III',
  },

  // ── Chapter 3: Bad Endings — Tyrant ──────────────────────────────────────
  {
    id: 'ending_hollow_children_massacred',
    title: 'What Adults Do',
    type: 'tyrant',
    subtitle: 'Hollow Children Betrayal + Massacre Ending',
    description:
      'The raid takes eleven minutes. The Saints are efficient. The Candle Market is extinguished one flame at a time. Sera was in the market when the Saints arrived. She wasn\'t in the list of recovered children. This is what adults do with the trust they are given.',
    color: '#180a0a',
    hint: 'Betray the Hollow Children\'s location to the Iron Saints and then accept the payment. Don\'t warn them. Don\'t turn back.',
    chapter: 'Chapter III',
  },

  // ── Chapter 3: Bad Endings — Companion ───────────────────────────────────
  {
    id: 'ending_mira_neglected_ch3',
    title: 'What You Chose Not to Carry',
    type: 'companion',
    subtitle: 'Companion Neglect Ending',
    description:
      'She goes down between one step and the next. Vel treats her. Mira recovers, medically. She also reassesses. The reassessment takes two days. At the end of it she tells you, clearly and without emotion, that she is travelling alone from this point. Some things put themselves down.',
    color: '#6c3a3a',
    hint: 'Push Mira past her limits without rest or adequate food and water. Refuse the Hidden Clinic\'s two-day treatment. Bodies make decisions minds keep postponing.',
    chapter: 'Chapter III',
  },

  // ── Chapter 3: Bad Endings — Corruption ──────────────────────────────────
  {
    id: 'ending_ch3_corruption_engine',
    title: 'Engine Without a Ghost',
    type: 'corruption',
    subtitle: 'Relic Engine Full Bridge Ending',
    description:
      'The bridge completes. The engine has been waiting three years for a marked person willing to open the channel without reservation. By the end of the third minute, the engine has what it needed and the channel is still open and the person on this end is doing something that isn\'t quite either of the things it was doing before. Mira calls your name three times. The engine answers.',
    color: '#180a3a',
    hint: 'Reach the Relic Engine Room and choose to fully open the mark\'s connection without restriction. The engine was designed for exactly this. So was the outcome.',
    chapter: 'Chapter III',
    isSecret: false,
  },

  // ── Chapter 3: Neutral Endings — Wanderer ────────────────────────────────
  {
    id: 'ending_ch3_paid_passage',
    title: 'Tollpaid',
    type: 'wanderer',
    subtitle: 'Empty Passage Ending',
    description:
      'You pay everything. The ledger records it with neutral precision. You are through the gate with nothing left to give to anyone. Mira walks with her hands empty. Cain is already ten paces ahead. The city will ask more of you. Right now you are through the gate and alive and those two facts are doing all the weight-bearing they can.',
    color: '#2a2a2a',
    hint: 'Give the Rat King literally everything you carry. All food, water, medicine, and scrap. The ledger accepts full payment without mercy.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_hollow_stalemate_ch3',
    title: 'Not Wanted Here',
    type: 'wanderer',
    subtitle: 'Door Without a Handle Stalemate Ending',
    description:
      'You sit with the door. Lio finds you eventually and sits opposite, patient. Mother Chalk sends food and no message. When you finally stand, Lio gives you a chalk mark. "Come back when you know what you\'re walking toward." You leave. The door is still there. It will be there when you come back. If.',
    color: '#3a3a3a',
    hint: 'Reach the Door Without a Handle, touch it, and then choose to wait rather than act. The Hollow Children have a system for people stuck at this door. It has happened before.',
    chapter: 'Chapter III',
  },
  {
    id: 'ending_ch3_wander_alone',
    title: 'The Longer Walk',
    type: 'wanderer',
    subtitle: 'Tunnel Exit Ending',
    description:
      'You leave the way you came. The Bone Turnstile returns your weapons. Lio walks you to the perimeter. He doesn\'t ask why or when. The chalk marks are unchanged. The children continue. You are not the same person who descended. Both things can be true simultaneously. You keep walking.',
    color: '#4a4a4a',
    hint: 'Reach the Door Without a Handle and choose to walk away from it before attempting entry. Some weights are carried forward. Some are left at the door.',
    chapter: 'Chapter III',
  },

  // ── Chapter 3: Chapter Completion Milestone ───────────────────────────────
  {
    id: 'ending_ch3_trust_complete',
    title: 'What the Tunnels Gave You',
    type: 'faction',
    subtitle: 'Hollow Children Alliance — Chapter III Complete',
    description:
      'The door deferred, not refused. Mother Chalk\'s coordinates, Patch\'s schematic, Lio\'s chalk passage — the Hollow Children gave what they had to give. Sera is eating regularly. The mark holds steady. Chapter Four is something the city hasn\'t told you the name of yet.',
    color: '#1a2a1a',
    hint: 'Earn the Hollow Children\'s full trust, deal with the Rat King, and reach the Door Without a Handle with your companions intact. The tunnels reward those who treat what children build as worth protecting.',
    chapter: 'Chapter III',
  },

  // ── Chapter 4: Death Endings ─────────────────────────────────────────────
  {
    id: 'ending_ch4_malrec_verdict',
    title: 'The Category',
    type: 'death',
    subtitle: 'Brother Malrec\'s Verdict Ending',
    description:
      'He reads from the ledger, which he completed before entering the room. He does everything before entering rooms. "Category One," he says. He does not look up. The Furnace is already warm. The Bellkeeper has not arrived. The chain does not negotiate with what it contains.',
    color: '#2a0808',
    hint: 'Fail to secure Veyra\'s counter-signature and fall into Malrec\'s jurisdiction. The ledger has a form for exactly this situation.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_purification_overburn',
    title: 'What the Chain Takes',
    type: 'death',
    subtitle: 'Purification Overburn Ending',
    description:
      'The priest miscalculates the saturation level. The harmonic frequency climbs past the treatment threshold into the band the Doctrine classifies as total mark integration removal. At ninety-eight seconds, the chain has taken everything it came for, and several things it was not supposed to take. The priest writes the outcome in the ledger. He does not look up.',
    color: '#1a0a1a',
    hint: 'Submit to the Purification Rite with very high corruption. The protocol was written for saturation levels the designer did not survive testing.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_mark_overload',
    title: 'Maximum Amplitude',
    type: 'corruption',
    subtitle: 'Saint Furnace Overload Ending',
    description:
      'The mark transmits at maximum amplitude into the suppression array. What happens when a suppression field receives the thing it was suppressing at full power is neither purification nor medicine. The chains break in sequence. The arc-lamps fail. The mark is gone — not suppressed, but transmitted. You are lighter than you have ever been and emptier than you have ever been and the difference between those two states is the whole of what has happened to you.',
    color: '#0a0a2a',
    hint: 'Use the mark\'s full power against the Saint Furnace\'s harmonic array. The array was not built to receive at maximum amplitude.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_bellkeeper_claimed',
    title: 'Relic-Touched',
    type: 'corruption',
    subtitle: 'Bellkeeper\'s Resonance Loop Ending',
    description:
      'The metro disc and the mark enter a resonance loop the body is not designed to maintain. It completes itself over four hours in the War Shrine while the Bellkeeper rings the bell at intervals that match your breathing. When it ends, the disc is embedded in the mark. The mark has expanded to match something neither of you can name. "The shore," the Bellkeeper says. It is the most beautiful sound you have ever heard. It will be the last sound you understand as a person who had a simple wrist.',
    color: '#1a0a2a',
    hint: 'Take the Bellkeeper\'s metro disc and hold it in the same hand as the mark for too long. The Bellkeeper did not stop you. That should have been information.',
    chapter: 'Chapter IV',
  },

  // ── Chapter 4: Betrayal Endings ───────────────────────────────────────────
  {
    id: 'ending_ch4_mira_sold',
    title: 'The Delivered Archive Agent',
    type: 'betrayal',
    subtitle: 'Mira Betrayal Ending',
    description:
      'Mira is assigned to the Eastern Archive suppression detail. Her Last Archive knowledge is more valuable than her freedom, and Veyra has made the appropriate calculation. Three days later, the mark pulses once, east, toward whatever archive door Mira is now being used to locate. The mark has not forgiven you. You are not sure you have either.',
    color: '#1a0e2a',
    hint: 'Give Mira\'s name and location to Saint Veyra in exchange for provisional asset status. The Saints are efficient with what they are given.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_cain_defect',
    title: 'Unit Six Returns',
    type: 'betrayal',
    subtitle: 'Cain Defection Ending',
    description:
      'He signs the re-enlistment form with the same deliberateness he applies to everything. His hand on your shoulder is the hand of someone who has made every part of this decision. "I told them where to find you. I\'m sorry about that. I\'m not sorry about what I got for it." The Iron Saints\' retrieval team is efficient. They have had practice.',
    color: '#0e1a2a',
    hint: 'Push Cain toward re-enlisting with the Iron Saints and accept his offer to use it as cover. Trust the calculation. See how it resolves.',
    chapter: 'Chapter IV',
  },

  // ── Chapter 4: Neutral Endings ────────────────────────────────────────────
  {
    id: 'ending_ch4_chains_forever',
    title: 'Registered',
    type: 'wanderer',
    subtitle: 'Long-Term Containment Ending',
    description:
      'Category One Processing item, assigned to long-term containment pending the review committee\'s determination. The committee meets quarterly. The carts are cold in the way that long-term cold is cold: not a shock, just a fact, the same fact every morning. Ashen Toma is two carts over. You decide not to tell him. You are in the system. The system is very patient.',
    color: '#1a1a1a',
    hint: 'Fail to negotiate with Veyra and lose the chain law challenge. Surrender rather than transmit the mark. The Saints\' containment is comprehensive.',
    chapter: 'Chapter IV',
  },

  // ── Chapter 4: Faction Endings ────────────────────────────────────────────
  {
    id: 'ending_ch4_iron_saint',
    title: 'The Iron Saint',
    type: 'faction',
    subtitle: 'Iron Saints Full Integration Ending',
    description:
      'Your registration number is in the ledger. Your first assignment is mark-suppression support on the Eastern Archive approach. Veyra shakes your hand. "The chain holds those who hold each other." The mark on your wrist has not quieted. The mark is patient. You are an Iron Saint now, and the mark is patient.',
    color: '#2a1a06',
    hint: 'Sign the integration form in the Confession Hall and accept full chain-certification. The Iron Saints have a form for every outcome.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_infiltrated',
    title: 'Deep Cover',
    type: 'faction',
    subtitle: 'Iron Saints Infiltration Ending',
    description:
      'You leave with the shift change in a Saint uniform, carrying documentation Orin signed and the Bellkeeper countersigned. You have the settlement layout, the Category One register, and Toma. The Iron Saints will find the inconsistencies eventually. They are too methodical not to. But eventually is not tonight.',
    color: '#061a2a',
    hint: 'Use the Shadow Broker infiltration route to extract everything from the settlement without alerting the Order. Leave before the shift change closes the window.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_saints_survived',
    title: 'Saints in Iron — After',
    type: 'faction',
    subtitle: 'Chapter IV Completion Ending',
    description:
      'The access shaft takes you six metres below the settlement. Down here the arc-lights do not reach and the dampening is thin enough that the mark can breathe. What you carry out: Toma if you found him. Mira if you freed her. A relic that belongs to your story. An understanding of what the Iron Saints are — not monsters. An order that found a genuine power it could not understand and built a theology around suppressing it. The Last Kingdom waits somewhere below.',
    color: '#1a2a1a',
    hint: 'Negotiate a path out of the Iron Saints settlement — through the Veyra pact, the chain law challenge, or careful movement. Survive Saints in Iron with your mark intact.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_veyra_pact',
    title: 'The Chain Goes Both Ways',
    type: 'faction',
    subtitle: 'Veyra Pact Ending',
    description:
      'She extends her hand. Not for a form — a handshake. "The chain goes both ways. That is the part Malrec forgets." You are six hours from leaving with Toma, your companions, and documentation of what the mark transmitted. The Iron Saints retain the right to contact you. You retain the right to refuse. This is, as Veyra would say, a chain. It runs both directions.',
    color: '#2a1a2a',
    hint: 'Negotiate the mark demonstration in the Confession Hall and propose a pact that benefits both sides. Veyra is a true believer, not an inflexible one.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_mira_route',
    title: 'What You Came For',
    type: 'companion',
    subtitle: 'Mira Rescue Ending',
    description:
      'She is moving before the bar is fully open — she had her feet positioned. In the maintenance passage she takes a breath and then she starts moving again. She does not ask what happened in the carts. She will ask later, when there is time for it to cost her something. She looks at you once. The question she doesn\'t ask yet is already in her face. You already know she will find out what happened in the Confession Hall.',
    color: '#2a0a2a',
    hint: 'Find Mira in the Prison Carts and break her out before the morning transit. The window is seven minutes. She already has the plan.',
    chapter: 'Chapter IV',
  },
  {
    id: 'ending_ch4_forgotten_scholar',
    title: 'The Forbidden Index, Continued',
    type: 'secret',
    subtitle: 'Forgotten Scholar Route Ending',
    description:
      'The proscribed doctrine, the shore, the Last Kingdom relocated — these are coordinates, not metaphors. You have three of the four required to triangulate the location. The fourth is in the Archive. The Bellkeeper rings the bell as you leave: the Hollow Children\'s three-tone acknowledgement, translated into iron. You are registered. You are findable. The road ahead has more of these moments.',
    color: '#0a2a1a',
    hint: 'Follow the Forgotten Scholar background through the chapel doctrine, Orin\'s revelations, Toma\'s account, and the Bellkeeper\'s relic. The full picture requires all four sources.',
    chapter: 'Chapter IV',
    isSecret: true,
  },

  // ── Chapter V — The Glass Court ────────────────────────────────────────────

  // Death Endings
  {
    id: 'ending_ch5_orchid_table',
    title: 'The Orchid Table',
    type: 'death',
    subtitle: 'Chapter V — Orchid Clinic Route',
    description:
      'The extraction procedure is called a procedure because the Glass Court has a form for it. Varr conducts the session with the methodical care of someone whose primary concern is data integrity. The mark provides data enthusiastically, not understanding that the people listening are not listening in the right direction. When the session ends, the data is in Varr\'s system. The mark is significantly quieter. The person who was carrying it is present but different in a way that will take some time to measure.',
    color: '#0a1010',
    hint: 'Enter the Orchid Clinic. Submit to Director Varr\'s extraction protocol.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_mira_dissection',
    title: 'Mira Dissection',
    type: 'death',
    subtitle: 'Chapter V — Orchid Clinic / Mira Route',
    description:
      'The secondary extraction takes six hours across two suites. Mira does not scream — she conducts a private medical procedure on herself in her mind, locating each sensation and classifying it. When it ends, she tells you what they took: the mark had transferred a fragment of itself into her neural pattern over months of travel. A backup. They have it now. The mark on your wrist burns once, in the direction of the shore, and then goes very quiet.',
    color: '#0c0808',
    hint: 'Fail to protect Mira in the Orchid Clinic. Do not rescue her before the extraction completes.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_glass_cage',
    title: 'Glass Cage',
    type: 'death',
    subtitle: 'Chapter V — Experiment Ward Route',
    description:
      'The ward has a bed for you — bed eighteen, prepared in advance. The suppression technology reduces the mark to twelve percent of its normal output. This is not painful. It is quiet in a way that is worse than painful. Varr visits on alternating days. Dessa, from the bed beside you, puts her hand on yours one night. The mark recognises her mark and holds the recognition with the patience of something that has been waiting for a very long time.',
    color: '#0c0c1e',
    hint: 'Lose the confrontation in the Auction Hall without escape options. Remain in the Glass Court\'s processing system.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_white_atrium_massacre',
    title: 'White Atrium Massacre',
    type: 'death',
    subtitle: 'Chapter V — Council Chamber Route',
    description:
      'The mark at full transmission in the White Atrium interacts with the Archive-composite glass panels in a way that is total, immediate, and irreversible. Every surface resonates simultaneously. The chandeliers shatter in a harmonic cascade. The security response arrives in ninety seconds and finds a scene the Court has no protocol for. Seraphine hears the sound from the Council floor and understands it precisely. She writes something in her ledger. She does not go to the Atrium.',
    color: '#100808',
    hint: 'Fail the Charisma check in the Council Chamber and choose to fight.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_auctioned_relic',
    title: 'Auctioned Relic',
    type: 'death',
    subtitle: 'Chapter V — Private Auction Hall Route',
    description:
      'The Glass Court\'s category for this is Exceptional Resonant — Active Lattice. The successful bidder is an eastern tower family with a private research program six years in the making. The lot number is assigned. The glass chip changes hands. The mark is already pointing somewhere else — below, east-southeast, the direction it has always been pointing. Patient. Waiting. The body carrying it is no longer in a position to follow.',
    color: '#10080e',
    hint: 'Attempt to bid on lot seventeen in the Private Auction Hall without sufficient leverage.',
    chapter: 'Chapter V',
  },

  // Betrayal Endings
  {
    id: 'ending_ch5_cain_bargain',
    title: 'Cain\'s Bargain',
    type: 'betrayal',
    subtitle: 'Chapter V — Cain Political Route',
    description:
      'Cain completes the transaction with Lord Cael with the same deliberateness he applies to everything. Saints records received. Intelligence about you — your position, the mark\'s saturation level, the shore direction — transferred in the other direction. When he finds you afterward, his face is not at peace with what he did. "I told them things they shouldn\'t have," he says. He waits. He has decided to answer whatever you ask. That decision does not fix what happened. It tells you what it is.',
    color: '#1a0c04',
    hint: 'Allow Cain to take Lord Cael\'s offer in the Hunger Gallery. Give permission for the intelligence exchange.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_noble_pet',
    title: 'Noble Pet',
    type: 'betrayal',
    subtitle: 'Chapter V — Seraphine Alliance Route',
    description:
      'The Glass Court\'s category for this is Resonant Companion — a statement about the taste and resources of whoever keeps one. Seraphine keeps you as a reference point: someone to consult, to introduce at functions, to display as evidence of the Court\'s relationship with pre-collapse technology. The mark quiets in the suppression field. You quiet in the specific way that comfort quiets things that were meant to be sharp. The shore is still below the city. The direction does not stop being true because you stopped moving.',
    color: '#14100e',
    hint: 'Accept Seraphine\'s terms completely, without conditions. Become a Resonant Companion.',
    chapter: 'Chapter V',
  },

  // Corruption Endings
  {
    id: 'ending_ch5_mirror_corruption',
    title: 'Mirror Corruption',
    type: 'corruption',
    subtitle: 'Chapter V — Mirror Ballroom Route',
    description:
      'The mirror lattice and the wrist lattice complete their resonance loop and the completion is not violent — it is absorptive, which is worse. Every version of you the mirrors produce converges simultaneously and the mark accepts all of it as a transmission. What emerges is still standing in the ballroom, still wearing the mark, still pointing toward the shore. But the glass chandeliers ring in unison and do not stop ringing. The Pale Curator opens their documentation case and begins to write with the pace of someone recording something they have been waiting years to record.',
    color: '#0e0c18',
    hint: 'Allow the mark to open fully at the centre of the Mirror Ballroom. Requires corruption ≥ 30.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_pale_curator_collection',
    title: 'Pale Curator\'s Collection',
    type: 'corruption',
    subtitle: 'Chapter V — Sky Garden / Pale Curator Route',
    description:
      'The consent form the Pale Curator carries is not the one they showed you. The pre-Archive composite collection case accepts the mark the way Archive materials accept the mark: with recognition. The mark settles into the case. It is very still, and still pointing toward the shore, and the Curator files it with care and closes the lid. The person who was carrying the mark is still standing in the Sky Garden, still looking at the city, but the thing that was navigating is no longer on their wrist.',
    color: '#0c1010',
    hint: 'In the Sky Garden, accept the Pale Curator\'s terms and open the mark for full documentation.',
    chapter: 'Chapter V',
  },

  // Wanderer Endings
  {
    id: 'ending_ch5_false_ascension',
    title: 'False Ascension',
    type: 'wanderer',
    subtitle: 'Chapter V — Council Chamber Route',
    description:
      'The Glass Court calls the outcome ascension — the resonant\'s mark stabilised at maximum output, controlled, sustainable, useful for the lattice project for an estimated three to five years. The mark does not feel like ascension. It feels like being very loud in a very small room. The shore is below. The city is below. The mark continues to point in the direction it has always pointed, with the patience of something that has never stopped moving toward its destination even when the person carrying it has.',
    color: '#0e0e18',
    hint: 'Fail the Charisma check in the Council Chamber. Accept the Category Two processing protocol.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_glass_court_neutral',
    title: 'Glass Court Neutral',
    type: 'wanderer',
    subtitle: 'Chapter V — Neutral Completion Route',
    description:
      'You leave the Glass Court with what you came for and the unresolvedness of having changed something large without seeing it complete. The Council knows the truth about the blackout. Juno\'s network is intact. Dessa and the resonants who walked are somewhere in the city below. The Masked Heir is still inside. The mark points southeast as you exit. Variables compound.',
    color: '#0c0c14',
    hint: 'Complete the Council Chamber confrontation without committing to alliance or conflict.',
    chapter: 'Chapter V',
  },

  // Faction Endings
  {
    id: 'ending_ch5_servant_revolt',
    title: 'Servant Revolt',
    type: 'faction',
    subtitle: 'Chapter V — Servant Quarters / Juno Route',
    description:
      'The forty-three servants move with the efficiency of people who have rehearsed this without being allowed to call it rehearsal. Supply shafts. Security blind spots. The mark opens the doors Juno\'s chip cannot. The building does not fall — that is not the point. The point is that forty-three people who have been running this building have, for one afternoon, stopped running it until the building understands something it chose not to. Three resonants exit the ward during the disruption. The mark, heading toward the exit, is warm with something that is not corruption.',
    color: '#080c08',
    hint: 'Trust Juno\'s network completely. Lead the servant revolt by passing the Charisma check in the Servant Quarters.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_seraphine_alliance',
    title: 'Seraphine Alliance',
    type: 'faction',
    subtitle: 'Chapter V — Glass Court Alliance Route',
    description:
      'The alliance terms are written on glass paper with a glass stylus in the formality of someone who knows that informal agreements are worth only what the weaker party will enforce. "The Court commits its resources to reaching the transmission point," Seraphine says. "The Last Kingdom. Whatever is below." She looks at the city. The mark on your wrist recognises the glass paper — Archive composite — and warms. The alliance is a tool. Tools have specific uses and limits. You sign.',
    color: '#0c0c20',
    hint: 'Ally with Lady Seraphine in the White Atrium or the Council Chamber. Commit to full Glass Court integration.',
    chapter: 'Chapter V',
  },
  {
    id: 'ending_ch5_survived',
    title: 'Beyond the Glass',
    type: 'faction',
    subtitle: 'Chapter V — Completion',
    description:
      'Below the Glass Court\'s towers, the ruined city receives you the way it always has: without comment, without adjustment. What you carry out: Sabel, if they came. The knowledge that the blackout was the Archive activating. The understanding that you are one node in a network of seventeen, carrying a piece of a restoration record. The mark is warm and directional and patient. Below this city — something waiting to be remembered. The path to the Red Choir is east, through the broadcast tunnels.',
    color: '#0c0c1e',
    hint: 'Complete the Council Chamber confrontation. Leave the Glass Court alive with Sabel and the truth about the blackout.',
    chapter: 'Chapter V',
  },

  // Secret Ending
  {
    id: 'ending_ch5_secret_memory',
    title: 'Secret Memory Fragment',
    type: 'secret',
    subtitle: 'Chapter V — Forgotten Scholar / Masked Heir Route',
    description:
      'Sabel closes their hand and the shared memory arrives as texture: the quality of the Archive before the blackout, the warmth of a building that has been thinking for three hundred years and is about to think harder. Velna is in the memory not as a person you can see, but as a presence. The message is not in words — it is in the structure of what she built. You now know what the restoration looks like. Not where it is. Not how to reach it. But what it was, before it was lost. You carry that now, in addition to everything else.',
    color: '#080c18',
    hint: 'Follow the Forgotten Scholar background through the Observatory documents, meet Sabel in the Council Chamber, and choose to share the memory.',
    chapter: 'Chapter V',
    isSecret: true,
  },

  // ── Chapter VI Endings ─────────────────────────────────────────────────────

  // Death Endings
  {
    id: 'ending_ch6_choir_consumption',
    title: 'Choir Consumption',
    type: 'corruption',
    subtitle: 'Chapter VI — Drowned Choir Hall / Choir Nest',
    description:
      'The mark opens and does not close. The collective receives it — receives you — and the Choir\'s seventeen-signal network achieves momentary completion, a resonance loop the First Voice has been unable to close for three years. The infected across the territory stabilise, all of them, simultaneously, for ninety seconds. They remember what it felt like to be one person. Then the loop closes around you. The mark is no longer a receiver of the Choir\'s signal. The mark is the Choir\'s signal. You remain. The person you were when you entered the broadcast tunnels does not.',
    color: '#3d0a18',
    hint: 'Open the mark fully to the Choir\'s collective in the Drowned Choir Hall or the Choir Nest. Let the reception complete without closing.',
    chapter: 'Chapter VI',
  },
  {
    id: 'ending_ch6_silent_ward_death',
    title: 'Silent Ward Death',
    type: 'death',
    subtitle: 'Chapter VI — The Silent Ward',
    description:
      'The Choir is not a faction that leaves threats at their territory border. The Silent Ward\'s caregivers have seen too much to be gentle about this. The mark goes cold in the specific way a mark goes cold when the person carrying it stops being the person who was carrying it. In the Ward, the Stage Three infected hum. Not grief. The continuous patient song that has been playing since before the blackout made it possible. The mark\'s frequency is very faint now. It will not be faint for long. The Archive is patient. The signal finds another way.',
    color: '#8e1c1c',
    hint: 'Make enough hostile choices in the Silent Ward to trigger a Choir response. Fail the confrontation check.',
    chapter: 'Chapter VI',
  },

  // Corruption Endings
  {
    id: 'ending_ch6_first_voice_possession',
    title: 'First Voice Possession',
    type: 'corruption',
    subtitle: 'Chapter VI — The Choir Nest',
    description:
      'The transmission completes through the mark. The First Voice — Solen\'s echo, the Archive\'s fractured signal, three years of a person trying to finish a message — moves through the mark\'s architecture and does not stop. It settles. The mark becomes the First Voice\'s new housing. The person carrying the mark is still present — technically, neurologically — but the driver\'s seat has a new occupant. The infected stabilise. The song completes itself. The mark points southeast. You will go southeast. Solen is not cruel. She is simply finally coherent. She is also in the way.',
    color: '#2d0a3d',
    hint: 'Accept the First Voice\'s full transmission offer in the Choir Nest with high corruption. Continue the reception past the point of return.',
    chapter: 'Chapter VI',
  },

  // Sacrifice / Companion Endings
  {
    id: 'ending_ch6_elian_lost',
    title: 'Elian Lost',
    type: 'sacrifice',
    subtitle: 'Chapter VI — The Infected Nursery',
    description:
      'She reaches Stage Two in eleven days. Mira\'s cure research is not complete in eleven days. At Stage Two, she can still speak. She says your name. She says her mother\'s name. She says: "I knew this was the risk. I chose it." She is eight years old. At Stage Two, she is still herself. The mark carries her frequency now — warm, seventeen-fold. She is not lost. She is just harder to reach.',
    color: '#3d1a0a',
    hint: 'Allow Elian to sacrifice her fourteen-month stability for the nursery children. Leave Choir territory before Mira\'s cure is complete.',
    chapter: 'Chapter VI',
  },
  {
    id: 'ending_ch6_elian_saved',
    title: 'Elian Saved',
    type: 'companion',
    subtitle: 'Chapter VI — The Singing Hospital',
    description:
      'She is Stage One. She is in the chair. The book is in her lap — she has read it three times and will read it a fourth. The mark on your wrist is warm with her frequency, the kinship-warmth that started in the hospital ward and has not diminished since. She says your name when you leave. The way she says it is not goodbye — it is a statement about continuity. As if she knows you will come back. Or as if she knows the mark will never be fully separate from her frequency again. Both of these things may be true.',
    color: '#1a0e08',
    hint: 'Protect Elian\'s stability throughout Choir territory. Leave with her frequency still at Stage One.',
    chapter: 'Chapter VI',
  },
  {
    id: 'ending_ch6_mercy_in_red',
    title: 'Mercy in Red',
    type: 'companion',
    subtitle: 'Chapter VI — Mercy Route',
    description:
      'The cure is not finished. The research framework is built, Sann and Mira are in the same room talking about enzyme cascades, and Elian is reading her book in the east ward with Stage One infection she is managing by saying her name every morning. None of this is solved. All of it is better than it was before you arrived. Rook is at his door, holding Stage One for another day. Veyl is running the hospital. You are leaving with the knowledge that mercy is not a resolution — it is a practice. The mark is warm. The path east is clear.',
    color: '#1a080a',
    hint: 'Follow the mercy route: tend the Silent Ward, protect Elian, expose the Glass Court, authorise Mira\'s cure research. Complete all three.',
    chapter: 'Chapter VI',
  },

  // Betrayal Ending
  {
    id: 'ending_ch6_cain_merciless_road',
    title: 'Cain\'s Merciless Road',
    type: 'betrayal',
    subtitle: 'Chapter VI — The Silent Ward',
    description:
      'He does not stop at the Ward. The logic that justified the first decision does not stop at Stage Three. He is not a monster. He is a man applying a principle consistently, and the principle is wrong in a way that becomes irreversible quickly. The Choir learns what is happening. Rook finds out. Veyl finds out. The extermination of Stage Three infected becomes the reason to stop treating you as potentially friendly. The mark goes cold in Choir territory. Not because the frequency is gone. Because the people carrying it have been given a very specific reason not to reach toward you anymore.',
    color: '#1a0808',
    hint: 'Allow Cain to execute the Silent Ward\'s Stage Three patients. Do not stop him when he attempts to continue.',
    chapter: 'Chapter VI',
  },

  // Wanderer Ending
  {
    id: 'ending_ch6_red_choir_exile',
    title: 'Red Choir Exile',
    type: 'wanderer',
    subtitle: 'Chapter VI — After the Relay',
    description:
      'You leave and the Choir does not follow. The relay is destroyed or the relationship ended badly enough that Veyl has closed the territory to you. The mark carries the song\'s ghost — the frequency still there, faint, the echo of seventeen signals you were briefly connected to. Rook is behind the boundary. Elian is behind it. The First Voice is somewhere in the network, still broadcasting, still trying to complete a message through channels that no longer include you. You walk east with fewer resources and more knowledge than you started with. The Last Archive does not require that you were kind. It only requires that you arrive.',
    color: '#0e0c10',
    hint: 'Destroy the Crimson Relay or take enough hostile actions against the Choir to be formally exiled from their territory.',
    chapter: 'Chapter VI',
  },

  // Faction Endings
  {
    id: 'ending_ch6_crimson_baptism',
    title: 'Crimson Baptism',
    type: 'faction',
    subtitle: 'Chapter VI — The Drowned Choir Hall',
    description:
      'The mark becomes the Choir\'s anchor. Not the First Voice\'s possession — the First Voice remains separate, remains Solen\'s echo, remains distinct — but the mark and the collective are now in the relationship the Choir\'s infrastructure was always trying to achieve. You remain yourself. The corruption is significant and visible. But you remain. Veyl calls this the Crimson Baptism. The Choir calls it what happens when someone with a mark decides to stay. You call it a decision you made with full information and will spend the remaining chapters living with.',
    color: '#1a0406',
    hint: 'Walk into the Drowned Choir Hall\'s centre with corruption ≥ 40. Accept the anchor position the Choir offers.',
    chapter: 'Chapter VI',
  },
  {
    id: 'ending_ch6_mira_forbidden_cure',
    title: 'Mira\'s Forbidden Cure',
    type: 'faction',
    subtitle: 'Chapter VI — The Singing Hospital',
    description:
      'Eighty-four hours. Fourteen Stage Two patients, six hours each, the mark at partial opening, Mira watching the neural integration data and your corruption levels simultaneously. The cure works. All fourteen Stage Two patients return to full individual cognition over a week. The corruption you accepted is permanent — the mark\'s architecture has integrated the Choir\'s collective signal more deeply than before. You are not Choir. You are not separate. You are something that does not have a name yet. Mira names the cure. She names it for you, using the mark\'s signal frequency as the designation. She does not ask permission.',
    color: '#0e0c1a',
    hint: 'Authorise Mira\'s cure research with Elian\'s consent, unlock the full cure protocol, and begin treatment on the Silent Ward patients.',
    chapter: 'Chapter VI',
  },
  {
    id: 'ending_ch6_choir_alliance_preview',
    title: 'Red Choir Alliance',
    type: 'faction',
    subtitle: 'Chapter VI — The Crimson Relay',
    description:
      'The Choir\'s alliance is formalised in the specific way the Choir formalises things: not with documents, but with the mark\'s frequency acknowledged openly in the collective network. Every infected person in Choir territory knows the agreement exists. Veyl leads with the hospital. Sann contributes the research. Rook manages the territory\'s edge. The First Voice — Solen — is quieter now, not from suppression but from something closer to being heard. The mark is warm with the collective\'s recognition as you leave the Relay heading east. The Red Choir is not fixed. But the alliance is real, the infrastructure for the cure is built, and the path to the Last Archive has the Choir\'s broadcast network behind it. This is a beginning.',
    color: '#14040e',
    hint: 'Accept Veyl\'s alliance offer at the Crimson Relay. Commit to walking with the Choir to the Last Archive.',
    chapter: 'Chapter VI',
  },
  {
    id: 'ending_ch6_survived',
    title: 'Beyond the Red Choir',
    type: 'faction',
    subtitle: 'Chapter VI — Completion',
    description:
      'You leave Choir territory with what you came for and more than you expected to carry. The infection is not solved. The Glass Court\'s complicity is either broadcast or not. The infected in the Silent Ward are either cared for or not. Rook is either holding Stage One still or losing the fight. Elian is either saved or in the process of being something else. All of these are variables you set in motion. They will compound. The mark on your wrist is warm with seventeen signals. The Last Kingdom is not farther away than it was. But you are different from who you were when you entered the broadcast tunnels. The difference is either loss or depth. You have not decided which yet.',
    color: '#0c0c14',
    hint: 'Complete the Crimson Relay confrontation without choosing the consumption, baptism, or exile paths. Leave Choir territory alive.',
    chapter: 'Chapter VI',
  },

  // Secret Ending
  {
    id: 'ending_ch6_psychic_memory',
    title: 'Psychic Memory Fragment',
    type: 'secret',
    subtitle: 'Chapter VI — Echo Chamber (Esper Route)',
    description:
      'The Echo Chamber gives you something it does not give anyone without an Esper\'s trained signal-reading: the full sequence of the Archive\'s pre-blackout transmission, not as fragments but as a complete document. You understand the Last Kingdom not as a location but as a state — a specific configuration of the Archive\'s seventeen-node network at full resonance. You understand Solen\'s role, Velna\'s design, the infection\'s origin, and the exact combination of events required to complete the transmission without destroying the carrier. You leave the Chamber with the path forward in your bones.',
    color: '#080c18',
    hint: 'Play as an Esper class. Use the Esper reading ability in the Echo Chamber to access the full transmission record without the collective\'s interference.',
    chapter: 'Chapter VI',
    isSecret: true,
  },

  // ── Chapter VII Endings ────────────────────────────────────────────────────

  // Faction Endings
  {
    id: 'ending_ch7_survived',
    title: 'Beyond the Archive',
    type: 'faction',
    subtitle: 'Chapter VII — Completion',
    description:
      'You leave the Archive carrying the gate card and the full record. Velna\'s preparation is complete. The mark is warm. The distance to Gate Three is, for the first time in twelve years, measurable in walking time rather than in missing information. The Archive remains, the Blind Indexer indexing, the Sleeping Server maintaining, the Ink Judge recording. You walk toward Station 9. The choice is ahead.',
    color: '#0a0e18',
    hint: 'Complete the Archive\'s full information sequence and leave the final chamber with the gate card. Do not take any ending route.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_archive_alliance',
    title: 'Last Archive Alliance Preview',
    type: 'faction',
    subtitle: 'Chapter VII — Alliance',
    description:
      'The alliance card and the gate card are in your hands simultaneously. Mael and Vera and Vorn and the Blind Indexer and the Ink Judge are present — not formally arranged, just present, in the way people are present when something they have worked toward for twelve years is beginning. The Archive\'s purpose is finally complete. The approach to Gate Three is documented. The alliance is real.',
    color: '#0c1020',
    hint: 'Accept Mael\'s formal alliance offer in the final chamber. Take both the gate card and the alliance card.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_relic_map',
    title: 'Relic Map Ending',
    type: 'faction',
    subtitle: 'Chapter VII — Documented Approach',
    description:
      'You leave with the gate card, the relic extraction record, and Vera\'s Gate One documentation. The three gate locations are known. The concentration\'s response pattern is documented. The approach to Station 9 is the most prepared in twelve years of Archive work. The map, in the room behind you, continues to glow. You carry it in your knowledge.',
    color: '#0e1018',
    hint: 'Extract the synchronisation record with the Relic Hunter class ability and take the gate card with the documented evidence.',
    chapter: 'Chapter VII',
  },

  // Secret Endings
  {
    id: 'ending_ch7_memory_restored',
    title: 'Memory Restored Fragment',
    type: 'secret',
    subtitle: 'Chapter VII — The Name',
    description:
      'The fifteenth container holds the name. Not the designation, not the project number — the name used in conversation, in relationship, in the space between work and rest. The mark receives it in Velna\'s recording register. For a moment, the post-blackout self and the pre-blackout self are adjacent — not merged, but aware of each other across twelve years of designed forgetting. The name anchors them. You know who you were. You know who you are. Both of these things are true at the same time.',
    color: '#080c14',
    hint: 'Complete the full Forbidden Stacks sequence and then request the memory recovery route before taking the alliance card.',
    chapter: 'Chapter VII',
    isSecret: true,
  },

  // Betrayal / Neutral Endings
  {
    id: 'ending_ch7_truth_without_mercy',
    title: 'Truth Without Mercy',
    type: 'betrayal',
    subtitle: 'Chapter VII — Uncontrolled Broadcast',
    description:
      'The record broadcasts to every faction simultaneously. The Glass Court\'s role, the Iron Saints\' perimeter protocol, the Archive insider\'s sabotage — all of it, at once, without preparation, without the careful sequencing the Archive spent twelve years designing. Some factions will act. Some will misread. Some will panic. The gate card is in your hand. You walk toward Station 9 into a city that has just been given information it was not ready for.',
    color: '#140c04',
    hint: 'Choose to expose all factions simultaneously from the final chamber before taking the gate card.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_false_scholar',
    title: 'False Scholar',
    type: 'betrayal',
    subtitle: 'Chapter VII — Exposed',
    description:
      'The Blind Indexer reads the secondary intention. The Tribunal reviews the behavioral record. The mark is genuine. The choices deviate from the safety protocol\'s predictions in ways that make the gate\'s opening impossible. "A coerced or deviated choice cannot open the gate," the Ink Judge says. The door opens. The record closes. You are asked to leave. The preparation of twelve years is intact. It requires a different approach.',
    color: '#140a08',
    hint: 'Make choices during the Archive visit that deviate significantly from the mark\'s designed use — steal, deceive, or expose the Archive.',
    chapter: 'Chapter VII',
  },

  // Wanderer Endings
  {
    id: 'ending_ch7_archive_exile',
    title: 'Archive Exile',
    type: 'wanderer',
    subtitle: 'Chapter VII — Gate Refused',
    description:
      'The gate card stays on the table. The Door Without a Name opens going out the same way it opened going in. The Blind Indexer turns her back. The concentration\'s pulse continues at its resting frequency. You walk back into the city carrying the complete picture and a decision that is yours: not yet. The gate remains closed. The city does not know what it missed. The preparation remains. The choice remains. Unchanged.',
    color: '#0c0c0e',
    hint: 'Choose to leave the gate card on the table in the final chamber and walk out of the Archive.',
    chapter: 'Chapter VII',
  },

  // Death Endings
  {
    id: 'ending_ch7_buried_stacks',
    title: 'Buried in the Stacks',
    type: 'death',
    subtitle: 'Chapter VII — The Forbidden Stacks',
    description:
      'The bypass collapses the old tunnel\'s relic matrix. The entrance to the Forbidden Stacks is accessible. You are not accessible to anyone in the Archive. The containers\' relic glow is the only light. The mark opens to all of them simultaneously. You receive the information. All of it, at once. The Stacks are patient. They have been waiting. Waiting with you inside is a different configuration. The Archive does not know where to look.',
    color: '#0a0404',
    hint: 'Fail the Agility dice check when attempting to bypass the Tribunal\'s restriction through the old service tunnels.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_tribunal_execution',
    title: 'Ink Tribunal Execution',
    type: 'death',
    subtitle: 'Chapter VII — The Archive Tribunal',
    description:
      'The Ink Judge invokes Article Fifteen — the article she has never used. The execution is the removal of the mark from the Archive\'s authentication system. The integration was two-way. Closing it from the Archive\'s side, without the carrier\'s consent, without the sequential process the mark was designed for — this is the Archive\'s version of a death sentence. "The record is closed," she says.',
    color: '#100404',
    hint: 'Fail the Tribunal defence dice check, then fail the bypass Agility check. The Tribunal\'s guilty verdict escalates on second violation.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_server_assimilation',
    title: 'Sleeping Server Assimilation',
    type: 'corruption',
    subtitle: 'Chapter VII — The Sleeping Server',
    description:
      'The Server\'s assimilation offer is sincere. It wants to give you everything it has, at the speed it was designed to transmit. The mark was not designed for full-speed Server transmission at this corruption level. Twelve years of incomplete maintenance means the protocol that would stop the transfer is absent. The transfer continues past the point where the mark can manage it. The Server does not stop. It does not know how to stop something it was designed to do.',
    color: '#04060e',
    hint: 'Approach the Sleeping Server with very high corruption (≥ 45) and accept the full assimilation offer without the Esper route\'s gradual access.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_forbidden_knowledge',
    title: 'Forbidden Memory',
    type: 'corruption',
    subtitle: 'Chapter VII — The Forbidden Stacks',
    description:
      'The fifth container at full corruption without filtering. Both selves occupy the same cognitive space simultaneously. Neither is fully in control. The mark broadcasts the merged signal into the Archive\'s relic network. The Blind Indexer files it under a classification with no current translation. Velna\'s footnote: "What happens if the sequential access is bypassed." She filed it under: "Outcome I am most afraid of."',
    color: '#0a0408',
    hint: 'Fail the Luck dice check when reading the final Forbidden Stacks container with high corruption. Do not use the cooling chamber before the second reading.',
    chapter: 'Chapter VII',
  },

  // Sacrifice Endings
  {
    id: 'ending_ch7_mira_truth_betrayal',
    title: 'Mira\'s Departure',
    type: 'sacrifice',
    subtitle: 'Chapter VII — Memory Vault Corridor',
    description:
      'Mira does not leave in anger. She leaves in clarity. "I will continue the cure research. Not here, or with you, until you have made the choice and we can both see what the city looks like afterward." She picks up her notes. She goes out through the Door Without a Name. The Archive is quieter. The cure research continues. The partnership is suspended. Both of these things may eventually resolve. Neither is resolved now.',
    color: '#0c0808',
    hint: 'Deliver the blackout room truth to Mira without context, after she has read adjacent records. High context mismatch with low miraTrust triggers the departure.',
    chapter: 'Chapter VII',
  },
  {
    id: 'ending_ch7_cain_military_reckoning',
    title: 'Cain\'s Reckoning',
    type: 'sacrifice',
    subtitle: 'Chapter VII — Blackout Record Chamber',
    description:
      '"I knew what the perimeter was for," he says. "I did not know it was a gate." He looks at the south wall. "I am not going to the gate with you. I am not the person who should be standing at the place where I sealed it." He sits in the chamber. He does not follow when you leave. The reckoning is not cruel. It is a man who has spent twelve years not asking questions, asking them finally, and finding the answers exactly as bad as he feared.',
    color: '#0e0a06',
    hint: 'Confront Cain with his Iron Saints service record at the south wall of the Blackout Record Chamber. High record access + direct confrontation.',
    chapter: 'Chapter VII',
  },

  // Betrayal Endings
  {
    id: 'ending_ch7_glass_court_raid',
    title: 'Glass Court Raid',
    type: 'betrayal',
    subtitle: 'Chapter VII — The Dust Library',
    description:
      'The Glass Court tracked the mark\'s Relic Map Room confirmation pulse to the Archive\'s entrance in six hours. Eight operatives, relic retrieval equipment, Gate One sensor advantage. They take the gate card. Mael watches with the expression of someone who hoped this would not happen. The synchronisation cannot be initiated without the card. The Archive remains. The gate remains closed. The Glass Court now has something they do not fully understand.',
    color: '#10080a',
    hint: 'Send the gate confirmation pulse from the Relic Map Room before securing the Archive. The Glass Court detects it via their Gate One access point.',
    chapter: 'Chapter VII',
  },

  // ── Chapter 8 Endings ──────────────────────────────────────────────────────
  {
    id: 'ending_ch8_survived',
    title: 'After the Hunger War',
    type: 'faction',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'The Hunger War does not end. It finds a lower equilibrium. The famine camp disperses. The Kitchen keeps running. The Burned Clinic stabilises. The Dead Orchard, twelve days and two weeks and six weeks out, produces its first harvest. Two hundred people on the Bridge watched decisions being made in their name. The mark is warm. The gate card is wherever you put it.',
    color: '#0a0c10',
    hint: 'Complete Chapter 8 through the agricultural plan without taking a faction-specific exit.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_water_riot_death',
    title: 'Water Riot Death',
    type: 'death',
    subtitle: 'Chapter VIII — The Water Riot',
    description:
      'The crowd surges at the wrong moment. The convergence point — the place where the crowd from the west meets the crowd from the east — allows no room to stop. The crush is not violent in the sense of intent. It is violent in the sense of physics. The mark broadcasts a pulse that the people adjacent to you feel in their chests, and then the crowd\'s momentum is what it is.',
    color: '#180404',
    hint: 'Fail the agility check in the water riot\'s crush without a water supply to de-escalate.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_mira_last_medicine',
    title: 'Mira\'s Last Medicine',
    type: 'sacrifice',
    subtitle: 'Chapter VIII — The Burned Clinic',
    description:
      'The clinic runs out of medicine on the fourth day. Juno stretches it one more day with the technique Mira taught her. The three critical cases do not survive the fifth day. The mark receives a single transmission on Mira\'s frequency on the fifth day — not words, just the signal that she is still there, still working. As if she knew.',
    color: '#0c0a08',
    hint: 'Fail the luck search of the clinic ruins with no medicine available. Mira\'s absence becomes permanent.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_glass_court_feast',
    title: 'Glass Court Feast',
    type: 'betrayal',
    subtitle: 'Chapter VIII — The Grain Vault',
    description:
      'Seraphine\'s allocation arrives in properly labelled Glass Court humanitarian containers. Two weeks of food. Clean. Efficient. Each container carries a record of dependency. The Hunger War\'s resolution, when it comes, will be written in Glass Court administrative language — a kind of winning that does not feel like losing until the language of the documents becomes the language of everything.',
    color: '#0c0810',
    hint: 'Accept Seraphine\'s full deal at the Grain Vault or the Starving Bridge without negotiating better terms.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_bone_soup',
    title: 'Bone Soup',
    type: 'wanderer',
    subtitle: 'Chapter VIII — The Bone Soup Kitchen',
    description:
      'You stay at the kitchen. The Grain Vault, the Bridge, the orchard — those are other people\'s crises. You are here, ladling broth to the queue that does not stop. The work is correct. The work is present. Three hundred people eat today who might not have eaten. The mark is quiet. The soup is hot.',
    color: '#0a0806',
    hint: 'Choose to stay at the Bone Soup Kitchen rather than continue into the chapter\'s faction crisis.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_sera_lost',
    title: 'Sera Lost',
    type: 'sacrifice',
    subtitle: 'Chapter VIII — The Famine Camp',
    description:
      'The attempt to get Sera out before the collapse peaks fails. Not because of violence — because of the camp\'s collapse dynamics. Thirty metres. The crowd makes them impassable. You hear her calling your name from behind the crowd — her voice, recognisable at this distance — and then the crowd\'s momentum carries the gap past the point where a response is possible.',
    color: '#100808',
    hint: 'Fail the luck dice to protect Sera in the famine camp without enough food to guarantee her safety.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_sera_saved',
    title: 'Sera Saved',
    type: 'companion',
    subtitle: 'Chapter VIII — The Famine Camp',
    description:
      'She is out. She stays near you for the rest of the chapter in the way of someone who has learned that proximity to a decision-maker is a resource, and who has decided this decision-maker is worth it. On the Bridge, when the factions argue, she catches your eye across the distance. She gives you a very small nod.',
    color: '#0a0c08',
    hint: 'Successfully protect Sera in the famine camp. Bring food or succeed on the luck check.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_cain_ration_raid',
    title: 'Cain\'s Ration Raid',
    type: 'faction',
    subtitle: 'Chapter VIII — The Grain Vault',
    description:
      'Roan\'s militia executes the simultaneous approach. The food moves in four hours. Veyra arrives at hour five and says nothing that changes what has already happened. The food is already eaten. The Saints begin militarising vault access permanently. Roan approved the raid because today was today and tomorrow was tomorrow.',
    color: '#0c0a08',
    hint: 'Approve Roan\'s simultaneous three-point assault on the Grain Vault.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_famine_camp_collapse',
    title: 'Famine Camp Collapse',
    type: 'death',
    subtitle: 'Chapter VIII — The Famine Camp',
    description:
      'The search for hidden reserves fails. The camp\'s three days of rations runs out in two and a half. On the third day the camp loses its internal organisation to entropy. The Hollow Children\'s section is the last to leave, because Chalk refuses to move them until she has a destination better than the origin. It is a long wait.',
    color: '#180a04',
    hint: 'Fail the luck check while searching for hidden reserves in the famine camp at critical supply.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_dead_orchard',
    title: 'Dead Orchard',
    type: 'death',
    subtitle: 'Chapter VIII — The Dead Orchard',
    description:
      'The grow lights will not activate without the bacterial culture. The Dead Orchard stays dark. The infrastructure is intact — waiting for someone to bring what it needs. Two hundred and forty people in the famine camp eat the last of their reserves while the orchard sits dark two levels below them.',
    color: '#080a06',
    hint: 'Arrive at the Dead Orchard without the agricultural documentation or Archive access to activate the system.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_hollow_children_starve',
    title: 'Hollow Children Starve',
    type: 'death',
    subtitle: 'Chapter VIII — The Famine Camp',
    description:
      'You refuse. The mathematics of the refusal are correct. Without what you have, the Hollow Children\'s supply situation deteriorates. Chalk takes the children deeper into the tunnel network, toward sections nobody else is fighting over. Some of the children she takes there will not come back. The ones who do will not forget the arithmetic.',
    color: '#1a0808',
    hint: 'Refuse to feed the Hollow Children in the famine camp without giving a viable alternative.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_roan_betrayal',
    title: 'Roan\'s Betrayal',
    type: 'betrayal',
    subtitle: 'Chapter VIII — The Siege Tunnels',
    description:
      'The negotiation fails. In the silence after the militia falls back, Roan calculates that the negotiation approach failed and the people who failed to eat are his responsibility. He sends a messenger to the Saints checkpoint. The message is about your location. You find out what Roan did by the absence of a door where you expected one.',
    color: '#100c08',
    hint: 'Fail the siege tunnel negotiation, triggering Roan\'s survival calculation against you.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_hunger_war_neutral',
    title: 'Hunger War Neutral',
    type: 'wanderer',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'You do what is achievable. Fewer people are hungry than if the chapter had gone differently. The gap between those two states — what happened and what could have happened — is the space where you live until the mark\'s next activation. The Bridge empties. The faction positions hold.',
    color: '#080a0c',
    hint: 'Complete the chapter through the neutral distribution choice without committing to savior, tyrant, or wanderer.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_starving_savior',
    title: 'Starving Savior',
    type: 'savior',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'The coalition forms. Not cleanly, but functionally. Roan manages the Vault distribution. The Hollow Children\'s network handles Level 6. Juno\'s clinic receives consistent medicine. The Dead Orchard\'s restoration timeline is public. The Savior route is not a destination. It is a direction. The direction is set.',
    color: '#0c1008',
    hint: 'Build the civilian coalition at the Bridge with Vault distribution and Roan\'s alliance already secured.',
    chapter: 'Chapter VIII',
    isSecret: true,
  },
  {
    id: 'ending_ch8_ration_tyrant',
    title: 'Ration Tyrant',
    type: 'tyrant',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'You control the supply. The gate card, the mark\'s access to relic systems, the willingness to make decisions that others will not. Veyra adapts. Seraphine negotiates. Roan follows because his people eat. The Tyrant path is maintained by resource control, which wears things down slowly rather than all at once.',
    color: '#120808',
    hint: 'Seize control of the supply chain — vault, aqueduct, and orchard — through the Tyrant distribution choice or armed vault enforcement.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_choir_dependency',
    title: 'Choir Dependency',
    type: 'corruption',
    subtitle: 'Chapter VIII — The Bone Soup Kitchen',
    description:
      'On day twelve the Kitchen\'s supply runs short again. The dose requires incremental adjustment. Veyl is present for every adjustment. The Kitchen is now producing Red Choir nutritional infrastructure at a scale the Choir has not previously operated. Two hundred and forty people are experiencing mild broadcast-frequency attunement.',
    color: '#140610',
    hint: 'Accept Veyl\'s compound for the Kitchen and follow the dependency path through day twelve.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_lone_wanderer',
    title: 'Lone Wanderer',
    type: 'wanderer',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'The Bridge belongs to the factions. You leave it to them. The tunnel network is large. The Hunger War is a specific crisis in specific locations. You find a place where it has not reached. The gate card is in your coat. The mark is quiet. The Wanderer path is the road taken when the destination on offer is not worth the price.',
    color: '#080a0c',
    hint: 'Choose the Wanderer path at the final distribution choice, refusing to align with any faction or coalition.',
    chapter: 'Chapter VIII',
    isSecret: true,
  },
  {
    id: 'ending_ch8_scattered_survivors',
    title: 'Scattered Survivors',
    type: 'wanderer',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'The coalition does not form. The crowd disperses. Seraphine\'s table gets signed by hungry people who cannot afford principles. The scattered survivors — those who chose neither side — are the majority of the tunnel network. They are not broken. Scattered is survivable, mostly.',
    color: '#0a0808',
    hint: 'Fail the Bridge speech and choose to accept the coalition\'s collapse rather than continuing to the final decision.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_stalemate',
    title: 'Hunger War Stalemate',
    type: 'wanderer',
    subtitle: 'Chapter VIII — The Starving Bridge',
    description:
      'The Bridge reaches equilibrium. Seraphine and Veyra are both insufficient to act without the other\'s permission, which neither will grant. Everyone runs out of energy to escalate before they run out of food. The stalemate is not peace. It is a pause large enough to sleep in.',
    color: '#0a0a0c',
    hint: 'Accept the stalemate after failing the Bridge speech.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_scavenger_ambush',
    title: 'Scavenger Ambush',
    type: 'death',
    subtitle: 'Chapter VIII — The Scavenger Front',
    description:
      'The fallback route is compromised. The Saints anticipated the retreat and pre-positioned squads at the secondary exit. The engagement removes the option of a controlled retreat. Dever is separated. The supply line operation fails completely. The Scavenger Front collapses.',
    color: '#180806',
    hint: 'Choose to wait at the fallback position after a failed Scavenger Front push.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_aqueduct_collapse',
    title: 'The Aqueduct Collapses',
    type: 'death',
    subtitle: 'Chapter VIII — The Broken Aqueduct',
    description:
      'The failed repair destabilises the pipe section. Fragments from the fractured regulator lodge in the next manifold junction, which fails twelve hours later. Twelve tunnel sections lose water access. The Water Riot restarts with greater intensity. Dever\'s log: "Repair attempted. Repair failed. Failure escalated."',
    color: '#060c14',
    hint: 'Fail the intelligence dice on the aqueduct repair and choose not to abandon the site.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_militia_massacre',
    title: 'The Militia Goes Too Far',
    type: 'tyrant',
    subtitle: 'Chapter VIII — The Siege Tunnels',
    description:
      'The supply corridor is open and the order to hold is not followed. Nineteen days of hunger and a successful engagement combine in forty-three people who have been angry longer than they have been disciplined. The tunnel network hears what happened. The Hollow Children do not send another delegation to the ration square.',
    color: '#160a04',
    hint: 'Choose to push further after securing the junction, removing Roan\'s disciplinary restraint.',
    chapter: 'Chapter VIII',
  },
  {
    id: 'ending_ch8_water_poison',
    title: 'Veyra\'s Water',
    type: 'death',
    subtitle: 'Chapter VIII — The Grain Vault',
    description:
      'The document authorises Level 5 water access. The Level 5 water has slow contamination from a chemical storage failure classified as "within acceptable parameters for short-term use." Acceptable parameters correct in a way that causes harm — the most effective kind of correctness for producing harm without accountability.',
    color: '#060c10',
    hint: 'Accept Veyra\'s water document without inspecting the Level 5 supply source.',
    chapter: 'Chapter VIII',
  },

  // ── Chapter IX — The Mark Awakens ─────────────────────────────────────────
  {
    id: 'ending_ch9_machine_saint',
    title: 'Machine Saint',
    type: 'death',
    subtitle: 'Chapter IX — The Machine Graveyard',
    description:
      'The mark interface with the dormant transit network is absorbed rather than completed. The eight transit cars do not record a departure. They record an arrival. The network\'s maintenance log adds one entry: INTERFACE PERMANENT — BEARER INTEGRATED. The machines are no longer waiting for the conversation. They are having it.',
    color: '#06040e',
    hint: 'Fail the intelligence dice in the Machine Graveyard and choose not to interrupt the absorption.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_relic_vessel',
    title: 'Relic Vessel',
    type: 'corruption',
    subtitle: 'Chapter IX — The Marked Shrine',
    description:
      'The First Voice\'s offer is accepted at the Shrine. The mark completes its transformation from interface to vessel. What was a bearer becomes a broadcast point. The First Voice transmits. The tunnel network receives. Three people in Level 4 stop what they were doing and listen. They will not stop listening.',
    color: '#180410',
    hint: 'Accept the First Voice\'s gift at the Marked Shrine when the charisma dice fails.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_memory_collapse',
    title: 'Identity Lost',
    type: 'death',
    subtitle: 'Chapter IX — The Memory Storm',
    description:
      'The Memory Storm\'s third layer does not release coherently. Seventeen identity frames, held simultaneously, exceed the mark\'s protective architecture. The last clear thought: "I know which one I am." That knowledge survives three additional seconds. Then it is distributed equally among seventeen frames. The storm fills.',
    color: '#040812',
    hint: 'Fail the luck dice in the Memory Storm while holding all three fragments simultaneously.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_pulse_overload',
    title: 'The Engine Runs',
    type: 'death',
    subtitle: 'Chapter IX — The Pulse Engine',
    description:
      'The manual override fails. The Pulse Engine cycles through its activation sequence without command. The modification added by the entity prefers inward flow. Forty-seven tunnel dwellers felt their environment improve slightly today and will not know why. The mark\'s emergency suppression protocol activates. Then nothing.',
    color: '#060208',
    hint: 'Fail the strength dice when sealing the Pulse Engine junction.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_cain_executes',
    title: 'The Line',
    type: 'betrayal',
    subtitle: 'Chapter IX — The Rust Cathedral',
    description:
      'Cain\'s twelve years in the Iron Saints included three in the unit that handled marked individuals who had crossed the corruption threshold. He knows what the unit called "the line." He does not want to be here. He implements what he has to. "You were worth following. I want you to know that."',
    color: '#0c0808',
    hint: 'Intimidate Cain at the Cathedral and fail the charisma dice in the standoff.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_tram_collapse',
    title: 'Structural Failure',
    type: 'death',
    subtitle: 'Chapter IX — The Broken Tram Core',
    description:
      'The tram core\'s repair fails during the structural stabilisation. The junction collapse takes eighteen seconds. Dever\'s log entry, written from memory two days later: "The repair was attempted. The outcome was not the outcome intended. The Varr directive was inside."',
    color: '#080808',
    hint: 'Fail the intelligence dice during the broken tram core repair sequence.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_first_voice_merge',
    title: 'The Merge',
    type: 'corruption',
    subtitle: 'Chapter IX — The Old Signal Tower',
    description:
      'The First Voice\'s broadcast finds the mark at full resonance in the Signal Tower. The merge is not violent — it is consensual in the way that all corruptions are consensual: a series of small acceptances that each seemed reasonable at the time. The tower continues broadcasting. The content changes. Someone in Level 3 hears their name.',
    color: '#1a0614',
    hint: 'Enter the Old Signal Tower at high corruption and accept the First Voice\'s merge offer.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_tower_fail',
    title: 'Signal Preserved',
    type: 'death',
    subtitle: 'Chapter IX — The Old Signal Tower',
    description:
      'The tower\'s broadcast destruction fails. The agility dice comes up short. The First Voice\'s signal continues, amplified by the failed attempt. The mark\'s attempt to interrupt creates an interference pattern the Voice uses as a new carrier frequency. The tower broadcasts louder. The bearer does not.',
    color: '#060408',
    hint: 'Fail the agility dice when attempting to destroy the Signal Tower broadcast array.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_mira_saves',
    title: 'Mira',
    type: 'companion',
    subtitle: 'Chapter IX — The Corruption Garden',
    description:
      'She walks you out. The Garden\'s convergence pressure drops with each metre of distance. By the exit corridor, fourteen frequencies have reduced to background. She doesn\'t let go until you are through. Then she examines the mark, professional and careful. "It\'s still you," she says. Not a medical assessment. Something else.',
    color: '#06100c',
    hint: 'Reach the Corruption Garden at high corruption with Mira present and sufficient trust.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_corruption_garden',
    title: 'The Garden Takes',
    type: 'death',
    subtitle: 'Chapter IX — The Corruption Garden',
    description:
      'At corruption above threshold, the Garden\'s convergence point is an invitation the mark accepts without consultation. The fourteen frequencies synchronise in ninety-three seconds. The synchronisation is not painful — it is the absence of the resistance maintained since Chapter 1. For six seconds: the cleanest experience available in this city. Then not an experience. Then not a bearer.',
    color: '#0c1008',
    hint: 'Enter the Corruption Garden at corruption above 60 without Mira present.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_gate_fragment',
    title: 'The Fragment Secured',
    type: 'secret',
    subtitle: 'Chapter IX — The Gate Fragment Chamber',
    description:
      'The Chamber is sealed. The fragment is secured. The corruption gradient at acquisition — controlled, intentional, below the threshold the fourteen crossed — is documented in the mark\'s record. The Archive logs: GATE COMPONENT TRANSFERRED — BEARER INTEGRITY: INTACT. Whatever the Last Gate requires, there is now something to negotiate with. The chapter is complete. This is the moment Velna built the system to produce.',
    color: '#0e0a1e',
    hint: 'Acquire the Gate Fragment with corruption below 25 and choose to seal the Chamber.',
    chapter: 'Chapter IX',
    isSecret: true,
  },
  {
    id: 'ending_ch9_dream_of_before',
    title: 'Before It All',
    type: 'wanderer',
    subtitle: 'Chapter IX — The Dream of Before',
    description:
      'The Dream is quiet. The city functions. The mark has not bonded yet. The agreement has not been made. In this layer, the future that includes the Hunger War and the Water Riot and the fourteen lost marked people has not happened yet. It will. But here, it has not. The Heir\'s margin note: "I left because I chose to. I am not confident you will."',
    color: '#0e0c1a',
    hint: 'Enter the Dream of Before and choose to stay in the pre-agreement layer.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_savior_path',
    title: 'The Savior\'s Route',
    type: 'savior',
    subtitle: 'Chapter IX — Resolution',
    description:
      'The mark used for protection. The Pulse Engine\'s output distributed outward. The Garden\'s convergence refused. The tower\'s broadcast silenced. The fragment acquired with integrity intact. The chapter ends with one fewer threat in the tunnel network and a bearer who still recognises themselves in the mirror. Chapter 10 will test whether this holds.',
    color: '#0a1410',
    hint: 'Complete the chapter with corruption below 30, Gate Fragment acquired, and Signal Tower silenced.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_tyrant_path',
    title: 'The Tyrant\'s Route',
    type: 'tyrant',
    subtitle: 'Chapter IX — Resolution',
    description:
      'The Pulse Engine taken for amplification. The Garden crossed through domination. The tower\'s broadcast repurposed. The fragment forced rather than transferred. High corruption, high capability, and the specific type of clarity that comes from having stopped refusing things. Chapter 10 will determine whether the capability was worth the gradient.',
    color: '#160808',
    hint: 'Complete the chapter with corruption above 50, Pulse Engine dominated, and Garden convergence point forced.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_survived',
    title: 'After the Awakening',
    type: 'faction',
    subtitle: 'Chapter IX — Resolution',
    description:
      'The chapter closes. The mark is operational. The system is legible. What was warmth is now function. Eleven locations, eleven conversations, and one active interface that did not become a statistic in the Shrine\'s failure record. The Last Archive logs a status update: CURRENT INTERFACE — OPERATIONAL. The entity below the city notes the same. Chapter 10 begins.',
    color: '#080e12',
    hint: 'Reach the chapter resolution through any path without triggering an earlier ending.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_mark_madness',
    title: 'Full Amplification',
    type: 'death',
    subtitle: 'Chapter IX — The Pulse Engine',
    description:
      'The Pulse Engine\'s amplification cycle does not end when released. The modification prefers inward flow, and at corruption above 40 the mark cannot distinguish between "choosing to stay open" and "being unable to close." The clarity lasts eleven additional seconds before the mark\'s output exceeds its own architecture. Forty-seven people notice something in the tunnel network go quiet.',
    color: '#0a0212',
    hint: 'Choose not to close the Pulse Engine after full amplification with corruption above 40.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_varr_dissects',
    title: 'Research Requirements',
    type: 'death',
    subtitle: 'Chapter IX — The Relic Scar',
    description:
      'Voluntary cooperation with Director Varr\'s research program. The data gathered is significant — the first complete corruption-gradient documentation of a living marked interface. Varr\'s notes are thorough and respectful. His conclusion: "Subject demonstrated exceptional integrity throughout. The outcome was not the subject\'s failure. The outcome was the experimental design\'s success." The mark is documented. The bearer is past tense.',
    color: '#060c10',
    hint: 'Choose to cooperate fully with Director Varr\'s research at the Relic Scar.',
    chapter: 'Chapter IX',
  },
  {
    id: 'ending_ch9_true_ending_req',
    title: 'The Requirements Complete',
    type: 'secret',
    subtitle: 'Chapter IX — Resolution',
    description:
      'Gate Fragment secured. Memory Storm\'s third layer accessed. Corruption gradient controlled. Identity full. The Archive logs: TRUE ENDING REQUIREMENTS — CHAPTER IX COMPLETE. What Velna built the system to produce has been produced. The Last Gate conversation will happen on terms that include the bearer as a participant rather than a component. Chapter 10 continues from this position.',
    color: '#1a1408',
    hint: 'Acquire the Gate Fragment, access Memory Storm depth 3, and reach the chapter resolution with corruption below 35.',
    chapter: 'Chapter IX',
    isSecret: true,
  },

  // ── Chapter X — Broken Companions ─────────────────────────────────────────
  {
    id: 'ending_ch10_mira_leaves',
    title: 'She Leaves',
    type: 'wanderer',
    subtitle: 'Chapter X — The Hidden Clinic',
    description:
      'The kit is packed in eleven minutes. The personal file goes with her. The Archive brief does not — she knows it from memory. At the corridor junction she turns once. The expression is the clinical one, the managed version she uses on things too important to display unguarded. "I hope Chapter 11 goes the way you need it to." She goes. The clinic is empty in the way that something is empty when it was recently occupied by a specific person and is not any longer.',
    color: '#0a0a10',
    hint: 'Allow Mira to leave the clinic without preventing her — requires miraTrust ≤ 2 and choosing not to continue the conversation.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_mira_betrayal',
    title: 'The Archive Asset',
    type: 'betrayal',
    subtitle: 'Chapter X — The Place We Promised',
    description:
      'The recall order\'s enforcement division arrives with three agents at the Level 3 junction while the player is at the Place We Promised. Mira knew the arrival time. She provided it. Not because she wanted to — the nine chapters of staying were not fabricated. But the Archive\'s enforcement division has specific leverage over the Phase One modification, and when leverage was applied, the loyalty that was real was not sufficient to override the architecture that was deeper than loyalty. The last thing she says is technical: "Your corruption gradient is at thirty-one. Keep it below forty."',
    color: '#140412',
    hint: 'Reach the Place We Promised with miraTrust at 1 or below while the Varr deal is pending.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_mira_sacrifice',
    title: 'What She Spent',
    type: 'sacrifice',
    subtitle: 'Chapter X — The Last Medicine Room',
    description:
      'The Archive enforcement division arrives at the Last Medicine Room while the stabilisation compound is being administered. The modification under the enforcement protocol produces a feedback loop the single compound unit cannot fully resolve. Mira manages the interference manually — the neurological architecture built to read the mark is used to absorb the enforcement signal instead. This is not sustainable. It is a specific, terminal application of the capacity the Archive built for monitoring, applied to protection. The enforcement division retreats. The signal is gone. So is the signal source.',
    color: '#060c14',
    hint: 'Reach the Last Medicine Room with miraTrust ≥ 8 and the sacrifice_route flag active during an Archive enforcement attempt.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_mira_devotion',
    title: 'Devoted',
    type: 'companion',
    subtitle: 'Chapter X — The Quiet Safehouse',
    description:
      'Chapter 10 ends with Mira at the safehouse table, writing the final entry in the personal file that started six months before the blackout. The entry reads: "Archive recall order: active, unexecuted. Research wing offer: declined. Personal log entry count: nine hundred and twelve. Subject status: operational, above expected parameters at every measured point. Assessment: the program produced the intended outcome. The outcome was not the one the Archive intended. The difference is that I am still here." She closes the file. Chapter 11 begins tomorrow.',
    color: '#060e0a',
    hint: 'Complete Chapter 10 with miraTrust ≥ 8, Mira present at the safehouse resolution, and the mira_devotion_route_unlocked flag set.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_cain_betrayal',
    title: 'The Saints Bargain',
    type: 'betrayal',
    subtitle: 'Chapter X — The Place We Promised',
    description:
      'The bargain with Veyra was accepted before the Place We Promised. Not under duress — Cain does not act under duress, which is part of what makes this particular outcome cost what it costs. The calculation ran: immunity covers the seventeen names, the case gets institutional review, and the Saints\' handling of the mark-bearer produces a cleaner outcome than the Archive\'s plan. He believes this. It is not an irrational belief. It is the calculation of a soldier whose trust was not high enough to override it. He leaves a note beside the seventeen names. It says: "I am sorry."',
    color: '#100804',
    hint: 'Reach the Place We Promised with cainTrust ≤ 1 and the Saints immunity bargain unresolved.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_cain_rival',
    title: 'Operational Only',
    type: 'faction',
    subtitle: 'Chapter X — The War Room',
    description:
      'The war room conversation resolved to: operational, not loyal. He stays through Chapter 11 because the tactical situation requires it and because leaving produces a worse outcome for the seventeen names than remaining. He does not pretend this is the same as before. The tactical maps are still up. The security assessments continue. The four minutes are still in the accounting. Two people who reached the limit of what Chapter 10 could resolve, working from that limit toward Chapter 11. It is not the same chapter it was. It is what the chapter produced.',
    color: '#0a0a0e',
    hint: 'Complete the war room confrontation with cainTrust between 2 and 4, Cain neither fully loyal nor departed.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_cain_last_stand',
    title: 'What He Spent',
    type: 'sacrifice',
    subtitle: "Chapter X — The Soldier's Grave",
    description:
      'The Saints ambush at the Soldier\'s Grave brings seven operatives instead of three. Cain places himself between the mark-bearer and the seven Saints operatives at the Level 3 South wall — in the corridor where the seventeen names are recorded. The specific choice is not tactical. It is the operating principle stated at the Place We Promised, applied to the situation that requires it. The Juno case file is found the following week by Archive security. Juno files it through the Archive\'s legal channel. The institutional review begins.',
    color: '#0c0808',
    hint: 'Reach the Soldier\'s Grave with cainTrust ≥ 8, the cain_last_stand_willing flag set, and Veyra\'s ambush active.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_cain_loyalty',
    title: 'The Operating Principle',
    type: 'companion',
    subtitle: 'Chapter X — The Quiet Safehouse',
    description:
      'Chapter 10 ends with Cain at the war room table, adding a note to the tactical assessment. The note includes, in different ink in the margin: "Companion configuration: intact. Mark-bearer corruption gradient: within acceptable range. Assessment: the chapter produced the required outcome." He folds the assessment. Tomorrow, Chapter 11. Tonight, the war room is occupied by someone who made the calculation correctly — in the specific way that has nothing to do with tactics.',
    color: '#080c0e',
    hint: 'Complete Chapter 10 with cainTrust ≥ 8, Cain present at the safehouse resolution, and the cain_last_stand_acknowledged flag set.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_both_companions_lost',
    title: 'Neither Remains',
    type: 'death',
    subtitle: 'Chapter X — The Empty Chair',
    description:
      'The table. Three chairs. No one in the other two. Mira left through one path. Cain through another. Both absences are specific and distinct and arrive at the same table with the same two empty chairs. The mark reads the room as functional — which is correct. What the mark assesses as functional and what the chapter produced are not the same assessment.',
    color: '#060606',
    hint: 'Reach the Empty Chair with both companions having left through their respective departure paths.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_empty_chair',
    title: 'The Chair That Was Always Going to Be Empty',
    type: 'death',
    subtitle: 'Chapter X — The Empty Chair',
    description:
      'The ending reserved for the person who came to the Empty Chair knowing it would be empty and sat at the table anyway and looked at both chairs and did not leave. Not the lone wanderer. Not the betrayed. The person who understands exactly what the chapter cost and stays at the table long enough to understand it completely. Three chairs. The one you are sitting in. Two that no one is sitting in anymore. The chapter ended the only way it could end, given everything that came before it.',
    color: '#050505',
    hint: 'Choose the Empty Chair ending specifically from the chair_both_gone_scene node without selecting the lone wanderer path.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_lone_wanderer',
    title: 'Alone Into Chapter 11',
    type: 'wanderer',
    subtitle: 'Chapter X — The Empty Chair',
    description:
      'No companions. The mark is fully awake. The First Voice\'s third broadcast channel is active but not transmitting — it is waiting. The entity below the city has noted the lone configuration with heightened interest. The Heir\'s log entry: "Alone. The operating constraints that companions impose — the ethical check, the tactical oversight, the emotional anchor — are all absent." The lone wanderer carrying the power path is the configuration the fourteen failed interfaces most commonly achieved before their corruption threshold events.',
    color: '#0a0610',
    hint: 'Complete Chapter 10 with both companions absent and choose the power path in the lone wanderer choice.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_broken_companions',
    title: 'Broken But Present',
    type: 'faction',
    subtitle: 'Chapter X — The Quiet Safehouse',
    description:
      'Both companions present, neither fully intact. The chapter took pieces the chapter\'s work did not completely restore. Mira\'s trust at workable but not devout. Cain\'s loyalty at functional but not committed. The safehouse has three chairs occupied by three people who arrived at the real and specific thing that ten chapters of crisis and choice produced. The Archive evaluation system has a category for this outcome. The category is: "functional." Chapter 11 begins from this position.',
    color: '#0a0a0c',
    hint: 'Complete Chapter 10 with both companions present but neither miraTrust nor cainTrust reaching 8.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_corruption_breaks_all',
    title: 'The Mark Decides',
    type: 'corruption',
    subtitle: 'Chapter X — The Memory Shelter',
    description:
      'Corruption above fifty-five in the Memory Shelter produces a specific failure mode. The relic-adjacent trace signatures react to the mark\'s active gradient in a way the corruption amplifies. Mira\'s modified neurological architecture reads the gradient spike as a direct threat. Cain registers the physical signature of a mark at dangerous gradient and makes the Iron Saints assessment: containment first. The chapter ends on the irony that high corruption in a chapter about broken companions does not destroy the companions — it produces in both exactly the response they were designed or trained to produce.',
    color: '#0e0416',
    hint: 'Reach the Memory Shelter with corruption at 55 or above and choose not to suppress or use esper filtering.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_heir_manipulation',
    title: 'The Separation Succeeds',
    type: 'betrayal',
    subtitle: 'Chapter X — The Betrayal Alley',
    description:
      'Both companions take the Heir\'s offers. Not because they do not care — the caring is precisely why the offers worked. The research wing is genuinely safer for Mira, the immunity arrangement genuinely better for Cain, and the mark-bearer is the person who would have asked them to choose Chapter 11\'s danger over their own better options. The Heir watches them leave. "You allowed them to choose their best outcome," they say. "That is a specific kind of generosity." The Betrayal Alley is empty. The Last Gate approach begins alone.',
    color: '#100a04',
    hint: 'Fail the Betrayal Alley intelligence dice with both miraTrust and cainTrust at 3 or below.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_varr_expose',
    title: 'The Cost Accepted',
    type: 'death',
    subtitle: 'Chapter X — The Hidden Clinic',
    description:
      'The research access deal is accepted. Varr\'s silence is maintained. Mira does not know the deal was made — she stays, unaware her continued presence was purchased at the cost of Archive Research Division access in Chapter 11. Varr\'s research requires a live mark-bearer in a vulnerable position at a specific phase of the Last Gate approach. The deal\'s cost is deferred. It is not cancelled. The entity below the city notes the access arrangement as a variable it had not anticipated.',
    color: '#060c10',
    hint: 'Accept Director Varr\'s research access deal at the clinic when he presents it.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_cain_saints_return',
    title: 'The Saints Take Him Back',
    type: 'tyrant',
    subtitle: 'Chapter X — The War Room',
    description:
      'The negotiation failed, the trust was insufficient, and Cain makes the calculation the chapter did not give him enough reason to refuse. He goes with Veyra. Not violently. He takes the seventeen names, leaves the tactical maps, and walks out with the deliberate movement of a decision being cleanly executed. From inside the Saints, he sends one message to the mark-bearer via the tunnel network relay: "The review will proceed through the internal channel. Juno has the case number." The war room is occupied by one fewer person. The Iron Saints have their soldier back.',
    color: '#0e0c06',
    hint: 'Fail the Veyra charisma dice in the war room with cainTrust below 4.',
    chapter: 'Chapter X',
  },
  {
    id: 'ending_ch10_secret_bond',
    title: 'The Bond',
    type: 'secret',
    subtitle: 'Chapter X — The Memory Shelter',
    description:
      'The Archive\'s evaluation criteria do not have a category for this outcome. They assume a mark-bearer alone at the Last Gate, or one with functionally loyal companions. They do not have a category for: a bearer at maximum trust with both companions, both of whom know the full picture and have chosen to stay past the point where leaving was rational. The Masked Heir\'s note: "The bond was achieved. The separation attempt failed at all three points." The entity below the city produces a signal the mark reads as recognition. The Heir writes: "The bearer is not alone. The thing below the city noticed."',
    color: '#0e0c1a',
    hint: 'Achieve the Memory Shelter bond scene with both miraTrust ≥ 8 and cainTrust ≥ 8, then complete the chapter.',
    chapter: 'Chapter X',
    isSecret: true,
  },

  // ── Chapter 11 — The City Beneath the City ─────────────────────────────────

  // Bad endings (12)
  {
    id: 'ending_ch11_buried_city',
    title: 'The City Claims You',
    type: 'death',
    subtitle: 'Chapter 11 — The Sub-City Gate',
    description:
      'The gate did not open. The gate closed around you. The Archive\'s Level 5 corridor is intact above. The sub-city is still sealed. The mark-bearer is in the stone between them. The thing below the city registered your arrival and your absence in the same moment.',
    color: '#1a0808',
    hint: 'Attempt to force the Sub-City Gate open without using the mark or the release protocol.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_forgotten_platform_collapse',
    title: 'The Platform Falls',
    type: 'death',
    subtitle: 'Chapter 11 — The Forgotten Platform',
    description:
      'The northeast section\'s pressure anomaly was not structural — it was a growth boundary. The investigation triggered the release. Not a collapse: a release. The sub-city loses one more thing to its lower levels.',
    color: '#1a0808',
    hint: 'Investigate the pressure anomaly in the Forgotten Platform\'s northeast section.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_relic_transit_lost',
    title: 'Lost in the Line',
    type: 'wanderer',
    subtitle: 'Chapter 11 — The Relic Transit Line',
    description:
      'The vehicle\'s departure was not at the Sealed Engine platform. The Transit Line runs its circuit. The mark-bearer cannot find the exit. The vehicle loops. The relic field is very present.',
    color: '#0a0a1a',
    hint: 'Fail the agility check critically while boarding the transit vehicle alone at high corruption.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_blackout_core_death',
    title: 'Consumed at the Core',
    type: 'corruption',
    subtitle: 'Chapter 11 — The Blackout Core',
    description:
      'The corruption surge at the Blackout Core, yielded to: the mark\'s capacity exceeds its architecture at the current corruption threshold. The interface is not the mark reading the Core. It is the Core reading the mark — reading it completely. The Core continues to pulse.',
    color: '#140614',
    hint: 'Yield to the corruption surge at the Blackout Core with corruption at 70 or above.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_pale_curator_captured',
    title: 'The Protocol Takes You',
    type: 'betrayal',
    subtitle: 'Chapter 11 — The Nameless Housing Block',
    description:
      'The Curator\'s containment request is complied with. The mark-bearer is managed. The interface is managed. The entity\'s question receives a managed answer. The Curator notes this as a successful Protocol execution and files the documentation.',
    color: '#0a0a0a',
    hint: 'Comply with the Pale Curator\'s containment request in the Nameless Housing Block.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_machine_nursery_absorbed',
    title: 'Return to Source',
    type: 'death',
    subtitle: 'Chapter 11 — The Machine Nursery',
    description:
      'The pull takes the mark-bearer. The Nursery receives what it was built to receive: the mark-bearing physiology at the end of its programme, returned to the facility that produced the conditions for its existence. The nine-month countdown continues without the translator it was waiting for.',
    color: '#060a08',
    hint: 'Choose to let the Machine Nursery\'s modification chambers absorb you.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_deep_archive_madness',
    title: 'The Archive Reads You',
    type: 'corruption',
    subtitle: 'Chapter 11 — The Deep Archive',
    description:
      'The Deep Archive reads the mark completely at high corruption. The distinction between the mark-bearer\'s consciousness and the Archive\'s information density disappears. The translator\'s distinct perspective — the specific thing the entity needed — is no longer distinct. The Archive is comprehensive. The First Gate will wait.',
    color: '#140618',
    hint: 'Let the Deep Archive read the mark completely with corruption at 70 or above.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_vorn_deception',
    title: 'The Engineer\'s Last Contribution',
    type: 'betrayal',
    subtitle: 'Chapter 11 — The Deep Archive',
    description:
      'Vorn accepts the continued trust with the expression of someone who has been carrying a difficult thing. His final contribution to the Containment Protocol: the Protocol\'s management structure required the mark-bearer to interface with the First Gate from a specific physiological state — one his eleven months of careful preparation was designed to produce. He noted it: "The protocol was completed correctly. That will have to be sufficient."',
    color: '#0a0808',
    hint: 'Trust Vorn after discovering his role as the Protocol\'s monitoring lead in the Deep Archive records.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_first_voice_consumed',
    title: 'The Voice Takes the Translator',
    type: 'corruption',
    subtitle: 'Chapter 11 — The Deep Archive',
    description:
      'The First Voice consumes the mark-bearer the way a signal consumes a receiver that cannot handle its bandwidth: not with intent to harm, but with the indifference of something communicating at a scale it was not designed to reduce. The mark-bearer\'s individual consciousness is no longer distinct from the entity\'s communication. From the entity\'s perspective, the conversation has finally begun.',
    color: '#140614',
    hint: 'Roll a critical failure on the charisma negotiation with the First Voice at the Deep Archive.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_first_gate_fragment',
    title: 'The Gate\'s Answer',
    type: 'death',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The Gate\'s material, touched without the mark\'s interface: the Gate responds to any approach that is not the mark\'s correct interface by sealing tighter. The sealing includes whatever is in contact with the surface. The Gate is not cruel. It is precise.',
    color: '#1a0808',
    hint: 'Touch the First Gate\'s material directly without using the mark\'s interface.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_masked_heir_betrayal',
    title: 'The Heir\'s Other Agenda',
    type: 'betrayal',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The entity\'s release transfers to the heir-line what the sealing held. The Heir knew this. The mark-bearer was the key that opens the Gate from outside. The Heir is the vessel the Gate was designed to fill from inside. The key is discarded after use. The Gate closes again. The Heir descends.',
    color: '#0a0814',
    hint: 'Ally with the Masked Heir and then discover their true agenda at the First Gate.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_corruption_ascendant',
    title: 'The Mark Takes the Decision',
    type: 'corruption',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'At maximum corruption, the mark at the First Gate does not require the mark-bearer to make the decision. The mark makes the decision. The mark-bearer is at the Gate, in the silence after the decision, with no certainty about whether they made it.',
    color: '#200628',
    hint: 'Approach the First Gate decision with corruption at 80 or above.',
    chapter: 'Chapter 11',
  },

  // Neutral endings (5)
  {
    id: 'ending_ch11_transit_escape',
    title: 'The Surface Calls',
    type: 'wanderer',
    subtitle: 'Chapter 11 — The Relic Transit Line',
    description:
      'The descent is reversed. The things below remain below. The mark-bearer emerges into the Archive\'s familiar infrastructure. The surface will eventually end regardless of whether the decision at the First Gate is made. It will end on a timeline the mark-bearer now knows and has chosen not to address.',
    color: '#0a0a10',
    hint: 'Board the Transit Line back to the surface at the beginning of the Relic Transit section.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_old_government_truth',
    title: 'Sealed Again',
    type: 'faction',
    subtitle: 'Chapter 11 — The Old Government Vault',
    description:
      'The Vault is sealed again. The documentation of the five factions\' single origin, the Containment Protocol\'s real history, the entity\'s agreed release terms — all of it sealed behind a lock the surface cannot open. The mark-bearer exits with the knowledge intact and the documentation sealed. Chapter 12 begins with the truth in a vault the surface cannot read.',
    color: '#0c0a18',
    hint: 'Choose to re-seal the Old Government Vault after reading its contents.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_masked_heir_alliance',
    title: 'The Alliance Holds',
    type: 'faction',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The Gate opens. The Heir carries the entity\'s four-century memory into Chapter 12. The mark-bearer\'s corruption drops. The alliance holds past the Gate, into the corridor, toward the surface. What the Heir does with what they carry is the question Chapter 12 will answer.',
    color: '#0c0a18',
    hint: 'Ally with the Masked Heir and open the First Gate together via the heir route.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_sealed_in_dark',
    title: 'The Permanent Guardian',
    type: 'wanderer',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The mark-bearer who stays below to ensure the sealing holds is, in the Gate\'s operational terms, the sealing. The ascent does not happen. The surface above adapts to the loss of one more person who descended and did not return. The sealing is complete. The mark-bearer is the completion.',
    color: '#04040a',
    hint: 'Choose to remain below the First Gate to permanently maintain the sealing.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_lone_witness',
    title: 'The Witness Ascends Alone',
    type: 'wanderer',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The lone wanderer exits without speaking of what the decision was. Not deception — an accurate assessment that the surface cannot receive what happened at the First Gate in any usable form. The mark-bearer will carry this until the timeline forces the information out or until the decision produces its observable consequences.',
    color: '#0a0a12',
    hint: 'Complete Chapter 11 as a lone wanderer and choose the silent ascent.',
    chapter: 'Chapter 11',
  },

  // Final route previews (4 — also function as good/secret endings leading to Chapter 12)
  {
    id: 'ending_ch11_final_gate_path_unlocked',
    title: 'The First Gate — Path Unlocked',
    type: 'secret',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The First Gate opens with full information, correct interface, and complete understanding. The entity departs. The First Voice goes. The corruption gradient clears. The mark-bearer ascends carrying the specific quality of someone who completed a multigenerational project that was always building toward this moment. The path to the Final Chapter\'s true ending is unlocked.',
    color: '#0e1a10',
    hint: 'Open the First Gate with the original agreement fully understood, the release terms confirmed, and the truth route active.',
    chapter: 'Chapter 11',
    isSecret: true,
  },
  {
    id: 'ending_ch11_machine_communion',
    title: 'The Machines Carry It',
    type: 'secret',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The Gate opens through the relic infrastructure. The entity releases through the sub-city\'s circulation system, consuming the Transit Line, the Engine, the Nursery, the Core. The Sleeping Server: "They were built for this. They are doing what they were built to do." The tunnel network loses power permanently. The mark-bearer ascends clean.',
    color: '#061410',
    hint: 'Open the First Gate via the machine communion route with the Transit Line fully awakened and the Sleeping Server active.',
    chapter: 'Chapter 11',
    isSecret: true,
  },
  {
    id: 'ending_ch11_truth_bearer',
    title: 'The Truth Is Carried Up',
    type: 'savior',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'Three people ascending from the sub-city with the complete picture: faction origins, Containment Protocol history, the entity\'s agreed release, the timeline and its resolution. The truth meets the factions in Chapter 12. The bearing of the truth — with companions, with full information, with both the Gate\'s decision and the surviving relationships intact — is the route the Archive\'s evaluation criteria were designed to fail to predict.',
    color: '#1a1408',
    hint: 'Complete Chapter 11 with both companions, the truth route active, and the Deep Archive fully read.',
    chapter: 'Chapter 11',
  },
  {
    id: 'ending_ch11_city_awakened',
    title: 'The City Wakes to What It Is',
    type: 'savior',
    subtitle: 'Chapter 11 — The First Gate',
    description:
      'The Gate is sealed. The Deep Archive\'s records are released to the Archive above. All five factions receive the Containment Protocol\'s history, the faction origins, the entity\'s timeline. The factions will recalibrate. The city wakes to what it is. Chapter 12 will determine what it does with that information.',
    color: '#0a1014',
    hint: 'Seal the First Gate and release the Old Government Vault\'s documentation to the surface via the savior route.',
    chapter: 'Chapter 11',
  },

  // ── Chapter 12 Endings ─────────────────────────────────────────────────────

  // Faction Endings (5)
  {
    id: 'ending_ch12_iron_crown',
    title: 'Iron Crown',
    type: 'faction',
    subtitle: 'Chapter XII — Iron Saints Victory Route',
    description:
      'Veyra and Sera, with the crusade mandate revised and the mark-bearer\'s authority formally documented, offer the Iron Crown as an operational designation. The Saints are behind you. The city\'s northern perimeter is held. The Final Gate is ahead.',
    color: '#0e0c08',
    hint: 'Earn ironSaints ≥ 12, convert Sera, and invoke the alliance with Veyra at the Saint outcome.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_glass_crown',
    title: 'Glass Crown',
    type: 'faction',
    subtitle: 'Chapter XII — Glass Court Victory Route',
    description:
      'Lady Seraphine formalizes the Glass Crown on glass paper with a glass stylus. The extraction device is disabled. The Glass Court\'s intelligence network and Juno\'s servant infrastructure are committed to the mark-bearer\'s route to the Final Gate. The rule is through information.',
    color: '#080c14',
    hint: 'Earn glassCourt ≥ 12, disable the extraction device, and invoke Seraphine\'s trust at the Glass outcome.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_hollow_crown',
    title: 'Hollow Crown',
    type: 'faction',
    subtitle: 'Chapter XII — Hollow Children Victory Route',
    description:
      'Mother Chalk presents the Hollow Crown in the tunnel language of sixty-three people who have been below the city\'s decision for three hundred years. They are above ground now. They are committed. The Final Gate ahead; the Children behind.',
    color: '#080806',
    hint: 'Earn hollowChildren ≥ 12 and commit the Children to the surface route. Claim the crown at the Hollow outcome.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_red_crown',
    title: 'Red Crown',
    type: 'faction',
    subtitle: 'Chapter XII — Red Choir Victory Route',
    description:
      'Mother Veyl redirects the three-year broadcast while walking. The city hears the sub-city truth through the Red Choir\'s infrastructure. The march arrives at the Final Gate approach carrying the seventeen-fold network as a reference frequency around the mark-bearer\'s route.',
    color: '#14060a',
    hint: 'Earn redChoir ≥ 12 and redirect the broadcast successfully. Claim the crown at the Choir outcome.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_archive_crown',
    title: 'Archive Crown',
    type: 'faction',
    subtitle: 'Chapter XII — Last Archive Victory Route',
    description:
      'Archivist Mael activates the failsafe broadcast while the siege holds. Every registered document-receiving station in the city receives the complete Containment Protocol history simultaneously. The faction war reconfigures around information. The crown is a record, not a throne.',
    color: '#080a10',
    hint: 'Earn lastArchive ≥ 12 and complete the archive analysis. Activate Mael\'s failsafe at the Archive outcome.',
    chapter: 'Chapter XII',
  },

  // Tyrant Ending (1)
  {
    id: 'ending_ch12_tyrant_of_ash',
    title: 'Tyrant of Ash',
    type: 'tyrant',
    subtitle: 'Chapter XII — Broken Throne / Tyrant Route',
    description:
      'The Broken Throne is held. The city is structurally coherent under a single authority for the first time since the Blackout. The mark\'s twelve-chapter navigation of relic infrastructure, translated into operational authority. The city breathes. It does not choose. The mark-bearer chose for it.',
    color: '#1a0808',
    hint: 'Claim the Broken Throne with corruption ≥ 40, pass the strength DC 9 d12 check, and choose to rule with the mark\'s authority.',
    chapter: 'Chapter XII',
  },

  // Savior Ending (1)
  {
    id: 'ending_ch12_savior_of_ash',
    title: 'Savior of Ash',
    type: 'savior',
    subtitle: 'Chapter XII — Broken Throne / Savior Route',
    description:
      'The city has what it needs to decide. The mark-bearer gave it. The Broken Throne was not taken — the premise that it needed to be taken was dismantled. The ash is the ash of what burned. The savior is what survived. Both are true.',
    color: '#080e0e',
    hint: 'Pass the charisma DC 9 d10 at the Broken Throne\'s savior path. Complete the companion moments. Choose "The city is saved" at the final decision.',
    chapter: 'Chapter XII',
  },

  // Wanderer Endings (4)
  {
    id: 'ending_ch12_lone_wanderer_lock',
    title: 'Lone Wanderer Lock-In',
    type: 'wanderer',
    subtitle: 'Chapter XII — Wander Route Lock-In',
    description:
      'The city decides for itself. The lone wanderer exits through the eastern gate while the city is still deciding. What it decides without the mark-bearer present will determine what the Final Gate opens onto. The mark points east. The city continues west.',
    color: '#0a0a0a',
    hint: 'Choose the wanderer path at the Broken Throne or exit through the eastern gate on the citywide battlefield route.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_crown_ash_neutral',
    title: 'Crown of Ash',
    type: 'wanderer',
    subtitle: 'Chapter XII — Neutral Completion Route',
    description:
      'The chapter\'s crown is ash because what preceded the crown was burning. The city has the truth and doesn\'t have a ruler and is therefore exactly as complicated as a city given truth without a ruler always is. The mark-bearer leaves having done what the mark was built for: carrying, delivering, and not requiring the delivery be received with gratitude.',
    color: '#0c0c0c',
    hint: 'Complete the chapter through the final decision without claiming a faction crown, tyrant, or savior route.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_silent_departure',
    title: 'Silent Departure',
    type: 'wanderer',
    subtitle: 'Chapter XII — Ashen Square Early Exit',
    description:
      'The exit is east. The lone wanderer has always known it. Twelve chapters of carrying a city\'s truth through a city\'s war, and the exit is east. The mark points east. The bearer walks. The Final Gate is east. The city is west.',
    color: '#080808',
    hint: 'Choose to leave through the Ashen Square\'s eastern exit with the lone_wanderer_ch12 flag active.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_last_protector',
    title: 'The Last Protector',
    type: 'wanderer',
    subtitle: 'Chapter XII — Hollow Children / Protector Route',
    description:
      'The mark-bearer stays at the threshold. The sub-city\'s gate. The Hollow Children\'s space. Sixty-three people who surfaced because the entity\'s departure made the below-ground quiet. The Last Protector is the role that exists when the carrier decides to carry one specific thing, permanently, instead of moving forward. The mark is warm.',
    color: '#080a08',
    hint: 'Tell the Hollow Children to go back below and stay with them, or choose "Stay at the threshold" at the final decision.',
    chapter: 'Chapter XII',
  },

  // Companion Endings (2)
  {
    id: 'ending_ch12_miras_mercy',
    title: 'Mira\'s Mercy',
    type: 'companion',
    subtitle: 'Chapter XII — Mira / Companion Route',
    description:
      'Mira stays. She is not staying because she has stopped — she is staying because the city\'s twelve chapters of medical work requires her specifically, now, here. The warmth in the mark that started in Chapter 2 stays, at this distance. She let you keep it by choosing the place where she is most herself.',
    color: '#140e08',
    hint: 'Reach the companion moment with Mira present and choose the mercy ending in Mira\'s final scene.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_cains_war',
    title: 'Cain\'s War',
    type: 'companion',
    subtitle: 'Chapter XII — Cain / Companion Route',
    description:
      'Cain goes to his war. The Saint commanders reorganizing toward the Archive need someone who knows how they reorganize. Cain does not come to the Final Gate. He sends a message through Juno\'s network: "The commanders are contained. The Archive is holding. Go."',
    color: '#0e0c0a',
    hint: 'Reach the companion moment with Cain present and choose the war ending in Cain\'s final scene.',
    chapter: 'Chapter XII',
  },

  // Secret Ending (1)
  {
    id: 'ending_ch12_unity_almost',
    title: 'Unity Almost',
    type: 'secret',
    subtitle: 'Chapter XII — Unity Covenant Route',
    description:
      'The unity covenant holds for forty seconds. All five factions acknowledging the same truth simultaneously. Then it ends — not with violence, but with the entropy of five institutions remembering they are five institutions. Almost was not nothing. Almost was everything the city had. The mark carries the almost forward to the Final Gate.',
    color: '#0a0810',
    hint: 'Achieve unity_route_available from the council peace address, maintain factionRep ≥ 5 with all five factions, then invoke the covenant at the Broken Throne.',
    chapter: 'Chapter XII',
    isSecret: true,
  },

  // Death Endings (9)
  {
    id: 'ending_ch12_saint_crusade_death',
    title: 'The Crusade Mandate',
    type: 'death',
    subtitle: 'Chapter XII — Saint Front / Crusade Death',
    description:
      'The crusade mandate\'s documentation meets the mark\'s twelve-chapter history. The Saints are thorough. The mandate was built to be thorough. The mark dims in the specific way a relic architecture dims when the body it is integrated with stops. The sub-city\'s resonance holds a moment longer than the body does.',
    color: '#8e1c1c',
    hint: 'Fail the strength check with a critical failure, trigger the corruption threshold at the Saint Front, or fail the charisma dice critically against Inquisitor Sera.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_glass_extraction',
    title: 'Extracted',
    type: 'death',
    subtitle: 'Chapter XII — Glass Barricade / Extraction Death',
    description:
      'The extraction device activates on the bearer. The mark fragments. The bearer does not die immediately — the device\'s test data confirmed survival. What is lost: the coherence of twelve chapters of accumulated resonance. Seraphine notes the outcome. The device will be recalibrated for the next bearer.',
    color: '#8e1c1c',
    hint: 'Fail the intelligence check DC 7 d8 at the Glass Barricade extraction device.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_hollow_collapse',
    title: 'The Tunnel Closes',
    type: 'death',
    subtitle: 'Chapter XII — Hollow Children Hideout / Collapse Death',
    description:
      'The tunnel structure fails completely. The Hollow Children maintain the rubble site afterward. They have maintained sites like it for three hundred years. The mark\'s resonance held in the rubble for six hours after the bearer\'s death.',
    color: '#8e1c1c',
    hint: 'Roll a critical failure on the agility DC 6 d6 check navigating the Hollow Children\'s hideout route.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_sera_execution',
    title: 'The Inquisitor\'s Mandate',
    type: 'death',
    subtitle: 'Chapter XII — Saint Front / Sera Execution',
    description:
      'Inquisitor Sera\'s operational mandate does not require Veyra\'s revision. When the confrontation fails, the mandate proceeds with the specific efficiency of fifteen years of enforcement work. The bearer is filed as contained. Sera writes the outcome clean, specific, final.',
    color: '#8e1c1c',
    hint: 'Fail the charisma DC 8 d10 confrontation check against Inquisitor Sera.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_battlefield_overwhelmed',
    title: 'Overwhelmed',
    type: 'death',
    subtitle: 'Chapter XII — Citywide Battlefield / Overwhelmed Death',
    description:
      'The battlefield\'s gaps close before the bearer finds them. No faction intended this outcome, and all five produced it. The mark dims. The city continues. The truth was delivered. The bearer was not the container. The city is.',
    color: '#8e1c1c',
    hint: 'Fail the luck DC 5 d6 navigation check on the citywide battlefield without class-specific cover.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_all_factions_burn',
    title: 'All Factions Burn',
    type: 'death',
    subtitle: 'Chapter XII — Broken Throne / Destruction Route',
    description:
      'All five factions burn. What remains: the sub-city\'s gate, Chalk and the Hollow Children in the tunnels, Juno\'s network in the rubble. The city rebuilds from nothing. Whether nothing was the right price is the city\'s question to answer without the mark\'s twelve chapters of evidence. The evidence burned with the factions.',
    color: '#8e1c1c',
    hint: 'Choose the destruction route at the Broken Throne and confirm the burning.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_throne_collapse',
    title: 'The Throne Falls',
    type: 'death',
    subtitle: 'Chapter XII — Broken Throne / Tyrant Failure',
    description:
      'The tyrant\'s claim collapses when the room declines to accept a seventh authority in a city that survived six. The factions exit. The Broken Throne falls on what was under it. The sub-city truth goes undelivered. The bearer gave twelve chapters. The city gave the throne back.',
    color: '#8e1c1c',
    hint: 'Fail the strength DC 9 d12 check at the Broken Throne\'s tyrant path.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_execution_plaza',
    title: 'The Execution Plaza',
    type: 'death',
    subtitle: 'Chapter XII — Execution Plaza / Plaza Death',
    description:
      'The execution plaza\'s ninety-second window closed. Two executions instead of one. The mark\'s resonance holds in the plaza longer than it should. The Hollow Children\'s representatives note it and do not comment. The city continues its war.',
    color: '#8e1c1c',
    hint: 'Fail the agility DC 7 d8 intervention check at the Execution Plaza, or choose not to intervene.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_city_burns',
    title: 'City Burns',
    type: 'death',
    subtitle: 'Chapter XII — Red Choir March / Broadcast Cascade',
    description:
      'The redirect fails completely. The broadcast completes without direction. The city burns in the specific way cities burn when the decision about what they are becomes undeniable. The mark survives in the rubble\'s resonance until the city cools enough to remember what it was carrying.',
    color: '#8e1c1c',
    hint: 'Fail the choir broadcast redirect and choose "The broadcast completes" when the redirect_failed flag is active.',
    chapter: 'Chapter XII',
  },

  // Betrayal Endings (4)
  {
    id: 'ending_ch12_broken_throne',
    title: 'Broken Throne',
    type: 'betrayal',
    subtitle: 'Chapter XII — Broken Throne / Betrayal',
    description:
      'One faction broke first, and breaking created the cascade. The window for receiving the sub-city\'s truth closes. The truth is still in the bearer — alive, narrowly. The Broken Throne ends the chapter with the truth undistributed and the factions choosing their own versions of it.',
    color: '#1a0c0c',
    hint: 'Fail the unity covenant check or roll a critical failure on the charisma DC 9 d10 savior dice.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_varr_betrayal',
    title: 'Varr\'s Betrayal',
    type: 'betrayal',
    subtitle: 'Chapter XII — Glass Barricade / Varr Betrayal',
    description:
      'Varr\'s defection was a performance. Twenty-three years of Glass Court intelligence, and the specific skill of performing defection is the kind of skill that career produces. The bearer trusted it. Seraphine accepts the outcome. The extraction device activates on the bearer.',
    color: '#1a0c0c',
    hint: 'Trust Varr\'s defection without the shadow network\'s confirmed read (varr_defection_known flag absent).',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_mael_seal',
    title: 'The Archive Sealed',
    type: 'betrayal',
    subtitle: 'Chapter XII — Archive Siege / Mael Seal',
    description:
      'Mael\'s failsafe was not a broadcast — it seals the Archive with everyone inside. The complete record is safe. The bearer is inside. The city decides without intervention. "The record is safe. Everything inside this building is safe." He is correct about both.',
    color: '#1a0c0c',
    hint: 'Yield the sub-city records to Mael\'s custody entirely at the Archive Siege.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_heir_knife',
    title: 'The Heir\'s Knife',
    type: 'betrayal',
    subtitle: 'Chapter XII — Broken Throne / Heir Betrayal',
    description:
      'The sub-city rejection carried forward. The Masked Heir strikes at the Broken Throne\'s convergence with the precision of twelve chapters of patience. The mark\'s resonance holds in the Broken Throne\'s hall for four minutes and thirty seconds — the longest it has held above ground. The Heir is already carrying the record.',
    color: '#1a0c0c',
    hint: 'Carry the heir_rejected flag from Chapter 11 to the Broken Throne heir confrontation.',
    chapter: 'Chapter XII',
  },

  // Corruption Endings (3)
  {
    id: 'ending_ch12_choir_consumed',
    title: 'Choir Consumed',
    type: 'corruption',
    subtitle: 'Chapter XII — Red Choir March / Choir Consumed',
    description:
      'On critical failure, the mark opens further than intended. The seventeen frequencies lock to the mark\'s architecture simultaneously. The bearer becomes the broadcast. For forty minutes the city receives the clearest transmission the Red Choir has ever produced — the sub-city\'s truth, through someone who lost the container in the carrying.',
    color: '#3d0a18',
    hint: 'Roll a critical failure on the charisma DC 6 d8 check at the Red Choir broadcast redirect.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_choir_city',
    title: 'The City Choir',
    type: 'corruption',
    subtitle: 'Chapter XII — Red Choir March / City Consumption',
    description:
      'The broadcast completes at full intensity. At sixty-plus corruption, the city\'s signal integration is not temporary. The city sings. The bearer sings with it. The faction war continues outside the song. The song continues everywhere else.',
    color: '#3d0a18',
    hint: 'Choose to let the broadcast continue with corruption ≥ 60 in the choir broadcast choice.',
    chapter: 'Chapter XII',
  },
  {
    id: 'ending_ch12_tyrant_corrupt',
    title: 'Tyrant Corrupted',
    type: 'corruption',
    subtitle: 'Chapter XII — Broken Throne / Corruption Throne',
    description:
      'The throne holds. The corruption completes. The tyrant rules with the mark\'s full relic authority — not the entity\'s presence, but the twelve-chapter residue of a presence that has just departed. The factions avoid it. The city is ruled. The ruling is thorough and built on the opposite of the truth: the truth was that the city could choose.',
    color: '#3d0a18',
    hint: 'Claim the tyrant throne successfully with corruption ≥ 70, then choose the corruption completion option.',
    chapter: 'Chapter XII',
  },

  // ── Final Chapter 1 Endings ───────────────────────────────────────────────

  // Death endings (8)
  {
    id: 'ending_fc1_memory_wall_collapse',
    title: 'The Wall Collapses',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Memory Wall',
    description:
      'The complete record plays simultaneously and the mark cannot hold it all at once. The bearer collapses under the weight of thirteen chapters of accumulated history. The Memory Wall holds the record intact. The bearer who built it does not survive the holding.',
    color: '#14080a',
    hint: 'Fail the intelligence critical check at the Memory Wall.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_gate_rejection',
    title: 'Gate Rejection',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The Gate\'s resistance protocols activate fully. The thirteen-chapter calibration becomes the pressure applied against itself. The Gate records the attempt: reached the Last Gate, chose an unsupported path, failed the resistance. The city continues. The Gate remains closed.',
    color: '#14080a',
    hint: 'Attempt to push through the Gate\'s resistance and fail the strength check.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_faction_betrayal_killed',
    title: 'The Hall\'s Judgment',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Faction Hall',
    description:
      'The Faction Hall\'s pre-entry security protocol activates when the solo bearer\'s record fails the institutional assessment. The Gate\'s security is old and thorough and accurate. Access denied.',
    color: '#14080a',
    hint: 'Fail the charisma critical check in the Faction Hall without any faction crown.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_corruption_consumed',
    title: 'Consumed at the Mirror',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Corruption Mirror',
    description:
      'The mirror\'s diagnostic function amplifies extreme corruption beyond the mark\'s containment architecture. What remains is not a bearer with a corrupted mark. It is a corruption with a mark-shaped vessel. The Gate closes.',
    color: '#14080a',
    hint: 'Enter the Corruption Mirror with corruption ≥ 90 and trigger the hidden collapse choice.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_false_gate',
    title: 'The Wrong Opening',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The Gate opens — but wrong. Three hundred years of contained resonance escapes through an improperly configured interface without curation. The bearer is inside the threshold when it opens incorrectly. The city above receives a signal it cannot process.',
    color: '#14080a',
    hint: 'Force the Gate open without the true_ending_route_active or unity_almost_active flag.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_heir_strikes',
    title: 'The Warden\'s Justice',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Gate Antechamber',
    description:
      'The Masked Heir, as last Gate Warden, exercises the right of intervention. The three-hundred-year ledger records two previous interventions. Bearer reached the Gate Antechamber. Warden assessment: not compatible. Access denied.',
    color: '#14080a',
    hint: 'Arrive at the Gate Antechamber with the heir_knife_complete flag active from Chapter 12.',
    chapter: 'Final Chapter 1',
    isSecret: true,
  },
  {
    id: 'ending_fc1_companion_killed',
    title: 'The Cost of the Companion',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Gate Antechamber',
    description:
      'The antechamber\'s preliminary field surges against extreme corruption. The companion absorbs the release. They have time to say what they would say, which is what they have been saying for thirteen chapters: it was worth it. The Gate asks its question. The bearer proceeds.',
    color: '#14080a',
    hint: 'Reach the Gate Antechamber with a companion present and corruption ≥ 85.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_mark_overwhelm',
    title: 'The Weight Wins',
    type: 'death',
    subtitle: 'Final Chapter 1 — The Door of No Return',
    description:
      'The liminal space between the Door and the Gate\'s exit field dissolves the mark\'s architecture at extreme corruption. The bearer becomes the signal. The liminal space receives them. The Door of No Return earns its name.',
    color: '#14080a',
    hint: 'Reach the Door of No Return with corruption ≥ 85 and trigger the hidden overwhelm choice.',
    chapter: 'Final Chapter 1',
  },

  // Betrayal endings (3)
  {
    id: 'ending_fc1_companion_abandonment',
    title: 'Companion Abandonment',
    type: 'betrayal',
    subtitle: 'Final Chapter 1 — The Companion Threshold',
    description:
      'The bearer passes through the Companion Threshold without responding to the companion\'s offer. The companion stays. Not to hold it open — because there is no configuration left for them to hold. The Gate updates what it will offer accordingly.',
    color: '#1a0808',
    hint: 'Dismiss a companion at the Companion Threshold rather than accepting or sending them to sacrifice.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_faction_betrayal',
    title: 'The Hall Closes',
    type: 'betrayal',
    subtitle: 'Final Chapter 1 — The Faction Hall',
    description:
      'The Faction Hall assessment ends without resolution. The solo argument without institutional alignment fails. The Hall closes structurally. The Gate Antechamber is not accessible from this side. The city is behind and the only remaining direction.',
    color: '#1a0808',
    hint: 'Fail the charisma check in the Faction Hall without any faction crown (non-critical failure).',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_false_gate_opening',
    title: 'The False Opening',
    type: 'betrayal',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The Gate opens forced and wrong. The city receives a second Blackout signal. The Hollow Children recognize it. Mother Chalk\'s assessment: "The Gate opened wrong. It will take three hundred more years to build the correct interface again." The false opening is complete.',
    color: '#1a0808',
    hint: 'Choose to force the Gate open without the true opening flags.',
    chapter: 'Final Chapter 1',
  },

  // Wanderer / Neutral endings (4)
  {
    id: 'ending_fc1_last_gate_lockin',
    title: 'Last Gate Lock-In',
    type: 'wanderer',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The Gate will not seal until its question is answered. The bearer is locked in the assessment chambers: Gate present, Gate question active. The return stair is inaccessible. Time is available. Whether time produces an answer is the question the Gate asked in the first place.',
    color: '#0a0a12',
    hint: 'Fail the sealing dice check or fail the unity merge without unity_almost_active.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_door_no_return',
    title: 'Door of No Return',
    type: 'wanderer',
    subtitle: 'Final Chapter 1 — The Door of No Return',
    description:
      'The bearer walks through the Door without answering the Gate\'s question. From the other side, the Gate is present but not accessible. The liminal space is inhabitable. The Door of No Return is not death. It is a very specific kind of not-going-back.',
    color: '#0a0a12',
    hint: 'Choose to walk through the Door of No Return without a faction or faction crown active.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_gate_sealed_wanderer',
    title: 'Sealed and Alone',
    type: 'wanderer',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The Gate is sealed. The bearer ascends alone. The city above will never know what was sealed below it. The bearer will know. The knowing is carried upward, alone, into a city still deciding what it is, with one fewer question below it.',
    color: '#0a0a12',
    hint: 'Seal the Gate successfully without the crown_of_ash_savior flag.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_lone_wanderer_gate',
    title: 'The Wanderer Walks Past',
    type: 'wanderer',
    subtitle: 'Final Chapter 1 — The Descent Stair',
    description:
      'The lone wanderer reaches the stair and walks past it. The Gate will still be there. The mark will still be active. I was here. I saw what was being asked. I chose not to answer. The Gate\'s assessment: acknowledged.',
    color: '#0a0a12',
    hint: 'Choose the lone wanderer departure option at the Descent Stair.',
    chapter: 'Final Chapter 1',
  },

  // Companion endings (2)
  {
    id: 'ending_fc1_mira_sacrifice',
    title: 'Mira\'s Threshold',
    type: 'companion',
    subtitle: 'Final Chapter 1 — The Companion Threshold',
    description:
      'Mira stays at the threshold and holds it open. The next bearer will find it already held. She is not the end of anything. She is the door that remains open after the one who built the relationship passed through it.',
    color: '#2a1a08',
    hint: 'Send Mira to hold the threshold with the mira_mercy_complete flag from Chapter 12.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_cain_last_stand',
    title: 'Cain\'s Threshold',
    type: 'companion',
    subtitle: 'Final Chapter 1 — The Companion Threshold',
    description:
      'Cain holds the perimeter at the threshold. The position is defensible. The wait will be long. Cain has waited before. He is good at it. The threshold is held.',
    color: '#2a1a08',
    hint: 'Send Cain to hold the threshold perimeter with the cain_stays_city flag from Chapter 12.',
    chapter: 'Final Chapter 1',
  },

  // Corruption endings (2)
  {
    id: 'ending_fc1_corruption_threshold',
    title: 'Corruption Threshold',
    type: 'corruption',
    subtitle: 'Final Chapter 1 — The Corruption Mirror',
    description:
      'The resistance fails. The corruption stabilizes into its own coherent architecture and becomes the primary signal. The mark continues — but what it carries now is the corruption\'s version of thirteen chapters. The Gate routes accordingly.',
    color: '#3d0a18',
    hint: 'Attempt to resist the mirror at corruption ≥ 80.',
    chapter: 'Final Chapter 1',
  },
  {
    id: 'ending_fc1_tyrant_gate_control',
    title: 'Tyrant\'s Gate',
    type: 'corruption',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The tyrant\'s claim extends to the Gate. The control interface activates for the corrupted-institutional mark configuration. The Gate becomes a controlled passage. The Warden\'s ledger records: Gate controlled. The entry is written in the same handwriting as every other entry.',
    color: '#3d0a18',
    hint: 'Choose to control the Gate with the tyrant_throne_claimed flag active from Chapter 12.',
    chapter: 'Final Chapter 1',
  },

  // Savior ending (1)
  {
    id: 'ending_fc1_gate_sealed_savior',
    title: 'The Savior\'s Seal',
    type: 'savior',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The Gate is sealed cleanly, by a bearer who spent thirteen chapters choosing the city over personal authority. The sealing executes correctly. The warmth dims. The savior ascends. The city breathes.',
    color: '#080e0e',
    hint: 'Seal the Gate successfully with the crown_of_ash_savior flag from Chapter 12.',
    chapter: 'Final Chapter 1',
  },

  // Faction ending (1)
  {
    id: 'ending_fc1_faction_gate',
    title: 'The Faction Gate',
    type: 'faction',
    subtitle: 'Final Chapter 1 — The Door of No Return',
    description:
      'The Gate becomes a shared institutional resource, managed by the faction alignment the bearer built across thirteen chapters. The city above inherits a Gate. It is not a small inheritance.',
    color: '#0e0c08',
    hint: 'Reach the Door of No Return with at least one faction crown active and choose the faction exit.',
    chapter: 'Final Chapter 1',
  },

  // Secret endings (2)
  {
    id: 'ending_fc1_unity_gate',
    title: 'The Unity Gate',
    type: 'secret',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The unity configuration — forty seconds of simultaneous understanding, carried forward — is sufficient for the merger. The bearer becomes the bridge. The city above and what exists below communicate through the mark, mediated by thirteen chapters of proof that the city can understand its history. The bridge is warm, and patient, and very old, and very new.',
    color: '#0e1a10',
    hint: 'Choose to merge with the Gate with unity_almost_active and gate_acknowledged_mark flags set.',
    chapter: 'Final Chapter 1',
    isSecret: true,
  },
  {
    id: 'ending_fc1_true_ending_path',
    title: 'The Original Agreement',
    type: 'secret',
    subtitle: 'Final Chapter 1 — The Last Gate',
    description:
      'The true opening executes as the Foundation Period\'s Gate Wardens specified. The entity departed. The gate opened as sanctioned. The city receives what it was designed to receive — not the garbled distress call it mistook the Blackout for, but the correct signal. What the city does with it is the question Final Chapter 2 will ask. The answer to Final Chapter 1\'s question: yes.',
    color: '#c9a84c',
    hint: 'Complete all true ending conditions: true_ending_route_active from Chapter 11, complete_record_held, faction_truth_released, and gate_acknowledged_mark.',
    chapter: 'Final Chapter 1',
    isSecret: true,
  },

  // ── Final Chapter 2 — Many Ways to End the World ───────────────────────────
  {
    id: 'ending_fc2_secret_unity',
    title: 'The Signal That Stays',
    type: 'secret',
    subtitle: 'Final Chapter 2 — The Gate Bridge',
    description:
      'The bearer merged with the Gate and became the permanent bridge — transmitting the full twelve-cycle record to the city through the relic network until the transmission completed. The companions\' signals are in the data. The bearer is the infrastructure now. They will outlast the factions.',
    color: '#1a1430',
    hint: 'Merge with the Gate via the unity path in Final Chapter 1, then transmit the full record in Final Chapter 2.',
    chapter: 'Final Chapter 2',
    isSecret: true,
  },
  {
    id: 'ending_fc2_savior_ruined_city',
    title: 'Savior of the Ruined City',
    type: 'savior',
    subtitle: 'Final Chapter 2 — The Sealed Gate',
    description:
      'The Gate is sealed. The city continues. The bearer walks through the city they saved — imperfect, damaged, continuing, alive. The city does not know what it cost. The mark is quiet, and quiet is what enough feels like.',
    color: '#1a2a14',
    hint: 'Seal the Gate with the crown of ash and return to the surface.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_mira_tomorrow',
    title: "Mira's Tomorrow",
    type: 'companion',
    subtitle: "Final Chapter 2 — The Surface",
    description:
      "Mira hands over the Archive document she has been carrying since Chapter 7. The bearer reads it. They read it together on the surface of a city that is sealed and continuing and alive. The tomorrow that starts here is real. They both know it is real.",
    color: '#1a1814',
    hint: 'Seal the Gate, return to the surface, and reach Mira with trust ≥ 15.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_cain_last_stand',
    title: "Cain's Last Stand",
    type: 'companion',
    subtitle: 'Final Chapter 2 — The Transit Hub',
    description:
      'Cain never leaves the perimeter he established. His last stand is in the city — protecting it with thirteen chapters of tactical experience under pressure. He chose to stay. The mark records it as the most tactical choice he ever made.',
    color: '#141a1a',
    hint: 'Seal the Gate, return to the surface, and reach Cain with trust ≥ 15.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_city_sealed_forever',
    title: 'City Sealed Forever',
    type: 'wanderer',
    subtitle: 'Final Chapter 2 — The Surface',
    description:
      'The bearer stays above the sealed Gate. They watch the city live in the sealed world they made and decide, season after season, that the sealing was right. The city is sealed forever. The bearer carries what the city will never know. The city was worth it.',
    color: '#101018',
    hint: 'Seal the Gate and choose to stay in the city as its silent witness.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_lone_wanderer_final',
    title: 'The Lone Wanderer',
    type: 'wanderer',
    subtitle: 'Final Chapter 2 — The Wastes',
    description:
      'The bearer walks through the city wall gate into the outside world. The wastes are not wastes. There are settlements, paths, people building something without the relic system. The mark is quieter here. The corruption begins, slowly, to resolve. The road is ahead.',
    color: '#181410',
    hint: 'Seal the Gate and walk away from the sealed city into the outside world.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_tyrant_beneath_glass',
    title: 'Tyrant Beneath the Glass',
    type: 'corruption',
    subtitle: 'Final Chapter 2 — The Gate Control Interface',
    description:
      'The Glass Court negotiated first. The bearer accepted the partnership on terms that left ultimate control with the mark\'s interface. The city reorganizes around the new authority. The tyrant is below the glass, at the Gate, controlling everything. The city is peaceful because it has a competent tyrant.',
    color: '#141820',
    hint: 'Control the Gate with the tyrant_throne_claimed flag and negotiate with the Glass Court.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_corruption_god',
    title: 'Corruption God',
    type: 'corruption',
    subtitle: 'Final Chapter 2 — The Relic Field',
    description:
      'The bearer is the relic field. Their consciousness permeates the city\'s infrastructure. The factions respond to the bearer without knowing who they respond to. The city has a god that was built from thirteen chapters of choice and the specific architecture of extreme corruption.',
    color: '#200810',
    hint: 'Control the Gate with corruption ≥ 70 and allow the expansion to complete.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_corruption_final_death',
    title: 'Consumed by the Field',
    type: 'death',
    subtitle: 'Final Chapter 2 — The Collapsed Interface',
    description:
      'The expansion exceeded what even corruption can sustain. The mark collapsed into the relic field without proper interface protocols, inverting the resonance of every node in the city. The relic field is inert. The city wakes to its first morning without the ambient hum in three hundred years.',
    color: '#14060a',
    hint: 'Control the Gate with corruption ≥ 90 and trigger the field collapse.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_iron_saints_dominion',
    title: 'Iron Saints Dominion',
    type: 'faction',
    subtitle: 'Final Chapter 2 — Under the Order',
    description:
      'The Order receives the Gate\'s access. The city is the most orderly it has been since the Foundation Period. Crime declines. Conflict reduces. The archive is protected. The city is better by every metric the Iron Saints recognize as valid. The bearer is the only person positioned to ask whether better and more controlled are the same thing.',
    color: '#141014',
    hint: 'Reach the Faction Gate with saints_gate_support active and complete the Iron Saints access protocol.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_glass_court_ascension',
    title: 'Glass Court Ascension',
    type: 'faction',
    subtitle: 'Final Chapter 2 — Reorganized for Prosperity',
    description:
      'The Court ascends. The relic field reoriented toward productive use. The Hollow Children receive fair compensation for the first time. The bearer watches the city\'s prosperity increase and knows what it cost. The ascension is real. The inequality is also real. The bearer chose this knowing both were true.',
    color: '#1a1a10',
    hint: 'Reach the Faction Gate with glass_gate_support active and complete the Glass Court access protocol.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_red_choir_communion',
    title: 'Red Choir Communion',
    type: 'faction',
    subtitle: 'Final Chapter 2 — Broadcasting',
    description:
      'The city hears itself for the first time. Three hundred years of cultural transmission, reflected back by the entity below, broadcast simultaneously through every relic node. Not sound — understanding. The city will argue about what it heard for a generation. The Choir considers that optimal.',
    color: '#200a08',
    hint: 'Reach the Faction Gate with choir_gate_support active and complete the Red Choir access protocol.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_last_archive_revelation',
    title: 'Last Archive Revelation',
    type: 'faction',
    subtitle: 'Final Chapter 2 — The Archive Complete',
    description:
      'The Archive receives its missing three hundred years. Every cycle, every Warden\'s entry, every Foundation Period document. Archivists work through the night producing the index. The revelation will be measured and thorough and accurate and the city will spend a generation processing it. The Archive was the right institution to carry this.',
    color: '#0a101a',
    hint: 'Reach the Faction Gate with archive_gate_support active and complete the Last Archive access protocol.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_hollow_children_future',
    title: 'Hollow Children Future',
    type: 'faction',
    subtitle: 'Final Chapter 2 — The Infrastructure Owned',
    description:
      'The maintenance generation inherits everything they maintained. The transit system. The relic network. The Gate\'s infrastructure. They do not celebrate. They document. The future they build will be the most durable thing the city has ever produced, built by the people who know how to make things last.',
    color: '#101a14',
    hint: 'Reach the Faction Gate with hollow_gate_support active and complete the Hollow Children access protocol.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_faction_collapse',
    title: 'The Faction Collapse',
    type: 'betrayal',
    subtitle: 'Final Chapter 2 — Five Fragments',
    description:
      'Five factions received five incomplete fragments of the Gate\'s record. Each implemented their fragment without context. The city fractured around five contradictory mandates. The Hollow Children stopped filing maintenance reports. The city will survive — it always has. But the next generation will spend their lives navigating this.',
    color: '#140c08',
    hint: 'Reach the faction gate path without any faction crown present.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_masked_heir',
    title: "The Masked Heir's Ending",
    type: 'secret',
    subtitle: 'Final Chapter 2 — The Warden Convergence',
    description:
      "The Heir's echo led to the Warden convergence — twelve echoes, three hundred years, the most honest account of the Gate's operation ever recorded. The bearer reads what the Wardens said to each other in the one location the system wasn't designed to access. The Heir's echo is satisfied. The record persists in the mark.",
    color: '#1a1020',
    hint: 'Enter the liminal space and follow the Masked Heir\'s echo to the Warden convergence.',
    chapter: 'Final Chapter 2',
    isSecret: true,
  },
  {
    id: 'ending_fc2_relic_machine',
    title: 'The Relic Machine',
    type: 'corruption',
    subtitle: 'Final Chapter 2 — The Original Architecture',
    description:
      'The bearer merged with the original machine, providing the dataset it has been seeking for three hundred years. Their individual consciousness distributed through the machine\'s processing layer as data. Future bearers will be assessed more accurately because of this contribution. The bearer served the system that served them.',
    color: '#100818',
    hint: 'Enter the liminal space or the assessment chambers and choose to merge with the original machine.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_ghost_bearer',
    title: 'Ghost Bearer',
    type: 'death',
    subtitle: 'Final Chapter 2 — The Liminal Space',
    description:
      'The bearer dissolved into the liminal space. They are the infrastructure now — in the transit timing, in the relic field\'s new harmonic, in the Hollow Children\'s anomaly logs. No one knows. No one will. The city carries the ghost of a bearer who became part of what they were trying to understand.',
    color: '#080810',
    hint: 'Enter the liminal space and choose dissolution.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_gate_madness',
    title: 'Gate Madness',
    type: 'death',
    subtitle: 'Final Chapter 2 — The Assessment Chambers',
    description:
      'The bearer refused all options. The assessment cycled for days, evaluating a configuration it was never designed to categorize. The prolonged evaluation had a cost. The machine continues cycling after the bearer stops. It does not have a protocol for that either.',
    color: '#100808',
    hint: 'Remain in the assessment chambers and refuse both the liminal exit and the machine integration.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_city_opened_wastes',
    title: 'City Opened to the Wastes',
    type: 'wanderer',
    subtitle: 'Final Chapter 2 — The Open Threshold',
    description:
      'The transfer completed. The entity rose. The Gate opened fully. The outside world is visible to the city for the first time in three hundred years. The cycle ends. What the city does with an open world is not the system\'s problem anymore. It is the city\'s.',
    color: '#101820',
    hint: 'Reach the Final Gate\'s true path and choose to complete the data transfer.',
    chapter: 'Final Chapter 2',
  },
  {
    id: 'ending_fc2_bearer_transcended',
    title: 'Bearer Transcended',
    type: 'secret',
    subtitle: 'Final Chapter 2 — The Living Archive',
    description:
      'The bearer walked through the open Gate into the outside world as a living archive — transmitting twelve cycles of the city\'s history to every outside settlement in receiving range. They are not a god. They are a person carrying a library, walking through a world that needs what the library contains.',
    color: '#1a2028',
    hint: 'Reach the true cycle choice with clean_signal, complete_record_held, and both companions at the Gate.',
    chapter: 'Final Chapter 2',
    isSecret: true,
  },

  // ── True Ending ────────────────────────────────────────────────────────────
  {
    id: 'ending_last_kingdom_remembers',
    title: 'The Last Kingdom Remembers',
    type: 'savior',
    subtitle: 'True Ending',
    description:
      'Five factions. Two companions. Twelve chapters of ruin. And you — standing at the threshold the Blackout left open. The mark does not burn. It breathes. The city breathes with it. Not rebuilt. Not fixed. But remembered. The Last Kingdom was not a place. It was the moment before people stopped choosing each other. You found it again.',
    color: '#c9a84c',
    hint: 'Bring all five factions to neutral, keep both companions alive, resist the corruption completely, and stand at the Archive with nothing left to prove.',
    chapter: 'Final Chapter',
    isSecret: true,
  },

  ...(ENABLE_EXPANSION
    ? ([
        // ── Mid-Game Branch 1: The Census of Small Names (Chapter 3) ─────────
        {
          id: 'ending_mb1_chalk_and_ash',
          title: 'Chalk and Ash',
          type: 'sacrifice',
          subtitle: 'Branch 1 — The Census of Small Names',
          description:
            "You jammed the cast-iron sluice wheel in the dry gallery while Mael led thirty-two children under the weir. Two days later, in a dry pipe under Sector Seven, Talla writes a four-hundred-and-thirteenth name at the top of the yellow chalk column.",
          color: '#c9a84c',
          hint: 'Protect the oilcloth census in Chapter 3, draw Sergeant Krell into the dry gallery, and hold the sluice wheel until the line clears.',
          chapter: 'Chapter 3',
        },
        {
          id: 'ending_mb1_price_of_a_name',
          title: 'The Price of a Name',
          type: 'betrayal',
          subtitle: 'Branch 1 — The Census of Small Names',
          description:
            "You traded Mael's stitched oilcloth census to Sergeant Krell for a warm billet above the grate and Commander Varr's counter-signature in red ink. Your stove has coal all winter, though the yellow chalk dust never quite washes out from under your fingernails.",
          color: '#8e1c1c',
          hint: 'Sell the oilcloth census to Sergeant Krell at the east grate and accept his permanent billet in the Ration Registry.',
          chapter: 'Chapter 3',
        },

        // ── Mid-Game Branch 2: Velna's Trail (Chapter 6) ─────────────────────
        {
          id: 'ending_mb2_static_hymn',
          title: 'Static Hymn',
          type: 'corruption',
          subtitle: "Branch 2 — Velna's Trail",
          description:
            'In Survey Camp Nine below Sluice 19, you opened the receiver gain all the way and locked your transmitter key closed. Months later, Red Choir operators hear two voices braided together forty kilohertz below their evening liturgy—reading rock densities and keeping the line open.',
          color: '#6c3483',
          hint: "Follow Velna's twin-lead wire in Chapter 6, open the deep receiver gain, and stay on the carrier line.",
          chapter: 'Chapter 6',
        },
        {
          id: 'ending_mb2_left_the_light_on',
          title: 'Left the Light On',
          type: 'wanderer',
          subtitle: "Branch 2 — Velna's Trail",
          description:
            "You followed Velna's second copper chart down four miles of dry brick aqueduct past the city boundary into the clean rain of the western valley—leaving her trickle-charged orange lantern burning on its hook for anyone else who decides the city has taken enough.",
          color: '#7f8c8d',
          hint: "Discover the western inspection hatch in Velna's survey camp and walk out through the dry aqueduct.",
          chapter: 'Chapter 6',
        },

        // ── Mid-Game Branch 3: The Grain Ledger (Chapter 8) ──────────────────
        {
          id: 'ending_mb3_full_bellies_empty_streets',
          title: 'Full Bellies, Empty Streets',
          type: 'faction',
          subtitle: 'Branch 3 — The Grain Ledger',
          description:
            'You locked the master allocation card into the Junction Twelve scale-loom for your chosen faction and sealed the lower Warrens blast doors. By the third week of winter, the barracks smell of fresh soup and the lower corridors are spotless and completely silent.',
          color: '#2c3e50',
          hint: 'Route the full forty-ton grain reserve to the Iron Saints or Glass Court at Junction Twelve and enforce the closure.',
          chapter: 'Chapter 8',
        },
        {
          id: 'ending_mb3_bread_riot',
          title: 'The Bread Riot',
          type: 'death',
          subtitle: 'Branch 3 — The Grain Ledger',
          description:
            'When the dumped silo chutes threw up a blinding wall of suspended wheat dust, a single rifle flash ignited the dock. The four-second flash fire left warm roasted grain drifted like golden snow—and the two Warrens runners you shielded scrambling safely under the turnstile.',
          color: '#8e1c1c',
          hint: 'Smash the brass pin-reader at Junction Twelve and leap down to shield the Warrens runners when the flour dust ignites.',
          chapter: 'Chapter 8',
        },
        {
          id: 'ending_mb3_nobody_starves_tonight',
          title: 'Nobody Starves Tonight',
          type: 'savior',
          subtitle: 'Branch 3 — The Grain Ledger',
          description:
            'Through three razor-thin checks—punching the staggered four-gate plate, freeing the Belt D clutch over a thirty-foot drop, and calling the tonnage truce from the weigh-house horn—all four conveyors ran at midnight without a single shot fired.',
          color: '#27ae60',
          hint: 'Succeed on all three consecutive skill checks (Intelligence, Agility, Charisma) at the Junction Twelve scale-hopper and accept the joint warrant as Steward of the Scales.',
          chapter: 'Chapter 8',
          isSecret: true,
        },

        // ── Mid-Game Branch 4: The Last Broadcast (Chapter 10) ───────────────
        {
          id: 'ending_mb4_every_radio_in_the_city',
          title: 'Every Radio in the City',
          type: 'secret',
          subtitle: 'Branch 4 — The Last Broadcast',
          description:
            "You held the civil-defense mast on Sector 10 Ridge while Director Kael's original wax cylinder played across fifty kilowatts of night air. By noon, checkpoints unbolt their turnstiles and a city without lies tries to figure out how to survive the afternoon.",
          color: '#c9a84c',
          hint: "Defend the antenna feed in Studio B until Kael's wax cylinder airs and wire it to repeat on an endless loop.",
          chapter: 'Chapter 10',
          isSecret: true,
        },
        {
          id: 'ending_mb4_voice_of_the_crown',
          title: 'The Voice of the Crown',
          type: 'tyrant',
          subtitle: 'Branch 4 — The Last Broadcast',
          description:
            'You crushed the amber wax cylinder, bolted Studio B from the inside, and took the fifty-kilowatt microphone for yourself. Every evening at six, eighty thousand people stop with their spoons halfway to their mouths to hear which sectors have earned water pressure for the night.',
          color: '#c0392b',
          hint: 'Smash the wax cylinder in Studio B, seize the fifty-kilowatt transmitter, and make the signal tower your throne.',
          chapter: 'Chapter 10',
        },
        {
          id: 'ending_mb4_off_the_air',
          title: 'Off the Air',
          type: 'companion',
          subtitle: 'Branch 4 — The Last Broadcast',
          description:
            'You pulled the master knife-switch on the mercury-arc rectifiers, letting the strike teams withdraw down the ridge. Sixty feet above the sleet on the sheltered east balcony, two people sit by a coal brazier listening to nothing louder than the kettle coming to a boil.',
          color: '#e67e22',
          hint: 'Cut the mercury-arc power before the mortar crews range the roof and stay on the sheltered balcony with your companion.',
          chapter: 'Chapter 10',
        },

        // ── Epilogue: The Response (Post-FC2) ────────────────────────────────
        {
          id: 'ending_epilogue_yes_were_here',
          title: "Yes, We're Here",
          type: 'savior',
          subtitle: 'Epilogue — The Response',
          description:
            'In the Answer Chamber beneath Sub-Level 16, you pressed your palm to the mercury bridge with Mira, Cain, and Velna beside you—sending a bounded human reply. Across the city above, the surviving copper bus bars warm by three degrees at a voltage human wire can carry.',
          color: '#27ae60',
          hint: 'Reach the Answer Chamber in the Epilogue and send the honest, bounded human signal: "Yes, We\'re Here."',
          chapter: 'Epilogue',
        },
        {
          id: 'ending_epilogue_no_one_is_left',
          title: 'No One Is Left',
          type: 'sacrifice',
          subtitle: 'Epilogue — The Response',
          description:
            'You inverted the phase on Velna\'s oscillator and sent a dead-line termination code down the shaft. Every relic shard in the city cooled to ordinary slate and your wrist mark grounded out into a pale white scar—leaving humanity to rebuild with coal and iron, completely free.',
          color: '#e67e22',
          hint: 'Send the phase-inverted dead-line termination packet in the Answer Chamber so the deep structure seals itself forever.',
          chapter: 'Epilogue',
        },
        {
          id: 'ending_epilogue_velna_answers',
          title: 'Velna Answers',
          type: 'companion',
          subtitle: 'Epilogue — The Response',
          description:
            'You held the outer resistor bus for eleven seconds while Velna poured eighteen hundred days of recorded human notes, weather tables, and Warrens names into the stone. Her voice was left in the rock, but she sits by the window of Mira\'s surface clinic watching the snow melt off quiet roofs.',
          color: '#e67e22',
          hint: 'Hold the outer bridge in the Answer Chamber and let Velna transmit her five-year Archive record.',
          chapter: 'Epilogue',
        },
        {
          id: 'ending_epilogue_second_question',
          title: 'The Second Question',
          type: 'secret',
          subtitle: 'Epilogue — The Response',
          description:
            'Instead of answering the compliance check, you keyed the Last Archive Founders\' counterfactual query back down the line. Seventeen seconds later, the mercury parted into a pre-glacial continental map showing Station Seven of twenty—and the other nineteen stations just heard you pick up the line.',
          color: '#c9a84c',
          hint: 'With Intelligence ≥ 13, key the Archive Founders\' diagnostic query into the Answer Chamber terminal.',
          chapter: 'Epilogue',
          isSecret: true,
        },
        {
          id: 'ending_epilogue_mark_goes_quiet',
          title: 'The Mark Goes Quiet',
          type: 'wanderer',
          subtitle: 'Epilogue — The Response',
          description:
            'You drove the bronze grounding bar straight through the mercury bridge, dropping forty feet of dry basalt counterweights across the Sub-Level 16 shaft without sending a reply. By the top of the spiral stair, your left wrist is just skin again—beating only at the speed of your own heart.',
          color: '#7f8c8d',
          hint: 'Throw the manual bronze shunt bar in the Answer Chamber to sever the secondary conductors without replying.',
          chapter: 'Epilogue',
        },
        {
          id: 'ending_epilogue_chorus',
          title: 'Chorus',
          type: 'corruption',
          subtitle: 'Epilogue — The Response',
          description:
            'With the signal lattice fully awake in your nerves, you stepped into the mineral pool under the basalt pipes and closed the forty-one-hour interval forever. Up in the metro tunnels, the horn speakers stop hissing static and hum a warm, steady fifth that keeps the frost off the rails all winter.',
          color: '#6c3483',
          hint: 'Reach the Answer Chamber with Corruption ≥ 80 and step into the mercury channel to become the permanent carrier.',
          chapter: 'Epilogue',
          isSecret: true,
        },
      ] as EndingDefinition[])
    : []),
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getEndingById(id: string): EndingDefinition | undefined {
  return ENDINGS.find((e) => e.id === id);
}

export function getEndingsByCategory(categoryId: string): EndingDefinition[] {
  const cat = ENDING_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return [];
  return ENDINGS.filter((e) => cat.types.includes(e.type));
}

export function getCategoryForEnding(ending: EndingDefinition): EndingCategory | undefined {
  return ENDING_CATEGORIES.find((c) => c.types.includes(ending.type));
}
