import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FoodType } from '../models/dto/FoodType';

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<FoodType> {
    return this.http.get<FoodType>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/foodType/${id}`);
  }

  findAll(): Observable<FoodType[]> { // Asegúrate de que sea un arreglo de FoodType
    return this.http.get<FoodType[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/foodType`);
  }
}
