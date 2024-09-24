import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../models/dto/Service';
import { TransportationService } from '../models/dto/TransportationService';
import { ServicioService } from '../services/servicio-service.service';
import { FoodServices } from '../services/foodServices';
import { AccomodationService } from '../services/accomodationService';
import { TransportationServices } from '../services/transportationServices';
import { FoodService } from '../models/dto/FoodService';
import { AccommodationService } from '../models/dto/AccommodationService';
import { Location } from '../models/dto/Location';

import { KeycloakService } from '../keycloak/keycloak.service'; // Ajusta la ruta según tu estructura de archivos
import { LocationService } from '../services/LocationService';
import { UserProfile } from '../keycloak/user-profile';
import { QuestionRequest } from '../models/dto/request/questionRequest';
import { Question } from '../models/dto/Question';
import { questionService } from '../services/questionService';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {
  userProfile: UserProfile | undefined;
  
  public mostrarComprar = false
  public ubicacion: Location = new Location(-1,'',0,0,'','','')

  miParametro: string = "";
  public servicio: Service = new Service('','',-1,this.ubicacion.id,new Date(),new Date(),'')

  public food: FoodService | null = null;
  public accomodation: AccommodationService | null = null;
  public transportation: TransportationService | null = null;

  public cantidad = 1;
  constructor(
    private questionService: questionService,
    private locationService: LocationService,
    private servicioService: ServicioService,
    private FoodServices: FoodServices,
    private AccomodationService: AccomodationService,
    private TransportService: TransportationServices,
    private router: Router,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService
  ) { }

  public errorMessage: string | null = null;
  public isLoading = true;

  ngOnInit(): void {
    this.questionService.findAll().subscribe(
      (data: Question[]) => {
        console.log(data);
        
      },
      (error: any) => {
        console.log(error);
      }
    );



    this.isLoading = true;
    this.errorMessage = null;

    this.route.params.subscribe(params => {
      this.miParametro = params['idServicio'];
      console.log('Parámetro de URL:', this.miParametro);

      this.servicioService.getService(this.miParametro).subscribe(
        servicios => {
          this.servicio = servicios;
          this.isLoading = false;
          this.locationService.getService(this.servicio.destinationId.toString()).subscribe(
            food => {
              this.ubicacion = food;
            },
            error => console.error('No tiene el servicio de comida:', error)
          );
          
        },
        error => {
          this.errorMessage = 'Error al obtener el servicio';
          this.isLoading = false;
        }
      );
      this.FoodServices.getService(this.miParametro).subscribe(
        food => {
          this.food = food;
        }
      );
      
      
      this.AccomodationService.getService(this.miParametro).subscribe(
        accommodation => this.accomodation = accommodation
      );

      this.TransportService.getService(this.miParametro).subscribe(
        (transportation: TransportationService) => {
          this.transportation = transportation;
        }
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
    
    this.userProfile?.id
    this.miParametro
    const pregunta = document.getElementById('campo_de_texto') as HTMLInputElement;
    if (this.userProfile && this.userProfile.id !== undefined) {
      let quest = new QuestionRequest(pregunta.value, new Date(),this.userProfile?.id,this.miParametro)

      //window.location.reload();
    }
  }
}