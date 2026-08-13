import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout';

/**
 * Rutas hijas del área admin (slide 19).
 * Este archivo entra al bundle solo cuando se navega a /admin (loadChildren).
 */
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,   // layout con su propio <router-outlet>
    children: [
      // /admin -> /admin/productos
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      {
        path: 'productos',
        title: 'Admin · Productos',
        loadComponent: () =>
          import('./admin-productos').then(m => m.AdminProductos),
      },
      {
        path: 'pedidos',
        title: 'Admin · Pedidos',
        loadComponent: () =>
          import('./admin-pedidos').then(m => m.AdminPedidos),
      },
    ],
  },
];
