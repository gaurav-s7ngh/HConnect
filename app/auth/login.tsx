import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const theme = useColorScheme(); // 'light' or 'dark'
  const isDark = theme === 'dark';
  
  // Local "Vogue" Theme Logic (Overrides default to ensure luxury feel)
  const BG_COLOR = isDark ? '#14110F' : '#F9F7F2'; // Deep Charcoal or Warm Cream
  const TEXT_COLOR = isDark ? '#F0EAE2' : '#3E2723'; // Ivory or Espresso
  const ACCENT_COLOR = isDark ? '#D7CCC8' : '#A1887F';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true })
    ]).start();
  }, []);

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/onboarding/details');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: BG_COLOR }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        
        {/* --- BRANDING --- */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={[styles.badgeContainer, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(62, 39, 35, 0.1)' }]}>
            <Text style={[styles.badgeText, { color: TEXT_COLOR }]}>EST. 2025 • CAMPUS EXCLUSIVE</Text>
          </View>
          
          <Text style={[styles.title, { color: TEXT_COLOR }]}>HConnect.</Text>
          <Text style={[styles.subtitle, { color: ACCENT_COLOR }]}>
            The verified network for {'\n'}
            <Text style={{fontWeight: '700', color: TEXT_COLOR}}>India's top universities.</Text>
          </Text>
        </Animated.View>

        {/* --- FORM --- */}
        <Animated.View style={[styles.form, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: TEXT_COLOR }]}>UNIVERSITY ID</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(62,39,35,0.2)' }]}>
              <Ionicons name="school-outline" size={20} color={TEXT_COLOR} style={{opacity: 0.7}} />
              <TextInput 
                placeholder="student@university.edu" 
                placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(62,39,35,0.4)'} 
                style={[styles.input, { color: TEXT_COLOR }]}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: TEXT_COLOR }]}>PASSWORD</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(62,39,35,0.2)' }]}>
              <Ionicons name="lock-closed-outline" size={20} color={TEXT_COLOR} style={{opacity: 0.7}} />
              <TextInput 
                placeholder="••••••••" 
                placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(62,39,35,0.4)'} 
                secureTextEntry 
                style={[styles.input, { color: TEXT_COLOR }]}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.forgotPass, { color: ACCENT_COLOR }]}>Forgot credentials?</Text>
          </TouchableOpacity>

          {/* Action Button */}
          <TouchableOpacity 
            style={[styles.loginBtn, { backgroundColor: TEXT_COLOR, shadowColor: TEXT_COLOR }]} 
            onPress={handleLogin}
            activeOpacity={0.9}
          >
            <Text style={[styles.loginBtnText, { color: BG_COLOR }]}>AUTHENTICATE</Text>
            <Ionicons name="arrow-forward" size={18} color={BG_COLOR} />
          </TouchableOpacity>

        </Animated.View>

        {/* --- FOOTER --- */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <Text style={[styles.footerText, { color: ACCENT_COLOR }]}>Not verified yet?</Text>
          <TouchableOpacity onPress={() => router.push('/onboarding/details')}>
            <Text style={[styles.linkText, { color: TEXT_COLOR }]}>APPLY FOR ACCESS</Text>
          </TouchableOpacity>
        </Animated.View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  
  // Header
  header: { marginBottom: 50 },
  badgeContainer: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, 
    borderRadius: 6, marginBottom: 15, borderWidth: 1,
  },
  badgeText: { 
    fontSize: 10, fontWeight: '700', letterSpacing: 1, 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' 
  },
  title: { 
    fontSize: 52, fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', 
    letterSpacing: -1.5, lineHeight: 60 
  },
  subtitle: { 
    fontSize: 18, marginTop: 10, lineHeight: 26, 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif' 
  },

  // Form
  form: { width: '100%' },
  inputGroup: { marginBottom: 25 },
  label: { 
    fontSize: 11, fontWeight: '800', marginBottom: 10, letterSpacing: 1.5, 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' 
  },
  inputWrapper: { 
    flexDirection: 'row', alignItems: 'center', 
    borderBottomWidth: 1.5, paddingBottom: 12 
  },
  input: { 
    flex: 1, fontSize: 18, marginLeft: 15, fontWeight: '600', letterSpacing: 0.5 
  },
  forgotPass: { 
    alignSelf: 'flex-end', fontSize: 13, fontWeight: '500', marginBottom: 30 
  },

  // Button
  loginBtn: { 
    height: 64, borderRadius: 16, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
    shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 10 
  },
  loginBtnText: { 
    fontSize: 16, fontWeight: '900', letterSpacing: 1.5, marginRight: 10, 
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' 
  },

  // Footer
  footer: { 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
    marginTop: 40, gap: 8 
  },
  footerText: { fontSize: 14 },
  linkText: { 
    fontSize: 14, fontWeight: '900', letterSpacing: 0.5, textDecorationLine: 'underline' 
  }
});