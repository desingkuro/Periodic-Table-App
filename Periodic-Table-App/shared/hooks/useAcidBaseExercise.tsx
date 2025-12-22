// hooks/useAcidBaseExercise.ts
import { useState } from "react";

export interface AcidBaseResult {
    acid: string;
    base: string;
    salt: string;
    water: string;
    valid: boolean;
    error?: string;
}

// Versión educativa simple solo para ácidos HX y bases MOH
export function useAcidBaseExercise() {
    const [acidInput, setAcidInput] = useState("");
    const [baseInput, setBaseInput] = useState("");
    const [result, setResult] = useState<AcidBaseResult | null>(null);

    const normalize = (s: string) => s.replace(/\s+/g, "").toUpperCase();

    const isSimpleAcid = (f: string) => /^H[A-Z][A-Z]?$/.test(f); // HX o HXO
    const isSimpleBase = (f: string) => /^[A-Z][A-Z]?OH$/.test(f); // MOH

    const buildSalt = (acid: string, base: string): string => {
        // simplificado: HCl + NaOH → NaCl + H2O
        const anion = acid.slice(1); // Cl
        const metal = base.replace(/OH$/i, ""); // Na
        return metal + anion;
    };

    const generate = () => {
        const acid = normalize(acidInput);
        const base = normalize(baseInput);

        if (!acid || !base) {
            setResult({
                acid,
                base,
                salt: "",
                water: "",
                valid: false,
                error: "Escribe la fórmula del ácido y de la base.",
            });
            return;
        }

        if (!isSimpleAcid(acid) || !isSimpleBase(base)) {
            setResult({
                acid,
                base,
                salt: "",
                water: "",
                valid: false,
                error:
                    "Por ahora solo se aceptan ácidos binarios (ej: HCl, HBr) y bases tipo MOH (ej: NaOH, KOH).",
            });
            return;
        }

        const salt = buildSalt(acid, base);
        setResult({
            acid,
            base,
            salt,
            water: "H₂O",
            valid: true,
        });
    };

    const reset = () => {
        setAcidInput("");
        setBaseInput("");
        setResult(null);
    };

    return {
        acidInput,
        setAcidInput,
        baseInput,
        setBaseInput,
        result,
        generate,
        reset,
    };
}
