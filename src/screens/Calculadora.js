import { StyleSheet, View } from "react-native";
import { OptionCalc } from "../components/OptionCalc";

export function Calculadora() {
    return(
        <View style={estilos.screen}>
            <OptionCalc text={'Identificacion de compuestos inorganicos'} color={'#FAA624'}/>
            <OptionCalc text={'Calcular Proporciones'} color={'#FA3812'}/>
            <OptionCalc text={'Reacciones quimicas Inorganicas'} color={'#636AFA'}/>
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