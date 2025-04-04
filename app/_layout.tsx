import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerStyle: { backgroundColor: '#D7F2F4' }, }} />
      <Stack.Screen name="ExercieScreen" options={{ title: 'Exercice', headerStyle: { backgroundColor: '#D7F2F4' }, }} />
    </Stack>
  );
}