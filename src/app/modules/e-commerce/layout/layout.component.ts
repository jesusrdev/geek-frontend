import { Component, OnInit, inject } from '@angular/core';
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
  private router = inject(Router);
  private sharedService = inject(SharedService);

  username = '';

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
