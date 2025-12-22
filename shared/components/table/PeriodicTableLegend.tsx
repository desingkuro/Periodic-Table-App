// components/PeriodicTableLegend.tsx
import { CategoryColor } from "@/shared/context/ContextoGeneral";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import LegendItem from "./LegendItem";

const CELL_SIZE = 100;

interface Props {
    scrollY: Animated.Value;
    colorsCategory?: CategoryColor[];
}

export function PeriodicTableLegend({ scrollY, colorsCategory }: Props) {
    const animatedStyle = {
        transform: [{ translateY: Animated.multiply(scrollY, -1) }],
    };

    // Función helper para obtener color por nombre de categoría
    const getColorByCategory = (categoryName: string): string => {
        const category = colorsCategory?.find(
            (cat) => cat.categoria.toLowerCase().includes(categoryName.toLowerCase())
        );
        return category?.color || "#ADB5BD";
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.exampleSection}>
                <View style={styles.exampleCell}>
                    <Text style={styles.atomicNumber}>8</Text>
                    <Text style={styles.symbol}>O</Text>
                    <Text style={styles.name}>Oxígeno</Text>
                    <Text style={styles.mass}>15,9</Text>
                </View>

                <View style={styles.labels}>
                    <View style={styles.labelItem}>
                        <View style={styles.labelLine} />
                        <Text style={styles.labelText}>Número{'\n'}atómico</Text>
                    </View>
                    <View style={styles.labelItem}>
                        <View style={styles.labelLine} />
                        <Text style={styles.labelText}>Símbolo{'\n'}químico</Text>
                    </View>
                    <View style={styles.labelItem}>
                        <View style={styles.labelLine} />
                        <Text style={styles.labelText}>Nombre</Text>
                    </View>
                    <View style={styles.labelItem}>
                        <View style={styles.labelLine} />
                        <Text style={styles.labelText}>Masa{'\n'}atómica</Text>
                    </View>
                </View>
            </View>

            <View style={styles.legendSection}>
                <View style={styles.legendColumn}>
                    <LegendItem
                        color={getColorByCategory("gas noble")}
                        label="Gases nobles"
                    />
                    <LegendItem
                        color={getColorByCategory("no metal reactivo")}
                        label="No metales reactivos"
                    />
                    <LegendItem
                        color={getColorByCategory("metaloide")}
                        label="Metaloides"
                    />
                    <LegendItem
                        color={getColorByCategory("metal postransición")}
                        label="Metales postransición"
                    />
                    <LegendItem
                        color={getColorByCategory("lantánido")}
                        label="Lantánidos"
                    />
                </View>
                <View style={styles.legendColumn}>
                    <LegendItem
                        color={getColorByCategory("metal de transición")}
                        label="Metales de transición"
                    />
                    <LegendItem
                        color={getColorByCategory("alcalinotérreo")}
                        label="Alcalinotérreos"
                    />
                    <LegendItem
                        color={getColorByCategory("metal alcalino")}
                        label="Metales alcalinos"
                    />
                    <LegendItem
                        color={getColorByCategory("actínido")}
                        label="Actínidos"
                    />
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: CELL_SIZE + 8,
        left: CELL_SIZE * 4 + 8,
        width: CELL_SIZE * 5,
        backgroundColor: "rgba(28, 31, 38, 0.95)",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    exampleSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#2b3038",
    },
    exampleCell: {
        width: 80,
        height: 80,
        backgroundColor: "#90BE6D", // Color de "No metal reactivo" para Oxígeno
        borderRadius: 8,
        padding: 6,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#7aa85d",
    },
    atomicNumber: {
        color: "white",
        fontSize: 11,
        fontWeight: "600",
        alignSelf: "flex-start",
    },
    symbol: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
    },
    name: {
        color: "white",
        fontSize: 9,
        fontWeight: "500",
    },
    mass: {
        color: "white",
        fontSize: 10,
        fontWeight: "400",
        alignSelf: "flex-end",
    },
    labels: {
        marginLeft: 12,
        flex: 1,
        justifyContent: "space-around",
    },
    labelItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
    labelLine: {
        width: 16,
        height: 1,
        backgroundColor: "#666",
        marginRight: 6,
    },
    labelText: {
        color: "#aaaaaa",
        fontSize: 9,
        lineHeight: 11,
    },
    legendSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    legendColumn: {
        flex: 1,
        gap: 6,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    colorBox: {
        width: 14,
        height: 14,
        borderRadius: 3,
        marginRight: 6,
    },
    legendLabel: {
        color: "#dddddd",
        fontSize: 10,
        fontWeight: "500",
    },
});
