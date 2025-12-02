// app/onboarding/photos.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function PhotoUploadScreen() {
  const router = useRouter();
  const photoSlots = [1, 2, 3, 4]; // Creates 4 upload slots
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.header}>Add 4 Photos</Text>
        <Text style={styles.subHeader}>Add a caption to give your profile more personality.</Text>
        
        {photoSlots.map((item) => (
          <View key={item} style={styles.photoCard}>
            {/* The Photo Placeholder Box */}
            <TouchableOpacity style={styles.photoBox}>
              <Ionicons name="add" size={40} color={COLORS.primary} />
              <Text style={styles.uploadText}>Upload Photo {item}</Text>
            </TouchableOpacity>
            
            {/* The Caption Input */}
            <TextInput 
              placeholder="Write a caption... (e.g. 'Me at the fest')" 
              placeholderTextColor={COLORS.gray}
              style={styles.captionInput} 
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>Complete Profile</Text>
        </TouchableOpacity>
        
        {/* Bottom Spacer */}
        <View style={{height: 50}} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    marginTop: 10 
  },
  subHeader: { 
    fontSize: 15, 
    color: '#555', 
    marginBottom: 25, 
    marginTop: 8,
    lineHeight: 22
  },
  
  // Card Styles
  photoCard: { 
    backgroundColor: COLORS.white, 
    padding: 12, 
    borderRadius: 16, 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoBox: { 
    height: 220, 
    backgroundColor: COLORS.secondary, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  uploadText: {
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: '600'
  },
  captionInput: { 
    padding: 12, 
    marginTop: 8, 
    fontSize: 15,
    color: COLORS.primary,
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE' 
  },

  // Button Styles
  button: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});