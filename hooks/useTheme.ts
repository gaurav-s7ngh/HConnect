import { useColorScheme } from 'react-native';
import { THEMES } from '../constants/theme';

export function useTheme() {
  const scheme = useColorScheme(); // 'light' or 'dark'
  
  // Default to light if undefined, or strictly use 'dark' if detected
  const currentTheme = scheme === 'dark' ? THEMES.dark : THEMES.light;
  
  return {
    colors: currentTheme,
    isDark: scheme === 'dark',
  };
}