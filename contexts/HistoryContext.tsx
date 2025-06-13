import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HistoryItem {
  id: string;
  type: string;
  title: string;
  date: string;
  recipient: string;
  content: string;
  status: 'completed' | 'draft';
  rating?: number;
}


interface HistoryContextProps {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextProps>({
  history: [],
  addHistoryItem: () => {},
  clearHistory: () => {},
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('history');
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load history', error);
      }
    };
    loadHistory();
  }, []);

  const persistHistory = async (items: HistoryItem[]) => {
    setHistory(items);
    try {
      await AsyncStorage.setItem('history', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save history', error);
    }
  };

  const addHistoryItem = (item: HistoryItem) => {
    persistHistory([...history, item]);
  };

  const clearHistory = () => {
    persistHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
