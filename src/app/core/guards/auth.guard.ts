import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../services/shared.service';

import { jwtDecode } from 'jwt-decode';

import { Token } from '../../shared/interfaces/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const sharedService = inject(SharedService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const user = sharedService.getSession();
  let token = cookieService.get('Authorization');

  if (user && token) {
    token = token.replace('Bearer ', '');
    const decodedToken: Token = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentDate = new Date().getTime();

    if (expirationDate < currentDate) {
      router.navigate(['/auth/login']);
      return false;
    }

    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
