import { Routes } from '@angular/router';
import { PaginaNoEcontradaComponent } from './pages/extras/pagina-no-econtrada/pagina-no-econtrada.component';

export const routes: Routes = [
    
    {
        path: '',
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
