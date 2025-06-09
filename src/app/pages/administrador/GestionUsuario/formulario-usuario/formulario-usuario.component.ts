import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComandoUsuario, Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-formulario-usuario',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent  implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() usuario!: Usuario | null;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ComandoUsuario>();
  @Output() actualizar = new EventEmitter<Usuario>();

  formularioUsuario!: FormGroup;
  titulo: string = 'Registrar Usuario';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      this.titulo = 'Editar Usuario';
      this.tipo = 'Editar';
      this.precargarFormulario(this.usuario!);
    } else {
      this.titulo = 'Registrar Usuario';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.usuario) {
      this.titulo = 'Editar Usuario';
      this.tipo = 'Editar';
      this.precargarFormulario(this.usuario);
    }
  }

  inicializarFormulario() {
    this.formularioUsuario = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreDeUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  precargarFormulario(Usuario?: Usuario) {
    this.formularioUsuario.patchValue({
      id: Usuario?.id ?? '',
      nombre: Usuario?.nombre ?? '',
      apellido: Usuario?.apellido ?? '',
      nombreDeUsuario: Usuario?.nombreDeUsuario ?? ''
    });
  }

  onSubmit() {
    if (this.formularioUsuario.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioUsuario);
      return;
    }
  
  
    if (this.usuario) {
      const usuario: Usuario = {
        id: this.usuario.id,
        nombre: this.formularioUsuario.value.nombre,
        apellido: this.usuario.apellido,
        nombreDeUsuario: this.usuario.nombreDeUsuario,
        contrasena: this.usuario.contrasena
      };
      this.actualizar.emit(usuario);
    } else {

      const comandoUsuario: ComandoUsuario = {
        nombre: this.formularioUsuario.value.nombre,
        apellido: this.formularioUsuario.value.apellido,
        nombreDeUsuario: this.formularioUsuario.value.nombreDeUsuario,
        contrasena: this.formularioUsuario.value.contrasena,
      };

      this.registrar.emit(comandoUsuario);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioUsuario.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioUsuario,
      nombreCampo,
    );
  }
}

