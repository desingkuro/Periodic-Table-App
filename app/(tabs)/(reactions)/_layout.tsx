import { Stack } from "expo-router";

export default function TabLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Index" />
            <Stack.Screen name="[id]" />
        </Stack>
    )
}