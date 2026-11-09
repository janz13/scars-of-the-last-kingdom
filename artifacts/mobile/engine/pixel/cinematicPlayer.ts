import type { AtmosphereType } from './particles';
import type { PixelTransitionMode } from './transitions';
import type { StingerId } from '../../logic/music/stingers';

export type ParticleKind = AtmosphereType;
export type TransitionKind =
  | PixelTransitionMode
  | 'cut'
  | 'ditherDissolve'
  | 'irisWipe'
  | 'corruptionBleed'
  | 'scanlineWipe'
  | 'horizontalSlat';
export type ThemeId = string;

export interface CinematicSubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

export interface CinematicTitleCardCue {
  startSec: number;
  endSec: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export interface CinematicShot {
  id: string;
  sceneKey: string;
  durationSec: number;
  transitionIn?: TransitionKind;
  transitionDurationMs?: number;
  cameraPan?: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    zoom?: number;
  };
  particles?: ParticleKind;
  musicTheme?: ThemeId;
  stinger?: StingerId;
  subtitles?: CinematicSubtitleCue[];
  titleCard?: CinematicTitleCardCue;
}

export interface CinematicTimeline {
  id: string;
  title: string;
  loop: boolean;
  totalDurationSec: number;
  shots: CinematicShot[];
}

export interface CinematicFrameState {
  timelineId: string;
  elapsedSec: number;
  progress: number;
  isComplete: boolean;
  activeShot: CinematicShot;
  shotIndex: number;
  shotElapsedSec: number;
  shotProgress: number;
  panOffset: { x: number; y: number };
  activeSubtitle: CinematicSubtitleCue | null;
  activeTitleCard: CinematicTitleCardCue | null;
}

export class CinematicPlayer {
  private timeline: CinematicTimeline;
  private elapsedSec = 0;
  private playing = false;
  private lastTriggeredShotIndex = -1;

  constructor(timeline: CinematicTimeline) {
    this.timeline = timeline;
  }

  public getTimeline(): CinematicTimeline {
    return this.timeline;
  }

  public setTimeline(timeline: CinematicTimeline): void {
    this.timeline = timeline;
    this.reset();
  }

  public play(): void {
    this.playing = true;
  }

  public pause(): void {
    this.playing = false;
  }

  public reset(): void {
    this.elapsedSec = 0;
    this.lastTriggeredShotIndex = -1;
  }

  public seek(seconds: number): void {
    const total = Math.max(0.1, this.timeline.totalDurationSec);
    if (this.timeline.loop) {
      this.elapsedSec = ((seconds % total) + total) % total;
    } else {
      this.elapsedSec = Math.max(0, Math.min(total, seconds));
    }
  }

  public step(deltaSec: number): CinematicFrameState {
    if (this.playing && deltaSec > 0) {
      this.elapsedSec += deltaSec;
      const total = Math.max(0.1, this.timeline.totalDurationSec);
      if (this.elapsedSec >= total) {
        if (this.timeline.loop) {
          this.elapsedSec = this.elapsedSec % total;
        } else {
          this.elapsedSec = total;
          this.playing = false;
        }
      }
    }
    return this.evaluateAt(this.elapsedSec);
  }

  public evaluateAt(timeSec: number): CinematicFrameState {
    const total = Math.max(0.1, this.timeline.totalDurationSec);
    const clampedTime = this.timeline.loop
      ? ((timeSec % total) + total) % total
      : Math.max(0, Math.min(total, timeSec));

    let accum = 0;
    let chosenShot = this.timeline.shots[0]!;
    let chosenIndex = 0;
    let shotElapsed = 0;

    for (let i = 0; i < this.timeline.shots.length; i++) {
      const shot = this.timeline.shots[i]!;
      const nextAccum = accum + shot.durationSec;
      if (clampedTime < nextAccum || i === this.timeline.shots.length - 1) {
        chosenShot = shot;
        chosenIndex = i;
        shotElapsed = Math.max(0, Math.min(shot.durationSec, clampedTime - accum));
        break;
      }
      accum = nextAccum;
    }

    const shotProgress =
      chosenShot.durationSec > 0 ? Math.max(0, Math.min(1, shotElapsed / chosenShot.durationSec)) : 1;

    // Integer-snapped camera pan offset
    const pan = chosenShot.cameraPan;
    const panOffset = pan
      ? {
          x: Math.round(pan.startX + (pan.endX - pan.startX) * shotProgress),
          y: Math.round(pan.startY + (pan.endY - pan.startY) * shotProgress),
        }
      : { x: 0, y: 0 };

    // Active subtitle cue within shot
    let activeSubtitle: CinematicSubtitleCue | null = null;
    if (chosenShot.subtitles) {
      for (const cue of chosenShot.subtitles) {
        if (shotElapsed >= cue.startSec && shotElapsed <= cue.endSec) {
          activeSubtitle = cue;
          break;
        }
      }
    }

    // Active title card cue within shot
    let activeTitleCard: CinematicTitleCardCue | null = null;
    if (chosenShot.titleCard) {
      const tc = chosenShot.titleCard;
      if (shotElapsed >= tc.startSec && shotElapsed <= tc.endSec) {
        activeTitleCard = tc;
      }
    }

    return {
      timelineId: this.timeline.id,
      elapsedSec: clampedTime,
      progress: total > 0 ? clampedTime / total : 1,
      isComplete: !this.timeline.loop && clampedTime >= total,
      activeShot: chosenShot,
      shotIndex: chosenIndex,
      shotElapsedSec: shotElapsed,
      shotProgress,
      panOffset,
      activeSubtitle,
      activeTitleCard,
    };
  }
}
