import { useContext } from "react";
import { Image, StyleSheet, View ,Text} from "react-native";
import { contexto } from "../context/ContextoGeneral";

export function ElementsDetails({navigation}) {
    const {elementSelect} = useContext(contexto);
    console.log(elementSelect.color)
    const colores = ['#93FA73']
    const colorCategoryText = elementSelect.color === '#93FA73' ? 'black' : '#ffff';
    return(
        <View style={stilos.screen}>
            <View style={stilos.headerElement}>
                <View style={stilos.backImage}>
                    <Image source={{uri:elementSelect.image.url}} style={stilos.imagen}/>
                </View>
                <View style={stilos.element}>
                    <Text style={stilos.Text}>
                        {elementSelect.name}
                    </Text>
                    <Text style={[stilos.Text,stilos.symbol]}>
                        {elementSelect.symbol}
                        <Text style={stilos.Text}>
                            {elementSelect.number}
                        </Text>
                    </Text>
                    
                    <Text style={stilos.Text}>
                        { elementSelect.molar_heat === null ?'Indefinido' +' (g/mol)':elementSelect.molar_heat+' (g/mol)' }
                    </Text>
                </View>
                <Text style={[stilos.Text,{
                    backgroundColor:elementSelect.color,
                    color:colorCategoryText
                },stilos.category]}>
                    {elementSelect.category}
                </Text>
            </View>
        </View>
    )
}
const stilos = StyleSheet.create({
    screen:{
        backgroundColor:'#222831',
        alignItems:'center',
        height:'100%',
        minWidth:380
    },
    headerElement:{
        position:'relative',
        backgroundColor:'red',
        width:'100%',
        height:250
    },
    backImage:{
        height:'100%',
        width:'100%'
    },
    imagen:{
        height:'100%',
        width:'100%'
    },
    element:{
        height:'100%',
        width:'100%',
        position:'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,0.4)',
        justifyContent:'flex-end',
        flexWrap:'wrap',
        padding:5
    },
    containerScroll:{
        height:'87%',
        width:'auto',
        paddingLeft:20,
        minWidth:380,
        flexDirection:'row',
        gap:5,
        paddingTop:10
    },
    Text:{
        color:'white',
        fontSize:18,
        fontWeight:'600',
        width:'100%'
    },
    symbol:{
        fontSize:70,
        fontWeight:'800',
        width:150,
        height:'auto'
    },
    category:{
        position:'absolute',
        width:240,
        height:40,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        textAlign:'right',
        paddingRight:15,
        bottom:35,
        right:0,
        fontWeight:'900',
        textAlignVertical:'center',
    }
});