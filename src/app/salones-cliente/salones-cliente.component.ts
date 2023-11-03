import { Component } from '@angular/core';
import { Salones } from '../models/salones';
import { SalonesService } from '../services/salones.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Disponibilidad } from '../models/disponibilidad';

@Component({
  selector: 'app-salones-cliente',
  templateUrl: './salones-cliente.component.html',
  styleUrls: ['./salones-cliente.component.css']
})
export class SalonesClienteComponent {
  salones: Salones[];
  salonesOriginal: Salones[];
  idUsuario: number;
  opcionBusqueda: string;
  ubicacionInput: string;
  capacidadInput: string;
  fechaInput: string;
 

  constructor(private route: ActivatedRoute, private salonesService: SalonesService, private router:Router) {
  }


  

  ngOnInit(){
    const initialId = this.route.snapshot.parent.params['id'];
    this.cargar(initialId);
    this.idUsuario = initialId;
    this.opcionBusqueda = '';

  }
cargar(initialId):void{
  let idUsuario = initialId;
  if (idUsuario) {
    this.salonesService.getSalones().subscribe(
      (sal) => {
        this.salones = sal;
        this.salonesOriginal = sal;
      }
    )
  }
}
navigateToDisponibilidad(idSalon: number) {
  this.router.navigate(['clientes',this.idUsuario, 'salones',idSalon,'dis' ]);
}

navigateToDetails(idSalon: number) {
  this.router.navigate(['clientes',this.idUsuario,'salones', idSalon]);
}


buscarSalones() {
  
  if (this.opcionBusqueda === 'ubicacion') {
    this.buscarPorUbicacion();}
  if (this.opcionBusqueda === 'capacidad') {
    this.buscarPorCapacidad();}
  if (this.opcionBusqueda === 'fecha') {
    this.buscarPorFecha();}
  if(this.opcionBusqueda === 'restablecerBusqueda'){
    this.salones= this.salonesOriginal;
  }
  
}
seleccionDeOpcion() {
  if (this.opcionBusqueda === 'restablecerBusqueda') {
    // Llama al método correspondiente para restablecer la búsqueda.
      this.buscarSalones()  }
}




buscarPorUbicacion() {
  if (this.ubicacionInput) {
    this.salones= this.salonesOriginal
    this.salones = this.salones.filter((salon) =>
      salon.ubicacion.toLowerCase().includes(this.ubicacionInput.toLowerCase())
    );
  } else {
    // Si el campo de ubicación está vacío, muestra todos los salones nuevamente.
    this.cargar(this.idUsuario);
  }
  this.ubicacionInput="";
  
}

buscarPorCapacidad() {
  if (this.capacidadInput) {
    this.salones= this.salonesOriginal
    this.salones = this.salones.filter((salon) =>
      salon.capacidad.toLowerCase()==(this.capacidadInput.toLowerCase())
    );
  } else {
    // Si el campo de ubicación está vacío, muestra todos los salones nuevamente.
    this.cargar(this.idUsuario);
  }
  this.capacidadInput="";
}

buscarPorFecha() {
  if (this.fechaInput) {
    const formattedFechaInput = new Date(this.fechaInput).toISOString().slice(0, 10);
    
    // Filtra los salones cuyas disponibilidades contienen la fecha ingresada.

    this.salones = this.salonesOriginal.filter((salon) =>
    
      salon.disponibilidadList.some(disponibilidad =>

        //console.log(new Date(disponibilidad.fecha).toISOString().slice(0, 10)),
        //new Date(this.fechaInput).toDateString()
        new Date(disponibilidad.fecha).toISOString().slice(0, 10) === formattedFechaInput,
        
      )
    );
  } else {
    // Si el campo de fecha está vacío, muestra todos los salones nuevamente.
    this.cargar(this.idUsuario);
  }
  this.fechaInput= "";
}


}
