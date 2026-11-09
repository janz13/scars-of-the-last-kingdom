/**
 * Key-Matched Musical Stingers (Phase S5)
 *
 * Implements:
 * - 10 Ending Type Stingers (`death`, `betrayal`, `sacrifice`, `tyrant`, `savior`,
 *   `companion`, `faction`, `secret`, `corruption`, `wanderer`)
 * - 4 Set-Piece Stingers (`chapter_card`, `mark_awakening`, `crit_success`, `crit_failure`)
 * - Each stinger is 2–6s and synthesized via `voices.ts`.
 */

import type { EndingType } from '../../data/types';
import { triggerSynthVoice, type SynthVoiceId } from './voices';

export type StingerId =
  | EndingType
  | 'chapter_card'
  | 'mark_awakening'
  | 'crit_success'
  | 'crit_failure';

interface StingerEvent {
  delaySec: number;
  durationSec: number;
  midi: number;
  voice: SynthVoiceId;
  velocity?: number;
}

export const STINGER_DEFINITIONS: Record<StingerId, StingerEvent[]> = {
  death: [
    { delaySec: 0, durationSec: 2.8, midi: 38, voice: 'subDrone', velocity: 0.85 },
    { delaySec: 0.1, durationSec: 1.4, midi: 53, voice: 'sawPad', velocity: 0.7 },
    { delaySec: 0.9, durationSec: 1.8, midi: 49, voice: 'sawPad', velocity: 0.75 },
    { delaySec: 1.6, durationSec: 2.2, midi: 38, voice: 'bellPluck', velocity: 0.6 },
  ],
  betrayal: [
    { delaySec: 0, durationSec: 0.4, midi: 62, voice: 'bellPluck', velocity: 0.8 },
    { delaySec: 0.25, durationSec: 0.4, midi: 68, voice: 'bellPluck', velocity: 0.85 }, // tritone
    { delaySec: 0.55, durationSec: 2.5, midi: 37, voice: 'subDrone', velocity: 0.8 },
    { delaySec: 0.6, durationSec: 2.2, midi: 56, voice: 'sawPad', velocity: 0.75 },
  ],
  sacrifice: [
    { delaySec: 0, durationSec: 3.2, midi: 38, voice: 'subDrone', velocity: 0.75 },
    { delaySec: 0, durationSec: 1.5, midi: 62, voice: 'sawPad', velocity: 0.7 },
    { delaySec: 0.8, durationSec: 1.5, midi: 65, voice: 'pulseLead', velocity: 0.7 },
    { delaySec: 1.6, durationSec: 2.4, midi: 69, voice: 'bellPluck', velocity: 0.8 },
    { delaySec: 2.0, durationSec: 2.2, midi: 74, voice: 'bellPluck', velocity: 0.75 },
  ],
  tyrant: [
    { delaySec: 0, durationSec: 3.0, midi: 38, voice: 'subDrone', velocity: 0.9 },
    { delaySec: 0, durationSec: 0.5, midi: 50, voice: 'triangleBass', velocity: 0.9 },
    { delaySec: 0.5, durationSec: 0.5, midi: 53, voice: 'triangleBass', velocity: 0.9 },
    { delaySec: 1.0, durationSec: 2.2, midi: 57, voice: 'pulseLead', velocity: 0.85 },
    { delaySec: 1.0, durationSec: 2.2, midi: 45, voice: 'sawPad', velocity: 0.85 },
  ],
  savior: [
    { delaySec: 0, durationSec: 3.5, midi: 50, voice: 'subDrone', velocity: 0.75 },
    { delaySec: 0.2, durationSec: 1.2, midi: 62, voice: 'bellPluck', velocity: 0.75 },
    { delaySec: 0.6, durationSec: 1.2, midi: 66, voice: 'bellPluck', velocity: 0.8 }, // Picardy D major 3rd (F#4)
    { delaySec: 1.0, durationSec: 2.5, midi: 69, voice: 'bellPluck', velocity: 0.85 },
    { delaySec: 1.2, durationSec: 2.4, midi: 74, voice: 'sawPad', velocity: 0.7 },
  ],
  companion: [
    { delaySec: 0, durationSec: 3.0, midi: 45, voice: 'subDrone', velocity: 0.65 },
    { delaySec: 0, durationSec: 1.0, midi: 62, voice: 'bellPluck', velocity: 0.7 },
    { delaySec: 0.4, durationSec: 1.0, midi: 65, voice: 'bellPluck', velocity: 0.7 },
    { delaySec: 0.8, durationSec: 2.2, midi: 69, voice: 'sawPad', velocity: 0.65 },
    { delaySec: 1.2, durationSec: 2.0, midi: 64, voice: 'bellPluck', velocity: 0.7 },
  ],
  faction: [
    { delaySec: 0, durationSec: 2.8, midi: 38, voice: 'subDrone', velocity: 0.8 },
    { delaySec: 0, durationSec: 0.6, midi: 50, voice: 'pulseLead', velocity: 0.75 },
    { delaySec: 0.5, durationSec: 0.6, midi: 57, voice: 'pulseLead', velocity: 0.8 },
    { delaySec: 1.0, durationSec: 2.0, midi: 62, voice: 'pulseLead', velocity: 0.85 },
  ],
  secret: [
    { delaySec: 0, durationSec: 3.2, midi: 40, voice: 'subDrone', velocity: 0.7 },
    { delaySec: 0.2, durationSec: 1.2, midi: 74, voice: 'bellPluck', velocity: 0.7 },
    { delaySec: 0.6, durationSec: 1.2, midi: 70, voice: 'bellPluck', velocity: 0.7 },
    { delaySec: 1.0, durationSec: 1.4, midi: 69, voice: 'bellPluck', velocity: 0.75 },
    { delaySec: 1.5, durationSec: 2.0, midi: 64, voice: 'bellPluck', velocity: 0.8 },
  ],
  corruption: [
    { delaySec: 0, durationSec: 3.2, midi: 36, voice: 'subDrone', velocity: 0.9 },
    { delaySec: 0.1, durationSec: 2.8, midi: 54, voice: 'sawPad', velocity: 0.85 },
    { delaySec: 0.4, durationSec: 2.5, midi: 61, voice: 'pulseLead', velocity: 0.8 },
    { delaySec: 0.9, durationSec: 2.2, midi: 67, voice: 'bellPluck', velocity: 0.8 },
  ],
  wanderer: [
    { delaySec: 0, durationSec: 3.4, midi: 38, voice: 'subDrone', velocity: 0.65 },
    { delaySec: 0.2, durationSec: 1.2, midi: 62, voice: 'triangleBass', velocity: 0.7 },
    { delaySec: 0.8, durationSec: 1.2, midi: 69, voice: 'bellPluck', velocity: 0.7 },
    { delaySec: 1.5, durationSec: 2.0, midi: 67, voice: 'sawPad', velocity: 0.65 },
  ],
  chapter_card: [
    { delaySec: 0, durationSec: 2.4, midi: 38, voice: 'subDrone', velocity: 0.8 },
    { delaySec: 0.1, durationSec: 2.0, midi: 50, voice: 'sawPad', velocity: 0.7 },
    { delaySec: 0.3, durationSec: 1.8, midi: 62, voice: 'bellPluck', velocity: 0.75 },
  ],
  mark_awakening: [
    { delaySec: 0, durationSec: 2.6, midi: 38, voice: 'subDrone', velocity: 0.85 },
    { delaySec: 0.1, durationSec: 1.2, midi: 69, voice: 'bellPluck', velocity: 0.8 },
    { delaySec: 0.35, durationSec: 1.8, midi: 74, voice: 'pulseLead', velocity: 0.85 },
  ],
  crit_success: [
    { delaySec: 0, durationSec: 0.5, midi: 62, voice: 'bellPluck', velocity: 0.85 },
    { delaySec: 0.12, durationSec: 0.6, midi: 66, voice: 'bellPluck', velocity: 0.85 },
    { delaySec: 0.24, durationSec: 0.8, midi: 69, voice: 'bellPluck', velocity: 0.9 },
    { delaySec: 0.36, durationSec: 1.6, midi: 74, voice: 'pulseLead', velocity: 0.9 },
  ],
  crit_failure: [
    { delaySec: 0, durationSec: 1.8, midi: 38, voice: 'subDrone', velocity: 0.9 },
    { delaySec: 0.08, durationSec: 1.4, midi: 49, voice: 'sawPad', velocity: 0.85 },
    { delaySec: 0.2, durationSec: 1.5, midi: 44, voice: 'triangleBass', velocity: 0.85 },
  ],
};

export function playStingerOnContext(
  ctx: BaseAudioContext,
  destination: AudioNode,
  stingerId: StingerId,
  startTime: number = ctx.currentTime,
  corruptionLevel: number = 0
): number {
  const events = STINGER_DEFINITIONS[stingerId] ?? STINGER_DEFINITIONS.chapter_card;
  let maxEnd = 0;
  for (const ev of events) {
    triggerSynthVoice({
      ctx,
      destination,
      voice: ev.voice,
      midiNote: ev.midi,
      startTime: startTime + ev.delaySec,
      durationSec: ev.durationSec,
      velocity: ev.velocity ?? 0.75,
      corruptionLevel,
    });
    maxEnd = Math.max(maxEnd, ev.delaySec + ev.durationSec);
  }
  return maxEnd;
}
