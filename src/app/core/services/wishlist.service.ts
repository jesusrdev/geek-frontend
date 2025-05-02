import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Wishlist, WishlistForm } from '../models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);

  baseUrl: string = environment.apiUrl + 'Wishlist/';

  list(): Observable<ApiResponse<Wishlist[]>> {
    return this.http.get<ApiResponse<Wishlist[]>>(`${this.baseUrl}`);
  }

  create(request: WishlistForm): Observable<ApiResponse<Wishlist>> {
    return this.http.post<ApiResponse<Wishlist>>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse<Wishlist>> {
    return this.http.delete<ApiResponse<Wishlist>>(`${this.baseUrl}${id}`);
  }
}
