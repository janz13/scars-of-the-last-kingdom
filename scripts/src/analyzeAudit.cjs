const r = require('../../audit-result.json');
const u = r.warnings.filter(w => w.category === 'story-unreachable');
const prefixes = {};
u.forEach(w => { const p = w.location.split('_')[0]; prefixes[p] = (prefixes[p] || 0) + 1; });
console.log('Unreachable by prefix:', JSON.stringify(prefixes, null, 2));
console.log('Sample unreachable:', u.slice(0, 15).map(w => w.location));

const s = r.warnings.filter(w => w.category === 'story-unset-flag');
console.log('\nUnset flags:', s.map(w => w.location + ': ' + w.message));

const m = r.warnings.filter(w => w.category === 'story-missing-image');
const imgSet = new Set(m.map(w => { const match = w.message.match(/"([^"]+)"/); return match ? match[1] : null; }).filter(Boolean));
console.log('\nMissing image keys (unique):', [...imgSet].sort());
console.log('Total missing image keys:', imgSet.size);

const c = r.warnings.filter(w => w.category === 'companion-route');
console.log('\nCompanion route issues:', c.map(w => w.location + ': ' + w.message));

const mc = r.warnings.filter(w => w.category === 'story-missing-chapter');
console.log('\nMissing chapters:', mc.map(w => w.message));

// Check which chapters prologue nodes belong to
const { STORY_NODES } = require('../../artifacts/mobile/data/story/index.ts');
const prologueNodes = STORY_NODES.filter(n => n.chapter.toLowerCase().includes('prologue') || n.id.startsWith('prologue_') || n.id.startsWith('ch0_'));
console.log('\nPrologue-like nodes:', prologueNodes.map(n => n.id + ' (chapter: ' + n.chapter + ')'));
