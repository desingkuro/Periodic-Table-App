export interface ElementoQuimico {
    id: number;
    numero: number;
    simbolo: string;
    nombre: string;
    nombre_en: string;
    slug: string;
    grupo: number;
    periodo: number;
    bloque: "s" | "p" | "d" | "f";
    posicion: PosicionTablaPeriodica;
    categoria: string;
    categoria_color: string;
    fase: "Sólido" | "Líquido" | "Gas";
    masa_atomica_u: number;
    densidad: number;
    punto_fusion_c: number;
    punto_ebullicion_c: number;
    protones: number;
    electrones: number;
    neutrones_estimados: number;
    configuracion_electronica: string;
    capas: number[];
    electronegatividad_pauling: number;
    energias_ionizacion: number[];
    resumen: string;
    usos: string[];
    riesgos: string[];
    curiosidades: string[];
    fuente: string;
    modelo_bohr_imagen: string;
    modelo_bohr_3d: string;
    imagen: ImagenElemento;
}

export interface PosicionTablaPeriodica {
    x: number;
    y: number;
}

export interface ImagenElemento {
    title: string;
    url: string;
    attribution: string;
}
