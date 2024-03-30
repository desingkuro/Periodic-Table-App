import { StyleSheet, View } from "react-native";
import { OptionCalc } from "../components/OptionCalc";
import { useContext } from "react";
import { contexto } from "../context/ContextoGeneral";

export function Calculadora({navigation}) {
    const {goToPage} = useContext(contexto);
    
    return(
        <View style={estilos.screen}>
            <OptionCalc text={'Identificación de compuestos inorgánicos'} color={'#FAA624'} 
                goToPage={()=>goToPage(navigation,'Inorganicos')}
            />
            <OptionCalc text={'Calcular Proporciones'} color={'#FA3812'}/>
            <OptionCalc text={'Estequiometria'} color={'#9201FA'} goToPage={()=>goToPage(navigation,'Estequiometria')}/>
            <OptionCalc text={'Reacciones químicas Inorgánicas'} color={'#636AFA'}/>
        </View>
    )
}
const estilos = StyleSheet.create({
    screen:{
        backgroundColor:'#222831',
        alignItems:'center',
        height:'100%',
        minWidth:380,
        paddingTop:20,
        gap:5
    }
})