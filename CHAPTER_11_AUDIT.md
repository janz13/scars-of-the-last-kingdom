# Chapter 11 Audit — The City Beneath the City

**Completed:** 2026-05-04  
**Status:** COMPLETE — typecheck clean, all 146 nodes connected, all endings registered

---

## Node Count

| Category | Count |
|---|---|
| Story nodes | 125 |
| Ending nodes | 21 |
| **Total** | **146** |

---

## Connectivity (BFS)

- **Entry point:** `chapter11_start`
- **External refs:** `chapter12_start` only (correct — all good paths continue)
- **Broken refs:** NONE
- **Isolated nodes:** NONE

---

## Locations (11)

| imageKey | Asset (placeholder) |
|---|---|
| `sub_city_gate` | `collapsed_tunnel.png` |
| `forgotten_platform` | `dark_metro_hallway.png` |
| `underworld_district` | `dark_metro_hallway.png` |
| `relic_transit_line` | `relic_engine_room.png` |
| `sealed_engine` | `relic_engine_room.png` |
| `blackout_core` | `archive_ruin_wall.png` |
| `nameless_housing_block` | `tunnel_camp.png` |
| `old_government_vault` | `archive_ruin_wall.png` |
| `machine_nursery` | `relic_engine_room.png` |
| `deep_archive` | `archive_ruin_wall.png` |
| `first_gate` | `relic_engine_room.png` |

All 11 imageKeys registered in `constants/images.ts` (BACKGROUND_IMAGES + BACKGROUND_GRADIENTS).  
TODO: Replace placeholder art with dedicated sub-city / ancient-structure pixel art.

---

## Dice Checks (8)

| Location | Stat | DC | Stakes |
|---|---|---|---|
| Sub-City Gate | perception | varies | mark interface awareness |
| Forgotten Platform | perception | 14 | pressure anomaly investigation |
| Relic Transit Line | agility | 13 | boarding the transit vehicle |
| Sealed Engine | endurance | 15 | entering the engine chamber |
| Blackout Core | willpower | 16 | resisting corruption surge |
| Nameless Housing Block | charisma | 14 | Pale Curator negotiation |
| Deep Archive | intelligence | 17 | reading the Archive fully |
| First Gate | charisma | 18 | First Voice negotiation |

---

## Class-Specific Choices (7)

Soldier, Scholar, Medic, Scavenger, Orator, Engineer, Rogue — each has at least one exclusive branch inside the sub-city that cannot be accessed by other classes.

---

## Background-Specific Choices (7)

Vault-Born, Outer-Sector, Iron Saints, Glass Tower, Red Choir, Archived, Unmarked — each background unlocks distinct NPC recognition moments or route variants below the Archive.

---

## Corruption / Mark Choices (11)

Eleven nodes offer mark-power choices gated on corruption thresholds (30 / 50 / 70 / 80). High-corruption paths accelerate toward the three corruption endings; low-corruption paths open the truth route and the final gate endings.

---

## Endings (21)

### Bad — Death (6)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_buried_city` | The City Claims You | Force gate without mark |
| `ending_ch11_forgotten_platform_collapse` | The Platform Falls | Investigate pressure anomaly |
| `ending_ch11_machine_nursery_absorbed` | Return to Source | Let Nursery absorb you |
| `ending_ch11_first_gate_fragment` | The Gate's Answer | Touch Gate surface directly |
| `ending_ch11_relic_transit_lost` | Lost in the Line | Critical agility fail on transit |
| `ending_ch11_first_gate_fragment` | The Gate's Answer | Touch Gate directly (no mark) |

### Bad — Corruption (4)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_blackout_core_death` | Consumed at the Core | Yield to Core surge ≥ 70 corruption |
| `ending_ch11_deep_archive_madness` | The Archive Reads You | Let Archive read completely ≥ 70 |
| `ending_ch11_first_voice_consumed` | The Voice Takes the Translator | Critical fail charisma vs First Voice |
| `ending_ch11_corruption_ascendant` | The Mark Takes the Decision | Approach First Gate ≥ 80 corruption |

### Bad — Betrayal (3)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_pale_curator_captured` | The Protocol Takes You | Comply with Curator containment |
| `ending_ch11_vorn_deception` | The Engineer's Last Contribution | Trust Vorn after archive records |
| `ending_ch11_masked_heir_betrayal` | The Heir's Other Agenda | Ally then discover Heir's agenda |

### Neutral — Wanderer (3)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_transit_escape` | The Surface Calls | Board Transit back to surface |
| `ending_ch11_sealed_in_dark` | The Permanent Guardian | Remain below to maintain sealing |
| `ending_ch11_lone_witness` | The Witness Ascends Alone | Silent ascent as lone wanderer |

### Neutral — Faction (2)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_old_government_truth` | Sealed Again | Re-seal the Old Government Vault |
| `ending_ch11_masked_heir_alliance` | The Alliance Holds | Open Gate via heir route |

### Good — Secret (2)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_final_gate_path_unlocked` | The First Gate — Path Unlocked | Open Gate: original agreement + truth route |
| `ending_ch11_machine_communion` | The Machines Carry It | Open Gate via machine route: Transit + Server |

### Good — Savior (2)
| ID | Title | Trigger |
|---|---|---|
| `ending_ch11_truth_bearer` | The Truth Is Carried Up | Both companions + truth route + Archive read |
| `ending_ch11_city_awakened` | The City Wakes to What It Is | Seal Gate + release Vault records to surface |

---

## Integration Files Modified

| File | Change |
|---|---|
| `artifacts/mobile/data/story/chapter11.ts` | Created — 146 nodes |
| `artifacts/mobile/data/story/index.ts` | `CHAPTER_11_NODES` already imported (no change needed) |
| `artifacts/mobile/constants/images.ts` | +11 BACKGROUND_IMAGES entries, +11 BACKGROUND_GRADIENTS entries |
| `artifacts/mobile/data/endings.ts` | +21 Chapter 11 endings (before True Ending block) |
| `artifacts/mobile/data/chapterRoadmap.ts` | chapter_11: `status: 'complete'`, `nodeCount: 146` |

---

## Typecheck Result

```
> @workspace/mobile@0.0.0 typecheck
> tsc -p tsconfig.json --noEmit

(no output — clean)
```

---

## What Comes Next

- **Chapter 12 — Crown of Ash**: the five factions receive the truth from Chapter 11 and must decide what to do with it. Entry: `chapter12_start`.
- **Final Chapter — The Last Gate**: true ending route; requires Chapter 11 `ending_ch11_final_gate_path_unlocked` or `ending_ch11_truth_bearer` active flags.
- Art pass: replace all 11 placeholder imageKeys with dedicated sub-city / ancient-structure pixel art.
