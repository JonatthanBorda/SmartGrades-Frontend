import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Profesor, ProfesorComando } from '../models/profesor.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService extends GenericoService<Profesor, ProfesorComando> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "Profesores";
  }
}
