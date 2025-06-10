import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CargandoService } from '../services/cargando.service';
import { finalize } from 'rxjs';

export const cargandoInterceptor: HttpInterceptorFn = (req, next) => {
  const cargando = inject(CargandoService);
  cargando.mostrar();

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        cargando.ocultar();
        
      }, 500); // 500ms de retraso
    })
  );
};