import React, { createContext, useContext } from 'react';

export type Theme = {
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  success: string;
  danger: string;
  border: string;
  borderAlt: string;
  highlight: string;
  surfaceLight: string;
  surfaceMuted: string;
  shadow: string;
};

const lightColors: Theme = {
  background: '#f8fafc',
  card: '#ffffff',
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  primary: '#1e40af',
  success: '#10b981',
  danger: '#ef4444',
  border: '#e5e7eb',
  borderAlt: '#d1d5db',
  highlight: '#f0f9ff',
  surfaceLight: '#f1f5f9',
  surfaceMuted: '#f3f4f6',
  shadow: '#000',
};

interface ThemeContextValue {
  colors: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({ colors: lightColors });

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeContext.Provider value={{ colors: lightColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

