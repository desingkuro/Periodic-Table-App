import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ContextoGeneral } from './src/context/ContextoGeneral';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigationBar } from './src/navigation/TabNavigationBar';

export default function App() {
  return (
    <>
      <ContextoGeneral>
        <NavigationContainer>
          <TabNavigationBar/>
        </NavigationContainer>
      </ContextoGeneral>
      <StatusBar style="auto" />
    </>
  );
}

