import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Default to Elegancia Nocturna theme (single theme system)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    // Keep as single theme but maintain toggle for component compatibility
    setIsDarkMode(true);
  };

  const theme = {
    isDarkMode: true, // Always true for Elegancia Nocturna
    toggleTheme,
    colors: {
      // Elegancia Nocturna - Luxury dark theme with gold accents
      primary: 'elegancia-primary',
      primaryLight: 'elegancia-primary-light',
      primaryDark: 'elegancia-primary-dark',
      primaryHover: 'elegancia-primary-hover',
      primaryGradient: 'from-elegancia-primary to-elegancia-primary-dark',
      primaryGradientHover: 'from-elegancia-primary-light to-elegancia-primary',
      background: 'bg-elegancia-dark',
      card: 'bg-elegancia-surface',
      text: 'text-elegancia-text-primary',
      textSecondary: 'text-elegancia-text-secondary',
      textAccent: 'text-elegancia-primary',
      border: 'border-elegancia-primary',
      borderLight: 'border-elegancia-border-secondary',
      button: 'bg-elegancia-primary hover:bg-white hover:text-elegancia-dark',
      buttonSecondary: 'bg-transparent text-elegancia-primary border-elegancia-primary hover:bg-elegancia-primary hover:text-elegancia-dark',
      animatedBg: 'elegancia-animated-bg',
      overlay: 'bg-elegancia-surface',
      shadow: 'shadow-elegancia',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 