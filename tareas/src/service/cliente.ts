import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Cliente, CrearCliente, Page } from "../models/api.model";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/api/v1/clientes';

    /**
     * GET /api/v1/clientes?page=0&size=10
     * @param page number of the page to retrieve
     * @param size number of items per page
     * @returns an observable of the paginated list of clients
     */
    listar(page = 0, size = 10): Observable<Page<Cliente>> {
        const params = new HttpParams().set('page', page).set('size', size);

        return this.http.get<Page<Cliente>>(this.baseUrl, { params }).pipe(
            map(response => response),
            catchError(error => {
                console.error('Error al listar clientes:', error);
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<Cliente>);
            })
        );
    }

    /**
     * GET /api/v1/clientes/{id}
     * @param id the id of the client to retrieve
     * @returns an observable of the client
     */
    obtenerPorId(id: number): Observable<Cliente | null> {
        return this.http.get<Cliente>(`${this.baseUrl}/${id}`).pipe(
            catchError(error => {
                console.error('Error al obtener cliente:', error);
                return of(null);
            })
        );
    }

    /**
     * POST /api/v1/clientes - Crear un nuevo cliente
     * @param cliente the client data to create
     * @returns an observable of the created client
     */
    crear(cliente: CrearCliente):Observable<Cliente>{
        return this.http.post<Cliente>(this.baseUrl, cliente);
    }

}