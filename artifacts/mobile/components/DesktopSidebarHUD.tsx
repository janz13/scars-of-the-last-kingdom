import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import PixelFrame from './scene/PixelFrame';
import {
  isFullscreenSupported,
  isFullscreenActive,
  toggleFullscreen,
  subscribeFullscreenChange,
} from '../logic/fullscreen';
import {
  BACKGROUNDS,
  CLASSES,
  PERSONALITY_TRAITS,
} from '../data/characterOptions';
import { getCainStage, getMiraStage } from '../logic/companionSystem';
import { CAIN_STAGES, MIRA_STAGES } from '../data/companions';
import { FACTIONS, getRepLabel } from '../data/factions';
import type { FactionRep } from '../data/types';

const CLASS_COLORS: Record<string, string> = {
  blade_survivor: '#e74c3c',
  gun_scavenger: '#e67e22',
  medic: '#2ecc71',
  tactician: '#3d9ad1',
  relic_hunter: '#f1c40f',
  shadow_broker: '#95a5a6',
  esper: '#9b59b6',
};

interface StatMeterProps {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
  isPulsing?: boolean;
  pulseAnim?: SharedValue<number>;
}

function StatMeter({
  label,
  value,
  max,
  color,
  icon,
  isPulsing,
  pulseAnim,
}: StatMeterProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const fillAnimStyle = useAnimatedStyle(() => ({
    opacity: isPulsing && pulseAnim ? pulseAnim.value : 1,
  }));

  return (
    <View style={styles.meterContainer}>
      <View style={styles.meterHeader}>
        <View style={styles.meterLabelRow}>
          <Feather name={icon as any} size={11} color={color} style={styles.meterIcon} />
          <Text style={styles.meterLabel}>{label}</Text>
        </View>
        <Text style={[styles.meterValue, { color }]}>
          {value}
          <Text style={styles.meterMax}>/{max}</Text>
        </Text>
      </View>
      <View style={styles.meterTrack}>
        <Animated.View
          style={[
            styles.meterFill,
            {
              width: `${pct * 100}%` as any,
              backgroundColor: color,
            },
            fillAnimStyle,
          ]}
        />
        {isPulsing && pulseAnim && (
          <Animated.View
            style={[
              styles.meterPulseGlow,
              {
                width: `${pct * 100}%` as any,
              },
              fillAnimStyle,
            ]}
          />
        )}
      </View>
    </View>
  );
}

interface DesktopSidebarHUDProps {
  onOpenHotkeys?: () => void;
}

export default function DesktopSidebarHUD({ onOpenHotkeys }: DesktopSidebarHUDProps = {}) {
  const { state, currentNode, setScreen, setShowHotkeyModal } = useGame();
  const handleOpenHotkeys = onOpenHotkeys ?? (() => setShowHotkeyModal?.(true));
  const { character, stats, companions, inventory, factionRep } = state;

  // Pulse animation for high corruption (>50)
  const corruptionPulse = useSharedValue(1);
  const isHighCorruption = stats.corruption > 50;

  useEffect(() => {
    if (isHighCorruption) {
      corruptionPulse.value = withRepeat(
        withSequence(
          withTiming(0.35, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(corruptionPulse);
      corruptionPulse.value = 1;
    }
  }, [isHighCorruption, corruptionPulse]);

  const warningPulseStyle = useAnimatedStyle(() => ({
    opacity: corruptionPulse.value,
  }));

  // Character profile details
  const classDef = CLASSES.find((c) => c.id === character?.characterClass);
  const className = classDef?.name ?? (character?.characterClass ? character.characterClass.replace(/_/g, ' ') : 'WANDERER');
  const classColor = (character?.characterClass && CLASS_COLORS[character.characterClass]) || '#c9a84c';

  const bgDef = BACKGROUNDS.find((b) => b.id === character?.background);
  const bgName = bgDef?.name ?? (character?.background ? character.background.replace(/_/g, ' ') : 'Unknown');

  const traitDef = PERSONALITY_TRAITS.find((p) => p.id === character?.personalityTrait);
  const traitName = traitDef?.name ?? (character?.personalityTrait ? character.personalityTrait.replace(/_/g, ' ') : 'Pragmatic');

  // Companion stages
  const miraStage = getMiraStage(state);
  const miraInfo = MIRA_STAGES[miraStage];
  const cainStage = getCainStage(state);
  const cainInfo = CAIN_STAGES[cainStage];

  const [fullscreenActive, setFullscreenActive] = useState(isFullscreenActive());
  const fullscreenSupported = isFullscreenSupported();

  useEffect(() => {
    if (!fullscreenSupported) return;
    const unsub = subscribeFullscreenChange((active) => {
      setFullscreenActive(active);
    });
    return unsub;
  }, [fullscreenSupported]);

  return (
    <View style={styles.sidebarWrapper}>
      {/* ── HUD Header with Quick Fullscreen Toggle ────────────────── */}
      <View style={styles.hudTopHeader}>
        <View style={styles.hudHeaderTitleRow}>
          <Feather name="shield" size={12} color="#9b59b6" />
          <Text style={styles.hudHeaderTitle}>TACTICAL HUD</Text>
        </View>
        {fullscreenSupported && (
          <Pressable
            onPress={() => toggleFullscreen()}
            style={({ pressed }) => [
              styles.fullscreenQuickBtn,
              fullscreenActive && styles.fullscreenQuickBtnActive,
              pressed && styles.fullscreenQuickBtnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={fullscreenActive ? 'Exit Fullscreen' : 'Enter Immersive Fullscreen'}
            role="button"
          >
            <Feather
              name={fullscreenActive ? 'minimize-2' : 'maximize-2'}
              size={11}
              color={fullscreenActive ? '#2ecc71' : '#c9a84c'}
            />
            <Text
              style={[
                styles.fullscreenQuickText,
                fullscreenActive && styles.fullscreenQuickTextActive,
              ]}
            >
              {fullscreenActive ? 'EXIT' : 'FULL'}
            </Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Character Profile ────────────────────────────────────────── */}
        <PixelFrame variant="neutral" style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.nameRow}>
              <Text style={styles.characterName} numberOfLines={1}>
                {character?.name || 'Unknown Wanderer'}
              </Text>
              <View style={[styles.classBadge, { borderColor: `${classColor}55`, backgroundColor: `${classColor}18` }]}>
                <Text style={[styles.classBadgeText, { color: classColor }]}>
                  {className.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>BACKGROUND</Text>
              <Text style={styles.metaVal} numberOfLines={1}>{bgName}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>PERSONALITY</Text>
              <Text style={styles.metaVal} numberOfLines={1}>{traitName}</Text>
            </View>
          </View>

          {/* Location / Chapter */}
          <View style={styles.locationStrip}>
            <Feather name="compass" size={12} color="#9b59b6" style={{ marginRight: 6 }} />
            <Text style={styles.locationText} numberOfLines={1}>
              {currentNode?.chapter ? `${currentNode.chapter.toUpperCase()} · ` : ''}
              {currentNode?.location ? currentNode.location.toUpperCase() : 'THE UNDERDARK'}
            </Text>
          </View>
        </PixelFrame>

        {/* ── Survival Stats Meters ────────────────────────────────────── */}
        <PixelFrame variant="neutral" style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Feather name="activity" size={12} color="#c9a84c" />
            <Text style={styles.sectionTitle}>SURVIVAL GAUGES</Text>
            <Pressable onPress={() => setScreen('stats')} hitSlop={6} style={styles.headerActionBtn}>
              <Feather name="external-link" size={11} color="#8a7d6e" />
            </Pressable>
          </View>

          <View style={styles.metersList}>
            <StatMeter
              label="Health"
              value={stats.health}
              max={stats.maxHealth}
              color="#e74c3c"
              icon="heart"
            />
            <StatMeter
              label="Hunger"
              value={stats.hunger}
              max={100}
              color="#e67e22"
              icon="alert-triangle"
            />
            <StatMeter
              label="Thirst"
              value={stats.thirst}
              max={100}
              color="#3d9ad1"
              icon="droplet"
            />
            <StatMeter
              label="Morale"
              value={stats.morale}
              max={100}
              color="#9b59b6"
              icon="wind"
            />
            <StatMeter
              label="Corruption"
              value={stats.corruption}
              max={100}
              color={isHighCorruption ? '#c39bd3' : '#7d3c98'}
              icon="zap"
              isPulsing={isHighCorruption}
              pulseAnim={corruptionPulse}
            />
          </View>

          {isHighCorruption && (
            <Animated.View style={[styles.corruptionWarning, warningPulseStyle]}>
              <Feather name="alert-octagon" size={11} color="#c39bd3" />
              <Text style={styles.corruptionWarningText}>Mark awakens — boundary critical</Text>
            </Animated.View>
          )}
        </PixelFrame>

        {/* ── Companions Card ──────────────────────────────────────────── */}
        <PixelFrame variant="neutral" style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Feather name="users" size={12} color="#c9a84c" />
            <Text style={styles.sectionTitle}>COMPANIONS</Text>
            <Pressable onPress={() => setScreen('companions')} hitSlop={6} style={styles.headerActionBtn}>
              <Feather name="external-link" size={11} color="#8a7d6e" />
            </Pressable>
          </View>

          {/* Mira */}
          <View style={styles.companionRow}>
            <View style={styles.compHeader}>
              <View style={styles.compNameCol}>
                <View style={styles.compIndicatorRow}>
                  <View
                    style={[
                      styles.presenceDot,
                      { backgroundColor: companions.mira.present ? '#2ecc71' : '#5a5068' },
                    ]}
                  />
                  <Text style={styles.compName}>Mira</Text>
                  <Text style={styles.compRole}>Medic</Text>
                </View>
                <Text style={styles.compStatusText}>
                  {companions.mira.present ? 'Present' : 'Absent'}
                </Text>
              </View>

              <View style={[styles.stagePill, { borderColor: miraInfo.color }]}>
                <Text style={[styles.stagePillText, { color: miraInfo.color }]}>
                  {miraInfo.shortLabel.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.trustBarTrack}>
              <View
                style={[
                  styles.trustBarFill,
                  { width: `${(companions.mira.trust / 10) * 100}%` as any, backgroundColor: miraInfo.color },
                ]}
              />
            </View>
            <View style={styles.trustFooter}>
              <Text style={styles.trustSubLabel}>Trust</Text>
              <Text style={styles.trustValue}>{companions.mira.trust}/10</Text>
            </View>
          </View>

          <View style={styles.itemDivider} />

          {/* Cain */}
          <View style={styles.companionRow}>
            <View style={styles.compHeader}>
              <View style={styles.compNameCol}>
                <View style={styles.compIndicatorRow}>
                  <View
                    style={[
                      styles.presenceDot,
                      { backgroundColor: companions.cain.present ? '#2ecc71' : '#5a5068' },
                    ]}
                  />
                  <Text style={styles.compName}>Cain</Text>
                  <Text style={styles.compRole}>Ex-Saint</Text>
                </View>
                <Text style={styles.compStatusText}>
                  {companions.cain.present ? 'Present' : 'Absent'}
                </Text>
              </View>

              <View style={[styles.stagePill, { borderColor: cainInfo.color }]}>
                <Text style={[styles.stagePillText, { color: cainInfo.color }]}>
                  {cainInfo.shortLabel.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.trustBarTrack}>
              <View
                style={[
                  styles.trustBarFill,
                  { width: `${(companions.cain.trust / 10) * 100}%` as any, backgroundColor: cainInfo.color },
                ]}
              />
            </View>
            <View style={styles.trustFooter}>
              <Text style={styles.trustSubLabel}>Trust</Text>
              <Text style={styles.trustValue}>{companions.cain.trust}/10</Text>
            </View>
          </View>
        </PixelFrame>

        {/* ── Faction Standings ────────────────────────────────────────── */}
        <PixelFrame variant="neutral" style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Feather name="shield" size={12} color="#c9a84c" />
            <Text style={styles.sectionTitle}>FACTIONS</Text>
            <Pressable onPress={() => setScreen('factions')} hitSlop={6} style={styles.headerActionBtn}>
              <Feather name="external-link" size={11} color="#8a7d6e" />
            </Pressable>
          </View>

          <View style={styles.factionList}>
            {FACTIONS.map((faction) => {
              const rep = factionRep[faction.key as keyof FactionRep] ?? 0;
              const repLabel = getRepLabel(faction, rep);
              const repColor = rep < 0 ? '#e74c3c' : rep === 0 ? '#8a7d6e' : faction.color;

              return (
                <View key={faction.id} style={styles.factionItem}>
                  <View style={styles.factionNameRow}>
                    <View style={[styles.factionDot, { backgroundColor: faction.color }]} />
                    <Text style={styles.factionName} numberOfLines={1}>{faction.name}</Text>
                  </View>
                  <View style={styles.factionRepCol}>
                    <Text style={[styles.factionRepNum, { color: repColor }]}>
                      {rep > 0 ? `+${rep}` : rep}
                    </Text>
                    <Text style={styles.factionRepLabel} numberOfLines={1}>{repLabel}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </PixelFrame>

        {/* ── Quick Inventory Grid ─────────────────────────────────────── */}
        <PixelFrame variant="neutral" style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Feather name="package" size={12} color="#c9a84c" />
            <Text style={styles.sectionTitle}>QUICK INVENTORY</Text>
            <Pressable onPress={() => setScreen('inventory')} hitSlop={6} style={styles.headerActionBtn}>
              <Feather name="external-link" size={11} color="#8a7d6e" />
            </Pressable>
          </View>

          <View style={styles.inventoryGrid}>
            <Pressable
              style={styles.invTile}
              onPress={() => setScreen('inventory')}
            >
              <View style={[styles.invIconBox, { backgroundColor: 'rgba(230,126,34,0.12)' }]}>
                <Feather name="package" size={13} color="#e67e22" />
              </View>
              <View style={styles.invTileText}>
                <Text style={styles.invLabel}>Food</Text>
                <Text style={[styles.invValue, { color: inventory.food > 0 ? '#e67e22' : '#5a5068' }]}>
                  {inventory.food}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.invTile}
              onPress={() => setScreen('inventory')}
            >
              <View style={[styles.invIconBox, { backgroundColor: 'rgba(61,154,209,0.12)' }]}>
                <Feather name="droplet" size={13} color="#3d9ad1" />
              </View>
              <View style={styles.invTileText}>
                <Text style={styles.invLabel}>Water</Text>
                <Text style={[styles.invValue, { color: inventory.water > 0 ? '#3d9ad1' : '#5a5068' }]}>
                  {inventory.water}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.invTile}
              onPress={() => setScreen('inventory')}
            >
              <View style={[styles.invIconBox, { backgroundColor: 'rgba(46,204,113,0.12)' }]}>
                <Feather name="activity" size={13} color="#2ecc71" />
              </View>
              <View style={styles.invTileText}>
                <Text style={styles.invLabel}>Medicine</Text>
                <Text style={[styles.invValue, { color: inventory.medicine > 0 ? '#2ecc71' : '#5a5068' }]}>
                  {inventory.medicine}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.invTile}
              onPress={() => setScreen('inventory')}
            >
              <View style={[styles.invIconBox, { backgroundColor: 'rgba(231,76,60,0.12)' }]}>
                <Feather name="target" size={13} color="#e74c3c" />
              </View>
              <View style={styles.invTileText}>
                <Text style={styles.invLabel}>Ammo</Text>
                <Text style={[styles.invValue, { color: inventory.ammo > 0 ? '#e74c3c' : '#5a5068' }]}>
                  {inventory.ammo}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.invTile}
              onPress={() => setScreen('inventory')}
            >
              <View style={[styles.invIconBox, { backgroundColor: 'rgba(138,154,168,0.12)' }]}>
                <Feather name="tool" size={13} color="#8a9aa8" />
              </View>
              <View style={styles.invTileText}>
                <Text style={styles.invLabel}>Scrap</Text>
                <Text style={[styles.invValue, { color: inventory.scrap > 0 ? '#8a9aa8' : '#5a5068' }]}>
                  {inventory.scrap}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.invTile}
              onPress={() => setScreen('inventory')}
            >
              <View style={[styles.invIconBox, { backgroundColor: 'rgba(155,89,182,0.15)' }]}>
                <Feather name="zap" size={13} color="#9b59b6" />
              </View>
              <View style={styles.invTileText}>
                <Text style={styles.invLabel}>Relics</Text>
                <Text style={[styles.invValue, { color: inventory.relics > 0 ? '#9b59b6' : '#5a5068' }]}>
                  {inventory.relics}
                </Text>
              </View>
            </Pressable>
          </View>
        </PixelFrame>

        {/* ── Keyboard Hotkeys Cheat-Sheet ─────────────────────────────── */}
        <PixelFrame variant="lastArchive" style={[styles.card, styles.hotkeysCard]}>
          <Pressable
            style={({ pressed }) => [styles.hotkeyHeader, pressed && styles.hotkeyHeaderPressed]}
            onPress={handleOpenHotkeys}
            accessibilityRole="button"
            accessibilityLabel="Open keyboard shortcuts cheat sheet"
            role="button"
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
              <Feather name="command" size={11} color="#c9a84c" />
              <Text style={styles.hotkeysTitle}>KEYBOARD SHORTCUTS</Text>
            </View>
            <View style={styles.hotkeyHelpBadge}>
              <Text style={styles.hotkeyHelpBadgeText}>?</Text>
            </View>
          </Pressable>
          <View style={styles.hotkeysGrid}>
            <View style={styles.hotkeyRow}>
              <View style={styles.keyCap}>
                <Text style={styles.keyCapText}>1-9</Text>
              </View>
              <Text style={styles.hotkeyLabel}>Choose</Text>
            </View>

            <View style={styles.hotkeyRow}>
              <View style={styles.keyCap}>
                <Text style={styles.keyCapText}>Space</Text>
              </View>
              <Text style={styles.hotkeyLabel}>Roll / Skip</Text>
            </View>

            <View style={styles.hotkeyRow}>
              <View style={styles.keyCap}>
                <Text style={styles.keyCapText}>?</Text>
              </View>
              <Text style={styles.hotkeyLabel}>All Keys</Text>
            </View>

            <View style={styles.hotkeyRow}>
              <View style={styles.keyCap}>
                <Text style={styles.keyCapText}>Esc</Text>
              </View>
              <Text style={styles.hotkeyLabel}>Menu</Text>
            </View>
          </View>
        </PixelFrame>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarWrapper: {
    width: 320,
    height: '100%',
    backgroundColor: 'rgba(12, 11, 20, 0.94)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(155, 89, 182, 0.22)',
  },
  hudTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(16, 14, 26, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155, 89, 182, 0.22)',
  },
  hudHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  hudHeaderTitle: {
    fontSize: 10,
    fontFamily: 'Cinzel_700Bold',
    color: '#ede0c4',
    letterSpacing: 1.5,
  },
  fullscreenQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(28, 22, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.4)',
    borderRadius: 3,
  },
  fullscreenQuickBtnActive: {
    backgroundColor: 'rgba(26, 46, 32, 0.85)',
    borderColor: 'rgba(46, 204, 113, 0.55)',
  },
  fullscreenQuickBtnPressed: {
    opacity: 0.75,
  },
  fullscreenQuickText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    color: '#c9a84c',
    letterSpacing: 0.8,
  },
  fullscreenQuickTextActive: {
    color: '#2ecc71',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(19, 18, 30, 0.88)',
    padding: 12,
  },
  cardHeader: {
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  characterName: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#d4c5a9',
    letterSpacing: 0.3,
    flex: 1,
  },
  classBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  classBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.1)',
  },
  metaCol: {
    flex: 1,
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(155, 89, 182, 0.12)',
    marginHorizontal: 8,
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: 'Inter_600SemiBold',
    color: '#8a7d6e',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  metaVal: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: '#d4c5a9',
  },
  locationStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 6,
  },
  locationText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#9b59b6',
    letterSpacing: 0.8,
    flex: 1,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: '#c9a84c',
    letterSpacing: 1,
    flex: 1,
  },
  headerActionBtn: {
    padding: 2,
  },
  metersList: {
    gap: 8,
  },
  meterContainer: {
    gap: 3,
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meterLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meterIcon: {
    marginRight: 4,
  },
  meterLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: '#d4c5a9',
  },
  meterValue: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  meterMax: {
    fontSize: 9,
    color: '#6a5e70',
    fontFamily: 'Inter_400Regular',
  },
  meterTrack: {
    height: 4,
    backgroundColor: 'rgba(30, 26, 44, 0.8)',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  meterFill: {
    height: '100%',
    borderRadius: 2,
  },
  meterPulseGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#9b59b6',
  },
  corruptionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(155, 89, 182, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.35)',
    borderRadius: 4,
  },
  corruptionWarningText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#c39bd3',
    letterSpacing: 0.3,
  },
  companionRow: {
    gap: 6,
  },
  compHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compNameCol: {
    gap: 1,
  },
  compIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  presenceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  compName: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#d4c5a9',
  },
  compRole: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: '#8a7d6e',
  },
  compStatusText: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: '#6a5e70',
    marginLeft: 11,
  },
  stagePill: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: 'rgba(20, 15, 30, 0.6)',
  },
  stagePillText: {
    fontSize: 8,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  trustBarTrack: {
    height: 3,
    backgroundColor: 'rgba(30, 26, 44, 0.8)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  trustBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  trustFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trustSubLabel: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: '#6a5e70',
  },
  trustValue: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#c9a84c',
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
    marginVertical: 8,
  },
  factionList: {
    gap: 6,
  },
  factionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  factionNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  factionDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  factionName: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: '#d4c5a9',
    flex: 1,
  },
  factionRepCol: {
    alignItems: 'flex-end',
  },
  factionRepNum: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  factionRepLabel: {
    fontSize: 8,
    fontFamily: 'Inter_400Regular',
    color: '#6a5e70',
  },
  inventoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  invTile: {
    width: '31%',
    flexGrow: 1,
    backgroundColor: 'rgba(26, 25, 40, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.12)',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  invIconBox: {
    width: 22,
    height: 22,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invTileText: {
    flex: 1,
  },
  invLabel: {
    fontSize: 8,
    fontFamily: 'Inter_500Medium',
    color: '#8a7d6e',
  },
  invValue: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  hotkeysCard: {
    backgroundColor: 'rgba(15, 14, 25, 0.95)',
    borderColor: 'rgba(201, 168, 76, 0.25)',
  },
  hotkeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
    borderRadius: 4,
    paddingVertical: 2,
  },
  hotkeyHeaderPressed: {
    opacity: 0.7,
  },
  hotkeyHelpBadge: {
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.4)',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotkeyHelpBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    color: '#c9a84c',
  },
  hotkeysTitle: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    color: '#c9a84c',
    letterSpacing: 0.8,
  },
  hotkeysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  hotkeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '47%',
  },
  keyCap: {
    backgroundColor: 'rgba(30, 28, 45, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.35)',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyCapText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    color: '#c9a84c',
  },
  hotkeyLabel: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: '#d4c5a9',
  },
});
