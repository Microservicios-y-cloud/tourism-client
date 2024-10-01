import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationResponse } from '../model/LocationResponse';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`http://localhost:8086/services/location/${id}`)
  }

  findAll(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`http://localhost:8086/services/location`)
  }

  /*
  getService(id:string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${environment.gatewayServiceUrl}/service_query_microservice/services/location/${id}`)
  }

  findAll(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`${environment.gatewayServiceUrl}/service_query_microservice/services/location`)
  }
    */
}

