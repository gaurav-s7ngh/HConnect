// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// Only import COLORS
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.background, elevation: 0, shadowOpacity: 0 },
        headerTitleStyle: { color: COLORS.primary, fontWeight: 'bold', fontSize: 22 },
        headerTitle: "CampusConnect",
        
        // Top Right User Profile Button
        headerRight: () => (
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        ),
        
        // Footer Styles
        tabBarStyle: {
          backgroundColor: COLORS.primary, // #1e2d4c (Navy)
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: COLORS.secondary, // #cecobb (Beige)
        tabBarInactiveTintColor: '#889eb5',      // Muted Blue/Grey for inactive
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Ionicons name="copy" size={24} color={color} />,
        }}
      />
      
      {/* The Specific University Filter Button */}
      <Tabs.Screen
        name="filter"
        options={{
          title: 'Campus',
          tabBarIcon: ({ color, size }) => <Ionicons name="school" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="likes"
        options={{
          title: 'Likes',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileButton: { marginRight: 20 },
  profileIcon: { 
    width: 35, 
    height: 35, 
    borderRadius: 17.5, 
    backgroundColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.white 
  }
});