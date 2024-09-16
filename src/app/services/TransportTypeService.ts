import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TransportTypeResponse } from '../models/dto/TransportTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<TransportTypeResponse> {
    return this.http.get<TransportTypeResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/TransportType/${id}`);
  }

  findAll(): Observable<TransportTypeResponse[]> { // Asegúrate de que sea un arreglo de TransportTypeResponse
    return this.http.get<TransportTypeResponse[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/TransportType`);
  }
}
