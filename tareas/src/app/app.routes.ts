import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', redirectTo:'productos', pathMatch:'full'},
    {
        path:'productos', 
        title:'Productos',
        loadComponent: () => import('../shared/productos/productos').then((m) => m.Productos)
    },
    {
        path: 'clientes', 
        title:'Clientes',
        loadComponent: () => import('../shared/clientes/clientes').then((m) => m.Clientes)
    },
    {path: '**', redirectTo:'productos'}
];