import { Component } from '@angular/core';
import { Salones } from '../models/salones';
import { SalonesService } from '../services/salones.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Duenio } from '../models/duenio';
import { DuenioService } from '../services/duenio.service';

@Component({
  selector: 'app-registro-salones',
  templateUrl: './registro-salones.component.html',
  styleUrls: ['./registro-salones.component.css']
})
export class RegistroSalonesComponent {
  duenio: Duenio;
  salon: Salones = new Salones;
  


  constructor(private route: ActivatedRoute,private salonesService:SalonesService, private router:Router, private duenioService:DuenioService){}

  ngOnInit(): void{
    const initialId = this.route.snapshot.parent.params['id'];
    this.cargar(initialId);

  }
  
  create(): void {
    console.log(this.salon);
  
    if (!this.duenio) {
      console.error("No se proporcionó un dueño válido.");
      alert('Error: No se proporcionó un dueño válido.');
      return; // Salir del método si no hay un dueño válido
    }
  
    // Verificar si el salón ya existe
    if (this.salonesService.getSalon(this.salon.nombre)) {
      console.log("El salón ya existe");
      alert('Este salón ya está registrado.');
      this.router.navigate(['duenios', '12334', 'salones']);
    } else {
      console.log("El salón no existe");
      this.salon.duenio = this.duenio;
      this.salonesService.createSalon(this.salon).subscribe(
        (salonCreado) => {
          console.log(salonCreado);
          this.router.navigate(['duenios', '12334', 'salones']);
        },
        (error) => {
          console.error("Error al crear el salón:", error);
          alert('Hubo un error al crear el salón. Por favor, inténtalo de nuevo más tarde.');
        }
      );
    }
  }
  cargar(initialId): void {
    let idUsuario = initialId;
    console.log("este es el id registro", initialId);
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          console.log("Due =", due == null)
          this.duenio = due;
        }
      )
    }
  }

}
