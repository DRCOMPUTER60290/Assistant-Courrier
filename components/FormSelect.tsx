import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface FormSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  required?: boolean;
}

export default function FormSelect({ label, value, onValueChange, options, required }: FormSelectProps) {
  const [isVisible, setIsVisible] = useState(false);
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
        selector: {
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
        selectorText: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          color: colors.textPrimary,
        },
        placeholder: { color: colors.textMuted },
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        },
        modal: {
          backgroundColor: colors.card,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '50%',
        },
        modalHeader: {
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        modalTitle: {
          fontSize: 18,
          fontFamily: 'Roboto-Bold',
          color: colors.textPrimary,
          textAlign: 'center',
        },
        optionsList: { maxHeight: 300 },
        option: {
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.surfaceMuted,
        },
        optionText: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          color: colors.textPrimary,
        },
      }),
    [colors]
  );

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <TouchableOpacity style={styles.selector} onPress={() => setIsVisible(true)}>
        <Text style={[styles.selectorText, !value && styles.placeholder]}>
          {value || 'Sélectionner...'}
        </Text>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
            </View>
            <ScrollView style={styles.optionsList}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {value === option && (
                    <Check size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
