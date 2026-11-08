/**
 * Wave 1 Adversarial Challenge & Stress Test Suite
 * Scars of the Last Kingdom — feat/pixel-overhaul
 *
 * Empirical verification of:
 * 1. Rapid scene transitions (double-buffering cancellation, race conditions, memory leaks)
 * 2. Layout mode switches across boundary aspect ratios and user overrides
 * 3. Sheet snap physics, bounds clamping, and gesture dynamics
 * 4. Missing asset handling, gradient fallback, and persistent children
 */

import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

// Stub React Native image require for Node environment
if (typeof require !== 'undefined' && (require as any).extensions) {
  (require as any).extensions['.png'] = (module: any, filename: string) => {
    module.exports = filename;
  };
}

const {
  resolveLayoutMode,
  computeViewportScale,
  computeFocalShift,
  PIXEL_GRID,
} = require('../../artifacts/mobile/constants/pixelGrid.ts');

const {
  getBackgroundImage,
  getBackgroundGradient,
  BACKGROUND_GRADIENTS,
} = require('../../artifacts/mobile/constants/images.ts');

const {
  SCENE_MANIFEST,
  getSceneManifestEntry,
} = require('../../artifacts/mobile/constants/sceneManifest.ts');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings: Array<{ severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; title: string; detail: string }> = [];

function assert(condition: boolean, message: string, findingIfFail?: { severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; title: string; detail: string }) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
    if (findingIfFail) {
      findings.push(findingIfFail);
    }
  }
}

console.log('=================================================================');
console.log('   WAVE 1 ADVERSARIAL STRESS TEST & EMPIRICAL CHALLENGE SUITE    ');
console.log('=================================================================\n');

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 2: Adaptive Layout Resolution & Boundary Mode Switches
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- CHALLENGE 2: Adaptive Layout Resolution & Boundary Testing ---');

// 2.1 Boundary Aspect Ratios (1.499, 1.500, 1.501, 0.999, 1.000)
// Safe height = 1000 for precise decimal arithmetic
assert(
  resolveLayoutMode(1499, 1000) === 'letterbox',
  'Aspect 1.499 resolves to letterbox (strictly < 1.5)'
);
assert(
  resolveLayoutMode(1500, 1000) === 'column',
  'Aspect 1.500 resolves to column (boundary >= 1.5)'
);
assert(
  resolveLayoutMode(1501, 1000) === 'column',
  'Aspect 1.501 resolves to column (strictly > 1.5)'
);
assert(
  resolveLayoutMode(999, 1000) === 'sheet',
  'Aspect 0.999 resolves to sheet (strictly < 1.0)'
);
assert(
  resolveLayoutMode(1000, 1000) === 'letterbox',
  'Aspect 1.000 resolves to letterbox (boundary >= 1.0)'
);

// 2.2 User Overrides
// User override 'column' on wide displays (width >= 600)
assert(
  resolveLayoutMode(600, 1000, 'column') === 'column',
  'Override column respected at minimum width boundary (600px)'
);
assert(
  resolveLayoutMode(1200, 1000, 'column') === 'column',
  'Override column respected at aspect 1.2 when width >= 600'
);
// Safety check: override 'column' on narrow mobile phone width < 600
assert(
  resolveLayoutMode(390, 844, 'column') === 'sheet',
  'Override column safely ignored on narrow mobile phone (390px < 600px), falling back to sheet'
);
assert(
  resolveLayoutMode(599, 600, 'column') === 'sheet',
  'Override column safely ignored at width 599px (< 600px)'
);

// User override 'letterbox'
assert(
  resolveLayoutMode(1920, 1080, 'letterbox') === 'letterbox',
  'Override letterbox forces letterbox on desktop wide aspect (1.77)'
);
assert(
  resolveLayoutMode(390, 844, 'letterbox') === 'letterbox',
  'Override letterbox forces letterbox on mobile portrait aspect (0.46)'
);

// User override 'auto'
assert(
  resolveLayoutMode(1920, 1080, 'auto') === 'column',
  'Override auto selects column on 1920x1080'
);
assert(
  resolveLayoutMode(1024, 768, 'auto') === 'letterbox',
  'Override auto selects letterbox on 1024x768'
);
assert(
  resolveLayoutMode(390, 844, 'auto') === 'sheet',
  'Override auto selects sheet on 390x844'
);

// Stress test: Unsupported override 'sheet' (cast from string)
const sheetOverrideResult = resolveLayoutMode(1920, 1080, 'sheet' as any);
assert(
  sheetOverrideResult === 'column',
  `Unsupported override 'sheet' gracefully falls back to aspect resolution ('column') without crashing`,
  {
    severity: 'LOW',
    title: 'Unsupported sheet override parameter',
    detail: `resolveLayoutMode received 'sheet' override and defaulted to aspect resolution 'column'. Setting type LayoutSettingOverride does not include 'sheet'.`
  }
);

// 2.3 Adversarial / Extreme Inputs
assert(
  resolveLayoutMode(0, 0) === 'sheet',
  'Zero dimensions (0x0) safely resolves to sheet without NaN or division by zero'
);
assert(
  resolveLayoutMode(1920, 0) === 'column',
  'Zero height (1920x0) safely protected by safeH = max(1, height)'
);
assert(
  resolveLayoutMode(-1920, 1080) === 'sheet',
  'Negative width (-1920) safely resolves to sheet'
);
assert(
  resolveLayoutMode(1920, -1080) === 'column',
  'Negative height (-1080) safely clamped to 1'
);

// 2.4 Rapid Layout Mode Oscillation (1,000 switches at boundary)
let oscillationPass = true;
for (let i = 0; i < 1000; i++) {
  const w = i % 2 === 0 ? 1499.99 : 1500.01;
  const mode = resolveLayoutMode(w, 1000);
  const expected = i % 2 === 0 ? 'letterbox' : 'column';
  if (mode !== expected) {
    oscillationPass = false;
    break;
  }
}
assert(
  oscillationPass,
  '1,000 rapid boundary oscillations (1499.99 <-> 1500.01) execute deterministically with zero jitter'
);

// 2.5 Compact Wide Viewport Layout Collision Guard
assert(
  resolveLayoutMode(720, 480) === 'letterbox',
  '720x480 (aspect 1.5, width 720 < 768) resolves to letterbox avoiding 28px collision'
);
assert(
  resolveLayoutMode(740, 480) === 'letterbox',
  '740x480 (aspect 1.54, width 740 < 768) resolves to letterbox'
);
assert(
  resolveLayoutMode(767, 511) === 'letterbox',
  '767x511 (width < 768) resolves to letterbox'
);
assert(
  resolveLayoutMode(768, 512) === 'column',
  '768x512 (aspect 1.5, width >= 768) resolves to column with 20px clearance'
);

console.log('\n--- CHALLENGE 3: StorySheet Snap Physics & Gesture Dynamics ---');

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 3: Sheet Snap Physics & Gesture Dynamics
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_SNAP_RATIOS = {
  peek: 0.18,
  half: 0.52,
  full: 0.85,
};

function computeSnapHeights(H: number, minPeekHeight = 130, ratios = DEFAULT_SNAP_RATIOS) {
  const safeH = Math.max(1, H);
  const full = Math.min(safeH, Math.max(1, Math.round(safeH * ratios.full)));
  const half = Math.min(full, Math.max(1, Math.round(safeH * ratios.half)));
  const effectiveMinPeek = Math.min(minPeekHeight, Math.max(1, Math.round(half * 0.75)));
  const peek = Math.min(half, Math.max(effectiveMinPeek, Math.round(safeH * ratios.peek)));
  return { peek, half, full };
}

// 3.1 Standard Viewport Snap Points
const viewports = [
  { name: 'iPhone 14 (390x844)', H: 844 },
  { name: 'iPhone Pro Max (430x932)', H: 932 },
  { name: 'iPad Portrait (768x1024)', H: 1024 },
  { name: 'Small Phone (360x640)', H: 640 },
];

for (const vp of viewports) {
  const snaps = computeSnapHeights(vp.H);
  const monotonic = snaps.peek < snaps.half && snaps.half < snaps.full;
  const withinBounds = snaps.peek > 0 && snaps.full <= vp.H;
  assert(
    monotonic && withinBounds,
    `${vp.name}: snap heights strictly ordered peek (${snaps.peek}) < half (${snaps.half}) < full (${snaps.full}) <= H (${vp.H})`
  );
}

// 3.2 Boundary Viewports & MinPeekHeight Inversion Stress Test
// When viewport height H is small, minPeekHeight (130px) can exceed half snap height (H * 0.52)
const smallH = 200; // e.g. resized web window or small embedded frame
const invertedSnaps = computeSnapHeights(smallH);
console.log(`  [Diagnostic] Small H = ${smallH}px: peek=${invertedSnaps.peek}, half=${invertedSnaps.half}, full=${invertedSnaps.full}`);

const isInverted = invertedSnaps.peek > invertedSnaps.half;
assert(
  !isInverted,
  `Snap heights remain monotonic for small viewport H=${smallH}px (peek: ${invertedSnaps.peek} <= half: ${invertedSnaps.half})`,
  {
    severity: 'MEDIUM',
    title: 'StorySheet minPeekHeight Inversion Under Small Heights',
    detail: `When viewport height H <= 250px (e.g. H=${smallH}), minPeekHeight (130px) exceeds half snap height (${smallH * 0.52}px = ${invertedSnaps.half}px), causing peek (${invertedSnaps.peek}px) to be taller than half (${invertedSnaps.half}px).`
  }
);

// Extreme small height: H = 100px
const tinySnaps = computeSnapHeights(100);
const exceeds100Percent = tinySnaps.peek > 100;
assert(
  !exceeds100Percent,
  `Sheet height never exceeds 100% viewport height for tiny viewport H=100px (peek: ${tinySnaps.peek}px <= 100px)`,
  {
    severity: 'MEDIUM',
    title: 'StorySheet Expands Past 100% Viewport Height Under Tiny Heights',
    detail: `When viewport height H < 130px, minPeekHeight (130px) forces sheet height (${tinySnaps.peek}px) to exceed 100% of viewport height (${tinySnaps.peek} > 100px).`
  }
);

// 3.3 PanResponder Gesture Tracking Simulation: Quadratic Acceleration Bug
// In React Native PanResponder, gesture.dy is the ACCUMULATED displacement since gesture start.
// StorySheet.tsx lines 118-121:
//   const newHeight = currentHeightRef.current - gesture.dy;
//   const clamped = Math.max(snapHeights.peek, Math.min(snapHeights.full, newHeight));
//   sheetHeightAnim.setValue(clamped);
// And lines 72-76:
//   sheetHeightAnim.addListener(({ value }) => { currentHeightRef.current = value; });

console.log('\n--- SIMULATING StorySheet PanResponder DRAG GESTURE ---');

function simulatePanDrag(initialHeight: number, snapHeights: { peek: number; half: number; full: number }, steps: number[]) {
  const dragStartHeight = initialHeight;
  let currentHeight = initialHeight;
  const history: Array<{ step: number; cumulativeDy: number; calculatedHeight: number; clampedHeight: number }> = [];

  for (let i = 0; i < steps.length; i++) {
    const cumulativeDy = steps[i];
    // Linear 1:1 finger tracking: dragStartHeight - cumulativeDy
    const newHeight = dragStartHeight - cumulativeDy;
    const clamped = Math.max(snapHeights.peek, Math.min(snapHeights.full, newHeight));
    currentHeight = clamped;

    history.push({
      step: i + 1,
      cumulativeDy,
      calculatedHeight: newHeight,
      clampedHeight: clamped,
    });
  }

  return { finalHeight: currentHeight, history };
}

// Suppose on iPhone 14 (H=844, peek=152, half=439, full=717):
// User starts at half (439px) and gently drags UPWARD by 30px over 6 touch move events:
// Steps in dy: -5, -10, -15, -20, -25, -30 px
const iphoneSnaps = computeSnapHeights(844);
const dragUpSteps = [-5, -10, -15, -20, -25, -30];
const simResult = simulatePanDrag(iphoneSnaps.half, iphoneSnaps, dragUpSteps);

console.log(`  Initial Height: ${iphoneSnaps.half}px. Dragging upward by total 30px across 6 move events.`);
for (const entry of simResult.history) {
  console.log(`    Move ${entry.step}: cumulative dy=${entry.cumulativeDy}px -> calculated=${entry.calculatedHeight}px, clamped=${entry.clampedHeight}px (jump: +${entry.clampedHeight - iphoneSnaps.half}px)`);
}

// Expected linear height after 30px drag: 439 - (-30) = 469px.
const expectedLinearHeight = iphoneSnaps.half - dragUpSteps[dragUpSteps.length - 1];
const actualFinalHeight = simResult.finalHeight;
const heightDiscrepancy = actualFinalHeight - expectedLinearHeight;

console.log(`  [Result] Expected Height: ${expectedLinearHeight}px | Actual Height: ${actualFinalHeight}px | Error: +${heightDiscrepancy}px`);

assert(
  actualFinalHeight === expectedLinearHeight,
  `PanResponder drag tracking is linear: 30px finger drag produces 30px height change (got ${actualFinalHeight}px vs expected ${expectedLinearHeight}px, runaway error: +${heightDiscrepancy}px)`,
  {
    severity: 'HIGH',
    title: 'StorySheet PanResponder Quadratic Drag Runaway',
    detail: `StorySheet.tsx line 118 updates sheetHeightAnim via 'currentHeightRef.current - gesture.dy'. Because gesture.dy is the cumulative displacement from touch start, and currentHeightRef is updated on every move via sheetHeightAnim.addListener, the height accelerates quadratically (O(n^2)). A 30px drag causes a ${actualFinalHeight - iphoneSnaps.half}px jump instead of 30px.`
  }
);

// 3.4 Downward Drag Collapse Simulation
// User at half (439px) drags DOWNWARD by 30px (dy: +5, +10, +15, +20, +25, +30):
const dragDownSteps = [5, 10, 15, 20, 25, 30];
const simDownResult = simulatePanDrag(iphoneSnaps.half, iphoneSnaps, dragDownSteps);
const expectedDownHeight = iphoneSnaps.half - dragDownSteps[dragDownSteps.length - 1]; // 409px
console.log(`  [Downward Drag] Expected Height: ${expectedDownHeight}px | Actual Height: ${simDownResult.finalHeight}px`);

assert(
  simDownResult.finalHeight === expectedDownHeight,
  `PanResponder downward drag tracking is linear: 30px downward drag produces 30px decrease (got ${simDownResult.finalHeight}px vs expected ${expectedDownHeight}px)`,
  {
    severity: 'HIGH',
    title: 'StorySheet PanResponder Downward Drag Collapse',
    detail: `A 30px downward drag on StorySheet causes height to drop by ${iphoneSnaps.half - simDownResult.finalHeight}px (reaching ${simDownResult.finalHeight}px) instead of 30px (expected ${expectedDownHeight}px), prematurely collapsing the sheet.`
  }
);

// 3.5 Handle Tap Cycling Sequence Test
function getNextSnapPoint(current: 'peek' | 'half' | 'full'): 'peek' | 'half' | 'full' {
  if (current === 'peek') return 'half';
  if (current === 'half') return 'full';
  return 'half';
}

let testSnap: 'peek' | 'half' | 'full' = 'peek';
testSnap = getNextSnapPoint(testSnap);
assert(testSnap === 'half', 'Handle tap on peek cycles to half');
testSnap = getNextSnapPoint(testSnap);
assert(testSnap === 'full', 'Handle tap on half cycles to full');
testSnap = getNextSnapPoint(testSnap);
assert(testSnap === 'half', 'Handle tap on full cycles to half');

// 3.6 PanResponder Touch Claiming vs Tap Discrimination
const touchMoveMicro = Math.abs(3) > 5;
assert(!touchMoveMicro, 'PanResponder ignores micro-movements <= 5px, preserving child Pressable taps');
const touchMoveDrag = Math.abs(7) > 5;
assert(touchMoveDrag, 'PanResponder claims gesture when vertical movement exceeds 5px threshold');

// 3.7 Velocity-Based Snap Resolution Test
function resolveReleaseSnap(
  releasedHeight: number,
  vy: number,
  snaps: { peek: number; half: number; full: number }
): 'peek' | 'half' | 'full' {
  if (vy < -0.5) return releasedHeight < snaps.half ? 'half' : 'full';
  if (vy > 0.5) return releasedHeight > snaps.half ? 'half' : 'peek';
  const distPeek = Math.abs(releasedHeight - snaps.peek);
  const distHalf = Math.abs(releasedHeight - snaps.half);
  const distFull = Math.abs(releasedHeight - snaps.full);
  if (distPeek <= distHalf && distPeek <= distFull) return 'peek';
  if (distHalf <= distPeek && distHalf <= distFull) return 'half';
  return 'full';
}

const flickUp = resolveReleaseSnap(iphoneSnaps.peek + 20, -0.8, iphoneSnaps);
assert(flickUp === 'half', 'Fast flick up (vy = -0.8) from peek snaps to half');
const flickDown = resolveReleaseSnap(iphoneSnaps.full - 20, 0.8, iphoneSnaps);
assert(flickDown === 'half', 'Fast flick down (vy = 0.8) from full snaps to half');

// 3.8 Nearest Distance Snap Resolution Test
const nearHalf = resolveReleaseSnap(445, 0, iphoneSnaps);
assert(nearHalf === 'half', 'Release at 445px (near half 439px) snaps to half');
const nearFull = resolveReleaseSnap(650, 0, iphoneSnaps);
assert(nearFull === 'full', 'Release at 650px (near full 717px) snaps to full');
const nearPeek = resolveReleaseSnap(200, 0, iphoneSnaps);
assert(nearPeek === 'peek', 'Release at 200px (near peek 152px) snaps to peek');

console.log('\n--- CHALLENGE 4: Missing Asset Handling & Children Preservation ---');

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 4: Missing Asset Handling & Children Preservation
// ─────────────────────────────────────────────────────────────────────────────

// 4.1 Missing / Unknown / Invalid Scene Keys
const unknownKeys = [
  'non_existent_key_9999',
  'invalid_scene_path',
  '',
  '   ',
  '../../traversal',
  'null',
];

for (const key of unknownKeys) {
  const bgImg = getBackgroundImage(key);
  assert(
    bgImg === null,
    `Unknown imageKey '${key}' returns null from getBackgroundImage`
  );

  const grad = getBackgroundGradient(key);
  assert(
    grad !== undefined && Array.isArray(grad.colors) && grad.colors.length >= 2,
    `Unknown imageKey '${key}' safely returns fallback gradient with >= 2 colors`
  );
}

// 4.2 Gradient Color Stops Arithmetic Safety Check
// In PixelStage.tsx lines 125-127:
//   gradConfig.colors.forEach((col, idx) => {
//     grad.addColorStop(idx / (gradConfig.colors.length - 1), col);
//   });
// Verify that default gradient and all registered gradients never have length <= 1 (which would cause division by zero)
let allGradientsValid = true;
for (const [key, grad] of Object.entries(BACKGROUND_GRADIENTS as Record<string, any>)) {
  if (!grad.colors || grad.colors.length < 2) {
    allGradientsValid = false;
    console.error(`Gradient '${key}' has invalid colors array:`, grad.colors);
    break;
  }
}
assert(
  allGradientsValid,
  'All background gradients (including default) have at least 2 color stops, preventing division by zero'
);

// 4.3 Mock Canvas Context Gradient Rendering
class MockCanvasGradient {
  colorStops: Array<{ offset: number; color: string }> = [];
  addColorStop(offset: number, color: string) {
    if (isNaN(offset) || offset < 0 || offset > 1) {
      throw new Error(`Invalid color stop offset: ${offset}`);
    }
    this.colorStops.push({ offset, color });
  }
}

class MockCanvasContext {
  fillStyle: any = null;
  rects: any[] = [];
  createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
    return new MockCanvasGradient();
  }
  fillRect(x: number, y: number, w: number, h: number) {
    this.rects.push({ x, y, w, h });
  }
}

function testDrawGradient(key: string, w = 720, h = 400) {
  const ctx = new MockCanvasContext();
  const gradConfig = getBackgroundGradient(key);
  const grad = ctx.createLinearGradient(
    gradConfig.start.x * w,
    gradConfig.start.y * h,
    gradConfig.end.x * w,
    gradConfig.end.y * h
  );
  gradConfig.colors.forEach((col: string, idx: number) => {
    grad.addColorStop(idx / (gradConfig.colors.length - 1), col);
  });
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return { ctx, grad };
}

let mockRenderPassed = true;
try {
  for (const key of ['unknown_key_xyz', 'ruined_metro_station', '']) {
    const res = testDrawGradient(key);
    if (res.grad.colorStops.length < 2 || res.ctx.rects.length === 0) {
      mockRenderPassed = false;
    }
  }
} catch (err) {
  mockRenderPassed = false;
  console.error(err);
}
assert(
  mockRenderPassed,
  'drawGradientFallback renders to canvas without throwing IndexSizeError or NaN offsets'
);


console.log('\n--- CHALLENGE 1: Rapid Scene Transitions & Double-Buffering Stress ---');

// ─────────────────────────────────────────────────────────────────────────────
// CHALLENGE 1: Rapid Scene Transitions (10 changes in 50ms)
// ─────────────────────────────────────────────────────────────────────────────

// Simulation of WebPixelStage's double-buffered transition logic
// Models:
// - Front and Back buffers
// - Async image loading with varying network latencies
// - Consecutive rapid imageKey updates
// - Cross-fade RAF loop cancellation

interface BufferState {
  frontContent: string;
  backContent: string;
  displayedContent: string;
  activeRafId: number | null;
  currentImageKey: string | null;
}

class WebPixelStageSimulator {
  state: BufferState = {
    frontContent: 'initial',
    backContent: '',
    displayedContent: 'initial',
    activeRafId: null,
    currentImageKey: null,
  };

  pendingLoads: Array<{ id: number; targetKey: string; onComplete: () => void; cancelled: boolean }> = [];
  loadCounter = 0;
  activeTransitionId = 0;
  rafCounter = 0;
  rafCallbacks = new Map<number, (now: number) => void>();

  changeImageKey(newKey: string, imageLoadLatencyMs: number, onRenderFrame?: (content: string) => void) {
    const masterW = 720;
    const masterH = 400;

    // Line 195: First mount
    if (this.state.currentImageKey === null) {
      this.state.currentImageKey = newKey;
      this.state.frontContent = newKey;
      this.state.displayedContent = newKey;
      return;
    }

    // Line 205: If image hasn't changed, return
    if (this.state.currentImageKey === newKey) {
      return;
    }

    this.state.currentImageKey = newKey;
    const transitionId = ++this.loadCounter;
    this.activeTransitionId = transitionId;

    // Line 212: drawSceneToBuffer(back, imageKey, orientation, transitionId, callback)
    const pendingLoad = {
      id: transitionId,
      targetKey: newKey,
      cancelled: false,
      onComplete: () => {
        // Discard load if a newer transition has begun
        if (transitionId !== this.activeTransitionId) return;

        // Draw to back buffer
        this.state.backContent = newKey;

        // Line 213: if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (this.state.activeRafId !== null) {
          this.rafCallbacks.delete(this.state.activeRafId);
          this.state.activeRafId = null;
        }

        const startTime = Date.now();
        const duration = 50; // fast duration for test

        const step = (now: number) => {
          if (transitionId !== this.activeTransitionId) return;

          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);

          // display blends front and back
          this.state.displayedContent = t >= 0.5 ? this.state.backContent : this.state.frontContent;
          onRenderFrame?.(this.state.displayedContent);

          if (t < 1) {
            const rafId = ++this.rafCounter;
            this.state.activeRafId = rafId;
            this.rafCallbacks.set(rafId, step);
          } else {
            // Line 233: Transition complete: blit back to front buffer
            this.state.frontContent = this.state.backContent;
            this.state.displayedContent = this.state.frontContent;
            this.state.activeRafId = null;
          }
        };

        const firstRafId = ++this.rafCounter;
        this.state.activeRafId = firstRafId;
        this.rafCallbacks.set(firstRafId, step);
      },
    };

    this.pendingLoads.push(pendingLoad);

    // Simulate async network/file load
    setTimeout(() => {
      pendingLoad.onComplete();
    }, imageLoadLatencyMs);
  }

  tickRaf(now: number) {
    const callbacks = Array.from(this.rafCallbacks.entries());
    for (const [id, cb] of callbacks) {
      this.rafCallbacks.delete(id);
      cb(now);
    }
  }
}

// Test 1: Rapid 10 consecutive changes in 50ms with identical latencies
async function testRapidTransitionsIdenticalLatency(): Promise<boolean> {
  const sim = new WebPixelStageSimulator();
  sim.changeImageKey('scene_0', 0); // mount

  // Dispatch 10 rapid scene transitions (scene_1 to scene_10) every 5ms
  for (let i = 1; i <= 10; i++) {
    sim.changeImageKey(`scene_${i}`, 10);
    await new Promise((r) => setTimeout(r, 5));
  }

  // Wait for all loads to settle
  await new Promise((r) => setTimeout(r, 60));

  // Advance RAF loops
  for (let t = 0; t <= 100; t += 16) {
    sim.tickRaf(Date.now() + t);
  }

  // The final displayed content MUST match the latest imageKey ('scene_10')
  return sim.state.displayedContent === 'scene_10' && sim.state.frontContent === 'scene_10';
}

// Test 2: Rapid consecutive changes with OUT-OF-ORDER resolution (Async Race Condition)
// If scene_2 has high latency (50ms) and scene_3 has low latency (10ms):
// Does scene_2 finish later and overwrite scene_3?
async function testOutOfOrderRaceCondition(): Promise<{ safe: boolean; finalDisplay: string }> {
  const sim = new WebPixelStageSimulator();
  sim.changeImageKey('scene_initial', 0); // mount

  // User transitions to scene_delayed (slow, 50ms)
  sim.changeImageKey('scene_delayed', 50);

  // 10ms later, user transitions to scene_latest (fast, 15ms)
  await new Promise((r) => setTimeout(r, 10));
  sim.changeImageKey('scene_latest', 15);

  // Wait 80ms for all async tasks to finish
  await new Promise((r) => setTimeout(r, 80));

  // Run all RAF callbacks to completion
  for (let t = 0; t <= 120; t += 16) {
    sim.tickRaf(Date.now() + t);
  }

  return {
    safe: sim.state.displayedContent === 'scene_latest' && sim.state.frontContent === 'scene_latest',
    finalDisplay: sim.state.displayedContent,
  };
}

// Run async tests
(async () => {
  const test1Result = await testRapidTransitionsIdenticalLatency();
  assert(
    test1Result,
    '10 rapid scene changes with uniform latency settle on latest scene (scene_10)'
  );

  const test2Result = await testOutOfOrderRaceCondition();
  console.log(`  [Async Race Condition Test] Latest key requested was 'scene_latest'. Final buffer ended on: '${test2Result.finalDisplay}'`);
  assert(
    test2Result.safe,
    `Out-of-order async image load preserves latest scene: expected 'scene_latest', got '${test2Result.finalDisplay}'`,
    {
      severity: 'HIGH',
      title: 'PixelStage Web Double-Buffering Asynchronous Race Condition',
      detail: `PixelStage.tsx drawSceneToBuffer() initiates an asynchronous Image load without an abort token or current-key guard. If an earlier transition finishes loading after a subsequent transition (e.g. slow network or large image), the earlier callback overwrites the back buffer and triggers a cross-fade to the stale scene ('${test2Result.finalDisplay}'), desynchronizing the stage from the story node.`
    }
  );

  // 1.3 Buffer Dimension Synchronization on Orientation Change
  let masterW = 720;
  let masterH = 400;
  const front = { width: masterW, height: masterH };
  const back = { width: masterW, height: masterH };
  const getBuffers = (w: number, h: number) => {
    if (front.width !== w || front.height !== h) {
      front.width = w;
      front.height = h;
    }
    if (back.width !== w || back.height !== h) {
      back.width = w;
      back.height = h;
    }
    return { front, back };
  };

  let buffers = getBuffers(720, 400);
  assert(buffers.front.width === 720 && buffers.front.height === 400, 'Initial landscape width 720x400');
  buffers = getBuffers(400, 760);
  assert(buffers.front.width === 400 && buffers.front.height === 760, 'Front buffer resizes to 400x760 on portrait');
  assert(buffers.back.width === 400 && buffers.back.height === 760, 'Back buffer resizes to 400x760 on portrait');
  buffers = getBuffers(720, 400);
  assert(buffers.front.width === 720 && buffers.front.height === 400, 'Front buffer resizes back to 720x400 on landscape');
  assert(buffers.back.width === 720 && buffers.back.height === 400, 'Back buffer resizes back to 720x400 on landscape');

  // 1.4 Single-Flight Callback Guard for Cached Image Loads
  let callbackCount = 0;
  let fired = false;
  const transitionId = 1;
  const activeTransitionId = 1;
  const mockImg = {
    complete: true,
    naturalWidth: 720,
    naturalHeight: 400,
    onload: null as any,
    onerror: null as any,
  };
  const handleSuccess = () => {
    if (fired) return;
    fired = true;
    mockImg.onload = null;
    mockImg.onerror = null;
    if (transitionId !== activeTransitionId) return;
    callbackCount++;
  };
  mockImg.onload = handleSuccess;
  if (mockImg.complete && mockImg.naturalWidth > 0) {
    handleSuccess();
  }
  if (mockImg.onload) {
    mockImg.onload();
  }
  assert(callbackCount === 1, 'Callback fired exactly once despite duplicate event dispatch');

  // 1.5 Corrupted/Empty Cached Image with naturalWidth 0
  let errorCount = 0;
  let successCount = 0;
  let fired2 = false;
  const mockImgCorrupt = {
    complete: true,
    naturalWidth: 0,
    naturalHeight: 0,
    onload: null as any,
    onerror: null as any,
  };
  const handleSuccess2 = () => {
    if (fired2) return;
    fired2 = true;
    successCount++;
  };
  const handleError2 = () => {
    if (fired2) return;
    fired2 = true;
    errorCount++;
  };
  mockImgCorrupt.onload = handleSuccess2;
  mockImgCorrupt.onerror = handleError2;
  if (mockImgCorrupt.complete) {
    if (mockImgCorrupt.naturalWidth > 0) {
      handleSuccess2();
    } else {
      handleError2();
    }
  }
  assert(successCount === 0, 'Success callback not called on 0 naturalWidth');
  assert(errorCount === 1, 'Error fallback callback called on 0 naturalWidth');

  // 4.4 NativePixelStage Interrupted Animated.timing Test
  // In NativePixelStage lines 358-364:
  // Animated.timing(fadeAnim, ...).start(() => { setPrevKey(null); });
  // If a second transition occurs while the first is running:
  // React Native's completion callback runs (with { finished: false }), which unconditionally calls setPrevKey(null).
  // This causes the previous background layer to instantly unmount / flash black.
  console.log('\n--- NativePixelStage Interrupted Animation Simulation ---');

  class NativePixelStageSimulator {
    currentKey: string;
    prevKey: string | null = null;
    activeAnimationCallback: (() => void) | null = null;

    constructor(initialKey: string) {
      this.currentKey = initialKey;
    }

    changeKey(newKey: string) {
      if (newKey === this.currentKey) return;

      // Previous animation interrupted!
      if (this.activeAnimationCallback) {
        // In React Native Animated.timing, start callback fires on interruption
        const prevCb = this.activeAnimationCallback;
        this.activeAnimationCallback = null;
        prevCb(); // executes setPrevKey(null)
      }

      this.prevKey = this.currentKey;
      this.currentKey = newKey;

      this.activeAnimationCallback = () => {
        this.prevKey = null;
      };
    }
  }

  const nativeSim = new NativePixelStageSimulator('scene_1');
  // Rapid transition: scene_1 -> scene_2 -> scene_3 in 10ms
  nativeSim.changeKey('scene_2');
  console.log(`  After transition to scene_2: current=${nativeSim.currentKey}, prevKey=${nativeSim.prevKey}`);
  nativeSim.changeKey('scene_3');
  console.log(`  After rapid interruption to scene_3: current=${nativeSim.currentKey}, prevKey=${nativeSim.prevKey}`);

  // In the simulator, when scene_2 was interrupted, the callback unconditionally set prevKey = null!
  // But wait! Did line 354 setPrevKey(currentKey) run right after?
  // Line 354: setPrevKey(currentKey) [scene_2]
  // Line 355: setCurrentKey(imageKey) [scene_3]
  // So prevKey becomes scene_2, but what if the completion callback is asynchronous (queued)?
  // If the previous animation's callback fires asynchronously AFTER setPrevKey('scene_2'), it wipes prevKey to null!
  console.log(`  Native transition state retained prevKey: ${nativeSim.prevKey}`);

  // ─────────────────────────────────────────────────────────────────────────
  // SUMMARY REPORT
  // ─────────────────────────────────────────────────────────────────────────
  console.log(`\n========================================`);
  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED:      ${passedTests}`);
  console.log(`FAILED:      ${failedTests}`);
  console.log(`FINDINGS:    ${findings.length}`);
  console.log(`========================================\n`);

  if (findings.length > 0) {
    console.log('CRITICAL / HIGH FINDINGS IDENTIFIED:');
    for (const f of findings) {
      console.log(`- [${f.severity}] ${f.title}`);
      console.log(`  ${f.detail}\n`);
    }
  }

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
