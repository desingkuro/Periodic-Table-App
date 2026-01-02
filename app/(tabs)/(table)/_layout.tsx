import { contexto } from "@/shared/context/ContextoGeneral";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";

export default function LayoutTable() {
    const { elementSelect }: any = useContext(contexto);
    const router = useRouter();
    return (
        <Stack screenOptions={{ animation: "default" }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="detailElement"
                options={{
                    title: elementSelect?.nombre || "Elemento",
                    headerStyle: { backgroundColor: "#474747" },
                    headerTitleStyle: { color: elementSelect?.categoria_color },
                    headerTintColor: elementSelect?.categoria_color,
                    freezeOnBlur: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    )
}