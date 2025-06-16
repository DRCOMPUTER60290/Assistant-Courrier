import Constants from 'expo-constants';

export const API_BASE_URL =
  process.env.API_BASE_URL ||
  (Constants?.expoConfig?.extra?.API_BASE_URL as string | undefined) ||
  'https://assistant-backend-yrbx.onrender.com';
