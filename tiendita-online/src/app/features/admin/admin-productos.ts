import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-admin-productos',
  imports: [DecimalPipe],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css',
})
export class AdminProductos {
  productos = inject(ProductoService);

  subir(id: number, precio: number): void {
    this.productos.actualizarPrecio(id, Math.round(precio * 1.1 * 10) / 10);
  }

  bajar(id: number, precio: number): void {
    this.productos.actualizarPrecio(id, Math.round(precio * 0.9 * 10) / 10);
  }
}
