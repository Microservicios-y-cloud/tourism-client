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
  public questions: QuestionResponse[] |undefined

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

  addToCart():void {
    //TODO: Es importante modificar la respuesta del front para que, si encuentra que el usuario no tiene carrito, no se devuelva un error ya que eso no estaría bien hecho
    //Crear cart
    if (this.servicio) {
      if (this.servicio.id && this.servicio.unitValue) {
        let cartIt = new CartItem(this.servicio.id,
          this.cantidad,
          this.servicio.unitValue)
  
        //Revisar primero si el cliente tiene un carrito
        if (this.userProfile?.id) {
          this.cartService.getCartByUser(this.userProfile.id).subscribe(
            response => {
              console.log(response);
              if (this.userProfile?.id && response.id) {
                //TODO: Hay algo extraño, no se si del front o del back, pero cuando añades un item a un carrito existente, se ejecuta error "No se pudo agregar al carrito", sin embargo si se está actualizando en la base de datos, asi que hay algo mal con el manejo de errores
                this.cartService.addCartItem(response.id,cartIt).subscribe(
                  response => {
                    this.popupMessage = "Se ha agregado el servicio al carrito"
                    this.comprado = true;
                    this.openPopup()
                    //console.log('Servicio creado con éxito:', response);###
                  },
                  error => {
                    console.log(error.error.message == undefined);
                    
                    if (error.error.message == undefined) {
                      this.popupMessage = "Se ha agregado el servicio al carrito"
                      this.openPopup()
                      console.log('Servicio creado con éxito:', response);
                    }
                    else {
                      this.popupMessage = error.error.message
                      this.openPopup()
                      console.error('Error al crear el servicio:', error);
                    }
                    
                  }
                );
              }
            },
            error => {
              if (error.status === 500) {
                console.log("No existe el carrito, asi que se creara uno");
                
                //No existe, asi que se creara el carrito
                if(this.userProfile?.id && 
                  this.userProfile.attributes?.userType && 
                  this.userProfile.username && 
                  this.userProfile.firstName && 
                  this.userProfile.lastName && 
                  this.userProfile.email) {

                  let newCart = new CartRequest(new Customer(
                    this.userProfile?.id,
                    this.userProfile?.attributes?.userType[0],
                    this.userProfile?.username,
                    this.userProfile?.firstName,
                    this.userProfile?.lastName,
                    this.userProfile?.email),
                    [cartIt])
                  console.log(JSON.stringify(newCart));
                  this.cartService.createCart(newCart).subscribe(
                    response => {
                      console.log('Servicio creado con éxito:', response);
                    },
                    error => {
                      if (this.userProfile?.id) {
                        this.cartService.getCartByUser(this.userProfile.id).subscribe(
                          response => {
                            this.popupMessage = "Se ha agregado el servicio al carrito"
                            this.openPopup()
  
                            console.log("Se obtiene el carrito");
                          },
                          error => {
                            this.popupMessage = "No se pudo agregar al carrito"
                            this.openPopup()
                            console.log("No se creo el carrito");
                          })
                      }
                      
                    }
                  );
                }
                
              } else {
                console.error('Error al crear el servicio:', error);
              }
            }
          );
        }
      }
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
    if (this.comprado) {
      this.router.navigate(['/ver-carrito']);
    }
  }
}