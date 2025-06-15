import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface FormDatePickerProps {
  label: string;
  value: string;
  onDateChange: (date: string) => void;
  required?: boolean;
}

export default function FormDatePicker({ label, value, onDateChange, required }: FormDatePickerProps) {
  const [isVisible, setIsVisible] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR');
  };

  const handleDateSelect = () => {
    // Pour la démo, on utilise la date actuelle + 30 jours
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    onDateChange(formatDate(futureDate));
    setIsVisible(false);
  };

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
        dateSelector: {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.borderAlt,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        dateText: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          color: colors.textPrimary,
        },
        placeholder: { color: colors.textMuted },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <TouchableOpacity style={styles.dateSelector} onPress={handleDateSelect}>
        <Text style={[styles.dateText, !value && styles.placeholder]}>
          {value || 'Sélectionner une date...'}
        </Text>
        <Calendar size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}
