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

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css'] // Corrige la extensión del archivo de estilos
})
export class CrearServicioComponent implements OnInit {
  // Variables
  public a = ''
  public ubicacion: Location = new Location(-1,'',0,0,'','','')
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

  public servicio: Service = new Service('','',1,this.ubicacion.id,new Date(),new Date(),'')

  public food: FoodService = new FoodService(this.servicio,0,'');
  public accomodation: AccommodationService = new AccommodationService(this.servicio,0,'',0);
  public transportation: TransportationService = new TransportationService(this.servicio,0,'','',0,'','');


  constructor(
    private locationService: LocationService,
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

  crear(): void {
    console.log(this.ubicacion);
    
    console.log(this.servicio);
    console.log(this.food);
    console.log(this.accomodation);
    console.log(this.transportation);
  }
}