// components/InorganicIdentification.tsx
import { useInorganicIdentification } from "@/shared/hooks/useInorganicIdentification";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { InorganicIdentificationModal } from "./InorganicIdentificationModal";

export default function InorganicIdentification() {
    const { input, setInput, result, analyze } = useInorganicIdentification();
    const [showModal, setShowModal] = React.useState(false);

    const onAnalyze = () => {
        analyze();
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            {/* Ejemplos educativos */}
            <Text style={styles.title}>Identificación de compuestos inorgánicos</Text>
            <Text style={styles.subtitle}>
                Clasifica óxidos, ácidos, bases y sales según su composición química.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Tipos principales de compuestos</Text>
                <View style={styles.typesList}>
                    <TypeItem
                        name="Óxidos"
                        formula="M + O / NM + O"
                        color="#ef5350"
                        icon="layers-outline"
                    />
                    <TypeItem
                        name="Ácidos"
                        formula="H + NM (±O)"
                        color="#42a5f5"
                        icon="beaker-outline"
                    />
                    <TypeItem
                        name="Bases"
                        formula="M + OH"
                        color="#66bb6a"
                        icon="flask-outline"
                    />
                    <TypeItem
                        name="Sales"
                        formula="M + NM (±O)"
                        color="#ffa726"
                        icon="cube-outline"
                    />
                </View>
            </View>

            {/* Zona de ejercicios */}
            <View style={styles.exerciseCard}>
                <Text style={styles.cardTitle}>Practica: identifica un compuesto</Text>
                <Text style={styles.exerciseText}>
                    Escribe la fórmula de un compuesto inorgánico y descubre su
                    clasificación.
                </Text>

                <Text style={styles.label}>Fórmula del compuesto</Text>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ej: NaCl, H2SO4, Ca(OH)2"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onAnalyze}>
                    <Text style={styles.buttonText}>Identificar compuesto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo 1: Ácido sulfúrico</Text>
                <Text style={styles.equationBig}>H₂SO₄</Text>
                <Text style={styles.note}>
                    Contiene H + S + O, por lo tanto es un oxoácido (ácido ternario).
                    Hidrógeno + azufre + oxígeno.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo 2: Hidróxido de sodio</Text>
                <Text style={styles.equationBig}>NaOH</Text>
                <Text style={styles.note}>
                    Contiene Na + OH, por lo tanto es un hidróxido (base).
                    Metal + grupo hidroxilo.
                </Text>
            </View>

            {/* Modal de resultado */}
            <InorganicIdentificationModal
                visible={showModal}
                result={result}
                onClose={() => setShowModal(false)}
            />
        </View>
    );
}

// Componente auxiliar para tipos de compuestos
function TypeItem({
    name,
    formula,
    color,
    icon,
}: {
    name: string;
    formula: string;
    color: string;
    icon: any;
}) {
    return (
        <View style={[styles.typeItem, { borderLeftColor: color }]}>
            <View style={[styles.typeIcon, { backgroundColor: `${color}33` }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <View style={styles.typeContent}>
                <Text style={styles.typeName}>{name}</Text>
                <Text style={styles.typeFormula}>{formula}</Text>
            </View>
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
    typesList: {
        gap: 8,
    },
    typeItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#11141b",
        padding: 10,
        borderRadius: 8,
        borderLeftWidth: 3,
    },
    typeIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    typeContent: {
        flex: 1,
    },
    typeName: {
        color: "#e0e0e0",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 2,
    },
    typeFormula: {
        color: "#90caf9",
        fontSize: 12,
        fontFamily: "monospace",
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
    exerciseCard: {
        backgroundColor: "#11141b",
        borderRadius: 12,
        padding: 14,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#2b3038",
        marginBottom:12
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
