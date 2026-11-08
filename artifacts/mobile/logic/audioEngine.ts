import { Platform } from 'react-native';

/**
 * Procedural Web Audio Engine for Scars of the Last Kingdom.
 *
 * Uses the Web Audio API to procedurally generate dark fantasy ambient drones
 * and tactical UI sound effects with ZERO external audio files (0 MB bandwidth).
 *
 * Safe across platforms (no-op on native platforms or in SSR environments).
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private ambientOscs: OscillatorNode[] = [];
  private ambientPlaying: boolean = false;
  private initialized: boolean = false;

  private initCtx() {
    if (this.ctx || Platform.OS !== 'web' || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch {
      // AudioContext creation blocked until user gesture
    }
  }

  public ensureRunning() {
    this.initCtx();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.isMuted = !enabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(enabled ? 0.7 : 0, this.ctx.currentTime, 0.05);
    }
    if (!enabled) {
      this.stopAmbient();
    }
  }

  public startAmbient(zone: 'metro' | 'surface' | 'archive' = 'metro') {
    if (this.isMuted || Platform.OS !== 'web' || typeof window === 'undefined') return;
    this.ensureRunning();
    if (!this.ctx || !this.masterGain || this.ambientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      // Gentle fade in over 2.5s
      this.ambientGain.gain.exponentialRampToValueAtTime(0.18, now + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(zone === 'surface' ? 320 : 160, now);

      // Low frequency root drone (55Hz = A1, 82.4Hz = E2)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, now);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.4, now); // subtle detune for beating

      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(27.5, now); // deep sub A0

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);

      this.ambientOscs = [osc1, osc2, subOsc];
      this.ambientPlaying = true;
    } catch {
      // Audio playback guard
    }
  }

  public stopAmbient() {
    if (!this.ctx || !this.ambientGain || !this.ambientPlaying) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      const oscsToStop = [...this.ambientOscs];
      setTimeout(() => {
        oscsToStop.forEach(o => {
          try { o.stop(); o.disconnect(); } catch {}
        });
      }, 1300);

      this.ambientOscs = [];
      this.ambientPlaying = false;
    } catch {}
  }

  public playSFX(type: 'click' | 'diceRoll' | 'diceSuccess' | 'diceCrit' | 'diceFail' | 'heartbeat' | 'markPulse') {
    if (this.isMuted || Platform.OS !== 'web' || typeof window === 'undefined') return;
    this.ensureRunning();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      switch (type) {
        case 'click': {
          // Tactile mechanical switch click
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(900, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }

        case 'diceRoll': {
          // Rhythmic dice tumbling clicks
          [0, 0.08, 0.17, 0.28].forEach((delay, i) => {
            if (!this.ctx || !this.masterGain) return;
            const t = now + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(350 + i * 80, t);
            osc.frequency.exponentialRampToValueAtTime(150, t + 0.05);
            gain.gain.setValueAtTime(0.14, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(t);
            osc.stop(t + 0.06);
          });
          break;
        }

        case 'diceSuccess': {
          // Bright ascending chime
          [523.25, 659.25, 783.99].forEach((freq, i) => { // C5, E5, G5
            if (!this.ctx || !this.masterGain) return;
            const t = now + i * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(t);
            osc.stop(t + 0.45);
          });
          break;
        }

        case 'diceCrit': {
          // Resonant harmonic chord
          [440, 554.37, 659.25, 880].forEach((freq) => {
            if (!this.ctx || !this.masterGain) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 0.85);
          });
          break;
        }

        case 'diceFail': {
          // Low hollow metallic thud
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        }

        case 'heartbeat': {
          // Double low pulse thump
          [0, 0.14].forEach((delay) => {
            if (!this.ctx || !this.masterGain) return;
            const t = now + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(65, t);
            osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(t);
            osc.stop(t + 0.13);
          });
          break;
        }

        case 'markPulse': {
          // Resonant high violet frequency
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.45);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.55);
          break;
        }
      }
    } catch {}
  }
}

export const sound = new AudioEngine();
