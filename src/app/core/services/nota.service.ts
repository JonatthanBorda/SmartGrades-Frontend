import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Nota, NotaComando } from '../models/nota.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotaService extends GenericoService<Nota, NotaComando> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "Notas";
  }
}
