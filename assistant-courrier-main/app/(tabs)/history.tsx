import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Share2, Clock, Search, Copy } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { useHistory, HistoryItem } from '@/contexts/HistoryContext';
import { router } from 'expo-router';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';


export default function HistoryScreen() {
  const { history } = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>(history);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filtered = history.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHistory(filtered);
  }, [searchQuery, history]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? '#22c55e' : '#f97316';
  };

  const getStatusLabel = (status: string) => {
    return status === 'completed' ? 'Terminé' : 'Brouillon';
  };

  const generatePdf = async (content?: string): Promise<string> => {
    if (!content) {
      throw new Error('empty content');
    }
    const html = `\n      <html>\n        <head><meta charset="utf-8" /></head>\n        <body style="font-family:sans-serif; white-space:pre-wrap;">${content.replace(/\n/g, '<br/>')}</body>\n      </html>`;

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

  const handleDownload = async (item: HistoryItem) => {
    if (!item.content) {
      Alert.alert('Erreur', 'Ce courrier ne contient pas de texte.');
      return;
    }
    try {
      const path = await generatePdf(item.content);
      Alert.alert('Téléchargement', `Fichier enregistré: ${path}`);
    } catch (error) {
      console.error('Download error', error);
      Alert.alert('Erreur', "Impossible de créer le PDF");
    }
  };

  const handleShare = async (item: HistoryItem) => {
    if (!item.content) {
      Alert.alert('Erreur', 'Ce courrier ne contient pas de texte.');
      return;
    }
    try {
      const path = await generatePdf(item.content);
      await Sharing.shareAsync(path);
    } catch (error) {
      console.error('Share error', error);
      Alert.alert('Erreur', "Impossible de partager le fichier");
    }
  };

  const handleCopy = (item: HistoryItem) => {
    if (!item.content) {
      Alert.alert('Erreur', 'Ce courrier ne contient pas de texte.');
      return;
    }
    Clipboard.setStringAsync(item.content);
    Alert.alert('Copié', 'Le texte a été copié dans le presse-papiers');
  };

  const handleOpen = (item: HistoryItem) => {
    router.push(`/history/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Historique" 
        subtitle="Retrouvez tous vos courriers"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.searchCard}>
          <Input
            placeholder="Rechercher dans l'historique..."
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
        </Card>

        {filteredHistory.length === 0 ? (
          <Card style={styles.emptyCard}>
            <FileText size={48} color="#94a3b8" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Aucun courrier trouvé</Text>
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'Aucun résultat ne correspond à votre recherche.'
                : 'Vous n\'avez pas encore créé de courrier. Commencez dès maintenant !'}
            </Text>
            {!searchQuery && (
              <Button
                title="Créer mon premier courrier"
                onPress={() => router.push('/(tabs)/create')}
                style={styles.createButton}
              />
            )}
          </Card>
        ) : (
          <View style={styles.historyList}>
            {filteredHistory.map((item) => (
              <Card key={item.id} style={styles.historyCard}>
                <TouchableOpacity style={styles.historyHeader} onPress={() => handleOpen(item)}>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <View style={styles.historyMeta}>
                      <Text style={styles.historyType}>{item.type}</Text>
                      <Text style={styles.historyDot}>•</Text>
                      <Text style={styles.historyRecipient}>{item.recipient}</Text>
                    </View>
                    <View style={styles.historyFooter}>
                      <View style={styles.dateContainer}>
                        <Clock size={14} color="#64748b" />
                        <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}15` }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}> 
                          {getStatusLabel(item.status)} 
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                
                <View style={styles.historyActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleCopy(item)}
                  >
                    <Copy size={20} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDownload(item)}
                  >
                    <Download size={20} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleShare(item)}
                  >
                    <Share2 size={20} color="#3b82f6" />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
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
  searchCard: {
    marginTop: 20,
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 0,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  createButton: {
    marginTop: 8,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  historyHeader: {
    flex: 1,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
  },
  historyDot: {
    fontSize: 14,
    color: '#94a3b8',
    marginHorizontal: 8,
  },
  historyRecipient: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  historyActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
  },
  bottomSpacing: {
    height: 40,
  },
});