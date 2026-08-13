import { Component, computed, inject, input } from "@angular/core";
import { ProductoService } from "../../core/services/producto.service";
import { CarritoStore } from "../../core/store/carrito.store";
import { Router, RouterLink } from "@angular/router";
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-detalle-producto',
    templateUrl: './detalle-producto.html',
    styleUrl:'./detalle-producto.css',
    imports:[RouterLink, DecimalPipe]
    
})
export class DetalleProducto{
    id = input.required({transform:((v:string) => Number(v))});

    private productos = inject(ProductoService);
    private carrito = inject(CarritoStore);
    private router = inject(Router);

    producto = computed(()=> this.productos.porId(this.id()));

    agregar():void{
        const p = this.producto();
        if (p) this.carrito.agregar(p);
    }

    comprarYa():void{
        this.agregar();
        this.router.navigate(['/carrito']);
    }
}