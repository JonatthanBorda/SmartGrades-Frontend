import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { ComandoPais, Pais } from '../models/pais.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService  extends GenericoService<Pais, ComandoPais> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "pais";
  }
}
