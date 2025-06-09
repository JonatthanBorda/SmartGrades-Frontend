import { Routes } from "@angular/router";
import { GestionDirectorLayoutComponent } from "./gestion-director-layout/gestion-director-layout.component";
import { ListaDirectorComponent } from "./lista-director/lista-director.component";
import { FormularioDirectorComponent } from "./formulario-director/formulario-director.component";


export const GESTION_DIRECTOR_ROUTES: Routes = [
    {
        path: '',
        component: GestionDirectorLayoutComponent,
        children: [
            { path: '', component: ListaDirectorComponent }
        ]
    }
];