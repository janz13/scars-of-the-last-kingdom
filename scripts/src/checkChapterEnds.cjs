const { STORY_NODES } = require('../../artifacts/mobile/data/story/index.ts');
const nm = new Map(STORY_NODES.map(n => [n.id, n]));

// Find chapter end nodes
for (const ch of ['Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7']) {
  const endNodes = STORY_NODES.filter(n => n.chapter === ch && (n.id.includes('chapter_end') || n.id.includes('chapter') && n.id.includes('end') || n.id.endsWith('_end')));
  if (endNodes.length > 0) {
    console.log(`\n${ch} end nodes:`);
    for (const n of endNodes) {
      console.log(`  ${n.id} -> choices: ${n.choices.map(c => c.nextNode).join(', ')} (isEnding: ${n.isEnding})`);
    }
  }
  
  // Also check for nodes with flags like chapter2_complete
  const completeFlagNodes = STORY_NODES.filter(n => n.chapter === ch && 
    n.effectsOnEnter?.setFlags?.some(f => f.includes('complete') || f.includes(ch.toLowerCase().replace(' ', '_') + '_complete')));
  if (completeFlagNodes.length > 0) {
    console.log(`\n${ch} nodes that set completion flags:`);
    for (const n of completeFlagNodes) {
      const flags = n.effectsOnEnter?.setFlags?.filter(f => f.includes('complete')) || [];
      console.log(`  ${n.id} sets: ${flags.join(', ')} -> next: ${n.choices.map(c => c.nextNode).join(', ')}`);
    }
  }
}
