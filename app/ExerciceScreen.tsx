import { Text, View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Link } from 'expo-router';

export default function Index() {
    const [time, setTime] = useState("");
    const [repetition, setRepetition] = useState("");
    const [breakTime, setBreakTime] = useState("");

    const handleNumericInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setter(numericValue);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercice</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Squat" placeholderTextColor="#E0F2F1" />
            <Text style={styles.label}>Time</Text>
            <TextInput style={styles.input} placeholder="30" placeholderTextColor="#E0F2F1" keyboardType="numeric" value={time} onChangeText={(text) => handleNumericInput(text, setTime)} />
            <Text style={styles.label}>Repetition</Text>
            <TextInput style={styles.input} placeholder="5" placeholderTextColor="#E0F2F1" keyboardType="numeric" value={repetition} onChangeText={(text) => handleNumericInput(text, setRepetition)} />
            <Text style={styles.label}>Break</Text>
            <TextInput style={styles.input} placeholder="30" placeholderTextColor="#E0F2F1" keyboardType="numeric" value={breakTime} onChangeText={(text) => handleNumericInput(text, setBreakTime)} />
            <Link href="/ExerciceScreen" style={styles.button}>
                Add
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