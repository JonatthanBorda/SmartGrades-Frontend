import { Routes } from "@angular/router";
import { GestionProfesorLayoutComponent } from "./gestion-profesor-layout/gestion-profesor-layout.component";
import { ListaProfesorComponent } from "./lista-profesor/lista-profesor.component";


export const GESTION_PROFESOR_ROUTES: Routes = [
    {
        path: '',
        component: GestionProfesorLayoutComponent,
        children: [
            { path: '', component: ListaProfesorComponent }
        ]
    }
];