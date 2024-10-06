import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() popupText: string = ''; // Propiedad para recibir el texto
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
