import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { useAds } from '@/contexts/AdsContext';

export default function AdBanner() {
  const { adsRemoved } = useAds();

  if (adsRemoved) {
    return null;
  }

  return (
    <View>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // ID de test
      />
    </View>
  );
}
