// components/InorganicIdentificationModal.tsx
import { InorganicResult } from "@/shared/hooks/useInorganicIdentification";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    visible: boolean;
    result: InorganicResult | null;
    onClose: () => void;
}

export function InorganicIdentificationModal({ visible, result, onClose }: Props) {
    const getIconName = (type: string): any => {
        if (type.includes("Óxido")) return "layers-outline";
        if (type.includes("Ácido") || type.includes("ácido")) return "beaker-outline";
        if (type.includes("Hidróxido") || type.includes("Base")) return "flask-outline";
        if (type.includes("Sal")) return "cube-outline";
        return "help-circle-outline";
    };

    const getColor = (type: string) => {
        if (type.includes("Óxido")) return "#ef5350";
        if (type.includes("Ácido") || type.includes("ácido")) return "#42a5f5";
        if (type.includes("Hidróxido") || type.includes("Base")) return "#66bb6a";
        if (type.includes("Sal")) return "#ffa726";
        return "#bdbdbd";
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Resultado de identificación</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        {!result || !result.valid ? (
                            <Text style={styles.error}>{result?.error}</Text>
                        ) : (
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.label}>Fórmula analizada</Text>
                                    <Text style={styles.formula}>{result.formula}</Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Tipo de compuesto</Text>
                                    <View
                                        style={[
                                            styles.typeCard,
                                            { borderLeftColor: getColor(result.compoundType) },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.iconCircle,
                                                { backgroundColor: `${getColor(result.compoundType)}33` },
                                            ]}
                                        >
                                            <Ionicons
                                                name={getIconName(result.compoundType)}
                                                size={24}
                                                color={getColor(result.compoundType)}
                                            />
                                        </View>
                                        <View style={styles.typeInfo}>
                                            <Text style={styles.typeName}>{result.compoundType}</Text>
                                            <Text style={styles.typeClass}>{result.classification}</Text>
                                        </View>
                                    </View>
                                </View>

                                {result.nomenclature && (
                                    <View style={styles.section}>
                                        <Text style={styles.label}>Composición</Text>
                                        <Text style={styles.nomenclature}>{result.nomenclature}</Text>
                                    </View>
                                )}

                                {result.examples.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.label}>Ejemplos similares</Text>
                                        {result.examples.map((example, idx) => (
                                            <View key={idx} style={styles.exampleItem}>
                                                <Ionicons
                                                    name="checkmark-circle-outline"
                                                    size={16}
                                                    color="#90caf9"
                                                />
                                                <Text style={styles.exampleText}>{example}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </>
                        )}
                    </ScrollView>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: "flex-end",
    },
    card: {
        backgroundColor: "#151922",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        maxHeight: "85%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#2b3038",
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    closeButton: {
        padding: 4,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        color: "#aaaaaa",
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
        marginBottom: 8,
    },
    formula: {
        color: "#90caf9",
        fontSize: 20,
        fontFamily: "monospace",
        fontWeight: "600",
    },
    typeCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1c1f26",
        padding: 12,
        borderRadius: 12,
        borderLeftWidth: 4,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    typeInfo: {
        flex: 1,
    },
    typeName: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 2,
    },
    typeClass: {
        color: "#aaaaaa",
        fontSize: 13,
    },
    nomenclature: {
        color: "#e0e0e0",
        fontSize: 14,
        backgroundColor: "#1c1f26",
        padding: 12,
        borderRadius: 8,
    },
    exampleItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    exampleText: {
        color: "#b0bec5",
        fontSize: 13,
        marginLeft: 8,
    },
    error: {
        color: "#ef9a9a",
        fontSize: 14,
        marginBottom: 14,
    },
    button: {
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: "#42a5f5",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 15,
    },
});

