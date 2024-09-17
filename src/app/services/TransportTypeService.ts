import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TransportType } from '../models/dto/TransportType';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<TransportType> {
    return this.http.get<TransportType>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/TransportType/${id}`);
  }

  findAll(): Observable<TransportType[]> { // Asegúrate de que sea un arreglo de TransportType
    return this.http.get<TransportType[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/TransportType`);
  }
}