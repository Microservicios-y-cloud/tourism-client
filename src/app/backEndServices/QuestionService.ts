import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Question } from '../model/Question';
import { QuestionRequest } from '../model/QuestionRequest';
import { Answer } from '../model/Answer';
import { AnswerResponse } from '../model/AnswerResponse';
import { CommentRequest } from '../model/CommentRequest';
import { CommentResponse } from '../model/CommentResponse';

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

  findAllQuestionsByService(id:number): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.gatewayServiceUrl}/service-rating-microservice/questions/service/${id}`)
  }

  sendQuestion(question: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/service-rating-microservice/questions`, question, { headers });
  }

  sendAnswer(id:string, Answer: AnswerResponse): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/service-rating-microservice/questions/${id}/answers`, Answer, { headers });
  }

  createComment(comment: CommentRequest): Observable<CommentResponse> {
    const requestOptions: Object = {
      responseType: 'text',
      headers: this.headers
    }
    return this.http.post<CommentResponse>(`${environment.gatewayServiceUrl}/service-rating-microservice/comments`, comment, requestOptions)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    )
  }

  getCommentsByService(id:number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${environment.gatewayServiceUrl}/service-rating-microservice/comments/service/${id}`)
  }
  
}

