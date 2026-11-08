/**
 * 3-Bus Procedural Audio Mixer (`master`, `music`, `sfx`, `ambience`)
 *
 * Implements Phase S2 & S8:
 * - Separate `music`, `sfx`, and `ambience` GainNodes feeding into a `master` GainNode + DynamicsCompressor limiter.
 * - Supports both live `AudioContext` and offline `OfflineAudioContext` for trailer WAV renders.
 */

export interface MixerVolumes {
  master: number;
  music: number;
  sfx: number;
  ambience: number;
  muted: boolean;
}

export class AudioMixer {
  public readonly ctx: BaseAudioContext;
  public readonly masterBus: GainNode;
  public readonly musicBus: GainNode;
  public readonly sfxBus: GainNode;
  public readonly ambienceBus: GainNode;
  public readonly limiter: DynamicsCompressorNode;

  private volumes: MixerVolumes = {
    master: 0.8,
    music: 0.7,
    sfx: 0.85,
    ambience: 0.65,
    muted: false,
  };

  constructor(ctx: BaseAudioContext) {
    this.ctx = ctx;

    this.limiter = ctx.createDynamicsCompressor();
    try {
      this.limiter.threshold.setValueAtTime(-6, ctx.currentTime);
      this.limiter.knee.setValueAtTime(12, ctx.currentTime);
      this.limiter.ratio.setValueAtTime(8, ctx.currentTime);
      this.limiter.attack.setValueAtTime(0.005, ctx.currentTime);
      this.limiter.release.setValueAtTime(0.15, ctx.currentTime);
    } catch {}

    this.masterBus = ctx.createGain();
    this.musicBus = ctx.createGain();
    this.sfxBus = ctx.createGain();
    this.ambienceBus = ctx.createGain();

    this.musicBus.connect(this.masterBus);
    this.sfxBus.connect(this.masterBus);
    this.ambienceBus.connect(this.masterBus);
    this.masterBus.connect(this.limiter);
    this.limiter.connect(ctx.destination);

    this.applyVolumesImmediate();
  }

  private applyVolumesImmediate(): void {
    const now = this.ctx.currentTime;
    const masterGain = this.volumes.muted ? 0 : this.volumes.master;
    try {
      this.masterBus.gain.setValueAtTime(masterGain, now);
      this.musicBus.gain.setValueAtTime(this.volumes.music, now);
      this.sfxBus.gain.setValueAtTime(this.volumes.sfx, now);
      this.ambienceBus.gain.setValueAtTime(this.volumes.ambience, now);
    } catch {}
  }

  public setMuted(muted: boolean): void {
    this.volumes.muted = muted;
    try {
      this.masterBus.gain.setTargetAtTime(
        muted ? 0 : this.volumes.master,
        this.ctx.currentTime,
        0.04
      );
    } catch {}
  }

  public setBusVolume(bus: 'master' | 'music' | 'sfx' | 'ambience', value: number): void {
    const clamped = Math.max(0, Math.min(1, value));
    this.volumes[bus] = clamped;
    const now = this.ctx.currentTime;
    try {
      if (bus === 'master') {
        this.masterBus.gain.setTargetAtTime(this.volumes.muted ? 0 : clamped, now, 0.04);
      } else if (bus === 'music') {
        this.musicBus.gain.setTargetAtTime(clamped, now, 0.05);
      } else if (bus === 'sfx') {
        this.sfxBus.gain.setTargetAtTime(clamped, now, 0.03);
      } else if (bus === 'ambience') {
        this.ambienceBus.gain.setTargetAtTime(clamped, now, 0.06);
      }
    } catch {}
  }

  public getVolumes(): MixerVolumes {
    return { ...this.volumes };
  }
}
