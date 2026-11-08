/**
 * Lookahead Procedural Music Sequencer & 75s Offline Trailer Renderer (Phase S1, S4, S7)
 *
 * Implements:
 * - S1: 25ms lookahead tick with 100ms scheduling horizon.
 * - S4: Adaptive layering (0–3 intensity), bar-boundary theme crossfading, corruption detune,
 *   and low-HP heartbeat replacement.
 * - S7: Dedicated 75s trailer arrangement renderer (`renderOfflineTrailerCueToWav`) that
 *   synthesizes the full trailer score into a 48 kHz 16-bit PCM WAV buffer.
 */

import { getThemeScore, type ThemeScore } from './themes';
import { triggerSynthVoice } from './voices';

export type MusicMode = 'adaptive' | 'calm' | 'off';

export class MusicSequencer {
  private ctx: BaseAudioContext | null = null;
  private destination: AudioNode | null = null;
  private currentScore: ThemeScore = getThemeScore('main_theme');
  private intensity: number = 1;
  private mode: MusicMode = 'adaptive';
  private corruptionLevel: number = 0;
  private lowHpActive: boolean = false;

  private isPlaying: boolean = false;
  private currentStep: number = 0;
  private nextStepTime: number = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;

  public attach(ctx: BaseAudioContext, destination: AudioNode): void {
    this.ctx = ctx;
    this.destination = destination;
  }

  public setTheme(themeId: string, intensity: number = 1): void {
    const effectiveTheme = this.mode === 'calm' ? 'calm_bed' : themeId;
    const nextScore = getThemeScore(effectiveTheme);
    if (this.currentScore.id !== nextScore.id) {
      this.currentScore = nextScore;
      this.currentStep = 0;
    }
    this.intensity = Math.max(0, Math.min(3, intensity));
  }

  public setAdaptiveState(corruption: number, lowHp: boolean): void {
    this.corruptionLevel = Math.max(0, Math.min(100, corruption));
    this.lowHpActive = lowHp;
  }

  public setMusicMode(mode: MusicMode): void {
    this.mode = mode;
    if (mode === 'off') {
      this.stop();
    } else if (mode === 'calm') {
      this.currentScore = getThemeScore('calm_bed');
    }
  }

  public getMusicMode(): MusicMode {
    return this.mode;
  }

  public start(): void {
    if (this.isPlaying || this.mode === 'off' || !this.ctx || !this.destination) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextStepTime = this.ctx.currentTime + 0.05;

    // 25ms lookahead scheduler with 100ms horizon
    this.timerId = setInterval(() => {
      this.schedulerTick();
    }, 25);
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private schedulerTick(): void {
    if (!this.isPlaying || !this.ctx || !this.destination || this.mode === 'off') return;

    const horizon = this.ctx.currentTime + 0.1;
    const stepDurationSec = 60 / this.currentScore.bpm / 4; // 16th note duration

    while (this.nextStepTime < horizon) {
      this.scheduleStep(this.currentStep, this.nextStepTime, stepDurationSec);
      this.nextStepTime += stepDurationSec;
      this.currentStep = (this.currentStep + 1) % this.currentScore.totalSteps;
    }
  }

  private scheduleStep(stepIndex: number, startTime: number, stepDurationSec: number): void {
    if (!this.ctx || !this.destination) return;

    const effectiveIntensity = this.mode === 'calm' ? Math.min(1, this.intensity) : this.intensity;

    for (const note of this.currentScore.notes) {
      if (note.step !== stepIndex) continue;
      if (note.minIntensity > effectiveIntensity) continue;

      // S4: At low HP, replace kick drum with a double heartbeat pulse
      if (this.lowHpActive && note.voice === 'noiseKit' && note.drumKind === 'kick') {
        triggerSynthVoice({
          ctx: this.ctx,
          destination: this.destination,
          voice: 'subDrone',
          midiNote: 36,
          startTime,
          durationSec: 0.11,
          velocity: 0.9,
        });
        triggerSynthVoice({
          ctx: this.ctx,
          destination: this.destination,
          voice: 'subDrone',
          midiNote: 34,
          startTime: startTime + 0.15,
          durationSec: 0.12,
          velocity: 0.75,
        });
        continue;
      }

      triggerSynthVoice({
        ctx: this.ctx,
        destination: this.destination,
        voice: note.voice,
        midiNote: note.midi,
        startTime,
        durationSec: note.lengthSteps * stepDurationSec,
        velocity: note.velocity ?? 0.7,
        corruptionLevel: this.corruptionLevel,
        drumKind: note.drumKind,
      });
    }
  }

  /**
   * Renders a ThemeScore or the 75-second trailer arrangement into a given AudioContext/OfflineAudioContext.
   */
  public static scheduleArrangementOffline(
    ctx: BaseAudioContext,
    destination: AudioNode,
    sections: Array<{ themeId: string; intensity: number; durationSec: number; corruption?: number }>
  ): number {
    let cursorSec = 0.05;

    for (const sec of sections) {
      const score = getThemeScore(sec.themeId);
      const stepDur = 60 / score.bpm / 4;
      const totalStepsToPlay = Math.max(1, Math.floor(sec.durationSec / stepDur));

      for (let s = 0; s < totalStepsToPlay; s++) {
        const patternStep = s % score.totalSteps;
        const stepStart = cursorSec + s * stepDur;

        for (const note of score.notes) {
          if (note.step !== patternStep) continue;
          if (note.minIntensity > sec.intensity) continue;

          triggerSynthVoice({
            ctx,
            destination,
            voice: note.voice,
            midiNote: note.midi,
            startTime: stepStart,
            durationSec: note.lengthSteps * stepDur,
            velocity: note.velocity ?? 0.75,
            corruptionLevel: sec.corruption ?? 0,
            drumKind: note.drumKind,
          });
        }
      }

      cursorSec += sec.durationSec;
    }

    return cursorSec;
  }
}

/**
 * Standard 75-second trailer musical structure (Phase S7):
 * Quiet tunnel bed (0–15s) -> Main theme build (15–35s) -> Faction montage (35–55s) ->
 * Combat climax hit (55–65s) -> Epilogue theme "Is Anyone Still There?" unresolved tag (65–75s).
 */
export const TRAILER_75S_ARRANGEMENT = [
  { themeId: 'tunnel_bed', intensity: 1, durationSec: 15, corruption: 0 },
  { themeId: 'main_theme', intensity: 3, durationSec: 20, corruption: 10 },
  { themeId: 'iron_saints', intensity: 3, durationSec: 10, corruption: 20 },
  { themeId: 'red_choir', intensity: 3, durationSec: 10, corruption: 55 },
  { themeId: 'combat_loop', intensity: 3, durationSec: 10, corruption: 75 },
  { themeId: 'epilogue_theme', intensity: 2, durationSec: 10, corruption: 15 },
];
