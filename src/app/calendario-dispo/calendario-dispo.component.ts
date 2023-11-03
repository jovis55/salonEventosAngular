import { Component,  ElementRef, AfterViewInit } from '@angular/core';
import { Disponibilidad } from '../models/disponibilidad';
import { Salones } from '../models/salones';
import { SalonesService } from '../services/salones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Duenio } from '../models/duenio';
import { DuenioService } from '../services/duenio.service';
import { Calendar, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-calendario-dispo',
  templateUrl: './calendario-dispo.component.html',
  styleUrls: ['./calendario-dispo.component.css']
})
export class CalendarioDispoComponent {
  salon: Salones = new Salones();
  dispoAnterior:Disponibilidad[];
  bool1: boolean;
  salonActualizado : Salones = new Salones();
  selectedDates: Date[] = [];
  selectedDatesnteriores: Date[] = [];
  calendar: Calendar;
  num: number = 0;
  num2: number = 1;
  idSalon: number;


  constructor(private route: ActivatedRoute, private salonesService: SalonesService, private router: Router, private duenioService: DuenioService, private dispoService: DisponibilidadService) {}

  ngAfterViewInit() {
    this.calendar = new Calendar(document.getElementById('calendar'), {
      initialView: 'dayGridMonth',
      selectable: true,
      plugins: [dayGridPlugin, interactionPlugin],
      events: [],
      
    });
  

    this.calendar.on('select', (info) => {
      const selectedDate = info.start;
     const existingIndex = this.selectedDates.findIndex(date => date.getTime() === selectedDate.getTime());
    if ((existingIndex === -1)) {
      this.bool1 = false
    }
    else{
      this.bool1 = true;
    }
      if (this.num === 0 && this.bool1==false) {
        this.selectedDates.push(selectedDate);
     
      } else if(this.num === 0 && this.bool1 == true){
        this.selectedDates.splice(existingIndex, 1);
      }
      
    });

    this.calendar.render();
  }




  ngOnInit() {
    const parentParams = this.route.parent.snapshot.params;
    const idSalon = this.route.snapshot.params['idSalon'];
    console.log("ID", idSalon);
    this.cargar(idSalon);
    this.idSalon = idSalon;
  }
  obtenerListaAnterior(){
    for (const disponibilidad of this.dispoAnterior) {
      if (disponibilidad.fecha instanceof Date) {
        this.agregarFechaSinDuplicaciones(disponibilidad.fecha);
      } else if (typeof disponibilidad.fecha === 'string') {
        const fechaDate = new Date(disponibilidad.fecha);
        if (!isNaN(fechaDate.getTime())) {
          this.agregarFechaSinDuplicaciones(fechaDate);
        }
      }

      this.dispoService.deleteDisponibilidad(disponibilidad.idDisponibilidad).subscribe(() => {
        console.log('Disponibilidad eliminada con éxito.');
        // Realiza acciones adicionales después de eliminar la disponibilidad si es necesario.
      });
    }
  }
  agregarFechaSinDuplicaciones(fecha: Date) {
    // Verifica si la fecha ya está en selectedDates antes de agregarla
    if (!this.selectedDates.find(date => date.getTime() === fecha.getTime())) {
      this.selectedDates.push(fecha);
    }}

  actualizarDisponibilidades(): void {
    this.cargarListaDisp().subscribe(
      (disponibilidades) => {
        console.log("listaRep",disponibilidades);
        this.salonesService.actualizarDisponibilidades(this.idSalon, disponibilidades)
          .subscribe(salonActualizado => {


            this.salonActualizado = salonActualizado;
            console.log("prueba no sirve",this.salonActualizado.disponibilidadList);
            console.log('Salon actualizado:', salonActualizado);
            this.router.navigate(['duenios', '12334', 'salones']);
          }, error => {
            // Manejar errores, si es necesario
          });
      },
      (error) => {
        // Manejar errores de creación de disponibilidades, si es necesario
      }
    );
  }
 
  
  
  cargarListaDisp(): Observable<Disponibilidad[]> {
    const observables: Observable<Disponibilidad>[] = [];
   
    for (const selectedDate of this.selectedDates) {
      const dispoPrueba = new Disponibilidad();
      dispoPrueba.estado = "libre";
      dispoPrueba.fecha = selectedDate;
      dispoPrueba.hora = "tiempo completo";
      

      const observable = this.dispoService.createDispo(dispoPrueba, this.idSalon);
      
      observables.push(observable);
    }

    return forkJoin(observables);
  }  
  cargar(initialId): void {
    let idSalon = initialId;
    if (idSalon) {
      this.salonesService.getSalon(idSalon).subscribe(
        (sal) => {
          this.salon = sal;
          this.dispoAnterior= this.salon.disponibilidadList;
          console.log(this.salon.disponibilidadList);
          this.obtenerListaAnterior();
        }
      );
    }
  }
}