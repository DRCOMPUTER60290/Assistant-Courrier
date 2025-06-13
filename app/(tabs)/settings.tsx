import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as MailComposer from 'expo-mail-composer';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, Crown, Shield, CircleHelp as HelpCircle, Star, ChevronRight, Mail, Smartphone, Trash2, LogOut } from 'lucide-react-native';

interface SettingsOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const handleUpgrade = () => {
    Alert.alert(
      'Passer Premium',
      'Débloque toutes les fonctionnalités avancées :\n\n• Courriers illimités\n• Plus de types de courriers\n• Envoi par email direct\n• Sans publicité\n• Support prioritaire',
      [
        { text: 'Plus tard', style: 'cancel' },
        { text: 'Découvrir', onPress: () => console.log('Navigation vers premium') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront définitivement supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => console.log('Suppression du compte')
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Se déconnecter',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Se déconnecter', 
          onPress: () => console.log('Déconnexion')
        }
      ]
    );
  };

  const generalSettings: SettingsOption[] = [
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Recevoir des notifications sur l\'app',
      icon: <Bell size={20} color="#3b82f6" />,
      type: 'toggle',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      id: 'email-notifications',
      title: 'Notifications email',
      subtitle: 'Recevoir des emails de confirmation',
      icon: <Mail size={20} color="#3b82f6" />,
      type: 'toggle',
      value: emailNotifications,
      onToggle: setEmailNotifications,
    },
  ];

  const premiumSettings: SettingsOption[] = [
    {
      id: 'upgrade',
      title: isPremium ? 'Compte Premium' : 'Passer Premium',
      subtitle: isPremium ? 'Profitez de toutes les fonctionnalités' : 'Débloquez toutes les fonctionnalités',
      icon: <Crown size={20} color="#f59e0b" />,
      type: 'navigation',
      onPress: isPremium ? undefined : handleUpgrade,
    },
  ];

  const supportSettings: SettingsOption[] = [
    {
      id: 'help',
      title: 'Centre d\'aide',
      subtitle: 'FAQ et guides d\'utilisation',
      icon: <HelpCircle size={20} color="#3b82f6" />,
      type: 'navigation',
      onPress: () => router.push('/support/help'),
    },
    {
      id: 'contact',
      title: 'Nous contacter',
      subtitle: 'Support technique et questions',
      icon: <Smartphone size={20} color="#3b82f6" />,
      type: 'navigation',
      onPress: () => {
        MailComposer.composeAsync({
          recipients: ['support@example.com'],
          subject: 'Assistance - Assistant Courrier',
        });
      },
    },
    {
      id: 'rate',
      title: 'Noter l\'application',
      subtitle: 'Votre avis nous aide à nous améliorer',
      icon: <Star size={20} color="#3b82f6" />,
      type: 'navigation',
      onPress: () => Linking.openURL('https://example.com/store'),
    },
  ];

  const accountSettings: SettingsOption[] = [
    {
      id: 'privacy',
      title: 'Confidentialité et sécurité',
      subtitle: 'Gestion des données personnelles',
      icon: <Shield size={20} color="#3b82f6" />,
      type: 'navigation',
      onPress: () => console.log('Navigation vers confidentialité'),
    },
    {
      id: 'logout',
      title: 'Se déconnecter',
      icon: <LogOut size={20} color="#f97316" />,
      type: 'action',
      onPress: handleLogout,
      color: '#f97316',
    },
    {
      id: 'delete',
      title: 'Supprimer le compte',
      icon: <Trash2 size={20} color="#ef4444" />,
      type: 'action',
      onPress: handleDeleteAccount,
      color: '#ef4444',
    },
  ];

  const SettingsSection = ({ title, options }: { title: string; options: SettingsOption[] }) => (
    <Card style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsList}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionItem,
              index < options.length - 1 && styles.optionItemBorder,
              option.type === 'action' && styles.optionItemAction,
            ]}
            onPress={option.onPress}
            disabled={option.type === 'toggle' || (option.id === 'upgrade' && isPremium)}
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                {option.icon}
              </View>
              <View style={styles.optionText}>
                <Text style={[
                  styles.optionTitle,
                  option.color && { color: option.color }
                ]}>
                  {option.title}
                </Text>
                {option.subtitle && (
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                )}
              </View>
            </View>
            
            <View style={styles.optionRight}>
              {option.type === 'toggle' && option.onToggle && (
                <Switch
                  value={option.value}
                  onValueChange={option.onToggle}
                  trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                  thumbColor={option.value ? '#ffffff' : '#ffffff'}
                />
              )}
              {option.type === 'navigation' && !(option.id === 'upgrade' && isPremium) && (
                <ChevronRight size={20} color="#94a3b8" />
              )}
              {option.id === 'upgrade' && isPremium && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>Actif</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Paramètres" 
        subtitle="Personnalisez votre expérience"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsSection title="Général" options={generalSettings} />
        <SettingsSection title="Premium" options={premiumSettings} />
        <SettingsSection title="Support" options={supportSettings} />
        <SettingsSection title="Compte" options={accountSettings} />

        <Card style={styles.versionCard}>
          <Text style={styles.versionText}>Assistant Courrier v1.0.0</Text>
          <Text style={styles.versionSubtext}>
            Créé avec ❤️ pour simplifier vos démarches administratives
          </Text>
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
  sectionCard: {
    marginTop: 20,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  optionsList: {
    gap: 0,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  optionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  optionItemAction: {
    paddingVertical: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
  },
  optionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  optionRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    backgroundColor: '#22c55e15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#22c55e',
  },
  versionCard: {
    marginTop: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});