import { Component } from '@angular/core';
import { ServiceResponse } from '../models/ServiceResponse';
import { FoodServiceResponse } from '../models/FoodServiceResponse';
import { AccommodationServiceResponse } from '../models/AccommodationServiceResponse';
import { TransportationServiceResponse } from '../models/TransportationServiceResponse';
import { QuestionResponse } from '../models/QuestionResponse';
@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrl: './crear-servicio.component.css'
})
export class CrearServicioComponent {
  // Variables
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

  ngOnInit(): void {
   
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

  crear() {
  }
}
