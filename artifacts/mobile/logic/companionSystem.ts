import type { GameState, MiraStage, CainStage } from '../data/types';

// ══════════════════════════════════════════════════════════════════════════════
//  COMPANION SYSTEM
//
//  Relationship stages are derived from trust + flags — they are never stored
//  directly in GameState. Call getMiraStage / getCainStage wherever you need
//  the current relationship state.
//
//  Companion events are one-shot interstitial nodes that fire when specific
//  conditions are met. Each event sets a "<event_id>_seen" flag to prevent
//  repeating. The game uses the same __return__ sentinel as hallucinations, and
//  companion_event_active flag to let the UI know an event is running.
//
//  HOW TO ADD A NEW COMPANION:
//  1. Add its stage type to data/types.ts
//  2. Add getXStage() and its event triggers here
//  3. Add event nodes to data/story/companionEvents.ts
//  4. Call getCompanionEventTrigger() which already aggregates all companions
// ══════════════════════════════════════════════════════════════════════════════

// ─── Mira stage ──────────────────────────────────────────────────────────────

export function getMiraStage(state: GameState): MiraStage {
  const { trust } = state.companions.mira;
  const { flags, stats } = state;

  if (flags['mira_betrayed']) return 'betrayer';
  if (flags['mira_trust_broken']) return 'broken';
  if (trust >= 8 && stats.corruption <= 30 && flags['mira_sacrifice_willing']) return 'sacrifice_route';
  if (trust >= 8) return 'devoted';
  if (trust >= 6) return 'loyal';
  if (trust >= 4) return 'trusting';
  if (trust >= 2) return 'cautious';
  return 'suspicious';
}

// ─── Cain stage ───────────────────────────────────────────────────────────────

export function getCainStage(state: GameState): CainStage {
  const { trust } = state.companions.cain;
  const { flags } = state;

  if (flags['cain_betrayed']) return 'betrayer';
  if (trust >= 8 && flags['cain_last_stand_willing']) return 'last_stand_route';
  if (flags['cain_rival']) return 'rival';
  if (flags['cain_ruthless_mode']) return 'ruthless';
  if (trust >= 6) return 'loyal';
  if (trust >= 4) return 'protective';
  if (trust >= 2) return 'respectful';
  return 'cold';
}

// ─── Companion event trigger ──────────────────────────────────────────────────
//
// Called after every real node transition. Returns the ID of the first
// companion event that should fire, or null if none apply.
//
// Conditions checked in priority order:
//   1. Positive/good events first (trust rewards, opening up)
//   2. Warning events (corruption concern, resource audit)
//   3. Threat/danger events (pulls away, betrayal notice)
//
// Each event uses a "<id>_seen" flag to ensure it fires at most once.
// Companion must be present and alive for their events to trigger.
// No event fires while another event or hallucination is already active.

export function getCompanionEventTrigger(state: GameState): string | null {
  const { flags, companions, stats, factionRep } = state;

  // Never fire during an active event or hallucination
  if (flags['companion_event_active'] || flags['halluc_active']) return null;

  // ── MIRA EVENTS ─────────────────────────────────────────────────────────────
  if (companions.mira.present && companions.mira.alive) {
    const miraTrust = companions.mira.trust;

    // 1. Mira opens up — trust high + player saved children
    if (
      miraTrust >= 5 &&
      (flags['saved_children_any'] || flags['hollow_children_trust']) &&
      !flags['mira_event_opens_up_seen']
    ) {
      return 'mira_event_opens_up';
    }

    // 2. Mira corruption warning — corruption climbing, she's noticed
    if (
      stats.corruption >= 35 &&
      miraTrust >= 2 &&
      !flags['mira_event_corruption_warning_seen']
    ) {
      return 'mira_event_corruption_warning';
    }

    // 3. Mira sacrifice offer — devoted + uncorrupted + past Ch3
    if (
      miraTrust >= 8 &&
      stats.corruption <= 25 &&
      flags['chapter3_complete'] &&
      !flags['mira_event_sacrifice_offer_seen']
    ) {
      return 'mira_event_sacrifice_offer';
    }

    // 4. Mira pulls away — low trust + player has been cruel or corrupt
    if (
      miraTrust <= 2 &&
      (stats.corruption >= 40 || flags['player_was_cruel']) &&
      !flags['mira_event_pulls_away_seen']
    ) {
      return 'mira_event_pulls_away';
    }
  }

  // ── CAIN EVENTS ─────────────────────────────────────────────────────────────
  if (companions.cain.present && companions.cain.alive) {
    const cainTrust = companions.cain.trust;

    // 1. Cain acknowledges the player's competence
    if (
      cainTrust >= 5 &&
      (flags['cain_respect_earned_any'] || flags['cain_respect_earned_ch3']) &&
      !flags['cain_event_respect_earned_seen']
    ) {
      return 'cain_event_respect_earned';
    }

    // 2. Cain resource audit — trust falling, he's watching waste
    if (
      cainTrust <= 3 &&
      !flags['cain_event_resource_warning_seen']
    ) {
      return 'cain_event_resource_warning';
    }

    // 3. Cain hesitation callout — player retreated or stalled too often
    if (
      flags['player_hesitated_twice'] &&
      !flags['cain_event_hesitation_seen']
    ) {
      return 'cain_event_hesitation';
    }

    // 4. Cain betrayal notice — trust very low + Iron Saints reputation high
    if (
      cainTrust <= 2 &&
      factionRep.ironSaints >= 15 &&
      !flags['cain_event_betrayal_warning_seen']
    ) {
      return 'cain_event_betrayal_warning';
    }
  }

  return null;
}
