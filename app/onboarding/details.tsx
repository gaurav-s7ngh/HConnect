// app/onboarding/details.tsx
import React from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  View, 
  KeyboardAvoidingView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function DetailsScreen() {
  const router = useRouter();
  
  const fields = [
    { label: 'Full Name', placeholder: 'e.g. Riya Sharma' },
    { label: 'Age', placeholder: 'e.g. 21' },
    { label: 'Gender', placeholder: 'Male / Female / Other' },
    { label: 'University', placeholder: 'Select your campus' },
    { label: 'Major', placeholder: 'e.g. Psychology' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* FIX: Disable 'behavior' on Android to stop fluttering */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          bounces={false} // Stops iOS bounce flutter
          overScrollMode="never" // Stops Android wave effect
        >
          
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Header */}
          <Text style={styles.header}>the basics.</Text>
          <Text style={styles.subHeader}>Let's set up your profile card.</Text>
          
          {/* Form Fields */}
          {fields.map((field) => (
            <View key={field.label} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput 
                placeholder={field.placeholder} 
                placeholderTextColor={COLORS.gray}
                style={styles.input} 
              />
            </View>
          ))}

          {/* Continue Button */}
          <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/photos')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },
  scrollContainer: { 
    paddingHorizontal: 24, 
    paddingBottom: 20,
    flexGrow: 1 // Ensures content fills screen without jitter
  },
  
  // Navigation & Header
  backBtn: { 
    marginTop: 20, 
    marginBottom: 20, 
    width: 40, 
    height: 40, 
    justifyContent: 'center' 
  },
  header: { 
    fontSize: 34, 
    color: COLORS.primary, 
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', 
    marginBottom: 5 
  },
  subHeader: { 
    fontSize: 16, 
    color: COLORS.gray, 
    marginBottom: 35 
  },

  // Input Styling
  inputGroup: { 
    marginBottom: 5 
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.8
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: '#F0EBE5',
    shadowColor: "#3E2723",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },

  // Button Styling
  button: {
    backgroundColor: COLORS.primary, 
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#3E2723",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});