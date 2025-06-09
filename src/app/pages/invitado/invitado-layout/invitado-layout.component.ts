import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoInvitadoComponent } from '../../../shared/components/encabezado-invitado/encabezado-invitado.component';

@Component({
  selector: 'app-invitado-layout',
  imports: [
    RouterOutlet,
    EncabezadoInvitadoComponent
  ],
  templateUrl: './invitado-layout.component.html',
  styleUrl: './invitado-layout.component.css'
})
export class InvitadoLayoutComponent {

}
