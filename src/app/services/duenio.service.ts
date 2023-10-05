import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Duenio } from '../models/duenio';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuenioService {

  private url:string="http://localhost:8080/duenios"
  constructor(private http:HttpClient) { 
  }

  getUsuario(idUsuario:string):Observable<Duenio>{
    return this.http.get<Duenio>(this.url+"/"+idUsuario);
  }

  
}
