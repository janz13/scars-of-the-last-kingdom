import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  delay?: number;
}

function ResourceCard({ label, value, icon, color, description, delay = 0 }: ResourceCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 350, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const empty = value === 0;

  return (
    <Animated.View
      style={[
        styles.card,
        { borderColor: empty ? 'rgba(30,28,40,0.5)' : `${color}20` },
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={[styles.cardTopAccent, { backgroundColor: empty ? '#2a2838' : color }]} />
      <View style={styles.cardBody}>
        <View style={[styles.iconBox, { backgroundColor: empty ? 'rgba(20,18,30,0.5)' : `${color}12` }]}>
          <Feather name={icon as any} size={18} color={empty ? '#3a3450' : color} />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardLabel, { color: empty ? '#3a3450' : '#9a8898' }]}>{label}</Text>
          <Text style={[styles.cardValue, { color: empty ? '#3a3450' : color }]}>{value}</Text>
        </View>
      </View>
      <Text style={[styles.cardDesc, empty && { color: '#2a2838' }]} numberOfLines={2}>{description}</Text>
    </Animated.View>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

export default function InventoryPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { inventory } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#04020a', '#08050f', '#04020a']} style={styles.container}>

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { paddingTop: topPad + 14 },
          { opacity: headerFade, transform: [{ translateY: headerSlide }] },
        ]}
      >
        <View>
          <Text style={styles.headerLabel}>INVENTORY</Text>
          <Text style={styles.headerSub}>Everything you carry. Nothing more.</Text>
        </View>
        <Pressable style={styles.closeBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={20} color="#5a5068" />
        </Pressable>
      </Animated.View>

      <View style={styles.headerRule} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: botPad + 24 }]}
        showsVerticalScrollIndicator={false}
      >

        <SectionLabel title="CONSUMABLES" />
        <View style={styles.grid}>
          <ResourceCard
            label="Food"
            value={inventory.food}
            icon="package"
            color="#e67e22"
            description="Ration paste, salvaged cans. Keeps hunger at bay."
            delay={80}
          />
          <ResourceCard
            label="Water"
            value={inventory.water}
            icon="droplet"
            color="#3d9ad1"
            description="Bottled, filtered, or collected. Thirst kills faster."
            delay={140}
          />
          <ResourceCard
            label="Medicine"
            value={inventory.medicine}
            icon="activity"
            color="#2ecc71"
            description="Bandages, antiseptic. Extends your window."
            delay={200}
          />
        </View>

        <SectionLabel title="MATERIALS" />
        <View style={styles.grid}>
          <ResourceCard
            label="Scrap"
            value={inventory.scrap}
            icon="tool"
            color="#8a9aa8"
            description="Metal, wire, components. Currency and craft."
            delay={280}
          />
          <ResourceCard
            label="Ammo"
            value={inventory.ammo}
            icon="target"
            color="#e74c3c"
            description="Rounds for whatever you find. Use carefully."
            delay={340}
          />
        </View>

        <SectionLabel title="SPECIAL" />
        <View style={styles.grid}>
          <ResourceCard
            label="Relics"
            value={inventory.relics}
            icon="zap"
            color="#9b59b6"
            description="Old machines, fragments. The mark reacts to them."
            delay={420}
          />
          <ResourceCard
            label="Reputation"
            value={inventory.reputation}
            icon="star"
            color="#c9a84c"
            description="Your standing. Opens doors. Closes others."
            delay={480}
          />
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 22,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: '#e67e22',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 14,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  closeBtn: {
    padding: 6,
    marginTop: 4,
  },
  headerRule: {
    height: 1,
    backgroundColor: 'rgba(230,126,34,0.1)',
    marginHorizontal: 22,
    marginBottom: 6,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: '#4a4058',
    fontFamily: 'Inter_600SemiBold',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(42,38,58,0.4)',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(12,8,22,0.85)',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 12,
  },
  cardTopAccent: {
    height: 2,
    opacity: 0.6,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    lineHeight: 28,
  },
  cardDesc: {
    fontSize: 11,
    color: '#4a4058',
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
    paddingHorizontal: 12,
  },
});
