import { useCallback, useEffect, useRef, useState } from 'react';
import { TextSpeed, TYPEWRITER_SPEED_INTERVALS } from '../data/types';

export interface UseTypewriterOptions {
  text: string;
  dialogue?: string;
  textSpeed: TextSpeed;
  reducedMotion?: boolean;
}

export interface UseTypewriterReturn {
  displayedNarration: string;
  displayedDialogue: string;
  isTyping: boolean;
  skip: () => void;
}

export function useTypewriter({
  text,
  dialogue,
  textSpeed,
  reducedMotion = false,
}: UseTypewriterOptions): UseTypewriterReturn {
  // Unicode-safe code point arrays
  const narrationChars = Array.from(text ?? '');
  const dialogueChars = dialogue ? Array.from(dialogue) : [];
  const totalChars = narrationChars.length + dialogueChars.length;

  const interval = (reducedMotion || textSpeed === 'instant')
    ? 0
    : (TYPEWRITER_SPEED_INTERVALS[textSpeed] ?? 18);

  const [revealedCount, setRevealedCount] = useState<number>(() =>
    interval === 0 ? totalChars : 0
  );
  const [isTyping, setIsTyping] = useState<boolean>(() =>
    interval === 0 ? false : totalChars > 0
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(isTyping);
  isTypingRef.current = isTyping;

  const clearActiveTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Idempotent skip handler
  const skip = useCallback(() => {
    clearActiveTimer();
    setRevealedCount(totalChars);
    setIsTyping(false);
  }, [totalChars]);

  // Node change or initial mount
  useEffect(() => {
    clearActiveTimer();

    if (interval === 0 || totalChars === 0) {
      setRevealedCount(totalChars);
      setIsTyping(false);
      return;
    }

    setRevealedCount(0);
    setIsTyping(true);

    let count = 0;
    const tick = () => {
      count += 1;
      setRevealedCount(count);
      if (count < totalChars) {
        timerRef.current = setTimeout(tick, interval);
      } else {
        setIsTyping(false);
        timerRef.current = null;
      }
    };

    timerRef.current = setTimeout(tick, interval);

    return () => clearActiveTimer();
  }, [text, dialogue, interval, totalChars]);

  // Mid-animation speed change to instant or reduced motion
  useEffect(() => {
    if ((textSpeed === 'instant' || reducedMotion) && isTypingRef.current) {
      skip();
    }
  }, [textSpeed, reducedMotion, skip]);

  const displayedNarration = narrationChars
    .slice(0, Math.min(revealedCount, narrationChars.length))
    .join('');

  const displayedDialogue = revealedCount > narrationChars.length
    ? dialogueChars.slice(0, revealedCount - narrationChars.length).join('')
    : '';

  return {
    displayedNarration,
    displayedDialogue,
    isTyping,
    skip,
  };
}
