import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, MapPin, Phone, Building } from 'lucide-react-native';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  company?: string;
  position?: string;
}

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    address: '123 rue de la République',
    postalCode: '75001',
    city: 'Paris',
    company: 'Entreprise SARL',
    position: 'Développeur',
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    Alert.alert('Succès', 'Votre profil a été mis à jour avec succès.');
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const ProfileField = ({ icon, label, value, field }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    field?: keyof ProfileData;
  }) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <View style={styles.fieldIcon}>
          {icon}
        </View>
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {isEditing && field ? (
        <Input
          value={editData[field] || ''}
          onChangeText={(text) => updateField(field, text)}
          style={styles.fieldInput}
        />
      ) : (
        <Text style={styles.fieldValue}>{value || 'Non renseigné'}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Mon Profil" 
        subtitle="Gérez vos informations personnelles"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.avatarCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#1e3a8a" />
            </View>
            <Text style={styles.userName}>
              {profileData.firstName} {profileData.lastName}
            </Text>
            {profileData.position && profileData.company && (
              <Text style={styles.userRole}>
                {profileData.position} chez {profileData.company}
              </Text>
            )}
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informations personnelles</Text>
            <Text style={styles.cardSubtitle}>
              Ces informations seront utilisées automatiquement dans vos courriers
            </Text>
          </View>

          <View style={styles.fieldsContainer}>
            <View style={styles.fieldRow}>
              <View style={styles.halfField}>
                <ProfileField
                  icon={<User size={20} color="#3b82f6" />}
                  label="Prénom"
                  value={profileData.firstName}
                  field="firstName"
                />
              </View>
              <View style={styles.halfField}>
                <ProfileField
                  icon={<User size={20} color="#3b82f6" />}
                  label="Nom"
                  value={profileData.lastName}
                  field="lastName"
                />
              </View>
            </View>

            <ProfileField
              icon={<Mail size={20} color="#3b82f6" />}
              label="Email"
              value={profileData.email}
              field="email"
            />

            <ProfileField
              icon={<Phone size={20} color="#3b82f6" />}
              label="Téléphone"
              value={profileData.phone}
              field="phone"
            />

            <ProfileField
              icon={<MapPin size={20} color="#3b82f6" />}
              label="Adresse"
              value={profileData.address}
              field="address"
            />

            <View style={styles.fieldRow}>
              <View style={styles.smallField}>
                <ProfileField
                  icon={<MapPin size={20} color="#3b82f6" />}
                  label="Code postal"
                  value={profileData.postalCode}
                  field="postalCode"
                />
              </View>
              <View style={styles.largeField}>
                <ProfileField
                  icon={<MapPin size={20} color="#3b82f6" />}
                  label="Ville"
                  value={profileData.city}
                  field="city"
                />
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informations professionnelles</Text>
            <Text style={styles.cardSubtitle}>
              Optionnel - pour les courriers professionnels
            </Text>
          </View>

          <View style={styles.fieldsContainer}>
            <ProfileField
              icon={<Building size={20} color="#3b82f6" />}
              label="Entreprise"
              value={profileData.company || ''}
              field="company"
            />

            <ProfileField
              icon={<Building size={20} color="#3b82f6" />}
              label="Poste"
              value={profileData.position || ''}
              field="position"
            />
          </View>
        </Card>

        <Card style={styles.actionsCard}>
          {isEditing ? (
            <View style={styles.editActions}>
              <Button
                title="Annuler"
                onPress={handleCancel}
                variant="outline"
                style={styles.actionButton}
              />
              <Button
                title="Sauvegarder"
                onPress={handleSave}
                style={styles.actionButton}
              />
            </View>
          ) : (
            <Button
              title="Modifier mes informations"
              onPress={() => setIsEditing(true)}
              size="large"
            />
          )}
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
  avatarCard: {
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  infoCard: {
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  fieldsContainer: {
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    marginLeft: 28,
  },
  fieldInput: {
    marginLeft: 28,
    marginBottom: 0,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  smallField: {
    flex: 0.4,
  },
  largeField: {
    flex: 0.6,
  },
  actionsCard: {
    alignItems: 'center',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    flex: 1,
  },
  bottomSpacing: {
    height: 40,
  },
});