import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LetterType } from '@/types/letter';
import { LETTER_TYPES } from '@/constants/letterTypes';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface LetterTypeSelectorProps {
  selectedType: LetterType | null;
  onSelectType: (type: LetterType) => void;
}

export default function LetterTypeSelector({ selectedType, onSelectType }: LetterTypeSelectorProps) {
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
        scrollContainer: { marginHorizontal: -4 },
        typeGrid: { flexDirection: 'row', paddingHorizontal: 4, gap: 12 },
        typeCard: {
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 16,
          width: 180,
          borderLeftWidth: 4,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
        selectedCard: {
          backgroundColor: colors.highlight,
          borderColor: colors.primary,
          borderWidth: 2,
          borderLeftWidth: 4,
        },
        iconContainer: {
          width: 48,
          height: 48,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        },
        typeContent: { flex: 1 },
        typeTitle: {
          fontSize: 16,
          fontFamily: 'Roboto-Bold',
          color: colors.textPrimary,
          marginBottom: 6,
        },
        typeDescription: {
          fontSize: 13,
          fontFamily: 'Roboto-Regular',
          color: '#64748b',
          lineHeight: 18,
        },
        selectedText: { color: colors.primary },
        selectedDescription: { color: colors.primary, opacity: 0.8 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type de courrier</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.typeGrid}>
          {LETTER_TYPES.map((letterType) => {
            const isSelected = selectedType === letterType.type;
            const IconComponent = (Icons as any)[letterType.icon] || Icons.FileText;
            
            return (
              <TouchableOpacity
                key={letterType.type}
                style={[
                  styles.typeCard,
                  isSelected && styles.selectedCard,
                  { borderLeftColor: letterType.color },
                ]}
                onPress={() => onSelectType(letterType.type)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, { backgroundColor: letterType.color + '20' }]}>
                  <IconComponent size={24} color={letterType.color} />
                </View>
                <View style={styles.typeContent}>
                  <Text style={[styles.typeTitle, isSelected && styles.selectedText]}>
                    {letterType.title}
                  </Text>
                  <Text style={[styles.typeDescription, isSelected && styles.selectedDescription]}>
                    {letterType.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
