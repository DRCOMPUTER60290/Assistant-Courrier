import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import { Share as ShareIcon, FileDown, Trash2, Eye } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Letter } from '@/types/letter';
import { LETTER_TYPES } from '@/constants/letterTypes';
import ActionButton from '@/components/ActionButton';

interface LetterCardProps {
  letter: Letter;
  onDelete: () => void;
}

export default function LetterCard({ letter, onDelete }: LetterCardProps) {
  const letterTypeInfo = LETTER_TYPES.find(type => type.type === letter.type);
  
  const handleShare = async () => {
    try {
      await Share.share({ message: letter.content });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager le courrier');
    }
  };

  const handleDownload = async () => {
    try {
      const html = `<html><meta charset="utf-8" /><body><pre>${letter.content}</pre></body></html>`;
      const { uri } = await Print.printToFileAsync({ html });
      const fileUri = `${FileSystem.documentDirectory}letter-${letter.id}.pdf`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger le courrier');
    }
  };

  const handleView = () => {
    router.push({ pathname: '/letter-preview', params: { content: letter.content } });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.letterInfo}>
          <View style={[styles.typeBadge, { backgroundColor: letterTypeInfo?.color + '20' }]}>
            <Text style={[styles.typeText, { color: letterTypeInfo?.color }]}>
              {letterTypeInfo?.title}
            </Text>
          </View>
          <Text style={styles.date}>{formatDate(letter.createdAt)}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{letter.title}</Text>
      
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientLabel}>Destinataire:</Text>
        <Text style={styles.recipientText}>
          {letter.recipient.company || 
           `${letter.recipient.firstName || ''} ${letter.recipient.lastName || ''}`.trim() ||
           'Non spécifié'}
        </Text>
        <Text style={styles.recipientAddress}>
          {letter.recipient.city}
        </Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleView}>
          <Eye size={18} color="#6b7280" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <ShareIcon size={18} color="#6b7280" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <FileDown size={18} color="#6b7280" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  letterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#6b7280',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  recipientInfo: {
    marginBottom: 16,
  },
  recipientLabel: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  recipientText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#1f2937',
  },
  recipientAddress: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
  },
});