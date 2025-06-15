import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { Appearance } from 'react-native';

export type ThemeName = 'light' | 'dark';

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

const darkColors: Theme = {
  background: '#0f172a',
  card: '#1e293b',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  primary: '#3b82f6',
  success: '#22c55e',
  danger: '#ef4444',
  border: '#334155',
  borderAlt: '#475569',
  highlight: '#1e3a8a',
  surfaceLight: '#1e293b',
  surfaceMuted: '#334155',
  shadow: '#000',
};

interface ThemeContextValue {
  theme: ThemeName;
  colors: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeName>(systemTheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = useMemo(() => (theme === 'dark' ? darkColors : lightColors), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
