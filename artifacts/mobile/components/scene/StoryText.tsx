import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import type { CompanionPair, ProseFont } from '../../data/types';
import { getProseFontFamily } from '../../constants/typography';
import {
  CHARACTER_PORTRAIT_CATALOG,
  resolveSpeakerCharacterId,
  type CharacterId,
  type PortraitExpression,
} from '../../constants/portraits';
import CharacterPortrait from './CharacterPortrait';

export interface CharacterPortraitConfig {
  characterId: CharacterId;
  expression?: PortraitExpression;
  blinking?: boolean;
}

export interface StoryTextProps {
  /** Current chapter name (e.g. "Chapter 1") */
  chapter: string;
  /** Current scene location (e.g. "The Drowned Archive") */
  location: string;
  /** Node header / scene title */
  title: string;
  /** Optional speaking character name */
  speaker?: string;
  /** Streamed narration prose text from typewriter */
  displayedNarration: string;
  /** Streamed dialogue text from typewriter (if present) */
  displayedDialogue?: string;
  /** Whether the node contains dialogue quotes */
  hasDialogue?: boolean;
  /** Whether typewriter animation is currently streaming characters */
  isTyping: boolean;
  /** Callback to immediately flush typewriter to full text */
  onSkipTypewriter?: () => void;
  /** Companion presence indicators (Mira, Cain) */
  companions?: CompanionPair;
  /** Hallucination visual override flag (from state.flags['halluc_active']) */
  isHallucination?: boolean;
  /** Companion event visual override flag (from state.flags['companion_event_active']) */
  isCompanionEvent?: boolean;
  /** Font scale setting ('small' | 'normal' | 'large') */
  fontSize?: 'small' | 'normal' | 'large';
  /** Prose font preference ('inter' | 'pixel') */
  proseFont?: ProseFont;
  /** Explicit portrait configuration override */
  speakerPortrait?: CharacterPortraitConfig;
  /** Reanimated shared values for title entrance */
  titleFade?: SharedValue<number>;
  titleSlide?: SharedValue<number>;
  /** Whether desktop sizing applies */
  isDesktopView?: boolean;
  /** Whether reduced motion is enabled */
  reducedMotion?: boolean;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders inline `*emphasis*` spans with distinct styling while preserving plain text.
 */
function renderFormattedText(raw: string, emphasisColor: string): React.ReactNode {
  if (!raw || !raw.includes('*')) return raw;
  const parts = raw.split(/(\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <Text key={idx} style={{ color: emphasisColor, fontStyle: 'italic' }}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    return part;
  });
}

export default function StoryText({
  chapter,
  location,
  title,
  speaker,
  displayedNarration,
  displayedDialogue,
  hasDialogue = false,
  isTyping,
  onSkipTypewriter,
  companions,
  isHallucination = false,
  isCompanionEvent = false,
  fontSize = 'normal',
  proseFont = 'inter',
  speakerPortrait,
  titleFade,
  titleSlide,
  isDesktopView = false,
  reducedMotion = false,
  style,
}: StoryTextProps) {
  // Font scaling metrics
  const narrationFontSize = fontSize === 'small' ? 14 : fontSize === 'large' ? 19 : 16.5;
  const narrationLineHeight = fontSize === 'small' ? 23 : fontSize === 'large' ? 31 : 28;
  const dialogueFontSize = fontSize === 'small' ? 13 : fontSize === 'large' ? 17 : 15.5;
  const dialogueLineHeight = fontSize === 'small' ? 21 : fontSize === 'large' ? 27 : 25;

  const fontStyle = {
    fontFamily: getProseFontFamily(proseFont, 'regular'),
  };

  const titleAnimStyle = useAnimatedStyle(() => ({
    opacity: titleFade ? titleFade.value : 1,
    transform: [{ translateY: titleSlide ? titleSlide.value : 0 }],
  }));

  const isCainSpeaker = speaker === 'Cain';
  const resolvedCharId = speakerPortrait?.characterId ?? resolveSpeakerCharacterId(speaker);
  const resolvedExpression: PortraitExpression =
    speakerPortrait?.expression ??
    (isHallucination ? 'strained' : isCompanionEvent ? 'resolved' : 'neutral');

  const speakerMeta = resolvedCharId ? CHARACTER_PORTRAIT_CATALOG[resolvedCharId] : null;
  const speakerAccentColor = speakerMeta?.factionColor ?? (isCainSpeaker ? '#e67e22' : '#9b59b6');

  return (
    <Pressable
      onPress={isTyping ? onSkipTypewriter : undefined}
      role="region"
      aria-label="Story Narrative"
      aria-live="polite"
      accessibilityRole={'region' as any}
      accessibilityLabel="Story Narrative"
      style={[
        styles.storySection,
        isDesktopView && styles.desktopStorySection,
        isHallucination && styles.hallucinationSection,
        isCompanionEvent && {
          backgroundColor: isCainSpeaker ? 'rgba(40,20,0,0.28)' : 'rgba(30,0,40,0.22)',
        },
        style,
      ]}
    >
      {/* Breadcrumb: CHAPTER › LOCATION */}
      <Text
        style={[
          styles.breadcrumb,
          isHallucination && styles.hallucinationBreadcrumb,
          isCompanionEvent && {
            color: isCainSpeaker ? 'rgba(230,126,34,0.55)' : 'rgba(155,89,182,0.55)',
            letterSpacing: 3,
          },
        ]}
      >
        {chapter.toUpperCase()}
        {'  ›  '}
        {location.toUpperCase()}
      </Text>

      {/* Animated Node Title */}
      <Animated.View style={titleAnimStyle}>
        <Text
          style={[
            styles.nodeTitle,
            isDesktopView && styles.desktopNodeTitle,
            isHallucination && styles.hallucinationTitle,
            isCompanionEvent && {
              color: isCainSpeaker ? '#f0a050' : '#c39bd3',
              letterSpacing: 0.5,
            },
          ]}
        >
          {title}
        </Text>
      </Animated.View>

      {/* Speaker Header Badge */}
      {speaker ? (
        <View style={styles.speakerBadge}>
          <View style={[styles.speakerLine, { backgroundColor: `${speakerAccentColor}33` }]} />
          <Text style={[styles.speakerText, { color: speakerMeta?.accentColor ?? '#ba7fd4' }]}>
            {speaker}
          </Text>
          <View style={[styles.speakerLine, { backgroundColor: `${speakerAccentColor}33` }]} />
        </View>
      ) : null}

      {/* Narration Body */}
      <Text
        style={[
          styles.narration,
          fontStyle,
          isHallucination && styles.hallucinationNarration,
          { fontSize: narrationFontSize, lineHeight: narrationLineHeight },
        ]}
      >
        {renderFormattedText(displayedNarration, '#ede0c4')}
        {isTyping && !hasDialogue && (
          <Text style={styles.typewriterCursor}> ▍</Text>
        )}
      </Text>

      {/* Dialogue Blockquote + Character Portrait */}
      {hasDialogue && displayedDialogue ? (
        <View
          style={[
            styles.dialogueBox,
            { borderLeftColor: speakerAccentColor },
            isHallucination && styles.hallucinationDialogueBox,
          ]}
        >
          <View style={styles.dialogueRow}>
            {resolvedCharId && (
              <CharacterPortrait
                characterId={resolvedCharId}
                expression={resolvedExpression}
                isTalking={isTyping}
                size={64}
                reducedMotion={reducedMotion}
              />
            )}
            <View style={styles.dialogueTextCol}>
              <Text style={[styles.dialogueOpenQuote, { color: `${speakerAccentColor}44` }]}>
                {'\u201C'}
              </Text>
              <Text
                style={[
                  styles.dialogue,
                  fontStyle,
                  speakerMeta ? { color: '#f0e2c8' } : undefined,
                  isHallucination && styles.hallucinationDialogue,
                  { fontSize: dialogueFontSize, lineHeight: dialogueLineHeight },
                ]}
              >
                {renderFormattedText(displayedDialogue, speakerMeta?.accentColor ?? '#f5d799')}
                {isTyping && <Text style={styles.typewriterCursor}> ▍</Text>}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      {/* Active Companion Tags */}
      {!isHallucination && !isCompanionEvent && companions && (
        (companions.mira?.present && companions.mira?.alive) ||
        (companions.cain?.present && companions.cain?.alive)
      ) && (
        <View style={styles.companionStrip}>
          {companions.mira?.present && companions.mira?.alive && (
            <View style={[styles.companionTag, { borderColor: 'rgba(155,89,182,0.25)' }]}>
              <View style={[styles.companionDot, { backgroundColor: '#9b59b6' }]} />
              <Text style={styles.companionName}>MIRA</Text>
            </View>
          )}
          {companions.cain?.present && companions.cain?.alive && (
            <View style={[styles.companionTag, { borderColor: 'rgba(230,126,34,0.25)' }]}>
              <View style={[styles.companionDot, { backgroundColor: '#e67e22' }]} />
              <Text style={styles.companionName}>CAIN</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  storySection: {
    paddingLeft: 24,
    paddingRight: 28,
    paddingTop: 28,
    paddingBottom: 22,
  },
  desktopStorySection: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.22)',
    backgroundColor: 'rgba(14, 12, 24, 0.92)',
    paddingHorizontal: 36,
    paddingTop: 32,
    paddingBottom: 28,
  },
  hallucinationSection: {
    backgroundColor: 'rgba(30,0,50,0.25)',
  },
  breadcrumb: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: '#8c829e',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  hallucinationBreadcrumb: {
    color: 'rgba(195,155,211,0.5)',
    letterSpacing: 3,
  },
  nodeTitle: {
    fontSize: 26,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    lineHeight: 34,
    letterSpacing: 0.3,
    marginBottom: 20,
  },
  desktopNodeTitle: {
    fontSize: 23,
    lineHeight: 30,
  },
  hallucinationTitle: {
    color: '#c39bd3',
    letterSpacing: 0.8,
  },
  speakerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  speakerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.14)',
  },
  speakerText: {
    fontSize: 10,
    color: '#ba7fd4',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  narration: {
    fontSize: 16.5,
    color: '#c4a880',
    lineHeight: 28,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    letterSpacing: 0.15,
  },
  typewriterCursor: {
    color: '#c9a84c',
    opacity: 0.85,
  },
  hallucinationNarration: {
    color: '#d4b8e0',
    fontStyle: 'italic',
    lineHeight: 29,
    letterSpacing: 0.2,
  },
  dialogueBox: {
    backgroundColor: 'rgba(155,89,182,0.06)',
    borderLeftWidth: 2.5,
    borderLeftColor: 'rgba(155,89,182,0.35)',
    paddingLeft: 18,
    paddingRight: 14,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 16,
    borderRadius: 2,
  },
  dialogueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  dialogueTextCol: {
    flex: 1,
  },
  hallucinationDialogueBox: {
    backgroundColor: 'rgba(155,89,182,0.12)',
    borderLeftColor: 'rgba(195,155,211,0.5)',
  },
  dialogueOpenQuote: {
    fontSize: 40,
    color: 'rgba(155,89,182,0.22)',
    fontFamily: 'Inter_700Bold',
    lineHeight: 32,
    marginBottom: 4,
  },
  dialogue: {
    fontSize: 15.5,
    color: '#e8d5b0',
    lineHeight: 25,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  hallucinationDialogue: {
    color: '#e0c8f0',
    letterSpacing: 0.3,
  },
  companionStrip: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  companionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(10,6,20,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  companionDot: { width: 5, height: 5, borderRadius: 3 },
  companionName: {
    fontSize: 10,
    color: '#7a6e80',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
});
