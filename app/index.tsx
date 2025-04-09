import { Text, View, StyleSheet, TextInput } from "react-native";
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";

export default function Index() {
  const [serieName, setSerieName] = useState("");
  const [savedSeries, setSavedSeries] = useState<string[]>([]);
  const { newSerie } = useLocalSearchParams();

  useEffect(() => {
    if (newSerie && typeof newSerie === 'string') {
      setSavedSeries((prev) => [...prev, newSerie]);
    }
  }, [newSerie]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Serie</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Serie"
        placeholderTextColor="#E0F2F1"
        value={serieName}
        onChangeText={setSerieName}
      />
      <Link
        href={{ pathname: "/ExerciceScreen", params: { serieName } }}
        style={styles.button}
      >
        Next
      </Link>

      <Text style={styles.title}>View Serie</Text>
      {savedSeries.map((s, i) => (
        <Text key={i} style={{ color: "#fff" }}>{s}</Text>
      ))}
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
    marginTop: 10,
    textAlign: "center",
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#FF578C',
    borderRadius: 5,
    color: '#000',
    width: 120,
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