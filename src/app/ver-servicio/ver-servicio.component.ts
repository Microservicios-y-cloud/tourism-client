import { Component, Input, OnInit } from '@angular/core';
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
import { CartService } from '../backEndServices/CartService';
import { CartRequest } from '../model/CartRequest';
import { Customer } from '../model/Customer';
import { CartItem } from '../model/CartItem';
import { CommentResponse } from '../model/CommentResponse';
import { Qualification } from '../model/Qualification';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrls: ['./ver-servicio.component.css']
})
export class VerServicioComponent implements OnInit {

  isPopupOpen = false;
  popupMessage = '';

  @Input() keyword: string = '';

  userProfile: UserProfile | undefined;
  
  public mostrarComprar = false

  public servicio: SuperService | undefined;
  public questions: QuestionResponse[] | undefined
  public comments: CommentResponse[] | undefined

  idParam: any

  public pregunta: string = ""
  public responseAnswer: string = ""

  public comprado = false;

  public cantidad = 1;
  constructor(
    private locationService: LocationService,
    private servicioService: ServicioService,
    private questionService: questionService,
    private FoodServices: FoodServices,
    private AccomodationService: AccomodationService,
    private TransportService: TransportationServices,
    private cartService:CartService,
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

          this.questionService.getCommentsByService(id).subscribe(
            data => {
              this.comments = data
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

  addToCart(): void {
    if (!this.servicio || !this.servicio.id || !this.servicio.unitValue) {
      console.error("El servicio no es válido.");
      return;
    }
  
    const cartItem = new CartItem(this.servicio.id, this.cantidad || 1, this.servicio.unitValue);
  
    if (!this.userProfile?.id) {
      console.error("El usuario no tiene un perfil válido.");
      return;
    }
  
    this.cartService.getCartByUser(this.userProfile.id).subscribe(
      response => {
        // Carrito encontrado, agregar el item
        if (response?.id) {
          this.cartService.addCartItem(response.id, cartItem).subscribe(
            () => {
              this.popupMessage = "Se ha agregado el servicio al carrito";
              this.comprado = true;
              this.openPopup();
            },
            error => this.handleAddCartItemError(error)
          );
        }
      },
      error => {
        // Si no se encuentra el carrito (404), crear uno nuevo
        if (error.status === 404) {
          this.createNewCart(cartItem);
        } else {
          console.error("Error al buscar el carrito:", error);
        }
      }
    );
  }
  
  private createNewCart(cartItem: CartItem): void {
    if (!this.userProfile || !this.userProfile.attributes?.userType || !this.userProfile.username) {
      console.error("Información incompleta del usuario para crear un carrito.");
      return;
    }
  
    const newCart = new CartRequest(
      new Customer(
        this.userProfile.id!,
        this.userProfile.attributes.userType[0],
        this.userProfile.username,
        this.userProfile.firstName!,
        this.userProfile.lastName!,
        this.userProfile.email!
      ),
      [cartItem]
    );
  
    this.cartService.createCart(newCart).subscribe(
      () => {
        this.popupMessage = "Se ha creado un nuevo carrito y se agregó el servicio.";
        this.openPopup();
      },
      error => {
        console.error("Error al crear el carrito:", error);
        this.popupMessage = "No se pudo crear el carrito.";
        this.openPopup();
      }
    );
  }
  
  private handleAddCartItemError(error: any): void {
    if (error?.error?.message === undefined) {
      this.popupMessage = "Se ha agregado el servicio al carrito";
      this.openPopup();
    } else {
      this.popupMessage = error.error.message;
      this.openPopup();
    }
  }
  

  enviarPregunta() {
    if (this.pregunta == "") {
      this.popupMessage = "Debes poner un mensaje"
      this.openPopup()
      return
    }
    if (this.userProfile?.id && 
      this.userProfile?.attributes?.userType && 
      this.userProfile?.username && 
      this.userProfile?.firstName && 
      this.userProfile?.lastName && 
      this.userProfile?.email && 
      this.servicio?.id) {

      let idPregunta = this.convertirCadenaANumero(this.userProfile.id + this.servicio.id)
      let pregunta = new QuestionRequest(idPregunta,
        this.servicio?.id,
        this.pregunta,
        new Person(this.userProfile?.id,
          this.userProfile?.attributes?.userType[0],
          this.userProfile?.username,
          this.userProfile?.firstName,
          this.userProfile?.lastName,
          this.userProfile?.email),
          [])

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

      if (inputValue == "") {
        this.popupMessage = "Debes poner un mensaje"
        this.openPopup()
        return
      }
      
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

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
    console.log("Closed");
    
    if (this.comprado) {
      this.router.navigate(['/ver-carrito']);
    }
  }

  getQualificationNumberByText(qualificationText: string): number {
    switch (qualificationText.toUpperCase()) {
        case 'DEFICIENTE': return 0;
        case 'REGULAR': return 1;
        case 'SATISFACTORIO': return 2;
        case 'BUENO': return 3;
        case 'SOBRESALIENTE': return 4;
        default: return 10; // Devuelve 0 si no coincide con ninguna calificación
    }
}
}