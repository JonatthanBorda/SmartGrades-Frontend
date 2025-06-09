import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { consultaFiltrar } from '../models/consultaFiltrar.model';
import { ListaPaginada } from '../models/listaPaginada.model';

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

  ListarPorId(id: number): Observable<T>{
    return this.http.get<T>(`${this.api}/${this.endpoint}/${id}`);
  }

  Crear(datos: Tl): Observable<void>{
    return this.http.post<void>(`${this.api}/${this.endpoint}`, datos);
  }

  Actualizar(id: number, datos: T): Observable<void>{
    return this.http.put<void>(`${this.api}/${this.endpoint}/${id}`, datos);
  }

  Eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api}/${this.endpoint}/${id}`);
  }

  notifyUpdate(entidad: T) {
    this.UpdateSource.next(entidad);
  }

  ListaFiltrada(consulta: consultaFiltrar): Observable<ListaPaginada<T>> {
    return this.http.get<ListaPaginada<T>>(`${this.api}/${this.endpoint}/filter?orderBy=${consulta.orderBy}&desc=${consulta.desc}&page=${consulta.page}&pageSize=${consulta.pageSize}&nombre=${consulta.nombre}`);
  }

  notifyRegistro(entidad: Tl) {
    
    this.RegistroSource.next(entidad);
  }

}
