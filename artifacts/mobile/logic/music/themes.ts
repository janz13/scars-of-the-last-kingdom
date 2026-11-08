/**
 * Composed Procedural Soundtrack Themes (Phase S3)
 *
 * Includes:
 * 1. `main_theme` — "The Last Kingdom" (D minor, 72 BPM)
 * 2. `iron_saints` — Iron Saints motif (March snare, low brass-like pulse, 84 BPM)
 * 3. `glass_court` — Glass Court motif (Cold bell arpeggios, 76 BPM)
 * 4. `red_choir` — Red Choir motif (Minor-key choir pad swells, 66 BPM)
 * 5. `last_archive` — Last Archive motif (Slow music-box FM bells, 64 BPM)
 * 6. `hollow_children` — Hollow Children motif (Detuned lullaby, 70 BPM)
 * 7. `tunnel_bed` — Underground tunnel ambient bed (60 BPM)
 * 8. `surface_bed` — Surface ruins wind & ash bed (64 BPM)
 * 9. `calm_bed` — Quiet safehouse / clinic reflection bed (62 BPM)
 * 10. `combat_loop` — High-tension combat / dice crisis loop (108 BPM)
 * 11. `epilogue_theme` — "Is Anyone Still There?" (Main theme inverted, unresolved suspended cadence, 68 BPM)
 */

import type { SynthVoiceId } from './voices';

export interface PatternNote {
  /** Step index in 16th-note grid (0..15 per bar) */
  step: number;
  /** MIDI note number (e.g. 62 = D4) */
  midi: number;
  /** Duration in 16th-note steps */
  lengthSteps: number;
  /** Synth voice to trigger */
  voice: SynthVoiceId;
  /** Minimum intensity required (0 = always, 1 = light, 2 = medium, 3 = full) */
  minIntensity: number;
  /** Optional velocity (0..1) */
  velocity?: number;
  /** Optional drum kind when voice === 'noiseKit' */
  drumKind?: 'kick' | 'snare' | 'hat';
}

export interface ThemeScore {
  id: string;
  title: string;
  bpm: number;
  stepsPerBar: number;
  totalSteps: number;
  notes: PatternNote[];
}

// MIDI Reference:
// D2=38, A2=45, Bb2=46, C3=48, D3=50, E3=52, F3=53, G3=55, A3=57, Bb3=58, C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, Bb4=70, C5=72, D5=74

export const THEME_SCORES: Record<string, ThemeScore> = {
  main_theme: {
    id: 'main_theme',
    title: 'The Last Kingdom',
    bpm: 72,
    stepsPerBar: 16,
    totalSteps: 32,
    notes: [
      // Sub drone anchor (Intensity >= 0)
      { step: 0, midi: 38, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.75 },
      { step: 16, midi: 34, lengthSteps: 8, voice: 'subDrone', minIntensity: 0, velocity: 0.7 },
      { step: 24, midi: 33, lengthSteps: 8, voice: 'subDrone', minIntensity: 0, velocity: 0.7 },
      // Saw pad chords (Intensity >= 1)
      { step: 0, midi: 50, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.65 },
      { step: 0, midi: 53, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.6 },
      { step: 16, midi: 46, lengthSteps: 8, voice: 'sawPad', minIntensity: 1, velocity: 0.6 },
      { step: 24, midi: 45, lengthSteps: 8, voice: 'sawPad', minIntensity: 1, velocity: 0.65 },
      // Melancholic D-minor pulse lead melody (Intensity >= 2)
      { step: 0, midi: 62, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.7 },
      { step: 4, midi: 65, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.65 },
      { step: 8, midi: 69, lengthSteps: 6, voice: 'pulseLead', minIntensity: 2, velocity: 0.75 },
      { step: 14, midi: 67, lengthSteps: 2, voice: 'pulseLead', minIntensity: 2, velocity: 0.6 },
      { step: 16, midi: 65, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.7 },
      { step: 20, midi: 64, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.65 },
      { step: 24, midi: 62, lengthSteps: 8, voice: 'pulseLead', minIntensity: 2, velocity: 0.75 },
      // Percussion & bass motion (Intensity >= 3)
      { step: 0, midi: 50, lengthSteps: 2, voice: 'noiseKit', drumKind: 'kick', minIntensity: 3 },
      { step: 8, midi: 50, lengthSteps: 2, voice: 'noiseKit', drumKind: 'snare', minIntensity: 3 },
      { step: 16, midi: 50, lengthSteps: 2, voice: 'noiseKit', drumKind: 'kick', minIntensity: 3 },
      { step: 24, midi: 50, lengthSteps: 2, voice: 'noiseKit', drumKind: 'snare', minIntensity: 3 },
    ],
  },

  iron_saints: {
    id: 'iron_saints',
    title: 'Banners of Cinder and Iron',
    bpm: 84,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 38, lengthSteps: 8, voice: 'subDrone', minIntensity: 0, velocity: 0.8 },
      { step: 8, midi: 41, lengthSteps: 8, voice: 'subDrone', minIntensity: 0, velocity: 0.8 },
      { step: 0, midi: 50, lengthSteps: 4, voice: 'triangleBass', minIntensity: 1, velocity: 0.8 },
      { step: 4, midi: 50, lengthSteps: 4, voice: 'triangleBass', minIntensity: 1, velocity: 0.75 },
      { step: 8, midi: 53, lengthSteps: 4, voice: 'triangleBass', minIntensity: 1, velocity: 0.8 },
      { step: 12, midi: 45, lengthSteps: 4, voice: 'triangleBass', minIntensity: 1, velocity: 0.8 },
      // March snare & low brass-like pulse
      { step: 0, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'kick', minIntensity: 2 },
      { step: 4, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'snare', minIntensity: 2 },
      { step: 8, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'kick', minIntensity: 2 },
      { step: 12, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'snare', minIntensity: 2 },
      { step: 14, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'snare', minIntensity: 2 },
      { step: 0, midi: 57, lengthSteps: 6, voice: 'pulseLead', minIntensity: 2, velocity: 0.75 },
      { step: 8, midi: 62, lengthSteps: 6, voice: 'pulseLead', minIntensity: 2, velocity: 0.8 },
    ],
  },

  glass_court: {
    id: 'glass_court',
    title: 'Mirrors Above the Ash',
    bpm: 76,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 48, lengthSteps: 16, voice: 'sawPad', minIntensity: 0, velocity: 0.55 },
      { step: 0, midi: 60, lengthSteps: 3, voice: 'bellPluck', minIntensity: 1, velocity: 0.7 },
      { step: 3, midi: 63, lengthSteps: 3, voice: 'bellPluck', minIntensity: 1, velocity: 0.65 },
      { step: 6, midi: 67, lengthSteps: 3, voice: 'bellPluck', minIntensity: 1, velocity: 0.7 },
      { step: 9, midi: 72, lengthSteps: 3, voice: 'bellPluck', minIntensity: 1, velocity: 0.75 },
      { step: 12, midi: 70, lengthSteps: 4, voice: 'bellPluck', minIntensity: 2, velocity: 0.7 },
      { step: 8, midi: 36, lengthSteps: 8, voice: 'subDrone', minIntensity: 2, velocity: 0.65 },
    ],
  },

  red_choir: {
    id: 'red_choir',
    title: 'Hymn of the Carrier Wave',
    bpm: 66,
    stepsPerBar: 16,
    totalSteps: 32,
    notes: [
      { step: 0, midi: 39, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.75 },
      { step: 16, midi: 38, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.75 },
      { step: 0, midi: 51, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.8 },
      { step: 0, midi: 58, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.75 },
      { step: 16, midi: 50, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.8 },
      { step: 16, midi: 57, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.75 },
      { step: 4, midi: 63, lengthSteps: 8, voice: 'pulseLead', minIntensity: 2, velocity: 0.6 },
      { step: 20, midi: 62, lengthSteps: 8, voice: 'pulseLead', minIntensity: 2, velocity: 0.6 },
    ],
  },

  last_archive: {
    id: 'last_archive',
    title: 'Catalog of Unburned Pages',
    bpm: 64,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 45, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.6 },
      { step: 0, midi: 69, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.65 },
      { step: 4, midi: 72, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.6 },
      { step: 8, midi: 76, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.65 },
      { step: 12, midi: 74, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.55 },
      { step: 0, midi: 57, lengthSteps: 16, voice: 'sawPad', minIntensity: 2, velocity: 0.5 },
    ],
  },

  hollow_children: {
    id: 'hollow_children',
    title: 'Chalk Names on the Turnstile',
    bpm: 70,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 43, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.6 },
      { step: 0, midi: 67, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.6 },
      { step: 4, midi: 70, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.55 },
      { step: 8, midi: 69, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.55 },
      { step: 12, midi: 62, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.6 },
      { step: 0, midi: 55, lengthSteps: 8, voice: 'triangleBass', minIntensity: 2, velocity: 0.65 },
      { step: 8, midi: 50, lengthSteps: 8, voice: 'triangleBass', minIntensity: 2, velocity: 0.65 },
    ],
  },

  tunnel_bed: {
    id: 'tunnel_bed',
    title: 'Beneath the Third Rail',
    bpm: 60,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 38, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.7 },
      { step: 0, midi: 50, lengthSteps: 16, voice: 'sawPad', minIntensity: 1, velocity: 0.45 },
      { step: 6, midi: 62, lengthSteps: 4, voice: 'bellPluck', minIntensity: 2, velocity: 0.4 },
      { step: 12, midi: 57, lengthSteps: 4, voice: 'triangleBass', minIntensity: 2, velocity: 0.5 },
    ],
  },

  surface_bed: {
    id: 'surface_bed',
    title: 'Ash Over the Overpass',
    bpm: 64,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 41, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.65 },
      { step: 0, midi: 53, lengthSteps: 12, voice: 'sawPad', minIntensity: 1, velocity: 0.55 },
      { step: 8, midi: 60, lengthSteps: 8, voice: 'sawPad', minIntensity: 1, velocity: 0.5 },
      { step: 4, midi: 65, lengthSteps: 6, voice: 'pulseLead', minIntensity: 2, velocity: 0.5 },
    ],
  },

  calm_bed: {
    id: 'calm_bed',
    title: 'Lantern in the Clinic',
    bpm: 62,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 43, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.55 },
      { step: 0, midi: 62, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.5 },
      { step: 6, midi: 65, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.5 },
      { step: 12, midi: 69, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.5 },
      { step: 0, midi: 50, lengthSteps: 16, voice: 'sawPad', minIntensity: 2, velocity: 0.45 },
    ],
  },

  combat_loop: {
    id: 'combat_loop',
    title: 'Knives in the Turnstile',
    bpm: 108,
    stepsPerBar: 16,
    totalSteps: 16,
    notes: [
      { step: 0, midi: 38, lengthSteps: 4, voice: 'triangleBass', minIntensity: 0, velocity: 0.85 },
      { step: 4, midi: 38, lengthSteps: 4, voice: 'triangleBass', minIntensity: 0, velocity: 0.8 },
      { step: 8, midi: 41, lengthSteps: 4, voice: 'triangleBass', minIntensity: 0, velocity: 0.85 },
      { step: 12, midi: 37, lengthSteps: 4, voice: 'triangleBass', minIntensity: 0, velocity: 0.85 },
      { step: 0, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'kick', minIntensity: 1 },
      { step: 4, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'snare', minIntensity: 1 },
      { step: 8, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'kick', minIntensity: 1 },
      { step: 12, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'snare', minIntensity: 1 },
      { step: 2, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'hat', minIntensity: 2 },
      { step: 6, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'hat', minIntensity: 2 },
      { step: 10, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'hat', minIntensity: 2 },
      { step: 14, midi: 50, lengthSteps: 1, voice: 'noiseKit', drumKind: 'hat', minIntensity: 2 },
      { step: 0, midi: 62, lengthSteps: 3, voice: 'pulseLead', minIntensity: 2, velocity: 0.8 },
      { step: 6, midi: 65, lengthSteps: 3, voice: 'pulseLead', minIntensity: 2, velocity: 0.8 },
      { step: 12, midi: 61, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.85 },
    ],
  },

  epilogue_theme: {
    id: 'epilogue_theme',
    title: 'Is Anyone Still There?',
    bpm: 68,
    stepsPerBar: 16,
    totalSteps: 32,
    notes: [
      // Inverted main theme (descending from A4 -> F4 -> D4, ending on unresolved Dsus2 / E4)
      { step: 0, midi: 38, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.7 },
      { step: 16, midi: 40, lengthSteps: 16, voice: 'subDrone', minIntensity: 0, velocity: 0.65 },
      { step: 0, midi: 69, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.7 },
      { step: 4, midi: 65, lengthSteps: 4, voice: 'bellPluck', minIntensity: 1, velocity: 0.65 },
      { step: 8, midi: 62, lengthSteps: 6, voice: 'bellPluck', minIntensity: 1, velocity: 0.7 },
      { step: 14, midi: 64, lengthSteps: 2, voice: 'bellPluck', minIntensity: 1, velocity: 0.65 },
      { step: 16, midi: 65, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.65 },
      { step: 20, midi: 67, lengthSteps: 4, voice: 'pulseLead', minIntensity: 2, velocity: 0.65 },
      // Unresolved suspended 2nd cadence (E4 over D3)
      { step: 24, midi: 64, lengthSteps: 8, voice: 'pulseLead', minIntensity: 1, velocity: 0.75 },
      { step: 24, midi: 50, lengthSteps: 8, voice: 'sawPad', minIntensity: 1, velocity: 0.7 },
      { step: 24, midi: 57, lengthSteps: 8, voice: 'sawPad', minIntensity: 1, velocity: 0.65 },
    ],
  },
};

export function getThemeScore(themeId?: string): ThemeScore {
  if (themeId && THEME_SCORES[themeId]) {
    return THEME_SCORES[themeId]!;
  }
  return THEME_SCORES.main_theme!;
}
