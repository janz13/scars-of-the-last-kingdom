import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { APP_VERSION, BUILD_DATE } from '../constants/version';
import { exportSaveData } from '../logic/saveSystem';
import type { SaveSlotMetadata } from '../data/types';

export default function SettingsPanel() {
  const {
    state,
    setScreen,
    updateSettings,
    deleteAndReset,
    resetAllData,
    importSave,
    loadSlot,
    saveToSlot,
    deleteSlotData,
    getSlots,
  } = useGame();
  const insets = useSafeAreaInsets();
  const { settings } = state;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [slots, setSlots] = useState<SaveSlotMetadata[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  const refreshSlots = useCallback(async () => {
    try {
      const list = await getSlots();
      setSlots(list);
    } catch (err) {
      console.warn('Failed to load slots:', err);
    } finally {
      setIsLoadingSlots(false);
    }
  }, [getSlots]);

  useEffect(() => {
    void refreshSlots();
  }, [refreshSlots]);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const isInGame = state.screen !== 'mainMenu' && state.character !== null;

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleExportSave = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const result = await exportSaveData();
      if (result.success) {
        showAlert(
          'Export Successful',
          'Save file "scars-of-the-last-kingdom-save.json" has been exported and downloaded.'
        );
      } else {
        showAlert('Export Failed', result.error || 'Failed to export save data.');
      }
    } catch (err) {
      showAlert('Export Failed', err instanceof Error ? err.message : 'An error occurred during export.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result;
        if (typeof content !== 'string') {
          showAlert('Import Failed', 'Unable to read the save file content.');
          return;
        }

        const success = await importSave(content);
        if (success) {
          showAlert(
            'Import Successful',
            'Save file and endings imported successfully! Your progress has been restored.'
          );
        } else {
          showAlert(
            'Import Failed',
            'The selected file is not a valid save file. Please select a valid scars-of-the-last-kingdom-save.json file.'
          );
        }
      } catch (err) {
        showAlert(
          'Import Failed',
          err instanceof Error ? err.message : 'An unexpected error occurred during import.'
        );
      } finally {
        setIsImporting(false);
        if (e.target) {
          e.target.value = '';
        }
      }
    };

    reader.onerror = () => {
      showAlert('Import Failed', 'Failed to read the selected file.');
      setIsImporting(false);
      if (e.target) {
        e.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  const handleImportClick = () => {
    if (Platform.OS === 'web') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      } else if (typeof document !== 'undefined') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.style.display = 'none';
        input.onchange = (ev: Event) => {
          const target = ev.target as HTMLInputElement;
          const file = target.files?.[0];
          if (!file) {
            if (document.body.contains(input)) document.body.removeChild(input);
            return;
          }
          setIsImporting(true);
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              const content = event.target?.result;
              if (typeof content === 'string') {
                const success = await importSave(content);
                if (success) {
                  showAlert('Import Successful', 'Save file and endings imported successfully! Your progress has been restored.');
                } else {
                  showAlert('Import Failed', 'The selected file is not a valid save file.');
                }
              }
            } finally {
              setIsImporting(false);
              if (document.body.contains(input)) document.body.removeChild(input);
            }
          };
          reader.readAsText(file);
        };
        document.body.appendChild(input);
        input.click();
      }
    } else {
      showAlert('Save Import', 'Save file import is currently only supported in web browsers.');
    }
  };

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

  const handleSaveSlot = async (slot: SaveSlotMetadata) => {
    if (!isInGame) return;
    if (!slot.isEmpty) {
      const confirmMsg = `Overwrite ${slot.label}?\nExisting save data will be replaced.`;
      if (Platform.OS === 'web') {
        if (!window.confirm(confirmMsg)) return;
      }
    }
    const success = await saveToSlot(slot.slotId);
    if (success) {
      await refreshSlots();
      showAlert('Saved', `Progress saved to ${slot.label}.`);
    } else {
      showAlert('Save Failed', 'Unable to save to this slot.');
    }
  };

  const handleLoadSlot = async (slot: SaveSlotMetadata) => {
    if (slot.isEmpty) return;
    const confirmMsg = `Load ${slot.label}?\nAny unsaved progress in your current timeline will be lost.`;
    if (Platform.OS === 'web') {
      if (!window.confirm(confirmMsg)) return;
    }
    const success = await loadSlot(slot.slotId);
    if (success) {
      setScreen('game');
    } else {
      showAlert('Load Failed', 'Failed to load save data from this slot.');
    }
  };

  const handleDeleteSlot = async (slot: SaveSlotMetadata) => {
    if (slot.isEmpty) return;
    const confirmMsg = `Delete ${slot.label}?\nThis will permanently delete this save file.`;
    if (Platform.OS === 'web') {
      if (!window.confirm(confirmMsg)) return;
    }
    const success = await deleteSlotData(slot.slotId);
    if (success) {
      await refreshSlots();
      showAlert('Deleted', `${slot.label} has been deleted.`);
    } else {
      showAlert('Delete Failed', 'Failed to delete this save slot.');
    }
  };

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>SETTINGS</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen(state.character ? 'game' : 'mainMenu')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>

        <Text style={styles.sectionHeader}>TEXT SPEED</Text>
        <View style={styles.buttonGroup}>
          {(['slow', 'normal', 'fast', 'instant'] as const).map((speed) => (
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

        <Text style={styles.sectionHeader}>FONT SIZE</Text>
        <View style={styles.buttonGroup}>
          {(['small', 'normal', 'large'] as const).map((size) => (
            <Pressable
              key={size}
              style={[styles.optionBtn, state.settings.fontSize === size && styles.optionBtnActive]}
              onPress={() => updateSettings({ fontSize: size })}
            >
              <Text style={[styles.optionText, state.settings.fontSize === size && styles.optionTextActive]}>
                {size.toUpperCase()}
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

        <Text style={styles.sectionHeader}>SAVE SLOTS</Text>
        <View style={styles.slotList}>
          {slots.map((slot) => {
            const isAuto = slot.slotId === 'auto';
            const dateStr = slot.timestamp > 0 ? new Date(slot.timestamp).toLocaleString() : 'EMPTY';
            return (
              <View key={slot.slotId} style={[styles.slotCard, slot.isEmpty && styles.slotCardEmpty]}>
                <View style={styles.slotHeaderRow}>
                  <View style={[styles.slotBadge, isAuto ? styles.slotBadgeAuto : styles.slotBadgeManual]}>
                    <Text style={[styles.slotBadgeText, isAuto ? styles.slotBadgeTextAuto : styles.slotBadgeTextManual]}>
                      {slot.label.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.slotDateText}>{dateStr}</Text>
                </View>

                {!slot.isEmpty ? (
                  <View style={styles.slotDetails}>
                    <Text style={styles.slotCharText}>
                      {slot.characterName} {slot.characterClass ? `(${slot.characterClass})` : ''}
                    </Text>
                    <Text style={styles.slotLocationText}>
                      {slot.chapter} • {slot.location}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.slotEmptyText}>No saved timeline</Text>
                )}

                <View style={styles.slotActionsRow}>
                  {isInGame && !isAuto && (
                    <Pressable
                      style={({ pressed }) => [styles.slotActionBtn, styles.slotSaveBtn, pressed && styles.slotBtnPressed]}
                      onPress={() => handleSaveSlot(slot)}
                      accessibilityRole="button"
                      accessibilityLabel={`Save to ${slot.label}`}
                    >
                      <Feather name="save" size={12} color="#b877d9" />
                      <Text style={styles.slotSaveText}>SAVE</Text>
                    </Pressable>
                  )}

                  {!slot.isEmpty && (
                    <Pressable
                      style={({ pressed }) => [styles.slotActionBtn, styles.slotLoadBtn, pressed && styles.slotBtnPressed]}
                      onPress={() => handleLoadSlot(slot)}
                      accessibilityRole="button"
                      accessibilityLabel={`Load from ${slot.label}`}
                    >
                      <Feather name="play" size={12} color="#2ecc71" />
                      <Text style={styles.slotLoadText}>LOAD</Text>
                    </Pressable>
                  )}

                  {!slot.isEmpty && (
                    <Pressable
                      style={({ pressed }) => [styles.slotActionBtn, styles.slotDeleteBtn, pressed && styles.slotBtnPressed]}
                      onPress={() => handleDeleteSlot(slot)}
                      accessibilityRole="button"
                      accessibilityLabel={`Delete ${slot.label}`}
                    >
                      <Feather name="trash-2" size={12} color="#e74c3c" />
                      <Text style={styles.slotDeleteText}>DELETE</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.divider} />

        {Platform.OS === 'web' && (
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        )}

        <Text style={styles.sectionHeader}>SAVE DATA PORTABILITY</Text>
        <Text style={styles.portabilityDesc}>
          Export a JSON backup of your progress and discovered endings, or import an existing save file.
        </Text>

        <View style={styles.portabilityGroup}>
          <Pressable
            style={[styles.portabilityBtn, isExporting && styles.portabilityBtnDisabled]}
            onPress={handleExportSave}
            disabled={isExporting}
          >
            <Feather name="download" size={15} color="#d4af37" />
            <View style={{ flex: 1 }}>
              <Text style={styles.portabilityBtnTitle}>Export Save File</Text>
              <Text style={styles.portabilityBtnDesc}>
                {isExporting ? 'Exporting...' : 'Download scars-of-the-last-kingdom-save.json'}
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.portabilityBtn, isImporting && styles.portabilityBtnDisabled]}
            onPress={handleImportClick}
            disabled={isImporting}
          >
            <Feather name="upload" size={15} color="#4a9eff" />
            <View style={{ flex: 1 }}>
              <Text style={styles.portabilityBtnTitle}>Import Save File</Text>
              <Text style={styles.portabilityBtnDesc}>
                {isImporting ? 'Importing...' : 'Restore journey and discovered endings from .json file'}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.divider} />

        {isInGame && (
          <>
            <Text style={styles.sectionHeader}>NAVIGATION</Text>
            <Pressable style={styles.menuBtn} onPress={() => setScreen('mainMenu')}>
              <Feather name="home" size={14} color="#9b59b6" />
              <Text style={styles.menuBtnText}>Return to Main Menu</Text>
            </Pressable>

            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>DANGER ZONE</Text>
            <Pressable style={styles.dangerBtn} onPress={confirmResetSave}>
              <Feather name="delete" size={14} color="#c0392b" />
              <View style={{ flex: 1 }}>
                <Text style={styles.dangerText}>Reset Current Save</Text>
                <Text style={styles.dangerDesc}>Delete your current playthrough and return to the main menu.</Text>
              </View>
            </Pressable>
            <View style={{ height: 10 }} />
            <Pressable style={[styles.dangerBtn, styles.dangerBtnSevere]} onPress={confirmResetAll}>
              <Feather name="trash-2" size={14} color="#7a0e0e" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.dangerText, styles.dangerTextSevere]}>Reset All Data</Text>
                <Text style={styles.dangerDescSevere}>Wipe all saves, discovered endings, and every playthrough record. This cannot be undone.</Text>
              </View>
            </Pressable>
          </>
        )}

        {!isInGame && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>DANGER ZONE</Text>
            <Pressable style={[styles.dangerBtn, styles.dangerBtnSevere]} onPress={confirmResetAll}>
              <Feather name="trash-2" size={14} color="#7a0e0e" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.dangerText, styles.dangerTextSevere]}>Reset All Data</Text>
                <Text style={styles.dangerDescSevere}>Wipes all saves, discovered endings, and every playthrough record. This cannot be undone.</Text>
              </View>
            </Pressable>
          </>
        )}

        {/* Version footer */}
        <View style={styles.versionRow}>
          <Text style={styles.versionText}>{APP_VERSION}</Text>
          <Text style={styles.buildDateText}>{BUILD_DATE}</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 6,
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
  dangerDesc: {
    fontSize: 11,
    color: '#6a4040',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    lineHeight: 16,
  },
  dangerDescSevere: {
    fontSize: 11,
    color: '#4a2020',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    lineHeight: 16,
  },
  dangerNote: {
    fontSize: 11,
    color: '#3a2020',
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    lineHeight: 16,
  },
  portabilityDesc: {
    fontSize: 11,
    color: '#8a7d6e',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
    lineHeight: 16,
  },
  portabilityGroup: {
    gap: 10,
  },
  portabilityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#2a2a3a',
    borderRadius: 4,
    padding: 14,
    backgroundColor: '#12121c',
  },
  portabilityBtnDisabled: {
    opacity: 0.6,
  },
  portabilityBtnTitle: {
    fontSize: 13,
    color: '#d4c5a9',
    fontFamily: 'Inter_500Medium',
  },
  portabilityBtnDesc: {
    fontSize: 11,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    lineHeight: 15,
  },
  slotList: {
    gap: 10,
    marginBottom: 4,
  },
  slotCard: {
    borderWidth: 1,
    borderColor: '#2a2a3a',
    borderRadius: 6,
    backgroundColor: '#100e18',
    padding: 12,
    gap: 8,
  },
  slotCardEmpty: {
    borderColor: '#1c1a26',
    backgroundColor: '#0c0a12',
  },
  slotHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
  },
  slotBadgeAuto: {
    backgroundColor: '#2e1a0a',
    borderColor: '#e67e22',
  },
  slotBadgeManual: {
    backgroundColor: '#1a1228',
    borderColor: '#9b59b6',
  },
  slotBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.8,
  },
  slotBadgeTextAuto: {
    color: '#e67e22',
  },
  slotBadgeTextManual: {
    color: '#9b59b6',
  },
  slotDateText: {
    fontSize: 11,
    color: '#8a7d6e',
    fontFamily: 'Inter_400Regular',
  },
  slotDetails: {
    gap: 2,
  },
  slotCharText: {
    fontSize: 13,
    color: '#ede0c4',
    fontFamily: 'Inter_600SemiBold',
  },
  slotLocationText: {
    fontSize: 11,
    color: '#a69cae',
    fontFamily: 'Inter_400Regular',
  },
  slotEmptyText: {
    fontSize: 11,
    color: '#5a5060',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  slotActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  slotActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
  },
  slotBtnPressed: {
    opacity: 0.7,
  },
  slotSaveBtn: {
    borderColor: '#9b59b6',
    backgroundColor: '#221235',
  },
  slotSaveText: {
    fontSize: 10,
    color: '#b877d9',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  slotLoadBtn: {
    borderColor: '#27ae60',
    backgroundColor: '#0d2818',
  },
  slotLoadText: {
    fontSize: 10,
    color: '#2ecc71',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  slotDeleteBtn: {
    borderColor: '#5a1a1a',
    backgroundColor: '#1f0a0a',
  },
  slotDeleteText: {
    fontSize: 10,
    color: '#e74c3c',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
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
  buildDateText: {
    fontSize: 9,
    color: '#1e1a2a',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
