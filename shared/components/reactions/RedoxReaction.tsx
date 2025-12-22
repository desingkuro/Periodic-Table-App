// components/RedoxReaction.tsx
import { useRedoxExercise } from "@/shared/hooks/useRedoxExercise";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RedoxResultModal } from "./RedoxResultModal";

export default function RedoxReaction() {
    const { input, setInput, result, generate } = useRedoxExercise();
    const [showModal, setShowModal] = React.useState(false);

    const onSolve = () => {
        generate();
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            {/* Ejemplo explicado */}
            <Text style={styles.title}>Reacción óxido–reducción (redox)</Text>
            <Text style={styles.subtitle}>
                En una reacción redox hay transferencia de electrones entre especies:
                una se oxida y otra se reduce.[web:103][web:117]
            </Text>

            {/* Zona de ejercicios */}
            <View style={styles.exerciseCard}>
                <Text style={styles.cardTitle}>Practica: analiza un par redox</Text>
                <Text style={styles.exerciseText}>
                    Escribe dos pares redox en el formato{" "}
                    <Text style={styles.inlineCode}>reducido/oxidado ; oxidado/reducido</Text>{" "}
                    por ejemplo: <Text style={styles.inlineCode}>Zn/Zn2+ ; Cu2+/Cu</Text>.
                </Text>

                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder='Ej: Zn/Zn2+ ; Cu2+/Cu'
                    placeholderTextColor="#777"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onSolve}>
                    <Text style={styles.buttonText}>Analizar reacción redox</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo: Zn + CuSO₄</Text>
                <Text style={styles.equationBig}>
                    Zn + Cu²⁺ ⟶ Zn²⁺ + Cu
                </Text>
                <Text style={styles.note}>
                    El zinc metálico se oxida a Zn²⁺ (pierde electrones) y el ion Cu²⁺
                    se reduce a cobre metálico.[web:104][web:108]
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Pares redox</Text>
                <Text style={styles.equation}>
                    Zn/Zn²⁺ y Cu²⁺/Cu
                </Text>
                <Text style={styles.note}>
                    Cada par redox está formado por una especie reducida y su forma
                    oxidada. Comparando los pares se puede ver quién se oxida y quién se reduce.
                </Text>
            </View>

            {/* Modal de resultado */}
            <RedoxResultModal
                visible={showModal}
                result={result}
                onClose={() => setShowModal(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 4,
    },
    subtitle: {
        color: "#aaaaaa",
        fontSize: 13,
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#1c1f26",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    cardTitle: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 8,
    },
    equation: {
        color: "#90caf9",
        fontSize: 15,
        fontFamily: "monospace",
        marginBottom: 6,
    },
    equationBig: {
        color: "#90caf9",
        fontSize: 17,
        fontFamily: "monospace",
        marginBottom: 6,
    },
    note: {
        color: "#b0bec5",
        fontSize: 12,
    },
    // ejercicios
    exerciseCard: {
        backgroundColor: "#11141b",
        borderRadius: 12,
        padding: 14,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#2b3038",
        marginBottom: 12,
    },
    exerciseText: {
        color: "#cccccc",
        fontSize: 13,
        marginBottom: 10,
    },
    inlineCode: {
        fontFamily: "monospace",
        color: "#ffe082",
    },
    input: {
        backgroundColor: "#1f242f",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: "white",
        borderWidth: 1,
        borderColor: "#333b4a",
        marginBottom: 8,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#42a5f5",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 6,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
});
