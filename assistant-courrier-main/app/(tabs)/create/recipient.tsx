import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Building, User, Mail, MapPin } from 'lucide-react-native';

interface RecipientData {
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
}

export default function RecipientScreen() {
  const { letterType } = useLocalSearchParams<{ letterType: string }>();
  const [recipientData, setRecipientData] = useState<RecipientData>({
    service: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
  });

  const [errors, setErrors] = useState<Partial<RecipientData>>({});

  const updateField = (field: keyof RecipientData, value: string) => {
    setRecipientData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RecipientData> = {};

    if (!recipientData.service.trim()) {
      newErrors.service = 'Le service est requis';
    }
    if (!recipientData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!recipientData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!recipientData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(recipientData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!recipientData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }
    if (!recipientData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    }
    if (!recipientData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push({
        pathname: '/create/details',
        params: { 
          letterType,
          recipientData: JSON.stringify(recipientData)
        }
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const getLetterTypeTitle = (type: string) => {
    const types: Record<string, string> = {
      resiliation: 'Résiliation',
      reclamation: 'Réclamation',
      candidature: 'Candidature',
      contestation: 'Contestation',
      medical: 'Médical',
      immobilier: 'Immobilier',
      automobile: 'Automobile',
      financier: 'Financier',
    };
    return types[type] || type;
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Destinataire" 
        subtitle={`Courrier de ${getLetterTypeTitle(letterType || '')}`}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={20} color="#3b82f6" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Card style={styles.progressCard}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressStep, styles.progressStepCompleted]}>
              <Text style={styles.progressStepText}>1</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.progressStepActive]}>
              <Text style={styles.progressStepText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <Text style={styles.progressStepText}>4</Text>
            </View>
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Type</Text>
            <Text style={[styles.progressLabel, styles.progressLabelActive]}>Destinataire</Text>
            <Text style={styles.progressLabel}>Détails</Text>
            <Text style={styles.progressLabel}>Aperçu</Text>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <View style={styles.cardHeader}>
            <Building size={24} color="#3b82f6" />
            <Text style={styles.cardTitle}>Coordonnées du destinataire</Text>
          </View>

          <Input
            label="Service / Entreprise"
            value={recipientData.service}
            onChangeText={(text) => updateField('service', text)}
            placeholder="Ex: Service Client Orange"
            error={errors.service}
            required
          />

          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Input
                label="Prénom"
                value={recipientData.firstName}
                onChangeText={(text) => updateField('firstName', text)}
                placeholder="Prénom"
                error={errors.firstName}
                required
              />
            </View>
            <View style={styles.nameField}>
              <Input
                label="Nom"
                value={recipientData.lastName}
                onChangeText={(text) => updateField('lastName', text)}
                placeholder="Nom"
                error={errors.lastName}
                required
              />
            </View>
          </View>

          <Input
            label="Email"
            value={recipientData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="contact@entreprise.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            required
          />

          <Input
            label="Adresse"
            value={recipientData.address}
            onChangeText={(text) => updateField('address', text)}
            placeholder="123 rue de la République"
            error={errors.address}
            required
          />

          <View style={styles.addressRow}>
            <View style={styles.postalField}>
              <Input
                label="Code postal"
                value={recipientData.postalCode}
                onChangeText={(text) => updateField('postalCode', text)}
                placeholder="75001"
                keyboardType="numeric"
                maxLength={5}
                error={errors.postalCode}
                required
              />
            </View>
            <View style={styles.cityField}>
              <Input
                label="Ville"
                value={recipientData.city}
                onChangeText={(text) => updateField('city', text)}
                placeholder="Paris"
                error={errors.city}
                required
              />
            </View>
          </View>
        </Card>

        <Card style={styles.actionCard}>
          <Button
            title="Continuer"
            onPress={handleContinue}
            size="large"
          />
          <Text style={styles.nextStepText}>
            Prochaine étape : Informations spécifiques au courrier
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
  progressCard: {
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStepCompleted: {
    backgroundColor: '#22c55e',
  },
  progressStepActive: {
    backgroundColor: '#3b82f6',
  },
  progressStepText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    flex: 1,
    textAlign: 'center',
  },
  progressLabelActive: {
    color: '#3b82f6',
    fontFamily: 'Inter-SemiBold',
  },
  formCard: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 12,
  },
  postalField: {
    flex: 0.4,
  },
  cityField: {
    flex: 0.6,
  },
  actionCard: {
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
