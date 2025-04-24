import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { SharedService } from '../../../../../core/services/shared.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../../../../shared/interfaces/auth';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: false
})
export class NavbarComponent {
  username = '';
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const userSession = this.sharedService.getSession();
    const token = this.cookieService.get('Authorization');

    const decodedToken: Token = jwtDecode(token);

    if (userSession != null) {
      this.username = userSession;
      this.isLoggedIn = true;
      this.isAdmin = decodedToken.role === 'Admin';
    }
  }

  logIn(): void {
    this.router.navigate(['/auth/login']);
  }

  register(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  logOut(): void {
    this.sharedService.deleteSession();

    this.cookieService.delete('Authorization', '/');

    this.router.navigate(['/']);
  }
}
