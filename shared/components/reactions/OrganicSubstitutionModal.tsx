// components/OrganicSubstitutionModal.tsx
import { SubstitutionResult } from "@/shared/hooks/useOrganicSubstitution";
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
    result: SubstitutionResult | null;
    onClose: () => void;
}

export function OrganicSubstitutionModal({ visible, result, onClose }: Props) {
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
                        <Text style={styles.title}>Reacción de sustitución</Text>
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
                                    <Text style={styles.label}>Ecuación de la reacción</Text>
                                    <View style={styles.equationCard}>
                                        <Text style={styles.equation}>
                                            {result.reactant} + {result.reagent}
                                        </Text>
                                        <Ionicons name="arrow-forward" size={20} color="#A5D6A7" style={styles.arrow} />
                                        <Text style={styles.equation}>
                                            {result.product} + {result.leaving}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Tipo de sustitución</Text>
                                    <View style={styles.badge}>
                                        <Ionicons name="swap-horizontal" size={18} color="#1a1a1a" />
                                        <Text style={styles.badgeText}>{result.substitutionType}</Text>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Mecanismo</Text>
                                    <Text style={styles.mechanism}>{result.mechanism}</Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Análisis</Text>
                                    <View style={styles.analysisCard}>
                                        <View style={styles.analysisRow}>
                                            <Ionicons name="enter-outline" size={18} color="#90caf9" />
                                            <Text style={styles.analysisLabel}>Grupo que entra:</Text>
                                            <Text style={styles.analysisValue}>{result.reagent}</Text>
                                        </View>
                                        <View style={styles.analysisRow}>
                                            <Ionicons name="exit-outline" size={18} color="#ef9a9a" />
                                            <Text style={styles.analysisLabel}>Grupo que sale:</Text>
                                            <Text style={styles.analysisValue}>{result.leaving}</Text>
                                        </View>
                                    </View>
                                </View>
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
    equationCard: {
        backgroundColor: "#1c1f26",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    equation: {
        color: "#90caf9",
        fontSize: 16,
        fontFamily: "monospace",
        fontWeight: "600",
    },
    arrow: {
        marginVertical: 8,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#A5D6A7",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: "flex-start",
        gap: 6,
    },
    badgeText: {
        color: "#1a1a1a",
        fontSize: 14,
        fontWeight: "700",
    },
    mechanism: {
        color: "#e0e0e0",
        fontSize: 14,
        backgroundColor: "#1c1f26",
        padding: 12,
        borderRadius: 8,
    },
    analysisCard: {
        backgroundColor: "#1c1f26",
        padding: 12,
        borderRadius: 12,
        gap: 10,
    },
    analysisRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    analysisLabel: {
        color: "#aaaaaa",
        fontSize: 13,
        flex: 1,
    },
    analysisValue: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
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
