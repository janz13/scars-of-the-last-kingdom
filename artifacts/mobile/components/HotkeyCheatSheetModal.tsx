import React, { useEffect, useRef } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface HotkeyCheatSheetModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
}

interface ShortcutSection {
  title: string;
  shortcuts: ShortcutItem[];
}

const SHORTCUT_SECTIONS: ShortcutSection[] = [
  {
    title: 'CHOICES & STORY',
    shortcuts: [
      { keys: ['1-9'], description: 'Select choice 1 through 9' },
      { keys: ['Space', 'Enter'], description: 'Advance / Skip typewriter stream / Roll dice' },
      { keys: ['Tab', 'Shift+Tab'], description: 'Navigate focusable elements' },
    ],
  },
  {
    title: 'NAVIGATION & PANELS',
    shortcuts: [
      { keys: ['I'], description: 'Open Inventory' },
      { keys: ['C'], description: 'Open Companions' },
      { keys: ['S'], description: 'Open Character Stats' },
      { keys: ['F'], description: 'Open Factions' },
      { keys: ['H'], description: 'Open Route History' },
    ],
  },
  {
    title: 'SYSTEM & CONTROLS',
    shortcuts: [
      { keys: ['Ctrl + S'], description: 'Quick Save timeline' },
      { keys: ['Escape'], description: 'Close modal / Return to game' },
      { keys: ['?', 'Shift + /'], description: 'Toggle Hotkey Cheat Sheet' },
    ],
  },
];

export default function HotkeyCheatSheetModal({
  visible,
  onClose,
}: HotkeyCheatSheetModalProps) {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!visible) return;

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        (e as any).__handledWebControl = true;
        onClose();
      }
    };

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
          try {
            previousActiveElementRef.current.focus();
          } catch {
            // ignore focus errors
          }
        }
      };
    }
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <View
      style={styles.backdrop}
      role="dialog"
      aria-modal={true}
      aria-label="Keyboard Shortcuts"
      accessibilityRole={"dialog" as any}
      accessibilityViewIsModal={true}
      accessibilityLabel="Keyboard Shortcuts"
    >
      <Pressable style={styles.backdropDismiss} onPress={onClose} accessibilityLabel="Close modal backdrop" />

      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Feather name="command" size={16} color="#c9a84c" />
            <Text style={styles.title}>KEYBOARD SHORTCUTS</Text>
          </View>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
            accessibilityRole="button"
            accessibilityLabel="Close cheat sheet"
            role="button"
          >
            <Feather name="x" size={18} color="#a696bc" />
          </Pressable>
        </View>

        <Text style={styles.subtitle}>
          Quickly navigate the wasteland using your keyboard
        </Text>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {SHORTCUT_SECTIONS.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.shortcutsList}>
                {section.shortcuts.map((sc) => (
                  <View key={sc.description} style={styles.shortcutRow}>
                    <View style={styles.keyCapGroup}>
                      {sc.keys.map((k, i) => (
                        <React.Fragment key={k}>
                          {i > 0 && <Text style={styles.keyCapSeparator}>/</Text>}
                          <View style={styles.keyCap}>
                            <Text style={styles.keyCapText}>{k}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                    <Text style={styles.shortcutDesc}>{sc.description}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer tip */}
        <View style={styles.footer}>
          <Feather name="info" size={12} color="#c9a84c" />
          <Text style={styles.footerText}>
            Press <Text style={styles.footerHighlight}>?</Text> or <Text style={styles.footerHighlight}>Esc</Text> at any time to toggle this guide
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,2,10,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: 16,
    ...(Platform.OS === 'web' ? { position: 'fixed' as any } : {}),
  },
  backdropDismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    backgroundColor: '#0e0c18',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 20,
    zIndex: 101,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,89,182,0.18)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#ede0c4',
    letterSpacing: 1.5,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 4,
  },
  closeBtnPressed: {
    backgroundColor: 'rgba(155,89,182,0.15)',
  },
  subtitle: {
    fontSize: 12,
    color: '#a696bc',
    fontFamily: 'Inter_400Regular',
    marginTop: 6,
    marginBottom: 16,
  },
  body: {
    flexGrow: 0,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#c9a84c',
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  shortcutsList: {
    backgroundColor: 'rgba(20,14,32,0.7)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(80,55,110,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  shortcutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(80,55,110,0.18)',
  },
  keyCapGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 110,
  },
  keyCapSeparator: {
    color: '#a696bc',
    fontSize: 11,
  },
  keyCap: {
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.4)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyCapText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#c9a84c',
    letterSpacing: 0.5,
  },
  shortcutDesc: {
    flex: 1,
    fontSize: 13,
    color: '#d4c5a9',
    fontFamily: 'Inter_400Regular',
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(155,89,182,0.15)',
  },
  footerText: {
    fontSize: 11,
    color: '#a696bc',
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  footerHighlight: {
    color: '#c9a84c',
    fontFamily: 'Inter_600SemiBold',
  },
});
