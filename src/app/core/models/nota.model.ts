export interface Nota {
  id: string,
  nombre: string,
  idProfesor: string,
  idEstudiante: string,
  valor: number
}

export interface NotaComando {
  nombre: string,
  idProfesor: string,
  idEstudiante: string,
  valor: number
}
