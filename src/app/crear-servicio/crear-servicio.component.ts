import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { Router, ActivatedRoute } from '@angular/router';
import { FoodTypeService } from '../services/foodTypeService'; // Corrige la ruta según tu estructura de carpetas
import { FoodTypeResponse } from '../models/dto/FoodType';
import { ServiceResponse } from '../models/ServiceResponse';
import { FoodServiceResponse } from '../models/dto/FoodServiceResponse';
import { AccommodationServiceResponse } from '../models/dto/AccommodationServiceResponse';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';
import { QuestionResponse } from '../models/dto/QuestionResponse';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css'] // Corrige la extensión del archivo de estilos
})
export class CrearServicioComponent implements OnInit {
  // Variables
  public foodTypes: FoodTypeResponse[] = [];

  public alimentacionSelected = false;
  public alojamientoSelected = false;
  public transporteSelected = false;

  public ubicacionDelServicio = "";

  // Propiedades para el formulario
  public id = -1;
  public comentarios: QuestionResponse[] = [];
  public preguntas: QuestionResponse[] = [];

  public servicio: ServiceResponse | null = null;
  public food: FoodServiceResponse | null = null;
  public accomodation: AccommodationServiceResponse | null = null;
  public transportation: TransportationServiceResponse | null = null;

  constructor(
    private foodTypeService: FoodTypeService, // Cambiado a camelCase
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadFoodTypes();
  }

  loadFoodTypes(): void {
    this.foodTypeService.findAll().subscribe(
      (data: FoodTypeResponse[]) => {
        this.foodTypes = data;
      },
      (error: any) => {
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
  }
}
