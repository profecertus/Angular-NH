import { Component, inject } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  productos = inject(ProductoService);
  private router = inject(Router);

  verOfertas():void{
    this.router.navigate(['/catalogo'],{
      queryParams:{categoria:'tazas', orden: 'precio'}
    });
  }
}
