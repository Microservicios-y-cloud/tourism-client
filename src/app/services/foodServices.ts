import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FoodService } from '../models/dto/FoodService';

@Injectable({
  providedIn: 'root'
})
export class FoodServices {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<FoodService> {
    return this.http.get<FoodService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food/${id}`)
  }

  findAll(): Observable<FoodService> {
    return this.http.get<FoodService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food`)
  }
}
