export interface CompanionDefinition {
  id: string;
  name: string;
  title: string;
  description: string;
  secret: string;
  color: string;
  trustLabels: Record<string, string>;
}

export const COMPANIONS: Record<string, CompanionDefinition> = {
  mira: {
    id: 'mira',
    name: 'Mira',
    title: 'Street Medic',
    description: 'A street medic who survived the blackout by staying underground. Efficient, careful, and guarded. She knows more about the mark than she admits.',
    secret: 'She was part of the Last Archive before the collapse. She knows what the mark means — and what it will cost.',
    color: '#9b59b6',
    trustLabels: {
      '0': 'Stranger',
      '1': 'Cautious',
      '3': 'Neutral',
      '5': 'Trusting',
      '7': 'Loyal',
      '10': 'Devoted',
    },
  },
  cain: {
    id: 'cain',
    name: 'Cain',
    title: 'Ex-Iron Saints Soldier',
    description: 'A former Iron Saints soldier who left after learning what the order truly is. Tactical, cold, effective. He may protect you or sell you out — it depends entirely on what you offer him.',
    secret: 'He has a contact in the Glass Court. He\'s weighing whether you\'re worth more alive and free, or alive and delivered.',
    color: '#e67e22',
    trustLabels: {
      '0': 'Suspicious',
      '1': 'Wary',
      '3': 'Calculating',
      '5': 'Reliable',
      '7': 'Loyal',
      '10': 'Sworn',
    },
  },
};

export function getTrustLabel(companionId: string, trust: number): string {
  const companion = COMPANIONS[companionId];
  if (!companion) return 'Unknown';
  const thresholds = [0, 1, 3, 5, 7, 10];
  let label = companion.trustLabels['0'];
  for (const t of thresholds) {
    if (trust >= t) label = companion.trustLabels[t.toString()];
  }
  return label;
}
