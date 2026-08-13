import { Component, inject } from '@angular/core';
import { CarritoStore } from '../../core/store/carrito.store';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  store = inject(CarritoStore);
  private router = inject(Router);

  irAlCheckout():void{
    this.router.navigate(['/checkout']);
  }
}
