import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Recipient } from '@/types/letter';
import FormInput from '@/components/FormInput';

interface RecipientFormProps {
  recipient: Recipient;
  onUpdateRecipient: (recipient: Recipient) => void;
}

export default function RecipientForm({ recipient, onUpdateRecipient }: RecipientFormProps) {
  const updateField = (field: keyof Recipient, value: string) => {
    onUpdateRecipient({
      ...recipient,
      [field]: value,
    });
  };

  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 8 },
        title: {
          fontSize: 18,
          fontFamily: 'Roboto-Bold',
          color: colors.textPrimary,
          marginBottom: 16,
        },
        form: { gap: 16 },
        row: { flexDirection: 'row', gap: 12 },
        halfInput: { flex: 1 },
        smallInput: { flex: 0.3 },
        largeInput: { flex: 0.7 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinataire</Text>
      
      <View style={styles.form}>
        <FormInput
          label="Entreprise / Organisation"
          value={recipient.company || ''}
          onChangeText={(value) => updateField('company', value)}
          placeholder="Ex: Orange, EDF, Mairie..."
        />
        
        <View style={styles.row}>
          <FormInput
            label="Prénom"
            value={recipient.firstName || ''}
            onChangeText={(value) => updateField('firstName', value)}
            placeholder="Prénom"
            style={styles.halfInput}
          />
          <FormInput
            label="Nom"
            value={recipient.lastName || ''}
            onChangeText={(value) => updateField('lastName', value)}
            placeholder="Nom"
            style={styles.halfInput}
          />
        </View>
        
        <FormInput
          label="Service"
          value={recipient.service || ''}
          onChangeText={(value) => updateField('service', value)}
          placeholder="Ex: Service Client, Service Comptabilité..."
        />
        
        <FormInput
          label="Email"
          value={recipient.email || ''}
          onChangeText={(value) => updateField('email', value)}
          placeholder="contact@entreprise.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <FormInput
          label="Adresse *"
          value={recipient.address}
          onChangeText={(value) => updateField('address', value)}
          placeholder="Numéro et nom de rue"
          required
        />
        
        <View style={styles.row}>
          <FormInput
            label="Code postal *"
            value={recipient.postalCode}
            onChangeText={(value) => updateField('postalCode', value)}
            placeholder="75001"
            keyboardType="numeric"
            maxLength={5}
            style={styles.smallInput}
            required
          />
          <FormInput
            label="Ville *"
            value={recipient.city}
            onChangeText={(value) => updateField('city', value)}
            placeholder="Paris"
            style={styles.largeInput}
            required
          />
        </View>
      </View>
    </View>
  );
}
