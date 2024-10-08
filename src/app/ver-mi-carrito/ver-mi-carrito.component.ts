import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';
import { UserProfile } from '../keycloak/user-profile';
import { CartService } from '../backEndServices/CartService';
import { CartResponse } from '../model/CartResponse';
import { CartItem } from '../model/CartItem';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { errorCodes } from '@apollo/client/invariantErrorCodes';
import { itemService } from '../model/adicional/itemService';
@Component({
  selector: 'app-ver-mi-carrito',
  templateUrl: './ver-mi-carrito.component.html',
  styleUrl: './ver-mi-carrito.component.css'
})
export class VerMiCarritoComponent {
  isPopupOpen = false;
  popupMessage = '';

  @Input() keyword: string = '';
  @Output() resultsEmitter = new EventEmitter<any[]>();

  public items: itemService[] = [] //Esto es solo para desplegarlo en pantalla con el nombre del servicio
  public cart: CartResponse | undefined//Aqui esta el carrito del usuario
  //variables
  //public itemsCarrito: itemCarrito[] = [];
  userProfile: UserProfile | undefined;
  public total = 0;

  constructor(
    private cartService: CartService,
    private servicioService: ServicioService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.total = 0
    this.userProfile = this.keycloakService.profile;
    if (this.userProfile?.id) {
      this.obtenerCarrito(this.userProfile?.id)
      
    }
    
  }

  obtenerCarrito(id:string) {
    this.cartService.getCartByUser(id).subscribe(
      response => {
        this.cart = response
        response.cartItems.forEach(element => {
          if (element.serviceId) {
            this.servicioService.getService(element.serviceId).subscribe(
              itemResponse => {
                if (itemResponse.id && itemResponse.name && itemResponse.unitValue) {
                  let itemCart = new itemService(itemResponse.id,itemResponse.name,itemResponse.unitValue,element.quantity,element.subtotal)
                  this.items.push(itemCart)
                  this.total += itemCart.subtotal
                }
                console.log(itemResponse);
                
              },
              error => {
                console.log("Error al cargar servicio");
                
              }
            )
          }
        });
      },
      error => {
        if (error.status === 500) {
          console.log("No existe el carrito");
        } else {
          console.error('Error al crear el servicio:', error);
        }
      }
    );
  }

  eliminarItem(item: itemService) {
    this.popupMessage = "Todavia no esta hecha la funcion de eliminar item"
    this.openPopup()
  }

  comprar():void {
    if (this.cart?.id) {
      this.cartService.purchase(this.cart?.id).subscribe(
        respose =>{
          console.log(respose);
          
        },
        error => {
          console.log(error);
          
        }
      )
    }
    
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}
