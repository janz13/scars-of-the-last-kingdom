import type { GameState, Choice, ChoiceEffects, ChoiceRequirements, Stats, Inventory, FactionRep } from '../data/types';
import { getNodeById } from '../data/storyNodes';

// ─── HOW TO ADD NEW STAT REQUIREMENTS ─────────────────────────────────────
// Add a new field to ChoiceRequirements in data/types.ts
// Then handle it in checkRequirements() below
// ──────────────────────────────────────────────────────────────────────────

export interface RequirementResult {
  met: boolean;
  reasons: string[];
}

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

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

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

export function checkSurvivalEndings(state: GameState): string | null {
  if (state.stats.hunger <= 0) return 'ending_starvation';
  if (state.stats.health <= 0) return 'ending_metro_death';
  return null;
}

export function shouldTriggerEnding(state: GameState, choice: Choice): string | null {
  if (!choice.endingTrigger) return null;

  if (choice.endingTrigger === 'ending_relic_awakening') {
    const projectedCorruption = state.stats.corruption + (choice.effects?.corruption || 0);
    if (projectedCorruption >= 8 || state.character?.characterClass === 'esper') {
      return 'ending_relic_awakening';
    }
  }

  return null;
}

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
