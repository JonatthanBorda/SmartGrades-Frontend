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
import { FormularioPaisComponent } from '../formulario-pais/formulario-pais.component';
import { ComandoPais, Pais } from '../../../../core/models/pais.model';
import { BuscarPaisPipe } from '../../../../shared/pipes/buscar-pais.pipe';
import { PaisService } from '../../../../core/services/pais.service';


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
      BuscarPaisPipe,
      FormsModule,
      FormularioPaisComponent,
    ],
  templateUrl: './lista-pais.component.html',
  styleUrl: './lista-pais.component.css'
})
export class ListaPaisComponent implements OnInit, OnDestroy {
  listaPaises: Pais[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  Pais!: Pais | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioPais: PaisService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private route: Router,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioPais
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Pais[]) => {
          this.listaPaises = resp;
        },
      });

    this.servicioPais.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedPais) => {
        if (updatedPais) {
          this.servicioPais
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Pais[]) => {
              this.listaPaises = resp;
            });
        }
      },
    );

    this.servicioPais.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroPais) => {
        if (registroPais) {
          this.servicioPais
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Pais[]) => {
              this.listaPaises = resp;
            });
        }
      },
    );
  }

  registrarPais(pais: ComandoPais) {
    this.servicioPais.Crear(pais)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Pais Registrado',
        });

        this.servicioPais.notifyRegistro(pais);
        this.ocultarFormulario();
      },
    })
  }

  actualizarPais(Pais: Pais) {
    this.servicioPais.Actualizar(Pais.id,Pais)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Pais Actualizado',
        });

        this.servicioPais.notifyUpdate(Pais);

        this.ocultarFormulario();
      },
      })
  }

  eliminarPais(Pais: Pais) {
    this.servicioPais.Eliminar(Pais.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Pais Eliminado',
        });

        this.servicioPais.notifyUpdate(Pais);
      },
    });
  }

  mostrarFormulario(Pais?: Pais) {
    if (Pais) {
      this.Pais = { ...Pais };;
    }

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.Pais = null;
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
    return this.listaPaises
      ? this.first === this.listaPaises.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaPaises ? this.first === 0 : true;
  }
}