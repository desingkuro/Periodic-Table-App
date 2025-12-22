import { StyleSheet, Text, View } from "react-native";

export default function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: color }]} />
            <Text style={styles.legendLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
