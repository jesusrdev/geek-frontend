import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authToken = inject(CookieService).get('Authorization');

  const authRequest = req.clone({
    headers: req.headers.append('Authorization', authToken)
  });

  return next(authRequest);
};
