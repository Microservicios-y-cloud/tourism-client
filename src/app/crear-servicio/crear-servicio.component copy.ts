import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { Router, ActivatedRoute } from '@angular/router';
import { FoodTypeService } from '../services/foodTypeService'; // Corrige la ruta según tu estructura de carpetas
import { FoodTypeResponse } from '../models/dto/FoodTypeResponse';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { FoodServiceResponse } from '../models/dto/FoodServiceResponse';
import { AccommodationServiceResponse } from '../models/dto/AccommodationServiceResponse';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';
import { QuestionResponse } from '../models/dto/QuestionResponse';
import { AccommodationTypeResponse } from '../models/dto/AccommodationTypeResponse';
import { AccommodationTypeService } from '../services/AccommodationTypeService';
import { TransportTypeService } from '../services/TransportTypeService';
import { TransportTypeResponse } from '../models/dto/TransportTypeResponse';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css'] // Corrige la extensión del archivo de estilos
})
export class CrearServicioComponent implements OnInit {
  // Variables
  public a = ''

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

  crear(): void {
    console.log(this.servicio);
    console.log(this.food);
    console.log(this.accomodation);
    console.log(this.transportation);
  }
}
