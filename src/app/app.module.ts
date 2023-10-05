import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DuenioComponent } from './duenio/duenio.component';
import { SalonesDuenioComponent } from './salones-duenio/salones-duenio.component';
import { SalonEventoComponent } from './salon-evento/salon-evento.component';
import { DataTransportService } from './services/data-transport.service';

const routes:Routes=[
  { path: '', redirectTo: '/duenios', pathMatch: 'full' },
  {
    path: 'duenios/:id', component: DuenioComponent,
    children: [
      { path: 'salones', component: SalonesDuenioComponent },
      // Otras rutas secundarias dentro de 'duenios' si las necesitas
    ],
  },

  
  
]
@NgModule({
  declarations: [
    AppComponent,
    DuenioComponent,
    SalonesDuenioComponent,
    SalonEventoComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [DataTransportService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
