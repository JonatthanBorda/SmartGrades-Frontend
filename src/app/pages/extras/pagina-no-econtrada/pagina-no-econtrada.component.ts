import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutenticacionService } from '../../../core/services/autenticacion.service';

@Component({
  selector: 'app-pagina-no-econtrada',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pagina-no-econtrada.component.html',
  styleUrl: './pagina-no-econtrada.component.css'
})
export class PaginaNoEcontradaComponent implements OnInit {
  ruta: string = '/';

  constructor(
    private servicioAutenticacion: AutenticacionService
  ) {
    
  }

  ngOnInit(): void {
    this.servicioAutenticacion.autenticado$.subscribe((logeado: boolean) => {
      if (logeado) {
        this.ruta = '/dashboard';
      }{
        this.ruta = '/';}
    });
  }

}
