import { Component } from '@angular/core';
import { KeycloakService } from '../../keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private keycloakService: KeycloakService) { }

  goToAccountManagement(): void {
    this.keycloakService.accountManagement();
  }
}
