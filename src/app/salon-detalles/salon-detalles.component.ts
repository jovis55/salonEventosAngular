import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Salones } from '../models/salones';
import { SalonesService } from '../services/salones.service';

@Component({
  selector: 'app-salon-detalles',
  templateUrl: './salon-detalles.component.html',
  styleUrls: ['./salon-detalles.component.css']
})
export class SalonDetallesComponent {
  salon: Salones = new Salones;
  constructor(private route: ActivatedRoute,  private router:Router, private salonService:SalonesService){}

  ngOnInit(){
    const idSalon = +this.route.snapshot.paramMap.get('idSalon');
    this.cargar(idSalon);
  }

  cargar(initialId): void {
    let idSalon = initialId;
    console.log("id del salon ",idSalon);
    if (idSalon) {
      this.salonService.getSalon(idSalon).subscribe(
        (sal) => {
          
          this.salon = sal;
         
        }
      )
    }
  }

}
