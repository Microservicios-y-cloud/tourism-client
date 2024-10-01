import { Component } from '@angular/core';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccomodationService } from '../backEndServices/accomodationService';
import { TransportationServices } from '../backEndServices/transportationServices';
import { FoodTypeService } from '../backEndServices/foodTypeService';
import { AccommodationTypeService } from '../backEndServices/AccommodationTypeService';
import { TransportTypeService } from '../backEndServices/TransportTypeService';
import { FoodServices } from '../backEndServices/foodServices';
import { LocationService } from '../backEndServices/LocationService';


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

  }
  

  loadFoodTypes(): void {

  }

  cambiarCheck(serviceType: string): void {

  }

  actualizar(): void {

  }
}