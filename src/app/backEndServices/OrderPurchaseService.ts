import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SuperService } from '../model/SuperService';
import { ServiceFoodRequest } from '../model/ServiceFoodRequest';
import { OrderPurchaseResponse } from '../model/OrderPurchaseResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderPurchaseService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getOrdered(id:string): Observable<OrderPurchaseResponse[]> {
    return this.http.get<OrderPurchaseResponse[]>(`${environment.gatewayServiceUrl}/order-management-microservice/orders/purchased/${id}`)
  }

  getPurchased(id:string): Observable<OrderPurchaseResponse[]> {
    return this.http.get<OrderPurchaseResponse[]>(`${environment.gatewayServiceUrl}/order-management-microservice/orders/purchased/${id}`)
  }
}

