import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileX, TriangleAlert as AlertTriangle, Briefcase, Scale, Heart, Chrome as Home, Car, CreditCard } from 'lucide-react-native';

const letterTypes = [
  {
    id: 'resiliation',
    title: 'Résiliation',
    description: 'Résilier un contrat, abonnement ou service',
    icon: FileX,
    color: '#ef4444',
  },
  {
    id: 'reclamation',
    title: 'Réclamation',
    description: 'Exprimer un mécontentement ou demander réparation',
    icon: AlertTriangle,
    color: '#f97316',
  },
  {
    id: 'candidature',
    title: 'Candidature',
    description: 'Postuler pour un emploi ou une formation',
    icon: Briefcase,
    color: '#22c55e',
  },
  {
    id: 'contestation',
    title: 'Contestation',
    description: 'Contester une décision ou une amende',
    icon: Scale,
    color: '#8b5cf6',
  },
  {
    id: 'medical',
    title: 'Médical',
    description: 'Courriers liés à la santé et assurance',
    icon: Heart,
    color: '#ec4899',
  },
  {
    id: 'immobilier',
    title: 'Immobilier',
    description: 'Location, achat, vente de biens',
    icon: Home,
    color: '#06b6d4',
  },
  {
    id: 'automobile',
    title: 'Automobile',
    description: 'Assurance auto, sinistres, achats',
    icon: Car,
    color: '#84cc16',
  },
  {
    id: 'financier',
    title: 'Financier',
    description: 'Banque, crédit, litiges financiers',
    icon: CreditCard,
    color: '#f59e0b',
  },
];

export default function CreateLetterScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      router.push({
        pathname: '/create/recipient',
        params: { letterType: selectedType }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Nouveau Courrier" 
        subtitle="Créez votre courrier en quelques étapes"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.introCard}>
          <Text style={styles.introTitle}>Quel type de courrier souhaitez-vous créer ?</Text>
          <Text style={styles.introText}>
            Sélectionnez le type de courrier qui correspond à votre besoin. 
            Nous vous guiderons ensuite étape par étape.
          </Text>
        </Card>

        <View style={styles.typesGrid}>
          {letterTypes.map((type) => {
            const IconComponent = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  isSelected && styles.typeCardSelected
                ]}
                onPress={() => handleTypeSelection(type.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${type.color}15` }]}>
                  <IconComponent size={24} color={type.color} />
                </View>
                <Text style={[styles.typeTitle, isSelected && styles.typeTitleSelected]}>
                  {type.title}
                </Text>
                <Text style={[styles.typeDescription, isSelected && styles.typeDescriptionSelected]}>
                  {type.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedType && (
          <Card style={styles.actionCard}>
            <Button
              title="Continuer"
              onPress={handleContinue}
              size="large"
            />
            <Text style={styles.nextStepText}>
              Prochaine étape : Saisie des coordonnées du destinataire
            </Text>
          </Card>
        )}

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
  introCard: {
    marginTop: 20,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 24,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  typeCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  typeCardSelected: {
    borderColor: '#1e3a8a',
    backgroundColor: '#f0f9ff',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  typeTitleSelected: {
    color: '#1e3a8a',
  },
  typeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  typeDescriptionSelected: {
    color: '#3b82f6',
  },
  actionCard: {
    marginTop: 24,
    alignItems: 'center',
  },
  nextStepText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 12,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});