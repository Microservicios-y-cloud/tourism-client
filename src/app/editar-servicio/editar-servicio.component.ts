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
  isPopupOpen = false;
  popupMessage = '';

  public cantidad = 1;
  public shouldRedirect: boolean | undefined;

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

    this.getAllInfo()

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
              if (this.servicio.foodType != null && this.servicio.foodType != undefined) {
                this.tipoFood = true
              }
              else if (this.servicio.accommodationType != null && this.servicio.accommodationType != undefined) {
                this.tipoAccommodation = true
              }
              else if (this.servicio.transportationType != null && this.servicio.transportationType != undefined) {
                this.tipoTransportation = true
              }
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

  getAllInfo(): void {
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
    console.log(this.userProfile)
    // Validar campos obligatorios del servicio principal
    if (!this.servicio.name || !this.servicio.destination || !this.servicio.startDate || !this.servicio.endDate || !this.servicio.unitValue || !this.servicio.description) {
      this.popupMessage = 'Por favor, complete todos los campos obligatorios del servicio.';
      this.openPopup();
      this.shouldRedirect = false; 
      return;
    }
    else if (this.tipoFood) {
      if (!this.servicio.foodType) {
        this.popupMessage = 'Por favor, seleccione un tipo de comida.';
        this.openPopup();
        this.shouldRedirect = false; 
        return;
      }
    }
    else if (this.tipoAccommodation) {
      if (!this.servicio.accommodationType || !this.servicio.capacity) {
        this.popupMessage = 'Por favor, complete todos los campos de alojamiento.';
        this.openPopup();
        this.shouldRedirect = false; 
        return;
      }
    }
    else if (this.tipoTransportation) {
      if (!this.servicio.transportationType || !this.servicio.origin || !this.servicio.company) {
        this.popupMessage = 'Por favor, complete todos los campos de transporte.';
        this.openPopup();
        this.shouldRedirect = false; 
        return;
      }
    }
    else {
      this.popupMessage = "Seleccione al menos un tipo de servicio"
      this.openPopup();
      this.shouldRedirect = false; 
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
        this.formatDateToISO(this.servicio.startDate!),
        this.formatDateToISO(this.servicio.endDate!),
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

    }

    if (this.userProfile?.id && this.servicio.accommodationType && this.servicio.capacity && this.servicio.id) {
      console.log(this.formatDateToISO(this.servicio.endDate));

      let send = new ServiceAccommodationRequest(this.servicio.id,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        this.formatDateToISO(this.servicio.startDate!),
        this.formatDateToISO(this.servicio.endDate!),
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

      console.log("Se simula envio de accommodation");

    }

    if (this.userProfile?.id && this.servicio.transportationType && this.servicio.company && this.servicio.origin && this.servicio.id) {
      console.log(this.formatDateToISO(this.servicio.endDate));

      let send = new ServiceTransportationRequest(this.servicio.id,
        this.servicio.name,
        this.servicio.description,
        this.servicio.unitValue,
        this.servicio.destination,
        this.formatDateToISO(this.servicio.startDate!),
        this.formatDateToISO(this.servicio.endDate!),
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

      console.log("Se simula envio de transportation");

    }

    console.log('Formulario válido, enviando datos:', this.servicio);
    //alert("Servicio creado")
    this.popupMessage = 'Servicio actualizado correctamente';
    this.openPopup();
    this.shouldRedirect = true; // Establece que sí se debe redirigir
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

  // Método para manejar cuando el popup se cierra
  closePopup() {
    // Si la redirección es necesaria, redirige después de 3 segundos
    if (this.shouldRedirect) {
      setTimeout(() => {
        this.router.navigate(['/menu-principal-proveedor']);
      }, 2000);
    } else {
      // Si no se debe redirigir, simplemente cierra el popup
      this.isPopupOpen = false;
    }
  }
}