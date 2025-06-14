import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
            Nous attachons une grande importance à la protection de vos données.
            Cette charte explique comment l'application Assistant Courrier
            collecte, utilise et sécurise vos informations personnelles.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>Données collectées : </Text>
            votre profil (nom, coordonnées etc.) ainsi que l'historique des
            courriers sont enregistrés uniquement sur votre appareil. Les textes
            transmis pour la génération de courriers sont envoyés de manière
            sécurisée au service OpenAI.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>Utilisation : </Text>
            ces informations servent uniquement à personnaliser vos documents et
            à vous permettre de retrouver vos courriers. Elles ne sont jamais
            partagées avec des tiers sans votre accord explicite.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>
              Conservation et sécurité :{' '}
            </Text>
            toutes les données sont stockées localement via AsyncStorage et ne
            quittent pas votre téléphone. Les communications réseau utilisent le
            protocole HTTPS afin de garantir leur confidentialité.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>Vos droits : </Text>
            vous pouvez effacer votre historique ou modifier vos informations à
            tout moment depuis les paramètres. La suppression de l'application
            entraîne la disparition définitive de ces données locales.
          </Text>
          <Text style={styles.paragraph}>
            Pour toute question relative à la confidentialité, vous pouvez nous
            contacter à l'adresse support@example.com.
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
