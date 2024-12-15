import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = environment.apiUrl + 'product';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  get(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/${id}`);
  }

  list(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}`);
  }

  listActive(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}/getassets`);
  }

  create(request: FormData): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}`, request);
  }

  update(request: FormData): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.baseUrl}`, request);
  }

  changeStatus(id: number): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.baseUrl}/${id}`, null);
  }

  filter(
    query: string,
    orderBy: number,
    page: number,
    brands: number[],
    categories: number[],
    subcategories: number[]
  ): Observable<ApiResponse<Product[]>> {
    const params = new HttpParams()
      .set('query', query)
      .set('orderBy', orderBy)
      .set('page', page.toString())
      .set('brands', brands.toString())
      .set('categories', categories.toString())
      .set('subcategories', subcategories.toString());

    return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}/filter`, { params });
  }
}
