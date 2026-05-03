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
