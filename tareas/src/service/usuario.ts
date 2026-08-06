import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Usuario {
    private usuarios = signal<string[]>(['Juan', 'María', 'Pedro']);
    agregar(nombre: string) {
        const n = nombre.trim();
        if (n) this.usuarios.update(xs => [...xs, n]);
    }
    eliminar(i: number) {
        this.usuarios.update(xs => xs.filter((_, idx) => idx !== i));
    }

    getUsuarios() {
        return this.usuarios();
    }
}
