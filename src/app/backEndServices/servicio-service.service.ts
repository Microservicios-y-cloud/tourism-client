import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SuperService } from '../model/SuperService';
import { ServiceFoodRequest } from '../model/ServiceFoodRequest';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  //Como estoy probando que funcione (accediendo directamente al microservicio), poniendo lo siguiente el los controladores del back @CrossOrigin(origins = "*")

  getService(id:number): Observable<SuperService> {
    return this.http.get<SuperService>(`http://localhost:8086/services/${id}`)
  }

  findAll(): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`http://localhost:8086/services`);
  }

  findAllBySupplier(id: string): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`http://localhost:8086/services/supplier/${id}`);
  }

  createFoodService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8083/services/food', foodData, { headers });
  }

  createAccommodationService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8083/services/accommodation', foodData, { headers });
  }

  createTransportationService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8083/services/transportation', foodData, { headers });
  }

  /*
  getService(id:number): Observable<SuperService> {
    return this.http.get<SuperService>(`${environment.gatewayServiceUrl}/service_query_microservice/services/${id}`)
  }

  findAll(): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`${environment.gatewayServiceUrl}/service_query_microservice/services`);
  }

  findAllBySupplier(id: string): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`${environment.gatewayServiceUrl}/service_query_microservice/services/supplier/${id}`);
  }

  createFoodService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('${environment.gatewayServiceUrl}/service_publication_microservice/services/food', foodData, { headers });
  }
    */
  
}

