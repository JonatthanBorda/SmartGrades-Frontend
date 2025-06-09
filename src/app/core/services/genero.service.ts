import { Injectable } from '@angular/core';
import { ComandoGenero, Genero } from '../models/genero.model';
import { GenericoService } from './generico.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneroService  extends GenericoService<Genero, ComandoGenero> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "genero";
  }
}
