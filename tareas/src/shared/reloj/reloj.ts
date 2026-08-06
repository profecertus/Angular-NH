import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-reloj',
  imports: [],
  templateUrl: './reloj.html',
  styleUrl: './reloj.css',
})
export class Reloj implements OnInit, OnDestroy {
  private timer: any;
  hora = signal('');

  ngOnInit(): void {
    this.timer = setInterval(() => this.hora.set(new Date().toLocaleTimeString()), 1000);
  }

  ngOnDestroy(): void {    
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
