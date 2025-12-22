import React from "react";
import {
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorsPrimary } from "../constants/Colors";

interface ScreenViewProps {
    children: React.ReactNode;
    top?: boolean;
    bottom?: boolean;
}

const TAB_BAR_HEIGHT = 70 + 10; // altura tab + bottom margin + espacio extra

export default function ScreenView({
    children,
    top,
    bottom,
}: ScreenViewProps) {
    const insets = useSafeAreaInsets();

    const bottomPadding = bottom ? TAB_BAR_HEIGHT : insets.bottom;

    return (

        <View
            style={{ flex: 1, paddingBottom: bottomPadding, paddingTop: top ? insets.top : 0, backgroundColor: ColorsPrimary.fondo }}
        >
            {children}
        </View>
    );
}
