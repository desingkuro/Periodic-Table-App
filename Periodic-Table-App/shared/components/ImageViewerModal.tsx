// ImageViewerModalSimple.tsx
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
    Dimensions,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ScreenView from "./ViewScreen";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Props {
    visible: boolean;
    imageUrl: string;
    title?: string;
    onClose: () => void;
}

export default function ImageViewerModal({ visible, imageUrl, title, onClose }: Props) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <ScreenView top={true} bottom={true}>
                    <View style={styles.backdrop}>
                        {/* Header */}
                        <View style={styles.header}>
                            {title && <Text style={styles.title} numberOfLines={2}>{title}</Text>}
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Ionicons name="close" size={28} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Imagen scrolleable */}
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            maximumZoomScale={3}
                            minimumZoomScale={1}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Image
                                source={{
                                    uri: imageUrl,
                                    headers: {
                                        'User-Agent': 'PeriodicTableApp/1.0',
                                    },
                                }}
                                style={styles.image}
                                contentFit="contain"
                                transition={200}
                            />
                        </ScrollView>
                    </View>
                </ScreenView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
    },
    header: {
        position: "absolute",
        top: Platform.OS === "ios" ? 50 : 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        zIndex: 10,
    },
    title: {
        flex: 1,
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginRight: 16,
    },
    closeButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 100,
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
    },
});
