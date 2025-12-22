// components/AcidBaseResultModal.tsx
import { AcidBaseResult } from "@/shared/hooks/useAcidBaseExercise";
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
    result: AcidBaseResult | null;
    onClose: () => void;
}

export function AcidBaseResultModal({ visible, result, onClose }: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <Text style={styles.title}>Resultado de neutralización</Text>

                    {!result || !result.valid ? (
                        <Text style={styles.error}>{result?.error}</Text>
                    ) : (
                        <>
                            <Text style={styles.equation}>
                                {result.acid} + {result.base} → {result.salt} + {result.water}
                            </Text>
                            <Text style={styles.text}>
                                La reacción representa la neutralización entre un ácido y una
                                base fuerte, produciendo una sal y agua.[web:120]
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
    equation: {
        color: "#90caf9",
        fontSize: 16,
        fontFamily: "monospace",
        marginBottom: 8,
    },
    text: {
        color: "#cfd8dc",
        fontSize: 13,
        marginBottom: 14,
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
