export interface FactionDefinition {
  id: string;
  key: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  repLabels: Record<string, string>;
}

export const FACTIONS: FactionDefinition[] = [
  {
    id: 'ironSaints',
    key: 'ironSaints',
    name: 'The Iron Saints',
    subtitle: 'Order of Purification',
    description: 'Militarized religious survivors who believe suffering purifies humanity. They control the upper corridors and surface checkpoints. They hunt the mark.',
    color: '#c9982f',
    repLabels: {
      hostile: 'Condemned',
      unfriendly: 'Suspected',
      neutral: 'Registered',
      friendly: 'Tolerated',
      allied: 'Inducted',
    },
  },
  {
    id: 'glassCourt',
    key: 'glassCourt',
    name: 'The Glass Court',
    subtitle: 'The Sealed Towers',
    description: 'Wealthy elites living in sealed towers above the ruined city. They collect power and information. They know about the mark — and they want it.',
    color: '#4fc3f7',
    repLabels: {
      hostile: 'Threat',
      unfriendly: 'Asset',
      neutral: 'Person of Interest',
      friendly: 'Contracted',
      allied: 'Favored',
    },
  },
  {
    id: 'hollowChildren',
    key: 'hollowChildren',
    name: 'The Hollow Children',
    subtitle: 'The Underground Network',
    description: 'Abandoned youths who control the tunnel networks, traps, and black markets. They survive by knowing everything and selling selectively.',
    color: '#66bb6a',
    repLabels: {
      hostile: 'Hunted',
      unfriendly: 'Unknown',
      neutral: 'Outsider',
      friendly: 'Trusted',
      allied: 'One of Us',
    },
  },
  {
    id: 'redChoir',
    key: 'redChoir',
    name: 'The Red Choir',
    subtitle: 'The Infected',
    description: 'People who share a strange psychic song. Infected by something connected to the blackout. They are drawn to the mark.',
    color: '#ef5350',
    repLabels: {
      hostile: 'Silenced',
      unfriendly: 'Dissonant',
      neutral: 'Unheard',
      friendly: 'Resonant',
      allied: 'Chorus',
    },
  },
  {
    id: 'lastArchive',
    key: 'lastArchive',
    name: 'The Last Archive',
    subtitle: 'Keepers of Forbidden Knowledge',
    description: 'Scholars preserving forbidden knowledge beneath the city. They built their vault around the source of the blackout — and around whatever put the mark on your wrist.',
    color: '#9b59b6',
    repLabels: {
      hostile: 'Forbidden',
      unfriendly: 'Unverified',
      neutral: 'Subject',
      friendly: 'Student',
      allied: 'Keeper',
    },
  },
];

export function getRepLabel(faction: FactionDefinition, rep: number): string {
  if (rep < -20) return faction.repLabels['hostile'] || 'Hostile';
  if (rep < 0) return faction.repLabels['unfriendly'] || 'Unfriendly';
  if (rep < 20) return faction.repLabels['neutral'] || 'Neutral';
  if (rep < 50) return faction.repLabels['friendly'] || 'Friendly';
  return faction.repLabels['allied'] || 'Allied';
}
