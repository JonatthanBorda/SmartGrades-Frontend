import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComandoPais, Pais } from '../../../../core/models/pais.model';

@Component({
  selector: 'app-formulario-pais',
  imports: [
      Dialog,
      ButtonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  templateUrl: './formulario-pais.component.html',
  styleUrl: './formulario-pais.component.css'
})
export class FormularioPaisComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() pais!: Pais | null;

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ComandoPais>();
  @Output() actualizar = new EventEmitter<Pais>();

  formularioPais!: FormGroup;
  titulo: string = 'Registrar Pais';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pais'] && changes['pais'].currentValue) {
      this.titulo = 'Editar Pais';
      this.tipo = 'Editar';
      this.precargarFormulario(this.pais!);
    } else {
      this.titulo = 'Registrar Pais';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.pais) {
      this.titulo = 'Editar Pais';
      this.tipo = 'Editar';
      this.precargarFormulario(this.pais);
    }
  }

  inicializarFormulario() {
    this.formularioPais = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  precargarFormulario(pais?: Pais) {
    this.formularioPais.patchValue({
      id: pais?.id ?? '',
      nombre: pais?.nombre ?? '',
    });
  }

  onSubmit() {
    if (this.formularioPais.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioPais);
      return;
    }
  
  
    if (this.pais) {
      const Pais: Pais = {
        id: this.pais.id,
        nombre: this.formularioPais.value.nombre,
      };
      this.actualizar.emit(Pais);
    } else {

      const comandoPais: ComandoPais = {
        nombre: this.formularioPais.value.nombre,
      };

      this.registrar.emit(comandoPais);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioPais.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioPais,
      nombreCampo,
    );
  }
}

