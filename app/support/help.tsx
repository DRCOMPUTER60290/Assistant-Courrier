import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Header title="Centre d'aide" subtitle="FAQ et guides" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Text style={styles.text}>Bienvenue dans le centre d'aide. Vous trouverez ici les réponses aux questions fréquentes et des conseils pour utiliser l'application.</Text>
        </Card>
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
    paddingTop: 20,
  },
  card: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
});
