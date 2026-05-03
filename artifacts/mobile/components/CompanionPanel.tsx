import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import {
  COMPANIONS,
  MIRA_STAGES,
  CAIN_STAGES,
  type StageInfo,
} from '../data/companions';
import { getMiraStage, getCainStage } from '../logic/companionSystem';
import type { MiraStage, CainStage } from '../data/types';

// ── Stage pill ────────────────────────────────────────────────────────────────

function StagePill({ info }: { info: StageInfo }) {
  return (
    <View style={[styles.stagePill, { borderColor: info.color }]}>
      <View style={[styles.stageDot, { backgroundColor: info.color }]} />
      <Text style={[styles.stageLabel, { color: info.color }]}>
        {info.shortLabel.toUpperCase()}
      </Text>
    </View>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

export default function CompanionPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { companions } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const miraStage = getMiraStage(state);
  const cainStage = getCainStage(state);

  const miraStageInfo: StageInfo = MIRA_STAGES[miraStage as MiraStage];
  const cainStageInfo: StageInfo = CAIN_STAGES[cainStage as CainStage];

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>COMPANIONS</Text>
        <Text style={styles.subtitle}>Trust takes time. Betrayal takes a moment.</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}
      >
        {/* ── Mira card ──────────────────────────────────────────────────── */}
        <CompanionCard
          companionId="mira"
          compState={companions.mira}
          stageInfo={miraStageInfo}
          stageKey={miraStage}
          flags={state.flags}
        />

        {/* ── Cain card ──────────────────────────────────────────────────── */}
        <CompanionCard
          companionId="cain"
          compState={companions.cain}
          stageInfo={cainStageInfo}
          stageKey={cainStage}
          flags={state.flags}
        />
      </ScrollView>
    </LinearGradient>
  );
}

// ── Companion card ────────────────────────────────────────────────────────────

interface CompanionCardProps {
  companionId: string;
  compState: { trust: number; present: boolean; alive: boolean };
  stageInfo: StageInfo;
  stageKey: string;
  flags: Record<string, boolean>;
}

function CompanionCard({ companionId, compState, stageInfo, stageKey, flags }: CompanionCardProps) {
  const def = COMPANIONS[companionId];
  if (!def) return null;

  const trustPct = compState.trust / 10;

  // Special route endings shown as a note
  const hasSacrificeRoute = stageKey === 'sacrifice_route';
  const hasLastStand = stageKey === 'last_stand_route';
  const isBroken = stageKey === 'broken';
  const isBetrayer = stageKey === 'betrayer';
  const isRival = stageKey === 'rival';

  // Events that have fired — shown as brief history items
  const eventsForThisCompanion = companionId === 'mira'
    ? MIRA_EVENT_LOG
    : CAIN_EVENT_LOG;

  const seenEvents = eventsForThisCompanion.filter(e => flags[e.flag]);

  return (
    <View style={[styles.card, { borderTopColor: stageInfo.color }]}>
      {/* Header row */}
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.compName, { color: def.color }]}>{def.name}</Text>
          <Text style={styles.compTitle}>{def.title}</Text>
        </View>
        <View style={styles.rightBadges}>
          {/* Presence badge */}
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, {
              backgroundColor: !compState.alive ? '#8e1c1c' : compState.present ? '#2ecc71' : '#6a5e50',
            }]} />
            <Text style={styles.statusText}>
              {!compState.alive ? 'Gone' : compState.present ? 'Present' : 'Not found'}
            </Text>
          </View>
          {/* Stage pill */}
          {compState.present && <StagePill info={stageInfo} />}
        </View>
      </View>

      {/* Description */}
      <Text style={styles.compDesc}>{def.description}</Text>

      {/* Stage description — what this relationship actually means */}
      {compState.present && (
        <View style={[styles.stageDescBox, { borderLeftColor: stageInfo.color }]}>
          <Text style={[styles.stageDescText, { color: stageInfo.color }]}>
            {stageInfo.description}
          </Text>
        </View>
      )}

      {/* Special route callouts */}
      {hasSacrificeRoute && (
        <View style={styles.specialRouteBanner}>
          <Feather name="heart" size={11} color="#c39bd3" />
          <Text style={styles.specialRouteText}>Sacrifice route unlocked</Text>
        </View>
      )}
      {hasLastStand && (
        <View style={styles.specialRouteBanner}>
          <Feather name="shield" size={11} color="#c39bd3" />
          <Text style={styles.specialRouteText}>Last stand route unlocked</Text>
        </View>
      )}
      {isBroken && (
        <View style={[styles.specialRouteBanner, { borderColor: '#4a3050' }]}>
          <Feather name="alert-circle" size={11} color="#4a3050" />
          <Text style={[styles.specialRouteText, { color: '#4a3050' }]}>This trust cannot be rebuilt easily</Text>
        </View>
      )}
      {isRival && (
        <View style={[styles.specialRouteBanner, { borderColor: '#1a3a4a' }]}>
          <Feather name="alert-triangle" size={11} color="#4a7a9a" />
          <Text style={[styles.specialRouteText, { color: '#4a7a9a' }]}>Rival dynamic active — every choice is watched</Text>
        </View>
      )}
      {isBetrayer && (
        <View style={[styles.specialRouteBanner, { borderColor: '#2c1a1a' }]}>
          <Feather name="x-circle" size={11} color="#8e1c1c" />
          <Text style={[styles.specialRouteText, { color: '#8e1c1c' }]}>They made their calculation. You were on the wrong side.</Text>
        </View>
      )}

      {/* Trust bar */}
      <View style={styles.trustSection}>
        <View style={styles.trustLabelRow}>
          <Text style={styles.trustKey}>TRUST</Text>
          <Text style={[styles.trustLabel, { color: stageInfo.color }]}>
            {stageInfo.label}
          </Text>
          <Text style={styles.trustNum}>{compState.trust}/10</Text>
        </View>
        <View style={styles.trustTrack}>
          <View
            style={[
              styles.trustFill,
              { width: `${trustPct * 100}%` as any, backgroundColor: stageInfo.color },
            ]}
          />
        </View>
      </View>

      {/* Event history */}
      {seenEvents.length > 0 && (
        <View style={styles.eventHistory}>
          <Text style={styles.eventHistoryTitle}>RELATIONSHIP EVENTS</Text>
          {seenEvents.map(e => (
            <View key={e.flag} style={styles.eventItem}>
              <Feather name="chevron-right" size={10} color="#4a4050" style={{ marginTop: 2 }} />
              <Text style={styles.eventItemText}>{e.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Gone / not found text */}
      {!compState.alive && (
        <Text style={styles.goneText}>Their story ended here. Their choices remain.</Text>
      )}
      {!compState.present && compState.alive && (
        <Text style={styles.notFoundText}>Not yet encountered. Find them in the tunnels.</Text>
      )}
    </View>
  );
}

// ── Event log definitions (displayed after events fire) ───────────────────────

const MIRA_EVENT_LOG: { flag: string; label: string }[] = [
  { flag: 'mira_event_opens_up_seen',              label: 'Mira shared her Archive past with you.' },
  { flag: 'mira_event_corruption_warning_seen',     label: 'Mira noticed the mark is changing you.' },
  { flag: 'mira_event_pulls_away_seen',             label: 'Mira confronted you about your choices.' },
  { flag: 'mira_event_sacrifice_offer_seen',        label: 'Mira told you she has already decided.' },
];

const CAIN_EVENT_LOG: { flag: string; label: string }[] = [
  { flag: 'cain_event_respect_earned_seen',         label: 'Cain acknowledged your competence.' },
  { flag: 'cain_event_resource_warning_seen',       label: 'Cain audited your inventory and said so.' },
  { flag: 'cain_event_hesitation_seen',             label: 'Cain called out your pattern of waiting.' },
  { flag: 'cain_event_betrayal_warning_seen',       label: 'Cain told you there is another offer on the table.' },
];

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
    position: 'relative',
  },
  title: {
    fontSize: 12,
    letterSpacing: 3,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 13,
    color: '#8a7d6e',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  backBtn: { position: 'absolute', right: 16, bottom: 16, padding: 6 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  card: {
    backgroundColor: '#1a1a28',
    borderRadius: 4,
    borderTopWidth: 3,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  compName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  compTitle: {
    fontSize: 11,
    color: '#8a7d6e',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
  },
  rightBadges: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#12121a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, color: '#8a7d6e', fontFamily: 'Inter_400Regular' },
  stagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  stageDot: { width: 5, height: 5, borderRadius: 3 },
  stageLabel: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  compDesc: {
    fontSize: 13,
    color: '#8a7d6e',
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  stageDescBox: {
    borderLeftWidth: 2,
    paddingLeft: 10,
    marginBottom: 12,
  },
  stageDescText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    lineHeight: 18,
    opacity: 0.85,
  },
  specialRouteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#c39bd3',
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 10,
  },
  specialRouteText: {
    fontSize: 11,
    color: '#c39bd3',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  trustSection: { marginTop: 2 },
  trustLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trustKey: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#6a5e50',
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  trustLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginRight: 8,
  },
  trustNum: { fontSize: 11, color: '#6a5e50', fontFamily: 'Inter_400Regular' },
  trustTrack: {
    height: 4,
    backgroundColor: '#0a0a14',
    borderRadius: 2,
    overflow: 'hidden',
  },
  trustFill: { height: '100%', borderRadius: 2 },
  eventHistory: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3a',
    paddingTop: 10,
  },
  eventHistoryTitle: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 4,
  },
  eventItemText: {
    fontSize: 11,
    color: '#5a4a60',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    flex: 1,
    lineHeight: 16,
  },
  goneText: {
    fontSize: 12,
    color: '#8e1c1c',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 10,
  },
  notFoundText: {
    fontSize: 12,
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
