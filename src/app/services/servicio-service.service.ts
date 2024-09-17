import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Service } from '../models/dto/Service';

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

  getService(id:string): Observable<Service> {
    return this.http.get<Service>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/${id}`)
  }

  findAll(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services`)
  }

  findAllBySupplier(id:string): Observable<Service> {
    return this.http.get<Service>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/${id}`)
  }
}
