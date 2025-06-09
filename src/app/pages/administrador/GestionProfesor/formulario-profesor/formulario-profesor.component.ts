import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profesor, ProfesorComando } from '../../../../core/models/profesor.model';

@Component({
  selector: 'app-formulario-profesor',
  imports: [
      Dialog,
      ButtonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  templateUrl: './formulario-profesor.component.html',
  styleUrl: './formulario-profesor.component.css'
})
export class FormularioProfesorComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() profesor!: Profesor | null;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ProfesorComando>();
  @Output() actualizar = new EventEmitter<Profesor>();

  formularioProfesor!: FormGroup;
  titulo: string = 'Registrar Profesor';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profesor'] && changes['profesor'].currentValue) {
      this.titulo = 'Editar Profesor';
      this.tipo = 'Editar';
      this.precargarFormulario(this.profesor!);
    } else {
      this.titulo = 'Registrar Profesor';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.profesor) {
      this.titulo = 'Editar Profesor';
      this.tipo = 'Editar';
      this.precargarFormulario(this.profesor);
    }
  }

  inicializarFormulario() {
    this.formularioProfesor = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  precargarFormulario(pais?: Profesor) {
    this.formularioProfesor.patchValue({
      id: pais?.id ?? '',
      nombre: pais?.name ?? '',
    });
  }

  onSubmit() {
    if (this.formularioProfesor.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioProfesor);
      return;
    }
  
  
    if (this.profesor) {
      const profesor: Profesor = {
        id: this.profesor.id,
        name: this.formularioProfesor.value.nombre,
      };
      this.actualizar.emit(profesor);
    } else {

      const profesorComando: ProfesorComando = {
        name: this.formularioProfesor.value.nombre,
      };

      this.registrar.emit(profesorComando);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioProfesor.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioProfesor,
      nombreCampo,
    );
  }
}

