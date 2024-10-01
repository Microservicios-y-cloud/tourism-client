import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FoodTypeResponse } from '../model/FoodTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<FoodTypeResponse> {
    return this.http.get<FoodTypeResponse>(`http://localhost:8086/types/food/${id}`);
  }

  findAll(): Observable<FoodTypeResponse[]> {
    return this.http.get<FoodTypeResponse[]>(`http://localhost:8086/types/food`);
  }

  /*
  getService(id: string): Observable<FoodTypeResponse> {
    return this.http.get<FoodTypeResponse>(`${environment.gatewayServiceUrl}/service_query_microservice/types/food/${id}`);
  }

  findAll(): Observable<FoodTypeResponse[]> {
    return this.http.get<FoodTypeResponse[]>(`${environment.gatewayServiceUrl}/service_query_microservice/types/food`);
  }
  */
}
