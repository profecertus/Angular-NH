import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, input, linkedSignal, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Usuario } from '../../service/usuario';


@Component({
  selector: 'app-reloj',
  imports: [
    DatePipe,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
  ],
  providers: [provideNativeDateAdapter()], //Importante para que funcione el MatTimepickerModule
  templateUrl: './reloj.html',
  styleUrl: './reloj.css',
})
export class Reloj implements OnInit {
  private usuarios = inject(Usuario); //Inyecta el servicio Usuario

  private timer: any;
  titulo = input<string>('Reloj Angular'); //Input para el seteo del titulo del componente
  hora = input<Date>(new Date());
  horaActual = linkedSignal(() => this.hora()); //Se actualiza manualmente cada segundo
  guardar = output<string>();  
  

  ngOnInit(): void {
    console.log('Los usuarios actuales son:');
    this.usuarios.getUsuarios().forEach((u, i) => console.log(`${i + 1}. ${u}`));

    this.guardar.emit(this.hora().toLocaleString()); //Emite la hora inicial al componente padre  
    this.timer = setInterval(() => {
      this.horaActual.update(prev => new Date(prev.getTime() + 1000)); //Actualiza la hora cada segundo
    }, 1000);
  }
  
}
