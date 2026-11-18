import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import type { StoryNode } from '../data/types';
import { ENDINGS } from '../data/story/endings';
import { GENERATED_STORY_SUMMARY } from '../data/storyMetadata.generated';
import { getUnlockedChapters } from '../logic/chapterSelect';
import { loadChapter, getLoadedNodes } from '../data/story/chapterLoader';
import { DICE_STAT_LABELS } from '../logic/diceEngine';
import { checkRequirements } from '../logic/gameEngine';

const MAP_CHAPTERS = [
  'Prologue',
  'Chapter 1',
  'Chapter 2',
  'Chapter 3',
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 8',
  'Chapter 9',
  'Chapter 10',
  'Chapter 11',
  'Chapter 12',
  'Final Chapter 1',
  'Final Chapter 2',
  'Epilogue',
] as const;

const ROMAN_TO_CHAPTER: Record<string, string> = {
  'Chapter I': 'Chapter 1',
  'Chapter II': 'Chapter 2',
  'Chapter III': 'Chapter 3',
  'Chapter IV': 'Chapter 4',
  'Chapter V': 'Chapter 5',
  'Chapter VI': 'Chapter 6',
  'Chapter VII': 'Chapter 7',
  'Chapter VIII': 'Chapter 8',
  'Chapter IX': 'Chapter 9',
  'Chapter X': 'Chapter 10',
  'Chapter XI': 'Chapter 11',
  'Chapter XII': 'Chapter 12',
};

function normalizeEndingChapter(ch: string): string {
  return ROMAN_TO_CHAPTER[ch] ?? ch;
}

export default function BranchMapPanel() {
  const { state, currentNode, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const initialChapter = useMemo(() => {
    const cur = currentNode?.chapter;
    if (cur && (MAP_CHAPTERS as readonly string[]).includes(cur)) {
      return cur;
    }
    return 'Chapter 1';
  }, [currentNode?.chapter]);

  const [selectedChapter, setSelectedChapter] = useState<string>(initialChapter);
  const [loadedVersion, setLoadedVersion] = useState(0);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  const unlockedChapters = useMemo(() => getUnlockedChapters(state), [state]);

  useEffect(() => {
    let active = true;
    setIsLoadingChapter(true);
    void loadChapter(selectedChapter)
      .catch(() => {})
      .finally(() => {
        if (active) {
          setLoadedVersion((v) => v + 1);
          setIsLoadingChapter(false);
        }
      });
    return () => {
      active = false;
    };
  }, [selectedChapter]);

  const visitedSet = useMemo(() => {
    const s = new Set<string>(state.visitedNodes ?? []);
    if (state.currentNodeId) s.add(state.currentNodeId);
    for (const entry of state.routeHistory ?? []) {
      if (entry.nodeId) s.add(entry.nodeId);
    }
    return s;
  }, [state.visitedNodes, state.currentNodeId, state.routeHistory]);

  const endingsSet = useMemo(
    () => new Set<string>(state.endingsDiscovered ?? []),
    [state.endingsDiscovered]
  );

  const chapterNodes = useMemo(() => {
    void loadedVersion;
    const all = getLoadedNodes();
    return all.filter((n: StoryNode) => {
      if (selectedChapter === 'Chapter 1') {
        return n.chapter === 'Chapter 1' || n.chapter === 'Vision' || n.chapter === 'Interlude';
      }
      return n.chapter === selectedChapter;
    });
  }, [selectedChapter, loadedVersion]);

  const chapterNodeMap = useMemo(() => {
    const m = new Map<string, StoryNode>();
    for (const n of chapterNodes) m.set(n.id, n);
    return m;
  }, [chapterNodes]);

  const visitedInChapter = useMemo(() => {
    const list = chapterNodes.filter((n) => visitedSet.has(n.id));
    return list.sort((a, b) => {
      if (a.id === state.currentNodeId) return -1;
      if (b.id === state.currentNodeId) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [chapterNodes, visitedSet, state.currentNodeId]);

  interface FrontierEntry {
    targetId: string;
    fromTitle: string;
    choiceText: string;
    hint: string;
  }

  const frontierNodes = useMemo<FrontierEntry[]>(() => {
    const seenTargets = new Set<string>();
    const results: FrontierEntry[] = [];
    for (const parent of visitedInChapter) {
      for (const c of parent.choices ?? []) {
        const candidateTargets = c.diceCheck
          ? [c.diceCheck.successNode, c.diceCheck.failureNode]
          : [c.nextNode];
        for (const tId of candidateTargets) {
          if (!tId || tId === '__return__' || visitedSet.has(tId) || seenTargets.has(tId)) continue;
          if (!chapterNodeMap.has(tId)) continue;
          seenTargets.add(tId);
          const req = checkRequirements(state, c.requirements);
          const hints: string[] = [];
          if (c.diceCheck) {
            hints.push(`D20 ${DICE_STAT_LABELS[c.diceCheck.stat]} DC ${c.diceCheck.difficulty}`);
          }
          if (!req.met && req.reasons.length > 0) {
            hints.push(req.reasons[0]);
          } else if (c.flavorText) {
            hints.push(c.flavorText);
          }
          results.push({
            targetId: tId,
            fromTitle: parent.title,
            choiceText: c.text,
            hint: hints.join(' · '),
          });
        }
      }
    }
    return results;
  }, [visitedInChapter, visitedSet, chapterNodeMap, state]);

  const chapterEndings = useMemo(
    () => ENDINGS.filter((e) => normalizeEndingChapter(e.chapter) === selectedChapter),
    [selectedChapter]
  );

  const chapterEndingsDiscovered = useMemo(
    () => chapterEndings.filter((e) => endingsSet.has(e.id)).length,
    [chapterEndings, endingsSet]
  );

  const expectedChapterNodeCount =
    GENERATED_STORY_SUMMARY.chapterCounts[selectedChapter] ?? chapterNodes.length;
  const globalVisitedCount = visitedSet.size;
  const globalTotalNodes = GENERATED_STORY_SUMMARY.totalNodes;
  const globalEndingsFound = (state.endingsDiscovered ?? []).filter((id) => id !== 'chapter1_end').length;
  const globalTotalEndings = ENDINGS.length;

  return (
    <LinearGradient colors={['#06050c', '#100c1a', '#06050c']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>CHAPTER BRANCH MAP</Text>
          <Text style={styles.subtitle}>
            Visited {globalVisitedCount} / {globalTotalNodes} Nodes · Endings {globalEndingsFound} / {globalTotalEndings}
          </Text>
        </View>
        <Pressable
          style={styles.closeBtn}
          onPress={() => setScreen(state.character ? 'game' : 'mainMenu')}
          accessibilityRole="button"
          accessibilityLabel="Close Branch Map"
        >
          <Feather name="x" size={20} color="#8a7d6e" />
        </Pressable>
      </View>

      {/* Chapter selector pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chapterTabs}
        contentContainerStyle={styles.chapterTabsContent}
      >
        {MAP_CHAPTERS.map((ch) => {
          const isSelected = selectedChapter === ch;
          const isUnlocked = unlockedChapters.includes(ch);
          return (
            <Pressable
              key={ch}
              style={[
                styles.chapterPill,
                isSelected && styles.chapterPillActive,
                !isUnlocked && styles.chapterPillLocked,
              ]}
              onPress={() => setSelectedChapter(ch)}
            >
              {!isUnlocked && <Feather name="lock" size={9} color="#5a5068" />}
              <Text
                style={[
                  styles.chapterPillText,
                  isSelected && styles.chapterPillTextActive,
                  !isUnlocked && { color: '#5a5068' },
                ]}
              >
                {ch.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: botPad + 28 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected chapter overview */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeaderRow}>
            <Feather name="git-branch" size={14} color="#1abc9c" />
            <Text style={styles.summaryTitle}>{selectedChapter.toUpperCase()}</Text>
            {currentNode?.chapter === selectedChapter && (
              <View style={styles.hereBadge}>
                <Text style={styles.hereBadgeText}>ACTIVE CHAPTER</Text>
              </View>
            )}
          </View>
          <View style={styles.summaryMetrics}>
            <Text style={styles.metricText}>
              Explored: <Text style={styles.metricHighlight}>{visitedInChapter.length}</Text> / {expectedChapterNodeCount} scenes
            </Text>
            <Text style={styles.metricText}>
              Frontier: <Text style={{ color: '#e67e22', fontFamily: 'Inter_600SemiBold' }}>{frontierNodes.length}</Text> unseen
            </Text>
            <Text style={styles.metricText}>
              Endings: <Text style={{ color: '#c9a84c', fontFamily: 'Inter_600SemiBold' }}>{chapterEndingsDiscovered}</Text> / {chapterEndings.length}
            </Text>
          </View>
        </View>

        {isLoadingChapter ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color="#9b59b6" size="small" />
            <Text style={styles.loadingText}>Mapping {selectedChapter} branches...</Text>
          </View>
        ) : (
          <>
            {/* Visited Nodes & Outgoing Splits */}
            <Text style={styles.sectionLabel}>EXPLORED SCENES ({visitedInChapter.length})</Text>
            {visitedInChapter.length === 0 ? (
              <View style={styles.emptyCard}>
                <Feather name="compass" size={20} color="#3a3048" />
                <Text style={styles.emptyText}>
                  No scenes explored in {selectedChapter} yet. Enter this chapter or load a save to reveal its map.
                </Text>
              </View>
            ) : (
              visitedInChapter.map((node) => {
                const isHere = node.id === state.currentNodeId;
                return (
                  <View key={node.id} style={[styles.nodeCard, isHere && styles.nodeCardCurrent]}>
                    <View style={styles.nodeHeader}>
                      <Text style={styles.nodeTitle}>{node.title}</Text>
                      {isHere && (
                        <View style={styles.hereTag}>
                          <Text style={styles.hereTagText}>HERE</Text>
                        </View>
                      )}
                      {node.isEnding && (
                        <View style={styles.endingTag}>
                          <Text style={styles.endingTagText}>ENDING</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.nodeLocation}>{node.location}</Text>

                    {node.choices && node.choices.length > 0 && (
                      <View style={styles.branchList}>
                        {node.choices.map((c) => {
                          const targetId = c.diceCheck ? c.diceCheck.successNode : c.nextNode;
                          const explored = targetId === '__return__' || visitedSet.has(targetId);
                          const reqCheck = checkRequirements(state, c.requirements);
                          const diceHint = c.diceCheck
                            ? ` [${DICE_STAT_LABELS[c.diceCheck.stat]} DC ${c.diceCheck.difficulty}]`
                            : '';
                          return (
                            <View key={c.id} style={styles.branchRow}>
                              <Feather
                                name={explored ? 'check-circle' : 'help-circle'}
                                size={11}
                                color={explored ? '#27ae60' : reqCheck.met ? '#e67e22' : '#5a5068'}
                              />
                              <Text
                                style={[
                                  styles.branchText,
                                  { color: explored ? '#9ad3b0' : reqCheck.met ? '#d4c5a9' : '#6a5e70' },
                                ]}
                                numberOfLines={2}
                              >
                                {explored ? 'Explored: ' : 'Unexplored: '}
                                {c.text}
                                {diceHint}
                                {!explored && !reqCheck.met && reqCheck.reasons[0] ? ` (${reqCheck.reasons[0]})` : ''}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })
            )}

            {/* Fog-of-War Frontier */}
            {frontierNodes.length > 0 && (
              <>
                <Text style={[styles.sectionLabel, { marginTop: 18 }]}>
                  FOG-OF-WAR FRONTIER ({frontierNodes.length})
                </Text>
                {frontierNodes.slice(0, 20).map((f) => (
                  <View key={f.targetId} style={styles.frontierCard}>
                    <View style={styles.frontierTop}>
                      <Feather name="eye-off" size={12} color="#e67e22" />
                      <Text style={styles.frontierTitle}>UNEXPLORED SCENE — ???</Text>
                    </View>
                    <Text style={styles.frontierFrom}>
                      From "{f.fromTitle}": {f.choiceText}
                    </Text>
                    {f.hint !== '' && <Text style={styles.frontierHint}>{f.hint}</Text>}
                  </View>
                ))}
              </>
            )}

            {/* Chapter Endings Silhouettes */}
            {chapterEndings.length > 0 && (
              <>
                <Text style={[styles.sectionLabel, { marginTop: 18 }]}>
                  CHAPTER ENDINGS ({chapterEndingsDiscovered} / {chapterEndings.length})
                </Text>
                {chapterEndings.map((end) => {
                  const found = endingsSet.has(end.id);
                  return (
                    <View
                      key={end.id}
                      style={[
                        styles.endingCard,
                        { borderColor: found ? `${end.color}55` : 'rgba(42,38,58,0.5)' },
                      ]}
                    >
                      <Feather
                        name={found ? 'award' : 'lock'}
                        size={13}
                        color={found ? end.color : '#4a4058'}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.endingTitle, { color: found ? '#ede0c4' : '#5a5068' }]}>
                          {found ? end.title : '[UNDISCOVERED ENDING — ???]'}
                        </Text>
                        <Text style={[styles.endingSubtitle, { color: found ? end.color : '#3a3448' }]}>
                          {found ? `${end.type.toUpperCase()} · ${end.subtitle}` : `${end.type.toUpperCase()} SILHOUETTE`}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,89,182,0.16)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    letterSpacing: 3,
    color: '#c9a84c',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 12,
    color: '#8c829e',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  closeBtn: { padding: 6 },
  chapterTabs: {
    maxHeight: 46,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42,38,58,0.6)',
  },
  chapterTabsContent: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  chapterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(70,60,90,0.6)',
    backgroundColor: 'rgba(14,12,24,0.85)',
  },
  chapterPillActive: {
    borderColor: '#1abc9c',
    backgroundColor: 'rgba(26,188,156,0.14)',
  },
  chapterPillLocked: {
    opacity: 0.65,
  },
  chapterPillText: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#b8a99a',
    fontFamily: 'Inter_600SemiBold',
  },
  chapterPillTextActive: {
    color: '#1abc9c',
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(16,14,26,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(26,188,156,0.28)',
    borderRadius: 6,
    padding: 14,
    marginBottom: 16,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  hereBadge: {
    backgroundColor: 'rgba(201,168,76,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  hereBadgeText: {
    fontSize: 9,
    color: '#c9a84c',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  summaryMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metricText: {
    fontSize: 12,
    color: '#8c829e',
    fontFamily: 'Inter_400Regular',
  },
  metricHighlight: {
    color: '#1abc9c',
    fontFamily: 'Inter_600SemiBold',
  },
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 36,
    gap: 10,
  },
  loadingText: {
    fontSize: 12,
    color: '#8c829e',
    fontFamily: 'Inter_400Regular',
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 2.2,
    color: '#6a5e70',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
  emptyCard: {
    backgroundColor: 'rgba(14,12,24,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(42,38,58,0.6)',
    borderRadius: 6,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 13,
    color: '#7a6e80',
    textAlign: 'center',
    lineHeight: 19,
  },
  nodeCard: {
    backgroundColor: 'rgba(16,14,26,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(70,58,95,0.5)',
    borderRadius: 6,
    padding: 13,
    marginBottom: 10,
  },
  nodeCardCurrent: {
    borderColor: 'rgba(201,168,76,0.75)',
    backgroundColor: 'rgba(26,20,38,0.95)',
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nodeTitle: {
    fontSize: 14,
    color: '#ede0c4',
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  hereTag: {
    backgroundColor: 'rgba(201,168,76,0.18)',
    borderWidth: 1,
    borderColor: '#c9a84c',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  hereTagText: {
    fontSize: 9,
    color: '#c9a84c',
    fontFamily: 'Inter_700Bold',
  },
  endingTag: {
    backgroundColor: 'rgba(192,57,43,0.2)',
    borderWidth: 1,
    borderColor: '#c0392b',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  endingTagText: {
    fontSize: 9,
    color: '#e74c3c',
    fontFamily: 'Inter_700Bold',
  },
  nodeLocation: {
    fontSize: 11,
    color: '#8c829e',
    marginTop: 2,
    marginBottom: 8,
  },
  branchList: {
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(42,38,58,0.6)',
    paddingTop: 8,
  },
  branchRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  branchText: {
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  frontierCard: {
    backgroundColor: 'rgba(20,14,28,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(230,126,34,0.28)',
    borderStyle: 'dashed',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  frontierTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  frontierTitle: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#e67e22',
    fontFamily: 'Inter_600SemiBold',
  },
  frontierFrom: {
    fontSize: 12,
    color: '#b8a99a',
    fontFamily: 'Inter_400Regular',
  },
  frontierHint: {
    fontSize: 11,
    color: '#a696bc',
    fontStyle: 'italic',
    marginTop: 4,
  },
  endingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(14,12,24,0.85)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 11,
    marginBottom: 7,
  },
  endingTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  endingSubtitle: {
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
    fontFamily: 'Inter_500Medium',
  },
});
