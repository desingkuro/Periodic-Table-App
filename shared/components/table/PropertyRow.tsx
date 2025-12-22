import { StyleSheet, Text, View } from "react-native";

export default function PropertyRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.propertyRow}>
            <Text style={styles.propertyLabel}>{label}</Text>
            <Text style={styles.propertyValue}>{value}</Text>
        </View>
    );
}


const styles = StyleSheet.create({

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
    }
});