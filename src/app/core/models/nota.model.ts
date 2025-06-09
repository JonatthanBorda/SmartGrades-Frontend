export interface Nota {
  id: number,
  nombre: string,
  valor: number
  idProfesor: number,
  idEstudiante: number,
}

export interface NotaComando {
  nombre: string,
  valor: number
  idProfesor: number,
  idEstudiante: number,
}
