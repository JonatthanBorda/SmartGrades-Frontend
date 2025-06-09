import { ChangeDetectorRef, Component, OnInit, WritableSignal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { CargandoService } from '../../../core/services/cargando.service';
import { PaginaDeCargaComponent } from "../../extras/pagina-de-carga/pagina-de-carga.component";
import { MenuLateralAdministradorComponent } from '../../../shared/components/menu-lateral-administrador/menu-lateral-administrador.component';
import { EncabezadoAdministradorComponent } from '../../../shared/components/encabezado-administrador/encabezado-administrador.component';

@Component({
  selector: 'app-administrador-layout',
  imports: [
    RouterOutlet, 
    MenuLateralAdministradorComponent, 
    EncabezadoAdministradorComponent, 
    CommonModule, 
    PaginaDeCargaComponent
  ],
  templateUrl: './administrador-layout.component.html',
  styleUrl: './administrador-layout.component.css'
})
export class AdministradorLayoutComponent implements OnInit {

  isMenuVisible: boolean = true;
  isLoading: boolean = false;
  cargando!: WritableSignal<boolean>;

  constructor(
    private autenticacionServicio: AutenticacionService,
    private cargandoService: CargandoService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ){}

  ngOnInit(): void {

    this.cargando = this.cargandoService.cargando;

    if (this.autenticacionServicio.token) {
      this.autenticacionServicio.DatosUsuario().subscribe({
        error: () => {
          this.autenticacionServicio.cerrarSesion();
          this.router.navigate(['/inicio']);
        }
      });
    }
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}

