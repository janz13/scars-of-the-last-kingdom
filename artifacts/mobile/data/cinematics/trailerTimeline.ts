import { CinematicTimeline } from '../../engine/pixel/cinematicPlayer';

/**
 * 75-second Master Trailer Timeline
 * Matches the 75-second procedural audio arrangement (TRAILER_75S_ARRANGEMENT).
 */
export const TRAILER_75S_TIMELINE: CinematicTimeline = {
  id: 'trailer_75s',
  title: 'Scars of the Last Kingdom — Official Trailer',
  loop: false,
  totalDurationSec: 75,
  shots: [
    {
      id: 'tr_01_station',
      sceneKey: 'ruined_metro_station',
      durationSec: 7,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -6, startY: 0, endX: 6, endY: 0 },
      particles: 'ash',
      musicTheme: 'main_theme',
      titleCard: {
        startSec: 0.8,
        endSec: 6.2,
        eyebrow: 'FIVE YEARS AFTER THE BLACKOUT',
        title: 'SCARS OF THE LAST KINGDOM',
        subtitle: 'A DARK POST-APOCALYPTIC PIXEL RPG',
      },
    },
    {
      id: 'tr_02_warrens',
      sceneKey: 'mb1_chalk_pillar',
      durationSec: 7,
      transitionIn: 'irisWipe',
      cameraPan: { startX: 0, startY: 4, endX: 0, endY: -4 },
      particles: 'ash',
      musicTheme: 'hollow_children',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 6.2,
          text: 'Four hundred and twelve small names chalked on wet concrete beneath the Warrens.',
        },
      ],
    },
    {
      id: 'tr_03_saints',
      sceneKey: 'iron_saints_checkpoint',
      durationSec: 7,
      transitionIn: 'horizontalSlat',
      cameraPan: { startX: -6, startY: -2, endX: 6, endY: 2 },
      particles: 'embers',
      musicTheme: 'iron_saints',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 6.2,
          text: 'Five factions. Two companions. Every ration tag and bullet counted in blood.',
        },
      ],
    },
    {
      id: 'tr_04_glass_court',
      sceneKey: 'glass_court_palace',
      durationSec: 7,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: 5, startY: 0, endX: -5, endY: 0 },
      particles: 'spores',
      musicTheme: 'glass_court',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 6.2,
          text: 'The Glass Court never wanted the surface. They wanted what was buried beneath it.',
        },
      ],
    },
    {
      id: 'tr_05_choir_velna',
      sceneKey: 'mb2_subcarrier_console',
      durationSec: 7,
      transitionIn: 'corruptionBleed',
      cameraPan: { startX: -4, startY: 2, endX: 4, endY: -2 },
      particles: 'spores',
      musicTheme: 'red_choir',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 6.2,
          text: 'Forty kilohertz below the Red Choir hymn, a lost surveyor is still reading depth numbers.',
        },
      ],
    },
    {
      id: 'tr_06_grain_ledger',
      sceneKey: 'mb3_grain_silo_catwalk',
      durationSec: 8,
      transitionIn: 'horizontalSlat',
      cameraPan: { startX: 0, startY: -5, endX: 0, endY: 5 },
      particles: 'embers',
      musicTheme: 'combat_loop',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 7.2,
          text: 'Forty tons of winter wheat at Junction Twelve. One spark in the flour dust will burn the dock.',
        },
      ],
    },
    {
      id: 'tr_07_broadcast',
      sceneKey: 'mb4_signal_tower_roof',
      durationSec: 8,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -6, startY: 0, endX: 6, endY: 0 },
      particles: 'rain',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 7.2,
          text: 'Fifty kilowatts on the night air. Play the truth, seize the microphone, or pull the switch.',
        },
      ],
    },
    {
      id: 'tr_08_velna_camp',
      sceneKey: 'velna_camp',
      durationSec: 8,
      transitionIn: 'irisWipe',
      cameraPan: { startX: 4, startY: 0, endX: -4, endY: 0 },
      particles: 'spores',
      musicTheme: 'epilogue_theme',
      subtitles: [
        {
          startSec: 0.8,
          endSec: 7.2,
          text: '"The Blackout was not an attack. It was a seventeen-second question waiting for a reply."',
          speaker: 'Velna',
        },
      ],
    },
    {
      id: 'tr_09_answer_chamber',
      sceneKey: 'answer_chamber',
      durationSec: 8,
      transitionIn: 'corruptionBleed',
      cameraPan: { startX: 0, startY: 4, endX: 0, endY: -4 },
      particles: 'spores',
      titleCard: {
        startSec: 1.0,
        endSec: 7.2,
        eyebrow: '1,635 NODES · 169 PIXEL SCENES · 244 ENDINGS',
        title: 'WHAT WILL YOU SAY BACK?',
        subtitle: 'EPILOGUE: THE RESPONSE — INCLUDED',
      },
    },
    {
      id: 'tr_10_city_after',
      sceneKey: 'city_after',
      durationSec: 8,
      transitionIn: 'ditherDissolve',
      cameraPan: { startX: -3, startY: 0, endX: 3, endY: 0 },
      particles: 'ash',
      stinger: 'savior',
      titleCard: {
        startSec: 0.8,
        endSec: 7.6,
        eyebrow: 'PLAY NOW IN YOUR BROWSER OR MOBILE',
        title: 'SCARS OF THE LAST KINGDOM',
        subtitle: 'janz13.github.io/scars-of-the-last-kingdom',
      },
    },
  ],
};
