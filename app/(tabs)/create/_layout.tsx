import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="recipient" />
      <Stack.Screen name="details" />
      <Stack.Screen name="preview" />
    </Stack>
  );
}
