import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
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
  const [tempDate, setTempDate] = useState<Date>(
    value ? parseDate(value) : new Date()
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR');
  };

  function parseDate(dateStr: string) {
    const parts = dateStr.split('/');
    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);
    return new Date(year, month, day);
  }

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setIsVisible(false);
      if (selectedDate) {
        onDateChange(formatDate(selectedDate));
        setTempDate(selectedDate);
      }
    } else if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const confirmIOSDate = () => {
    onDateChange(formatDate(tempDate));
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
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        },
        modalContainer: {
          backgroundColor: colors.card,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        },
        confirmButton: {
          marginTop: 10,
          alignSelf: 'flex-end',
        },
        confirmText: {
          fontSize: 16,
          fontFamily: 'Roboto-Medium',
          color: colors.primary,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <TouchableOpacity style={styles.dateSelector} onPress={() => setIsVisible(true)}>
        <Text style={[styles.dateText, !value && styles.placeholder]}>
          {value || 'Sélectionner une date...'}
        </Text>
        <Calendar size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {isVisible && (
        Platform.OS === 'ios' ? (
          <Modal
            transparent
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setIsVisible(false)}
            >
              <View style={styles.modalContainer}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={handleChange}
                  locale="fr-FR"
                />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmIOSDate}
                >
                  <Text style={styles.confirmText}>Valider</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        ) : (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={handleChange}
            locale="fr-FR"
          />
        )
      )}
    </View>
  );
}
