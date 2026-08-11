import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const logInteceptor: HttpInterceptorFn = (req, next) => {
    const inicio = Date.now();
    console.log(`[HTTP ->] ${req.method} ${req.url}`);

    const reqConHeader = req.clone({
        setHeaders: {
            'X-Request-Start': `${inicio}`,
            'X-App':'Angular-NH',
            'Barer': 'token'
        }
    });

    return next(reqConHeader).pipe(
        tap({
            next: (event) => {
                if('status' in event) {
                    const fin = Date.now();
                    const duracion = fin - inicio;
                    console.log(`[HTTP <-] ${req.method} ${req.url} ${event.status} ${duracion}ms`);
                }
            },
            error: (error) => {
                const fin = Date.now();
                const duracion = fin - inicio;
                console.log(`[HTTP <-] ${req.method} ${req.url} ${error.status} ${duracion}ms`);
            }
        })
    );
}