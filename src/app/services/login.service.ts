import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string="http://localhost:8080/usuarios"
  constructor(private http:HttpClient) { 

  }
  
  getUsuario(idUsuario:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.url+"/"+idUsuario);
  }
}
