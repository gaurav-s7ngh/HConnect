import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/theme';

export default function PhotoUploadScreen() {
  const router = useRouter();
  
  // Explicitly allowing nulls
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null]);
  const [captions, setCaptions] = useState<string[]>(['', '', '', '']);

  const pickImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      setPhotos(newPhotos);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const isComplete = photos.filter(p => p !== null).length >= 2;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>The Visuals</Text>
        <Text style={styles.subHeader}>Add at least 2 photos.</Text>

        <View style={styles.grid}>
          {photos.map((uri, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity style={styles.photoBox} onPress={() => pickImage(index)}>
                {uri ? (
                  <Image source={{ uri }} style={styles.img} />
                ) : (
                  <Ionicons name="add" size={30} color={COLORS.primary} style={{opacity: 0.5}} />
                )}
              </TouchableOpacity>
              <TextInput 
                style={styles.caption} 
                placeholder="Caption..." 
                placeholderTextColor={COLORS.gray}
                value={captions[index]}
                onChangeText={(text) => {
                  const newCaps = [...captions];
                  newCaps[index] = text;
                  setCaptions(newCaps);
                }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.btn, !isComplete && { opacity: 0.5 }]} 
          disabled={!isComplete}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.btnText}>Finish Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 24, paddingBottom: 50 },
  header: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', color: COLORS.primary, marginTop: 20 },
  subHeader: { fontSize: 16, color: COLORS.gray, marginBottom: 30 },
  grid: { gap: 20 },
  card: { marginBottom: 10 },
  photoBox: { width: '100%', height: 350, backgroundColor: '#EBE6DE', borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },
  caption: { marginTop: 10, fontSize: 14, color: COLORS.primary, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  btn: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});