import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Session, Token } from '../../shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _snackBar = inject(MatSnackBar);
  private cookieService = inject(CookieService);

  showAlert(message: string, type: string): void {
    this._snackBar.open(message, type, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  setSession(session: Session): void {
    localStorage.setItem('userSession', JSON.stringify(session.userName));
  }

  getSession() {
    const sessionString = localStorage.getItem('userSession');
    const userSession = JSON.parse(sessionString!);

    return userSession;
  }

  deleteSession(): void {
    localStorage.removeItem('userSession');
  }

  getDecodedToken(): Token | null {
    const token = this.cookieService.get('Authorization');

    if (token != null && token !== '') {
      return jwtDecode<Token>(token);
    } else {
      return null;
    }
  }
}
