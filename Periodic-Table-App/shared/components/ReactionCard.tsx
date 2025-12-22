// components/ReactionCard.tsx
import { ReactionItem } from "@/shared/data/reactions";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    item: ReactionItem;
    onPress: (item: ReactionItem) => void;
}

export function ReactionCard({ item, onPress }: Props) {
    const color =
        item.category === "inorganic"
            ? "#6EC5FF"
            : item.category === "organic"
                ? "#A5D6A7"
                : "#FFD54F";

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <View style={[styles.iconWrapper, { backgroundColor: `${color}33` }]}>
                <Ionicons name={item.icon as any} size={28} color={color} />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#1c1f26",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    iconWrapper: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    textWrapper: {
        flex: 1,
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    subtitle: {
        color: "#aaaaaa",
        fontSize: 13,
    },
});
