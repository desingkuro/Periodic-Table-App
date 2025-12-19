import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { contexto } from "../context/ContextoGeneral";
import { ElementoQuimico } from "../interfaces/Table.interface";

const heightCell = 100;
const widthCell = 100;

interface CellProps {
  element: ElementoQuimico;
  funcion: () => void;
}

export const CellElement = React.memo(function CellElement({
  element,
  funcion
}: CellProps) {
  const { setElementSelect } = useContext(contexto);

  function initElement() {
    setElementSelect(element);
    funcion();
  }

  return (
    <TouchableOpacity
      style={[styles.cell, { borderLeftColor: element.categoria_color }]}
      onPress={initElement}
    >
      <Text style={styles.textNumber}>{element.numero}</Text>
      <Text style={styles.textSymbol}>{element.simbolo}</Text>
      <Text
        style={[styles.textName, { color: element.categoria_color || 'white' }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {element.nombre}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#222831",
    height: heightCell,
    width: widthCell,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 5,
    borderRightColor: "#444",
    borderTopColor: "#444",
    borderBottomColor: "#444",
    padding: 4,
  },
  textSymbol: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
    marginVertical: 2,
  },
  textNumber: {
    color: "white",
    fontSize: 11,
    position: "absolute",
    top: 4,
    left: 6,
    opacity: 0.7,
  },
  textName: {
    fontSize: 11,
    textAlign: "center",
    width: "100%",
  },
});
