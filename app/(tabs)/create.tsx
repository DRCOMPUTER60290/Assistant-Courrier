import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import Header from '@/components/Header';
import LetterTypeSelector from '@/components/LetterTypeSelector';
import RecipientForm from '@/components/RecipientForm';
import LetterFieldsForm from '@/components/LetterFieldsForm';
import ActionButton from '@/components/ActionButton';
import LoadingOverlay from '@/components/LoadingOverlay';
import AdBanner from '@/components/AdBanner';
import { LetterType, Recipient, UserProfile } from '@/types/letter';
import { letterService } from '@/services/letterService';
import { useTheme } from '@/contexts/ThemeContext';
import { formatLetterHeader } from '@/utils/formatLetterHeader';
import { FileText, Send } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CreateScreen() {
  const [selectedType, setSelectedType] = useState<LetterType | null>(null);
  const [recipient, setRecipient] = useState<Recipient>({
    address: '',
    postalCode: '',
    city: '',
  });
  const [additionalInfo, setAdditionalInfo] = useState<Record<string, any>>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        content: { flex: 1, paddingHorizontal: 20 },
        section: { marginTop: 24 },
        buttonGroup: { gap: 12, marginBottom: 32 },
      }),
    [colors]
  );

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await letterService.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    }
  };

  const handleGenerateLetter = async () => {
    if (!selectedType || !userProfile) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type de courrier');
      return;
    }

    if (!recipient.address || !recipient.postalCode || !recipient.city) {
      Alert.alert('Erreur', 'Veuillez remplir les informations du destinataire');
      return;
    }

    setIsGenerating(true);

    try {
      const letterRequest = {
        userProfile,
        recipient,
        letterType: selectedType,
        additionalInfo,
      };

      const generatedContent = await letterService.generateLetter(letterRequest);

      const header = formatLetterHeader(userProfile, recipient);
      const fullContent = header + generatedContent;

      router.push({
        pathname: '/letter-preview',
        params: {
          content: fullContent,
          type: selectedType,
          recipientData: JSON.stringify(recipient),
        },
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le courrier. Veuillez réessayer.');
      console.error('Erreur génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setSelectedType(null);
    setRecipient({
      address: '',
      postalCode: '',
      city: '',
    });
    setAdditionalInfo({});
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Créer un courrier" 
        subtitle="Choisissez le type et remplissez les informations"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <LetterTypeSelector
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </View>

        {selectedType && (
          <>
            <View style={styles.section}>
              <RecipientForm
                recipient={recipient}
                onUpdateRecipient={setRecipient}
              />
            </View>

            <View style={styles.section}>
              <LetterFieldsForm
                letterType={selectedType}
                values={additionalInfo}
                onUpdateValues={setAdditionalInfo}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.buttonGroup}>
                <ActionButton
                  title="Générer le courrier"
                  icon={FileText}
                  onPress={handleGenerateLetter}
                  disabled={isGenerating}
                  size="large"
                />
                
                <ActionButton
                  title="Réinitialiser"
                  icon={Send}
                  onPress={resetForm}
                  variant="primary"
                  size="large"
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {isGenerating && <LoadingOverlay />}
      <AdBanner />
    </View>
  );
}
