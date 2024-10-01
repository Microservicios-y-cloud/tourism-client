import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  /*
  getService(id:string): Observable<AccommodationService> {
    return this.http.get<AccommodationService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation/${id}`)
  }

  findAll(): Observable<AccommodationService> {
    return this.http.get<AccommodationService>(`${environment.gatewayServiceUrl}/service-publication-microservice/services/accommodation`)
  }
    */
}
