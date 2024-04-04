import { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { Foundation } from '@expo/vector-icons';
import { Boton } from "../components/Boton";
import { contexto } from "../context/ContextoGeneral"

export function CompuestosInorganicos({ }) {
    const { separarCompuesto, elementosIdentificados, 
            setElementosIdentificados,identificarOxido,
            identificarTipo 
        } = useContext(contexto);
        
    const [compuesto, setCompuesto] = useState('');

    function mostrarCompuesto() {
        if (elementosIdentificados != '') {
            return (
                elementosIdentificados.map((elemento, index) => {
                    return (
                        <Text key={index} style={estilos.TextResultado}>
                            {elemento.simbolo}
                            <Text style={estilos.TextResultadoSubIndice}>
                                {elemento.coeficiente == 1 ? '' : elemento.coeficiente}
                            </Text>
                        </Text>
                    )
                })
            )
        }
    }

    return (
        <View style={estilos.container}>
            <View style={estilos.containerText}>
                <Text style={estilos.textLabel}>
                    Ingrese el compuesto Inorganico
                </Text>
            </View>
            <TextInput
                value={compuesto}
                style={estilos.input}
                onChangeText={(valor) => setCompuesto(valor)}
                placeholder="ingrese aqui"
            />
            <View style={estilos.containerTextAlert}>
                <Foundation name="alert" size={24} color="#ffb1b1" />
                <Text style={estilos.textAlert}>
                    Se debe escribit correctamente el compuesto para realizar la idenficicacion del mismo
                </Text>
            </View>
            <View style={estilos.ContainerResultado}>
                <Text style={estilos.TextLabelResultado}>
                    El compuesto:
                </Text>
                {mostrarCompuesto()}
                <Text style={estilos.TextLabelResultado}>
                    Es un:
                </Text>
                {identificarTipo()}
            </View>
            <View style={estilos.containerBtn}>
                <Boton color={'#FAA624'} text={'Identificar'} funcion={() => {separarCompuesto(compuesto)}} />
            </View>
        </View>
    )
}
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    containerText: {
        width: '100%',
        height: 50,
        padding: 10,
        justifyContent: 'center',

    },
    textLabel: {
        fontSize: 20
    },
    input: {
        width: '100%',
        height: 70,
        fontSize: 20,
        paddingLeft: 15,
        fontWeight: '500',
        borderColor: '#b1ceff',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#e7e7e7'
    },
    textAlert: {
        width: '70%',
        fontWeight: '800',
        color: 'gray',
        fontSize: 10
    },
    containerTextAlert: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        gap: 5,
        flexDirection: 'row',
    },
    containerBtn: {
        position: 'absolute',
        bottom: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContainerResultado: {
        minHeight: 220,
        maxHeight:250,
        width: '100%',
        padding: 10,
        backgroundColor: '#222831',
        borderRadius: 20,
        marginTop: 30,
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap',
        flexDirection:'row'
    },
    TextResultado: {
        fontSize: 25,
        color: '#ffff',
        marginTop:10
    },
    TextLabelResultado:{
        width:'100%',
        marginBottom:12,
        color:'#ffff',
        fontSize:25
    },
    TextResultadoSubIndice:{
        fontSize:15,
    },
})