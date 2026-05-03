export type BackgroundId =
  | 'wasteland_orphan'
  | 'fallen_noble'
  | 'underground_medic'
  | 'exiled_soldier'
  | 'black_market_courier'
  | 'forgotten_scholar'
  | 'runaway_experiment';

export type ClassId =
  | 'blade_survivor'
  | 'gun_scavenger'
  | 'medic'
  | 'tactician'
  | 'relic_hunter'
  | 'shadow_broker'
  | 'esper';

export type PersonalityTrait =
  | 'pragmatic'
  | 'empathetic'
  | 'cold'
  | 'reckless'
  | 'calculating'
  | 'faithful'
  | 'cynical';

export type CompanionChoice = 'mira' | 'cain' | 'none';

export type EndingType =
  | 'death'
  | 'betrayal'
  | 'sacrifice'
  | 'tyrant'
  | 'savior'
  | 'companion'
  | 'faction'
  | 'secret'
  | 'corruption'
  | 'wanderer';

export type GameScreen =
  | 'mainMenu'
  | 'characterCreator'
  | 'game'
  | 'stats'
  | 'inventory'
  | 'companions'
  | 'factions'
  | 'history'
  | 'ending'
  | 'settings'
  | 'developer'
  | 'chapterRoadmap'
  | 'routeCodex';

export interface Character {
  name: string;
  background: BackgroundId;
  characterClass: ClassId;
  personalityTrait: PersonalityTrait;
  startingCompanion: CompanionChoice;
}

export interface Stats {
  health: number;
  maxHealth: number;
  hunger: number;
  thirst: number;
  morale: number;
  trust: number;
  strength: number;
  intelligence: number;
  agility: number;
  charisma: number;
  luck: number;
  corruption: number;
}

export interface Inventory {
  food: number;
  water: number;
  medicine: number;
  scrap: number;
  ammo: number;
  relics: number;
  reputation: number;
}

export interface CompanionState {
  present: boolean;
  trust: number;
  alive: boolean;
}

export interface FactionRep {
  ironSaints: number;
  glassCourt: number;
  hollowChildren: number;
  redChoir: number;
  lastArchive: number;
}

export interface RouteEntry {
  nodeId: string;
  nodeTitle: string;
  choiceText: string;
  timestamp: number;
}

export interface GameSettings {
  textSpeed: 'slow' | 'normal' | 'fast';
  soundEnabled: boolean;
  autoSave: boolean;
  skipDiceAnimation: boolean;
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
export type DiceStat = 'strength' | 'intelligence' | 'agility' | 'charisma' | 'luck';

export interface DiceCheck {
  stat: DiceStat;
  difficulty: number;
  diceType: DiceType;
  successNode: string;
  failureNode: string;
  criticalSuccessNode?: string;
  criticalFailureNode?: string;
  successEffects?: ChoiceEffects;
  failureEffects?: ChoiceEffects;
  criticalSuccessEffects?: ChoiceEffects;
  criticalFailureEffects?: ChoiceEffects;
}

export interface CompanionPair {
  mira: CompanionState;
  cain: CompanionState;
}

export interface ChoiceEffects {
  health?: number;
  hunger?: number;
  thirst?: number;
  morale?: number;
  trust?: number;
  strength?: number;
  intelligence?: number;
  agility?: number;
  charisma?: number;
  luck?: number;
  corruption?: number;
  food?: number;
  water?: number;
  medicine?: number;
  scrap?: number;
  ammo?: number;
  relics?: number;
  reputation?: number;
  miraTrust?: number;
  cainTrust?: number;
  ironSaints?: number;
  glassCourt?: number;
  hollowChildren?: number;
  redChoir?: number;
  lastArchive?: number;
  setFlags?: string[];
  removeFlags?: string[];
}

export interface ChoiceRequirements {
  health?: number;
  hunger?: number;
  thirst?: number;
  morale?: number;
  trust?: number;
  strength?: number;
  intelligence?: number;
  agility?: number;
  charisma?: number;
  luck?: number;
  corruption?: number;
  /** Blocked if corruption is >= this value — use for compassionate/emotional choices */
  maxCorruption?: number;
  /** Blocked if morale is >= this value — use for desperate/dark choices only available at low morale */
  maxMorale?: number;
  food?: number;
  water?: number;
  medicine?: number;
  scrap?: number;
  ammo?: number;
  relics?: number;
  flags?: string[];
  blockedFlags?: string[];
  classes?: ClassId[];
  backgrounds?: BackgroundId[];
  miraTrust?: number;
  cainTrust?: number;
  miraPresent?: boolean;
  cainPresent?: boolean;
  factionRep?: Partial<FactionRep>;
}

export interface Choice {
  id: string;
  text: string;
  nextNode: string;
  effects?: ChoiceEffects;
  requirements?: ChoiceRequirements;
  isHidden?: boolean;
  endingTrigger?: string;
  endingCondition?: (state: GameState) => boolean;
  flavorText?: string;
  diceCheck?: DiceCheck;
}

export interface StoryNode {
  id: string;
  chapter: string;
  title: string;
  location: string;
  imageKey: string;
  speaker?: string;
  text: string;
  dialogue?: string;
  effectsOnEnter?: ChoiceEffects;
  choices: Choice[];
  isEnding?: boolean;
  endingType?: EndingType;
  endingId?: string;
}

export interface GameState {
  screen: GameScreen;
  character: Character | null;
  stats: Stats;
  inventory: Inventory;
  currentNodeId: string;
  flags: Record<string, boolean>;
  companions: CompanionPair;
  factionRep: FactionRep;
  routeHistory: RouteEntry[];
  endingsDiscovered: string[];
  settings: GameSettings;
  activeEnding: string | null;
  /** Set before redirecting to a hallucination node; cleared on __return__ */
  pendingReturnNodeId?: string;
}
