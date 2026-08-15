import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../../service/cliente';
import { Cliente } from '../../models/api.model';

@Component({
  selector: 'app-clientes',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit{
  private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  clientes = signal<Cliente[]>([]);
  cargando = signal<boolean>(false);
  error = signal(false);
  paginaActual = signal(0);
  totalPaginas = signal(0);
  totalElementos = signal(0);

  columnas = ['id', 'nombre', 'email'];

  form = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email:['', Validators.email]
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.cargando.set(true);
    this.error.set(false);
    this.clienteService.listar(this.paginaActual(), 10).subscribe({
      next:(page) =>{
        this.clientes.set(page.content);
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
      this.snackBar.open('Formulario inválido', 'Cerrar', {duration: 3000});
      return;
    }

    this.cargando.set(true);

    const cliente = {
      nombre: this.form.value.nombre!,
      email: this.form.value.email!
    };

    this.clienteService.crear(cliente).subscribe({
      next: (creado) => {
        this.snackBar.open(`Cliente ${creado.nombre}`, 'Cerrar', {duration: 3000});
        this.form.reset({nombre:'', email: ''});
        this.cargar();
      },
      error: (error) =>{
        console.error(error);
        this.snackBar.open('Error al crea cliente', 'Cerrar', {duration: 3000});
        this.cargando.set(false);
      }
    });

  }

  paginaSiguiente(){
    this.paginaActual.update(p => p + 1);
    this.cargar();
  }

  paginaAnterior(){
    this.paginaActual.update(p => p - 1);
    this.cargar();
  }

}
