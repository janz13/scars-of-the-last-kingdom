# Scars of the Last Kingdom — Balance Notes
**Date:** 2026-05-04  
**Scope:** Full game audit (Chapters 1–12 + Final Chapters 1–2)  
**Goal:** Dangerous but fair. Survival tension preserved. Class/background choices matter. No route becomes irreversibly impossible without a deliberate major decision.

---

## Changes Applied

### Change 1 — Chapter 4: Strength Dice DC 17 → 15

**File:** `artifacts/mobile/data/story/chapter4.ts`  
**Node:** `c4_gate_choice` → choice `c4_ch_fight`  
**Stat:** Strength · Dice: d20

**Before:** `difficulty: 17`  
**After:** `difficulty: 15`

**Rationale:**  
DC 17 on a d20 with Strength produces a raw success rate of roughly 14–25% for most classes (Blade Survivor at STR 8 succeeds on a roll of 9+, i.e. 60%; most others with STR 4–6 succeed on 11–13+, i.e. 35–50%). Wait — the dice system adds the stat to the roll. Let me clarify: if the system rolls d20 + stat vs. difficulty, then STR 5 baseline has roughly 45% at DC 17 but only ~25% for classes with STR 3–4 (Esper, Medic, Tactician). DC 17 in Chapter 4 (an early-mid game chapter) before players have had many opportunities to raise Strength is excessively punishing for non-combat builds.

DC 15 brings all classes to viable territory without removing the genuine danger: high-STR builds (Blade Survivor at 8+ STR) still succeed comfortably; low-STR builds (Esper, Medic) still face real risk (~50–65% success). The choice has three equally accessible alternatives (Sneak DC 14, Negotiate/Submit, background bypasses), so DC 17 on the brute-force option was punishing players who correctly chose their build's appropriate route but found it locked by a slightly elevated requirement.

---

### Change 2 — Chapter 11: First Gate Touch health: -70 → -50

**File:** `artifacts/mobile/data/story/chapter11.ts`  
**Node:** `c11_first_gate_arrive` → choice `c11_gate_touch_direct`

**Before:** `health: -70`  
**After:** `health: -50`

**Rationale:**  
The First Gate is the sub-city's climax location. Touching the Gate directly without the mark's mediation is presented as reckless and is intended to be devastating. However, at -70 health, this choice auto-kills two classes regardless of how carefully the player has played:

- **Esper** starts with 70 HP (maxHealth: 70). Any health loss across Chapters 1–11 makes -70 immediately fatal.  
- **Tactician** starts with 80 HP. After eleven chapters of play, any accumulated health damage — very likely — brings them below the 70-point threshold.

The choice node explicitly warns players via the lore ("force must be the mark; the mark must decide") and the adjacent safe option (`c11_gate_companion_check`) is available. The intent is clear: this is a bad idea. -50 preserves that intent while ensuring that a healthy, careful Esper or Tactician player who has reached Chapter 11 in good condition (70–80 HP) is not guaranteed death with zero save.

Note: The choice leads to `c11_first_gate_fragment_end` which is an ending node (not a death — it is the "fragment" ending, a vision-state ending). The damage is applied before reaching that ending. At -50, Esper players who've managed their health survive into the ending node with a critical wound reading; at -70 they would arrive at 0 or below health, which may or may not trigger a health-zero death check before the ending loads depending on engine implementation.

---

## Findings Documented (No Change Applied)

### Finding 1 — Dice Difficulty Distribution

**Summary of all difficulty values across the game:**

| Chapter | Difficulties used | Notes |
|---------|------------------|-------|
| 1 | 11, 12, 13, 14 | Well-graduated early game |
| 2 | 12 | Single mid-range check |
| 3 | 12, 13, 14, 15, 16 | Reasonable ramp |
| 4 | 12, 14, **15** *(was 17)*, 15 | Fixed |
| 5 | 13, 14, 14, 15, 16 | Appropriate mid-game |
| 6 | 11, 12, 13, 14, 15 | Good spread |
| 7 | 11, 12, 13, 13, 14 | Appropriate |
| 8 | 12, 12, 12, 13, 14, 14, 15 | Hunger War escalation, acceptable |
| 9 | 13, 14, 14, 14, 15, 15, 15, 15, 16 | Heavy chapter, dice lean hard |
| 10 | 11, 13, 14, 14, 14 | Good |
| 11 | 5, 5, 6, 6, 7, 7, 7, 8 | Sub-city rewards progression |
| 12 | 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9 | Final chapter narrative resolution |
| FC1 | 6, 7, 8, 8 | Appropriate |
| FC2 | 10 | Single check, high stakes |

**Assessment:** Distribution is intentional and well-structured. Chapter 9 leans hardest (all checks 13–16), which is appropriate for the mark awakening arc. Chapter 11 drops significantly as a deliberate reward for reaching the sub-city. No further changes needed.

**Remaining concern:** Chapter 9's seven dice checks at DC 13–15 create a sustained gauntlet for low-stat builds. Classes with split stat distributions (Shadow Broker, Gun Scavenger) may struggle on non-agility checks. These checks all have class/background bypass options, which mitigates the concern but is worth monitoring in playtesting.

---

### Finding 2 — Chapter 8 Opening Survival Drain

**Nodes:** `chapter8_start` (hunger: -10, thirst: -5) + `c8_arrive_ration_square` (hunger: -5)  
**Total unavoidable drain:** -15 hunger, -5 thirst in the first two entered nodes.

**Assessment:** **No change.** This is deliberate — Chapter 8 is "The Hunger War" and the player should feel it immediately. Starting hunger/thirst (100/100) drops to 85/95 after the entry sequence, which is uncomfortable but not dangerous. Actual starvation/dehydration mechanics only trigger at very low values (≤ 10–20 depending on engine implementation). The drain communicates the chapter's theme without making the opening sequence mechanically unwinnable.

**Note for designers:** If the engine applies hunger/thirst death checks at ≤ 20, monitor whether very long chapter 8 runs (players who explore every branch) can hit the starvation threshold before finding food. The Dead Orchard and Grain Vault routes do provide food restores (food: +5 to +8), so a player who engages with any food-related route should not hit starvation. A player who ignores all food routes is being told something by the game.

---

### Finding 3 — Faction Reputation Swing Magnitudes

**Large swings catalogued (non-ending nodes only — ending-node values are narrative):**

| Chapter | Effect | Location | Assessment |
|---------|--------|----------|------------|
| Ch5 | `hollowChildren: -25, glassCourt: 20` | Selling out Hollow Children | **Keep.** This is a major betrayal choice with permanent consequences. |
| Ch5 | `glassCourt: 25` (alliance) | Seraphine full alliance | **Keep.** Accepting full Glass Court alliance is the chapter's highest-stakes positive swing; +25 is appropriate for a route-defining commitment. |
| Ch5 | `glassCourt: -15` (exposing ward) | Ward exposure to Saints/Hollow | **Keep.** Exposing the Glass Court's experiments should permanently damage relations. |
| Ch8 | `ironSaints: -25` (ration raid) | Approving Roan's raid | **Keep.** Raiding an Iron Saints grain vault is a faction war act. |
| Ch8 | `ironSaints: -20` (multiple) | Vault distributed, supply line, north passage | **Keep.** Savior-route players are expected to be hostile to the Saints. Chapter 12 still provides reconciliation paths via `factionRep: { ironSaints: 8 }` which is achievable if the player maintained some rep before ch8. |
| Ch8 | `hollowChildren: -30` (hollow refuse, ending-bound) | Choice leading to `c8_hollow_children_starve_end` | **Moot** — this is an ending-bound choice. The -30 applies to a node that immediately ends the chapter. |
| Ch6 | `redChoir: -40` (Cain merciless road) | `c6_cain_merciless_road_end` | **Moot** — this is an ending node (endingType: 'betrayal'). |

**Overall assessment:** The large swings are concentrated at meaningful decision points (betrayals, war acts, major alliances). The pattern is intentional. No changes applied.

**Remaining concern:** A player who takes both the Ch5 Hollow Children betrayal (`hollowChildren: -25`) and the Ch8 hollow refusal path (`hollowChildren: -30` choice + ending's -50 on the node) would reach deeply hostile Hollow Children rep by Chapter 8. This is correct — the player has betrayed them twice. The concern is whether any Chapter 9+ routes require Hollow Children rep thresholds that become unreachable after these combined choices. See Warning 1 in the audit.

---

### Finding 4 — Companion Trust Accumulation

**Trust ranges observed:**

| Companion | Smallest gain | Largest gain | Largest loss | Max trust threshold for routes |
|-----------|--------------|-------------|-------------|-------------------------------|
| Mira | +1 | +10 (ch9) | -5 | 8 (devoted/sacrifice_route) |
| Cain | +1 | +5 (ch8 ration raid) | -5 | 8 (last_stand_route) |

**Assessment:** Trust accumulates across 12 chapters. The maximum meaningful threshold (8) is reachable if the player takes consistent companion-positive choices across 6–8 chapters with moderate gains of +2–3 per chapter. The largest single-session gains (+10 Mira in ch9) reward particularly significant moments without making trust trivially achievable.

**Minor concern:** If a player takes mostly neutral choices (neither building nor destroying trust), they may arrive at Chapter 10's companion confrontation nodes with trust values of 3–5, which is "cautious/trusting" but below the "loyal" threshold needed for some Chapter 11–12 routes. This appears to be intended: companion trust should reflect the relationship, not be achievable by avoiding rather than making choices.

---

### Finding 5 — Class and Background Route Coverage

**Audit of class/background-specific choices per chapter (hidden or gated options):**

| Class/Background | Chapters with specific options | Coverage |
|----------------|-------------------------------|----------|
| Blade Survivor | Ch1, Ch4, Ch8, Ch9, Ch11 | Good |
| Gun Scavenger | Ch1, Ch2, Ch4, Ch7, Ch9 | Good |
| Medic | Ch1, Ch3, Ch5, Ch6, Ch8, Ch9 | Strong — medical routes are most common |
| Tactician | Ch2, Ch4, Ch7, Ch8, Ch12 | Good |
| Relic Hunter | Ch5, Ch7, Ch9, Ch11 | Thematic concentration in relic chapters |
| Shadow Broker | Ch2, Ch4, Ch5, Ch8, Ch12 | Strong information-broker coverage |
| Esper | Ch1, Ch4, Ch8, Ch9, Ch11 | Strong — unique mark-interaction choices |
| Wasteland Orphan | Ch1, Ch2, Ch3, Ch8 | Good for survival early game |
| Fallen Noble | Ch2, Ch4, Ch5, Ch12 | Glass Court and faction coverage |
| Underground Medic | Ch1, Ch3, Ch5, Ch6, Ch8 | Strong medical coverage |
| Exiled Soldier | Ch1, Ch4, Ch7, Ch11, Ch12 | Iron Saints and tactical coverage |
| Black Market Courier | Ch2, Ch5, Ch8, Ch12 | Good underground network coverage |
| Forgotten Scholar | Ch3, Ch5, Ch7, Ch9, Ch11 | Archive route coverage |
| Runaway Experiment | Ch9, Ch11 | Concentrated in mark-awakening chapters — intentional |

**Assessment:** Coverage is well-distributed. All classes and backgrounds have meaningful moments. Runaway Experiment's late-game concentration is thematic: this background connects to the mark's origin and pays off specifically in Chapters 9 and 11.

**Remaining concern:** Blade Survivor has no specific options in Chapters 2, 3, 5, 6, 7, 10, 12. In purely narrative chapters (2, 3) this is fine. In the Glass Court chapter (5), the melee-focus class has no edge over anyone else — this may feel like a class underperformance in the chapter's most dialogue-heavy section. Not a blocker, but worth a future pass to add at least one "Blade Survivor's physical presence commands attention" hidden option in Ch5.

---

### Finding 6 — Chapter 11 Extreme Health Penalties (Sub-City)

**Full list of large health penalties in Chapter 11:**

| Node/Choice | Health Cost | Context | Assessment |
|-------------|------------|---------|------------|
| `c11_gate_force_attempt` | none listed (leads to ending) | Forcing the sub-city gate | Fine — ending |
| `c11_surge_resist` | -15 | Resisting the Core surge | **Keep.** This is the safe option; -15 is serious but survivable |
| `c11_surge_yield` | -50 (requires corruption ≥ 70) | Yielding to Core surge | **Keep.** Corruption ≥ 70 means player chose this path |
| `c11_madness_hold` | -10 | Holding the Deep Archive boundary | **Keep.** The safe option should still cost something |
| `c11_madness_yield` | -40 (requires corruption ≥ 70) | Yielding to Archive madness | **Keep.** Same as surge yield — intentional high-corruption route |
| `c11_platform_investigate_unstable` | -60 (leads to ending) | Investigating pressure anomaly | **Keep.** Clearly telegraphed danger, leads to ending |
| `c11_gate_touch_direct` | **-50** *(was -70)* | Touching First Gate directly | **Changed.** See Change 2 above |

**Assessment:** Chapter 11 uses large health penalties as the sub-city's primary mechanical pressure (replacing hunger/thirst, which the sub-city's atmospheric stability makes less relevant). Most extreme penalties are either corruption-gated (player chose this path) or ending-bound (final consequences). The only uncorrected concern was the -70 choice, now -50.

---

### Finding 7 — Hallucination Nodes (Corruption ≥ 70)

**Hallucination effects audit:**

| Node | Effect on Return |
|------|----------------|
| `halluc_mark_speaks` — refuse | morale: -3, corruption: +1 |
| `halluc_mark_speaks` — listen | corruption: +3, morale: +2 |
| `halluc_the_dead_speak` — defend | morale: -5 |
| `halluc_the_dead_speak` — apologize | morale: +2, corruption: +2 |
| `halluc_the_dead_speak` — wait | morale: -2 |
| `halluc_throne_vision` — refuse | morale: +3, corruption: -1 |
| `halluc_throne_vision` — stay | corruption: +4, morale: -1 |

**Assessment:** Hallucination nodes are well-balanced. Refusing visions costs morale but can slightly reduce corruption (-1). Engaging with them builds corruption but offers morale and occasional insight. The maximum corruption gain per hallucination is +4 (throne vision, staying), which is meaningful but not runaway. Players near the corruption endings at 70+ will feel the pressure without being locked into them by a single hallucination.

**No changes applied.**

---

## Remaining Concerns (Not Addressed in This Pass)

### Concern 1 — Flags Required But Never Set (inherited from FULL_GAME_AUDIT.md)

Four flags appear as route requirements but are never set by any story node. Routes gated on these flags are permanently inaccessible:

| Flag | Blocks access to |
|------|-----------------|
| `sera_saved_ch3` | Multiple Ch4+ nodes with Sera content |
| `sera_alive` | Multiple Ch10+ nodes |
| `juno_alive` | FC1, Ch11 nodes |
| `sleeping_server_active` | Ch9+ relic server nodes |

**Action required:** Locate the nodes where these NPCs/events occur and add the missing `setFlags` entries.

### Concern 2 — Blade Survivor Underrepresented in Chapter 5

No class-specific hidden option for Blade Survivor in the Glass Court chapter. The class's physical presence and threat are underused in the most dialogue-heavy chapter. Future pass: add one `classes: ['blade_survivor']` option in the Council Chamber or Guard Encounter section.

### Concern 3 — Chapter 9 Dice Gauntlet

Seven dice checks in Chapter 9 at DC 13–15 creates sustained pressure on balanced/hybrid builds. All checks have class/background bypasses, which mitigates the concern. Monitor in playtesting: specifically whether Shadow Broker (high Agility/Charisma but moderate Strength/Intelligence) runs hit a wall on the Chapter 9 Strength and Intelligence checks. If so, add a Shadow Broker bypass to the most painful check.

### Concern 4 — Hollow Children Rep after Double Betrayal (Ch5 + Ch8)

A player who betrays the Hollow Children in Ch5 (-25) and takes the neutral/hostile path in Ch8 (-25 from camp_rations_hoarded, or entering the hollow_refuse ending path) may arrive at Ch9–12 at very hostile Hollow Children rep. Verify that all Ch9+ Hollow Children routes either have very low rep thresholds or have alternative flag-based entry conditions that don't require rep.

---

## Summary of All Changes

| # | File | What Changed | Why |
|---|------|-------------|-----|
| 1 | `chapter4.ts` | Strength dice DC 17 → 15 | Fairness for non-combat builds at the gate fight |
| 2 | `chapter11.ts` | First Gate touch health: -70 → -50 | Prevents auto-death for Esper/Tactician at full health |

**Total changes:** 2 targeted edits.  
**Unchanged:** All faction swings, companion trust values, survival drain rates, hallucination values, and all other dice difficulties are preserved as-is with rationale documented above.

---

## Design Principles Confirmed by This Audit

1. **Difficulty should scale with chapter depth, not with player frustration.** Ch1–4 should rarely exceed DC 14; Ch5–8 can reach DC 16 on special checks; Ch9–10 can reach DC 16 on meaningful gatekeepers. Ch11–12 should be 5–9 as a reward for reaching the endgame.

2. **Class/background bypasses make hard dice optional, not irrelevant.** If a check is DC 14+, a class or background bypass should exist. The audit confirms this is already the case for all checks at DC 14+ across all chapters.

3. **Faction rep swings should be proportional to the size of the decision.** A betrayal (selling out allies, raiding vaults, ordering executions) justifies ±20–30 in a single choice. Dialogue nuance justifies ±3–8. Incidental help justifies ±5–10.

4. **Companion trust should require accumulated investment.** The scale (0–10) across 12 chapters means a player who consistently supports a companion averages +1–2 per chapter, reaching 8–10 by the late game. This is the correct cadence.

5. **Corruption should feel like a slow burn, not a cliff.** The hallucination system at ≥70 and the corruption-gated endings at ≥70–80 create meaningful tension without making high-corruption runs immediately unplayable. Corruption can be partially reduced (via specific choices in Ch9 and Ch11) for players who want to pull back from the edge.
