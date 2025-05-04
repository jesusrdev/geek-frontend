import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { ProductList } from '../../../../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';

import { ButtonComponent } from '../../../../../shared/components/button/button.component';

@Component({
  selector: 'home-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  imports: [ButtonComponent]
})
export class HeroComponent {
  private router = inject(Router);
  sanitizer = inject(DomSanitizer);

  public readonly products = input<ProductList[]>([]);

  goToProduct(productId: number) {
    this.router.navigate(['products', productId]);
  }
}
