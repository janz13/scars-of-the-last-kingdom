/**
 * System Interface Contracts & Dynamic Module Resolvers
 * E2E Testing Track — Scars of the Last Kingdom
 */

import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const req = createRequire(import.meta.url);

// Robust cwd-independent path resolution
const REPO_ROOT = fileURLToPath(new URL('../..', import.meta.url));
const MOBILE_ROOT = resolve(REPO_ROOT, 'artifacts/mobile');
const SCRIPTS_ROOT = resolve(REPO_ROOT, 'scripts');

// ── 1. Chapter Loader Contract ──────────────────────────────────────────────
export interface ChapterLoader {
  loadChapter(chapterName: string): Promise<any[]>;
  preloadNextChapter(currentChapter: string): void;
  isChapterLoaded(chapterName: string): boolean;
  getNodeSync(id: string): any | undefined;
}

// ── 2. Multi-Slot Save Contract ─────────────────────────────────────────────
export type SaveSlotId = 'auto' | 'slot1' | 'slot2' | 'slot3';

export interface SaveSlotMetadata {
  slotId: SaveSlotId;
  label: string;
  timestamp: number;
  chapter: string;
  location: string;
  characterName: string;
  characterClass: string;
  isEmpty: boolean;
}

export interface SaveSystemContract {
  listSaveSlots(storage?: any): Promise<SaveSlotMetadata[]>;
  saveGameToSlot(state: any, slotId: SaveSlotId, storage?: any): Promise<boolean>;
  loadGameFromSlot(slotId: SaveSlotId, storage?: any): Promise<any | null>;
  deleteSlot(slotId: SaveSlotId, storage?: any): Promise<boolean>;
}

// ── 3. Declarative Conditional Endings Contract ─────────────────────────────
export interface EndingCondition {
  endingId: string;
  priority: number; // Higher number evaluated first
  condition: (state: any, choice?: any) => boolean;
  description: string;
}

export interface ConditionalEndingsContract {
  CONDITIONAL_ENDINGS: EndingCondition[];
  evaluateConditionalEnding(state: any, choice?: any): string | null;
}

// ── 4. Typewriter Contract ──────────────────────────────────────────────────
export type TextSpeed = 'slow' | 'normal' | 'fast' | 'instant';

export const TYPEWRITER_SPEED_INTERVALS: Record<TextSpeed, number> = {
  slow: 38,
  normal: 18,
  fast: 7,
  instant: 0,
};

// ── 5. Dynamic Module Resolvers ─────────────────────────────────────────────

export function tryLoadEngineModule(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'logic/gameEngine.ts'));
  } catch (err) {
    return null;
  }
}

export function tryLoadDiceEngine(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'logic/diceEngine.ts'));
  } catch (err) {
    return null;
  }
}

export function tryLoadSaveValidation(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'logic/saveValidation.ts'));
  } catch (err) {
    return null;
  }
}

export function tryLoadSaveSystem(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'logic/saveSystem.ts'));
  } catch (err) {
    return null;
  }
}

export function tryLoadConditionalEndings(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'data/story/conditionalEndings.ts'));
  } catch {
    try {
      return req(resolve(MOBILE_ROOT, 'data/conditionalEndings.ts'));
    } catch {
      return null;
    }
  }
}

export function tryLoadChapterLoader(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'data/story/chapterLoader.ts'));
  } catch {
    return null;
  }
}

export function tryLoadPrologue(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'data/story/prologue.ts'));
  } catch {
    return null;
  }
}

export function tryLoadAllStoryNodes(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'data/story/allNodesSync.ts'));
  } catch {
    try {
      return req(resolve(MOBILE_ROOT, 'data/story/index.ts'));
    } catch {
      return null;
    }
  }
}

export function tryLoadEndingsData(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'data/story/endings.ts'));
  } catch {
    return null;
  }
}

export function tryLoadImagesConstant(): any {
  try {
    return req(resolve(MOBILE_ROOT, 'constants/images.ts'));
  } catch {
    return null;
  }
}

export function getHtmlShellContent(): string {
  const p = resolve(MOBILE_ROOT, 'app/+html.tsx');
  if (existsSync(p)) {
    return readFileSync(p, 'utf-8');
  }
  return '';
}

export function getDeployYmlContent(): string {
  const p = resolve(REPO_ROOT, '.github/workflows/deploy.yml');
  if (existsSync(p)) {
    return readFileSync(p, 'utf-8');
  }
  return '';
}
