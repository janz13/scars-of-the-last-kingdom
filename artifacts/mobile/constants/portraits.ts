/**
 * Character Portrait Registry & Procedural 16-Bit Pixel-Art Portrait Matrices
 *
 * Implements Phase B5:
 * - 13 major characters & mark-bearer archetypes:
 *   1. Mira
 *   2. Cain
 *   3. Velna
 *   4. Varr
 *   5. Sera
 *   6. Mael
 *   7. Vorn
 *   8. Masked Heir
 *   9. Pale Curator
 *   10. Veyra
 *   11. Orphan Mark-Bearer
 *   12. Soldier Mark-Bearer
 *   13. Scholar Mark-Bearer
 * - 3 expressions per character (`neutral`, `strained`, `resolved`) = 39 total portraits.
 * - Drawn on a crisp 16×16 pixel grid scaled integer 8× to 128×128 native art pixels.
 */

export type CharacterId =
  | 'mira'
  | 'cain'
  | 'velna'
  | 'varr'
  | 'sera'
  | 'mael'
  | 'vorn'
  | 'masked_heir'
  | 'pale_curator'
  | 'veyra'
  | 'orphan_mark_bearer'
  | 'soldier_mark_bearer'
  | 'scholar_mark_bearer';

export type PortraitExpression = 'neutral' | 'strained' | 'resolved';

export interface CharacterPortraitMetadata {
  id: CharacterId;
  displayName: string;
  title: string;
  factionColor: string;
  accentColor: string;
  skinTone: string;
  shadowTone: string;
  hairOrHelm: string;
  eyeColor: string;
  garbPrimary: string;
  garbSecondary: string;
  featureType: 'hood' | 'scar' | 'visor' | 'crown' | 'veil' | 'goggles' | 'collar' | 'mask' | 'monocle';
}

export const CHARACTER_PORTRAIT_CATALOG: Record<CharacterId, CharacterPortraitMetadata> = {
  mira: {
    id: 'mira',
    displayName: 'Mira',
    title: 'Underground Medic',
    factionColor: '#9b59b6',
    accentColor: '#e29cfc',
    skinTone: '#d4a88c',
    shadowTone: '#8a5e48',
    hairOrHelm: '#2c1e38',
    eyeColor: '#b062d4',
    garbPrimary: '#342246',
    garbSecondary: '#6c4684',
    featureType: 'hood',
  },
  cain: {
    id: 'cain',
    displayName: 'Cain',
    title: 'Exiled Vanguard',
    factionColor: '#e67e22',
    accentColor: '#f89824',
    skinTone: '#c49272',
    shadowTone: '#784e36',
    hairOrHelm: '#282220',
    eyeColor: '#e27e56',
    garbPrimary: '#3d1810',
    garbSecondary: '#8e3a2a',
    featureType: 'scar',
  },
  velna: {
    id: 'velna',
    displayName: 'Velna',
    title: 'Signal Surveyor',
    factionColor: '#c6ab5a',
    accentColor: '#e29cfc',
    skinTone: '#b89882',
    shadowTone: '#6e5444',
    hairOrHelm: '#4a4452',
    eyeColor: '#e29cfc',
    garbPrimary: '#342910',
    garbSecondary: '#6a5a2a',
    featureType: 'goggles',
  },
  varr: {
    id: 'varr',
    displayName: 'Commander Varr',
    title: 'Iron Saints Marshal',
    factionColor: '#b85438',
    accentColor: '#e27e56',
    skinTone: '#b68668',
    shadowTone: '#68422c',
    hairOrHelm: '#444458',
    eyeColor: '#d85012',
    garbPrimary: '#1f0c08',
    garbSecondary: '#68281a',
    featureType: 'visor',
  },
  sera: {
    id: 'sera',
    displayName: 'Lady Sera',
    title: 'Glass Court Envoy',
    factionColor: '#3e8094',
    accentColor: '#6ac0d6',
    skinTone: '#ded4ce',
    shadowTone: '#8e8488',
    hairOrHelm: '#b0bac8',
    eyeColor: '#6ac0d6',
    garbPrimary: '#102832',
    garbSecondary: '#2a5a6a',
    featureType: 'crown',
  },
  mael: {
    id: 'mael',
    displayName: 'Cantor Mael',
    title: 'Red Choir Voice',
    factionColor: '#aa2a52',
    accentColor: '#d84c78',
    skinTone: '#c8a29c',
    shadowTone: '#7a4e52',
    hairOrHelm: '#320a16',
    eyeColor: '#d84c78',
    garbPrimary: '#320a16',
    garbSecondary: '#7a1a3a',
    featureType: 'veil',
  },
  vorn: {
    id: 'vorn',
    displayName: 'Keeper Vorn',
    title: 'Hollow Children Elder',
    factionColor: '#506e3a',
    accentColor: '#a4c47e',
    skinTone: '#b6a080',
    shadowTone: '#64503c',
    hairOrHelm: '#6e6e84',
    eyeColor: '#a4c47e',
    garbPrimary: '#1e2e1a',
    garbSecondary: '#344a28',
    featureType: 'collar',
  },
  masked_heir: {
    id: 'masked_heir',
    displayName: 'The Masked Heir',
    title: 'Claimant of the Ash Throne',
    factionColor: '#c6ab5a',
    accentColor: '#f89824',
    skinTone: '#947e3c',
    shadowTone: '#4e3e1c',
    hairOrHelm: '#1c1608',
    eyeColor: '#f89824',
    garbPrimary: '#1c1608',
    garbSecondary: '#6a5a2a',
    featureType: 'mask',
  },
  pale_curator: {
    id: 'pale_curator',
    displayName: 'The Pale Curator',
    title: 'Last Archive Warden',
    factionColor: '#947e3c',
    accentColor: '#c6ab5a',
    skinTone: '#dedee8',
    shadowTone: '#6e6e84',
    hairOrHelm: '#a2a2b8',
    eyeColor: '#c6ab5a',
    garbPrimary: '#161622',
    garbSecondary: '#4e3e1c',
    featureType: 'monocle',
  },
  veyra: {
    id: 'veyra',
    displayName: 'Veyra',
    title: 'Black Market Broker',
    factionColor: '#7d3c98',
    accentColor: '#b062d4',
    skinTone: '#ba8c70',
    shadowTone: '#6c4834',
    hairOrHelm: '#18040a',
    eyeColor: '#b062d4',
    garbPrimary: '#161622',
    garbSecondary: '#42124e',
    featureType: 'hood',
  },
  orphan_mark_bearer: {
    id: 'orphan_mark_bearer',
    displayName: 'Tunnel Mark-Bearer',
    title: 'Wasteland Survivor',
    factionColor: '#749652',
    accentColor: '#e29cfc',
    skinTone: '#c69e82',
    shadowTone: '#785640',
    hairOrHelm: '#261e16',
    eyeColor: '#e29cfc',
    garbPrimary: '#261e16',
    garbSecondary: '#423426',
    featureType: 'hood',
  },
  soldier_mark_bearer: {
    id: 'soldier_mark_bearer',
    displayName: 'Vanguard Mark-Bearer',
    title: 'Exiled Soldier',
    factionColor: '#8e3a2a',
    accentColor: '#e29cfc',
    skinTone: '#be9072',
    shadowTone: '#704a34',
    hairOrHelm: '#282838',
    eyeColor: '#e29cfc',
    garbPrimary: '#282838',
    garbSecondary: '#4c5c76',
    featureType: 'scar',
  },
  scholar_mark_bearer: {
    id: 'scholar_mark_bearer',
    displayName: 'Archive Mark-Bearer',
    title: 'Forgotten Scholar',
    factionColor: '#947e3c',
    accentColor: '#e29cfc',
    skinTone: '#d0b098',
    shadowTone: '#80624e',
    hairOrHelm: '#342910',
    eyeColor: '#e29cfc',
    garbPrimary: '#1c1608',
    garbSecondary: '#4e3e1c',
    featureType: 'goggles',
  },
};

export const ALL_CHARACTER_IDS: CharacterId[] = Object.keys(CHARACTER_PORTRAIT_CATALOG) as CharacterId[];
export const ALL_EXPRESSIONS: PortraitExpression[] = ['neutral', 'strained', 'resolved'];

/**
 * Resolves a speaker string from StoryNode (e.g. "Mira", "Commander Varr", "Pale Curator")
 * to its canonical CharacterId, or null if not a portrait-enabled speaker.
 */
export function resolveSpeakerCharacterId(speaker?: string): CharacterId | null {
  if (!speaker) return null;
  const norm = speaker.trim().toLowerCase();
  if (norm.includes('mira')) return 'mira';
  if (norm.includes('cain')) return 'cain';
  if (norm.includes('velna')) return 'velna';
  if (norm.includes('varr')) return 'varr';
  if (norm.includes('sera')) return 'sera';
  if (norm.includes('mael')) return 'mael';
  if (norm.includes('vorn')) return 'vorn';
  if (norm.includes('heir')) return 'masked_heir';
  if (norm.includes('curator')) return 'pale_curator';
  if (norm.includes('veyra')) return 'veyra';
  if (norm.includes('orphan')) return 'orphan_mark_bearer';
  if (norm.includes('soldier')) return 'soldier_mark_bearer';
  if (norm.includes('scholar')) return 'scholar_mark_bearer';
  return null;
}

/**
 * Generates a deterministic 16×16 pixel-art color grid (hex strings) for any of the
 * 13 characters × 3 expressions × blink/talk states.
 * When rendered at 8× integer scale, produces a crisp 128×128 portrait.
 */
export function buildPortraitPixelGrid(
  characterId: CharacterId,
  expression: PortraitExpression = 'neutral',
  isBlinking: boolean = false,
  isMouthOpen: boolean = false
): string[][] {
  const meta = CHARACTER_PORTRAIT_CATALOG[characterId] ?? CHARACTER_PORTRAIT_CATALOG.mira;
  const bg = '#080612';
  const frame = meta.factionColor;
  const grid: string[][] = Array.from({ length: 16 }, () => Array(16).fill(bg));

  // Outer pixel border frame with corner studs
  for (let i = 0; i < 16; i++) {
    grid[0]![i] = frame;
    grid[15]![i] = frame;
    grid[i]![0] = frame;
    grid[i]![15] = frame;
  }
  grid[1]![1] = meta.accentColor;
  grid[1]![14] = meta.accentColor;
  grid[14]![1] = meta.accentColor;
  grid[14]![14] = meta.accentColor;

  // Shoulders & garb (rows 11..14, cols 3..12)
  for (let y = 11; y <= 14; y++) {
    for (let x = 3; x <= 12; x++) {
      grid[y]![x] = (x + y) % 2 === 0 ? meta.garbPrimary : meta.garbSecondary;
    }
  }
  // Collar highlight
  grid[11]![7] = meta.accentColor;
  grid[11]![8] = meta.accentColor;

  // Head silhouette (rows 4..10, cols 5..10)
  for (let y = 4; y <= 10; y++) {
    for (let x = 5; x <= 10; x++) {
      grid[y]![x] = x >= 9 || y === 10 ? meta.shadowTone : meta.skinTone;
    }
  }

  // Hair / Helm / Crown / Hood (rows 2..5, cols 4..11)
  for (let x = 4; x <= 11; x++) {
    grid[2]![x] = meta.hairOrHelm;
    grid[3]![x] = meta.hairOrHelm;
  }
  grid[4]![4] = meta.hairOrHelm;
  grid[4]![11] = meta.hairOrHelm;
  grid[5]![4] = meta.hairOrHelm;
  grid[5]![11] = meta.hairOrHelm;

  // Character-specific headgear/features
  if (meta.featureType === 'crown') {
    grid[2]![5] = meta.accentColor;
    grid[2]![8] = meta.accentColor;
    grid[2]![10] = meta.accentColor;
  } else if (meta.featureType === 'goggles') {
    grid[4]![6] = meta.accentColor;
    grid[4]![9] = meta.accentColor;
  } else if (meta.featureType === 'visor') {
    for (let x = 5; x <= 10; x++) grid[5]![x] = meta.garbSecondary;
  } else if (meta.featureType === 'mask') {
    for (let y = 6; y <= 10; y++) {
      for (let x = 5; x <= 10; x++) {
        grid[y]![x] = meta.accentColor;
      }
    }
  } else if (meta.featureType === 'scar') {
    grid[5]![9] = '#8e3a2a';
    grid[7]![9] = '#8e3a2a';
    grid[8]![9] = '#8e3a2a';
  } else if (meta.featureType === 'veil') {
    for (let y = 8; y <= 10; y++) {
      for (let x = 5; x <= 10; x++) {
        grid[y]![x] = meta.garbSecondary;
      }
    }
  }

  // Brow line based on expression
  if (expression === 'strained') {
    grid[5]![6] = meta.shadowTone;
    grid[5]![9] = meta.shadowTone;
  } else if (expression === 'resolved') {
    grid[5]![5] = meta.hairOrHelm;
    grid[5]![10] = meta.hairOrHelm;
  }

  // Eyes (row 6, cols 6 & 9)
  const eyeLeft = isBlinking ? meta.shadowTone : meta.eyeColor;
  const eyeRight = isBlinking ? meta.shadowTone : meta.eyeColor;
  grid[6]![6] = eyeLeft;
  grid[6]![9] = eyeRight;

  // Mouth (row 9, cols 7..8)
  if (meta.featureType !== 'veil') {
    if (isMouthOpen) {
      grid[8]![7] = '#18040a';
      grid[8]![8] = '#18040a';
      grid[9]![7] = meta.shadowTone;
      grid[9]![8] = meta.shadowTone;
    } else if (expression === 'strained') {
      grid[9]![6] = '#18040a';
      grid[9]![7] = '#18040a';
      grid[9]![8] = '#18040a';
    } else if (expression === 'resolved') {
      grid[9]![7] = meta.shadowTone;
      grid[9]![8] = meta.accentColor;
    } else {
      grid[9]![7] = meta.shadowTone;
      grid[9]![8] = meta.shadowTone;
    }
  }

  return grid;
}
