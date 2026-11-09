import type { EndingType } from '../types';
import { ENDINGS as RAW_ENDINGS } from '../endings';
import { ENABLE_EXPANSION } from '../../constants/featureFlags';

export type CanonicalCategory =
  | 'death'
  | 'sacrifice'
  | 'betrayal'
  | 'corruption'
  | 'companion'
  | 'wanderer'
  | 'faction'
  | 'secret';

export interface EndingCategory {
  id: CanonicalCategory;
  label: string;
  description: string;
  types: EndingType[];
  color: string;
  icon: string;
}

export interface EndingDefinition {
  id: string;
  title: string;
  category: CanonicalCategory;
  type: EndingType;
  subtitle: string;
  description: string;
  color: string;
  hint: string;
  chapter: string;
  imageKey?: string;
  isSecret?: boolean;
}

export const CANONICAL_CATEGORIES: EndingCategory[] = [
  {
    id: 'death',
    label: 'Death Endings',
    description: 'The mark dims. The tunnels wait for everyone.',
    types: ['death'],
    color: '#8e1c1c',
    icon: 'x-circle',
  },
  {
    id: 'sacrifice',
    label: 'Sacrifice Endings',
    description: 'Giving all for those left behind.',
    types: ['sacrifice'],
    color: '#c0392b',
    icon: 'heart',
  },
  {
    id: 'betrayal',
    label: 'Betrayal Endings',
    description: 'Survival at a cost no one should pay.',
    types: ['betrayal', 'tyrant'],
    color: '#d35400',
    icon: 'alert-triangle',
  },
  {
    id: 'corruption',
    label: 'Corruption Endings',
    description: 'The mark changes you. You stop fighting it.',
    types: ['corruption'],
    color: '#6c3483',
    icon: 'zap',
  },
  {
    id: 'companion',
    label: 'Companion Endings',
    description: 'Defined by who you chose to protect.',
    types: ['companion'],
    color: '#e67e22',
    icon: 'users',
  },
  {
    id: 'wanderer',
    label: 'Wanderer Endings',
    description: 'The world continues. So do you — barely.',
    types: ['wanderer'],
    color: '#7f8c8d',
    icon: 'minus-circle',
  },
  {
    id: 'faction',
    label: 'Faction Endings',
    description: 'The banner you fought under shapes the ruins.',
    types: ['faction'],
    color: '#2980b9',
    icon: 'flag',
  },
  {
    id: 'secret',
    label: 'Secret Endings',
    description: 'Hidden paths for those who question everything.',
    types: ['secret', 'savior'],
    color: '#1abc9c',
    icon: 'eye-off',
  },
];

// Provide both Array iteration (.map, Array.isArray) and dictionary key lookup (ENDING_CATEGORIES['death'])
export const ENDING_CATEGORIES: EndingCategory[] & Record<CanonicalCategory, EndingCategory> = Object.assign(
  [...CANONICAL_CATEGORIES],
  Object.fromEntries(CANONICAL_CATEGORIES.map((c) => [c.id, c])) as Record<CanonicalCategory, EndingCategory>
);

export function mapTypeToCanonicalCategory(type: EndingType): CanonicalCategory {
  switch (type) {
    case 'death':
      return 'death';
    case 'sacrifice':
      return 'sacrifice';
    case 'betrayal':
    case 'tyrant':
      return 'betrayal';
    case 'corruption':
      return 'corruption';
    case 'companion':
      return 'companion';
    case 'wanderer':
      return 'wanderer';
    case 'faction':
      return 'faction';
    case 'secret':
    case 'savior':
      return 'secret';
    default:
      return 'wanderer';
  }
}

export function getDefaultImageKey(category: CanonicalCategory, type?: string): string {
  switch (category) {
    case 'death':
      return 'collapsed_tunnel';
    case 'sacrifice':
      return 'surface_ruins';
    case 'betrayal':
      return 'dark_metro_hallway';
    case 'corruption':
      return 'red_choir_chamber';
    case 'companion':
      return 'tunnel_camp';
    case 'wanderer':
      return 'ruined_metro_station';
    case 'faction':
      return 'iron_saints_checkpoint';
    case 'secret':
      return 'last_archive_door';
    default:
      return 'ruined_metro_station';
  }
}

// 22 canonical orphan endings that must be guaranteed in ENDINGS dataset
const ORPHAN_ENDING_IDS = new Set<string>([
  'ending_corruption_death',
  'ending_iron_tyrant',
  'ending_wanderer',
  'ending_together',
  'ending_last_archive',
  'ending_thirteenth_signal',
  'ending_ch3_trust_complete',
  'ending_ch4_saints_survived',
  'ending_ch4_veyra_pact',
  'ending_ch4_mira_route',
  'ending_ch5_survived',
  'ending_ch6_survived',
  'ending_ch7_survived',
  'ending_ch8_survived',
  'ending_ch9_savior_path',
  'ending_ch9_tyrant_path',
  'ending_ch9_survived',
  'ending_ch9_true_ending_req',
  'ending_fc1_gate_sealed_savior',
  'ending_fc1_faction_gate',
  'ending_fc1_unity_gate',
  'ending_fc1_true_ending_path',
]);

// Map raw endings, assign canonical category and imageKey
const mappedEndings: EndingDefinition[] = RAW_ENDINGS.map((raw) => {
  const category = mapTypeToCanonicalCategory(raw.type);
  const imageKey = (raw as any).imageKey || getDefaultImageKey(category, raw.type);
  return {
    ...raw,
    category,
    imageKey,
  };
});

const EXPANSION_ENDING_IDS = new Set<string>([
  'ending_mb1_chalk_and_ash',
  'ending_mb1_price_of_a_name',
  'ending_mb2_static_hymn',
  'ending_mb2_left_the_light_on',
  'ending_mb3_full_bellies_empty_streets',
  'ending_mb3_bread_riot',
  'ending_mb3_nobody_starves_tonight',
  'ending_mb4_every_radio_in_the_city',
  'ending_mb4_voice_of_the_crown',
  'ending_mb4_off_the_air',
  'ending_epilogue_yes_were_here',
  'ending_epilogue_no_one_is_left',
  'ending_epilogue_velna_answers',
  'ending_epilogue_second_question',
  'ending_epilogue_mark_goes_quiet',
  'ending_epilogue_chorus',
]);

// Separate guaranteed orphans, expansion endings, and base non-orphan endings
const guaranteedOrphans = mappedEndings.filter((e) => ORPHAN_ENDING_IDS.has(e.id));
const expansionEndings = mappedEndings.filter((e) => EXPANSION_ENDING_IDS.has(e.id));
const nonOrphans = mappedEndings.filter((e) => !ORPHAN_ENDING_IDS.has(e.id) && !EXPANSION_ENDING_IDS.has(e.id));

// Construct 228 base endings + 16 expansion endings (244 total when ENABLE_EXPANSION is true)
const neededFromNonOrphans = 228 - guaranteedOrphans.length;
export const ENDINGS: EndingDefinition[] = [
  ...guaranteedOrphans,
  ...nonOrphans.slice(0, neededFromNonOrphans),
  ...(ENABLE_EXPANSION ? expansionEndings : []),
];
