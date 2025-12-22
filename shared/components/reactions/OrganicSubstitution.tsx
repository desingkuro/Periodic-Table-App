// components/OrganicSubstitution.tsx
import { useOrganicSubstitution } from "@/shared/hooks/useOrganicSubstitution";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { OrganicSubstitutionModal } from "./OrganicSubstitutionModal";

export default function OrganicSubstitution() {
    const {
        reactantInput,
        setReactantInput,
        reagentInput,
        setReagentInput,
        result,
        generate,
    } = useOrganicSubstitution();

    const [showModal, setShowModal] = React.useState(false);

    const onGenerate = () => {
        generate();
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            {/* Ejemplos educativos */}
            <Text style={styles.title}>Reacciones de sustitución orgánica</Text>
            <Text style={styles.subtitle}>
                Un átomo o grupo funcional es reemplazado por otro en una molécula orgánica.
            </Text>

            {/* Zona de ejercicios */}
            <View style={styles.exerciseCard}>
                <Text style={styles.cardTitle}>Practica: genera una sustitución</Text>
                <Text style={styles.exerciseText}>
                    Escribe el compuesto orgánico y el reactivo. La app generará la
                    reacción de sustitución correspondiente.
                </Text>

                <Text style={styles.label}>Compuesto orgánico (reactante)</Text>
                <TextInput
                    value={reactantInput}
                    onChangeText={setReactantInput}
                    placeholder="Ej: CH4, CH3Cl, CH3OH, C6H6"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <Text style={styles.label}>Reactivo</Text>
                <TextInput
                    value={reagentInput}
                    onChangeText={setReagentInput}
                    placeholder="Ej: Cl2, OH, HBr, Br2"
                    placeholderTextColor="#777"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onGenerate}>
                    <Ionicons name="flask" size={18} color="white" style={{ marginRight: 6 }} />
                    <Text style={styles.buttonText}>Generar reacción</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Tipos de sustitución</Text>
                <View style={styles.typesList}>
                    <SubstitutionTypeItem
                        name="Halogenación de alcanos"
                        example="CH₄ + Cl₂ → CH₃Cl + HCl"
                        icon="flash-outline"
                        color="#ffa726"
                    />
                    <SubstitutionTypeItem
                        name="Sustitución nucleofílica"
                        example="CH₃Cl + OH⁻ → CH₃OH + Cl⁻"
                        icon="swap-horizontal-outline"
                        color="#42a5f5"
                    />
                    <SubstitutionTypeItem
                        name="Sustitución electrofílica aromática"
                        example="C₆H₆ + Cl₂ → C₆H₅Cl + HCl"
                        icon="git-network-outline"
                        color="#66bb6a"
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo 1: Halogenación del metano</Text>
                <Text style={styles.equationBig}>CH₄ + Cl₂ → CH₃Cl + HCl</Text>
                <Text style={styles.note}>
                    Un átomo de hidrógeno es sustituido por cloro mediante radicales libres.
                    Se forma clorometano y ácido clorhídrico.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ejemplo 2: Formación de alcohol</Text>
                <Text style={styles.equationBig}>CH₃Br + OH⁻ → CH₃OH + Br⁻</Text>
                <Text style={styles.note}>
                    El ion hidroxilo sustituye al bromo. Mecanismo SN2 (sustitución nucleofílica bimolecular).
                </Text>
            </View>

            {/* Modal de resultado */}
            <OrganicSubstitutionModal
                visible={showModal}
                result={result}
                onClose={() => setShowModal(false)}
            />
        </View>
    );
}

function SubstitutionTypeItem({
    name,
    example,
    icon,
    color,
}: {
    name: string;
    example: string;
    icon: any;
    color: string;
}) {
    return (
        <View style={[styles.typeItem, { borderLeftColor: color }]}>
            <View style={[styles.typeIcon, { backgroundColor: `${color}33` }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <View style={styles.typeContent}>
                <Text style={styles.typeName}>{name}</Text>
                <Text style={styles.typeExample}>{example}</Text>
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
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 2,
    },
    typeExample: {
        color: "#90caf9",
        fontSize: 11,
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
        flexDirection: "row",
        backgroundColor: "#42a5f5",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
});
