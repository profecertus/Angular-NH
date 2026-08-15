import { Routes } from '@angular/router';
import { Productos } from '../shared/productos/productos';
import { Clientes } from '../shared/clientes/clientes';


export const routes: Routes = [
    {path:'', redirectTo:'productos', pathMatch:'full'},
    {path:'productos', component:Productos, title:'Productos'},
    {path: 'clientes', component:Clientes, title:'Clientes'},
    {path: '**', redirectTo:'productos'}
];