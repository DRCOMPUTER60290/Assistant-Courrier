import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function RateScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleRate = async () => {
    try {
      const url = 'https://example.com/rate';
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erreur', "Impossible d'ouvrir le lien de notation");
      }
    } catch (error) {
      console.error('Rate error', error);
      Alert.alert('Erreur', "Impossible d'ouvrir le lien de notation");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Noter l'application"
        subtitle="Votre avis nous aide à nous améliorer"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={20} color="#3b82f6" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Card style={styles.textCard}>
          <Text style={styles.paragraph}>
            Nous serions ravis de connaître votre opinion. N'hésitez pas à noter l'application sur la boutique.
          </Text>
          <Button title="Noter l'application" onPress={handleRate} style={{ marginTop: 16 }} />
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
    marginLeft: 8,
  },
  textCard: {
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 40,
  },
});
