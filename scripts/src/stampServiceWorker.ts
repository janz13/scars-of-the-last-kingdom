/**
 * Service Worker Cache Version Auto-Stamper — Scars of the Last Kingdom
 *
 * Replaces the `CACHE_VERSION = '...'` string inside `artifacts/mobile/dist/sw.js`
 * with `sotlk-<7charSHA>` resolved from `GITHUB_SHA` or `git rev-parse --short HEAD`
 * so returning players always receive the newest deployed bundle without manual bumps.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

export function resolveShortSha(): string {
  const envSha = process.env.GITHUB_SHA?.trim();
  if (envSha && envSha.length >= 7) {
    return envSha.slice(0, 7);
  }
  try {
    const out = execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString('utf8')
      .trim();
    if (out) return out;
  } catch {
    // fallback below
  }
  return `v${Date.now().toString(36).slice(-6)}`;
}

export function stampServiceWorkerDist(distSwPath?: string): string {
  const target =
    distSwPath ??
    resolve(import.meta.dirname, '../../artifacts/mobile/dist/sw.js');

  if (!existsSync(target)) {
    throw new Error(`Service worker file not found in build output: ${target}`);
  }

  const shortSha = resolveShortSha();
  const nextVersion = `sotlk-${shortSha}`;
  const raw = readFileSync(target, 'utf8');
  const pattern = /const\s+CACHE_VERSION\s*=\s*['"][^'"]+['"]\s*;/;
  if (!pattern.test(raw)) {
    throw new Error(`CACHE_VERSION assignment not found in ${target}`);
  }

  const stamped = raw.replace(pattern, `const CACHE_VERSION = '${nextVersion}';`);
  writeFileSync(target, stamped, 'utf8');
  console.log(`✅ Stamped ${target} with CACHE_VERSION='${nextVersion}'`);
  return nextVersion;
}

const isDirectCli =
  import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` ||
  process.argv[1]?.endsWith('stampServiceWorker.ts');

if (isDirectCli) {
  stampServiceWorkerDist(process.argv[2]);
}
