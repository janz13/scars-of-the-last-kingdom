const { STORY_NODES } = require('../../artifacts/mobile/data/story/index.ts');
const nm = new Map(STORY_NODES.map(n => [n.id, n]));

// Check final chapter starts
for (const start of ['final_chapter1_start', 'final_chapter2_start']) {
  const parents = STORY_NODES.filter(n => n.choices.some(c => c.nextNode === start));
  if (parents.length === 0) {
    const node = nm.get(start);
    console.log(`${start} — NOT LINKED (chapter: ${node?.chapter ?? '?'})`);
  } else {
    console.log(`${start} — linked from: ${parents.map(n => n.id + '(' + n.chapter + ')').join(', ')}`);
  }
}

// Check what c8_chapter8_end links to
const ch8end = nm.get('c8_chapter8_end');
if (ch8end) {
  console.log('\nc8_chapter8_end choices:', ch8end.choices.map(c => c.nextNode));
  console.log('c8_chapter8_end isEnding:', ch8end.isEnding);
}

// Check what c9_chapter9_end links to  
const ch9end = nm.get('c9_chapter9_end');
if (ch9end) {
  console.log('\nc9_chapter9_end choices:', ch9end.choices.map(c => c.nextNode));
  console.log('c9_chapter9_end isEnding:', ch9end.isEnding);
}

// Check what c10_chapter10_end links to
const ch10end = nm.get('c10_chapter10_end');
if (ch10end) {
  console.log('\nc10_chapter10_end choices:', ch10end.choices.map(c => c.nextNode));
  console.log('c10_chapter10_end isEnding:', ch10end.isEnding);
}

// Check what c11_chapter11_end links to
const ch11end = nm.get('c11_chapter11_end');
if (ch11end) {
  console.log('\nc11_chapter11_end choices:', ch11end.choices.map(c => c.nextNode));
  console.log('c11_chapter11_end isEnding:', ch11end.isEnding);
}

// Check what c12_chapter12_end links to
const ch12end = nm.get('c12_chapter12_end');
if (ch12end) {
  console.log('\nc12_chapter12_end choices:', ch12end.choices.map(c => c.nextNode));
  console.log('c12_chapter12_end isEnding:', ch12end.isEnding);
}
