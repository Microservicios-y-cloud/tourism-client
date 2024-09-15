import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse';
import { environment } from '../../environments/environment.development';
import { TransportationServiceResponse } from '../models/dto/TransportationServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<TransportationServiceResponse> {
    return this.http.get<TransportationServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation/${id}`)
  }

  findAll(): Observable<TransportationServiceResponse> {
    return this.http.get<TransportationServiceResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation`)
  }
}
