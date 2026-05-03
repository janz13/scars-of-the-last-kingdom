/**
 * Developer Mode Panel — Scars of the Last Kingdom
 *
 * Full-featured testing toolkit: jump to any node, edit all game state,
 * validate the story graph, and inspect every system at runtime.
 * This screen is only reachable from the StoryPanel's hidden menu entry.
 */

import React, { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { STORY_NODES } from '../data/storyNodes';
import { ENDINGS } from '../data/endings';
import { getTrustLabel } from '../data/companions';
import {
  getChapterEntryNodes,
  getStorySummary,
  validateStory,
  type ValidationWarning,
} from '../logic/storyValidator';
import type { FactionRep, Inventory, Stats } from '../data/types';

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({
  title,
  badge,
  badgeColor = '#2ecc71',
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string | number;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View style={sec.container}>
      <Pressable style={sec.header} onPress={() => setOpen((o) => !o)}>
        <View style={sec.titleRow}>
          <Text style={sec.title}>{title}</Text>
          {badge !== undefined && (
            <View style={[sec.badge, { borderColor: badgeColor }]}>
              <Text style={[sec.badgeText, { color: badgeColor }]}>{badge}</Text>
            </View>
          )}
        </View>
        <Feather name={open ? 'chevron-up' : 'chevron-down'} size={13} color="#4a4050" />
      </Pressable>
      {open && <View style={sec.body}>{children}</View>}
    </View>
  );
}

function NumRow({
  label,
  value,
  step = 1,
  bigStep,
  onSet,
}: {
  label: string;
  value: number;
  step?: number;
  bigStep?: number;
  onSet: (v: number) => void;
}) {
  return (
    <View style={nr.row}>
      <Text style={nr.label} numberOfLines={1}>{label}</Text>
      <View style={nr.controls}>
        {bigStep !== undefined && (
          <Pressable style={nr.bigBtn} onPress={() => onSet(value - bigStep)}>
            <Text style={nr.bigBtnText}>−{bigStep}</Text>
          </Pressable>
        )}
        <Pressable style={nr.btn} onPress={() => onSet(value - step)} hitSlop={6}>
          <Text style={nr.btnText}>−</Text>
        </Pressable>
        <Text style={nr.value}>{value}</Text>
        <Pressable style={nr.btn} onPress={() => onSet(value + step)} hitSlop={6}>
          <Text style={nr.btnText}>+</Text>
        </Pressable>
        {bigStep !== undefined && (
          <Pressable style={nr.bigBtn} onPress={() => onSet(value + bigStep)}>
            <Text style={nr.bigBtnText}>+{bigStep}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function WarnRow({ warn }: { warn: ValidationWarning }) {
  const isError = warn.severity === 'error';
  return (
    <View style={[wn.row, isError ? wn.rowError : wn.rowWarn]}>
      <Feather name={isError ? 'alert-circle' : 'alert-triangle'} size={12}
        color={isError ? '#e74c3c' : '#e67e22'} style={{ marginTop: 1 }} />
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={wn.nodeId}>{warn.nodeId}{warn.choiceId ? ` › ${warn.choiceId}` : ''}</Text>
        <Text style={[wn.msg, isError ? wn.msgError : wn.msgWarn]}>{warn.message}</Text>
      </View>
    </View>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────

export default function DeveloperPanel() {
  const {
    state,
    setScreen,
    devJumpToNode,
    devSetStat,
    devSetInventory,
    devSetFlag,
    devRemoveFlag,
    devUnlockAllEndings,
    devSetFactionRep,
    devSetCompanionTrust,
    devToggleCompanionPresent,
    devResetToMenu,
  } = useGame();

  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  // ── Validation ──────────────────────────────────────────────────────────────
  const [warnings] = useState<ValidationWarning[]>(() => validateStory());
  const errors = warnings.filter((w) => w.severity === 'error');
  const warningsOnly = warnings.filter((w) => w.severity === 'warning');

  // ── Story summary ───────────────────────────────────────────────────────────
  const summary = useMemo(() => getStorySummary(), []);
  const chapterEntries = useMemo(() => getChapterEntryNodes(), []);

  // ── Node search ─────────────────────────────────────────────────────────────
  const [nodeSearch, setNodeSearch] = useState('');
  const [chapterFilter, setChapterFilter] = useState<string | null>(null);

  const filteredNodes = useMemo(() => {
    const q = nodeSearch.toLowerCase().trim();
    return STORY_NODES.filter((n) => {
      const matchSearch =
        !q ||
        n.id.toLowerCase().includes(q) ||
        n.title.toLowerCase().includes(q) ||
        n.location.toLowerCase().includes(q) ||
        n.chapter.toLowerCase().includes(q);
      const matchChapter = !chapterFilter || n.chapter === chapterFilter;
      return matchSearch && matchChapter;
    }).slice(0, 60);
  }, [nodeSearch, chapterFilter]);

  // ── Flags ───────────────────────────────────────────────────────────────────
  const [newFlag, setNewFlag] = useState('');
  const activeFlags = Object.entries(state.flags).filter(([, v]) => v);

  // ── Derived labels ──────────────────────────────────────────────────────────
  const currentNode = STORY_NODES.find((n) => n.id === state.currentNodeId);
  const mira = state.companions.mira;
  const cain = state.companions.cain;

  const FACTION_LABELS: Record<keyof FactionRep, string> = {
    ironSaints: 'Iron Saints',
    glassCourt: 'Glass Court',
    hollowChildren: 'Hollow Children',
    redChoir: 'Red Choir',
    lastArchive: 'Last Archive',
  };

  const STAT_LABELS: Array<{ key: keyof Stats; label: string; bigStep?: number }> = [
    { key: 'health', label: 'Health', bigStep: 10 },
    { key: 'maxHealth', label: 'Max Health', bigStep: 10 },
    { key: 'hunger', label: 'Hunger' },
    { key: 'thirst', label: 'Thirst' },
    { key: 'morale', label: 'Morale' },
    { key: 'trust', label: 'Trust' },
    { key: 'strength', label: 'Strength' },
    { key: 'intelligence', label: 'Intelligence' },
    { key: 'agility', label: 'Agility' },
    { key: 'charisma', label: 'Charisma' },
    { key: 'luck', label: 'Luck' },
    { key: 'corruption', label: 'Corruption' },
  ];

  const INVENTORY_LABELS: Array<{ key: keyof Inventory; label: string }> = [
    { key: 'food', label: 'Food' },
    { key: 'water', label: 'Water' },
    { key: 'medicine', label: 'Medicine' },
    { key: 'scrap', label: 'Scrap' },
    { key: 'ammo', label: 'Ammo' },
    { key: 'relics', label: 'Relics' },
    { key: 'reputation', label: 'Reputation' },
  ];

  return (
    <LinearGradient colors={['#070710', '#0d0d1a', '#070710']} style={styles.container}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <View>
          <Text style={styles.devLabel}>⬡ DEVELOPER MODE</Text>
          <Text style={styles.devSub}>
            {summary.totalNodes} nodes · {summary.totalChoices} choices · {ENDINGS.length} endings
          </Text>
        </View>
        <Pressable style={styles.closeBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={20} color="#6a5e50" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: botPad + 24 }]}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Validation ─────────────────────────────────────────────────── */}
        <Section
          title="STORY VALIDATION"
          badge={errors.length > 0 ? `${errors.length} errors` : warningsOnly.length > 0 ? `${warningsOnly.length} warnings` : 'CLEAN'}
          badgeColor={errors.length > 0 ? '#e74c3c' : warningsOnly.length > 0 ? '#e67e22' : '#2ecc71'}
          defaultOpen={errors.length > 0}
        >
          {warnings.length === 0 ? (
            <Text style={styles.allGood}>All story checks passed.</Text>
          ) : (
            <>
              {errors.length > 0 && (
                <>
                  <Text style={styles.warnGroupTitle}>ERRORS ({errors.length})</Text>
                  {errors.map((w, i) => <WarnRow key={i} warn={w} />)}
                </>
              )}
              {warningsOnly.length > 0 && (
                <>
                  <Text style={[styles.warnGroupTitle, { marginTop: errors.length > 0 ? 10 : 0 }]}>
                    WARNINGS ({warningsOnly.length})
                  </Text>
                  {warningsOnly.map((w, i) => <WarnRow key={i} warn={w} />)}
                </>
              )}
            </>
          )}
        </Section>

        {/* ── Current State ──────────────────────────────────────────────── */}
        <Section title="CURRENT STATE" defaultOpen>
          <View style={styles.stateGrid}>
            <StateItem label="Screen" value={state.screen} />
            <StateItem label="Node ID" value={state.currentNodeId} mono />
            <StateItem label="Node Title" value={currentNode?.title ?? '—'} />
            <StateItem label="Chapter" value={currentNode?.chapter ?? '—'} />
            <StateItem label="Location" value={currentNode?.location ?? '—'} />
            <StateItem label="Character" value={state.character?.name ?? 'None (dev)'} />
            <StateItem label="Endings Found" value={`${state.endingsDiscovered.length} / ${ENDINGS.length}`} />
            <StateItem label="Route Length" value={String(state.routeHistory.length)} />
          </View>
        </Section>

        {/* ── Jump to Node ───────────────────────────────────────────────── */}
        <Section title="JUMP TO NODE" defaultOpen>
          <TextInput
            style={styles.searchInput}
            value={nodeSearch}
            onChangeText={setNodeSearch}
            placeholder="Search by id, title, location, chapter…"
            placeholderTextColor="#3a3045"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Chapter filter pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            <View style={styles.pillRow}>
              <Pressable
                style={[styles.pill, !chapterFilter && styles.pillActive]}
                onPress={() => setChapterFilter(null)}
              >
                <Text style={[styles.pillText, !chapterFilter && styles.pillTextActive]}>ALL</Text>
              </Pressable>
              {summary.chapters.map((ch) => (
                <Pressable
                  key={ch}
                  style={[styles.pill, chapterFilter === ch && styles.pillActive]}
                  onPress={() => setChapterFilter(ch === chapterFilter ? null : ch)}
                >
                  <Text style={[styles.pillText, chapterFilter === ch && styles.pillTextActive]}>
                    {ch}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <Text style={styles.resultsCount}>{filteredNodes.length} result{filteredNodes.length !== 1 ? 's' : ''}</Text>
          {filteredNodes.map((node) => (
            <View key={node.id} style={styles.nodeRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nodeId}>{node.id}</Text>
                <Text style={styles.nodeMeta}>{node.title} · {node.location}</Text>
                <Text style={styles.nodeChapter}>{node.chapter}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                {node.isEnding && (
                  <View style={styles.endingBadge}>
                    <Text style={styles.endingBadgeText}>ENDING</Text>
                  </View>
                )}
                <Pressable
                  style={styles.jumpBtn}
                  onPress={() => {
                    devJumpToNode(node.id);
                    setScreen('game');
                  }}
                  android_ripple={{ color: 'rgba(46,204,113,0.2)' }}
                >
                  <Text style={styles.jumpBtnText}>JUMP</Text>
                </Pressable>
              </View>
            </View>
          ))}
          {filteredNodes.length === 0 && (
            <Text style={styles.noResults}>No nodes match.</Text>
          )}
        </Section>

        {/* ── Stats Editor ───────────────────────────────────────────────── */}
        <Section title="STATS EDITOR">
          {STAT_LABELS.map(({ key, label, bigStep }) => (
            <NumRow
              key={key}
              label={label}
              value={state.stats[key]}
              bigStep={bigStep}
              onSet={(v) => devSetStat(key, v)}
            />
          ))}
        </Section>

        {/* ── Inventory Editor ───────────────────────────────────────────── */}
        <Section title="INVENTORY EDITOR">
          {INVENTORY_LABELS.map(({ key, label }) => (
            <NumRow
              key={key}
              label={label}
              value={state.inventory[key]}
              onSet={(v) => devSetInventory(key, v)}
            />
          ))}
        </Section>

        {/* ── Companions ─────────────────────────────────────────────────── */}
        <Section title="COMPANIONS">
          {(['mira', 'cain'] as const).map((id) => {
            const c = state.companions[id];
            const name = id === 'mira' ? 'Mira' : 'Cain';
            const trustLabel = getTrustLabel(id, c.trust);
            return (
              <View key={id} style={styles.companionRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.companionName}>{name}</Text>
                  <Text style={styles.companionStatus}>
                    {c.present ? 'In party' : 'Not present'} · Trust {c.trust}/10 ({trustLabel})
                  </Text>
                </View>
                <View style={styles.companionControls}>
                  <Pressable
                    style={[styles.toggleBtn, c.present && styles.toggleBtnOn]}
                    onPress={() => devToggleCompanionPresent(id)}
                  >
                    <Text style={[styles.toggleBtnText, c.present && styles.toggleBtnTextOn]}>
                      {c.present ? 'PRESENT' : 'ABSENT'}
                    </Text>
                  </Pressable>
                  <View style={styles.trustRow}>
                    <Pressable style={nr.btn} onPress={() => devSetCompanionTrust(id, c.trust - 1)}>
                      <Text style={nr.btnText}>−</Text>
                    </Pressable>
                    <Text style={nr.value}>{c.trust}</Text>
                    <Pressable style={nr.btn} onPress={() => devSetCompanionTrust(id, c.trust + 1)}>
                      <Text style={nr.btnText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </Section>

        {/* ── Factions ───────────────────────────────────────────────────── */}
        <Section title="FACTION REPUTATION">
          {(Object.keys(FACTION_LABELS) as Array<keyof FactionRep>).map((key) => (
            <NumRow
              key={key}
              label={FACTION_LABELS[key]}
              value={state.factionRep[key]}
              step={5}
              bigStep={20}
              onSet={(v) => devSetFactionRep(key, v)}
            />
          ))}
        </Section>

        {/* ── Flags ──────────────────────────────────────────────────────── */}
        <Section title="FLAGS" badge={activeFlags.length} defaultOpen={false}>
          {/* Add flag */}
          <View style={styles.flagInputRow}>
            <TextInput
              style={styles.flagInput}
              value={newFlag}
              onChangeText={setNewFlag}
              placeholder="add_flag_name"
              placeholderTextColor="#3a3045"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              style={[styles.flagAddBtn, !newFlag.trim() && { opacity: 0.4 }]}
              onPress={() => {
                if (newFlag.trim()) {
                  devSetFlag(newFlag.trim(), true);
                  setNewFlag('');
                }
              }}
            >
              <Text style={styles.flagAddBtnText}>SET</Text>
            </Pressable>
          </View>
          {/* Active flags */}
          {activeFlags.length === 0 ? (
            <Text style={styles.noResults}>No active flags.</Text>
          ) : (
            <View style={styles.flagGrid}>
              {activeFlags.map(([flag]) => (
                <Pressable key={flag} style={styles.flagChip} onPress={() => devRemoveFlag(flag)}>
                  <Text style={styles.flagChipText}>{flag}</Text>
                  <Feather name="x" size={10} color="#2ecc71" style={{ marginLeft: 4 }} />
                </Pressable>
              ))}
            </View>
          )}
          <Text style={styles.flagHint}>Tap a flag chip to remove it.</Text>
        </Section>

        {/* ── Route History ──────────────────────────────────────────────── */}
        <Section title="ROUTE HISTORY" badge={state.routeHistory.length}>
          {state.routeHistory.length === 0 ? (
            <Text style={styles.noResults}>No choices made yet.</Text>
          ) : (
            [...state.routeHistory].reverse().slice(0, 30).map((entry, i) => (
              <View key={i} style={styles.historyRow}>
                <View style={styles.historyIndex}>
                  <Text style={styles.historyNum}>{state.routeHistory.length - i}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyNode}>{entry.nodeId}</Text>
                  <Text style={styles.historyChoice} numberOfLines={2}>→ {entry.choiceText}</Text>
                </View>
              </View>
            ))
          )}
          {state.routeHistory.length > 30 && (
            <Text style={styles.flagHint}>Showing last 30 of {state.routeHistory.length}.</Text>
          )}
        </Section>

        {/* ── Endings ────────────────────────────────────────────────────── */}
        <Section title="ENDINGS TRACKER" badge={`${state.endingsDiscovered.length}/${ENDINGS.length}`}>
          {ENDINGS.map((ending) => {
            const found = state.endingsDiscovered.includes(ending.id);
            return (
              <View key={ending.id} style={styles.endingRow}>
                <Feather name={found ? 'check-circle' : 'circle'} size={13}
                  color={found ? '#2ecc71' : '#3a3045'} />
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={[styles.endingTitle, !found && { color: '#4a4050' }]}>
                    {ending.title}
                  </Text>
                  <Text style={styles.endingType}>{ending.type} · {ending.id}</Text>
                </View>
              </View>
            );
          })}
        </Section>

        {/* ── Quick Actions ──────────────────────────────────────────────── */}
        <Section title="QUICK ACTIONS" defaultOpen>
          {/* Chapter selectors */}
          <Text style={styles.actionLabel}>JUMP TO CHAPTER START</Text>
          <View style={styles.chapterBtnRow}>
            {chapterEntries.map(({ chapter, nodeId }) => (
              <Pressable
                key={chapter}
                style={styles.chapterBtn}
                onPress={() => { devJumpToNode(nodeId); setScreen('game'); }}
              >
                <Text style={styles.chapterBtnText}>{chapter}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actionDivider} />

          <ActionBtn
            label="Unlock All Endings"
            icon="unlock"
            color="#f39c12"
            onPress={devUnlockAllEndings}
          />
          <ActionBtn
            label="Reset Save & Return to Menu"
            icon="trash-2"
            color="#e74c3c"
            onPress={async () => { await devResetToMenu(); }}
          />
          <ActionBtn
            label="Close Developer Mode"
            icon="arrow-left"
            color="#6a5e50"
            onPress={() => setScreen('game')}
          />
        </Section>

      </ScrollView>
    </LinearGradient>
  );
}

// ─── Small inline helpers ─────────────────────────────────────────────────────

function StateItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <View style={styles.stateItem}>
      <Text style={styles.stateLabel}>{label}</Text>
      <Text style={[styles.stateValue, mono && { fontFamily: 'Inter_600SemiBold', fontSize: 11 }]}
        numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function ActionBtn({
  label, icon, color, onPress,
}: {
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.actionBtn, { borderColor: color + '44' }]} onPress={onPress}
      android_ripple={{ color: color + '22' }}>
      <Feather name={icon} size={14} color={color} />
      <Text style={[styles.actionBtnText, { color }]}>{label}</Text>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  devLabel: {
    fontSize: 11,
    letterSpacing: 3,
    color: '#2ecc71',
    fontFamily: 'Inter_700Bold',
  },
  devSub: {
    fontSize: 11,
    color: '#3a3045',
    fontFamily: 'Inter_400Regular',
    marginTop: 3,
  },
  closeBtn: { padding: 4, marginTop: -2 },
  scroll: { flex: 1 },
  content: { padding: 12, gap: 8 },
  // State grid
  stateGrid: { gap: 2 },
  stateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#0e0e1a',
  },
  stateLabel: {
    fontSize: 10,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
    width: 100,
  },
  stateValue: {
    flex: 1,
    fontSize: 12,
    color: '#8a9e8a',
    fontFamily: 'Inter_400Regular',
  },
  // Node search
  searchInput: {
    backgroundColor: '#0c0c18',
    borderWidth: 1,
    borderColor: '#2a2040',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: '#c0b090',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  pillRow: { flexDirection: 'row', gap: 6, paddingRight: 4 },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2040',
    backgroundColor: '#0c0c18',
  },
  pillActive: { backgroundColor: '#0d2010', borderColor: '#2ecc71' },
  pillText: { fontSize: 10, color: '#4a4050', fontFamily: 'Inter_600SemiBold', letterSpacing: 0.5 },
  pillTextActive: { color: '#2ecc71' },
  resultsCount: {
    fontSize: 10,
    color: '#3a3045',
    fontFamily: 'Inter_400Regular',
    marginBottom: 6,
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c0c18',
    borderRadius: 4,
    padding: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#1a1a2e',
    gap: 8,
  },
  nodeId: { fontSize: 11, color: '#2ecc71', fontFamily: 'Inter_600SemiBold', letterSpacing: 0.3 },
  nodeMeta: { fontSize: 11, color: '#8a7d6e', fontFamily: 'Inter_400Regular', marginTop: 2 },
  nodeChapter: { fontSize: 10, color: '#4a4050', fontFamily: 'Inter_400Regular', marginTop: 1 },
  endingBadge: {
    backgroundColor: '#1a0808',
    borderWidth: 1,
    borderColor: '#5a1a1a',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  endingBadgeText: { fontSize: 8, color: '#8e1c1c', fontFamily: 'Inter_600SemiBold', letterSpacing: 0.5 },
  jumpBtn: {
    backgroundColor: '#0d2010',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  jumpBtnText: { fontSize: 10, color: '#2ecc71', fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  noResults: {
    color: '#3a3045',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 10,
    fontStyle: 'italic',
  },
  allGood: {
    color: '#2ecc71',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    paddingVertical: 4,
  },
  warnGroupTitle: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  // Companions
  companionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c0c18',
    borderRadius: 4,
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#1a1a2e',
    gap: 10,
  },
  companionName: { fontSize: 13, color: '#d4c5a9', fontFamily: 'Inter_600SemiBold' },
  companionStatus: { fontSize: 11, color: '#6a5e50', fontFamily: 'Inter_400Regular', marginTop: 2 },
  companionControls: { alignItems: 'flex-end', gap: 6 },
  toggleBtn: {
    borderWidth: 1,
    borderColor: '#2a2040',
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#0c0c18',
  },
  toggleBtnOn: { backgroundColor: '#0d2010', borderColor: '#2ecc71' },
  toggleBtnText: { fontSize: 9, color: '#4a4050', fontFamily: 'Inter_600SemiBold', letterSpacing: 1 },
  toggleBtnTextOn: { color: '#2ecc71' },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  // Flags
  flagInputRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  flagInput: {
    flex: 1,
    backgroundColor: '#0c0c18',
    borderWidth: 1,
    borderColor: '#2a2040',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#c0b090',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  flagAddBtn: {
    backgroundColor: '#0d2010',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  flagAddBtnText: { fontSize: 10, color: '#2ecc71', fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  flagGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  flagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c1a0c',
    borderWidth: 1,
    borderColor: '#2ecc7166',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  flagChipText: { fontSize: 11, color: '#2ecc71', fontFamily: 'Inter_400Regular' },
  flagHint: {
    fontSize: 10,
    color: '#3a3045',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 8,
  },
  // History
  historyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#0e0e1a',
  },
  historyIndex: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0c0c18',
    borderWidth: 1,
    borderColor: '#2a2040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyNum: { fontSize: 9, color: '#4a4050', fontFamily: 'Inter_600SemiBold' },
  historyNode: { fontSize: 11, color: '#2ecc71', fontFamily: 'Inter_600SemiBold' },
  historyChoice: { fontSize: 11, color: '#8a7d6e', fontFamily: 'Inter_400Regular', marginTop: 2 },
  // Endings
  endingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0e0e1a',
  },
  endingTitle: { fontSize: 12, color: '#d4c5a9', fontFamily: 'Inter_600SemiBold' },
  endingType: { fontSize: 10, color: '#4a4050', fontFamily: 'Inter_400Regular', marginTop: 2 },
  // Actions
  actionLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  chapterBtnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
  chapterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2040',
    backgroundColor: '#0c0c18',
  },
  chapterBtnText: { fontSize: 11, color: '#8a7d6e', fontFamily: 'Inter_600SemiBold' },
  actionDivider: { height: 1, backgroundColor: '#1a1a2e', marginVertical: 10 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#0c0c18',
    marginBottom: 6,
    overflow: 'hidden',
  },
  actionBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});

// Section component styles
const sec = StyleSheet.create({
  container: {
    backgroundColor: '#0c0c18',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1a1a2e',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#0f0f1e',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: '#6a5e6a',
    fontFamily: 'Inter_700Bold',
  },
  badge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 9, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.5 },
  body: { padding: 12 },
});

// NumRow styles
const nr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#0e0e1a',
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: '#8a7d6e',
    fontFamily: 'Inter_400Regular',
  },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  btn: {
    width: 26,
    height: 26,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2040',
    backgroundColor: '#0f0f1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontSize: 14, color: '#8a7d6e', fontFamily: 'Inter_600SemiBold', lineHeight: 16 },
  bigBtn: {
    paddingHorizontal: 6,
    height: 26,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2040',
    backgroundColor: '#0f0f1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBtnText: { fontSize: 9, color: '#6a5e6a', fontFamily: 'Inter_600SemiBold' },
  value: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 13,
    color: '#2ecc71',
    fontFamily: 'Inter_600SemiBold',
  },
});

// Validation warning styles
const wn = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
    borderWidth: 1,
  },
  rowError: { backgroundColor: '#120808', borderColor: '#3a1010' },
  rowWarn: { backgroundColor: '#120c04', borderColor: '#3a2010' },
  nodeId: { fontSize: 10, color: '#6a5e50', fontFamily: 'Inter_600SemiBold', marginBottom: 2 },
  msg: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  msgError: { color: '#c0504050' },
  msgWarn: { color: '#c08040' },
});
