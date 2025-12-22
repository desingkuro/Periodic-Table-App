// hooks/useOrganicSubstitution.ts
import { useState } from "react";

export interface SubstitutionResult {
    reactant: string;
    reagent: string;
    product: string;
    leaving: string;
    substitutionType: string;
    mechanism: string;
    valid: boolean;
    error?: string;
}

export function useOrganicSubstitution() {
    const [reactantInput, setReactantInput] = useState("");
    const [reagentInput, setReagentInput] = useState("");
    const [result, setResult] = useState<SubstitutionResult | null>(null);

    const normalizeFormula = (s: string) => s.replace(/\s+/g, "").toUpperCase();

    const performSubstitution = (
        reactant: string,
        reagent: string
    ): SubstitutionResult => {
        const reactantUpper = normalizeFormula(reactant);
        const reagentUpper = normalizeFormula(reagent);

        let product = "";
        let leaving = "";
        let substitutionType = "";
        let mechanism = "";

        // Halogenación de alcanos (R-H + X2 → R-X + HX)
        if (
            reagentUpper.match(/^(CL2|BR2|I2|F2)$/) &&
            reactantUpper.match(/^C\d*H\d+$/)
        ) {
            const halogen = reagentUpper.charAt(0);
            product = reactantInput.replace(/H(\d*)$/i, halogen + "$1");
            leaving = "H" + halogen;
            substitutionType = "Halogenación de alcano";
            mechanism = "Radicales libres (luz UV o calor)";
        }
        // Sustitución de halógeno por OH (R-X + OH⁻ → R-OH + X⁻)
        else if (
            reactantUpper.match(/(CL|BR|I|F)\d*$/) &&
            (reagentUpper.includes("OH") || reagentUpper.includes("NAOH") || reagentUpper.includes("KOH"))
        ) {
            const halogens = ["CL", "BR", "I", "F"];
            let foundHalogen = "";
            for (const hal of halogens) {
                if (reactantUpper.includes(hal)) {
                    foundHalogen = hal;
                    break;
                }
            }
            product = reactantInput.replace(new RegExp(foundHalogen, "i"), "OH");
            leaving = foundHalogen + "⁻";
            substitutionType = "Sustitución nucleofílica";
            mechanism = "SN2 o SN1 (depende de la estructura y condiciones)";
        }
        // Sustitución de OH por halógeno (R-OH + HX → R-X + H2O)
        else if (
            reactantUpper.includes("OH") &&
            reagentUpper.match(/^H(CL|BR|I)$/)
        ) {
            const halogen = reagentUpper.charAt(1) + (reagentUpper.length > 2 ? reagentUpper.charAt(2) : "");
            product = reactantInput.replace(/OH/i, halogen);
            leaving = "H₂O";
            substitutionType = "Sustitución de hidroxilo";
            mechanism = "Sustitución nucleofílica con catalizador ácido";
        }
        // Sustitución halógeno-halógeno (R-X + X'⁻ → R-X' + X⁻)
        else if (
            reactantUpper.match(/(CL|BR|I)\d*$/) &&
            reagentUpper.match(/^(CL|BR|I|F)$/)
        ) {
            const oldHalogen = reactantUpper.match(/(CL|BR|I)/)![0];
            const newHalogen = reagentUpper;
            product = reactantInput.replace(new RegExp(oldHalogen, "i"), newHalogen);
            leaving = oldHalogen + "⁻";
            substitutionType = "Intercambio de halógenos";
            mechanism = "Sustitución nucleofílica SN2";
        }
        // Sustitución en aromáticos (ej: C6H6 + Cl2 → C6H5Cl + HCl)
        else if (
            (reactantUpper.includes("C6H6") || reactantUpper.includes("BENCENO")) &&
            reagentUpper.match(/^(CL2|BR2|NO2)$/)
        ) {
            const group = reagentUpper === "NO2" ? "NO₂" : reagentUpper.charAt(0);
            product = "C₆H₅" + group;
            leaving = reagentUpper === "NO2" ? "H⁺" : "HCl";
            substitutionType = "Sustitución electrofílica aromática";
            mechanism = "SEAr con catalizador (FeCl₃, H₂SO₄)";
        } else {
            return {
                reactant: reactantInput,
                reagent: reagentInput,
                product: "",
                leaving: "",
                substitutionType: "",
                mechanism: "",
                valid: false,
                error:
                    "No se pudo identificar una reacción de sustitución válida. Verifica las fórmulas (ej: CH4 + Cl2, CH3Cl + OH, CH3OH + HBr).",
            };
        }

        return {
            reactant: reactantInput,
            reagent: reagentInput,
            product: product || reactantInput + " → ?",
            leaving,
            substitutionType,
            mechanism,
            valid: true,
        };
    };

    const generate = () => {
        if (!reactantInput || !reagentInput) {
            setResult({
                reactant: "",
                reagent: "",
                product: "",
                leaving: "",
                substitutionType: "",
                mechanism: "",
                valid: false,
                error: "Escribe tanto el compuesto orgánico como el reactivo.",
            });
            return;
        }

        const sub = performSubstitution(reactantInput, reagentInput);
        setResult(sub);
    };

    const reset = () => {
        setReactantInput("");
        setReagentInput("");
        setResult(null);
    };

    return {
        reactantInput,
        setReactantInput,
        reagentInput,
        setReagentInput,
        result,
        generate,
        reset,
    };
}
