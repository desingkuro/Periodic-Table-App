import { ElementoQuimico } from "@/shared/interfaces/Table.interface";
import { Image } from "expo-image";
import { memo, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageViewerModal from "./ImageViewerModal";
import InfoCard from "./InfoCard";


export const ResumenTab = memo(({ element }: { element: ElementoQuimico }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        return () => {
            setShowImageModal(false);
        };
    }, []);

    const imagen = useMemo(() => {
        return <Image
            source={{
                uri: element.imagen.url,
                headers: {
                    'User-Agent': 'PeriodicTableApp/1.0 (Educational; React Native)',
                },
            }}
            style={styles.elementImage}
            contentFit="contain"
            onLoadStart={() => {
                setImageLoading(true);
            }}
            onLoad={() => {
                setImageLoading(false);
                setImageError(false);
            }}
            onError={() => {
                setImageError(true);
                setImageLoading(false);
            }}
        />
    }, [])

    return (
        <View style={styles.tabContent}>
            <Text style={styles.resumen}>{element.resumen}</Text>

            {element.imagen?.url && (
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => setShowImageModal(true)}
                        activeOpacity={0.9}
                        style={{ height: "100%", width: "100%", position: "absolute", zIndex: 2 }}
                    ></TouchableOpacity>
                    {imagen}

                    {imageLoading && (
                        <View style={styles.imageLoader}>
                            <Text style={styles.loaderText}>Cargando imagen...</Text>
                        </View>
                    )}

                    {imageError && (
                        <View style={styles.imageError}>
                            <Text style={styles.errorText}>⚠️ Error al cargar imagen</Text>
                        </View>
                    )}

                    {element.imagen.title && (
                        <Text style={styles.imageCaption}>{element.imagen.title}</Text>
                    )}
                </View>
            )}

            <View style={styles.infoGrid}>
                <InfoCard label="Masa atómica" value={`${element.masa_atomica_u} u`} />
                <InfoCard label="Fase" value={element.fase} />
                <InfoCard label="Grupo" value={element.grupo?.toString() || "—"} />
                <InfoCard label="Período" value={element.periodo?.toString() || "—"} />
                <InfoCard label="Bloque" value={element.bloque?.toUpperCase() || "—"} />
                <InfoCard label="Densidad" value={element.densidad ? `${element.densidad} g/cm³` : "—"} />
            </View>

            {/* Modal para ver imagen ampliada */}
            <ImageViewerModal
                visible={showImageModal}
                imageUrl={element.imagen?.url || ''}
                title={element.imagen?.title}
                onClose={() => setShowImageModal(false)}
            />
        </View>
    );
});


const styles = StyleSheet.create({
    bohrImage: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 60,
        right: 20,
        opacity: 0.5,
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
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
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
    imageContainer: {
        marginVertical: 20,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        minHeight: 200, // ← IMPORTANTE: altura mínima
        position: "relative",
    },
    elementImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#2a2a2a", // ← Para ver el contenedor
    },
    imageLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    loaderText: {
        color: "white",
        fontSize: 14,
    },
    imageError: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
    },
    errorText: {
        color: "#ff6b6b",
        fontSize: 14,
    },
});
