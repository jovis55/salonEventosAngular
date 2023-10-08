import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DuenioComponent } from './duenio/duenio.component';
import { SalonesDuenioComponent } from './salones-duenio/salones-duenio.component';
import { RegistroSalonesComponent } from './registro-salones/registro-salones.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SalonesClienteComponent } from './salones-cliente/salones-cliente.component';
import { SalonDetallesComponent } from './salon-detalles/salon-detalles.component';

//RUTAS PARA INGRESAR A LA VENTANA DE DUENIO Y SUS OPCIONES
 /**
const routes:Routes=[
  { path: '', redirectTo: '/duenios', pathMatch: 'full' },
  {
    path: 'duenios/:id', component: DuenioComponent,
    children: [
      { path: 'salones', component: SalonesDuenioComponent },
      { path: 'salones/form', component: RegistroSalonesComponent },
      // Otras rutas secundarias dentro de 'duenios' 
    ],
  },
]
*/

const routes:Routes=[
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  {
    path: 'clientes/:id', component: ClienteComponent,
    children: [
      { path: 'salones', component: SalonesClienteComponent },
      { path: 'salones/:idSalon', component: SalonDetallesComponent },
      // Otras rutas secundarias dentro de 'clientes' 
    ],
  },
]

  
  

@NgModule({
  declarations: [
    AppComponent,
    DuenioComponent,
    SalonesDuenioComponent,
    RegistroSalonesComponent,
    ClienteComponent,
    SalonesClienteComponent,
    SalonDetallesComponent,
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
