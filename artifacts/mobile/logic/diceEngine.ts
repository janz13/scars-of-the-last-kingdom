import type { DiceCheck, DiceType, DiceStat, GameState, ChoiceEffects } from '../data/types';
import { BACKGROUNDS, CLASSES, PERSONALITY_TRAITS } from '../data/characterOptions';

export type DiceOutcome = 'criticalSuccess' | 'success' | 'failure' | 'criticalFailure';

export interface DiceResult {
  diceType: DiceType;
  roll: number;
  modifier: number;
  total: number;
  difficulty: number;
  outcome: DiceOutcome;
  stat: DiceStat;
  statValue: number;
  nextNodeId: string;
  effects?: ChoiceEffects;
  luckRerollUsed?: boolean;
}

export interface DiceOddsPreview {
  stat: DiceStat;
  statLabel: string;
  statFull: string;
  diceType: DiceType;
  difficulty: number;
  effectiveStat: number;
  modifier: number;
  modifierFormatted: string;
  successPct: number;
  hasLuckReroll: boolean;
}

export interface StatBreakdown {
  stat: DiceStat;
  statLabel: string;
  statFull: string;
  classBase: number;
  bgBonus: number;
  bgName: string | null;
  runtimeDelta: number;
  traitBonus: number;
  traitName: string | null;
  storedValue: number;
  effectiveStat: number;
  modifier: number;
  modifierFormatted: string;
}

export function getEffectiveStat(state: GameState, stat: DiceStat): number {
  const effectiveStat = state.stats?.[stat] ?? 5;
  const trait = state.character?.personalityTrait;
  let traitBonus = 0;
  if (trait === 'calculating') traitBonus += 1;
  if (trait === 'reckless' && stat === 'agility') traitBonus += 1;
  if (trait === 'cynical' && stat === 'luck') traitBonus += 1;
  return effectiveStat + traitBonus;
}

/**
 * Maps a character attribute (calibrated to the 3–15+ scale) to a D20 modifier (-3 to +4).
 * Ensures starting average/hybrid values (5-6) sit at neutral +0, while specialized builds gain +1 to +3.
 */
export function getStatModifier(statValue: number): number {
  if (statValue <= 2) return -3;
  if (statValue <= 3) return -2;
  if (statValue <= 4) return -1;
  if (statValue <= 6) return 0;
  if (statValue <= 8) return 1;
  if (statValue <= 10) return 2;
  if (statValue <= 14) return 3;
  return 4;
}

export function formatStatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function diceSides(diceType: DiceType): number {
  return parseInt(diceType.slice(1), 10);
}

export const DICE_STAT_LABELS: Record<DiceStat, string> = {
  strength: 'STR',
  intelligence: 'INT',
  agility: 'AGI',
  charisma: 'CHA',
  luck: 'LCK',
};

export const DICE_STAT_FULL: Record<DiceStat, string> = {
  strength: 'Strength',
  intelligence: 'Intelligence',
  agility: 'Agility',
  charisma: 'Charisma',
  luck: 'Luck',
};

export type { DiceCheck };

export function getStatBreakdown(state: GameState, stat: DiceStat): StatBreakdown {
  const storedValue = state.stats?.[stat] ?? 5;
  const char = state.character;
  const classOpt = char ? CLASSES.find((c) => c.id === char.characterClass) : undefined;
  const bgOpt = char ? BACKGROUNDS.find((b) => b.id === char.background) : undefined;
  const traitOpt = char ? PERSONALITY_TRAITS.find((t) => t.id === char.personalityTrait) : undefined;

  const classBase = classOpt?.statBase?.[stat] ?? 5;
  const bgBonus = bgOpt?.statModifiers?.[stat] ?? 0;
  const startingExpected = classBase + bgBonus;
  const runtimeDelta = char ? storedValue - startingExpected : 0;

  let traitBonus = 0;
  const trait = char?.personalityTrait;
  if (trait === 'calculating') traitBonus += 1;
  if (trait === 'reckless' && stat === 'agility') traitBonus += 1;
  if (trait === 'cynical' && stat === 'luck') traitBonus += 1;

  const effectiveStat = getEffectiveStat(state, stat);
  const modifier = getStatModifier(effectiveStat);

  return {
    stat,
    statLabel: DICE_STAT_LABELS[stat],
    statFull: DICE_STAT_FULL[stat],
    classBase,
    bgBonus,
    bgName: bgOpt?.name ?? null,
    runtimeDelta,
    traitBonus,
    traitName: traitOpt?.name ?? null,
    storedValue,
    effectiveStat,
    modifier,
    modifierFormatted: formatStatModifier(modifier),
  };
}

export function getDiceOddsPreview(state: GameState, diceCheck: DiceCheck): DiceOddsPreview {
  const sides = diceSides(diceCheck.diceType);
  const effectiveStat = getEffectiveStat(state, diceCheck.stat);
  const modifier = getStatModifier(effectiveStat);

  let winningFaces = 0;
  for (let face = 1; face <= sides; face++) {
    if (diceCheck.diceType === 'd20' && face === 20) {
      winningFaces++;
    } else if (diceCheck.diceType === 'd20' && face === 1) {
      // natural 1 always critically fails
    } else if (face + modifier >= diceCheck.difficulty) {
      winningFaces++;
    }
  }

  return {
    stat: diceCheck.stat,
    statLabel: DICE_STAT_LABELS[diceCheck.stat],
    statFull: DICE_STAT_FULL[diceCheck.stat],
    diceType: diceCheck.diceType,
    difficulty: diceCheck.difficulty,
    effectiveStat,
    modifier,
    modifierFormatted: formatStatModifier(modifier),
    successPct: Math.round((winningFaces / Math.max(1, sides)) * 100),
    hasLuckReroll: canUseLuckReroll(state),
  };
}

export function resolveDiceCheck(
  state: GameState,
  diceCheck: DiceCheck,
  forcedRoll?: number,
  luckRerollUsed?: boolean,
): DiceResult {
  const sides = diceSides(diceCheck.diceType);
  const roll = forcedRoll ?? rollDie(sides);
  const statValue = getEffectiveStat(state, diceCheck.stat);
  const modifier = getStatModifier(statValue);
  const total = roll + modifier;

  const isNatMax = diceCheck.diceType === 'd20' && roll === 20;
  const isNatOne = diceCheck.diceType === 'd20' && roll === 1;

  let outcome: DiceOutcome;
  if (isNatMax) outcome = 'criticalSuccess';
  else if (isNatOne) outcome = 'criticalFailure';
  else if (total >= diceCheck.difficulty) outcome = 'success';
  else outcome = 'failure';

  let nextNodeId: string;
  let effects: ChoiceEffects | undefined;

  switch (outcome) {
    case 'criticalSuccess':
      nextNodeId = diceCheck.criticalSuccessNode ?? diceCheck.successNode;
      effects = diceCheck.criticalSuccessEffects ?? diceCheck.successEffects;
      break;
    case 'success':
      nextNodeId = diceCheck.successNode;
      effects = diceCheck.successEffects;
      break;
    case 'failure':
      nextNodeId = diceCheck.failureNode;
      effects = diceCheck.failureEffects;
      break;
    case 'criticalFailure':
      nextNodeId = diceCheck.criticalFailureNode ?? diceCheck.failureNode;
      effects = diceCheck.criticalFailureEffects ?? diceCheck.failureEffects;
      break;
  }

  return {
    diceType: diceCheck.diceType,
    roll,
    modifier,
    total,
    difficulty: diceCheck.difficulty,
    outcome,
    stat: diceCheck.stat,
    statValue,
    nextNodeId,
    effects,
    luckRerollUsed,
  };
}

export function canUseLuckReroll(state: GameState): boolean {
  return getEffectiveStat(state, 'luck') >= 7 && !state.flags?.['dice_reroll_used'];
}

export function outcomeLabel(outcome: DiceOutcome): string {
  switch (outcome) {
    case 'criticalSuccess': return 'CRITICAL SUCCESS';
    case 'success': return 'SUCCESS';
    case 'failure': return 'FAILURE';
    case 'criticalFailure': return 'CRITICAL FAILURE';
  }
}

export function outcomeColor(outcome: DiceOutcome): string {
  switch (outcome) {
    case 'criticalSuccess': return '#f1c40f';
    case 'success': return '#2ecc71';
    case 'failure': return '#e67e22';
    case 'criticalFailure': return '#e74c3c';
  }
}
