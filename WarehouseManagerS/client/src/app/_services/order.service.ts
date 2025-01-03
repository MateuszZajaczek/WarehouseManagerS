import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://localhost:5133/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  //createOrder(order: any): Observable<{ message: string }> {
  // return this.http.post(this.apiUrl, order);
  // }

  createOrder(order: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, order);
  }


  acceptOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/accept`, {}, {
      responseType: 'text' as 'json'
    });
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
}

