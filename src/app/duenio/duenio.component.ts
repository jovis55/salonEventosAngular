import { Component,  Input, OnInit  } from '@angular/core';
import { DuenioService } from '../services/duenio.service';
import { Duenio } from '../models/duenio';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataTransportService } from '../services/data-transport.service';

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.css']
})
export class DuenioComponent {
  mostrarListaSalones = false;
  
  duenio:Duenio;
  
 

  constructor(private route: ActivatedRoute,private duenioService:DuenioService, private dataTransportService:DataTransportService,private router:Router){}

  ngOnInit():void{
   
    this.cargar();


  }

  cargar(): void {
    const initialId = '12334'
    //this.router.navigate(['duenios', initialId])
    console.log(this.route.snapshot.paramMap.get('id'))
    let idUsuario = "12334";
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          this.duenio = due;
        }
      )
    }
  }


}
