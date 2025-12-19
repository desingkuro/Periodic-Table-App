import { Image, StyleSheet, Text, View } from "react-native";
import { ElementoQuimico } from "../interfaces/Table.interface";
import AtomicCard from "./AtomicCard";
import Section from "./Section";

export default function EstructuraTab({ element }: { element: ElementoQuimico }) {
    return (
        <View style={styles.tabContent}>
            <Section title="Estructura Atómica">
                <View style={styles.atomicStructure}>
                    <AtomicCard label="Protones" value={element.protones} color="#FF6B6B" />
                    <AtomicCard label="Neutrones" value={element.neutrones_estimados} color="#4ECDC4" />
                    <AtomicCard label="Electrones" value={element.electrones} color="#45B7D1" />
                </View>
            </Section>

            <Section title="Configuración Electrónica">
                <Text style={styles.configText}>{element.configuracion_electronica}</Text>
            </Section>

            <Section title="Distribución por Capas">
                <View style={styles.shellsContainer}>
                    {element.capas.map((electrons, idx) => (
                        <View key={idx} style={styles.shellItem}>
                            <Text style={styles.shellLabel}>Capa {idx + 1}</Text>
                            <Text style={styles.shellValue}>{electrons} e⁻</Text>
                        </View>
                    ))}
                </View>
            </Section>

            {element.modelo_bohr_imagen && (
                <Section title="Modelo de Bohr">
                    <Image
                        source={{ uri: element.modelo_bohr_imagen }}
                        style={styles.bohrModelLarge}
                        resizeMode="contain"
                    />
                </Section>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f0f",
    },
    atomicStructure: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 12,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#1a1a1a",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },
    tabActive: {
        borderBottomWidth: 3,
    },
    tabText: {
        color: "#999",
        fontSize: 14,
        fontWeight: "600",
    },
    tabTextActive: {
        color: "white",
    },
    content: {
        flex: 1,
    },
    tabContent: {
        padding: 20,
    },
    resumen: {
        fontSize: 16,
        color: "#ddd",
        lineHeight: 24,
        marginBottom: 20,
    },
    propertyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#222",
    },
    propertyLabel: {
        fontSize: 14,
        color: "#999",
        flex: 1,
    },
    propertyValue: {
        fontSize: 14,
        color: "white",
        fontWeight: "600",
        flex: 1,
        textAlign: "right",
    },
    configText: {
        fontSize: 16,
        color: "#4ECDC4",
        fontFamily: "monospace",
        backgroundColor: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
    },
    shellsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    shellItem: {
        backgroundColor: "#1a1a1a",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333",
    },
    shellLabel: {
        fontSize: 12,
        color: "#999",
    },
    shellValue: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
        marginTop: 4,
    },
    bohrModelLarge: {
        width: "100%",
        height: 250,
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
    },
});
