import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { Table } from '../screens/Table';
import { ElementsDetails } from '../screens/ElementDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calculadora } from '../screens/Calculadora';
import { Estequiometria } from '../screens/Estequiometria';
import { CompuestosInorganicos } from '../screens/CompuestosInorganico';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign:'center',
      headerStyle:{
        backgroundColor:"#222831",
        height:70,
      },
      headerTitleStyle:{
          fontSize:22,
          color:'#ffff',                        
      },
      headerBackImage:()=><MaterialCommunityIcons name="keyboard-backspace" size={34} color="white" />,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Personaliza tu animación aquí
    }}>
      <Stack.Screen name="Tabla" component={Table}/>
      <Stack.Screen name="Elemento" component={ElementsDetails} />
      <Stack.Screen name="Calculadora" component={Calculadora} />
      <Stack.Screen name="Estequiometria" component={Estequiometria} />
      <Stack.Screen name="Inorganicos" component={CompuestosInorganicos} />
    </Stack.Navigator>
  );
}