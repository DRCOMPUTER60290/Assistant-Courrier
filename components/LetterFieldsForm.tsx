import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LetterType } from '@/types/letter';
import { LETTER_TYPES } from '@/constants/letterTypes';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import FormDatePicker from '@/components/FormDatePicker';

interface LetterFieldsFormProps {
  letterType: LetterType;
  values: Record<string, any>;
  onUpdateValues: (values: Record<string, any>) => void;
}

export default function LetterFieldsForm({ letterType, values, onUpdateValues }: LetterFieldsFormProps) {
  const letterTypeInfo = LETTER_TYPES.find(type => type.type === letterType);
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 8 },
        title: {
          fontSize: 18,
          fontFamily: 'Roboto-Bold',
          color: colors.textPrimary,
          marginBottom: 16,
        },
        form: { gap: 16 },
      }),
    [colors]
  );
  
  if (!letterTypeInfo) return null;

  const updateField = (key: string, value: any) => {
    onUpdateValues({
      ...values,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations spécifiques</Text>
      
      <View style={styles.form}>
        {letterTypeInfo.fields.map((field) => {
          const value = values[field.key] || '';
          
          switch (field.type) {
            case 'text':
              return (
                <FormInput
                  key={field.key}
                  label={field.label}
                  value={value}
                  onChangeText={(text) => updateField(field.key, text)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              );
              
            case 'textarea':
              return (
                <FormInput
                  key={field.key}
                  label={field.label}
                  value={value}
                  onChangeText={(text) => updateField(field.key, text)}
                  placeholder={field.placeholder}
                  required={field.required}
                  multiline
                  numberOfLines={4}
                />
              );
              
            case 'select':
              return (
                <FormSelect
                  key={field.key}
                  label={field.label}
                  value={value}
                  onValueChange={(selectedValue) => updateField(field.key, selectedValue)}
                  options={field.options || []}
                  required={field.required}
                />
              );
              
            case 'date':
              return (
                <FormDatePicker
                  key={field.key}
                  label={field.label}
                  value={value}
                  onDateChange={(date) => updateField(field.key, date)}
                  required={field.required}
                />
              );
              
            default:
              return null;
          }
        })}
      </View>
    </View>
  );
}
