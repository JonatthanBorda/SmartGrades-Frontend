import { Routes } from "@angular/router";
import { GestionGeneroLayoutComponent } from "./gestion-genero-layout/gestion-genero-layout.component";
import { ListaGeneroComponent } from "./lista-genero/lista-genero.component";


export const GESTION_GENERO_ROUTES: Routes = [
    {
        path: '',
        component: GestionGeneroLayoutComponent,
        children: [
            { path: '', component: ListaGeneroComponent }
        ]
    }
];