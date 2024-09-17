import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AccommodationType } from '../models/dto/AccommodationType';

@Injectable({
  providedIn: 'root'
})
export class AccommodationTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<AccommodationType> {
    return this.http.get<AccommodationType>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/AccommodationType/${id}`);
  }

  findAll(): Observable<AccommodationType[]> { // Asegúrate de que sea un arreglo de AccommodationTypeResponse
    return this.http.get<AccommodationType[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/AccommodationType`);
  }
}