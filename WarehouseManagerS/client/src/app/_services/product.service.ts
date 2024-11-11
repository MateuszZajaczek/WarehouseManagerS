import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../_models/product';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:5133/api/products';
  private token: string | null = localStorage.getItem('token');  // Pobrany token z localStorage

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(this.apiUrl, { headers: headers }).pipe(
      map(products => products.sort((a, b) => b.id - a.id))
    );
  }
  

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, Product);
  }

  editProduct(Product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${Product.id}`, Product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
