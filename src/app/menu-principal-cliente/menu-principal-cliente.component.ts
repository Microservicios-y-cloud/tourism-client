import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-principal-cliente',
  templateUrl: './menu-principal-cliente.component.html',
  styleUrls: ['./menu-principal-cliente.component.css']
})
export class MenuPrincipalClienteComponent {
  showFilters: boolean = false;  // Inicialmente oculto

  toggleFilters(): void {
    this.showFilters = !this.showFilters;  // Cambia el estado de visibilidad
  }
}
