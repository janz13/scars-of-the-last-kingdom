const { STORY_NODES } = require('../../artifacts/mobile/data/story/index.ts');
const nm = new Map(STORY_NODES.map(n => [n.id, n]));

// Find who links to each chapter start
const chapterStarts = [
  'chapter3_start', 'chapter4_start', 'chapter5_start',
  'chapter6_start', 'chapter7_start', 'chapter8_start',
  'chapter9_start', 'chapter10_start', 'chapter11_start',
  'chapter12_start', 'final_chapter1_start', 'final_chapter2_start',
];

for (const start of chapterStarts) {
  const parents = STORY_NODES.filter(n => n.choices.some(c => c.nextNode === start));
  if (parents.length === 0) {
    const node = nm.get(start);
    console.log(`  ${start} — NOT LINKED from any node (chapter: ${node?.chapter ?? '?'})`);
  } else {
    console.log(`  ${start} — linked from: ${parents.map(n => n.id + '(' + n.chapter + ')').join(', ')}`);
  }
}

// Check Ch2 endings
const ch2end = STORY_NODES.filter(n => n.chapter === 'Chapter 2' && n.isEnding);
console.log('\nCh2 ending nodes:', ch2end.map(n => n.id));

// Check Interlude and Vision chapters
const interlude = STORY_NODES.filter(n => n.chapter === 'Interlude');
console.log('\nInterlude nodes:', interlude.map(n => n.id));
const vision = STORY_NODES.filter(n => n.chapter === 'Vision');
console.log('Vision nodes:', vision.map(n => n.id));
