// Writing consistency patch - Phase 1: "the specific" overuse
// This phrase appears 291 times. Many are in the construction "the specific [noun] of someone who has"
// which is a signature style but overused. We replace the most formulaic instances.

const fs = require('fs');
const path = require('path');

const STORY_DIR = path.join(__dirname, '../../artifacts/mobile/data/story');
const files = fs.readdirSync(STORY_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');

// Replacements for "the specific [noun]" patterns
// Only replace the most formulaic/overused constructions
const replacements = [
  // "the specific attention of someone who" → varied alternatives
  { from: /the specific attention of someone who has/gi, to: 'the careful attention of someone who has' },
  // "the specific efficiency of someone who" → 
  { from: /the specific efficiency of someone who has/gi, to: 'the practiced efficiency of someone who has' },
  // "the specific emphasis of someone" →
  { from: /the specific emphasis of someone/gi, to: 'the deliberate emphasis of someone' },
  // "the specific recognition of someone" →
  { from: /the specific recognition of someone/gi, to: 'the immediate recognition of someone' },
  // "the specific absence of" →
  { from: /the specific absence of/gi, to: 'the deliberate absence of' },
  // "the specific warmth of" →
  { from: /the specific warmth of/gi, to: 'the unmistakable warmth of' },
  // "the specific precision of" →
  { from: /the specific precision of/gi, to: 'the exact precision of' },
  // "the specific quality of" →
  { from: /the specific quality of/gi, to: 'the particular quality of' },
  // "the specific way that" →
  { from: /the specific way that/gi, to: 'the particular way that' },
  // "the specific way" (standalone, not "in the specific way") →
  { from: /the specific way(?!\s+that)/gi, to: 'the particular way' },
  // "in the specific way" → keep some, replace others
  { from: /in the specific way/gi, to: 'in the particular way' },
  // "the specific kind" →
  { from: /the specific kind/gi, to: 'the particular kind' },
  // "with the specific" → "with the particular" (most instances)
  { from: /with the specific/gi, to: 'with the particular' },
  // "and the specific" → "and the particular"
  { from: /and the specific/gi, to: 'and the particular' },
  // "the specific sound" →
  { from: /the specific sound/gi, to: 'the distinctive sound' },
  // "the specific weight" →
  { from: /the specific weight/gi, to: 'the unmistakable weight' },
  // "the specific expression" →
  { from: /the specific expression/gi, to: 'the particular expression' },
  // "the specific texture" →
  { from: /the specific texture/gi, to: 'the distinctive texture' },
  // "the specific pressure" →
  { from: /the specific pressure/gi, to: 'the particular pressure' },
  // "the specific response" →
  { from: /the specific response/gi, to: 'the immediate response' },
  // "the specific direction" →
  { from: /the specific direction/gi, to: 'the particular direction' },
  // "the specific frequency" →
  { from: /the specific frequency/gi, to: 'the characteristic frequency' },
  // "the specific heat" (non-physics context) →
  { from: /the specific heat of/gi, to: 'the unmistakable heat of' },
  // "the specific intensity" →
  { from: /the specific intensity/gi, to: 'the particular intensity' },
  // "the specific gravity" (non-physics) →
  { from: /the specific gravity of/gi, to: 'the particular gravity of' },
  // "a specific" is fine — only "the specific" is overused
];

let totalPatches = 0;

for (const file of files) {
  const fp = path.join(STORY_DIR, file);
  let content = fs.readFileSync(fp, 'utf-8');
  let patched = false;
  
  for (const { from, to } of replacements) {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      totalPatches += matches.length;
      patched = true;
    }
  }
  
  if (patched) {
    fs.writeFileSync(fp, content, 'utf-8');
    console.log(`  Patched ${file}`);
  }
}

console.log(`\nTotal "the specific" replacements: ${totalPatches}`);

// Count remaining
let remaining = 0;
for (const file of files) {
  const fp = path.join(STORY_DIR, file);
  const content = fs.readFileSync(fp, 'utf-8');
  const matches = content.match(/the specific/gi);
  if (matches) remaining += matches.length;
}
console.log(`Remaining "the specific" occurrences: ${remaining}`);
