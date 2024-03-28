import { StyleSheet, View ,ScrollView,Text} from "react-native";
import { CellElement } from "../components/CellElement";
import {contexto} from '../context/ContextoGeneral'
import { useContext } from "react";

export function Table({navigation}) {
    const {datosTabla} = useContext(contexto);

    function goToScreen(){
        navigation.navigate('Elemento');
    }
    //creamos la tabla con sus respectias filas y columnas
    function createTable() {
        const columnas = 19;
        const filas = 8;
        let table = [];
        for (let col = 1; col < columnas; col++) {
            let row = [];
            for (let fila = 1; fila < filas; fila++) {
                let element = datosTabla.find(e => e.xpos === col && e.ypos === fila);
                if (element) {
                    row.push(<CellElement key={fila + "-" + col} element={element} funcion={goToScreen} />);
                } else {
                    row.push(<CellElement key={fila + "-" + col} element={null} />);
                }
            }
            table.push(<View style={{gap:5}} key={col}>{row}</View>);
        }
        return table;
    }
    

    return(
        <View style={stilos.screen}>
            <ScrollView horizontal={true} >
                <View style={stilos.containerScroll}>
                    {createTable()}
                </View>
            </ScrollView>
        </View>
    )
}
const stilos = StyleSheet.create({
    screen:{
        backgroundColor:'#222831',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        minWidth:380
    },
    containerScroll:{
        height:'87%',
        width:'auto',
        paddingLeft:20,
        minWidth:380,
        flexDirection:'row',
        gap:5,
        paddingTop:10
    }
});