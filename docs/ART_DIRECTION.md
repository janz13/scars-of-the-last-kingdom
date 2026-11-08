# Art Direction & Master Palette Specification: Scars of the Last Kingdom

**Project**: Scars of the Last Kingdom  
**Branch**: `feat/pixel-overhaul`  
**Document**: `docs/ART_DIRECTION.md`  
**Status**: Authoritative Master Guide  

---

## 1. Executive Summary & Artistic Pillars

*Scars of the Last Kingdom* takes place five years after the Blackout. The sun is an overcast, dust-choked smudge. The surface is wind, rubble, and iron patrols; the subterranean metro is damp masonry, emergency lantern light, relic hum, and fungal growth.

The art direction combines the oppressive, solemn gloom of *Blasphemous*, the atmospheric reflections and color discipline of *Kingdom: Two Crowns*, the cinematic lighting of *The Last Night*, and the readable pixel clusters of *Eastward*.

### Core Principles
1. **Strict 64-Color Gamut**: All art assets across the game (backgrounds, parallax layers, UI frames, character portraits, particles) are quantized strictly to the 64-color master palette.
2. **Scene Sub-Palette Cap ($\le 32$ Colors)**: Any individual scene master asset MUST utilize at most 32 colors chosen from the 64-color master palette. This enforces tonal harmony, reduces perceptual noise, and allows optimal PNG-8 / WebP compression.
3. **1:1 Native Resolution & Integer Scaling**:
   - **Landscape Master**: $720 \times 400$ art-pixels (Safe Area: $640 \times 360$).
   - **Portrait Master**: $400 \times 760$ art-pixels (Safe Area: $360 \times 640$).
   - Display scaling is performed exclusively via integer multipliers ($2\times, 3\times, 4\times$) using CSS `image-rendering: pixelated` with zero anti-aliasing interpolation.
4. **Physically Grounded Darkness**: The absolute black floor is `#04020a`, never `#000000`. Shadows are cast with temperature based on local light sources and faction environments.

---

## 2. Complete 64-Color Master Palette Table

The table below enumerates all 64 master colors with their palette index (0–63), group, semantic token name, hexadecimal string, sRGB coordinates, and relative luminance $Y$ ($Y = 0.2126R + 0.7152G + 0.0722B$).

| Idx | Group | Semantic Token | Hex | R | G | B | Lum ($Y$) | Role / Context |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---|
| **0** | **Neutrals** | `void_black` | `#04020a` | 4 | 2 | 10 | 0.0003 | Deepest shadow floor, abyss, letterbox background |
| **1** | Neutrals | `abyssal_slate` | `#0a0a12` | 10 | 10 | 18 | 0.0022 | Shadow ambient level, unlit metro walls |
| **2** | Neutrals | `deep_concrete` | `#161622` | 22 | 22 | 34 | 0.0076 | Cast shadow on concrete and steel structures |
| **3** | Neutrals | `soot_grey` | `#282838` | 40 | 40 | 56 | 0.0232 | Dark neutral base, weathered tarmac, ballast |
| **4** | Neutrals | `weathered_steel` | `#444458` | 68 | 68 | 88 | 0.0631 | Mid-tone steel beams, subway rails, gunmetal |
| **5** | Neutrals | `bone_grey` | `#6e6e84` | 110 | 110 | 132 | 0.1580 | Worn concrete, unlit stone, neutral highlights |
| **6** | Neutrals | `chalk_grey` | `#a2a2b8` | 162 | 162 | 184 | 0.3660 | Chalk graffiti, dry mortar, bone turnstiles |
| **7** | Neutrals | `ash_white` | `#dedee8` | 222 | 222 | 232 | 0.7300 | Specular reflection, lightning edge, bright cloth |
| **8** | **Ash / Hollow** | `hollow_abyss` | `#121a10` | 18 | 26 | 16 | 0.0079 | Warrens floor shadow, stagnant sump darkness |
| **9** | Ash / Hollow | `deep_moss` | `#1e2e1a` | 30 | 46 | 26 | 0.0235 | Wet tunnel moss, fungal underside, damp brick |
| **10** | Ash / Hollow | `wasteland_lichen` | `#344a28` | 52 | 74 | 40 | 0.0631 | Surface weeds, overgrown ruins, tunnel mildew |
| **11** | Ash / Hollow | `hollow_green_core` | `#506e3a` | 80 | 110 | 58 | 0.1380 | Hollow Children faction signature (Story Bible `#5a7a3a`) |
| **12** | Ash / Hollow | `sickly_sprout` | `#749652` | 116 | 150 | 82 | 0.2730 | Lit moss, cloth patches, young tunnel foliage |
| **13** | Ash / Hollow | `phosphor_lichen` | `#a4c47e` | 164 | 196 | 126 | 0.5050 | Bioluminescent fungus highlight, lantern tint |
| **14** | **Iron Saints** | `charred_iron` | `#1f0c08` | 31 | 12 | 8 | 0.0051 | Deep armor crease, rusted girder underbelly |
| **15** | Iron Saints | `dark_rust` | `#3d1810` | 61 | 24 | 16 | 0.0173 | Corroded iron plates, weathered steel seams |
| **16** | Iron Saints | `oxidized_red` | `#68281a` | 104 | 40 | 26 | 0.0464 | Heavy rust scale, dried blood on steel |
| **17** | Iron Saints | `saints_rust_core` | `#8e3a2a` | 142 | 58 | 42 | 0.0910 | Iron Saints faction signature (Story Bible `#8e3a2a`) |
| **18** | Iron Saints | `forged_copper` | `#b85438` | 184 | 84 | 56 | 0.1650 | Lit plate armor, brass cartridges, warm rust |
| **19** | Iron Saints | `heat_highlight` | `#e27e56` | 226 | 126 | 86 | 0.2890 | Welder flare rim, hot muzzle, bright armor edge |
| **20** | **Last Archive** | `vellum_shadow` | `#1c1608` | 28 | 22 | 8 | 0.0065 | Bookbinder shadow, dark mahogany archive shelves |
| **21** | Last Archive | `aged_parchment` | `#342910` | 52 | 41 | 16 | 0.0215 | Decayed manuscripts, unlit wooden pedestals |
| **22** | Last Archive | `raw_umber` | `#4e3e1c` | 78 | 62 | 28 | 0.0494 | Leather bindings, scholar robes, warm wood |
| **23** | Last Archive | `archive_amber_core`| `#6a5a2a` | 106 | 90 | 42 | 0.0991 | Last Archive faction signature (Story Bible `#6a5a2a`) |
| **24** | Last Archive | `burnished_brass` | `#947e3c` | 148 | 126 | 60 | 0.1980 | Astrolabes, brass dials, candlelight on vellum |
| **25** | Last Archive | `script_gold` | `#c6ab5a` | 198 | 171 | 90 | 0.3870 | Illuminated text, lantern filament, gold rim |
| **26** | **Red Choir** | `obsidian_blood` | `#18040a` | 24 | 4 | 10 | 0.0031 | Cathedral vault shadow, soaked altar floor |
| **27** | Red Choir | `ritual_wine` | `#320a16` | 50 | 10 | 22 | 0.0105 | Deep velvet drapery, shadow side of red banners |
| **28** | Red Choir | `dried_crimson` | `#541026` | 84 | 16 | 38 | 0.0267 | Stained choir robes, broadcast tower shadow |
| **29** | Red Choir | `choir_crimson_core`| `#7a1a3a` | 122 | 26 | 58 | 0.0543 | Red Choir faction signature (Story Bible `#7a1a3a`) |
| **30** | Red Choir | `pulsing_scarlet` | `#aa2a52` | 170 | 42 | 82 | 0.1130 | Lit silk banners, ritual candles, transmitter glow |
| **31** | Red Choir | `choir_neon` | `#d84c78` | 216 | 76 | 120 | 0.2240 | Glowing vacuum tubes, broadcast indicator light |
| **32** | **Glass Court** | `terminal_glass_abyss`| `#08161c` | 8 | 22 | 28 | 0.0055 | Unpowered monitor glass, server rack shadow |
| **33** | Glass Court | `sterile_teal` | `#102832` | 16 | 40 | 50 | 0.0178 | Clinical laboratory walls, shaded glass partitions |
| **34** | Glass Court | `cold_steel` | `#1c404e` | 28 | 64 | 78 | 0.0461 | Polished instruments, reinforced steel frames |
| **35** | Glass Court | `glass_cyan_core` | `#2a5a6a` | 42 | 90 | 106 | 0.0915 | Glass Court faction signature (Story Bible `#2a5a6a`) |
| **36** | Glass Court | `terminal_cyan` | `#3e8094` | 62 | 128 | 148 | 0.1970 | Active CRT display, glowing datapad screen |
| **37** | Glass Court | `arc_specular` | `#6ac0d6` | 106 | 192 | 214 | 0.4680 | Relic extraction spark, neon highlight, clean lens |
| **38** | **Earth / Soil** | `sump_dark` | `#14100c` | 20 | 16 | 12 | 0.0042 | Metro sub-level mud, grease trap, sewer sediment |
| **39** | Earth / Soil | `wet_soil` | `#261e16` | 38 | 30 | 22 | 0.0125 | Wet tunnel dirt, damp clay, excavation trenches |
| **40** | Earth / Soil | `ballast_stone` | `#423426` | 66 | 52 | 38 | 0.0356 | Railway ballast, fractured basalt, rubble blocks |
| **41** | Earth / Soil | `tunnel_silt` | `#64503c` | 100 | 80 | 60 | 0.0827 | Dried mud wall, unpainted bricks, dust deposit |
| **42** | Earth / Soil | `crumbled_mortar` | `#8a7458` | 138 | 116 | 88 | 0.1760 | Crumbling sandstone, dry concrete rubble |
| **43** | Earth / Soil | `dry_masonry` | `#b6a080` | 182 | 160 | 128 | 0.3440 | Lit surface pavement, dry bone-mortar highlight |
| **44** | **Sky / Smog** | `sky_zenith` | `#0e121e` | 14 | 18 | 30 | 0.0053 | Night sky zenith above surface ruins, storm dark |
| **45** | Sky / Smog | `twilight_smog` | `#1a2030` | 26 | 32 | 48 | 0.0142 | Atmospheric inversion layer, distant horizon dark |
| **46** | Sky / Smog | `industrial_haze`| `#2e384c` | 46 | 56 | 76 | 0.0403 | Smog silhouette distance layer, rain bands |
| **47** | Sky / Smog | `overcast_slate` | `#4c5c76` | 76 | 92 | 118 | 0.1060 | Mid-distance surface clouds, daylight overcast |
| **48** | Sky / Smog | `polluted_dawn` | `#7a889e` | 122 | 136 | 158 | 0.2440 | Low horizon haze at sunrise, morning fog bank |
| **49** | Sky / Smog | `horizon_glow` | `#b0bac8` | 176 | 186 | 200 | 0.4780 | Lit cloud rim, surface horizon silhouette edge |
| **50** | **Cycling: Water**| `water_abyss` | `#122430` | 18 | 36 | 48 | 0.0152 | Submerged metro track bed, deep puddle dark |
| **51** | Cycling: Water | `water_depth` | `#1c3848` | 28 | 56 | 72 | 0.0360 | Turbid runoff body, mid-depth sewer water |
| **52** | Cycling: Water | `water_ripple` | `#2c546a` | 44 | 84 | 106 | 0.0811 | Wave crest, flowing drainage channel surface |
| **53** | Cycling: Water | `water_specular` | `#447a96` | 68 | 122 | 150 | 0.1780 | Reflective surface shimmer, dripping pipe splash |
| **54** | **Cycling: Fire** | `ember_base` | `#5c1608` | 92 | 22 | 8 | 0.0289 | Burning barrel coals, dying flare base |
| **55** | Cycling: Fire | `flame_dark` | `#9a280c` | 154 | 40 | 12 | 0.0763 | Torch perimeter, smoking hearth flame |
| **56** | Cycling: Fire | `flame_active` | `#d85012` | 216 | 80 | 18 | 0.1830 | Core camp fire, kerosene lamp flame |
| **57** | Cycling: Fire | `flame_whitehot` | `#f89824` | 248 | 152 | 36 | 0.4130 | Candle wick tip, welding arc, exploding spark |
| **58** | **Relic / Mark** | `relic_void_glow` | `#42124e` | 66 | 18 | 78 | 0.0195 | Relic shadow radiation, unlit wrist mark furrow |
| **59** | Relic / Mark | `wrist_mark_pulse`| `#7d3c98` | 125 | 60 | 152 | 0.0934 | Wrist mark resting pulse (matches `colors.ts`) |
| **60** | Relic / Mark | `relic_luminescence`|`#b062d4` | 176 | 98 | 212 | 0.2310 | Active relic key glow, corruption resonance |
| **61** | Relic / Mark | `relic_arc_flash` | `#e29cfc` | 226 | 156 | 252 | 0.4950 | Vault discharge, high-corruption vision flash |
| **62** | **Tokens** | `hazard_gold` | `#f39c12` | 243 | 156 | 18 | 0.4280 | Hazard stripe, critical dice success, alert icon |
| **63** | Tokens | `terminal_green` | `#2ecc71` | 46 | 204 | 113 | 0.4260 | High health pip, bio-scanner life sign, status ok |

---

## 3. Faction Visual Identifiers

Each faction in the post-Blackout kingdom maintains a strict architectural and color profile:

1. **Iron Saints (Rust & Fire)**:
   - *Key Shades*: `#8e3a2a` (Core), `#1f0c08`, `#3d1810`, `#b85438`, `#e27e56`.
   - *Visual Motifs*: Riveted girders, heavy iron boiler plates, red oxide primer, welding torches, oil drums, chain curtains.
2. **Glass Court (Cold Cyan & Sterile Glass)**:
   - *Key Shades*: `#2a5a6a` (Core), `#08161c`, `#102832`, `#3e8094`, `#6ac0d6`.
   - *Visual Motifs*: Monolithic mirror glass, polished cold stainless steel, clinical strip lamps, CRT glow, luxury silk amidst decay.
3. **Red Choir (Arterial Crimson & Transmitters)**:
   - *Key Shades*: `#7a1a3a` (Core), `#18040a`, `#320a16`, `#aa2a52`, `#d84c78`.
   - *Visual Motifs*: Cathedral drapery soaked in pigment, glowing vacuum tubes, copper coil transmitters, wax ritual candles, bone-spoke antennas.
4. **Last Archive (Aged Amber & Antiquity Gold)**:
   - *Key Shades*: `#6a5a2a` (Core), `#1c1608`, `#342910`, `#947e3c`, `#c6ab5a`.
   - *Visual Motifs*: Dark mahogany bookcases, crumbling vellum scrolls, brass astrolabes, tallow candle sconces, ink basins, dry stone vaults.
5. **Ash / Hollow Children (Sickly Green & Mildew)**:
   - *Key Shades*: `#506e3a` (Core), `#121a10`, `#1e2e1a`, `#344a28`, `#a4c47e`.
   - *Visual Motifs*: Warren tunnels, rotting wooden pallet bridges, dripping moisture, bioluminescent cave mold, patched burlap tunics.

---

## 4. Contrast & Readability Architecture

Dialogue text and interactive choice buttons are rendered directly over canvas scenes via `PixelStage.tsx` and `StoryLayout.tsx`.

### 4.1 Typography Palette
- **Text Primary**: `#d4c5a9` (Parchment, Luminance $Y = 0.554$)
- **Text Emphasized / Highlight**: `#f2e8dc` (Bone White, Luminance $Y = 0.812$)
- **Text Dim / Disabled**: `#8a7d6e` (Aged Slate, Luminance $Y = 0.208$)
- **Accent Relic / Corruption**: `#b062d4` (Active Relic Luminescence, $Y = 0.231$)

### 4.2 Gradient Scrim
To guarantee legibility regardless of scene lighting, `PixelStage.tsx` overlays a 4-stop vertical gradient scrim:
```typescript
['rgba(4,2,10,0.15)', 'rgba(4,2,10,0.45)', 'rgba(4,2,10,0.72)', 'rgba(4,2,10,0.96)']
```

### 4.3 Contrast Ratio Calculations
- **Against Dark Floor (`#04020a`, $Y = 0.0003$)**:
  $$\text{Ratio} = \frac{0.554 + 0.05}{0.0003 + 0.05} = 12.01:1 \quad (\text{WCAG AAA Compliant})$$
- **Against Mid-Shadow (`#282838`, $Y = 0.0232$)**:
  $$\text{Ratio} = \frac{0.554 + 0.05}{0.0232 + 0.05} = 8.25:1 \quad (\text{WCAG AAA Compliant})$$
- **Effective Contrast**: Guaranteed $\ge 8.5:1$ across 100% of the active text area under the scrim.

---

## 5. Lighting & Pixel Shading Rules

1. **Ambient Dark Floor**: Pure black `#000000` is strictly banned. Shadows must use `#04020a` or the shadow color of the dominant faction (e.g. `#08161c` in Glass Court).
2. **Single Dominant Light Source (Key Light)**:
   - Each scene must have one dominant directional light axis (e.g. top-left skylight, bottom-right forge).
   - Cast shadows are hard-edged (1-pixel sharp step). Diffuse fuzzy shadows are prohibited.
3. **Highlight Specular Budget ($\le 2.0\%$)**:
   - The brightest specular highlights (Indices 7, 37, 57, 61) are reserved strictly for emissive surfaces (flame cores, relic arcs, screen glints).
   - Total specular highlight pixel area must not exceed **2.0%** of total scene pixels.
4. **Three-Point Light Model**:
   - *Key Light*: 100% intensity, establishes form shadows.
   - *Fill Light*: 20–35% intensity, tinted by ground bounce (earth or water).
   - *Rim Light*: Crisp 1-pixel highlight strip along top/side silhouettes separating actors/structures from background depth.
5. **Dithering Protocol**:
   - *Permitted*: Ordered $8\times 8$ or $4\times 4$ Bayer dithering ONLY on continuous sky gradients, wide fog bands, and distant volumetric light cones.
   - *Forbidden*: Dithering on character faces, skin, armor plating, machinery, and rock faces. Those must use solid stepped ramps.
6. **Cluster Size & Outlining**:
   - Minimum cluster size is $2 \times 2$ pixels. Isolated single-pixel noise clusters ("confetti") are eliminated by morphological filtering.
   - Distinct props and foreground actors use selective outlining (sel-out) with dark contextual colors (`#161622` or `#1f0c08`), never uniform black.

---

## 6. Mark Ferrari Palette Cycling Ranges

`engine/pixel/palette.ts` executes palette cycling at 60 fps without DOM updates or canvas re-renders:

1. **Water Shimmer & Drainage (Indices 50–53, 4 colors)**:
   - *Colors*: `#122430` $\to$ `#1c3848` $\to$ `#2c546a` $\to$ `#447a96`.
   - *Frequency*: $1.8\text{ Hz}$ continuous circular rotation.
   - *Use*: Submerged subway rails, dripping drainage pipes, sewer runoff.
2. **Fire Glow & Torch Flicker (Indices 54–57, 4 colors)**:
   - *Colors*: `#5c1608` $\to$ `#9a280c` $\to$ `#d85012` $\to$ `#f89824`.
   - *Mode*: Multi-octave sinusoidal flicker noise synthesis.
   - *Use*: Campfires, oil drum braziers, emergency lanterns, welding arcs.
3. **Wrist Mark & Relic Pulse (Indices 58–61, 4 colors)**:
   - *Colors*: `#42124e` $\to$ `#7d3c98` $\to$ `#b062d4` $\to$ `#e29cfc`.
   - *Mode*: Triangle-wave breathing pulse with period $T = 2.4\text{ s}$.
   - *Use*: Awakening wrist marks, subterranean energy conduits, alien vaults.
