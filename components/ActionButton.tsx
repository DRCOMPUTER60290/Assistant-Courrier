import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

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
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
  ];

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
                ? '#9ca3af'
                : variant === 'primary'
                ? '#ffffff'
                : variant === 'secondary'
                ? '#ffffff'
                : '#1e40af'
            }
            style={styles.icon}
          />
        )}
        <Text style={textStyles}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  // Variants
  primary: {
    backgroundColor: '#1e40af',
  },
  secondary: {
    backgroundColor: '#10b981',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  // Text variants
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#1e40af',
  },
  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Disabled states
  disabled: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  disabledText: {
    color: '#9ca3af',
  },
});