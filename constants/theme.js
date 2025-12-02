
// 1. The Luxury Palette (Ingredients)
const PALETTE = {
  cream: '#F9F7F2',        // Warm Alabaster
  deepEspresso: '#3E2723', // Dark Brown text
  softTaupe: '#D7CCC8',    // Accents
  nightBlack: '#14110F',   // Warm Charcoal
  ivory: '#F0EAE2',        // Readable text for Dark Mode
  charcoal: '#2C2420',     // Dark container
  gray: '#9E9E9E',
  white: '#FFFFFF',
  error: '#D32F2F',
};

// 2. The Export that Fixes "Property does not exist" errors
// We map the "Luxury" colors to the standard names your components use.
export const COLORS = {
  background: PALETTE.cream,
  primary: PALETTE.deepEspresso,
  secondary: PALETTE.softTaupe,
  white: PALETTE.white,
  gray: PALETTE.gray,
  error: PALETTE.error,
  border: '#E0E0E0',
  // Dark mode specific fallback
  darkBackground: PALETTE.nightBlack,
  darkText: PALETTE.ivory,
};

// 3. Dynamic Themes for the Hook
export const THEMES = {
  light: {
    background: PALETTE.cream,
    text: PALETTE.deepEspresso,
    textSub: 'rgba(62, 39, 35, 0.6)',
    card: PALETTE.white,
    border: '#E0E0E0',
    icon: PALETTE.deepEspresso,
    primary: PALETTE.deepEspresso,
  },
  dark: {
    background: PALETTE.nightBlack,
    text: PALETTE.ivory,
    textSub: 'rgba(240, 234, 226, 0.6)',
    card: PALETTE.charcoal,
    border: '#443D39',
    icon: PALETTE.ivory,
    primary: PALETTE.ivory,
  },
};