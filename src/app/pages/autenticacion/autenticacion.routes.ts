import { Routes } from "@angular/router";
import { InicioDeSesionComponent } from "./inicio-de-sesion/inicio-de-sesion.component";

export const AUTENTICACION_ROUTES: Routes = [
    { path: 'iniciar-sesion', component: InicioDeSesionComponent}
]