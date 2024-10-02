import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TransportTypeResponse } from '../model/TransportTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<TransportTypeResponse> {
    return this.http.get<TransportTypeResponse>(`${environment.gatewayServiceUrl}/service-query-microservice/types/transport/${id}`);
  }

  findAll(): Observable<TransportTypeResponse[]> {
    return this.http.get<TransportTypeResponse[]>(`${environment.gatewayServiceUrl}/service-query-microservice/types/transport`);
  }
  /*
  getService(id: string): Observable<TransportTypeResponse> {
    return this.http.get<TransportTypeResponse>(`${environment.gatewayServiceUrl}/service_query_microservice/types/transport/${id}`);
  }

  findAll(): Observable<TransportTypeResponse[]> {
    return this.http.get<TransportTypeResponse[]>(`${environment.gatewayServiceUrl}/service_query_microservice/types/transport`);
  }
    */
}

