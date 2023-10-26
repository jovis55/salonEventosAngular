import { Component } from '@angular/core';
import { Salones } from '../models/salones';
import { SalonesService } from '../services/salones.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-salones-cliente',
  templateUrl: './salones-cliente.component.html',
  styleUrls: ['./salones-cliente.component.css']
})
export class SalonesClienteComponent {
  salones: Salones[];
  idUsuario: number;
 

  constructor(private route: ActivatedRoute, private salonesService: SalonesService, private router:Router) {
  }

  ngOnInit(){
    const initialId = this.route.snapshot.parent.params['id'];
    this.cargar(initialId);
    this.idUsuario = initialId;

  }
cargar(initialId):void{
  let idUsuario = initialId;
  if (idUsuario) {
    this.salonesService.getSalones().subscribe(
      (sal) => {
        this.salones = sal;
      }
    )
  }
}

navigateToDetails(idSalon: number) {
  this.router.navigate(['clientes',this.idUsuario,'salones', idSalon]);
}

}
