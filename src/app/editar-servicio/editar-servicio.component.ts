import { Component } from '@angular/core';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { ServicioService } from '../services/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/foodService';
import { AccomodationService } from '../services/accomodationService';
import { TransportationService } from '../services/transportationService';
import { FoodServiceResponse } from '../models/dto/FoodServiceResponse';
import { AccommodationServiceResponse } from '../models/dto/AccommodationServiceResponse';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';
import { QuestionResponse } from '../models/dto/QuestionResponse';
import { FoodTypeService } from '../services/foodTypeService';
import { AccommodationTypeService } from '../services/AccommodationTypeService';
import { TransportTypeService } from '../services/TransportTypeService';
import { FoodTypeResponse } from '../models/dto/FoodTypeResponse';
import { AccommodationTypeResponse } from '../models/dto/AccommodationTypeResponse';
import { TransportTypeResponse } from '../models/dto/TransportTypeResponse';


@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent {
  // Variables
  miParametro: string = "";

  public foodTypes: FoodTypeResponse[] = [];
  public accommodationTypes: AccommodationTypeResponse[] = [];
  public transportTypes: TransportTypeResponse[] = [];

  public alimentacionSelected = false;
  public alojamientoSelected = false;
  public transporteSelected = false;

  public ubicacionDelServicio = "";

  // Propiedades para el formulario
  public id = -1;
  public comentarios: QuestionResponse[] = [];
  public preguntas: QuestionResponse[] = [];

  public servicio: ServiceResponse = new ServiceResponse(0, '', '', 0, '', '', '');
  public food: FoodServiceResponse = new FoodServiceResponse(this.servicio,0,'');
  public accomodation: AccommodationServiceResponse = new AccommodationServiceResponse(this.servicio,0,'',0);
  public transportation: TransportationServiceResponse = new TransportationServiceResponse(this.servicio,0,'','',0,'','');


  constructor(
    private servicioService: ServicioService,
    private FoodService: FoodService,
    private AccomodationService: AccomodationService,
    private TransportService: TransportationService,
    private foodTypeService: FoodTypeService,
    private accommodationTypeService: AccommodationTypeService,
    private transportTypeService: TransportTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadFoodTypes();

    this.route.params.subscribe(params => {
      this.miParametro = params['idServicio'];
      console.log('Parámetro de URL:', this.miParametro);

      this.servicioService.getService(this.miParametro).subscribe(servicios => {
        this.servicio = servicios;

        this.food.serviceResponse = servicios
        this.accomodation.serviceResponse = servicios
        this.transportation.serviceResponse = servicios
      });


      this.FoodService.getService(this.miParametro).subscribe(
        food => {
          this.food = food;
        },
        error => console.error('No tiene el servicio de comida:', error)
      );

      this.AccomodationService.getService(this.miParametro).subscribe(
        accommodation => {
          this.accomodation = accommodation;
        },
        error => console.error('No tiene el servicio de alojamiento:', error)
      );
      
      this.TransportService.getService(this.miParametro).subscribe(
        (transportation: TransportationServiceResponse) => {
          this.transportation = transportation;
        },
        error => console.error('No tiene el servicio de transporte:', error)
      );



    });
  }

  loadFoodTypes(): void {
    console.log(22);

    this.foodTypeService.findAll().subscribe(
      (data: FoodTypeResponse[]) => {
        this.foodTypes = data;

      },
      (error: any) => {
        console.log(error);

      }
    );

    this.accommodationTypeService.findAll().subscribe(
      (data: AccommodationTypeResponse[]) => {
        this.accommodationTypes = data;
      },
      (error: any) => {
        console.log(error);

      }
    );

    this.transportTypeService.findAll().subscribe(
      (data: TransportTypeResponse[]) => {
        this.transportTypes = data;
      },
      (error: any) => {
        console.log(error);

      }
    );
  }

  cambiarCheck(serviceType: string): void {
    switch (serviceType) {
      case 'alimentacion':
        this.alimentacionSelected = !this.alimentacionSelected;
        break;
      case 'alojamiento':
        this.alojamientoSelected = !this.alojamientoSelected;
        break;
      case 'transporte':
        this.transporteSelected = !this.transporteSelected;
        break;
    }
  }

  actualizar(): void {
    console.log(this.servicio);
    console.log(this.food);
    console.log(this.accomodation);
    console.log(this.transportation);
  }
}