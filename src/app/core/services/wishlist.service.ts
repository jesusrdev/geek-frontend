import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Wishlist, WishlistForm } from '../models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl: string = environment.apiUrl + 'Wishlist/';

  constructor(private http: HttpClient) {}

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
