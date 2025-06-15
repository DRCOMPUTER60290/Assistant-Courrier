import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LetterType } from '@/types/letter';
import { LETTER_TYPES } from '@/constants/letterTypes';
import * as Icons from 'lucide-react-native';

interface LetterTypeSelectorProps {
  selectedType: LetterType | null;
  onSelectType: (type: LetterType) => void;
}

export default function LetterTypeSelector({ selectedType, onSelectType }: LetterTypeSelectorProps) {
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  scrollContainer: {
    marginHorizontal: -4,
  },
  typeGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    gap: 12,
  },
  typeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: 180,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCard: {
    backgroundColor: '#f0f9ff',
    borderColor: '#1e40af',
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
  typeContent: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  typeDescription: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: '#64748b',
    lineHeight: 18,
  },
  selectedText: {
    color: '#1e40af',
  },
  selectedDescription: {
    color: '#1e40af',
    opacity: 0.8,
  },
});