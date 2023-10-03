import { Component } from '@angular/core';
import { DuenioService } from './duenio.service';
import { Duenio } from './duenio';

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.css']
})
export class DuenioComponent {
  

  duenio:Duenio = new Duenio();

  constructor(private duenioService:DuenioService){}

  ngOnInit():void{
   
    this.cargar();

  }
  cargar():void{
    let idUsuario="12334";
    if(idUsuario){
      this.duenioService.getUsuario(idUsuario).subscribe(
          due =>this.duenio = due
      )
    }
  }


}
