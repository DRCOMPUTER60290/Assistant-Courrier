import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AdsContextValue {
  adsRemoved: boolean;
  removeAds: () => Promise<void>;
  restoreAds: () => Promise<void>;
}

const AdsContext = createContext<AdsContextValue | undefined>(undefined);

const STORAGE_KEY = 'adsRemoved';

export function AdsProvider({ children }: { children: ReactNode }) {
  const [adsRemoved, setAdsRemoved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(value => {
      if (value === 'true') {
        setAdsRemoved(true);
      }
    });
  }, []);

  const removeAds = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    setAdsRemoved(true);
  };

  const restoreAds = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setAdsRemoved(false);
  };

  return (
    <AdsContext.Provider value={{ adsRemoved, removeAds, restoreAds }}>
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
}
