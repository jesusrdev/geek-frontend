import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { SharedService } from '../../../../../core/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username = '';
  isLoggedIn = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const userSession = this.sharedService.getSession();

    if (userSession != null) {
      this.username = userSession;
      this.isLoggedIn = true;
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
