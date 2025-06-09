import { ComandoPais, Pais } from "./pais.model"

export interface Actor {
    id: string,
    nombre: string,
    apellido: string,
    pais: Pais
}

export interface ComandoActor {
    nombre: string,
    apellido: string,
    pais: ComandoPais
}