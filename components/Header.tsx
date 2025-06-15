import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          backgroundColor: colors.primary,
          paddingBottom: 20,
        },
        content: {
          paddingHorizontal: 20,
          paddingTop: 16,
        },
        title: {
          fontSize: 28,
          fontFamily: 'Roboto-Bold',
          color: colors.card,
          marginBottom: 4,
        },
        subtitle: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          color: '#bfdbfe',
          opacity: 0.9,
        },
      }),
    [colors]
  );

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}
