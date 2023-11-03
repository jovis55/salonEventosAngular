import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Salones } from '../models/salones';
import { SalonesService } from '../services/salones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Duenio } from '../models/duenio';
import { DuenioService } from '../services/duenio.service';
import { Calendar, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Disponibilidad } from '../models/disponibilidad';
import { DisponibilidadService } from '../services/disponibilidad.service';

@Component({
  selector: 'app-registro-salones',
  templateUrl: './registro-salones.component.html',
  styleUrls: ['./registro-salones.component.css']
})
export class RegistroSalonesComponent {

  duenio: Duenio ;
  salon: Salones = new Salones();
  selectedFile: File | null = null;


  constructor(private route: ActivatedRoute, private salonesService: SalonesService, private router: Router, private duenioService: DuenioService, private dispoService: DisponibilidadService) {}

  ngOnInit(): void{
    const initialId = this.route.snapshot.parent.params['id'];
    this.cargar(initialId);

  }

  
  

 
  create(): void {
    if (this.selectedFile) {
      this.salon.duenio = this.duenio;
      console.log(this.salon.capacidad);
      // Crea un objeto FormData y agrega el archivo seleccionado
      const formData = new FormData();
      formData.set('imagen', this.selectedFile);
      formData.set('nombre', this.salon.nombre);
      formData.set('capacidad', this.salon.capacidad.toString()); // Asegúrate de que sea una cadena
      formData.set('ubicacion', this.salon.ubicacion);
      formData.set('servicioIncluido', this.salon.servicioIncluido);
      formData.set('duenio', this.salon.duenio.idUsuario)
      

      console.log(formData.get('nombre'));

    
      console.log(this.salon.duenio);
      this.salon.duenio = this.duenio;
      this.salonesService.createSalon(formData).subscribe(
        (salonCreado) => {
          console.log(formData);
          this.router.navigate(['duenios', this.salon.duenio.idUsuario, 'salones', 'formRegistro', salonCreado.idSalon, 'dispo']);
        },
        (error) => {
          console.error('Error al crear el salón:', error);
        }
      );
     
    
    } else {
        console.error('No se seleccionó ningún archivo.');
      }
    }
  
    

     
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  cargar(initialId): void {
    const idUsuario = initialId;
    if (idUsuario) {
      this.duenioService.getUsuario(idUsuario).subscribe(
        (due) => {
          this.duenio = due;
        }
      )
    }
  }

}