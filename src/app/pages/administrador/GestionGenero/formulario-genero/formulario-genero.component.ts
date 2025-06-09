import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ComandoGenero, Genero } from '../../../../core/models/genero.model';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-genero',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css',
})
export class FormularioGeneroComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() genero!: Genero | null;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ComandoGenero>();
  @Output() actualizar = new EventEmitter<Genero>();

  formularioGenero!: FormGroup;
  titulo: string = 'Registrar Genero';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['genero'] && changes['genero'].currentValue) {
      this.titulo = 'Editar Género';
      this.tipo = 'Editar';
      this.precargarFormulario(this.genero!);
    } else {
      this.titulo = 'Registrar Género';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.genero) {
      this.titulo = 'Editar Genero';
      this.tipo = 'Editar';
      this.precargarFormulario(this.genero);
    }
  }

  inicializarFormulario() {
    this.formularioGenero = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  precargarFormulario(genero?: Genero) {
    this.formularioGenero.patchValue({
      id: genero?.id ?? '',
      nombre: genero?.nombre ?? '',
    });
  }

  onSubmit() {
    if (this.formularioGenero.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioGenero);
      return;
    }
  
  
    if (this.genero) {
      const genero: Genero = {
        id: this.genero.id,
        nombre: this.formularioGenero.value.nombre,
      };
      this.actualizar.emit(genero);
    } else {

      const comandoGenero: ComandoGenero = {
        nombre: this.formularioGenero.value.nombre,
      };

      this.registrar.emit(comandoGenero);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioGenero.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioGenero,
      nombreCampo,
    );
  }
}
