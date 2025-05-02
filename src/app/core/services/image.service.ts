import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { ImageProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  baseUrl: string = environment.apiUrl + 'image/';

  list(): Observable<ApiResponse<ImageProduct[]>> {
    return this.http.get<ApiResponse<ImageProduct[]>>(`${this.baseUrl}`);
  }

  create(idProduct: number, request: FormData): Observable<ApiResponse<ImageProduct>> {
    return this.http.post<ApiResponse<ImageProduct>>(`${this.baseUrl}${idProduct}`, request);
  }

  delete(id: number): Observable<ApiResponse<ImageProduct>> {
    return this.http.delete<ApiResponse<ImageProduct>>(`${this.baseUrl}${id}`);
  }
}
