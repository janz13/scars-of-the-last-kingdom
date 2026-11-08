// Writing consistency patch - Phase 2: "of someone who has" formula
// This construction appears ~104 times. It's a signature style element,
// so we keep ~40% and replace the rest with varied alternatives.

const fs = require('fs');
const path = require('path');

const STORY_DIR = path.join(__dirname, '../../artifacts/mobile/data/story');
const files = fs.readdirSync(STORY_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');

// We'll replace "the [adj] of someone who has" with varied constructions
// Keep the pattern when it's genuinely the best phrasing, replace when it's formulaic
const replacements = [
  // "expression of someone who has" → varied
  { from: /expression of someone who has been/gi, to: 'look of someone who has been' },
  { from: /expression of someone who has/gi, to: 'face of someone who has' },
  // "the attention of someone who has" →
  { from: /attention of someone who has been/gi, to: 'alertness of someone who has been' },
  // "the efficiency of someone who has" →
  { from: /efficiency of someone who has/gi, to: 'efficiency of someone who has' }, // keep - already good
  // "the precision of someone who has" →
  { from: /precision of someone who has been/gi, to: 'exactness of someone who has been' },
  // "the care of someone who has" →
  { from: /care of someone who has been/gi, to: 'caution of someone who has been' },
  // "the weight of someone who has" →
  { from: /weight of someone who has been/gi, to: 'bearing of someone who has been' },
  // "the voice of someone who has" →
  { from: /voice of someone who has been/gi, to: 'tone of someone who has been' },
  // "the silence of someone who has" →
  { from: /silence of someone who has been/gi, to: 'stillness of someone who has been' },
  // "the movement of someone who has" →
  { from: /movement of someone who has been/gi, to: 'motion of someone who has been' },
  // "the patience of someone who has" → keep (good phrasing)
  // "the calm of someone who has" →
  { from: /calm of someone who has been/gi, to: 'composure of someone who has been' },
  // "the discipline of someone who has" →
  { from: /discipline of someone who has been/gi, to: 'rigor of someone who has been' },
  // "the focus of someone who has" →
  { from: /focus of someone who has been/gi, to: 'concentration of someone who has been' },
  // "the recognition of someone who has" →
  { from: /recognition of someone who has been/gi, to: 'awareness of someone who has been' },
  // "the confidence of someone who has" →
  { from: /confidence of someone who has been/gi, to: 'certainty of someone who has been' },
];

let totalPatches = 0;

for (const file of files) {
  const fp = path.join(STORY_DIR, file);
  let content = fs.readFileSync(fp, 'utf-8');
  let patched = false;
  
  for (const { from, to } of replacements) {
    if (from.source === to.replace(/'/g, "\\'")) continue; // skip no-ops
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

console.log(`\nTotal "of someone who has" replacements: ${totalPatches}`);

// Count remaining
let remaining = 0;
for (const file of files) {
  const fp = path.join(STORY_DIR, file);
  const content = fs.readFileSync(fp, 'utf-8');
  const matches = content.match(/of someone who has/gi);
  if (matches) remaining += matches.length;
}
console.log(`Remaining "of someone who has" occurrences: ${remaining}`);
