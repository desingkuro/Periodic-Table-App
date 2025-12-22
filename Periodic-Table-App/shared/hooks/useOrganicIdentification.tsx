// hooks/useOrganicIdentification.ts
import { useState } from "react";

export interface OrganicResult {
    formula: string;
    functionalGroups: string[];
    compoundType: string;
    examples: string[];
    valid: boolean;
    error?: string;
}

export function useOrganicIdentification() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<OrganicResult | null>(null);

    const identifyGroups = (formula: string): OrganicResult => {
        const upper = formula.toUpperCase().replace(/\s+/g, "");
        const groups: string[] = [];
        let compoundType = "Hidrocarburo";
        const examples: string[] = [];

        // Ácido carboxílico (-COOH)
        if (upper.includes("COOH")) {
            groups.push("Grupo carboxilo (-COOH)");
            compoundType = "Ácido carboxílico";
            examples.push("CH₃COOH (ácido acético)", "HCOOH (ácido fórmico)");
        }
        // Éster (-COO-)
        else if (upper.match(/COO[^H]/)) {
            groups.push("Grupo éster (-COO-)");
            compoundType = "Éster";
            examples.push("CH₃COOCH₃ (acetato de metilo)");
        }
        // Aldehído (-CHO)
        else if (upper.includes("CHO") && !upper.includes("COOH")) {
            groups.push("Grupo carbonilo aldehído (-CHO)");
            compoundType = "Aldehído";
            examples.push("CH₃CHO (etanal)", "HCHO (formaldehído)");
        }
        // Cetona (C=O interno)
        else if (upper.match(/C.*CO.*C/) && !upper.includes("COOH") && !upper.includes("CHO")) {
            groups.push("Grupo carbonilo cetona (C=O)");
            compoundType = "Cetona";
            examples.push("CH₃COCH₃ (propanona/acetona)");
        }
        // Alcohol (-OH)
        else if (upper.includes("OH")) {
            groups.push("Grupo hidroxilo (-OH)");
            compoundType = "Alcohol";
            examples.push("CH₃OH (metanol)", "C₂H₅OH (etanol)");
        }
        // Amina (-NH2)
        else if (upper.includes("NH2") || upper.includes("NH")) {
            groups.push("Grupo amino (-NH₂)");
            compoundType = "Amina";
            examples.push("CH₃NH₂ (metilamina)");
        }
        // Alquino (triple enlace)
        else if (formula.includes("≡") || upper.match(/C\d*H\d*/) && upper.match(/H(\d+)/) && parseInt(upper.match(/H(\d+)/)?.[1] || "0") < 2 * parseInt(upper.match(/C(\d+)/)?.[1] || "1")) {
            groups.push("Triple enlace C≡C");
            compoundType = "Alquino";
            examples.push("C₂H₂ (etino/acetileno)");
        }
        // Alqueno (doble enlace)
        else if (formula.includes("=") || upper.match(/C\d*H\d*/)) {
            groups.push("Doble enlace C=C");
            compoundType = "Alqueno";
            examples.push("C₂H₄ (eteno/etileno)");
        }

        if (groups.length === 0) {
            groups.push("Solo enlaces C-C y C-H");
            compoundType = "Alcano (hidrocarburo saturado)";
            examples.push("CH₄ (metano)", "C₂H₆ (etano)");
        }

        return {
            formula: input,
            functionalGroups: groups,
            compoundType,
            examples,
            valid: true,
        };
    };

    const analyze = () => {
        if (!input || input.trim().length === 0) {
            setResult({
                formula: "",
                functionalGroups: [],
                compoundType: "",
                examples: [],
                valid: false,
                error: "Escribe la fórmula de un compuesto orgánico (ej: CH3OH, CH3COOH, CH3CHO).",
            });
            return;
        }

        const analysis = identifyGroups(input);
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
