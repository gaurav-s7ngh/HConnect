import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/theme.js';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We will build custom headers in each screen
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false, // Minimalist icon-only look
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'rgba(62, 39, 35, 0.4)', // Faded Espresso
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons name={focused ? "sparkles" : "sparkles-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="filter"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.background, // Cream background
    borderTopWidth: 0,
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeIcon: {
    backgroundColor: 'rgba(62, 39, 35, 0.05)', // Subtle highlight for active tab
  }
});