import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';

export default function ContactScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleContact = async () => {
    try {
      const available = await MailComposer.isAvailableAsync();
      if (!available) {
        Alert.alert('Erreur', "Aucune application de messagerie n'est disponible");
        return;
      }
      await MailComposer.composeAsync({
        recipients: ['support@example.com'],
        subject: 'Assistance Assistant Courrier',
      });
    } catch (error) {
      console.error('Contact error', error);
      Alert.alert('Erreur', "Impossible d'ouvrir l'application de messagerie");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Nous contacter"
        subtitle="Support technique et questions"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={20} color="#3b82f6" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Card style={styles.textCard}>
          <Text style={styles.paragraph}>
            Si vous rencontrez un problème ou avez une question, vous pouvez nous envoyer un email.
          </Text>
          <Button title="Envoyer un email" onPress={handleContact} style={{ marginTop: 16 }} />
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
