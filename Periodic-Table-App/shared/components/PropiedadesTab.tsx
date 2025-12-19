import { ElementoQuimico } from "@/shared/interfaces/Table.interface";
import { StyleSheet, View } from "react-native";
import PropertyRow from "./PropertyRow";
import Section from "./Section";

export default function PropiedadesTab({ element }: { element: ElementoQuimico }) {
    return (
        <View style={styles.tabContent}>
            <Section title="Propiedades Físicas">
                <PropertyRow label="Punto de fusión" value={element.punto_fusion_c ? `${element.punto_fusion_c} °C` : "Desconocido"} />
                <PropertyRow label="Punto de ebullición" value={element.punto_ebullicion_c ? `${element.punto_ebullicion_c} °C` : "Desconocido"} />
                <PropertyRow label="Densidad" value={element.densidad ? `${element.densidad} g/cm³` : "Desconocido"} />
                <PropertyRow label="Estado" value={element.fase} />
            </Section>

            <Section title="Propiedades Químicas">
                <PropertyRow
                    label="Electronegatividad"
                    value={element.electronegatividad_pauling ? element.electronegatividad_pauling.toString() : "—"}
                />
                <PropertyRow label="Configuración electrónica" value={element.configuracion_electronica} />
                <PropertyRow label="Capas electrónicas" value={element.capas.join(", ")} />
            </Section>

            {element.energias_ionizacion && element.energias_ionizacion.length > 0 && (
                <Section title="Energías de Ionización (kJ/mol)">
                    {element.energias_ionizacion.slice(0, 5).map((energia, idx) => (
                        <PropertyRow key={idx} label={`${idx + 1}ª ionización`} value={energia.toFixed(1)} />
                    ))}
                </Section>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        padding: 20,
    }
});
