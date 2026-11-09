import type { GameState, Choice, ChoiceEffects, ChoiceRequirements, Stats, Inventory, FactionRep } from '../data/types';
import { getNodeById } from '../data/storyNodes';
import { evaluateConditionalEnding } from '../data/conditionalEndings';

// ─── HOW TO ADD NEW STAT REQUIREMENTS ─────────────────────────────────────
// Add a new field to ChoiceRequirements in data/types.ts
// Then handle it in checkRequirements() below
// ──────────────────────────────────────────────────────────────────────────

export interface RequirementResult {
  met: boolean;
  reasons: string[];
}

// ─── Survival warning types ────────────────────────────────────────────────

export type SurvivalWarningSeverity = 'critical' | 'warning' | 'info';
export type SurvivalWarningType =
  | 'hunger'
  | 'thirst'
  | 'health'
  | 'morale'
  | 'corruption'
  | 'companion'
  | 'supplies';

export interface SurvivalWarning {
  message: string;
  severity: SurvivalWarningSeverity;
  type: SurvivalWarningType;
}

// ─── Hallucination node pool ───────────────────────────────────────────────

const HALLUCINATION_NODES = [
  'halluc_mark_speaks',
  'halluc_the_dead_speak',
  'halluc_throne_vision',
] as const;

// ─── Stat / inventory name maps ────────────────────────────────────────────

const STAT_NAMES: Partial<Record<keyof Stats, string>> = {
  health: 'Health',
  hunger: 'Hunger',
  thirst: 'Thirst',
  morale: 'Morale',
  trust: 'Trust',
  strength: 'Strength',
  intelligence: 'Intelligence',
  agility: 'Agility',
  charisma: 'Charisma',
  luck: 'Luck',
  corruption: 'Corruption',
};

const INV_NAMES: Partial<Record<keyof Inventory, string>> = {
  food: 'Food',
  water: 'Water',
  medicine: 'Medicine',
  scrap: 'Scrap',
  ammo: 'Ammo',
  relics: 'Relics',
  reputation: 'Reputation',
};

// ─── checkRequirements ────────────────────────────────────────────────────

export function checkRequirements(state: GameState, req?: ChoiceRequirements): RequirementResult {
  if (!req) return { met: true, reasons: [] };

  const reasons: string[] = [];

  // Stat minimums
  const statKeys: (keyof Stats)[] = ['health', 'hunger', 'thirst', 'morale', 'trust', 'strength', 'intelligence', 'agility', 'charisma', 'luck', 'corruption'];
  for (const key of statKeys) {
    const required = req[key as keyof ChoiceRequirements] as number | undefined;
    if (required !== undefined && state.stats[key] < required) {
      reasons.push(`Requires ${STAT_NAMES[key] ?? key} ${required} (you have ${state.stats[key]})`);
    }
  }

  // Max corruption — blocked if corruption is too high (emotional/compassionate choices)
  if (req.maxCorruption !== undefined && state.stats.corruption >= req.maxCorruption) {
    reasons.push(`The mark distorts this impulse (corruption too high)`);
  }

  // Max morale — blocked when morale is above threshold (desperate choices only available when broken)
  if (req.maxMorale !== undefined && state.stats.morale >= req.maxMorale) {
    reasons.push(`You have not yet reached that point of desperation`);
  }

  // Inventory minimums
  const invKeys: (keyof Inventory)[] = ['food', 'water', 'medicine', 'scrap', 'ammo', 'relics', 'reputation'];
  for (const key of invKeys) {
    const required = req[key as keyof ChoiceRequirements] as number | undefined;
    if (required !== undefined && state.inventory[key] < required) {
      reasons.push(`Requires ${INV_NAMES[key] ?? key} ${required} (you have ${state.inventory[key]})`);
    }
  }

  // Required flags (all must be set)
  if (req.flags) {
    for (const flag of req.flags) {
      if (!state.flags[flag]) {
        reasons.push(`Missing required condition`);
      }
    }
  }

  // Blocked flags (none must be set)
  if (req.blockedFlags) {
    for (const flag of req.blockedFlags) {
      if (state.flags[flag]) {
        reasons.push(`Already completed`);
      }
    }
  }

  // Class restrictions
  if (req.classes && state.character) {
    if (!req.classes.includes(state.character.characterClass)) {
      reasons.push(`Requires class: ${req.classes.join(' or ')}`);
    }
  }

  // Background restrictions
  if (req.backgrounds && state.character) {
    if (!req.backgrounds.includes(state.character.background)) {
      reasons.push(`Requires background: ${req.backgrounds.join(' or ')}`);
    }
  }

  // Companion trust minimums
  if (req.miraTrust !== undefined && state.companions.mira.trust < req.miraTrust) {
    reasons.push(`Requires Mira Trust ${req.miraTrust} (you have ${state.companions.mira.trust})`);
  }
  if (req.cainTrust !== undefined && state.companions.cain.trust < req.cainTrust) {
    reasons.push(`Requires Cain Trust ${req.cainTrust} (you have ${state.companions.cain.trust})`);
  }

  // Companion presence
  if (req.miraPresent && !state.companions.mira.present) {
    reasons.push(`Mira must be with you`);
  }
  if (req.cainPresent && !state.companions.cain.present) {
    reasons.push(`Cain must be with you`);
  }

  // Faction reputation minimums
  if (req.factionRep) {
    for (const [key, required] of Object.entries(req.factionRep)) {
      const k = key as keyof FactionRep;
      if (required !== undefined && state.factionRep[k] < required) {
        reasons.push(`Insufficient faction standing`);
      }
    }
  }

  return { met: reasons.length === 0, reasons };
}

// ─── clamp helper ─────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// ─── applyEffects ─────────────────────────────────────────────────────────

export function applyEffects(state: GameState, effects?: ChoiceEffects): GameState {
  if (!effects) return state;

  let { stats, inventory, companions, factionRep, flags } = state;

  // Apply stat deltas
  const newStats = { ...stats };
  const statEffectKeys: (keyof ChoiceEffects & keyof Stats)[] = ['health', 'hunger', 'thirst', 'morale', 'trust', 'strength', 'intelligence', 'agility', 'charisma', 'luck', 'corruption'];

  for (const key of statEffectKeys) {
    const delta = effects[key] as number | undefined;
    if (delta !== undefined) {
      const current = newStats[key];
      newStats[key] = current + delta;
    }
  }

  // Clamp survival stats
  newStats.health = clamp(newStats.health, 0, newStats.maxHealth);
  newStats.hunger = clamp(newStats.hunger, 0, 100);
  newStats.thirst = clamp(newStats.thirst, 0, 100);
  newStats.morale = clamp(newStats.morale, 0, 100);
  newStats.corruption = clamp(newStats.corruption, 0, 100);
  newStats.strength = Math.max(1, newStats.strength);
  newStats.intelligence = Math.max(1, newStats.intelligence);
  newStats.agility = Math.max(1, newStats.agility);
  newStats.charisma = Math.max(1, newStats.charisma);
  newStats.luck = Math.max(1, newStats.luck);

  // Apply inventory deltas
  const newInventory = { ...inventory };
  const invEffectKeys: (keyof ChoiceEffects & keyof Inventory)[] = ['food', 'water', 'medicine', 'scrap', 'ammo', 'relics', 'reputation'];

  for (const key of invEffectKeys) {
    const delta = effects[key] as number | undefined;
    if (delta !== undefined) {
      newInventory[key] = Math.max(0, newInventory[key] + delta);
    }
  }

  // Apply companion trust
  const newCompanions = {
    mira: { ...companions.mira },
    cain: { ...companions.cain },
  };

  if (effects.miraTrust !== undefined) {
    newCompanions.mira.trust = clamp(newCompanions.mira.trust + effects.miraTrust, 0, 10);
  }
  if (effects.cainTrust !== undefined) {
    newCompanions.cain.trust = clamp(newCompanions.cain.trust + effects.cainTrust, 0, 10);
  }

  // Companion presence flags
  const newFlags = { ...flags };
  if (newFlags['mira_joins_party']) newCompanions.mira.present = true;
  if (newFlags['cain_joins_party']) newCompanions.cain.present = true;

  // Apply faction rep deltas
  const newFactionRep = { ...factionRep };
  if (effects.ironSaints !== undefined) newFactionRep.ironSaints = clamp(newFactionRep.ironSaints + effects.ironSaints, -100, 100);
  if (effects.glassCourt !== undefined) newFactionRep.glassCourt = clamp(newFactionRep.glassCourt + effects.glassCourt, -100, 100);
  if (effects.hollowChildren !== undefined) newFactionRep.hollowChildren = clamp(newFactionRep.hollowChildren + effects.hollowChildren, -100, 100);
  if (effects.redChoir !== undefined) newFactionRep.redChoir = clamp(newFactionRep.redChoir + effects.redChoir, -100, 100);
  if (effects.lastArchive !== undefined) newFactionRep.lastArchive = clamp(newFactionRep.lastArchive + effects.lastArchive, -100, 100);

  // Apply flags
  if (effects.setFlags) {
    for (const flag of effects.setFlags) {
      newFlags[flag] = true;
    }
  }
  if (effects.removeFlags) {
    for (const flag of effects.removeFlags) {
      delete newFlags[flag];
    }
  }

  // Sync companion presence after flags
  if (newFlags['mira_joins_party']) newCompanions.mira.present = true;
  if (newFlags['cain_joins_party']) newCompanions.cain.present = true;
  if (newFlags['mira_sacrificed']) { newCompanions.mira.present = false; newCompanions.mira.alive = false; }

  return {
    ...state,
    stats: newStats,
    inventory: newInventory,
    companions: newCompanions,
    factionRep: newFactionRep,
    flags: newFlags,
  };
}

// ─── runSurvivalTick ──────────────────────────────────────────────────────
//
// Called every time the player enters a new story node. Applies passive
// health and morale penalties when hunger, thirst, or morale are critically
// low. Does NOT drain hunger/thirst (story effectsOnEnter do that).
// Health loss is capped at 10 per tick so a single bad node cannot kill.

export function runSurvivalTick(state: GameState): GameState {
  const node = getNodeById(state.currentNodeId);

  // No tick on endings, during hallucinations, or in prologue
  if (node?.isEnding) return state;
  if (state.flags['halluc_active']) return state;
  if (node?.chapter === 'Prologue' || state.currentNodeId?.startsWith('prologue')) return state;

  const { stats } = state;
  let healthDelta = 0;
  let moraleDelta = 0;

  // ── Hunger consequences ──────────────────────────────────────────────────
  // hunger = 0    → severe starvation damage
  // hunger 1–15  → significant starvation damage
  // hunger 16–25 → mild starvation damage (warning zone)
  if (stats.hunger === 0) {
    healthDelta -= 5;
    moraleDelta -= 3;
  } else if (stats.hunger <= 15) {
    healthDelta -= 3;
    moraleDelta -= 1;
  } else if (stats.hunger <= 25) {
    healthDelta -= 1;
  }

  // ── Thirst consequences (faster than hunger) ─────────────────────────────
  // thirst = 0    → severe dehydration damage
  // thirst 1–15  → significant dehydration damage
  // thirst 16–25 → mild dehydration damage (warning zone)
  if (stats.thirst === 0) {
    healthDelta -= 7;
  } else if (stats.thirst <= 15) {
    healthDelta -= 5;
  } else if (stats.thirst <= 25) {
    healthDelta -= 2;
  }

  // ── Morale spiral ─────────────────────────────────────────────────────────
  // Very low morale bleeds further — despair compounds on itself
  if (stats.morale <= 10) {
    moraleDelta -= 1;
  }

  // Cap health loss at 10 per tick — no instant kills from a single transition
  healthDelta = Math.max(healthDelta, -10);

  if (healthDelta === 0 && moraleDelta === 0) return state;

  return applyEffects(state, { health: healthDelta, morale: moraleDelta });
}

// ─── checkSurvivalEndings ────────────────────────────────────────────────
//
// Priority order:
//   1. Morale collapse — the will to continue breaks
//   2. Dehydration — thirst kills faster than hunger
//   3. Starvation — hunger eventually kills
//   4. Health collapse — damage from combat or the environment
//
// Note: thirst/hunger at 0 do not instantly trigger death — the tick
// applies health penalties over successive nodes, so the player has time
// to see warnings and find supplies. Death triggers when health ≤ 0.
// The ending chosen reflects which stat was responsible.

export function checkSurvivalEndings(state: GameState): string | null {
  const node = getNodeById(state.currentNodeId);
  if (node?.chapter === 'Prologue' || state.currentNodeId?.startsWith('prologue')) return null;

  if (state.stats.morale <= 0) return 'ending_morale_collapse';
  if (state.stats.health <= 0) {
    if (state.stats.corruption >= 100) return 'ending_corruption_death';
    if (state.stats.thirst <= 0) return 'ending_dehydration';
    if (state.stats.hunger <= 0) return 'ending_starvation';
    return 'ending_metro_death';
  }
  return null;
}

// ─── getSurvivalWarnings ─────────────────────────────────────────────────
//
// Returns the list of active warning messages to show above the choices
// panel. Ordered by severity — critical first, then warning, then info.

export function getSurvivalWarnings(state: GameState): SurvivalWarning[] {
  if (state.flags['halluc_active']) return [];

  const { stats, inventory, companions } = state;
  const warnings: SurvivalWarning[] = [];

  // ── Health ───────────────────────────────────────────────────────────────
  if (stats.health <= 15) {
    warnings.push({ message: 'You are close to death.', severity: 'critical', type: 'health' });
  } else if (stats.health <= 30) {
    warnings.push({ message: 'Your wounds are getting worse.', severity: 'warning', type: 'health' });
  }

  // ── Hunger ───────────────────────────────────────────────────────────────
  if (stats.hunger <= 10) {
    warnings.push({ message: 'You are starving.', severity: 'critical', type: 'hunger' });
  } else if (stats.hunger <= 25) {
    warnings.push({ message: 'You are starving.', severity: 'warning', type: 'hunger' });
  } else if (stats.hunger <= 40) {
    warnings.push({ message: 'Your stomach cramps with hunger.', severity: 'info', type: 'hunger' });
  }

  // ── Thirst ───────────────────────────────────────────────────────────────
  if (stats.thirst <= 10) {
    warnings.push({ message: 'Your throat burns from thirst.', severity: 'critical', type: 'thirst' });
  } else if (stats.thirst <= 25) {
    warnings.push({ message: 'Your throat burns from thirst.', severity: 'warning', type: 'thirst' });
  } else if (stats.thirst <= 40) {
    warnings.push({ message: 'Your mouth is dry. You need water soon.', severity: 'info', type: 'thirst' });
  }

  // ── Morale ───────────────────────────────────────────────────────────────
  if (stats.morale <= 10) {
    warnings.push({ message: 'You have almost nothing left.', severity: 'critical', type: 'morale' });
  } else if (stats.morale <= 20) {
    warnings.push({ message: 'You feel like giving up.', severity: 'warning', type: 'morale' });
  }

  // ── Corruption ───────────────────────────────────────────────────────────
  if (stats.corruption >= 90) {
    warnings.push({ message: 'The voice from the mark is no longer yours alone.', severity: 'critical', type: 'corruption' });
  } else if (stats.corruption >= 70) {
    warnings.push({ message: 'The mark on your wrist is getting louder.', severity: 'warning', type: 'corruption' });
  } else if (stats.corruption >= 50) {
    warnings.push({ message: 'The mark pulses when you think about the wrong things.', severity: 'info', type: 'corruption' });
  }

  // ── Supplies ─────────────────────────────────────────────────────────────
  if (inventory.food === 0 && stats.hunger < 65) {
    warnings.push({ message: 'You have nothing left to eat.', severity: 'warning', type: 'supplies' });
  }
  if (inventory.water === 0 && stats.thirst < 65) {
    warnings.push({ message: 'Your water supply is gone.', severity: 'warning', type: 'supplies' });
  }

  // ── Companions ───────────────────────────────────────────────────────────
  if (companions.mira.present && companions.mira.alive && companions.mira.trust <= 2) {
    warnings.push({ message: 'Mira is watching your choices carefully.', severity: 'warning', type: 'companion' });
  }
  if (companions.cain.present && companions.cain.alive && companions.cain.trust <= 2) {
    warnings.push({ message: 'Cain no longer trusts your judgment.', severity: 'warning', type: 'companion' });
  }

  return warnings;
}

// ─── getHallucinationRedirect ─────────────────────────────────────────────
//
// When corruption is high, there is a random chance each node transition
// will redirect the player into a hallucination. The chance scales with
// corruption severity. Hallucinations are skipped during other hallucinations
// and on ending nodes.

export function getHallucinationRedirect(state: GameState): string | null {
  if (state.flags['halluc_active']) return null;

  const node = getNodeById(state.currentNodeId);
  if (node?.isEnding) return null;

  const { corruption } = state.stats;
  let chance = 0;
  if (corruption >= 95) chance = 0.42;
  else if (corruption >= 85) chance = 0.28;
  else if (corruption >= 70) chance = 0.15;

  if (chance === 0) return null;
  if (Math.random() >= chance) return null;

  const idx = Math.floor(Math.random() * HALLUCINATION_NODES.length);
  return HALLUCINATION_NODES[idx];
}

// ─── shouldTriggerEnding ─────────────────────────────────────────────────

export function shouldTriggerEnding(state: GameState, choice: Choice): string | null {
  if (!choice.endingTrigger) return null;

  const evaluated = evaluateConditionalEnding(state, choice);
  if (evaluated) return evaluated;

  if (choice.endingTrigger === 'ending_relic_awakening') {
    return null;
  }

  return choice.endingTrigger;
}

// ─── getAutoRedirect ─────────────────────────────────────────────────────

export function getAutoRedirect(state: GameState, nodeId: string): string | null {
  // Cain betrayal: triggers at the saints_registered node
  if (nodeId === 'saints_registered' || nodeId === 'saints_submit') {
    const cainPresent = state.companions.cain.present || state.flags['cain_joins_party'];
    const cainKnowsMark = state.flags['cain_knows_mark'];
    const cainTrustLow = state.companions.cain.trust < 3;
    if (cainPresent && cainKnowsMark && cainTrustLow) {
      return 'ending_cain_betrayal';
    }
  }
  return null;
}

// ─── getChoicesWithStatus ─────────────────────────────────────────────────

export function getChoicesWithStatus(state: GameState) {
  const node = getNodeById(state.currentNodeId);
  if (!node) return [];

  return node.choices
    .map((choice) => {
      const result = checkRequirements(state, choice.requirements);
      return {
        choice,
        met: result.met,
        reasons: result.reasons,
      };
    })
    .filter((c) => {
      if (c.choice.isHidden && !c.met) return false;
      return true;
    });
}

export { evaluateConditionalEnding };
