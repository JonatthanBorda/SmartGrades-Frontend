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
import { BuscarUsuarioPipe } from '../../../../shared/pipes/buscar-usuario.pipe';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { ComandoUsuario, Usuario } from '../../../../core/models/usuario.model';
import { UsuarioService } from '../../../../core/services/usuario.service';


@Component({
  selector: 'app-lista-usuario',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    PaginatorModule,
    BuscarUsuarioPipe,
    FormsModule,
    FormularioUsuarioComponent,
  ],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent  implements OnInit, OnDestroy {
  listaUsuarios: Usuario[] = [];
  busqueda: string = '';
  first = 0;
  rows = 10;
  registrar: string = '';

  visibleFormulario: boolean = false;
  Usuario!: Usuario | null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private servicioUsuario: UsuarioService,
    private cdr: ChangeDetectorRef,
    private servicioMensaje: MessageService,
    private route: Router,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.servicioUsuario
      .ListarTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: Usuario[]) => {
          this.listaUsuarios = resp;
        },
      });

    this.servicioUsuario.Updated$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (updatedUsuario) => {
        if (updatedUsuario) {
          this.servicioUsuario
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Usuario[]) => {
              this.listaUsuarios = resp;
            });
        }
      },
    );

    this.servicioUsuario.Registro$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (registroUsuario) => {
        if (registroUsuario) {
          this.servicioUsuario
            .ListarTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((resp: Usuario[]) => {
              this.listaUsuarios = resp;
            });
        }
      },
    );
  }

  registrarUsuario(Usuario: ComandoUsuario) {
    this.servicioUsuario.Crear(Usuario)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Usuario Registrado',
        });

        this.servicioUsuario.notifyRegistro(Usuario);
        this.ocultarFormulario();
      },
    })
  }

  actualizarUsuario(Usuario: Usuario) {
    this.servicioUsuario.Actualizar(Usuario.id,Usuario)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
        severity: 'success',
          summary: 'Actualizado',
          detail: 'Usuario Actualizado',
        });

        this.servicioUsuario.notifyUpdate(Usuario);

        this.ocultarFormulario();
      },
      })
  }

  eliminarUsuario(Usuario: Usuario) {
    this.servicioUsuario.Eliminar(Usuario.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.servicioMensaje.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Usuario Eliminado',
        });

        this.servicioUsuario.notifyUpdate(Usuario);
      },
    });
  }

  mostrarFormulario(Usuario?: Usuario) {
    if (Usuario) {
      this.Usuario = { ...Usuario };
    }

    console.log(this.Usuario);

    this.visibleFormulario = !this.visibleFormulario;

  }

  ocultarFormulario() {
    this.visibleFormulario = false
    this.Usuario = null;
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
    return this.listaUsuarios
      ? this.first === this.listaUsuarios.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaUsuarios ? this.first === 0 : true;
  }
}
