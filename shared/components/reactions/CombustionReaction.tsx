// shared/components/CombustionReaction.tsx
import { useCombustionExercise } from "@/shared/hooks/useCombustionExercise";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CombustionModal from "./CombustionModal";

interface CombustionReactionProps {
    fuelFormula?: string;
    fuelName?: string;
}

export default function CombustionReaction({
    fuelFormula = "CH₄",
    fuelName = "Metano",
}: CombustionReactionProps) {
    const { input, setInput, result, generate, reset } = useCombustionExercise();
    const [showModal, setShowModal] = React.useState(false);

    const onSolve = () => {
        generate();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reacción de combustión</Text>
            <Text style={styles.subtitle}>
                Combustión completa de un hidrocarburo: reacciona con oxígeno y forma dióxido de carbono y agua.
            </Text>

            <View style={styles.exerciseCard}>
                <Text style={styles.cardTitle}>Practica: genera la combustión</Text>
                <Text style={styles.exerciseText}>
                    Escribe la fórmula de un hidrocarburo (CxHy) y genera la ecuación de combustión completa.
                </Text>

                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ej: CH4, C2H6, C3H8"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onSolve}>
                    <Text style={styles.buttonText}>Calcular combustión</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Forma general</Text>
                <Text style={styles.equation}>
                    Hidrocarburo + O₂ ⟶ CO₂ + H₂O
                </Text>
                <Text style={styles.note}>
                    Siempre interviene oxígeno y los productos principales son CO₂ y H₂O.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo: {fuelName}</Text>
                <Text style={styles.equationBig}>
                    {fuelFormula} + 2 O₂ ⟶ CO₂ + 2 H₂O
                </Text>
                <Text style={styles.note}>
                    Esta es la ecuación balanceada para la combustión completa del metano.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>¿Qué está pasando?</Text>
                <Text style={styles.bullet}>• El combustible ({fuelFormula}) aporta carbono e hidrógeno.</Text>
                <Text style={styles.bullet}>• El oxígeno del aire (O₂) es el agente oxidante.</Text>
                <Text style={styles.bullet}>• El carbono se oxida a CO₂ y el hidrógeno a H₂O, liberando energía.</Text>
            </View>

            {/* Modal con resultado */}
            <CombustionModal showModal={showModal} closeModal={closeModal} result={result}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    bullet: {
        color: "#e0e0e0",
        fontSize: 13,
        marginBottom: 4,
    },
    // Ejercicios
    exerciseCard: {
        backgroundColor: "#11141b",
        borderRadius: 12,
        padding: 14,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    exerciseText: {
        color: "#cccccc",
        fontSize: 13,
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#1f242f",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: "white",
        borderWidth: 1,
        borderColor: "#333b4a",
        marginBottom: 10,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#42a5f5",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
});
