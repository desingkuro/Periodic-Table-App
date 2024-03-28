import { createContext, useEffect, useState } from "react";
import data from '../Api/elements.json'

export const contexto = createContext();

export function ContextoGeneral({children}) {
    const [datosTabla,setDatosTabla] = useState(data.elements);
    const [elementSelect,setElementSelect] = useState(null);
      
    const colors = {
        'blanco':'#ffff',
        'fondo':'#222831',
        'secundario':'#31363F'
    }
    return(
        <contexto.Provider value={{colors,datosTabla,elementSelect,setElementSelect}}>
            {children}
        </contexto.Provider>
    )
}