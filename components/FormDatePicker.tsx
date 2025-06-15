import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';

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
        <Calendar size={20} color="#6b7280" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  dateSelector: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
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
    color: '#1f2937',
  },
  placeholder: {
    color: '#9ca3af',
  },
});