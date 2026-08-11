import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../service/producto';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Producto } from '../../models/api.model';
import { DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-productos',
  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  private productoService = inject(ProductoService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  productos = signal<Producto[]>([]);
  cargando = signal<boolean>(false);
  error = signal(false);
  paginaActual = signal(0);
  totalPaginas = signal(0);
  totalElementos = signal(0);

  columnas = ['id', 'nombre', 'precio', 'categoria'];

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    categoria: ['', Validators.required],
  });


  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.cargando.set(true);
    this.productoService.listar(this.paginaActual(), 10).subscribe({
      next: (page) => {
        this.productos.set(page.content);
        this.totalPaginas.set(page.totalPages);
        this.totalElementos.set(page.totalElements);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  crear(){
    if(this.form.invalid){
      this.snackBar.open('Formulario inválido', 'Cerrar', { duration: 3000 });
      return;
    }

    this.cargando.set(true);

    const producto = {
      nombre: this.form.value.nombre!,
      precio: this.form.value.precio!,
      categoria: this.form.value.categoria!
    };

    this.productoService.crear(producto).subscribe({
      next: (creado) => {
        this.snackBar.open(`Producto ${creado.nombre} creado`, 'Cerrar', { duration: 3000 });
        this.form.reset({ nombre: '', precio: 0, categoria: '' });
        this.cargar();
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('Error al crear producto', 'Cerrar', { duration: 3000 });
        this.cargando.set(false);
      }
    });
  }

  paginaSiguiente(){
    this.paginaActual.update(p => p +  1);
    this.cargar();
  }

  paginaAnterior(){
    this.paginaActual.update(p => Math.max(0, p - 1));
    this.cargar();
  }
}
