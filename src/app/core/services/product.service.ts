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
    brandsId: number[],
    categoriesId: number[],
    subcategoriesId: number[],
    pageSize: number
  ): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams()
      .set('searchString', query)
      .set('orderType', orderBy.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (brandsId.length > 0) {
      brandsId.forEach(id => {
        params = params.append('brandsIds', id.toString());
      });
    }
    if (categoriesId.length > 0) {
      categoriesId.forEach(id => {
        params = params.append('categoryIds', id.toString());
      });
    }
    if (subcategoriesId.length > 0) {
      subcategoriesId.forEach(id => {
        params = params.append('subCategoryIds', id.toString());
      });
    }

    return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}/filter`, { params });
  }
}
