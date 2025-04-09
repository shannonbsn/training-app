import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

export default function Index() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [repetition, setRepetition] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const [exercises, setExercises] = useState<
        { name: string; time: string; repetition: string; breakTime: string }[]
    >([]);

    const handleNumericInput = (
        text: string,
        setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setter(numericValue);
    };

    const addExercise = () => {
        if (!name || !time || !repetition || !breakTime) return;

        setExercises([
            ...exercises,
            {
                name,
                time,
                repetition,
                breakTime,
            },
        ]);

        setName("");
        setTime("");
        setRepetition("");
        setBreakTime("");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exercice</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Squat"
                placeholderTextColor="#E0F2F1"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Time</Text>
            <TextInput
                style={styles.input}
                placeholder="30"
                placeholderTextColor="#E0F2F1"
                keyboardType="numeric"
                value={time}
                onChangeText={(text) => handleNumericInput(text, setTime)}
            />

            <Text style={styles.label}>Repetition</Text>
            <TextInput
                style={styles.input}
                placeholder="5"
                placeholderTextColor="#E0F2F1"
                keyboardType="numeric"
                value={repetition}
                onChangeText={(text) => handleNumericInput(text, setRepetition)}
            />

            <Text style={styles.label}>Break</Text>
            <TextInput
                style={styles.input}
                placeholder="30"
                placeholderTextColor="#E0F2F1"
                keyboardType="numeric"
                value={breakTime}
                onChangeText={(text) => handleNumericInput(text, setBreakTime)}
            />

            <TouchableOpacity style={styles.button} onPress={addExercise}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            {exercises.length > 0 && (
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title}>Exercice list</Text>
                    {exercises.map((ex, index) => (
                        <View key={index} style={styles.label}>
                            <Text style={styles.inputList}>
                                {ex.name} — {ex.time}s × {ex.repetition} reps — break: {ex.breakTime}s
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
        padding: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
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
    inputList: {
        backgroundColor: "#E6C5FF",
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FF578C',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
});