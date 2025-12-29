import { CellElement } from "@/shared/components/CellElement";
import { PeriodicTableLegend } from "@/shared/components/table/PeriodicTableLegend";
import ScreenView from "@/shared/components/ViewScreen";
import { contexto } from "@/shared/context/ContextoGeneral";
import { buildPeriodicGrid, COLS, GridCell } from "@/shared/hooks/useGrid";
import { ElementoQuimico } from "@/shared/interfaces/Table.interface";
import { useRouter } from "expo-router";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { Animated, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const CELL = 100;
const adUnitId = 'ca-app-pub-6195557105445619/6300198279';

export default function Table() {
    const router = useRouter();
    const { datosTabla, setElementSelect, colorsCategory }: any = useContext(contexto);
    const scrollY = useRef(new Animated.Value(0)).current;
    const bannerRef = useRef<BannerAd>(null);



    const { grid } = useMemo(
        () => buildPeriodicGrid(datosTabla ?? []),
        [datosTabla]
    );

    const renderItem = useCallback(({ item, index }: { item: GridCell, index: number }) => {
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
                return <CellElement element={item.element} funcion={() => { toggleElementSelect(item.element) }} />;

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

    const toggleElementSelect = (element: ElementoQuimico | null) => {
        setElementSelect(element);
        router.push('/(tabs)/(table)/DetailElement');
    };

    return (
        <ScreenView top bottom>
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
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        windowSize={7}
                        updateCellsBatchingPeriod={16}
                        removeClippedSubviews={true}
                    />
                    {/* Leyenda flotante */}
                    <PeriodicTableLegend scrollY={scrollY} colorsCategory={colorsCategory} />
                </View>
            </ScrollView>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                ref={bannerRef}
            />
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
