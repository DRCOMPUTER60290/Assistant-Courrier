import React, { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  style?: ViewStyle;
}

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength,
  style,
}: FormInputProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 4 },
        label: {
          fontSize: 14,
          fontFamily: 'Roboto-Medium',
          color: colors.label ?? colors.textSecondary,
          marginBottom: 8,
        },
        required: { color: colors.danger },
        input: {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.borderAlt,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          color: colors.textPrimary,
        },
        multilineInput: {
          paddingTop: 12,
          textAlignVertical: 'top',
        },
      }),
    [colors]
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          multiline && { height: Math.max(40, numberOfLines * 20 + 24) },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
      />
    </View>
  );
}
