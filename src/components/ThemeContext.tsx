import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType, ThemeProviderProps } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Toggle between dark and light mode
  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  // Colors for dark and light modes
  const darkModeColors = {
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
  };

  const lightModeColors = {
    primary: 'amber-500',
    primaryLight: 'amber-400',
    primaryDark: 'amber-600',
    primaryHover: 'amber-700',
    primaryGradient: 'from-amber-500 to-amber-600',
    primaryGradientHover: 'from-amber-400 to-amber-500',
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    textAccent: 'text-amber-500',
    border: 'border-amber-500',
    borderLight: 'border-gray-300',
    button: 'bg-amber-500 hover:bg-amber-600 hover:text-white',
    buttonSecondary: 'bg-transparent text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-white',
    animatedBg: 'light-animated-bg',
    overlay: 'bg-white',
    shadow: 'shadow-md',
  };

  const theme: ThemeContextType = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? darkModeColors : lightModeColors,
  };

  // Update body styles based on theme
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.style.backgroundColor = '#0A0A0A';
      body.style.color = '#FFFFFF';
    } else {
      body.style.backgroundColor = '#f8fafc';
      body.style.color = '#1e293b';
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 