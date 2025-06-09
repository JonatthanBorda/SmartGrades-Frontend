import { Routes } from '@angular/router';
import { autenticadoGuard } from './core/guards/autenticado.guard';
import { PaginaNoEcontradaComponent } from './pages/extras/pagina-no-econtrada/pagina-no-econtrada.component';
import { noAutenticadoGuard } from './core/guards/no-autenticado.guard';

export const routes: Routes = [
    
    {
        path: '',
        //canActivate: [autenticadoGuard],
        loadChildren: () => import('./pages/administrador/administrador.routes').then(m => m.ADMINISTRADOR_ROUTES)
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        //redirectTo: 'dashboard'
        component: PaginaNoEcontradaComponent
    }
];
