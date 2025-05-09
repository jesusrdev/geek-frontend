import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { ShippingAddress } from '../models/shipping-address';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  private http = inject(HttpClient);

  baseUrl: string = environment.apiUrl + 'ShippingAddress/';

  list(): Observable<ApiResponse<ShippingAddress[]>> {
    return this.http.get<ApiResponse<ShippingAddress[]>>(`${this.baseUrl}`);
  }

  getMyShippingAddress(): Observable<ApiResponse<ShippingAddress[]>> {
    return this.http.get<ApiResponse<ShippingAddress[]>>(`${this.baseUrl}active`);
  }

  create(request: ShippingAddress): Observable<ApiResponse<ShippingAddress>> {
    return this.http.post<ApiResponse<ShippingAddress>>(`${this.baseUrl}`, request);
  }

  update(request: ShippingAddress): Observable<ApiResponse<ShippingAddress>> {
    return this.http.put<ApiResponse<ShippingAddress>>(`${this.baseUrl}`, request);
  }

  changeStatus(id: number): Observable<ApiResponse<ShippingAddress>> {
    return this.http.put<ApiResponse<ShippingAddress>>(`${this.baseUrl}${id}`, null);
  }
}
