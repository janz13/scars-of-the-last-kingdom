const { STORY_NODES } = require('../../artifacts/mobile/data/story/index.ts');

const STAT_KEYS = ['health','maxHealth','hunger','thirst','morale','trust','strength','intelligence','agility','charisma','luck','corruption'];
const INV_KEYS = ['food','water','medicine','scrap','ammo','relics','reputation'];
const FACTION_KEYS = ['ironSaints','glassCourt','hollowChildren','redChoir','lastArchive'];

// Collect all effects
const allEffects = [];
const allDiceChecks = [];

for (const node of STORY_NODES) {
  const ch = node.chapter;
  
  // effectsOnEnter
  if (node.effectsOnEnter) {
    for (const [key, val] of Object.entries(node.effectsOnEnter)) {
      if (key === 'setFlags' || key === 'removeFlags') continue;
      allEffects.push({ chapter: ch, nodeId: node.id, source: 'enter', key, val });
    }
  }
  
  // choice effects
  for (const choice of node.choices) {
    if (choice.effects) {
      for (const [key, val] of Object.entries(choice.effects)) {
        if (key === 'setFlags' || key === 'removeFlags') continue;
        allEffects.push({ chapter: ch, nodeId: node.id, source: `choice:${choice.id}`, key, val });
      }
    }
    if (choice.diceCheck) {
      const dc = choice.diceCheck;
      allDiceChecks.push({ chapter: ch, nodeId: node.id, choiceId: choice.id, stat: dc.stat, difficulty: dc.difficulty, diceType: dc.diceType });
      // dice outcome effects
      for (const outcome of ['successEffects','failureEffects','criticalSuccessEffects','criticalFailureEffects']) {
        if (dc[outcome]) {
          for (const [key, val] of Object.entries(dc[outcome])) {
            if (key === 'setFlags' || key === 'removeFlags') continue;
            allEffects.push({ chapter: ch, nodeId: node.id, source: `dice:${choice.id}:${outcome}`, key, val });
          }
        }
      }
    }
  }
}

// ── STAT SUMMARY ──────────────────────────────────────────────────────────
console.log('═══ STAT EFFECT SUMMARY ═══');
for (const key of [...STAT_KEYS, ...INV_KEYS, 'miraTrust', 'cainTrust', ...FACTION_KEYS]) {
  const entries = allEffects.filter(e => e.key === key);
  if (entries.length === 0) continue;
  
  const positives = entries.filter(e => e.val > 0);
  const negatives = entries.filter(e => e.val < 0);
  
  const posSum = positives.reduce((s, e) => s + e.val, 0);
  const negSum = negatives.reduce((s, e) => s + e.val, 0);
  const posAvg = positives.length > 0 ? (posSum / positives.length).toFixed(1) : '0';
  const negAvg = negatives.length > 0 ? (negSum / negatives.length).toFixed(1) : '0';
  const posMax = positives.length > 0 ? Math.max(...positives.map(e => e.val)) : 0;
  const negMin = negatives.length > 0 ? Math.min(...negatives.map(e => e.val)) : 0;
  
  console.log(`\n${key}:`);
  console.log(`  +: count=${positives.length}, total=+${posSum}, avg=+${posAvg}, max=+${posMax}`);
  console.log(`  -: count=${negatives.length}, total=${negSum}, avg=${negAvg}, min=${negMin}`);
  
  // Show extreme values
  const extreme = entries.filter(e => Math.abs(e.val) >= 15);
  if (extreme.length > 0) {
    console.log(`  EXTREME (|val|>=15): ${extreme.map(e => `${e.nodeId}/${e.source}=${e.val}`).join(', ')}`);
  }
}

// ── DICE CHECK SUMMARY ──────────────────────────────────────────────────────
console.log('\n\n═══ DICE CHECK SUMMARY ═══');
const byStat = {};
for (const dc of allDiceChecks) {
  if (!byStat[dc.stat]) byStat[dc.stat] = [];
  byStat[dc.stat].push(dc);
}
for (const [stat, checks] of Object.entries(byStat)) {
  const diffs = checks.map(c => c.difficulty);
  const dTypes = checks.map(c => c.diceType);
  console.log(`\n${stat} (${checks.length} checks):`);
  console.log(`  Difficulty: min=${Math.min(...diffs)}, max=${Math.max(...diffs)}, avg=${(diffs.reduce((a,b)=>a+b,0)/diffs.length).toFixed(1)}`);
  console.log(`  Dice types: ${[...new Set(dTypes)].join(', ')}`);
  
  // Show difficulty distribution
  const buckets = {};
  for (const d of diffs) {
    const bucket = d <= 8 ? 'easy(1-8)' : d <= 12 ? 'medium(9-12)' : d <= 16 ? 'hard(13-16)' : 'extreme(17+)';
    buckets[bucket] = (buckets[bucket] || 0) + 1;
  }
  console.log(`  Distribution: ${Object.entries(buckets).map(([k,v]) => `${k}=${v}`).join(', ')}`);
  
  // Show extreme checks
  const extreme = checks.filter(c => c.difficulty >= 16);
  if (extreme.length > 0) {
    console.log(`  EXTREME (diff>=16): ${extreme.map(c => `${c.nodeId}/${c.choiceId} diff=${c.difficulty} ${c.diceType}`).join(', ')}`);
  }
}

// ── COMPANION TRUST SUMMARY ─────────────────────────────────────────────────
console.log('\n\n═══ COMPANION TRUST ═══');
for (const comp of ['miraTrust', 'cainTrust']) {
  const entries = allEffects.filter(e => e.key === comp);
  const positives = entries.filter(e => e.val > 0);
  const negatives = entries.filter(e => e.val < 0);
  const posSum = positives.reduce((s, e) => s + e.val, 0);
  const negSum = negatives.reduce((s, e) => s + e.val, 0);
  console.log(`\n${comp}: +total=${posSum} (${positives.length} events), -total=${negSum} (${negatives.length} events)`);
  
  // Show large trust shifts
  const large = entries.filter(e => Math.abs(e.val) >= 3);
  if (large.length > 0) {
    console.log(`  LARGE (|val|>=3): ${large.map(e => `${e.nodeId}/${e.source}=${e.val}`).join(', ')}`);
  }
}

// ── FACTION REP SUMMARY ─────────────────────────────────────────────────────
console.log('\n\n═══ FACTION REPUTATION ═══');
for (const fac of FACTION_KEYS) {
  const entries = allEffects.filter(e => e.key === fac);
  const positives = entries.filter(e => e.val > 0);
  const negatives = entries.filter(e => e.val < 0);
  const posSum = positives.reduce((s, e) => s + e.val, 0);
  const negSum = negatives.reduce((s, e) => s + e.val, 0);
  console.log(`\n${fac}: +total=${posSum} (${positives.length} events), -total=${negSum} (${negatives.length} events), net=${posSum+negSum}`);
  
  const large = entries.filter(e => Math.abs(e.val) >= 15);
  if (large.length > 0) {
    console.log(`  LARGE (|val|>=15): ${large.map(e => `${e.nodeId}/${e.source}=${e.val}`).join(', ')}`);
  }
}

// ── SURVIVAL STAT DRAIN PER CHAPTER ─────────────────────────────────────────
console.log('\n\n═══ SURVIVAL DRAIN PER CHAPTER ═══');
const chapters = ['Chapter 1','Chapter 2','Chapter 3','Chapter 4','Chapter 5','Chapter 6','Chapter 7','Chapter 8','Chapter 9','Chapter 10','Chapter 11','Chapter 12','Final Chapter 1','Final Chapter 2'];
for (const ch of chapters) {
  const chEffects = allEffects.filter(e => e.chapter === ch);
  const hungerDrain = chEffects.filter(e => e.key === 'hunger' && e.val < 0).reduce((s,e) => s + e.val, 0);
  const thirstDrain = chEffects.filter(e => e.key === 'thirst' && e.val < 0).reduce((s,e) => s + e.val, 0);
  const healthLoss = chEffects.filter(e => e.key === 'health' && e.val < 0).reduce((s,e) => s + e.val, 0);
  const moraleLoss = chEffects.filter(e => e.key === 'morale' && e.val < 0).reduce((s,e) => s + e.val, 0);
  const corruptionGain = chEffects.filter(e => e.key === 'corruption' && e.val > 0).reduce((s,e) => s + e.val, 0);
  
  // Also count gains
  const hungerGain = chEffects.filter(e => e.key === 'hunger' && e.val > 0).reduce((s,e) => s + e.val, 0);
  const thirstGain = chEffects.filter(e => e.key === 'thirst' && e.val > 0).reduce((s,e) => s + e.val, 0);
  const healthGain = chEffects.filter(e => e.key === 'health' && e.val > 0).reduce((s,e) => s + e.val, 0);
  const moraleGain = chEffects.filter(e => e.key === 'morale' && e.val > 0).reduce((s,e) => s + e.val, 0);
  const corruptionLoss = chEffects.filter(e => e.key === 'corruption' && e.val < 0).reduce((s,e) => s + e.val, 0);
  
  if (hungerDrain !== 0 || thirstDrain !== 0 || healthLoss !== 0 || moraleLoss !== 0 || corruptionGain !== 0) {
    console.log(`${ch}: hunger=${hungerGain > 0 ? '+' : ''}${hungerGain}/${hungerDrain}, thirst=${thirstGain > 0 ? '+' : ''}${thirstGain}/${thirstDrain}, health=${healthGain > 0 ? '+' : ''}${healthGain}/${healthLoss}, morale=${moraleGain > 0 ? '+' : ''}${moraleGain}/${moraleLoss}, corruption=+${corruptionGain}/${corruptionLoss}`);
  }
}

// ── REQUIREMENT THRESHOLDS ──────────────────────────────────────────────────
console.log('\n\n═══ STAT REQUIREMENT THRESHOLDS ═══');
const reqEntries = [];
for (const node of STORY_NODES) {
  for (const choice of node.choices) {
    if (choice.requirements) {
      for (const [key, val] of Object.entries(choice.requirements)) {
        if (key === 'flags' || key === 'blockedFlags' || key === 'classes' || key === 'backgrounds' || key === 'miraPresent' || key === 'cainPresent' || key === 'factionRep') continue;
        reqEntries.push({ chapter: node.chapter, nodeId: node.id, choiceId: choice.id, key, val, isHidden: choice.isHidden });
      }
    }
  }
}

for (const key of [...STAT_KEYS, 'miraTrust', 'cainTrust']) {
  const entries = reqEntries.filter(e => e.key === key);
  if (entries.length === 0) continue;
  const vals = entries.map(e => e.val);
  const hidden = entries.filter(e => e.isHidden).length;
  console.log(`\n${key}: count=${entries.length}, hidden=${hidden}, min=${Math.min(...vals)}, max=${Math.max(...vals)}`);
  
  // Show high requirements
  const high = entries.filter(e => e.val >= 8);
  if (high.length > 0) {
    console.log(`  HIGH (>=8): ${high.map(e => `${e.nodeId}/${e.choiceId}=${e.val}${e.isHidden ? '[hidden]' : ''}`).join(', ')}`);
  }
}
