import { Stack } from "expo-router";

export default function LayoutTable(){
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="Index" />
        </Stack>
    )
}