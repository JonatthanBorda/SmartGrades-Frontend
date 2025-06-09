import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { ComandoPelicula, Pelicula } from '../models/pelicula.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService  extends GenericoService<Pelicula, ComandoPelicula> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "pelicula";
  }
}
