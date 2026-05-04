import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { APP_VERSION } from '../constants/version';

export default function SettingsPanel() {
  const { state, setScreen, updateSettings, deleteAndReset, resetAllData } = useGame();
  const insets = useSafeAreaInsets();
  const { settings } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const isInGame = state.screen !== 'mainMenu';

  const confirmResetSave = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Delete your current save and return to the main menu? This cannot be undone.')) {
        deleteAndReset();
      }
    } else {
      Alert.alert(
        'Reset Current Save',
        'Delete your current save and return to the main menu? This cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete Save', style: 'destructive', onPress: () => deleteAndReset() },
        ]
      );
    }
  };

  const confirmResetAll = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('RESET ALL DATA?\n\nThis wipes your save, all discovered endings, and every record of your playthroughs. This cannot be undone.')) {
        resetAllData();
      }
    } else {
      Alert.alert(
        'Reset All Data',
        'This wipes your save, all discovered endings, and every record of your playthroughs.\n\nThis cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Wipe Everything', style: 'destructive', onPress: () => resetAllData() },
        ]
      );
    }
  };

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

        <Text style={styles.sectionHeader}>DICE CHECKS</Text>
        <Pressable
          style={styles.toggleRow}
          onPress={() => updateSettings({ skipDiceAnimation: !settings.skipDiceAnimation })}
        >
          <View>
            <Text style={styles.toggleLabel}>Skip Dice Animation</Text>
            <Text style={styles.toggleDesc}>Show results instantly without the rolling animation.</Text>
          </View>
          <View style={[styles.toggle, settings.skipDiceAnimation && styles.toggleOn]}>
            <View style={[styles.toggleThumb, settings.skipDiceAnimation && styles.toggleThumbOn]} />
          </View>
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>EXPLORE</Text>
        <Pressable style={styles.navRow} onPress={() => setScreen('routeCodex')}>
          <Feather name="compass" size={14} color="#1abc9c" />
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleLabel}>Route Codex</Text>
            <Text style={styles.toggleDesc}>Track endings, companions, factions and choices.</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#4a4050" />
        </Pressable>

        <Pressable style={styles.navRow} onPress={() => setScreen('credits')}>
          <Feather name="star" size={14} color="#8a7a60" />
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleLabel}>Credits</Text>
            <Text style={styles.toggleDesc}>Development team and version information.</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#4a4050" />
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>DEVELOPER</Text>
        <Pressable style={styles.navRow} onPress={() => setScreen('developer')}>
          <Feather name="terminal" size={14} color="#6a5e70" />
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleLabel}>Developer Mode</Text>
            <Text style={styles.toggleDesc}>Test story nodes and force game states.</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#4a4050" />
        </Pressable>

        {isInGame && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>NAVIGATION</Text>
            <Pressable style={styles.menuBtn} onPress={() => setScreen('mainMenu')}>
              <Feather name="home" size={14} color="#9b59b6" />
              <Text style={styles.menuBtnText}>Return to Main Menu</Text>
            </Pressable>

            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>DANGER ZONE</Text>
            <Pressable style={styles.dangerBtn} onPress={confirmResetSave}>
              <Feather name="delete" size={14} color="#c0392b" />
              <Text style={styles.dangerText}>Reset Current Save</Text>
            </Pressable>
            <View style={{ height: 10 }} />
            <Pressable style={[styles.dangerBtn, styles.dangerBtnSevere]} onPress={confirmResetAll}>
              <Feather name="trash-2" size={14} color="#7a0e0e" />
              <Text style={[styles.dangerText, styles.dangerTextSevere]}>Reset All Data</Text>
            </Pressable>
            <Text style={styles.dangerNote}>Reset All Data wipes discovered endings and all progress.</Text>
          </>
        )}

        {!isInGame && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>DANGER ZONE</Text>
            <Pressable style={[styles.dangerBtn, styles.dangerBtnSevere]} onPress={confirmResetAll}>
              <Feather name="trash-2" size={14} color="#7a0e0e" />
              <Text style={[styles.dangerText, styles.dangerTextSevere]}>Reset All Data</Text>
            </Pressable>
            <Text style={styles.dangerNote}>Wipes all saves, discovered endings, and every playthrough record.</Text>
          </>
        )}

        {/* Version footer */}
        <View style={styles.versionRow}>
          <Text style={styles.versionText}>{APP_VERSION}</Text>
        </View>
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
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
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
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#4a3060',
    borderRadius: 4,
    padding: 14,
    backgroundColor: '#12101e',
  },
  menuBtnText: {
    fontSize: 13,
    color: '#9b59b6',
    fontFamily: 'Inter_500Medium',
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
  dangerBtnSevere: {
    borderColor: '#2a0a0a',
    backgroundColor: '#0e0404',
  },
  dangerText: {
    fontSize: 13,
    color: '#c0392b',
    fontFamily: 'Inter_500Medium',
  },
  dangerTextSevere: {
    color: '#7a0e0e',
  },
  dangerNote: {
    fontSize: 11,
    color: '#3a2020',
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    lineHeight: 16,
  },
  versionRow: {
    marginTop: 32,
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1a28',
  },
  versionText: {
    fontSize: 10,
    color: '#2a2038',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
  },
});
