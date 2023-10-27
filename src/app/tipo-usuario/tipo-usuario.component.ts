import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent {
  rol: string;
  constructor(private route: ActivatedRoute, private router:Router){}

  ngOnInit(): void{}



  siguientePaso() {
    if (this.rol === 'DUENIO') {
      this.router.navigate(['registroDuenio']);
    } else if (this.rol === 'CLIENTE') {
      this.router.navigate(['registroCliente']);
    }
  }

}
