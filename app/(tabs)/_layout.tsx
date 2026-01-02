import TabBar from '@/shared/components/TabBar';
import { TabBarIcon } from '@/shared/components/TabBarIcon';
import { ContextoGeneral } from '@/shared/context/ContextoGeneral';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const TAB_HEIGHT = 50;

  return (
    <ContextoGeneral>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#126dd4ff',
          tabBarInactiveTintColor: '#888888',
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
          },
          tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 20,
            height: TAB_HEIGHT,
            paddingTop: 8,
            paddingHorizontal: 6, 
            backgroundColor: '#ffffff',
            borderRadius: 20,
            borderTopWidth: 0,
            marginHorizontal: 56,
          },
          tabBarButton: (props: BottomTabBarButtonProps) => TabBar(props),
          animation: 'shift',
        }}
      > 
        <Tabs.Screen
          name="(table)"
          options={{
            title: 'Tabla',
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon name="table" color={color} size={focused ? 30 : 20} />
            ),
          }}
        />
        <Tabs.Screen
          name="(reactions)"
          options={{
            title: 'Reacciones',
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon name="flask" color={color} size={focused ? 30 : 20} />
            ),
          }}
        />
      </Tabs>
    </ContextoGeneral>
  );
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
