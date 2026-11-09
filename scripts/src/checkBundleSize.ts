/**
 * Bundle Size Monitoring Script — Scars of the Last Kingdom
 * Run with: pnpm check-bundle
 *
 * Inspects artifacts/mobile/dist/_expo/static/js/web/
 * Enforces strict entry bundle size budget (< 2.50 MB transfer budget, reduced from 5.06 MB)
 * Outputs a formatted breakdown table of entry and dynamic chunks.
 */

import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { gzipSync } from 'node:zlib';

// 2.5 MB budget threshold (in bytes: 2.5 * 1024 * 1024 = 2,621,440 B)
export const MAX_ENTRY_BYTES = 2.5 * 1024 * 1024;
export const MAX_ENTRY_MB_LABEL = '2.50 MB';
export const MAX_RAW_ENTRY_BYTES = 3.75 * 1024 * 1024;

export interface BundleFileInfo {
  name: string;
  type: 'Main Entry' | 'Dynamic Chunk' | 'Other Bundle';
  rawBytes: number;
  gzipBytes: number;
  rawFormatted: string;
  gzipFormatted: string;
  status: string;
  passed: boolean;
}

export interface BundleAuditResult {
  distDir: string;
  files: BundleFileInfo[];
  entryFiles: BundleFileInfo[];
  chunkFiles: BundleFileInfo[];
  otherFiles: BundleFileInfo[];
  totalRawBytes: number;
  totalGzipBytes: number;
  allPassed: boolean;
  failureReasons: string[];
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function resolveDistWebJsDir(overrideDir?: string): string {
  if (overrideDir) {
    return resolve(process.cwd(), overrideDir);
  }

  // Candidate 1: relative to scripts/src/ (canonical location in monorepo)
  const fromScriptLoc = resolve(import.meta.dirname, '../../artifacts/mobile/dist/_expo/static/js/web');
  if (existsSync(fromScriptLoc)) {
    return fromScriptLoc;
  }

  // Candidate 2: relative to monorepo root when run from project root
  const fromRootCwd = resolve(process.cwd(), 'artifacts/mobile/dist/_expo/static/js/web');
  if (existsSync(fromRootCwd)) {
    return fromRootCwd;
  }

  // Candidate 3: relative to scripts package when run from scripts/
  const fromScriptsCwd = resolve(process.cwd(), '../artifacts/mobile/dist/_expo/static/js/web');
  if (existsSync(fromScriptsCwd)) {
    return fromScriptsCwd;
  }

  // Candidate 4: relative to Dark-Realm-Saga subdirectory (if run from parent dir)
  const fromDarkRealmSaga = resolve(process.cwd(), 'Dark-Realm-Saga/artifacts/mobile/dist/_expo/static/js/web');
  if (existsSync(fromDarkRealmSaga)) {
    return fromDarkRealmSaga;
  }

  return fromScriptLoc;
}

export function auditBundleSizes(targetDir: string, maxEntryBytes = MAX_ENTRY_BYTES): BundleAuditResult {
  if (!existsSync(targetDir)) {
    throw new Error(
      `Web export directory not found: ${targetDir}\n` +
      `Please run "pnpm --dir artifacts/mobile run build:web" before running bundle check.`
    );
  }

  const allDirEntries = readdirSync(targetDir);
  const jsFilenames = allDirEntries.filter((f) => f.endsWith('.js'));

  if (jsFilenames.length === 0) {
    throw new Error(`No JavaScript bundles found in ${targetDir}`);
  }

  const failureReasons: string[] = [];
  const files: BundleFileInfo[] = [];

  for (const filename of jsFilenames) {
    const fullPath = join(targetDir, filename);
    const stat = statSync(fullPath);
    const content = readFileSync(fullPath);
    const gzipped = gzipSync(content);

    let type: BundleFileInfo['type'] = 'Other Bundle';
    if (/^entry-.*\.js$/.test(filename)) {
      type = 'Main Entry';
    } else if (
      /^chunk-.*\.js$/.test(filename) ||
      /^chapter.*\.js$/.test(filename) ||
      /^finalChapter.*\.js$/.test(filename) ||
      /^epilogue.*\.js$/.test(filename)
    ) {
      type = 'Dynamic Chunk';
    }

    let passed = true;
    let status = '';

    if (type === 'Main Entry') {
      const isUnderWireBudget = gzipped.length <= maxEntryBytes;
      const isUnderRawBudget = stat.size <= MAX_RAW_ENTRY_BYTES;

      if (isUnderWireBudget && isUnderRawBudget) {
        status = `✅ PASS (< ${MAX_ENTRY_MB_LABEL})`;
      } else {
        passed = false;
        const overage = Math.max(
          gzipped.length > maxEntryBytes ? gzipped.length - maxEntryBytes : 0,
          stat.size > MAX_RAW_ENTRY_BYTES ? stat.size - MAX_RAW_ENTRY_BYTES : 0
        );
        status = `❌ FAIL (+${formatBytes(overage)})`;
        failureReasons.push(
          `Entry bundle "${filename}" exceeds budget threshold (${formatBytes(gzipped.length)} gzip / ${formatBytes(stat.size)} raw).`
        );
      }
    } else if (type === 'Dynamic Chunk') {
      status = 'ℹ️ dynamic chunk';
    } else {
      status = 'ℹ️ asset';
    }

    files.push({
      name: filename,
      type,
      rawBytes: stat.size,
      gzipBytes: gzipped.length,
      rawFormatted: formatBytes(stat.size),
      gzipFormatted: formatBytes(gzipped.length),
      status,
      passed,
    });
  }

  // Sort: Main Entry first, then Dynamic Chunks, then Other; alphabetically within groups
  const typeOrder: Record<BundleFileInfo['type'], number> = {
    'Main Entry': 1,
    'Dynamic Chunk': 2,
    'Other Bundle': 3,
  };
  files.sort((a, b) => {
    if (typeOrder[a.type] !== typeOrder[b.type]) {
      return typeOrder[a.type] - typeOrder[b.type];
    }
    return a.name.localeCompare(b.name);
  });

  const entryFiles = files.filter((f) => f.type === 'Main Entry');
  const chunkFiles = files.filter((f) => f.type === 'Dynamic Chunk');
  const otherFiles = files.filter((f) => f.type === 'Other Bundle');

  if (entryFiles.length === 0) {
    failureReasons.push(`No main entry bundle matching "entry-*.js" was found in ${targetDir}.`);
  }

  // Enforce 0 MB of pre-rendered .mp4 / .webm video inside client dist/
  const distRoot = resolve(targetDir, '../../../..');
  if (existsSync(distRoot)) {
    const scanForVideo = (dir: string): string[] => {
      const found: string[] = [];
      for (const item of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, item.name);
        if (item.isDirectory()) {
          found.push(...scanForVideo(full));
        } else if (/\.(mp4|webm|mov)$/i.test(item.name)) {
          found.push(full);
        }
      }
      return found;
    };
    const videoFiles = scanForVideo(distRoot);
    if (videoFiles.length > 0) {
      failureReasons.push(
        `Client dist/ contains ${videoFiles.length} pre-rendered video file(s) (${videoFiles.join(', ')}); 0 MB allowed.`
      );
    }
  }

  const totalRawBytes = files.reduce((sum, f) => sum + f.rawBytes, 0);
  const totalGzipBytes = files.reduce((sum, f) => sum + f.gzipBytes, 0);
  const allPassed = failureReasons.length === 0;

  return {
    distDir: targetDir,
    files,
    entryFiles,
    chunkFiles,
    otherFiles,
    totalRawBytes,
    totalGzipBytes,
    allPassed,
    failureReasons,
  };
}

export function printAuditReport(result: BundleAuditResult): void {
  const headers = ['Bundle / Chunk File', 'Type', 'Raw Size', 'Gzip Size', 'Budget Status'];
  const rows = result.files;

  const colWidths = [
    Math.max(headers[0].length, ...rows.map((r) => r.name.length)),
    Math.max(headers[1].length, ...rows.map((r) => r.type.length)),
    Math.max(headers[2].length, ...rows.map((r) => r.rawFormatted.length)),
    Math.max(headers[3].length, ...rows.map((r) => r.gzipFormatted.length)),
    Math.max(headers[4].length, ...rows.map((r) => r.status.length)),
  ];

  const pad = (str: string, len: number) => str + ' '.repeat(Math.max(0, len - str.length));
  const padLeft = (str: string, len: number) => ' '.repeat(Math.max(0, len - str.length)) + str;

  const separator = '+' + colWidths.map((w) => '-'.repeat(w + 2)).join('+') + '+';

  console.log('\n================================================================================');
  console.log('📊 WEB BUNDLE SIZE MONITORING REPORT — Scars of the Last Kingdom');
  console.log('================================================================================');
  console.log(`Directory: ${result.distDir}`);
  console.log(`Entry Budget Threshold: < ${MAX_ENTRY_MB_LABEL} (${MAX_ENTRY_BYTES.toLocaleString()} bytes)\n`);

  console.log(separator);
  console.log(
    '| ' +
      headers
        .map((h, i) => (i === 2 || i === 3 ? padLeft(h, colWidths[i]) : pad(h, colWidths[i])))
        .join(' | ') +
      ' |'
  );
  console.log(separator);

  for (const r of rows) {
    const cols = [
      pad(r.name, colWidths[0]),
      pad(r.type, colWidths[1]),
      padLeft(r.rawFormatted, colWidths[2]),
      padLeft(r.gzipFormatted, colWidths[3]),
      pad(r.status, colWidths[4]),
    ];
    console.log('| ' + cols.join(' | ') + ' |');
  }
  console.log(separator);

  console.log('\n📈 Summary:');
  console.log(`  • Main Entry Bundles: ${result.entryFiles.length}`);
  console.log(`  • Dynamic Chunks:     ${result.chunkFiles.length}`);
  console.log(`  • Total JS Files:     ${result.files.length}`);
  console.log(`  • Total Raw Size:     ${formatBytes(result.totalRawBytes)} (${result.totalRawBytes.toLocaleString()} bytes)`);
  console.log(`  • Total Gzip Size:    ${formatBytes(result.totalGzipBytes)} (${result.totalGzipBytes.toLocaleString()} bytes)`);

  if (result.allPassed) {
    console.log('\n🎉 RESULT: ALL BUNDLE BUDGET CHECKS PASSED!');
    for (const entry of result.entryFiles) {
      console.log(`  ✅ ${entry.name}: ${entry.rawFormatted} raw / ${entry.gzipFormatted} gzip (Budget: < ${MAX_ENTRY_MB_LABEL})`);
    }
  } else {
    console.error('\n🚨 RESULT: BUNDLE BUDGET VIOLATION DETECTED!');
    for (const reason of result.failureReasons) {
      console.error(`  ❌ ${reason}`);
    }
  }
  console.log('================================================================================\n');
}

export function runBundleCheck(targetDirOverride?: string, exitOnFailure = true): boolean {
  try {
    const dir = resolveDistWebJsDir(targetDirOverride);
    const result = auditBundleSizes(dir);
    printAuditReport(result);

    if (!result.allPassed && exitOnFailure) {
      process.exit(1);
    }
    return result.allPassed;
  } catch (err: any) {
    console.error(`\n❌ Error running bundle check: ${err.message}\n`);
    if (exitOnFailure) {
      process.exit(1);
    }
    return false;
  }
}

// Execute when run directly as CLI
const isDirectCli = import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` ||
                    process.argv[1]?.endsWith('checkBundleSize.ts');

if (isDirectCli) {
  const dirArg = process.argv[2];
  runBundleCheck(dirArg, true);
}
