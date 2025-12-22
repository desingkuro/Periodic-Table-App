// hooks/useCombustionExercise.ts
import { useState } from "react";

export interface CombustionResult {
    balanced: string;      // ecuación balanceada en texto
    x: number;             // nº átomos C
    y: number;             // nº átomos H
    valid: boolean;        // si la fórmula era válida
    error?: string;        // mensaje de error si no
}

// Solo hidrocarburos del tipo CxHy
const formulaRegex = /^C(\d*)H(\d+)$/i;

export function useCombustionExercise() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<CombustionResult | null>(null);

    const parseFormula = (formula: string): { x: number; y: number } | null => {
        const cleaned = formula.replace(/\s+/g, "");
        const match = cleaned.match(formulaRegex);
        if (!match) return null;

        const xStr = match[1];
        const yStr = match[2];
        const x = xStr === "" ? 1 : parseInt(xStr, 10);
        const y = parseInt(yStr, 10);
        if (!Number.isFinite(x) || !Number.isFinite(y) || x <= 0 || y <= 0) {
            return null;
        }
        return { x, y };
    };

    const buildBalancedEquation = (x: number, y: number): string => {
        // CxHy + (x + y/4) O2 → x CO2 + (y/2) H2O  [web:132][web:138]
        const o2Coeff = x + y / 4;
        const h2oCoeff = y / 2;

        const formatCoeff = (c: number) => (c === 1 ? "" : c.toString());

        const left = `C${x === 1 ? "" : x}H${y} + ${formatCoeff(o2Coeff)} O₂`;
        const right = `${formatCoeff(x)} CO₂ + ${formatCoeff(h2oCoeff)} H₂O`;

        return `${left} → ${right}`;
    };

    const generate = () => {
        const parsed = parseFormula(input);
        if (!parsed) {
            setResult({
                balanced: "",
                x: 0,
                y: 0,
                valid: false,
                error:
                    "Escribe una fórmula de hidrocarburo válida (ej: CH4, C2H6, C3H8).",
            });
            return;
        }

        const eq = buildBalancedEquation(parsed.x, parsed.y);
        setResult({
            balanced: eq,
            x: parsed.x,
            y: parsed.y,
            valid: true,
        });
    };

    const reset = () => {
        setInput("");
        setResult(null);
    };

    return {
        input,
        setInput,
        result,
        generate,
        reset,
    };
}
