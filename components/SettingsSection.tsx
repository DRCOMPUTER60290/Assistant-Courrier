import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Switch } from 'react-native';
import { ExternalLink, Shield, FileText, Info, RotateCcw, Globe, Moon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsSectionProps {
  onResetProfile: () => void;
}

export default function SettingsSection({ onResetProfile }: SettingsSectionProps) {
  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === 'dark';
  const openLink = (url: string, title: string) => {
    Alert.alert(
      title,
      'Cette fonctionnalité ouvre un lien externe. En production, les pages légales seraient intégrées à l\'application.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir', onPress: () => Linking.openURL(url) },
      ]
    );
  };

  const settingsItems = [
    {
      icon: Shield,
      title: 'Politique de confidentialité',
      description: 'Comment nous protégeons vos données',
      onPress: () => openLink('https://example.com/privacy', 'Politique de confidentialité'),
    },
    {
      icon: FileText,
      title: 'Conditions générales',
      description: 'Conditions d\'utilisation de l\'application',
      onPress: () => openLink('https://example.com/terms', 'Conditions générales'),
    },
    {
      icon: Shield,
      title: 'Charte de sécurité',
      description: 'Nos engagements sécurité',
      onPress: () => openLink('https://example.com/security', 'Charte de sécurité'),
    },
    {
      icon: Info,
      title: 'Mentions légales',
      description: 'Informations légales et éditeur',
      onPress: () => openLink('https://example.com/legal', 'Mentions légales'),
    },
  ];

  const dangerousActions = [
    {
      icon: RotateCcw,
      title: 'Réinitialiser le profil',
      description: 'Supprimer toutes vos données personnelles',
      onPress: onResetProfile,
      dangerous: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      
      <View style={styles.card}>
        {settingsItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.settingItem, index < settingsItems.length && styles.borderBottom]}
              onPress={item.onPress}
            >
              <View style={styles.settingIcon}>
                <IconComponent size={20} color="#6b7280" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
              <ExternalLink size={16} color="#9ca3af" />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={toggleTheme}
        >
          <View style={styles.settingIcon}>
            <Moon size={20} color="#6b7280" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Mode sombre</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            style={styles.settingSwitch}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {dangerousActions.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={item.onPress}
            >
              <View style={[styles.settingIcon, item.dangerous && styles.dangerousIcon]}>
                <IconComponent size={20} color={item.dangerous ? "#ef4444" : "#6b7280"} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, item.dangerous && styles.dangerousText]}>
                  {item.title}
                </Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Assistant Courrier v1.0.0</Text>
        <Text style={styles.versionSubtext}>
          Générez vos courriers professionnels avec l'IA
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerousIcon: {
    backgroundColor: '#fef2f2',
  },
  settingContent: {
    flex: 1,
  },
  settingSwitch: {
    marginLeft: 'auto',
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#1f2937',
    marginBottom: 2,
  },
  dangerousText: {
    color: '#ef4444',
  },
  settingDescription: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: '#6b7280',
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#9ca3af',
    textAlign: 'center',
  },
});