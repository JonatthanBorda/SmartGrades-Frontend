import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante, EstudianteComando } from '../../../../core/models/estudiante.model';

@Component({
  selector: 'app-formulario-estudiante',
  imports: [
      Dialog,
      ButtonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  templateUrl: './formulario-estudiante.component.html',
  styleUrl: './formulario-estudiante.component.css'
})
export class FormularioEstudianteComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() estudiante!: Estudiante | null;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<EstudianteComando>();
  @Output() actualizar = new EventEmitter<Estudiante>();

  formularioEstudiante!: FormGroup;
  titulo: string = 'Registrar Estudiante';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudiante'] && changes['estudiante'].currentValue) {
      this.titulo = 'Editar Estudiante';
      this.tipo = 'Editar';
      this.precargarFormulario(this.estudiante!);
    } else {
      this.titulo = 'Registrar Estudiante';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.estudiante) {
      this.titulo = 'Editar Estudiante';
      this.tipo = 'Editar';
      this.precargarFormulario(this.estudiante);
    }
  }

  inicializarFormulario() {
    this.formularioEstudiante = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  precargarFormulario(pais?: Estudiante) {
    this.formularioEstudiante.patchValue({
      id: pais?.id ?? '',
      nombre: pais?.nombre ?? '',
    });
  }

  onSubmit() {
    if (this.formularioEstudiante.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioEstudiante);
      return;
    }
  
  
    if (this.estudiante) {
      const estudiante: Estudiante = {
        id: this.estudiante.id,
        nombre: this.formularioEstudiante.value.nombre,
      };
      this.actualizar.emit(estudiante);
    } else {

      const estudianteComando: EstudianteComando = {
        nombre: this.formularioEstudiante.value.nombre,
      };

      this.registrar.emit(estudianteComando);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioEstudiante.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioEstudiante,
      nombreCampo,
    );
  }
}

