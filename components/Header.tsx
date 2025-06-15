import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function Header({ title, subtitle, showBack }: HeaderProps) {
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
        titleRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
        },
        backButton: {
          marginRight: 8,
          padding: 4,
        },
        title: {
          fontSize: 28,
          fontFamily: 'Roboto-Bold',
          color: colors.card,
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

  const shouldShowBack = showBack || router.canGoBack();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          {shouldShowBack && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}
