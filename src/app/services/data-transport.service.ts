import { Injectable } from '@angular/core';
import { Duenio } from '../models/duenio';

@Injectable({
  providedIn: 'root'
})
export class DataTransportService {
private duenio: Duenio;
  constructor() { }
  
  setDuenio(duenio: Duenio) {
    this.duenio = duenio;
  }

  getDuenio() {
    return this.duenio;
  }
}
