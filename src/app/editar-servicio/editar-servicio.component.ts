import { Component } from '@angular/core';
import { ServicioService } from '../services/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccomodationService } from '../services/accomodationService';
import { TransportationServices } from '../services/transportationServices';
import { FoodService } from '../models/dto/FoodService';
import { AccommodationService } from '../models/dto/AccommodationService';
import { TransportationService } from '../models/dto/TransportationService';
import { Question } from '../models/dto/Question';
import { FoodTypeService } from '../services/foodTypeService';
import { AccommodationTypeService } from '../services/AccommodationTypeService';
import { TransportTypeService } from '../services/TransportTypeService';
import { FoodType } from '../models/dto/FoodType';
import { AccommodationType } from '../models/dto/AccommodationType';
import { TransportType } from '../models/dto/TransportType';
import { Service } from '../models/dto/Service';
import { FoodServices } from '../services/foodServices';
import { Location } from '../models/dto/LocationResponse';
import { LocationService } from '../services/LocationService';


@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent {
  // Variables
  public ubicacion: Location = new Location(-1,'',0,0,'','','')
  miParametro: string = "";

  public foodTypes: FoodType[] = [];
  public locations: Location[] = []
  public accommodationTypes: AccommodationType[] = [];
  public transportTypes: TransportType[] = [];

  public alimentacionSelected = false;
  public alojamientoSelected = false;
  public transporteSelected = false;

  public ubicacionDelServicio = "";

  // Propiedades para el formulario
  public id = -1;
  public comentarios: Question[] = [];
  public preguntas: Question[] = [];

  public servicio: Service = new Service('', '', 0,0, new Date(), new Date(),'');
  public food: FoodService = new FoodService(this.servicio,0,'');
  public accomodation: AccommodationService = new AccommodationService(this.servicio,0,'',0);
  public transportation: TransportationService = new TransportationService(this.servicio,0,'','',0,'','');


  constructor(
    private locationService: LocationService,
    private servicioService: ServicioService,
    private FoodServices: FoodServices,
    private AccomodationService: AccomodationService,
    private TransportServices: TransportationServices,
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
  
      this.locationService.findAll().subscribe(
        (data: Location[]) => {
          this.locations = data;
          console.log(this.locations);
  
          // Asegúrate de que la ubicación del servicio esté correctamente asignada
          this.servicioService.getService(this.miParametro).subscribe(servicios => {
            this.servicio = servicios;
  
            this.food.service = servicios
            this.accomodation.service = servicios
            this.transportation.service = servicios
  
            // Encontrar la ubicación por defecto y asignarla
            const defaultLocation = this.locations.find(location => location.id === this.servicio.destinationId);
            if (defaultLocation) {
              this.ubicacion = defaultLocation;
            }
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
  
      // Resto de tu código de subscripción para servicios
    });
  }
  

  loadFoodTypes(): void {
    console.log(22);

    this.foodTypeService.findAll().subscribe(
      (data: FoodType[]) => {
        this.foodTypes = data;

      },
      (error: any) => {
        console.log(error);

      }
    );

    this.accommodationTypeService.findAll().subscribe(
      (data: AccommodationType[]) => {
        this.accommodationTypes = data;
      },
      (error: any) => {
        console.log(error);

      }
    );

    this.transportTypeService.findAll().subscribe(
      (data: TransportType[]) => {
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
    console.log(this.ubicacion);
    
    console.log(this.servicio);
    console.log(this.food);
    console.log(this.accomodation);
    console.log(this.transportation);
  }
}