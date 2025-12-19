import { CellElement } from "@/shared/components/CellElement";
import ScreenView from "@/shared/components/ViewScreen";
import { contexto } from "@/shared/context/ContextoGeneral";
import { buildPeriodicGrid, COLS, GridCell } from "@/shared/hooks/useGrid";
import React, { useCallback, useContext, useMemo } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const CELL = 100;

export default function Table() {
    const { datosTabla } = useContext(contexto);

    const { grid } = useMemo(
        () => buildPeriodicGrid(datosTabla ?? []),
        [datosTabla]
    );

    const renderItem = useCallback(({ item }: { item: GridCell }) => {
        switch (item.type) {
            case "corner":
                return <View style={styles.cornerCell} />;

            case "groupHeader":
                return (
                    <View style={styles.headerCell}>
                        <Text style={styles.headerText}>{item.group}</Text>
                    </View>
                );

            case "periodHeader":
                return (
                    <View style={styles.headerCell}>
                        <Text style={styles.headerText}>{item.period}</Text>
                    </View>
                );

            case "lanthanideIndicator":
                return (
                    <View style={[styles.indicatorCell, { backgroundColor: "#F8961E" }]}>
                        <Text style={styles.indicatorText}>{item.elements}</Text>
                    </View>
                );

            case "actinideIndicator":
                return (
                    <View style={[styles.indicatorCell, { backgroundColor: "#F3722C" }]}>
                        <Text style={styles.indicatorText}>{item.elements}</Text>
                    </View>
                );

            case "spacer":
                return <View style={styles.spacerCell} />;

            case "empty":
                return <View style={styles.emptyCell} />;

            case "element":
                return <CellElement element={item.element} funcion={() => { }} />;

            default:
                return <View style={styles.emptyCell} />;
        }
    }, []);


    const keyExtractor = useCallback((item: GridCell) => item.key, []);

    const getItemLayout = useCallback(
        (_: any, index: number) => {
            const row = Math.floor(index / COLS);
            return { length: CELL, offset: row * CELL, index };
        },
        []
    );

    return (
        <ScreenView top={true} bottom={false}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={{ flex: 1, paddingBottom: 16 }}>
                    <FlatList
                        data={grid}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        numColumns={COLS}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        initialNumToRender={COLS * 4}
                        maxToRenderPerBatch={COLS * 3}
                        windowSize={7}
                        updateCellsBatchingPeriod={16}
                        removeClippedSubviews={true}
                    />
                </View>
            </ScrollView>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    headerCell: {
        width: CELL,
        height: CELL,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4747471c",
        borderWidth: 1,
        borderColor: "#333",
    },
    headerText: {
        color: "white",
        opacity: 0.7,
        fontSize: 14,
        fontWeight: "600",
    },
    cornerCell: {
        width: CELL,
        height: CELL,
        backgroundColor: "transparent",
    },
    emptyCell: {
        width: CELL,
        height: CELL,
        backgroundColor: "transparent",
    },
    indicatorCell: {
        width: CELL,
        height: CELL,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#444",
    },
    indicatorText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    spacerCell: {
        width: CELL,
        height: 20, // altura pequeña para separación visual
        backgroundColor: "transparent",
    },
});
