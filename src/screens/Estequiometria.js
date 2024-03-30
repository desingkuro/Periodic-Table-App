import { useState } from "react";
import { StyleSheet, View, TouchableOpacity,Text, TextInput } from "react-native";

export function Estequiometria({}) {
    const [reactivo,setReactivo] = useState('')
    const [producto,setProducto] = useState('')
    return(
        <View style={estilos.container}>
            <View style={estilos.containerText}>
                <Text style={estilos.textLabel}>
                    Ingrese el compuesto reactivo
                </Text>
            </View>
            <TextInput
                value={reactivo}
                style={estilos.input}
                onChangeText={(valor)=>setReactivo(valor)}
                placeholder="ingrese reactivo"
            />
            <View style={estilos.containerText}>
                <Text style={estilos.textLabel}>
                    Ingrese el compuesto reactivo
                </Text>
            </View>
            <TextInput
                value={reactivo}
                style={estilos.input}
                onChangeText={(valor)=>setProducto(valor)}
                placeholder="ingrese reactivo"
            />
        </View>
    )
}
const estilos = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        padding:10
    },
    containerText:{
        width:'100%',
        height:50,
        padding:10,
        justifyContent:'center',

    },
    textLabel:{
        fontSize:20
    },
    input:{
        width:'100%',
        height:70,
        fontSize:20,
        paddingLeft:15,
        fontWeight:'500',
        borderColor:'#b1ceff',
        borderWidth:2,
        borderRadius:15,
        backgroundColor:'#e7e7e7'
    }
})