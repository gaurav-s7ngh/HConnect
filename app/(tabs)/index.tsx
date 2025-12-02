// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, STYLES } from '../../constants/theme';
import { DUMMY_PROFILES } from '../../constants/data';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 1. Floating Header (Glassmorphism) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>campus vibes ✨</Text>
          <Text style={styles.headerSubtitle}>IPU Delhi • North Campus</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {DUMMY_PROFILES.map((profile, index) => (
          <View key={profile.id} style={styles.cardWrapper}>
            
            {/* --- IMAGE SECTION --- */}
            <View style={[styles.card, STYLES.shadow]}>
              <ImageBackground source={{ uri: profile.image }} style={styles.image} imageStyle={{ borderRadius: 30 }}>
                
                {/* Gradient Overlay for Text Readability */}
                <LinearGradient
                  colors={['transparent', 'rgba(30,45,76,0.9)']}
                  style={styles.gradientOverlay}
                >
                  {/* Status Badge */}
                  {profile.verified && (
                    <View style={styles.verifiedTag}>
                      <Ionicons name="checkmark-circle" size={14} color="white" />
                      <Text style={styles.verifiedText}>VERIFIED STUDENT</Text>
                    </View>
                  )}

                  {/* Name & Details */}
                  <View style={styles.infoBox}>
                    <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                    <Text style={styles.college}>{profile.college}</Text>
                    <Text style={styles.major}>{profile.major}</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>

              {/* Like/Pass Buttons (Floating on the Image Edge) */}
              <View style={styles.floatingActions}>
                <TouchableOpacity style={styles.circleBtn}>
                  <Ionicons name="close" size={28} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.circleBtn, styles.likeBtn]}>
                  <Ionicons name="heart" size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* --- "VIBE CHECK" STICKER SECTION --- */}
            <View style={styles.stickerContainer}>
              <View style={styles.connectorLine} />
              <View style={[STYLES.glassCard, styles.sticker]}>
                <Text style={styles.stickerLabel}>VIBE CHECK ⚡</Text>
                <Text style={styles.stickerQuestion}>{profile.promptLabel}</Text>
                <Text style={styles.stickerAnswer}>"{profile.promptAnswer}"</Text>
              </View>
            </View>

          </View>
        ))}
        
        <View style={{height: 100}} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, // Light Blue Aesthetic
  },
  
  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: COLORS.primary, letterSpacing: -1 },
  headerSubtitle: { fontSize: 13, fontWeight: '600', color: COLORS.primary, opacity: 0.6, marginTop: 4, textTransform: 'uppercase' },
  filterBtn: { padding: 10, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 12 },

  scrollContent: { paddingHorizontal: 15, paddingBottom: 50 },

  // Card
  cardWrapper: { marginBottom: 35 },
  card: {
    height: 480,
    borderRadius: 30,
    backgroundColor: COLORS.primary, // Fallback
    position: 'relative',
  },
  image: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  
  // Gradient & Text
  gradientOverlay: {
    height: '50%',
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 30,
    borderRadius: 30,
  },
  verifiedTag: {
    position: 'absolute', top: -200, left: 20, // Positioned at top of card
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
  },
  verifiedText: { color: 'white', fontSize: 10, fontWeight: '800', marginLeft: 4, letterSpacing: 1 },
  
  infoBox: { marginBottom: 10 },
  name: { fontSize: 32, fontWeight: '900', color: 'white', letterSpacing: -0.5 },
  college: { fontSize: 16, fontWeight: '600', color: '#acbdda', marginTop: 4 },
  major: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.6)', marginTop: 2 },

  // Floating Buttons
  floatingActions: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    flexDirection: 'row',
    gap: 15,
  },
  circleBtn: {
    width: 55, height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000", shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5
  },
  likeBtn: { backgroundColor: '#FF4785' }, // Pop color

  // Sticker Logic
  stickerContainer: { alignItems: 'center', marginTop: -20, paddingHorizontal: 10 },
  connectorLine: { width: 2, height: 20, backgroundColor: COLORS.primary, opacity: 0.3 },
  sticker: {
    width: '100%',
    backgroundColor: COLORS.secondary, // Beige
    transform: [{ rotate: '-1deg' }], // Slight tilt for "sticker" vibe
    paddingVertical: 20,
  },
  stickerLabel: { fontSize: 10, fontWeight: '900', color: COLORS.primary, opacity: 0.5, letterSpacing: 1, marginBottom: 5 },
  stickerQuestion: { fontSize: 16, fontWeight: '600', color: COLORS.primary, marginBottom: 8 },
  stickerAnswer: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, lineHeight: 26 },
});