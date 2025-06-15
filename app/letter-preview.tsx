import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import { FileText } from 'lucide-react-native';

export default function LetterPreviewScreen() {
  const { content } = useLocalSearchParams<{ content?: string }>();

  return (
    <View style={styles.container}>
      <Header title="Prévisualisation" subtitle="Aperçu du courrier généré" />

      {!content ? (
        <EmptyState
          icon={FileText}
          title="Aucun contenu"
          description="Le contenu du courrier est manquant."
        />
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.letterText}>{content}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  letterText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1f2937',
    lineHeight: 24,
  },
});
