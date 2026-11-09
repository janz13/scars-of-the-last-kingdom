import { EndingType } from '../types';
import { CinematicTimeline } from '../../engine/pixel/cinematicPlayer';

export const ENDING_LOOP_TIMELINES: Record<EndingType, CinematicTimeline> = {
  death: {
    id: 'loop_death',
    title: 'Ash in the Dark',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'death_1',
        sceneKey: 'collapsed_tunnel',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
        particles: 'ash',
      },
      {
        id: 'death_2',
        sceneKey: 'dark_metro_hallway',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 4, startY: -2, endX: -4, endY: 2 },
        particles: 'ash',
      },
    ],
  },
  sacrifice: {
    id: 'loop_sacrifice',
    title: 'The Last Watch',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'sacrifice_1',
        sceneKey: 'cain_last_stand_ending',
        durationSec: 4,
        transitionIn: 'irisWipe',
        cameraPan: { startX: 0, startY: 3, endX: 0, endY: -3 },
        particles: 'embers',
      },
      {
        id: 'sacrifice_2',
        sceneKey: 'mb1_chalk_pillar',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
        particles: 'ash',
      },
    ],
  },
  betrayal: {
    id: 'loop_betrayal',
    title: 'Red Ink on the Ledger',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'betrayal_1',
        sceneKey: 'mb1_saints_sweep',
        durationSec: 4,
        transitionIn: 'horizontalSlat',
        cameraPan: { startX: -5, startY: 0, endX: 5, endY: 0 },
        particles: 'ash',
      },
      {
        id: 'betrayal_2',
        sceneKey: 'iron_saints_checkpoint',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 5, startY: 0, endX: -5, endY: 0 },
        particles: 'embers',
      },
    ],
  },
  tyrant: {
    id: 'loop_tyrant',
    title: 'The Broken Throne',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'tyrant_1',
        sceneKey: 'tyrant_ending',
        durationSec: 4,
        transitionIn: 'horizontalSlat',
        cameraPan: { startX: 0, startY: -4, endX: 0, endY: 4 },
        particles: 'embers',
      },
      {
        id: 'tyrant_2',
        sceneKey: 'broken_throne',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
        particles: 'ash',
      },
    ],
  },
  savior: {
    id: 'loop_savior',
    title: 'Streetlights at Half-Wattage',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'savior_1',
        sceneKey: 'city_after',
        durationSec: 4,
        transitionIn: 'irisWipe',
        cameraPan: { startX: -4, startY: 2, endX: 4, endY: -2 },
        particles: 'ash',
      },
      {
        id: 'savior_2',
        sceneKey: 'savior_ending',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 4, startY: -2, endX: -4, endY: 2 },
        particles: 'spores',
      },
    ],
  },
  companion: {
    id: 'loop_companion',
    title: 'Above the Sleet',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'companion_1',
        sceneKey: 'mb4_tower_balcony_dawn',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
        particles: 'rain',
      },
      {
        id: 'companion_2',
        sceneKey: 'tunnel_camp',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 3, startY: 0, endX: -3, endY: 0 },
        particles: 'embers',
      },
    ],
  },
  faction: {
    id: 'loop_faction',
    title: 'Banners in the Undercroft',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'faction_1',
        sceneKey: 'ashen_square',
        durationSec: 4,
        transitionIn: 'horizontalSlat',
        cameraPan: { startX: -5, startY: 0, endX: 5, endY: 0 },
        particles: 'ash',
      },
      {
        id: 'faction_2',
        sceneKey: 'mb3_grain_silo_catwalk',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 5, startY: 0, endX: -5, endY: 0 },
        particles: 'embers',
      },
    ],
  },
  secret: {
    id: 'loop_secret',
    title: 'Station Seven of Twenty',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'secret_1',
        sceneKey: 'answer_chamber',
        durationSec: 4,
        transitionIn: 'irisWipe',
        cameraPan: { startX: -4, startY: -2, endX: 4, endY: 2 },
        particles: 'spores',
      },
      {
        id: 'secret_2',
        sceneKey: 'secret_true_ending',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 4, startY: 2, endX: -4, endY: -2 },
        particles: 'spores',
      },
    ],
  },
  corruption: {
    id: 'loop_corruption',
    title: 'The Forty-One-Hour Chord',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'corruption_1',
        sceneKey: 'signal_choir_cavern',
        durationSec: 4,
        transitionIn: 'corruptionBleed',
        cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
        particles: 'spores',
      },
      {
        id: 'corruption_2',
        sceneKey: 'red_choir_chamber',
        durationSec: 4,
        transitionIn: 'corruptionBleed',
        cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
        particles: 'spores',
      },
    ],
  },
  wanderer: {
    id: 'loop_wanderer',
    title: 'Outside the Boundary',
    loop: true,
    totalDurationSec: 8,
    shots: [
      {
        id: 'wanderer_1',
        sceneKey: 'mb2_old_aqueduct_exit',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
        particles: 'rain',
      },
      {
        id: 'wanderer_2',
        sceneKey: 'lone_wanderer_ending',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
        particles: 'ash',
      },
    ],
  },
};

// ─── Bespoke Multi-Shot Timelines for 9 Signature Endings (Wave 6 / Milestone B) ───

export const BESPOKE_LOOP_EPILOGUE_YES_WERE_HERE: CinematicTimeline = {
  id: 'loop_epi_yes_were_here',
  title: "Yes, We're Here",
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'epi_yes_1',
      sceneKey: 'answer_chamber',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
      particles: 'sparks',
      stinger: 'savior',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'EPILOGUE',
        title: "Yes, We're Here",
        subtitle: 'The Human Reply',
      },
    },
    {
      id: 'epi_yes_2',
      sceneKey: 'city_after',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: 4, startY: -2, endX: -4, endY: 2 },
      particles: 'ash',
    },
    {
      id: 'epi_yes_3',
      sceneKey: 'velna_camp',
      durationSec: 4,
      transitionIn: 'scanlineWipe',
      cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
      particles: 'embers',
    },
  ],
};

export const BESPOKE_LOOP_EPILOGUE_NO_ONE_IS_LEFT: CinematicTimeline = {
  id: 'loop_epi_no_one_is_left',
  title: 'No One Is Left',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'epi_no_1',
      sceneKey: 'answer_chamber',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: 0, startY: 3, endX: 0, endY: -3 },
      particles: 'ash',
      stinger: 'sacrifice',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'EPILOGUE',
        title: 'No One Is Left',
        subtitle: 'The Dead-Line Code',
      },
    },
    {
      id: 'epi_no_2',
      sceneKey: 'signal_choir_cavern',
      durationSec: 4,
      transitionIn: 'horizontalSlat',
      cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
      particles: 'dust',
    },
    {
      id: 'epi_no_3',
      sceneKey: 'surface_ruins',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'snow-ash',
    },
  ],
};

export const BESPOKE_LOOP_EPILOGUE_VELNA_ANSWERS: CinematicTimeline = {
  id: 'loop_epi_velna_answers',
  title: 'Velna Answers',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'epi_velna_1',
      sceneKey: 'answer_chamber',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
      particles: 'sparks',
      stinger: 'companion',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'EPILOGUE',
        title: 'Velna Answers',
        subtitle: 'Eighteen Hundred Days of Notes',
      },
    },
    {
      id: 'epi_velna_2',
      sceneKey: 'velna_camp',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: 3, startY: 0, endX: -3, endY: 0 },
      particles: 'embers',
    },
    {
      id: 'epi_velna_3',
      sceneKey: 'city_after',
      durationSec: 4,
      transitionIn: 'scanlineWipe',
      cameraPan: { startX: -4, startY: 2, endX: 4, endY: -2 },
      particles: 'ash',
    },
  ],
};

export const BESPOKE_LOOP_EPILOGUE_SECOND_QUESTION: CinematicTimeline = {
  id: 'loop_epi_second_question',
  title: 'The Second Question',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'epi_sec_1',
      sceneKey: 'answer_chamber',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: -4, startY: -2, endX: 4, endY: 2 },
      particles: 'sparks',
      stinger: 'secret',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'EPILOGUE',
        title: 'The Second Question',
        subtitle: 'Station Seven of Twenty',
      },
    },
    {
      id: 'epi_sec_2',
      sceneKey: 'vault_heart',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'dust',
    },
    {
      id: 'epi_sec_3',
      sceneKey: 'signal_choir_cavern',
      durationSec: 4,
      transitionIn: 'horizontalSlat',
      cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
      particles: 'spores',
    },
  ],
};

export const BESPOKE_LOOP_EPILOGUE_MARK_GOES_QUIET: CinematicTimeline = {
  id: 'loop_epi_mark_goes_quiet',
  title: 'The Mark Goes Quiet',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'epi_quiet_1',
      sceneKey: 'answer_chamber',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: 0, startY: -3, endX: 0, endY: 3 },
      particles: 'ash',
      stinger: 'wanderer',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'EPILOGUE',
        title: 'The Mark Goes Quiet',
        subtitle: 'The Grounded Shunt',
      },
    },
    {
      id: 'epi_quiet_2',
      sceneKey: 'velna_descent',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
      particles: 'drip',
    },
    {
      id: 'epi_quiet_3',
      sceneKey: 'lone_wanderer_ending',
      durationSec: 4,
      transitionIn: 'scanlineWipe',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'rain',
    },
  ],
};

export const BESPOKE_LOOP_EPILOGUE_CHORUS: CinematicTimeline = {
  id: 'loop_epi_chorus',
  title: 'Chorus',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'epi_chorus_1',
      sceneKey: 'signal_choir_cavern',
      durationSec: 4,
      transitionIn: 'corruptionBleed',
      cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
      particles: 'spores',
      stinger: 'corruption',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'EPILOGUE',
        title: 'Chorus',
        subtitle: 'The Permanent Carrier',
      },
    },
    {
      id: 'epi_chorus_2',
      sceneKey: 'answer_chamber',
      durationSec: 4,
      transitionIn: 'corruptionBleed',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'sparks',
    },
    {
      id: 'epi_chorus_3',
      sceneKey: 'red_choir_chamber',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
      particles: 'spores',
    },
  ],
};

export const BESPOKE_LOOP_SECRET_TRUE_ENDING: CinematicTimeline = {
  id: 'loop_secret_true_ending',
  title: 'The Last Kingdom Remembers',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'true_1',
      sceneKey: 'secret_true_ending',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: -4, startY: 2, endX: 4, endY: -2 },
      particles: 'sparks',
      stinger: 'secret',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'TRUE ENDING',
        title: 'The Last Kingdom Remembers',
        subtitle: 'A City That Chooses',
      },
    },
    {
      id: 'true_2',
      sceneKey: 'last_archive_door',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'dust',
    },
    {
      id: 'true_3',
      sceneKey: 'surface_dawn',
      durationSec: 4,
      transitionIn: 'scanlineWipe',
      cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
      particles: 'ash',
    },
  ],
};

export const BESPOKE_LOOP_MASKED_HEIR: CinematicTimeline = {
  id: 'loop_masked_heir',
  title: "The Masked Heir's Ending",
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'heir_1',
      sceneKey: 'masked_heir_ending',
      durationSec: 4,
      transitionIn: 'irisWipe',
      cameraPan: { startX: 0, startY: -4, endX: 0, endY: 4 },
      particles: 'embers',
      stinger: 'secret',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'FINAL CHAPTER 2',
        title: "The Masked Heir's Ending",
        subtitle: 'The Porcelain Threshold',
      },
    },
    {
      id: 'heir_2',
      sceneKey: 'marked_shrine',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
      particles: 'sparks',
    },
    {
      id: 'heir_3',
      sceneKey: 'first_gate',
      durationSec: 4,
      transitionIn: 'horizontalSlat',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'dust',
    },
  ],
};

export const BESPOKE_LOOP_CORRUPTION_GOD: CinematicTimeline = {
  id: 'loop_corruption_god',
  title: 'Corruption God',
  loop: true,
  totalDurationSec: 12,
  shots: [
    {
      id: 'god_1',
      sceneKey: 'corruption_god',
      durationSec: 4,
      transitionIn: 'corruptionBleed',
      cameraPan: { startX: -4, startY: 0, endX: 4, endY: 0 },
      particles: 'spores',
      stinger: 'corruption',
      titleCard: {
        startSec: 0.5,
        endSec: 3.5,
        eyebrow: 'FINAL CHAPTER 2',
        title: 'Corruption God',
        subtitle: 'Beyond the Flesh',
      },
    },
    {
      id: 'god_2',
      sceneKey: 'signal_choir_cavern',
      durationSec: 4,
      transitionIn: 'corruptionBleed',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'spores',
    },
    {
      id: 'god_3',
      sceneKey: 'city_after',
      durationSec: 4,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -4, startY: 2, endX: 4, endY: -2 },
      particles: 'ash',
    },
  ],
};

export const BESPOKE_ENDING_LOOP_TIMELINES: Record<string, CinematicTimeline> = {
  // 6 Epilogue Endings
  ending_epilogue_yes_were_here: BESPOKE_LOOP_EPILOGUE_YES_WERE_HERE,
  ending_epilogue_no_one_is_left: BESPOKE_LOOP_EPILOGUE_NO_ONE_IS_LEFT,
  ending_epilogue_velna_answers: BESPOKE_LOOP_EPILOGUE_VELNA_ANSWERS,
  ending_epilogue_second_question: BESPOKE_LOOP_EPILOGUE_SECOND_QUESTION,
  ending_epilogue_mark_goes_quiet: BESPOKE_LOOP_EPILOGUE_MARK_GOES_QUIET,
  ending_epilogue_chorus: BESPOKE_LOOP_EPILOGUE_CHORUS,

  // Secret True Ending (ID and alias/imageKey)
  ending_last_kingdom_remembers: BESPOKE_LOOP_SECRET_TRUE_ENDING,
  secret_true_ending: BESPOKE_LOOP_SECRET_TRUE_ENDING,

  // Masked Heir Ending (ID and alias/imageKey)
  ending_fc2_masked_heir: BESPOKE_LOOP_MASKED_HEIR,
  masked_heir_ending: BESPOKE_LOOP_MASKED_HEIR,

  // Corruption God Ending (ID and alias/imageKey)
  ending_fc2_corruption_god: BESPOKE_LOOP_CORRUPTION_GOD,
  corruption_god: BESPOKE_LOOP_CORRUPTION_GOD,
};

export function getEndingLoopTimeline(type: EndingType, endingIdOrImageKey?: string): CinematicTimeline {
  if (
    typeof endingIdOrImageKey === 'string' &&
    Object.prototype.hasOwnProperty.call(BESPOKE_ENDING_LOOP_TIMELINES, endingIdOrImageKey)
  ) {
    return BESPOKE_ENDING_LOOP_TIMELINES[endingIdOrImageKey];
  }
  return ENDING_LOOP_TIMELINES[type] ?? ENDING_LOOP_TIMELINES.wanderer;
}
