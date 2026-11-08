import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { DiceCheck, GameState } from '../data/types';
import {
  canUseLuckReroll,
  DiceResult,
  DICE_STAT_LABELS,
  DICE_STAT_FULL,
  diceSides,
  outcomeColor,
  outcomeLabel,
  resolveDiceCheck,
  rollDie,
} from '../logic/diceEngine';

interface Props {
  diceCheck: DiceCheck;
  choiceText: string;
  state: GameState;
  onCommit: (result: DiceResult) => void;
}

type Phase = 'rolling' | 'revealed';

export default function DiceRollOverlay({ diceCheck, choiceText, state, onCommit }: Props) {
  const skip = state.settings.skipDiceAnimation;
  const sides = diceSides(diceCheck.diceType);

  const [result, setResult] = useState<DiceResult>(() =>
    resolveDiceCheck(state, diceCheck),
  );
  const [displayNum, setDisplayNum] = useState(skip ? result.roll : 1);
  const [phase, setPhase] = useState<Phase>(skip ? 'revealed' : 'rolling');
  const [rerollUsed, setRerollUsed] = useState(false);
  const [rerolling, setRerolling] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const luckAvailable = canUseLuckReroll(state) && !rerollUsed;

  // ── Dice rolling animation ─────────────────────────────────────────────────
  function startRollingAnimation(finalRoll: number, onDone: () => void) {
    let ticks = 0;
    const maxTicks = 28;

    const tick = () => {
      ticks++;
      if (ticks >= maxTicks) {
        setDisplayNum(finalRoll);
        tickRef.current = setTimeout(onDone, 320);
      } else {
        const delay = ticks < 12 ? 45 : ticks < 20 ? 75 : 120;
        setDisplayNum(Math.floor(Math.random() * sides) + 1);
        tickRef.current = setTimeout(tick, delay);
      }
    };

    tickRef.current = setTimeout(tick, 150);
  }

  useEffect(() => {
    if (skip) {
      Animated.timing(opacityAnim, { toValue: 1, duration: 0, useNativeDriver: false }).start();
      return;
    }

    Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();

    startRollingAnimation(result.roll, () => {
      setPhase('revealed');
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.25, duration: 120, useNativeDriver: false }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 180, useNativeDriver: false }),
      ]).start();
    });

    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, []);

  // Web keyboard advance listener for Space / Enter
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handleAdvance = (e: Event) => {
      e.preventDefault();
      if (phase === 'revealed') {
        onCommit(result);
      } else {
        if (tickRef.current) clearTimeout(tickRef.current);
        setDisplayNum(result.roll);
        setPhase('revealed');
      }
    };

    window.addEventListener('dice-roll-advance', handleAdvance);
    return () => window.removeEventListener('dice-roll-advance', handleAdvance);
  }, [phase, result, onCommit]);

  // ── Luck reroll ────────────────────────────────────────────────────────────
  function handleLuckReroll() {
    if (rerolling) return;
    setRerollUsed(true);
    setRerolling(true);
    setPhase('rolling');

    const newRoll = rollDie(sides);
    const newResult = resolveDiceCheck(state, diceCheck, newRoll, true);
    setResult(newResult);

    if (skip) {
      setDisplayNum(newResult.roll);
      setPhase('revealed');
      setRerolling(false);
      return;
    }

    startRollingAnimation(newResult.roll, () => {
      setPhase('revealed');
      setRerolling(false);
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.25, duration: 120, useNativeDriver: false }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 180, useNativeDriver: false }),
      ]).start();
    });
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  const color = phase === 'revealed' ? outcomeColor(result.outcome) : '#9b59b6';
  const modSign = result.modifier >= 0 ? '+' : '';
  const label = DICE_STAT_LABELS[diceCheck.stat];
  const fullStat = DICE_STAT_FULL[diceCheck.stat];
  const isSuccess = result.outcome === 'success' || result.outcome === 'criticalSuccess';
  const isCrit = result.outcome === 'criticalSuccess' || result.outcome === 'criticalFailure';

  return (
    <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
      <View style={styles.card}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={[styles.diceTypeBadge, { borderColor: `${color}40` }]}>
            <Text style={[styles.diceTypeText, { color }]}>{diceCheck.diceType.toUpperCase()}</Text>
          </View>
          <Text style={styles.statLabel}>{fullStat.toUpperCase()} CHECK</Text>
          <Text style={styles.dcLabel}>DC {diceCheck.difficulty}</Text>
        </View>

        {/* ── Choice text ── */}
        <Text style={styles.choiceText} numberOfLines={3}>{choiceText}</Text>

        {/* ── Dice face ── */}
        <View style={styles.diceArea}>
          <Animated.View style={[styles.diceFace, { borderColor: color, transform: [{ scale: scaleAnim }] }]}>
            {phase === 'revealed' && isSuccess && (
              <View style={[styles.diceGlow, { backgroundColor: color }]} />
            )}
            <Text style={[styles.diceNumber, { color }]}>{displayNum}</Text>
          </Animated.View>
        </View>

        {/* ── Result breakdown (after reveal) ── */}
        {phase === 'revealed' && (
          <View style={styles.breakdown}>
            <Text style={styles.breakdownLine}>
              {diceCheck.diceType}
              <Text style={styles.breakdownEmphasis}> [{result.roll}]</Text>
              {' '}+{' '}{label}
              <Text style={styles.breakdownEmphasis}> {modSign}{result.modifier}</Text>
              {' '}={' '}
              <Text style={[styles.breakdownEmphasis, { color }]}>{result.total}</Text>
              {'  vs  '}
              <Text style={styles.breakdownMuted}>DC {result.difficulty}</Text>
            </Text>

            <View style={[styles.outcomeBadge, { borderColor: color, backgroundColor: `${color}18` }]}>
              <Text style={[styles.outcomeText, { color }]}>
                {outcomeLabel(result.outcome)}
              </Text>
              {isCrit && (
                <Feather name="zap" size={10} color={color} style={{ marginLeft: 4 }} />
              )}
            </View>

            {/* Stat info */}
            <Text style={styles.statInfo}>
              {fullStat} {result.statValue} → modifier {modSign}{result.modifier}
            </Text>

            {/* Luck reroll */}
            {luckAvailable && !rerollUsed && (
              <Pressable style={styles.rerollBtn} onPress={handleLuckReroll}>
                <Feather name="refresh-cw" size={13} color="#f1c40f" />
                <Text style={styles.rerollText}>USE LUCK — REROLL</Text>
                <Text style={styles.rerollSub}>  (Luck {state.stats.luck})</Text>
              </Pressable>
            )}
            {rerollUsed && (
              <Text style={styles.rerollUsedText}>Luck reroll used</Text>
            )}
          </View>
        )}

        {/* ── Continue button ── */}
        {phase === 'revealed' && (
          <Pressable
            style={({ pressed }) => [
              styles.continueBtn,
              { borderColor: color },
              pressed && styles.continueBtnPressed,
            ]}
            onPress={() => onCommit(result)}
          >
            <Text style={[styles.continueBtnText, { color }]}>CONTINUE</Text>
            <Feather name="arrow-right" size={14} color={color} />
          </Pressable>
        )}

        {/* Rolling indicator */}
        {phase === 'rolling' && (
          <Text style={styles.rollingText}>Rolling…</Text>
        )}

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,2,10,0.93)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    ...(Platform.OS === 'web' ? { position: 'fixed' as any } : {}),
  },
  card: {
    width: '88%',
    maxWidth: 360,
    backgroundColor: '#0e0c18',
    borderWidth: 1,
    borderColor: '#2a2038',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    width: '100%',
  },
  diceTypeBadge: {
    backgroundColor: 'rgba(155,89,182,0.15)',
    borderWidth: 1,
    borderColor: '#4a3060',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  diceTypeText: {
    fontSize: 11,
    color: '#9b59b6',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  statLabel: {
    flex: 1,
    fontSize: 11,
    color: '#8a7d6e',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  dcLabel: {
    fontSize: 12,
    color: '#6a5e50',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },

  // Choice text
  choiceText: {
    fontSize: 13,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 19,
  },

  // Dice face
  diceArea: {
    marginBottom: 20,
  },
  diceFace: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(155,89,182,0.06)',
    overflow: 'hidden',
  },
  diceGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.12,
    alignSelf: 'center',
  },
  diceNumber: {
    fontSize: 44,
    fontFamily: 'Inter_700Bold',
    lineHeight: 52,
  },

  // Breakdown
  breakdown: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  breakdownLine: {
    fontSize: 13,
    color: '#8a7d6e',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  breakdownEmphasis: {
    fontFamily: 'Inter_700Bold',
    color: '#d4c5a9',
  },
  breakdownMuted: {
    color: '#5a5060',
    fontFamily: 'Inter_600SemiBold',
  },
  outcomeBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeText: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },
  statInfo: {
    fontSize: 11,
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },

  // Luck reroll
  rerollBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(241,196,15,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(241,196,15,0.4)',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  rerollText: {
    fontSize: 11,
    color: '#f1c40f',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
  },
  rerollSub: {
    fontSize: 10,
    color: '#8a7060',
    fontFamily: 'Inter_400Regular',
  },
  rerollUsedText: {
    fontSize: 11,
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },

  // Continue
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: '100%',
    justifyContent: 'center',
  },
  continueBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  continueBtnText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },

  // Rolling indicator
  rollingText: {
    fontSize: 12,
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
