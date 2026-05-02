import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';

interface ResourceCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
  description: string;
}

function ResourceCard({ label, value, icon, color, description }: ResourceCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <Feather name={icon as any} size={16} color={color} />
        <Text style={[styles.cardLabel, { color }]}>{label}</Text>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
      </View>
      <Text style={styles.cardDesc}>{description}</Text>
    </View>
  );
}

export default function InventoryPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { inventory } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>INVENTORY & RESOURCES</Text>
        <Text style={styles.subtitle}>Everything you carry. Nothing more.</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        <Text style={styles.sectionHeader}>CONSUMABLES</Text>
        <ResourceCard label="Food" value={inventory.food} icon="package" color="#e67e22" description="Ration paste, salvaged cans, anything edible. Keeps hunger at bay." />
        <ResourceCard label="Water" value={inventory.water} icon="droplet" color="#3498db" description="Bottled, filtered, or collected. Thirst kills faster than bullets." />
        <ResourceCard label="Medicine" value={inventory.medicine} icon="activity" color="#2ecc71" description="Bandages, antiseptic, pills. Extends your survival window." />

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>MATERIALS</Text>
        <ResourceCard label="Scrap" value={inventory.scrap} icon="tool" color="#95a5a6" description="Metal, wire, components. Currency and crafting material both." />
        <ResourceCard label="Ammo" value={inventory.ammo} icon="target" color="#e74c3c" description="Rounds for whatever you can find. Use carefully." />

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>SPECIAL</Text>
        <ResourceCard label="Relics" value={inventory.relics} icon="zap" color="#9b59b6" description="Old machines, fragments. The mark reacts to them." />
        <ResourceCard label="Reputation" value={inventory.reputation} icon="star" color="#f1c40f" description="Your standing among survivors. Opens doors. Closes others." />
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
    color: '#e67e22',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 13,
    color: '#8a7d6e',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  backBtn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    padding: 6,
  },
  scroll: { flex: 1 },
  content: { padding: 16 },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#8a7d6e',
    marginBottom: 10,
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  card: {
    backgroundColor: '#1a1a28',
    borderRadius: 4,
    borderLeftWidth: 3,
    padding: 12,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    flex: 1,
  },
  cardValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  cardDesc: {
    fontSize: 12,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },
  divider: { height: 1, backgroundColor: '#2a2a3a', marginVertical: 12 },
});
