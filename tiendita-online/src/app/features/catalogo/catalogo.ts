import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CarritoStore } from '../../core/store/carrito.store';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  productos = inject(ProductoService);
  private carrito = inject(CarritoStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categoria = toSignal(
    this.route.queryParamMap.pipe(
      map( q => q.get('categoria'))
    ), {initialValue:null}
  );

  orden = toSignal(
    this.route.queryParamMap.pipe(
      map( q => q.get('orden'))
    ), {initialValue:null}
  );

  aviso = toSignal(
    this.route.queryParamMap.pipe(
      map( q => q.get('aviso'))
    ), {initialValue:null}
  );

  urlActual = computed(() => {
    const params = [
      this.categoria() ? `categoria=${this.categoria()}`:null,
      this.orden()?`orden=${this.orden()}`:null,
    ].filter(Boolean);
    return '/catalogo' + (params.length? '?' + params.join('&'): '');
  });

  visibles = computed(() => {
    let lista = this.productos.productos();

    const cat = this.categoria();
    if (cat) lista = lista.filter(p => p.categoria === cat);

    const ord = this.orden();
    if(ord==='precio') lista = [...lista].sort((a,b) => a.precio - b.precio);
    if(ord === 'nombre') lista = [...lista].sort((a,b) => a.nombre.localeCompare(b.nombre));
    return lista;
  
  });

  filtrar(categoria:string | null):void{
    this.router.navigate([], {
      relativeTo:this.route,
      queryParams:{categoria, aviso:null},
      queryParamsHandling: 'merge'
    });
  }

  ordenar(orden:string):void{
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {orden: this.orden() === orden? null:orden},
      queryParamsHandling: 'merge',
    });
  }

  agregar(p:Producto):void{
    this.carrito.agregar(p);
  }
}
