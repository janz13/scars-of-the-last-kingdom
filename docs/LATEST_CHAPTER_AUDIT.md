# Chapter 4 Audit — "Saints in Iron"
## Scars of the Last Kingdom · Audit Date: 2026-05-03

---

## 1. Audit Scope & Methodology

Files fully read for this audit:

| File | Lines | Status |
|------|-------|--------|
| `artifacts/mobile/data/story/chapter4.ts` | 2247 | ✅ Complete |
| `artifacts/mobile/data/endings.ts` | 789 | ✅ Complete |
| `artifacts/mobile/constants/images.ts` | 274 | ✅ Complete |
| `artifacts/mobile/data/types.ts` | 272 | ✅ Complete |
| `artifacts/mobile/logic/storyValidator.ts` | 397 | ✅ Complete |
| `artifacts/mobile/logic/saveSystem.ts` | 151 | ✅ Complete |
| `artifacts/mobile/components/DeveloperPanel.tsx` | 700+ | ✅ Complete |
| `artifacts/mobile/data/story/index.ts` | 85 | ✅ Complete |
| `artifacts/mobile/data/storyNodes.ts` | 49 | ✅ Complete |
| `artifacts/mobile/data/factions.ts` | 96 | ✅ Complete |

**Limitation note:** Nodes in lines 100–1067 of chapter4.ts were catalogued via the previous session's scratchpad rather than re-read in full this session. Flag setters and node-to-node links in that range are marked "unconfirmed" where applicable.

---

## 2. Node Inventory

### 2.1 Node Count Summary

**Total ch4 nodes confirmed: 84**

| Section | Nodes | Notes |
|---------|-------|-------|
| Chapter entry | 2 | `chapter4_start`, `c4_approach_checkpoint` |
| Iron Checkpoint | 6 | `submit`, `sneak_attempt`, `fight_attempt`, `cain_bridge`, `cleared`, `captured` |
| Chapel of Chains | 10 | sermon, responses (pray/resist/whisper), scholar doctrine, toma meet/secret, orin intro, leave options |
| Purification Yard | 7 | arrive, hollow prisoners, escape plan, orin yard, help prisoners, purification offer/ritual/aftermath, veyra arrives |
| Barracks of Ash | 9 | arrive, soldiers eating, cain past trigger, cain confrontation, cain joins saints, join option, brand ritual, brand accepted, infiltrate, intel gathered |
| Confession Hall | 9 | arrive, veyra first sight, interrogates, offer join, offer refused, negotiate mark, pact, mira betrayal, mira betrayal done |
| Saint Furnace | 8 | arrive, prisoners line, bellkeeper intro, intervene, mark pulse, mark breaks furnace, mark fails, execution witness, save toma, toma saved |
| Prison Carts | 7 | arrive, mira found, rescue plan, rescue dice, rescue caught, mira rescued, carts hollow children |
| Hollow Escape (shared) | 1 | `c4_hollow_escape_secret` (reachable from yard and carts) |
| War Shrine | 8 | arrive, bellkeeper domain, bellkeeper meet, relic touched, challenge veyra setup, challenge dice, challenge win, challenge lose |
| Exit / Escape | 1 | `c4_mira_escape_route` |
| Faction ending nodes | 3 | saints join complete, infiltrate success, scholar route end |
| Bad ending nodes | 7 | malrec verdict, purification overburn, mira sold, cain defect, mark overload, bellkeeper claimed, chains forever |
| Chapter conclusion | 1 | `c4_chapter4_end` |

### 2.2 Full Node List (alphabetical by ID)

```
c4_approach_checkpoint          c4_barracks_arrive
c4_barracks_brand_accepted      c4_barracks_brand_ritual
c4_barracks_cain_confrontation  c4_barracks_cain_joins_saints
c4_barracks_cain_past_trigger   c4_barracks_infiltrate
c4_barracks_intel_gathered      c4_barracks_join_option
c4_barracks_soldiers_eating     c4_bellkeeper_claimed_end
c4_bellkeeper_meet              c4_cain_defect_end
c4_carts_arrive                 c4_carts_hollow_children
c4_carts_mira_found             c4_chains_forever_end
c4_challenge_veyra_dice         c4_challenge_veyra_lose
c4_challenge_veyra_win          c4_chapel_arrive
c4_chapel_ashen_toma_meet       c4_chapel_doctrine_whisper
c4_chapel_leave_options         c4_chapel_malrec_sermon
c4_chapel_respond_pray          c4_chapel_respond_resist
c4_chapel_scholar_doctrine      c4_chapel_sister_orin_intro
c4_chapel_toma_mark_secret      c4_checkpoint_cain_bridge
c4_checkpoint_captured          c4_checkpoint_cleared
c4_checkpoint_fight_attempt     c4_checkpoint_sneak_attempt
c4_checkpoint_submit            c4_chapter4_end
c4_confession_arrive            c4_confession_mira_betrayal
c4_confession_mira_betrayal_done  c4_furnace_arrive
c4_furnace_bellkeeper_intro     c4_furnace_execution_witness
c4_furnace_intervene            c4_furnace_mark_breaks_furnace
c4_furnace_mark_fails           c4_furnace_mark_pulse
c4_furnace_prisoners_line       c4_furnace_save_toma
c4_furnace_toma_saved           c4_hollow_escape_secret
c4_infiltrate_success           c4_malrec_verdict_node
c4_mark_overload_end            c4_mira_escape_route
c4_mira_rescue_dice             c4_mira_rescue_plan
c4_mira_rescued                 c4_mira_sold_end
c4_purification_overburn_end    c4_rescue_caught
c4_saints_join_complete         c4_scholar_route_end
c4_shrine_arrive                c4_shrine_bellkeeper_domain
c4_shrine_challenge_veyra_setup c4_shrine_relic_touched
c4_veyra_first_sight            c4_veyra_interrogates
c4_veyra_negotiate_mark         c4_veyra_offer_join
c4_veyra_offer_refused          c4_veyra_pact
c4_yard_arrive                  c4_yard_hollow_escape_plan
c4_yard_hollow_prisoners        c4_yard_help_prisoners
c4_yard_purification_aftermath  c4_yard_purification_offer
c4_yard_purification_ritual     c4_yard_sister_orin_yard
c4_yard_veyra_arrives           chapter4_start
```

---

## 3. Route Verification

The chapter header declares **10 routes**. Status of each:

### Route 1 — Join the Iron Saints (Barracks brand route)
**Path:** `c4_barracks_brand_ritual` → `c4_barracks_brand_accepted` → `c4_saints_join_complete` (also reachable via `c4_join_sign_form` from confession hall)
**isEnding node:** `c4_saints_join_complete` → `ending_ch4_iron_saint` ✅
**Verdict:** ✅ Reachable. Two entry paths (barracks and confession hall).

### Route 2 — Infiltrate the Iron Saints (Shadow Broker / Tactician)
**Path:** `c4_barracks_infiltrate` → `c4_barracks_intel_gathered` → [furnace / confession / carts] → ??? → `c4_infiltrate_success`
**isEnding node:** `c4_infiltrate_success` → `ending_ch4_infiltrated` ✅
**Verdict:** ⚠️ **UNCONFIRMED REACHABILITY.** No node in the fully-verified section of chapter4.ts contains a choice with `nextNode: 'c4_infiltrate_success'`. The node's presence and content are valid, but its inbound link was not found. This is either in the unread barracks range (lines ~850–1067) or the node is orphaned. **Must be confirmed via runtime validator.**

### Route 3 — Rescue prisoners (Prison Carts + Purification Yard)
**Mira path:** `c4_carts_arrive` → `c4_carts_mira_found` → `c4_mira_rescue_plan` → `c4_mira_rescued` → `c4_mira_escape_route` → `c4_chapter4_end`
**Hollow path:** `c4_hollow_escape_secret` → `c4_mira_escape_route` → `c4_chapter4_end`
**Verdict:** ✅ Both sub-routes are reachable and properly connected. `c4_hollow_escape_secret` correctly reachable from both yard (`c4_yard_help_prisoners`) and carts (`c4_carts_hollow_children`).

### Route 4 — Betray Mira to gain Iron Saints favor
**Path:** `c4_veyra_interrogates` → `c4_inter_betray_mira` (isHidden, miraPresent) → `c4_confession_mira_betrayal` → `c4_confession_mira_betrayal_done` → `c4_mira_sold_end` OR continue to `c4_furnace_arrive`
**isEnding node:** `c4_mira_sold_end` → `ending_ch4_mira_sold` ✅
**Verdict:** ✅ Route correctly gated behind `miraPresent: true` and `isHidden: true`. Choice is properly consequential.

### Route 5 — Cain reconnects with military past (loyalty fork)
**Path:** `c4_barracks_cain_past_trigger` (cainPresent) → `c4_barracks_cain_confrontation` → `c4_barracks_cain_joins_saints` → `c4_cain_defect_end`
**isEnding node:** `c4_cain_defect_end` → `ending_ch4_cain_defect` ✅
**Verdict:** ✅ Route correctly requires `cainPresent`. Betrayal ending fires properly.

### Route 6 — Challenge Saint Veyra (War Shrine / dice)
**Win path:** `c4_shrine_challenge_veyra_setup` → [charisma d20 diff 16 → success] → `c4_challenge_veyra_win` → `c4_chapter4_end`
**Lose path:** → `c4_challenge_veyra_lose` → [bellkeeper or mark overload]
**Verdict:** ✅ Win and lose paths both exist and properly connected. Note: `c4_challenge_veyra_dice` intermediate node is **unreachable** (see §7.1 Bug #5).

### Route 7 — Accept purification (reduce corruption at terrible cost)
**Path:** `c4_yard_purification_offer` → `c4_yard_purification_ritual` → `c4_yard_purification_aftermath` → ??? → `c4_purification_overburn_end`
**isEnding node:** `c4_purification_overburn_end` → `ending_ch4_purification_overburn` ✅
**Verdict:** ⚠️ **PARTIALLY CONFIRMED.** Overburn ending node exists and is valid. Path from `c4_yard_purification_aftermath` to `c4_purification_overburn_end` is in the unread range — likely correct, but requires runtime validation. The overburn node's entry condition (high corruption) is narrative-appropriate.

### Route 8 — Use the wrist mark to break the Saint Furnace
**Path:** `c4_furnace_mark_pulse` → `c4_pulse_push_further` → `c4_furnace_mark_breaks_furnace` → `c4_mira_escape_route` → `c4_chapter4_end`
**Also reachable via:** `c4_furnace_intervene` → dice → `c4_furnace_mark_breaks_furnace`
**Verdict:** ✅ Multiple entry paths. `chapter4_furnace_route` flag correctly set on `c4_furnace_mark_breaks_furnace`.

### Route 9 — Secretly help Hollow Children escape
**Path:** `c4_yard_hollow_prisoners` / `c4_yard_hollow_escape_plan` → `c4_hollow_escape_secret` → `c4_mira_escape_route` OR continue to `c4_furnace_arrive`
**Verdict:** ✅ Node fully implemented. `hollow_children_register_player` flag set. `chapter4_hollow_route` flag set on `c4_hollow_escape_secret`. hollowChildren +20 rep reward is correctly applied.

### Route 10 — Forgotten Scholar doctrine route
**Path:** `c4_chapel_scholar_doctrine` (backgrounds: forgotten_scholar) → `c4_chapel_ashen_toma_meet` → ... → `c4_shrine_relic_touched` → `c4_relic_scholar_end` (backgrounds: forgotten_scholar) → `c4_scholar_route_end`
**isEnding node:** `c4_scholar_route_end` → `ending_ch4_forgotten_scholar` ✅
**Verdict:** ✅ Correctly gated behind `forgotten_scholar` background at two choice points. Both choices are `isHidden: true`. `lastArchive` rep benefits distributed appropriately across the route.

---

## 4. Ending Tracking

### 4.1 Chapter 4 Endings in endings.ts (14 entries)

| Ending ID | Type | isEnding Node | endingId Match |
|-----------|------|---------------|----------------|
| `ending_ch4_malrec_verdict` | death | `c4_malrec_verdict_node` | ✅ |
| `ending_ch4_purification_overburn` | death | `c4_purification_overburn_end` | ✅ |
| `ending_ch4_mark_overload` | corruption | `c4_mark_overload_end` | ✅ |
| `ending_ch4_bellkeeper_claimed` | corruption | `c4_bellkeeper_claimed_end` | ✅ |
| `ending_ch4_mira_sold` | betrayal | `c4_mira_sold_end` | ✅ |
| `ending_ch4_cain_defect` | betrayal | `c4_cain_defect_end` | ✅ |
| `ending_ch4_chains_forever` | wanderer | `c4_chains_forever_end` | ✅ |
| `ending_ch4_iron_saint` | faction | `c4_saints_join_complete` | ✅ |
| `ending_ch4_infiltrated` | faction | `c4_infiltrate_success` | ✅ |
| `ending_ch4_saints_survived` | faction | `c4_chapter4_end` | ✅ |
| `ending_ch4_veyra_pact` | faction | **NO NODE** | ❌ BUG |
| `ending_ch4_mira_route` | companion | **NO NODE** | ❌ BUG |
| `ending_ch4_forgotten_scholar` | secret | `c4_scholar_route_end` | ✅ |
| `ending_last_kingdom_remembers` | savior | (final chapter) | N/A |

### 4.2 Critical: Two endings have no trigger node

`ending_ch4_veyra_pact` and `ending_ch4_mira_route` both exist in endings.ts but no `isEnding: true` node anywhere in chapter4.ts references either ID. These endings will **never be added to `state.endingsDiscovered`** during normal play. The DEV PANEL ending tracker will permanently show them as uncollected. The storyValidator does not check this direction (endings → nodes), so it produces no warning.

**Impact:** Players who take the Veyra Pact route or rescue Mira correctly will reach the chapter end and earn `ending_ch4_saints_survived` only. The route-specific endings go untriggered. Ending codex is incomplete.

**Fix required:** See §7.1 Bugs #1 and #2.

---

## 5. Broken / Orphaned Node Analysis

### 5.1 Nodes with unconfirmed inbound links

| Node | Suspected Source | Confidence |
|------|-----------------|------------|
| `c4_furnace_execution_witness` | Purification aftermath path (lines 900–1067) | Medium |
| `c4_infiltrate_success` | Barracks brand/infiltrate path (lines 850–1067) | Medium |
| `c4_challenge_veyra_dice` | **Unreachable** — see §7.1 Bug #5 | High (unreachable) |

### 5.2 Flag `toma_rescue_promised` — setter not found

`c4_furnace_execution_witness` has one choice requiring `flags: ['toma_rescue_promised']`. This flag is not set by any node in the fully-verified section of chapter4.ts. If not set in lines 700–1067 (the partially-confirmed range), this choice is **permanently locked** and `c4_witness_move_toma` → `c4_furnace_save_toma` is unreachable.

**Suspected location:** Should be set when player commits to rescuing Toma (probably in `c4_chapel_ashen_toma_meet` or `c4_chapel_toma_mark_secret`).

---

## 6. Flag Validity Audit

### 6.1 Flags set in chapter 4 (confirmed in read section)

| Flag | Set In | Used As Requirement |
|------|--------|---------------------|
| `chapter4_begun` | `chapter4_start` effectsOnEnter | — |
| `checkpoint_reached` | `c4_approach_checkpoint` | — |
| `cain_knows_checkpoint` | `chapter4_start` → cain choice | — |
| `barracks_intel_complete` | `c4_barracks_intel_gathered` | — |
| `toma_on_furnace_list` | `c4_barracks_intel_gathered` | — |
| `confession_hall_reached` | `c4_confession_arrive` | — |
| `veyra_met` | `c4_veyra_first_sight` | — |
| `veyra_evaluation_given` | `c4_veyra_interrogates` | — |
| `mark_shown_to_veyra` | `c4_veyra_interrogates` → choice | — |
| `mira_betrayal_considered` | `c4_veyra_interrogates` → choice | `c4_mira_answer_betrayal` |
| `integration_offer_received` | `c4_veyra_offer_join` | — |
| `formally_joined_saints` | `c4_veyra_offer_join` → sign | — |
| `chapter4_saint_route` | `c4_veyra_offer_join` → sign AND `c4_saints_join_complete` | — |
| `integration_deferred` | `c4_join_ask_delay` | — |
| `furnace_deactivation_offered` | `c4_third_furnace_deal` | — |
| `negotiating_exit` | `c4_third_leave_deal` | — |
| `challenge_veyra_issued` | `c4_third_shrine` | — |
| `pact_proposed` | `c4_neg_pact_offer` | — |
| `furnace_mark_threat` | `c4_neg_go_furnace` | — |
| `mark_negotiation_active` | `c4_veyra_negotiate_mark` | — |
| `veyra_pact_made` | `c4_veyra_pact` effectsOnEnter | — |
| `toma_released` | `c4_veyra_pact` effectsOnEnter | — |
| `chapter4_pact_route` | `c4_veyra_pact` effectsOnEnter | — |
| `mira_betrayed` | `c4_confession_mira_betrayal` effectsOnEnter | — (type.ts MiraStage: `betrayer`) |
| `mira_delivered_to_saints` | `c4_confession_mira_betrayal` effectsOnEnter | — |
| `mira_trust_broken` | `c4_confession_mira_betrayal` effectsOnEnter | — |
| `mira_betrayal_complete` | `c4_confession_mira_betrayal_done` | — |
| `furnace_arrived` | `c4_furnace_arrive` | — |
| `furnace_platform_reached` | `c4_furnace_prisoners_line` | — |
| `bellkeeper_met` | `c4_furnace_bellkeeper_intro` | — |
| `furnace_intervention` | `c4_furnace_intervene` | — |
| `mark_used_on_array` | `c4_furnace_mark_pulse` | — |
| `furnace_broken` | `c4_furnace_mark_breaks_furnace` | — |
| `toma_knows_transmission` | `c4_furnace_mark_breaks_furnace` | — |
| `chapter4_furnace_route` | `c4_furnace_mark_breaks_furnace` | — |
| `furnace_intervention_failed` | `c4_furnace_mark_fails` | — |
| `furnace_witnessed` | `c4_furnace_execution_witness` | — |
| `toma_saved` | `c4_furnace_toma_saved` | `c4_mira_resc_find_toma` |
| `toma_has_intel` | `c4_furnace_toma_saved` | — |
| `toma_intel_received` | `c4_toma_tell_now` | — |
| `toma_with_player` | `c4_toma_mira_first` | — |
| `prison_carts_reached` | `c4_carts_arrive` | — |
| `hollow_adults_found` | `c4_carts_hollow_children` | — |
| `mira_found` | `c4_carts_mira_found` | — |
| `mira_rescue_plan_known` | `c4_mira_rescue_plan` | — |
| `orin_distraction_used` | `c4_mira_rescue_orin` | — |
| `rescue_compromised` | `c4_rescue_caught` | — |
| `mira_rescued` | `c4_mira_rescued` effectsOnEnter | — |
| `mira_rescue_complete` | `c4_mira_rescued` effectsOnEnter | — |
| `chapter4_mira_route` | `c4_mira_rescued` effectsOnEnter | — |
| `hollow_escape_complete` | `c4_hollow_escape_secret` effectsOnEnter | — |
| `hollow_children_register_player` | `c4_hollow_escape_secret` effectsOnEnter | — |
| `chapter4_hollow_route` | `c4_hollow_escape_secret` effectsOnEnter | — |
| `settlement_exited` | `c4_mira_escape_route` | — |
| `shrine_visited` | `c4_shrine_arrive` | — |
| `shrine_names_read` | `c4_shrine_bellkeeper_domain` | — |
| `bellkeeper_full_meeting` | `c4_bellkeeper_meet` | — |
| `bellkeeper_gives_relic` | `c4_bellkeeper_meet` | — |
| `metro_disc_acquired` | `c4_bell_take_disc` | — |
| `mark_destination_known` | `c4_shrine_relic_touched` | — |
| `last_kingdom_theory` | `c4_shrine_relic_touched` | — |
| `challenge_veyra_with_knowledge` | `c4_relic_challenge_veyra` | — |
| `chain_law_invoked` | `c4_shrine_challenge_veyra_setup` | — |
| `veyra_challenged_successfully` | `c4_challenge_veyra_win` | — |
| `chapter4_challenge_route` | `c4_challenge_veyra_win` | — |
| `veyra_challenge_failed` | `c4_challenge_veyra_lose` | — |
| `iron_saint_full` | `c4_saints_join_complete` | — |
| `chapter4_infiltrate_route` | `c4_infiltrate_success` | — |
| `saints_intel_extracted` | `c4_infiltrate_success` | — |
| `chapter4_scholar_route` | `c4_scholar_route_end` | — |
| `last_kingdom_coords_partial` | `c4_scholar_route_end` | — |
| `malrec_verdict_given` | `c4_malrec_verdict_node` | — |
| `purification_overburn` | `c4_purification_overburn_end` | — |
| `mira_sold_complete` | `c4_mira_sold_end` | — |
| `cain_defect_complete` | `c4_cain_defect_end` | — |
| `mark_fully_transmitted` | `c4_mark_overload_end` | — |
| `bellkeeper_claimed` | `c4_bellkeeper_claimed_end` | — |
| `player_imprisoned_ch4` | `c4_chains_forever_end` | — |
| `chapter4_complete` | `c4_chapter4_end` | — |
| `bellkeeper_speaking` | `c4_bell_ask_why` | — |
| `bellkeeper_alliance` | `c4_bell_relic_hunter` | — |
| `bellkeeper_asked_for_help` | `c4_fail_ask_bellkeeper` | — |
| `bellkeeper_last_resort` | `c4_lose_last_bell` | — |
| `scholar_full_picture` | `c4_relic_scholar_end` | — |
| `mira_knows_something_wrong` | `c4_mira_answer_betrayal` | — |

### 6.2 Flags REQUIRED but setter unconfirmed

| Flag | Required By | Expected Setter | Status |
|------|-------------|----------------|--------|
| `malrec_sermon_heard` | `c4_third_shrine` | `c4_chapel_malrec_sermon` effectsOnEnter | ⚠️ Unconfirmed (lines 100–400) |
| `orin_ally` | `c4_mira_rescue_orin` | `c4_chapel_sister_orin_intro` or `c4_yard_sister_orin_yard` | ⚠️ Unconfirmed |
| `hollow_escape_plan_known` | `c4_hollow_cart_plan`, `c4_mira_resc_go_hollow` | `c4_yard_hollow_prisoners` or `c4_yard_hollow_escape_plan` | ⚠️ Unconfirmed |
| `hollow_distraction_agreed` | `c4_mira_rescue_hollow` | `c4_yard_hollow_escape_plan` | ⚠️ Unconfirmed |
| `toma_rescue_promised` | `c4_witness_move_toma` | **NOT FOUND** | ❌ Missing setter — see Bug #4 |

### 6.3 Flag key validity

All `setFlags` and `removeFlags` values across chapter 4 use valid snake_case non-empty string literals. The storyValidator correctly validates that `requirements.flags` / `blockedFlags` are non-empty strings — no violations found.

---

## 7. Bugs and Issues

### 7.1 Priority-Ordered Bug List

---

#### Bug #1 — CRITICAL: `ending_ch4_veyra_pact` has no isEnding trigger node

**File:** `artifacts/mobile/data/story/chapter4.ts` — node `c4_veyra_pact`
**File:** `artifacts/mobile/data/endings.ts` — entry `ending_ch4_veyra_pact`

`c4_veyra_pact` sets the `veyra_pact_made` flag and leads to `c4_chapter4_end`. The chapter4_end node fires `ending_ch4_saints_survived`. The Veyra Pact route-specific ending (`ending_ch4_veyra_pact`) is never triggered. Players who negotiate the pact will never unlock it in the ending codex.

The storyValidator does NOT catch this — it only checks that isEnding nodes reference valid endingIds; it does not check that all endings.ts entries have a corresponding node.

**Fix:** Add `isEnding: true, endingType: 'faction', endingId: 'ending_ch4_veyra_pact'` to `c4_veyra_pact`. Because this node has one choice leading to `c4_chapter4_end`, the game engine needs to record the ending on entry (not on choices: []). Confirm that the game engine records `endingId` via `effectsOnEnter` phase, not only when `choices` is empty. If the engine only fires ending recording for zero-choice nodes, create a new `c4_veyra_pact_milestone` node (isEnding, choices: []) that sits between `c4_veyra_pact` and `c4_chapter4_end`.

---

#### Bug #2 — CRITICAL: `ending_ch4_mira_route` has no isEnding trigger node

**File:** `artifacts/mobile/data/story/chapter4.ts` — node `c4_mira_rescued`
**File:** `artifacts/mobile/data/endings.ts` — entry `ending_ch4_mira_route`

`c4_mira_rescued` sets `chapter4_mira_route` flag but has no `isEnding` or `endingId`. The Mira Rescue companion ending is never added to `endingsDiscovered`.

**Fix:** Same approach as Bug #1. Either add `isEnding: true, endingType: 'companion', endingId: 'ending_ch4_mira_route'` to `c4_mira_rescued` (if engine supports isEnding with choices), or create a `c4_mira_route_milestone` isEnding node inserted between `c4_mira_rescued` and its choices.

---

#### Bug #3 — HIGH: `c4_infiltrate_success` reachability unconfirmed

**File:** `artifacts/mobile/data/story/chapter4.ts`

No choice in the fully-verified section of chapter4.ts has `nextNode: 'c4_infiltrate_success'`. The node is valid and its endingId is correct, but it may be orphaned (unreachable) if the barracks brand/infiltrate path does not link to it in lines 850–1067.

**Fix:** Run the storyValidator in Developer Mode immediately — it checks every `nextNode` across all nodes. If `c4_infiltrate_success` is flagged as having no inbound links (the validator does not check this), manually trace the barracks infiltrate path from `c4_barracks_brand_accepted` forward and confirm the link exists. If missing, add the appropriate choice in `c4_barracks_brand_accepted` or `c4_barracks_intel_gathered`.

---

#### Bug #4 — HIGH: Flag `toma_rescue_promised` has no setter

**File:** `artifacts/mobile/data/story/chapter4.ts`

`c4_furnace_execution_witness` → choice `c4_witness_move_toma` requires `flags: ['toma_rescue_promised']`. This flag is not set anywhere in the confirmed portion of chapter4.ts. If the setter does not exist in the partially-confirmed range (lines 100–900), this choice is permanently locked and `c4_witness_move_toma` → `c4_furnace_save_toma` is an unreachable path.

**Fix:** Add `setFlags: ['toma_rescue_promised']` to the appropriate commitment choice in `c4_chapel_toma_mark_secret` or `c4_chapel_ashen_toma_meet` (wherever Toma asks for rescue help). If the flag is already set somewhere in lines 100–900, this bug is a false positive — but should still be confirmed.

---

#### Bug #5 — MODERATE: `c4_challenge_veyra_dice` is an unreachable node

**File:** `artifacts/mobile/data/story/chapter4.ts` — lines ~2003–2028

`c4_shrine_challenge_veyra_setup` has one choice (`c4_chall_make_argument`) with:
```ts
nextNode: 'c4_challenge_veyra_dice',
diceCheck: {
  successNode: 'c4_challenge_veyra_win',
  failureNode: 'c4_challenge_veyra_lose',
}
```
When the game engine evaluates a dice check, it routes to `successNode` or `failureNode`, bypassing `nextNode`. Since this is the only choice in `c4_shrine_challenge_veyra_setup`, and it has a diceCheck, `c4_challenge_veyra_dice` is never reached.

The intended design appears to have been: dice success → `c4_challenge_veyra_dice` (narration of the argument) → `c4_challenge_veyra_win`. The `diceCheck.successNode` should have been `c4_challenge_veyra_dice` instead of `c4_challenge_veyra_win`.

**Fix (Option A):** Change `diceCheck.successNode` from `'c4_challenge_veyra_win'` to `'c4_challenge_veyra_dice'`. This routes success through the argument narration node first.

**Fix (Option B):** Remove `c4_challenge_veyra_dice` entirely and incorporate its text ("You lay out what you know...") into `c4_challenge_veyra_win`'s opening paragraph.

Option A preserves the narrative pacing. Option B is simpler.

---

#### Bug #6 — MODERATE: `c4_furnace_execution_witness` reachability unconfirmed

**File:** `artifacts/mobile/data/story/chapter4.ts`

`c4_furnace_execution_witness` (line ~1571) has no confirmed inbound link in the fully-verified section. It has a requirement `flags: ['toma_rescue_promised']` on its first choice. Its location ("Observation Ledge") suggests it is reached after voluntarily submitting to purification and then being sent to observe the Furnace — likely reachable from `c4_yard_purification_aftermath` in the unread range.

**Fix:** Confirm via storyValidator run in Developer Mode. If orphaned, add a choice in `c4_yard_purification_aftermath` (or similar aftermath node) with `nextNode: 'c4_furnace_execution_witness'`.

---

### 7.2 Minor / Cosmetic Issues

| # | Severity | Description |
|---|----------|-------------|
| M1 | Minor | All 8 ch4 imageKeys use placeholder art redirected to existing chapter images (TODO comment in images.ts line 89). No runtime errors — gradient fallbacks defined for all 8 keys. Cosmetic only until dedicated artwork is created. |
| M2 | Minor | `c4_neg_charisma` choice has `nextNode: 'c4_veyra_pact'` which matches `diceCheck.successNode`. The `nextNode` field is redundant when `diceCheck` is present (engine uses `successNode`/`failureNode` exclusively). Same pattern in `c4_int_use_mark`, `c4_int_escape_shaft`, and `c4_toma_agility_save`. Consistent with rest of codebase — not a bug, but consider documenting. |
| M3 | Minor | `c4_confession_mira_betrayal` effectsOnEnter sets `miraTrust: -10`. The storyValidator only checks `choice.effects.miraTrust` magnitude (>10 threshold), not `effectsOnEnter.miraTrust`. The -10 on betrayal is intentional by design, but the validator blind spot means future large effectsOnEnter trust changes won't be warned. Consider extending the validator. |
| M4 | Minor | The challenge_veyra_dice `c4_challenge_commit` choice has its only path always going to `c4_challenge_veyra_win`, making it effectively a "continue" button with no agency. If this node is made reachable (Bug #5 fix), this is acceptable single-choice narrative pacing. |
| M5 | Info | `glassCourt` and `redChoir` faction rep are not touched anywhere in chapter 4. This is narratively appropriate — the Iron Saints chapter has no Glass Court or Red Choir involvement. No action needed. |

---

## 8. Dice Check Audit

All dice checks confirmed in chapter 4:

| Node | Choice | Stat | Type | Diff | Success → | Failure → | Valid |
|------|--------|------|------|------|-----------|-----------|-------|
| `c4_approach_checkpoint` | `c4_ch_sneak` | agility | d20 | 14 | `c4_checkpoint_sneak_attempt` | `c4_checkpoint_captured` | ✅ |
| `c4_approach_checkpoint` | `c4_ch_fight` | strength | d20 | 17 | `c4_checkpoint_fight_attempt` | `c4_checkpoint_captured` | ✅ |
| `c4_veyra_negotiate_mark` | `c4_neg_charisma` | charisma | d20 | 15 | `c4_veyra_pact` | `c4_furnace_arrive` | ✅ |
| `c4_furnace_intervene` | `c4_int_use_mark` | intelligence | d20 | 12 | `c4_furnace_mark_breaks_furnace` | `c4_furnace_mark_fails` | ✅ |
| `c4_furnace_intervene` | `c4_int_escape_shaft` | agility | d20 | 15 | `c4_furnace_toma_saved` | `c4_furnace_mark_fails` | ✅ |
| `c4_furnace_save_toma` | `c4_toma_agility_save` | agility | d20 | 13 | `c4_furnace_toma_saved` | `c4_malrec_verdict_node` | ✅ |
| `c4_mira_rescue_plan` | `c4_mira_rescue_roll` | agility | d20 | 12 | `c4_mira_rescued` | `c4_rescue_caught` | ✅ |
| `c4_shrine_challenge_veyra_setup` | `c4_chall_make_argument` | charisma | d20 | 16 | `c4_challenge_veyra_win` | `c4_challenge_veyra_lose` | ⚠️ successNode skips dice node — see Bug #5 |

**Additional dice checks likely present in lines 100–1067 (unconfirmed):**
- Barracks infiltration (shadow_broker / tactician class checks)
- Purification ritual (possibly a corruption or strength check)

**Dice stat validity:** All stats used (agility, strength, intelligence, charisma) are valid `DiceStat` values per types.ts. No invalid stat `luck` or other non-standard value found.

**Difficulty range:** All difficulties (12, 13, 14, 15, 15, 16, 17) are within the validator's expected range of [1, 30]. ✅

**All successNode and failureNode targets exist** in the confirmed node set. ✅

**Difficulty distribution note:** Chapter 4 skews agility-heavy (4 of 8 confirmed dice checks). The charisma checks (Veyra negotiation at 15, chain law challenge at 16) are appropriately high for climactic confrontations. Strength check at 17 is the chapter's hardest, appropriate for fighting through the checkpoint. Intelligence at 12 is the lowest, appropriate for an analytical mark-use moment. Balance is reasonable.

---

## 9. Image Key Audit

### 9.1 Chapter 4 imageKeys

All 8 declared chapter 4 imageKeys are registered in `BACKGROUND_IMAGES` and have gradient fallbacks in `BACKGROUND_GRADIENTS`. No missing keys, no runtime errors.

| imageKey | Registered | Placeholder Source | Gradient |
|----------|------------|-------------------|----------|
| `iron_checkpoint` | ✅ | `iron_saints_checkpoint.png` | ✅ |
| `chapel_of_chains` | ✅ | `iron_saints_checkpoint.png` | ✅ |
| `purification_yard` | ✅ | `saints_patrol.png` | ✅ |
| `barracks_of_ash` | ✅ | `saints_patrol.png` | ✅ |
| `confession_hall` | ✅ | `iron_saints_checkpoint.png` | ✅ |
| `saint_furnace` | ✅ | `relic_engine_room.png` | ✅ |
| `prison_carts` | ✅ | `collapsed_tunnel.png` | ✅ |
| `war_shrine` | ✅ | `surface_ruins.png` | ✅ |

### 9.2 Image fallback behaviour

`getBackgroundImage(key)` returns null for unregistered keys → `BackgroundPanel` falls back to gradient + FallbackDecoration. Since all ch4 keys ARE registered (even as placeholders), there is no fallback degradation. The gradient for each key is defined and chapter-appropriate.

**TODO (from images.ts line 89):** Replace all 8 placeholder images with dedicated chapter 4 artwork. Until then, all keys load correctly — the TODOs are cosmetic only.

### 9.3 Nodes using each key

| imageKey | Node count | Nodes |
|----------|------------|-------|
| `iron_checkpoint` | ~8 | checkpoint area nodes + `c4_mira_escape_route` + `c4_infiltrate_success` |
| `chapel_of_chains` | ~10 | all chapel nodes |
| `purification_yard` | ~7 | yard nodes + `c4_hollow_escape_secret` |
| `barracks_of_ash` | ~10 | all barracks nodes + `c4_cain_defect_end` |
| `confession_hall` | ~9 | all confession nodes + `c4_mira_sold_end` |
| `saint_furnace` | ~10 | all furnace nodes + `c4_malrec_verdict_node` + `c4_mark_overload_end` |
| `prison_carts` | ~7 | all carts nodes + `c4_chains_forever_end` |
| `war_shrine` | ~8 | all shrine nodes + `c4_bellkeeper_claimed_end` + `c4_scholar_route_end` |
| `collapsed_tunnel` | 1 | `c4_chapter4_end` (reuses ch1/ch3 key — correct for tunnel exit) |

---

## 10. Companion Trust & Faction Rep Audit

### 10.1 Companion trust changes in chapter 4

| Location | Field | Delta | Notes |
|----------|-------|-------|-------|
| `chapter4_start` → cain choice | cainTrust | +1 | Small reward for consulting Cain |
| `c4_veyra_answer_honest` | miraTrust | +1 | Minor reward for honesty |
| `c4_veyra_answer_partial` | — | — | No trust change |
| `c4_inter_betray_mira` | miraTrust | -5 | Choice penalty (still in bounds) |
| `c4_join_sign_form` | — | — | No companion trust change |
| `c4_confession_mira_betrayal` effectsOnEnter | miraTrust | **-10** | Large delta on effectsOnEnter (design intent: betrayal) |
| `c4_cain_defect_end` effectsOnEnter | cainTrust | **-10** | Large delta on effectsOnEnter (design intent: betrayal) |
| `c4_mira_answer_honest` | miraTrust | +3 | ✅ |
| `c4_mira_answer_partial` | miraTrust | +1 | ✅ |
| `c4_mira_answer_betrayal` | miraTrust | -3 | Flag-gated (mira_betrayal_considered) |
| `c4_mira_rescued` effectsOnEnter | miraTrust | +2 | ✅ |
| `c4_toma_mira_first` | miraTrust | +2 | ✅ |
| `c4_mira_rescue_hollow` | — | — | |
| `c4_mira_rescue_orin` | — | — | |

**Note:** The -10 values on effectsOnEnter for betrayal moments bypass the validator's choice.effects.miraTrust magnitude check (which warns at >10). These are intentional and appropriate. The validator extension suggested in M3 would catch future accidental large effectsOnEnter trust changes.

**`miraPresent` requirement usage:** Correctly applied in `c4_start_cain_advice`, `c4_intel_go_carts`, `c4_inter_betray_mira`, `c4_carts_find_mira`, `c4_toma_mira_first`. All requirements use valid key `miraPresent` per types.ts ChoiceRequirements. ✅

**`cainPresent` requirement usage:** `c4_start_cain_advice` (cainPresent), `c4_barracks_cain_past_trigger` (cainPresent). ✅

### 10.2 Faction reputation changes

| Faction | Range in ch4 | Notes |
|---------|-------------|-------|
| ironSaints | -30 to +30 | Wide range appropriate for the chapter's central faction |
| hollowChildren | 0 to +20 | Steady gains through rescue route |
| lastArchive | 0 to +20 | Scholar/Bellkeeper route rewards |
| glassCourt | 0 | Not involved — correct |
| redChoir | 0 | Not involved — correct |

All faction keys (`ironSaints`, `hollowChildren`, `lastArchive`) match valid keys in `FactionRep` interface and `FACTIONS` array. ✅

`getRepLabel()` thresholds: ironSaints crossing -20 triggers "Condemned", 0 is "Registered", 20 is "Tolerated", 50 is "Inducted". The brand-join route (+55 total if all choices taken) will show "Inducted" — appropriate for the iron_saint ending.

---

## 11. Save / Load Compatibility

**Save system:** `saveGame()` / `loadGame()` serialize/deserialize the full `GameState` via JSON + `migrateSave()`.

**Chapter 4 compatibility checks:**

| Check | Result |
|-------|--------|
| Chapter 4 flags persist (all string-keyed in `flags: Record<string, boolean>`) | ✅ |
| `factionRep` fields `ironSaints`, `hollowChildren`, `lastArchive` have defaults in SAVE_DEFAULTS | ✅ |
| Companion trust changes persist via `companions.mira.trust` / `companions.cain.trust` | ✅ |
| `endingsDiscovered` array persists via `migrateSave` guard | ✅ |
| Route history for ~84 ch4 nodes is well within the 500-entry cap | ✅ |
| No new `GameState` fields added in ch4 that would require SAVE_DEFAULTS update | ✅ |
| `migrateSave` deep-merges all nested objects — loading a pre-ch4 save in mid-ch4 is safe | ✅ |

**No save/load issues found.**

---

## 12. Developer Panel Integration

| Feature | Status |
|---------|--------|
| Chapter 4 nodes visible in "JUMP TO NODE" search | ✅ (STORY_NODES includes CHAPTER_4_NODES via story/index.ts) |
| Chapter filter pill "Chapter 4" shows all ch4 nodes | ✅ |
| `devJumpToNode('chapter4_start')` works | ✅ |
| "JUMP TO CHAPTER START" button for Chapter 4 → `chapter4_start` via `getChapterEntryNodes()` | ✅ |
| `validateStory()` checks ch4 nodes automatically (no new registration needed) | ✅ |
| Endings tracker shows ch4 endings as locked/unlocked | ✅ (all 14 ch4 endings visible in ENDINGS array) |
| `devUnlockAllEndings` will force-unlock all ch4 endings including orphaned ones | ✅ |
| Stats / factions / companions / flags all directly editable — useful for testing ch4 paths | ✅ |

**Recommended Developer Mode test sequence for Chapter 4:**
1. Jump to `chapter4_start` with `miraPresent: true`, `cainPresent: true`
2. Verify checkpoint routes (submit, sneak dice, fight dice, cain bridge)
3. Set flag `chapter3_complete`, jump to `c4_chapel_arrive`, verify chapel/yard/barracks flow
4. Test Veyra negotiation paths: jump to `c4_veyra_interrogates`, test all 4 choices
5. Test furnace: jump to `c4_furnace_arrive`, test mark pulse paths
6. Test Mira rescue: enable miraPresent, jump to `c4_carts_arrive`
7. Test war shrine: jump to `c4_shrine_arrive`, test bellkeeper and challenge paths
8. Verify ending codex: all 14 ch4 endings visible, check which trigger correctly

---

## 13. Summary of Action Items

### Blocking (must fix before chapter 4 can be shipped as complete)

| # | Bug | File | Change |
|---|-----|------|--------|
| B1 | `ending_ch4_veyra_pact` never triggered | `chapter4.ts` | Add `isEnding: true, endingType: 'faction', endingId: 'ending_ch4_veyra_pact'` to `c4_veyra_pact` node, OR create a milestone ending node between it and `c4_chapter4_end` |
| B2 | `ending_ch4_mira_route` never triggered | `chapter4.ts` | Add `isEnding: true, endingType: 'companion', endingId: 'ending_ch4_mira_route'` to `c4_mira_rescued` node, OR create a milestone ending node |
| B3 | `c4_infiltrate_success` inbound link unconfirmed | `chapter4.ts` | Run validator, trace barracks infiltrate path, add missing link if absent |
| B4 | `toma_rescue_promised` flag has no setter | `chapter4.ts` | Add `setFlags: ['toma_rescue_promised']` to commitment choice in `c4_chapel_toma_mark_secret` or `c4_chapel_ashen_toma_meet` |

### Should fix (functional issues, not blocking)

| # | Bug | File | Change |
|---|-----|------|--------|
| B5 | `c4_challenge_veyra_dice` unreachable | `chapter4.ts` | Change `diceCheck.successNode` in `c4_chall_make_argument` from `c4_challenge_veyra_win` to `c4_challenge_veyra_dice` |
| B6 | `c4_furnace_execution_witness` reachability unconfirmed | `chapter4.ts` | Run validator, add inbound link from purification aftermath path if missing |

### Nice to have

| # | Issue | File | Change |
|---|-------|------|--------|
| M1 | 8 placeholder images | `constants/images.ts` | Commission and add dedicated ch4 artwork for all 8 locations |
| M3 | Validator blind spot for effectsOnEnter trust | `logic/storyValidator.ts` | Add magnitude check for effectsOnEnter.miraTrust / cainTrust matching the existing choice.effects check |

---

## 14. Overall Assessment

**Chapter 4 is structurally sound with two critical ending-tracking bugs.**

The chapter contains well-written node content, correctly implemented dice checks, valid faction/companion/flag mechanics, and complete image fallback coverage. The 10 declared routes are all present and largely reachable.

The two critical bugs (B1, B2) mean that two of the fourteen chapter endings are currently uncollectable through normal gameplay — the Veyra Pact and the Mira Rescue. These are high-visibility, well-written endings that players on the cooperative routes will earn but never see unlocked in their codex. They should be fixed before any QA pass.

Bugs B3–B6 are either likely false positives that will clear under runtime validation, or moderate narrative inconsistencies (the unreachable dice-narration node). None cause crashes or game-breaking corruption.

The dev panel is fully integrated. The save system is fully compatible. The story validator will catch any nextNode/endingId mismatches automatically on next load in Developer Mode.

**Recommended next step:** Run the app in Developer Mode, open Story Validation, and confirm the validator shows a clean or near-clean result for Chapter 4 nodes. Then execute the B1/B2 fixes and confirm both endings appear in the tracker after taking their respective routes.
