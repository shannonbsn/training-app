import { Text, View, StyleSheet, TextInput } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Serie</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="" placeholderTextColor="#E0F2F1" />
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
    padding: 30,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  button: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    padding: 5,
    backgroundColor: '#FF578C',
    borderRadius: 5,
    color: '#000',
    maxWidth: 70,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#E0F2F1",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});