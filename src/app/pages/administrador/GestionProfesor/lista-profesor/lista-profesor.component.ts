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
import { FormularioProfesorComponent } from '../formulario-profesor/formulario-profesor.component';
import { Profesor, ProfesorComando } from '../../../../core/models/profesor.model';
import { ProfesorService } from '../../../../core/services/profesor.service';
import { ListaPaginada } from '../../../../core/models/listaPaginada.model';
import { consultaFiltrar } from '../../../../core/models/consultaFiltrar.model';


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

  listaPaginada: ListaPaginada<Profesor> = {
      items: [],
      page: 1,
      pageSize: 10,
      totalCount: 120
    };
  
    consulta: consultaFiltrar = {
      name: '',
      orderBy: 'Id',
      desc: false,
      page: 1,
      pageSize: 10,
    };

  private busquedaSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioProfesor: ProfesorService,
    private servicioMensaje: MessageService,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.cargarConFiltro();

    this.servicioProfesor.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
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
          this.consulta.name = termino;
          this.consulta.page = 1; // resetea a la primera página cuando cambia la búsqueda
          this.cargarConFiltro();
    });
  }

  cargarConFiltro() {
      this.servicioProfesor
        .ListaFiltrada(this.consulta)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (resp: ListaPaginada<Profesor>) => {
            this.listaPaginada = resp;
          },
        });
    }

  onBusqueda(event: any) {
    this.busquedaSubject$.next(event.target.value);
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
          detail: 'Profesor Actualizado',
        });

        this.servicioProfesor.notifyRegistro(profesor);

        this.ocultarFormulario();
      },
    })
  }

  eliminarProfesor(profesor: Profesor) {
    this.servicioProfesor.Eliminar(profesor.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Profesor Eliminado',
        });

        this.servicioProfesor.notifyRegistro(profesor);
      },
    });
  }

  mostrarFormulario(profesor?: Profesor) {
    if (profesor) {
      this.profesor = { ...profesor };;
    }

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.profesor = null;
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

  sortChange(event: { field: string, order: number }) {
    this.consulta.orderBy = event.field;
    // order: 1 = ascendente, -1 = descendente, 0 = sin orden
    this.consulta.desc = event.order === -1;
    this.consulta.page = 1; // Reinicia a la primera página al ordenar

    this.cargarConFiltro();
  }

  onSort(field: string) {
    if (this.consulta.orderBy === field) {
      this.consulta.desc = !this.consulta.desc;
    } else {
      this.consulta.orderBy = field;
      this.consulta.desc = false; // Por defecto ascendente
    }
    this.consulta.page = 1;
    this.cargarConFiltro();
  }
}