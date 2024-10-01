import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class FoodServices {

  private apiUrl = 'http://localhost:8083/services/food';

  constructor(
    private http: HttpClient
  ) {}

  createFoodService(foodData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, foodData, { headers });
  }
}
