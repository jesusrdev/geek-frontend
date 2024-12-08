import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  baseUrl: string = environment.apiUrl + 'subcategory/';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  list(): Observable<ApiResponse<Subcategory[]>> {
    return this.http.get<ApiResponse<Subcategory[]>>(`${this.baseUrl}`);
  }

  listActive(): Observable<ApiResponse<Subcategory[]>> {
    return this.http.get<ApiResponse<Subcategory[]>>(`${this.baseUrl}active-subcategories`);
  }

  create(request: Subcategory): Observable<ApiResponse<Subcategory>> {
    return this.http.post<ApiResponse<Subcategory>>(`${this.baseUrl}`, request);
  }

  update(request: Subcategory): Observable<ApiResponse<Subcategory>> {
    return this.http.put<ApiResponse<Subcategory>>(`${this.baseUrl}`, request);
  }

  changeStatus(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.put<ApiResponse<Subcategory>>(`${this.baseUrl}${id}`, null);
  }
}
