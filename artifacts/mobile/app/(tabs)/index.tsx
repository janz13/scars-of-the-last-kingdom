import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useGame } from "@/context/GameContext";

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
  const { state, isLoading } = useGame();

  if (isLoading) return <LoadingScreen />;

  switch (state.screen) {
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
      return <GameScreens screen={state.screen} />;
    case "ending":
      return <EndingScreen />;
    default:
      return <UnknownScreen screen={state.screen} />;
  }
}

function GameScreens({ screen }: { screen: string }) {
  switch (screen) {
    case "game":      return <StoryPanel />;
    case "stats":     return <StatsPanel />;
    case "inventory": return <InventoryPanel />;
    case "companions":return <CompanionPanel />;
    case "factions":  return <FactionPanel />;
    case "history":   return <HistoryPanel />;
    case "settings":  return <SettingsPanel />;
    default:          return <StoryPanel />;
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
