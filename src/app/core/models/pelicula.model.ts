import { Actor } from "./actor.model";
import { Genero } from "./genero.model";
import { Pais } from "./pais.model";

export interface Pelicula {
    id: string,
    pais: Pais,
    director: RespuestaInfo,
    titulo: string,
    resena: string,
    imagenDePortada: string,
    codigoDeTrailerEnYoutube: string,
    actores: RespuestaInfo[],
    generos: Genero[],
}

export interface ComandoPelicula {
    pais: ComandoInfo,
    director: ComandoInfo,
    titulo: string,
    resena: string,
    imagenDePortada: string,
    codigoDeTrailerEnYoutube: string,
    actores: {id: string}[],
    generos: {id: string}[]
}

export interface RespuestaInfo {
    id: string,
    nombre: string
}

export interface ComandoInfo {
    id: string
}