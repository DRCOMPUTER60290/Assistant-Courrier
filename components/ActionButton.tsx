import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ActionButtonProps {
  title: string;
  icon?: LucideIcon;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function ActionButton({
  title,
  icon: Icon,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ActionButtonProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        content: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        icon: { marginRight: 8 },
        text: {
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
        },
        primary: { backgroundColor: colors.primary },
        secondary: { backgroundColor: colors.success },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        },
        small: { paddingVertical: 8, paddingHorizontal: 16 },
        medium: { paddingVertical: 12, paddingHorizontal: 24 },
        large: { paddingVertical: 16, paddingHorizontal: 32 },
        primaryText: { color: colors.card },
        secondaryText: { color: colors.card },
        outlineText: { color: colors.primary },
        smallText: { fontSize: 14 },
        mediumText: { fontSize: 16 },
        largeText: { fontSize: 18 },
        disabled: {
          backgroundColor: colors.surfaceLight,
          borderColor: colors.border,
        },
        disabledText: { color: colors.textMuted },
      }),
    [colors]
  );

  const buttonStyles = [styles.button, styles[variant], styles[size], disabled && styles.disabled];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {Icon && (
          <Icon
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            color={
              disabled
                ? colors.textMuted
                : variant === 'primary' || variant === 'secondary'
                ? colors.card
                : colors.primary
            }
            style={styles.icon}
          />
        )}
        <Text style={textStyles}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
