import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username = '';

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const userSession = this.sharedService.getSession();

    if (userSession != null) {
      this.username = userSession;
    }
  }

  logOut(): void {
    this.sharedService.deleteSession();

    this.cookieService.delete('Authorization', '/');

    this.router.navigate(['login']);
  }
}
