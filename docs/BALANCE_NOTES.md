# Dark Realm Saga — Balance Notes

**Date:** 2026-05-04 (comprehensive pass)
**Scope:** Full game (Chapters 1–12 + Final Chapters 1–2 + engine systems)
**Goal:** Dangerous but fair. Survival tension preserved. Class/background choices matter. No route becomes irreversibly impossible without a deliberate major decision.
**Total patches applied:** 290+ individual value changes + 6 targeted corruption-cleansing additions
**Audit status:** 0 errors after all changes

---

## What Was Changed

### 1. Dice Check Difficulties (51 patches)

**Before:** 67% of checks were "hard" (difficulty 13–16). With the old stat modifier table (max +4), difficulty 16 on a d20 required 12+ (45% chance) even with max stat. Most characters started with stats 4–5 giving modifier -2, meaning they needed 14+ (35% chance) on hard checks.

**After:** Difficulties ≥15 reduced by 2, difficulties 13–14 reduced by 1. New distribution: ~45% hard, ~35% medium, ~20% easy. Combined with the new modifier table, a character with stat 8 (now modifier 0) needs 11+ on d20 against difficulty 11 (50% chance) — tension without constant failure.

**Files:** All 14 chapter story files.

### 2. Stat Modifier Table

**Before:** Mapped stats 0–100 to modifiers -4 to +4. Starting stats (3–9) gave -4 to -2. Characters were always at a penalty.

| Stat | Old Mod | New Mod |
|------|---------|---------|
| 1–3  | -4      | -3      |
| 4–5  | -3      | -2      |
| 6–7  | -2      | -1      |
| 8–9  | -1      | 0       |
| 10–12| 0       | +1      |
| 13–16| +1      | +2      |
| 17–22| +2      | +3      |
| 23+  | +3/+4   | +4      |

**Impact:** Starting characters now have modifiers -2 to 0 instead of -4 to -1. Mid-game characters (stats ~12–16) have +1 to +2 instead of 0 to +1. Dice checks feel fair at low levels and rewarding at high levels.

**File:** `artifacts/mobile/logic/diceEngine.ts`

### 3. Health Loss Reduction (47 patches)

**Before:** 135 negative health effects totaling -2,255. Average loss -16.7 per event. Extreme values: -100 (silent ward death), -50 (tunnel collapse), -30 (combat). Health starts at 80 — a single -50 hit brings you to 30 (near death zone).

**After:** Capped health losses:
- Values ≥50 → 30
- Values 30–49 → 20
- Values 20–29 → 15

New total: -1,695. Average loss -12.6. Worst single hit is -30. Players survive bad encounters but are still severely punished. Three consecutive -15 hits still bring you from 80 to 35.

**Files:** All 14 chapter story files.

### 4. Faction Reputation Caps (53 patches)

**Before:** Faction swings of ±25, ±30, ±40, ±50 per event. Single choices could swing reputation by 30–50 points (out of -100 to +100 range). ironSaints net -273, lastArchive net +1,665.

**After:** All faction reputation changes capped at ±20 per event. New faction nets:
- ironSaints: -223 (was -273) — still negative, by-design for authoritarian faction
- glassCourt: -13 (was -23) — now nearly balanced
- hollowChildren: +427 (was +362) — still positive, reduced from extreme
- redChoir: +446 (was +471) — still positive, appropriate for corruption-aligned faction
- lastArchive: reduced further by Patch 9

**Files:** All 14 chapter story files.

### 5. Intelligence Inflation Fix (116 patches)

**Before:** 507 intelligence gain events totaling +1,428. Intelligence was the most rewarded stat by far, inflating to make all INT checks trivial. Average gain +2.8 per event.

**After:** All `intelligence: 3` values reduced to `intelligence: 2`. New total: +1,312. Average gain +2.6. Intelligence still grows meaningfully but doesn't trivialize checks.

**Files:** All 14 chapter story files.

### 6. Companion Trust Loss Caps (8 patches)

**Before:** miraTrust losses averaged -3.7 per event vs gains averaging +2.5. Single events could cost -10 trust (abandoning Mira). One betrayal erased 3–4 good deeds.

**After:** All companion trust losses capped at -5 per event. New averages:
- miraTrust: -3.2 avg loss (was -3.7), max -5 (was -10)
- cainTrust: -2.3 avg loss (unchanged), max -5 (was -10)

Bad choices still hurt, but don't erase hours of trust-building in one click.

**Files:** chapter2.ts through chapter8.ts.

### 7. Chapter 8 Morale Extremes (13 patches)

**Before:** Ch8 morale drain totaled -578 (the "Hunger War" chapter). Multiple -25 and -30 morale hits. Combined with survival tick morale penalties, players could spiral to 0 morale (instant ending) through no choice of their own.

**After:** Ch8 morale losses capped at -20. New total: -503 (was -578). Still the most punishing chapter, but players who make good choices (+405 available) can maintain morale above the danger zone.

**File:** chapter8.ts

### 8. Corruption Cleansing (6 additions)

**Before:** Corruption had 287 gain events (+1,332) vs 51 loss events (-328). Net corruption gain of +1,004 across the game. Almost no way to reduce corruption through moral choices. High-corruption paths felt inevitable rather than chosen.

**After:** Added corruption: -3 to -5 to key moral choice nodes:

| Node | Choice | Corruption |
|------|--------|-----------|
| `c2_mira_lead` | Trusting Mira's guidance | -3 |
| `c3_sera_kindness` | Helping a hungry child | -5 |
| `c4_chapel_respond_resist` | Resisting authoritarian control | -3 |
| `c6_cain_stop_him` | Refusing execution of patients | -5 |
| `c8_hollow_feed` | Feeding starving children | -5 |
| `c10_defense_believe` | Believing in companion's redemption | -3 |

New totals: 57 loss events, -352 total (was 51 events, -328). Corruption still trends upward — the world is corrupting — but moral choices now provide meaningful cleansing.

### 9. Last Archive Reputation Deflation (54 patches)

**Before:** lastArchive net +1,665 from 199 positive events. Nearly every lore/discovery node gave +15 to +20. Trivial to max Archive rep.

**After:** Reduced `effectsOnEnter` lastArchive gains from +15/+20 to +10/+15. Choice rewards kept at +15/+20. New net: ~+1,200. Still the easiest faction to gain rep with (by design — knowledge is everywhere), but no longer trivially maxed.

**Files:** chapter2.ts through chapter8.ts.

### 10. Starting Stat Minimums

**Before:** Esper started with strength 3 (modifier -3 new table, -4 old). Blade Survivor and Gun Scavenger started with intelligence 4 (modifier -2). These classes were locked out of stat-gated choices in their weak stats.

**After:**
- Esper: strength 3 → 4 (modifier -2 instead of -3)
- Blade Survivor: intelligence 4 → 5 (better baseline for stat-gated choices)
- Gun Scavenger: intelligence 4 → 5 (same improvement)

**File:** `artifacts/mobile/data/characterOptions.ts`

---

## Pre/Post Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Health loss total | -2,255 | -1,695 | -25% |
| Health loss avg | -16.7 | -12.6 | -25% |
| Health loss max | -100 | -30 | -70% |
| Dice check avg difficulty | 11.8 | 11.1 | -6% |
| Dice checks "hard" % | 67% | 45% | -22pp |
| Stat modifier at stat 5 | -3 | -2 | +1 |
| Stat modifier at stat 8 | -1 | 0 | +1 |
| Intelligence total gains | +1,428 | +1,312 | -8% |
| miraTrust max single loss | -10 | -5 | -50% |
| cainTrust max single loss | -10 | -5 | -50% |
| Corruption cleansing events | 51 | 57 | +12% |
| Corruption cleansing total | -328 | -352 | +7% |
| Faction rep max per event | ±50 | ±20 | -60% |
| lastArchive net rep | +1,665 | ~+1,200 | -28% |
| Ch8 morale drain | -578 | -503 | -13% |

---

## Remaining Balance Concerns

### High Priority

1. **Iron Saints net reputation is -223.** This is by-design (they're authoritarian, most interactions are hostile unless you submit), but it means the Saints route requires very specific choices to maintain positive rep. Consider adding +5 to +10 Saints rep to 3–4 cooperative choices in Ch4/Ch8 where the player works within the system without fully joining.

2. **Health recovery is scarce.** Only 12 positive health effects totaling +125 vs -1,695 in losses. Medicine items exist but the story doesn't provide enough healing moments. Consider adding `health: +10` to 5–8 "rest" or "safe haven" nodes across chapters.

3. **Hunger/thirst disappear after Chapter 4.** Ch5–FC2 have almost no hunger/thirst drain (except Ch8). The survival mechanic is front-loaded and then abandoned. Consider adding `hunger: -1` or `thirst: -1` to `effectsOnEnter` on key nodes in Ch6–Ch12 to maintain survival pressure throughout.

4. **Corruption still trends heavily positive.** Even with 6 new cleansing points, net corruption gain is ~+980. Players who make mostly moral choices will still reach 50+ corruption by Ch9. Need more cleansing opportunities, especially in Ch9–Ch12 where corruption requirements reach 70–90.

### Medium Priority

5. **Morale in Ch8 is still tight.** Net -98 morale (was -173). A player who makes mostly good choices can stay positive, but a few bad rolls on dice checks with morale penalties can still spiral. Consider adding a +10 morale "hope" node in the middle of Ch8.

6. **Luck stat is underutilized.** Only 8 dice checks use luck, and only 6 luck gain events exist. The luck reroll mechanic (requires luck ≥60) is nearly impossible to reach. Consider adding more luck-based dice checks and +1 luck gains.

7. **Charisma checks are disproportionately hard.** 24 charisma checks with 12 "hard" — but only 12 charisma gain events total (max +8). Charisma-focused characters (Tactician, Shadow Broker) can't grow their key stat enough to keep up with check difficulty scaling.

8. **Strength has no growth path after Ch2.** 16 strength gain events, all in Ch1–Ch2. After that, Blade Survivors and Exiled Soldiers can't improve their key stat. Add +1 strength to 3–5 combat victory nodes in Ch4–Ch8.

### Low Priority

9. **Scrap economy is one-directional.** 18 negative scrap events totaling -64 vs 12 positive totaling +26. Scrap is spent faster than earned. Consider rebalancing crafting/scrap costs.

10. **Esper starting corruption (5) is punishing.** Combined with the runaway_experiment background (+2 corruption), an Esper can start at corruption 7. This locks them out of some low-corruption choices immediately. Consider reducing Esper starting corruption to 3.

11. **Trust stat (0–100 scale) is barely used.** Only 1 gain event (+1) and 0 loss events. The `trust` stat in `Stats` appears unused compared to `miraTrust`/`cainTrust`. Consider either removing it or wiring it into NPC interactions.

12. **Personality traits have no mechanical implementation.** The 7 personality traits describe effects (e.g., "+2 Companion Trust gains") but these are not implemented in the game engine. They're flavor text only.

13. **Blade Survivor underrepresented in Chapter 5.** No class-specific hidden option for Blade Survivor in the Glass Court chapter. The class's physical presence is underused in the most dialogue-heavy chapter.

14. **Hollow Children rep after double betrayal (Ch5 + Ch8).** A player who betrays the Hollow Children in Ch5 and takes the hostile path in Ch8 may arrive at Ch9–12 at very hostile Hollow Children rep. Verify that all Ch9+ Hollow Children routes have alternative flag-based entry conditions.

---

## Design Principles Confirmed by This Audit

1. **Difficulty should scale with chapter depth, not with player frustration.** Ch1–4 should rarely exceed DC 14; Ch5–8 can reach DC 14 on special checks; Ch9–10 can reach DC 14 on meaningful gatekeepers. Ch11–12 should be 5–9 as a reward for reaching the endgame.

2. **Class/background bypasses make hard dice optional, not irrelevant.** If a check is DC 14+, a class or background bypass should exist. The audit confirms this is already the case for all checks at DC 14+ across all chapters.

3. **Faction rep swings should be proportional to the size of the decision.** A betrayal (selling out allies, raiding vaults, ordering executions) justifies ±20 in a single choice. Dialogue nuance justifies ±3–8. Incidental help justifies ±5–10.

4. **Companion trust should require accumulated investment.** The scale (0–10) across 12 chapters means a player who consistently supports a companion averages +1–2 per chapter, reaching 8–10 by the late game. This is the correct cadence.

5. **Corruption should feel like a slow burn, not a cliff.** The hallucination system at ≥70 and the corruption-gated endings at ≥70–80 create meaningful tension without making high-corruption runs immediately unplayable. Moral choices should provide cleansing paths for players who want to pull back from the edge.

---

## Files Modified

| File | Changes |
|------|---------|
| `artifacts/mobile/logic/diceEngine.ts` | Stat modifier table |
| `artifacts/mobile/data/characterOptions.ts` | Starting stat minimums |
| `artifacts/mobile/data/story/chapter1.ts` | Health, dice, faction, int caps |
| `artifacts/mobile/data/story/chapter2.ts` | Health, dice, faction, int caps, corruption cleanse |
| `artifacts/mobile/data/story/chapter3.ts` | Health, dice, faction, int caps, corruption cleanse |
| `artifacts/mobile/data/story/chapter4.ts` | Health, dice, faction, int caps, corruption cleanse |
| `artifacts/mobile/data/story/chapter5.ts` | Health, dice, faction, int caps |
| `artifacts/mobile/data/story/chapter6.ts` | Health, dice, faction, int caps, corruption cleanse, trust caps |
| `artifacts/mobile/data/story/chapter7.ts` | Health, dice, faction, int caps, trust caps |
| `artifacts/mobile/data/story/chapter8.ts` | Health, dice, faction, int caps, corruption cleanse, trust caps, morale caps |
| `artifacts/mobile/data/story/chapter9.ts` | Health, dice, faction, int caps |
| `artifacts/mobile/data/story/chapter10.ts` | Health, dice, faction, int caps, corruption cleanse |
| `artifacts/mobile/data/story/chapter11.ts` | Health, dice, faction, int caps |
| `artifacts/mobile/data/story/chapter12.ts` | Health, dice, faction, int caps |
| `artifacts/mobile/data/story/finalChapter1.ts` | Health, dice, faction, int caps |
| `artifacts/mobile/data/story/finalChapter2.ts` | Health, dice, faction, int caps |
