import { createContext, useEffect, useState } from "react";
import data from '../Api/elements.json'
import dataMetales from '../Api/classElement/Metales.json'
import dataNoMetales from '../Api/classElement/NoMetales.json'
import { Alert, StyleSheet, Text } from "react-native";

export const contexto = createContext();

export function ContextoGeneral({children}) {
    const [datosTabla,setDatosTabla] = useState(data.elements);
    const [metales,setMetales] = useState(dataMetales.Metales);
    const [noMetales,setNoMetales] = useState(dataNoMetales.noMetales);
    const [elementSelect,setElementSelect] = useState(null);
    const [compuestoIdentificado,setCompuestoIdentificado] = useState('');
    const [elementosIdentificados,setElementosIdentificados] = useState('');

    /*useEffect(()=>{
        const metales = [];
        datosTabla.map((e)=>{
            if(e.category == 'Metales alcalinotérreos'||e.category == 'Metales transicionales'){
                metales.push(e)
            }if(e.category == 'Metales postransicionales'||e.category == 'Metales alcalinos'){
                metales.push(e)
            }
        })
        console.log(metales)
    },[])*/

    const colors = {
        'blanco':'#ffff',
        'fondo':'#222831',
        'secundario':'#31363F'
    }

    function goToPage(navigation,screen){
        navigation.navigate(screen);
    }

    function identificacionCoeficientes(elementos){
        let coeficienteDelCompuesto = 1;
        const elementosYcoeficientes = [];
        !isNaN(elementos[0]) ? coeficienteDelCompuesto = elementos[0] : coeficienteDelCompuesto = 1
        elementosYcoeficientes.push(coeficienteDelCompuesto);
        //console.log('solo coeficiente: '+coeficienteDelCompuesto)
        let nuevoCompuesto = elementos.reduce((array,item,index)=>{
           if(coeficienteDelCompuesto == 1) {
                array.push(item)
           }
           if(index!=0 && coeficienteDelCompuesto != 1){
                array.push(item)
           }
           return array
        },[]);

        //console.log(nuevoCompuesto)
        nuevoCompuesto.map((item,index)=>{
            if(isNaN(item)){
                if(!isNaN(nuevoCompuesto[index+1])){
                    elementosYcoeficientes.push({
                        "simbolo":item,
                        "coeficiente":nuevoCompuesto[index+1],
                    })
                }else{
                    elementosYcoeficientes.push({
                        "simbolo":item,
                        "coeficiente":1
                    })
                }
            }
        })
        console.log('elementos con su coeficientes: '+JSON.stringify(elementosYcoeficientes))
        setElementosIdentificados(elementosYcoeficientes)
    }

    function separarCompuesto(elemento) {
        const elementos = [];
        let letraElemento = '';
    
        if (elemento === '' || elemento === ' ') {
            Alert.alert('Ingrese un compuesto para poder realizar la identificación');
        } else {
            const compuestoSeparado = elemento.split('');
    
            compuestoSeparado.map(char => {
                if (char === char.toUpperCase()) {
                    if (letraElemento.length !== 0) {
                        elementos.push(letraElemento);
                        letraElemento = char;
                    } else {
                        letraElemento = char;
                    }
                } else {
                    letraElemento += char;
                }
            });
    
            // Agregar el último elemento
            if (letraElemento.length !== 0) {
                elementos.push(letraElemento);
            }
            //console.log(elementos);
            identificacionCoeficientes(elementos)
        }
    }

    function identificarOxido(elemento){
        const identificado = identificarMetaYNoMetal(elemento)
        if(identificado){
            return('Óxido Básico')
        }else{
            return('Óxido Ácidos o anhídridos')
        }
    }

    function identificarMetaYNoMetal(elemento){
        const noMetal = noMetales.filter((e)=>e.symbol === elemento)
        const metal = metales.filter((e)=>e.symbol === elemento)
        if(metal.length == 1){
            return(true)
        }else if(noMetal.length == 1){
            return(false)
        }
        return'Error al allar el elemento'
    }

    function identificarHidruro(elemento){
        const identificado = identificarMetaYNoMetal(elemento)
        if(identificado){
            return('Hidruro Metálico')
        }else{
            return('Hidruro no Metálico')
        }
    }

    function identificarTipo(){
        const tamaño = elementosIdentificados.length;
        const elementoFinal = elementosIdentificados[tamaño-1]
            if(tamaño == 3 && elementoFinal.simbolo === 'O'){
                if(elementoFinal.simbolo == elementosIdentificados[1].simbolo){
                    return(
                        <Text style={estilos.elementoIdentificado}>
                            error
                        </Text>
                    )
                }
                const tipoOxido = identificarOxido(elementosIdentificados[1].simbolo)
                return(
                    <Text style={estilos.elementoIdentificado}>
                        {tipoOxido}
                    </Text>
                )
            }
            else if (tamaño == 3 && elementoFinal.simbolo === 'H') {
                const tipoHidruro = identificarHidruro(elementosIdentificados[1].simbolo)
                if(elementoFinal.simbolo == elementosIdentificados[1].simbolo){
                    return(
                        <Text style={estilos.elementoIdentificado}>
                            error
                        </Text>
                    )
                }
                return(
                    <Text style={estilos.elementoIdentificado}>
                        {tipoHidruro}
                    </Text>
                )
            }else if (tamaño == 3 && elementosIdentificados[1].simbolo === 'H') {
                const hidracido = identificarMetaYNoMetal(elementoFinal.simbolo)
                if(!hidracido){
                    return(
                        <Text style={estilos.elementoIdentificado}>
                            Hidracido
                        </Text>
                    )
                }
                
            }else if (tamaño == 3) {
                const identificado1 = identificarMetaYNoMetal(elementosIdentificados[1].simbolo);
                const identificado2 = identificarMetaYNoMetal(elementoFinal.simbolo);
                if (identificado1 == true && identificado2 == false) {
                    return(
                    <Text style={estilos.elementoIdentificado}>
                        Sal Haloidea
                    </Text>
                )
                }
                
            }
    }
    return(
        <contexto.Provider value={{colors,datosTabla,elementSelect,
            setElementSelect,goToPage,identificacionCoeficientes,separarCompuesto,
            compuestoIdentificado,setCompuestoIdentificado,elementosIdentificados,
            setElementosIdentificados,identificarOxido,identificarTipo,
        }}>
            {children}
        </contexto.Provider>
    )
}
const estilos = StyleSheet.create({
    elementoIdentificado:{
        fontSize:30,
        fontWeight:'800',
        width:'70%',
        textAlign:'center',
        color:'#ffff',
        backgroundColor:'#FA6907',
        minHeight:60,
        borderRadius:20,
        textAlignVertical:'center'
    }
})