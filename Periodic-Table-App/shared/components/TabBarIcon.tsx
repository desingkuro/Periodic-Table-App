import FontAwesome from '@expo/vector-icons/FontAwesome';

export function TabBarIcon({
    name,
    color,
    size=28,
}: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size?: number;
}) {
    return <FontAwesome size={size} name={name} color={color} />;
}