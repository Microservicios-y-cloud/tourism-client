import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AccommodationTypeResponse } from '../model/AccommodationTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class AccommodationTypeService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getService(id: string): Observable<AccommodationTypeResponse> {
    return this.http.get<AccommodationTypeResponse>(`${environment.gatewayServiceUrl}/service-query-microservice/types/accommodation/${id}`);
  }

  findAll(): Observable<AccommodationTypeResponse[]> {
    return this.http.get<AccommodationTypeResponse[]>(`${environment.gatewayServiceUrl}/service-query-microservice/types/accommodation`);
  }

  /*
  getService(id: string): Observable<AccommodationTypeResponse> {
    return this.http.get<AccommodationTypeResponse>(`${environment.gatewayServiceUrl}/service_query_microservice/types/accommodation/${id}`);
  }

  findAll(): Observable<AccommodationTypeResponse[]> {
    return this.http.get<AccommodationTypeResponse[]>(`${environment.gatewayServiceUrl}/service_query_microservice/types/accommodation`);
  }
    */
}


