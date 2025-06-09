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
import { FormularioProfesorComponent } from '../formulario-profesor/formulario-profesor.component';
import { Profesor, ProfesorComando } from '../../../../core/models/profesor.model';
import { ProfesorService } from '../../../../core/services/profesor.service';


@Component({
  selector: 'app-lista-profesor',
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
      FormularioProfesorComponent,
    ],
  templateUrl: './lista-profesor.component.html',
  styleUrl: './lista-profesor.component.css'
})
export class ListaProfesorComponent implements OnInit, OnDestroy {
  listaProfesores: Profesor[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  profesor!: Profesor | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioProfesor: ProfesorService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private route: Router,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioProfesor
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Profesor[]) => {
          this.listaProfesores = resp;
        },
      });

    this.servicioProfesor.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedPais) => {
        if (updatedPais) {
          this.servicioProfesor
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Profesor[]) => {
              this.listaProfesores = resp;
            });
        }
      },
    );

    this.servicioProfesor.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroPais) => {
        if (registroPais) {
          this.servicioProfesor
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Profesor[]) => {
              this.listaProfesores = resp;
            });
        }
      },
    );
  }

  registrarProfesor(profesor: ProfesorComando) {
    this.servicioProfesor.Crear(profesor)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Profesor Registrado',
        });

        this.servicioProfesor.notifyRegistro(profesor);
        this.ocultarFormulario();
      },
    })
  }

  actualizarProfesor(profesor: Profesor) {
    this.servicioProfesor.Actualizar(profesor.id,profesor)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Pais Actualizado',
        });

        this.servicioProfesor.notifyUpdate(profesor);

        this.ocultarFormulario();
      },
      })
  }

  eliminarPais(Pais: Profesor) {
    this.servicioProfesor.Eliminar(Pais.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Pais Eliminado',
        });

        this.servicioProfesor.notifyUpdate(Pais);
      },
    });
  }

  mostrarFormulario(Pais?: Profesor) {
    if (Pais) {
      this.profesor = { ...Pais };;
    }

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.profesor = null;
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
    return this.listaProfesores
      ? this.first === this.listaProfesores.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaProfesores ? this.first === 0 : true;
  }
}