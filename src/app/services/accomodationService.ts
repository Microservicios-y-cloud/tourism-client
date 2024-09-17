import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/dto/Service';
import { environment } from '../../environments/environment.development';
import { TransportationService } from '../models/dto/TransportationService';
import { AccommodationService } from '../models/dto/AccommodationService';

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
}
