import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions, Image,
    Linking,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function VerificationScreen() {
  const router = useRouter();
  const [idImage, setIdImage] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'ANALYZING' | 'VERIFIED'>('IDLE');
  
  // Animation for the "Scanner" line
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === 'ANALYZING') {
      startScanAnimation();
      // Simulate Verification delay (Replace with Python API call later)
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setStatus('VERIFIED');
      }, 3500);
    }
  }, [status]);

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(scanAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
      ])
    ).start();
  };

  const pickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // 1. Request Permission First (Fixes the crash)
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "We need camera access to scan your Student ID.", [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() }
      ]);
      return;
    }

    // 2. Launch Camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
      setStatus('ANALYZING');
    }
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 220] // Scan range height
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SECURITY CHECK</Text>
          </View>
        </View>

        {/* --- MAIN CONTENT --- */}
        <View style={styles.content}>
          <Text style={styles.title}>Verify Identity.</Text>
          <Text style={styles.subtitle}>
            Upload your <Text style={{fontWeight: 'bold'}}>College ID Card</Text> to unlock campus access.
          </Text>

          {/* --- THE SCANNER FRAME --- */}
          <View style={styles.scannerFrame}>
            {/* Corner Markers (The "Viewfinder" look) */}
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />

            {idImage ? (
              <View style={styles.previewContainer}>
                <Image source={{ uri: idImage }} style={styles.idPreview} />
                
                {/* Scanning Animation Line */}
                {status === 'ANALYZING' && (
                  <Animated.View 
                    style={[
                      styles.laserLine, 
                      { transform: [{ translateY }] }
                    ]} 
                  />
                )}

                {/* Success Overlay */}
                {status === 'VERIFIED' && (
                  <View style={styles.verifiedOverlay}>
                    <View style={styles.verifiedIconBox}>
                      <Ionicons name="checkmark" size={40} color={COLORS.primary} />
                    </View>
                    <Text style={styles.verifiedText}>VERIFIED</Text>
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadZone} onPress={pickImage} activeOpacity={0.7}>
                <View style={styles.iconCircle}>
                  <Ionicons name="scan" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.uploadText}>TAP TO SCAN ID</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* --- STATUS INDICATOR (Monospace for "Tech" feel) --- */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, 
              status === 'ANALYZING' ? { backgroundColor: '#FFD700' } : // Gold
              status === 'VERIFIED' ? { backgroundColor: '#4CAF50' } : // Green
              { backgroundColor: COLORS.gray } 
            ]} />
            <Text style={styles.statusText}>
              {status === 'IDLE' && 'WAITING_FOR_INPUT...'}
              {status === 'ANALYZING' && 'PROCESSING_IMAGE_DATA...'}
              {status === 'VERIFIED' && 'IDENTITY_CONFIRMED.'}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="lock-closed-outline" size={14} color={COLORS.primary} />
            <Text style={styles.infoText}>Data is encrypted & deleted post-verification.</Text>
          </View>

        </View>

        {/* --- FOOTER ACTION --- */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.continueBtn, status !== 'VERIFIED' && styles.disabledBtn]}
            disabled={status !== 'VERIFIED'}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              // Navigate to Photos only after verification
              router.push('/onboarding/photos');
            }}
          >
            <Text style={styles.continueText}>
              {status === 'VERIFIED' ? 'Proceed to Profile' : 'Awaiting Verification'}
            </Text>
            {status === 'VERIFIED' && <Ionicons name="arrow-forward" size={18} color={COLORS.white} />}
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 24 },
  
  // Header
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    marginTop: 10, marginBottom: 40 
  },
  backBtn: { padding: 5 },
  badge: { 
    borderWidth: 1, borderColor: COLORS.primary, borderRadius: 50, 
    paddingHorizontal: 12, paddingVertical: 6 
  },
  badgeText: { 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', 
    fontSize: 10, fontWeight: '700', color: COLORS.primary, letterSpacing: 1 
  },

  // Main Content
  content: { flex: 1, alignItems: 'center' },
  title: { 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', 
    fontSize: 36, color: COLORS.primary, marginBottom: 10 
  },
  subtitle: { 
    color: '#6D6D6D', fontSize: 15, textAlign: 'center', 
    marginBottom: 40, lineHeight: 22 
  },

  // Scanner UI
  scannerFrame: {
    width: width * 0.85, height: 260,
    position: 'relative',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 30
  },
  corner: {
    position: 'absolute', width: 25, height: 25, borderColor: COLORS.primary,
    borderWidth: 0 
  },
  tl: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 },
  tr: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 },
  bl: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 },
  br: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 },

  uploadZone: {
    width: '90%', height: '85%',
    backgroundColor: 'rgba(255,255,255,0.5)', // Glassy
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(62, 39, 35, 0.1)',
    borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center'
  },
  iconCircle: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#EBE6DE', justifyContent: 'center', alignItems: 'center',
    marginBottom: 15
  },
  uploadText: { 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 1.5 
  },

  // Preview & Animation
  previewContainer: { 
    width: '90%', height: '85%', borderRadius: 12, overflow: 'hidden', 
    backgroundColor: '#000', position: 'relative'
  },
  idPreview: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.9 },
  laserLine: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    backgroundColor: '#FF4785', // High contrast laser color
    shadowColor: '#FF4785', shadowOpacity: 1, shadowRadius: 10, elevation: 5
  },
  verifiedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(62, 39, 35, 0.9)', // Primary color overlay
    justifyContent: 'center', alignItems: 'center'
  },
  verifiedIconBox: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.white,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  verifiedText: {
    color: COLORS.white, fontSize: 18, fontWeight: '800', 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', letterSpacing: 2
  },

  // Status & Info
  statusContainer: { 
    flexDirection: 'row', alignItems: 'center', marginBottom: 20,
    backgroundColor: '#EBE6DE', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', 
    fontSize: 11, color: COLORS.primary, fontWeight: '600' 
  },
  infoBox: { flexDirection: 'row', alignItems: 'center', opacity: 0.5 },
  infoText: { fontSize: 12, marginLeft: 6, color: COLORS.primary },

  // Footer
  footer: { marginBottom: 30, width: '100%' },
  continueBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 20, borderRadius: 16,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.2, shadowRadius: 15, elevation: 10
  },
  disabledBtn: { backgroundColor: '#B0A8A6', shadowOpacity: 0 },
  continueText: { 
    color: COLORS.white, fontSize: 16, fontWeight: '800', 
    letterSpacing: 1, marginRight: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' 
  },
});