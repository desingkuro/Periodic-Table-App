import { StyleSheet, View } from "react-native";
import {ItemElement} from '../components/ItemElementDetail'
import { OptionCalc } from "../components/OptionCalc";

export function Calculadora() {
    return(
        <View style={estilos.screen}>
            <OptionCalc text={'Identificacion de compuestos inorganicos'}/>
            <OptionCalc text={'Calcular Proporciones'}/>
            <OptionCalc text={'Reacciones quimicas Inorganicas'}/>
        </View>
    )
}
const estilos = StyleSheet.create({
    screen:{
        backgroundColor:'#222831',
        alignItems:'center',
        height:'100%',
        minWidth:380,
        paddingTop:20
    }
})