import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { Router, ActivatedRoute } from '@angular/router';
import { FoodTypeService } from '../services/foodTypeService'; // Corrige la ruta según tu estructura de carpetas
import { FoodType } from '../models/dto/FoodType';
import { AccommodationService} from '../models/dto/AccommodationService';
import { TransportationService } from '../models/dto/TransportationService';
import { Question } from '../models/dto/Question';
import { AccommodationType } from '../models/dto/AccommodationType';
import { AccommodationTypeService } from '../services/AccommodationTypeService';
import { TransportTypeService } from '../services/TransportTypeService';
import { TransportType } from '../models/dto/TransportType';
import { LocationService } from '../services/LocationService';
import { Location } from '../models/dto/LocationResponse';
import { Service } from '../models/dto/Service';
import { FoodService } from '../models/dto/FoodService';
import { FoodServices } from '../services/foodServices';
import { FoodServiceRequest } from '../models/dto/request/FoodServiceRequest';
import { AccomodationService } from '../services/accomodationService';
import { AccomoationServiceRequest } from '../models/dto/request/AccommodationServiceRequest';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css'] // Corrige la extensión del archivo de estilos
})
export class CrearServicioComponent implements OnInit {
  // Variables
  public a = ''
  public ubicacion: Location = new Location(9,'',0,0,'','','')
  public locations: Location[] = []
  public foodTypes: FoodType[] = [];
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

  public servicio: Service = new Service('','ggg',1,this.ubicacion.id,new Date(),new Date(),'')

  public food: FoodService = new FoodService(this.servicio,0,'');
  public accomodation: AccommodationService = new AccommodationService(this.servicio,0,'',0);
  public transportation: TransportationService = new TransportationService(this.servicio,0,'','',0,'','');


  constructor(
    private locationService: LocationService,
    private foodService: FoodServices,
    private accomodationService: AccomodationService,
    private foodTypeService: FoodTypeService,
    private accommodationTypeService: AccommodationTypeService,
    private transportTypeService: TransportTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadFoodTypes();
  }

  loadFoodTypes(): void {
    console.log(22);

    this.locationService.findAll().subscribe(
      (data: Location[]) => {
        this.locations = data;
        console.log(this.locations);
        
      },
      (error: any) => {
        console.log(error);

      }
    );

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
    // Desmarcar todas las opciones
    this.alimentacionSelected = false;
    this.alojamientoSelected = false;
    this.transporteSelected = false;
  
    // Marcar solo la opción seleccionada
    switch (serviceType) {
      case 'alimentacion':
        this.alimentacionSelected = true;
        break;
      case 'alojamiento':
        this.alojamientoSelected = true;
        break;
      case 'transporte':
        this.transporteSelected = true;
        break;
    }
  }
  

  crear(): void {
    console.log(this.ubicacion);
    console.log(this.servicio);
    
    if (this.alimentacionSelected) {
      console.log(this.food);

      this.servicio.supplierId = "2"
      let send = new FoodServiceRequest(this.servicio.name,this.servicio.description,this.servicio.unitValue,this.ubicacion.id,"2024-08-20T00:00:00Z","2024-09-20T00:00:00Z","1",this.food.foodTypeId);
      this.foodService.create(send).subscribe(
        (response: FoodServiceRequest) => {
          console.log('Servicio creado con éxito:', response);
        },
        (error: any) => {
          console.error('Error al crear el servicio:', error);
        }
      );
    }
    
    if (this.alojamientoSelected) {
    }
    
    if (this.transporteSelected) {
      console.log(this.transportation);
    }
  }
  
}