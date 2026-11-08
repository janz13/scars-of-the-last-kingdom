/**
 * Test Primitives, Assertions, and Mock Harness
 * E2E Testing Track — Scars of the Last Kingdom
 */

export interface TestResult {
  id: string;
  title: string;
  featureId: string;
  tier: 1 | 2 | 3 | 4;
  passed: boolean;
  error?: string;
  durationMs: number;
}

export type TestFn = () => void | Promise<void>;

export interface TestCase {
  id: string;
  title: string;
  featureId: string;
  tier: 1 | 2 | 3 | 4;
  fn: TestFn;
}

export interface Assertion {
  not: Assertion;
  toBe(expected: any): void;
  toEqual(expected: any): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeNull(): void;
  toBeDefined(): void;
  toBeUndefined(): void;
  toBeGreaterThan(expected: number): void;
  toBeGreaterThanOrEqual(expected: number): void;
  toBeLessThan(expected: number): void;
  toBeLessThanOrEqual(expected: number): void;
  toContain(item: any): void;
  toThrow(expectedMessage?: string | RegExp): void;
}

function createAssertion(actual: any, isNot = false): Assertion {
  return {
    get not(): Assertion {
      return createAssertion(actual, !isNot);
    },
    toBe(expected: any) {
      const match = actual === expected;
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected ${JSON.stringify(actual)} NOT to be ${JSON.stringify(expected)}`
            : `Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`
        );
      }
    },
    toEqual(expected: any) {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      const match = a === e;
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected deep inequality, but both equaled:\n${a}`
            : `Expected deep equality:\nActual:   ${a}\nExpected: ${e}`
        );
      }
    },
    toBeTruthy() {
      const match = Boolean(actual);
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected ${JSON.stringify(actual)} to be falsy`
            : `Expected ${JSON.stringify(actual)} to be truthy`
        );
      }
    },
    toBeFalsy() {
      const match = !Boolean(actual);
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected ${JSON.stringify(actual)} to be truthy`
            : `Expected ${JSON.stringify(actual)} to be falsy`
        );
      }
    },
    toBeNull() {
      const match = actual === null;
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected ${JSON.stringify(actual)} NOT to be null`
            : `Expected ${JSON.stringify(actual)} to be null`
        );
      }
    },
    toBeDefined() {
      const match = actual !== undefined;
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected value to be undefined, but got defined`
            : `Expected value to be defined, but got undefined`
        );
      }
    },
    toBeUndefined() {
      const match = actual === undefined;
      if (isNot ? match : !match) {
        throw new Error(
          isNot
            ? `Expected value to be defined, but got undefined`
            : `Expected value to be undefined`
        );
      }
    },
    toBeGreaterThan(expected: number) {
      const match = typeof actual === 'number' && actual > expected;
      if (isNot ? match : !match) {
        throw new Error(`Expected ${actual} ${isNot ? 'NOT to be' : 'to be'} > ${expected}`);
      }
    },
    toBeGreaterThanOrEqual(expected: number) {
      const match = typeof actual === 'number' && actual >= expected;
      if (isNot ? match : !match) {
        throw new Error(`Expected ${actual} ${isNot ? 'NOT to be' : 'to be'} >= ${expected}`);
      }
    },
    toBeLessThan(expected: number) {
      const match = typeof actual === 'number' && actual < expected;
      if (isNot ? match : !match) {
        throw new Error(`Expected ${actual} ${isNot ? 'NOT to be' : 'to be'} < ${expected}`);
      }
    },
    toBeLessThanOrEqual(expected: number) {
      const match = typeof actual === 'number' && actual <= expected;
      if (isNot ? match : !match) {
        throw new Error(`Expected ${actual} ${isNot ? 'NOT to be' : 'to be'} <= ${expected}`);
      }
    },
    toContain(item: any) {
      let match = false;
      if (typeof actual === 'string') {
        match = actual.includes(String(item));
      } else if (Array.isArray(actual)) {
        match = actual.some(x => JSON.stringify(x) === JSON.stringify(item) || x === item);
      } else {
        throw new Error(`toContain called on non-collection: ${typeof actual}`);
      }
      if (isNot ? match : !match) {
        throw new Error(`Expected ${JSON.stringify(actual)} ${isNot ? 'NOT to contain' : 'to contain'} ${JSON.stringify(item)}`);
      }
    },
    toThrow(expectedMessage?: string | RegExp) {
      if (typeof actual !== 'function') {
        throw new Error(`toThrow called on non-function`);
      }
      let threw = false;
      let errorThrown: any = null;
      try {
        actual();
      } catch (err: any) {
        threw = true;
        errorThrown = err;
      }
      if (isNot) {
        if (threw) {
          throw new Error(`Expected function NOT to throw, but it threw: ${errorThrown?.message || errorThrown}`);
        }
        return;
      }
      if (!threw) {
        throw new Error(`Expected function to throw, but it did not`);
      }
      if (expectedMessage) {
        const msg = errorThrown?.message || String(errorThrown);
        if (typeof expectedMessage === 'string' && !msg.includes(expectedMessage)) {
          throw new Error(`Expected error message "${msg}" to contain "${expectedMessage}"`);
        }
        if (expectedMessage instanceof RegExp && !expectedMessage.test(msg)) {
          throw new Error(`Expected error message "${msg}" to match ${expectedMessage}`);
        }
      }
    },
  };
}

export function expect(actual: any): Assertion {
  return createAssertion(actual, false);
}

/**
 * Isolated in-memory AsyncStorage mock simulating React Native AsyncStorage
 */
export interface MockStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  getAllKeys(): Promise<string[]>;
  clear(): Promise<void>;
  getRawData(): Record<string, string>;
  setStorageQuotaBytes(quota: number | null): void;
}

export function createMockStorage(initialData: Record<string, string> = {}): MockStorage {
  const store = new Map<string, string>(Object.entries(initialData));
  let quotaBytes: number | null = null;

  function getCurrentSize(): number {
    let size = 0;
    for (const [k, v] of store.entries()) {
      size += k.length + v.length;
    }
    return size;
  }

  return {
    async getItem(key: string): Promise<string | null> {
      return store.has(key) ? store.get(key)! : null;
    },
    async setItem(key: string, value: string): Promise<void> {
      if (quotaBytes !== null) {
        const projected = getCurrentSize() + key.length + value.length;
        if (projected > quotaBytes) {
          throw new Error(`DOMException: QuotaExceededError - storage limit of ${quotaBytes} bytes reached`);
        }
      }
      store.set(key, value);
    },
    async removeItem(key: string): Promise<void> {
      store.delete(key);
    },
    async getAllKeys(): Promise<string[]> {
      return Array.from(store.keys());
    },
    async clear(): Promise<void> {
      store.clear();
    },
    getRawData(): Record<string, string> {
      return Object.fromEntries(store.entries());
    },
    setStorageQuotaBytes(quota: number | null) {
      quotaBytes = quota;
    },
  };
}

/**
 * Isolated Browser Window / DOM Event Mock
 */
export interface MockWindow {
  innerWidth: number;
  innerHeight: number;
  activeElementTag: string;
  activeElementIsInput: boolean;
  eventListeners: Map<string, Array<(e: any) => void>>;
  addEventListener(event: string, handler: (e: any) => void): void;
  removeEventListener(event: string, handler: (e: any) => void): void;
  dispatchKeyboardEvent(key: string, options?: { shiftKey?: boolean; ctrlKey?: boolean; altKey?: boolean }): void;
  focusElement(tag: 'input' | 'textarea' | 'button' | 'body' | 'div'): void;
  setDimensions(width: number, height: number): void;
}

export function createMockWindow(width = 1920, height = 1080): MockWindow {
  const listeners = new Map<string, Array<(e: any) => void>>();
  let currentActiveTag = 'body';
  let isInput = false;
  let winWidth = width;
  let winHeight = height;

  return {
    get innerWidth() { return winWidth; },
    get innerHeight() { return winHeight; },
    get activeElementTag() { return currentActiveTag; },
    get activeElementIsInput() { return isInput; },
    get eventListeners() { return listeners; },
    addEventListener(event: string, handler: (e: any) => void) {
      if (!listeners.has(event)) {
        listeners.set(event, []);
      }
      listeners.get(event)!.push(handler);
    },
    removeEventListener(event: string, handler: (e: any) => void) {
      const arr = listeners.get(event);
      if (arr) {
        const idx = arr.indexOf(handler);
        if (idx !== -1) arr.splice(idx, 1);
      }
    },
    dispatchKeyboardEvent(key: string, options: { shiftKey?: boolean; ctrlKey?: boolean; altKey?: boolean } = {}) {
      const handlers = listeners.get('keydown') || [];
      const event = {
        key,
        code: key === '?' ? 'Slash' : key,
        shiftKey: options.shiftKey ?? (key === '?'),
        ctrlKey: options.ctrlKey ?? false,
        altKey: options.altKey ?? false,
        target: {
          tagName: currentActiveTag.toUpperCase(),
          matches: (sel: string) => sel.toLowerCase().includes(currentActiveTag.toLowerCase()),
        },
        preventDefault: () => {},
        stopPropagation: () => {},
      };
      for (const h of handlers) {
        h(event);
      }
    },
    focusElement(tag: 'input' | 'textarea' | 'button' | 'body' | 'div') {
      currentActiveTag = tag;
      isInput = tag === 'input' || tag === 'textarea';
    },
    setDimensions(w: number, h: number) {
      winWidth = w;
      winHeight = h;
    },
  };
}

/**
 * Standard baseline GameState factory
 */
export function createBaseGameState(overrides: Record<string, any> = {}): any {
  return {
    screen: overrides.screen || 'game',
    character: {
      name: 'Alden',
      characterClass: 'relic_hunter',
      background: 'forgotten_scholar',
      startingCompanion: 'none',
      personalityTrait: 'pragmatic',
      ...overrides.character,
    },
    stats: {
      health: 80,
      maxHealth: 100,
      hunger: 70,
      thirst: 70,
      morale: 50,
      trust: 0,
      strength: 10,
      intelligence: 12,
      agility: 8,
      charisma: 7,
      luck: 6,
      corruption: 10,
      ...overrides.stats,
    },
    inventory: {
      food: 2,
      water: 2,
      medicine: 1,
      scrap: 5,
      ammo: 3,
      relics: 1,
      reputation: 0,
      ...overrides.inventory,
    },
    currentNodeId: overrides.currentNodeId || 'metro_station_hub',
    flags: { ...(overrides.flags || {}) },
    companions: {
      mira: { present: false, trust: 2, alive: true },
      cain: { present: false, trust: 0, alive: true },
      ...overrides.companions,
    },
    factionRep: {
      ironSaints: 0,
      glassCourt: 5,
      hollowChildren: 0,
      redChoir: -5,
      lastArchive: 15,
      ...overrides.factionRep,
    },
    routeHistory: overrides.routeHistory ? [...overrides.routeHistory] : [],
    endingsDiscovered: overrides.endingsDiscovered ? [...overrides.endingsDiscovered] : [],
    settings: {
      textSpeed: 'normal',
      fontSize: 'normal',
      soundEnabled: false,
      autoSave: true,
      skipDiceAnimation: false,
      ...overrides.settings,
    },
    activeEnding: overrides.activeEnding ?? null,
  };
}
