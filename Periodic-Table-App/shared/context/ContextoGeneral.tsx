import { createContext, useState } from "react";
import data from '../data/periodic_table.json';
import { ElementoQuimico } from "../interfaces/Table.interface";

/*import dataMetales from '../Api/classElement/Metales.json';
import dataNoMetales from '../Api/classElement/NoMetales.json';*/
/*const [metales, setMetales] = useState(dataMetales.Metales);
const [noMetales, setNoMetales] = useState(dataNoMetales.noMetales);*/

export interface ContextoGeneralInterface {
    datosTabla: ElementoQuimico[];
    elementSelect: ElementoQuimico | null;
    setElementSelect: (element: ElementoQuimico | null) => void;
    colorsCategory?: CategoryColor[];
}
export interface CategoryColor {
    categoria: string;
    color: string; // Hex color, e.g. "#90BE6D"
}

export const contexto = createContext<ContextoGeneralInterface | null>(null);

export function ContextoGeneral({ children }: any) {
    const [datosTabla, setDatosTabla] = useState<ElementoQuimico[]>(data.elements.map((e: any) => e as ElementoQuimico));
    const [elementSelect, setElementSelect] = useState<ElementoQuimico | null>(null);
    const [colorsCategory, setColorsCategory] = useState<CategoryColor[]>(data.category_colors);

    return (
        <contexto.Provider value={{
            datosTabla, elementSelect,
            setElementSelect,
            colorsCategory,
        }}>
            {children}
        </contexto.Provider>
    )
}