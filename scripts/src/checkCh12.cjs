const { STORY_NODES } = require('../../artifacts/mobile/data/story/index.ts');
const nm = new Map(STORY_NODES.map(n => [n.id, n]));

// Check Ch12 nodes that are NOT endings
const ch12NonEnd = STORY_NODES.filter(n => n.chapter === 'Chapter 12' && !n.isEnding);
console.log('Ch12 non-ending nodes:', ch12NonEnd.length);

// Find Ch12 nodes that link to final_chapter1_start
const fc1Parents = STORY_NODES.filter(n => n.choices.some(c => c.nextNode === 'final_chapter1_start'));
console.log('Nodes linking to final_chapter1_start:', fc1Parents.map(n => n.id + '(' + n.chapter + ')'));

// Check if any Ch12 node has a choice pointing outside Ch12
const ch12Exits = [];
STORY_NODES.filter(n => n.chapter === 'Chapter 12').forEach(n => {
  n.choices.forEach(c => {
    const t = nm.get(c.nextNode);
    if (t && t.chapter !== 'Chapter 12') {
      ch12Exits.push({ from: n.id, to: c.nextNode, ch: t.chapter });
    }
  });
});
console.log('Ch12 exits to other chapters:', JSON.stringify(ch12Exits.slice(0, 20)));

// Check the c12_unity_covenant node
const unity = nm.get('c12_unity_covenant');
if (unity) {
  console.log('\nc12_unity_covenant:', JSON.stringify({choices: unity.choices.map(c => c.nextNode), isEnding: unity.isEnding}));
}

// Check c12_crown_ash_neutral_end
const neutral = nm.get('c12_crown_ash_neutral_end');
if (neutral) {
  console.log('\nc12_crown_ash_neutral_end:', JSON.stringify({isEnding: neutral.isEnding, choices: neutral.choices.map(c => c.nextNode)}));
}
