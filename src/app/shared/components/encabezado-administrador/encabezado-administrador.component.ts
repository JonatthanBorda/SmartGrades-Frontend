import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-encabezado-administrador',
  imports: [
    BreadcrumbModule, 
    RouterModule,
    AvatarModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './encabezado-administrador.component.html',
  styleUrl: './encabezado-administrador.component.css'
})
export class EncabezadoAdministradorComponent  implements OnInit{
  
  @Output() toggleMenu = new EventEmitter<void>();

  nombre: string = ""

  items!: MenuItem[];

  inicial: string = 'A'

  constructor(
    private servicioAute: AutenticacionService, 
    private router: Router,
    private servicioMersaje: MessageService
  ) {
    
  }

  ngOnInit() {

    this.servicioAute.datosAutenticado$.subscribe({
      next: (datos) => {
        if (datos && datos.nombre) {
          this.inicial = datos.nombre[0]; 
          this.nombre = datos.nombre + ' ' + datos.apellido;
        } else {
          this.inicial = 'A';  
          this.nombre = '';
        }
      }
    });
    


    this.items = [
      {
        label: 'Cerrar Sesión',
        command: () => {
          this.servicioAute.cerrarSesion()
          this.router.navigate(['/'])
          this.servicioMersaje.add({ severity: 'success', summary: 'Exito', detail: 'Sesion cerrada' });
        }
      }
    ];
  }

  
}