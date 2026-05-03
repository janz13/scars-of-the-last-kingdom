import type { EndingType } from './types';

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
