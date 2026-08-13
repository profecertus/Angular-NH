import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';
import { Catalogo } from './features/catalogo/catalogo';
import { DetalleProducto } from './features/catalogo/detalle-producto';
import { Carrito } from './features/carrito/carrito';
import { Login } from './features/login/login';

export const routes: Routes = [
    {path:'', component:Inicio, title: 'Tiendita-Inicio', pathMatch:'full'},
    {path:'catalogo', component:Catalogo, title:'Tiendita-Catalogo'},
    {path:'catalogo/:id', component:DetalleProducto, title:'Tiendita-Detalle Producto'},
    {path:'carrito', component:Carrito, title:'Tiendita-Carrito'},
    {path:'login', component:Login, title:'Tiendita-Login'},
    {
        path:'admin',
        loadChildren: () =>
            import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    }
];
