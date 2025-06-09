import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { HttpClient } from '@angular/common/http';
import { Estudiante, EstudianteComando } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService extends GenericoService<Estudiante, EstudianteComando> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "Estudiantes";
  }
}
