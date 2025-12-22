// hooks/useRedoxExercise.ts
import { useState } from "react";

export interface RedoxResult {
    oxidant: string;
    reductant: string;
    oxidized: string;
    reduced: string;
    valid: boolean;
    error?: string;
}

// El usuario introduce algo tipo: "Zn/Zn2+ ; Cu2+/Cu"
export function useRedoxExercise() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<RedoxResult | null>(null);

    const normalize = (s: string) => s.trim();

    const parsePairs = (raw: string) => {
        const parts = raw.split(/;|,/).map(p => p.trim()).filter(Boolean);
        if (parts.length !== 2) return null;

        const pairA = parts[0].split("/").map(p => p.trim());
        const pairB = parts[1].split("/").map(p => p.trim());
        if (pairA.length !== 2 || pairB.length !== 2) return null;

        return {
            pairA: { red: pairA[0], ox: pairA[1] }, // forma reducida / oxidada
            pairB: { red: pairB[0], ox: pairB[1] },
        };
    };

    const generate = () => {
        const text = normalize(input);
        if (!text) {
            setResult({
                oxidant: "",
                reductant: "",
                oxidized: "",
                reduced: "",
                valid: false,
                error:
                    'Escribe dos pares redox separados por ";" por ejemplo: "Zn/Zn2+ ; Cu2+/Cu".',
            });
            return;
        }

        const parsed = parsePairs(text);
        if (!parsed) {
            setResult({
                oxidant: "",
                reductant: "",
                oxidized: "",
                reduced: "",
                valid: false,
                error:
                    'Formato no válido. Usa algo como: "Zn/Zn2+ ; Cu2+/Cu" (reducido/oxidado).',
            });
            return;
        }

        const { pairA, pairB } = parsed;

        setResult({
            oxidant: pairB.ox + " / " + pairB.red,
            reductant: pairA.red + " / " + pairA.ox,
            oxidized: pairA.red + " → " + pairA.ox,
            reduced: pairB.ox + " → " + pairB.red,
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
