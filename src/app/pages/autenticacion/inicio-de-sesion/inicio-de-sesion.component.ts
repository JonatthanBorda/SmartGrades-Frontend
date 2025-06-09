import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InicioSesion } from '../../../core/models/inicioSesion.model';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormularioUtilService } from '../../../core/services/formulario-util.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-inicio-de-sesion',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './inicio-de-sesion.component.html',
  styleUrl: './inicio-de-sesion.component.css'
})
export class InicioDeSesionComponent implements OnInit, OnDestroy {
  formulario!: FormGroup
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private servicioAutenticacion: AutenticacionService,
    private servicioMensaje: MessageService,
    private servicioFormulario: FormularioUtilService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nombreDeUsuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  } 

  onSubmit(): void {
    if(this.formulario.invalid){
      this.servicioFormulario.verificarFormulario(this.formulario);
      return;
    }

    const datosFormulario: InicioSesion = this.formulario.value as InicioSesion;

    this.servicioAutenticacion.IniciarSesion(datosFormulario).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {

        this.router.navigate(['/dashboard'])
        this.servicioMensaje.add({ severity: 'success', summary: 'Exito', detail: 'Bienvenido' });
        
      }
    });

      
  }

}
