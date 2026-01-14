// app/reactions/[id].tsx
import AcidBaseNeutralization from "@/shared/components/reactions/AcidBaseNeutralization";
import CombustionReaction from "@/shared/components/reactions/CombustionReaction";
import InorganicIdentification from "@/shared/components/reactions/InorganicIdentification";
import OrganicIdentification from "@/shared/components/reactions/OrganicIdentification";
import OrganicSubstitution from "@/shared/components/reactions/OrganicSubstitution";
import RedoxReaction from "@/shared/components/reactions/RedoxReaction";
import ScreenView from "@/shared/components/ViewScreen";
import { REACTIONS, ReactionItem } from "@/shared/data/reactions";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
const adUnitId = 'ca-app-pub-6195557105445619/3482463246';

export default function ReactionDetailScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    const bannerRef = useRef<BannerAd>(null);

    const reaction: ReactionItem | undefined = useMemo(
        () => REACTIONS.find(r => r.id === id),
        [id]
    );

    if (!reaction) {
        return (
            <ScreenView top bottom >
                <View style={styles.center}>
                    <Text style={styles.errorTitle}>Reacción no encontrada</Text>
                    <Text style={styles.errorText}>
                        No se encontró ninguna reacción con el identificador "{id}".
                    </Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={20} color="white" />
                        <Text style={styles.backText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </ScreenView>
        );
    }

    const color =
        reaction.category === "inorganic"
            ? "#6EC5FF"
            : reaction.category === "organic"
                ? "#A5D6A7"
                : "#FFD54F";

    const switchScreenOptions = () => {
        switch (reaction.id) {
            case "combustion":
                return <CombustionReaction />
            case "acid-base":
                return <AcidBaseNeutralization />
            case "redox":
                return <RedoxReaction />
            case "organic-id":
                return <OrganicIdentification />
            case "inorganic-id":
                return <InorganicIdentification />;
            case "substitution":
                return <OrganicSubstitution />;
            default:
                return <Text>Reacción no encontrada</Text>
        }
    }

    return (
        <ScreenView top bottom>
            {/* Encabezado simple dentro del contenido */}
            <View style={styles.headerRow}>
                <View style={{ marginRight: 16 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.iconCircle, { backgroundColor: `${color}33` }]}>
                    <Ionicons name={reaction.icon as any} size={28} color={color} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{reaction.title}</Text>
                    <Text style={styles.category}>
                        {reaction.category === "inorganic"
                            ? "Reacción inorgánica"
                            : reaction.category === "organic"
                                ? "Reacción orgánica"
                                : "Identificación de compuestos"}
                    </Text>
                </View>
            </View>

            <Text style={styles.description}>{reaction.description}</Text>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    {switchScreenOptions()}
                </View>
                {<BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    ref={bannerRef}
                />}
            </ScrollView>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 16,
        paddingLeft: 10
    },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "700",
    },
    category: {
        color: "#aaaaaa",
        fontSize: 13,
        marginTop: 2,
    },
    description: {
        color: "#dddddd",
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 24,
        paddingLeft: 10
    },
    section: {
        marginTop: 8,
    },
    sectionTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },
    sectionText: {
        color: "#bbbbbb",
        fontSize: 14,
        lineHeight: 22,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    errorTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },
    errorText: {
        color: "#aaaaaa",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 16,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1c1f26",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#2b3038",
    },
    backText: {
        color: "white",
        fontSize: 14,
        marginLeft: 8,
    },
});
