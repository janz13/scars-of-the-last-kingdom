import React, { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { ENDINGS, ENDING_CATEGORIES, CANONICAL_CATEGORIES, EndingDefinition } from '../data/story/endings';
import { getBackgroundImage, getBackgroundGradient } from '../constants/images';
import { BACKGROUNDS, CLASSES } from '../data/characterOptions';
import { CinematicView } from './scene/CinematicView';
import { getEndingLoopTimeline } from '../data/cinematics/endingLoops';

// ─── Palette ──────────────────────────────────────────────────────────────────

const BG       = '#0a0a0f';
const CARD     = '#13121e';
const CARD2    = '#1a1928';
const TEXT     = '#d4c5a9';
const MUTED    = '#6a5e50';
const BORDER   = '#25233a';
const ACCENT   = '#9b59b6';
const GOLD     = '#c9a84c';
const GREEN    = '#27ae60';
const RED      = '#c0392b';
const ORANGE   = '#e67e22';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'journey' | 'companions' | 'factions' | 'endings' | 'flags';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'journey',    label: 'Journey',    icon: 'compass' },
  { id: 'companions', label: 'Companions', icon: 'users' },
  { id: 'factions',   label: 'Factions',   icon: 'flag' },
  { id: 'endings',    label: 'Endings',    icon: 'book-open' },
  { id: 'flags',      label: 'Flags',      icon: 'tag' },
];

// ─── Helper components ────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function ProgressBar({
  value,
  max,
  color,
  height = 6,
}: {
  value: number;
  max: number;
  color: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <View style={[styles.barTrack, { height }]}>
      <View style={[styles.barFill, { width: `${pct * 100}%` as any, backgroundColor: color, height }]} />
    </View>
  );
}

function BiBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const clamped = Math.max(-100, Math.min(100, value));
  const isPos = clamped >= 0;
  const pct = Math.abs(clamped) / 100;
  return (
    <View style={styles.biBarWrap}>
      <View style={styles.biBarNeg}>
        {!isPos && (
          <View
            style={[
              styles.biBarFillNeg,
              { width: `${pct * 100}%` as any, backgroundColor: RED },
            ]}
          />
        )}
      </View>
      <View style={styles.biBarCenter} />
      <View style={styles.biBarPos}>
        {isPos && (
          <View
            style={[
              styles.biBarFillPos,
              { width: `${pct * 100}%` as any, backgroundColor: color },
            ]}
          />
        )}
      </View>
    </View>
  );
}

// ─── Journey Tab ─────────────────────────────────────────────────────────────

function JourneyTab() {
  const { state, currentNode } = useGame();
  const { character, routeHistory, currentNodeId, stats, flags } = state;

  const bgName = character
    ? (BACKGROUNDS.find((b) => b.id === character.background)?.name ?? character.background)
    : null;
  const className = character
    ? (CLASSES.find((c) => c.id === character.characterClass)?.name ?? character.characterClass)
    : null;

  const chapter  = currentNode?.chapter ?? '—';
  const location = currentNode?.location ?? '—';
  const nodeTitle = currentNode?.title ?? currentNodeId;

  const recentChoices = useMemo(() => {
    return [...routeHistory].reverse().slice(0, 8);
  }, [routeHistory]);

  const importantChoices = useMemo(() => {
    return routeHistory.filter(
      (e) =>
        e.choiceText !== 'Continue' &&
        e.choiceText !== '...' &&
        e.choiceText.length > 6
    ).slice(-5).reverse();
  }, [routeHistory]);

  return (
    <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Status summary */}
      <Card>
        <View style={styles.journeyStatusRow}>
          <View style={styles.journeyStatusItem}>
            <Text style={styles.journeyStatusVal}>{chapter}</Text>
            <Text style={styles.journeyStatusKey}>CHAPTER</Text>
          </View>
          <View style={styles.journeyStatusDivider} />
          <View style={[styles.journeyStatusItem, { flex: 2 }]}>
            <Text style={[styles.journeyStatusVal, { fontSize: 12 }]} numberOfLines={1}>{location}</Text>
            <Text style={styles.journeyStatusKey}>LOCATION</Text>
          </View>
          <View style={styles.journeyStatusDivider} />
          <View style={styles.journeyStatusItem}>
            <Text style={styles.journeyStatusVal}>{routeHistory.length}</Text>
            <Text style={styles.journeyStatusKey}>CHOICES</Text>
          </View>
        </View>
      </Card>

      {/* Current node */}
      <Card>
        <Text style={styles.cardEyebrow}>CURRENT SCENE</Text>
        <Text style={styles.cardValueLarge}>{nodeTitle}</Text>
        <View style={styles.routeChip}>
          <Feather name="map-pin" size={10} color={ACCENT} />
          <Text style={styles.routeChipText}>{location}</Text>
        </View>
      </Card>

      {/* Character info */}
      {character && (
        <Card>
          <Text style={styles.cardEyebrow}>SURVIVOR</Text>
          <Text style={styles.cardValueLarge}>{character.name}</Text>
          <View style={styles.chipRow}>
            <View style={[styles.chip, { borderColor: ACCENT + '55' }]}>
              <Text style={[styles.chipText, { color: ACCENT }]}>{className}</Text>
            </View>
            <View style={[styles.chip, { borderColor: GOLD + '55' }]}>
              <Text style={[styles.chipText, { color: GOLD }]}>{bgName}</Text>
            </View>
            <View style={[styles.chip, { borderColor: MUTED + '55' }]}>
              <Text style={[styles.chipText, { color: MUTED }]}>{character.personalityTrait}</Text>
            </View>
          </View>
        </Card>
      )}

      {/* Vital stats */}
      <Card>
        <Text style={styles.cardEyebrow}>VITALS</Text>
        <View style={styles.vitalsGrid}>
          {[
            { label: 'Health',     value: stats.health,  max: stats.maxHealth, color: RED },
            { label: 'Hunger',     value: stats.hunger,  max: 100, color: ORANGE },
            { label: 'Thirst',     value: stats.thirst,  max: 100, color: '#3498db' },
            { label: 'Morale',     value: stats.morale,  max: 100, color: GREEN },
            { label: 'Corruption', value: stats.corruption, max: 100, color: '#8e44ad' },
          ].map(({ label, value, max, color }) => (
            <View key={label} style={styles.vitalRow}>
              <Text style={styles.vitalLabel}>{label}</Text>
              <View style={{ flex: 1 }}>
                <ProgressBar value={value} max={max} color={color} />
              </View>
              <Text style={[styles.vitalValue, { color }]}>{value}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Important choices */}
      <SectionLabel text="SIGNIFICANT CHOICES" />
      {importantChoices.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>No significant choices recorded yet.</Text>
        </Card>
      ) : (
        importantChoices.map((entry, i) => (
          <Card key={i} style={styles.choiceCard}>
            <View style={styles.choiceRow}>
              <View style={styles.choiceDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.choiceScene}>{entry.nodeTitle}</Text>
                <Text style={styles.choiceText}>"{entry.choiceText}"</Text>
              </View>
            </View>
          </Card>
        ))
      )}

      {/* Route breadcrumb */}
      {recentChoices.length > 0 && (
        <>
          <SectionLabel text="RECENT PATH" />
          <Card>
            {recentChoices.map((entry, i) => (
              <View key={i} style={[styles.crumbRow, i < recentChoices.length - 1 && styles.crumbBorder]}>
                <View style={[styles.crumbDot, i === 0 && { backgroundColor: ACCENT }]} />
                <Text style={[styles.crumbText, i === 0 && { color: TEXT }]} numberOfLines={1}>
                  {entry.nodeTitle}
                </Text>
              </View>
            ))}
          </Card>
        </>
      )}
    </ScrollView>
  );
}

// ─── Companions Tab ───────────────────────────────────────────────────────────

function CompanionsTab() {
  const { state } = useGame();
  const { companions, character } = state;

  const startingCompanion = character?.startingCompanion;

  function trustLabel(t: number): string {
    if (t <= 2) return 'Distrustful';
    if (t <= 4) return 'Uncertain';
    if (t <= 6) return 'Cautious';
    if (t <= 8) return 'Trusted';
    return 'Unbreakable';
  }

  function trustColor(t: number): string {
    if (t <= 2) return RED;
    if (t <= 4) return ORANGE;
    if (t <= 6) return GOLD;
    if (t <= 8) return GREEN;
    return '#1abc9c';
  }

  const companionData = [
    {
      id: 'mira',
      name: 'Mira',
      role: 'Field Medic / Hollow Children Sympathiser',
      description: 'She has survived too much to be afraid of you. The question is whether you give her a reason to trust you instead.',
      state: companions.mira,
      accent: '#9b59b6',
    },
    {
      id: 'cain',
      name: 'Cain',
      role: 'Shadow Broker / Glass Court Informant',
      description: 'Every calculation has already been made. The only variable left is which side of the ledger you end up on.',
      state: companions.cain,
      accent: '#3498db',
    },
  ] as const;

  return (
    <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={styles.cardEyebrow}>COMPANION STATUS</Text>
        <Text style={styles.cardNote}>
          Trust affects dialogue options, ending paths, and whether a companion will sacrifice themselves for you.
          Scale: 0 (hostile) → 10 (unbreakable bond).
        </Text>
      </Card>

      {companionData.map(({ id, name, role, description, state: cs, accent }) => {
        const isStarting = startingCompanion === id;
        const statusColor = !cs.alive ? '#4a2020' : !cs.present ? MUTED : accent;
        const statusText  = !cs.alive ? 'DECEASED' : !cs.present ? 'NOT RECRUITED' : 'ACTIVE';

        return (
          <Card key={id}>
            <View style={styles.companionHeader}>
              <View style={[styles.companionAvatar, { borderColor: accent + '55' }]}>
                <Feather name="user" size={22} color={accent} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.companionNameRow}>
                  <Text style={[styles.companionName, { color: TEXT }]}>{name}</Text>
                  {isStarting && (
                    <View style={[styles.pillSmall, { borderColor: GOLD + '55' }]}>
                      <Text style={[styles.pillSmallText, { color: GOLD }]}>STARTING</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.companionRole}>{role}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '22', borderColor: statusColor + '55' }]}>
                  <Text style={[styles.statusBadgeText, { color: statusColor }]}>{statusText}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.companionDesc}>{description}</Text>

            {cs.present && cs.alive && (
              <View style={styles.trustSection}>
                <View style={styles.trustLabelRow}>
                  <Text style={styles.trustLabel}>TRUST</Text>
                  <Text style={[styles.trustValue, { color: trustColor(cs.trust) }]}>
                    {cs.trust} / 10  ·  {trustLabel(cs.trust)}
                  </Text>
                </View>
                <View style={styles.trustBarWrap}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.trustSegment,
                        { backgroundColor: i < cs.trust ? trustColor(cs.trust) : '#1e1c30' },
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}

            {!cs.present && !isStarting && (
              <Text style={styles.companionHint}>
                ○  Recruit {name} by making the right choice early in Chapter I.
              </Text>
            )}
          </Card>
        );
      })}

      {startingCompanion === 'none' && (
        <Card>
          <Feather name="user-x" size={16} color={MUTED} style={{ marginBottom: 8 }} />
          <Text style={styles.emptyText}>You chose to travel alone. Companion endings are locked in this run.</Text>
        </Card>
      )}
    </ScrollView>
  );
}

// ─── Factions Tab ─────────────────────────────────────────────────────────────

function FactionsTab() {
  const { state } = useGame();
  const { factionRep } = state;

  const factions = [
    {
      id: 'ironSaints' as const,
      name: 'Iron Saints',
      desc: 'Military zealots who believe order must be imposed by force. They worship the last functional rail line.',
      color: '#e74c3c',
    },
    {
      id: 'glassCourt' as const,
      name: 'Glass Court',
      desc: 'Pre-collapse aristocrats who maintained their networks through the Blackout. Information is their currency.',
      color: '#3498db',
    },
    {
      id: 'hollowChildren' as const,
      name: 'Hollow Children',
      desc: 'Survivors who were children during the Blackout. They grew up in the dark. They are not afraid of it.',
      color: '#2ecc71',
    },
    {
      id: 'redChoir' as const,
      name: 'Red Choir',
      desc: 'Cultists who believe the Blackout was a divine event. They seek relics as sacraments.',
      color: '#e67e22',
    },
    {
      id: 'lastArchive' as const,
      name: 'Last Archive',
      desc: 'Scholars who preserved every piece of knowledge they could. The truth about the Blackout lives in their vaults.',
      color: GOLD,
    },
  ];

  function repLabel(v: number): string {
    if (v <= -60) return 'Hostile';
    if (v <= -30) return 'Wary';
    if (v <= -5)  return 'Distrustful';
    if (v < 5)    return 'Neutral';
    if (v < 30)   return 'Known';
    if (v < 60)   return 'Respected';
    return 'Exalted';
  }

  return (
    <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={styles.cardEyebrow}>FACTION REPUTATION</Text>
        <Text style={styles.cardNote}>
          Reputation ranges from −100 (declared enemy) to +100 (exalted ally). Faction endings require at least +60 with one faction and neutral or better with others.
        </Text>
      </Card>

      {factions.map(({ id, name, desc, color }) => {
        const val = factionRep[id];
        const label = repLabel(val);
        const labelColor = val < 0 ? RED : val < 5 ? MUTED : color;

        return (
          <Card key={id}>
            <View style={styles.factionHeader}>
              <View style={[styles.factionColorBar, { backgroundColor: color }]} />
              <View style={{ flex: 1 }}>
                <View style={styles.factionNameRow}>
                  <Text style={styles.factionName}>{name}</Text>
                  <Text style={[styles.factionRepVal, { color: labelColor }]}>
                    {val > 0 ? '+' : ''}{val}  ·  {label}
                  </Text>
                </View>
                <BiBar value={val} color={color} />
                <Text style={styles.factionDesc}>{desc}</Text>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}

// ─── Endings Tab ──────────────────────────────────────────────────────────────

function EndingsTab() {
  const { state } = useGame();
  const { endingsDiscovered, character } = state;
  const { width } = useWindowDimensions();
  const isWidescreen = width >= 1440;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedEnding, setInspectedEnding] = useState<EndingDefinition | null>(null);

  const discoveredSet = useMemo(() => new Set(endingsDiscovered), [endingsDiscovered]);

  const totalEndings    = ENDINGS.length;
  const discoveredCount = ENDINGS.filter((e) => discoveredSet.has(e.id)).length;
  const pct = totalEndings > 0 ? Math.round((discoveredCount / totalEndings) * 100) : 0;

  const filteredEndings = useMemo(() => {
    if (selectedCategory === 'all') return ENDINGS;
    if (selectedCategory === 'branches') {
      return ENDINGS.filter((e) => e.id.startsWith('ending_mb'));
    }
    if (selectedCategory === 'epilogue') {
      return ENDINGS.filter((e) => e.id.startsWith('ending_epilogue_'));
    }
    return ENDINGS.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Overall progress */}
      <Card>
        <Text style={styles.cardEyebrow}>ENDINGS DISCOVERED</Text>
        <View style={styles.endingProgressRow}>
          <Text style={styles.endingBigNum}>
            {discoveredCount}
            <Text style={styles.endingBigDenom}>/{totalEndings}</Text>
          </Text>
          <Text style={[styles.endingPct, { color: pct >= 80 ? GOLD : pct >= 40 ? GREEN : MUTED }]}>
            {pct}%
          </Text>
        </View>
        <ProgressBar
          value={discoveredCount}
          max={Math.max(1, totalEndings)}
          color={pct >= 80 ? GOLD : pct >= 40 ? GREEN : ACCENT}
          height={8}
        />
      </Card>

      {/* Category filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilterScroll}
        contentContainerStyle={styles.categoryFilterContent}
      >
        <Pressable
          style={[styles.categoryPill, selectedCategory === 'all' && styles.categoryPillActive]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[styles.categoryPillText, selectedCategory === 'all' && styles.categoryPillTextActive]}>
            ALL ({totalEndings})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.categoryPill, selectedCategory === 'branches' && styles.categoryPillActive]}
          onPress={() => setSelectedCategory('branches')}
        >
          <Feather name="git-branch" size={11} color={selectedCategory === 'branches' ? GOLD : MUTED} style={{ marginRight: 4 }} />
          <Text style={[styles.categoryPillText, selectedCategory === 'branches' && styles.categoryPillTextActive]}>
            BRANCHES ({ENDINGS.filter((e) => e.id.startsWith('ending_mb') && discoveredSet.has(e.id)).length}/{ENDINGS.filter((e) => e.id.startsWith('ending_mb')).length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.categoryPill, selectedCategory === 'epilogue' && styles.categoryPillActive]}
          onPress={() => setSelectedCategory('epilogue')}
        >
          <Feather name="radio" size={11} color={selectedCategory === 'epilogue' ? GOLD : MUTED} style={{ marginRight: 4 }} />
          <Text style={[styles.categoryPillText, selectedCategory === 'epilogue' && styles.categoryPillTextActive]}>
            EPILOGUE ({ENDINGS.filter((e) => e.id.startsWith('ending_epilogue_') && discoveredSet.has(e.id)).length}/{ENDINGS.filter((e) => e.id.startsWith('ending_epilogue_')).length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.categoryPill, selectedCategory === 'faction' && styles.categoryPillActive]}
          onPress={() => setSelectedCategory('faction')}
        >
          <Feather name="flag" size={11} color={selectedCategory === 'faction' ? '#2980b9' : MUTED} style={{ marginRight: 4 }} />
          <Text style={[styles.categoryPillText, selectedCategory === 'faction' && styles.categoryPillTextActive]}>
            FACTION ({ENDINGS.filter((e) => e.category === 'faction' && discoveredSet.has(e.id)).length}/{ENDINGS.filter((e) => e.category === 'faction').length})
          </Text>
        </Pressable>
        {CANONICAL_CATEGORIES.filter((cat) => cat.id !== 'faction').map((cat) => {
          const count = ENDINGS.filter((e) => e.category === cat.id).length;
          const foundCount = ENDINGS.filter((e) => e.category === cat.id && discoveredSet.has(e.id)).length;
          const isActive = selectedCategory === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryPill,
                isActive && { backgroundColor: cat.color + '26', borderColor: cat.color },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Feather name={cat.icon as any} size={11} color={isActive ? cat.color : MUTED} style={{ marginRight: 4 }} />
              <Text style={[styles.categoryPillText, isActive && { color: cat.color }]}>
                {cat.label.replace(' Endings', '').toUpperCase()} ({foundCount}/{count})
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Responsive Gallery Grid: 2 columns on mobile/tablet (<1440px), 4 columns on widescreen (>=1440px) */}
      <View style={styles.galleryGrid}>
        {filteredEndings.map((ending) => {
          const isFound = discoveredSet.has(ending.id);
          const bgImage = ending.imageKey ? getBackgroundImage(ending.imageKey) : null;
          const fallbackGrad = getBackgroundGradient(ending.imageKey || ending.category);

          return (
            <Pressable
              key={ending.id}
              style={[
                styles.thumbnailCard,
                { width: isWidescreen ? '23.5%' : '48%' },
                isFound ? { borderColor: ending.color + '55' } : styles.thumbnailCardLocked,
              ]}
              onPress={() => setInspectedEnding(ending)}
            >
              <View style={styles.thumbnailArtContainer}>
                {isFound && bgImage ? (
                  <Image source={bgImage} style={styles.thumbnailImage} resizeMode="cover" />
                ) : (
                  <LinearGradient
                    colors={(isFound ? fallbackGrad.colors : ['#141320', '#0a0a10']) as any}
                    style={styles.thumbnailImage}
                  >
                    {!isFound && (
                      <View style={styles.lockedSilhouetteOverlay}>
                        <Feather name="lock" size={20} color="#554d60" />
                      </View>
                    )}
                  </LinearGradient>
                )}

                {/* Badges */}
                <View style={styles.thumbnailBadgeRow}>
                  <View style={[styles.categoryTag, { backgroundColor: ending.color + 'cc' }]}>
                    <Text style={styles.categoryTagText}>{ending.category.toUpperCase()}</Text>
                  </View>
                  {isFound ? (
                    <View style={styles.foundMiniBadge}>
                      <Feather name="check" size={8} color="#27ae60" />
                      <Text style={styles.foundMiniBadgeText}>FOUND</Text>
                    </View>
                  ) : (
                    <View style={styles.lockedMiniBadge}>
                      <Feather name="lock" size={8} color="#8a7d6e" />
                      <Text style={styles.lockedMiniBadgeText}>LOCKED</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.thumbnailMeta}>
                <Text style={[styles.thumbnailTitle, { color: isFound ? ending.color : '#7a7080' }]} numberOfLines={1}>
                  {!isFound && ending.isSecret ? '???  Unknown Ending' : ending.title}
                </Text>
                <Text style={styles.thumbnailSubtitle} numberOfLines={1}>
                  {ending.chapter} · {isFound || !ending.isSecret ? ending.subtitle : 'Hidden Pathway'}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Detail inspection modal on tap */}
      {inspectedEnding && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setInspectedEnding(null)}
        >
          <View style={styles.modalBackdrop}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setInspectedEnding(null)} />
            <View style={[styles.modalCard, { borderColor: inspectedEnding.color + '88' }]}>
              <View style={styles.modalHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.modalCategory, { color: inspectedEnding.color }]}>
                    {inspectedEnding.category.toUpperCase()} · {inspectedEnding.chapter}
                  </Text>
                  <Text style={styles.modalTitle}>
                    {discoveredSet.has(inspectedEnding.id) || !inspectedEnding.isSecret
                      ? inspectedEnding.title
                      : '???  Unknown Ending'}
                  </Text>
                  <Text style={styles.modalSubtitle}>{inspectedEnding.subtitle}</Text>
                </View>
                <Pressable style={styles.modalCloseBtn} onPress={() => setInspectedEnding(null)}>
                  <Feather name="x" size={20} color={TEXT} />
                </Pressable>
              </View>

              <View style={styles.modalArtContainer}>
                {discoveredSet.has(inspectedEnding.id) ? (
                  <CinematicView
                    timeline={getEndingLoopTimeline(inspectedEnding.category as any, inspectedEnding.id ?? inspectedEnding.imageKey)}
                    showSkipButton={false}
                    style={styles.modalImage}
                  />
                ) : (
                  <LinearGradient
                    colors={['#161524', '#090910'] as any}
                    style={styles.modalImage}
                  >
                    <View style={styles.modalLockedOverlay}>
                      <Feather name="lock" size={36} color="#6a5e50" />
                      <Text style={styles.modalLockedNotice}>UNDISCOVERED ENDING</Text>
                    </View>
                  </LinearGradient>
                )}
              </View>

              <ScrollView style={styles.modalBodyScroll}>
                {discoveredSet.has(inspectedEnding.id) ? (
                  <>
                    <Text style={styles.modalDesc}>{inspectedEnding.description}</Text>
                    <View style={[styles.hintBox, { borderColor: inspectedEnding.color + '44' }]}>
                      <Feather name="info" size={12} color={inspectedEnding.color} />
                      <Text style={[styles.hintBoxText, { color: inspectedEnding.color }]}>
                        {inspectedEnding.hint}
                      </Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.lockedGuideBox}>
                    <Text style={styles.lockedGuideText}>
                      {inspectedEnding.isSecret
                        ? 'This ending is shrouded in secrecy. Investigate anomalous signals and unexplored choices to uncover it.'
                        : inspectedEnding.hint || 'Continue your journey through different branches to unlock this conclusion.'}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

// ─── Flags Tab ────────────────────────────────────────────────────────────────

const FLAG_LABELS: Record<string, string> = {
  mira_recruited:          'Mira Recruited',
  cain_recruited:          'Cain Recruited',
  found_relic:             'First Relic Found',
  relic_activated:         'Relic Activated',
  metro_passage_open:      'Metro Passage Opened',
  iron_saints_contact:     'Iron Saints Contacted',
  glass_court_contact:     'Glass Court Contacted',
  hollow_children_contact: 'Hollow Children Contacted',
  red_choir_contact:       'Red Choir Contacted',
  last_archive_contact:    'Last Archive Contacted',
  mark_awakened:           'Wrist Mark Awakened',
  corruption_warning:      'Corruption Warning Triggered',
  archive_door_found:      'Archive Door Located',
  blackout_truth_partial:  'Partial Blackout Truth Known',
  blackout_truth_full:     'Full Blackout Truth Known',
};

function formatFlagName(key: string): string {
  if (FLAG_LABELS[key]) return FLAG_LABELS[key];
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function FlagsTab() {
  const { state } = useGame();
  const { flags } = state;

  const activeFlags = useMemo(
    () => Object.entries(flags).filter(([, v]) => v).map(([k]) => k).sort(),
    [flags]
  );

  const knownFlags = activeFlags.filter((k) => FLAG_LABELS[k]);
  const otherFlags = activeFlags.filter((k) => !FLAG_LABELS[k]);

  return (
    <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={styles.cardEyebrow}>STORY FLAGS</Text>
        <Text style={styles.cardNote}>
          Flags track permanent decisions and events. They affect which dialogue options and endings become available.
        </Text>
        <View style={styles.flagCountRow}>
          <Text style={styles.flagCountVal}>{activeFlags.length}</Text>
          <Text style={styles.flagCountLabel}> flags active this run</Text>
        </View>
      </Card>

      {activeFlags.length === 0 && (
        <Card>
          <Text style={styles.emptyText}>No story flags have been set yet. Major choices will appear here.</Text>
        </Card>
      )}

      {knownFlags.length > 0 && (
        <>
          <SectionLabel text="MAJOR STORY EVENTS" />
          <Card>
            {knownFlags.map((key, i) => (
              <View key={key} style={[styles.flagRow, i < knownFlags.length - 1 && styles.flagBorder]}>
                <View style={styles.flagDot} />
                <Text style={styles.flagName}>{formatFlagName(key)}</Text>
                <Feather name="check" size={12} color={GREEN} />
              </View>
            ))}
          </Card>
        </>
      )}

      {otherFlags.length > 0 && (
        <>
          <SectionLabel text="OTHER FLAGS" />
          <Card>
            {otherFlags.map((key, i) => (
              <View key={key} style={[styles.flagRow, i < otherFlags.length - 1 && styles.flagBorder]}>
                <View style={[styles.flagDot, { backgroundColor: MUTED }]} />
                <Text style={[styles.flagName, { color: MUTED }]}>{formatFlagName(key)}</Text>
                <Feather name="check" size={12} color={MUTED} />
              </View>
            ))}
          </Card>
        </>
      )}

      <Card style={{ borderColor: BORDER, marginTop: 4 }}>
        <Text style={[styles.cardNote, { fontStyle: 'italic' }]}>
          Some flags are not listed here by design. Hidden flags affect secret endings and are revealed only when relevant.
        </Text>
      </Card>
    </ScrollView>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function RouteCodexScreen() {
  const { setScreen, state } = useGame();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const [activeTab, setActiveTab] = useState<TabId>('journey');

  const isInGame = state.character !== null && state.screen !== 'mainMenu';
  const backScreen = isInGame ? 'game' : 'mainMenu';

  const discoveredCount = state.endingsDiscovered.length;
  const total = ENDINGS.length;

  function renderTab() {
    switch (activeTab) {
      case 'journey':    return <JourneyTab />;
      case 'companions': return <CompanionsTab />;
      case 'factions':   return <FactionsTab />;
      case 'endings':    return <EndingsTab />;
      case 'flags':      return <FlagsTab />;
    }
  }

  return (
    <LinearGradient colors={[BG, '#100f1c', BG]} style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <View>
          <Text style={styles.headerEyebrow}>SCARS OF THE LAST KINGDOM</Text>
          <Text style={styles.headerTitle}>ROUTE CODEX</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerBadge}>
            <Feather name="book-open" size={10} color={GOLD} />
            <Text style={styles.headerBadgeText}>{discoveredCount}/{total}</Text>
          </View>
          <Pressable style={styles.backBtn} onPress={() => setScreen(backScreen)}>
            <Feather name="x" size={22} color="#8a7d6e" />
          </Pressable>
        </View>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Feather
                name={tab.icon as any}
                size={12}
                color={active ? ACCENT : MUTED}
              />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Tab content */}
      <View style={[styles.tabBody, { paddingBottom: botPad }]}>
        {renderTab()}
      </View>
    </LinearGradient>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerEyebrow: {
    fontSize: 8,
    letterSpacing: 3,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 3,
  },
  headerTitle: {
    fontSize: 13,
    letterSpacing: 3,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: GOLD + '44',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: GOLD + '11',
  },
  headerBadgeText: {
    fontSize: 10,
    color: GOLD,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  backBtn: { padding: 4 },

  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: '#0d0c18',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: ACCENT,
    backgroundColor: ACCENT + '0f',
  },
  tabLabel: {
    fontSize: 9,
    letterSpacing: 1,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
  },
  tabLabelActive: { color: ACCENT },

  tabBody: { flex: 1 },
  tabScroll: { flex: 1 },
  tabContent: { padding: 14, gap: 10, paddingBottom: 30 },

  // Card
  card: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 14,
  },
  choiceCard: {
    paddingVertical: 10,
  },

  cardEyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  cardValueLarge: {
    fontSize: 16,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  cardNote: {
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
    marginBottom: 8,
  },

  sectionLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
    marginBottom: 4,
    paddingHorizontal: 2,
  },

  emptyText: {
    fontSize: 12,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },

  // Journey
  journeyStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  journeyStatusItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  journeyStatusVal: {
    fontSize: 14,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  journeyStatusKey: {
    fontSize: 8,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 3,
  },
  journeyStatusDivider: {
    width: 1,
    height: 36,
    backgroundColor: BORDER,
    marginHorizontal: 6,
  },
  routeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  routeChipText: {
    fontSize: 11,
    color: ACCENT,
    fontFamily: 'Inter_400Regular',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  vitalsGrid: { gap: 10 },
  vitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vitalLabel: {
    width: 72,
    fontSize: 10,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  vitalValue: {
    width: 28,
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    textAlign: 'right',
  },
  barTrack: {
    flex: 1,
    backgroundColor: '#1e1c30',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: 3,
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  choiceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
    marginTop: 5,
  },
  choiceScene: {
    fontSize: 9,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
    marginBottom: 3,
  },
  choiceText: {
    fontSize: 12,
    color: TEXT,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  crumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  crumbBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  crumbDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#2a2838',
  },
  crumbText: {
    flex: 1,
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
  },

  // Companions
  companionHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  companionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d0c18',
  },
  companionNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  companionName: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  companionRole: {
    fontSize: 10,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  pillSmall: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  pillSmallText: {
    fontSize: 8,
    letterSpacing: 1,
    fontFamily: 'Inter_600SemiBold',
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 8,
    letterSpacing: 1.5,
    fontFamily: 'Inter_700Bold',
  },
  companionDesc: {
    fontSize: 12,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  trustSection: { gap: 8 },
  trustLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trustLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
  },
  trustValue: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  trustBarWrap: {
    flexDirection: 'row',
    gap: 3,
  },
  trustSegment: {
    flex: 1,
    height: 8,
    borderRadius: 2,
  },
  companionHint: {
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 4,
  },

  // Factions
  factionHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  factionColorBar: {
    width: 3,
    borderRadius: 2,
    alignSelf: 'stretch',
    minHeight: 16,
    opacity: 0.8,
  },
  factionNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 4,
  },
  factionName: {
    fontSize: 13,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
  },
  factionRepVal: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  biBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 6,
    marginBottom: 10,
    gap: 2,
  },
  biBarNeg: {
    flex: 1,
    height: 6,
    backgroundColor: '#1e1c30',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  biBarFillNeg: {
    height: 6,
    borderRadius: 2,
  },
  biBarCenter: {
    width: 2,
    height: 10,
    backgroundColor: BORDER,
    borderRadius: 1,
  },
  biBarPos: {
    flex: 1,
    height: 6,
    backgroundColor: '#1e1c30',
    borderRadius: 2,
    overflow: 'hidden',
  },
  biBarFillPos: {
    height: 6,
    borderRadius: 2,
  },
  factionDesc: {
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },

  // Endings
  endingProgressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  endingBigNum: {
    fontSize: 32,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
  },
  endingBigDenom: {
    fontSize: 18,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
  },
  endingPct: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  hintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hintRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  hintBullet: {
    fontSize: 14,
    color: GOLD,
    fontFamily: 'Inter_700Bold',
    lineHeight: 18,
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    color: TEXT,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: CARD,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 2,
  },
  catIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  catDesc: {
    fontSize: 10,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
  },
  catBadgeWrap: {
    alignItems: 'flex-end',
    gap: 2,
  },
  catBadge: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  endingCard: {
    backgroundColor: CARD2,
    borderLeftWidth: 3,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: BORDER,
    borderRightColor: BORDER,
    borderBottomColor: BORDER,
    borderRadius: 4,
    padding: 12,
    marginBottom: 3,
    marginLeft: 4,
  },
  endingCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  endingTitle: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  endingSubtitle: {
    fontSize: 10,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  endingDesc: {
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#0d0c18',
  },
  hintBoxText: {
    flex: 1,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  foundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#0d2010',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: GREEN + '44',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  foundBadgeText: {
    fontSize: 8,
    letterSpacing: 1,
    color: GREEN,
    fontFamily: 'Inter_600SemiBold',
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#151420',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  lockedBadgeText: {
    fontSize: 8,
    letterSpacing: 1,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
  },

  // Flags
  flagCountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  flagCountVal: {
    fontSize: 22,
    color: ACCENT,
    fontFamily: 'Inter_700Bold',
  },
  flagCountLabel: {
    fontSize: 12,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  flagBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  flagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
  },
  flagName: {
    flex: 1,
    fontSize: 13,
    color: TEXT,
    fontFamily: 'Inter_400Regular',
  },

  // Category filter tabs
  categoryFilterScroll: {
    marginVertical: 4,
  },
  categoryFilterContent: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryPillActive: {
    borderColor: ACCENT,
    backgroundColor: ACCENT + '22',
  },
  categoryPillText: {
    fontSize: 10,
    letterSpacing: 1,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryPillTextActive: {
    color: ACCENT,
  },

  // Responsive Gallery Grid
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  thumbnailCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  thumbnailCardLocked: {
    borderColor: BORDER,
    opacity: 0.8,
  },
  thumbnailArtContainer: {
    height: 100,
    position: 'relative',
    backgroundColor: '#0a0a12',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  lockedSilhouetteOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c0a1499',
  },
  thumbnailBadgeRow: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  categoryTagText: {
    fontSize: 8,
    letterSpacing: 1,
    color: '#ffffff',
    fontFamily: 'Inter_700Bold',
  },
  foundMiniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#0d2010cc',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: GREEN + '66',
  },
  foundMiniBadgeText: {
    fontSize: 7,
    letterSpacing: 1,
    color: GREEN,
    fontFamily: 'Inter_700Bold',
  },
  lockedMiniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#16141ecc',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: BORDER,
  },
  lockedMiniBadgeText: {
    fontSize: 7,
    letterSpacing: 1,
    color: MUTED,
    fontFamily: 'Inter_700Bold',
  },
  thumbnailMeta: {
    padding: 8,
  },
  thumbnailTitle: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  thumbnailSubtitle: {
    fontSize: 9,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
  },

  // Modal inspection
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    maxHeight: '85%',
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  modalCategory: {
    fontSize: 9,
    letterSpacing: 2,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 16,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  modalSubtitle: {
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalArtContainer: {
    height: 180,
    backgroundColor: '#08080f',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  modalLockedNotice: {
    fontSize: 10,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_700Bold',
  },
  modalBodyScroll: {
    padding: 16,
    maxHeight: 240,
  },
  modalDesc: {
    fontSize: 13,
    color: TEXT,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  lockedGuideBox: {
    padding: 12,
    backgroundColor: '#0e0d16',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER,
  },
  lockedGuideText: {
    fontSize: 12,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
