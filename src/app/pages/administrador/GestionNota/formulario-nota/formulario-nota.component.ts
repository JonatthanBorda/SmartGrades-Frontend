import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { Nota, NotaComando } from '../../../../core/models/nota.model';
import { Profesor } from '../../../../core/models/profesor.model';
import { Estudiante } from '../../../../core/models/estudiante.model';

@Component({
  selector: 'app-formulario-nota',
  imports: [
      Dialog,
      ButtonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      SelectModule,
      MultiSelectModule
    ],
  templateUrl: './formulario-nota.component.html',
  styleUrl: './formulario-nota.component.css'
})
export class FormularioNotaComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() nota!: Nota | null;
  @Input() profesores: Profesor[] = [];
  @Input() estudiantes: Estudiante[] = [];

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<NotaComando>();
  @Output() actualizar = new EventEmitter<Nota>();

  formularioNota!: FormGroup;
  titulo: string = 'Registrar Nota';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nota'] && changes['nota'].currentValue) {
      this.titulo = 'Editar Nota';
      this.tipo = 'Editar';
      this.precargarFormulario(this.nota!);
    } else {
      this.titulo = 'Registrar Nota';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.nota) {
      this.titulo = 'Editar Nota';
      this.tipo = 'Editar';
      this.precargarFormulario(this.nota);
    }
  }

  inicializarFormulario() {
    this.formularioNota = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      profesor: ['', Validators.required],
      estudiante: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  precargarFormulario(nota?: Nota) {
    if (!this.profesores.length || !this.estudiantes.length) {
      setTimeout(() => this.precargarFormulario(nota), 100);
      return;
    }
  
    const profesorSeleccionado = this.profesores.find(p => p.id === nota?.idProfesor);
    const estudianteSeleccionado = this.estudiantes.find(d => d.id === nota?.idProfesor);

    this.formularioNota.patchValue({
      id: nota?.id ?? '',
      nombre: nota?.nombre ?? '',
      pais: profesorSeleccionado ?? null,
      director: estudianteSeleccionado ?? null,
      valor: nota?.valor ?? ''
    });
  }
  

  onSubmit() {
    if (this.formularioNota.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioNota);
      return;
    }

    const formValues = this.formularioNota.value;
    
    if (this.nota) {
      const notaActualizada: Nota = {
        id: formValues.id,
        nombre: formValues.nombre,
        idProfesor: formValues.profesor.id ?? '',
        idEstudiante: formValues.estudiante.id ?? '',
        valor: formValues.valor
      };

      this.actualizar.emit(notaActualizada);
    } else {
      const nuevaNota: NotaComando = {
        nombre: formValues.nombre,
        idProfesor: formValues.profesor.id ?? '',
        idEstudiante: formValues.estudiante.id ?? '',
        valor: formValues.valor
      };
      
      this.registrar.emit(nuevaNota);
    }
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioNota.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioNota,
      nombreCampo,
    );
  }
}
