import type { MiraStage, CainStage } from './types';

// ── Companion definitions ─────────────────────────────────────────────────────

export interface CompanionDefinition {
  id: string;
  name: string;
  title: string;
  description: string;
  secret: string;
  color: string;
  accentColor: string;
  /** Legacy trust labels used as fallback */
  trustLabels: Record<string, string>;
}

export const COMPANIONS: Record<string, CompanionDefinition> = {
  mira: {
    id: 'mira',
    name: 'Mira',
    title: 'Street Medic — Last Archive Survivor',
    description:
      'A street medic who survived the blackout by staying underground. Efficient, careful, and guarded. She knows more about the mark than she admits.',
    secret:
      'She was part of the Last Archive before the collapse. She knows what the mark means — and what it will cost.',
    color: '#9b59b6',
    accentColor: '#c39bd3',
    trustLabels: {
      '0': 'Suspicious',
      '2': 'Cautious',
      '4': 'Trusting',
      '6': 'Loyal',
      '8': 'Devoted',
    },
  },
  cain: {
    id: 'cain',
    name: 'Cain',
    title: 'Ex-Iron Saints Soldier',
    description:
      'A former Iron Saints soldier who left after learning what the order truly is. Tactical, cold, effective. He may protect you or sell you out — it depends entirely on what you offer him.',
    secret:
      'He has a contact in the Glass Court. He\'s weighing whether you\'re worth more alive and free, or alive and delivered.',
    color: '#e67e22',
    accentColor: '#f0a050',
    trustLabels: {
      '0': 'Cold',
      '2': 'Respectful',
      '4': 'Protective',
      '6': 'Loyal',
      '8': 'Sworn',
    },
  },
};

// ── Relationship stage info ───────────────────────────────────────────────────

export interface StageInfo {
  label: string;
  shortLabel: string;
  description: string;
  color: string;
}

export const MIRA_STAGES: Record<MiraStage, StageInfo> = {
  suspicious: {
    label: 'Suspicious',
    shortLabel: 'Suspicious',
    description: 'She is watching you without trusting what she sees. Her guard is up and she means to keep it there.',
    color: '#8e1c1c',
  },
  cautious: {
    label: 'Cautious',
    shortLabel: 'Cautious',
    description: 'She is beginning to see that you\'re not the worst option available. That isn\'t the same as trust.',
    color: '#c0392b',
  },
  trusting: {
    label: 'Trusting',
    shortLabel: 'Trusting',
    description: 'She tells you things she wouldn\'t tell a stranger. She moves through the tunnels with you instead of behind you.',
    color: '#e67e22',
  },
  loyal: {
    label: 'Loyal',
    shortLabel: 'Loyal',
    description: 'She has decided you\'re worth the risk. She acts on it before she\'s asked to.',
    color: '#f39c12',
  },
  devoted: {
    label: 'Devoted',
    shortLabel: 'Devoted',
    description: 'She knows who you are at your worst and she\'s still here. That\'s a choice she makes every day.',
    color: '#9b59b6',
  },
  broken: {
    label: 'Broken',
    shortLabel: 'Broken',
    description: 'You had her trust and you spent it on something she can\'t reconcile. She follows because there\'s no other option — not because she believes in you.',
    color: '#4a3050',
  },
  betrayer: {
    label: 'Betrayer',
    shortLabel: 'Betrayer',
    description: 'She made a calculation. You were on the wrong side of it.',
    color: '#2c1a1a',
  },
  sacrifice_route: {
    label: 'Sacrifice Route',
    shortLabel: 'Willing',
    description: 'She has already decided. She is waiting for the door that asks for what she has decided to give.',
    color: '#c39bd3',
  },
};

export const CAIN_STAGES: Record<CainStage, StageInfo> = {
  cold: {
    label: 'Cold',
    shortLabel: 'Cold',
    description: 'He is assessing whether you are worth the resources it costs to keep you alive. The assessment is ongoing.',
    color: '#4a5a6e',
  },
  respectful: {
    label: 'Respectful',
    shortLabel: 'Respectful',
    description: 'You have demonstrated enough competence that he has stopped looking for a way out of the arrangement.',
    color: '#7f8c8d',
  },
  protective: {
    label: 'Protective',
    shortLabel: 'Protective',
    description: 'He moves to cover you before you ask. He doesn\'t acknowledge this as anything other than tactical.',
    color: '#e67e22',
  },
  loyal: {
    label: 'Loyal',
    shortLabel: 'Loyal',
    description: 'He has made a choice. He doesn\'t discuss it, but his choices make it clear every day.',
    color: '#d35400',
  },
  ruthless: {
    label: 'Ruthless',
    shortLabel: 'Ruthless',
    description: 'He approves of the methods. He has started making suggestions that go further than you\'ve asked. Watch where this goes.',
    color: '#922b21',
  },
  rival: {
    label: 'Rival',
    shortLabel: 'Rival',
    description: 'You have had the confrontation. He is still here — but the dynamic has shifted. He watches your decisions the way an opponent watches an opponent.',
    color: '#1a3a4a',
  },
  betrayer: {
    label: 'Betrayer',
    shortLabel: 'Betrayer',
    description: 'He ran the numbers. You came out short.',
    color: '#1a1a2a',
  },
  last_stand_route: {
    label: 'Last Stand Route',
    shortLabel: 'Last Stand',
    description: 'He has decided that if it ends, he wants it to mean something. He hasn\'t said this. He doesn\'t need to.',
    color: '#c39bd3',
  },
};

// ── Helper functions ──────────────────────────────────────────────────────────

export function getTrustLabel(companionId: string, trust: number): string {
  const companion = COMPANIONS[companionId];
  if (!companion) return 'Unknown';
  const thresholds = [0, 2, 4, 6, 8];
  let label = Object.values(companion.trustLabels)[0];
  for (const t of thresholds) {
    const entry = companion.trustLabels[t.toString()];
    if (entry && trust >= t) label = entry;
  }
  return label;
}

export function getMiraStageInfo(stage: MiraStage): StageInfo {
  return MIRA_STAGES[stage];
}

export function getCainStageInfo(stage: CainStage): StageInfo {
  return CAIN_STAGES[stage];
}
