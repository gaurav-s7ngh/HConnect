import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

// --- DUMMY DATA ---
const PROFILES = [
  {
    id: '1',
    name: 'Riya',
    age: 20,
    college: 'GGSIPU (Main Campus)',
    course: 'B.Tech CSE',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop',
    promptQuestion: 'My golden rule',
    promptAnswer: 'If you don\'t like Laphing at Majnu Ka Tila, we can\'t be friends.',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Kabir',
    age: 21,
    college: 'Delhi University (North)',
    course: 'Economics Hons.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2487&auto=format&fit=crop',
    promptQuestion: 'Dating me is like',
    promptAnswer: 'Debugging code. Frustrating at first, but worth it when it works.',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Ananya',
    age: 19,
    college: 'Amity Noida',
    course: 'Psychology',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop',
    promptQuestion: 'Unpopular opinion',
    promptAnswer: 'South campus vibe > North campus vibe.',
    isVerified: true,
  }
];

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleAction = (action: 'like' | 'pass') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    console.log(`User ${action}ed profile`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Bar (Floating) */}
      <View style={styles.topBar}>
        <View style={styles.locationTag}>
          <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
          <Text style={styles.locationText}>Delhi NCR • Student Feed</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        snapToInterval={height * 0.75} // Snap effect for magazine feel
        decelerationRate="fast"
      >
        {PROFILES.map((profile, index) => (
          <View key={profile.id} style={styles.cardContainer}>
            
            {/* --- MAIN IMAGE CARD --- */}
            <View style={styles.card}>
              <Image source={{ uri: profile.image }} style={styles.image} />
              
              {/* Gradient for Readability */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              >
                {/* Verified Badge */}
                {profile.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#FFF" />
                    <Text style={styles.verifiedText}>VERIFIED STUDENT</Text>
                  </View>
                )}

                <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                <Text style={styles.details}>{profile.course} • {profile.college}</Text>
              </LinearGradient>
            </View>

            {/* --- VIBE CHECK PROMPT --- */}
            <View style={styles.promptBox}>
              <Text style={styles.promptLabel}>VIBE CHECK ✨</Text>
              <Text style={styles.promptQuestion}>{profile.promptQuestion}</Text>
              <Text style={styles.promptAnswer}>"{profile.promptAnswer}"</Text>
            </View>

            {/* --- ACTION BUTTONS (Floating) --- */}
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.passBtn]} 
                onPress={() => handleAction('pass')}
              >
                <Ionicons name="close" size={30} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionBtn, styles.likeBtn]} 
                onPress={() => handleAction('like')}
              >
                <Ionicons name="heart" size={32} color="white" />
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F0E9' }, 
  
  // Top Bar
  topBar: {
    position: 'absolute', top: Platform.OS === 'ios' ? 10 : 10, left: 0, right: 0,
    zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20
  },
  locationTag: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20
  },
  locationText: { 
    fontSize: 12, fontWeight: '700', color: COLORS.primary, marginLeft: 4, 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' 
  },
  filterBtn: {
    width: 40, height: 40, borderRadius: 20, 
    backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center'
  },

  // Card Structure
  cardContainer: {
    height: height * 0.75, // Takes up 75% of screen
    marginBottom: 30,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    shadowColor: "#000", shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 20, elevation: 5,
    overflow: 'hidden'
  },
  card: { flex: 1, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  gradient: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: '40%', justifyContent: 'flex-end', padding: 20, paddingBottom: 30
  },
  
  // Profile Text
  name: { 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', 
    fontSize: 36, color: 'white', letterSpacing: -0.5 
  },
  details: { 
    color: 'rgba(255,255,255,0.9)', fontSize: 15, marginTop: 4, fontWeight: '500' 
  },
  
  // Badges
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: '#2D8CFF', paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 4, marginBottom: 10
  },
  verifiedText: { 
    color: 'white', fontSize: 10, fontWeight: '800', marginLeft: 4, letterSpacing: 0.5 
  },

  // Prompt Box
  promptBox: {
    backgroundColor: COLORS.secondary, 
    padding: 20,
    justifyContent: 'center'
  },
  promptLabel: { 
    fontSize: 10, fontWeight: '900', color: 'rgba(0,0,0,0.4)', 
    marginBottom: 6, letterSpacing: 1 
  },
  promptQuestion: { 
    fontSize: 14, color: COLORS.primary, fontWeight: '600', marginBottom: 4 
  },
  promptAnswer: { 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    fontSize: 22, color: COLORS.primary, lineHeight: 28 
  },

  // Floating Actions
  actionRow: {
    position: 'absolute', bottom: 140, right: 20,
    flexDirection: 'column', gap: 15
  },
  actionBtn: {
    width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 8
  },
  passBtn: { backgroundColor: COLORS.white },
  likeBtn: { backgroundColor: '#FF4785' }
});