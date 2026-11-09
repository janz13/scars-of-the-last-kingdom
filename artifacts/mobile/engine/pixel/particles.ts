/**
 * Grid-Snapped Atmospheric Particle System (Canvas 2D)
 *
 * Implements Phase C5:
 * - Supports manifest atmosphere tags: `dust`, `ash`, `embers`, `rain`, `drip`, `fog`, `sparks`, `snow-ash`, `spores`.
 * - 1×1 or 2×2 integer art-pixel particles.
 * - Strictly capped by hardware quality tier (`High`: 150, `Medium`: 60, `Low`: 0).
 * - Deterministic seeded RNG option for trailer/snapshot reproducibility.
 */

export type AtmosphereType =
  | 'dust'
  | 'ash'
  | 'embers'
  | 'rain'
  | 'drip'
  | 'fog'
  | 'sparks'
  | 'snow-ash'
  | 'spores';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: 1 | 2;
  color: string;
  alpha: number;
  phase: number;
  life: number;
  maxLife: number;
}

const ATMOSPHERE_PALETTES: Record<AtmosphereType, string[]> = {
  dust: ['#a69cae', '#8c829e', '#d4c5a9'],
  ash: ['#908898', '#6e6678', '#b8b0c0'],
  embers: ['#e67e22', '#f39c12', '#e74c3c', '#ffd166'],
  rain: ['#5dade2', '#85c1e9', '#3d9ad1'],
  drip: ['#5dade2', '#3d9ad1', '#7fb3d5'],
  fog: ['#8c829e', '#6c627e', '#a89eb8'],
  sparks: ['#ffd166', '#f39c12', '#ffffff', '#e67e22'],
  'snow-ash': ['#d8d4e0', '#b0a8bc', '#ede0c4'],
  spores: ['#9b59b6', '#c39bd3', '#7d3c98'],
};

export class PixelParticleSystem {
  private particles: Particle[] = [];
  private type: AtmosphereType | undefined;
  private cap: number = 0;
  private width: number = 720;
  private height: number = 400;
  private seed: number = 1337;

  constructor(seed: number = 1337) {
    this.seed = seed >>> 0;
  }

  private nextRand(): number {
    // xorshift32
    let x = this.seed || 1337;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.seed = x >>> 0;
    return (this.seed & 0x7fffffff) / 0x7fffffff;
  }

  public configure(
    type: AtmosphereType | undefined,
    cap: number,
    width: number,
    height: number
  ): void {
    const clampedCap = Math.max(0, Math.min(150, Math.floor(cap)));
    const needsReset =
      this.type !== type ||
      this.width !== width ||
      this.height !== height ||
      this.particles.length > clampedCap;

    this.type = type;
    this.cap = clampedCap;
    this.width = width;
    this.height = height;

    if (!type || clampedCap === 0) {
      this.particles = [];
      return;
    }

    if (needsReset) {
      this.particles = [];
      const count = this.getTargetCount(type, clampedCap);
      for (let i = 0; i < count; i++) {
        this.particles.push(this.spawnParticle(type, true));
      }
    }
  }

  private getTargetCount(type: AtmosphereType, cap: number): number {
    switch (type) {
      case 'rain':
        return cap;
      case 'ash':
      case 'snow-ash':
        return Math.min(cap, 90);
      case 'dust':
      case 'spores':
        return Math.min(cap, 60);
      case 'embers':
      case 'sparks':
        return Math.min(cap, 55);
      case 'drip':
        return Math.min(cap, 24);
      case 'fog':
        return Math.min(cap, 36);
      default:
        return Math.min(cap, 50);
    }
  }

  private spawnParticle(type: AtmosphereType, initialSpread: boolean): Particle {
    const colors = ATMOSPHERE_PALETTES[type] ?? ATMOSPHERE_PALETTES.dust;
    const color = colors[Math.floor(this.nextRand() * colors.length)]!;
    const x = this.nextRand() * this.width;
    const y = initialSpread ? this.nextRand() * this.height : this.getInitialY(type);

    switch (type) {
      case 'rain':
        return {
          x,
          y,
          vx: -18 - this.nextRand() * 10,
          vy: 190 + this.nextRand() * 80,
          size: 1,
          color,
          alpha: 0.45 + this.nextRand() * 0.35,
          phase: this.nextRand() * Math.PI * 2,
          life: 0,
          maxLife: 2 + this.nextRand() * 2,
        };
      case 'drip':
        return {
          x,
          y: initialSpread ? this.nextRand() * this.height : 0,
          vx: 0,
          vy: 95 + this.nextRand() * 65,
          size: 1,
          color,
          alpha: 0.55 + this.nextRand() * 0.35,
          phase: this.nextRand() * Math.PI * 2,
          life: 0,
          maxLife: 3 + this.nextRand() * 3,
        };
      case 'embers':
      case 'sparks':
        return {
          x,
          y: initialSpread ? this.nextRand() * this.height : this.height + 2,
          vx: (this.nextRand() - 0.5) * 24,
          vy: -22 - this.nextRand() * 38,
          size: this.nextRand() > 0.65 ? 2 : 1,
          color,
          alpha: 0.6 + this.nextRand() * 0.4,
          phase: this.nextRand() * Math.PI * 2,
          life: 0,
          maxLife: 3 + this.nextRand() * 4,
        };
      case 'ash':
      case 'snow-ash':
        return {
          x,
          y,
          vx: -8 + this.nextRand() * 16,
          vy: 14 + this.nextRand() * 22,
          size: this.nextRand() > 0.5 ? 2 : 1,
          color,
          alpha: 0.4 + this.nextRand() * 0.4,
          phase: this.nextRand() * Math.PI * 2,
          life: 0,
          maxLife: 6 + this.nextRand() * 6,
        };
      case 'fog':
        return {
          x,
          y: this.height * (0.45 + this.nextRand() * 0.5),
          vx: 6 + this.nextRand() * 10,
          vy: (this.nextRand() - 0.5) * 2,
          size: 2,
          color,
          alpha: 0.16 + this.nextRand() * 0.16,
          phase: this.nextRand() * Math.PI * 2,
          life: 0,
          maxLife: 10 + this.nextRand() * 8,
        };
      case 'dust':
      case 'spores':
      default:
        return {
          x,
          y,
          vx: (this.nextRand() - 0.5) * 8,
          vy: -4 + this.nextRand() * 8,
          size: this.nextRand() > 0.7 ? 2 : 1,
          color,
          alpha: 0.3 + this.nextRand() * 0.45,
          phase: this.nextRand() * Math.PI * 2,
          life: 0,
          maxLife: 6 + this.nextRand() * 6,
        };
    }
  }

  private getInitialY(type: AtmosphereType): number {
    if (type === 'embers' || type === 'sparks') return this.height + 2;
    if (type === 'rain' || type === 'drip' || type === 'ash' || type === 'snow-ash') return -2;
    return this.nextRand() * this.height;
  }

  public getActiveCount(): number {
    return this.particles.length;
  }

  public update(dtSeconds: number): void {
    if (!this.type || this.particles.length === 0) return;
    const dt = Math.max(0, Math.min(0.1, dtSeconds));

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]!;
      p.life += dt;
      p.phase += dt * 2.2;

      const sway =
        this.type === 'ash' || this.type === 'snow-ash' || this.type === 'embers' || this.type === 'dust'
          ? Math.sin(p.phase) * 8 * dt
          : 0;

      p.x += p.vx * dt + sway;
      p.y += p.vy * dt;

      const outOfBounds =
        p.x < -8 ||
        p.x > this.width + 8 ||
        p.y < -8 ||
        p.y > this.height + 8 ||
        p.life >= p.maxLife;

      if (outOfBounds) {
        this.particles[i] = this.spawnParticle(this.type, false);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0): void {
    if (!this.type || this.particles.length === 0) return;

    ctx.save();
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]!;
      const px = Math.round(p.x + offsetX);
      const py = Math.round(p.y + offsetY);

      if (px < 0 || px >= this.width || py < 0 || py >= this.height) continue;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (this.type === 'rain') {
        // 1px wide, 4px tall diagonal raindrop streak snapped to grid
        ctx.fillRect(px, py, 1, 3);
        ctx.fillRect(px - 1, py + 3, 1, 2);
      } else if (this.type === 'fog') {
        // Dithered horizontal drifting band cluster
        ctx.fillRect(px, py, 12, 2);
        ctx.fillRect(px + 4, py - 2, 8, 2);
      } else {
        ctx.fillRect(px, py, p.size, p.size);
      }
    }
    ctx.restore();
  }
}
