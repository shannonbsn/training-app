import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";

type Exercise = {
    name: string;
    time: string;
    repetition: string;
    breakTime: string;
};

export default function Timer() {
    const { serieName, exercises } = useLocalSearchParams();
    const parsedExercises: Exercise[] = exercises ? JSON.parse(exercises as string) : [];

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentRepetition, setCurrentRepetition] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (parsedExercises.length > 0) {
            const firstTime = parseInt(parsedExercises[0].time, 10);
            setTimeLeft(firstTime);
        }
    }, []);

    useEffect(() => {
        if (timeLeft <= 0 && isRunning) {
            handleTimerEnd();
            return;
        }

        let timer: NodeJS.Timeout | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timeLeft, isRunning]);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sound/bip_end.mp3')
        );
        await sound.playAsync();
    };

    const handleTimerEnd = async () => {
        await playSound();

        const current = parsedExercises[currentExerciseIndex];

        if (!isBreak) {
            if (currentRepetition < parseInt(current.repetition)) {
                setIsBreak(true);
                setTimeLeft(parseInt(current.breakTime));
            } else {
                if (currentExerciseIndex < parsedExercises.length - 1) {
                    setCurrentExerciseIndex(currentExerciseIndex + 1);
                    setCurrentRepetition(1);
                    setIsBreak(false);
                    setTimeLeft(parseInt(parsedExercises[currentExerciseIndex + 1].time));
                } else {
                    setTimeLeft(0);
                    setIsRunning(false);
                    setIsFinished(true);
                }
            }
        } else {
            setIsBreak(false);
            setCurrentRepetition((prev) => prev + 1);
            setTimeLeft(parseInt(current.time));
        }
    };

    const handleStartStop = () => {
        setIsRunning((prev) => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsFinished(false);
        setCurrentExerciseIndex(0);
        setCurrentRepetition(1);
        setIsBreak(false);
        setTimeLeft(parsedExercises.length > 0 ? parseInt(parsedExercises[0].time, 10) : 0);
    };

    const current = parsedExercises[currentExerciseIndex];

    if (isFinished) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Félicitations 🎉</Text>
                <Text style={styles.finishText}>Vous avez terminé votre série ! Bravo !</Text>
                <TouchableOpacity
                    style={[styles.button, styles.buttonReset, { marginTop: 30 }]}
                    onPress={handleReset}
                >
                    <Text style={styles.buttonText}>Restart Serie</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Timer - {serieName}</Text>
            <Text style={styles.exerciseTitle}>{current.name}</Text>
            <Text style={styles.repetition}>
                Répétition {currentRepetition}/{current.repetition}
            </Text>
            <Text style={[styles.timer, isBreak ? styles.breakTimer : styles.exerciseTimer]}>
                {isBreak ? "Break" : "Exercice"} : {timeLeft}s
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, isRunning ? styles.buttonStop : styles.buttonStart]}
                    onPress={handleStartStop}
                >
                    <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonReset]}
                    onPress={handleReset}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242424",
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        color: "#fff",
        marginBottom: 20,
    },
    exerciseTitle: {
        fontSize: 26,
        color: "#FF578C",
        fontWeight: "bold",
    },
    repetition: {
        fontSize: 20,
        color: "#fff",
        marginVertical: 10,
    },
    timer: {
        fontSize: 48,
        fontWeight: "bold",
        marginTop: 20,
    },
    exerciseTimer: {
        color: "#AAF683",
    },
    breakTimer: {
        color: "#FFCF53",
    },
    finishText: {
        fontSize: 24,
        color: "#AAF683",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-evenly",
        width: "100%",
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 25,
    },
    buttonStart: {
        backgroundColor: "#C5FFF2",
    },
    buttonStop: {
        backgroundColor: "#FF578C",
    },
    buttonReset: {
        backgroundColor: "#E6C5FF",
    },
    buttonText: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
    },
});
