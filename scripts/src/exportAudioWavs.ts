/**
 * scripts/src/exportAudioWavs.ts
 *
 * Scars of the Last Kingdom — Standalone Audio WAV Exporter (R6.2)
 *
 * Exports 12 standalone WAV files to docs/audio/:
 * - trailer_75s_score.wav (75s trailer score render)
 * - 11 OST theme WAV renders:
 *   1. theme_exploration.wav
 *   2. theme_combat.wav
 *   3. theme_boss.wav
 *   4. theme_tension.wav
 *   5. theme_sorrow.wav
 *   6. theme_sanctuary.wav
 *   7. theme_dread.wav
 *   8. theme_triumph.wav
 *   9. theme_mystery.wav
 *   10. theme_cain.wav
 *   11. theme_mark.wav
 */

import { mkdirSync, writeFileSync, existsSync, statSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { THEME_SCORES } = require('../../artifacts/mobile/logic/music/themes.ts');
const { TRAILER_75S_ARRANGEMENT } = require('../../artifacts/mobile/logic/music/sequencer.ts');
const { midiToFreq } = require('../../artifacts/mobile/logic/music/voices.ts');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '../..');
const AUDIO_OUT_DIR = resolve(ROOT_DIR, 'docs/audio');

const SAMPLE_RATE = 44100;

interface ThemeRenderSpec {
  filename: string;
  durationSec: number;
  themeScores: Array<{
    scoreKey: string;
    weight: number;
    intensity: number;
  }>;
  title: string;
}

// Pseudo-random helper for consistent noise synthesis
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function synthesizeWavBuffer(
  durationSec: number,
  scoreSpecs: Array<{ scoreKey: string; weight: number; intensity: number }>
): Buffer {
  const numSamples = Math.floor(SAMPLE_RATE * durationSec);
  const pcm = new Int16Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sample = 0;

    for (const spec of scoreSpecs) {
      const score = THEME_SCORES[spec.scoreKey] ?? THEME_SCORES.main_theme;
      const stepDurSec = 60 / score.bpm / 4; // 16th-note grid
      const stepIdx = Math.floor(t / stepDurSec) % score.totalSteps;
      const localT = t % (stepDurSec * score.totalSteps);

      let themeSample = 0;
      for (const note of score.notes) {
        if (note.minIntensity > spec.intensity) continue;

        const endStep = note.step + note.lengthSteps;
        if (stepIdx >= note.step && stepIdx < endStep) {
          const vel = note.velocity ?? 0.7;

          if (note.voice === 'noiseKit') {
            const drumKind = note.drumKind ?? 'snare';
            const noteStartT = note.step * stepDurSec;
            const drumT = localT - noteStartT;
            if (drumT >= 0 && drumT < 0.25) {
              if (drumKind === 'kick') {
                const pitch = Math.max(40, 160 * Math.exp(-drumT * 35));
                const kickEnv = Math.exp(-drumT * 22);
                themeSample += Math.sin(2 * Math.PI * pitch * drumT) * 0.45 * vel * kickEnv;
              } else if (drumKind === 'snare') {
                const snareTone = Math.sin(2 * Math.PI * 185 * drumT) * Math.exp(-drumT * 30);
                const noise = pseudoRandom(i) * Math.exp(-drumT * 20);
                themeSample += (snareTone * 0.25 + noise * 0.25) * vel;
              } else {
                // hat
                const hatNoise = pseudoRandom(i) * Math.exp(-drumT * 60);
                themeSample += hatNoise * 0.18 * vel;
              }
            }
          } else if (note.midi > 0) {
            const freq = midiToFreq(note.midi);
            const noteStartT = note.step * stepDurSec;
            const noteAge = localT - noteStartT;
            const noteDur = note.lengthSteps * stepDurSec;
            const env = Math.sin(Math.min(1, Math.max(0, noteAge / noteDur)) * Math.PI);

            if (note.voice === 'subDrone') {
              themeSample += Math.sin(2 * Math.PI * freq * t) * 0.25 * vel;
            } else if (note.voice === 'sawPad') {
              // 3-oscillator detuned saw pad
              const s1 = Math.sin(2 * Math.PI * freq * t);
              const s2 = Math.sin(2 * Math.PI * (freq * 1.003) * t);
              const s3 = Math.sin(2 * Math.PI * (freq * 0.997) * t);
              themeSample += (s1 + s2 + s3) * 0.08 * vel;
            } else if (note.voice === 'bellPluck') {
              // FM Bell pluck
              const modFreq = freq * 2.0;
              const modEnv = Math.exp(-noteAge * 10);
              const carrier = Math.sin(2 * Math.PI * freq * t + Math.sin(2 * Math.PI * modFreq * t) * 1.8 * modEnv);
              themeSample += carrier * 0.22 * vel * Math.exp(-noteAge * 4);
            } else if (note.voice === 'triangleBass') {
              const tri = (Math.asin(Math.sin(2 * Math.PI * freq * t)) * (2 / Math.PI));
              themeSample += tri * 0.28 * vel;
            } else {
              // pulseLead with 2nd harmonic
              const p = Math.sin(2 * Math.PI * freq * t) * 0.7 + Math.sin(4 * Math.PI * freq * t) * 0.3;
              themeSample += p * 0.2 * vel * env;
            }
          }
        }
      }
      sample += themeSample * spec.weight;
    }

    // Master fade-in (first 1.5s) and fade-out (last 2.5s)
    let masterGain = 0.82;
    if (t < 1.5) masterGain *= t / 1.5;
    if (t > durationSec - 2.5) masterGain *= Math.max(0, (durationSec - t) / 2.5);

    const clamped = Math.max(-1, Math.min(1, sample * masterGain));
    pcm[i] = Math.round(clamped * 32767);
  }

  // Create RIFF WAVE header (44 bytes)
  const dataByteLen = pcm.byteLength;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataByteLen, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size = 16 for PCM
  header.writeUInt16LE(1, 20);  // AudioFormat = 1 (PCM)
  header.writeUInt16LE(1, 22);  // NumChannels = 1 (Mono)
  header.writeUInt32LE(SAMPLE_RATE, 24); // SampleRate
  header.writeUInt32LE(SAMPLE_RATE * 2, 28); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  header.writeUInt16LE(2, 32);  // BlockAlign = NumChannels * BitsPerSample/8
  header.writeUInt16LE(16, 34); // BitsPerSample = 16
  header.write('data', 36);
  header.writeUInt32LE(dataByteLen, 40);

  return Buffer.concat([header, Buffer.from(pcm.buffer)]);
}

function synthesizeTrailerScore(outWavPath: string, durationSec = 75): void {
  const numSamples = SAMPLE_RATE * durationSec;
  const pcm = new Int16Array(numSamples);

  let cursorSec = 0;
  for (const segment of TRAILER_75S_ARRANGEMENT) {
    const score = THEME_SCORES[segment.theme] ?? THEME_SCORES.main_theme;
    const stepDurSec = 60 / score.bpm / 4;
    const segStartSample = Math.floor(cursorSec * SAMPLE_RATE);
    const segEndSample = Math.min(numSamples, Math.floor((cursorSec + segment.durationSec) * SAMPLE_RATE));

    for (let i = segStartSample; i < segEndSample; i++) {
      const t = i / SAMPLE_RATE;
      const localT = t - cursorSec;
      const stepIdx = Math.floor(localT / stepDurSec) % score.totalSteps;

      let sample = 0;
      for (const note of score.notes) {
        const endStep = note.step + note.lengthSteps;
        if (stepIdx >= note.step && stepIdx < endStep && note.midi > 0 && note.voice !== 'noiseKit') {
          const freq = midiToFreq(note.midi);
          const vel = note.velocity ?? 0.7;
          if (note.voice === 'subDrone') {
            sample += Math.sin(2 * Math.PI * freq * t) * 0.24 * vel;
          } else if (note.voice === 'sawPad') {
            sample += (Math.sin(2 * Math.PI * freq * t) + Math.sin(2 * Math.PI * freq * 1.002 * t)) * 0.1 * vel;
          } else if (note.voice === 'bellPluck') {
            sample += Math.sin(2 * Math.PI * freq * t) * 0.22 * vel;
          } else {
            const noteProgress = (stepIdx - note.step + (localT % stepDurSec) / stepDurSec) / note.lengthSteps;
            const env = Math.sin(Math.min(1, noteProgress) * Math.PI);
            sample += (Math.sin(2 * Math.PI * freq * t) * 0.7 + Math.sin(4 * Math.PI * freq * t) * 0.3) * 0.22 * vel * env;
          }
        }
      }

      let masterGain = 0.85;
      if (t < 1.5) masterGain *= t / 1.5;
      if (t > durationSec - 2.5) masterGain *= Math.max(0, (durationSec - t) / 2.5);

      const clamped = Math.max(-1, Math.min(1, sample * masterGain));
      pcm[i] = Math.round(clamped * 32767);
    }

    cursorSec += segment.durationSec;
  }

  const dataByteLen = pcm.byteLength;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataByteLen, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataByteLen, 40);

  const wavBuffer = Buffer.concat([header, Buffer.from(pcm.buffer)]);
  writeFileSync(outWavPath, wavBuffer);
}

const THEME_SPECS: ThemeRenderSpec[] = [
  {
    filename: 'theme_exploration.wav',
    durationSec: 45,
    themeScores: [
      { scoreKey: 'tunnel_bed', weight: 0.6, intensity: 2 },
      { scoreKey: 'surface_bed', weight: 0.5, intensity: 2 },
    ],
    title: 'Exploration Theme (Tunnels & Surface)',
  },
  {
    filename: 'theme_combat.wav',
    durationSec: 40,
    themeScores: [{ scoreKey: 'combat_loop', weight: 1.0, intensity: 3 }],
    title: 'Combat / Crisis Loop',
  },
  {
    filename: 'theme_boss.wav',
    durationSec: 45,
    themeScores: [
      { scoreKey: 'iron_saints', weight: 0.6, intensity: 3 },
      { scoreKey: 'combat_loop', weight: 0.6, intensity: 3 },
    ],
    title: 'Boss Battle / Faction Climax',
  },
  {
    filename: 'theme_tension.wav',
    durationSec: 45,
    themeScores: [{ scoreKey: 'red_choir', weight: 1.0, intensity: 3 }],
    title: 'Tension / Red Choir Hymn',
  },
  {
    filename: 'theme_sorrow.wav',
    durationSec: 45,
    themeScores: [
      { scoreKey: 'hollow_children', weight: 0.7, intensity: 2 },
      { scoreKey: 'epilogue_theme', weight: 0.5, intensity: 2 },
    ],
    title: 'Sorrow / Chalk Names',
  },
  {
    filename: 'theme_sanctuary.wav',
    durationSec: 45,
    themeScores: [{ scoreKey: 'calm_bed', weight: 1.0, intensity: 2 }],
    title: 'Sanctuary / Lantern in the Clinic',
  },
  {
    filename: 'theme_dread.wav',
    durationSec: 45,
    themeScores: [
      { scoreKey: 'last_archive', weight: 0.65, intensity: 2 },
      { scoreKey: 'tunnel_bed', weight: 0.5, intensity: 2 },
    ],
    title: 'Dread / Catalog of Unburned Pages',
  },
  {
    filename: 'theme_triumph.wav',
    durationSec: 45,
    themeScores: [{ scoreKey: 'main_theme', weight: 1.0, intensity: 3 }],
    title: 'Triumph / The Last Kingdom Heroic Build',
  },
  {
    filename: 'theme_mystery.wav',
    durationSec: 45,
    themeScores: [{ scoreKey: 'glass_court', weight: 1.0, intensity: 2 }],
    title: 'Mystery / Mirrors Above the Ash',
  },
  {
    filename: 'theme_cain.wav',
    durationSec: 45,
    themeScores: [{ scoreKey: 'iron_saints', weight: 1.0, intensity: 2 }],
    title: "Cain's Motif / Vanguard March",
  },
  {
    filename: 'theme_mark.wav',
    durationSec: 45,
    themeScores: [
      { scoreKey: 'main_theme', weight: 0.5, intensity: 2 },
      { scoreKey: 'epilogue_theme', weight: 0.7, intensity: 2 },
    ],
    title: 'Mark Awakening / The Response',
  },
];

export function exportAllAudioWavs(): void {
  console.log('🎵 Exporting Standalone Soundtrack WAVs (docs/audio/)...');
  mkdirSync(AUDIO_OUT_DIR, { recursive: true });

  // 1. Trailer 75s Score
  const trailerPath = resolve(AUDIO_OUT_DIR, 'trailer_75s_score.wav');
  console.log('   Rendering trailer_75s_score.wav (75s)...');
  synthesizeTrailerScore(trailerPath, 75);

  // 2. 11 Theme WAVs
  for (const spec of THEME_SPECS) {
    const outPath = resolve(AUDIO_OUT_DIR, spec.filename);
    console.log(`   Rendering ${spec.filename} (${spec.durationSec}s) — ${spec.title}...`);
    const buf = synthesizeWavBuffer(spec.durationSec, spec.themeScores);
    writeFileSync(outPath, buf);
  }

  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ ALL 12 STANDALONE WAV FILES EXPORTED:');
  const files = [
    'trailer_75s_score.wav',
    ...THEME_SPECS.map((s) => s.filename),
  ];
  for (const file of files) {
    const full = resolve(AUDIO_OUT_DIR, file);
    const size = statSync(full).size;
    const dur = (size - 44) / (SAMPLE_RATE * 2);
    console.log(`   - ${file.padEnd(26)}: ${size.toLocaleString().padStart(9)} bytes (~${dur.toFixed(1)}s, 44.1kHz 16-bit PCM)`);
  }
  console.log('═══════════════════════════════════════════════════════════');
}

if (process.argv[1] && process.argv[1].endsWith('exportAudioWavs.ts')) {
  try {
    exportAllAudioWavs();
  } catch (err) {
    console.error('❌ Failed to export audio WAVs:', err);
    process.exit(1);
  }
}
