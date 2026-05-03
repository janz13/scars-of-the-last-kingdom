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
