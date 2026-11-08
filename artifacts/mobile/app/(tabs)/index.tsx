import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import { useGame } from "@/context/GameContext";

import SplashScreen from "@/components/SplashScreen";
import ContentWarningScreen from "@/components/ContentWarningScreen";
import MainMenu from "@/components/MainMenu";
import CharacterCreator from "@/components/CharacterCreator";
import StoryPanel from "@/components/StoryPanel";
import StatsPanel from "@/components/StatsPanel";
import InventoryPanel from "@/components/InventoryPanel";
import CompanionPanel from "@/components/CompanionPanel";
import FactionPanel from "@/components/FactionPanel";
import HistoryPanel from "@/components/HistoryPanel";
import EndingScreen from "@/components/EndingScreen";
import SettingsPanel from "@/components/SettingsPanel";
import ChapterRoadmapScreen from "@/components/ChapterRoadmapScreen";
import RouteCodexScreen from "@/components/RouteCodexScreen";
import CreditsScreen from "@/components/CreditsScreen";
import HotkeyCheatSheetModal from "@/components/HotkeyCheatSheetModal";
import { useWebKeyboardControls } from "@/hooks/useWebKeyboardControls";

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color="#9b59b6" size="large" />
    </View>
  );
}

function UnknownScreen({ screen }: { screen: string }) {
  return (
    <View style={styles.loading}>
      <Text style={styles.errorText}>Unknown screen: {screen}</Text>
    </View>
  );
}

export default function GameRoot() {
  const { state, isLoading, showHotkeyModal, setShowHotkeyModal, toggleHotkeyModal } = useGame();
  const [isHotkeyModalVisible, setIsHotkeyModalVisible] = useState(false);

  const isModalActive = isHotkeyModalVisible || showHotkeyModal;

  const handleToggleHotkeyModal = useCallback(() => {
    setIsHotkeyModalVisible((prev) => !prev);
    toggleHotkeyModal();
  }, [toggleHotkeyModal]);

  const handleCloseHotkeyModal = useCallback(() => {
    setIsHotkeyModalVisible(false);
    setShowHotkeyModal(false);
  }, [setShowHotkeyModal]);

  // Mount web keyboard controls at root level so hotkeys work everywhere
  useWebKeyboardControls(handleToggleHotkeyModal, isModalActive, handleCloseHotkeyModal);

  React.useEffect(() => {
    if (typeof document !== "undefined" && !document.title) {
      document.title = "Scars of the Last Kingdom";
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#04020a" />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScreenRouter screen={state.screen} onOpenHotkeys={handleToggleHotkeyModal} />
      )}
      <HotkeyCheatSheetModal
        visible={isModalActive}
        onClose={handleCloseHotkeyModal}
      />
    </>
  );
}

function ScreenRouter({ screen, onOpenHotkeys }: { screen: string; onOpenHotkeys?: () => void }) {
  switch (screen) {
    case "splash":
      return <SplashScreen />;
    case "contentWarning":
      return <ContentWarningScreen />;
    case "mainMenu":
      return <MainMenu />;
    case "characterCreator":
      return <CharacterCreator />;
    case "chapterRoadmap":
      return <ChapterRoadmapScreen />;
    case "routeCodex":
      return <RouteCodexScreen />;
    case "credits":
      return <CreditsScreen />;
    case "game":
    case "stats":
    case "inventory":
    case "companions":
    case "factions":
    case "history":
    case "settings":
      return <GameScreens screen={screen} onOpenHotkeys={onOpenHotkeys} />;
    case "ending":
      return <EndingScreen />;
    default:
      return <UnknownScreen screen={screen} />;
  }
}

function GameScreens({ screen, onOpenHotkeys }: { screen: string; onOpenHotkeys?: () => void }) {
  switch (screen) {
    case "game":      return <StoryPanel onOpenHotkeys={onOpenHotkeys} />;
    case "stats":     return <StatsPanel />;
    case "inventory": return <InventoryPanel />;
    case "companions":return <CompanionPanel />;
    case "factions":  return <FactionPanel />;
    case "history":   return <HistoryPanel />;
    case "settings":  return <SettingsPanel />;
    default:          return <StoryPanel onOpenHotkeys={onOpenHotkeys} />;
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#0a0a0f" },
  loading: {
    flex: 1,
    backgroundColor: "#0a0a0f",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#8e1c1c",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
