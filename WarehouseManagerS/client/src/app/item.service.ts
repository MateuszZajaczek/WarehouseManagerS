import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:5133/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl).pipe(map(item => item.sort((a,b) => b.id - a.id)));
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  editItem(item: Item): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
