import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { API_URL } from '@env';

export default function App() {
  useEffect(() => {
    console.log('→ API_URL =', API_URL);
  }, []);
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>API_URL = {API_URL}</Text>
    </View>
  );
}
