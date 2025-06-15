import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lightTheme = {
  mode: 'light' as const,
  background: '#ffffff',
  text: '#1f2937',
  card: '#f8fafc',
  border: '#e2e8f0',
};

export const darkTheme = {
  mode: 'dark' as const,
  background: '#0f172a',
  text: '#f8fafc',
  card: '#1e293b',
  border: '#334155',
};

type Theme = typeof lightTheme;

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  toggleTheme: () => {},
});

const STORAGE_KEY = 'app-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(
    systemScheme === 'dark' ? darkTheme : lightTheme
  );

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === 'dark') {
        setTheme(darkTheme);
      } else if (stored === 'light') {
        setTheme(lightTheme);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem(STORAGE_KEY, newTheme.mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeContext };
