import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() popupText: string = ''; // Propiedad para recibir el texto
  @Output() close = new EventEmitter<void>();
  @Output() stay = new EventEmitter<void>(); // Emite el evento para permanecer en la misma pantalla

  onClose(): void {
    // Emitir evento para cerrar
    this.close.emit();
  }

  onStay(): void {
    // Emitir evento para permanecer en la misma pantalla
    this.stay.emit();
  }
}
