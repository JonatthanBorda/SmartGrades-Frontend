import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { BuscarPeliculaPipe } from '../../../../shared/pipes/buscar-pelicula.pipe';
import { FormularioPeliculaComponent } from '../formulario-pelicula/formulario-pelicula.component';
import { ComandoPelicula, Pelicula } from '../../../../core/models/pelicula.model';
import { PeliculaService } from '../../../../core/services/pelicula.service';
import { Pais } from '../../../../core/models/pais.model';
import { PaisService } from '../../../../core/services/pais.service';
import { Genero } from '../../../../core/models/genero.model';
import { Actor } from '../../../../core/models/actor.model';
import { Director } from '../../../../core/models/director.model';
import { GeneroService } from '../../../../core/services/genero.service';
import { ActorService } from '../../../../core/services/actor.service';
import { DirectorService } from '../../../../core/services/director.service';

@Component({
  selector: 'app-lista-pelicula',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    PaginatorModule,
    BuscarPeliculaPipe,
    FormsModule,
    FormularioPeliculaComponent,
  ],
  templateUrl: './lista-pelicula.component.html',
  styleUrl: './lista-pelicula.component.css',
})
export class ListaPeliculaComponent implements OnInit, OnDestroy {
  listaPeliculas: Pelicula[] = [];
  listaPaises: Pais[] = [];
  listaGeneros: Genero[] = [];
  listaActores: Actor[] = [];
  listaDirectores: Director[] = [];

  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  Pelicula!: Pelicula | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioPelicula: PeliculaService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private servicioPais: PaisService,
    private servicioGenero: GeneroService,
    private servicioActor: ActorService,
    private servicioDirector: DirectorService,
    private route: Router,
  ) {}

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

    this.servicioPais
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Pais[]) => {
          this.listaPaises = resp;
        },
      });

    this.servicioActor
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Actor[]) => {
          this.listaActores = resp;
        },
      });

    this.servicioDirector
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Director[]) => {
          this.listaDirectores = resp;
        },
      });

    this.servicioGenero
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Genero[]) => {
          this.listaGeneros = resp;
        },
      });

    this.servicioPelicula.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedPelicula) => {
        if (updatedPelicula) {
          this.servicioPelicula
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Pelicula[]) => {
              this.listaPeliculas = resp;
            });
        }
      },
    );

    this.servicioPelicula.Registro$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((registroPelicula) => {
      if (registroPelicula) {
        this.servicioPelicula
          .ListarTodos()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((resp: Pelicula[]) => {
            this.listaPeliculas = resp;
          });
      }
    });
  }

  registrarPelicula(Pelicula: ComandoPelicula) {
    this.servicioPelicula
      .Crear(Pelicula)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Registrado',
            detail: 'Pelicula Registrado',
          });

          this.servicioPelicula.notifyRegistro(Pelicula);
          this.ocultarFormulario();
        },
      });
  }

  actualizarPelicula(Pelicula: Pelicula) {
    this.servicioPelicula
      .Actualizar(Pelicula.id, Pelicula)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Pelicula Actualizado',
          });

          this.servicioPelicula.notifyUpdate(Pelicula);

          this.ocultarFormulario();
        },
      });
  }

  eliminarPelicula(Pelicula: Pelicula) {
    this.servicioPelicula
      .Eliminar(Pelicula.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Pelicula Eliminado',
          });

          this.servicioPelicula.notifyUpdate(Pelicula);
        },
      });
  }

  mostrarFormulario(Pelicula?: Pelicula) {
    if (Pelicula) {
      this.Pelicula = { ...Pelicula };
    }

    console.log(this.Pelicula);

    this.visibleFormulario = !this.visibleFormulario;
  }

  ocultarFormulario() {
    this.visibleFormulario = false;
    this.Pelicula = null;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.listaPeliculas
      ? this.first === this.listaPeliculas.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaPeliculas ? this.first === 0 : true;
  }
}

