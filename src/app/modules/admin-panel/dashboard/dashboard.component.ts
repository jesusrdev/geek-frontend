import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../../core/services/shared.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatButton,
    RouterLink,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatSidenavContent,
    RouterOutlet
  ]
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
