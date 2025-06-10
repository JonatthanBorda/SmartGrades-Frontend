import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
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


  constructor(
  ) {
    
  }

  ngOnInit() {

  }

  
}