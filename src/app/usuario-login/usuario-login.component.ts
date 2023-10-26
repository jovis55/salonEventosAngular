import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuario-login',
  templateUrl: 'usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {
  idUsuario: string;
  contrasena: string;
  usuario: Usuario;


  constructor(private route: ActivatedRoute, private router:Router, private loginService: LoginService){}

  ngOnInit(): void{}

  

  create(){
   
 
    this.loginService.getUsuario(this.idUsuario).subscribe(
      (user) => {
        this.usuario = user;

        if (this.usuario) {
          // Se encontró un usuario, ahora verifica si las contraseñas coinciden.
          if (this.usuario.contraseña === this.contrasena) {
            switch (this.usuario.tipoUsuario) {
              case "DUENIO":
                this.navegarADuenios(this.idUsuario);
                break; // Agregamos break para salir del switch
            
              case "CLIENTE":
                this.navegarAClientes(this.idUsuario);
                break; // Agregamos break para salir del switch
            
              case "ADMIN":
                this.navegarAAdmin(this.idUsuario);
                break; // Agregamos break para salir del switch
            
              default:
                // Si el tipo de usuario no coincide con ninguno de los casos anteriores, puedes manejarlo aquí
                console.log("Tipo de usuario no reconocido");
                break;
            }
            
            // Las contraseñas coinciden, puedes continuar con la lógica de autenticación.
            console.log('Autenticación exitosa');
          } else {
            // Las contraseñas no coinciden, muestra un mensaje de error.
            console.log('Contraseña incorrecta. Por favor, verifica tus credenciales.');
          }
        } else {
          // No se encontró un usuario, muestra un mensaje de error.
          console.log('Usuario no encontrado. Por favor, regístrate.');
        }
      }
    );
  }

  navegarAClientes(idUsuario: string) {
    this.router.navigate(['clientes', idUsuario]);
  }
  navegarADuenios(idUsuario: string) {
    this.router.navigate(['duenios', idUsuario]);
  }
  navegarAAdmin(idUsuario: string) {
    this.router.navigate(['admin', idUsuario]);
  }

}
