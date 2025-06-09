import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComandoActor, Actor } from '../../../../core/models/actor.model';
import { SelectModule } from 'primeng/select';
import { Pais } from '../../../../core/models/pais.model';

@Component({
  selector: 'app-formulario-actor',
  imports: [
      Dialog,
      ButtonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      SelectModule
    ],
  templateUrl: './formulario-actor.component.html',
  styleUrl: './formulario-actor.component.css'
})
export class FormularioActorComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() actor!: Actor | null;
  @Input() paises: Pais[] = [];

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ComandoActor>();
  @Output() actualizar = new EventEmitter<Actor>();

  formularioActor!: FormGroup;
  titulo: string = 'Registrar Actor';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actor'] && changes['actor'].currentValue) {
      this.titulo = 'Editar Actor';
      this.tipo = 'Editar';
      this.precargarFormulario(this.actor!);
    } else {
      this.titulo = 'Registrar Actor';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.actor) {
      this.titulo = 'Editar Actor';
      this.tipo = 'Editar';
      this.precargarFormulario(this.actor);
    }
  }

  inicializarFormulario() {
    this.formularioActor = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }

  precargarFormulario(Actor?: Actor) {
    this.formularioActor.patchValue({
      id: Actor?.id ?? '',
      nombre: Actor?.nombre ?? '',
      apellido: Actor?.apellido ?? '',
      pais: {
        id: Actor?.pais?.id ?? '',
        nombre: Actor?.pais?.nombre ?? '',
      },
    });
  }

  onSubmit() {
    if (this.formularioActor.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioActor);
      return;
    }
  
    
    if (this.actor) {
      const Actor: Actor = {
        id: this.actor.id,
        nombre: this.formularioActor.value.nombre,
        apellido: this.formularioActor.value.apellido,
        pais: {
          id: this.formularioActor.value.pais.id,
          nombre: this.formularioActor.value.nombre,
        },
      };
      console.log(Actor);
      this.actualizar.emit(Actor);
    } else {

      const comandoActor: ComandoActor = {
        nombre: this.formularioActor.value.nombre,
        apellido: this.formularioActor.value.apellido,
        pais: {
          id: this.formularioActor.value.pais.id,
        },  
        
      };
      console.log(comandoActor);
      this.registrar.emit(comandoActor);
    }
  
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioActor.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioActor,
      nombreCampo,
    );
  }
}

