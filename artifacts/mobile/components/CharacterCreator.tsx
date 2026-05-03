import React, { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import {
  BACKGROUNDS,
  CLASSES,
  PERSONALITY_TRAITS,
} from '../data/characterOptions';
import type { BackgroundId, Character, ClassId, CompanionChoice, PersonalityTrait } from '../data/types';

const STEPS = ['Name', 'Background', 'Class', 'Personality', 'Companion', 'Begin'];

const COMPANION_OPTIONS: { id: CompanionChoice; name: string; description: string; color: string; role: string }[] = [
  {
    id: 'mira',
    name: 'Mira',
    role: 'Street Medic',
    description: 'Practical, guarded, knows more than she says. Starting with her means higher initial trust but fewer combat advantages.',
    color: '#9b59b6',
  },
  {
    id: 'cain',
    name: 'Cain',
    role: 'Ex-Saints Soldier',
    description: 'Knows every checkpoint and every threat in the tunnels. High risk, high tactical value.',
    color: '#e67e22',
  },
  {
    id: 'none',
    name: 'Alone',
    role: 'No Companion',
    description: 'You trust no one, and no one slows you down. Some paths only open to those who walk them alone.',
    color: '#6a5e50',
  },
];

export default function CharacterCreator() {
  const { startNewGame, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [background, setBackground] = useState<BackgroundId>('wasteland_orphan');
  const [characterClass, setCharacterClass] = useState<ClassId>('blade_survivor');
  const [trait, setTrait] = useState<PersonalityTrait>('pragmatic');
  const [companion, setCompanion] = useState<CompanionChoice>('none');

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const animateStep = (nextStep: number, direction: number = 1) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 140, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: direction * -20, duration: 140, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(direction * 20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    });
  };

  const canAdvance = () => {
    if (step === 0) return name.trim().length >= 2;
    return true;
  };

  const handleBegin = () => {
    const character: Character = {
      name: name.trim(),
      background,
      characterClass,
      personalityTrait: trait,
      startingCompanion: companion,
    };
    startNewGame(character);
  };

  const selectedClass = CLASSES.find((c) => c.id === characterClass);

  return (
    <LinearGradient colors={['#030108', '#07040f', '#030108']} style={styles.container}>

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Pressable
          onPress={() => step === 0 ? setScreen('mainMenu') : animateStep(step - 1, -1)}
          style={styles.backBtn}
        >
          <Feather name="chevron-left" size={20} color="#6a5e70" />
        </Pressable>

        {/* Progress dots */}
        <View style={styles.progressDots}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < step && styles.dotPast,
                i === step && styles.dotCurrent,
              ]}
            />
          ))}
        </View>

        <Text style={styles.stepLabel}>{STEPS[step].toUpperCase()}</Text>
      </View>

      <View style={styles.headerRule} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: botPad + 20 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="auto"
      >
        <Animated.View style={[{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }, styles.stepContent]}>

          {/* ── Step 0: NAME ───────────────────────────────────────────────── */}
          {step === 0 && (
            <View>
              <Text style={styles.stepTitle}>Who Are You?</Text>
              <Text style={styles.stepDesc}>
                The tunnels don't care about your old name. But you do. Give yourself one worth surviving for.
              </Text>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name..."
                placeholderTextColor="#3a3048"
                maxLength={24}
                autoFocus
              />
              {name.trim().length > 0 && name.trim().length < 2 && (
                <Text style={styles.inputHint}>At least 2 characters required</Text>
              )}
            </View>
          )}

          {/* ── Step 1: BACKGROUND ─────────────────────────────────────────── */}
          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Your Past</Text>
              <Text style={styles.stepDesc}>
                Where you came from shapes how you see the dark. Each background changes your starting stats and faction standing.
              </Text>
              <View style={styles.optionList}>
                {BACKGROUNDS.map((bg) => {
                  const sel = background === bg.id;
                  return (
                    <Pressable key={bg.id} style={[styles.optionCard, sel && styles.optionCardSelected]} onPress={() => setBackground(bg.id)}>
                      {sel && <View style={styles.optionAccent} />}
                      <View style={styles.optionCardTop}>
                        <Text style={[styles.optionName, sel && styles.optionNameSelected]}>{bg.name}</Text>
                        {sel && <Feather name="check" size={14} color="#9b59b6" />}
                      </View>
                      <Text style={styles.optionDesc}>{bg.description}</Text>
                      <Text style={styles.optionBonus}>{bg.bonus}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* ── Step 2: CLASS ──────────────────────────────────────────────── */}
          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Your Class</Text>
              <Text style={styles.stepDesc}>
                How you survive defines what the mark does to you. Your class determines starting stats and available options.
              </Text>
              <View style={styles.optionList}>
                {CLASSES.map((cls) => {
                  const sel = characterClass === cls.id;
                  const stats = cls.statBase;
                  return (
                    <Pressable key={cls.id} style={[styles.optionCard, sel && styles.optionCardSelected]} onPress={() => setCharacterClass(cls.id)}>
                      {sel && <View style={styles.optionAccent} />}
                      <View style={styles.optionCardTop}>
                        <Text style={[styles.optionName, sel && styles.optionNameSelected]}>{cls.name}</Text>
                        {sel && <Feather name="check" size={14} color="#9b59b6" />}
                      </View>
                      <Text style={styles.optionDesc}>{cls.description}</Text>
                      <Text style={styles.optionBonus}>{cls.playstyle}</Text>
                      {sel && (
                        <View style={styles.statPreview}>
                          <StatBadge label="HP" value={stats.maxHealth ?? 80} color="#e74c3c" />
                          <StatBadge label="STR" value={stats.strength ?? 5} color="#c0392b" />
                          <StatBadge label="INT" value={stats.intelligence ?? 5} color="#3498db" />
                          <StatBadge label="AGI" value={stats.agility ?? 5} color="#2ecc71" />
                          <StatBadge label="CHA" value={stats.charisma ?? 5} color="#c9a84c" />
                          <StatBadge label="LCK" value={stats.luck ?? 5} color="#e67e22" />
                          {(stats.corruption ?? 0) > 0 && (
                            <StatBadge label="CRPT" value={stats.corruption ?? 0} color="#9b59b6" />
                          )}
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* ── Step 3: PERSONALITY ────────────────────────────────────────── */}
          {step === 3 && (
            <View>
              <Text style={styles.stepTitle}>Your Personality</Text>
              <Text style={styles.stepDesc}>
                How you think shapes how you act. Your trait provides passive bonuses and occasional unique dialogue.
              </Text>
              <View style={styles.optionList}>
                {PERSONALITY_TRAITS.map((t) => {
                  const sel = trait === t.id;
                  return (
                    <Pressable key={t.id} style={[styles.optionCard, sel && styles.optionCardSelected]} onPress={() => setTrait(t.id)}>
                      {sel && <View style={styles.optionAccent} />}
                      <View style={styles.optionCardTop}>
                        <Text style={[styles.optionName, sel && styles.optionNameSelected]}>{t.name}</Text>
                        {sel && <Feather name="check" size={14} color="#9b59b6" />}
                      </View>
                      <Text style={styles.optionDesc}>{t.description}</Text>
                      <Text style={styles.optionBonus}>{t.effect}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* ── Step 4: COMPANION ──────────────────────────────────────────── */}
          {step === 4 && (
            <View>
              <Text style={styles.stepTitle}>Starting Companion</Text>
              <Text style={styles.stepDesc}>
                You can encounter both companions regardless, but your starting companion begins with higher trust. Choosing none unlocks solo paths.
              </Text>
              <View style={styles.optionList}>
                {COMPANION_OPTIONS.map((c) => {
                  const sel = companion === c.id;
                  return (
                    <Pressable
                      key={c.id}
                      style={[styles.optionCard, sel && styles.optionCardSelected, sel && { borderColor: `${c.color}40` }]}
                      onPress={() => setCompanion(c.id)}
                    >
                      {sel && <View style={[styles.optionAccent, { backgroundColor: c.color }]} />}
                      <View style={styles.optionCardTop}>
                        <View style={styles.companionNameRow}>
                          <Text style={[styles.optionName, sel && { color: c.color }]}>{c.name}</Text>
                          <Text style={[styles.companionRole, { color: `${c.color}66` }]}>{c.role}</Text>
                        </View>
                        {sel && <Feather name="check" size={14} color={c.color} />}
                      </View>
                      <Text style={styles.optionDesc}>{c.description}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* ── Step 5: SUMMARY ────────────────────────────────────────────── */}
          {step === 5 && (
            <View>
              <Text style={styles.stepTitle}>Ready to Begin</Text>
              <Text style={styles.stepDesc}>The metro is waiting. The mark is pulsing. This is who you are.</Text>

              <View style={styles.summaryCard}>
                <SummaryRow label="NAME" value={name} color="#ede0c4" />
                <SummaryRow label="BACKGROUND" value={BACKGROUNDS.find(b => b.id === background)?.name ?? ''} color="#8a7d6e" />
                <SummaryRow label="CLASS" value={CLASSES.find(c => c.id === characterClass)?.name ?? ''} color="#9b59b6" />
                <SummaryRow label="PERSONALITY" value={PERSONALITY_TRAITS.find(t => t.id === trait)?.name ?? ''} color="#e67e22" />
                <SummaryRow label="COMPANION" value={COMPANION_OPTIONS.find(c => c.id === companion)?.name ?? ''} color="#2ecc71" last />
              </View>

              <Pressable style={styles.beginBtn} onPress={handleBegin}>
                <View style={styles.beginBtnInner}>
                  <Text style={styles.beginBtnText}>ENTER THE STATION</Text>
                  <Feather name="arrow-right" size={16} color="#ede0c4" />
                </View>
              </Pressable>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Next button */}
      {step < 5 && (
        <View style={[styles.nextContainer, { paddingBottom: botPad + 10 }]}>
          <Pressable
            style={[styles.nextBtn, !canAdvance() && styles.nextBtnDisabled]}
            onPress={canAdvance() ? () => animateStep(step + 1) : undefined}
          >
            <Text style={[styles.nextBtnText, !canAdvance() && styles.nextBtnTextDisabled]}>
              {step === 4 ? 'REVIEW & BEGIN' : 'CONTINUE'}
            </Text>
            <Feather name="chevron-right" size={16} color={canAdvance() ? '#9b59b6' : '#2a2838'} />
          </Pressable>
        </View>
      )}
    </LinearGradient>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBadge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={[statStyles.badge, { borderColor: `${color}30` }]}>
      <Text style={[statStyles.label, { color: `${color}88` }]}>{label}</Text>
      <Text style={[statStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 46,
    backgroundColor: 'rgba(8,5,18,0.6)',
  },
  label: { fontSize: 9, fontFamily: 'Inter_600SemiBold', letterSpacing: 1 },
  value: { fontSize: 16, fontFamily: 'Inter_700Bold', marginTop: 2 },
});

function SummaryRow({ label, value, color, last }: { label: string; value: string; color: string; last?: boolean }) {
  return (
    <View style={[sumStyles.row, last && sumStyles.rowLast]}>
      <Text style={sumStyles.label}>{label}</Text>
      <Text style={[sumStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const sumStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42,38,58,0.6)',
  },
  rowLast: { borderBottomWidth: 0 },
  label: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#3a3450',
    fontFamily: 'Inter_600SemiBold',
  },
  value: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backBtn: { padding: 4 },
  progressDots: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1e1828',
  },
  dotPast: {
    backgroundColor: '#4a3860',
    width: 6,
  },
  dotCurrent: {
    backgroundColor: '#9b59b6',
    width: 18,
    borderRadius: 3,
  },
  stepLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#5a5068',
    fontFamily: 'Inter_600SemiBold',
    width: 72,
    textAlign: 'right',
  },
  headerRule: {
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.1)',
    marginHorizontal: 20,
    marginBottom: 4,
  },

  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20 },
  stepContent: { paddingTop: 24 },

  stepTitle: {
    fontSize: 26,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  stepDesc: {
    fontSize: 13,
    color: '#5a5068',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    marginBottom: 26,
    fontStyle: 'italic',
  },

  nameInput: {
    backgroundColor: 'rgba(12,8,22,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(80,55,110,0.5)',
    borderRadius: 4,
    padding: 18,
    color: '#ede0c4',
    fontSize: 22,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1,
  },
  inputHint: {
    fontSize: 11,
    color: '#5a3860',
    marginTop: 8,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },

  optionList: { gap: 10 },
  optionCard: {
    backgroundColor: 'rgba(12,8,22,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(36,32,50,0.7)',
    borderRadius: 4,
    padding: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  optionCardSelected: {
    borderColor: 'rgba(155,89,182,0.45)',
    backgroundColor: 'rgba(18,10,32,0.95)',
  },
  optionAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#9b59b6',
    opacity: 0.8,
  },
  optionCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  optionName: {
    fontSize: 15,
    color: '#7a6e80',
    fontFamily: 'Inter_600SemiBold',
  },
  optionNameSelected: {
    color: '#ede0c4',
  },
  optionDesc: {
    fontSize: 12,
    color: '#5a5068',
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  optionBonus: {
    fontSize: 11,
    color: '#7b3fa8',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 4,
  },
  companionNameRow: {
    gap: 6,
  },
  companionRole: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  statPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },

  summaryCard: {
    backgroundColor: 'rgba(12,8,22,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(42,38,58,0.7)',
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 4,
    marginBottom: 24,
  },

  beginBtn: {
    backgroundColor: 'rgba(18,10,32,0.95)',
    borderWidth: 1,
    borderColor: '#9b59b6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  beginBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  beginBtnText: {
    fontSize: 13,
    letterSpacing: 3,
    color: '#ede0c4',
    fontFamily: 'Inter_600SemiBold',
  },

  nextContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(42,38,58,0.5)',
    backgroundColor: 'rgba(4,2,10,0.6)',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(18,10,32,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(155,89,182,0.6)',
    borderRadius: 4,
    padding: 17,
  },
  nextBtnDisabled: {
    borderColor: 'rgba(42,38,58,0.5)',
    backgroundColor: 'rgba(8,6,14,0.5)',
  },
  nextBtnText: {
    fontSize: 12,
    letterSpacing: 3,
    color: '#c4b0d8',
    fontFamily: 'Inter_600SemiBold',
  },
  nextBtnTextDisabled: {
    color: '#2a2838',
  },
});
