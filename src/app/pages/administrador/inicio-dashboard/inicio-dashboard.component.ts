import { Component } from '@angular/core';
import { ListaNotaComponent } from '../GestionNota/lista-nota/lista-nota.component';

@Component({
  selector: 'app-inicio-dashboard',
  imports: [ListaNotaComponent],
  templateUrl: './inicio-dashboard.component.html',
  styleUrl: './inicio-dashboard.component.css'
})
export class InicioDashboardComponent {
  
}
