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
    return this.http.get<SuperService>(`${environment.gatewayServiceUrl}/service-query-microservice/services/${id}`)
  }

  findAll(): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`${environment.gatewayServiceUrl}/service-query-microservice/services`);
  }

  findAllBySupplier(id: string): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`${environment.gatewayServiceUrl}/service-query-microservice/services/supplier/${id}`);
  }

  findAllByType(id: string): Observable<SuperService[]> {
    return this.http.get<SuperService[]>(`${environment.gatewayServiceUrl}/service-query-microservice/services/type/${id}`);
  }


  createFoodService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food`, foodData, { headers });
  }

  createAccommodationService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation`, foodData, { headers });
  }

  createTransportationService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation`, foodData, { headers });
  }

  editFoodService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/food`, foodData, { headers });
  }

  editAccommodationService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation`, foodData, { headers });
  }

  editTransportationService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation`, foodData, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/${id}`);
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

