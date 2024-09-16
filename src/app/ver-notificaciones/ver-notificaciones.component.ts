import { Component } from '@angular/core';
import { notification } from '../models/notification';

@Component({
  selector: 'app-ver-notificaciones',
  templateUrl: './ver-notificaciones.component.html',
  styleUrl: './ver-notificaciones.component.css'
})
export class VerNotificacionesComponent {
  public mostrarComentario = false;

  public listaNotificaciones: notification[] = [new notification(1,"Hello World","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid nulla consectetur harum dolorum esse maxime vitae. Laborum adipisci architecto ipsa suscipit magni excepturi obcaecati? Atque expedita id molestiae pariatur totam.", new Date())]
  constructor(

  ) {}

  deleteNotification(notificationToDelete: notification) {
    const index = this.listaNotificaciones.findIndex(notification => notification.id === notificationToDelete.id);

    if (index !== -1) {
      this.listaNotificaciones.splice(index, 1);
    }
  }
}