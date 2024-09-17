import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/dto/Service';
import { environment } from '../../environments/environment.development';
import { TransportationService } from '../models/dto/TransportationService';
import { FoodService } from '../models/dto/FoodService';
import { Location } from '../models/dto/LocationResponse';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<Location> {
    return this.http.get<Location>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/location/${id}`)
  }

  findAll(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/location`)
  }
}
