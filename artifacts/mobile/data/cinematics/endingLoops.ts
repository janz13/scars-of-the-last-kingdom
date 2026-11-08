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
        sceneKey: 'sacrifice_ending',
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
        sceneKey: 'broken_throne_room',
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
        sceneKey: 'wanderer_ending',
        durationSec: 4,
        transitionIn: 'ditherDissolve',
        cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
        particles: 'ash',
      },
    ],
  },
};

export function getEndingLoopTimeline(type: EndingType, _fallbackImageKey?: string): CinematicTimeline {
  return ENDING_LOOP_TIMELINES[type] ?? ENDING_LOOP_TIMELINES.wanderer;
}
