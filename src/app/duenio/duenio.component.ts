import { Component,  Input, OnInit  } from '@angular/core';
import { DuenioService } from '../services/duenio.service';
import { Duenio } from '../models/duenio';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.css']
})
export class DuenioComponent {


  duenio:Duenio;



  constructor(private route: ActivatedRoute,private duenioService:DuenioService,private router:Router){}

  ngOnInit():void{

    this.cargar();


  }

  cargar(): void {
    const initialId = this.route.snapshot.paramMap.get('id');
    //this.router.navigate(['duenios', initialId])
    console.log(this.route.snapshot.paramMap.get('id'))
    let idUsuario = initialId;
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          this.duenio = due;
        }
      )
    }
  }


}