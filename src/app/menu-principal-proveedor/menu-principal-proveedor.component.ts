import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../keycloak/user-profile';
import { KeycloakService } from '../keycloak/keycloak.service';
import { SuperService } from '../model/SuperService';

@Component({
  selector: 'app-menu-principal-proveedor',
  templateUrl: './menu-principal-proveedor.component.html',
  styleUrls: ['./menu-principal-proveedor.component.css']
})
export class MenuPrincipalProveedorComponent implements OnInit {
  userProfile: UserProfile | undefined;
  public listaServiciosDelProveedor: SuperService[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    
    if (this.userProfile && this.userProfile.id !== undefined && this.userProfile?.attributes?.userType == 'supplier') {
      console.log(this.userProfile.id);
      
      this.servicioService.findAllBySupplier(this.userProfile.id).subscribe(
        data => {
          console.log(data); 
          this.listaServiciosDelProveedor = data
        },
        error => {
          console.error('Error fetching services:', error);
        }
      );
    } else {
      alert("Si esta alerta de seguridad aparece, es porque hay un error de seguridad");
    }
  }

  add() {
    this.router.navigate([`crear-servicio`]);
  }

  editar() {

  }

  borrar() {

  }
}
