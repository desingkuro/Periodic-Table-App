import { CombustionResult } from "@/shared/hooks/useCombustionExercise";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CombustionModalInterface {
    showModal: boolean;
    closeModal: () => void;
    result: CombustionResult | null;
}
export default function CombustionModal({ showModal, closeModal, result }: CombustionModalInterface) {

    return (
        <Modal
            visible={showModal}
            transparent
            animationType="fade"
            onRequestClose={closeModal}
        >
            <View style={styles.modalBackdrop}>
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Resultado de la combustión</Text>

                    {!result || !result.valid ? (
                        <Text style={styles.modalError}>{result?.error}</Text>
                    ) : (
                        <>
                            <Text style={styles.modalEquation}>{result.balanced}</Text>
                            <Text style={styles.modalInfo}>
                                El compuesto contiene {result.x} átomos de carbono y {result.y} átomos de hidrógeno.
                            </Text>
                        </>
                    )}

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.modalButtonSecondary]}
                            onPress={closeModal}
                        >
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    // Modal
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    modalCard: {
        backgroundColor: "#151922",
        borderRadius: 14,
        padding: 16,
        width: "100%",
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    modalTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
    },
    modalEquation: {
        color: "#90caf9",
        fontSize: 16,
        fontFamily: "monospace",
        marginBottom: 8,
    },
    modalInfo: {
        color: "#cfd8dc",
        fontSize: 13,
        marginBottom: 12,
    },
    modalError: {
        color: "#ef9a9a",
        fontSize: 13,
        marginBottom: 12,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modalButtonSecondary: {
        backgroundColor: "#394553",
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
        paddingHorizontal: 16,
    },
})