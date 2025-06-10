import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProblemDetails } from '../models/problemDetails.model';

export const autenticacionInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  // Evitar interceptar solicitudes para refrescar el token
  if (req.url.includes('refrescar-token')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Manejo de otros errores con ProblemDetails
      if (error.error && error.error.title) {
        const problemDetails: ProblemDetails = error.error;
        const errorMessages = [];

        // Iterar sobre el mapa de errores si está disponible
        if (problemDetails.errors) {
          for (const [key, messages] of Object.entries(problemDetails.errors)) {
            errorMessages.push(`${messages.join(', ')}`);
          }
        } else {
          // Usar el título si no hay errores específicos
          errorMessages.push(problemDetails.title);
        }

        // Mostrar los errores en el servicio de mensajes
        messageService.add({
          severity: 'error',
          summary: `Error`,
          detail: errorMessages.join('\n'),
        });
      } else {
        // Manejo genérico para errores no estándar
        const errorMessage = error.status === 0
          ? 'Error de conexión con el servidor.'
          : `Error ${error.status}: ${error.message}`;
        
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }

      return EMPTY; // Finalizar la cadena sin errores
    })
  );
};
