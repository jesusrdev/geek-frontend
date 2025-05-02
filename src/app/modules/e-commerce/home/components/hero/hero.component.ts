import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'home-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  imports: [NgFor, ButtonComponent]
})
export class HeroComponent {
  @Input()
  public products: Product[] = [];

  constructor(
    private router: Router,
    public sanitizer: DomSanitizer
  ) {}

  goToProduct(productId: number) {
    this.router.navigate(['products', productId]);
  }
}
