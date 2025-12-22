// components/AcidBaseNeutralization.tsx
import { useAcidBaseExercise } from "@/shared/hooks/useAcidBaseExercise";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AcidBaseResultModal } from "./AcidBaseResultModal";

export default function AcidBaseNeutralization() {
    const {
        acidInput,
        setAcidInput,
        baseInput,
        setBaseInput,
        result,
        generate,
    } = useAcidBaseExercise();

    const [showModal, setShowModal] = React.useState(false);

    const onSolve = () => {
        generate();
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            {/* Ejemplo explicado */}
            <Text style={styles.title}>Reacción ácido–base (neutralización)</Text>
            <Text style={styles.subtitle}>
                Un ácido reacciona con una base para formar una sal y agua.[web:120]
            </Text>

            {/* Zona de ejercicios */}
            <View style={styles.exerciseCard}>
                <Text style={styles.cardTitle}>Practica: genera la neutralización</Text>
                <Text style={styles.exerciseText}>
                    Escribe la fórmula de un ácido (HX) y de una base (MOH). Se generará
                    la ecuación de neutralización correspondiente.
                </Text>

                <Text style={styles.label}>Ácido (ej: HCl, HBr)</Text>
                <TextInput
                    value={acidInput}
                    onChangeText={setAcidInput}
                    placeholder="HCl"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <Text style={styles.label}>Base (ej: NaOH, KOH)</Text>
                <TextInput
                    value={baseInput}
                    onChangeText={setBaseInput}
                    placeholder="NaOH"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onSolve}>
                    <Text style={styles.buttonText}>Calcular neutralización</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo clásico</Text>
                <Text style={styles.equationBig}>
                    HCl + NaOH ⟶ NaCl + H₂O
                </Text>
                <Text style={styles.note}>
                    El ácido clorhídrico reacciona con el hidróxido de sodio para formar
                    cloruro de sodio (sal común) y agua.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Forma general</Text>
                <Text style={styles.equation}>
                    Ácido (HX) + Base (MOH) ⟶ Sal (MX) + H₂O
                </Text>
                <Text style={styles.note}>
                    HX representa un ácido binario y MOH una base fuerte típica; la sal se
                    forma a partir del catión de la base y el anión del ácido.[web:120]
                </Text>
            </View>

            {/* Modal de resultado */}
            <AcidBaseResultModal
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
    // ejercicios
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
    label: {
        color: "#bbbbbb",
        fontSize: 13,
        marginBottom: 4,
        marginTop: 4,
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
