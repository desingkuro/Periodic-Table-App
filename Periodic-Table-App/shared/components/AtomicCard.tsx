import { StyleSheet, Text, View } from "react-native";

export default function AtomicCard({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: string;
}) {
    return (
        <View style={[styles.atomicCard, { backgroundColor: color }]}>
            <Text style={styles.atomicValue}>{value}</Text>
            <Text style={styles.atomicLabel}>{label}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    atomicStructure: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 12,
    },
    atomicCard: {
        width: 100,
        height: 100,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    atomicValue: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
    },
    atomicLabel: {
        fontSize: 12,
        color: "white",
        marginTop: 4,
    }
});