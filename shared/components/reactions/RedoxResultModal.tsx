// components/RedoxResultModal.tsx
import { RedoxResult } from "@/shared/hooks/useRedoxExercise";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    visible: boolean;
    result: RedoxResult | null;
    onClose: () => void;
}

export function RedoxResultModal({ visible, result, onClose }: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <Text style={styles.title}>Análisis redox</Text>

                    {!result || !result.valid ? (
                        <Text style={styles.error}>{result?.error}</Text>
                    ) : (
                        <>
                            <Text style={styles.sectionTitle}>Quién se oxida y quién se reduce</Text>
                            <Text style={styles.line}>
                                • Se oxida: <Text style={styles.highlight}>{result.oxidized}</Text>
                            </Text>
                            <Text style={styles.line}>
                                • Se reduce: <Text style={styles.highlight}>{result.reduced}</Text>
                            </Text>

                            <Text style={styles.sectionTitle}>Agentes</Text>
                            <Text style={styles.line}>
                                • Agente reductor: <Text style={styles.highlight}>{result.reductant}</Text>
                            </Text>
                            <Text style={styles.line}>
                                • Agente oxidante: <Text style={styles.highlight}>{result.oxidant}</Text>
                            </Text>

                            <Text style={styles.note}>
                                El agente reductor se oxida (pierde electrones) y el agente oxidante
                                se reduce (gana electrones).[web:103][web:112]
                            </Text>
                        </>
                    )}

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
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    card: {
        width: "100%",
        backgroundColor: "#151922",
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
    },
    sectionTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 6,
        marginBottom: 4,
    },
    line: {
        color: "#cfd8dc",
        fontSize: 13,
        marginBottom: 2,
    },
    highlight: {
        color: "#90caf9",
        fontWeight: "600",
    },
    note: {
        color: "#b0bec5",
        fontSize: 12,
        marginTop: 8,
        marginBottom: 10,
    },
    error: {
        color: "#ef9a9a",
        fontSize: 13,
        marginBottom: 14,
    },
    button: {
        alignSelf: "flex-end",
        backgroundColor: "#394553",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
});
