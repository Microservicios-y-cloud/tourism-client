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
import { QuestionResponse } from '../model/QuestionResponse';
import { Answer } from '../model/Answer';
import { AnswerResponse, PersonAnswer } from '../model/AnswerResponse';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {
  userProfile: UserProfile | undefined;
  
  public mostrarComprar = false

  public servicio: SuperService | undefined;
  public questions: QuestionResponse[] |undefined

  idParam: any

  public pregunta: string = ""
  public responseAnswer: string = ""

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
      this.idParam = params.get('idServicio');
      
      if (this.idParam) {
        const id = Number(this.idParam);
        if (!isNaN(id)) {
          this.servicioService.getService(id).subscribe(
            data => {
              
              this.servicio = data;
            },
            error => {
              console.error('Error fetching services:', error);
            }
          );
          this.questionService.findAllQuestionsByService(id).subscribe(
            data => {
              this.questions = data
            },
            error => {
              console.error('Error fetching services:', error);
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
    if (this.userProfile?.id && this.userProfile?.attributes?.userType && this.userProfile?.username && this.userProfile?.firstName && this.userProfile?.lastName && this.userProfile?.email && this.servicio?.id) {
      let idPregunta = this.convertirCadenaANumero(this.userProfile.id + this.servicio.id)
      let pregunta = new QuestionRequest(idPregunta,this.servicio?.id,this.pregunta,new Person(this.userProfile?.id,this.userProfile?.attributes?.userType[0],this.userProfile?.username,this.userProfile?.firstName,this.userProfile?.lastName,this.userProfile?.email),[])

      this.questionService.sendQuestion(pregunta).subscribe(
        response => {
          console.log('Pregunta creada con éxito:', response);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['ver-servicio/'+this.idParam]);
          });
        },
        error => {
          console.error('Error al crear pregunta:', error);
        }
      );
    }
  }

  convertirCadenaANumero(cadena: string): string {
    return Array.from(cadena).map(caracter => {
        if (/\d/.test(caracter)) {
            return caracter;
        } else if (/[a-zA-Z]/.test(caracter)) {
            return (caracter.toLowerCase().charCodeAt(0) - 96).toString();
        } else {
            return '';
        }
    }).join('');
  }

  enviarRespuesta(i:QuestionResponse):void {
    if (i.id && this.userProfile?.id && this.userProfile?.username && this.userProfile?.email) {
      const inputElement = document.getElementById(i.id) as HTMLInputElement;
      const inputValue = inputElement.value;
      console.log(inputValue); // Muestra el valor del input
      
      let res = new AnswerResponse(inputValue,new PersonAnswer(this.userProfile?.id,this.userProfile?.username, this.userProfile?.email),new Date().toISOString())
      
      
      this.questionService.sendAnswer(i.id,res).subscribe(
        response => {
          console.log('Pregunta creada con éxito:', response);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['ver-servicio/'+this.idParam]);
          });
        },
        error => {
          console.error('Error al crear pregunta:', error);
        }
      );
    }
    
  }
}