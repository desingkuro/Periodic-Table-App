import { StyleSheet, View, TouchableOpacity,Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function OptionCalc({ text, color }) {
    
    const border = color == undefined?'white':color;

    return (
        <TouchableOpacity style={[estilos.container,{borderLeftColor:border,borderLeftWidth:5}]}>
            <View style={estilos.containerText}>
                <Text style={{color:'#ffff',fontSize:20}}>
                    {text}
                </Text>
            </View>
            <View style={estilos.containerIcon}>
                <MaterialCommunityIcons name="chemical-weapon" size={54} color="purple" />
            </View>
        </TouchableOpacity>
    )
}
const estilos = StyleSheet.create({
    container: {
        width:'100%',
        height:100,
        flexWrap:'wrap',
        borderBottomWidth:1
    },
    containerText:{
        width:'70%',
        height:'100%',
        padding:10,
        justifyContent:'center'
    },
    containerIcon:{
        width:'30%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})