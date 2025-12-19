import { StyleSheet, View ,Text} from "react-native";

export function ItemElement({label,value}) {
    return <View style={estilos.contenedor}> 
        <Text style={estilos.textLabel}>
            {label}
        </Text>
        <Text style={estilos.textValue}>
            {value==null?'Undefined':value}
        </Text>
    </View>
}

const estilos = StyleSheet.create({
    contenedor:{
        height:75,
        width:'100%',
        justifyContent:'center',
        borderColor:'gray',
        borderBottomWidth:2,
        paddingLeft:10,
        paddingRight:10
    },
    textLabel:{
        color:'#ffff',
        fontWeight:'800',
        fontSize:18
    },
    textValue:{
        color:'#ffff',
        fontWeight:'600'
    }
})