import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargandoService {

  cargando = signal<boolean>(false);

  cargandoInvitado = signal<boolean>(false);

  mostrar() {
    this.cargando.set(true);
  }

  mostrarInvitado() {
    this.cargandoInvitado.set(true);
  }

  ocultar() {
    this.cargando.set(false);
  }

  ocultarInvitado() {
    this.cargandoInvitado.set(false);
  }
}
