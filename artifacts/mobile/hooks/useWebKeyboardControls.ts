import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useGame } from '../context/GameContext';
import { resolveDiceCheck } from '../logic/diceEngine';

export function useWebKeyboardControls(
  customToggleHotkey?: () => void,
  customIsHotkeyOpen?: boolean,
  customCloseHotkey?: () => void,
) {
  const {
    state,
    availableChoices,
    makeChoice,
    setScreen,
    pendingDiceRoll,
    initiateDiceRoll,
    commitDiceRoll,
    quickSave,
    showHotkeyModal,
    setShowHotkeyModal,
    toggleHotkeyModal,
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
    quickSave,
    showHotkeyModal,
    setShowHotkeyModal,
    toggleHotkeyModal,
    customToggleHotkey,
    customIsHotkeyOpen,
    customCloseHotkey,
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
      quickSave,
      showHotkeyModal,
      setShowHotkeyModal,
      toggleHotkeyModal,
      customToggleHotkey,
      customIsHotkeyOpen,
      customCloseHotkey,
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
        quickSave: doQuickSave,
        showHotkeyModal: curShowHotkeyModal,
        setShowHotkeyModal: doSetShowHotkeyModal,
        toggleHotkeyModal: doToggleHotkeyModal,
        customToggleHotkey: doCustomToggle,
        customIsHotkeyOpen: curCustomIsOpen,
        customCloseHotkey: doCustomClose,
      } = latestRef.current;

      const key = e.key;
      const isModalActive = curCustomIsOpen !== undefined ? curCustomIsOpen : curShowHotkeyModal;

      // ── Toggle Hotkey Modal ('?' or Shift + '/') ─────────────────────────
      const isQuestionMark =
        (key === '?' || (e.shiftKey && key === '/')) &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey;

      if (isQuestionMark) {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        if (doCustomToggle) {
          doCustomToggle();
        } else {
          doToggleHotkeyModal();
        }
        return;
      }

      // ── Handle Escape key (modal stack first) ─────────────────────────────
      if (key === 'Escape') {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        if (isModalActive) {
          if (doCustomClose) {
            doCustomClose();
          } else {
            doSetShowHotkeyModal(false);
          }
          return;
        }

        if (curState.screen !== 'game') {
          doSetScreen('game');
        } else {
          doSetScreen('settings');
        }
        return;
      }

      // If hotkey modal is active, suppress further game keys
      if (isModalActive) {
        return;
      }

      // ── Quick Save (Ctrl + S or Cmd + S) ──────────────────────────────────
      const isQuickSaveKey =
        (e.ctrlKey || e.metaKey) &&
        !e.altKey &&
        (key === 's' || key === 'S' || e.code === 'KeyS');

      if (isQuickSaveKey) {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        void doQuickSave();
        return;
      }

      // ── Handle pending dice roll or Typewriter Skip (Space or Enter) ───────
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

        // If in story mode and no pending roll, trigger typewriter skip
        if (curState.screen === 'game') {
          e.preventDefault();
          (e as any).__handledWebControl = true;
          window.dispatchEvent(new CustomEvent('story-typewriter-skip'));
          return;
        }
      }

      // ── Hotkeys for screen navigation (unmodified keys only) ───────────────
      if (!e.ctrlKey && !e.altKey && !e.metaKey) {
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

        // ── Number keys 1-9 for choices ────────────────────────────────────
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
