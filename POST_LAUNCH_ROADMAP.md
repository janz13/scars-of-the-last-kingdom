# Post-Launch Roadmap — Scars of the Last Kingdom

## Day-One Patch Plan (v1.0.1)

**Trigger:** Critical bugs found within first 24 hours of internal/closed testing.

| Priority | Task | Details |
|----------|------|---------|
| P0 | Crash fixes | Any crash on launch, save/load, or node navigation |
| P0 | Save data loss | Any scenario where save data is lost unexpectedly |
| P0 | Broken story paths | Any node that leads to a dead-end with no choices and no ending |
| P1 | Broken images | Missing background art showing as blank screen |
| P1 | Back button issues | Android back button causing unexpected exits |
| P1 | Keyboard overlap | Text input in character creator hidden by soft keyboard |
| P2 | Typo fixes | Story text typos or formatting issues |
| P2 | UI clipping | Content cut off on specific screen sizes |

**Process:**
1. Reproduce from crash logs / user reports
2. Fix in a branch, test on emulator + device
3. Bump `versionCode` to 2, `version` to `1.0.1`
4. Build and upload to Internal Testing → verify → promote

---

## First-Week Bug Fix Plan (v1.0.2–1.0.3)

**Focus:** Stability and UX polish based on real-player feedback.

| Area | Tasks |
|------|-------|
| **Save system** | Verify endings persistence across all reset paths; test migration from v1.0.0 saves |
| **Performance** | Profile long playthroughs (100+ nodes); optimize route history rendering |
| **Touch UX** | Verify all touch targets ≥ 44dp; fix any missed taps on small screens |
| **Text rendering** | Verify fontSize setting applies consistently across all panels |
| **Offline** | Confirm service worker caches all needed assets; test fresh install → airplane mode |
| **Story bugs** | Fix any reported dead-ends, broken conditional paths, or missing flag checks |
| **Accessibility** | Verify focus-visible outlines work for keyboard/switch navigation |
| **Notifications** | Replace placeholder 24×24 and 36×36 notification icons with proper art |

**Release cadence:** Patch releases every 2–3 days as needed during first week.

---

## First-Month Content Update Plan (v1.1.0)

**Target:** 4 weeks after launch. Major update with new content and improvements.

### New content
- **Chapter 3 narrative content** — Current Ch3 nodes exist but need richer prose and more branching
- **Prologue chapter** — Currently empty; add intro sequence before Chapter 1
- **New ending variants** — Add conditional endings for under-explored paths
- **Companion-specific scenes** — More Mira and Cain dialogue in Ch2+

### Quality-of-life improvements
- **Manual save slots** — Multiple save slots instead of single auto-save
- **Chapter select** — Jump to previously reached chapters
- **Story recap** — "Previously on..." summary when continuing after a break
- **Settings export** — Backup/restore save data to file
- **Text speed improvements** — Smoother typewriter effect with configurable speed

### Technical improvements
- **`expo-updates`** integration — OTA JS updates without Play Store review for bug fixes
- **Crash reporting** — Add lightweight, privacy-respecting crash reporter (e.g., Sentry with no PII)
- **ProGuard/R8** — Minification for smaller APK
- **Bundle size audit** — Remove unused assets, optimize image compression

---

## DLC / Expansion Chapters

### The Descent (Chapter II expansion) — v1.2.0
- Deepen existing Ch2 paths with more branching
- Add new faction-specific storylines for Glass Court and Hollow Children
- New companion event scenes for Mira and Cain in Ch2
- 20+ new endings specific to Ch2 deep paths

### The Surface (Chapter III) — v1.3.0
- Full Chapter 3 with surface exploration
- New survival mechanics: radiation exposure, weather events
- New location art: surface ruins, collapsed skyscrapers, ash storms
- New faction: The Surface Walkers

### The Signal (Chapter IV) — v1.4.0
- Corruption-focused chapter with hallucination-heavy paths
- The mark's origin story
- New corruption-specific endings and transformations
- Branching paths that depend on all previous chapter choices

### The Last Archive (Chapter V) — v1.5.0
- Endgame chapter tying all faction paths together
- True ending path fully realized
- Final confrontation with the source of the mark
- Multiple "final" endings based on cumulative choices across all chapters

---

## New Companions

### Sera (Chapter 3+)
- **Background:** A former Iron Saints medic who deserted after the Purification
- **Mechanics:** Healing bonus, medical knowledge unlocks new paths
- **Trust arc:** Grows through mercy choices; breaks if you ally with Iron Saints
- **Endings:** 3–5 Sera-specific endings (sacrifice, betrayal, redemption)

### Juno (Chapter 5+)
- **Background:** A Glass Court researcher who knows what the mark really is
- **Mechanics:** Intelligence bonus, can decode corrupted text, reveals hidden lore
- **Trust arc:** Grows through curiosity and knowledge-seeking; breaks if you destroy research
- **Endings:** 3–5 Juno-specific endings (truth, madness, transcendence)

### Future companions (post-v2.0)
- **The Rat King** — Underground information broker, trust through trade
- **The Bellkeeper** — Mysterious figure who guards the shrine, trust through ritual

---

## New Endings

### Priority additions (v1.1.0)
- **Iron Saints full enlistment path** — Rise through the ranks ending
- **Glass Court research subject** — Become the experiment ending
- **Hollow Children initiation** — Join the underground market ending
- **Red Choir absorption** — Become the instrument ending
- **Solo survival** — Complete the game with no companion ending

### Secret endings (v1.2.0+)
- **The Thirteenth Signal** — Hidden truth ending (exists in data, needs full story path)
- **The Sleeper Wakes** — Activate the sleeping server ending
- **The Mark Bearer** — Embrace the corruption fully ending
- **The Archivist** — Discover all lore entries ending

### Community-requested endings
- Track player feedback for most-wanted ending types
- Add endings that resolve popular "what if" scenarios from player discussions

---

## Improved Art Plan

### Phase 1: Icon and splash (v1.0.1)
- Replace placeholder app icon with final polished artwork
- Create proper adaptive icon foreground with safe zone compliance
- Add animated splash screen transition (fade from icon to game)

### Phase 2: Background art upgrade (v1.1.0)
- Current pixel-art backgrounds are functional but basic
- Add atmospheric effects: fog, flickering lights, particle dust
- Improve color grading for mood consistency across scenes
- Add subtle parallax or ambient animation on native platforms

### Phase 3: Character art (v1.2.0+)
- Add character portraits for Mira, Cain, and key NPCs
- Expression variants for emotional moments
- Companion status indicators on portraits (injured, corrupted, etc.)

### Phase 4: Full art overhaul (v2.0+)
- Commission professional background art for all scenes
- Animated scene transitions between nodes
- Full-screen CG art for key story moments and endings

---

## Music and Sound Plan

### Phase 1: Ambient soundscapes (v1.1.0)
- Metro tunnel ambience (dripping water, distant trains, echo)
- Surface wind and ash storm sounds
- Faction-specific ambient tracks (Iron Saints drums, Archive whispers)
- Low-volume, loopable, atmospheric — not distracting

### Phase 2: UI sound effects (v1.1.0)
- Choice selection tap sound
- Dice roll sounds (dice clatter, success chime, failure thud)
- Stat change notification sounds
- Save notification sound
- Chapter transition sting

### Phase 3: Story music (v1.2.0+)
- Companion theme motifs (Mira: hopeful strings, Cain: tense percussion)
- Ending music per category (death: somber, secret: mysterious, true: triumphant)
- Hallucination distortion effects on existing tracks
- Boss/confrontation tension tracks

### Phase 4: Full soundtrack (v2.0+)
- Original score with 15–20 tracks
- Dynamic music system that shifts based on scene mood
- Music volume control in settings

---

## Accessibility Improvements

### v1.0.1 (Quick wins)
- [ ] Verify all interactive elements have `accessibilityLabel`
- [ ] Ensure color is not the only differentiator (add icons/text to stat bars)
- [ ] Test with TalkBack screen reader on Android

### v1.1.0 (Medium effort)
- [ ] High-contrast mode toggle in settings
- [ ] Dyslexia-friendly font option
- [ ] Reduce motion mode (disable animations for vestibular sensitivity)
- [ ] Adjustable line spacing for story text
- [ ] VoiceOver/TalkBack support for all story text and choices

### v1.2.0+ (Significant effort)
- [ ] Full screen reader navigation for all panels
- [ ] Switch control support for motor accessibility
- [ ] Color-blind safe stat indicators (shapes + colors)
- [ ] Configurable auto-advance speed for story text
- [ ] Haptic feedback patterns for different event types

---

## Localization Plan

### Phase 1: Infrastructure (v1.1.0)
- [ ] Extract all user-facing strings into i18n resource files
- [ ] Set up locale detection from device settings
- [ ] Create English source file as base for translation

### Phase 2: Priority languages (v1.2.0)
Based on visual novel market demand:
- [ ] **Japanese** — Largest VN market; professional translation required
- [ ] **Simplified Chinese** — Massive mobile market
- [ ] **Korean** — Strong VN audience
- [ ] **Spanish** — Broad reach across LatAm and Spain

### Phase 3: Additional languages (v1.3.0+)
- [ ] French, German, Portuguese, Russian
- [ ] Consider community translation for lower-priority languages

### Translation approach
- Story text (~200K words) requires professional literary translation
- UI strings (~500 items) can use standard localization
- Test each language on small screens for text overflow
- Allow language selection in settings, default to device locale

---

## Player Feedback Tracking

### Channels
| Channel | Purpose | Tool |
|---------|---------|------|
| Google Play reviews | Public feedback, ratings | Play Console |
| In-app feedback | Direct bug reports | Custom form or email link |
| Discord / Reddit | Community discussion | Manual monitoring |
| Crash logs | Technical issues | Sentry (when added) |
| Analytics | Usage patterns | Privacy-respecting analytics (when added) |

### Triage process
1. **P0 — Crash or data loss:** Fix within 24 hours, patch release
2. **P1 — Broken gameplay:** Fix within 3 days, patch release
3. **P2 — UX issue:** Queue for next scheduled release
4. **P3 — Feature request:** Add to backlog, prioritize by demand
5. **P4 — Content suggestion:** Consider for content updates

### Metrics to track
- Crash-free rate (target: >99.5%)
- Average session length
- Ending discovery rate (what % of players find >5 endings?)
- Chapter reach (how far do players get before stopping?)
- Reset rate (how often do players start new timelines?)

---

## Version Update Strategy

### Semantic versioning
- **Major (2.0.0):** New chapters, new companions, breaking changes
- **Minor (1.1.0):** New content, new features, QoL improvements
- **Patch (1.0.1):** Bug fixes, typo fixes, minor adjustments

### Release cadence
| Type | Cadence | Review required |
|------|---------|----------------|
| Patch | As needed (day 1: daily; week 1: every 2–3 days) | Play Console: fast review (~1hr) |
| Minor | Monthly | Play Console: standard review (~1–3 days) |
| Major | Quarterly | Play Console: standard review + feature graphic update |

### `expo-updates` for hotfixes
- Install `expo-updates` to enable OTA JS bundle updates
- Allows pushing bug fixes without Play Store review
- Only works for JS changes — native changes still need Play review
- Must comply with Play Store policy on update mechanisms

### Testing tracks
1. **Internal Testing** — Dev team only, immediate
2. **Closed Testing** — Small group of testers, <24hr rollout
3. **Open Testing** — Public beta, 1–3 day rollout
4. **Production** — All users, staged rollout (10% → 50% → 100%)

### Rollback plan
- Keep previous AAB available in Play Console
- If critical bug in production: halt staged rollout, fix, push patch
- For non-critical issues: patch normally through staged rollout

---

## Long-Term Vision (v2.0+)

- **8 chapters** of branching narrative (currently 2+ with partial content)
- **5+ companions** with full trust arcs and specific endings
- **500+ endings** across all categories
- **Professional art** for all scenes
- **Original soundtrack** with dynamic music
- **4+ languages** localized
- **Full accessibility** compliance
- **Community features** — ending sharing, route comparison (no multiplayer, just social)
- **New Game+** — Carry discovered endings and flags into new playthroughs for hidden paths
