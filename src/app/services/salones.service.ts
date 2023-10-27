import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Salones } from '../models/salones';
import { Duenio } from '../models/duenio';

@Injectable({
  providedIn: 'root'
})
export class SalonesService {
  
  private url:string="http://localhost:8080/salones"
  constructor(private http:HttpClient) { }
  
  createSalon(formData: FormData): Observable<Salones> {
    return this.http.post<Salones>(this.url, formData);
  }
  getSalon(idSalon:Number):Observable<Salones>{
    return this.http.get<Salones>(this.url+"/"+idSalon);
  }

  getSalones():Observable<Salones[]>{
    return this.http.get<Salones[]>(this.url);
  }

 

}
