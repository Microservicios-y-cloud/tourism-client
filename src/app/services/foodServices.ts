import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FoodService } from '../models/dto/FoodService';
import { FoodServiceRequest } from '../models/dto/request/FoodServiceRequest';

@Injectable({
  providedIn: 'root'
})
export class FoodServices {

  constructor(
    private http: HttpClient
  ) {}

  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });

  // Método para obtener un servicio específico
  getService(id: string): Observable<FoodService> {
    return this.http.get<FoodService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food/${id}`);
  }

  // Método para obtener todos los servicios
  findAll(): Observable<FoodService[]> {
    return this.http.get<FoodService[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food`);
  }

  // Método para crear un nuevo servicio
  create(foodService: FoodServiceRequest): Observable<FoodServiceRequest> {
    return this.http.post<FoodServiceRequest>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food`, foodService, { headers: this.headers });
  }
}
