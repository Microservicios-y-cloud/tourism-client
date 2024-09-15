import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../services/servicio-service.service';
import { ServiceResponse } from '../models/service-response';

@Component({
  selector: 'app-menu-principal-cliente',
  templateUrl: './menu-principal-cliente.component.html',
  styleUrls: ['./menu-principal-cliente.component.css']
})
export class MenuPrincipalClienteComponent implements OnInit {

  
  servicios: ServiceResponse[] = [];

  constructor(
    private servicioService: ServicioService,
  ) { }

  ngOnInit(): void {
    this.servicioService.listarServicios().subscribe(servicios => this.servicios = servicios);
  }
}
