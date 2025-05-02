import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Brand } from '../../../../../core/models/brand';
import { NgClass } from '@angular/common';

@Component({
  selector: 'home-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
  imports: [NgClass, RouterLink]
})
export class BrandsComponent {
  private router = inject(Router);

  public readonly brands = input<Brand[]>([]);
}
