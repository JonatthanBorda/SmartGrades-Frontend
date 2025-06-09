import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericoService<T,Tl> {

  protected api: string = environment.apiUrlBase
  protected endpoint: string = ''

  private UpdateSource = new BehaviorSubject<T | null>(null);
  Updated$ = this.UpdateSource.asObservable();

  private RegistroSource = new BehaviorSubject<Tl | null>(null);
  Registro$ = this.RegistroSource.asObservable();

  constructor(protected http: HttpClient) { }

  ListarTodos(): Observable<T[]> {
    return this.http.get<T[]>(`${this.api}/${this.endpoint}`);
  }

  ListarPorId(id: string): Observable<T>{
    return this.http.get<T>(`${this.api}/${this.endpoint}/${id}`);
  }

  Crear(datos: Tl): Observable<void>{
    return this.http.post<void>(`${this.api}/${this.endpoint}`, datos);
  }

  Actualizar(id: string, datos: T): Observable<void>{
    return this.http.put<void>(`${this.api}/${this.endpoint}/${id}`, datos);
  }

  Eliminar(id: string): Observable<void>{
    return this.http.delete<void>(`${this.api}/${this.endpoint}/${id}`);
  }

  notifyUpdate(entidad: T) {
    this.UpdateSource.next(entidad);
  }

  notifyRegistro(entidad: Tl) {
    
    this.RegistroSource.next(entidad);
  }

}
