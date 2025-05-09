import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../shared/interfaces/api-response';
import { CommentResponse } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);

  baseUrl: string = environment.apiUrl + 'Comment/';

  list(): Observable<ApiResponse<CommentResponse[]>> {
    return this.http.get<ApiResponse<CommentResponse[]>>(`${this.baseUrl}`);
  }

  create(request: CommentResponse): Observable<ApiResponse<CommentResponse>> {
    return this.http.post<ApiResponse<CommentResponse>>(`${this.baseUrl}`, request);
  }

  update(request: CommentResponse): Observable<ApiResponse<CommentResponse>> {
    return this.http.put<ApiResponse<CommentResponse>>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse<CommentResponse>> {
    return this.http.delete<ApiResponse<CommentResponse>>(`${this.baseUrl}${id}`);
  }
}
