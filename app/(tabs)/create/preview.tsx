import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download, Share2, Copy, Mail, Sparkles } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import * as MailComposer from 'expo-mail-composer';

interface RecipientData {
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
}

interface DetailsData {
  contractNumber?: string;
  subscriptionDate?: string;
  amount?: string;
  reason?: string;
  additionalInfo?: string;
}

export default function PreviewScreen() {
  const { letterType, recipientData, detailsData } = useLocalSearchParams<{ 
    letterType: string; 
    recipientData: string;
    detailsData: string;
  }>();

  const [recipient, setRecipient] = useState<RecipientData | null>(null);
  const [details, setDetails] = useState<DetailsData | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (recipientData) {
      try {
        setRecipient(JSON.parse(recipientData));
      } catch (error) {
        console.error('Error parsing recipient data:', error);
      }
    }
    
    if (detailsData) {
      try {
        setDetails(JSON.parse(detailsData));
      } catch (error) {
        console.error('Error parsing details data:', error);
      }
    }
  }, [recipientData, detailsData]);

  useEffect(() => {
    if (recipient && details) {
      generateLetter();
    }
  }, [recipient, details]);

  const generateLetter = async () => {
    setIsGenerating(true);
    
    // Simulation de génération de lettre (remplacer par appel API ChatGPT)
    setTimeout(() => {
      const mockLetter = generateMockLetter();
      setGeneratedLetter(mockLetter);
      setIsGenerating(false);
    }, 2000);
  };

  const generateMockLetter = (): string => {
    const today = new Date().toLocaleDateString('fr-FR');
    
    return `Jean Dupont
123 rue de la République
75001 Paris

${recipient?.service}
À l'attention de ${recipient?.firstName} ${recipient?.lastName}
${recipient?.address}
${recipient?.postalCode} ${recipient?.city}

Paris, le ${today}

Objet : ${getLetterSubject()}

${getLetterSalutation()},

${getLetterBody()}

${getLetterClosing()}

Cordialement,

Jean Dupont`;
  };

  const getLetterSubject = (): string => {
    switch (letterType) {
      case 'resiliation':
        return 'Demande de résiliation de contrat';
      case 'reclamation':
        return 'Réclamation concernant un dysfonctionnement';
      case 'candidature':
        return 'Candidature pour un poste';
      default:
        return 'Courrier officiel';
    }
  };

  const getLetterSalutation = (): string => {
    return `${recipient?.firstName ? 'Madame, Monsieur' : 'Madame, Monsieur'}`;
  };

  const getLetterBody = (): string => {
    switch (letterType) {
      case 'resiliation':
        return `Je vous écris pour vous faire part de ma décision de résilier mon contrat ${details?.contractNumber ? `n°${details.contractNumber}` : ''} souscrit le ${details?.subscriptionDate || '[date]'}.

${details?.reason || 'Motif de résiliation à préciser'}.

Je vous demande de bien vouloir procéder à la résiliation de ce contrat dans les meilleurs délais et de me faire parvenir un accusé de réception de cette demande.

${details?.additionalInfo || ''}`;

      case 'reclamation':
        return `Je me permets de vous contacter suite à un problème rencontré le ${details?.subscriptionDate || '[date]'} ${details?.contractNumber ? `concernant le dossier ${details.contractNumber}` : ''}.

${details?.reason || 'Description du problème'}.

Je souhaiterais obtenir une solution rapide à ce problème et vous remercie par avance de l'attention que vous porterez à ma demande.

${details?.additionalInfo || ''}`;

      case 'candidature':
        return `Je me permets de vous adresser ma candidature pour le poste ${details?.contractNumber ? `référencé ${details.contractNumber}` : 'que vous proposez'}.

${details?.reason || 'Motivation pour le poste'}.

${details?.amount ? `Concernant la rémunération, je souhaiterais ${details.amount}.` : ''}

Je reste à votre disposition pour un entretien et vous prie d'agréer mes salutations distinguées.

${details?.additionalInfo || ''}`;

      default:
        return `${details?.reason || 'Objet de votre courrier'}.

${details?.additionalInfo || ''}`;
    }
  };

  const getLetterClosing = (): string => {
    switch (letterType) {
      case 'resiliation':
        return 'Je vous remercie par avance de votre diligence et vous prie d\'agréer mes salutations distinguées.';
      case 'reclamation':
        return 'Dans l\'attente de votre réponse, je vous prie d\'agréer mes salutations distinguées.';
      case 'candidature':
        return 'Dans l\'espoir d\'une réponse favorable, je vous prie d\'agréer mes salutations distinguées.';
      default:
        return 'Je vous prie d\'agréer mes salutations distinguées.';
    }
  };

  const handleBack = () => {
    router.back();
  };

  const generatePdf = async (): Promise<string> => {
    const html = `\n      <html>\n        <head><meta charset="utf-8" /></head>\n        <body style="font-family:sans-serif; white-space:pre-wrap;">${generatedLetter.replace(/\n/g, '<br/>')}</body>\n      </html>`;
    const { uri } = await Print.printToFileAsync({ html });
    const pdfPath = FileSystem.documentDirectory + 'courrier.pdf';
    await FileSystem.moveAsync({ from: uri, to: pdfPath });
    return pdfPath;
  };

  const handleDownload = async () => {
    try {
      const path = await generatePdf();
      Alert.alert('Téléchargement', `Fichier enregistré: ${path}`);
    } catch (error) {
      console.error('Download error', error);
      Alert.alert('Erreur', "Impossible de créer le PDF");
    }
  };

  const handleShare = async () => {
    try {
      const path = await generatePdf();
      await Sharing.shareAsync(path);
    } catch (error) {
      console.error('Share error', error);
      Alert.alert('Erreur', "Impossible de partager le fichier");
    }
  };

  const handleCopy = () => {
    Clipboard.setStringAsync(generatedLetter);
    Alert.alert('Copié', 'Le texte a été copié dans le presse-papiers');
  };

  const handleSendEmail = async () => {
    try {
      const path = await generatePdf();
      await MailComposer.composeAsync({
        recipients: recipient?.email ? [recipient.email] : [],
        subject: getLetterSubject(),
        body: 'Veuillez trouver ci-joint mon courrier.',
        attachments: [path],
      });
    } catch (error) {
      console.error('Email error', error);
      Alert.alert('Erreur', "Impossible d'envoyer l'email");
    }
  };

  const handleSaveAndFinish = () => {
    Alert.alert(
      'Courrier sauvegardé',
      'Votre courrier a été sauvegardé dans l\'historique.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/history')
        }
      ]
    );
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
        title="Aperçu" 
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
            <View style={[styles.progressStep, styles.progressStepCompleted]}>
              <Text style={styles.progressStepText}>3</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.progressStepActive]}>
              <Text style={styles.progressStepText}>4</Text>
            </View>
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Type</Text>
            <Text style={styles.progressLabel}>Destinataire</Text>
            <Text style={styles.progressLabel}>Détails</Text>
            <Text style={[styles.progressLabel, styles.progressLabelActive]}>Aperçu</Text>
          </View>
        </Card>

        {isGenerating ? (
          <Card style={styles.loadingCard}>
            <View style={styles.loadingContent}>
              <Sparkles size={48} color="#3b82f6" />
              <Text style={styles.loadingTitle}>Génération en cours...</Text>
              <Text style={styles.loadingText}>
                Notre IA rédige votre courrier personnalisé
              </Text>
            </View>
          </Card>
        ) : (
          <>
            <Card style={styles.letterCard}>
              <Text style={styles.letterTitle}>Votre courrier</Text>
              <ScrollView style={styles.letterContent} nestedScrollEnabled>
                <Text style={styles.letterText}>{generatedLetter}</Text>
              </ScrollView>
            </Card>

            <Card style={styles.actionsCard}>
              <Text style={styles.actionsTitle}>Actions disponibles</Text>
              <View style={styles.actionsGrid}>
                <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
                  <Download size={20} color="#3b82f6" />
                  <Text style={styles.actionButtonText}>PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                  <Copy size={20} color="#3b82f6" />
                  <Text style={styles.actionButtonText}>Copier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                  <Share2 size={20} color="#3b82f6" />
                  <Text style={styles.actionButtonText}>Partager</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleSendEmail}>
                  <Mail size={20} color="#3b82f6" />
                  <Text style={styles.actionButtonText}>Email</Text>
                </TouchableOpacity>
              </View>
            </Card>

            <Card style={styles.finalCard}>
              <Button
                title="Sauvegarder et terminer"
                onPress={handleSaveAndFinish}
                size="large"
              />
              <Text style={styles.finalText}>
                Le courrier sera ajouté à votre historique
              </Text>
            </Card>
          </>
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
  loadingCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  letterCard: {
    marginBottom: 20,
  },
  letterTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  letterContent: {
    maxHeight: 400,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
  },
  letterText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    lineHeight: 22,
  },
  actionsCard: {
    marginBottom: 20,
  },
  actionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    minWidth: 70,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
    marginTop: 4,
  },
  finalCard: {
    alignItems: 'center',
  },
  finalText: {
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
