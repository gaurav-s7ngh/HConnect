// app/index.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Elegant slow fade and scale
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
    ]).start();

    // Navigate to Login after 3 seconds
    setTimeout(() => {
      router.replace('/auth/login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        {/* Minimalist Icon */}
        <Ionicons name="sparkles" size={60} color={COLORS.primary} style={{ marginBottom: 20, opacity: 0.8 }} />
        
        {/* Editorial Serif Font */}
        <Text style={styles.logoText}>CampusConnect</Text>
        <Text style={styles.tagline}>curated connections.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoText: { 
    fontSize: 36, 
    fontWeight: '400', // Lighter weight for elegance
    color: COLORS.primary, 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', // The "Vogue" font
    letterSpacing: -1,
  },
  tagline: { 
    fontSize: 14, 
    color: COLORS.primary, 
    marginTop: 10, 
    letterSpacing: 2, // Wide spacing for aesthetic
    textTransform: 'lowercase',
    opacity: 0.6
  },
});