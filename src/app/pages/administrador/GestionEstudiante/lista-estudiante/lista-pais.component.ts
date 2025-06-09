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
import { FormularioEstudianteComponent } from '../formulario-estudiante/formulario-estudiante.component';
import { EstudianteService } from '../../../../core/services/estudiante.service';
import { Estudiante, EstudianteComando } from '../../../../core/models/estudiante.model';


@Component({
  selector: 'app-lista-pais',
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
      FormularioEstudianteComponent,
    ],
  templateUrl: './lista-pais.component.html',
  styleUrl: './lista-pais.component.css'
})
export class ListaEstudianteComponent implements OnInit, OnDestroy {
  listaEstudiantes: Estudiante[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  estudiante!: Estudiante | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioEstudiante: EstudianteService,
    private servicioMensaje: MessageService,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioEstudiante
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Estudiante[]) => {
          this.listaEstudiantes = resp;
        },
      });

    this.servicioEstudiante.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedPais) => {
        if (updatedPais) {
          this.servicioEstudiante
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Estudiante[]) => {
              this.listaEstudiantes = resp;
            });
        }
      },
    );

    this.servicioEstudiante.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroPais) => {
        if (registroPais) {
          this.servicioEstudiante
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Estudiante[]) => {
              this.listaEstudiantes = resp;
            });
        }
      },
    );
  }

  registrarEstudiante(estudiante: EstudianteComando) {
    this.servicioEstudiante.Crear(estudiante)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Estudiante Registrado',
        });

        this.servicioEstudiante.notifyRegistro(estudiante);
        this.ocultarFormulario();
      },
    })
  }

  actualizarEstudiante(estudiante: Estudiante) {
    this.servicioEstudiante.Actualizar(estudiante.id,estudiante)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Estudiante Actualizado',
        });

        this.servicioEstudiante.notifyUpdate(estudiante);

        this.ocultarFormulario();
      },
      })
  }

  eliminarEstudiante(estudiante: Estudiante) {
    this.servicioEstudiante.Eliminar(estudiante.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Estudiante Eliminado',
        });

        this.servicioEstudiante.notifyUpdate(estudiante);
      },
    });
  }

  mostrarFormulario(estudiante?: Estudiante) {
    if (estudiante) {
      this.estudiante = { ...estudiante };;
    }

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.estudiante = null;
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
    return this.listaEstudiantes
      ? this.first === this.listaEstudiantes.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaEstudiantes ? this.first === 0 : true;
  }
}