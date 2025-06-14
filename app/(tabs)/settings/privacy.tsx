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
  Cette charte explique comment l'application Assistant Courrier,
  développée par Drcomputer60290, collecte, utilise et sécurise vos
  informations personnelles.
</Text>

<Text style={styles.paragraph}>
  <Text style={{ fontWeight: 'bold' }}>Données collectées : </Text>
  Les données suivantes peuvent être enregistrées uniquement sur votre appareil :
  vos informations de profil (nom, prénom, adresse email, téléphone),
  l’historique des courriers générés et les textes transmis pour génération
  via l’IA. Ces textes sont envoyés de manière sécurisée à OpenAI.
</Text>

<Text style={styles.paragraph}>
  <Text style={{ fontWeight: 'bold' }}>Utilisation des données : </Text>
  Ces données servent uniquement à personnaliser vos courriers et à
  vous permettre de les retrouver facilement. Elles ne sont jamais partagées
  avec des tiers sans votre accord explicite.
</Text>

<Text style={styles.paragraph}>
  <Text style={{ fontWeight: 'bold' }}>Stockage et sécurité : </Text>
  Toutes les données sont stockées localement sur votre téléphone à l'aide
  de AsyncStorage. Aucune information n'est envoyée à nos serveurs.
  Les échanges avec le service OpenAI utilisent le protocole HTTPS pour
  garantir la sécurité et la confidentialité de vos données.
</Text>

<Text style={styles.paragraph}>
  <Text style={{ fontWeight: 'bold' }}>Vos droits : </Text>
  Vous pouvez à tout moment modifier vos informations ou effacer votre
  historique depuis l’onglet Profil. La suppression de l’application entraîne
  l’effacement définitif de toutes les données locales.
</Text>

<Text style={styles.paragraph}>
  <Text style={{ fontWeight: 'bold' }}>Responsable de l'application : </Text>
  Drcomputer60290 – M. Albert Benjamin, 81 rue René Cassin, France.
</Text>

<Text style={styles.paragraph}>
  <Text style={{ fontWeight: 'bold' }}>Contact : </Text>
  Pour toute question relative à la confidentialité, vous pouvez nous contacter
  par email à webmaster@drcomputer60290.fr ou par téléphone au 07 86 99 08 35.
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
