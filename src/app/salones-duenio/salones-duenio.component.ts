import { Component, Input, OnInit } from '@angular/core';
import { DuenioComponent } from '../duenio/duenio.component';
import { DuenioService } from '../services/duenio.service';
import { Salones } from '../models/salones';
import { Duenio } from '../models/duenio';
import { ActivatedRoute } from '@angular/router';
import { DataTransportService } from '../services/data-transport.service';

@Component({
  selector: 'app-salones-duenio',
  templateUrl: './salones-duenio.component.html',
  styleUrls: ['./salones-duenio.component.css']
})
export class SalonesDuenioComponent {
  duenio: Duenio;
  salones: Salones[];
  salon: Salones;

  constructor(private route: ActivatedRoute, private dataTransportService:DataTransportService, private duenioService:DuenioService) {

  }

  ngOnInit() {
    // this.duenio = this.dataTransportService.getDuenio();
    this.cargar();
    // this.salon = this.duenio.salonEventoList[0];
  }

  cargar(): void {
    let idUsuario = "12334";
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          this.duenio = due;
          this.salon = due.salonEventoList[0];
        }
      )
    }
  }

}
