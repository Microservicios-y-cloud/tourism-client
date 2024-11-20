import { itemService } from './../model/adicional/itemService';
import { Component } from '@angular/core';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperService } from '../model/SuperService';
import { OrderPurchaseService } from '../backEndServices/OrderPurchaseService';
import { questionService } from '../backEndServices/QuestionService';
import { OrderPurchaseResponse } from '../model/OrderPurchaseResponse';
import { UserProfile } from '../keycloak/user-profile';
import { KeycloakService } from '../keycloak/keycloak.service';
import { CommentRequest } from '../model/CommentRequest';
import { Qualification } from '../model/Qualification';
import { Customer } from '../model/Customer';

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
  public serviceType = '';

  isPopupOpen = false;
  popupMessage = '';

  userProfile: UserProfile | undefined;

  public itemComentar: itemService = new itemService(
    0, '', 0, 0, 0, '', new Date(), new Date(), '', '', '', '', '', '', '' 
  );

  public listaServicios: itemService[] = []
  constructor(
    private orderPurchaseService: OrderPurchaseService,
    private serviceService: ServicioService,
    private keycloakService: KeycloakService,
    private router: Router,  private route: ActivatedRoute,
    private questionService: questionService
  ) {}

// Asegurarse de no sobrescribir serviceType globalmente y manejar por servicio
ngOnInit(): void {
  this.userProfile = this.keycloakService.profile;
  if (this.userProfile?.id) {
      this.orderPurchaseService.getPurchased(this.userProfile.id).subscribe(
          itemResponse => {
              itemResponse.forEach(ordenes => {
                  ordenes.orderItems.forEach(orderItem => {
                      this.serviceService.getService(orderItem.serviceId).subscribe(
                          res => {
                              if (res.id && res.name && res.unitValue) {
                                  const startDate = res.startDate || null;
                                  const endDate = res.endDate || null;
                                  const destination = res.destination || '';
                                  const origin = res.origin || '';
                                  
                                  // Determinar el tipo de servicio
                                  let serviceType = '';
                                  if (res.accommodationType !== undefined) {
                                      serviceType = 'Alojamiento';
                                  } else if (res.foodType !== undefined) {
                                      serviceType = 'Alimentación';
                                  } else {
                                      serviceType = 'Transporte';
                                  }

                                  // Crear un nuevo itemService con el tipo correcto
                                  let itemCart = new itemService(
                                      res.id,
                                      res.name,
                                      res.unitValue,
                                      orderItem.quantity,
                                      orderItem.subtotal,
                                      serviceType,
                                      res.startDate,
                                      res.endDate,
                                      res.destination?.country || '',
                                      res.destination?.municipality || '',
                                      res.destination?.city || '',
                                      res.origin?.country || '',
                                      res.origin?.municipality || '',
                                      res.origin?.city || '',
                                      ordenes.creationDate
                                  );

                                  this.listaServicios.push(itemCart); // Agregar el servicio a la lista
                              }
                          },
                          error => {
                              console.log("Error al obtener el servicio");
                          }
                      );
                  });
              });
              this.items = itemResponse;
          },
          error => {
              console.log("Error al cargar las órdenes");
          }
      );
  }
}

  realizarComentario(item: itemService) {
    this.itemComentar = item;
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
    console.log('Servicio:', this.itemComentar.serviceName);
    const qualification = Qualification.fromEstrellas(this.valoracion);
    let comment = new CommentRequest(
      null,
      this.itemComentar.serviceId!,
      qualification,
      new Customer(
        this.userProfile?.id!,
        this.userProfile?.attributes?.userType ? this.userProfile.attributes.userType[0] : '',
        this.userProfile?.username!,
        this.userProfile?.firstName!,
        this.userProfile?.lastName!,
        this.userProfile?.email!),
      this.text,
      new Date().toISOString()
    )
    console.log(comment);
    this.questionService.createComment(comment).subscribe(
      response => {
        console.log('Comentario enviado con éxito:', response);
        this.popupMessage = "Comentario enviado con éxito";
        this.openPopup();
      },
      error => {
        console.error('Error al enviar el comentario:', error);
        this.popupMessage = "Error al enviar el comentario";
        this.openPopup();
      }
    );
    this.cerrar(); // Cerrar el popup después de enviar
  }

  cerrar() {
    this.visible = false;
  }

  menuPrincipal(): void {
    this.router.navigate(['#']);
  }

  
  verClima(item: itemService) {
  throw new Error('Method not implemented.');
  }
  verMapa(item: itemService) {
  throw new Error('Method not implemented.');
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}