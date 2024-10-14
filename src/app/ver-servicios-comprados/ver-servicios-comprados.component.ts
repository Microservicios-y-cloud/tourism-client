import { Component } from '@angular/core';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperService } from '../model/SuperService';
import { OrderPurchaseService } from '../backEndServices/OrderPurchaseService';
import { OrderPurchaseResponse } from '../model/OrderPurchaseResponse';
import { itemService } from '../model/adicional/itemService';
import { UserProfile } from '../keycloak/user-profile';
import { KeycloakService } from '../keycloak/keycloak.service';

@Component({
  selector: 'app-ver-servicios-comprados',
  templateUrl: './ver-servicios-comprados.component.html',
  styleUrls: ['./ver-servicios-comprados.component.css']
})
export class VerServiciosCompradosComponent {
  public items: OrderPurchaseResponse[] = []
  public mostrarComentario = false;

  public visible:boolean = false

  public valoracion = 1;
  public text = '';

  userProfile: UserProfile | undefined;

  public listaServicios: itemService[] = []
  constructor(
    private orderPurchaseService: OrderPurchaseService,
    private serviceService: ServicioService,
    private keycloakService: KeycloakService,
    private router: Router,  private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userProfile = this.keycloakService.profile;
    if (this.userProfile?.id) {
      this.orderPurchaseService.getPurchased(this.userProfile.id).subscribe( //Probado con "0e9db4d0-917c-4d5b-9c76-15c9a26204cb"
        itemResponse => {
          itemResponse.forEach(ordenes => {
            ordenes.orderItems.forEach(orderItem => {
              this.serviceService.getService(orderItem.serviceId).subscribe(
                res => {
                  if(res.id && res.name && res.unitValue) {
                    let itemCart = new itemService(res.id,res.name,res.unitValue,orderItem.quantity,orderItem.subtotal)
                    this.listaServicios.push(itemCart)
                  }
                },
                error => {
                  console.log("Error");
                  
                }
              )
            });
          });
          this.items = itemResponse
        },
        error => {
          console.log("Error al cargar servicio");
          
        }
      )
    }
    
  }

  realizarComentario(id: number) {
    this.visible = true; // Mostrar el componente para redactar comentario
  }

  cerrarComentario() {
    this.visible = false; // Cerrar el componente
  }

  

  actualizarPuntaje(num: number) {
    this.valoracion = num;
  }

  enviar() {
    if (this.text.trim() === '') {
      console.log('El comentario está vacío.');
      return;
    }
    console.log('Valoración:', this.valoracion);
    console.log('Comentario:', this.text);
    // Aquí podrías realizar la acción para enviar el comentario
    this.cerrar(); // Cerrar el popup después de enviar
  }

  cerrar() {
    this.visible = false;
  }

  menuPrincipal(): void {
    this.router.navigate(['#']);
  }
}