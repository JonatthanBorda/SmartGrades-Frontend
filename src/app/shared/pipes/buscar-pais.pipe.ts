import { Pipe, PipeTransform } from '@angular/core';
import { Pais } from '../../core/models/pais.model';

@Pipe({
  name: 'buscarPais'
})
export class BuscarPaisPipe implements PipeTransform {

  transform(listaPais: Pais[], entradaInput: string): Pais[] | undefined[] {
      entradaInput = entradaInput ? entradaInput.toLowerCase() : ''
      
      return entradaInput ? listaPais.filter(valor => valor.nombre.toLowerCase()
      .includes(entradaInput))  : listaPais
  
    }

}
