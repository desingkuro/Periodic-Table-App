// data/reactions.ts
export type ReactionCategory = "inorganic" | "organic" | "identification";

export interface ReactionItem {
    id: string;
    title: string;
    description: string;
    category: ReactionCategory;
    icon: string; // nombre Ionicons
}

export const REACTIONS: ReactionItem[] = [
    {
        id: "combustion",
        title: "Reacciones de combustión",
        description: "Oxidación rápida de compuestos, típicamente hidrocarburos.",
        category: "inorganic",
        icon: "flame-outline",
    },
    {
        id: "acid-base",
        title: "Ácido–base (neutralización)",
        description: "Ácido + base → sal + agua.",
        category: "inorganic",
        icon: "beaker-outline",
    },
    {
        id: "redox",
        title: "Óxido–reducción (redox)",
        description: "Transferencia de electrones entre especies químicas.",
        category: "inorganic",
        icon: "swap-vertical-outline",
    },
    {
        id: "organic-id",
        title: "Identificación de orgánicos",
        description: "Reconocer alcoholes, cetonas, ácidos, ésteres, etc.",
        category: "identification",
        icon: "search-outline",
    },
    {
        id: "inorganic-id",
        title: "Identificación de inorgánicos",
        description: "Clasificar óxidos, sales, hidróxidos y ácidos.",
        category: "identification",
        icon: "filter-outline",
    },
    {
        id: "substitution",
        title: "Sustitución orgánica",
        description: "Cambios de grupos funcionales en compuestos orgánicos.",
        category: "organic",
        icon: "git-compare-outline",
    },
];
