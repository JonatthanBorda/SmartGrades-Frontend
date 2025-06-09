import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { map, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export const autenticadoGuard: CanActivateFn = (route, state) => {
  const servicioAutenticacion = inject(AutenticacionService);
  const router = inject(Router);

  // Verificar si el usuario tiene un token
  const tieneToken = !!servicioAutenticacion.token;

  if (!tieneToken) {
    // Si no tiene token, redirigir al login
    return router.createUrlTree(['/autenticacion/iniciar-sesion']);
  } 

  // Si tiene token, verificar si ya tenemos los datos del usuario
  return servicioAutenticacion.datosAutenticado$.pipe(
    switchMap((datosUsuario) => {
      if (!datosUsuario || Object.keys(datosUsuario).length === 0) {
        return servicioAutenticacion.DatosUsuario().pipe(
          tap((datos) => servicioAutenticacion.datosAutenticado = datos), // Guardar los datos
          map(() => true), // Permitir el acceso
          catchError(() => of(router.createUrlTree(['/autenticacion/iniciar-sesion'])))
        );
      } else {
        return of(true); // Ya tenemos los datos, permitir el acceso
      }
    })
  );
};

