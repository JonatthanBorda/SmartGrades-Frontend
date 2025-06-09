import { Routes } from "@angular/router";
import { GestionPeliculaLayoutComponent } from "./gestion-pelicula-layout/gestion-pelicula-layout.component";
import { ListaPeliculaComponent } from "./lista-pelicula/lista-pelicula.component";



export const GESTION_PELICULA_ROUTES: Routes = [
    {
        path: '',
        component: GestionPeliculaLayoutComponent,
        children: [
            { path: '', component: ListaPeliculaComponent },
        ]
    }
];