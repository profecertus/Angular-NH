import { Component, computed, signal } from '@angular/core';
import { Reloj } from '../shared/reloj/reloj'; // Importa el componente Reloj 
//. => Carpeta Actual
//.. => Carpeta Padre

@Component({
  selector: 'app-root',
  imports: [Reloj], // Agrega Reloj a los imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tareas = signal<string[]>(['Aprender Angular', 'Practicar signals']);
  total = computed(() => this.tareas().length);
  agregar(titulo: string) { 
    const t = titulo.trim(); 
    if (t) this.tareas.update(xs => [...xs, t]); 
  }

  eliminar(i: number) { 
    this.tareas.update(xs => xs.filter((_, idx) => idx !== i)); 
  }
}
