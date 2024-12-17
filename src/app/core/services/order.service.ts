import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = environment.apiUrl + 'Order/';

  constructor(private http: HttpClient) {}

  list(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${this.baseUrl}`);
  }

  create(): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${this.baseUrl}`, {
      id: 0,
      status: 1
    });
  }
}
