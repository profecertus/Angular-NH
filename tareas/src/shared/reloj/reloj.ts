import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-reloj',
  imports: [
    DatePipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
  ],
  providers: [provideNativeDateAdapter()], //Importante para que funcione el MatTimepickerModule
  templateUrl: './reloj.html',
  styleUrl: './reloj.css',
})
export class Reloj implements OnInit, OnDestroy {
  private timer: any;
  hora = signal<Date>(new Date());

  ngOnInit(): void {
    this.timer = setInterval(() => this.hora.set(new Date()), 1000);
  }

  ngOnDestroy(): void {    
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
