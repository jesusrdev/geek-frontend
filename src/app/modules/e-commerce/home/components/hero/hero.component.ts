import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
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
