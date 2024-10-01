import { Component } from '@angular/core';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperService } from '../model/SuperService';

@Component({
  selector: 'app-ver-servicios-comprados',
  templateUrl: './ver-servicios-comprados.component.html',
  styleUrls: ['./ver-servicios-comprados.component.css']
})
export class VerServiciosCompradosComponent {
  public mostrarComentario = false;

  public visible:boolean = false

  public valoracion = 1;
  public text = '';

  public listaServicios: SuperService[] = []
  constructor(
    private servicioService: ServicioService,
    private router: Router,  private route: ActivatedRoute
  ) {}

  realizarComentario(id: number) {
    this.visible = true; // Mostrar el componente para redactar comentario
  }

  cerrarComentario() {
    this.visible = false; // Cerrar el componente
  }

  

  actualizarPuntaje(num: number) {
    this.valoracion = num;
  }

  enviar() {
    if (this.text.trim() === '') {
      console.log('El comentario está vacío.');
      return;
    }
    console.log('Valoración:', this.valoracion);
    console.log('Comentario:', this.text);
    // Aquí podrías realizar la acción para enviar el comentario
    this.cerrar(); // Cerrar el popup después de enviar
  }

  cerrar() {
    this.visible = false;
  }
}