// app/Reactions.tsx
import { ReactionCard } from "@/shared/components/table/ReactionCard";
import ScreenView from "@/shared/components/ViewScreen";
import { REACTIONS, ReactionItem } from "@/shared/data/reactions";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
//import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
//const adUnitId = 'ca-app-pub-6195557105445619/3630459447';

export default function Reactions() {
    const navigation = useRouter();
    //const bannerRef = useRef<BannerAd>(null);
    const handlePress = (item: ReactionItem) => {
        const path: RelativePathString = ('/(tabs)/(reactions)/' + item.id as any)
        navigation.push(path)
    };

    return (
        <ScreenView top bottom>
            <View style={styles.header}>
                <Text style={styles.title}>Reacciones químicas</Text>
                <Text style={styles.subtitle}>
                    Elige un tipo de reacción o módulo de identificación.
                </Text>
            </View>

            <FlatList
                data={REACTIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <ReactionCard item={item} onPress={handlePress} />
                )}
            />
            {/*<BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                ref={bannerRef}
            />*/}
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
    },
    title: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 4,
    },
    subtitle: {
        color: "#aaaaaa",
        fontSize: 13,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
});
