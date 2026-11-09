import type { GameState, Choice } from './types';

export interface EndingCondition {
  endingId: string;
  priority: number; // Higher number evaluated first
  condition: (state: GameState, choice?: Choice) => boolean;
  description: string;
}

export const CONDITIONAL_ENDINGS: EndingCondition[] = [
  {
    endingId: 'ending_relic_awakening',
    priority: 100,
    condition: (state: GameState, choice?: Choice) => {
      if (choice?.endingTrigger !== 'ending_relic_awakening') return false;
      const projectedCorruption = (state.stats?.corruption ?? 0) + (choice.effects?.corruption ?? 0);
      return projectedCorruption >= 8 || state.character?.characterClass === 'esper';
    },
    description: 'Awakened by the resonant crystal when corruption is high or wielded by an Esper',
  },
  {
    endingId: 'ending_morale_collapse',
    priority: 90,
    condition: (state: GameState) => {
      if (state.currentNodeId?.startsWith('prologue')) return false;
      return (state.stats?.morale ?? 1) <= 0;
    },
    description: 'Total collapse of the will to survive in the ruins',
  },
  {
    endingId: 'ending_corruption_death',
    priority: 85,
    condition: (state: GameState) => {
      if (state.currentNodeId?.startsWith('prologue')) return false;
      return (state.stats?.corruption ?? 0) >= 100 && (state.stats?.health ?? 1) <= 0;
    },
    description: 'Total consumption by the mark upon health exhaustion',
  },
  {
    endingId: 'ending_dehydration',
    priority: 80,
    condition: (state: GameState) => {
      if (state.currentNodeId?.startsWith('prologue')) return false;
      return (state.stats?.health ?? 1) <= 0 && (state.stats?.thirst ?? 1) <= 0;
    },
    description: 'Fatal dehydration when health reaches zero',
  },
  {
    endingId: 'ending_starvation',
    priority: 70,
    condition: (state: GameState) => {
      if (state.currentNodeId?.startsWith('prologue')) return false;
      return (state.stats?.health ?? 1) <= 0 && (state.stats?.hunger ?? 1) <= 0;
    },
    description: 'Fatal starvation when health reaches zero',
  },
  {
    endingId: 'ending_metro_death',
    priority: 60,
    condition: (state: GameState) => {
      if (state.currentNodeId?.startsWith('prologue')) return false;
      return (state.stats?.health ?? 1) <= 0;
    },
    description: 'Lethal physical trauma in the metro network',
  },
  {
    endingId: 'ending_cain_betrayal',
    priority: 50,
    condition: (state: GameState) => {
      const isTargetNode = state.currentNodeId === 'saints_registered' || state.currentNodeId === 'saints_submit';
      if (!isTargetNode) return false;
      const cainPresent = state.companions?.cain?.present || state.flags?.['cain_joins_party'];
      const cainKnowsMark = state.flags?.['cain_knows_mark'];
      const cainTrustLow = (state.companions?.cain?.trust ?? 0) < 3;
      return Boolean(cainPresent && cainKnowsMark && cainTrustLow);
    },
    description: 'Cain executes the player for bearing the mark under the Iron Saints registration',
  },
  {
    endingId: 'ending_iron_tyrant',
    priority: 40,
    condition: (state: GameState) =>
      Boolean(
        (state.flags?.['iron_tyrant_path'] && state.flags?.['chapter12_complete']) ||
          state.flags?.['throne_tyrant_secured'] ||
          state.currentNodeId === 'ending_ch12_iron_crown'
      ),
    description: 'Ascended as the Iron Tyrant over the ruins',
  },
  {
    endingId: 'ending_wanderer',
    priority: 39,
    condition: (state: GameState) =>
      Boolean(
        (state.flags?.['wanderer_path'] && state.flags?.['chapter12_complete']) ||
          state.currentNodeId === 'ending_ch12_wanderer_true'
      ),
    description: 'Vanished into the wastes as an eternal wanderer',
  },
  {
    endingId: 'ending_together',
    priority: 38,
    condition: (state: GameState) =>
      Boolean(
        (state.flags?.['together_path'] && state.flags?.['chapter12_complete']) ||
          state.currentNodeId === 'ending_ch12_mira_together' ||
          state.currentNodeId === 'ending_ch12_cain_together'
      ),
    description: 'Survived alongside your trusted companion to the end',
  },
  {
    endingId: 'ending_last_archive',
    priority: 37,
    condition: (state: GameState) =>
      Boolean(
        (state.flags?.['archive_door_unsealed'] && state.flags?.['chapter12_complete']) ||
          state.currentNodeId === 'ending_ch12_archive_crown'
      ),
    description: 'Unsealed the Last Archive and preserved humanity’s secrets',
  },
  {
    endingId: 'ending_thirteenth_signal',
    priority: 36,
    condition: (state: GameState) =>
      Boolean(
        (state.flags?.['thirteenth_signal_decoded'] && state.flags?.['chapter12_complete']) ||
          state.currentNodeId === 'ending_ch12_thirteenth_signal'
      ),
    description: 'Decoded the mystery of the Thirteenth Signal',
  },
  {
    endingId: 'ending_ch3_trust_complete',
    priority: 35,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch3_trust_complete'] ||
          state.flags?.['chapter3_complete'] ||
          state.currentNodeId === 'c3_chapter3_end'
      ),
    description: 'Earned complete trust in Chapter 3',
  },
  {
    endingId: 'ending_ch4_saints_survived',
    priority: 34,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch4_saints_survived_flag'] ||
          state.flags?.['chapter4_complete'] ||
          state.currentNodeId === 'c4_chapter4_end'
      ),
    description: 'Survived the Iron Saints siege in Chapter 4',
  },
  {
    endingId: 'ending_ch4_veyra_pact',
    priority: 33,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch4_veyra_pact_flag'] ||
          state.flags?.['veyra_pact_made'] ||
          state.flags?.['chapter4_pact_route'] ||
          state.currentNodeId === 'c4_veyra_pact'
      ),
    description: 'Entered into the covenant with Veyra in Chapter 4',
  },
  {
    endingId: 'ending_ch4_mira_route',
    priority: 32,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch4_mira_route_flag'] ||
          (state.flags?.['chapter4_complete'] && state.companions?.mira?.present)
      ),
    description: 'Accomplished Mira’s dedicated path in Chapter 4',
  },
  {
    endingId: 'ending_ch5_survived',
    priority: 31,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch5_survived_flag'] ||
          state.flags?.['chapter5_complete'] ||
          state.currentNodeId === 'c5_chapter5_end'
      ),
    description: 'Survived the hazards of Chapter 5',
  },
  {
    endingId: 'ending_ch6_survived',
    priority: 30,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch6_survived_flag'] ||
          state.flags?.['chapter6_complete'] ||
          state.currentNodeId === 'c6_chapter6_end'
      ),
    description: 'Survived Chapter 6',
  },
  {
    endingId: 'ending_ch7_survived',
    priority: 29,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch7_survived_flag'] ||
          state.flags?.['chapter7_complete'] ||
          state.currentNodeId === 'c7_chapter7_end'
      ),
    description: 'Survived Chapter 7',
  },
  {
    endingId: 'ending_ch8_survived',
    priority: 28,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch8_survived_flag'] ||
          state.flags?.['chapter8_complete'] ||
          state.currentNodeId === 'c8_chapter8_end'
      ),
    description: 'Survived Chapter 8',
  },
  {
    endingId: 'ending_ch9_savior_path',
    priority: 27,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch9_savior_path_flag'] ||
          state.flags?.['savior_path_requirements_begun'] ||
          state.currentNodeId === 'c9_savior_path_unlock'
      ),
    description: 'Followed the path of the Savior in Chapter 9',
  },
  {
    endingId: 'ending_ch9_tyrant_path',
    priority: 26,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch9_tyrant_path_flag'] ||
          state.flags?.['tyrant_path_requirements_begun'] ||
          state.currentNodeId === 'c9_tyrant_path_deepen'
      ),
    description: 'Followed the path of the Tyrant in Chapter 9',
  },
  {
    endingId: 'ending_ch9_survived',
    priority: 25,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch9_survived_flag'] ||
          state.flags?.['chapter9_complete'] ||
          state.currentNodeId === 'c9_chapter9_end'
      ),
    description: 'Survived Chapter 9',
  },
  {
    endingId: 'ending_ch9_true_ending_req',
    priority: 24,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['ch9_true_ending_req_flag'] ||
          state.flags?.['true_ending_req_chapter9_complete'] ||
          state.currentNodeId === 'c9_true_ending_req_end'
      ),
    description: 'Met all prerequisites for the True Ending in Chapter 9',
  },
  {
    endingId: 'ending_fc1_gate_sealed_savior',
    priority: 23,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['fc1_gate_sealed_savior_flag'] ||
          state.flags?.['gate_sealed_savior'] ||
          state.currentNodeId === 'fc1_gate_sealed_savior_end'
      ),
    description: 'Sealed the gate as Savior in Final Chapter 1',
  },
  {
    endingId: 'ending_fc1_faction_gate',
    priority: 22,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['fc1_faction_gate_flag'] ||
          state.flags?.['faction_gate_resolution'] ||
          state.currentNodeId === 'fc1_faction_gate_end'
      ),
    description: 'Secured the Faction Gate in Final Chapter 1',
  },
  {
    endingId: 'ending_fc1_unity_gate',
    priority: 21,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['fc1_unity_gate_flag'] ||
          state.flags?.['unity_gate_merged'] ||
          state.currentNodeId === 'fc1_unity_gate_end'
      ),
    description: 'Achieved Unity at the Gate in Final Chapter 1',
  },
  {
    endingId: 'ending_fc1_true_ending_path',
    priority: 20,
    condition: (state: GameState) =>
      Boolean(
        state.flags?.['fc1_true_ending_path_flag'] ||
          state.flags?.['true_ending_gate_opened'] ||
          state.currentNodeId === 'fc1_true_ending_path_end'
      ),
    description: 'Unlocked the True Ending pathway in Final Chapter 1',
  },
];

export function evaluateConditionalEnding(state: GameState, choice?: Choice): string | null {
  for (const ending of CONDITIONAL_ENDINGS) {
    try {
      if (ending.condition(state, choice)) {
        return ending.endingId;
      }
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Returns all milestone / archetype conditional endings (priority <= 40) that are newly satisfied
 * by the player's current state so GameContext can record them in `endingsDiscovered` without
 * interrupting multi-chapter progression.
 */
export function getMilestoneEndingsUnlocked(state: GameState): string[] {
  const unlocked: string[] = [];
  for (const ending of CONDITIONAL_ENDINGS) {
    if (ending.priority > 40) continue;
    try {
      if (ending.condition(state)) {
        unlocked.push(ending.endingId);
      }
    } catch {
      continue;
    }
  }
  return unlocked;
}
