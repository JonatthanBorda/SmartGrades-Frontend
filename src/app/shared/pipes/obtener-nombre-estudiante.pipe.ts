import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EstudianteService } from '../../core/services/estudiante.service';

@Pipe({
  name: 'obtenerNombreEstudiante',
  pure: false
})
export class ObtenerNombreEstudiantePipe implements PipeTransform {

  constructor(private estudianteService: EstudianteService) {}

  transform(id: number): string {
    if (!id) return "No encontrado";


    this.estudianteService.ListarPorId(id).subscribe({
      next: (estudiante) => {
        const nombre = estudiante?.name || '';
        return nombre;
      },
      error: () => of('No encontrado')
    });

    return "No encontrado";
  }
}