import { inject } from '@angular/core';
import { CanActivateFn, CanMatch, CanMatchFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

export const noAutenticadoGuard: CanMatchFn = (route, state) => {
  const servicioAutenticacion = inject(AutenticacionService);
  const router = inject(Router);

  // Si el usuario está autenticado, permitir el acceso.
  if (servicioAutenticacion.getTokenUsuario()) {
    return router.createUrlTree(['/dashboard']);
    //return false;
  } 

  return true;
};
