import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CargandoService } from '../services/cargando.service';
import { finalize } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

export const cargandoInterceptor: HttpInterceptorFn = (req, next) => {
  const cargando = inject(CargandoService);
  const servicioAutenticacion = inject(AutenticacionService);

  if (servicioAutenticacion.token) {
    cargando.mostrar();
  }else {
    cargando.mostrarInvitado();
  }

  // Mostrar la solicitud en la consola
  //console.log('Solicitud HTTP:', req.url);

  cargando.mostrar();

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        if (servicioAutenticacion.token) {
          cargando.ocultar();
          cargando.ocultarInvitado();
        }else {
          cargando.ocultarInvitado();
        }
      }, 500); // 500ms de retraso
    })
  );
};