// components/OrganicIdentificationModal.tsx
import { OrganicResult } from "@/shared/hooks/useOrganicIdentification";
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
    result: OrganicResult | null;
    onClose: () => void;
}

export function OrganicIdentificationModal({ visible, result, onClose }: Props) {
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
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{result.compoundType}</Text>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Grupos funcionales identificados</Text>
                                    {result.functionalGroups.map((group, idx) => (
                                        <View key={idx} style={styles.groupItem}>
                                            <Ionicons name="checkmark-circle" size={18} color="#66bb6a" />
                                            <Text style={styles.groupText}>{group}</Text>
                                        </View>
                                    ))}
                                </View>

                                {result.examples.length > 0 && (
                                    <View style={styles.section}>
                                        <Text style={styles.label}>Ejemplos similares</Text>
                                        {result.examples.map((example, idx) => (
                                            <Text key={idx} style={styles.exampleText}>
                                                • {example}
                                            </Text>
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
    badge: {
        backgroundColor: "#A5D6A7",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    badgeText: {
        color: "#1a1a1a",
        fontSize: 14,
        fontWeight: "700",
    },
    groupItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        backgroundColor: "#1c1f26",
        padding: 10,
        borderRadius: 8,
    },
    groupText: {
        color: "#e0e0e0",
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
    exampleText: {
        color: "#b0bec5",
        fontSize: 13,
        marginBottom: 4,
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
