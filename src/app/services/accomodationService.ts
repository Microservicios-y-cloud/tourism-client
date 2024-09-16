import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { environment } from '../../environments/environment.development';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';
import { AccommodationServiceResponse } from '../models/dto/AccommodationServiceResponse';

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

  getService(id:string): Observable<AccommodationServiceResponse> {
    return this.http.get<AccommodationServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation/${id}`)
  }

  findAll(): Observable<AccommodationServiceResponse> {
    return this.http.get<AccommodationServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation`)
  }
}
