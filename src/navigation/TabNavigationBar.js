import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Table } from '../screens/Table';
import { useContext } from 'react';
import { contexto } from '../context/ContextoGeneral';
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import { Calculadora } from '../screens/Calculadora';
import { MyStack } from './StacknavigationNav';

const Tab = createBottomTabNavigator();

export function TabNavigationBar() {
    const{colors}=useContext(contexto);
    const iconSize=29
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor:'#000000',
            tabBarInactiveTintColor:'#c9c9c9',
            tabBarItemStyle:{
                paddingVertical:0,
                padding:0,
                borderRadius: 50, // Hacerlo circular
                backgroundColor: route.name === 'Tabla Periodica' || route.name === 'Calculadora' ? '#ffff' : '#222831', // Cambiar el color de fondo cuando está activo
                marginBottom:3,
            },
            tabBarStyle:{
                height:55,
                width:"95%",
                borderRadius:20,
                alignSelf:'center',
                justifyContent:'center',
                marginBottom:30,
                backgroundColor:'#ffff',
                position: 'absolute', // Eliminar el espacio en blanco detrás de la barra de navegación
                left:'2.5%',
                right:'2.5%',
                borderColor:'#635985'
            },
            tabBarLabelStyle:{
                fontSize:10
            },
            headerStyle:{
                backgroundColor:"#222831",
                height:70,
            },
            headerTitleStyle:{
                fontSize:22,
                color:'#ffff',                        
            },
        })}>
            <Tab.Screen name="Tabla Periodica" component={MyStack}
                options={{
                    headerShown:false,
                    tabBarIcon:({ color })=>{
                        return <MaterialCommunityIcons name="periodic-table" size={iconSize} color={color} /> // Cambiar el color del ícono cuando está activo
                    },
                }}
            />
            <Tab.Screen name="Calculadora" component={Calculadora}
                options={{
                    headerTitleAlign:'center',
                    tabBarIcon:({ color })=>{
                        return <AntDesign name="calculator" size={iconSize} color={color} /> // Cambiar el color del ícono cuando está activo
                    },
                    tabBarLabel:'calculadora',
                }}
            />
        </Tab.Navigator>
    )
}
