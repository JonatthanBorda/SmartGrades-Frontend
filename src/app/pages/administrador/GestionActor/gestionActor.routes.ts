import { Routes } from "@angular/router";
import { GestionActorLayoutComponent } from "./gestion-actor-layout/gestion-actor-layout.component";
import { ListaActorComponent } from "./lista-actor/lista-actor.component";


export const GESTION_ACTOR_ROUTES: Routes = [
    {
        path: '',
        component: GestionActorLayoutComponent,
        children: [
            { path: '', component: ListaActorComponent }
        ]
    }
];