import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, View } from 'react-native';

export default function TabBar( props : BottomTabBarButtonProps) {

    const { onPress, accessibilityState, children } = props;
    const selected = accessibilityState?.selected;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.tabBarButtonWrapper,
                pressed && { opacity: 0.8 },
            ]}
        >
            <View
                style={[
                    styles.tabBarButton,
                    selected && styles.tabBarButtonActive,
                ]}
            >
                {children}
            </View>
        </Pressable>);
}

const styles = StyleSheet.create({
    tabBarButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        minWidth: 70,
        backgroundColor: 'transparent',
    },
    tabBarButtonActive: {
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});