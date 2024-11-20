import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationResponse } from '../model/LocationResponse';
import { environment } from '../../environments/environment.development';
import { CartRequest } from '../model/CartRequest';
import { CartResponse } from '../model/CartResponse';
import { CartItem } from '../model/CartItem';
import { OrderPurchaseResponse } from '../model/OrderPurchaseResponse';
import { OrderPurchaseRequest } from '../model/OrderPurchaseRequest';
import { UserBalanceRequest } from '../model/UserBalanceRequest';

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

  getCartByUser(id:string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/user/${id}`)
  }

  createCart(cart: CartRequest): Observable<any> {
    const requestOptions: Object = {
      responseType: 'text',
      headers: this.headers
    }
    return this.http.post<any>(`${environment.gatewayServiceUrl}/order-management-microservice/cart`, cart, requestOptions);
  }

  addCartItem(id: string,cart: CartItem): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/${id}/cartItem`, cart, { headers });
  }

  //No probados aun

  updateCart(cart: CartRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${environment.gatewayServiceUrl}/order-management-microservice/cart`, cart, { headers });
  }

  getCart(id: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/${id}`);
  }

  deleteCart(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/${id}`);
  }

  deleteCartItem(id: number, cartId: string): Observable<void> {
    //eliminamos
    console.log(`${environment.gatewayServiceUrl}/order-management-microservice/cart/${cartId}/cartItem/${id}`)
    return this.http.delete<void>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/${cartId}/cartItem/${id}`);
  }

  createRandomBalance(userBalance: UserBalanceRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${environment.gatewayServiceUrl}/order-management-microservice/payments/random`, userBalance, { headers });
  }

  purchase(id:string): Observable<OrderPurchaseRequest> {
    return this.http.get<OrderPurchaseRequest>(`${environment.gatewayServiceUrl}/order-management-microservice/cart/purchase/${id}`)
  }
}

