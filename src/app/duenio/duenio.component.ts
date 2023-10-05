import { Component,  Input, OnInit  } from '@angular/core';
import { DuenioService } from '../services/duenio.service';
import { Duenio } from '../models/duenio';
import { Router } from '@angular/router';
import { DataTransportService } from '../services/data-transport.service';

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.css']
})
export class DuenioComponent {
  mostrarListaSalones = false;
  
  duenio:Duenio;
  
 

  constructor(private duenioService:DuenioService, private dataTransportService:DataTransportService){}

  ngOnInit():void{
   
    this.cargar();


  }

  cargar(): void {
    let idUsuario = "12334";
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          this.duenio = due;
          this.dataTransportService.setDuenio(this.duenio);
        }
      )
    }
  }


}
