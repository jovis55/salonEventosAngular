import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string="http://localhost:8080/clientes"
  constructor(private http:HttpClient) { 
  }

  getUsuario(idUsuario:string):Observable<Cliente>{
    return this.http.get<Cliente>(this.url+"/"+idUsuario);
  }

}
