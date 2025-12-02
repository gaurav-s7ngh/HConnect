import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/theme';

const { height } = Dimensions.get('window');

// Data
const UNIVERSITIES = [
  { id: 'ipu', name: 'GGSIPU (IPU)', colleges: ['MSI Janakpuri', 'MAIT', 'VIPS', 'USICT'] },
  { id: 'du', name: 'Delhi University', colleges: ['Miranda House', 'Hindu College', 'Hansraj'] },
  { id: 'amity', name: 'Amity University', colleges: ['Amity Noida', 'Amity Gurgaon'] }
];
const DEPARTMENTS = ['B.Tech CSE', 'B.Tech IT', 'BCA', 'BBA', 'Psychology', 'Law', 'MBBS'];

export default function DetailsScreen() {
  const router = useRouter();
  
  // State
  const [fullName, setFullName] = useState('');
  const [selectedUni, setSelectedUni] = useState<{id: string, name: string, colleges: string[]} | null>(null);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  
  // Modal State: Explicitly typed to avoid errors
  const [modalType, setModalType] = useState<'UNI' | 'COLLEGE' | 'DEPT' | null>(null);

  const isFormValid = fullName.length > 2 && selectedUni && selectedCollege && selectedDept;

  const handleSelection = (item: any) => {
    Haptics.selectionAsync();
    if (modalType === 'UNI') {
      setSelectedUni(item);
      setSelectedCollege(''); 
    } else if (modalType === 'COLLEGE') {
      setSelectedCollege(item);
    } else {
      setSelectedDept(item);
    }
    setModalType(null);
  };

  const renderModal = () => {
    let data: any[] = [];
    if (modalType === 'UNI') data = UNIVERSITIES;
    else if (modalType === 'COLLEGE') data = selectedUni?.colleges || [];
    else if (modalType === 'DEPT') data = DEPARTMENTS;

    return (
      <Modal visible={!!modalType} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Option</Text>
              <TouchableOpacity onPress={() => setModalType(null)}>
                <Ionicons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <FlatList 
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelection(item)}>
                  <Text style={styles.modalItemText}>{typeof item === 'string' ? item : item.name}</Text>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          {renderModal()}
          
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.header}>Academic Profile</Text>
          <Text style={styles.subHeader}>We verify real students only.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. Aryan Gupta" 
              placeholderTextColor={COLORS.gray}
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>UNIVERSITY</Text>
            <TouchableOpacity style={styles.selector} onPress={() => setModalType('UNI')}>
              <Text style={styles.selectorText}>{selectedUni ? selectedUni.name : "Select University"}</Text>
              <Ionicons name="caret-down" size={14} color={COLORS.primary} />
            </TouchableOpacity>

            <Text style={styles.label}>COLLEGE</Text>
            <TouchableOpacity 
              style={[styles.selector, !selectedUni && { opacity: 0.5 }]} 
              disabled={!selectedUni}
              onPress={() => setModalType('COLLEGE')}
            >
              <Text style={styles.selectorText}>{selectedCollege || "Select College"}</Text>
              <Ionicons name="caret-down" size={14} color={COLORS.primary} />
            </TouchableOpacity>

            <Text style={styles.label}>MAJOR</Text>
            <TouchableOpacity style={styles.selector} onPress={() => setModalType('DEPT')}>
              <Text style={styles.selectorText}>{selectedDept || "Select Major"}</Text>
              <Ionicons name="caret-down" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.btn, !isFormValid && { opacity: 0.5 }]} 
            disabled={!isFormValid}
            onPress={() => router.push('/onboarding/verification')}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 24, paddingBottom: 50 },
  backBtn: { marginBottom: 20 },
  header: { fontSize: 32, fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif', color: COLORS.primary, fontWeight: 'bold' },
  subHeader: { fontSize: 16, color: COLORS.gray, marginBottom: 30 },
  form: { marginBottom: 30 },
  label: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8, letterSpacing: 1 },
  input: { backgroundColor: COLORS.white, padding: 16, borderRadius: 12, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  selector: { backgroundColor: COLORS.white, padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectorText: { fontSize: 16, color: COLORS.primary },
  btn: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 16, alignItems: 'center', shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: {width: 0, height: 5} },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: height * 0.7 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  modalItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between' },
  modalItemText: { fontSize: 16, color: COLORS.primary }
});