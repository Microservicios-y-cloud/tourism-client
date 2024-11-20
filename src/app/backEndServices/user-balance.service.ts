import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserBalanceRequest } from '../model/UserBalanceRequest';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserBalanceService {

  private baseUrl = environment.gatewayServiceUrl + '/payment-microservice/payments';

  constructor(private http: HttpClient) {}

  createUserBalance(request: UserBalanceRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, request);
  }

  createRandomUserBalance(request: UserBalanceRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/random`, request);
  }

  updateRandomUserBalance(userId: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/random/${userId}`, {});
  }

  getUserBalance(userId: string): Observable<UserBalanceRequest> {
    return this.http.get<UserBalanceRequest>(`${this.baseUrl}/${userId}`);
  }
  processUserBalance(balanceRequest: UserBalanceRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/process`, balanceRequest);
  }
}
