import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';
import { ServicioService } from '../services/servicio-service.service';
import { FoodService } from '../services/foodService';
import { AccomodationService } from '../services/accomodationService';
import { TransportationService } from '../services/transportationService';
import { FoodServiceResponse } from '../models/dto/FoodServiceResponse';
import { AccommodationServiceResponse } from '../models/dto/AccommodationServiceResponse';

import { KeycloakService } from '../keycloak/keycloak.service'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {
  public mostrarComprar = false

  miParametro: string = "";
  public servicio: ServiceResponse | null = null;
  public food: FoodServiceResponse | null = null;
  public accomodation: AccommodationServiceResponse | null = null;
  public transportation: TransportationServiceResponse | null = null;
  public cantidad = 1;

  constructor(
    private servicioService: ServicioService,
    private FoodService: FoodService,
    private AccomodationService: AccomodationService,
    private TransportService: TransportationService,
    private router: Router,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService
  ) { }

  public errorMessage: string | null = null;
  public isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.route.params.subscribe(params => {
      this.miParametro = params['idServicio'];
      console.log('Parámetro de URL:', this.miParametro);

      this.servicioService.getService(this.miParametro).subscribe(
        servicios => {
          this.servicio = servicios;
          this.isLoading = false;
        },
        error => {
          this.errorMessage = 'Error al obtener el servicio';
          this.isLoading = false;
        }
      );

      this.FoodService.getService(this.miParametro).subscribe(
        food => this.food = food,
        error => console.error('No tiene el servicio de comida:', error)
      );

      this.AccomodationService.getService(this.miParametro).subscribe(
        accommodation => this.accomodation = accommodation,
        error => console.error('No tiene el servicio de alojamiento:', error)
      );

      this.TransportService.getService(this.miParametro).subscribe(
        (transportation: TransportationServiceResponse) => {
          console.log(transportation.company);
          this.transportation = transportation;
        },
        error => console.error('No tiene el servicio de transporte:', error)
      );

      const userProfile = this.keycloakService.profile;
      for (const item of userProfile?.attributes?.userType ?? []) {
        if (item == 'customer') {
          this.mostrarComprar = true
        }
      }
    });
  }

  sumarCantidad() {
    this.cantidad += 1;
  }

  restarCantidad() {
    if (this.cantidad <= 1) {
      this.cantidad = 1;
    } else {
      this.cantidad -= 1;
    }
  }

  comprar() {
    // Implementar la lógica para comprar
  }

  add_carrito() {
    // Implementar la lógica para añadir al carrito
  }

  enviarPregunta() {
    const pregunta = document.getElementById('campo_de_texto') as HTMLInputElement;
    console.log(pregunta.value);
  }
}
