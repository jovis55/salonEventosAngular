import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Salones } from '../models/salones';
import { Duenio } from '../models/duenio';
import { Disponibilidad } from '../models/disponibilidad';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalonesService {
  
  private url:string="http://localhost:8080/salones";
  
  constructor(private http:HttpClient) { }
  createSalonService(salon: Salones ): Observable<Salones> {
    console.log("esta es la dispo guardadada" ,salon.disponibilidadList)
    return this.http.put<Salones>(this.url+"/crearSalonDispo", salon);
  }
  
  createSalon(formData: FormData): Observable<Salones> {
    return this.http.post<Salones>(this.url, formData);
  }
  actualizarDisponibilidades(idSalon: number, nuevasDisponibilidades: Disponibilidad[]): Observable<any> {
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  console.log(nuevasDisponibilidades)
    return this.http.put(this.url+"/"+idSalon+"/actualizar-disponibilidades", nuevasDisponibilidades, httpOptions);
  }
  
  getSalon(idSalon:Number):Observable<Salones>{
    return this.http.get<Salones>(this.url+"/"+idSalon);
  }

  getSalones():Observable<Salones[]>{
    return this.http.get<Salones[]>(this.url);
  }

  eliminarSalon(idSalon: number): Observable<string> {
    return this.http.delete<string>(this.url+"/"+idSalon);
  }

 

}
