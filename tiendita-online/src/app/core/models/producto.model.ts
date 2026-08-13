export type Categoria = 'polos'| 'tazas' | 'stickers';

export interface Producto{
    id:number;
    nombre:string;
    categoria:Categoria;
    precio:number;
    stock:number;
    emoji:string;
    descripcion:string;
}

export interface ItemCarrito{
    producto:Producto;
    cantidad:number;
}

export interface Pedido{
    id:string;
    cliente:string;
    items:ItemCarrito[];
    total:number;
    fecha:Date;
}