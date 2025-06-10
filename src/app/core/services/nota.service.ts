import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Nota, NotaComando } from '../models/nota.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService extends GenericoService<Nota, NotaComando> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "Grades";
  }

  ActualizarNota(id: number, datos: NotaComando): Observable<void>{
      return this.http.put<void>(`${this.api}/${this.endpoint}`, datos);
    }
}
