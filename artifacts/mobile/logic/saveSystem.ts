import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState, SaveSlotId, SaveSlotMetadata } from '../data/types';
import {
  SAVE_DEFAULTS,
  MAX_ROUTE_HISTORY,
  migrateSave,
  parseAndValidateSave,
} from './saveValidation';
import { getNodeById } from '../data/storyNodes';

export {
  SAVE_DEFAULTS,
  MAX_ROUTE_HISTORY,
  migrateSave,
  parseAndValidateSave,
};

export type { SaveSlotId, SaveSlotMetadata };

// ─── Constants & Slot Storage Keys ──────────────────────────────────────────

export const ALL_SAVE_SLOTS: readonly SaveSlotId[] = ['auto', 'slot1', 'slot2', 'slot3'] as const;

export const SLOT_STORAGE_KEYS: Record<SaveSlotId, string> = {
  auto: '@scars_save_slot_auto',
  slot1: '@scars_save_slot_1',
  slot2: '@scars_save_slot_2',
  slot3: '@scars_save_slot_3',
};

export const SAVE_META_KEY = '@scars_save_meta';
export const LEGACY_SAVE_KEY = '@scars_save_v1';
export const CONTENT_WARNING_KEY = '@scars_content_warning_v1';
export const ENDINGS_KEY = '@scars_endings_v1';

// ─── Helper Functions ───────────────────────────────────────────────────────

export function getSlotStorageKey(slotId: SaveSlotId): string {
  return SLOT_STORAGE_KEYS[slotId] || `@scars_save_slot_${slotId}`;
}

export function getSlotLabel(slotId: SaveSlotId): string {
  if (slotId === 'auto') return 'Autosave';
  const num = slotId.replace('slot', '');
  return `Manual Slot ${num}`;
}

export function createEmptySlotMetadata(slotId: SaveSlotId): SaveSlotMetadata {
  return {
    slotId,
    label: getSlotLabel(slotId),
    timestamp: 0,
    chapter: '',
    location: '',
    characterName: '',
    characterClass: '',
    isEmpty: true,
  };
}

export function extractMetadataFromState(state: GameState, slotId: SaveSlotId): SaveSlotMetadata {
  let chapter = '';
  let location = '';

  try {
    const node = getNodeById(state.currentNodeId);
    if (node) {
      chapter = node.chapter || '';
      location = node.location || node.title || '';
    }
  } catch {
    // story nodes lookup fallback
  }

  if (!chapter && state.routeHistory && state.routeHistory.length > 0) {
    const last = state.routeHistory[state.routeHistory.length - 1] as any;
    if (last && typeof last.chapter === 'string') {
      chapter = last.chapter;
    }
  }

  if (!chapter && state.currentNodeId) {
    if (state.currentNodeId.startsWith('prologue')) {
      chapter = 'Prologue';
    } else {
      const match = state.currentNodeId.match(/^(chapter|finalChapter)(\d+)/i);
      if (match) {
        chapter = match[1].toLowerCase() === 'finalchapter' ? `Final Chapter ${match[2]}` : `Chapter ${match[2]}`;
      }
    }
  }

  return {
    slotId,
    label: getSlotLabel(slotId),
    timestamp: Date.now(),
    chapter: chapter || 'Chapter 1',
    location: location || 'Metro Station Hub',
    characterName: state.character?.name || 'Unknown Survivor',
    characterClass: state.character?.characterClass || '',
    isEmpty: false,
  };
}

// ─── Legacy Migration ───────────────────────────────────────────────────────

export async function migrateLegacySave(storage: any = AsyncStorage): Promise<boolean> {
  try {
    const legacy = await storage.getItem(LEGACY_SAVE_KEY);
    if (!legacy) return false;

    const autoExisting = await storage.getItem(SLOT_STORAGE_KEYS.auto);
    if (!autoExisting) {
      await storage.setItem(SLOT_STORAGE_KEYS.auto, legacy);
      try {
        const parsed = JSON.parse(legacy);
        const meta = extractMetadataFromState(parsed, 'auto');
        const rawMeta = await storage.getItem(SAVE_META_KEY);
        const metaMap = rawMeta ? JSON.parse(rawMeta) : {};
        metaMap.auto = meta;
        await storage.setItem(SAVE_META_KEY, JSON.stringify(metaMap));
      } catch {
        // fallback
      }
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Legacy save migration failed:', error);
    return false;
  }
}

// ─── Core Multi-Slot API (Section 4.2) ──────────────────────────────────────

export async function listSaveSlots(storage: any = AsyncStorage): Promise<SaveSlotMetadata[]> {
  try {
    await migrateLegacySave(storage);

    let metaMap: Record<string, SaveSlotMetadata> = {};
    try {
      const rawMeta = await storage.getItem(SAVE_META_KEY);
      if (rawMeta) {
        metaMap = JSON.parse(rawMeta);
      }
    } catch {
      // fallback to empty map
    }

    const results: SaveSlotMetadata[] = [];

    for (const slotId of ALL_SAVE_SLOTS) {
      const existingMeta = metaMap[slotId];
      if (existingMeta && existingMeta.timestamp > 0 && !existingMeta.isEmpty) {
        results.push({
          ...existingMeta,
          slotId,
          label: getSlotLabel(slotId),
          isEmpty: false,
        });
      } else {
        results.push(createEmptySlotMetadata(slotId));
      }
    }

    return results;
  } catch (error) {
    console.warn('listSaveSlots failed:', error);
    return ALL_SAVE_SLOTS.map((id) => createEmptySlotMetadata(id));
  }
}

export async function saveGameToSlot(
  state: GameState,
  slotId: SaveSlotId,
  storage: any = AsyncStorage
): Promise<boolean> {
  try {
    if (!ALL_SAVE_SLOTS.includes(slotId)) {
      console.warn(`Invalid slotId: ${slotId}`);
      return false;
    }

    const toSave: GameState =
      state.routeHistory && state.routeHistory.length > MAX_ROUTE_HISTORY
        ? { ...state, routeHistory: state.routeHistory.slice(-MAX_ROUTE_HISTORY) }
        : state;

    const serialized = JSON.stringify(toSave);
    const slotKey = getSlotStorageKey(slotId);

    await storage.setItem(slotKey, serialized);

    const meta = extractMetadataFromState(toSave, slotId);
    let metaMap: Record<string, SaveSlotMetadata> = {};
    try {
      const rawMeta = await storage.getItem(SAVE_META_KEY);
      if (rawMeta) metaMap = JSON.parse(rawMeta);
    } catch {
      // fallback
    }

    metaMap[slotId] = meta;
    await storage.setItem(SAVE_META_KEY, JSON.stringify(metaMap));

    return true;
  } catch (error) {
    console.warn('saveGameToSlot failed:', error);
    return false;
  }
}

export async function loadGameFromSlot(
  slotId: SaveSlotId,
  storage: any = AsyncStorage
): Promise<GameState | null> {
  try {
    if (!ALL_SAVE_SLOTS.includes(slotId)) return null;

    const slotKey = getSlotStorageKey(slotId);
    const data = await storage.getItem(slotKey);
    if (!data) return null;

    const raw = JSON.parse(data) as Partial<GameState>;
    return migrateSave(raw);
  } catch (error) {
    console.warn(`loadGameFromSlot(${slotId}) failed:`, error);
    return null;
  }
}

export async function deleteSlot(
  slotId: SaveSlotId,
  storage: any = AsyncStorage
): Promise<boolean> {
  try {
    if (!ALL_SAVE_SLOTS.includes(slotId)) return false;

    const slotKey = getSlotStorageKey(slotId);
    await storage.removeItem(slotKey);

    let metaMap: Record<string, SaveSlotMetadata> = {};
    try {
      const rawMeta = await storage.getItem(SAVE_META_KEY);
      if (rawMeta) metaMap = JSON.parse(rawMeta);
    } catch {
      // fallback
    }

    metaMap[slotId] = createEmptySlotMetadata(slotId);
    await storage.setItem(SAVE_META_KEY, JSON.stringify(metaMap));

    return true;
  } catch (error) {
    console.warn(`deleteSlot(${slotId}) failed:`, error);
    return false;
  }
}

// ─── Single-Save Backwards-Compatibility Shims ──────────────────────────────

export async function saveGame(state: GameState, storage: any = AsyncStorage): Promise<void> {
  await saveGameToSlot(state, 'auto', storage);
}

export async function loadGame(storage: any = AsyncStorage): Promise<GameState | null> {
  const fromAuto = await loadGameFromSlot('auto', storage);
  if (fromAuto) return fromAuto;

  try {
    const data = await storage.getItem(LEGACY_SAVE_KEY);
    if (!data) return null;
    const raw = JSON.parse(data) as Partial<GameState>;
    return migrateSave(raw);
  } catch (error) {
    console.warn('loadGame fallback failed:', error);
    return null;
  }
}

export async function hasSave(storage: any = AsyncStorage): Promise<boolean> {
  try {
    const slots = await listSaveSlots(storage);
    return slots.some((s) => !s.isEmpty);
  } catch {
    return false;
  }
}

export async function deleteSave(storage: any = AsyncStorage): Promise<void> {
  await deleteSlot('auto', storage);
  try {
    await storage.removeItem(LEGACY_SAVE_KEY);
  } catch {
    // ignore
  }
}

export async function hasSeenContentWarning(storage: any = AsyncStorage): Promise<boolean> {
  try {
    const val = await storage.getItem(CONTENT_WARNING_KEY);
    return val === 'true';
  } catch {
    return false;
  }
}

export async function markContentWarningSeen(storage: any = AsyncStorage): Promise<void> {
  try {
    await storage.setItem(CONTENT_WARNING_KEY, 'true');
  } catch (error) {
    console.warn('markContentWarningSeen failed:', error);
  }
}

export async function resetAllData(storage: any = AsyncStorage): Promise<void> {
  try {
    const keys = [
      ...Object.values(SLOT_STORAGE_KEYS),
      SAVE_META_KEY,
      LEGACY_SAVE_KEY,
      CONTENT_WARNING_KEY,
      ENDINGS_KEY,
    ];
    if (typeof storage.multiRemove === 'function') {
      await storage.multiRemove(keys);
    } else {
      for (const k of keys) {
        await storage.removeItem(k);
      }
    }
  } catch (error) {
    console.warn('resetAllData failed:', error);
  }
}

// ─── Endings persistence (survives save deletion) ─────────────────────────────

export async function saveEndingsDiscovered(endings: string[], storage: any = AsyncStorage): Promise<void> {
  try {
    await storage.setItem(ENDINGS_KEY, JSON.stringify(endings));
  } catch (error) {
    console.warn('saveEndingsDiscovered failed:', error);
  }
}

export async function loadEndingsDiscovered(storage: any = AsyncStorage): Promise<string[]> {
  try {
    const data = await storage.getItem(ENDINGS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('loadEndingsDiscovered failed:', error);
    return [];
  }
}

// ─── Save file export & import (Web file backup) ─────────────────────────────

export interface SaveExportPayload {
  version: string;
  exportedAt: string;
  gameState: GameState;
  endingsDiscovered: string[];
}

export async function exportSaveData(storage: any = AsyncStorage): Promise<{ success: boolean; error?: string }> {
  try {
    const save = await loadGame(storage);
    if (!save) {
      return { success: false, error: 'No active save data found to export.' };
    }

    const persistedEndings = await loadEndingsDiscovered(storage);
    const mergedEndings = Array.from(new Set([...(save.endingsDiscovered || []), ...persistedEndings]));

    const payload: SaveExportPayload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      gameState: {
        ...save,
        endingsDiscovered: mergedEndings,
      },
      endingsDiscovered: mergedEndings,
    };

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const jsonStr = JSON.stringify(payload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scars-of-the-last-kingdom-save.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true };
    }

    return { success: false, error: 'Save export is only supported in web browsers.' };
  } catch (error) {
    console.warn('exportSaveData failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to export save data.',
    };
  }
}

export async function importSaveData(
  jsonStr: string,
  storage: any = AsyncStorage
): Promise<{
  success: boolean;
  state?: GameState;
  error?: string;
}> {
  try {
    const result = parseAndValidateSave(jsonStr);
    if (!result.valid || !result.gameState) {
      return { success: false, error: result.error || 'Failed to validate save file.' };
    }

    const stateToSave = result.gameState;
    await saveGameToSlot(stateToSave, 'auto', storage);

    const endings = result.endingsDiscovered ?? stateToSave.endingsDiscovered;
    if (endings && endings.length > 0) {
      const currentEndings = await loadEndingsDiscovered(storage);
      const mergedEndings = Array.from(new Set([...currentEndings, ...endings]));
      await saveEndingsDiscovered(mergedEndings, storage);
      stateToSave.endingsDiscovered = mergedEndings;
    }

    return { success: true, state: stateToSave };
  } catch (error) {
    console.warn('importSaveData failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to import save data.',
    };
  }
}
