import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from '../../../core/models/pelicula.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tarjeta-pelicula',
  imports: [
    CardModule, 
    ButtonModule
  ],
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.css'
})
export class TarjetaPeliculaComponent {
  @Input() pelicula!: Pelicula;

  constructor(private router: Router) {}

  verDetallePelicula() {
    this.router.navigate(['/pelicula', this.pelicula.id]);
  }
}
