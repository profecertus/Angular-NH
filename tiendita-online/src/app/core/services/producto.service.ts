import { Injectable, computed, signal } from '@angular/core';
import { Categoria, Producto } from '../models/producto.model';


@Injectable({providedIn: 'root'})
export class ProductoService{
    private _productos = signal<Producto[]>([
        {
            id: 1, nombre: 'Polo Angular', categoria: 'polos', precio: 59.9, stock: 12,
            emoji: '',
            descripcion: 'Polo de Algodon'
        },
        {
            id: 2, nombre: 'Polo Angular', categoria: 'polos', precio: 59.9, stock: 12,
            emoji: '',
            descripcion: 'Polo de Algodon'
        },
        {
            id: 3, nombre: 'Polo Angular', categoria: 'polos', precio: 59.9, stock: 12,
            emoji: '',
            descripcion: 'Polo de Algodon'
        },
        {
            id: 4, nombre: 'Polo Angular', categoria: 'polos', precio: 59.9, stock: 12,
            emoji: '',
            descripcion: 'Polo de Algodon'
        },
        {
            id: 5, nombre: 'Polo Angular', categoria: 'polos', precio: 59.9, stock: 12,
            emoji: '',
            descripcion: 'Polo de Algodon'
        },
        {
            id: 6, nombre: 'Polo Angular', categoria: 'polos', precio: 59.9, stock: 12,
            emoji: '',
            descripcion: 'Polo de Algodon'
        }
    ]);

    productos = this._productos.asReadonly();

    categorias = computed<Categoria[]>(
        () => [...new Set(this._productos().map(p=>p.categoria))]
    );

    porId(id:number):Producto | undefined{
        return this._productos().find(p=> p.id === id);
    }

    descontarStock(id:number, cantidad:number):void{
        this._productos.update(lista =>
            lista.map(p => p.id === id?{ ...p, stock:Math.max(0, p.stock - cantidad)}:p)
        )
    }

    actualizarPrecio(id:number, precio:number):void{
        this._productos.update(lista =>
            lista.map(p => p.id === id? {...p, precio}: p)
        )
    }
}