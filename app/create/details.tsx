import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, FileText, Calendar, DollarSign, Hash } from 'lucide-react-native';

interface DetailsData {
  contractNumber?: string;
  subscriptionDate?: string;
  amount?: string;
  reason?: string;
  additionalInfo?: string;
}

export default function DetailsScreen() {
  const { letterType, recipientData } = useLocalSearchParams<{ 
    letterType: string; 
    recipientData: string;
  }>();
  
  const [detailsData, setDetailsData] = useState<DetailsData>({
    contractNumber: '',
    subscriptionDate: '',
    amount: '',
    reason: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<Partial<DetailsData>>({});

  const updateField = (field: keyof DetailsData, value: string) => {
    setDetailsData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DetailsData> = {};

    if (letterType === 'resiliation') {
      if (!detailsData.contractNumber?.trim()) {
        newErrors.contractNumber = 'Le numéro de contrat est requis';
      }
      if (!detailsData.subscriptionDate?.trim()) {
        newErrors.subscriptionDate = 'La date de souscription est requise';
      }
    }

    if (!detailsData.reason?.trim()) {
      newErrors.reason = 'La raison est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push({
        pathname: '/create/preview',
        params: { 
          letterType,
          recipientData,
          detailsData: JSON.stringify(detailsData)
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

  const renderSpecificFields = () => {
    switch (letterType) {
      case 'resiliation':
        return (
          <>
            <Input
              label="Numéro de contrat"
              value={detailsData.contractNumber}
              onChangeText={(text) => updateField('contractNumber', text)}
              placeholder="Ex: 123456789"
              error={errors.contractNumber}
              required
            />
            <Input
              label="Date de souscription"
              value={detailsData.subscriptionDate}
              onChangeText={(text) => updateField('subscriptionDate', text)}
              placeholder="Ex: 15/01/2023"
              error={errors.subscriptionDate}
              required
            />
            <Input
              label="Montant mensuel (optionnel)"
              value={detailsData.amount}
              onChangeText={(text) => updateField('amount', text)}
              placeholder="Ex: 29.99€"
              keyboardType="numeric"
            />
          </>
        );
      case 'reclamation':
        return (
          <>
            <Input
              label="Numéro de dossier (optionnel)"
              value={detailsData.contractNumber}
              onChangeText={(text) => updateField('contractNumber', text)}
              placeholder="Ex: REC-123456"
            />
            <Input
              label="Date de l'incident"
              value={detailsData.subscriptionDate}
              onChangeText={(text) => updateField('subscriptionDate', text)}
              placeholder="Ex: 15/01/2024"
            />
          </>
        );
      case 'candidature':
        return (
          <>
            <Input
              label="Référence de l'offre"
              value={detailsData.contractNumber}
              onChangeText={(text) => updateField('contractNumber', text)}
              placeholder="Ex: DEV-2024-001"
            />
            <Input
              label="Salaire souhaité (optionnel)"
              value={detailsData.amount}
              onChangeText={(text) => updateField('amount', text)}
              placeholder="Ex: 45000€"
              keyboardType="numeric"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Détails" 
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
            <View style={[styles.progressStep, styles.progressStepCompleted]}>
              <Text style={styles.progressStepText}>2</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.progressStepActive]}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <Text style={styles.progressStepText}>4</Text>
            </View>
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Type</Text>
            <Text style={styles.progressLabel}>Destinataire</Text>
            <Text style={[styles.progressLabel, styles.progressLabelActive]}>Détails</Text>
            <Text style={styles.progressLabel}>Aperçu</Text>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <View style={styles.cardHeader}>
            <FileText size={24} color="#3b82f6" />
            <Text style={styles.cardTitle}>Informations spécifiques</Text>
          </View>

          {renderSpecificFields()}

          <Input
            label="Motif / Raison"
            value={detailsData.reason}
            onChangeText={(text) => updateField('reason', text)}
            placeholder={`Expliquez la raison de votre ${getLetterTypeTitle(letterType || '').toLowerCase()}`}
            multiline
            numberOfLines={4}
            style={styles.textArea}
            error={errors.reason}
            required
          />

          <Input
            label="Informations complémentaires (optionnel)"
            value={detailsData.additionalInfo}
            onChangeText={(text) => updateField('additionalInfo', text)}
            placeholder="Ajoutez toute information utile..."
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Conseil</Text>
          <Text style={styles.infoText}>
            {letterType === 'resiliation' && 
              "N'oubliez pas de mentionner votre souhait de recevoir un accusé de réception et de respecter le préavis."
            }
            {letterType === 'reclamation' && 
              "Soyez précis dans votre description et joignez les pièces justificatives si nécessaire."
            }
            {letterType === 'candidature' && 
              "Mettez en avant vos compétences et votre motivation pour le poste."
            }
            {!['resiliation', 'reclamation', 'candidature'].includes(letterType || '') && 
              "Soyez clair et précis dans votre demande pour obtenir une réponse rapide."
            }
          </Text>
        </Card>

        <Card style={styles.actionCard}>
          <Button
            title="Continuer"
            onPress={handleContinue}
            size="large"
          />
          <Text style={styles.nextStepText}>
            Prochaine étape : Aperçu et génération du courrier
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: '#f0f9ff',
    borderColor: '#3b82f6',
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1e40af',
    lineHeight: 20,
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
