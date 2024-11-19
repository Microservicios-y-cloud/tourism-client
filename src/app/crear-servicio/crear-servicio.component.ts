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
import { RestCountriesService } from '../countries/rest-countries.service';
import { Country } from '../model/Country';
import { State } from '../model/State';
import { City } from '../model/City';
import { of, switchMap } from 'rxjs';

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

  // public locations: LocationResponse[] = []
  public foods: FoodTypeResponse[] = []
  public accommodations: AccommodationTypeResponse[] = []
  public transports: TransportTypeResponse[] = []

  public countries: Country[] = [];
  public states: State[] = [];
  public cities: City[] = [];

  public selectedCountry: Country | null = null;
  public selectedState: State | null = null;
  public selectedCity: City | null = null;
  public address: string | null = null;
  
  public originCountry: Country | undefined = undefined;
  public originState: State | null = null;
  public originStates: State[] = [];
  public originCities: City[] = [];
  public originCity: City | null = null;
  public originAddress: string | null = null;

  public destinationLocation: LocationResponse = new LocationResponse();
  public originLocation: LocationResponse = new LocationResponse();



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
    private keycloakService: KeycloakService,
    private restCountriesService: RestCountriesService
  ) { }

  public errorMessage: string | null = null;
  public isLoading = true;

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    console.log(this.userProfile);

    this.servicio = new SuperService();

    this.restCountriesService.getCountriesFetch().subscribe(
      data => {
        this.countries = data;
        this.getAllInfo();
      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );
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
    console.log(this.userProfile);

    // Resetear el mensaje de error
    this.errorMessage = null;

    const originLocation = new LocationResponse(
        this.originAddress ?? undefined,
        this.originCity?.latitude,
        this.originCity?.longitude,
        this.originCountry?.name,
        this.originCity?.name,
        this.originState?.name
    );

    const destinationLocation = new LocationResponse(
        this.address ?? undefined,
        this.selectedCity?.latitude,
        this.selectedCity?.longitude,
        this.selectedCountry?.name,
        this.selectedCity?.name,
        this.selectedState?.name
    );
    this.servicio.destination = destinationLocation
    this.servicio.origin = originLocation

    console.log('Destino:', destinationLocation);
    console.log('Origen:', originLocation);

    // Validar campos obligatorios
    if (!this.validarCamposObligatorios()) {
        return;
    }

    // Encadenar la creación de ubicaciones antes de enviar el servicio
    this.locationService.createLocation(destinationLocation).pipe(
        switchMap((destResponse) => {
            console.log('Ubicación de destino creada con éxito:', destResponse);
            this.servicio.destination = destResponse;

            if (originLocation.country) {
                return this.locationService.createLocation(originLocation);
            } else {
                // Si no hay ubicación de origen, devolver un observable vacío
                return of(null);
            }
        })
    ).subscribe(
        (originResponse) => {
            if (originResponse) {
                console.log('Ubicación de origen creada con éxito:', originResponse);
                this.servicio.origin = originResponse;
            }

            // Crear el servicio después de que las ubicaciones estén listas
            this.crearServicio();
        },
        (error) => {
            console.error('Error al crear las ubicaciones:', error);
            this.errorMessage = 'Error al crear las ubicaciones. Por favor, inténtelo de nuevo.';
        }
    );
}

validarCamposObligatorios(): boolean {
    if (!this.servicio.name || !this.servicio.destination || !this.servicio.startDate || !this.servicio.endDate || !this.servicio.unitValue || !this.servicio.description) {
        this.popupMessage = 'Por favor, complete todos los campos obligatorios del servicio.';
        console.log("campo faltante: " + this.servicio.name + " " + this.servicio.destination + " " + this.servicio.startDate + " " + this.servicio.endDate + " " + this.servicio.unitValue + " " + this.servicio.description);
        this.openPopup();
        return false;
    }

    if (this.tipoFood && !this.servicio.foodType) {
        this.popupMessage = 'Por favor, seleccione un tipo de comida.';
        this.openPopup();
        return false;
    }

    if (this.tipoAccommodation && (!this.servicio.accommodationType || !this.servicio.capacity)) {
        this.popupMessage = 'Por favor, complete todos los campos de alojamiento.';
        this.openPopup();
        return false;
    }

    if (this.tipoTransportation && (!this.servicio.transportationType || !this.servicio.origin || !this.servicio.company)) {
        this.popupMessage = 'Por favor, complete todos los campos de transporte.';
        this.openPopup();
        return false;
    }

    return true;
}

crearServicio(): void {
    console.log('Preparando envío del servicio:', this.servicio);

    if (this.servicio.foodType) {
        const send = new ServiceFoodRequest(
            null,
            this.servicio.name!,
            this.servicio.description!,
            this.servicio.unitValue!,
            this.servicio.destination!,
            this.formatDateToISO(this.servicio.startDate!),
            this.formatDateToISO(this.servicio.endDate!),
            this.userProfile?.id ?? '',
            this.servicio.foodType
        );

        this.servicioService.createFoodService(send).subscribe({
            next: (response) => console.log('Servicio de comida creado con éxito:', response),
            error: (error) => console.error('Error al crear el servicio de comida:', error)
        });
    } else if (this.servicio.accommodationType && this.servicio.capacity) {
        const send = new ServiceAccommodationRequest(
            null,
            this.servicio.name!,
            this.servicio.description!,
            this.servicio.unitValue!,
            this.servicio.destination!,
            this.formatDateToISO(this.servicio.startDate!),
            this.formatDateToISO(this.servicio.endDate!),
            this.userProfile?.id ?? '',
            this.servicio.accommodationType,
            this.servicio.capacity
        );

        this.servicioService.createAccommodationService(send).subscribe({
            next: (response) => console.log('Servicio de alojamiento creado con éxito:', response),
            error: (error) => console.error('Error al crear el servicio de alojamiento:', error)
        });
    } else if (this.servicio.transportationType && this.servicio.origin && this.servicio.company) {
        const send = new ServiceTransportationRequest(
            null,
            this.servicio.name!,
            this.servicio.description!,
            this.servicio.unitValue!,
            this.servicio.destination!,
            this.formatDateToISO(this.servicio.startDate!),
            this.formatDateToISO(this.servicio.endDate!),
            this.userProfile?.id ?? '',
            this.servicio.transportationType,
            this.servicio.company,
            this.servicio.origin
        );

        this.servicioService.createTransportationService(send).subscribe({
            next: (response) => console.log('Servicio de transporte creado con éxito:', response),
            error: (error) => console.error('Error al crear el servicio de transporte:', error)
        });
    }

    setTimeout(() => {
      this.router.navigate(['/menu-principal-proveedor']);
    }, 3000);
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


  fetchStates(countryIso: string, isOrigin: boolean = false): void {
    this.restCountriesService.getStatesFetch(countryIso).subscribe(
      (data: State[]) => {
        if (isOrigin) {
          this.originStates = data;  // Actualiza el array de estados de origen
          this.originCities = [];     // Limpia las ciudades de origen al cambiar el estado
        } else {
          this.states = data;  // Actualiza el array de estados de destino
          this.cities = [];     // Limpia las ciudades de destino al cambiar el estado
        }
      },
      (error) => {
        console.error('Error fetching states:', error);
      }
    );
  }

  fetchCities(countryIso: string, stateIso: string, isOrigin: boolean = false): void {
    this.restCountriesService.getCitiesFetch(countryIso, stateIso).subscribe(
      (data: City[]) => {
        if (isOrigin) {
          this.originCities = data;  // Actualiza las ciudades de origen
        } else {
          this.cities = data;  // Actualiza las ciudades de destino
        }
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  onStateSelect(): void {
    this.cities = []; // Reset cities when state changes
    if (this.selectedCountry && this.selectedState) {
      this.fetchCities(this.selectedCountry.iso2, this.selectedState.iso2); // Fetch cities for destination
    }
  }

  onOriginStateSelect(): void {
    this.originCities = []; // Reset cities when state changes
    if (this.originCountry && this.originState) {
      this.fetchCities(this.originCountry.iso2, this.originState.iso2, true); // Fetch cities for origin
    }
  }

  onCountrySelect(): void {
    console.log(this.selectedCountry?.name);
    this.states = [];  // Reset states for destination
    this.cities = [];  // Reset cities for destination
    if (this.selectedCountry) {
      this.fetchStates(this.selectedCountry.iso2); // Fetch states for destination
    }
  }

  onOriginCountrySelect(): void {
    console.log(this.originCountry?.name);
    this.originStates = [];  // Reset states for origin
    this.originCities = [];  // Reset cities for origin
    if (this.originCountry) {
      this.fetchStates(this.originCountry.iso2, true); // Fetch states for origin
    }
  }
}