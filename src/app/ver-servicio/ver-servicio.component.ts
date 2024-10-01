import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { FoodServices } from '../backEndServices/foodServices';
import { AccomodationService } from '../backEndServices/accomodationService';
import { TransportationServices } from '../backEndServices/transportationServices';
import { KeycloakService } from '../keycloak/keycloak.service'; // Ajusta la ruta según tu estructura de archivos
import { LocationService } from '../backEndServices/LocationService';
import { UserProfile } from '../keycloak/user-profile';
import { SuperService } from '../model/SuperService';
import { QuestionRequest } from '../model/QuestionRequest';
import { Person } from '../model/Person';
import { questionService } from '../backEndServices/QuestionService';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {
  userProfile: UserProfile | undefined;
  
  public mostrarComprar = false

  public servicio: SuperService | undefined;

  miParametro: string = "";

  public cantidad = 1;
  constructor(
    private locationService: LocationService,
    private servicioService: ServicioService,
    private questionService: questionService,
    private FoodServices: FoodServices,
    private AccomodationService: AccomodationService,
    private TransportService: TransportationServices,
    private router: Router,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService
  ) { }

  public errorMessage: string | null = null;
  public isLoading = true;

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    if (this.userProfile?.attributes?.userType == 'customer') {
      this.mostrarComprar = true
    }
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('idServicio');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.servicioService.getService(id).subscribe(
            data => {
              this.servicio = data;
            },
            error => {
              console.error('Error fetching services:', error);
            }
          );
        } else {
          console.error('Invalid ID:', idParam);
        }
      } else {
        console.error('No ID parameter found in URL');
      }
    });
  }
  

  sumarCantidad() {
    this.cantidad += 1;
  }
  restarCantidad() {
    if (this.cantidad <= 1) {
      this.cantidad = 1;
    } else {
      this.cantidad -= 1;
    }
  }
  
  comprar() {

  }

  add_carrito() {
    // Implementar la lógica para añadir al carrito
  }
  enviarPregunta() {
    if (this.userProfile?.id && this.userProfile?.attributes?.userType && this.userProfile?.username && this.userProfile?.firstName && this.userProfile?.lastName && this.userProfile?.email) {
      let pregunta = new QuestionRequest(null,2,'22',new Person(this.userProfile?.id,this.userProfile?.attributes?.userType,this.userProfile?.username,this.userProfile?.firstName,this.userProfile?.lastName,this.userProfile?.email),null)

      //Mensaje de prueba
      const questionRequest = {
        id: 10,
        serviceId: 1,
        content: "Test",
        createdBy: {
            id: "50f60693-b5a9-4f9f-90fc-9c710cdcd1b0",
            userType: "CUSTOMER",
            username: "customer1",
            firstName: "customer1",
            lastName: "customer1",
            email: "customer1@mail.com"
        },
        answers: [
            {
                content: "Recuerda que mi catálogo de servicios está 100% disponible para ti",
                createdBy: {
                    id: "524f9a80-156e-4ccb-b0ea-474dcb8664e7",
                    userType: "SUPPLIER",
                    username: "supplier1",
                    firstName: "supplier1",
                    lastName: "supplier1",
                    email: "supplier1@mail.com"
                },
                date: "2024-09-25T22:01:08"
            },
            {
                content: "Me podrías pasar el link? Es que no encuentro tu perfil",
                createdBy: {
                    id: "50f60693-b5a9-4f9f-90fc-9c710cdcd1b0",
                    userType: "CUSTOMER",
                    username: "customer1",
                    firstName: "customer1",
                    lastName: "customer1",
                    email: "customer1@mail.com"
                },
                date: "2024-09-25T22:03:53.629"
            }
        ]
    };
    
      this.questionService.sendQuestion(questionRequest).subscribe(
        response => {
          console.log('Pregunta creada con éxito:', response);
        },
        error => {
          console.error('Error al crear pregunta:', error);
        }
      );
    }
    
  }
}