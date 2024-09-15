import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/service-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  listarServicios(): Observable<ServiceResponse[]> {
    return this.http.get<ServiceResponse[]>(`${environment.gatewayServiceUrl}/service-publication-microservice/services`)
  }
}
