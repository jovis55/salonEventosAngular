import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Disponibilidad } from '../models/disponibilidad';
@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

    
  private url:string="http://localhost:8080/disponibilidades"
  constructor(private http:HttpClient) { }
  

  createDispo(disponibilidad: Disponibilidad, idSalon: number): Observable<Disponibilidad> {
    
    return this.http.post<Disponibilidad>(this.url+"/createDisponibilidad/"+idSalon, disponibilidad);
}

  deleteDisponibilidad(id: number): Observable<void> {
  
  return this.http.delete<void>(this.url+"/"+id);
}
}
