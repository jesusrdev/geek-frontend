import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SharedService } from '../../../core/services/shared.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [NavbarComponent, RouterOutlet, FooterComponent]
})
export class LayoutComponent implements OnInit {
  username = '';

  constructor(
    private router: Router,
    private sharedService: SharedService
    // private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    //   const userSession = this.sharedService.getSession();
    //   if (userSession != null) {
    //     this.username = userSession;
    //   }
  }

  // logOut(): void {
  //   this.sharedService.deleteSession();

  //   this.cookieService.delete('Authorization', '/');

  //   this.router.navigate(['login']);
  // }
}
