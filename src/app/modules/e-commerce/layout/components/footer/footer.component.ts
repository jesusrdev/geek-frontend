import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../../../../core/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(
    private router: Router,
    private sharedService: SharedService
  ) {}
}
