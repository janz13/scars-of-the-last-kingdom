import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { CHAPTER_ROADMAP, ChapterEntry } from '../data/chapterRoadmap';

const ACCENT = '#9b59b6';
const ACCENT_ORANGE = '#e67e22';
const BG = '#0a0a0f';
const CARD = '#1a1a28';
const TEXT = '#d4c5a9';
const MUTED = '#6a5e50';
const BORDER = '#2a2a3a';
const COMPLETE_COLOR = '#27ae60';
const PLANNED_COLOR = '#4a4050';

function SectionPill({ label, color }: { label: string; color: string }) {
  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <View style={styles.tagRow}>
      {items.map((item, i) => (
        <View key={i} style={[styles.tag, { borderColor: color + '55' }]}>
          <Text style={[styles.tagText, { color }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={[styles.bulletDot, { color }]}>›</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function ChapterCard({
  entry,
  isExpanded,
  onToggle,
}: {
  entry: ChapterEntry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isComplete = entry.status === 'complete';
  const statusColor = isComplete ? COMPLETE_COLOR : PLANNED_COLOR;
  const borderColor = isComplete ? COMPLETE_COLOR + '55' : BORDER;

  return (
    <View style={[styles.card, { borderColor }]}>
      <Pressable style={styles.cardHeader} onPress={onToggle}>
        <View style={styles.cardHeaderLeft}>
          <View style={styles.partRow}>
            <Text style={[styles.partNumber, { color: isComplete ? COMPLETE_COLOR : ACCENT }]}>
              {entry.partNumber.toUpperCase()}
            </Text>
            {isComplete && (
              <View style={styles.completeBadge}>
                <Feather name="check" size={10} color={COMPLETE_COLOR} />
                <Text style={styles.completeText}>COMPLETE</Text>
              </View>
            )}
            {entry.nodeCount !== undefined && (
              <Text style={styles.nodeCount}>{entry.nodeCount} nodes</Text>
            )}
          </View>
          <Text style={styles.cardTitle}>{entry.title}</Text>
          <Text style={styles.cardSubtitle}>"{entry.subtitle}"</Text>
        </View>
        <Feather
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={MUTED}
          style={styles.chevron}
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.cardBody}>
          <View style={styles.divider} />

          <Text style={styles.summaryText}>{entry.summary}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>LOCATIONS</Text>
            <TagList items={entry.locations} color={MUTED} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>FACTIONS</Text>
            <TagList items={entry.factions} color={ACCENT} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>COMPANION FOCUS</Text>
            <BulletList items={entry.companionFocus} color={ACCENT_ORANGE} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>MAJOR CHOICES</Text>
            <BulletList items={entry.majorChoices} color={TEXT} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>POSSIBLE ENDINGS</Text>
            <BulletList items={entry.possibleEndings} color="#c0392b" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>FLAGS INTRODUCED</Text>
            <TagList items={entry.flagsIntroduced} color="#5dade2" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ROUTES UNLOCKED</Text>
            <BulletList items={entry.routesUnlocked} color={COMPLETE_COLOR} />
          </View>
        </View>
      )}
    </View>
  );
}

export default function ChapterRoadmapScreen() {
  const { setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'complete' | 'planned'>('all');

  const totalNodes = CHAPTER_ROADMAP.reduce((s, c) => s + (c.nodeCount ?? 0), 0);
  const totalEndings = CHAPTER_ROADMAP.reduce((s, c) => s + c.possibleEndings.length, 0);
  const completeCount = CHAPTER_ROADMAP.filter((c) => c.status === 'complete').length;

  const filtered =
    filterStatus === 'all'
      ? CHAPTER_ROADMAP
      : CHAPTER_ROADMAP.filter((c) => c.status === filterStatus);

  function toggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <LinearGradient colors={[BG, '#12101a', BG]} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <View>
          <Text style={styles.headerEyebrow}>SCARS OF THE LAST KINGDOM</Text>
          <Text style={styles.headerTitle}>CHAPTER ROADMAP</Text>
        </View>
        <Pressable style={styles.backBtn} onPress={() => setScreen('mainMenu')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{CHAPTER_ROADMAP.length}</Text>
          <Text style={styles.statLabel}>PARTS</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: COMPLETE_COLOR }]}>{completeCount}</Text>
          <Text style={styles.statLabel}>COMPLETE</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: ACCENT }]}>{totalNodes}</Text>
          <Text style={styles.statLabel}>NODES</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#c0392b' }]}>{totalEndings}</Text>
          <Text style={styles.statLabel}>ENDINGS</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'complete', 'planned'] as const).map((f) => (
          <Pressable
            key={f}
            style={[styles.filterBtn, filterStatus === f && styles.filterBtnActive]}
            onPress={() => {
              setFilterStatus(f);
              setExpandedId(null);
            }}
          >
            <Text style={[styles.filterText, filterStatus === f && styles.filterTextActive]}>
              {f.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: botPad + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((entry) => (
          <ChapterCard
            key={entry.id}
            entry={entry}
            isExpanded={expandedId === entry.id}
            onToggle={() => toggle(entry.id)}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {CHAPTER_ROADMAP.length - completeCount} chapters remaining to be written
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerEyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 3,
  },
  headerTitle: {
    fontSize: 13,
    letterSpacing: 3,
    color: TEXT,
    fontFamily: 'Inter_600SemiBold',
  },
  backBtn: { padding: 6 },

  statsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: '#0d0d18',
  },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statValue: {
    fontSize: 20,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
  },
  statLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 2,
  },
  statDivider: { width: 1, backgroundColor: BORDER, marginVertical: 8 },

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: BORDER,
  },
  filterBtnActive: {
    borderColor: ACCENT,
    backgroundColor: '#1a1228',
  },
  filterText: {
    fontSize: 10,
    letterSpacing: 2,
    color: PLANNED_COLOR,
    fontFamily: 'Inter_600SemiBold',
  },
  filterTextActive: { color: ACCENT },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 10 },

  card: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: CARD,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 8,
  },
  cardHeaderLeft: { flex: 1 },
  partRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  partNumber: {
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: 'Inter_700Bold',
  },
  completeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#0d2010',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COMPLETE_COLOR + '44',
  },
  completeText: {
    fontSize: 8,
    letterSpacing: 1,
    color: COMPLETE_COLOR,
    fontFamily: 'Inter_600SemiBold',
  },
  nodeCount: {
    fontSize: 9,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: TEXT,
    fontFamily: 'Inter_700Bold',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 12,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  chevron: { marginTop: 2 },

  cardBody: { paddingHorizontal: 16, paddingBottom: 16 },
  divider: { height: 1, backgroundColor: BORDER, marginBottom: 14 },
  summaryText: {
    fontSize: 13,
    color: TEXT,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  section: { marginBottom: 14 },
  sectionLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: MUTED,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: { fontSize: 11, fontFamily: 'Inter_400Regular' },

  bulletList: { gap: 6 },
  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  bulletDot: { fontSize: 14, lineHeight: 18, fontFamily: 'Inter_600SemiBold' },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: TEXT,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },

  pill: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  pillText: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold' },

  footer: { alignItems: 'center', paddingTop: 12 },
  footerText: {
    fontSize: 11,
    color: MUTED,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
});
