import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationResponse } from '../model/LocationResponse';
import { environment } from '../../environments/environment.development';

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

  createLocation(location: LocationResponse) : Observable<LocationResponse> {
    return this.http.post<LocationResponse>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/location`, location, { headers: this.headers })
  }

  getService(id:string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${environment.gatewayServiceUrl}/service-query-microservice/services/location/${id}`)
  }

  findAll(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`${environment.gatewayServiceUrl}/service-query-microservice/services/location`)
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

