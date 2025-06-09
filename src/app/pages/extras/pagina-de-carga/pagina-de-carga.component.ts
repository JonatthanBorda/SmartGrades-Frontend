import { Component, OnInit, WritableSignal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CargandoService } from '../../../core/services/cargando.service';

@Component({
  selector: 'app-pagina-de-carga',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './pagina-de-carga.component.html',
  styleUrl: './pagina-de-carga.component.css'
})
export class PaginaDeCargaComponent implements OnInit {

  cargando!: WritableSignal<boolean>;
  cargandoInvitado!: WritableSignal<boolean>;

  constructor(private cargandoService: CargandoService) { }

  ngOnInit(): void {
    this.cargando = this.cargandoService.cargando;
    this.cargandoInvitado = this.cargandoService.cargandoInvitado;
  }
}
