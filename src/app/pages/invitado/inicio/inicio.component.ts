import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeliculaService } from '../../../core/services/pelicula.service';
import { Subject, takeUntil } from 'rxjs';
import { Pelicula } from '../../../core/models/pelicula.model';
import { TarjetaPeliculaComponent } from '../../../shared/components/tarjeta-pelicula/tarjeta-pelicula.component';
import { BuscarPeliculaPipe } from "../../../shared/pipes/buscar-pelicula.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  imports: [
    TarjetaPeliculaComponent,
    BuscarPeliculaPipe,
    FormsModule
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit, OnDestroy {
  listaPeliculas: Pelicula[] = [];
  busqueda: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private servicioPelicula: PeliculaService) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioPelicula
    .ListarTodos()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (resp: Pelicula[]) => {
        this.listaPeliculas = resp;
      },
    });
  }
}
