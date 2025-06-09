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
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormularioEstudianteComponent } from '../formulario-estudiante/formulario-estudiante.component';
import { EstudianteService } from '../../../../core/services/estudiante.service';
import { Estudiante, EstudianteComando } from '../../../../core/models/estudiante.model';
import { ListaPaginada } from '../../../../core/models/listaPaginada.model';
import { consultaFiltrar } from '../../../../core/models/consultaFiltrar.model';


@Component({
  selector: 'app-lista-estudiante',
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
  templateUrl: './lista-estudiante.component.html',
  styleUrl: './lista-estudiante.component.css'
})
export class ListaEstudianteComponent implements OnInit, OnDestroy {
  listaEstudiantes: Estudiante[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  estudiante!: Estudiante | null;

  listaPaginada: ListaPaginada<Estudiante> = {
    items: [],
    page: 1,
    pageSize: 10,
    totalCount: 120
  };

  consulta: consultaFiltrar = {
    nombre: '',
    orderBy: 'Id',
    desc: false,
    page: 1,
    pageSize: 10,
  };

  private busquedaSubject$ = new Subject<string>();
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

    this.cargarConFiltro();

    this.servicioEstudiante.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroPais) => {
        if (registroPais) {
          this.cargarConFiltro();
        }
      },
    );

    // Escuchar cambios en la búsqueda
    this.busquedaSubject$
    .pipe(
      debounceTime(500), // esperar 500ms sin escribir
      distinctUntilChanged(), // si no cambió el texto, no hace nada
      takeUntil(this.unsubscribe$)
    )
    .subscribe(termino => {
      this.consulta.nombre = termino;
      this.consulta.page = 1; // resetea a la primera página cuando cambia la búsqueda
      this.cargarConFiltro();
    });
  }

  cargarConFiltro() {
    this.servicioEstudiante
      .ListaFiltrada(this.consulta)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: ListaPaginada<Estudiante>) => {
          this.listaPaginada = resp;
        },
      });
  }

  onBusqueda(event: any) {
    this.busquedaSubject$.next(event.target.value);
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

        this.servicioEstudiante.notifyRegistro(estudiante);

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

        this.servicioEstudiante.notifyRegistro(estudiante);
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

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  
    const nuevaPagina = (this.first / this.rows) + 1;
    
    if (nuevaPagina === this.consulta.page) {
      return;
    }

    this.consulta.page = nuevaPagina;
    this.consulta.pageSize = event.rows;
  
    this.cargarConFiltro();
  }
}