import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TransportationService } from '../models/dto/TransportationService';
import { TransportationServiceRequest } from '../models/dto/request/TransportationServiceRequest';

@Injectable({
  providedIn: 'root'
})
export class TransportationServices {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<TransportationService> {
    return this.http.get<TransportationService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation/${id}`)
  }

  findAll(): Observable<TransportationService> {
    return this.http.get<TransportationService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation`)
  }

  create(transportationService: TransportationServiceRequest): Observable<TransportationServiceRequest> {
    return this.http.post<TransportationServiceRequest>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/transportation`, transportationService, { headers: this.headers });
  }
}
