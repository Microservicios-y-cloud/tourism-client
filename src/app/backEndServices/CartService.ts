import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationResponse } from '../model/LocationResponse';
import { environment } from '../../environments/environment.development';
import { CartRequest } from '../model/CartRequest';
import { CartResponse } from '../model/CartResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) {
  }

  private headers = new HttpHeaders(
    { "Content-Type": "application/json" }
  )

  getCart(id:string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/user/${id}`)
  }

  createCart(cart: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/order-management-microservice/cart`, cart, { headers });
  }

  addCartItem(id: string,cart: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/order-management-microservice/cart${id}/cartItem`, cart, { headers });
  }
}

