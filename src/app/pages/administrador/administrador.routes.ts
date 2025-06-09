import { Routes } from "@angular/router";
import { AdministradorLayoutComponent } from "./administrador-layout/administrador-layout.component";
import { InicioDashboardComponent } from "./inicio-dashboard/inicio-dashboard.component";

export const ADMINISTRADOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministradorLayoutComponent,
        children: [
            { 
                path: '', component: InicioDashboardComponent 
            },
            { 
                path: 'genero', 
                loadChildren: () => import('./GestionGenero/gestionGenero.routes').then(m => m.GESTION_GENERO_ROUTES) 
            },
            { 
                path: 'pais', 
                loadChildren: () => import('./GestionPais/gestionPais.routes').then(m => m.GESTION_PAIS_ROUTES) 
            },
            { 
                path: 'director', 
                loadChildren: () => import('./GestionDirector/gestionDirector.routes').then(m => m.GESTION_DIRECTOR_ROUTES) 
            },
            { 
                path: 'actor', 
                loadChildren: () => import('./GestionActor/gestionActor.routes').then(m => m.GESTION_ACTOR_ROUTES) 
            },
            { 
                path: 'usuario', 
                loadChildren: () => import('./GestionUsuario/gestionUsuario.routes').then(m => m.GESTION_USUARIO_ROUTES) 
            },
            { 
                path: 'pelicula', 
                loadChildren: () => import('./GestionPelicula/gestionPelicula.routes').then(m => m.GESTION_PELICULA_ROUTES) 
            },
        ]
    }
]