import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, catchError, map, of} from 'rxjs';
import {Producto, CrearProducto, Page} from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1/productos';

  /**
   * GET /api/v1/productos?page=0&size=10
   * @param page number of the page to retrieve
   * @param size number of items per page
   * @returns an observable of the paginated list of products
   */
  listar(page = 0, size = 10, categoria?:string): Observable<Page<Producto>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if(categoria) {
      params = params.set('categoria', categoria);
    }

    return this.http.get<Page<Producto>>(this.baseUrl, { params }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al listar productos:', error);
        return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<Producto>);
      })
    );
  }

  /**
   * POST /api/v1/productos - Crear un nuevo producto
   * @param producto the product data to create
   * @returns an observable of the created product
   */
  crear(producto: CrearProducto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto);
  }
   
}