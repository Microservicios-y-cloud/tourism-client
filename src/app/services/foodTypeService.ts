import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FoodTypeResponse } from '../models/dto/FoodTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<FoodTypeResponse> {
    return this.http.get<FoodTypeResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/foodType/${id}`);
  }

  findAll(): Observable<FoodTypeResponse[]> { // Asegúrate de que sea un arreglo de FoodTypeResponse
    return this.http.get<FoodTypeResponse[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/foodType`);
  }
}
