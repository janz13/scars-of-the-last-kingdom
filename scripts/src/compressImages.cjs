const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = [
  path.resolve(__dirname, '../../artifacts/mobile/assets/images'),
  path.resolve(__dirname, '../../artifacts/mobile/images'),
  path.resolve(__dirname, '../../artifacts/mobile/public'),
];

async function compressDir(dir) {
  if (!fs.existsSync(dir)) return { before: 0, after: 0, count: 0 };
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const beforeSize = fs.statSync(fullPath).size;
    totalBefore += beforeSize;

    try {
      const buffer = await sharp(fullPath)
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toBuffer();

      if (buffer.length < beforeSize) {
        fs.writeFileSync(fullPath, buffer);
        totalAfter += buffer.length;
        count++;
        console.log(`[Compressed] ${file}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB (-${((1 - buffer.length / beforeSize) * 100).toFixed(1)}%)`);
      } else {
        totalAfter += beforeSize;
      }
    } catch (err) {
      console.warn(`[Skip] ${file}: ${err.message}`);
      totalAfter += beforeSize;
    }
  }

  return { before: totalBefore, after: totalAfter, count };
}

async function main() {
  console.log('🖼️ Starting image compression...');
  let totalBefore = 0;
  let totalAfter = 0;
  let totalCount = 0;

  for (const dir of dirs) {
    console.log(`\nScanning: ${dir}`);
    const res = await compressDir(dir);
    totalBefore += res.before;
    totalAfter += res.after;
    totalCount += res.count;
  }

  console.log('\n=========================================');
  console.log(`Total files compressed: ${totalCount}`);
  console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
  console.log('=========================================');
}

main().catch(console.error);
