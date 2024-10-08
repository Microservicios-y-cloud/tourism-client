import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_SERVICES_BY_KEYWORD } from '../../graphql/queries.graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../backEndServices/servicio-service.service';
import { SuperService } from '../../model/SuperService';
import { CartService } from '../../backEndServices/CartService';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { UserProfile } from '../../keycloak/user-profile';
import { CartItem } from '../../model/CartItem';
import { CartRequest } from '../../model/CartRequest';
import { Customer } from '../../model/Customer';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  isPopupOpen = false;
  popupMessage = '';

  userProfile: UserProfile | undefined;
  
  @Input() keyword: string = '';
  @Output() resultsEmitter = new EventEmitter<any[]>();
  services: SuperService[] = [];
  loading: boolean = false;
  error: any;
  private querySubscription: Subscription | undefined;

  selectedFilter: string = ''; // Inicializar el filtro seleccionado como vacío
  showFilters: boolean = false; // Controla la visibilidad del dropdown

  constructor(private readonly apollo: Apollo,
              private servicioService: ServicioService,
              private cartService: CartService,
              private router: Router,  
              private route: ActivatedRoute,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;  
  }

  onFilterChange(): void {
    console.log('Filtro seleccionado:', this.selectedFilter);
    this.servicioService.findAllByType(this.selectedFilter).subscribe(
      data => {
        console.log(data);
        this.services = data
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  verServicio(item: SuperService) {
    console.log(item);
    this.router.navigate([`ver-servicio/${item.id}`]);
  }

  onSearch(): void {
    if (this.keyword.trim()) {
      this.loading = true;
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_SERVICES_BY_KEYWORD,
          variables: {
            keyword: this.keyword,
            filter: this.selectedFilter // Pasar el filtro seleccionado a la consulta
          },
        })
        .valueChanges.subscribe({
          next: ({ data, loading }) => {
            this.loading = loading;
            this.services = data?.servicesByKeyword || [];
            this.error = null;
            this.resultsEmitter.emit(this.services); // Emitir los resultados
            console.log(this.services);
            this.services.forEach(element => {
              console.log(element.serviceType);
              
            });
          },
          error: (err) => {
            this.error = err;
            this.loading = false;
            this.services = [];
            console.error('Error en la búsqueda', err);
          }
        });
    } else {
      this.services = [];
    }
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  addToCart(servicio: SuperService):void {
    //TODO: Es importante modificar la respuesta del front para que, si encuentra que el usuario no tiene carrito, no se devuelva un error ya que eso no estaría bien hecho
    //Crear cart
    if (servicio.id && servicio.unitValue) {
      let cartIt = new CartItem(servicio.id,1,servicio.unitValue)

      //Revisar primero si el cliente tiene un carrito
      if (this.userProfile?.id) {
        this.cartService.getCartByUser(this.userProfile.id).subscribe(
          response => {
            console.log(response);
            if (this.userProfile?.id && response.id) {
              //TODO: Hay algo extraño, no se si del front o del back, pero cuando añades un item a un carrito existente, se ejecuta error, sin embargo si se está actualizando en la base de datos, asi que hay algo mal con el manejo de errores
              //Se soluciona el problema de que añada el mismo item varias veces, pero sigue devolviendo error a pesar de que se añade
              this.cartService.addCartItem(response.id,cartIt).subscribe(
                response => {
                  this.popupMessage = "Se ha agregado el servicio al carrito"
                  this.openPopup()
                  console.log('Servicio creado con éxito:', response);
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
                          this.popupMessage = error
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

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}
