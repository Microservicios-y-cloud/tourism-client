import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { environment } from '../../environments/environment.development';

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

  getService(id:string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/${id}`)
  }

  findAll(): Observable<ServiceResponse[]> {
    return this.http.get<ServiceResponse[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services`)
  }

  findAllBySupplier(id:string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/${id}`)
  }
}
