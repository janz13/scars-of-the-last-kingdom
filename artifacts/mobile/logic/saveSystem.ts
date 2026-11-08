import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState } from '../data/types';
import {
  SAVE_DEFAULTS,
  MAX_ROUTE_HISTORY,
  migrateSave,
  parseAndValidateSave,
} from './saveValidation';

export {
  SAVE_DEFAULTS,
  MAX_ROUTE_HISTORY,
  migrateSave,
  parseAndValidateSave,
};

// ─── HOW TO SAVE ADDITIONAL DATA ──────────────────────────────────────────
// The entire GameState is serialized. Add new fields to GameState in
// data/types.ts and they will automatically be saved and loaded.
//
// IMPORTANT: When you add a new field to GameState, also add a fallback
// in SAVE_DEFAULTS in saveValidation.ts so old saves without that field load cleanly.
// ──────────────────────────────────────────────────────────────────────────

const SAVE_KEY = '@scars_save_v1';
const CONTENT_WARNING_KEY = '@scars_content_warning_v1';
const ENDINGS_KEY = '@scars_endings_v1';

// ─── Public API ───────────────────────────────────────────────────────────────

export async function saveGame(state: GameState): Promise<void> {
  try {
    // Cap route history before serialising so the stored payload stays bounded
    const toSave: GameState = state.routeHistory.length > MAX_ROUTE_HISTORY
      ? { ...state, routeHistory: state.routeHistory.slice(-MAX_ROUTE_HISTORY) }
      : state;
    const serialized = JSON.stringify(toSave);
    await AsyncStorage.setItem(SAVE_KEY, serialized);
  } catch (error) {
    console.warn('Save failed:', error);
  }
}

export async function loadGame(): Promise<GameState | null> {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);
    if (!data) return null;
    const raw = JSON.parse(data) as Partial<GameState>;
    return migrateSave(raw);
  } catch (error) {
    console.warn('Load failed:', error);
    return null;
  }
}

export async function hasSave(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);
    return data !== null;
  } catch {
    return false;
  }
}

export async function deleteSave(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.warn('Delete save failed:', error);
  }
}

export async function hasSeenContentWarning(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(CONTENT_WARNING_KEY);
    return val === 'true';
  } catch {
    return false;
  }
}

export async function markContentWarningSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(CONTENT_WARNING_KEY, 'true');
  } catch (error) {
    console.warn('markContentWarningSeen failed:', error);
  }
}

export async function resetAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([SAVE_KEY, CONTENT_WARNING_KEY, ENDINGS_KEY]);
  } catch (error) {
    console.warn('resetAllData failed:', error);
  }
}

// ─── Endings persistence (survives save deletion) ─────────────────────────────

export async function saveEndingsDiscovered(endings: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ENDINGS_KEY, JSON.stringify(endings));
  } catch (error) {
    console.warn('saveEndingsDiscovered failed:', error);
  }
}

export async function loadEndingsDiscovered(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(ENDINGS_KEY);
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

export async function exportSaveData(): Promise<{ success: boolean; error?: string }> {
  try {
    const save = await loadGame();
    if (!save) {
      return { success: false, error: 'No active save data found to export.' };
    }

    const persistedEndings = await loadEndingsDiscovered();
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

export async function importSaveData(jsonStr: string): Promise<{
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
    await saveGame(stateToSave);

    const endings = result.endingsDiscovered ?? stateToSave.endingsDiscovered;
    if (endings && endings.length > 0) {
      const currentEndings = await loadEndingsDiscovered();
      const mergedEndings = Array.from(new Set([...currentEndings, ...endings]));
      await saveEndingsDiscovered(mergedEndings);
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
