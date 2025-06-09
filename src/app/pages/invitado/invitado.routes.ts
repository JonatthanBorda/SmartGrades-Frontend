import { Routes } from "@angular/router";
import { InvitadoLayoutComponent } from "./invitado-layout/invitado-layout.component";
import { InicioComponent } from "./inicio/inicio.component";
import { VerPeliculaComponent } from "./ver-pelicula/ver-pelicula.component";

export const INVITADO_ROUTES: Routes = [
    { 
        path: '', 
        component: InvitadoLayoutComponent,
        children: [
            { path: '', component: InicioComponent },
            { path: 'pelicula/:id', component: VerPeliculaComponent }
        ]
    }
]