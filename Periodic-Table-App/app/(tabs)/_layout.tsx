import { TabBarIcon } from '@/shared/components/TabBarIcon';
import { ColorsPrimary } from '@/shared/constants/Colors';
import { ContextoGeneral } from '@/shared/context/ContextoGeneral';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {

  return (
    <ContextoGeneral>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#c9c9c9',
          tabBarBackground: () => <View style={{ backgroundColor: ColorsPrimary.fondo, flex: 1 }}></View>,
        }}>
        <Tabs.Screen
          name="(table)"
          options={{
            title: 'Tabla Periodica',
            tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
            headerRight: () => null,
          }}
        />
      </Tabs>
    </ContextoGeneral>
  );
}
