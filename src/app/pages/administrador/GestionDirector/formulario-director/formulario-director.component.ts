import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { Pais } from '../../../../core/models/pais.model';
import { ComandoDirector, Director } from '../../../../core/models/director.model';


@Component({
  selector: 'app-formulario-director',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule
  ],
  templateUrl: './formulario-director.component.html',
  styleUrl: './formulario-director.component.css'
})
export class FormularioDirectorComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() director!: Director | null;
  @Input() paises: Pais[] = [];

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ComandoDirector>();
  @Output() actualizar = new EventEmitter<Director>();

  formularioDirector!: FormGroup;
  titulo: string = 'Registrar Director';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['director'] && changes['director'].currentValue) {
      this.titulo = 'Editar Director';
      this.tipo = 'Editar';
      this.precargarFormulario(this.director!);
    } else {
      this.titulo = 'Registrar Director';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.director) {
      this.titulo = 'Editar Director';
      this.tipo = 'Editar';
      this.precargarFormulario(this.director);
    }
  }

  inicializarFormulario() {
    this.formularioDirector = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }

  precargarFormulario(Director?: Director) {
    this.formularioDirector.patchValue({
      id: Director?.id ?? '',
      nombre: Director?.nombre ?? '',
      apellido: Director?.apellido ?? '',
      pais: this.paises.find(pais => pais.id === Director?.pais?.id)!
    });
  }

  onSubmit() {
    if (this.formularioDirector.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioDirector);
      return;
    }
  
    
    if (this.director) {
      const director: Director = {
        id: this.director.id,
        nombre: this.formularioDirector.value.nombre,
        apellido: this.formularioDirector.value.apellido,
        pais: {
          id: this.formularioDirector.value.pais.id,
          nombre: this.formularioDirector.value.nombre,
        },
      };
      
      this.actualizar.emit(director);
    } else {

      const comandoDirector: ComandoDirector = {
        nombre: this.formularioDirector.value.nombre,
        apellido: this.formularioDirector.value.apellido,
        pais: {
          id: this.formularioDirector.value.pais.id,
        },  
        
      };
      console.log(comandoDirector);
      this.registrar.emit(comandoDirector);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioDirector.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioDirector,
      nombreCampo,
    );
  }
}

