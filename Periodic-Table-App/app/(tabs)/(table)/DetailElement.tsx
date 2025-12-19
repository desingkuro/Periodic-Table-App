// ElementDetailScreen.tsx
import EstructuraTab from "@/shared/components/EstructuraTab";
import PropiedadesTab from "@/shared/components/PropiedadesTab";
import { ResumenTab } from "@/shared/components/ResumenTab";
import Section from "@/shared/components/Section";
import { contexto } from "@/shared/context/ContextoGeneral";
import { ElementoQuimico } from "@/shared/interfaces/Table.interface";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type Tab = "resumen" | "propiedades" | "estructura" | "mas";

export default function ElementDetailScreen() {
    const [activeTab, setActiveTab] = useState<Tab>("resumen");
    const { elementSelect }: any = useContext(contexto);
    
    // ← GUARDAR LOCALMENTE para evitar que se pierda durante la transición
    const [localElement, setLocalElement] = useState<ElementoQuimico | null>(elementSelect);

    useEffect(() => {
        if (elementSelect) {
            setLocalElement(elementSelect);
        }
    }, [elementSelect]);

    // Usar localElement en vez de elementSelect
    const element = localElement || elementSelect;

    if (!element) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Cargando...</Text>
            </View>
        );
    }

    const openLink = (url: string) => {
        if (url) Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: element.categoria_color }]}>

                <View style={styles.headerContent}>
                    <Text style={styles.headerNumber}>{element.numero}</Text>
                    <Text style={styles.headerSymbol}>{element.simbolo}</Text>
                    <Text style={styles.headerName}>{element.nombre}</Text>
                    <Text style={styles.headerCategory}>{element.categoria}</Text>
                </View>

                {element.modelo_bohr_imagen && (
                    <Image
                        source={{ uri: element.modelo_bohr_imagen }}
                        style={styles.bohrImage}
                        resizeMode="contain"
                    />
                )}
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {[
                    { id: "resumen", label: "Resumen" },
                    { id: "propiedades", label: "Propiedades" },
                    { id: "estructura", label: "Estructura" },
                    { id: "mas", label: "Más" },
                ].map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            styles.tab,
                            activeTab === tab.id && [
                                styles.tabActive,
                                { borderBottomColor: element.categoria_color },
                            ],
                        ]}
                        onPress={() => setActiveTab(tab.id as Tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.id && styles.tabTextActive,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {activeTab === "resumen" && <ResumenTab element={element} />}
                {activeTab === "propiedades" && <PropiedadesTab element={element} />}
                {activeTab === "estructura" && <EstructuraTab element={element} />}
                {activeTab === "mas" && (
                    <MasTab element={element} onOpenLink={openLink} />
                )}
            </ScrollView>
        </View>
    );
}


// ============ TAB: MÁS ============
function MasTab({
    element,
    onOpenLink,
}: {
    element: ElementoQuimico;
    onOpenLink: (url: string) => void;
}) {
    return (
        <View style={styles.tabContent}>
            {element.usos && element.usos.length > 0 && (
                <Section title="Usos y Aplicaciones">
                    {element.usos.map((uso, idx) => (
                        <Text key={idx} style={styles.listItem}>
                            • {uso}
                        </Text>
                    ))}
                </Section>
            )}

            {element.riesgos && element.riesgos.length > 0 && (
                <Section title="Riesgos y Precauciones">
                    {element.riesgos.map((riesgo, idx) => (
                        <Text key={idx} style={styles.listItem}>
                            ⚠️ {riesgo}
                        </Text>
                    ))}
                </Section>
            )}

            {element.curiosidades && element.curiosidades.length > 0 && (
                <Section title="Curiosidades">
                    {element.curiosidades.map((dato, idx) => (
                        <Text key={idx} style={styles.listItem}>
                            💡 {dato}
                        </Text>
                    ))}
                </Section>
            )}

            <Section title="Enlaces">
                {element.fuente && (
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => onOpenLink(element.fuente)}
                    >
                        <Ionicons name="globe-outline" size={20} color="#007AFF" />
                        <Text style={styles.linkText}>Wikipedia</Text>
                    </TouchableOpacity>
                )}
                {element.modelo_bohr_3d && (
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => onOpenLink(element.modelo_bohr_3d)}
                    >
                        <Ionicons name="cube-outline" size={20} color="#007AFF" />
                        <Text style={styles.linkText}>Modelo 3D</Text>
                    </TouchableOpacity>
                )}
            </Section>

            {element.imagen?.attribution && (
                <View style={styles.attribution}>
                    <Text style={styles.attributionText}>{element.imagen.attribution}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f0f",
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerContent: {
        alignItems: "center",
    },
    headerNumber: {
        fontSize: 16,
        color: "white",
        opacity: 0.8,
        fontWeight: "600",
    },
    headerSymbol: {
        fontSize: 72,
        color: "white",
        fontWeight: "bold",
        marginVertical: 8,
    },
    headerName: {
        fontSize: 24,
        color: "white",
        fontWeight: "600",
    },
    headerCategory: {
        fontSize: 14,
        color: "white",
        opacity: 0.9,
        marginTop: 4,
    },
    bohrImage: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 60,
        right: 20,
        opacity: 0.5,
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
    imageContainer: {
        marginVertical: 20,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
    },
    elementImage: {
        width: "100%",
        height: 200,
    },
    imageCaption: {
        padding: 12,
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
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
    listItem: {
        fontSize: 14,
        color: "#ddd",
        lineHeight: 24,
        marginBottom: 8,
    },
    linkButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#333",
    },
    linkText: {
        fontSize: 16,
        color: "#007AFF",
        marginLeft: 12,
        fontWeight: "600",
    },
    attribution: {
        marginTop: 20,
        padding: 12,
        backgroundColor: "#1a1a1a",
        borderRadius: 8,
    },
    attributionText: {
        fontSize: 11,
        color: "#666",
        lineHeight: 16,
    },
});
