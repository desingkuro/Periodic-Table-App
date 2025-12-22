import { TabBarIcon } from '@/shared/components/TabBarIcon';
import { ContextoGeneral } from '@/shared/context/ContextoGeneral';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function TabLayout() {

  return (
    <ContextoGeneral>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#c9c9c9',
          tabBarStyle: {
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 16,
            position: 'absolute',
            bottom: 20,
            left: 15,
            right: 15,
            width:'auto',
            marginLeft:15,
            marginRight:15,
            display: 'flex',
            justifyContent: 'space-evenly',
          },
          tabBarButton(props) {
            return <Pressable style={[props.accessibilityState?.selected ? { backgroundColor: '#c9c9c9' } : {},style.tabBarButton]} onPress={props.onPress}>{props.children}</Pressable>
          },
        }}>
        <Tabs.Screen
          name="(table)"
          options={{
            title: 'Tabla Periodica',
            tabBarIcon: ({ focused, color }) => <TabBarIcon name="table" color={focused ? color : '#c9c9c9'} />,
          }}
        />
        <Tabs.Screen
          name="(reactions)"
          options={{
            title: 'Reacciones',
            tabBarIcon: ({ focused, color }) => <TabBarIcon name="flask" color={focused ? color : '#c9c9c9'} />,
          }}
        />
      </Tabs>
    </ContextoGeneral>
  );
}

const style = StyleSheet.create({
  tabBarButton: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 10,
  }
})
