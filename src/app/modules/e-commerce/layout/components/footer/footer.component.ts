import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../../../../core/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);
  private sharedService = inject(SharedService);
}
