import { CinematicTimeline } from '../../engine/pixel/cinematicPlayer';

/**
 * Intro Cinematic — "The Blackout" (36 seconds, 6 shots, skippable)
 * Plays on New Game or via the "REPLAY INTRO" button on the Main Menu.
 */
export const INTRO_BLACKOUT_TIMELINE: CinematicTimeline = {
  id: 'intro_blackout',
  title: 'The Blackout',
  loop: false,
  totalDurationSec: 36,
  shots: [
    {
      id: 'intro_shot_1_surface',
      sceneKey: 'surface_ruins',
      durationSec: 6,
      transitionIn: 'ditherDissolve',
      transitionDurationMs: 600,
      cameraPan: { startX: -6, startY: -2, endX: 6, endY: 2 },
      particles: 'ash',
      musicTheme: 'main_theme',
      titleCard: {
        startSec: 0.6,
        endSec: 4.8,
        eyebrow: 'FIVE YEARS BEFORE THE DESCENT',
        title: 'THE NIGHT OF THE BLACKOUT',
        subtitle: 'SEVENTEEN SECONDS THAT EMPTIED THE SURFACE',
      },
      subtitles: [
        {
          startSec: 1.0,
          endSec: 5.5,
          text: 'At 23:14, Director Kael turned the outer extraction key three hundred feet beneath the municipal grid.',
        },
      ],
    },
    {
      id: 'intro_shot_2_glass_court',
      sceneKey: 'glass_court_palace',
      durationSec: 6,
      transitionIn: 'irisWipe',
      transitionDurationMs: 500,
      cameraPan: { startX: 4, startY: -3, endX: -4, endY: 3 },
      particles: 'spores',
      subtitles: [
        {
          startSec: 0.5,
          endSec: 5.5,
          text: 'The structure below did not detonate. It sent a seventeen-second impedance check up the city wires.',
        },
      ],
    },
    {
      id: 'intro_shot_3_metro_panic',
      sceneKey: 'ruined_metro_station',
      durationSec: 6,
      transitionIn: 'horizontalSlat',
      transitionDurationMs: 450,
      cameraPan: { startX: -8, startY: 0, endX: 8, endY: 0 },
      particles: 'embers',
      stinger: 'mark_awakening',
      subtitles: [
        {
          startSec: 0.5,
          endSec: 5.5,
          text: 'Every copper transformer in the Last Kingdom melted trying to carry syntax at sixty hertz.',
        },
      ],
    },
    {
      id: 'intro_shot_4_saints_gates',
      sceneKey: 'iron_saints_checkpoint',
      durationSec: 6,
      transitionIn: 'ditherDissolve',
      transitionDurationMs: 500,
      cameraPan: { startX: 0, startY: 4, endX: 0, endY: -4 },
      particles: 'ash',
      musicTheme: 'iron_saints',
      subtitles: [
        {
          startSec: 0.5,
          endSec: 5.5,
          text: 'By dawn, the Iron Saints welded the upper blast gates shut. Five factions carved the tunnels below.',
        },
      ],
    },
    {
      id: 'intro_shot_5_archive_door',
      sceneKey: 'last_archive_door',
      durationSec: 6,
      transitionIn: 'irisWipe',
      transitionDurationMs: 550,
      cameraPan: { startX: -4, startY: 2, endX: 4, endY: -2 },
      particles: 'spores',
      musicTheme: 'last_archive',
      subtitles: [
        {
          startSec: 0.5,
          endSec: 5.5,
          text: 'When the copper failed, the signal searched for human nerves that could hold the address without burning.',
        },
      ],
    },
    {
      id: 'intro_shot_6_awakening',
      sceneKey: 'relic_chamber',
      durationSec: 6,
      transitionIn: 'corruptionBleed',
      transitionDurationMs: 650,
      cameraPan: { startX: 0, startY: -3, endX: 0, endY: 3 },
      particles: 'spores',
      stinger: 'chapter_card',
      titleCard: {
        startSec: 1.2,
        endSec: 5.6,
        eyebrow: 'METRO STATION 9 — SUB-LEVEL 4',
        title: 'SCARS OF THE LAST KINGDOM',
        subtitle: 'THE CITY IS DEAD. THE MARK ON YOUR WRIST IS NOT.',
      },
      subtitles: [
        {
          startSec: 0.4,
          endSec: 5.6,
          text: 'You wake on cold tile in Sector Nine. On your left wrist, a violet line beats once every forty-one hours.',
        },
      ],
    },
  ],
};
