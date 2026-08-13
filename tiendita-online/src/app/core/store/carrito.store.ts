import { Injectable, computed, inject, signal } from '@angular/core';
import { ItemCarrito, Pedido, Producto } from '../models/producto.model';
import { ProductoService } from '../services/producto.service';

/**
 * Store del carrito: estado COMPARTIDO entre vistas (slide 15-18).
 *
 * Reglas del patrón:
 *  - el signal privado (_items) es el único que se muta
 *  - se expone .asReadonly() para que nadie de afuera lo cambie
 *  - lo calculable va en computed() (total, cantidad, vacio) -> no se duplica estado
 *  - las mutaciones son métodos con nombre de acción (agregar, quitar, vaciar)
 */
@Injectable({ providedIn: 'root' })
export class CarritoStore {
  private productoService = inject(ProductoService);

  // ---- estado privado -------------------------------------------------
  private _items = signal<ItemCarrito[]>([]);
  private _pedidos = signal<Pedido[]>([]);

  // ---- lecturas públicas (solo lectura) -------------------------------
  items = this._items.asReadonly();
  pedidos = this._pedidos.asReadonly();

  // ---- estado derivado (computed) -------------------------------------
  /** Unidades totales: lo que se muestra en el badge del nav. */
  cantidad = computed(() =>
    this._items().reduce((acc, i) => acc + i.cantidad, 0)
  );

  /** Total a pagar. */
  total = computed(() =>
    this._items().reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0)
  );

  /** Lo usa el guard del checkout para bloquear la ruta si no hay nada. */
  vacio = computed(() => this._items().length === 0);

  // ---- acciones -------------------------------------------------------
  agregar(producto: Producto): void {
    this._items.update(items => {
      const existente = items.find(i => i.producto.id === producto.id);
      // si ya está, subo la cantidad; si no, agrego la línea
      return existente
        ? items.map(i => i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...items, { producto, cantidad: 1 }];
    });
  }

  cambiarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) { this.quitar(id); return; }
    this._items.update(items =>
      items.map(i => i.producto.id === id ? { ...i, cantidad } : i)
    );
  }

  quitar(id: number): void {
    this._items.update(items => items.filter(i => i.producto.id !== id));
  }

  vaciar(): void {
    this._items.set([]);
  }

  /** Confirma el pedido: descuenta stock, guarda el pedido y vacía el carrito. */
  confirmar(cliente: string): Pedido {
    const items = this._items();
    const pedido: Pedido = {
      id: 'P-' + Date.now().toString().slice(-6),
      cliente,
      items,
      total: this.total(),
      fecha: new Date(),
    };
    items.forEach(i => this.productoService.descontarStock(i.producto.id, i.cantidad));
    this._pedidos.update(p => [pedido, ...p]);
    this.vaciar();
    return pedido;
  }
}
