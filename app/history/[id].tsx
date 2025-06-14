import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { useHistory, HistoryItem } from '@/contexts/HistoryContext';
import { Copy, Download, Share2, ArrowLeft } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { history } = useHistory();
  const item = history.find(h => h.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Header title="Courrier introuvable" />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#3b82f6" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const generatePdf = async (): Promise<string> => {
    if (!item.content) {
      throw new Error('empty content');
    }
    const html = `\n      <html>\n        <head><meta charset="utf-8" /></head>\n        <body style="font-family:sans-serif; white-space:pre-wrap;">${item.content.replace(/\n/g, '<br/>')}</body>\n      </html>`;

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(html);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
        }
      }
      return '';
    }

    const { uri } = await Print.printToFileAsync({ html });
    const pdfPath = FileSystem.documentDirectory + 'courrier.pdf';
    await FileSystem.deleteAsync(pdfPath, { idempotent: true });
    await FileSystem.moveAsync({ from: uri, to: pdfPath });
    return pdfPath;
  };

  const handleDownload = async () => {
    if (!item.content) {
      Alert.alert('Erreur', 'Ce courrier ne contient pas de texte.');
      return;
    }
    try {
      const path = await generatePdf();
      Alert.alert('Téléchargement', `Fichier enregistré: ${path}`);
    } catch (error) {
      console.error('Download error', error);
      Alert.alert('Erreur', "Impossible de créer le PDF");
    }
  };

  const handleShare = async () => {
    if (!item.content) {
      Alert.alert('Erreur', 'Ce courrier ne contient pas de texte.');
      return;
    }
    try {
      const path = await generatePdf();
      await Sharing.shareAsync(path);
    } catch (error) {
      console.error('Share error', error);
      Alert.alert('Erreur', "Impossible de partager le fichier");
    }
  };

  const handleCopy = async () => {
    if (!item.content) {
      Alert.alert('Erreur', 'Ce courrier ne contient pas de texte.');
      return;
    }
    await Clipboard.setStringAsync(item.content);
    Alert.alert('Copié', 'Le texte a été copié dans le presse-papiers');
  };

  return (
    <View style={styles.container}>
      <Header title={item.title} subtitle={item.recipient} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#3b82f6" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Card style={styles.letterCard}>
          <Text style={styles.letterText}>{item.content}</Text>
        </Card>

        <Card style={styles.actionsCard}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
              <Copy size={20} color="#3b82f6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
              <Download size={20} color="#3b82f6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
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
  letterCard: {
    marginBottom: 20,
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});
