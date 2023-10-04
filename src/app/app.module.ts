import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DuenioComponent } from './duenio/duenio.component';
import { SalonesDuenioComponent } from './salones-duenio/salones-duenio.component';
import { SalonEventoComponent } from './salon-evento/salon-evento.component';

const routes:Routes=[
  { path: '', redirectTo: '/duenios', pathMatch: 'full' },
  {
    path: 'duenios', component: DuenioComponent,
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
