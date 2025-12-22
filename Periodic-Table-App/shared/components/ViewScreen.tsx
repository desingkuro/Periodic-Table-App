import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorsPrimary } from "../constants/Colors";

interface ScreenViewProps {
    children: React.ReactNode;
    top?: boolean;
    bottom?: boolean;
}

export default function ScreenView({ children, top, bottom }: ScreenViewProps) {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            flex: 1, paddingBottom: bottom ? insets.bottom+40 : 65, paddingTop: top ? insets.top : 0,
            backgroundColor: ColorsPrimary.fondo,
        }}>
            {children}
        </View>
    )
}