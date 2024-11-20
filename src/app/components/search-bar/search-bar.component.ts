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
    this.keyword = '.'; //Esto es para que busque de una vez todo
    this.onSearch();
    this.keyword = '';
    
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
            this.resultsEmitter.emit(this.services);
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

  addToCart(servicio: SuperService): void {
    if (servicio.id && servicio.unitValue) {
        const cartIt = new CartItem(servicio.id, 1, servicio.unitValue);

        if (this.userProfile?.id) {
            this.cartService.getCartByUser(this.userProfile.id).subscribe(
                response => {
                    console.log(response);
                    if (response.id) {
                        this.cartService.addCartItem(response.id, cartIt).subscribe(
                            () => {
                                this.popupMessage = "Se ha agregado el servicio al carrito";
                                this.openPopup();
                            },
                            error => {
                                if (!error.error.message) {
                                    this.popupMessage = "Se ha agregado el servicio al carrito";
                                    this.openPopup();
                                } else {
                                    this.popupMessage = error.error.message;
                                    this.openPopup();
                                    console.error("Error al agregar el servicio:", error);
                                }
                            }
                        );
                    }
                },
                error => {
                    if (error.status === 404) {
                        console.log("No existe el carrito, así que se creará uno.");

                        if (
                            this.userProfile?.id &&
                            this.userProfile.attributes?.userType &&
                            this.userProfile.username &&
                            this.userProfile.firstName &&
                            this.userProfile.lastName &&
                            this.userProfile.email
                        ) {
                            const newCart = new CartRequest(
                                new Customer(
                                    this.userProfile.id,
                                    this.userProfile.attributes.userType[0],
                                    this.userProfile.username,
                                    this.userProfile.firstName,
                                    this.userProfile.lastName,
                                    this.userProfile.email
                                ),
                                [cartIt]
                            );

                            this.cartService.createCart(newCart).subscribe(
                                () => {
                                    this.popupMessage = "Carrito creado y servicio agregado con éxito";
                                    this.openPopup();
                                },
                                createCartError => {
                                    if (createCartError.status === 400) {
                                        this.popupMessage = "Error, el servicio actualmente no está disponible";
                                        this.openPopup();
                                    } else {
                                        console.error("Error al crear el carrito:", createCartError);
                                    }
                                }
                            );
                        }
                    } else {
                        console.error("Error al obtener el carrito:", error);
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
