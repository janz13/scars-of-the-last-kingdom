import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';

export default function SettingsPanel() {
  const { state, setScreen, updateSettings, deleteAndReset } = useGame();
  const insets = useSafeAreaInsets();
  const { settings } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const isInGame = state.screen !== 'mainMenu';

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>SETTINGS</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen(isInGame ? 'game' : 'mainMenu')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        <Text style={styles.sectionHeader}>TEXT SPEED</Text>
        <View style={styles.buttonGroup}>
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <Pressable
              key={speed}
              style={[styles.optionBtn, settings.textSpeed === speed && styles.optionBtnActive]}
              onPress={() => updateSettings({ textSpeed: speed })}
            >
              <Text style={[styles.optionText, settings.textSpeed === speed && styles.optionTextActive]}>
                {speed.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>AUTO-SAVE</Text>
        <Pressable
          style={styles.toggleRow}
          onPress={() => updateSettings({ autoSave: !settings.autoSave })}
        >
          <View>
            <Text style={styles.toggleLabel}>Automatic Save</Text>
            <Text style={styles.toggleDesc}>Saves your progress after each choice.</Text>
          </View>
          <View style={[styles.toggle, settings.autoSave && styles.toggleOn]}>
            <View style={[styles.toggleThumb, settings.autoSave && styles.toggleThumbOn]} />
          </View>
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>OTHER</Text>
        <Pressable
          style={styles.toggleRow}
          onPress={() => setScreen('developer')}
        >
          <View>
            <Text style={styles.toggleLabel}>Developer Mode</Text>
            <Text style={styles.toggleDesc}>Test story nodes and force game states.</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#4a4050" />
        </Pressable>

        {isInGame && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>DANGER ZONE</Text>
            <Pressable
              style={styles.dangerBtn}
              onPress={async () => {
                await deleteAndReset();
              }}
            >
              <Feather name="trash-2" size={14} color="#8e1c1c" />
              <Text style={styles.dangerText}>Delete Save & Return to Menu</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
    position: 'relative',
  },
  title: {
    fontSize: 12,
    letterSpacing: 3,
    color: '#d4c5a9',
    fontFamily: 'Inter_600SemiBold',
  },
  backBtn: { position: 'absolute', right: 16, bottom: 16, padding: 6 },
  scroll: { flex: 1 },
  content: { padding: 20 },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#8a7d6e',
    marginBottom: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonGroup: { flexDirection: 'row', gap: 8 },
  optionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2a2a3a',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  optionBtnActive: {
    borderColor: '#9b59b6',
    backgroundColor: '#1a1228',
  },
  optionText: {
    fontSize: 12,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  optionTextActive: { color: '#9b59b6' },
  divider: { height: 1, backgroundColor: '#2a2a3a', marginVertical: 20 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#d4c5a9',
    fontFamily: 'Inter_500Medium',
  },
  toggleDesc: {
    fontSize: 12,
    color: '#6a5e50',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1a1a28',
    borderWidth: 1,
    borderColor: '#2a2a3a',
    justifyContent: 'center',
    padding: 2,
  },
  toggleOn: { backgroundColor: '#2a1a3a', borderColor: '#9b59b6' },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4a4050',
  },
  toggleThumbOn: {
    backgroundColor: '#9b59b6',
    alignSelf: 'flex-end',
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#3a1a1a',
    borderRadius: 4,
    padding: 14,
    backgroundColor: '#120808',
  },
  dangerText: {
    fontSize: 13,
    color: '#8e1c1c',
    fontFamily: 'Inter_500Medium',
  },
});
