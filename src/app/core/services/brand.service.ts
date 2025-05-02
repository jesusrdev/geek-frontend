import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  baseUrl: string = environment.apiUrl + 'brand';

  list(): Observable<ApiResponse<Brand[]>> {
    return this.http.get<ApiResponse<Brand[]>>(`${this.baseUrl}`);
  }

  listActive(): Observable<ApiResponse<Brand[]>> {
    return this.http.get<ApiResponse<Brand[]>>(`${this.baseUrl}/active-brands`);
  }

  create(request: FormData): Observable<ApiResponse<Brand>> {
    return this.http.post<ApiResponse<Brand>>(`${this.baseUrl}`, request);
  }

  update(request: FormData): Observable<ApiResponse<Brand>> {
    return this.http.put<ApiResponse<Brand>>(`${this.baseUrl}`, request);
  }

  changeStatus(id: number): Observable<ApiResponse<Brand>> {
    return this.http.put<ApiResponse<Brand>>(`${this.baseUrl}/${id}`, null);
  }
}
