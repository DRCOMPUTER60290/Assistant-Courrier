import React, { useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoadingOverlay() {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.overlay} pointerEvents="auto">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

