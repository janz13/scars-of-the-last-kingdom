/**
 * Offline Trailer Renderer — Scars of the Last Kingdom (Wave 6 Deliverable)
 * Run with: npx tsx scripts/video/renderTrailer.ts
 *
 * 1. Synthesizes a 75-second 44.1kHz 16-bit PCM WAV soundtrack cue from
 *    TRAILER_75S_ARRANGEMENT and THEME_SCORES.
 * 2. Renders high-contrast pixel-art frames with integer nearest-neighbor
 *    scaling, title cards, and subtitles from TRAILER_75S_TIMELINE.
 * 3. Encodes:
 *    - docs/video/trailer_16x9_1080p.mp4 (1920x1080, 75s, H.264 + AAC)
 *    - docs/video/trailer_9x16_1080p.mp4 (1080x1920, 75s, H.264 + AAC)
 *    - docs/video/trailer_loop.webm      (1280x720, 12s loop, VP9)
 */

import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { TRAILER_75S_TIMELINE } = require('../../artifacts/mobile/data/cinematics/trailerTimeline.ts');
const { THEME_SCORES } = require('../../artifacts/mobile/logic/music/themes.ts');
const { TRAILER_75S_ARRANGEMENT } = require('../../artifacts/mobile/logic/music/sequencer.ts');
const { midiToFreq } = require('../../artifacts/mobile/logic/music/voices.ts');

const ROOT_DIR = resolve(import.meta.dirname, '../..');
const PIXEL_SCENES_DIR = resolve(ROOT_DIR, 'artifacts/mobile/assets/pixel/scenes');
const VIDEO_OUT_DIR = resolve(ROOT_DIR, 'docs/video');
const TMP_DIR = resolve(ROOT_DIR, 'docs/video/.tmp_render');

function synthesizeTrailerWav(outWavPath: string, durationSec = 75): void {
  const sampleRate = 44100;
  const numSamples = sampleRate * durationSec;
  const pcm = new Int16Array(numSamples);

  let cursorSec = 0;
  for (const segment of TRAILER_75S_ARRANGEMENT) {
    const score = THEME_SCORES[segment.theme] ?? THEME_SCORES.main_theme;
    const stepDurSec = 60 / score.bpm / 4; // 16th-note grid
    const segStartSample = Math.floor(cursorSec * sampleRate);
    const segEndSample = Math.min(numSamples, Math.floor((cursorSec + segment.durationSec) * sampleRate));

    for (let i = segStartSample; i < segEndSample; i++) {
      const t = i / sampleRate;
      const localT = t - cursorSec;
      const stepIdx = Math.floor(localT / stepDurSec) % score.totalSteps;

      let sample = 0;
      for (const note of score.notes) {
        const endStep = note.step + note.lengthSteps;
        if (stepIdx >= note.step && stepIdx < endStep && note.midi > 0 && note.voice !== 'noiseKit') {
          const freq = midiToFreq(note.midi);
          const vel = note.velocity ?? 0.7;
          if (note.voice === 'subDrone') {
            sample += Math.sin(2 * Math.PI * freq * t) * 0.22 * vel;
          } else if (note.voice === 'sawPad') {
            sample += Math.sin(2 * Math.PI * freq * t) * 0.1 * vel;
          } else {
            const noteProgress = (stepIdx - note.step + (localT % stepDurSec) / stepDurSec) / note.lengthSteps;
            const env = Math.sin(Math.min(1, noteProgress) * Math.PI);
            sample += (Math.sin(2 * Math.PI * freq * t) * 0.7 + Math.sin(4 * Math.PI * freq * t) * 0.3) * 0.2 * vel * env;
          }
        }
      }

      // Master fade-in (first 1.5s) and fade-out (last 2.5s)
      let masterGain = 0.85;
      if (t < 1.5) masterGain *= t / 1.5;
      if (t > durationSec - 2.5) masterGain *= Math.max(0, (durationSec - t) / 2.5);

      const clamped = Math.max(-1, Math.min(1, sample * masterGain));
      pcm[i] = Math.round(clamped * 32767);
    }

    cursorSec += segment.durationSec;
  }

  // Write WAV header + PCM payload
  const dataByteLen = pcm.byteLength;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataByteLen, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size
  header.writeUInt16LE(1, 20);  // PCM = 1
  header.writeUInt16LE(1, 22);  // Mono = 1 channel
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);  // BlockAlign
  header.writeUInt16LE(16, 34); // BitsPerSample
  header.write('data', 36);
  header.writeUInt32LE(dataByteLen, 40);

  const wavBuffer = Buffer.concat([header, Buffer.from(pcm.buffer)]);
  writeFileSync(outWavPath, wavBuffer);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function renderShotSlide(
  shotIndex: number,
  orientation: 'landscape' | 'portrait',
  outPngPath: string
): Promise<void> {
  const shot = TRAILER_75S_TIMELINE.shots[shotIndex]!;
  const width = orientation === 'landscape' ? 1920 : 1080;
  const height = orientation === 'landscape' ? 1080 : 1920;

  const suffix = orientation === 'landscape' ? 'landscape' : 'portrait';
  const candidateScene = join(PIXEL_SCENES_DIR, `${shot.sceneKey}_${suffix}.png`);
  const fallbackScene = join(PIXEL_SCENES_DIR, `ruined_metro_station_${suffix}.png`);
  const srcPath = existsSync(candidateScene) ? candidateScene : fallbackScene;

  // Integer-clean nearest-neighbor upscale of the master pixel art
  const upscaledBg = await sharp(srcPath)
    .resize(width, height, { kernel: sharp.kernel.nearest, fit: 'cover' })
    .png()
    .toBuffer();

  const tc = shot.titleCard;
  const sub = shot.subtitles?.[0];

  let overlaySvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Subtle scanlines & vignette frame
  overlaySvg += `<rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="#9b59b6" stroke-opacity="0.45" stroke-width="3"/>`;

  if (tc) {
    const boxY = Math.round(height * 0.36);
    const boxH = Math.round(height * 0.28);
    overlaySvg += `<rect x="0" y="${boxY}" width="${width}" height="${boxH}" fill="#05040a" fill-opacity="0.72"/>`;
    if (tc.eyebrow) {
      overlaySvg += `<text x="${width / 2}" y="${boxY + 68}" text-anchor="middle" fill="#c9a84c" font-family="monospace" font-size="${orientation === 'landscape' ? 22 : 18}" font-weight="bold" letter-spacing="4">${escapeXml(tc.eyebrow)}</text>`;
    }
    overlaySvg += `<text x="${width / 2}" y="${boxY + 145}" text-anchor="middle" fill="#ede0c4" font-family="serif" font-size="${orientation === 'landscape' ? 54 : 38}" font-weight="bold" letter-spacing="4">${escapeXml(tc.title)}</text>`;
    if (tc.subtitle) {
      overlaySvg += `<text x="${width / 2}" y="${boxY + 205}" text-anchor="middle" fill="#9b59b6" font-family="monospace" font-size="${orientation === 'landscape' ? 22 : 17}" font-weight="bold" letter-spacing="3">${escapeXml(tc.subtitle)}</text>`;
    }
  }

  if (sub) {
    const subY = height - (orientation === 'landscape' ? 160 : 280);
    const padX = orientation === 'landscape' ? 220 : 60;
    overlaySvg += `<rect x="${padX}" y="${subY}" width="${width - padX * 2}" height="100" rx="8" fill="#080610" fill-opacity="0.88" stroke="#9b59b6" stroke-opacity="0.45" stroke-width="2"/>`;
    if (sub.speaker) {
      overlaySvg += `<text x="${width / 2}" y="${subY + 34}" text-anchor="middle" fill="#c9a84c" font-family="monospace" font-size="18" font-weight="bold" letter-spacing="3">${escapeXml(sub.speaker.toUpperCase())}</text>`;
      overlaySvg += `<text x="${width / 2}" y="${subY + 68}" text-anchor="middle" fill="#ede0c4" font-family="sans-serif" font-size="${orientation === 'landscape' ? 22 : 18}">${escapeXml(sub.text)}</text>`;
    } else {
      overlaySvg += `<text x="${width / 2}" y="${subY + 58}" text-anchor="middle" fill="#ede0c4" font-family="sans-serif" font-size="${orientation === 'landscape' ? 23 : 18}">${escapeXml(sub.text)}</text>`;
    }
  }

  overlaySvg += `</svg>`;

  await sharp(upscaledBg)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .png()
    .toFile(outPngPath);
}

async function main() {
  console.log('🎬 Rendering Scars of the Last Kingdom Offline Trailers (Wave 6)...');
  mkdirSync(VIDEO_OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const wavPath = join(TMP_DIR, 'trailer_75s.wav');
  console.log('   1/4 Synthesizing 75-second procedural soundtrack WAV...');
  synthesizeTrailerWav(wavPath, 75);

  console.log('   2/4 Compositing 1080p 16:9 and 9:16 pixel-art shot slides...');
  const concat16x9Lines: string[] = [];
  const concat9x16Lines: string[] = [];

  for (let i = 0; i < TRAILER_75S_TIMELINE.shots.length; i++) {
    const shot = TRAILER_75S_TIMELINE.shots[i]!;
    const slide16x9 = join(TMP_DIR, `slide_16x9_${String(i).padStart(2, '0')}.png`);
    const slide9x16 = join(TMP_DIR, `slide_9x16_${String(i).padStart(2, '0')}.png`);

    await renderShotSlide(i, 'landscape', slide16x9);
    await renderShotSlide(i, 'portrait', slide9x16);

    concat16x9Lines.push(`file '${slide16x9.replace(/\\/g, '/')}'`);
    concat16x9Lines.push(`duration ${shot.durationSec}`);
    concat9x16Lines.push(`file '${slide9x16.replace(/\\/g, '/')}'`);
    concat9x16Lines.push(`duration ${shot.durationSec}`);
  }

  // Repeat last file entry for ffmpeg concat demuxer
  const lastIdx = TRAILER_75S_TIMELINE.shots.length - 1;
  concat16x9Lines.push(`file '${join(TMP_DIR, `slide_16x9_${String(lastIdx).padStart(2, '0')}.png`).replace(/\\/g, '/')}'`);
  concat9x16Lines.push(`file '${join(TMP_DIR, `slide_9x16_${String(lastIdx).padStart(2, '0')}.png`).replace(/\\/g, '/')}'`);

  const list16x9Path = join(TMP_DIR, 'concat_16x9.txt');
  const list9x16Path = join(TMP_DIR, 'concat_9x16.txt');
  writeFileSync(list16x9Path, concat16x9Lines.join('\n'), 'utf-8');
  writeFileSync(list9x16Path, concat9x16Lines.join('\n'), 'utf-8');

  const out16x9 = join(VIDEO_OUT_DIR, 'trailer_16x9_1080p.mp4');
  const out9x16 = join(VIDEO_OUT_DIR, 'trailer_9x16_1080p.mp4');
  const outWebm = join(VIDEO_OUT_DIR, 'trailer_loop.webm');

  console.log('   3/4 Encoding trailer_16x9_1080p.mp4 and trailer_9x16_1080p.mp4 via ffmpeg...');
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${list16x9Path}" -i "${wavPath}" -c:v libx264 -pix_fmt yuv420p -r 30 -crf 20 -c:a aac -b:a 192k -shortest "${out16x9}"`,
    { stdio: 'pipe' }
  );
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${list9x16Path}" -i "${wavPath}" -c:v libx264 -pix_fmt yuv420p -r 30 -crf 20 -c:a aac -b:a 192k -shortest "${out9x16}"`,
    { stdio: 'pipe' }
  );

  console.log('   4/4 Encoding 12-second README loop trailer_loop.webm...');
  execSync(
    `ffmpeg -y -ss 0 -t 12 -i "${out16x9}" -vf "scale=1280:720:flags=neighbor" -an -c:v libvpx-vp9 -b:v 1M -crf 30 "${outWebm}"`,
    { stdio: 'pipe' }
  );

  rmSync(TMP_DIR, { recursive: true, force: true });
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ OFFLINE TRAILERS GENERATED:');
  console.log(`   - ${out16x9}`);
  console.log(`   - ${out9x16}`);
  console.log(`   - ${outWebm}`);
  console.log('═══════════════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('❌ Trailer render failed:', err);
  process.exit(1);
});
