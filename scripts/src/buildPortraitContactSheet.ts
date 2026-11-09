/**
 * scripts/src/buildPortraitContactSheet.ts
 *
 * Scars of the Last Kingdom — Character Portrait Contact Sheet Generator (R6.1)
 *
 * Renders all 39 portraits (13 characters × 3 expressions) from
 * artifacts/mobile/constants/portraits.ts into a crisp 2D contact sheet PNG
 * at docs/portrait-contact-sheet.png with character names, titles, and expressions.
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  CHARACTER_PORTRAIT_CATALOG,
  ALL_CHARACTER_IDS,
  ALL_EXPRESSIONS,
  buildPortraitPixelGrid,
} = require('../../artifacts/mobile/constants/portraits.ts');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '../..');
const DOCS_DIR = resolve(ROOT_DIR, 'docs');
const OUT_FILE = resolve(DOCS_DIR, 'portrait-contact-sheet.png');

function hexToRgba(hex: string): [number, number, number, number] {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c: string) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return [r, g, b, 255];
}

async function renderPortraitBuffer(
  characterId: string,
  expression: 'neutral' | 'strained' | 'resolved',
  targetSize = 128
): Promise<Buffer> {
  const grid = buildPortraitPixelGrid(characterId, expression);
  const rawRgba = Buffer.alloc(16 * 16 * 4);

  let offset = 0;
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const hex = grid[y][x];
      const [r, g, b, a] = hexToRgba(hex);
      rawRgba[offset] = r;
      rawRgba[offset + 1] = g;
      rawRgba[offset + 2] = b;
      rawRgba[offset + 3] = a;
      offset += 4;
    }
  }

  return sharp(rawRgba, {
    raw: {
      width: 16,
      height: 16,
      channels: 4,
    },
  })
    .resize(targetSize, targetSize, {
      kernel: sharp.kernel.nearest,
    })
    .png()
    .toBuffer();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function buildPortraitContactSheet(): Promise<string> {
  console.log('🎨 Generating Character Portrait Contact Sheet (docs/portrait-contact-sheet.png)...');

  if (!existsSync(DOCS_DIR)) {
    mkdirSync(DOCS_DIR, { recursive: true });
  }

  const SHEET_WIDTH = 1280;
  const HEADER_HEIGHT = 160;
  const ROW_HEIGHT = 160;
  const ROW_GAP = 14;
  const NUM_CHARACTERS = ALL_CHARACTER_IDS.length; // 13
  const FOOTER_HEIGHT = 80;
  const SHEET_HEIGHT = HEADER_HEIGHT + NUM_CHARACTERS * (ROW_HEIGHT + ROW_GAP) + FOOTER_HEIGHT;

  const PORTRAIT_SIZE = 128;
  const COL_X = {
    info: 48,
    neutral: 480,
    strained: 680,
    resolved: 880,
  };

  const composites: sharp.OverlayOptions[] = [];
  let svg = `<svg width="${SHEET_WIDTH}" height="${SHEET_HEIGHT}" xmlns="http://www.w3.org/2000/svg">`;

  // Deep dark background
  svg += `<rect width="${SHEET_WIDTH}" height="${SHEET_HEIGHT}" fill="#05030a"/>`;

  // Atmospheric gradient grid lines
  for (let y = 0; y < SHEET_HEIGHT; y += 40) {
    svg += `<line x1="0" y1="${y}" x2="${SHEET_WIDTH}" y2="${y}" stroke="#120c22" stroke-width="1"/>`;
  }
  for (let x = 0; x < SHEET_WIDTH; x += 40) {
    svg += `<line x1="${x}" y1="0" x2="${x}" y2="${SHEET_HEIGHT}" stroke="#120c22" stroke-width="1"/>`;
  }

  // Header Title Box
  svg += `
    <rect x="32" y="24" width="${SHEET_WIDTH - 64}" height="108" rx="6" fill="#0d0818" stroke="#43285c" stroke-width="2"/>
    <text x="56" y="64" fill="#ede0c4" font-family="'Courier New', monospace" font-size="28" font-weight="bold" letter-spacing="2">SCARS OF THE LAST KINGDOM</text>
    <text x="56" y="92" fill="#c9a84c" font-family="'Courier New', monospace" font-size="16" letter-spacing="3">MASTER CHARACTER PORTRAIT CONTACT SHEET</text>
    <text x="56" y="114" fill="#8e7fa5" font-family="monospace" font-size="12">13 Characters × 3 Expressions = 39 16-Bit Pixel-Art Portraits (Scaled 8× to 128×128 px)</text>
    <text x="${SHEET_WIDTH - 56}" y="68" text-anchor="end" fill="#9b59b6" font-family="monospace" font-size="16" font-weight="bold">PHASE B5 / WAVE 3 DELIVERABLE</text>
    <text x="${SHEET_WIDTH - 56}" y="92" text-anchor="end" fill="#c9a84c" font-family="monospace" font-size="12">INTEGER SCALED • DETERMINISTIC PROCEDURAL RENDER</text>
  `;

  // Column Headers
  const colHeaderY = HEADER_HEIGHT - 12;
  svg += `
    <text x="${COL_X.info}" y="${colHeaderY}" fill="#8e7fa5" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2">CHARACTER / ROLE</text>
    <text x="${COL_X.neutral + PORTRAIT_SIZE / 2}" y="${colHeaderY}" text-anchor="middle" fill="#2ecc71" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2">NEUTRAL</text>
    <text x="${COL_X.strained + PORTRAIT_SIZE / 2}" y="${colHeaderY}" text-anchor="middle" fill="#e67e22" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2">STRAINED</text>
    <text x="${COL_X.resolved + PORTRAIT_SIZE / 2}" y="${colHeaderY}" text-anchor="middle" fill="#9b59b6" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2">RESOLVED</text>
    <line x1="32" y1="${HEADER_HEIGHT}" x2="${SHEET_WIDTH - 32}" y2="${HEADER_HEIGHT}" stroke="#43285c" stroke-width="1.5"/>
  `;

  for (let i = 0; i < NUM_CHARACTERS; i++) {
    const charId = ALL_CHARACTER_IDS[i];
    const meta = CHARACTER_PORTRAIT_CATALOG[charId];
    const rowY = HEADER_HEIGHT + i * (ROW_HEIGHT + ROW_GAP);

    // Row card background
    svg += `
      <rect x="32" y="${rowY}" width="${SHEET_WIDTH - 64}" height="${ROW_HEIGHT}" rx="4" fill="#0b0716" stroke="#25163a" stroke-width="1.5"/>
      <rect x="32" y="${rowY}" width="6" height="${ROW_HEIGHT}" rx="2" fill="${meta.factionColor}"/>
    `;

    // Character metadata
    svg += `
      <text x="${COL_X.info + 16}" y="${rowY + 38}" fill="#ede0c4" font-family="'Courier New', monospace" font-size="20" font-weight="bold" letter-spacing="1">${escapeXml(meta.displayName)}</text>
      <text x="${COL_X.info + 16}" y="${rowY + 62}" fill="#c9a84c" font-family="monospace" font-size="13" font-weight="bold">${escapeXml(meta.title)}</text>
      
      <circle cx="${COL_X.info + 24}" cy="${rowY + 92}" r="7" fill="${meta.factionColor}" stroke="#ffffff" stroke-width="1"/>
      <text x="${COL_X.info + 38}" y="${rowY + 96}" fill="#a594bd" font-family="monospace" font-size="11">Faction: ${meta.factionColor}</text>

      <circle cx="${COL_X.info + 160}" cy="${rowY + 92}" r="7" fill="${meta.accentColor}" stroke="#ffffff" stroke-width="1"/>
      <text x="${COL_X.info + 174}" y="${rowY + 96}" fill="#a594bd" font-family="monospace" font-size="11">Accent: ${meta.accentColor}</text>

      <text x="${COL_X.info + 16}" y="${rowY + 124}" fill="#726288" font-family="monospace" font-size="11">Feature: ${meta.featureType} | Eyes: ${meta.eyeColor}</text>
      <text x="${COL_X.info + 16}" y="${rowY + 142}" fill="#544766" font-family="monospace" font-size="10">ID: ${charId}</text>
    `;

    // Render 3 expressions
    for (const expr of ALL_EXPRESSIONS) {
      const colX = COL_X[expr as 'neutral' | 'strained' | 'resolved'];
      const portraitBuf = await renderPortraitBuffer(charId, expr, PORTRAIT_SIZE);

      // Portrait frame outline
      svg += `
        <rect x="${colX - 4}" y="${rowY + 12}" width="${PORTRAIT_SIZE + 8}" height="${PORTRAIT_SIZE + 8}" rx="2" fill="#04020a" stroke="${meta.factionColor}" stroke-width="1.5" stroke-opacity="0.8"/>
      `;

      composites.push({
        input: portraitBuf,
        left: colX,
        top: rowY + 16,
      });
    }
  }

  // Footer bar
  const footerY = SHEET_HEIGHT - 40;
  svg += `
    <line x1="32" y1="${footerY - 16}" x2="${SHEET_WIDTH - 32}" y2="${footerY - 16}" stroke="#43285c" stroke-width="1.5"/>
    <text x="${SHEET_WIDTH / 2}" y="${footerY + 10}" text-anchor="middle" fill="#8e7fa5" font-family="monospace" font-size="12">
      Scars of the Last Kingdom • 39 Expression Portraits • Pixel-Art Aesthetic Contact Sheet • feat/pixel-overhaul
    </text>
  `;

  svg += `</svg>`;

  console.log(`   Compositing ${composites.length} portrait overlays onto ${SHEET_WIDTH}×${SHEET_HEIGHT} canvas...`);
  await sharp(Buffer.from(svg))
    .composite(composites)
    .png({ compressionLevel: 8 })
    .toFile(OUT_FILE);

  console.log(`✅ PORTRAIT CONTACT SHEET GENERATED: ${OUT_FILE}`);
  return OUT_FILE;
}

if (process.argv[1] && process.argv[1].endsWith('buildPortraitContactSheet.ts')) {
  buildPortraitContactSheet().catch((err) => {
    console.error('❌ Failed to generate portrait contact sheet:', err);
    process.exit(1);
  });
}
