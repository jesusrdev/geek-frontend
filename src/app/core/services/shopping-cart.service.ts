import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { CartItemForm, ShoppingCartItem } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl: string = environment.apiUrl + 'ShoppingCartItem/';

  constructor(private http: HttpClient) {}

  list(): Observable<ApiResponse<ShoppingCartItem[]>> {
    return this.http.get<ApiResponse<ShoppingCartItem[]>>(`${this.baseUrl}`);
  }

  create(request: CartItemForm): Observable<ApiResponse<ShoppingCartItem>> {
    return this.http.post<ApiResponse<ShoppingCartItem>>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse<ShoppingCartItem>> {
    return this.http.delete<ApiResponse<ShoppingCartItem>>(`${this.baseUrl}${id}`);
  }
}
