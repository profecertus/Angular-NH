import { Component, computed, effect, signal } from '@angular/core';
import { Reloj } from '../shared/reloj/reloj'; // Importa el componente Reloj 
import { CommonModule } from '@angular/common';
import {CamelcasePipe} from '../shared/camelcase-pipe'; // Importa el pipe CamelcasePipe
//. => Carpeta Actual
//.. => Carpeta Padre

@Component({
  selector: 'app-root',
  imports: [CommonModule, Reloj, CamelcasePipe], // Agrega Reloj y CamelcasePipe a los imports
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  guardar($event: string) {
    console.log($event);
    console.log('Hora emitida desde el componente hijo:', $event);
  }
  private enZona(tz:string):Date{
    return new Date(
      new Date().toLocaleString('en-US', { timeZone: tz })
    );
  }

  horaPeru = this.enZona('America/Lima');
  horaEspaña = this.enZona('Europe/Madrid');
  horaJapon = this.enZona('Asia/Tokyo');
  horaAustralia = this.enZona('Australia/Sydney');
  horaNuevaYork = this.enZona('America/New_York');
 
  contador = signal(0);
  doble = computed(() => this.contador() * 2);

  constructor() {
    effect(() => {
      console.log('Contador:', this.contador());
      console.log('Doble:', this.doble());
    });
    this.contador.set(5); // Establece el valor inicial del contador a 5
    this.contador.update(n => n + 1); // Incrementa el contador en 1
  }

  
}
