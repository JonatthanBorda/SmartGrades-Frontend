import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  ) {
    
  }

  ngOnInit(): void {
    this.ruta = '/';
  }

}
