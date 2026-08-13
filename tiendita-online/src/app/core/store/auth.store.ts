import { Injectable, computed, signal } from '@angular/core';

/**
 * Auth de mentira, pero suficiente para demostrar los guards (slide 11-12).
 * El "token" se persiste en localStorage para que sobreviva al F5.
 */
@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly CLAVE = 'tiendita.usuario';

  private _usuario = signal<string | null>(localStorage.getItem(this.CLAVE));

  usuario = this._usuario.asReadonly();
  logueado = computed(() => this._usuario() !== null);

  /** Cualquier usuario/clave no vacía entra. Es una demo, no un IdP. */
  login(usuario: string, clave: string): boolean {
    if (!usuario.trim() || !clave.trim()) return false;
    localStorage.setItem(this.CLAVE, usuario);
    this._usuario.set(usuario);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.CLAVE);
    this._usuario.set(null);
  }
}
