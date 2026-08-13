import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoStore } from '../../core/store/carrito.store';

@Component({
  selector: 'app-admin-pedidos',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.css',
})
export class AdminPedidos {
  store = inject(CarritoStore);  
}
