import { Component, Input, OnInit } from '@angular/core';
import { DuenioComponent } from '../duenio/duenio.component';
import { DuenioService } from '../services/duenio.service';
import { Salones } from '../models/salones';
import { Duenio } from '../models/duenio';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-salones-duenio',
  templateUrl: './salones-duenio.component.html',
  styleUrls: ['./salones-duenio.component.css']
})
export class SalonesDuenioComponent {
  duenio: Duenio;
  salones: Salones[];


  constructor(private route: ActivatedRoute, private duenioService:DuenioService, private router:Router) {

  }

  ngOnInit() {
    console.log("Iniciado");
    const initialId = this.route.snapshot.parent.params['id'];
    console.log("ID", this.route.snapshot.parent.params['id']);
    this.cargar(initialId);
    console.log("Duenio = ", this.duenio == null)

  }
  navegarASalonesForm() {
    this.router.navigate(['duenios',this.duenio.idUsuario,'salones', 'formRegistro']);
  }
  navigateToDetails(idSalon: number) {
    this.router.navigate(['duenios',this.duenio.idUsuario,'salones', idSalon]);
  }
  cargar(initialId): void {
    let idUsuario = initialId;
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          console.log("Due =", due == null)
          this.duenio = due;
          this.salones = due.salonEventoList;
        }
      )
    }
  }
  navigateToDisponibilidad(idSalon: number) {
    this.router.navigate(['duenios',this.duenio.idUsuario, 'salones',idSalon,'dis' ]);
  }

}