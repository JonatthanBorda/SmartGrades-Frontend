import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormularioUtilService } from '../../../../core/services/formulario-util.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { Pais } from '../../../../core/models/pais.model';
import { ComandoPelicula, Pelicula } from '../../../../core/models/pelicula.model';
import { Genero } from '../../../../core/models/genero.model';
import { Actor } from '../../../../core/models/actor.model';
import { Director } from '../../../../core/models/director.model';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-formulario-pelicula',
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
  templateUrl: './formulario-pelicula.component.html',
  styleUrl: './formulario-pelicula.component.css'
})
export class FormularioPeliculaComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() pelicula!: Pelicula | null;
  @Input() paises: Pais[] = [];
  @Input() generos: Genero[] = [];
  @Input() actores: Actor[] = [];
  @Input() directores: Director[] = [];

  @Output() cerrar = new EventEmitter<boolean>();
  @Output() registrar = new EventEmitter<ComandoPelicula>();
  @Output() actualizar = new EventEmitter<Pelicula>();

  formularioPelicula!: FormGroup;
  titulo: string = 'Registrar Pelicula';
  tipo: string = 'Registrar';

  constructor(
    private servicioFormulario: FormularioUtilService,
    private fb: FormBuilder,
  ) {}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pelicula'] && changes['pelicula'].currentValue) {
      this.titulo = 'Editar Pelicula';
      this.tipo = 'Editar';
      this.precargarFormulario(this.pelicula!);
    } else {
      this.titulo = 'Registrar Pelicula';
      this.tipo = 'Registrar';
    }
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.pelicula) {
      this.titulo = 'Editar Pelicula';
      this.tipo = 'Editar';
      this.precargarFormulario(this.pelicula);
    }
  }

  inicializarFormulario() {
    this.formularioPelicula = this.fb.group({
      id: [''],
      pais: ['', Validators.required],
      director: ['', Validators.required],
      titulo: ['', Validators.required],
      resena: ['', Validators.required],
      imagenDePortada: ['', Validators.required],
      CodigoDeTrailerEnYoutube: ['', Validators.required],
      generos: [[], Validators.required],
      actores: [[], Validators.required],
    });
  }

  precargarFormulario(Pelicula?: Pelicula) {
    if (!this.paises.length || !this.directores.length || !this.actores.length) {
      setTimeout(() => this.precargarFormulario(Pelicula), 100);
      return;
    }
  
    const paisSeleccionado = this.paises.find(p => p.id === Pelicula?.pais?.id);
    const directorSeleccionado = this.directores.find(d => d.id === Pelicula?.director?.id);
    const actoresSeleccionados = this.actores.filter(a => Pelicula?.actores.some(pa => pa.id === a.id));
  
  
    this.formularioPelicula.patchValue({
      id: Pelicula?.id ?? '',
      pais: paisSeleccionado ?? null,
      director: directorSeleccionado ?? null,
      titulo: Pelicula?.titulo ?? '',
      resena: Pelicula?.resena ?? '',
      imagenDePortada: Pelicula?.imagenDePortada ?? '',
      CodigoDeTrailerEnYoutube: Pelicula?.codigoDeTrailerEnYoutube ?? '',
      generos: Pelicula?.generos.map(g => g) ?? [],
      actores: actoresSeleccionados ?? []
    });
  }
  

  onSubmit() {
    if (this.formularioPelicula.invalid) {
      this.servicioFormulario.verificarFormulario(this.formularioPelicula);
      return;
    }

    const formValues = this.formularioPelicula.value;
    
    if (this.pelicula) {
      const peliculaActualizada: Pelicula = {
        id: formValues.id,
        director: formValues.director ,
        pais: formValues.pais,
        titulo: formValues.titulo,
        resena: formValues.resena,
        imagenDePortada: formValues.imagenDePortada,
        codigoDeTrailerEnYoutube: formValues.CodigoDeTrailerEnYoutube,
        generos: formValues.generos,
        actores: formValues.actores,
      };

      console.log('Pelicula actualizada:', peliculaActualizada);
      
      this.actualizar.emit(peliculaActualizada);
    } else {
      const nuevaPelicula: ComandoPelicula = {
        pais: formValues.pais,
        director: formValues.director,
        titulo: formValues.titulo,
        resena: formValues.resena,
        imagenDePortada: formValues.imagenDePortada,
        codigoDeTrailerEnYoutube: formValues.CodigoDeTrailerEnYoutube,
        generos: formValues.generos,
        actores: formValues.actores,
      };
      
      console.log('Nueva Pelicula:', nuevaPelicula);

      this.registrar.emit(nuevaPelicula);
    }
  }
  

  cerrarDialog() {
    this.cerrar.emit(false);
    this.formularioPelicula.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    return this.servicioFormulario.campoInvalido(
      this.formularioPelicula,
      nombreCampo,
    );
  }
}
