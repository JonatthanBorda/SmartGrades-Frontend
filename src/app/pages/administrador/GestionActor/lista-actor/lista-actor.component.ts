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
import { BuscarActorPipe } from '../../../../shared/pipes/buscar-actor.pipe';
import { FormularioActorComponent } from '../formulario-actor/formulario-actor.component';
import { ComandoActor, Actor } from '../../../../core/models/actor.model';
import { ActorService } from '../../../../core/services/actor.service';
import { Pais } from '../../../../core/models/pais.model';
import { PaisService } from '../../../../core/services/pais.service';

@Component({
  selector: 'app-lista-actor',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    PaginatorModule,
    BuscarActorPipe,
    FormsModule,
    FormularioActorComponent,
  ],
  templateUrl: './lista-actor.component.html',
  styleUrl: './lista-actor.component.css'
})
export class ListaActorComponent implements OnInit, OnDestroy {
  listaActors: Actor[] = [];
  listaPaises: Pais[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  Actor!: Actor | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioActor: ActorService,
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
    this.servicioActor
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Actor[]) => {
          this.listaActors = resp;
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

    this.servicioActor.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedActor) => {
        if (updatedActor) {
          this.servicioActor
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Actor[]) => {
              this.listaActors = resp;
            });
        }
      },
    );

    this.servicioActor.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroActor) => {
        if (registroActor) {
          this.servicioActor
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Actor[]) => {
              this.listaActors = resp;
            });
        }
      },
    );
  }

  registrarActor(Actor: ComandoActor) {
    this.servicioActor.Crear(Actor)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Actor Registrado',
        });

        this.servicioActor.notifyRegistro(Actor);
        this.ocultarFormulario();
      },
    })
  }

  actualizarActor(Actor: Actor) {
    this.servicioActor.Actualizar(Actor.id,Actor)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Actor Actualizado',
        });

        this.servicioActor.notifyUpdate(Actor);

        this.ocultarFormulario();
      },
      })
  }

  eliminarActor(Actor: Actor) {
    this.servicioActor.Eliminar(Actor.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Actor Eliminado',
        });

        this.servicioActor.notifyUpdate(Actor);
      },
    });
  }

  mostrarFormulario(Actor?: Actor) {
    if (Actor) {
      this.Actor = { ...Actor };
    }

    console.log(this.Actor);

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.Actor = null;
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
    return this.listaActors
      ? this.first === this.listaActors.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaActors ? this.first === 0 : true;
  }
}
