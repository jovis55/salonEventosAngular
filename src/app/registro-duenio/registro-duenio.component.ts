import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Duenio } from '../models/duenio';
import { DuenioService } from '../services/duenio.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-duenio',
  templateUrl: './registro-duenio.component.html',
  styleUrls: ['./registro-duenio.component.css']
})
export class RegistroDuenioComponent {
  duenio: Duenio = new Duenio;

  constructor(private route: ActivatedRoute,private router:Router, private duenioService:DuenioService, private snackBar: MatSnackBar){}
 

  ngOnInit(): void{
    this.duenio.tipoUsuario = "DUENIO";

  }
  createCliente() {
    // Llamamos al método getUsuario para verificar si el usuario existe
    this.duenioService.getUsuario(this.duenio.idUsuario).subscribe(
      (usuarioExistente) => {
        if (usuarioExistente) {
          this.mostrarMensajeError("El usuario ya existe, no se puede registrar. Intenta con otra cedula")
        } else {
          // Si el usuario no existe, lo creamos
          this.duenioService.createUsuario(this.duenio).subscribe(
            (duenio) => {
              console.log("Se creó el dueño");
              this.router.navigate(['duenios', duenio.idUsuario]);
            },
            (error) => {
              console.error('Error al crear el dueño:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al verificar el usuario:', error);
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
