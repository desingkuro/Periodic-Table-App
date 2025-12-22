import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoCard: {
        width: (width - 52) / 2,
        backgroundColor: "#1a1a1a",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#333",
    },
    infoLabel: {
        fontSize: 12,
        color: "#999",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
    },
});