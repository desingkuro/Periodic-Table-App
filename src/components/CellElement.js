import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View,Text } from "react-native";
import { contexto } from "../context/ContextoGeneral";

const heightCell = 90;
const widthCell = 100;
export function CellElement({element,funcion}) {

    const {elementSelect,setElementSelect} = useContext(contexto);

    function initElement(){
        setElementSelect(element);
        funcion()
    }

    if(element==null){
        return<View style={stilos.cellNull}></View>
    }

    return(
        <TouchableOpacity style={[stilos.cell,{borderLeftColor:element.color}]} onPress={initElement}>
            <Text style={stilos.textNumber}>
                {element.number}
            </Text>
            <Text style={stilos.textSymbol}>
                {element.symbol}
            </Text>
            <Text style={{color:'white',fontSize:13,color:element.color}}>
                {element.name}
            </Text>
        </TouchableOpacity>
    )
}
const stilos = StyleSheet.create({
    cell:{
        backgroundColor:'#222831',
        height:heightCell,
        width:widthCell,
        borderWidth:1,
        alignItems:'center',
        borderLeftWidth:5,
        borderRightColor:'white',
        borderTopColor:'white',
        borderBottomColor:'white',
        padding:4
    },
    cellNull:{
        height:heightCell,
        width:widthCell,
    },
    textSymbol:{
        fontSize:26,
        color:'white',
        fontWeight:'600'
    },
    textNumber:{
        color:'white',
        width:'100%',
        paddingLeft:7,
    },
});