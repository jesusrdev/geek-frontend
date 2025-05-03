import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { SharedService } from '../../../../../core/services/shared.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../../../../shared/interfaces/auth';
import { MatToolbar } from '@angular/material/toolbar';

import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [MatToolbar, RouterLink, MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, ButtonComponent]
})
export class NavbarComponent {
  private router = inject(Router);
  private sharedService = inject(SharedService);
  private cookieService = inject(CookieService);

  username = '';
  isLoggedIn = false;
  isAdmin = false;

  ngOnInit(): void {
    const userSession = this.sharedService.getSession();
    const token = this.cookieService.get('Authorization');

    if (token != null && token !== '') {
      const decodedToken = jwtDecode<Token>(token);
      this.isAdmin = decodedToken.role === 'Admin';
    }

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
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.username = '';

    this.router.navigate(['/']);
  }
}
