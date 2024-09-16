import { Component } from '@angular/core';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { ServicioService } from '../services/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-servicios-comprados',
  templateUrl: './ver-servicios-comprados.component.html',
  styleUrls: ['./ver-servicios-comprados.component.css']
})
export class VerServiciosCompradosComponent {
  public mostrarComentario = false;

  public listaServicios: ServiceResponse[] = []
  constructor(
    private servicioService: ServicioService,
    private router: Router,  private route: ActivatedRoute
  ) {}

  realizarComentario(id: number) {
    this.mostrarComentario = true; // Mostrar el componente para redactar comentario
  }

  cerrarComentario() {
    this.mostrarComentario = false; // Cerrar el componente
  }
}
