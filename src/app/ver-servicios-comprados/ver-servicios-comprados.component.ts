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
import { GoogleMapsService } from '../maps/google-maps.service';
import { WeatherService } from '../clima/weather.service';

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
  public mostrarClima = false;
  public mostrarMapa = false;

  userProfile: UserProfile | undefined;

  public itemComentar: itemService = new itemService(
    0, '', 0, 0, 0, '', new Date(), new Date(), '', '', '', 0, 0, '', '', '', 0, 0, '' 
  );

  public weatherData: any

  public listaServicios: itemService[] = []
  public lat: number | undefined;
  public lon: number | undefined;
  public originLat: number = 0;
  public originLon: number = 0;
  titulo: string | undefined;
  constructor(
    private orderPurchaseService: OrderPurchaseService,
    private serviceService: ServicioService,
    private keycloakService: KeycloakService,
    private router: Router,  private route: ActivatedRoute,
    private questionService: questionService,
    private weatherService: WeatherService,
    private mapService: GoogleMapsService
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
                                      res.destination?.latitude || 0,
                                      res.destination?.longitude || 0,
                                      res.origin?.country || '',
                                      res.origin?.municipality || '',
                                      res.origin?.city || '',
                                      res.origin?.latitude || 0,
                                      res.origin?.longitude || 0,
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
    const city = item.destinationCity;
    if (city) {
      this.weatherService.getWeatherByLatLong(item.destinationLatitude, item.destinationLongitude).subscribe(
        data => {
          this.setWeatherData(data);
          this.mostrarClima = true; // Mostrar el popup del clima
        },
        error => {
          console.error('Error al cargar el clima:', error);
          this.popupMessage = 'No se pudo cargar el clima. Por favor, intenta más tarde.';
          this.openPopup();
        }
      );
    } else {
      this.popupMessage = 'La ciudad no está definida.';
      this.openPopup();
    }
  }




  verMapa(item: itemService) {
    this.mostrarMapa = true;
    console.log('Mostrar mapa:', this.mostrarMapa);
    this.lat = item.destinationLatitude ?? 0;
    this.lon = item.destinationLongitude ?? 0;
    this.originLat = item.originLatitude ?? 0;
    this.originLon = item.originLongitude ?? 0;
    this.titulo = item.destinationCity || "Ubicación";
  }
  

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
  setWeatherData(data: any) {
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
  }

  cerrarClima() {
    this.mostrarClima = false; // Ocultar el popup del clima
  }

  cerrarMapa() {
    this.mostrarMapa = false; // Ocultar el mapa
  }
}

