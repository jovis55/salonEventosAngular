import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';




import { AppComponent } from './app.component';
import { DuenioComponent } from './duenio/duenio.component';
import { SalonesDuenioComponent } from './salones-duenio/salones-duenio.component';
import { RegistroSalonesComponent } from './registro-salones/registro-salones.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SalonesClienteComponent } from './salones-cliente/salones-cliente.component';
import { SalonDetallesComponent } from './salon-detalles/salon-detalles.component';
import { UsuarioLoginComponent} from './usuario-login/usuario-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { RegistroDuenioComponent } from './registro-duenio/registro-duenio.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { CalendarioSalonesComponent } from './calendario-salones/calendario-salones.component';
import { CalendarioDispoComponent } from './calendario-dispo/calendario-dispo.component';



const routes:Routes=[
  { path: '', redirectTo: '/loginUsuario', pathMatch: 'full' },

  {
    path: 'loginUsuario', component: UsuarioLoginComponent,
    
    
  },
  {
    path: 'rol', component: TipoUsuarioComponent,
    
    
  },
  {
    path: 'registroDuenio', component: RegistroDuenioComponent,
    
  },
  {
    path: 'registroCliente', component: RegistroClienteComponent,
    
  },
 
  {
    path: 'clientes/:id', component: ClienteComponent,
    
    children: [
      { path: 'salones', component: SalonesClienteComponent },
      { path: 'salones/:idSalon', component: SalonDetallesComponent },
      { path: 'salones/:idSalon/dis', component: CalendarioSalonesComponent },

      // Otras rutas secundarias dentro de 'clientes' 
    ],

  },
  {
    path: 'duenios/:id', component: DuenioComponent,
    children: [
      { path: 'salones', component: SalonesDuenioComponent },
      { path: 'salones/formRegistro', component: RegistroSalonesComponent},
      { path: 'salones/:idSalon', component: SalonDetallesComponent },
      { path: 'salones/formRegistro/:idSalon/dispo', component: CalendarioDispoComponent},
      { path: 'salones/:idSalon/dis', component: CalendarioSalonesComponent },
      // Otras rutas secundarias dentro de 'duenios' 
    ],
  }
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
    UsuarioLoginComponent,
    RegistroClienteComponent,
    RegistroDuenioComponent,
    TipoUsuarioComponent,
    CalendarioSalonesComponent,
    CalendarioDispoComponent,

    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FullCalendarModule


    
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
