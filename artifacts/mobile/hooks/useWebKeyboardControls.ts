import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useGame } from '../context/GameContext';
import { resolveDiceCheck } from '../logic/diceEngine';

export function useWebKeyboardControls() {
  const {
    state,
    availableChoices,
    makeChoice,
    setScreen,
    pendingDiceRoll,
    initiateDiceRoll,
    commitDiceRoll,
  } = useGame();

  // Store the latest values in a ref to avoid stale closures in the window listener
  const latestRef = useRef({
    state,
    availableChoices,
    makeChoice,
    setScreen,
    pendingDiceRoll,
    initiateDiceRoll,
    commitDiceRoll,
  });

  useEffect(() => {
    latestRef.current = {
      state,
      availableChoices,
      makeChoice,
      setScreen,
      pendingDiceRoll,
      initiateDiceRoll,
      commitDiceRoll,
    };
  });

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent double firing if multiple components mount this hook
      if ((e as any).__handledWebControl) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const {
        state: curState,
        availableChoices: curChoices,
        makeChoice: doMakeChoice,
        setScreen: doSetScreen,
        pendingDiceRoll: curPendingRoll,
        initiateDiceRoll: doInitiateRoll,
        commitDiceRoll: doCommitRoll,
      } = latestRef.current;

      const key = e.key;

      // ── Handle pending dice roll (Space or Enter) ─────────────────────────
      if (e.code === 'Space' || key === ' ' || key === 'Enter') {
        if (curPendingRoll) {
          e.preventDefault();
          (e as any).__handledWebControl = true;

          // Dispatch a custom event for the DiceRollOverlay if it's currently active
          const eventDispatched = window.dispatchEvent(
            new CustomEvent('dice-roll-advance', { cancelable: true })
          );

          // If not intercepted/cancelled by active DiceRollOverlay, resolve & commit directly
          if (eventDispatched) {
            const result = resolveDiceCheck(curState, curPendingRoll.diceCheck);
            doCommitRoll(curPendingRoll.choiceId, result);
          }
          return;
        }
      }

      // ── Hotkeys for screen navigation ────────────────────────────────────
      const lowerKey = key.toLowerCase();

      if (lowerKey === 'i') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        doSetScreen(curState.screen === 'inventory' ? 'game' : 'inventory');
        return;
      }

      if (lowerKey === 'c') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        doSetScreen(curState.screen === 'companions' ? 'game' : 'companions');
        return;
      }

      if (lowerKey === 's') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        doSetScreen(curState.screen === 'stats' ? 'game' : 'stats');
        return;
      }

      if (lowerKey === 'f') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        doSetScreen(curState.screen === 'factions' ? 'game' : 'factions');
        return;
      }

      if (lowerKey === 'h') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        doSetScreen(curState.screen === 'history' ? 'game' : 'history');
        return;
      }

      if (key === 'Escape') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        if (curState.screen !== 'game') {
          doSetScreen('game');
        } else {
          doSetScreen('settings');
        }
        return;
      }

      // ── Number keys 1-9 for choices ──────────────────────────────────────
      if (curState.screen === 'game' && !curPendingRoll) {
        if (key >= '1' && key <= '9') {
          const index = parseInt(key, 10) - 1;
          if (index >= 0 && index < curChoices.length) {
            const choiceItem = curChoices[index];
            if (choiceItem && choiceItem.met) {
              e.preventDefault();
              (e as any).__handledWebControl = true;
              if (choiceItem.choice.diceCheck) {
                doInitiateRoll(choiceItem.choice.id);
              } else {
                doMakeChoice(choiceItem.choice.id);
              }
              return;
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
