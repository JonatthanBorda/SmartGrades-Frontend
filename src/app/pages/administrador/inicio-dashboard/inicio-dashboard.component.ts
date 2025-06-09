import { Component } from '@angular/core';
import { ListaPeliculaComponent } from "../GestionPelicula/lista-pelicula/lista-pelicula.component";

@Component({
  selector: 'app-inicio-dashboard',
  imports: [ListaPeliculaComponent],
  templateUrl: './inicio-dashboard.component.html',
  styleUrl: './inicio-dashboard.component.css'
})
export class InicioDashboardComponent {
  
}
