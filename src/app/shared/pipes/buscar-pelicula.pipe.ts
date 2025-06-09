import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula.model';

@Pipe({
  name: 'buscarPelicula'
})
export class BuscarPeliculaPipe implements PipeTransform {

  transform(listaPeliculas: Pelicula[], entradaInput: string): Pelicula[] | undefined[] {
    entradaInput = entradaInput?.toLowerCase() || '';

    if (!entradaInput) {
      return listaPeliculas;
    }

    return listaPeliculas.filter((item) =>
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
