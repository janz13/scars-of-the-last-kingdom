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
const COMPANION_OPTIONS: { id: CompanionChoice; name: string; description: string; color: string }[] = [
  {
    id: 'mira',
    name: 'Mira',
    description: 'The street medic. She\'s practical, guarded, and knows more than she says. Starting with her means higher initial trust but fewer combat advantages.',
    color: '#9b59b6',
  },
  {
    id: 'cain',
    name: 'Cain',
    description: 'The ex-Saints soldier. He knows every checkpoint and every threat in the tunnels. High risk, high tactical value.',
    color: '#e67e22',
  },
  {
    id: 'none',
    name: 'Alone',
    description: 'No companion. You trust no one, and no one slows you down. Some paths only open to those who walk them alone.',
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

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const animateStep = (nextStep: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
    setStep(nextStep);
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
  const selectedBg = BACKGROUNDS.find((b) => b.id === background);

  return (
    <LinearGradient colors={['#04020a', '#0a0614', '#04020a']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Pressable onPress={() => step === 0 ? setScreen('mainMenu') : animateStep(step - 1)} style={styles.backBtn}>
          <Feather name="chevron-left" size={20} color="#8a7d6e" />
        </Pressable>
        <View style={styles.progressContainer}>
          {STEPS.map((s, i) => (
            <View key={i} style={[styles.progressDot, i <= step && styles.progressDotActive, i === step && styles.progressDotCurrent]} />
          ))}
        </View>
        <Text style={styles.stepLabel}>{STEPS[step]}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="auto"
      >
        <Animated.View style={[{ opacity: fadeAnim }, styles.content, { paddingBottom: botPad + 20 }]}>
          {/* STEP 0: NAME */}
          {step === 0 && (
            <View>
              <Text style={styles.stepTitle}>Who Are You?</Text>
              <Text style={styles.stepDesc}>The tunnels don\'t care about your old name. But you do. Give yourself one worth surviving for.</Text>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name..."
                placeholderTextColor="#3a3040"
                maxLength={24}
                autoFocus
              />
              {name.trim().length > 0 && name.trim().length < 2 && (
                <Text style={styles.inputHint}>At least 2 characters</Text>
              )}
            </View>
          )}

          {/* STEP 1: BACKGROUND */}
          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Your Past</Text>
              <Text style={styles.stepDesc}>Where you came from shapes how you see the dark. Each background changes your starting stats and faction standing.</Text>
              <View style={styles.optionList}>
                {BACKGROUNDS.map((bg) => (
                  <Pressable
                    key={bg.id}
                    style={[styles.optionCard, background === bg.id && styles.optionCardSelected]}
                    onPress={() => setBackground(bg.id)}
                  >
                    <View style={styles.optionCardTop}>
                      <Text style={[styles.optionName, background === bg.id && styles.optionNameSelected]}>{bg.name}</Text>
                      {background === bg.id && <Feather name="check" size={14} color="#9b59b6" />}
                    </View>
                    <Text style={styles.optionDesc}>{bg.description}</Text>
                    <Text style={styles.optionBonus}>{bg.bonus}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* STEP 2: CLASS */}
          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Your Class</Text>
              <Text style={styles.stepDesc}>How you survive defines what the mark does to you. Your class determines starting stats and available options.</Text>
              <View style={styles.optionList}>
                {CLASSES.map((cls) => {
                  const stats = cls.statBase;
                  return (
                    <Pressable
                      key={cls.id}
                      style={[styles.optionCard, characterClass === cls.id && styles.optionCardSelected]}
                      onPress={() => setCharacterClass(cls.id)}
                    >
                      <View style={styles.optionCardTop}>
                        <Text style={[styles.optionName, characterClass === cls.id && styles.optionNameSelected]}>
                          {cls.name}
                        </Text>
                        {characterClass === cls.id && <Feather name="check" size={14} color="#9b59b6" />}
                      </View>
                      <Text style={styles.optionDesc}>{cls.description}</Text>
                      <Text style={styles.optionBonus}>{cls.playstyle}</Text>
                      {characterClass === cls.id && (
                        <View style={styles.statPreview}>
                          <StatBadge label="HP" value={stats.maxHealth ?? 80} color="#e74c3c" />
                          <StatBadge label="STR" value={stats.strength ?? 5} color="#c0392b" />
                          <StatBadge label="INT" value={stats.intelligence ?? 5} color="#3498db" />
                          <StatBadge label="AGI" value={stats.agility ?? 5} color="#2ecc71" />
                          <StatBadge label="CHA" value={stats.charisma ?? 5} color="#f1c40f" />
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

          {/* STEP 3: PERSONALITY */}
          {step === 3 && (
            <View>
              <Text style={styles.stepTitle}>Your Personality</Text>
              <Text style={styles.stepDesc}>How you think shapes how you act. Your trait provides passive bonuses and occasional unique dialogue.</Text>
              <View style={styles.optionList}>
                {PERSONALITY_TRAITS.map((t) => (
                  <Pressable
                    key={t.id}
                    style={[styles.optionCard, trait === t.id && styles.optionCardSelected]}
                    onPress={() => setTrait(t.id)}
                  >
                    <View style={styles.optionCardTop}>
                      <Text style={[styles.optionName, trait === t.id && styles.optionNameSelected]}>{t.name}</Text>
                      {trait === t.id && <Feather name="check" size={14} color="#9b59b6" />}
                    </View>
                    <Text style={styles.optionDesc}>{t.description}</Text>
                    <Text style={styles.optionBonus}>{t.effect}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* STEP 4: COMPANION */}
          {step === 4 && (
            <View>
              <Text style={styles.stepTitle}>Starting Companion</Text>
              <Text style={styles.stepDesc}>You can encounter both companions regardless of choice, but your starting companion begins with higher trust. Choosing none unlocks unique solo paths.</Text>
              <View style={styles.optionList}>
                {COMPANION_OPTIONS.map((c) => (
                  <Pressable
                    key={c.id}
                    style={[styles.optionCard, companion === c.id && styles.optionCardSelected, companion === c.id && { borderColor: c.color + '88' }]}
                    onPress={() => setCompanion(c.id)}
                  >
                    <View style={styles.optionCardTop}>
                      <Text style={[styles.optionName, companion === c.id && { color: c.color }]}>{c.name}</Text>
                      {companion === c.id && <Feather name="check" size={14} color={c.color} />}
                    </View>
                    <Text style={styles.optionDesc}>{c.description}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* STEP 5: SUMMARY */}
          {step === 5 && (
            <View>
              <Text style={styles.stepTitle}>Ready to Begin</Text>
              <Text style={styles.stepDesc}>The metro is waiting. The mark is pulsing. This is who you are.</Text>

              <View style={styles.summaryCard}>
                <SummaryRow label="NAME" value={name} color="#d4c5a9" />
                <SummaryRow label="BACKGROUND" value={BACKGROUNDS.find(b => b.id === background)?.name ?? ''} color="#8a7d6e" />
                <SummaryRow label="CLASS" value={CLASSES.find(c => c.id === characterClass)?.name ?? ''} color="#9b59b6" />
                <SummaryRow label="PERSONALITY" value={PERSONALITY_TRAITS.find(t => t.id === trait)?.name ?? ''} color="#e67e22" />
                <SummaryRow label="COMPANION" value={COMPANION_OPTIONS.find(c => c.id === companion)?.name ?? ''} color="#2ecc71" />
              </View>

              <Pressable style={styles.beginBtn} onPress={handleBegin}>
                <Text style={styles.beginBtnText}>ENTER THE STATION</Text>
                <Feather name="arrow-right" size={16} color="#d4c5a9" />
              </Pressable>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Next Button */}
      {step < 5 && (
        <View style={[styles.nextBtnContainer, { paddingBottom: botPad + 10 }]}>
          <Pressable
            style={[styles.nextBtn, !canAdvance() && styles.nextBtnDisabled]}
            onPress={canAdvance() ? () => animateStep(step + 1) : undefined}
          >
            <Text style={[styles.nextBtnText, !canAdvance() && { color: '#3a3040' }]}>
              {step === 4 ? 'REVIEW & BEGIN' : 'CONTINUE'}
            </Text>
            <Feather name="chevron-right" size={16} color={canAdvance() ? '#d4c5a9' : '#3a3040'} />
          </Pressable>
        </View>
      )}
    </LinearGradient>
  );
}

function StatBadge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={[statStyles.badge, { borderColor: color + '44' }]}>
      <Text style={[statStyles.label, { color }]}>{label}</Text>
      <Text style={[statStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    alignItems: 'center',
    minWidth: 44,
  },
  label: { fontSize: 9, fontFamily: 'Inter_600SemiBold', letterSpacing: 1 },
  value: { fontSize: 14, fontFamily: 'Inter_700Bold' },
});

function SummaryRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={sumStyles.row}>
      <Text style={sumStyles.label}>{label}</Text>
      <Text style={[sumStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const sumStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a28',
  },
  label: { fontSize: 10, letterSpacing: 2, color: '#4a4050', fontFamily: 'Inter_600SemiBold' },
  value: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a28',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backBtn: { padding: 4 },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2a2a3a',
  },
  progressDotActive: { backgroundColor: '#4a3060' },
  progressDotCurrent: { backgroundColor: '#9b59b6', width: 14 },
  stepLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#6a5e50',
    fontFamily: 'Inter_600SemiBold',
    width: 70,
    textAlign: 'right',
  },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { padding: 20 },
  stepTitle: {
    fontSize: 22,
    color: '#d4c5a9',
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 13,
    color: '#6a5e50',
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  nameInput: {
    backgroundColor: '#12101a',
    borderWidth: 1,
    borderColor: '#2a2a3a',
    borderRadius: 4,
    padding: 16,
    color: '#d4c5a9',
    fontSize: 20,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1,
  },
  inputHint: {
    fontSize: 11,
    color: '#4a3060',
    marginTop: 6,
    fontFamily: 'Inter_400Regular',
  },
  optionList: { gap: 10 },
  optionCard: {
    backgroundColor: '#12101a',
    borderWidth: 1,
    borderColor: '#1a1a28',
    borderRadius: 4,
    padding: 14,
  },
  optionCardSelected: {
    borderColor: '#9b59b688',
    backgroundColor: '#180e28',
  },
  optionCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  optionName: {
    fontSize: 15,
    color: '#b8a99a',
    fontFamily: 'Inter_600SemiBold',
  },
  optionNameSelected: { color: '#d4c5a9' },
  optionDesc: {
    fontSize: 12,
    color: '#6a5e50',
    lineHeight: 17,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  optionBonus: {
    fontSize: 11,
    color: '#9b59b6',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 4,
  },
  statPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  summaryCard: {
    backgroundColor: '#12101a',
    borderWidth: 1,
    borderColor: '#2a2a3a',
    borderRadius: 4,
    padding: 16,
    marginBottom: 24,
  },
  beginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#1a1028',
    borderWidth: 1,
    borderColor: '#9b59b6',
    borderRadius: 4,
    padding: 18,
  },
  beginBtnText: {
    fontSize: 13,
    letterSpacing: 3,
    color: '#d4c5a9',
    fontFamily: 'Inter_600SemiBold',
  },
  nextBtnContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1a1a28',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1a1028',
    borderWidth: 1,
    borderColor: '#9b59b6',
    borderRadius: 4,
    padding: 16,
  },
  nextBtnDisabled: {
    borderColor: '#2a2a3a',
    backgroundColor: '#0f0f18',
  },
  nextBtnText: {
    fontSize: 12,
    letterSpacing: 3,
    color: '#d4c5a9',
    fontFamily: 'Inter_600SemiBold',
  },
});
