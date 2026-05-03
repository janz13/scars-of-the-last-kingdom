import type { DiceCheck, DiceType, DiceStat, GameState, ChoiceEffects } from '../data/types';

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

// Map a 0–100 stat value to a D&D-style modifier (−4 to +5)
export function getStatModifier(statValue: number): number {
  if (statValue <= 10) return -4;
  if (statValue <= 20) return -3;
  if (statValue <= 30) return -2;
  if (statValue <= 40) return -1;
  if (statValue <= 55) return 0;
  if (statValue <= 65) return 1;
  if (statValue <= 75) return 2;
  if (statValue <= 85) return 3;
  return 4;
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

export function resolveDiceCheck(
  state: GameState,
  diceCheck: DiceCheck,
  forcedRoll?: number,
  luckRerollUsed?: boolean,
): DiceResult {
  const sides = diceSides(diceCheck.diceType);
  const roll = forcedRoll ?? rollDie(sides);
  const statValue = state.stats[diceCheck.stat] ?? 50;
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
  return state.stats.luck >= 60 && !state.flags['dice_reroll_used'];
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
