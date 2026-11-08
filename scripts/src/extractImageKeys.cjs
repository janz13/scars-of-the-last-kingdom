// Extract actual image keys from images.ts by parsing the source
const fs = require('fs');
const src = fs.readFileSync(require('path').resolve(__dirname, '../../artifacts/mobile/constants/images.ts'), 'utf-8');
const keys = new Set();
const regex = /^\s+(\w+):\s*require/gm;
let match;
while ((match = regex.exec(src)) !== null) {
  keys.add(match[1]);
}
console.log(JSON.stringify([...keys].sort(), null, 2));
console.log('Total keys:', keys.size);
