export interface ListaOpciones {
    id: number,
    icon: string,
    label: string,
    roles?: string[],
    url: string,
    opciones: Opciones[]
}

export interface Opciones {
    id: number,
    icon: string,
    label: string,
    url: string
}

export interface Opcion {
    id: number,
    label: string,
    icon: string,
    ruta: string,
    descripcion: string,
}