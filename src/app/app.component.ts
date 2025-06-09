import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { PaginaDeCargaComponent } from "./pages/extras/pagina-de-carga/pagina-de-carga.component";
import { CargandoService } from './core/services/cargando.service';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    ToastModule, 
    PaginaDeCargaComponent, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cargandoInvitado!: WritableSignal<boolean>;

  constructor(
    private cargandoService: CargandoService
  ){}

  ngOnInit(): void {

    this.cargandoInvitado = this.cargandoService.cargandoInvitado;
    
  }
}
