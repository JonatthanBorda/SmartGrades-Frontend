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
                path: 'profesor',
                loadChildren: () => import('./GestionProfesor/gestionProfesor.routes').then(m => m.GESTION_PROFESOR_ROUTES) 
            },
            { 
                path: 'estudiante',
                loadChildren: () => import('./GestionEstudiante/gestionEstudiante.routes').then(m => m.GESTION_ESTUDIANTE_ROUTES) 
            },
            { 
                path: 'nota', 
                loadChildren: () => import('./GestionNota/gestionNotas.routes').then(m => m.GESTION_NOTA_ROUTES)
            }
        ]
    }
]