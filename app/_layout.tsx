import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        {/* Entry point - will redirect to login */}
        <Stack.Screen name="index" />

        {/* Auth Flow */}
        <Stack.Screen name="auth/login" options={{ animation: 'fade' }} />

        {/* Onboarding Flow */}
        <Stack.Screen name="onboarding/details" />
        <Stack.Screen name="onboarding/verification" />
        <Stack.Screen name="onboarding/photos" />

        {/* Main App (The Tabs) */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            animation: 'fade',
            gestureEnabled: false // Prevents swiping back to login
          }} 
        />
      </Stack>
    </>
  );
}