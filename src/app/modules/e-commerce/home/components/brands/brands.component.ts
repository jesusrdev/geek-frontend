import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Brand } from '../../../../../core/models/brand';

@Component({
  selector: 'home-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  @Input()
  public brands: Brand[] = [];

  constructor(private router: Router) {}
}
