// components/OrganicIdentification.tsx
import { useOrganicIdentification } from "@/shared/hooks/useOrganicIdentification";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { OrganicIdentificationModal } from "./OrganicIdentificationModal";

export default function OrganicIdentification() {
    const { input, setInput, result, analyze } = useOrganicIdentification();
    const [showModal, setShowModal] = React.useState(false);

    const onAnalyze = () => {
        analyze();
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            {/* Ejemplos educativos */}
            <Text style={styles.title}>Identificación de compuestos orgánicos</Text>
            <Text style={styles.subtitle}>
                Reconoce grupos funcionales y clasifica compuestos orgánicos según su estructura.
            </Text>

            {/* Zona de ejercicios */}
            <View style={styles.exerciseCard}>
                <Text style={styles.cardTitle}>Practica: identifica un compuesto</Text>
                <Text style={styles.exerciseText}>
                    Escribe la fórmula de un compuesto orgánico y descubre qué grupos
                    funcionales tiene.
                </Text>

                <Text style={styles.label}>Fórmula del compuesto</Text>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ej: CH3OH, CH3COOH, CH3CHO"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onAnalyze}>
                    <Text style={styles.buttonText}>Identificar compuesto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Grupos funcionales principales</Text>
                <View style={styles.groupsList}>
                    <GroupItem name="Alcohol" example="CH₃OH" group="-OH" />
                    <GroupItem name="Aldehído" example="CH₃CHO" group="-CHO" />
                    <GroupItem name="Cetona" example="CH₃COCH₃" group="C=O" />
                    <GroupItem name="Ácido carboxílico" example="CH₃COOH" group="-COOH" />
                    <GroupItem name="Éster" example="CH₃COOCH₃" group="-COO-" />
                    <GroupItem name="Amina" example="CH₃NH₂" group="-NH₂" />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo: Etanol</Text>
                <Text style={styles.equationBig}>C₂H₅OH</Text>
                <Text style={styles.note}>
                    Contiene el grupo funcional hidroxilo (-OH), por lo tanto es un alcohol.
                    Nombre sistemático: etan-1-ol.
                </Text>
            </View>

            {/* Modal de resultado */}
            <OrganicIdentificationModal
                visible={showModal}
                result={result}
                onClose={() => setShowModal(false)}
            />
        </View>
    );
}

// Componente auxiliar para items de grupos
function GroupItem({ name, example, group }: { name: string; example: string; group: string }) {
    return (
        <View style={styles.groupItem}>
            <Text style={styles.groupName}>{name}</Text>
            <Text style={styles.groupExample}>{example}</Text>
            <Text style={styles.groupSymbol}>{group}</Text>
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
    groupsList: {
        gap: 8,
    },
    groupItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#11141b",
        padding: 10,
        borderRadius: 8,
    },
    groupName: {
        color: "#e0e0e0",
        fontSize: 13,
        flex: 1,
    },
    groupExample: {
        color: "#90caf9",
        fontSize: 12,
        fontFamily: "monospace",
        marginRight: 8,
    },
    groupSymbol: {
        color: "#A5D6A7",
        fontSize: 12,
        fontWeight: "600",
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
        marginBottom: 12,
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
