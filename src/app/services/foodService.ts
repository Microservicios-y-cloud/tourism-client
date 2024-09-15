import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse';
import { environment } from '../../environments/environment.development';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';
import { FoodServiceResponse } from '../models/dto/FoodServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<FoodServiceResponse> {
    return this.http.get<FoodServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food/${id}`)
  }

  findAll(): Observable<FoodServiceResponse> {
    return this.http.get<FoodServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food`)
  }
}
