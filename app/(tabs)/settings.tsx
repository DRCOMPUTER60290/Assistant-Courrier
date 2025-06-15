import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import Header from '@/components/Header';
import ProfileSection from '@/components/ProfileSection';
import SettingsSection from '@/components/SettingsSection';
import { UserProfile } from '@/types/letter';
import { letterService } from '@/services/letterService';

export default function SettingsScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const profile = await letterService.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    try {
      await letterService.saveUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
      Alert.alert('Succès', 'Profil mis à jour avec succès');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil');
    }
  };

  const handleResetProfile = () => {
    Alert.alert(
      'Réinitialiser le profil',
      'Êtes-vous sûr de vouloir réinitialiser votre profil ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            const emptyProfile: UserProfile = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: '',
              postalCode: '',
              city: '',
            };
            handleUpdateProfile(emptyProfile);
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Paramètres" subtitle="Gérez votre profil et préférences" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ProfileSection
            profile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            loading={loading}
          />
        </View>
        
        <View style={styles.section}>
          <SettingsSection onResetProfile={handleResetProfile} />
        </View>
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
  section: {
    marginTop: 24,
  },
});