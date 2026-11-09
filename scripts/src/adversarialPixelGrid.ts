/**
 * Comprehensive Adversarial Stress & Verification Harness
 * Pixel Grid Math, Integer Scaling, Focal Shifts, DPR & Viewport Geometry
 *
 * Designed by w1_challenger_1 (Empirical Challenger)
 * Branch: feat/pixel-overhaul
 */

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const {
  computeViewportScale,
  computeFocalShift,
  resolveLayoutMode,
  getOrientation,
  PIXEL_GRID,
} = require('../../artifacts/mobile/constants/pixelGrid.ts');

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails: string[] = [];

function check(condition: boolean, description: string, details?: any) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    const msg = `❌ FAIL: ${description}${details ? ' | ' + JSON.stringify(details) : ''}`;
    failureDetails.push(msg);
    console.error(msg);
  }
}

console.log('================================================================');
console.log('🔥 EMPIRICAL ADVERSARIAL STRESS HARNESS: PIXEL GRID & SCALING 🔥');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────────────────────
// 1. INVARIANT CHECKS ACROSS 50,000 PSEUDORANDOM VIEWPORTS
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- 1. Invariants across 50,000 Randomized Viewports ---');

function assertInvariants(vw: number, vh: number, dpr = 1, context = '') {
  const res = computeViewportScale(vw, vh, dpr);
  const grid = PIXEL_GRID[res.orientation];

  // Invariant 1: Scale is an integer >= 1
  check(
    Number.isInteger(res.scale) && res.scale >= 1,
    `[${context}] Scale is integer >= 1 (got ${res.scale} for ${vw}x${vh})`
  );

  // Invariant 2: Display dimensions strictly equal master * scale
  check(
    res.displayWidth === grid.masterW * res.scale,
    `[${context}] displayWidth === masterW * scale`
  );
  check(
    res.displayHeight === grid.masterH * res.scale,
    `[${context}] displayHeight === masterH * scale`
  );

  // Invariant 3: Safe dimensions strictly equal safe * scale
  check(
    res.safeWidth === grid.safeW * res.scale,
    `[${context}] safeWidth === safeW * scale`
  );
  check(
    res.safeHeight === grid.safeH * res.scale,
    `[${context}] safeHeight === safeH * scale`
  );

  // Invariant 4: Offsets must be exact integers for pixel snapping
  check(
    Number.isInteger(res.offsetX) && Number.isInteger(res.offsetY),
    `[${context}] Offsets are integers`
  );

  // Invariant 5: Centering math symmetry
  const safeVw = Math.max(1, vw);
  const safeVh = Math.max(1, vh);
  const diffX = safeVw - (res.displayWidth + 2 * res.offsetX);
  const diffY = safeVh - (res.displayHeight + 2 * res.offsetY);
  check(
    diffX === 0 || diffX === 1,
    `[${context}] Centering X math floor symmetry (diffX=${diffX})`
  );
  check(
    diffY === 0 || diffY === 1,
    `[${context}] Centering Y math floor symmetry (diffY=${diffY})`
  );

  // Invariant 6: Ultrawide condition
  const aspect = safeVw / safeVh;
  if (res.isUltrawide) {
    check(
      res.orientation === 'landscape' && aspect > grid.ultrawideThreshold,
      `[${context}] isUltrawide is true only on landscape aspect > 1.9`
    );
    check(
      res.pillarboxWidth === Math.max(0, res.offsetX),
      `[${context}] pillarboxWidth === max(0, offsetX) on ultrawide`
    );
  } else {
    check(
      res.pillarboxWidth === 0,
      `[${context}] pillarboxWidth === 0 when !isUltrawide`
    );
  }

  // Invariant 7: No NaN or Infinity
  check(
    !Number.isNaN(res.scale) &&
      !Number.isNaN(res.displayWidth) &&
      !Number.isNaN(res.displayHeight) &&
      !Number.isNaN(res.offsetX) &&
      !Number.isNaN(res.offsetY) &&
      !Number.isNaN(res.safeWidth) &&
      !Number.isNaN(res.safeHeight) &&
      !Number.isNaN(res.pillarboxWidth),
    `[${context}] No NaN values in ViewportScale`
  );
}

let seed = 12345;
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

for (let i = 0; i < 50000; i++) {
  const randW = Math.floor(seededRandom() * 10000) + 1;
  const randH = Math.floor(seededRandom() * 10000) + 1;
  const randDpr = Math.floor(seededRandom() * 40) / 10 + 0.5;
  assertInvariants(randW, randH, randDpr, `Random ${i}`);
}
console.log('  ✅ 50,000 random viewport invariant checks passed.');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONTINUOUS RESIZE SWEEPS & ORIENTATION FLIP CONTINUITY
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 2. Continuous Resize Sweeps & Square Flip Continuity ---');

// Horizontal sweep at 1080p height (w from 1 to 4000)
let prevScale = 1;
for (let w = 1; w <= 4000; w++) {
  const res = computeViewportScale(w, 1080);
  if (w >= 1080) {
    // In landscape with fixed height 1080: scale must be monotonically non-decreasing
    check(res.scale >= prevScale, `Horizontal sweep monotonic scale at w=${w} (${res.scale} vs ${prevScale})`);
    prevScale = res.scale;
  }
}

// Vertical sweep at 1920p width (h from 1 to 3000)
let prevVScale = 1;
for (let h = 1; h <= 1920; h++) {
  const res = computeViewportScale(1920, h);
  // In landscape with fixed width 1920: scale must be monotonically non-decreasing with h
  check(res.scale >= prevVScale, `Vertical sweep monotonic scale at h=${h} (${res.scale} vs ${prevVScale})`);
  prevVScale = res.scale;
}

// Diagonal square boundary sweep: S from 1 to 5000
// Test that crossing from (S-1, S) [portrait] to (S, S) [landscape] preserves scale continuity
for (let s = 10; s <= 5000; s += 5) {
  const portraitRes = computeViewportScale(s - 1, s);
  const landscapeRes = computeViewportScale(s, s);

  check(
    portraitRes.scale === landscapeRes.scale,
    `Square boundary continuity at S=${s}: portrait scale ${portraitRes.scale} === landscape scale ${landscapeRes.scale}`
  );
}
console.log('  ✅ Continuous sweeps and square boundary scale continuity confirmed.');

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXTREME VIEWPORTS & ASPECT RATIOS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 3. Extreme Viewports & Aspect Ratios ---');

const extremeViewports = [
  { name: 'Samsung Neo G9 32:9', w: 5120, h: 1440, expScale: 4, expOrient: 'landscape', expUltrawide: true },
  { name: 'Super ultrawide 32:9 1080p', w: 3840, h: 1080, expScale: 3, expOrient: 'landscape', expUltrawide: true },
  { name: 'Double 4K 32:9', w: 7680, h: 2160, expScale: 6, expOrient: 'landscape', expUltrawide: true },
  { name: 'Extreme Ultrawide 48:9', w: 4800, h: 900, expScale: 2, expOrient: 'landscape', expUltrawide: true },
  { name: '21:9 QHD (3440x1440)', w: 3440, h: 1440, expScale: 4, expOrient: 'landscape', expUltrawide: true },
  { name: '21:9 FHD (2560x1080)', w: 2560, h: 1080, expScale: 3, expOrient: 'landscape', expUltrawide: true },
  { name: '720p HD (1280x720)', w: 1280, h: 720, expScale: 2, expOrient: 'landscape', expUltrawide: false },
  { name: '1080p FHD (1920x1080)', w: 1920, h: 1080, expScale: 3, expOrient: 'landscape', expUltrawide: false },
  { name: '1440p QHD (2560x1440)', w: 2560, h: 1440, expScale: 4, expOrient: 'landscape', expUltrawide: false },
  { name: '4K UHD (3840x2160)', w: 3840, h: 2160, expScale: 6, expOrient: 'landscape', expUltrawide: false },
  { name: '8K UHD (7680x4320)', w: 7680, h: 4320, expScale: 12, expOrient: 'landscape', expUltrawide: false },
  { name: '16K (15360x8640)', w: 15360, h: 8640, expScale: 24, expOrient: 'landscape', expUltrawide: false },
  { name: 'Square 1:1 (1000x1000)', w: 1000, h: 1000, expScale: 1, expOrient: 'landscape', expUltrawide: false },
  { name: 'iPhone 12/13/14 (390x844)', w: 390, h: 844, expScale: 1, expOrient: 'portrait', expUltrawide: false },
  { name: 'iPhone Pro Max (430x932)', w: 430, h: 932, expScale: 1, expOrient: 'portrait', expUltrawide: false },
  { name: 'iPad Portrait (768x1024)', w: 768, h: 1024, expScale: 1, expOrient: 'portrait', expUltrawide: false },
  { name: 'iPad Pro Portrait (1024x1366)', w: 1024, h: 1366, expScale: 2, expOrient: 'portrait', expUltrawide: false },
  { name: 'FHD Portrait Phone (1080x1920)', w: 1080, h: 1920, expScale: 3, expOrient: 'portrait', expUltrawide: false },
  { name: 'Sony Xperia 21:9 Portrait (1080x2520)', w: 1080, h: 2520, expScale: 3, expOrient: 'portrait', expUltrawide: false },
  { name: 'Extreme Vertical 1:3 (360x1080)', w: 360, h: 1080, expScale: 1, expOrient: 'portrait', expUltrawide: false },
  { name: 'Extreme Vertical 1:4 (300x1200)', w: 300, h: 1200, expScale: 1, expOrient: 'portrait', expUltrawide: false },
  { name: 'Tiny 100x100', w: 100, h: 100, expScale: 1, expOrient: 'landscape', expUltrawide: false },
  { name: 'Tiny 50x50', w: 50, h: 50, expScale: 1, expOrient: 'landscape', expUltrawide: false },
  { name: 'Degenerate 1x1', w: 1, h: 1, expScale: 1, expOrient: 'landscape', expUltrawide: false },
];

for (const vp of extremeViewports) {
  const res = computeViewportScale(vp.w, vp.h);
  check(res.scale === vp.expScale, `${vp.name}: scale === ${vp.expScale} (got ${res.scale})`);
  check(res.orientation === vp.expOrient, `${vp.name}: orientation === ${vp.expOrient} (got ${res.orientation})`);
  check(res.isUltrawide === vp.expUltrawide, `${vp.name}: isUltrawide === ${vp.expUltrawide} (got ${res.isUltrawide})`);
  assertInvariants(vp.w, vp.h, 1, vp.name);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BOUNDARY THRESHOLDS (Exact, -1px, +1px)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 4. Boundary Thresholds Testing ---');

// Landscape scale multiples N=1..12
for (let n = 1; n <= 12; n++) {
  const baseW = n * 640;
  const baseH = n * 360;

  const exact = computeViewportScale(baseW, baseH);
  check(exact.scale === n, `Landscape exact threshold ${baseW}x${baseH} scale === ${n}`);

  const belowW = computeViewportScale(baseW - 1, baseH);
  check(belowW.scale === (n === 1 ? 1 : n - 1), `Landscape ${baseW - 1}x${baseH} scale drops when n > 1`);

  const aboveW = computeViewportScale(baseW + 1, baseH);
  check(aboveW.scale === n, `Landscape ${baseW + 1}x${baseH} scale stays at ${n}`);

  const belowH = computeViewportScale(baseW, baseH - 1);
  check(belowH.scale === (n === 1 ? 1 : n - 1), `Landscape ${baseW}x${baseH - 1} scale drops when n > 1`);

  const aboveH = computeViewportScale(baseW, baseH + 1);
  check(aboveH.scale === n, `Landscape ${baseW}x${baseH + 1} scale stays at ${n}`);
}

// Portrait scale multiples N=1..6
for (let n = 1; n <= 6; n++) {
  const baseW = n * 360;
  const baseH = n * 640;

  const exact = computeViewportScale(baseW, baseH);
  check(exact.scale === n, `Portrait exact threshold ${baseW}x${baseH} scale === ${n}`);

  const belowW = computeViewportScale(baseW - 1, baseH);
  check(belowW.scale === (n === 1 ? 1 : n - 1), `Portrait ${baseW - 1}x${baseH} scale drops when n > 1`);

  const aboveW = computeViewportScale(baseW + 1, baseH);
  check(aboveW.scale === n, `Portrait ${baseW + 1}x${baseH} scale stays at ${n}`);

  const belowH = computeViewportScale(baseW, baseH - 1);
  check(belowH.scale === (n === 1 ? 1 : n - 1), `Portrait ${baseW}x${baseH - 1} scale drops when n > 1`);

  const aboveH = computeViewportScale(baseW, baseH + 1);
  check(aboveH.scale === n, `Portrait ${baseW}x${baseH + 1} scale stays at ${n}`);
}

// Ultrawide exact boundary
check(computeViewportScale(1900, 1000).isUltrawide === false, 'Aspect 1.900 is NOT ultrawide');
check(computeViewportScale(1901, 1000).isUltrawide === true, 'Aspect 1.901 IS ultrawide');

// ─────────────────────────────────────────────────────────────────────────────
// 5. DPR AND PHYSICAL PIXEL ALIGNMENT
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 5. DPR & Physical Alignment ---');

const dprList = [1.0, 1.25, 1.333, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 4.0];

for (const dpr of dprList) {
  const res = computeViewportScale(1920, 1080, dpr);
  check(res.dpr === dpr, `DPR ${dpr} passed through`);
  check(res.scale === 3, `Scale remains integer 3 on 1080p under DPR ${dpr}`);

  // Reversibility check: artPx <-> cssPx
  for (let artPx = 0; artPx <= 720; artPx += 30) {
    const cssPx = artPx * res.scale;
    const backArt = Math.floor(cssPx / res.scale);
    check(backArt === artPx, `Pixel reversibility for artPx=${artPx} at DPR=${dpr}`);
  }
}

// Clamping of invalid DPRs
check(computeViewportScale(1920, 1080, 0).dpr === 1, 'DPR 0 clamps to 1');
check(computeViewportScale(1920, 1080, -3).dpr === 1, 'Negative DPR clamps to 1');

// ─────────────────────────────────────────────────────────────────────────────
// 6. FOCAL SHIFTS STRESS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 6. Focal Shifts Stress ---');

const focalTests = [
  { f: { x: 360, y: 200 }, o: 'landscape', ts: 'right', expX: 0, expY: 0 },
  { f: { x: 360, y: 200 }, o: 'landscape', ts: 'left', expX: 0, expY: 0 },
  { f: { x: 200, y: 380 }, o: 'portrait', ts: 'bottom', expX: 0, expY: 0 },
  { f: { x: 0, y: 0 }, o: 'landscape', ts: 'right', expX: 0, expY: 0 },
  { f: { x: 0, y: 0 }, o: 'landscape', ts: 'left', expX: 16, expY: 0 },
  { f: { x: 720, y: 400 }, o: 'landscape', ts: 'right', expX: -16, expY: 0 },
  { f: { x: 720, y: 400 }, o: 'landscape', ts: 'left', expX: 0, expY: 0 },
  { f: { x: 400, y: 760 }, o: 'portrait', ts: 'bottom', expX: 0, expY: -16 },
  { f: { x: 100000, y: 100000 }, o: 'landscape', ts: 'right', expX: -16, expY: 0 },
  { f: { x: -100000, y: -100000 }, o: 'landscape', ts: 'left', expX: 16, expY: 0 },
  { f: { x: 460, y: 200 }, o: 'landscape', ts: 'right', expX: -10, expY: 0 },
  { f: { x: 260, y: 200 }, o: 'landscape', ts: 'left', expX: 10, expY: 0 },
  { f: { x: 200, y: 480 }, o: 'portrait', ts: 'bottom', expX: 0, expY: -10 },
];

for (const t of focalTests) {
  const s = computeFocalShift(t.f, t.o as any, t.ts as any);
  check(s.shiftX === t.expX, `FocalShift X: ${t.f.x},${t.f.y} -> ${t.expX}`);
  check(s.shiftY === t.expY, `FocalShift Y: ${t.f.x},${t.f.y} -> ${t.expY}`);
  check(Number.isInteger(s.shiftX) && Number.isInteger(s.shiftY), 'Focal shift is integer');
  check(Math.abs(s.shiftX) <= 16 && Math.abs(s.shiftY) <= 16, 'Focal shift <= 16');
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. ADAPTIVE LAYOUT MODES
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 7. Adaptive Layout Modes ---');

check(resolveLayoutMode(1920, 1080) === 'column', '1920x1080 is column');
check(resolveLayoutMode(1500, 1000) === 'column', 'Aspect 1.500 is column');
check(resolveLayoutMode(1499, 1000) === 'letterbox', 'Aspect 1.499 is letterbox');
check(resolveLayoutMode(1000, 1000) === 'letterbox', 'Aspect 1.000 is letterbox');
check(resolveLayoutMode(999, 1000) === 'sheet', 'Aspect 0.999 is sheet');
check(resolveLayoutMode(390, 844) === 'sheet', '390x844 is sheet');
check(resolveLayoutMode(1024, 768, 'column') === 'column', 'Override column respected');
check(resolveLayoutMode(500, 800, 'column') === 'sheet', 'Override column ignored when width < 600');
check(resolveLayoutMode(1920, 1080, 'letterbox') === 'letterbox', 'Override letterbox respected');

// ─────────────────────────────────────────────────────────────────────────────
// 8. PERFORMANCE BENCHMARK
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 8. High-Frequency Benchmark (1,000,000 Scale Computations) ---');

const startBench = performance.now();
for (let i = 0; i < 1000000; i++) {
  computeViewportScale(1920, 1080, 2);
}
const elapsedMs = performance.now() - startBench;
const opsPerSec = Math.round(1000000 / (elapsedMs / 1000));
console.log(`  ⚡ Executed 1,000,000 computeViewportScale ops in ${elapsedMs.toFixed(2)}ms (${opsPerSec.toLocaleString()} ops/sec)`);
check(elapsedMs < 1000, `1M computeViewportScale runs in < 1000ms (took ${elapsedMs.toFixed(2)}ms)`);

console.log('\n================================================================');
console.log(`TOTAL ASSERTIONS:  ${totalAssertions}`);
console.log(`PASSED:            ${passedAssertions}`);
console.log(`FAILED:            ${failedAssertions}`);
console.log('================================================================\n');

if (failedAssertions > 0) {
  console.error(`💥 FAILURE: ${failedAssertions} assertions failed!`);
  process.exit(1);
} else {
  console.log('✨ ALL ADVERSARIAL STRESS TESTS PASSED WITH ZERO DEFECTS!\n');
  process.exit(0);
}
