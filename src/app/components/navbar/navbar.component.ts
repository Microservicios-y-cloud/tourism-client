import { Component } from '@angular/core';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private keycloakService: KeycloakService,
    private router: Router
  ) { }

  goToAccountManagement(): void {
    this.keycloakService.accountManagement();
  }

  verCarrito() {
    this.router.navigate(['/ver-carrito']);
  }

  verNotificaciones() {
    this.router.navigate(['/ver-notificaciones']);
  }

  verHistorial() {
    this.router.navigate(['/ver-servicios-comprados']);
  }
  logout() {
    this.keycloakService.logout();
    }
}
