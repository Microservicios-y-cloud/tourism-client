import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/dto/Service';
import { environment } from '../../environments/environment.development';
import { TransportationService } from '../models/dto/TransportationService';
import { AccommodationService } from '../models/dto/AccommodationService';
import { AccomoationServiceRequest } from '../models/dto/request/AccommodationServiceRequest';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<AccommodationService> {
    return this.http.get<AccommodationService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation/${id}`)
  }

  findAll(): Observable<AccommodationService> {
    return this.http.get<AccommodationService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation`)
  }

  // Método para crear un nuevo servicio
  create(accommodationService: AccomoationServiceRequest): Observable<AccomoationServiceRequest> {
    return this.http.post<AccomoationServiceRequest>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation`, accommodationService, { headers: this.headers });
  }
}
