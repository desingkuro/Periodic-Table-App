import { createContext, useEffect, useState } from "react";
import data from '../Api/elements.json'
import { Alert } from "react-native";

export const contexto = createContext();

export function ContextoGeneral({children}) {
    const [datosTabla,setDatosTabla] = useState(data.elements);
    const [elementSelect,setElementSelect] = useState(null);
    const [compuestoIdentificado,setCompuestoIdentificado] = useState('');
      
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

        console.log(nuevoCompuesto)
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


    return(
        <contexto.Provider value={{colors,datosTabla,elementSelect,
            setElementSelect,goToPage,identificacionCoeficientes,separarCompuesto,
            compuestoIdentificado,setCompuestoIdentificado}}>
            {children}
        </contexto.Provider>
    )
}