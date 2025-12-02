import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

// Filter Options
const BATCHES = ['2023', '2024', '2025', '2026', 'Alumni'];
const INTERESTS = ['Dating', 'Friends', 'Study', 'Events'];

export default function FilterScreen() {
  const [strictMode, setStrictMode] = useState(true); // Only my college vs Whole Uni
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [selectedBatches, setSelectedBatches] = useState<string[]>(['2024', '2025']);
  const [selectedIntent, setSelectedIntent] = useState<string>('Dating');

  const toggleBatch = (batch: string) => {
    Haptics.selectionAsync();
    if (selectedBatches.includes(batch)) {
      setSelectedBatches(selectedBatches.filter(b => b !== batch));
    } else {
      setSelectedBatches([...selectedBatches, batch]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Discovery.</Text>
          <Text style={styles.subtitle}>Control who you see on campus.</Text>
        </View>

        {/* --- SECTION 1: CAMPUS RADIUS --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CAMPUS SCOPE</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.rowTitle}>Strict Mode</Text>
                <Text style={styles.rowSubtitle}>Show only my specific college</Text>
              </View>
              <Switch 
                value={strictMode} 
                onValueChange={(val) => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setStrictMode(val);
                }}
                trackColor={{ false: '#E0E0E0', true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View>
                <Text style={styles.rowTitle}>Verified Students</Text>
                <Text style={styles.rowSubtitle}>Hide unverified profiles</Text>
              </View>
              <Switch 
                value={verifiedOnly} 
                onValueChange={(val) => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setVerifiedOnly(val);
                }}
                trackColor={{ false: '#E0E0E0', true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          </View>
        </View>

        {/* --- SECTION 2: BATCH / YEAR --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TARGET BATCHES</Text>
          <View style={styles.chipGrid}>
            {BATCHES.map((batch) => {
              const isActive = selectedBatches.includes(batch);
              return (
                <TouchableOpacity 
                  key={batch}
                  style={[styles.chip, isActive && styles.activeChip]}
                  onPress={() => toggleBatch(batch)}
                >
                  <Text style={[styles.chipText, isActive && styles.activeChipText]}>{batch}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* --- SECTION 3: VIBE / INTENT --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOOKING FOR</Text>
          <View style={styles.intentContainer}>
            {INTERESTS.map((item) => {
              const isActive = selectedIntent === item;
              return (
                <TouchableOpacity 
                  key={item}
                  style={[styles.intentBox, isActive && styles.activeIntent]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedIntent(item);
                  }}
                >
                  <Ionicons 
                    name={item === 'Dating' ? 'heart' : item === 'Friends' ? 'people' : item === 'Study' ? 'book' : 'calendar'} 
                    size={20} 
                    color={isActive ? COLORS.white : COLORS.primary} 
                  />
                  <Text style={[styles.intentText, isActive && styles.activeIntentText]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* --- FOOTER BUTTON --- */}
        <View style={{height: 40}} />
        <TouchableOpacity style={styles.applyBtn} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 24, paddingBottom: 100 },
  
  header: { marginBottom: 30, marginTop: 10 },
  title: { fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', fontSize: 36, color: COLORS.primary, marginBottom: 5 },
  subtitle: { color: COLORS.gray, fontSize: 15 },

  section: { marginBottom: 30 },
  sectionTitle: { 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', 
    fontSize: 12, fontWeight: '700', color: COLORS.gray, 
    marginBottom: 12, letterSpacing: 1 
  },

  // Toggle Card
  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#F0F0F0' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowTitle: { fontSize: 16, fontWeight: '600', color: COLORS.primary, marginBottom: 4 },
  rowSubtitle: { fontSize: 12, color: COLORS.gray },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },

  // Chips
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { 
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, 
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E0E0E0' 
  },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  activeChipText: { color: COLORS.white },

  // Intent Grid
  intentContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  intentBox: { 
    flex: 1, aspectRatio: 1, backgroundColor: COLORS.white, 
    borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#E0E0E0'
  },
  activeIntent: { backgroundColor: COLORS.primary, borderColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: {width: 0, height: 4} },
  intentText: { marginTop: 8, fontSize: 12, fontWeight: '600', color: COLORS.primary },
  activeIntentText: { color: COLORS.white },

  applyBtn: {
    backgroundColor: COLORS.primary, borderRadius: 16, paddingVertical: 18,
    alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: {width: 0, height: 5}
  },
  applyText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 }
});