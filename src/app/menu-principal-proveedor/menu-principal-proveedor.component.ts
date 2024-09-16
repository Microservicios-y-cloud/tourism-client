import { Component } from '@angular/core';
import { ServicioService } from '../services/servicio-service.service';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal-proveedor',
  templateUrl: './menu-principal-proveedor.component.html',
  styleUrl: './menu-principal-proveedor.component.css'
})
export class MenuPrincipalProveedorComponent {
  //variables

  public listaServiciosDelProveedor: ServiceResponse[] = []
  constructor(
    private servicioService: ServicioService,
    private router: Router,  private route: ActivatedRoute
  ) {}


  ngOnInit():void {
  }

  add() {
    this.router.navigate([`crear-servicio`]);
  }

  editar() {
  }
  borrar() {
  }
}