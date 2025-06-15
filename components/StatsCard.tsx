import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  onPress?: () => void;
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = '#1e40af',
  onPress 
}: StatsCardProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Icon size={24} color={color} />
          </View>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    color: '#1f2937',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#64748b',
    lineHeight: 20,
  },
});