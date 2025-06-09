import { ComandoPais, Pais } from "./pais.model"

export interface Director {
    id: string,
    nombre: string,
    apellido: string,
    pais: Pais
}

export interface ComandoDirector {
    nombre: string,
    apellido: string,
    pais: ComandoPais
}