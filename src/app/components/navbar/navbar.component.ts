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
  public imagen: string = "../../../assets/user-default-icon.png" //Direccion de imagen por defecto
  userProfile: UserProfile | undefined;

  constructor(private keycloakService: KeycloakService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    if (this.userProfile?.attributes?.picture) {
      this.imagen = this.userProfile?.attributes?.picture[0]
    }
  }

  goToAccountManagement(): void {
    this.keycloakService.accountManagement();
  }

  verCarrito() {
    this.router.navigate(['/ver-carrito']);
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
