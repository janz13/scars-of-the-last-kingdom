import { Platform } from 'react-native';
import { AudioMixer } from './music/mixer';
import { MusicSequencer, type MusicMode } from './music/sequencer';
import { playStingerOnContext, type StingerId } from './music/stingers';

/**
 * Procedural Web Audio & Adaptive Soundtrack Engine for Scars of the Last Kingdom.
 *
 * Unifies:
 * - Phase S1–S8 procedural soundtrack (`logic/music/{sequencer,voices,themes,stingers,mixer}.ts`)
 * - Ambient low-frequency drone beds (`ambience` bus)
 * - Tactical UI & dice SFX (`sfx` bus)
 *
 * Uses zero external audio files (0 MB bundle overhead) and is safe across platforms.
 */

export interface MusicEngineInterface {
  ensureRunning(): void;
  setSoundEnabled(enabled: boolean): void;
  setVolume(bus: 'master' | 'music' | 'sfx' | 'ambience', value: number): void;
  setMusicMode(mode: MusicMode): void;
  playTheme(themeId: string, intensity?: number): void;
  setAdaptiveState(corruption: number, lowHp: boolean): void;
  playStinger(stingerId: StingerId): void;
  startAmbient(zone?: 'metro' | 'surface' | 'archive'): void;
  stopAmbient(): void;
  playSFX(
    type:
      | 'click'
      | 'diceRoll'
      | 'diceSuccess'
      | 'diceCrit'
      | 'diceFail'
      | 'heartbeat'
      | 'markPulse'
  ): void;
}

class AudioEngine implements MusicEngineInterface {
  private ctx: AudioContext | null = null;
  private mixer: AudioMixer | null = null;
  private sequencer: MusicSequencer = new MusicSequencer();
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = false;
  private ambientOscs: OscillatorNode[] = [];
  private ambientPlaying: boolean = false;
  private corruptionLevel: number = 0;

  private initCtx() {
    if (this.ctx || Platform.OS !== 'web' || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.mixer = new AudioMixer(this.ctx);
      this.sequencer.attach(this.ctx, this.mixer.musicBus);
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
    if (this.mixer) {
      this.mixer.setMuted(!enabled);
    }
    if (!enabled) {
      this.stopAmbient();
      this.sequencer.stop();
    }
  }

  public setVolume(bus: 'master' | 'music' | 'sfx' | 'ambience', value: number) {
    this.initCtx();
    if (this.mixer) {
      this.mixer.setBusVolume(bus, value);
    }
  }

  public setMusicMode(mode: MusicMode) {
    this.sequencer.setMusicMode(mode);
    if (mode !== 'off' && !this.isMuted && this.ctx) {
      this.sequencer.start();
    }
  }

  public playTheme(themeId: string, intensity: number = 1) {
    if (this.isMuted || Platform.OS !== 'web' || typeof window === 'undefined') return;
    this.ensureRunning();
    if (!this.ctx || !this.mixer) return;
    this.sequencer.setTheme(themeId, intensity);
    this.sequencer.start();
  }

  public setAdaptiveState(corruption: number, lowHp: boolean) {
    this.corruptionLevel = corruption;
    this.sequencer.setAdaptiveState(corruption, lowHp);
  }

  public playStinger(stingerId: StingerId) {
    if (this.isMuted || Platform.OS !== 'web' || typeof window === 'undefined') return;
    this.ensureRunning();
    if (!this.ctx || !this.mixer) return;
    playStingerOnContext(
      this.ctx,
      this.mixer.musicBus,
      stingerId,
      this.ctx.currentTime,
      this.corruptionLevel
    );
  }

  public startAmbient(zone: 'metro' | 'surface' | 'archive' = 'metro') {
    if (this.isMuted || Platform.OS !== 'web' || typeof window === 'undefined') return;
    this.ensureRunning();
    if (!this.ctx || !this.mixer) return;

    // Also start the adaptive score matching the zone if not already running
    const zoneTheme =
      zone === 'surface' ? 'surface_bed' : zone === 'archive' ? 'last_archive' : 'main_theme';
    this.sequencer.setTheme(zoneTheme, 1);
    this.sequencer.start();

    if (this.ambientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.18, now + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(zone === 'surface' ? 320 : 160, now);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, now);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.4, now);

      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(27.5, now);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.mixer.ambienceBus);

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
        oscsToStop.forEach((o) => {
          try {
            o.stop();
            o.disconnect();
          } catch {}
        });
      }, 1300);

      this.ambientOscs = [];
      this.ambientPlaying = false;
    } catch {}
  }

  public playSFX(
    type:
      | 'click'
      | 'diceRoll'
      | 'diceSuccess'
      | 'diceCrit'
      | 'diceFail'
      | 'heartbeat'
      | 'markPulse'
  ) {
    if (this.isMuted || Platform.OS !== 'web' || typeof window === 'undefined') return;
    this.ensureRunning();
    if (!this.ctx || !this.mixer) return;

    const sfxOut = this.mixer.sfxBus;

    try {
      const now = this.ctx.currentTime;

      switch (type) {
        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(900, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(sfxOut);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }

        case 'diceRoll': {
          [0, 0.08, 0.17, 0.28].forEach((delay, i) => {
            if (!this.ctx) return;
            const t = now + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(350 + i * 80, t);
            osc.frequency.exponentialRampToValueAtTime(150, t + 0.05);
            gain.gain.setValueAtTime(0.14, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
            osc.connect(gain);
            gain.connect(sfxOut);
            osc.start(t);
            osc.stop(t + 0.06);
          });
          break;
        }

        case 'diceSuccess': {
          [523.25, 659.25, 783.99].forEach((freq, i) => {
            if (!this.ctx) return;
            const t = now + i * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
            osc.connect(gain);
            gain.connect(sfxOut);
            osc.start(t);
            osc.stop(t + 0.45);
          });
          break;
        }

        case 'diceCrit': {
          this.playStinger('crit_success');
          break;
        }

        case 'diceFail': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
          osc.connect(gain);
          gain.connect(sfxOut);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        }

        case 'heartbeat': {
          [0, 0.14].forEach((delay) => {
            if (!this.ctx) return;
            const t = now + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(65, t);
            osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
            osc.connect(gain);
            gain.connect(sfxOut);
            osc.start(t);
            osc.stop(t + 0.13);
          });
          break;
        }

        case 'markPulse': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.45);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.connect(gain);
          gain.connect(sfxOut);
          osc.start(now);
          osc.stop(now + 0.55);
          break;
        }
      }
    } catch {}
  }
}

export const sound = new AudioEngine();
