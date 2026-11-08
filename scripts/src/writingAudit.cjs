const fs = require('fs');
const path = require('path');

const STORY_DIR = path.join(__dirname, '../../artifacts/mobile/data/story');
const files = fs.readdirSync(STORY_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');

// Collect all text
const allNodes = [];
const allChoiceTexts = [];
const allDialogue = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(STORY_DIR, file), 'utf-8');
  const chapterMatch = content.match(/chapter:\s*'([^']+)'/g);
  
  // Extract text fields
  const textRegex = /text:\s*`([^`]+)`|text:\s*'([^']+)'/g;
  let m;
  while ((m = textRegex.exec(content)) !== null) {
    const txt = (m[1] || m[2]).trim();
    if (txt.length > 10) {
      allNodes.push({ file, text: txt });
    }
  }
  
  // Extract dialogue fields
  const dlgRegex = /dialogue:\s*'([^']+)'/g;
  while ((m = dlgRegex.exec(content)) !== null) {
    allDialogue.push({ file, text: m[1] });
  }
  
  // Extract choice text
  const choiceRegex = /text:\s*'([^']+)'/g;
  // We need to be more careful - only choice text, not title/location
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("text: '") && (lines[i-1]?.includes('id:') || lines[i-2]?.includes('id:'))) {
      const cm = line.match(/text:\s*'([^']+)'/);
      if (cm) allChoiceTexts.push({ file, text: cm[1], line: i+1 });
    }
  }
}

// 1. Find repeated phrases (3+ words appearing 5+ times)
console.log('═══ REPEATED PHRASES (3+ words, 5+ occurrences) ═══\n');
const phraseCounts = {};
for (const node of allNodes) {
  const words = node.text.toLowerCase().split(/\s+/);
  for (let len = 3; len <= 6; len++) {
    for (let i = 0; i <= words.length - len; i++) {
      const phrase = words.slice(i, i + len).join(' ');
      if (phrase.length > 15 && !phrase.match(/^[\s,.:;!?()-]+$/)) {
        phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 1;
      }
    }
  }
}
const repeated = Object.entries(phraseCounts)
  .filter(([, c]) => c >= 5)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 40);
for (const [phrase, count] of repeated) {
  console.log(`  [${count}x] "${phrase}"`);
}

// 2. Find weak choice text (very short, vague, or generic)
console.log('\n═══ WEAK CHOICE TEXT (vague or very short) ═══\n');
const weakPatterns = [
  /^(Yes|No|OK|Okay|Fine|Sure|Maybe|Continue|Proceed|Go|Leave|Stay|Wait|Accept|Refuse|Agree|Disagree)\.?$/i,
  /^(Do it|Don't|Try|Don't try|Go ahead|Stop|Look|Listen|Talk|Run|Fight|Hide)$/i,
  /^.{1,15}$/ // Very short choices
];
const weakChoices = allChoiceTexts.filter(c => 
  weakPatterns.some(p => p.test(c.text.trim())) &&
  !c.text.includes('"') // Quoted dialogue is fine
);
for (const c of weakChoices) {
  console.log(`  [${c.file}] "${c.text}" (line ${c.line})`);
}

// 3. Find "the specific" overuse
console.log('\n═══ "THE SPECIFIC" OVERUSE ═══\n');
let specificCount = 0;
for (const node of allNodes) {
  const matches = node.text.match(/the specific/gi);
  if (matches) specificCount += matches.length;
}
console.log(`  Total "the specific" occurrences: ${specificCount}`);

// 4. Find "the kind of" overuse
console.log('\n═══ "THE KIND OF" OVERUSE ═══\n');
let kindCount = 0;
for (const node of allNodes) {
  const matches = node.text.match(/the kind of/gi);
  if (matches) kindCount += matches.length;
}
console.log(`  Total "the kind of" occurrences: ${kindCount}`);

// 5. Find potential spelling issues
console.log('\n═══ POTENTIAL SPELLING/GRAMMAR ISSUES ═══\n');
const spellingIssues = [];
for (const node of allNodes) {
  // Double spaces
  if (node.text.match(/  /)) spellingIssues.push({ file: node.file, issue: 'double space', text: node.text.substring(0, 80) });
  // "its" vs "it's" confusion
  const itsMatches = node.text.match(/it's\s+\w+/gi);
  // Missing period at end of dialogue
  // "alright" vs "all right"
  if (node.text.match(/\balright\b/i)) spellingIssues.push({ file: node.file, issue: '"alright" (should be "all right" in formal writing)', text: '' });
  // "onto" vs "on to" 
  // Common typos
  if (node.text.match(/\bteh\b/)) spellingIssues.push({ file: node.file, issue: '"teh" typo', text: '' });
  if (node.text.match(/\bwich\b/)) spellingIssues.push({ file: node.file, issue: '"wich" typo', text: '' });
  if (node.text.match(/\brecieve\b/)) spellingIssues.push({ file: node.file, issue: '"recieve" typo', text: '' });
  if (node.text.match(/\boccured\b/)) spellingIssues.push({ file: node.file, issue: '"occured" typo', text: '' });
  if (node.text.match(/\bseperate\b/)) spellingIssues.push({ file: node.file, issue: '"seperate" typo', text: '' });
}
for (const issue of spellingIssues.slice(0, 20)) {
  console.log(`  [${issue.file}] ${issue.issue}: ${issue.text.substring(0, 60)}...`);
}

// 6. Find very short scenes (nodes with <100 chars of text that aren't endings)
console.log('\n══️ VERY SHORT SCENES (<100 chars, non-ending) ═══\n');
const shortScenes = allNodes.filter(n => n.text.length < 100 && n.text.length > 10);
for (const s of shortScenes.slice(0, 20)) {
  console.log(`  [${s.file}] (${s.text.length} chars): "${s.text.substring(0, 80)}"`);
}

// 7. Check chapter transitions
console.log('\n═══ CHAPTER TRANSITIONS ═══\n');
const chapterStarts = {};
for (const file of files) {
  const content = fs.readFileSync(path.join(STORY_DIR, file), 'utf-8');
  const startMatches = [...content.matchAll(/id:\s*'(chapter\d+_start|c\d+_start|interlude_start|vision_start|fc\d+_start)'/g)];
  for (const m of startMatches) {
    chapterStarts[m[1]] = file;
  }
}
console.log('  Chapter start nodes found:');
const sortedStarts = Object.entries(chapterStarts).sort((a, b) => {
  const numA = parseInt(a[0].match(/\d+/)?.[0] || '99');
  const numB = parseInt(b[0].match(/\d+/)?.[0] || '99');
  return numA - numB;
});
for (const [id, file] of sortedStarts) {
  console.log(`  ${id} → ${file}`);
}

// 8. Find choices with unclear consequences (no effects and no hint in text)
console.log('\n═══ CHOICES WITH NO EFFECTS (potentially unclear consequences) ═══\n');
const noEffectChoices = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(STORY_DIR, file), 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/\s+id:\s*'/) && i+1 < lines.length && lines[i+1].match(/\s+text:\s*'/)) {
      // Check if this choice block has effects
      let hasEffects = false;
      let j = i + 2;
      let depth = 0;
      while (j < lines.length && j < i + 10) {
        if (lines[j].includes('effects:') || lines[j].includes('setFlags:')) hasEffects = true;
        if (lines[j].includes('nextNode:') || lines[j].includes('},')) break;
        j++;
      }
      if (!hasEffects) {
        const choiceId = lines[i].match(/id:\s*'([^']+)'/)?.[1];
        const choiceText = lines[i+1].match(/text:\s*'([^']+)'/)?.[1];
        if (choiceId && choiceText && choiceText.length > 20) {
          noEffectChoices.push({ file, id: choiceId, text: choiceText });
        }
      }
    }
  }
}
console.log(`  Found ${noEffectChoices.length} choices with no effects`);
for (const c of noEffectChoices.slice(0, 30)) {
  console.log(`  [${c.file}] ${c.id}: "${c.text.substring(0, 60)}"`);
}

console.log('\n═══ AUDIT COMPLETE ═══');
