import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Share2, Clock, Search } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';

interface HistoryItem {
  id: string;
  type: string;
  title: string;
  date: string;
  recipient: string;
  status: 'completed' | 'draft';
}

const historyData: HistoryItem[] = [
  {
    id: '1',
    type: 'Résiliation',
    title: 'Résiliation abonnement téléphonique',
    date: '2024-01-15',
    recipient: 'Orange',
    status: 'completed',
  },
  {
    id: '2',
    type: 'Réclamation',
    title: 'Réclamation service client',
    date: '2024-01-10',
    recipient: 'SNCF Connect',
    status: 'completed',
  },
  {
    id: '3',
    type: 'Candidature',
    title: 'Candidature développeur web',
    date: '2024-01-08',
    recipient: 'TechCorp SARL',
    status: 'draft',
  },
];

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(historyData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = historyData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.recipient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHistory(filtered);
  };

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
                onPress={() => {/* Navigation vers création */}}
                style={styles.createButton}
              />
            )}
          </Card>
        ) : (
          <View style={styles.historyList}>
            {filteredHistory.map((item) => (
              <Card key={item.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
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
                </View>
                
                <View style={styles.historyActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <FileText size={20} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Download size={20} color="#3b82f6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
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