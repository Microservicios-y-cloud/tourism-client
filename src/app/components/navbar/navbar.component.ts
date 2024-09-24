import { Component } from '@angular/core';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../keycloak/user-profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userProfile: UserProfile | undefined;

  constructor(private keycloakService: KeycloakService,
    private router: Router
  ) { }

  goToAccountManagement(): void {
    this.keycloakService.accountManagement();
  }

  verCarrito() {
    if (this.userProfile?.attributes?.userType == 'customer') {
      this.router.navigate(['/ver-carrito']);
    }
    else {
      alert("Como proveedor no tienes acceso a esta funcion")
    }
  }

  verNotificaciones() {
    if (this.userProfile?.attributes?.userType == 'customer') {
      this.router.navigate(['/ver-notificaciones']);
    }
    else {
      alert("Como proveedor no tienes acceso a esta funcion")
    }
  }

  verHistorial() {
    if (this.userProfile?.attributes?.userType == 'customer') {
      this.router.navigate(['/ver-servicios-comprados']);
    }
    else {
      alert("Como proveedor no tienes acceso a esta funcion")
    }
  }
  logout() {
    this.keycloakService.logout();
    }
}
