import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera, User, CreditCard as Edit } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserProfile } from '@/types/letter';
import FormInput from '@/components/FormInput';
import ActionButton from '@/components/ActionButton';

interface ProfileSectionProps {
  profile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
  loading: boolean;
}

export default function ProfileSection({ profile, onUpdateProfile, loading }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(
    profile || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
    }
  );

  const updateField = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editedProfile.firstName || !editedProfile.lastName || !editedProfile.email) {
      Alert.alert('Erreur', 'Veuillez remplir au moins le nom, prénom et email');
      return;
    }

    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
    });
    setIsEditing(false);
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        updateField('photoUri', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sélectionner une image');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profil utilisateur</Text>
        <View style={styles.loadingCard} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil utilisateur</Text>
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Edit size={20} color="#1e40af" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            {editedProfile.photoUri ? (
              <Image source={{ uri: editedProfile.photoUri }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <User size={32} color="#9ca3af" />
              </View>
            )}
          </View>
          
          {isEditing && (
            <TouchableOpacity style={styles.photoButton} onPress={handleImagePicker}>
              <Camera size={16} color="#1e40af" />
              <Text style={styles.photoButtonText}>Changer</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <FormInput
              label="Prénom *"
              value={editedProfile.firstName}
              onChangeText={(value) => updateField('firstName', value)}
              placeholder="Votre prénom"
              style={styles.halfInput}
              required
            />
            <FormInput
              label="Nom *"
              value={editedProfile.lastName}
              onChangeText={(value) => updateField('lastName', value)}
              placeholder="Votre nom"
              style={styles.halfInput}
              required
            />
          </View>

          <FormInput
            label="Email *"
            value={editedProfile.email}
            onChangeText={(value) => updateField('email', value)}
            placeholder="votre.email@exemple.com"
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />

          <FormInput
            label="Téléphone"
            value={editedProfile.phone}
            onChangeText={(value) => updateField('phone', value)}
            placeholder="06 12 34 56 78"
            keyboardType="phone-pad"
          />

          <FormInput
            label="Adresse"
            value={editedProfile.address}
            onChangeText={(value) => updateField('address', value)}
            placeholder="Numéro et nom de rue"
          />

          <View style={styles.row}>
            <FormInput
              label="Code postal"
              value={editedProfile.postalCode}
              onChangeText={(value) => updateField('postalCode', value)}
              placeholder="75001"
              keyboardType="numeric"
              maxLength={5}
              style={styles.smallInput}
            />
            <FormInput
              label="Ville"
              value={editedProfile.city}
              onChangeText={(value) => updateField('city', value)}
              placeholder="Paris"
              style={styles.largeInput}
            />
          </View>
        </View>

        {isEditing && (
          <View style={styles.actions}>
            <ActionButton
              title="Sauvegarder"
              onPress={handleSave}
              size="medium"
            />
            <ActionButton
              title="Annuler"
              onPress={handleCancel}
              variant="outline"
              size="medium"
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  loadingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: 200,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoContainer: {
    marginBottom: 12,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f9ff',
  },
  photoButtonText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#1e40af',
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  smallInput: {
    flex: 0.3,
  },
  largeInput: {
    flex: 0.7,
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
});