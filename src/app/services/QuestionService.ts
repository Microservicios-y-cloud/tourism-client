import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/dto/Service';
import { environment } from '../../environments/environment.development';
import { TransportationService } from '../models/dto/TransportationService';
import { FoodService } from '../models/dto/FoodService';
import { Location } from '../models/dto/Location';
import { Question } from '../models/dto/Question';

@Injectable({
  providedIn: 'root'
})
export class questionService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getService(id:string): Observable<Question> {
    return this.http.get<Question>(`${environment.gatewayServiceUrl}/service-publication-microservice/questions${id}`)
  }

  findAll(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.gatewayServiceUrl}/service-rating-microservice/question`)
  }
}
