import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  DICE CHECK OUTCOME NODES
//
//  These nodes are navigated to ONLY by diceCheck success/failure/crit paths.
//  Do NOT put them in a chapter file — keep them here.
//
//  HOW TO ADD DICE OUTCOME NODES:
//  1. Add your outcome node objects to the DICE_OUTCOME_NODES array below
//  2. Use the id convention: dice_<check_name>_fail / _crit_fail / _success / _crit_success
//  3. Point your diceCheck fields (successNode, failureNode, etc.) to these ids
//  4. Run: pnpm --filter @workspace/mobile run typecheck
// ══════════════════════════════════════════════════════════════════════════════

export const DICE_OUTCOME_NODES: StoryNode[] = [

  // ── force_door: Strength DC 13 ────────────────────────────────────────────
  {
    id: 'dice_force_door_fail',
    chapter: 'Chapter 1',
    title: 'A Cost for Every Door',
    location: 'Metro Concourse — North Wing',
    imageKey: 'ruined_metro_station',
    text: 'The door holds. You throw your shoulder into it again, harder. Something tears in your upper arm — a sound you feel before you hear it. On the third attempt the latch gives, but you\'re bleeding through your sleeve now, and whatever was quiet behind that door has heard every impact.',
    choices: [
      { id: 'dice_force_door_fail_continue', text: 'Enter. You didn\'t come this far to stop.', nextNode: 'cain_hostile_confrontation' },
    ],
  },
  {
    id: 'dice_force_door_crit_fail',
    chapter: 'Chapter 1',
    title: 'Too Much Noise',
    location: 'Metro Concourse — North Wing',
    imageKey: 'ruined_metro_station',
    text: 'The impact rings through the concourse like a bell. You\'ve made a sound that carries. Before you can recover, movement — boots on tile, coming fast from the east stairwell. Iron Saints, drawn by the noise. You have to move, and you have to move now.',
    choices: [
      { id: 'dice_force_door_crit_fail_flee', text: 'Run for the junction. Come back another way.', nextNode: 'station_junction', effects: { ironSaints: -5 } },
    ],
  },

  // ── negotiate_saints: Charisma DC 12 ──────────────────────────────────────
  {
    id: 'dice_negotiate_saints_fail',
    chapter: 'Chapter 1',
    title: 'They Don\'t Buy It',
    location: 'Metro Concourse — South Approach',
    imageKey: 'iron_saints_checkpoint',
    text: 'Your words land wrong — too rehearsed, too careful. The lead soldier\'s grip tightens on his rifle. He\'s not listening anymore; he\'s deciding. You have a half-second before this becomes a different kind of conversation. You keep talking. Something in your voice shifts, something unplanned. He doesn\'t lower the rifle, but he doesn\'t raise it either.',
    choices: [
      { id: 'dice_negotiate_saints_fail_continue', text: 'Keep talking. Find the opening.', nextNode: 'saints_negotiate_attempt' },
    ],
  },
  {
    id: 'dice_negotiate_saints_crit_fail',
    chapter: 'Chapter 1',
    title: 'Hands on the Wall',
    location: 'Metro Concourse — South Approach',
    imageKey: 'iron_saints_checkpoint',
    text: 'The wrong word. You\'ll know which one later, if there is a later. The lead soldier moves — not to restrain you, but to hurt you first. You take the hit, which is the only reason you\'re still standing when you run. The tunnel junction is thirty meters away and you make it, but your ribs are singing and you can taste blood.',
    choices: [
      { id: 'dice_negotiate_saints_crit_fail_flee', text: 'Into the tunnel. Don\'t stop.', nextNode: 'saints_escape' },
    ],
  },

  // ── force_through_strength: Strength DC 14 ────────────────────────────────
  {
    id: 'dice_tunnel_flood_fail',
    chapter: 'Chapter 1',
    title: 'The Current Has a Say',
    location: 'Maintenance Tunnel — Lower Level',
    imageKey: 'dark_metro_hallway',
    text: 'You push into the torrent and it shoves back. For three seconds you\'re going nowhere, chest burning, boots finding nothing solid. Then you find the wall with your palm, use it, and drag yourself through the gap a meter at a time. You make it. You\'re also bleeding from somewhere you can\'t see in the dark.',
    choices: [
      { id: 'dice_tunnel_flood_fail_continue', text: 'Keep moving. Deal with the bleeding later.', nextNode: 'tunnel_flood_survive' },
    ],
  },
  {
    id: 'dice_tunnel_flood_crit_fail',
    chapter: 'Chapter 1',
    title: 'Under',
    location: 'Maintenance Tunnel — Lower Level',
    imageKey: 'dark_metro_hallway',
    text: 'The current takes you. For four seconds — or maybe ten — you are entirely at the mercy of water that does not know your name. You come up against a grate, catch it, hold. The tunnel is still. You are on the wrong side of the flood, shaking, and significantly worse off than when you started. But you\'re breathing.',
    choices: [
      { id: 'dice_tunnel_flood_crit_fail_continue', text: 'Breathe. Then move.', nextNode: 'tunnel_flood_survive' },
    ],
  },

  // ── force_passage_open: Strength DC 11 ───────────────────────────────────
  {
    id: 'dice_passage_force_fail',
    chapter: 'Chapter 1',
    title: 'Softer Than It Looked',
    location: 'Metro Concourse — Hidden Passage',
    imageKey: 'dark_metro_hallway',
    text: 'The mortar crumbles wrong — a chunk of it comes back toward your face and you take it on the cheekbone. You blink the stars out, palm bleeding, passage open in front of you. The symbol on the wall is now half-obscured by rubble. You step through anyway.',
    choices: [
      { id: 'dice_passage_force_fail_continue', text: 'Step through into what\'s beyond.', nextNode: 'archive_antechamber' },
    ],
  },
  {
    id: 'dice_passage_force_crit_fail',
    chapter: 'Chapter 1',
    title: 'The Wall Answers',
    location: 'Metro Concourse — Hidden Passage',
    imageKey: 'dark_metro_hallway',
    text: 'The wall caves inward more than expected. The section above it follows. You\'re in the dark for a moment that stretches. When it\'s over you\'re on the other side, covered in lime dust and something warm running into your eye. The mark on your wrist pulses once — brighter than it should be. Like it noticed.',
    choices: [
      { id: 'dice_passage_force_crit_fail_continue', text: 'You\'re through. That\'s what matters.', nextNode: 'archive_antechamber' },
    ],
  },

  // ── negotiate_glass_court: Charisma DC 13 ─────────────────────────────────
  {
    id: 'dice_glass_court_negotiate_fail',
    chapter: 'Chapter 1',
    title: 'Not Quite Enough',
    location: 'Glass Court — Outer Perimeter',
    imageKey: 'dark_metro_hallway',
    text: 'Your argument is good. It\'s almost good enough. The researcher\'s expression moves through three emotions in two seconds — consideration, doubt, and then the careful neutrality of someone who has decided to proceed with caution rather than be wrong. They let you through, but they\'ve noted you. Someone will be watching.',
    choices: [
      { id: 'dice_glass_court_negotiate_fail_continue', text: 'Take the entry and keep your face calm.', nextNode: 'glass_court_ambush' },
    ],
  },
  {
    id: 'dice_glass_court_negotiate_crit_fail',
    chapter: 'Chapter 1',
    title: 'Wrong Room, Wrong Words',
    location: 'Glass Court — Outer Perimeter',
    imageKey: 'dark_metro_hallway',
    text: 'You say the wrong thing — not dramatically wrong, just specifically wrong, as if you\'d read a description of this place and missed the subtext. The researcher\'s posture closes. Security is called. You have thirty seconds before this becomes formal. You don\'t wait for it to become formal.',
    choices: [
      { id: 'dice_glass_court_negotiate_crit_fail_flee', text: 'Walk out. Fast but not running.', nextNode: 'station_junction', effects: { glassCourt: -10 } },
    ],
  },

  // ── c2_sneak_patrol_gap: Agility DC 12 ───────────────────────────────────
  {
    id: 'dice_c2_patrol_sneak_fail',
    chapter: 'Chapter 2',
    title: 'Almost',
    location: 'City Surface — Junction 4-C',
    imageKey: 'ruined_street',
    text: 'You move through the gap and immediately know it was wrong — the timing was off by three seconds. A Saint turns. You\'re already moving sideways, into the shadow of a collapsed awning, and the Saint doesn\'t quite see you, but they slow down. You press against the rubble and wait, breathing through your nose, until they move on. Your leg is cut from the rebar. The northern route is closed now.',
    choices: [
      { id: 'dice_c2_patrol_sneak_fail_continue', text: 'Head west instead. The market district.', nextNode: 'c2_hollow_market_rumor' },
    ],
  },
  {
    id: 'dice_c2_patrol_sneak_crit_fail',
    chapter: 'Chapter 2',
    title: 'Seen',
    location: 'City Surface — Junction 4-C',
    imageKey: 'saints_patrol',
    text: 'A Saint shouts. Not a question — an identification. You run. Three of them follow you for two blocks before you lose them in a collapsed apartment building, moving through rooms without floors until the sound of boots fades. You\'re west of the junction now, bleeding, and the Iron Saints in this district have your silhouette.',
    choices: [
      { id: 'dice_c2_patrol_sneak_crit_fail_continue', text: 'Find cover in the market district.', nextNode: 'c2_hollow_market_rumor' },
    ],
  },
];
