import { Routes } from '@angular/router';
import { autenticadoGuard } from './core/guards/autenticado.guard';
import { PaginaNoEcontradaComponent } from './pages/extras/pagina-no-econtrada/pagina-no-econtrada.component';
import { noAutenticadoGuard } from './core/guards/no-autenticado.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [noAutenticadoGuard],
        loadChildren: () => import('./pages/invitado/invitado.routes').then(m => m.INVITADO_ROUTES)
    },
    {
        path: 'autenticacion',
        canActivate: [noAutenticadoGuard],
        loadChildren: () => import('./pages/autenticacion/autenticacion.routes').then(m => m.AUTENTICACION_ROUTES)
    },
    {
        path: 'dashboard',
        canActivate: [autenticadoGuard],
        loadChildren: () => import('./pages/administrador/administrador.routes').then(m => m.ADMINISTRADOR_ROUTES)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        //redirectTo: 'dashboard'
        component: PaginaNoEcontradaComponent
    }
];
