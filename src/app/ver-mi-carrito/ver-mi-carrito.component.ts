import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';
import { UserProfile } from '../keycloak/user-profile';
import { CartService } from '../backEndServices/CartService';
import { CartResponse } from '../model/CartResponse';
import { CartItem } from '../model/CartItem';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { errorCodes } from '@apollo/client/invariantErrorCodes';
import { itemService } from '../model/adicional/itemService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBalanceService } from '../backEndServices/user-balance.service';
import { UserBalanceRequest } from '../model/UserBalanceRequest';
@Component({
  selector: 'app-ver-mi-carrito',
  templateUrl: './ver-mi-carrito.component.html',
  styleUrl: './ver-mi-carrito.component.css'
})
export class VerMiCarritoComponent {
  isPopupOpen = false;
  popupMessage = '';
  isLoading: boolean = true; // Nueva variable para el estado de carga

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
    private keycloakService: KeycloakService,
    private router: Router,
    private route: ActivatedRoute,
    private userBalanceService: UserBalanceService
  ) {}

  ngOnInit(): void {
    this.total = 0
    this.userProfile = this.keycloakService.profile;
    if (this.userProfile?.id) {
      this.obtenerCarrito(this.userProfile?.id)
      
    }
    
  }

  obtenerCarrito(id: string) {
    this.isLoading = true; // Iniciar el estado de carga
    this.cartService.getCartByUser(id).subscribe({
      next: (response) => {
        this.cart = response;
        const serviceRequests = response.cartItems.map((element) => {
          if (element.serviceId) {
            return this.servicioService.getService(element.serviceId).toPromise().then((itemResponse) => {
              if (itemResponse?.id && itemResponse?.name && itemResponse?.unitValue) {
                const itemCart = new itemService(
                  itemResponse.id,
                  itemResponse.name,
                  itemResponse.unitValue,
                  element.quantity,
                  element.subtotal
                );
                this.items.push(itemCart);
                this.total += itemCart.subtotal;
              }
            }).catch(() => {
              console.error("Error al cargar servicio");
            });
          }
          return Promise.resolve();
        });

        Promise.all(serviceRequests).finally(() => {
          this.isLoading = false; // Finalizar el estado de carga
        });
      },
      error: (error) => {
        this.isLoading = false; // Finalizar el estado de carga en caso de error
        if (error.status === 500) {
          console.log("No existe el carrito");
        } else {
          console.error("Error al obtener el carrito:", error);
        }
      }
    });
  }

  eliminarItem(item: itemService) {
    if (item.serviceId && this.cart) {
      this.cartService.deleteCartItem(item.serviceId, this.cart.id!).subscribe({
        next: () => {
          console.log("El ítem se eliminó correctamente");
          this.popupMessage = "Se ha eliminado el servicio del carrito";
          this.openPopup();

          // Reiniciar lista de items y total antes de recargar
          this.items = [];
          this.total = 0;

          // Recargar el carrito
          this.obtenerCarrito(this.userProfile?.id!);
        },
        error: (error) => {
          console.error("Error al eliminar el ítem:", error);
        }
      });
    }
  }

  comprar(): void {
    if (!this.userProfile?.id) return;
  
    const balanceRequest: UserBalanceRequest = {
      user: {
        id: this.userProfile.id,
        userType: this.userProfile?.attributes?.userType ? this.userProfile.attributes.userType[0] : '',
        username: this.userProfile?.username || '',
        firstName: this.userProfile?.firstName || '',
        lastName: this.userProfile?.lastName || '',
        email: this.userProfile?.email || '',
      },
    };
  
    this.userBalanceService.processUserBalance(balanceRequest).subscribe({
      next: (response) => {
        console.log('Balance procesado:', response.message);  // Acceder al mensaje
        this.finalizarCompra(); // Continúa con el proceso de compra
      },
      error: (error) => console.error('Error al procesar balance:', error)
    });
  }
  

  finalizarCompra(): void {
    if (this.cart?.id) {
      this.cartService.purchase(this.cart.id).subscribe({
        next: (response) => {
          console.log(response);
            this.popupMessage = 'Se ha generado la orden, esté atento a su correo para la confirmación de la orden';
            this.openPopup();
        // Esperar 3 segundos antes de cerrar el pop-up y redirigir
        setTimeout(() => {
          this.closePopup();  // Cerrar el pop-up
          this.router.navigate(['/ver-servicios-comprados']);  // Redirigir a la página deseada
        }, 5000); // 3000 milisegundos = 3 segundos
      },
      error: (error) => console.error('Error al finalizar compra:', error)
    });
  }
}

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}