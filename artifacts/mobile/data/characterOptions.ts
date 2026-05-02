import type { BackgroundId, ClassId, PersonalityTrait, Stats, Inventory } from './types';

export interface BackgroundOption {
  id: BackgroundId;
  name: string;
  description: string;
  bonus: string;
  statModifiers: Partial<Stats>;
}

export interface ClassOption {
  id: ClassId;
  name: string;
  description: string;
  playstyle: string;
  statBase: Partial<Stats>;
  startingInventory: Partial<Inventory>;
}

export interface PersonalityOption {
  id: PersonalityTrait;
  name: string;
  description: string;
  effect: string;
}

export const BACKGROUNDS: BackgroundOption[] = [
  {
    id: 'wasteland_orphan',
    name: 'Wasteland Orphan',
    description: 'Grew up outside the city walls. You know hunger, cold, and how to disappear.',
    bonus: '+1 Agility, +1 Luck. Start with extra food.',
    statModifiers: { agility: 1, luck: 1 },
  },
  {
    id: 'fallen_noble',
    name: 'Fallen Noble',
    description: 'Once lived in the towers. The collapse stripped everything. Now you use your knowledge of the powerful.',
    bonus: '+2 Charisma. Glass Court reputation starts higher.',
    statModifiers: { charisma: 2 },
  },
  {
    id: 'underground_medic',
    name: 'Underground Medic',
    description: 'You treated the forgotten and the hunted before the lights went out.',
    bonus: '+2 Intelligence. Start with extra medicine.',
    statModifiers: { intelligence: 2 },
  },
  {
    id: 'exiled_soldier',
    name: 'Exiled Soldier',
    description: 'Dishonorably discharged. You know how Iron Saints think — and how to avoid them.',
    bonus: '+2 Strength. Iron Saints reputation starts lower, but you recognize their tactics.',
    statModifiers: { strength: 2 },
  },
  {
    id: 'black_market_courier',
    name: 'Black Market Courier',
    description: 'You moved things that shouldn\'t be moved to places that shouldn\'t exist.',
    bonus: '+1 Agility, +1 Charisma. Hollow Children reputation starts higher.',
    statModifiers: { agility: 1, charisma: 1 },
  },
  {
    id: 'forgotten_scholar',
    name: 'Forgotten Scholar',
    description: 'You studied the relics before anyone admitted they were dangerous.',
    bonus: '+2 Intelligence. Last Archive reputation starts higher. Can read relic symbols.',
    statModifiers: { intelligence: 2 },
  },
  {
    id: 'runaway_experiment',
    name: 'Runaway Experiment',
    description: 'You were part of a program you barely understand. The mark may have been put there deliberately.',
    bonus: '+2 Intelligence, -1 Charisma. Starts with higher Corruption but better Relic affinity.',
    statModifiers: { intelligence: 2, charisma: -1, corruption: 2 },
  },
];

export const CLASSES: ClassOption[] = [
  {
    id: 'blade_survivor',
    name: 'Blade Survivor',
    description: 'You fight with whatever\'s at hand. You\'ve learned that close is safer than far.',
    playstyle: 'High Strength. Best at direct confrontation and survival.',
    statBase: { maxHealth: 100, health: 100, strength: 8, agility: 5, intelligence: 4, charisma: 4, luck: 5, corruption: 0 },
    startingInventory: { food: 1, water: 1, medicine: 0, scrap: 2, ammo: 0, relics: 0, reputation: 0 },
  },
  {
    id: 'gun_scavenger',
    name: 'Gun Scavenger',
    description: 'Distance is life. You keep your options and your exits open.',
    playstyle: 'High Agility and Luck. Best at ranged options and scavenging.',
    statBase: { maxHealth: 85, health: 85, strength: 5, agility: 8, intelligence: 4, charisma: 4, luck: 7, corruption: 0 },
    startingInventory: { food: 1, water: 1, medicine: 0, scrap: 1, ammo: 3, relics: 0, reputation: 0 },
  },
  {
    id: 'medic',
    name: 'Medic',
    description: 'You keep people alive. Including yourself — sometimes.',
    playstyle: 'High Intelligence and Charisma. Best at healing and faction relations.',
    statBase: { maxHealth: 90, health: 90, strength: 4, agility: 5, intelligence: 8, charisma: 6, luck: 4, corruption: 0 },
    startingInventory: { food: 1, water: 2, medicine: 3, scrap: 0, ammo: 0, relics: 0, reputation: 0 },
  },
  {
    id: 'tactician',
    name: 'Tactician',
    description: 'You read situations before they happen. Preparation is your only armor.',
    playstyle: 'Balanced with high Charisma. Best at negotiation and planning.',
    statBase: { maxHealth: 80, health: 80, strength: 5, agility: 5, intelligence: 7, charisma: 8, luck: 4, corruption: 0 },
    startingInventory: { food: 2, water: 2, medicine: 1, scrap: 1, ammo: 1, relics: 0, reputation: 0 },
  },
  {
    id: 'relic_hunter',
    name: 'Relic Hunter',
    description: 'You\'ve always been drawn to the old machines. They respond to you.',
    playstyle: 'High Intelligence and Luck. Best with relics and Archive content. Starts with Corruption.',
    statBase: { maxHealth: 75, health: 75, strength: 4, agility: 6, intelligence: 8, charisma: 5, luck: 6, corruption: 2 },
    startingInventory: { food: 1, water: 1, medicine: 1, scrap: 2, ammo: 0, relics: 1, reputation: 0 },
  },
  {
    id: 'shadow_broker',
    name: 'Shadow Broker',
    description: 'Information is currency. You sell it carefully and buy loyalty cheaper.',
    playstyle: 'High Agility and Charisma. Best at stealth, secrets, and faction manipulation.',
    statBase: { maxHealth: 85, health: 85, strength: 5, agility: 8, intelligence: 6, charisma: 7, luck: 5, corruption: 0 },
    startingInventory: { food: 1, water: 1, medicine: 1, scrap: 3, ammo: 1, relics: 0, reputation: 0 },
  },
  {
    id: 'esper',
    name: 'Esper / Psychic Mutant',
    description: 'The mark chose you before the blackout. You have been hearing it for years.',
    playstyle: 'Highest Intelligence. Unique relic interactions. High starting Corruption. High risk, high power.',
    statBase: { maxHealth: 70, health: 70, strength: 3, agility: 5, intelligence: 9, charisma: 5, luck: 6, corruption: 5 },
    startingInventory: { food: 0, water: 1, medicine: 0, scrap: 1, ammo: 0, relics: 2, reputation: 0 },
  },
];

export const PERSONALITY_TRAITS: PersonalityOption[] = [
  {
    id: 'pragmatic',
    name: 'Pragmatic',
    description: 'You do what works. Morality is a luxury.',
    effect: '+1 to all resource-finding choices. -1 Morale when choosing self-sacrifice options.',
  },
  {
    id: 'empathetic',
    name: 'Empathetic',
    description: 'You feel what others feel. That is your strength and your wound.',
    effect: '+2 Companion Trust gains. -1 Morale from abandoning NPCs.',
  },
  {
    id: 'cold',
    name: 'Cold',
    description: 'You removed emotion from your decision-making. It hurt, and then it didn\'t.',
    effect: 'Immune to morale penalties from witnessing deaths. -1 Trust with all companions.',
  },
  {
    id: 'reckless',
    name: 'Reckless',
    description: 'You move before you think. Sometimes that\'s exactly what\'s needed.',
    effect: '+1 Agility to all combat-adjacent checks. -1 Intelligence to planning checks.',
  },
  {
    id: 'calculating',
    name: 'Calculating',
    description: 'You model outcomes before acting. The world is math.',
    effect: '+1 to all stat checks that require a minimum. Choices always show requirement thresholds.',
  },
  {
    id: 'faithful',
    name: 'Faithful',
    description: 'You believe in something. Whatever the blackout destroyed, it didn\'t take that.',
    effect: '+2 Iron Saints reputation if cooperating. Unique dialogue with the Red Choir.',
  },
  {
    id: 'cynical',
    name: 'Cynical',
    description: 'You expected this. The world confirmed what you always suspected.',
    effect: '+1 Luck on all scavenging. -1 to Charisma-based choices involving optimism.',
  },
];

export const DEFAULT_STATS: Stats = {
  health: 80,
  maxHealth: 80,
  hunger: 100,
  thirst: 100,
  morale: 70,
  trust: 50,
  strength: 5,
  intelligence: 5,
  agility: 5,
  charisma: 5,
  luck: 5,
  corruption: 0,
};

export const DEFAULT_INVENTORY: Inventory = {
  food: 1,
  water: 1,
  medicine: 0,
  scrap: 0,
  ammo: 0,
  relics: 0,
  reputation: 0,
};

export function buildStartingStats(
  characterClass: ClassId,
  background: BackgroundId,
  startingCompanion: string
): { stats: Stats; inventory: Inventory } {
  const classOpt = CLASSES.find((c) => c.id === characterClass);
  const bgOpt = BACKGROUNDS.find((b) => b.id === background);

  const baseStats: Stats = {
    ...DEFAULT_STATS,
    ...(classOpt?.statBase || {}),
    hunger: 100,
    thirst: 100,
    morale: 70,
    trust: 50,
  };

  if (bgOpt?.statModifiers) {
    for (const [key, val] of Object.entries(bgOpt.statModifiers)) {
      const k = key as keyof Stats;
      if (k in baseStats) {
        (baseStats as Record<string, number>)[k] = ((baseStats as Record<string, number>)[k] || 0) + (val as number);
      }
    }
  }

  baseStats.health = Math.min(baseStats.health, baseStats.maxHealth);
  baseStats.corruption = Math.max(0, baseStats.corruption);

  const inventory: Inventory = {
    ...DEFAULT_INVENTORY,
    ...(classOpt?.startingInventory || {}),
  };

  if (background === 'wasteland_orphan') inventory.food += 1;
  if (background === 'underground_medic') inventory.medicine += 2;

  return { stats: baseStats, inventory };
}
