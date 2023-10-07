import { Component, Input, OnInit } from '@angular/core';
import { DuenioComponent } from '../duenio/duenio.component';
import { DuenioService } from '../services/duenio.service';
import { Salones } from '../models/salones';
import { Duenio } from '../models/duenio';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataTransportService } from '../services/data-transport.service';

@Component({
  selector: 'app-salones-duenio',
  templateUrl: './salones-duenio.component.html',
  styleUrls: ['./salones-duenio.component.css']
})
export class SalonesDuenioComponent {
  duenio: Duenio;
  salones: Salones[];


  constructor(private route: ActivatedRoute, private duenioService:DuenioService, private dataTransportService:DataTransportService, private router:Router) {

  }

  ngOnInit() {
    console.log("Iniciado");
    const initialId = this.route.snapshot.parent.params['id'];
    console.log("ID", this.route.snapshot.parent.params['id']);
    this.cargar(initialId);
    console.log("Duenio = ", this.duenio == null)

  }
  navegarASalonesForm() {
    this.router.navigate(['duenios','12334','salones', 'form']);
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

}