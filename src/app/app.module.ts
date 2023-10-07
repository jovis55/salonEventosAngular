import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DuenioComponent } from './duenio/duenio.component';
import { SalonesDuenioComponent } from './salones-duenio/salones-duenio.component';
import { DataTransportService } from './services/data-transport.service';
import { RegistroSalonesComponent } from './registro-salones/registro-salones.component';

const routes:Routes=[
  { path: '', redirectTo: '/duenios', pathMatch: 'full' },
  {
    path: 'duenios/:id', component: DuenioComponent,
    children: [
      { path: 'salones', component: SalonesDuenioComponent },
      { path: 'salones/form', component: RegistroSalonesComponent },
      // Otras rutas secundarias dentro de 'duenios' si las necesitas
    ],
  },

  
  
]
@NgModule({
  declarations: [
    AppComponent,
    DuenioComponent,
    SalonesDuenioComponent,
    RegistroSalonesComponent,
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [DataTransportService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
