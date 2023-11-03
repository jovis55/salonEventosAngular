
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Disponibilidad } from '../models/disponibilidad';
import { Salones } from '../models/salones';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonesService } from '../services/salones.service';
import { Duenio } from '../models/duenio';

@Component({
  selector: 'app-calendario-salones',
  templateUrl: './calendario-salones.component.html',
  styleUrls: ['./calendario-salones.component.css']
})
export class CalendarioSalonesComponent implements OnInit {
  salon: Salones = new Salones();
  tipoUsuario: string = "";
  idDuenio: string = "";
  idSalon:number;
  @ViewChild('calendar') calendar: ElementRef;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: []
  };

  constructor(private route: ActivatedRoute, private router: Router, private salonService: SalonesService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(parentParams => {
      this.idDuenio = parentParams['id'];
      const dueniosSegment = this.route.parent.snapshot.url.find(segment => segment.path === 'duenios');
      if (dueniosSegment) {
        this.tipoUsuario = 'duenios'; 
      } else {
        this.tipoUsuario = ''; 
      }
    });
  
      this.route.params.subscribe(params => {
      const idSalon = +params['idSalon'];
      this.idSalon= idSalon;
    
      this.cargar(this.idSalon);
      });
    
  }
  navigateToNewDispo(idSalon: number) {
    this.router.navigate(['duenios',this.idDuenio, 'salones', 'formRegistro',idSalon,'dispo' ]);
  }

  cargar(idSalon: number): void {
    console.log("id del salón", idSalon);
    if (idSalon) {
      this.salonService.getSalon(idSalon).subscribe(
        (sal) => {
          this.salon = sal;
          console.log(this.salon.nombre);
          console.log(sal);
          this.loadAvailableDates();
        }
      );
    }
  }

  loadAvailableDates() {
    console.log("dispo última", this.salon.disponibilidadList);
    const events = [];

    for (const disponibilidad of this.salon.disponibilidadList) {
      if (disponibilidad.estado === 'libre') {
        events.push({
          title: 'Disponible ', // Espacio en blanco
          date: new Date(disponibilidad.fecha).toISOString().slice(0, 10),
          color: 'ForestGreen', // Color de fondo
          textColor: 'white' // Color del texto
        });
      }
    }

    console.log("eventos p", events);
    this.calendarOptions.events = events;
  }
}
