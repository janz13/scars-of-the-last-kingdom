/**
 * Balance Patch Script — Dark Realm Saga
 * Run with: pnpm exec tsx scripts/src/balancePatch.mts
 */

import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

const storyDir = resolve(import.meta.dirname, '../../artifacts/mobile/data/story');
const chapterFiles = [
  'chapter1.ts', 'chapter2.ts', 'chapter3.ts', 'chapter4.ts',
  'chapter5.ts', 'chapter6.ts', 'chapter7.ts', 'chapter8.ts',
  'chapter9.ts', 'chapter10.ts', 'chapter11.ts', 'chapter12.ts',
  'finalChapter1.ts', 'finalChapter2.ts',
];

// PATCH 1: Dice check difficulty reduction
console.log('Patching dice check difficulties...');
let dicePatches = 0;
for (const file of chapterFiles) {
  const filePath = resolve(storyDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let patched = false;
  content = content.replace(/difficulty:\s*(\d+)/g, (match, diff) => {
    const d = parseInt(diff);
    let newDiff = d;
    if (d >= 15) newDiff = d - 2;
    else if (d >= 13) newDiff = d - 1;
    if (newDiff !== d) { dicePatches++; patched = true; return `difficulty: ${newDiff}`; }
    return match;
  });
  if (patched) writeFileSync(filePath, content, 'utf-8');
}
console.log(`  Patched ${dicePatches} dice check difficulties`);

// PATCH 2: Health loss reduction
console.log('Patching extreme health losses...');
let healthPatches = 0;
for (const file of chapterFiles) {
  const filePath = resolve(storyDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let patched = false;
  content = content.replace(/health:\s*-(\d+)/g, (match, val) => {
    const v = parseInt(val);
    let newVal = v;
    if (v >= 50) newVal = 30;
    else if (v >= 30) newVal = 20;
    else if (v >= 20) newVal = 15;
    if (newVal !== v) { healthPatches++; patched = true; return `health: -${newVal}`; }
    return match;
  });
  if (patched) writeFileSync(filePath, content, 'utf-8');
}
console.log(`  Patched ${healthPatches} extreme health losses`);

// PATCH 3: Faction reputation cap
console.log('Patching extreme faction reputation swings...');
let factionPatches = 0;
for (const file of chapterFiles) {
  const filePath = resolve(storyDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let patched = false;
  const factionKeys = ['ironSaints', 'glassCourt', 'hollowChildren', 'redChoir', 'lastArchive'];
  for (const fac of factionKeys) {
    const regex = new RegExp(`${fac}:\\s*(-?)(\\d+)`, 'g');
    content = content.replace(regex, (match, sign, val) => {
      const v = parseInt(val);
      const signed = sign === '-' ? -v : v;
      if (Math.abs(signed) > 20) {
        const capped = Math.sign(signed) * 20;
        factionPatches++; patched = true;
        return `${fac}: ${capped}`;
      }
      return match;
    });
  }
  if (patched) writeFileSync(filePath, content, 'utf-8');
}
console.log(`  Patched ${factionPatches} extreme faction reputation values`);

// PATCH 4: Intelligence gain reduction
console.log('Patching intelligence inflation...');
let intPatches = 0;
for (const file of chapterFiles) {
  const filePath = resolve(storyDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let patched = false;
  content = content.replace(/intelligence:\s*3/g, () => {
    intPatches++; patched = true; return 'intelligence: 2';
  });
  if (patched) writeFileSync(filePath, content, 'utf-8');
}
console.log(`  Patched ${intPatches} intelligence gain values`);

// PATCH 5: Companion trust loss cap
console.log('Patching companion trust losses...');
let trustPatches = 0;
for (const file of chapterFiles) {
  const filePath = resolve(storyDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let patched = false;
  for (const trust of ['miraTrust', 'cainTrust']) {
    const regex = new RegExp(`${trust}:\\s*-(\\d+)`, 'g');
    content = content.replace(regex, (match, val) => {
      const v = parseInt(val);
      if (v > 5) { trustPatches++; patched = true; return `${trust}: -5`; }
      return match;
    });
  }
  if (patched) writeFileSync(filePath, content, 'utf-8');
}
console.log(`  Patched ${trustPatches} companion trust losses`);

// PATCH 6: Chapter 8 morale extremes
console.log('Patching Chapter 8 morale extremes...');
const ch8Path = resolve(storyDir, 'chapter8.ts');
let ch8Content = readFileSync(ch8Path, 'utf-8');
let ch8Patches = 0;
ch8Content = ch8Content.replace(/morale:\s*-(\d+)/g, (match, val) => {
  const v = parseInt(val);
  if (v > 20) { ch8Patches++; return 'morale: -20'; }
  if (v > 15) { ch8Patches++; return 'morale: -15'; }
  return match;
});
writeFileSync(ch8Path, ch8Content, 'utf-8');
console.log(`  Patched ${ch8Patches} Chapter 8 morale losses`);

// PATCH 7: Stat modifier table
console.log('Patching stat modifier table...');
const diceEnginePath = resolve(import.meta.dirname, '../../artifacts/mobile/logic/diceEngine.ts');
let diceContent = readFileSync(diceEnginePath, 'utf-8');
diceContent = diceContent.replace(
  /export function getStatModifier\(statValue: number\): number \{[\s\S]*?return 4;\s*\}/,
  `export function getStatModifier(statValue: number): number {
  if (statValue <= 3) return -3;
  if (statValue <= 5) return -2;
  if (statValue <= 7) return -1;
  if (statValue <= 9) return 0;
  if (statValue <= 12) return 1;
  if (statValue <= 16) return 2;
  if (statValue <= 22) return 3;
  return 4;
}`
);
writeFileSync(diceEnginePath, diceContent, 'utf-8');
console.log('  Updated stat modifier table');

// PATCH 8: Starting stat minimums
console.log('Patching starting stat minimums...');
const charOptPath = resolve(import.meta.dirname, '../../artifacts/mobile/data/characterOptions.ts');
let charContent = readFileSync(charOptPath, 'utf-8');
charContent = charContent.replace(
  'statBase: { maxHealth: 70, health: 70, strength: 3,',
  'statBase: { maxHealth: 70, health: 70, strength: 4,'
);
charContent = charContent.replace(
  'statBase: { maxHealth: 100, health: 100, strength: 8, agility: 5, intelligence: 4,',
  'statBase: { maxHealth: 100, health: 100, strength: 8, agility: 5, intelligence: 5,'
);
charContent = charContent.replace(
  'statBase: { maxHealth: 85, health: 85, strength: 5, agility: 8, intelligence: 4,',
  'statBase: { maxHealth: 85, health: 85, strength: 5, agility: 8, intelligence: 5,'
);
writeFileSync(charOptPath, charContent, 'utf-8');
console.log('  Boosted minimum starting stats for underpowered classes');

console.log('\nBalance patch complete.');
