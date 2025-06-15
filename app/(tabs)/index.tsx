import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, Image } from 'react-native';
import { FileText, TrendingUp, Calendar, Users, User } from 'lucide-react-native';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import ActionButton from '@/components/ActionButton';
import { letterService } from '@/services/letterService';
import { Statistics, UserProfile } from '@/types/letter';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [statistics, profile] = await Promise.all([
        letterService.getStatistics(),
        letterService.getUserProfile()
      ]);
      setStats(statistics);
      setUserProfile(profile);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const navigateToCreate = () => {
    router.push('/create');
  };

  const navigateToHistory = () => {
    router.push('/history');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Assistant Courrier" 
        subtitle="Générez vos courriers en quelques clics"
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Message de bienvenue personnalisé */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <View style={styles.welcomeText}>
              <Text style={styles.greeting}>
                {getGreeting()}{userProfile?.firstName ? ` ${userProfile.firstName}` : ''} !
              </Text>
              <Text style={styles.welcomeSubtext}>
                Que souhaitez-vous rédiger aujourd'hui ?
              </Text>
            </View>
            <View style={styles.profileImageContainer}>
              {userProfile?.photoUri ? (
                <Image source={{ uri: userProfile.photoUri }} style={styles.profileImage} />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <User size={24} color="#6b7280" />
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <StatsCard
              title="Courriers générés"
              value={stats?.totalLetters || 0}
              icon={FileText}
              color="#1e40af"
              onPress={navigateToHistory}
            />
            <StatsCard
              title="Ce mois"
              value={`+${stats?.monthlyGrowth || 0}%`}
              icon={TrendingUp}
              color="#10b981"
            />
          </View>
          
          <View style={styles.statsGrid}>
            <StatsCard
              title="Cette semaine"
              value={stats?.recentActivity?.reduce((sum, day) => sum + day.count, 0) || 0}
              icon={Calendar}
              color="#f59e0b"
            />
            <StatsCard
              title="Types utilisés"
              value={Object.keys(stats?.lettersByType || {}).length}
              icon={Users}
              color="#8b5cf6"
            />
          </View>
        </View>

        <View style={styles.section}>
          <ActionButton
            title="Créer un nouveau courrier"
            icon={FileText}
            onPress={navigateToCreate}
            size="large"
          />
        </View>

        <View style={styles.section}>
          <ActionButton
            title="Voir l'historique"
            icon={Calendar}
            onPress={navigateToHistory}
            variant="secondary"
            size="large"
          />
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
  welcomeSection: {
    marginTop: 20,
    marginBottom: 8,
  },
  welcomeContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#6b7280',
    lineHeight: 22,
  },
  profileImageContainer: {
    marginLeft: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#e5e7eb',
  },
  profilePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e5e7eb',
  },
  section: {
    marginTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
});