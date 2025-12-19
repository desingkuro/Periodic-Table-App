// useGrid.ts
import { ElementoQuimico } from "@/shared/interfaces/Table.interface";

export const GROUPS = 18;
export const PERIODS = 7; // períodos principales
export const COLS = GROUPS + 1; // +1 para columna de períodos (total 19)

export type GridCell =
    | { type: "corner"; key: string }
    | { type: "groupHeader"; group: number; key: string }
    | { type: "periodHeader"; period: number; key: string }
    | { type: "element"; element: ElementoQuimico; key: string }
    | { type: "lanthanideIndicator"; key: string; elements: string } // indicador para 57-71
    | { type: "actinideIndicator"; key: string; elements: string }   // indicador para 89-103
    | { type: "spacer"; key: string }  // separador visual
    | { type: "empty"; key: string };

export function buildPeriodicGrid(elements: ElementoQuimico[]): {
    grid: GridCell[];
    rows: number;
    cols: number;
} {
    // +1 fila cabecera grupos + 7 períodos + 1 spacer + 2 filas (lantánidos/actínidos)
    const rows = 1 + PERIODS + 1 + 2; // = 11 filas total
    const total = rows * COLS;

    // Mapa por posición (SIN filtrar por período)
    const byPos = new Map<string, ElementoQuimico>();
    for (const e of elements) {
        const x = e.posicion?.x;
        const y = e.posicion?.y;
        if (x && y) { // <-- Removido el filtro y <= PERIODS
            byPos.set(`${y}-${x}`, e);
        }
    }

    const grid: GridCell[] = new Array(total);

    for (let index = 0; index < total; index++) {
        const row = Math.floor(index / COLS);
        const col = index % COLS;

        // Fila 0 = cabecera de grupos
        if (row === 0) {
            if (col === 0) {
                grid[index] = { type: "corner", key: "corner" };
            } else {
                grid[index] = { type: "groupHeader", group: col, key: `g-${col}` };
            }
            continue;
        }

        // Filas 1-7 = períodos principales
        if (row >= 1 && row <= PERIODS) {
            // Columna 0 = cabecera de período
            if (col === 0) {
                grid[index] = { type: "periodHeader", period: row, key: `p-${row}` };
                continue;
            }

            // Indicador de Lantánidos en posición (6, 3) → fila 6, grupo 3
            if (row === 6 && col === 3) {
                grid[index] = {
                    type: "lanthanideIndicator",
                    key: "lant-indicator",
                    elements: "57-71"
                };
                continue;
            }

            // Indicador de Actínidos en posición (7, 3) → fila 7, grupo 3
            if (row === 7 && col === 3) {
                grid[index] = {
                    type: "actinideIndicator",
                    key: "actin-indicator",
                    elements: "89-103"
                };
                continue;
            }

            // Elementos normales
            const element = byPos.get(`${row}-${col}`);
            grid[index] = element
                ? { type: "element", element, key: `el-${element.numero}` }
                : { type: "empty", key: `e-${row}-${col}` };
            continue;
        }

        // Fila 8 = separador visual
        if (row === 8) {
            grid[index] = { type: "spacer", key: `spacer-${col}` };
            continue;
        }

        // Fila 9 = Lantánidos (y=9 del dataset)
        if (row === 9) {
            if (col === 0) {
                grid[index] = { type: "periodHeader", period: 6, key: "p-lant" }; // "6*" o vacío
                continue;
            }

            // Lantánidos: Ce(58) a Lu(71) están en y=9, x=4 a x=18 (aprox)
            // Mapear desde col=3 para alinear con la tabla
            const lanthanideCol = col + 1; // ajuste de posición
            const element = byPos.get(`9-${lanthanideCol}`);
            grid[index] = element
                ? { type: "element", element, key: `el-${element.numero}` }
                : { type: "empty", key: `e-lant-${col}` };
            continue;
        }

        // Fila 10 = Actínidos (y=10 del dataset)
        if (row === 10) {
            if (col === 0) {
                grid[index] = { type: "periodHeader", period: 7, key: "p-actin" }; // "7*" o vacío
                continue;
            }

            // Actínidos: Th(90) a Lr(103) están en y=10, x=4 a x=18 (aprox)
            const actinideCol = col + 1;
            const element = byPos.get(`10-${actinideCol}`);
            grid[index] = element
                ? { type: "element", element, key: `el-${element.numero}` }
                : { type: "empty", key: `e-actin-${col}` };
            continue;
        }

        // Por defecto: vacío
        grid[index] = { type: "empty", key: `empty-${row}-${col}` };
    }

    return { grid, rows, cols: COLS };
}
