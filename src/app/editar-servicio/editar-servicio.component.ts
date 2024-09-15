import { Component } from '@angular/core';
import { ServiceResponse } from '../models/ServiceResponse';
import { ServicioService } from '../services/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/foodService';
import { AccomodationService } from '../services/accomodationService';
import { TransportationService } from '../services/transportationService';
import { FoodServiceResponse } from '../models/FoodServiceResponse';
import { AccommodationServiceResponse } from '../models/AccommodationServiceResponse';
import { TransportationServiceResponse } from '../models/TransportationServiceResponse';
import { QuestionResponse } from '../models/QuestionResponse';


@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent {
  // Variables
  miParametro: string = "";
  public alimentacionSelected = false;
  public alojamientoSelected = false;
  public transporteSelected = false;

  public ubicacionDelServicio = "";

  // Propiedades para el formulario
  public id = -1
  public comentarios: QuestionResponse[] = []
  public preguntas: QuestionResponse[] = []

  public servicio: ServiceResponse | null = null;
  public food: FoodServiceResponse | null = null;
  public accomodation: AccommodationServiceResponse | null = null;
  public transportation: TransportationServiceResponse | null = null;


  constructor(
    private servicioService: ServicioService,
    private FoodService: FoodService,
    private AccomodationService: AccomodationService,
    private TransportService: TransportationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.miParametro = params['idServicio'];
      console.log('Parámetro de URL:', this.miParametro);

      this.servicioService.getService(this.miParametro).subscribe(servicios => this.servicio = servicios);
      
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
          console.log(transportation.company); // Ahora debería funcionar
          this.transportation = transportation;
        },
        error => console.error('No tiene el servicio de transporte:', error)
      );
    });
  }

  cambiarCheck(serviceType: string) {
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

  actualizar() {
  }
}
