import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from '../_models/item';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:5133/items';
  private token: string | null = localStorage.getItem('token');  // Pobrany token z localStorage
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Inicjalizacja nagłówków w konstruktorze, gdy token jest dostępny
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl, { headers: this.headers }).pipe(
      map(items => items.sort((a, b) => b.id - a.id))
    );
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, { headers: this.headers });
  }

  editItem(item: Item): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${item.id}`, item, { headers: this.headers });
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
