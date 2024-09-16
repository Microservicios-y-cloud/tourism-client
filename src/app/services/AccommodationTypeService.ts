import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AccommodationTypeResponse } from '../models/dto/AccommodationTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class AccommodationTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<AccommodationTypeResponse> {
    return this.http.get<AccommodationTypeResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/AccommodationType/${id}`);
  }

  findAll(): Observable<AccommodationTypeResponse[]> { // Asegúrate de que sea un arreglo de AccommodationTypeResponse
    return this.http.get<AccommodationTypeResponse[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/AccommodationType`);
  }
}
