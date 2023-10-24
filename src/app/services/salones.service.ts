import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Salones } from '../models/salones';

@Injectable({
  providedIn: 'root'
})
export class SalonesService {
  
  private url:string="http://localhost:8080/salones"
  constructor(private http:HttpClient) { }

  createSalon(salon:Salones):Observable<Salones>{
    return this.http.post<Salones>(this.url, salon);
  }
  getSalon(idSalon:Number):Observable<Salones>{
    return this.http.get<Salones>(this.url+"/"+idSalon);
  }

  getSalones():Observable<Salones[]>{
    return this.http.get<Salones[]>(this.url);
  }

 

}
