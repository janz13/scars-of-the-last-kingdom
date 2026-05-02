import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState } from '../data/types';

// ─── HOW TO SAVE ADDITIONAL DATA ──────────────────────────────────────────
// The entire GameState is serialized. Add new fields to GameState in
// data/types.ts and they will automatically be saved and loaded.
// ──────────────────────────────────────────────────────────────────────────

const SAVE_KEY = '@scars_save_v1';
const ENDINGS_KEY = '@scars_endings_v1';

export async function saveGame(state: GameState): Promise<void> {
  try {
    const serialized = JSON.stringify(state);
    await AsyncStorage.setItem(SAVE_KEY, serialized);
  } catch (error) {
    console.warn('Save failed:', error);
  }
}

export async function loadGame(): Promise<GameState | null> {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);
    if (!data) return null;
    return JSON.parse(data) as GameState;
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

export async function saveEndingsDiscovered(endings: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ENDINGS_KEY, JSON.stringify(endings));
  } catch {}
}

export async function loadEndingsDiscovered(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(ENDINGS_KEY);
    if (!data) return [];
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
}
