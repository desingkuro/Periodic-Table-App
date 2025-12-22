// hooks/useInorganicIdentification.ts
import { useState } from "react";

export interface InorganicResult {
    formula: string;
    compoundType: string;
    classification: string;
    nomenclature: string;
    examples: string[];
    valid: boolean;
    error?: string;
}

export function useInorganicIdentification() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<InorganicResult | null>(null);

    const identifyCompound = (formula: string): InorganicResult => {
        const upper = formula.toUpperCase().replace(/\s+/g, "");
        let compoundType = "";
        let classification = "";
        let nomenclature = "";
        const examples: string[] = [];

        // Óxidos metálicos (Metal + O)
        if (upper.match(/^[A-Z][A-Z]?\d*O\d*$/) && !upper.startsWith("H") &&
            !["C", "N", "S", "P", "CL", "BR", "I", "F"].includes(upper.charAt(0))) {
            compoundType = "Óxido metálico";
            classification = "Óxido básico";
            nomenclature = "Metal + oxígeno → óxido de metal";
            examples.push("Na₂O (óxido de sodio)", "CaO (óxido de calcio)", "Al₂O₃ (óxido de aluminio)");
        }
        // Óxidos no metálicos (No-Metal + O)
        else if (upper.match(/^[CNSP][A-Z]?\d*O\d*$/) || upper.match(/^[A-Z]*O\d*$/) &&
            ["CO", "SO", "NO", "P", "CL"].some(nm => upper.startsWith(nm))) {
            compoundType = "Óxido no metálico";
            classification = "Óxido ácido (anhídrido)";
            nomenclature = "No-metal + oxígeno → óxido ácido";
            examples.push("CO₂ (dióxido de carbono)", "SO₃ (trióxido de azufre)", "N₂O₅ (pentóxido de dinitrógeno)");
        }
        // Hidróxidos/Bases (Metal + OH)
        else if (upper.match(/OH\d*$/) && !upper.startsWith("H")) {
            compoundType = "Hidróxido (base)";
            classification = "Base";
            nomenclature = "Metal + grupo hidroxilo (-OH)";
            examples.push("NaOH (hidróxido de sodio)", "Ca(OH)₂ (hidróxido de calcio)", "Al(OH)₃ (hidróxido de aluminio)");
        }
        // Hidrácidos (HX - ácidos sin oxígeno)
        else if (upper.startsWith("H") && !upper.includes("O") && upper.length <= 4) {
            compoundType = "Hidrácido";
            classification = "Ácido binario";
            nomenclature = "Hidrógeno + no-metal (sin oxígeno)";
            examples.push("HCl (ácido clorhídrico)", "HBr (ácido bromhídrico)", "H₂S (ácido sulfhídrico)");
        }
        // Oxoácidos (HXO - ácidos con oxígeno)
        else if (upper.startsWith("H") && upper.includes("O")) {
            compoundType = "Oxoácido";
            classification = "Ácido ternario";
            nomenclature = "Hidrógeno + no-metal + oxígeno";
            examples.push("HNO₃ (ácido nítrico)", "H₂SO₄ (ácido sulfúrico)", "H₃PO₄ (ácido fosfórico)");
        }
        // Sales binarias (Metal + No-Metal)
        else if (upper.match(/^[A-Z][A-Z]?\d*[A-Z][A-Z]?\d*$/) && !upper.includes("O") && !upper.includes("H")) {
            compoundType = "Sal binaria (haluro)";
            classification = "Sal simple";
            nomenclature = "Metal + no-metal (sin oxígeno ni hidrógeno)";
            examples.push("NaCl (cloruro de sodio)", "KBr (bromuro de potasio)", "CaF₂ (fluoruro de calcio)");
        }
        // Sales ternarias (Metal + No-Metal + O)
        else if (upper.match(/^[A-Z][A-Z]?\d*[A-Z][A-Z]?\d*O\d*$/) && !upper.startsWith("H")) {
            compoundType = "Sal ternaria (oxisal)";
            classification = "Sal oxigenada";
            nomenclature = "Metal + no-metal + oxígeno (proviene de ácido oxoácido)";
            examples.push("NaNO₃ (nitrato de sodio)", "CaSO₄ (sulfato de calcio)", "K₂CO₃ (carbonato de potasio)");
        }
        // Peróxidos (Metal + O₂)
        else if (upper.includes("O2")) {
            compoundType = "Peróxido";
            classification = "Compuesto binario especial";
            nomenclature = "Metal + grupo peróxido (O₂²⁻)";
            examples.push("H₂O₂ (peróxido de hidrógeno)", "Na₂O₂ (peróxido de sodio)");
        }
        else {
            compoundType = "No identificado";
            classification = "Revisa la fórmula";
            nomenclature = "";
        }

        return {
            formula: input,
            compoundType,
            classification,
            nomenclature,
            examples,
            valid: true,
        };
    };

    const analyze = () => {
        if (!input || input.trim().length === 0) {
            setResult({
                formula: "",
                compoundType: "",
                classification: "",
                nomenclature: "",
                examples: [],
                valid: false,
                error: "Escribe la fórmula de un compuesto inorgánico (ej: NaCl, H2SO4, Ca(OH)2).",
            });
            return;
        }

        const analysis = identifyCompound(input);
        setResult(analysis);
    };

    const reset = () => {
        setInput("");
        setResult(null);
    };

    return {
        input,
        setInput,
        result,
        analyze,
        reset,
    };
}
