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
import { BuscarGeneroPipe } from '../../../../shared/pipes/buscar-genero.pipe';
import { Subject, takeUntil } from 'rxjs';
import { ComandoGenero, Genero } from '../../../../core/models/genero.model';
import { GeneroService } from '../../../../core/services/genero.service';
import { MessageService } from 'primeng/api';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';

@Component({
  selector: 'app-lista-genero',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    PaginatorModule,
    BuscarGeneroPipe,
    FormsModule,
    FormularioGeneroComponent,
  ],
  templateUrl: './lista-genero.component.html',
  styleUrl: './lista-genero.component.css',
})
export class ListaGeneroComponent implements OnInit, OnDestroy {
  listaGeneros: Genero[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  genero!: Genero | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioGenero: GeneroService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private route: Router,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioGenero
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Genero[]) => {
          this.listaGeneros = resp;
        },
      });

    this.servicioGenero.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedGenero) => {
        if (updatedGenero) {
          this.servicioGenero
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Genero[]) => {
              this.listaGeneros = resp;
            });
        }
      },
    );

    this.servicioGenero.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroGenero) => {
        if (registroGenero) {
          this.servicioGenero
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Genero[]) => {
              this.listaGeneros = resp;
            });
        }
      },
    );
  }

  registrarGenero(genero: ComandoGenero) {
    this.servicioGenero.Crear(genero)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Genero Registrado',
        });

        this.servicioGenero.notifyRegistro(genero);
        this.ocultarFormulario();
      },
    })
  }

  actualizarGenero(genero: Genero) {
    this.servicioGenero.Actualizar(genero.id,genero)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Genero Actualizado',
        });

        this.servicioGenero.notifyUpdate(genero);

        this.ocultarFormulario();
      },
      })
  }

  eliminarGenero(genero: Genero) {
    this.servicioGenero.Eliminar(genero.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Genero Eliminado',
        });

        this.servicioGenero.notifyUpdate(genero);
      },
    });
  }

  mostrarFormulario(genero?: Genero) {
    if (genero) {
      this.genero = { ...genero };;
    }

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.genero = null;
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
    return this.listaGeneros
      ? this.first === this.listaGeneros.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaGeneros ? this.first === 0 : true;
  }
}
