import { Pipe, PipeTransform } from '@angular/core';
import { Genero } from '../../core/models/genero.model';

@Pipe({
  name: 'buscarGenero'
})
export class BuscarGeneroPipe implements PipeTransform {

  transform(listaGeneros: Genero[], entradaInput: string): Genero[] | undefined[] {
    entradaInput = entradaInput ? entradaInput.toLowerCase() : ''
    
    return entradaInput ? listaGeneros.filter(valor => valor.nombre.toLowerCase()
    .includes(entradaInput))  : listaGeneros

  }

}
