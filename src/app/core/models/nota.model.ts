import { Estudiante } from "./estudiante.model"
import { Profesor } from "./profesor.model"

export interface Nota {
  id: number,
  name: string,
  value: number
  teacher: Profesor,
  student: Estudiante,
}

export interface NotaComando {
  id?: number,
  name: string,
  value: number
  idTeacher: number,
  idStudent: number,
}
