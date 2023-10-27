import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent {

 cliente: Cliente = new Cliente;

  constructor(private route: ActivatedRoute,private router:Router, private clienteService:ClienteService,private snackBar: MatSnackBar ){}

  ngOnInit(): void{
    this.cliente.tipoUsuario = "CLIENTE";

  }
  createCliente() {
    if (!this.cliente.idUsuario || !this.cliente.contrasena || !this.cliente.email || !this.cliente.nombre) {
      this.mostrarMensajeError('Por favor, complete todos los campos requeridos.');
      return;
    }
    // Llamamos al método getUsuario para verificar si el usuario existe
    this.clienteService.getUsuario(this.cliente.idUsuario).subscribe(
      (usuarioExistente) => {
        if (usuarioExistente) {
          this.mostrarMensajeError("El usuario ya existe, no se puede registrar. Intenta con otra cedula")
        } else {
          // Si el usuario no existe, lo creamos
          this.clienteService.createUsuario(this.cliente).subscribe(
            (client) => {
              console.log("Se creó el dueño");
              this.router.navigate(['duenio', client.idUsuario]);
            },
            (error) => {
              this.mostrarMensajeError("Error en el formulario")
            }
          );
        }
      },
      (error) => {
        this.mostrarMensajeError("error de verificacion")
      }
    );
  }
  
  mostrarMensajeError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración del mensaje en milisegundos
      verticalPosition: 'top' as MatSnackBarVerticalPosition, // Establece la posición en la parte superior
    });
  }
  backLogin(){
    this.router.navigate(['loginUsuario']);
  }

}
