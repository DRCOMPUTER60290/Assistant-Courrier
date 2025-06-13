import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PrivacyScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Confidentialité et sécurité"
        subtitle="Gestion des données personnelles"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={20} color="#3b82f6" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Card style={styles.textCard}>
          <Text style={styles.paragraph}>
            Cette section décrit comment vos données personnelles sont collectées
            et utilisées par l'application. Vous pouvez détailler ici votre
            politique de confidentialité et les mesures de sécurité mises en
            place pour protéger vos informations.
          </Text>
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
