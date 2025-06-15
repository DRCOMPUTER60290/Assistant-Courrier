import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import ActionButton from '@/components/ActionButton';
import { useTheme } from '@/contexts/ThemeContext';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon, 
  title, 
  description, 
  actionTitle, 
  onAction 
}: EmptyStateProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 40,
          paddingVertical: 60,
        },
        iconContainer: { marginBottom: 24 },
        title: {
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
          color: colors.textPrimary,
          textAlign: 'center',
          marginBottom: 12,
        },
        description: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          color: colors.textSecondary,
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 32,
        },
        action: { width: '100%' },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={64} color={colors.borderAlt} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      {actionTitle && onAction && (
        <View style={styles.action}>
          <ActionButton
            title={actionTitle}
            onPress={onAction}
            variant="outline"
            size="medium"
          />
        </View>
      )}
    </View>
  );
}
