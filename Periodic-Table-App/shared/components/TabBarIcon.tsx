import FontAwesome from '@expo/vector-icons/FontAwesome';

export function TabBarIcon({
    name,
    color,
}: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} name={name} color={color} />;
}