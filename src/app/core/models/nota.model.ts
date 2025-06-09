export interface Nota {
  id: number,
  name: string,
  value: number
  idTeacher: number,
  idStudent: number,
}

export interface NotaComando {
  name: string,
  value: number
  idTeacher: number,
  idStudent: number,
}
