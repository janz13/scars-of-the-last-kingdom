/**
 * Procedural Synth Instrument Voices (Phase S2)
 *
 * Implements the 6 chiptune-adjacent dark fantasy synth voices:
 * 1. `pulseLead`: Variable-feel pulse/square lead with subtle vibrato & lowpass envelope
 * 2. `triangleBass`: Warm 16-bit triangle bassline voice
 * 3. `sawPad`: 3-voice detuned sawtooth pad with warm low-pass filter (supports corruption detune)
 * 4. `noiseKit`: Filtered noise percussion (kick, snare, closed hat)
 * 5. `bellPluck`: 2-operator FM metallic bell / music-box pluck (Glass Court & Last Archive)
 * 6. `subDrone`: Deep resonant sub-bass harmonic anchor
 */

export type SynthVoiceId =
  | 'pulseLead'
  | 'triangleBass'
  | 'sawPad'
  | 'noiseKit'
  | 'bellPluck'
  | 'subDrone';

export interface NoteTriggerParams {
  ctx: BaseAudioContext;
  destination: AudioNode;
  voice: SynthVoiceId;
  midiNote: number;
  startTime: number;
  durationSec: number;
  velocity?: number;
  corruptionLevel?: number;
  drumKind?: 'kick' | 'snare' | 'hat';
}

/**
 * Converts a MIDI note number (e.g. 60 = C4, 69 = A4) to frequency in Hz.
 */
export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Triggers a single procedural synth note or drum hit on the provided AudioContext / OfflineAudioContext.
 */
export function triggerSynthVoice(params: NoteTriggerParams): void {
  const {
    ctx,
    destination,
    voice,
    midiNote,
    startTime,
    durationSec,
    velocity = 0.7,
    corruptionLevel = 0,
    drumKind = 'kick',
  } = params;

  const freq = midiToFreq(midiNote);
  const safeStart = Math.max(ctx.currentTime, startTime);
  const dur = Math.max(0.04, durationSec);
  const corrDetuneCents = corruptionLevel >= 50 ? ((corruptionLevel - 50) / 50) * 35 : 0;

  try {
    switch (voice) {
      case 'pulseLead': {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, safeStart);
        if (corrDetuneCents > 0) {
          osc.detune.setValueAtTime(corrDetuneCents, safeStart);
        }

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 4.5, safeStart);
        filter.frequency.exponentialRampToValueAtTime(Math.max(220, freq * 1.6), safeStart + dur);

        const peak = 0.14 * velocity;
        gain.gain.setValueAtTime(0.0001, safeStart);
        gain.gain.linearRampToValueAtTime(peak, safeStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, safeStart + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        osc.start(safeStart);
        osc.stop(safeStart + dur + 0.02);
        break;
      }

      case 'triangleBass': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, safeStart);

        const peak = 0.22 * velocity;
        gain.gain.setValueAtTime(0.0001, safeStart);
        gain.gain.linearRampToValueAtTime(peak, safeStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, safeStart + dur);

        osc.connect(gain);
        gain.connect(destination);

        osc.start(safeStart);
        osc.stop(safeStart + dur + 0.02);
        break;
      }

      case 'sawPad': {
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(680, safeStart);

        const peak = 0.08 * velocity;
        const attack = Math.min(0.25, dur * 0.3);
        gain.gain.setValueAtTime(0.0001, safeStart);
        gain.gain.linearRampToValueAtTime(peak, safeStart + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, safeStart + dur + 0.08);

        filter.connect(gain);
        gain.connect(destination);

        const detunes = [-9 - corrDetuneCents, 0, 9 + corrDetuneCents];
        for (const cents of detunes) {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, safeStart);
          osc.detune.setValueAtTime(cents, safeStart);
          osc.connect(filter);
          osc.start(safeStart);
          osc.stop(safeStart + dur + 0.1);
        }
        break;
      }

      case 'bellPluck': {
        // 2-operator FM metallic bell / music-box pluck
        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const outGain = ctx.createGain();

        carrier.type = 'sine';
        carrier.frequency.setValueAtTime(freq, safeStart);

        modulator.type = 'sine';
        modulator.frequency.setValueAtTime(freq * 2.41, safeStart); // inharmonic bell ratio

        modGain.gain.setValueAtTime(freq * 1.8, safeStart);
        modGain.gain.exponentialRampToValueAtTime(0.1, safeStart + Math.min(0.35, dur));

        const peak = 0.15 * velocity;
        outGain.gain.setValueAtTime(0.0001, safeStart);
        outGain.gain.linearRampToValueAtTime(peak, safeStart + 0.006);
        outGain.gain.exponentialRampToValueAtTime(0.0001, safeStart + dur + 0.12);

        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        carrier.connect(outGain);
        outGain.connect(destination);

        modulator.start(safeStart);
        carrier.start(safeStart);
        modulator.stop(safeStart + dur + 0.14);
        carrier.stop(safeStart + dur + 0.14);
        break;
      }

      case 'subDrone': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, safeStart);

        const peak = 0.18 * velocity;
        gain.gain.setValueAtTime(0.0001, safeStart);
        gain.gain.linearRampToValueAtTime(peak, safeStart + Math.min(0.3, dur * 0.35));
        gain.gain.exponentialRampToValueAtTime(0.0001, safeStart + dur + 0.05);

        osc.connect(gain);
        gain.connect(destination);

        osc.start(safeStart);
        osc.stop(safeStart + dur + 0.06);
        break;
      }

      case 'noiseKit': {
        if (drumKind === 'kick') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(115, safeStart);
          osc.frequency.exponentialRampToValueAtTime(36, safeStart + 0.11);
          gain.gain.setValueAtTime(0.24 * velocity, safeStart);
          gain.gain.exponentialRampToValueAtTime(0.0001, safeStart + 0.13);
          osc.connect(gain);
          gain.connect(destination);
          osc.start(safeStart);
          osc.stop(safeStart + 0.14);
        } else {
          // Snare or closed hat using short deterministic white-noise buffer
          const bufLen = Math.max(256, Math.floor(ctx.sampleRate * (drumKind === 'snare' ? 0.12 : 0.045)));
          const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          let seed = 987654321;
          for (let i = 0; i < bufLen; i++) {
            seed = (seed * 1664525 + 1013904223) >>> 0;
            data[i] = ((seed / 0xffffffff) * 2 - 1) * Math.exp(-i / (bufLen * 0.35));
          }

          const src = ctx.createBufferSource();
          src.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = drumKind === 'snare' ? 'bandpass' : 'highpass';
          filter.frequency.setValueAtTime(drumKind === 'snare' ? 1400 : 5200, safeStart);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime((drumKind === 'snare' ? 0.16 : 0.09) * velocity, safeStart);
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            safeStart + (drumKind === 'snare' ? 0.12 : 0.045)
          );

          src.connect(filter);
          filter.connect(gain);
          gain.connect(destination);
          src.start(safeStart);
        }
        break;
      }
    }
  } catch {
    // Guard against closed or restricted AudioContext
  }
}
