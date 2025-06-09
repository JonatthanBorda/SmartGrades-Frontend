import { Routes } from "@angular/router";
import { GestionNotaLayoutComponent } from "./gestion-nota-layout/gestion-nota-layout.component";
import { ListaNotaComponent } from "./lista-nota/lista-nota.component";



export const GESTION_NOTA_ROUTES: Routes = [
    {
        path: '',
        component: GestionNotaLayoutComponent,
        children: [
            { path: '', component: ListaNotaComponent },
        ]
    }
];