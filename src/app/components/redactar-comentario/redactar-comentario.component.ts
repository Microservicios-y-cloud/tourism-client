import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'redactar-comentario',
  templateUrl: './redactar-comentario.component.html',
  styleUrls: ['./redactar-comentario.component.css']
})
export class RedactarComentarioComponent {
  @Input() visible: boolean = false; // Permitir que el padre controle la visibilidad
  @Output() close = new EventEmitter<void>(); // Evento para notificar al padre

  public valoracion = 1;
  public text = '';

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
    this.close.emit(); // Emitir evento para que el componente padre pueda hacer algo si es necesario
  }
}
