import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import Header from '@/components/Header';
import LetterCard from '@/components/LetterCard';
import EmptyState from '@/components/EmptyState';
import { Letter } from '@/types/letter';
import { letterService } from '@/services/letterService';
import { FileText } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import AdBanner from '@/components/AdBanner';

export default function HistoryScreen() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        content: { flex: 1, paddingHorizontal: 20 },
        lettersList: { paddingTop: 20, paddingBottom: 32, gap: 16 },
      }),
    [colors]
  );

  const loadLetters = async () => {
    try {
      const userLetters = await letterService.getLetters();
      setLetters(userLetters);
    } catch (error) {
      console.error('Erreur chargement courriers:', error);
      Alert.alert('Erreur', 'Impossible de charger l\'historique');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLetters();
    setRefreshing(false);
  };

  const handleDeleteLetter = async (letterId: string) => {
    Alert.alert(
      'Supprimer le courrier',
      'Êtes-vous sûr de vouloir supprimer ce courrier ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await letterService.deleteLetter(letterId);
              setLetters(prev => prev.filter(letter => letter.id !== letterId));
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer le courrier');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadLetters();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Historique" subtitle="Vos courriers générés" />
        <View style={styles.content} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Historique" 
        subtitle={`${letters.length} courrier${letters.length > 1 ? 's' : ''} généré${letters.length > 1 ? 's' : ''}`}
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {letters.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Aucun courrier"
            description="Vous n'avez pas encore généré de courrier. Commencez par créer votre premier courrier !"
            actionTitle="Créer un courrier"
            onAction={() => {/* Navigation vers create */}}
          />
        ) : (
          <View style={styles.lettersList}>
            {letters.map((letter) => (
              <LetterCard
                key={letter.id}
                letter={letter}
                onDelete={() => handleDeleteLetter(letter.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <AdBanner />
    </View>
  );
}
