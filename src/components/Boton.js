import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function Boton({color,funcion,text,colorText}) {
    const colorBtn = color === undefined ? 'black' : color;
    const colorT = colorText === undefined ? 'white' : color;
    return(
        <TouchableOpacity onPress={funcion} style={[estilos.Boton,{backgroundColor:colorBtn}]}>
            <Text style={[estilos.text,{color:colorT}]}>{text}</Text>
        </TouchableOpacity>
    )
}
const estilos = StyleSheet.create({
    Boton:{
        height:60,
        width:'80%',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        fontWeight:'700'
    }
})