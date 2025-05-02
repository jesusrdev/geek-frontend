import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Brand } from '../../../../../core/models/brand';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'home-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
  imports: [NgFor, NgClass, RouterLink]
})
export class BrandsComponent {
  @Input()
  public brands: Brand[] = [];

  constructor(private router: Router) {}
}
