import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"; // Importa el pipe CamelcasePipe
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  secciones = [
    { ruta: '/productos', etiqueta: 'Productos', icono:'inventory_2'},
    { ruta:'/clientes', etiqueta:'Clientes', icono:'people'},
  ];
}
