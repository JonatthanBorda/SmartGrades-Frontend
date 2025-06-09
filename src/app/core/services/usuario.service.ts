import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { ComandoUsuario, Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  extends GenericoService<Usuario, ComandoUsuario> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "usuario";
  }
}
