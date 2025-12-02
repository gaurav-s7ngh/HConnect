import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function LikesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Likes Screen Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  text: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold' }
});