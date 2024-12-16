import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login, Session, SignUp } from '../../shared/interfaces/auth';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.apiUrl + 'usuario/';

  constructor(private http: HttpClient) {}

  signIn(request: Login): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}login`, request);
  }

  signUp(request: SignUp): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}registro`, request);
  }

  list(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<SignUp[]>>(`${this.baseUrl}`);
  }

  // listRoles(): Observable<ApiResponse<Role[]>> {
  //   return this.http.get<ApiResponse<Role[]>>(`${this.baseUrl}list-roles`);
  // }
}
