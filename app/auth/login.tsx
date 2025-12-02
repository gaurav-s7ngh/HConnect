// app/auth/login.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  KeyboardAvoidingView 
} from 'react-native';
import { useRouter } from 'expo-router';
// We only import the COLORS object now. Layout styles are defined below.
import { COLORS } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>welcome back.</Text>
            <Text style={styles.subText}>Sign in to continue your journey.</Text>
          </View>

          {/* Input Section */}
          <View style={styles.form}>
            <Text style={styles.inputLabel}>University Email</Text>
            <TextInput 
              placeholder="student@university.edu" 
              placeholderTextColor={COLORS.gray} 
              style={styles.input} 
            />
            
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput 
              placeholder="••••••••" 
              placeholderTextColor={COLORS.gray} 
              secureTextEntry 
              style={styles.input} 
            />

            <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/details')}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <TouchableOpacity onPress={() => router.push('/onboarding/details')} style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.linkBold}>Join now</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ALL STYLES ARE NOW HERE (Self-Contained)
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 30, 
    justifyContent: 'center' 
  },
  
  // Header Styles
  header: { 
    marginBottom: 40 
  },
  welcomeText: { 
    fontSize: 32, 
    color: COLORS.primary, 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', // The Aesthetic Font
    marginBottom: 8 
  },
  subText: { 
    fontSize: 16, 
    color: COLORS.gray, 
    fontWeight: '400' 
  },

  // Form Styles
  form: { 
    width: '100%' 
  },
  inputLabel: { 
    fontSize: 12, 
    color: COLORS.primary, 
    fontWeight: '700', 
    marginLeft: 4, 
    marginBottom: 6, 
    textTransform: 'uppercase', 
    letterSpacing: 1,
    opacity: 0.8
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    fontSize: 16,
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: '#F0EBE5', // Subtle border
    // Soft Shadow
    shadowColor: "#3E2723",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  // Button Styles
  button: {
    backgroundColor: COLORS.primary, // Dark Espresso
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#3E2723",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Footer Styles
  footer: { 
    alignItems: 'center', 
    marginTop: 40 
  },
  footerText: { 
    color: COLORS.primary, 
    fontSize: 14 
  },
  linkBold: { 
    textDecorationLine: 'underline', 
    fontWeight: 'bold' 
  }
});