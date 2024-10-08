import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Asegúrate de importar OnInit
import { Router, ActivatedRoute } from '@angular/router';
import { FoodTypeService } from '../backEndServices/foodTypeService'; // Corrige la ruta según tu estructura de carpetas
import { AccommodationTypeService } from '../backEndServices/AccommodationTypeService';
import { TransportTypeService } from '../backEndServices/TransportTypeService';
import { LocationService } from '../backEndServices/LocationService';
import { UserProfile } from '../keycloak/user-profile';
import { KeycloakService } from '../keycloak/keycloak.service';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { SuperService } from '../model/SuperService';
import { LocationResponse } from '../model/LocationResponse';
import { FoodTypeResponse } from '../model/FoodTypeResponse';
import { AccommodationTypeResponse } from '../model/AccommodationTypeResponse';
import { TransportTypeResponse } from '../model/TransportTypeResponse';
import { ServiceFoodRequest } from '../model/ServiceFoodRequest';
import { ServiceAccommodationRequest } from '../model/ServiceAccommodationRequest';
import { ServiceTransportationRequest } from '../model/ServiceTransportationRequest';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {
  isPopupOpen = false;
  popupMessage = '';

  @Input() keyword: string = '';
  @Output() resultsEmitter = new EventEmitter<any[]>();

  userProfile: UserProfile | undefined;
  
  public mostrarComprar = false

  public servicio: SuperService = new SuperService();

  public locations: LocationResponse[] = []
  public foods: FoodTypeResponse[] = []
  public accommodations: AccommodationTypeResponse[] = []
  public transports: TransportTypeResponse[] = []

  public tipoFood = false
  public tipoAccommodation = false
  public tipoTransportation = false

  miParametro: string = "";

  public cantidad = 1;
  constructor(
    private locationService: LocationService,
    private servicioService: ServicioService,
    private FoodServices: FoodTypeService,
    private AccomodationService: AccommodationTypeService,
    private TransportService: TransportTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService
  ) { }

  public errorMessage: string | null = null;
  public isLoading = true;

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    console.log(this.userProfile);
    
    this.servicio = new SuperService();

    this.getAllLocations()
  }

  getAllLocations(): void {
    this.locationService.findAll().subscribe(
      data => {
        console.log(data);
        this.locations = data
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );

    this.FoodServices.findAll().subscribe(
      data => {
        console.log(data);
        this.foods = data
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );

    this.AccomodationService.findAll().subscribe(
      data => {
        console.log(data);
        this.accommodations = data
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );

    this.TransportService.findAll().subscribe(
      data => {
        console.log(data);
        this.transports = data
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  enviar(): void {

    console.log(this.userProfile);
    
    // Resetear el mensaje de error
    this.errorMessage = null;
  
    // Validar campos obligatorios del servicio principal
    if (!this.servicio.name || !this.servicio.destination || !this.servicio.startDate || !this.servicio.endDate || !this.servicio.unitValue || !this.servicio.description) {
      this.popupMessage = 'Por favor, complete todos los campos obligatorios del servicio.';
      this.openPopup()
      return;
    }
    else if (this.tipoFood) {
      if (!this.servicio.foodType) {
        this.popupMessage = 'Por favor, seleccione un tipo de comida.';
        this.openPopup()
        return;
      }
    }
    else if (this.tipoAccommodation) {
      if (!this.servicio.accommodationType || !this.servicio.capacity) {
        this.popupMessage = 'Por favor, complete todos los campos de alojamiento.';
        this.openPopup()
        return;
      }
    }
    else if (this.tipoTransportation) {
      if (!this.servicio.transportationType || !this.servicio.origin || !this.servicio.company) {
        this.popupMessage = 'Por favor, complete todos los campos de transporte.';
        this.openPopup()
        return;
      }
    }
    else {
      this.popupMessage = 'Seleccione al menos un tipo de servicio';
      this.openPopup()
      return
    }


    if (this.userProfile?.id && this.servicio.foodType) {
      console.log(this.formatDateToISO(this.servicio.endDate));
      
      let send = new ServiceFoodRequest(
        null,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        this.formatDateToISO(this.servicio.startDate),
        this.formatDateToISO(this.servicio.endDate),
        this.userProfile.id,
        this.servicio.foodType
      );
    
      this.servicioService.createFoodService(send).subscribe(
        response => {
          console.log('Servicio creado con éxito:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );

      console.log("Se simula envio de food");
      
    }

    if (this.userProfile?.id && this.servicio.accommodationType && this.servicio.capacity) {
      console.log(this.formatDateToISO(this.servicio.endDate));
      
      let send = new ServiceAccommodationRequest(null,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        this.formatDateToISO(this.servicio.startDate),
        this.formatDateToISO(this.servicio.endDate),
        this.userProfile.id,
        this.servicio.accommodationType,
        this.servicio.capacity);
    
      this.servicioService.createAccommodationService(send).subscribe(
        response => {
          console.log('Servicio creado con éxito:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );

      console.log("Se simula envio de food");
      
    }

    if (this.userProfile?.id && this.servicio.transportationType && this.servicio.company && this.servicio.origin) {
      console.log(this.formatDateToISO(this.servicio.endDate));
      
      let send = new ServiceTransportationRequest(null,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        this.formatDateToISO(this.servicio.startDate),
        this.formatDateToISO(this.servicio.endDate),
        this.userProfile.id,
        this.servicio.transportationType,
        this.servicio.company,
        this.servicio.origin);
    
      this.servicioService.createTransportationService(send).subscribe(
        response => {
          console.log('Servicio creado con éxito:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );

      console.log("Se simula envio de food");
      
    }
    
    console.log('Formulario válido, enviando datos:', this.servicio);
    this.router.navigate(['/menu-principal-proveedor']);

  }

  formatDateToISO(date: Date | string): string {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid date provided');
    }

    const pad = (num: number) => String(num).padStart(2, '0');
    
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  
}