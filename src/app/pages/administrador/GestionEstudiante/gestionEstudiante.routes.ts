import { Routes } from "@angular/router";
import { GestionEstudianteLayoutComponent } from "./gestion-estudiante-layout/gestion-estudiante-layout.component";
import { ListaEstudianteComponent } from "./lista-estudiante/lista-estudiante.component";


export const GESTION_ESTUDIANTE_ROUTES: Routes = [
    {
        path: '',
        component: GestionEstudianteLayoutComponent,
        children: [
            { path: '', component: ListaEstudianteComponent }
        ]
    }
];