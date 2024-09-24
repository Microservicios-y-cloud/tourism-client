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
import { Location } from '../models/dto/Location';
import { Service } from '../models/dto/Service';
import { FoodService } from '../models/dto/FoodService';
import { FoodServices } from '../services/foodServices';
import { FoodServiceRequest } from '../models/dto/request/FoodServiceRequest';
import { AccomodationService } from '../services/accomodationService';
import { UserProfile } from '../keycloak/user-profile';
import { KeycloakService } from '../keycloak/keycloak.service';
import { AccomoationServiceRequest } from '../models/dto/request/AccommodationServiceRequest';
import { TransportationServiceRequest } from '../models/dto/request/TransportationServiceRequest';
import { TransportationServices } from '../services/transportationServices';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {
  userProfile: UserProfile | undefined;

  // Variables
  public ubicacion: Location = new Location(-1,'',0,0,'','','')
  public ubicacionOrigin: Location = new Location(-1,'',0,0,'','','')
  
  public locations: Location[] = []
  public foodTypes: FoodType[] = [];
  public accommodationTypes: AccommodationType[] = [];
  public transportTypes: TransportType[] = [];

  public alimentacionSelected = false;
  public alojamientoSelected = false;
  public transporteSelected = false;
  public ubicacionDelServicio = "";

  public servicio: Service = new Service('','',1,this.ubicacion.id,new Date(),new Date(),'')

  public food: FoodService = new FoodService(this.servicio,1,'');
  public accomodation: AccommodationService = new AccommodationService(this.servicio,-1,'',0);
  public transportation: TransportationService = new TransportationService(this.servicio,-1,'','',-1,'','');

  constructor(
    private keycloakService: KeycloakService,
    private locationService: LocationService,
    private foodService: FoodServices,
    private accommodationService: AccomodationService,
    private foodTypeService: FoodTypeService,
    private transportationServices: TransportationServices,
    private accommodationTypeService: AccommodationTypeService,
    private transportTypeService: TransportTypeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    this.loadFoodTypes();
  }

  loadFoodTypes(): void {

    this.locationService.findAll().subscribe(
      (data: Location[]) => {
        this.locations = data;
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
    // Desmarcar todas las opciones
    this.alimentacionSelected = false;
    this.alojamientoSelected = false;
    this.transporteSelected = false;
  
    // Marcar solo la opción seleccionada
    switch (serviceType) {
      case 'alimentacion':
        this.alimentacionSelected = true;
        break;
      case 'alojamiento':
        this.alojamientoSelected = true;
        break;
      case 'transporte':
        this.transporteSelected = true;
        break;
    }
  }
  
  crear(): void {
    if (this.userProfile && this.userProfile.id !== undefined && this.userProfile?.attributes?.userType == 'supplier') {
      this.servicio.supplierId = this.userProfile.id
      //Revisar que los campos obligatorios esten llenos
      if(this.servicio.name == '' || this.ubicacion.id == -1 || this.servicio.startDate == undefined || this.servicio.endDate == undefined) {
        alert("Falta informacion")
        return
      }
      //Formatear fechas a como esta en h2
      const startDate = new Date(this.servicio.startDate); 
      const endDate = new Date(this.servicio.endDate); 
      const formattedDatestart = startDate.toISOString().split('.')[0] + 'Z';
      const formattedDateEnd = endDate.toISOString().split('.')[0] + 'Z';

      if (this.alimentacionSelected) {
          let send = new FoodServiceRequest(
            this.servicio.name,
            this.servicio.description,
            this.servicio.unitValue,
            this.ubicacion.id,
            formattedDatestart,
            formattedDateEnd,
            this.userProfile.id,
            this.food.foodTypeId
          );
          console.log(send);
          this.foodService.create(send).subscribe(
            (response: FoodServiceRequest) => {
              alert("Servicio creado con exito: " + response)
              this.router.navigate(['/ver-servicio/'+response]);
            },
            (error: any) => {
              alert("Error al crear servicio, revisar consola: ")
              console.error('Error al crear el servicio:', error);
            }
          );
      }
      else if (this.alojamientoSelected) {
        if (this.accomodation.capacity <= 0 || this.accomodation.accommodationTypeId == -1) {
          alert("Falta llenar la informacion de accomodation")
        }
        else {
          let send = new AccomoationServiceRequest(
            this.servicio.name,
            this.servicio.description,
            this.servicio.unitValue,
            this.ubicacion.id,
            formattedDatestart,
            formattedDateEnd,
            this.userProfile.id,
            this.accomodation.accommodationTypeId,
            this.accomodation.capacity
          );
          console.log(send);
          this.accommodationService.create(send).subscribe(
            (response: AccomoationServiceRequest) => {
              alert("Servicio creado con exito: " + response)
              this.router.navigate(['/ver-servicio/'+response]);
            },
            (error: any) => {
              alert("Error al crear servicio, revisar consola: ")
              console.error('Error al crear el servicio:', error);
            }
          );
        }
      }
      
      else if (this.transporteSelected) {
        if (this.transportation.company == '' || this.transportation.transportTypeId == -1 || this.ubicacionOrigin.id == -1) {
          alert("Falta llenar la informacion de transportation")
        }
          let send = new TransportationServiceRequest(
            this.servicio.name,
            this.servicio.description,
            this.servicio.unitValue,
            this.ubicacion.id,
            formattedDatestart,
            formattedDateEnd,
            this.userProfile.id,
            this.transportation.transportTypeId,
            this.transportation.company,
            this.ubicacionOrigin.id
          );
          this.transportationServices.create(send).subscribe(
            (response: TransportationServiceRequest) => {
              alert("Servicio creado con exito: " + response)
              this.router.navigate(['/ver-servicio/'+response]);
            },
            (error: any) => {
              alert("Error al crear servicio, revisar consola: ")
              console.error('Error al crear el servicio:', error);
            }
          );
      }
      else {
        alert("Selecciona que tipo de servicio es")
      }
    }
    else {
      console.error('Usuario indefinido, si aparece esto es porque ha fallado algo en la seguridad!!!!');
    }
    
  }

	onSelectedFood(value:string): void {
    //Obtiene el id del elemento seleccionado
    this.foodTypes.forEach(element => {
      if (element.name == value) {
        let r = JSON.stringify(element)
        let parsedElement = JSON.parse(r);
        this.food.foodType = element.name
        this.food.foodTypeId = parsedElement.foodTypeId
        console.log(this.food);
      }
    });
	}

  onSelectedAccomodation(value:string): void {
    //Obtiene el id del elemento seleccionado
    this.accommodationTypes.forEach(element => {
      if (element.name == value) {
        let r = JSON.stringify(element)
        let parsedElement = JSON.parse(r);
        this.accomodation.accommodationType = element.name
        this.accomodation.accommodationTypeId = parsedElement.accomodationTypeId
        console.log(this.accomodation);
      }
    });
	}

  onSelectedTranportation(value:string): void {
    //Obtiene el id del elemento seleccionado
    this.transportTypes.forEach(element => {
      if (element.name == value) {
        let r = JSON.stringify(element)
        let parsedElement = JSON.parse(r);
        console.log(parsedElement);
        
        this.transportation.transportType = element.name
        this.transportation.transportTypeId = parsedElement.accomodationTypeId
        console.log(this.transportation);
      }
    });
	}
}