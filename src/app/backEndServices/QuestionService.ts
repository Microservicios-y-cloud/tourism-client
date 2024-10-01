import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Question } from '../model/Question';
import { QuestionRequest } from '../model/QuestionRequest';

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

  sendQuestion(question: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8082/questions', question, { headers });
  }
}
