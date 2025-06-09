import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../../core/models/actor.model';

@Pipe({
  name: 'buscarActor'
})
export class BuscarActorPipe implements PipeTransform {

  transform(listaActores: Actor[], entradaInput: string): Actor[] | undefined[] {
    entradaInput = entradaInput?.toLowerCase() || '';

    if (!entradaInput) {
      return listaActores;
    }

    return listaActores.filter((item) =>
      this.buscarEnObjeto(item, entradaInput)
    );
  
    }

    private buscarEnObjeto(obj: any, entradaInput: string): boolean {
      // Itera sobre las claves del objeto
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
  
          if (typeof value === 'string' && value.toLowerCase().includes(entradaInput)) {
            return true;
          }
  
          if (typeof value === 'number' && value.toString().includes(entradaInput)) {
            return true;
          }
  
          if (value instanceof Date && value.toISOString().includes(entradaInput)) {
            return true;
          }
  
          if (typeof value === 'object' && value !== null) {
            if (this.buscarEnObjeto(value, entradaInput)) {
              return true;
            }
          }
        }
      }
  
      return false;
    }

}
