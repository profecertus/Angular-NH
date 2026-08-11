//Response del GET /api/v1/productos/listar
export interface Producto{
    id:number;
    nombre:string;
    precio:number;
    categoria:string;
}

//Body del POST /api/v1/productos/crear
export interface CrearProducto{
    nombre:string;
    precio:number;
    categoria:string;
}

//Response del GET /api/v1/clientes/listar
export interface Cliente{
    id:number;
    nombre:string;
    email:string;
}

//Body del POST /api/v1/clientes/crear
export interface CrearCliente{
    nombre:string;
    email:string;
}

//Estructura paginada de Spring Boot
export interface Page<T>{
    content:T[];
    totalElements:number;
    totalPages:number;
    size:number;
    number:number;
}