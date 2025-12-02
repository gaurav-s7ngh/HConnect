// constants/theme.js
export const COLORS = {
  background: '#F9F7F2', // Alabaster (Warm Cream)
  primary: '#3E2723',    // Dark Espresso (Text & Buttons)
  secondary: '#D7CCC8',  // Soft Taupe (Accents)
  surface: '#FFFFFF',    // Pure White for cards
  white: '#FFFFFF',      // <--- ADDED THIS BACK TO FIX THE ERROR
  gray: '#9E9E9E',       // Soft Grey
  border: '#E0E0E0',     // Light borders
  error: '#D32F2F',
  glass: 'rgba(255, 255, 255, 0.85)',
  overlay: 'rgba(0,0,0,0.3)',
};

export const STYLES = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
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
  },
  shadow: {
    shadowColor: "#3E2723",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,1)',
  }
};