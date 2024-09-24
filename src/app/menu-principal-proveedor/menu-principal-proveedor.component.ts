import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../services/servicio-service.service';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../keycloak/user-profile';
import { KeycloakService } from '../keycloak/keycloak.service';

@Component({
  selector: 'app-menu-principal-proveedor',
  templateUrl: './menu-principal-proveedor.component.html',
  styleUrls: ['./menu-principal-proveedor.component.css'] // Cambié styleUrl a styleUrls
})
export class MenuPrincipalProveedorComponent implements OnInit { // Implementa OnInit
  userProfile: UserProfile | undefined;
  public listaServiciosDelProveedor: ServiceResponse[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    console.log(this.userProfile?.attributes?.userType == 'supplier');
    
    if (this.userProfile && this.userProfile.id !== undefined && this.userProfile?.attributes?.userType == 'supplier') {
      this.servicioService.findAllBySupplier(this.userProfile.id).subscribe(
        lista => {
          this.listaServiciosDelProveedor = lista; // Asigna la respuesta a la variable
          console.log(22);
          
          console.log(this.listaServiciosDelProveedor); // Muestra la lista en la consola
        },
        error => {
          console.error("Error al obtener los servicios:", error); // Manejo de errores
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
    // Implementar la lógica para editar
  }

  borrar() {
    // Implementar la lógica para borrar
  }
}
