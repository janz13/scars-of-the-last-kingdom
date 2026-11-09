import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
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
import { MOTION_SPRINGS } from '../constants/motion';
import { sound } from '../logic/audioEngine';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  diceCheck: DiceCheck;
  choiceText: string;
  state: GameState;
  onCommit: (result: DiceResult) => void;
}

type Phase = 'rolling' | 'revealed';

// ─── 3D Icosahedron Geometry (24-frame Pixel d20) ─────────────────────────────

const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTICES: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const V_NORM = Math.sqrt(1 + PHI * PHI);
const ICO_VERTICES: [number, number, number][] = RAW_VERTICES.map(
  ([x, y, z]) => [x / V_NORM, y / V_NORM, z / V_NORM]
);

const ICO_FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

interface ShadedPolygon {
  points: [number, number][];
  brightness: number;
  center: [number, number];
  nz: number;
}

function computeIcoFaces(frameIndex: number, isLanded: boolean): ShadedPolygon[] {
  // At landed, orient so front face faces directly forward
  const pitch = isLanded ? 0.35 : frameIndex * 0.44;
  const yaw = isLanded ? 0.0 : frameIndex * 0.63;
  const roll = isLanded ? 0.0 : frameIndex * 0.31;

  const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
  const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
  const cosR = Math.cos(roll), sinR = Math.sin(roll);

  // Rotate vertices in 3D: R = Rz * Ry * Rx
  const rotated = ICO_VERTICES.map(([x, y, z]) => {
    const y1 = y * cosP - z * sinP;
    const z1 = y * sinP + z * cosP;
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;
    const x3 = x2 * cosR - y1 * sinR;
    const y3 = x2 * sinR + y1 * cosR;
    return [x3, y3, z2] as [number, number, number];
  });

  const polygons: ShadedPolygon[] = [];
  const light = [-0.35, -0.55, 0.75]; // directional top-left key light

  for (const [iA, iB, iC] of ICO_FACES) {
    const vA = rotated[iA];
    const vB = rotated[iB];
    const vC = rotated[iC];

    // Compute surface normal
    const ab = [vB[0] - vA[0], vB[1] - vA[1], vB[2] - vA[2]];
    const ac = [vC[0] - vA[0], vC[1] - vA[1], vC[2] - vA[2]];
    const nx = ab[1] * ac[2] - ab[2] * ac[1];
    const ny = ab[2] * ac[0] - ab[0] * ac[2];
    const nz = ab[0] * ac[1] - ab[1] * ac[0];

    // Back-face culling: only keep faces pointing towards camera
    if (nz > 0) {
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const dot = (nx * light[0] + ny * light[1] + nz * light[2]) / nLen;
      const brightness = Math.max(0.28, Math.min(1.0, 0.45 + 0.55 * dot));

      // Project onto 48×48 art-pixel canvas (center at 24, 24, radius 21)
      const pA: [number, number] = [Math.round(24 + vA[0] * 21), Math.round(24 + vA[1] * 21)];
      const pB: [number, number] = [Math.round(24 + vB[0] * 21), Math.round(24 + vB[1] * 21)];
      const pC: [number, number] = [Math.round(24 + vC[0] * 21), Math.round(24 + vC[1] * 21)];

      const center: [number, number] = [
        Math.round((pA[0] + pB[0] + pC[0]) / 3),
        Math.round((pA[1] + pB[1] + pC[1]) / 3),
      ];

      polygons.push({
        points: [pA, pB, pC],
        brightness,
        center,
        nz,
      });
    }
  }

  // Sort back-to-front by nz
  return polygons.sort((a, b) => a.nz - b.nz);
}

function getFacetFill(brightness: number, outcome: string, isLanded: boolean): string {
  if (isLanded && outcome === 'criticalSuccess') {
    // Brilliant gold palette for Nat 20
    const r = Math.round(241 * brightness);
    const g = Math.round(196 * brightness);
    const b = Math.round(15 * brightness);
    return `rgb(${r},${g},${b})`;
  }
  if (isLanded && outcome === 'criticalFailure') {
    // Desaturated cold stone slate for Nat 1
    const v = Math.round(90 * brightness);
    return `rgb(${v},${v + 4},${v + 8})`;
  }
  // Standard arcane purple palette
  const r = Math.round(155 * brightness);
  const g = Math.round(89 * brightness);
  const b = Math.round(182 * brightness);
  return `rgb(${r},${g},${b})`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DiceRollOverlay({ diceCheck, choiceText, state, onCommit }: Props) {
  const skip = state.settings.skipDiceAnimation;
  const sides = diceSides(diceCheck.diceType);
  const reducedMotion = useReducedMotion();

  const [result, setResult] = useState<DiceResult>(() =>
    resolveDiceCheck(state, diceCheck),
  );
  const [displayNum, setDisplayNum] = useState(skip ? result.roll : 1);
  const [phase, setPhase] = useState<Phase>(skip ? 'revealed' : 'rolling');
  const [currentTick, setCurrentTick] = useState(skip ? 24 : 1);
  const [rerollUsed, setRerollUsed] = useState(false);
  const [rerolling, setRerolling] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scaleAnim = useSharedValue(1);
  const opacityAnim = useSharedValue(0);
  const shakeX = useSharedValue(0);
  const backdropShakeX = useSharedValue(0);
  const backdropShakeY = useSharedValue(0);
  const goldBurstAnim = useSharedValue(skip && result.outcome === 'criticalSuccess' ? 1 : 0);
  const crackAnim = useSharedValue(skip && result.outcome === 'criticalFailure' ? 1 : 0);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const luckAvailable = canUseLuckReroll(state) && !rerollUsed;
  const isCritSuccess = phase === 'revealed' && result.outcome === 'criticalSuccess';
  const isCritFailure = phase === 'revealed' && result.outcome === 'criticalFailure';

  // ── 24-Frame Tumbling Rolling Sequence ─────────────────────────────────────
  function startRollingAnimation(targetResult: DiceResult, onDone: () => void) {
    let ticks = 0;
    const maxTicks = 24;

    const tick = () => {
      ticks++;
      setCurrentTick(ticks);

      if (ticks >= maxTicks) {
        // Tick 24: LANDING!
        setDisplayNum(targetResult.roll);

        // 1-frame screen shake on the backdrop container (approx 16ms)
        if (!reducedMotion) {
          backdropShakeX.value = withSequence(
            withTiming(-8, { duration: 16 }),
            withTiming(8, { duration: 16 }),
            withTiming(0, { duration: 16 })
          );
          backdropShakeY.value = withSequence(
            withTiming(5, { duration: 16 }),
            withTiming(-5, { duration: 16 }),
            withTiming(0, { duration: 16 })
          );
        }

        // Critical success / failure SFX and stingers on landing
        if (targetResult.outcome === 'criticalSuccess') {
          sound.playStinger('crit_success');
          sound.playSFX('diceCrit');
          goldBurstAnim.value = withTiming(1, { duration: 600 });
        } else if (targetResult.outcome === 'criticalFailure') {
          sound.playSFX('diceFail');
          sound.playStinger('crit_failure');
          crackAnim.value = withTiming(1, { duration: 350 });
        } else if (targetResult.outcome === 'success') {
          sound.playSFX('diceSuccess');
        } else {
          sound.playSFX('diceFail');
        }

        tickRef.current = setTimeout(onDone, 320);
      } else {
        const delay = ticks < 10 ? 45 : ticks < 18 ? 75 : 115;
        setDisplayNum(Math.floor(Math.random() * sides) + 1);
        tickRef.current = setTimeout(tick, delay);
      }
    };

    tickRef.current = setTimeout(tick, 150);
  }

  useEffect(() => {
    if (skip) {
      opacityAnim.value = 1;
      return;
    }

    opacityAnim.value = withTiming(1, { duration: 200 });

    startRollingAnimation(result, () => {
      setPhase('revealed');
      scaleAnim.value = withSequence(
        withTiming(1.25, { duration: 120 }),
        withSpring(1, MOTION_SPRINGS.stiff)
      );
      shakeX.value = withSequence(
        withTiming(-3, { duration: 30 }),
        withTiming(3, { duration: 30 }),
        withTiming(0, { duration: 30 })
      );
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
        setCurrentTick(24);
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
    goldBurstAnim.value = 0;
    crackAnim.value = 0;

    const newRoll = rollDie(sides);
    const newResult = resolveDiceCheck(state, diceCheck, newRoll, true);
    setResult(newResult);

    if (skip) {
      setDisplayNum(newResult.roll);
      setCurrentTick(24);
      setPhase('revealed');
      setRerolling(false);
      return;
    }

    startRollingAnimation(newResult, () => {
      setPhase('revealed');
      setRerolling(false);
      scaleAnim.value = withSequence(
        withTiming(1.25, { duration: 120 }),
        withSpring(1, MOTION_SPRINGS.stiff)
      );
    });
  }

  // ── Canvas Procedural Rendering (24-Frame Tumbling Pixel d20) ──────────────
  useEffect(() => {
    if (Platform.OS !== 'web' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isLanded = phase === 'revealed' || currentTick >= 24;
    const frameIndex = Math.min(23, Math.max(0, currentTick - 1));

    // Clear 48×48 native art buffer
    ctx.clearRect(0, 0, 48, 48);
    ctx.imageSmoothingEnabled = false;

    // Compute 3D rotated faces
    const faces = computeIcoFaces(frameIndex, isLanded);

    // Draw shaded triangular faces
    for (const face of faces) {
      ctx.beginPath();
      ctx.moveTo(face.points[0][0], face.points[0][1]);
      ctx.lineTo(face.points[1][0], face.points[1][1]);
      ctx.lineTo(face.points[2][0], face.points[2][1]);
      ctx.closePath();

      ctx.fillStyle = getFacetFill(face.brightness, result.outcome, isLanded);
      ctx.fill();

      // Crisp dark facet borders
      ctx.lineWidth = 1;
      ctx.strokeStyle = isLanded && result.outcome === 'criticalSuccess'
        ? '#523c08'
        : isLanded && result.outcome === 'criticalFailure'
        ? '#181820'
        : '#150a24';
      ctx.stroke();
    }

    // Front-most face: draw number
    const frontFace = faces[faces.length - 1];
    if (frontFace) {
      const numStr = String(displayNum);
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text drop shadow
      ctx.fillStyle = '#08040f';
      ctx.fillText(numStr, frontFace.center[0] + 1, frontFace.center[1] + 1);

      // Text foreground
      ctx.fillStyle = isLanded && result.outcome === 'criticalSuccess'
        ? '#ffffff'
        : isLanded && result.outcome === 'criticalFailure'
        ? '#d0d0d8'
        : '#f5ecd7';
      ctx.fillText(numStr, frontFace.center[0], frontFace.center[1]);
    }

    // Critical failure crack overlay across die face
    if (isLanded && result.outcome === 'criticalFailure') {
      ctx.save();
      // Dark crack line
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#050308';
      ctx.beginPath();
      ctx.moveTo(24, 6);
      ctx.lineTo(21, 15);
      ctx.lineTo(27, 23);
      ctx.lineTo(19, 33);
      ctx.lineTo(24, 42);
      ctx.moveTo(27, 23);
      ctx.lineTo(35, 27);
      ctx.lineTo(41, 25);
      ctx.moveTo(21, 15);
      ctx.lineTo(13, 13);
      ctx.lineTo(7, 17);
      ctx.stroke();

      // White highlighted fracture edges
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(235, 235, 245, 0.85)';
      ctx.beginPath();
      ctx.moveTo(25, 6);
      ctx.lineTo(22, 15);
      ctx.lineTo(28, 23);
      ctx.lineTo(20, 33);
      ctx.lineTo(25, 42);
      ctx.stroke();
      ctx.restore();
    }
  }, [currentTick, displayNum, phase, result.outcome]);

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
    transform: [
      { translateX: Math.round(backdropShakeX.value) },
      { translateY: Math.round(backdropShakeY.value) },
    ],
  }));

  // Tumbling parabolic trajectory across the stage
  const tumbleProgress = phase === 'revealed' ? 1 : Math.min(1, (currentTick - 1) / 23);
  const tumbleX = phase === 'revealed' ? 0 : Math.round(-70 * (1 - tumbleProgress));
  const tumbleY = phase === 'revealed'
    ? 0
    : Math.round(-50 * (1 - tumbleProgress) - 22 * Math.sin(Math.PI * tumbleProgress));
  const tumbleRot = phase === 'revealed' ? 0 : Math.round((24 - currentTick) * 28);

  const diceFaceStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tumbleX + Math.round(shakeX.value) },
      { translateY: tumbleY },
      { rotate: `${tumbleRot}deg` },
      { scale: scaleAnim.value },
    ],
  }));

  const goldBurstStyle = useAnimatedStyle(() => ({
    opacity: goldBurstAnim.value,
    transform: [{ scale: 0.8 + 0.3 * goldBurstAnim.value }],
  }));

  // ── Render ─────────────────────────────────────────────────────────────────
  const color = phase === 'revealed' ? outcomeColor(result.outcome) : '#9b59b6';
  const modSign = result.modifier >= 0 ? '+' : '';
  const label = DICE_STAT_LABELS[diceCheck.stat];
  const fullStat = DICE_STAT_FULL[diceCheck.stat];
  const isSuccess = result.outcome === 'success' || result.outcome === 'criticalSuccess';
  const isCrit = result.outcome === 'criticalSuccess' || result.outcome === 'criticalFailure';

  return (
    <Animated.View style={[styles.backdrop, backdropStyle]}>
      <View
        style={[
          styles.card,
          isCritFailure && styles.cardDesaturated,
          isCritSuccess && styles.cardCritSuccess,
        ]}
      >
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

        {/* ── 24-Frame Tumbling Dice Area ── */}
        <View style={styles.diceArea}>
          {/* Critical success gold palette burst */}
          {isCritSuccess && (
            <Animated.View style={[styles.goldBurstContainer, goldBurstStyle]} pointerEvents="none">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 2 * Math.PI) / 16;
                const dist = 58;
                const px = Math.round(52 + Math.cos(angle) * dist);
                const py = Math.round(52 + Math.sin(angle) * dist);
                const pColor = i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#f1c40f' : '#ffeaa7';
                return (
                  <View
                    key={i}
                    style={{
                      position: 'absolute',
                      left: px,
                      top: py,
                      width: 6,
                      height: 6,
                      backgroundColor: pColor,
                      boxShadow: '0 0 6px #ffd700',
                    } as any}
                  />
                );
              })}
            </Animated.View>
          )}

          <Animated.View style={[styles.diceFaceWrapper, diceFaceStyle]}>
            {Platform.OS === 'web' ? (
              React.createElement('canvas', {
                ref: canvasRef,
                width: 48,
                height: 48,
                style: {
                  width: 96,
                  height: 96,
                  imageRendering: 'pixelated',
                },
              })
            ) : (
              <View style={[styles.diceFace, { borderColor: color }]}>
                {phase === 'revealed' && isSuccess && (
                  <View style={[styles.diceGlow, { backgroundColor: color }]} />
                )}
                <Text style={[styles.diceNumber, { color }]}>{displayNum}</Text>
              </View>
            )}
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
  cardDesaturated: {
    backgroundColor: '#121216',
    borderColor: '#3a3a44',
  },
  cardCritSuccess: {
    borderColor: 'rgba(241,196,15,0.6)',
    backgroundColor: '#14101e',
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

  // Dice face area
  diceArea: {
    marginBottom: 20,
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  goldBurstContainer: {
    position: 'absolute',
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceFaceWrapper: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
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
