import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

    cliente:Cliente;
  
    constructor(private route: ActivatedRoute,private clienteService: ClienteService,private router:Router){}
  
    ngOnInit():void{
  
      this.cargar();
  
  
    }
  
    cargar(): void {
      const initialId = this.route.snapshot.paramMap.get('id');
      //this.router.navigate(['duenios', initialId])
      console.log(this.route.snapshot.paramMap.get('id'))
      let idUsuario = initialId;
      if (idUsuario) {
        this.clienteService.getUsuario(idUsuario).subscribe(
          (client) => {
            this.cliente = client;
          }
        )
      }
    }
  
  
  }


