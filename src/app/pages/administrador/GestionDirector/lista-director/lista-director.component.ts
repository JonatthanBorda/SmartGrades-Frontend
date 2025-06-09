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
import { BuscarDirectorPipe } from '../../../../shared/pipes/buscar-director.pipe';
import { FormularioDirectorComponent } from '../formulario-director/formulario-director.component';
import { ComandoDirector, Director } from '../../../../core/models/director.model';
import { DirectorService } from '../../../../core/services/director.service';
import { Pais } from '../../../../core/models/pais.model';
import { PaisService } from '../../../../core/services/pais.service';

@Component({
  selector: 'app-lista-director',
  imports: [
      TableModule,
      CommonModule,
      ButtonModule,
      RouterModule,
      InputIconModule,
      IconFieldModule,
      InputTextModule,
      PaginatorModule,
      BuscarDirectorPipe,
      FormsModule,
      FormularioDirectorComponent,
    ],
  templateUrl: './lista-director.component.html',
  styleUrl: './lista-director.component.css'
})
export class ListaDirectorComponent implements OnInit, OnDestroy {
  listaDirectors: Director[] = [];
  listaPaises: Pais[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  Director!: Director | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioDirector: DirectorService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private servicioPais: PaisService,
    private route: Router,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioDirector
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Director[]) => {
          this.listaDirectors = resp;
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

    this.servicioDirector.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedDirector) => {
        if (updatedDirector) {
          this.servicioDirector
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Director[]) => {
              this.listaDirectors = resp;
            });
        }
      },
    );

    this.servicioDirector.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroDirector) => {
        if (registroDirector) {
          this.servicioDirector
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Director[]) => {
              this.listaDirectors = resp;
            });
        }
      },
    );
  }

  registrarDirector(Director: ComandoDirector) {
    this.servicioDirector.Crear(Director)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Director Registrado',
        });

        this.servicioDirector.notifyRegistro(Director);
        this.ocultarFormulario();
      },
    })
  }

  actualizarDirector(Director: Director) {
    this.servicioDirector.Actualizar(Director.id,Director)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Director Actualizado',
        });

        this.servicioDirector.notifyUpdate(Director);

        this.ocultarFormulario();
      },
      })
  }

  eliminarDirector(Director: Director) {
    this.servicioDirector.Eliminar(Director.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Director Eliminado',
        });

        this.servicioDirector.notifyUpdate(Director);
      },
    });
  }

  mostrarFormulario(Director?: Director) {
    if (Director) {
      this.Director = { ...Director };
    }

    console.log(this.Director);

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.Director = null;
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
    return this.listaDirectors
      ? this.first === this.listaDirectors.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaDirectors ? this.first === 0 : true;
  }
}
