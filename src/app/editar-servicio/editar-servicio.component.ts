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
import { UserProfile } from '../keycloak/user-profile';
import { SuperService } from '../model/SuperService';
import { LocationResponse } from '../model/LocationResponse';
import { FoodTypeResponse } from '../model/FoodTypeResponse';
import { AccommodationTypeResponse } from '../model/AccommodationTypeResponse';
import { TransportTypeResponse } from '../model/TransportTypeResponse';
import { KeycloakService } from '../keycloak/keycloak.service';
import { ServiceFoodRequest } from '../model/ServiceFoodRequest';
import { ServiceAccommodationRequest } from '../model/ServiceAccommodationRequest';
import { ServiceTransportationRequest } from '../model/ServiceTransportationRequest';


@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent {
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
  idParam: any

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

    //Aqui se carga el serivicio para editar la informacion
    this.cargarServicio()
  }

  cargarServicio(): void {
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('idServicio');
      
      if (this.idParam) {
        const id = Number(this.idParam);
        if (!isNaN(id)) {
          this.servicioService.getService(id).subscribe(
            response => {
              this.servicio = response
            },
            error => {
              console.error('Error al crear el servicio:', error);
            }
          );
        } else {
          console.error('Invalid ID:', this.idParam);
        }
      } else {
        console.error('No ID parameter found in URL');
      }
    });

    
    
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
    // Resetear el mensaje de error
    this.errorMessage = null;
  
    // Validar campos obligatorios del servicio principal
    if (!this.servicio.name || !this.servicio.destination || !this.servicio.startDate || !this.servicio.endDate || !this.servicio.unitValue || !this.servicio.description) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios del servicio.';
      alert(this.errorMessage)
      return;
    }
    else if (this.tipoFood) {
      if (!this.servicio.foodType) {
        this.errorMessage = 'Por favor, seleccione un tipo de comida.';
        alert(this.errorMessage)
        return;
      }
    }
    else if (this.tipoAccommodation) {
      if (!this.servicio.accommodationType || !this.servicio.capacity) {
        this.errorMessage = 'Por favor, complete todos los campos de alojamiento.';
        alert(this.errorMessage)
        return;
      }
    }
    else if (this.tipoTransportation) {
      if (!this.servicio.transportationType || !this.servicio.origin || !this.servicio.company) {
        this.errorMessage = 'Por favor, complete todos los campos de transporte.';
        alert(this.errorMessage)
        return;
      }
    }
    else {
      alert("Seleccione al menos un tipo de servicio")
      return
    }


    if (this.userProfile?.id && this.servicio.foodType && this.servicio.id) {
      console.log(this.formatDateToISO(this.servicio.endDate));
      
      let send = new ServiceFoodRequest(
        this.servicio.id,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        "2024-10-01T10:00:00Z",
        "2024-10-01T10:00:00Z",
        this.userProfile.id,
        this.servicio.foodType
      );
    
      this.servicioService.editFoodService(send).subscribe(
        response => {
          console.log('Servicio creado con éxito:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );

      console.log("Se simula envio de food");
      
    } else {
      this.errorMessage = 'User profile is not available.';
      alert(this.errorMessage);
      return;
    }

    if (this.userProfile?.id && this.servicio.accommodationType && this.servicio.capacity && this.servicio.id) {
      console.log(this.formatDateToISO(this.servicio.endDate));
      
      let send = new ServiceAccommodationRequest(this.servicio.id,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        "2024-10-01T10:00:00Z",
        "2024-10-01T10:00:00Z",
        this.userProfile.id,
        this.servicio.accommodationType,
        this.servicio.capacity);
    
      this.servicioService.editAccommodationService(send).subscribe(
        response => {
          console.log('Servicio creado con éxito:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );

      console.log("Se simula envio de food");
      
    } else {
      this.errorMessage = 'User profile is not available.';
      alert(this.errorMessage);
      return;
    }

    if (this.userProfile?.id && this.servicio.transportationType && this.servicio.company && this.servicio.origin && this.servicio.id) {
      console.log(this.formatDateToISO(this.servicio.endDate));
      
      let send = new ServiceTransportationRequest(this.servicio.id,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        "2024-10-01T10:00:00Z",
        "2024-10-01T10:00:00Z",
        this.userProfile.id,
        this.servicio.transportationType,
        this.servicio.company,
        this.servicio.origin);
    
      this.servicioService.editTransportationService(send).subscribe(
        response => {
          console.log('Servicio creado con éxito:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );

      console.log("Se simula envio de food");
      
    } else {
      this.errorMessage = 'User profile is not available.';
      alert(this.errorMessage);
      return;
    }
    
    console.log('Formulario válido, enviando datos:', this.servicio);
    //alert("Servicio creado")
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
}