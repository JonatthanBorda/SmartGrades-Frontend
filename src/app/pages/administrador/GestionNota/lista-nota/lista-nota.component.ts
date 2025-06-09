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
import { NotaService } from '../../../../core/services/nota.service';
import { EstudianteService } from '../../../../core/services/estudiante.service';
import { ProfesorService } from '../../../../core/services/profesor.service';
import { FormularioNotaComponent } from '../formulario-nota/formulario-nota.component';
import { Nota, NotaComando } from '../../../../core/models/nota.model';
import { Profesor } from '../../../../core/models/profesor.model';
import { Estudiante } from '../../../../core/models/estudiante.model';

@Component({
  selector: 'app-lista-nota',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    PaginatorModule,
    FormsModule,
    FormularioNotaComponent,
  ],
  templateUrl: './lista-nota.component.html',
  styleUrl: './lista-nota.component.css',
})
export class ListaNotaComponent implements OnInit, OnDestroy {
  listaNotas: Nota[] = [];
  listaProfesores: Profesor[] = [];
  listaEstudiante: Estudiante[] = [];

  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  nota!: Nota | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioNota: NotaService,
    private servicioMensaje: MessageService,
    private servicioEstudiante: EstudianteService,
    private servicioProfesor: ProfesorService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioNota
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Nota[]) => {
          this.listaNotas = resp;
        },
      });

    this.servicioEstudiante
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Estudiante[]) => {
          this.listaEstudiante = resp;
        },
      });


    this.servicioProfesor
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Profesor[]) => {
          this.listaProfesores = resp;
        },
      });


    this.servicioNota.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedPelicula) => {
        if (updatedPelicula) {
          this.servicioNota
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Nota[]) => {
              this.listaNotas = resp;
            });
        }
      },
    );

    this.servicioNota.Registro$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((registroPelicula) => {
      if (registroPelicula) {
        this.servicioNota
          .ListarTodos()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((resp: Nota[]) => {
            this.listaNotas = resp;
          });
      }
    });
  }

  registrarNota(nota: NotaComando) {
    this.servicioNota
      .Crear(nota)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Registrado',
            detail: 'Nota Registrado',
          });

          this.servicioNota.notifyRegistro(nota);
          this.ocultarFormulario();
        },
      });
  }

  actualizarNota(nota: Nota) {
    this.servicioNota
      .Actualizar(nota.id, nota)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Nota Actualizado',
          });

          this.servicioNota.notifyUpdate(nota);

          this.ocultarFormulario();
        },
      });
  }

  eliminarNota(nota: Nota) {
    this.servicioNota
      .Eliminar(nota.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.servicioMensaje.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Nota Eliminado',
          });

          this.servicioNota.notifyUpdate(nota);
        },
      });
  }

  mostrarFormulario(nota?: Nota) {
    if (nota) {
      this.nota = { ...nota };
    }

    console.log(this.nota);

    this.visibleFormulario = !this.visibleFormulario;
  }

  ocultarFormulario() {
    this.visibleFormulario = false;
    this.nota = null;
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
    return this.listaNotas
      ? this.first === this.listaNotas.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaNotas ? this.first === 0 : true;
  }
}

