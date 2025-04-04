import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Create Serie</Text>
      <Text style={styles.text}>About screen</Text>
      <Link href="/ExerciceScreen" style={styles.button}>
        Next
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
  button: {
    fontSize: 20,
    marginTop: 20,
    padding: 5,
    backgroundColor: '#FF578C',
    color: '#000',
  },
});